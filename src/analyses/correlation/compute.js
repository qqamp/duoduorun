/**
 * 相關分析 — 用 settings 跑 correlationMatrix。
 *
 * settings:
 *   { selectedVars: string[] }
 */
import { correlationMatrix } from '../../lib/stats/correlation.js'

export function runCorrelation(rows, settings) {
  const cols = settings?.selectedVars || []
  if (cols.length < 2) return { error: 'needAtLeastTwo' }
  return correlationMatrix(rows, cols)
}
