/**
 * 多元迴歸 — 把 settings 轉成計算結果。
 *
 * settings: { yVar, xVars: string[] }
 *
 * 處理：
 *   - listwise deletion（任一變數缺值即剔除整列）
 *   - 跑 multipleRegression
 *   - 跑殘差 Shapiro-Wilk
 */
import { isMissing } from '../../lib/variableTypes.js'
import { multipleRegression } from '../../lib/stats/multipleRegression.js'
import { shapiroWilk } from '../../lib/stats/normality.js'

export function runMultipleRegression(rows, settings) {
  const { yVar, xVars } = settings || {}
  if (!yVar) return { error: 'pickY' }
  if (!xVars || xVars.length < 1) return { error: 'pickXs' }
  if (xVars.includes(yVar)) return { error: 'y-in-x' }

  const X = []
  const y = []
  for (const r of rows) {
    const yv = r[yVar]
    if (isMissing(yv)) continue
    const yn = Number(yv)
    if (!Number.isFinite(yn)) continue
    const row = []
    let bad = false
    for (const xName of xVars) {
      const xv = r[xName]
      if (isMissing(xv)) { bad = true; break }
      const xn = Number(xv)
      if (!Number.isFinite(xn)) { bad = true; break }
      row.push(xn)
    }
    if (bad) continue
    X.push(row)
    y.push(yn)
  }

  const reg = multipleRegression(X, y, xVars)
  if (reg.error) return { error: reg.error }

  const sw = shapiroWilk(reg.residuals)

  return {
    reg,
    yVar,
    xVars,
    assumptions: { residualNormality: sw },
  }
}
