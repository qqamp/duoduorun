/**
 * 直方圖分箱
 *
 * computeBins(values, options) → { bins: [{ x0, x1, count }], binWidth, k }
 *
 * 演算法：
 *   - 預設 Freedman-Diaconis：bin 寬 = 2 · IQR · n^(-1/3)
 *   - 若 IQR = 0（如離散少值），fallback 到 Sturges：k = ceil(log2(n)+1)
 *   - 邊界用 niceDomain 擴展到整齊的整數
 */
import { niceDomain } from './scale.js'

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

export function computeBins(values, { customK } = {}) {
  const filtered = values.filter((v) => Number.isFinite(v))
  const n = filtered.length
  if (n === 0) return { bins: [], binWidth: 0, k: 0 }

  const sorted = [...filtered].sort((a, b) => a - b)
  const min = sorted[0]
  const max = sorted[n - 1]

  let k
  if (customK && customK > 0) {
    k = customK
  } else {
    const q1 = quantile(sorted, 0.25)
    const q3 = quantile(sorted, 0.75)
    const iqr = q3 - q1
    if (iqr > 0) {
      const fdWidth = 2 * iqr * Math.pow(n, -1 / 3)
      k = Math.max(5, Math.ceil((max - min) / fdWidth))
    } else {
      k = Math.ceil(Math.log2(n) + 1)
    }
  }
  k = Math.min(50, Math.max(3, k))

  // 用 niceDomain 對齊整數邊界
  const [d0, d1] = niceDomain(min, max)
  const binWidth = (d1 - d0) / k

  const bins = []
  for (let i = 0; i < k; i++) {
    const x0 = d0 + i * binWidth
    const x1 = x0 + binWidth
    bins.push({ x0, x1, count: 0 })
  }
  for (const v of filtered) {
    let idx = Math.floor((v - d0) / binWidth)
    if (idx === k) idx = k - 1 // 邊界值歸最後一 bin
    if (idx >= 0 && idx < k) bins[idx].count += 1
  }
  return { bins, binWidth, k, domain: [d0, d1], n }
}
