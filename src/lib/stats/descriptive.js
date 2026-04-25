/**
 * 敘述統計核心數學函式
 *
 * 全部以 1D 數值陣列為輸入。**呼叫者負責先剔除遺漏值**。
 *
 * 對外 API：
 *   mean(arr)
 *   variance(arr, ddof=1)   — 預設無偏估計（n-1 分母），對齊 SPSS 預設
 *   sd(arr, ddof=1)
 *   se(arr, ddof=1)         — sd / sqrt(n)
 *   median(arr)
 *   skewness(arr)           — Fisher–Pearson, type 2（對齊 SPSS）
 *   kurtosis(arr)           — Fisher's definition, excess kurtosis（對齊 SPSS）
 *   describe(arr)           — 一次回傳 N/M/SD/SE/Min/Max/Median/Skew/Kurt 物件
 *
 * 偏度（skewness）公式：
 *     g1 = n / ((n-1)(n-2)) * Σ((x-M)/SD)³
 *
 * 峰度（kurtosis）公式：
 *     g2 = n(n+1) / ((n-1)(n-2)(n-3)) * Σ((x-M)/SD)⁴ - 3(n-1)² / ((n-2)(n-3))
 *
 * 注意：兩個公式都是 SPSS 預設的 unbiased 估計，與 R 的 e1071::skewness(type=2)
 *       / DescTools::Skew(method=2) 一致。
 *
 * 從 reference/statlite.jsx 抽出，已對標 SPSS。
 */

export function mean(arr) {
  if (arr.length === 0) return NaN
  let sum = 0
  for (const v of arr) sum += v
  return sum / arr.length
}

export function variance(arr, ddof = 1) {
  const n = arr.length
  if (n - ddof <= 0) return NaN
  const m = mean(arr)
  let sumSq = 0
  for (const v of arr) {
    const d = v - m
    sumSq += d * d
  }
  return sumSq / (n - ddof)
}

export function sd(arr, ddof = 1) {
  return Math.sqrt(variance(arr, ddof))
}

export function se(arr, ddof = 1) {
  if (arr.length === 0) return NaN
  return sd(arr, ddof) / Math.sqrt(arr.length)
}

export function median(arr) {
  if (arr.length === 0) return NaN
  const sorted = [...arr].sort((a, b) => a - b)
  const m = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[m] : (sorted[m - 1] + sorted[m]) / 2
}

export function min(arr) {
  return arr.length === 0 ? NaN : Math.min(...arr)
}

export function max(arr) {
  return arr.length === 0 ? NaN : Math.max(...arr)
}

/** Fisher-Pearson type 2（SPSS 與 R::e1071::skewness(type=2) 預設） */
export function skewness(arr) {
  const n = arr.length
  if (n < 3) return NaN
  const m = mean(arr)
  const s = sd(arr)
  if (s === 0) return NaN
  let acc = 0
  for (const v of arr) {
    const z = (v - m) / s
    acc += z * z * z
  }
  return (n / ((n - 1) * (n - 2))) * acc
}

/** Excess kurtosis, SPSS / R::e1071::kurtosis(type=2) 預設 */
export function kurtosis(arr) {
  const n = arr.length
  if (n < 4) return NaN
  const m = mean(arr)
  const s = sd(arr)
  if (s === 0) return NaN
  let acc = 0
  for (const v of arr) {
    const z = (v - m) / s
    acc += z * z * z * z
  }
  const term1 = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))
  const term2 = (3 * (n - 1) * (n - 1)) / ((n - 2) * (n - 3))
  return term1 * acc - term2
}

/**
 * 一次計算所有敘述統計值。
 *
 * @param {number[]} arr 1D 數值陣列（已剔除遺漏值）
 * @returns {{ n, mean, sd, se, min, max, median, skewness, kurtosis }}
 */
export function describe(arr) {
  return {
    n: arr.length,
    mean: mean(arr),
    sd: sd(arr),
    se: se(arr),
    min: min(arr),
    max: max(arr),
    median: median(arr),
    skewness: skewness(arr),
    kurtosis: kurtosis(arr),
  }
}
