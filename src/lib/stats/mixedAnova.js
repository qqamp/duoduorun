/**
 * 混合設計 ANOVA — 一個被試間因子 × 一個被試內因子
 * Mixed ANOVA — one between-subjects factor x one within-subjects factor.
 *
 * 對外 API / Public API:
 *   mixedAnova(rows, betweenVar, conditionVars) → 完整結果 / full result object
 *
 *   rows:           物件陣列 / array of row objects（寬資料 / wide-format）
 *   betweenVar:     被試間因子欄名（categorical, ≥ 2 levels）
 *                   between-subjects factor column (categorical, >= 2 levels)
 *   conditionVars:  被試內因子的測量欄（≥ 2 個欄位 = b 個 levels）
 *                   within-subjects factor measurement columns (>= 2 columns = b levels)
 *
 * 流程 / Flow:
 *   1. listwise deletion（betweenVar 或任一 conditionVar 缺值即剔除整列）
 *   2. 計算 SS_total / SS_BS / SS_WS 拆解；
 *      被試間：SS_A、SS_subjects(A)
 *      被試內：SS_B、SS_AB、SS_error_within
 *   3. 三個 F 檢定：
 *        F_A   = MS_A / MS_subjects(A)
 *        F_B   = MS_B / MS_error_within
 *        F_AB  = MS_AB / MS_error_within
 *   4. partial η² for each effect
 *   5. Mauchly's W + Greenhouse-Geisser / Huynh-Feldt / Lower-bound：
 *      使用受試者內正交對比的「組內彙集（pooled within-group）」共變異矩陣 S
 *      （即從每位受試者的 contrast 向量中先扣掉所屬組均值）
 *      W = det(S) / (trace(S)/(b-1))^(b-1)
 *      χ² = -[ν - (2(b-1)² + (b-1) + 2) / (6(b-1))] · ln(W)；ν = N - a
 *      ε_GG = (tr S)² / [(b-1) · tr(S²)]
 *      ε_HF = min{1, [(N-a)(b-1)·ε_GG - 2] / [(b-1)·((N-a-1) - (b-1)·ε_GG)]}
 *                                              （混合設計版本）
 *      ε_LB = 1 / (b-1)
 *   6. 將 ε 套用到 (df_B, df_error_within) 與 (df_AB, df_error_within)
 *
 * Notes:
 *   - b = 2 時球形性自動成立 → 不報 Mauchly、ε ≡ 1。
 *   - F 不變，僅 df 乘以 ε 後重算 p。
 */
import { isMissing } from '../variableTypes.js'
import { pF, pChiSq } from './pvalue.js'

/* ──────────────────────────  小型矩陣工具 / matrix helpers  ────────────────────────── */

/** 高斯消去法計算行列式 / determinant via Gauss elimination */
function det(M) {
  const n = M.length
  const A = M.map((row) => row.slice())
  let sign = 1
  for (let i = 0; i < n; i++) {
    let maxAbs = Math.abs(A[i][i])
    let maxRow = i
    for (let r = i + 1; r < n; r++) {
      const v = Math.abs(A[r][i])
      if (v > maxAbs) { maxAbs = v; maxRow = r }
    }
    if (maxAbs < 1e-14) return 0
    if (maxRow !== i) {
      const tmp = A[i]; A[i] = A[maxRow]; A[maxRow] = tmp
      sign = -sign
    }
    const pivot = A[i][i]
    for (let r = i + 1; r < n; r++) {
      const factor = A[r][i] / pivot
      if (factor === 0) continue
      for (let c = i; c < n; c++) A[r][c] -= factor * A[i][c]
    }
  }
  let d = sign
  for (let i = 0; i < n; i++) d *= A[i][i]
  return d
}

/** tr(S · S) / trace of S squared */
function traceSquared(S) {
  const n = S.length
  let s = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) s += S[i][j] * S[j][i]
  }
  return s
}

/** trace(M) */
function trace(M) {
  let s = 0
  for (let i = 0; i < M.length; i++) s += M[i][i]
  return s
}

/* ──────────────────────────  Helmert 正交對比 / Helmert contrasts  ────────────────────────── */

/**
 * 產生 (b-1) × b 的 Helmert 正交對比矩陣，列向量正規化為單位長度。
 * Helmert orthonormal contrasts of size (b-1) x b.
 */
