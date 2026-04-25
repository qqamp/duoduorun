/**
 * 變數型別自動判定 + 遺漏值統計
 *
 * 對外 API：
 *   isMissing(v)          → bool
 *   countMissing(values)  → number
 *   detectType(values)    → 'continuous' | 'ordinal' | 'categorical' | 'unknown'
 *   summarizeColumn(rows, col) → { name, type, missing, distinct, n }
 *   summarizeAll(rows)    → { col1: {...}, col2: {...} }
 *
 * 型別判定規則（heuristic）：
 *   1. 全部缺值                          → 'unknown'
 *   2. 任一非數字值                      → 'categorical'
 *   3. 全為整數 ∈ [1, 7] 且 distinct ≤ 7 → 'ordinal'（Likert / Likert-like）
 *   4. 其餘                              → 'continuous'
 *
 * 注意：判定結果只是初值，使用者應該在 UI 上能手動覆寫
 *       （變數列表的型別徽章未來會做成可點擊切換）。
 */

export function isMissing(v) {
  if (v === null || v === undefined) return true
  if (typeof v === 'number' && Number.isNaN(v)) return true
  if (typeof v === 'string' && v.trim() === '') return true
  return false
}

export function countMissing(values) {
  let count = 0
  for (const v of values) if (isMissing(v)) count++
  return count
}

function isNumericLike(v) {
  if (typeof v === 'number') return Number.isFinite(v)
  if (typeof v === 'string') {
    const trimmed = v.trim()
    if (trimmed === '') return false
    return /^-?\d+(\.\d+)?(e[+-]?\d+)?$/i.test(trimmed)
  }
  return false
}

export function detectType(values) {
  const nonMissing = values.filter(v => !isMissing(v))
  if (nonMissing.length === 0) return 'unknown'

  const allNumeric = nonMissing.every(isNumericLike)
  if (!allNumeric) return 'categorical'

  const nums = nonMissing.map(v => Number(v))
  const allInt = nums.every(Number.isInteger)
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const distinct = new Set(nums).size

  // Likert / ordinal: 整數、值落在 1-7、最多 7 個 distinct 值
  if (allInt && min >= 1 && max <= 7 && distinct <= 7) return 'ordinal'

  return 'continuous'
}

/** 從 rows 取出某欄的所有值（含遺漏），不排除 null/undefined */
function pluck(rows, col) {
  return rows.map(r => r[col])
}

export function summarizeColumn(rows, col) {
  const values = pluck(rows, col)
  const nonMissing = values.filter(v => !isMissing(v))
  const type = detectType(values)
  return {
    name: col,
    type,
    missing: countMissing(values),
    distinct: new Set(nonMissing).size,
    n: values.length,
  }
}

export function summarizeAll(rows) {
  if (!rows || rows.length === 0) return {}
  const cols = Object.keys(rows[0])
  const out = {}
  for (const c of cols) out[c] = summarizeColumn(rows, c)
  return out
}
