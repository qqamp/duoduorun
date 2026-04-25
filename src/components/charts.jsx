/**
 * 多多快跑 — 純 SVG 圖表元件
 *
 * 包含：
 *   ScatterPlot          — 散佈圖（含可選的迴歸線）
 *   Histogram            — 直方圖
 *   BoxPlot              — 盒鬚圖（單組或多組）
 *   CorrelationHeatmap   — 相關矩陣熱圖
 *
 * 設計原則：
 *   - viewBox 自適應，外層用 max-w 控寬度
 *   - 暖色 AI 風格：duo-amber 主色、duo-cocoa 線條、duo-cream 底色
 *   - 沒有互動（hover tooltip 等留待後續 polish）
 *   - 文字用 mono 等寬以便數值對齊
 */
import { niceTicks, linearScale, niceDomain } from '../lib/viz/scale'
import { simpleLinearRegression } from '../lib/stats/regression'

const COLORS = {
  axis: '#a98257',     // duo-cocoa-300
  axisText: '#7d5e3c', // duo-cocoa-400
  grid: '#ebd9c4',     // duo-cocoa-100
  point: '#d97e2a',    // duo-amber-500
  pointFaint: '#f1a14a',// duo-amber-300
  bar: '#e98624',      // duo-amber-400
  barEdge: '#974f1a',  // duo-amber-700
  box: '#fbeed8',      // duo-cream-100
  boxEdge: '#974f1a',  // duo-amber-700
  median: '#2b1d14',   // duo-cocoa-800
  whisker: '#7d5e3c',  // duo-cocoa-400
  outlier: '#f4a8a8',  // duo-tongue
  regLine: '#3f2d1f',  // duo-cocoa-700
  pos: '#d97e2a',      // 正相關 amber
  neg: '#5e7a91',      // 負相關 denim
  zero: '#fbeed8',     // 零相關 cream
}

const FONT_MONO = "'JetBrains Mono', ui-monospace, Consolas, monospace"
const FONT_SANS = "system-ui, -apple-system, 'Segoe UI', 'Microsoft JhengHei', sans-serif"

/* ─────────────────────  ScatterPlot  ───────────────────── */

