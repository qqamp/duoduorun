/**
 * ROC 曲線 — 純 SVG
 *
 * X 軸：1 − Specificity (FPR)
 * Y 軸：Sensitivity (TPR)
 * 對角線（隨機分類器）作為比較參考
 */
import { linearScale } from '../../lib/viz/scale'

const FONT_MONO = "'JetBrains Mono', ui-monospace, Consolas, monospace"
const FONT_SANS = "system-ui, -apple-system, 'Segoe UI', sans-serif"
const COLORS = {
  axis: '#a98257',
  axisText: '#7d5e3c',
  grid: '#ebd9c4',
  curve: '#d97e2a',
  fill: '#fef3e2',
  diag: '#a98257',
}

export function ROCPlot({ points, auc, width = 560, height = 420 }) {
  if (!points || points.length === 0) return null
  const padding = { top: 24, right: 24, bottom: 56, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const sx = (v) => padding.left + linearScale(v, [0, 1], [0, innerW])
  const sy = (v) => padding.top + linearScale(v, [0, 1], [innerH, 0])

  const pathPoints = points.map((p) => `${sx(p.fpr).toFixed(1)} ${sy(p.tpr).toFixed(1)}`)
  const linePath = 'M ' + pathPoints.join(' L ')
  const fillPath =
    `M ${sx(0)} ${sy(0)} ` +
    points.map((p) => `L ${sx(p.fpr).toFixed(1)} ${sy(p.tpr).toFixed(1)}`).join(' ') +
    ` L ${sx(1)} ${sy(0)} Z`

  const ticks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      {/* grid */}
      {ticks.map((tv) => (
        <g key={`g${tv}`}>
          <line x1={sx(tv)} y1={padding.top} x2={sx(tv)} y2={padding.top + innerH}
            stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1={padding.left} y1={sy(tv)} x2={padding.left + innerW} y2={sy(tv)}
            stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
        </g>
      ))}

      {/* axes */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      <line x1={padding.left} y1={padding.top + innerH} x2={padding.left + innerW} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />

      {/* diagonal reference (random classifier) */}
      <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(1)}
        stroke={COLORS.diag} strokeWidth="1" strokeDasharray="4 3" />

      {/* AUC fill */}
      <path d={fillPath} fill={COLORS.fill} fillOpacity="0.6" />
      {/* curve */}
      <path d={linePath} stroke={COLORS.curve} strokeWidth="2" fill="none" />

      {/* axis labels */}
      {ticks.map((tv) => (
        <g key={`xt${tv}`}>
          <text x={sx(tv)} y={padding.top + innerH + 18} textAnchor="middle"
            style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
            {tv.toFixed(2)}
          </text>
          <text x={padding.left - 8} y={sy(tv) + 3} textAnchor="end"
            style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
            {tv.toFixed(2)}
          </text>
        </g>
      ))}
      <text x={padding.left + innerW / 2} y={padding.top + innerH + 38} textAnchor="middle"
        style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
        1 − Specificity (FPR)
      </text>
      <text x={16} y={padding.top + innerH / 2} textAnchor="middle"
        transform={`rotate(-90 16 ${padding.top + innerH / 2})`}
        style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
        Sensitivity (TPR)
      </text>

      {/* AUC label */}
      <text x={width - padding.right - 8} y={padding.top + 16} textAnchor="end"
        style={{ fontFamily: FONT_MONO, fontSize: 13, fontWeight: 500 }} fill="#974f1a">
        AUC = {auc.toFixed(3)}
      </text>
    </svg>
  )
}
