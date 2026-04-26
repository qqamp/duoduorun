/**
 * 混合設計 ANOVA — settings → 計算結果包裝層
 * Mixed ANOVA — settings-to-result wrapper.
 *
 * settings: { betweenVar: string, conditionVars: string[] }
 *
 * 流程 / Flow:
 *   1. 驗證使用者已選好被試間因子與 ≥ 2 個條件欄
 *      Require betweenVar + >= 2 condition columns
 *   2. 呼叫 lib/stats/mixedAnova，內部已處理 listwise deletion
 *      與 Mauchly + GG/HF/LB ε 校正
 */
import { mixedAnova as mixedAnovaCore } from '../../lib/stats/mixedAnova.js'

export function runMixedAnova(rows, settings) {
  const betweenVar = settings?.betweenVar
  const conditionVars = settings?.conditionVars || []
  if (!betweenVar) return { error: 'pickBetween' }
  if (conditionVars.length < 2) return { error: 'needAtLeast2' }

  const out = mixedAnovaCore(rows, betweenVar, conditionVars)
  if (out.error) return { error: out.error, meta: out.meta }

  return { ...out, betweenVar, conditionVars }
}
