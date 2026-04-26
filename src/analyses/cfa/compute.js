/**
 * CFA — 把 settings 轉成計算結果。
 *
 * settings:
 *   { factors: Array<{ name: string, indicators: string[] }> }
 *
 * 預設：兩個空因子（由 Config 處理）；若使用者只填一個因子也允許。
 */
import { cfa } from '../../lib/stats/cfa.js'

export function runCFA(rows, settings) {
  const factors = (settings?.factors || []).map((f) => ({
    name: (f?.name || '').trim() || 'F',
    indicators: Array.isArray(f?.indicators) ? f.indicators.filter(Boolean) : [],
  }))
  // 過濾掉沒有指標的因子
  const validFactors = factors.filter((f) => f.indicators.length >= 2)
  if (validFactors.length === 0) return { error: 'no-valid-factor' }
  const totalIndicators = validFactors.reduce((s, f) => s + f.indicators.length, 0)
  if (totalIndicators < 3) return { error: 'too-few-total-indicators' }
  return cfa(rows, validFactors)
}
