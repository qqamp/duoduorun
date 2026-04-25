/**
 * Cronbach's α — 把 settings 轉成計算結果。
 *
 * settings:
 *   { selectedVars: string[] }
 *
 * 預設值：若資料集帶 scaleVars（如 employee 的 q1-q5），首次進入時自動勾選。
 * 這個自動勾選邏輯放在 Config 元件，不在 compute。
 */
import { cronbachAlpha } from '../../lib/stats/alpha.js'

export function runCronbachAlpha(rows, settings) {
  const cols = settings?.selectedVars || []
  if (cols.length < 2) return { error: 'needAtLeast2' }
  return cronbachAlpha(rows, cols)
}
