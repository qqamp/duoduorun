/**
 * 重複量數 ANOVA — settings → 計算結果包裝層
 * Repeated-measures ANOVA — settings-to-result wrapper.
 *
 * settings: { conditionVars: string[] }
 *
 * 流程 / Flow:
 *   1. 驗證已勾選 ≥ 2 個條件欄 / require ≥ 2 condition columns
 *   2. 呼叫 lib/stats/repeatedAnova，內部已處理 listwise deletion 與
 *      球形檢定、ε 校正
 */
import { repeatedAnova as repeatedAnovaCore } from '../../lib/stats/repeatedAnova.js'

export function runRepeatedAnova(rows, settings) {
  const conditionVars = settings?.conditionVars || []
  if (conditionVars.length < 2) return { error: 'needAtLeast2' }

  const out = repeatedAnovaCore(rows, conditionVars)
  if (out.error) return { error: out.error, meta: out.meta }

  return { ...out, conditionVars }
}
