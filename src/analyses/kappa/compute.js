/**
 * Cohen's Kappa — settings → 結果
 *
 * settings:
 *   { rater1Var, rater2Var, weighting }
 *   weighting ∈ { 'none', 'linear', 'quadratic' }
 */
import { cohenKappa } from '../../lib/stats/kappa.js'

export function runKappa(rows, settings) {
  return cohenKappa(
    rows,
    settings?.rater1Var,
    settings?.rater2Var,
    settings?.weighting || 'none',
  )
}