function helmertContrasts(b) {
  const C = []
  for (let i = 0; i < b - 1; i++) {
    const row = new Array(b).fill(0)
    const remaining = b - i - 1
    row[i] = remaining
    for (let j = i + 1; j < b; j++) row[j] = -1
    let norm = 0
    for (let j = 0; j < b; j++) norm += row[j] * row[j]
    norm = Math.sqrt(norm)
    for (let j = 0; j < b; j++) row[j] /= norm
    C.push(row)
  }
  return C
}

/* ──────────────────────────  主函式 / main routine  ────────────────────────── */

export function mixedAnova(rows, betweenVar, conditionVars) {
  if (!betweenVar) return { error: 'pickBetween' }
  if (!Array.isArray(conditionVars) || conditionVars.length < 2) {
    return { error: 'needAtLeast2' }
  }
  const b = conditionVars.length

  // listwise deletion / 任一欄缺值即剔除
  const cleaned = []
  for (const r of rows) {
    const grp = r[betweenVar]
    if (isMissing(grp)) continue
    let ok = true
    const vals = new Array(b)
    for (let j = 0; j < b; j++) {
      const raw = r[conditionVars[j]]
      if (isMissing(raw)) { ok = false; break }
      const num = Number(raw)
      if (!Number.isFinite(num)) { ok = false; break }
      vals[j] = num
    }
    if (!ok) continue
    cleaned.push({ group: String(grp), values: vals })
  }
  const N = cleaned.length
  if (N < 2) return { error: 'tooFewN', meta: { n: N } }

  // 收集分組 / group levels（依出現順序，穩定排序）
  const levelSet = []
  const seen = new Set()
  for (const row of cleaned) {
    if (!seen.has(row.group)) { seen.add(row.group); levelSet.push(row.group) }
  }
  const a = levelSet.length
  if (a < 2) return { error: 'needAtLeast2Groups', meta: { a } }

  // 依 group 分桶 / bucket subjects by group
  const groupIdx = Object.fromEntries(levelSet.map((g, i) => [g, i]))
  const bucketed = levelSet.map(() => []) // bucketed[g] = array of {values: [b]}
  for (const row of cleaned) {
    bucketed[groupIdx[row.group]].push(row.values)
  }
  const nPerGroup = bucketed.map((arr) => arr.length)
  if (nPerGroup.some((n) => n < 2)) {
    return { error: 'tooFewPerGroup', meta: { nPerGroup } }
  }

  /* ────── 描述統計：每組 × 每條件的 mean/sd/n ────── */
  // cellMean[g][j], cellSD[g][j]
  const cellMean = levelSet.map(() => new Array(b).fill(0))
  const cellSD = levelSet.map(() => new Array(b).fill(0))
  for (let g = 0; g < a; g++) {
    const ng = nPerGroup[g]
    for (let j = 0; j < b; j++) {
      let s = 0
      for (let i = 0; i < ng; i++) s += bucketed[g][i][j]
      cellMean[g][j] = s / ng
    }
    for (let j = 0; j < b; j++) {
      let ss = 0
      for (let i = 0; i < ng; i++) {
        const d = bucketed[g][i][j] - cellMean[g][j]
        ss += d * d
      }
      cellSD[g][j] = ng > 1 ? Math.sqrt(ss / (ng - 1)) : 0
    }
  }

  // 組均值 Ȳ_g.. / group means across conditions
  const groupMean = new Array(a).fill(0)
  for (let g = 0; g < a; g++) {
    let s = 0
    for (let j = 0; j < b; j++) s += cellMean[g][j]
    groupMean[g] = s / b
  }

  // 條件均值 Ȳ_..j / condition means across groups (weighted by ng)
  const condMean = new Array(b).fill(0)
  for (let j = 0; j < b; j++) {
    let s = 0
    for (let g = 0; g < a; g++) s += cellMean[g][j] * nPerGroup[g]
    condMean[j] = s / N
  }

  // 總均值 / grand mean
  let grandSum = 0
  for (let g = 0; g < a; g++) {
    for (let j = 0; j < b; j++) grandSum += cellMean[g][j] * nPerGroup[g]
  }
  const grandMean = grandSum / (N * b)

  // 受試者均值（across conditions）/ subject means
  // subjMean[g][i]
  const subjMean = bucketed.map((arr) => arr.map((vals) => {
    let s = 0
    for (let j = 0; j < b; j++) s += vals[j]
    return s / b
  }))

  /* ────── SS 拆解 / SS decomposition ────── */
  // SS_total
  let ssTotal = 0
  for (let g = 0; g < a; g++) {
    for (let i = 0; i < nPerGroup[g]; i++) {
      for (let j = 0; j < b; j++) {
        const d = bucketed[g][i][j] - grandMean
        ssTotal += d * d
      }
    }
  }

  // 被試間 SS_BS = b · Σ_g Σ_i (Ȳ_gi. - Ȳ)²
  let ssBS = 0
  for (let g = 0; g < a; g++) {
    for (let i = 0; i < nPerGroup[g]; i++) {
      const d = subjMean[g][i] - grandMean
      ssBS += d * d
    }
  }
  ssBS *= b

  // SS_A = b · Σ_g n_g · (Ȳ_g.. - Ȳ)²
  let ssA = 0
  for (let g = 0; g < a; g++) {
    const d = groupMean[g] - grandMean
    ssA += nPerGroup[g] * d * d
  }
  ssA *= b

  // SS_subjects(A) = SS_BS - SS_A = b · Σ_g Σ_i (Ȳ_gi. - Ȳ_g..)²
  const ssSubjWithinA = ssBS - ssA

  // 被試內 SS_WS
  const ssWS = ssTotal - ssBS

  // SS_B = N · Σ_j (Ȳ_..j - Ȳ)²
  let ssB = 0
  for (let j = 0; j < b; j++) {
    const d = condMean[j] - grandMean
    ssB += d * d
  }
  ssB *= N

  // SS_AB = Σ_g n_g · Σ_j (Ȳ_g.j - Ȳ_g.. - Ȳ_..j + Ȳ)²
  let ssAB = 0
  for (let g = 0; g < a; g++) {
    let s = 0
    for (let j = 0; j < b; j++) {
      const d = cellMean[g][j] - groupMean[g] - condMean[j] + grandMean
      s += d * d
    }
    ssAB += nPerGroup[g] * s
  }

  // SS_error_within = SS_WS - SS_B - SS_AB
  const ssErrorWithin = ssWS - ssB - ssAB

  /* ────── df ────── */
  const dfA = a - 1
  const dfSubjWithinA = N - a
  const dfB = b - 1
  const dfAB = (a - 1) * (b - 1)
  const dfErrorWithin = (b - 1) * (N - a)

  /* ────── MS、F、p、partial η² ────── */
  const msA = dfA > 0 ? ssA / dfA : NaN
  const msSubjWithinA = dfSubjWithinA > 0 ? ssSubjWithinA / dfSubjWithinA : NaN
  const msB = dfB > 0 ? ssB / dfB : NaN
  const msAB = dfAB > 0 ? ssAB / dfAB : NaN
  const msErrorWithin = dfErrorWithin > 0 ? ssErrorWithin / dfErrorWithin : NaN

  const fA = msSubjWithinA > 0 ? msA / msSubjWithinA : Infinity
  const fB = msErrorWithin > 0 ? msB / msErrorWithin : Infinity
  const fAB = msErrorWithin > 0 ? msAB / msErrorWithin : Infinity

  const pA = pF(fA, dfA, dfSubjWithinA)
  const pB = pF(fB, dfB, dfErrorWithin)
  const pAB = pF(fAB, dfAB, dfErrorWithin)

  const partialEta2A =
    ssA + ssSubjWithinA === 0 ? NaN : ssA / (ssA + ssSubjWithinA)
  const partialEta2B =
    ssB + ssErrorWithin === 0 ? NaN : ssB / (ssB + ssErrorWithin)
  const partialEta2AB =
    ssAB + ssErrorWithin === 0 ? NaN : ssAB / (ssAB + ssErrorWithin)

  /* ────── 球形檢定（Mauchly）+ ε 校正：使用 pooled within-group covariance ────── */
  let mauchly = { w: NaN, chi2: NaN, df: NaN, p: NaN, applicable: false }
  let ggEps = 1
  let hfEps = 1
  const lbEps = 1 / (b - 1)

  if (b >= 3) {
    const dim = b - 1
    const C = helmertContrasts(b)
    // 對每位受試者套用 contrasts → Yc (per subject, dim-vector)
    // 然後對每組扣除組均值 → 得 pooled within-group residuals
    // 累加 cross-product 矩陣 W_pooled，再除以 ν = N - a 得 S
    const W = []
    for (let r = 0; r < dim; r++) W.push(new Array(dim).fill(0))

    for (let g = 0; g < a; g++) {
      const ng = nPerGroup[g]
      // 先求該組所有受試者 contrast 向量的均值
      const groupContrastMean = new Array(dim).fill(0)
      const Yc = []
      for (let i = 0; i < ng; i++) {
        const v = new Array(dim).fill(0)
        for (let r = 0; r < dim; r++) {
          let s = 0
          for (let j = 0; j < b; j++) s += C[r][j] * bucketed[g][i][j]
          v[r] = s
          groupContrastMean[r] += s
        }
        Yc.push(v)
      }
      for (let r = 0; r < dim; r++) groupContrastMean[r] /= ng
      // 累加 (Yc_i - mean) (Yc_i - mean)' 到 W
      for (let i = 0; i < ng; i++) {
        for (let r = 0; r < dim; r++) {
          const dr = Yc[i][r] - groupContrastMean[r]
          for (let c = 0; c < dim; c++) {
            const dc = Yc[i][c] - groupContrastMean[c]
            W[r][c] += dr * dc
          }
        }
      }
    }
    const nu = N - a // pooled within df
    const S = []
    for (let r = 0; r < dim; r++) S.push(new Array(dim).fill(0))
    if (nu > 0) {
      for (let r = 0; r < dim; r++) {
        for (let c = 0; c < dim; c++) S[r][c] = W[r][c] / nu
      }
    }

    const trS = trace(S)
    const trS2 = traceSquared(S)
    const detS = det(S)

    // Mauchly's W
    let w = NaN
    let chi2 = NaN
    const dfM = (b * (b - 1)) / 2 - 1
    let pM = NaN
    const meanDiagPow = Math.pow(trS / dim, dim)
    if (meanDiagPow > 0 && Number.isFinite(detS) && detS > 0) {
      w = detS / meanDiagPow
      if (w > 0) {
        // 混合設計的修正常數使用 ν = N - a 取代 (n-1)
        const correction = 1 - (2 * dim * dim + dim + 2) / (6 * dim * nu)
        chi2 = -nu * correction * Math.log(w)
        if (Number.isFinite(chi2) && chi2 > 0 && dfM > 0) {
          pM = pChiSq(chi2, dfM)
        }
      }
    }
    mauchly = { w, chi2, df: dfM, p: pM, applicable: true }

    // GG epsilon
    if (trS2 > 0) {
      ggEps = (trS * trS) / (dim * trS2)
      if (!Number.isFinite(ggEps) || ggEps < lbEps) ggEps = lbEps
      if (ggEps > 1) ggEps = 1
    }
    // HF epsilon (mixed-design version)
    const numHF = nu * dim * ggEps - 2
    const denHF = dim * ((nu - 1) - dim * ggEps)
    if (denHF !== 0) {
      hfEps = numHF / denHF
      if (!Number.isFinite(hfEps) || hfEps > 1) hfEps = 1
      if (hfEps < lbEps) hfEps = lbEps
    } else {
      hfEps = 1
    }
  }

  // 對 (df_B, df_error_within) 與 (df_AB, df_error_within) 套 ε，重算 p
  const adjust = (eps) => {
    const dB = dfB * eps
    const dAB = dfAB * eps
    const dErr = dfErrorWithin * eps
    const pBadj = dB > 0 && dErr > 0 ? pF(fB, dB, dErr) : NaN
    const pABadj = dAB > 0 && dErr > 0 ? pF(fAB, dAB, dErr) : NaN
    return {
      eps,
      dfBAdj: dB,
      dfABAdj: dAB,
      dfErrorAdj: dErr,
      pB: pBadj,
      pAB: pABadj,
    }
  }

  /* ────── 描述統計輸出 / descriptives table ────── */
  const descriptives = []
  for (let g = 0; g < a; g++) {
    for (let j = 0; j < b; j++) {
      descriptives.push({
        level: levelSet[g],
        condition: conditionVars[j],
        mean: cellMean[g][j],
        sd: cellSD[g][j],
        n: nPerGroup[g],
      })
    }
  }

  return {
    n: N,
    a,
    b,
    levels: levelSet,
    conditions: conditionVars.slice(),
    nPerGroup,
    grandMean,
    groupMean,
    condMean,
    cellMean,
    cellSD,
    // SS / df
    ssTotal,
    ssBS,
    ssWS,
    ssA,
    dfA,
    ssSubjWithinA,
    dfSubjWithinA,
    ssB,
    dfB,
    ssAB,
    dfAB,
    ssErrorWithin,
    dfErrorWithin,
    // MS / F / p / partial eta-sq
    msA,
    msSubjWithinA,
    msB,
    msAB,
    msErrorWithin,
    fA, pA, partialEta2A,
    fB, pB, partialEta2B,
    fAB, pAB, partialEta2AB,
    // sphericity
    mauchly,
    gg: adjust(ggEps),
    hf: adjust(hfEps),
    lb: adjust(lbEps),
    descriptives,
  }
}
