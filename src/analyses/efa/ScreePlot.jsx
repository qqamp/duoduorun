/**
 * 陡坡圖（Scree Plot）— 純 SVG
 *
 * X 軸：因子 index（1, 2, ..., p）
 * Y 軸：特徵值
 * 加上 y = 1 水平虛線（Kaiser 規則）
 */
import { niceTicks, linearScale, niceDomain } from '../../lib/viz/scale'

const FONT_MONO = "'JetBrains Mono', ui-monospace, Consolas, monospace"
const FONT_SANS = "system-ui, sans-serif"
const COLORS = {
  axis: '#a98257',
  axisText: '#7d5e3c',
  grid: '#ebd9c4',
  line: '#d97e2a',
  point: '#974f1a',
  kaiser: '#5e7a91',
  kept: '#fce0b8',
}

export function ScreePlot({ eigenvalues, nFactors, width = 560, height = 360 }) {
  if (!eigenvalues || eigenvalues.length === 0) return null
  const padding = { top: 24, right: 24, bottom: 56, left: 56 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const yMax = Math.max(1.2, ...eigenvalues)
  const yDomain = niceDomain(0, yMax)
  const yTicks = niceTicks(yDomain[0], yDomain[1], 6)
  const xCount = eigenvalues.length
  const xOf = (i) => padding.left + (xCount > 1 ? (i / (xCount - 1)) * innerW : innerW / 2)
  const sy = (v) => padding.top + linearScale(v, yDomain, [innerH, 0])

  // line path
  const points = eigenvalues.map((v, i) => ({ x: xOf(i), y: sy(v) }))
  const linePath = 'M ' + points.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')

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
      {eigenvalues.map((_, i) => (
        <text key={`xt${i}`} x={xOf(i)} y={padding.top + innerH + 18} textAnchor="middle"
          style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
          {i + 1}
        </text>
      ))}
      {/* x axis title */}
      <text x={padding.left + innerW / 2} y={padding.top + innerH + 38} textAnchor="middle"
        style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
        Factor index
      </text>
      {/* y axis title */}
      <text x={16} y={padding.top + innerH / 2} textAnchor="middle"
        transform={`rotate(-90 16 ${padding.top + innerH / 2})`}
        style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
        Eigenvalue
      </text>
      {/* Kaiser line at y=1 */}
      {yDomain[0] <= 1 && yDomain[1] >= 1 && (
        <>
          <line x1={padding.left} y1={sy(1)} x2={padding.left + innerW} y2={sy(1)}
            stroke={COLORS.kaiser} strokeWidth="1" strokeDasharray="5 4" />
          <text x={padding.left + innerW - 6} y={sy(1) - 4} textAnchor="end"
            style={{ fontFamily: FONT_MONO, fontSize: 10 }} fill={COLORS.kaiser}>
            Kaiser λ = 1
          </text>
        </>
      )}
      {/* highlight kept factors background */}
      {nFactors > 0 && nFactors < xCount && (
        <rect x={xOf(0) - 12} y={padding.top}
          width={xOf(nFactors - 1) - xOf(0) + 24}
          height={innerH}
          fill={COLORS.kept} fillOpacity="0.3" />
      )}
      {nFactors === xCount && (
        <rect x={padding.left} y={padding.top} width={innerW} height={innerH}
          fill={COLORS.kept} fillOpacity="0.2" />
      )}
      {/* line + points */}
      <path d={linePath} stroke={COLORS.line} strokeWidth="2" fill="none" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5"
          fill={i < nFactors ? COLORS.line : 'white'}
          stroke={COLORS.point} strokeWidth="1.5" />
      ))}
    </svg>
  )
}
