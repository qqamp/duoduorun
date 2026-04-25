/**
 * 交互作用圖 — 純 SVG
 *
 * X 軸：因子 A 的 levels
 * Y 軸：依變項的 cell mean
 * 每條折線 = 因子 B 的一個 level
 */
import { niceTicks, linearScale, niceDomain } from '../../lib/viz/scale'

const FONT_MONO = "'JetBrains Mono', ui-monospace, Consolas, monospace"
const FONT_SANS = "system-ui, -apple-system, 'Segoe UI', 'Microsoft JhengHei', sans-serif"
const COLORS = {
  axis: '#a98257',
  axisText: '#7d5e3c',
  grid: '#ebd9c4',
}
// 因子 B 的線色：按 levels 順序輪替
const LINE_COLORS = ['#d97e2a', '#5e7a91', '#6a9a5a', '#974f1a', '#3a5061', '#27500A']

export function InteractionPlot({
  cellMeans, levelsA, levelsB,
  labelsA, labelsB,
  yLabel = '', width = 640, height = 360,
}) {
  // 計算 y 範圍
  const ys = []
  for (const a of levelsA) {
    for (const b of levelsB) {
      const v = cellMeans[a]?.[b]?.mean
      if (Number.isFinite(v)) ys.push(v)
    }
  }
  if (ys.length === 0) return null
  const yDomain = niceDomain(Math.min(...ys), Math.max(...ys))
  const yTicks = niceTicks(yDomain[0], yDomain[1], 5)

  const padding = { top: 28, right: 130, bottom: 56, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom

  // X 軸是 categorical，間隔均勻
  const slotW = innerW / Math.max(1, levelsA.length - 1)
  const xOf = (i) => padding.left + i * slotW
  const sy = (v) => padding.top + linearScale(v, yDomain, [innerH, 0])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      {/* y grid */}
      {yTicks.map((tv) => (
        <line key={tv} x1={padding.left} y1={sy(tv)} x2={padding.left + innerW} y2={sy(tv)}
          stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      {/* y labels */}
      {yTicks.map((tv) => (
        <text key={`yt${tv}`} x={padding.left - 8} y={sy(tv) + 3} textAnchor="end"
          style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
          {Number.isInteger(tv) ? tv : tv.toFixed(1)}
        </text>
      ))}
      {/* axes */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      <line x1={padding.left} y1={padding.top + innerH} x2={padding.left + innerW} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      {/* x labels */}
      {levelsA.map((a, i) => (
        <text key={a} x={xOf(i)} y={padding.top + innerH + 18} textAnchor="middle"
          style={{ fontSize: 12 }} fill={COLORS.axisText}>
          {labelsA[i]}
        </text>
      ))}
      {/* y axis label */}
      {yLabel && (
        <text x={16} y={padding.top + innerH / 2} textAnchor="middle"
          transform={`rotate(-90 16 ${padding.top + innerH / 2})`}
          style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
          {yLabel}
        </text>
      )}
      {/* lines per B level */}
      {levelsB.map((b, bIdx) => {
        const color = LINE_COLORS[bIdx % LINE_COLORS.length]
        const points = levelsA.map((a, i) => {
          const v = cellMeans[a]?.[b]?.mean
          return Number.isFinite(v) ? { x: xOf(i), y: sy(v) } : null
        }).filter(Boolean)
        if (points.length < 2) return null
        const path = 'M ' + points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')
        return (
          <g key={b}>
            <path d={path} stroke={color} strokeWidth="2" fill="none" />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} stroke="white" strokeWidth="1" />
            ))}
          </g>
        )
      })}
      {/* legend */}
      {levelsB.map((b, bIdx) => (
        <g key={`leg${b}`} transform={`translate(${padding.left + innerW + 12} ${padding.top + bIdx * 18})`}>
          <line x1="0" y1="6" x2="14" y2="6" stroke={LINE_COLORS[bIdx % LINE_COLORS.length]} strokeWidth="2.5" />
          <circle cx="7" cy="6" r="3" fill={LINE_COLORS[bIdx % LINE_COLORS.length]} stroke="white" strokeWidth="1" />
          <text x="20" y="10" style={{ fontSize: 11 }} fill={COLORS.axisText}>
            {labelsB[bIdx]}
          </text>
        </g>
      ))}
    </svg>
  )
}
