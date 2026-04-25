/**
 * 常態性檢定 — Shapiro-Wilk + Kolmogorov-Smirnov（Lilliefors 修正）。
 *
 * settings: { selectedVars: string[] }
 *
 * 對每個變數做 listwise（剔除缺值），同時跑 SW 與 KS，回傳統一表格。
 */
import { isMissing } from '../../lib/variableTypes.js'
import { shapiroWilk, kolmogorovSmirnov } from '../../lib/stats/normality.js'

export function runNormality(rows, settings) {
  const cols = settings?.selectedVars || []
  if (cols.length < 1) return { error: 'needAtLeastOne' }

  const results = cols.map((col) => {
    const values = rows
      .map((r) => r[col])
      .filter((v) => !isMissing(v))
      .map(Number)
      .filter(Number.isFinite)
    const sw = shapiroWilk(values)
    const ks = kolmogorovSmirnov(values)
    return { col, n: values.length, sw, ks }
  })

  return { rows: results }
}
