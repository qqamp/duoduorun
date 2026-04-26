/**
 * ICC — 把 settings 轉成計算結果。
 *
 * settings:
 *   { raterVars: string[] }
 *
 * 預設值：若資料集帶 scaleVars 或全部數值欄，首次進入時自動勾選（見 Config）。
 */
import { icc } from '../../lib/stats/icc.js'

export function runIcc(rows, settings) {
  const cols = settings?.raterVars || []
  if (cols.length < 2) return { error: 'needAtLeast2Raters' }
  return icc(rows, cols)
}
