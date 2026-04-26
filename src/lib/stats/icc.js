/**
 * ICC 組內相關係數（Intraclass Correlation Coefficient）
 *
 * Shrout, P. E., & Fleiss, J. L. (1979). Intraclass correlations: Uses in
 * assessing rater reliability. Psychological Bulletin, 86(2), 420–428.
 *
 * 對外 API：
 *   icc(rows, raterVars) → 完整結果（6 種 ICC 變體 + 95% CI + F 檢定）
 *
 * 設計：
 *   - 輸入：n × k 矩陣（每列 = 一位受試者；每欄 = 一位評分者）
 *   - listwise deletion：任一欄缺值即剔除該列
 *   - 兩個 ANOVA 分解：
 *       (a) 單因子（one-way）：SS_total = SS_R + SS_W
 *       (b) 兩因子無交互（two-way no-interaction）：
 *           SS_total = SS_R + SS_C + SS_E
 *
 *   均方：
 *     MS_R = SS_R / (n - 1)
 *     MS_C = SS_C / (k - 1)
 *     MS_E = SS_E / ((n - 1)(k - 1))
 *     MS_W = SS_W / (n(k - 1))         // 兩因子框架下 SS_W = SS_C + SS_E
 *
 *   六種變體（Shrout & Fleiss 1979）：
 *     ICC(1,1) = (MS_R - MS_W) / (MS_R + (k-1)·MS_W)
 *     ICC(1,k) = (MS_R - MS_W) / MS_R
 *     ICC(2,1) = (MS_R - MS_E) / (MS_R + (k-1)·MS_E + k·(MS_C - MS_E)/n)
 *     ICC(2,k) = (MS_R - MS_E) / (MS_R + (MS_C - MS_E)/n)
 *     ICC(3,1) = (MS_R - MS_E) / (MS_R + (k-1)·MS_E)
 *     ICC(3,k) = (MS_R - MS_E) / MS_R
 *
 *   F 檢定：
 *     ICC(1,*)：F = MS_R / MS_W ; df = (n-1, n(k-1))
 *     ICC(2,*) / ICC(3,*)：F = MS_R / MS_E ; df = (n-1, (n-1)(k-1))
 *
 *   95% CI：使用 Shrout & Fleiss (1979) 的 F 分位數公式（單側 α/2 = .025）。
 *
 * Intraclass correlation: full Shrout & Fleiss (1979) 6-variant computation
 * with 95% CIs and F tests. Listwise deletion across rater columns.
 */
import { isMissing } from '../variableTypes.js'
import { pF } from './pvalue.js'

/* ──────────────────  小工具  ────────────────── */

const sum = (a) => a.reduce((s, v) => s + v, 0)
const mean = (a) => sum(a) / a.length

/**
 * F 分布逆 CDF — 用 bisection 在 pF（右尾 p）上反解。
 * qF(p, d1, d2) = x，使 P(F > x) = 1 - p（即累積到 p 的位點）
 * 為求 95% CI，常用 1 - α/2 = .975 與 α/2 = .025。
 * Inverse F CDF via bisection on the right-tail pF.
 */
function qF(p, d1, d2) {
  // p 是「左尾累積機率」 → 右尾 = 1 - p
  const targetRight = 1 - p
  let lo = 1e-8
  let hi = 1e6
  // 確保 lo, hi 把 targetRight 夾住
  for (let i = 0; i < 80; i++) {
    const mid = 0.5 * (lo + hi)
    const r = pF(mid, d1, d2)
    if (r > targetRight) lo = mid
    else hi = mid
    if (hi - lo < 1e-10) break
  }
  return 0.5 * (lo + hi)
}

/* ──────────────────  主函式  ────────────────── */

