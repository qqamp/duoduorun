/**
 * 重複量數變異數分析 — 一個受試者內因子
 * Repeated-measures ANOVA — one within-subjects factor
 *
 * 對外 API / Public API:
 *   repeatedAnova(rows, conditionVars) → 完整結果 / full result object
 *
 *   rows:           物件陣列 / array of row objects
 *   conditionVars:  ≥ 2 個欄位名（每個 = 一個測量條件 / time point）
 *                   ≥ 2 column names (each = one repeated condition)
 *
 * 流程 / Flow:
 *   1. listwise deletion（任一欄缺值即剔除整列 / drop rows with any NA）
 *   2. 計算 SS_total / SS_between-subjects / SS_within-subjects /
 *      SS_treatment / SS_error 與相對 df、F、p、partial η²、η²_G
 *   3. Mauchly's W 球形檢定（k ≥ 3）：用 Helmert 正交對比把 n×k 資料降為
 *      n×(k−1) 的對比矩陣，再算其樣本共變異矩陣 S，
 *      W = det(S) / (trace(S)/(k−1))^(k−1)
 *      χ² = −[ (n−1) − (2(k−1)² + (k−1) + 2) / (6(k−1)) ] · ln(W)
 *      df = (k−1)k/2 − 1
 *   4. Greenhouse-Geisser ε_GG = (trace S)² / [ (k−1) · trace(S²) ]
 *   5. Huynh-Feldt ε_HF = min{1, [ n(k−1)·ε_GG − 2 ] / [ (k−1)·((n−1) − (k−1)·ε_GG) ]}
 *   6. Lower-bound ε_LB = 1 / (k−1)
 *
 * Notes:
 *   - k = 2 時球形性自動成立 → 不報 Mauchly、ε ≡ 1。
 *   - F 不變，僅 df 乘以 ε 後重算 p。
 */
import { isMissing } from '../variableTypes.js'
import { pF, pChiSq } from './pvalue.js'

/* ──────────────────────────  小型矩陣工具 / matrix helpers  ────────────────────────── */

/** 用展開法計算方陣行列式（小尺寸：k−1 ≤ 數十） / determinant via LU expansion */
function det(M) {
  const n = M.length
  // 複製一份做高斯消去 / clone for Gauss elimination
  const A = M.map((row) => row.slice())
  let sign = 1
  for (let i = 0; i < n; i++) {
    // partial pivoting
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

/** 矩陣自身平方的 trace：tr(S · S) / trace of S squared */
function traceSquared(S) {
  const n = S.length
  let s = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      s += S[i][j] * S[j][i]
    }
  }
  return s
}

/** 矩陣 trace / matrix trace */
function trace(M) {
  let s = 0
  for (let i = 0; i < M.length; i++) s += M[i][i]
  return s
}

/* ──────────────────────────  Helmert 正交對比 / Helmert contrasts  ────────────────────────── */

/**
 * 產生 (k−1) × k 的 Helmert 正交對比矩陣，列向量已正規化為單位長度。
 * Each row contrasts level i with the mean of subsequent levels and is scaled
 * to unit norm so the contrast covariance corresponds to within-subject
 * sphericity assessment.
 */
function helmertContrasts(k) {
  const C = []
  for (let i = 0; i < k - 1; i++) {
    const row = new Array(k).fill(0)
    const remaining = k - i - 1
    row[i] = remaining
    for (let j = i + 1; j < k; j++) row[j] = -1
    // normalise to unit length / 正規化
    let norm = 0
    for (let j = 0; j < k; j++) norm += row[j] * row[j]
    norm = Math.sqrt(norm)
    for (let j = 0; j < k; j++) row[j] /= norm
    C.push(row)
  }
  return C
}

/* ──────────────────────────  主函式 / main routine  ────────────────────────── */

