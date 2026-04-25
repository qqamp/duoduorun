/**
 * 盒鬚圖統計量
 *
 * boxStats(values) → { min, q1, median, q3, max, lower, upper, outliers }
 *
 *   q1 / q3 / median：第 25/50/75 百分位
 *   IQR = q3 - q1
 *   lower = max(min, q1 - 1.5·IQR)  下鬚（whisker）
 *   upper = min(max, q3 + 1.5·IQR)  上鬚
 *   outliers = 落在 [lower, upper] 之外的觀察值
 */
function quantile(sorted, q) {
  const n = sorted.length
  if (n === 0) return NaN
  const pos = (n - 1) * q
  const lo = Math.floor(pos)
  const hi = Math.ceil(pos)
  if (lo === hi) return sorted[lo]
  const frac = pos - lo
  return sorted[lo] * (1 - frac) + sorted[hi] * frac
}

export function boxStats(values) {
  const filtered = values.filter((v) => Number.isFinite(v))
  const n = filtered.length
  if (n < 4) {
    return {
      n, min: NaN, q1: NaN, median: NaN, q3: NaN, max: NaN,
      lower: NaN, upper: NaN, outliers: [],
    }
  }
  const sorted = [...filtered].sort((a, b) => a - b)
  const q1 = quantile(sorted, 0.25)
  const median = quantile(sorted, 0.5)
  const q3 = quantile(sorted, 0.75)
  const iqr = q3 - q1
  const lo = q1 - 1.5 * iqr
  const hi = q3 + 1.5 * iqr
  let lower = sorted[0]
  let upper = sorted[n - 1]
  const outliers = []
  // 找鬚位
  for (const v of sorted) {
    if (v >= lo) { lower = v; break }
  }
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i] <= hi) { upper = sorted[i]; break }
  }
  for (const v of sorted) {
    if (v < lo || v > hi) outliers.push(v)
  }
  return {
    n,
    min: sorted[0],
    max: sorted[n - 1],
    q1, median, q3,
    lower, upper,
    outliers,
  }
}
