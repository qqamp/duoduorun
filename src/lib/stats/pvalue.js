/**
 * p-value 數值方法
 *
 * 來源：Numerical Recipes — regularized incomplete beta function 為基礎，
 *       由此推導 t / F 分布的尾端機率。
 *
 * 對外 API：
 *   lgamma(x)        — log Γ(x)
 *   betacf(x, a, b)  — incomplete beta function 連分數展開
 *   ibeta(x, a, b)   — regularized incomplete beta function I_x(a, b)
 *   pT(t, df)        — Student's t two-tailed p-value
 *   pF(f, d1, d2)    — F distribution right-tail p-value
 *
 * 截斷誤差：MAXIT=200, EPS=3e-7 → p-value 精度 < 1e-6（足夠統計報告使用）
 *
 * 從 reference/statlite.jsx 抽出，已對標過 SPSS / R 結果。
 */

export function lgamma(x) {
  const c = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5,
  ]
  let y = x
  let tmp = x + 5.5
  tmp -= (x + 0.5) * Math.log(tmp)
  let ser = 1.000000000190015
  for (let j = 0; j < 6; j++) ser += c[j] / ++y
  return -tmp + Math.log((2.5066282746310005 * ser) / x)
}

export function betacf(x, a, b) {
  const MAXIT = 200
  const EPS = 3e-7
  const FPMIN = 1e-30
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  if (Math.abs(d) < FPMIN) d = FPMIN
  d = 1 / d
  let h = d
  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < FPMIN) d = FPMIN
    c = 1 + aa / c
    if (Math.abs(c) < FPMIN) c = FPMIN
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < FPMIN) d = FPMIN
    c = 1 + aa / c
    if (Math.abs(c) < FPMIN) c = FPMIN
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS) break
  }
  return h
}

export function ibeta(x, a, b) {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const lbet = lgamma(a) + lgamma(b) - lgamma(a + b)
  const bt = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lbet)
  return x < (a + 1) / (a + b + 2)
    ? (bt * betacf(x, a, b)) / a
    : 1 - (bt * betacf(1 - x, b, a)) / b
}

/** Student's t 雙尾 p-value */
export function pT(t, df) {
  return ibeta(df / (df + t * t), df / 2, 0.5)
}

/** F 分布右尾 p-value */
export function pF(f, d1, d2) {
  return ibeta(d2 / (d2 + d1 * f), d2 / 2, d1 / 2)
}
