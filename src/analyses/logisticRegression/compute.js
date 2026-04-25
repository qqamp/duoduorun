/**
 * 邏輯斯迴歸 — 把 settings 轉成計算結果。
 *
 * settings: { yVar, xVars, positiveClass }
 *
 * 流程：
 *   1. 偵測 Y 的 levels（必須恰好 2）
 *   2. positiveClass 對應為 1，另一個為 0
 *   3. listwise deletion（任一變數缺值即剔除）
 *   4. 跑 logisticRegression
 */
import { isMissing } from '../../lib/variableTypes.js'
import { logisticRegression } from '../../lib/stats/logisticRegression.js'

/** 取得 Y 的所有 levels（用於 binary check + 正類別選擇） */
export function detectYLevels(rows, yVar) {
  if (!yVar) return []
  const set = new Set()
  const levels = []
  for (const r of rows) {
    const v = r[yVar]
    if (isMissing(v)) continue
    const k = String(v)
    if (!set.has(k)) { set.add(k); levels.push(k) }
  }
  return levels
}

export function runLogisticRegression(rows, settings) {
  const { yVar, xVars, positiveClass } = settings || {}
  if (!yVar) return { error: 'pickY' }
  if (!xVars || xVars.length < 1) return { error: 'pickXs' }
  if (xVars.includes(yVar)) return { error: 'y-in-x' }

  const yLevels = detectYLevels(rows, yVar)
  if (yLevels.length !== 2) {
    return { error: 'yNeedBinary', meta: { k: yLevels.length } }
  }
  const posClass = positiveClass && yLevels.includes(positiveClass)
    ? positiveClass
    : yLevels[1] // 預設取第二個 level 當 positive

  const X = []
  const y = []
  for (const r of rows) {
    const yv = r[yVar]
    if (isMissing(yv)) continue
    const ystr = String(yv)
    if (!yLevels.includes(ystr)) continue
    const yBinary = ystr === posClass ? 1 : 0

    const row = []
    let bad = false
    for (const x of xVars) {
      const xv = r[x]
      if (isMissing(xv)) { bad = true; break }
      const xn = Number(xv)
      if (!Number.isFinite(xn)) { bad = true; break }
      row.push(xn)
    }
    if (bad) continue
    X.push(row)
    y.push(yBinary)
  }

  const reg = logisticRegression(X, y, xVars)
  if (reg.error) return { error: reg.error }
  return { ...reg, yVar, xVars, positiveClass: posClass, yLevels }
}