export function icc(rows, raterVars) {
  const k = (raterVars || []).length
  if (k < 2) return { error: 'needAtLeast2Raters' }

  // listwise deletion：任一欄缺值即剔除整列
  const filtered = (rows || []).filter((r) =>
    raterVars.every((c) => {
      const v = r[c]
      if (isMissing(v)) return false
      return Number.isFinite(Number(v))
    })
  )
  const n = filtered.length
  const droppedRows = (rows?.length || 0) - n
  if (n < 3) return { error: 'needAtLeast3Subjects', meta: { n } }

  // 建構 n×k 矩陣 X[i][j]
  const X = filtered.map((r) => raterVars.map((c) => Number(r[c])))

  // 列均值（受試者均值）、欄均值（評分者均值）、總均值
  const rowMeans = X.map((row) => mean(row))
  const colMeans = raterVars.map((_, j) => mean(X.map((row) => row[j])))
  const grand = mean(rowMeans)

  // SS 分解
  // SS_total = ΣΣ (x_ij - grand)²
  let SS_total = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < k; j++) {
      const d = X[i][j] - grand
      SS_total += d * d
    }
  }
  // SS_R = k · Σ (rowMean_i - grand)²
  let SS_R = 0
  for (let i = 0; i < n; i++) {
    const d = rowMeans[i] - grand
    SS_R += d * d
  }
  SS_R *= k
  // SS_C = n · Σ (colMean_j - grand)²
  let SS_C = 0
  for (let j = 0; j < k; j++) {
    const d = colMeans[j] - grand
    SS_C += d * d
  }
  SS_C *= n
  // SS_E（殘差，兩因子無交互）= SS_total - SS_R - SS_C
  const SS_E = SS_total - SS_R - SS_C
  // SS_W（受試者內變異，單因子）= SS_total - SS_R = SS_C + SS_E
  const SS_W = SS_total - SS_R

  // df
  const dfR = n - 1
  const dfC = k - 1
  const dfE = (n - 1) * (k - 1)
  const dfW = n * (k - 1)

  // MS
  const MS_R = SS_R / dfR
  const MS_C = dfC > 0 ? SS_C / dfC : NaN
  const MS_E = dfE > 0 ? SS_E / dfE : NaN
  const MS_W = dfW > 0 ? SS_W / dfW : NaN

  // ───── 6 種 ICC 點估計 ─────
  const icc1_1 = (MS_R - MS_W) / (MS_R + (k - 1) * MS_W)
  const icc1_k = (MS_R - MS_W) / MS_R
  const icc2_1 =
    (MS_R - MS_E) / (MS_R + (k - 1) * MS_E + (k * (MS_C - MS_E)) / n)
  const icc2_k = (MS_R - MS_E) / (MS_R + (MS_C - MS_E) / n)
  const icc3_1 = (MS_R - MS_E) / (MS_R + (k - 1) * MS_E)
  const icc3_k = (MS_R - MS_E) / MS_R

  // ───── F 檢定 ─────
  // ICC(1,*)：F = MS_R / MS_W；df = (dfR, dfW)
  const F1 = MS_R / MS_W
  const p1 = pF(F1, dfR, dfW)
  // ICC(2,*) 與 ICC(3,*)：F = MS_R / MS_E；df = (dfR, dfE)
  const F23 = MS_R / MS_E
  const p23 = pF(F23, dfR, dfE)

  // ───── 95% CI（Shrout & Fleiss 1979） ─────
  // alpha = .05，雙側 → 用 .975 與 .025 兩個分位數
  const a = 0.05
  const FU1 = qF(1 - a / 2, dfR, dfW) // F 上分位數
  const FL1 = qF(1 - a / 2, dfW, dfR) // 反向 (df 互換) 用於下界

  // ICC(1,1) CI：
  //   F* = MS_R / MS_W
  //   FL = F* / qF(.975, dfR, dfW)；FU = F* · qF(.975, dfW, dfR)
  //   lower = (FL - 1) / (FL + k - 1)
  //   upper = (FU - 1) / (FU + k - 1)
  const FL_11 = F1 / FU1
  const FU_11 = F1 * FL1
  const ci_11_low = (FL_11 - 1) / (FL_11 + (k - 1))
  const ci_11_high = (FU_11 - 1) / (FU_11 + (k - 1))

  // ICC(1,k) CI：把 ICC(1,1) 的 FL/FU 套入下式
  //   lower = 1 - 1/FL
  //   upper = 1 - 1/FU
  const ci_1k_low = 1 - 1 / FL_11
  const ci_1k_high = 1 - 1 / FU_11

  // ICC(3,1) CI：
  //   F* = MS_R / MS_E
  //   FL = F* / qF(.975, dfR, dfE)；FU = F* · qF(.975, dfE, dfR)
  const FU3 = qF(1 - a / 2, dfR, dfE)
  const FL3 = qF(1 - a / 2, dfE, dfR)
  const FL_31 = F23 / FU3
  const FU_31 = F23 * FL3
  const ci_31_low = (FL_31 - 1) / (FL_31 + (k - 1))
  const ci_31_high = (FU_31 - 1) / (FU_31 + (k - 1))

  // ICC(3,k) CI：
  //   lower = 1 - 1/FL；upper = 1 - 1/FU
  const ci_3k_low = 1 - 1 / FL_31
  const ci_3k_high = 1 - 1 / FU_31

  // ICC(2,1) CI（Shrout-Fleiss 較複雜的近似式）
  // 設 r = ICC(2,1)
  //   Fs = qF(.975, dfR, v) 與 qF(.975, v, dfR)，v 由近似式給出
  //   v = (a·MS_C + b·MS_E)² / (a²·MS_C²/(k-1) + b²·MS_E²/((n-1)(k-1)))
  //   a = k·r / (n·(1 - r))
  //   b = 1 + k·r·(n - 1) / (n·(1 - r))
  //   FL = MS_R / (MS_E · qF(.975, dfR, v))
  //   FU = MS_R · qF(.975, v, dfR) / MS_E
  //   lower = n·(MS_R - FL·MS_E) / (FL·(k·MS_C + (k·n - k - n)·MS_E) + n·MS_R)
  //   upper = n·(FU·MS_R - MS_E) / (k·MS_C + (k·n - k - n)·MS_E + n·FU·MS_R)
  // 注意：當 MS_C ≤ MS_E 時 r 近 0、v 退化；做安全保護
  let ci_21_low = NaN
  let ci_21_high = NaN
  if (Number.isFinite(icc2_1)) {
    const r = icc2_1
    const denom = n * (1 - r)
    const aa = (k * r) / (denom === 0 ? 1e-12 : denom)
    const bb = 1 + (k * r * (n - 1)) / (denom === 0 ? 1e-12 : denom)
    const vNum = Math.pow(aa * MS_C + bb * MS_E, 2)
    const vDen =
      (aa * aa * MS_C * MS_C) / (k - 1) +
      (bb * bb * MS_E * MS_E) / ((n - 1) * (k - 1))
    const v = vDen > 0 ? vNum / vDen : dfE
    const Fa = qF(1 - a / 2, dfR, v)
    const Fb = qF(1 - a / 2, v, dfR)
    const FL_21 = MS_R / (MS_E * Fa)
    const FU_21 = (MS_R * Fb) / MS_E
    ci_21_low =
      (n * (MS_R - FL_21 * MS_E)) /
      (FL_21 * (k * MS_C + (k * n - k - n) * MS_E) + n * MS_R)
    ci_21_high =
      (n * (FU_21 * MS_R - MS_E)) /
      (k * MS_C + (k * n - k - n) * MS_E + n * FU_21 * MS_R)
  }

  // ICC(2,k) CI：透過 ICC(2,1) 的 lower/upper 轉成平均評分形式
  //   ICC(2,k) bound = k · bound(2,1) / (1 + (k - 1) · bound(2,1))
  const toAvg = (r) => (k * r) / (1 + (k - 1) * r)
  const ci_2k_low = Number.isFinite(ci_21_low) ? toAvg(ci_21_low) : NaN
  const ci_2k_high = Number.isFinite(ci_21_high) ? toAvg(ci_21_high) : NaN

  // 包成 variants 陣列
  const variants = [
    {
      key: 'icc1_1',
      value: icc1_1,
      ciLow: ci_11_low,
      ciHigh: ci_11_high,
      f: F1,
      dfNum: dfR,
      dfDen: dfW,
      p: p1,
    },
    {
      key: 'icc1_k',
      value: icc1_k,
      ciLow: ci_1k_low,
      ciHigh: ci_1k_high,
      f: F1,
      dfNum: dfR,
      dfDen: dfW,
      p: p1,
    },
    {
      key: 'icc2_1',
      value: icc2_1,
      ciLow: ci_21_low,
      ciHigh: ci_21_high,
      f: F23,
      dfNum: dfR,
      dfDen: dfE,
      p: p23,
    },
    {
      key: 'icc2_k',
      value: icc2_k,
      ciLow: ci_2k_low,
      ciHigh: ci_2k_high,
      f: F23,
      dfNum: dfR,
      dfDen: dfE,
      p: p23,
    },
    {
      key: 'icc3_1',
      value: icc3_1,
      ciLow: ci_31_low,
      ciHigh: ci_31_high,
      f: F23,
      dfNum: dfR,
      dfDen: dfE,
      p: p23,
    },
    {
      key: 'icc3_k',
      value: icc3_k,
      ciLow: ci_3k_low,
      ciHigh: ci_3k_high,
      f: F23,
      dfNum: dfR,
      dfDen: dfE,
      p: p23,
    },
  ]

  return {
    n,
    k,
    raters: [...raterVars],
    droppedRows,
    ms: { msR: MS_R, msC: MS_C, msE: MS_E, msW: MS_W },
    ss: { ssR: SS_R, ssC: SS_C, ssE: SS_E, ssW: SS_W, ssTotal: SS_total },
    df: { dfR, dfC, dfE, dfW },
    variants,
  }
}

/**
 * Koo & Li (2016) 解讀慣例：
 *   < 0.50  poor
 *   0.50–0.75 moderate
 *   0.75–0.90 good
 *   ≥ 0.90  excellent
 *
 * 注意：這是「reliability」而非「validity」的解讀；< 0 視為 poor。
 */
export function iccInterpretationKey(value) {
  if (!Number.isFinite(value)) return null
  if (value < 0.5) return 'poor'
  if (value < 0.75) return 'moderate'
  if (value < 0.9) return 'good'
  return 'excellent'
}
