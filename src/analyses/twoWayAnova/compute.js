/**
 * 雙因子 ANOVA — 把 settings 轉成計算結果。
 *
 * settings: { depVar, factorA, factorB }
 */
import { twoWayANOVA } from '../../lib/stats/twoWayAnova.js'

export function runTwoWayAnova(rows, settings) {
  const { depVar, factorA, factorB } = settings || {}
  if (!depVar) return { error: 'pickDep' }
  if (!factorA) return { error: 'pickFactorA' }
  if (!factorB) return { error: 'pickFactorB' }
  if (factorA === factorB) return { error: 'sameFactor' }
  return twoWayANOVA(rows, depVar, factorA, factorB)
}
