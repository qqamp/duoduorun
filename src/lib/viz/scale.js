/**
 * 圖表座標軸與縮放工具
 *
 * niceTicks(min, max, count=5) — 產生人類友善的座標軸刻度
 *   範例：niceTicks(0, 47, 5) → [0, 10, 20, 30, 40, 50]
 *
 * linearScale(value, domain, range)
 *   把 value 從 domain [d0, d1] 線性映射到 range [r0, r1]。
 *
 * niceDomain(min, max)
 *   稍微擴張 domain 讓上下端對齊到漂亮整數，避免資料點貼到圖框。
 */

/** 產生人類友善的軸刻度（10/100/1000 等基數的 1, 2, 5 倍數） */
export function niceTicks(min, max, count = 5) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return []
  if (min === max) {
    return [min - 1, min, min + 1]
  }
  const range = max - min
  const rough = range / count
  const exp = Math.floor(Math.log10(rough))
  const base = Math.pow(10, exp)
  const fraction = rough / base
  let step
  if (fraction < 1.5) step = base
  else if (fraction < 3.5) step = 2 * base
  else if (fraction < 7.5) step = 5 * base
  else step = 10 * base

  const tickMin = Math.floor(min / step) * step
  const tickMax = Math.ceil(max / step) * step
  const ticks = []
  for (let v = tickMin; v <= tickMax + step / 1e6; v += step) {
    ticks.push(Number(v.toFixed(12)))
  }
  return ticks
}

/** 線性縮放 */
export function linearScale(value, domain, range) {
  const [d0, d1] = domain
  const [r0, r1] = range
  if (d1 === d0) return (r0 + r1) / 2
  return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
}

/** 把 domain 微微擴張到「整齊」的端點（用 niceTicks 邊界） */
export function niceDomain(min, max) {
  const ticks = niceTicks(min, max, 5)
  if (ticks.length === 0) return [min, max]
  return [ticks[0], ticks[ticks.length - 1]]
}
