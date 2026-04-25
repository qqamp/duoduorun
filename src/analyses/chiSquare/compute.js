/**
 * 卡方檢定 — 把 settings 轉成計算結果。
 *
 * settings:
 *   { type: 'independence' | 'gof', rowVar, colVar, gofVar, expectedProps }
 */
import { chiSquareIndependence, chiSquareGoodnessOfFit } from '../../lib/stats/chiSquare.js'

export function runChiSquare(rows, settings) {
  const type = settings?.type || 'independence'

  if (type === 'independence') {
    const { rowVar, colVar } = settings
    if (!rowVar) return { error: 'pickRow' }
    if (!colVar) return { error: 'pickCol' }
    if (rowVar === colVar) return { error: 'sameVar' }
    const r = chiSquareIndependence(rows, rowVar, colVar)
    if (r.error) return { error: r.error }
    return { type: 'independence', rowVar, colVar, ...r }
  }

  if (type === 'gof') {
    const { gofVar, expectedProps } = settings
    if (!gofVar) return { error: 'pickGof' }
    const r = chiSquareGoodnessOfFit(rows, gofVar, expectedProps)
    if (r.error) return { error: r.error }
    return { type: 'gof', gofVar, ...r }
  }

  return { error: 'unknown-type' }
}
