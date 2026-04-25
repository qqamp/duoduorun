/**
 * 敘述統計：把資料列 + 選定欄位轉成計算結果。
 *
 * 處理遺漏值：每欄獨立 listwise（過濾掉該欄為 missing 的列），
 * 不做整列 listwise（跨欄 listwise 會在 Step 4 變成可選 mode）。
 */
import { describe } from '../../lib/stats/descriptive'
import { isMissing } from '../../lib/variableTypes'

/**
 * @param {Array<object>} rows  資料列
 * @param {string[]} columns    要分析的欄位
 * @returns {Array<{ col, n, mean, sd, se, min, max, median, skewness, kurtosis }>}
 */
export function runDescriptive(rows, columns) {
  return columns.map((col) => {
    const values = rows
      .map((r) => r[col])
      .filter((v) => !isMissing(v))
      .map(Number)
    return { col, ...describe(values) }
  })
}
