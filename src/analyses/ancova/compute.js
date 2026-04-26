/**
 * ANCOVA — settings → 計算結果包裝層 / settings-to-result wrapper.
 *
 * settings: { yVar, factorVar, covariateVars: string[] }
 *
 * 流程 / Flow:
 *   1. 驗證 settings 完整性
 *   2. 呼叫 lib/stats/ancova，內部已處理 listwise deletion 與所有 SS 拆分
 *   3. 維持與其他 analysis 一致的回傳介面（result 帶 yVar / factorVar / covariateVars）
 */
import { ancova as ancovaCore } from '../../lib/stats/ancova.js'

export function runAncova(rows, settings) {
  const { yVar, factorVar, covariateVars } = settings || {}
  if (!yVar) return { error: 'pickDep' }
  if (!factorVar) return { error: 'pickFactor' }
  if (!covariateVars || covariateVars.length < 1) return { error: 'pickCov' }

  const out = ancovaCore(rows, yVar, factorVar, covariateVars)
  if (out.error) return { error: out.error, meta: out.meta }

  return {
    ...out,
    yVar,
    factorVar,
    covariateVars,
  }
}
