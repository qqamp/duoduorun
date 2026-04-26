/**
 * EFA — 把 settings 轉成計算結果。
 *
 * settings: { selectedVars, nFactors, rotation }
 */
import { exploratoryFactorAnalysis } from '../../lib/stats/efa.js'

export function runEFA(rows, settings) {
  const cols = settings?.selectedVars || []
  if (cols.length < 3) return { error: 'needAtLeastThree' }
  const opts = {
    nFactors: settings?.nFactors,
    rotation: settings?.rotation || 'varimax',
  }
  const r = exploratoryFactorAnalysis(rows, cols, opts)
  if (r.error) return { error: r.error }
  return { ...r, columns: cols }
}