export function repeatedAnova(rows, conditionVars) {
  if (!Array.isArray(conditionVars) || conditionVars.length < 2) {
    return { error: 'needAtLeast2' }
  }
  const k = conditionVars.length

  // listwise deletion / 任一欄缺值即剔除
  const filtered = []
  for (const r of rows) {
    let ok = true
    const vals = new Array(k)
    for (let j = 0; j < k; j++) {
      const raw = r[conditionVars[j]]
      if (isMissing(raw)) { ok = false; break }
      const num = Number(raw)
      if (!Number.isFinite(num)) { ok = false; break }
      vals[j] = num
    }
    if (ok) filtered.push(vals)
  }
  const n = filtered.length
  if (n < 2) return { error: 'tooFewN', meta: { n } }

  // 描述統計 / per-condition descriptives
  const condMeans = new Array(k).fill(0)
  const condSums = new Array(k).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) condSums[j] += filtered[i][j]
  }
  for (let j = 0; j < k; j++) condMeans[j] = condSums[j] / n

  const condSDs = new Array(k).fill(0)
  for (let j = 0; j < k; j++) {
    let ss = 0
    for (let i = 0; i < n; i++) {
      const d = filtered[i][j] - condMeans[j]
      ss += d * d
    }
    condSDs[j] = n > 1 ? Math.sqrt(ss / (n - 1)) : 0
  }

  // 受試者均值 / subject means + 總均值 / grand mean
  const subjMeans = new Array(n).fill(0)
  let grandSum = 0
  for (let i = 0; i < n; i++) {
    let s = 0
    for (let j = 0; j < k; j++) s += filtered[i][j]
    subjMeans[i] = s / k
    grandSum += s
  }
  const grandMean = grandSum / (n * k)

  // SS 拆解 / SS decomposition
  let ssTotal = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      const d = filtered[i][j] - grandMean
      ssTotal += d * d
    }
  }
  let ssBS = 0
  for (let i = 0; i < n; i++) {
    const d = subjMeans[i] - grandMean
    ssBS += d * d
  }
  ssBS *= k
  const ssWS = ssTotal - ssBS

  let ssTreat = 0
  for (let j = 0; j < k; j++) {
    const d = condMeans[j] - grandMean
    ssTreat += d * d
  }
  ssTreat *= n
  const ssError = ssWS - ssTreat

  const dfTotal = n * k - 1
  const dfBS = n - 1
  const dfWS = n * (k - 1)
  const dfTreat = k - 1
  const dfError = (n - 1) * (k - 1)

  const msTreat = dfTreat > 0 ? ssTreat / dfTreat : NaN
  const msError = dfError > 0 ? ssError / dfError : NaN
  const f = msError > 0 ? msTreat / msError : Infinity
  const p = pF(f, dfTreat, dfError)

  const partialEta2 = ssTreat + ssError === 0 ? NaN : ssTreat / (ssTreat + ssError)
  const etaG2 =
    ssTreat + ssBS + ssError === 0 ? NaN : ssTreat / (ssTreat + ssBS + ssError)

  /* ──────  球形檢定（Mauchly）+ ε 校正  ────── */
  let mauchly = { w: NaN, chi2: NaN, df: NaN, p: NaN, applicable: false }
  let ggEps = 1
  let hfEps = 1
  const lbEps = 1 / (k - 1)

  if (k >= 3) {
    // (k−1) × k Helmert contrasts
    const C = helmertContrasts(k)
    // Y_contrast (n × (k−1))：對每位受試者套用 contrasts
    const Yc = []
    for (let i = 0; i < n; i++) {
      const row = new Array(k - 1).fill(0)
      for (let r = 0; r < k - 1; r++) {
        let s = 0
        for (let j = 0; j < k; j++) s += C[r][j] * filtered[i][j]
        row[r] = s
      }
      Yc.push(row)
    }
    // 樣本共變異矩陣 S（k−1 × k−1） / sample covariance
    const dim = k - 1
    const Ymean = new Array(dim).fill(0)
    for (let i = 0; i < n; i++) {
      for (let r = 0; r < dim; r++) Ymean[r] += Yc[i][r]
    }
    for (let r = 0; r < dim; r++) Ymean[r] /= n

    const S = []
    for (let r = 0; r < dim; r++) S.push(new Array(dim).fill(0))
    for (let i = 0; i < n; i++) {
      for (let r = 0; r < dim; r++) {
        const dr = Yc[i][r] - Ymean[r]
        for (let c = 0; c < dim; c++) {
          const dc = Yc[i][c] - Ymean[c]
          S[r][c] += dr * dc
        }
      }
    }
    const denom = n - 1
    if (denom > 0) {
      for (let r = 0; r < dim; r++) {
        for (let c = 0; c < dim; c++) S[r][c] /= denom
      }
    }

    const trS = trace(S)
    const trS2 = traceSquared(S)
    const detS = det(S)

    // Mauchly's W
    let w = NaN
    let chi2 = NaN
    let dfM = (k * (k - 1)) / 2 - 1
    let pM = NaN
    const meanDiagPow = Math.pow(trS / dim, dim)
    if (meanDiagPow > 0 && Number.isFinite(detS) && detS > 0) {
      w = detS / meanDiagPow
      if (w > 0) {
        const correction = 1 - (2 * dim * dim + dim + 2) / (6 * dim * (n - 1))
        // 等價於 −[ (n−1) − (2(k−1)² + (k−1) + 2)/(6(k−1)) ] · ln(W)
        chi2 = -(n - 1) * correction * Math.log(w)
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
    // HF epsilon
    const numHF = n * dim * ggEps - 2
    const denHF = dim * ((n - 1) - dim * ggEps)
    if (denHF !== 0) {
      hfEps = numHF / denHF
      if (!Number.isFinite(hfEps) || hfEps > 1) hfEps = 1
      if (hfEps < lbEps) hfEps = lbEps
    } else {
      hfEps = 1
    }
  }

  const adjust = (eps) => {
    const dT = dfTreat * eps
    const dE = dfError * eps
    const pAdj = dT > 0 && dE > 0 ? pF(f, dT, dE) : NaN
    return { eps, dfTreat: dT, dfError: dE, p: pAdj }
  }

  return {
    n,
    k,
    conditions: conditionVars.slice(),
    means: condMeans,
    sd: condSDs,
    grandMean,
    ssTotal,
    ssBS,
    ssWS,
    ssTreat,
    ssError,
    dfTotal,
    dfBS,
    dfWS,
    dfTreat,
    dfError,
    msTreat,
    msError,
    f,
    p,
    partialEta2,
    etaG2,
    mauchly,
    gg: adjust(ggEps),
    hf: adjust(hfEps),
    lb: adjust(lbEps),
  }
}
