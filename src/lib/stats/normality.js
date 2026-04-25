/**
 * Shapiro-Wilk 常態性檢定
 *
 * 演算法：Royston (1992) AS R94 — 適用 n ∈ [3, 5000]。
 * 對標 R::shapiro.test 與 SPSS / JASP 的 Shapiro-Wilk 結果，
 * 在常見樣本範圍內 p-value 通常一致到小數第 3-4 位。
 *
 * 對外 API：
 *   shapiroWilk(samples) → { W, p, n }
 *
 * 解讀：
 *   - 虛無假設 H₀：樣本來自常態分布
 *   - p < α（預設 .05）→ 拒絕 H₀ → 違反常態性
 *
 * 限制：
 *   - n < 3：無法計算
 *   - n > 5000：演算法精度下降，不推薦
 *
 * 參考：
 *   Royston, P. (1992). "Approximating the Shapiro-Wilk W-test for non-normality."
 *   Statistics and Computing, 2(3), 117-119.
 */
import { mean } from './descriptive.js'
import { qnorm, normalCdf } from './pvalue.js'

export function shapiroWilk(samples) {
  const x = [...samples].sort((a, b) => a - b)
  const n = x.length

  if (n < 3 || n > 5000) {
    return { W: NaN, p: NaN, n, error: 'sample-size-out-of-range' }
  }

  // ── Step 1：Blom plotting positions m_i = Φ⁻¹((i - 3/8) / (n + 1/4)) ──
  const m = new Array(n)
  for (let i = 0; i < n; i++) {
    m[i] = qnorm((i + 1 - 0.375) / (n + 0.25))
  }
  const m2Sum = m.reduce((s, mi) => s + mi * mi, 0)
  const sqrtM2 = Math.sqrt(m2Sum)

  // ── Step 2：Royston 對 a_n 與 a_{n-1} 的修正多項式 ──
  const u = 1 / Math.sqrt(n)
  const an =
    -2.706056 * Math.pow(u, 5) +
    4.434685 * Math.pow(u, 4) +
    -2.07119 * Math.pow(u, 3) +
    -0.147981 * Math.pow(u, 2) +
    0.221157 * u +
    m[n - 1] / sqrtM2

  let an1 = 0
  if (n >= 6) {
    an1 =
      -3.582633 * Math.pow(u, 5) +
      5.682633 * Math.pow(u, 4) +
      -1.75246 * Math.pow(u, 3) +
      -0.293762 * Math.pow(u, 2) +
      0.042981 * u +
      m[n - 2] / sqrtM2
  }

  // ── Step 3：剩餘的 a_i ──
  const a = new Array(n)
  if (n === 3) {
    // n=3 特例：Royston 給出固定值
    a[0] = -0.7071
    a[1] = 0
    a[2] = 0.7071
  } else if (n <= 5) {
    const eps = (m2Sum - 2 * m[n - 1] * m[n - 1]) / (1 - 2 * an * an)
    a[0] = -an
    a[n - 1] = an
    for (let i = 1; i < n - 1; i++) {
      a[i] = m[i] / Math.sqrt(eps)
    }
  } else {
    const eps =
      (m2Sum - 2 * m[n - 1] * m[n - 1] - 2 * m[n - 2] * m[n - 2]) /
      (1 - 2 * an * an - 2 * an1 * an1)
    a[0] = -an
    a[1] = -an1
    a[n - 1] = an
    a[n - 2] = an1
    for (let i = 2; i < n - 2; i++) {
      a[i] = m[i] / Math.sqrt(eps)
    }
  }

  // ── Step 4：W 統計量 ──
  let numerator = 0
  for (let i = 0; i < n; i++) numerator += a[i] * x[i]
  numerator = numerator * numerator

  const xMean = mean(x)
  let denominator = 0
  for (let i = 0; i < n; i++) {
    const d = x[i] - xMean
    denominator += d * d
  }

  if (denominator === 0) {
    return { W: 1, p: 1, n }
  }

  const W = numerator / denominator
  // W 應在 [0, 1] 範圍；由於數值誤差偶有微越界，clamp 一下
  const Wc = Math.max(0, Math.min(1, W))

  // ── Step 5：p-value 透過 Royston 對 ln(1-W) 的常態化轉換 ──
  let mu, sigma, z
  if (n <= 11) {
    const gamma = -2.273 + 0.459 * n
    const wTransform = -Math.log(gamma - Math.log(1 - Wc))
    mu = 0.5440 - 0.39978 * n + 0.025054 * n * n - 0.0006714 * n * n * n
    sigma = Math.exp(
      1.3822 - 0.77857 * n + 0.062767 * n * n - 0.0020322 * n * n * n
    )
    z = (wTransform - mu) / sigma
  } else {
    const lnW = Math.log(1 - Wc)
    const lnN = Math.log(n)
    mu =
      -1.5861 -
      0.31082 * lnN -
      0.083751 * lnN * lnN +
      0.0038915 * lnN * lnN * lnN
    sigma = Math.exp(-0.4803 - 0.082676 * lnN + 0.0030302 * lnN * lnN)
    z = (lnW - mu) / sigma
  }

  // p-value = 1 - Φ(z)（W 越小代表越偏離常態 → 對應 z 越大 → 右尾）
  const p = 1 - normalCdf(z)

  return { W: Wc, p: Math.max(0, Math.min(1, p)), n }
}
