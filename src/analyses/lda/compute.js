/**
 * LDA — 把 settings 轉成計算結果。
 *
 * settings: { groupVar, predictors: string[] }
 *
 * 包裝 src/lib/stats/lda.js 主函式，並在介面端做 settings 校驗。
 *
 * Wraps the stats lib for the panel and validates settings before dispatch.
 */
import { lda } from '../../lib/stats/lda.js'

export function runLDA(rows, settings) {
  const { groupVar, predictors } = settings || {}
  if (!groupVar) return { error: 'pickGroup' }
  if (!predictors || predictors.length < 2) return { error: 'pickPredictors' }
  if (predictors.includes(groupVar)) return { error: 'group-in-predictors' }

  const result = lda(rows, groupVar, predictors)
  return result
}
