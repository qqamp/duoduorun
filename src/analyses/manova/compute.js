/**
 * MANOVA — 把 settings 轉成計算結果。
 *
 * settings: { factorVar, dvVars: string[] }
 *
 * 包裝 src/lib/stats/manova.js 主函式，並在介面端做 settings 校驗。
 *
 * Wraps the stats lib for the panel and validates settings before dispatch.
 */
import { manova } from '../../lib/stats/manova.js'

export function runManova(rows, settings) {
  const { factorVar, dvVars } = settings || {}
  if (!factorVar) return { error: 'pickFactor' }
  if (!dvVars || dvVars.length < 2) return { error: 'pickDVs' }
  if (dvVars.includes(factorVar)) return { error: 'factor-in-dvs' }

  const result = manova(rows, factorVar, dvVars)
  return result
}
