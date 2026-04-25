/**
 * 相關分析 — 用 settings 跑 correlationMatrix。
 *
 * settings:
 *   { selectedVars: string[] }
 */
import { correlationMatrix, spearmanMatrix } from '../../lib/stats/correlation.js'

export function runCorrelation(rows, settings) {
  const cols = settings?.selectedVars || []
  if (cols.length < 2) return { error: 'needAtLeastTwo' }
  const method = settings?.method || 'pearson'
  if (method === 'spearman') {
    const m = spearmanMatrix(rows, cols)
    // 標準化欄位名稱：把 .rho 視為 .r 以便共用渲染
    const out = { ...m, method: 'spearman' }
    out.matrix = {}
    for (const a of cols) {
      out.matrix[a] = {}
      for (const b of cols) {
        const cell = m.matrix[a][b]
        out.matrix[a][b] = { ...cell, r: cell.rho }
      }
    }
    return out
  }
  return { ...correlationMatrix(rows, cols), method: 'pearson' }
}
