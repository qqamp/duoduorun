/**
 * 簡單線性迴歸 — 把 settings 轉成計算結果。
 *
 * settings: { yVar, xVar }
 *
 * 流程：
 *   1. listwise 剔除任一缺值的列
 *   2. 跑 simpleLinearRegression
 *   3. 跑殘差 Shapiro-Wilk 常態性檢核
 */
import { isMissing } from '../../lib/variableTypes.js'
import { simpleLinearRegression } from '../../lib/stats/regression.js'
import { shapiroWilk } from '../../lib/stats/normality.js'

export function runSimpleRegression(rows, settings) {
  const { yVar, xVar } = settings || {}
  if (!yVar) return { error: 'pickY' }
  if (!xVar) return { error: 'pickX' }
  if (xVar === yVar) return { error: 'sameVar' }

  const xs = []
  const ys = []
  for (const r of rows) {
    const xv = r[xVar]
    const yv = r[yVar]
    if (isMissing(xv) || isMissing(yv)) continue
    const xn = Number(xv)
    const yn = Number(yv)
    if (!Number.isFinite(xn) || !Number.isFinite(yn)) continue
    xs.push(xn)
    ys.push(yn)
  }

  const reg = simpleLinearRegression(xs, ys)
  if (reg.error) return { error: reg.error }

  const sw = shapiroWilk(reg.residuals)

  return {
    reg,
    yVar,
    xVar,
    assumptions: { residualNormality: sw },
  }
}
