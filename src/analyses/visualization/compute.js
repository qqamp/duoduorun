/**
 * 視覺化 — 把 settings 轉成圖表資料。
 *
 * settings:
 *   { type, xVar, yVar, groupVar, multiVars }
 *   type ∈ { 'scatter', 'histogram', 'boxplot', 'heatmap' }
 */
import { isMissing } from '../../lib/variableTypes.js'
import { computeBins } from '../../lib/viz/binning.js'
import { boxStats } from '../../lib/viz/boxStats.js'
import { correlationMatrix } from '../../lib/stats/correlation.js'

export function runViz(rows, settings) {
  const type = settings?.type || 'scatter'

  if (type === 'scatter') return runScatter(rows, settings)
  if (type === 'histogram') return runHistogram(rows, settings)
  if (type === 'boxplot') return runBoxPlot(rows, settings)
  if (type === 'heatmap') return runHeatmap(rows, settings)
  return { error: 'unknown-type' }
}

function pickNumeric(rows, col) {
  const out = []
  for (const r of rows) {
    const v = r[col]
    if (isMissing(v)) continue
    const n = Number(v)
    if (Number.isFinite(n)) out.push(n)
  }
  return out
}

function runScatter(rows, { xVar, yVar }) {
  if (!xVar) return { error: 'pickX' }
  if (!yVar) return { error: 'pickY' }
  const data = []
  for (const r of rows) {
    const xv = r[xVar]
    const yv = r[yVar]
    if (isMissing(xv) || isMissing(yv)) continue
    const x = Number(xv)
    const y = Number(yv)
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue
    data.push({ x, y })
  }
  return { type: 'scatter', xVar, yVar, data }
}

function runHistogram(rows, { xVar }) {
  if (!xVar) return { error: 'pickX' }
  const values = pickNumeric(rows, xVar)
  if (values.length < 5) return { error: 'need-n>=5' }
  const binResult = computeBins(values)
  return { type: 'histogram', xVar, ...binResult }
}

function runBoxPlot(rows, { yVar, groupVar }) {
  if (!yVar) return { error: 'pickY' }

  if (!groupVar) {
    const values = pickNumeric(rows, yVar)
    if (values.length < 4) return { error: 'need-n>=4' }
    return {
      type: 'boxplot',
      yVar,
      groups: [{ name: '', stats: boxStats(values) }],
    }
  }

  // 分組
  const buckets = {}
  for (const r of rows) {
    const g = r[groupVar]
    const v = r[yVar]
    if (isMissing(g) || isMissing(v)) continue
    const num = Number(v)
    if (!Number.isFinite(num)) continue
    if (!buckets[g]) buckets[g] = []
    buckets[g].push(num)
  }
  const groupNames = Object.keys(buckets)
  if (groupNames.length === 0) return { error: 'no-data' }
  const groups = groupNames.map((name) => ({
    name,
    stats: boxStats(buckets[name]),
  }))
  return { type: 'boxplot', yVar, groupVar, groups }
}

function runHeatmap(rows, { multiVars }) {
  const cols = multiVars || []
  if (cols.length < 2) return { error: 'needAtLeastTwo' }
  const m = correlationMatrix(rows, cols)
  return { type: 'heatmap', ...m }
}