export function ScatterPlot({ data, xLabel, yLabel, showRegression = true, width = 640, height = 420 }) {
  if (!data || data.length === 0) return null
  const xs = data.map((d) => d.x).filter(Number.isFinite)
  const ys = data.map((d) => d.y).filter(Number.isFinite)
  if (xs.length === 0 || ys.length === 0) return null

  const xDomain = niceDomain(Math.min(...xs), Math.max(...xs))
  const yDomain = niceDomain(Math.min(...ys), Math.max(...ys))
  const padding = { top: 24, right: 24, bottom: 48, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const sx = (v) => padding.left + linearScale(v, xDomain, [0, innerW])
  const sy = (v) => padding.top + linearScale(v, yDomain, [innerH, 0])

  const xTicks = niceTicks(xDomain[0], xDomain[1], 6)
  const yTicks = niceTicks(yDomain[0], yDomain[1], 5)

  let regLine = null
  if (showRegression && xs.length >= 3) {
    const reg = simpleLinearRegression(xs, ys)
    if (!reg.error) {
      const x1 = xDomain[0]
      const x2 = xDomain[1]
      const y1 = reg.intercept.b + reg.slope.b * x1
      const y2 = reg.intercept.b + reg.slope.b * x2
      regLine = { x1: sx(x1), y1: sy(y1), x2: sx(x2), y2: sy(y2), r: reg.fit.r, r2: reg.fit.r2 }
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      <Grid xTicks={xTicks} yTicks={yTicks} sx={sx} sy={sy} innerW={innerW} innerH={innerH} padding={padding} />
      <Axes xTicks={xTicks} yTicks={yTicks} sx={sx} sy={sy} innerW={innerW} innerH={innerH} padding={padding} xLabel={xLabel} yLabel={yLabel} />
      {regLine && (
        <line x1={regLine.x1} y1={regLine.y1} x2={regLine.x2} y2={regLine.y2}
          stroke={COLORS.regLine} strokeWidth="1.5" strokeDasharray="4 3" />
      )}
      {data.map((d, i) =>
        Number.isFinite(d.x) && Number.isFinite(d.y) ? (
          <circle key={i} cx={sx(d.x)} cy={sy(d.y)} r="3.5"
            fill={COLORS.point} fillOpacity="0.55" stroke={COLORS.barEdge} strokeWidth="0.5" />
        ) : null
      )}
      {regLine && (
        <text x={width - padding.right} y={padding.top + 12} textAnchor="end"
          style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.regLine}>
          r = {regLine.r.toFixed(3)}, R² = {regLine.r2.toFixed(3)}
        </text>
      )}
    </svg>
  )
}

/* ─────────────────────  Histogram  ───────────────────── */

export function Histogram({ bins, xLabel, width = 640, height = 360 }) {
  if (!bins || bins.length === 0) return null
  const counts = bins.map((b) => b.count)
  const yMax = Math.max(...counts) || 1
  const xDomain = [bins[0].x0, bins[bins.length - 1].x1]
  const yDomain = [0, yMax]
  const padding = { top: 20, right: 20, bottom: 48, left: 56 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const sx = (v) => padding.left + linearScale(v, xDomain, [0, innerW])
  const sy = (v) => padding.top + linearScale(v, yDomain, [innerH, 0])
  const xTicks = niceTicks(xDomain[0], xDomain[1], 6)
  const yTicks = niceTicks(0, yMax, 5)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      <Grid xTicks={xTicks} yTicks={yTicks} sx={sx} sy={sy} innerW={innerW} innerH={innerH} padding={padding} />
      <Axes xTicks={xTicks} yTicks={yTicks} sx={sx} sy={sy} innerW={innerW} innerH={innerH} padding={padding} xLabel={xLabel} yLabel="Frequency" />
      {bins.map((b, i) => {
        const x = sx(b.x0)
        const w = Math.max(1, sx(b.x1) - sx(b.x0) - 1)
        const y = sy(b.count)
        const h = innerH + padding.top - y
        return (
          <rect key={i} x={x + 0.5} y={y} width={w} height={h}
            fill={COLORS.bar} fillOpacity="0.85" stroke={COLORS.barEdge} strokeWidth="0.5" />
        )
      })}
    </svg>
  )
}

/* ─────────────────────  BoxPlot  ───────────────────── */

export function BoxPlot({ groups, yLabel, width = 640, height = 420 }) {
  // groups: [{ name, stats }]，stats 由 boxStats() 產出
  if (!groups || groups.length === 0) return null
  const allValues = []
  for (const g of groups) {
    if (Number.isFinite(g.stats.min)) allValues.push(g.stats.min)
    if (Number.isFinite(g.stats.max)) allValues.push(g.stats.max)
    for (const o of g.stats.outliers) allValues.push(o)
  }
  if (allValues.length === 0) return null
  const yDomain = niceDomain(Math.min(...allValues), Math.max(...allValues))
  const padding = { top: 24, right: 24, bottom: 56, left: 60 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const sy = (v) => padding.top + linearScale(v, yDomain, [innerH, 0])
  const yTicks = niceTicks(yDomain[0], yDomain[1], 6)

  const k = groups.length
  const slotW = innerW / k
  const boxHalfW = Math.min(slotW * 0.3, 36)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      {/* y-axis grid + labels */}
      {yTicks.map((tv) => (
        <g key={tv}>
          <line x1={padding.left} y1={sy(tv)} x2={padding.left + innerW} y2={sy(tv)}
            stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
          <text x={padding.left - 8} y={sy(tv) + 3} textAnchor="end"
            style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
            {Number.isInteger(tv) ? tv : tv.toFixed(1)}
          </text>
        </g>
      ))}
      {/* y-axis line */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      {/* y-axis label */}
      {yLabel && (
        <text x={16} y={padding.top + innerH / 2} textAnchor="middle"
          transform={`rotate(-90 16 ${padding.top + innerH / 2})`}
          style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
          {yLabel}
        </text>
      )}
      {/* x-axis line */}
      <line x1={padding.left} y1={padding.top + innerH} x2={padding.left + innerW} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      {/* boxes */}
      {groups.map((g, i) => {
        const cx = padding.left + slotW * (i + 0.5)
        const s = g.stats
        if (!Number.isFinite(s.median)) return null
        const yQ1 = sy(s.q1)
        const yQ3 = sy(s.q3)
        const yMed = sy(s.median)
        const yLow = sy(s.lower)
        const yHigh = sy(s.upper)
        return (
          <g key={i}>
            {/* whiskers vertical line */}
            <line x1={cx} y1={yLow} x2={cx} y2={yQ1} stroke={COLORS.whisker} strokeWidth="1" />
            <line x1={cx} y1={yQ3} x2={cx} y2={yHigh} stroke={COLORS.whisker} strokeWidth="1" />
            {/* whisker caps */}
            <line x1={cx - boxHalfW * 0.4} y1={yLow} x2={cx + boxHalfW * 0.4} y2={yLow} stroke={COLORS.whisker} strokeWidth="1" />
            <line x1={cx - boxHalfW * 0.4} y1={yHigh} x2={cx + boxHalfW * 0.4} y2={yHigh} stroke={COLORS.whisker} strokeWidth="1" />
            {/* box */}
            <rect x={cx - boxHalfW} y={yQ3} width={boxHalfW * 2} height={Math.max(1, yQ1 - yQ3)}
              fill={COLORS.box} stroke={COLORS.boxEdge} strokeWidth="1.25" />
            {/* median line */}
            <line x1={cx - boxHalfW} y1={yMed} x2={cx + boxHalfW} y2={yMed}
              stroke={COLORS.median} strokeWidth="1.5" />
            {/* outliers */}
            {s.outliers.map((o, j) => (
              <circle key={j} cx={cx} cy={sy(o)} r="3"
                fill="white" stroke={COLORS.outlier} strokeWidth="1.25" />
            ))}
            {/* group label */}
            <text x={cx} y={padding.top + innerH + 18} textAnchor="middle"
              style={{ fontSize: 12 }} fill={COLORS.axisText}>
              {g.name}
            </text>
            {/* n label */}
            <text x={cx} y={padding.top + innerH + 32} textAnchor="middle"
              style={{ fontFamily: FONT_MONO, fontSize: 10 }} fill={COLORS.axisText}>
              n = {s.n}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ─────────────────────  CorrelationHeatmap  ───────────────────── */

export function CorrelationHeatmap({ matrix, columns, labels, width = 600, height = 600 }) {
  // matrix: { col1: { col2: { r, p, n } } }
  // columns: string[]
  // labels: string[]（各 col 對應的中英 label）
  const k = columns.length
  if (k === 0) return null
  const padding = { top: 24, right: 24, bottom: 24, left: 110 }
  const innerW = width - padding.left - padding.right
  const innerH = height - padding.top - padding.bottom
  const cellW = innerW / k
  const cellH = innerH / k

  // 顏色：負相關 denim、正相關 amber，依 |r| 決定深淺
  const cellColor = (r) => {
    if (!Number.isFinite(r)) return '#fffaf2'
    const a = Math.abs(r)
    if (a < 0.05) return '#fffaf2'
    if (r > 0) {
      if (a < 0.3) return '#fef3e2'
      if (a < 0.5) return '#fce0b8'
      if (a < 0.7) return '#f8c180'
      return '#f1a14a'
    } else {
      if (a < 0.3) return '#eef2f6'
      if (a < 0.5) return '#cfdae3'
      if (a < 0.7) return '#a9bbcc'
      return '#7e96ad'
    }
  }
  const sigStar = (p) => {
    if (!Number.isFinite(p)) return ''
    if (p < 0.001) return '***'
    if (p < 0.01) return '**'
    if (p < 0.05) return '*'
    return ''
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" style={{ fontFamily: FONT_SANS }}>
      {columns.map((rowCol, i) => (
        <g key={rowCol}>
          {/* y-axis label */}
          <text x={padding.left - 8} y={padding.top + cellH * (i + 0.5) + 4}
            textAnchor="end" style={{ fontSize: 11 }} fill={COLORS.axisText}>
            {labels[i]}
          </text>
          {columns.map((colCol, j) => {
            const cell = matrix[rowCol]?.[colCol]
            const r = cell?.r
            const p = cell?.p
            const x = padding.left + j * cellW
            const y = padding.top + i * cellH
            const isDiag = i === j
            return (
              <g key={colCol}>
                <rect x={x} y={y} width={cellW} height={cellH}
                  fill={cellColor(r)} stroke="white" strokeWidth="1" />
                <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle"
                  style={{ fontFamily: FONT_MONO, fontSize: 11, fontWeight: isDiag ? 400 : 500 }}
                  fill="#2b1d14">
                  {isDiag ? '—' : (Number.isFinite(r) ? r.toFixed(2) + sigStar(p) : '—')}
                </text>
              </g>
            )
          })}
        </g>
      ))}
      {/* x-axis labels (top) */}
      {columns.map((colCol, j) => (
        <text key={colCol} x={padding.left + cellW * (j + 0.5)} y={padding.top - 6}
          textAnchor="middle" style={{ fontSize: 11 }} fill={COLORS.axisText}>
          {labels[j]}
        </text>
      ))}
    </svg>
  )
}

/* ─────────────────────  共用：軸與格線  ───────────────────── */

function Grid({ xTicks, yTicks, sx, sy, innerW, innerH, padding }) {
  return (
    <g>
      {xTicks.map((tv) => (
        <line key={`vx${tv}`} x1={sx(tv)} y1={padding.top} x2={sx(tv)} y2={padding.top + innerH}
          stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
      {yTicks.map((tv) => (
        <line key={`hy${tv}`} x1={padding.left} y1={sy(tv)} x2={padding.left + innerW} y2={sy(tv)}
          stroke={COLORS.grid} strokeWidth="0.5" strokeDasharray="2 3" />
      ))}
    </g>
  )
}

function Axes({ xTicks, yTicks, sx, sy, innerW, innerH, padding, xLabel, yLabel }) {
  return (
    <g>
      {/* axes */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      <line x1={padding.left} y1={padding.top + innerH} x2={padding.left + innerW} y2={padding.top + innerH}
        stroke={COLORS.axis} strokeWidth="1" />
      {/* x ticks + labels */}
      {xTicks.map((tv) => (
        <g key={`xt${tv}`}>
          <line x1={sx(tv)} y1={padding.top + innerH} x2={sx(tv)} y2={padding.top + innerH + 4}
            stroke={COLORS.axis} strokeWidth="1" />
          <text x={sx(tv)} y={padding.top + innerH + 18} textAnchor="middle"
            style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
            {Number.isInteger(tv) ? tv : tv.toFixed(1)}
          </text>
        </g>
      ))}
      {/* y ticks + labels */}
      {yTicks.map((tv) => (
        <g key={`yt${tv}`}>
          <line x1={padding.left - 4} y1={sy(tv)} x2={padding.left} y2={sy(tv)}
            stroke={COLORS.axis} strokeWidth="1" />
          <text x={padding.left - 8} y={sy(tv) + 3} textAnchor="end"
            style={{ fontFamily: FONT_MONO, fontSize: 11 }} fill={COLORS.axisText}>
            {Number.isInteger(tv) ? tv : tv.toFixed(1)}
          </text>
        </g>
      ))}
      {/* axis labels */}
      {xLabel && (
        <text x={padding.left + innerW / 2} y={padding.top + innerH + 36} textAnchor="middle"
          style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text x={16} y={padding.top + innerH / 2} textAnchor="middle"
          transform={`rotate(-90 16 ${padding.top + innerH / 2})`}
          style={{ fontSize: 12, fontWeight: 500 }} fill={COLORS.axisText}>
          {yLabel}
        </text>
      )}
    </g>
  )
}
