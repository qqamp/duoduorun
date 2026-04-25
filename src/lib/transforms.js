/**
 * 變數轉換 — 純函式工具
 *
 * 支援的型別：
 *   log              — 自然對數 ln(x)；x ≤ 0 → null
 *   log10            — 常用對數 log₁₀(x)；x ≤ 0 → null
 *   zscore           — Z 分數標準化 (x - M) / SD（用該欄全部非缺值的 M / SD）
 *   recode_reverse   — Likert 反向計分：new = max + min - x（params.min, params.max）
 *
 * 對外 API：
 *   applyTransforms(rows, transforms) → 在 rows 副本上加上每個 transform 對應的欄位
 *   suggestName(source, type)         → 預設欄位名稱（例：z_q1, log_x, rev_q4）
 *   suggestLabel(label, type, lang)   → 預設中英 label（例：「Z 分數（工作環境）」）
 *
 * 設計約束：
 *   - 轉換只作用在「原始欄位」上，不作用在「另一個轉換產生的欄位」（避免循環/順序依賴）
 *   - 遺漏值（null/undefined/空字串）保留為 null
 *   - 不修改原始 rows，回傳新 rows 副本
 */
import { mean, sd } from './stats/descriptive.js'
import { isMissing } from './variableTypes.js'

export const TRANSFORM_TYPES = ['log', 'log10', 'zscore', 'recode_reverse']

export function suggestName(source, type) {
  const m = {
    log: 'log',
    log10: 'log10',
    zscore: 'z',
    recode_reverse: 'rev',
  }
  return `${m[type] || 't'}_${source}`
}

export function suggestLabel(sourceLabel, type, lang) {
  const zh = {
    log: '對數',
    log10: '常用對數',
    zscore: 'Z 分數',
    recode_reverse: '反向',
  }
  const en = {
    log: 'log',
    log10: 'log10',
    zscore: 'Z-score',
    recode_reverse: 'reversed',
  }
  if (lang === 'zh-TW') {
    return `${zh[type] || ''}（${sourceLabel}）`
  }
  return `${en[type] || ''}(${sourceLabel})`
}

export function applyTransforms(rows, transforms) {
  if (!transforms || transforms.length === 0) return rows

  // 預先計算需要 aggregate 的轉換（目前只有 zscore）
  const aggregates = {}
  for (const tr of transforms) {
    if (tr.type === 'zscore') {
      const values = rows
        .map((r) => r[tr.source])
        .filter((v) => !isMissing(v))
        .map(Number)
        .filter(Number.isFinite)
      aggregates[tr.name] =
        values.length >= 2 ? { mean: mean(values), sd: sd(values) } : null
    }
  }

  return rows.map((row) => {
    const out = { ...row }
    for (const tr of transforms) {
      const raw = row[tr.source]
      if (isMissing(raw)) {
        out[tr.name] = null
        continue
      }
      const n = Number(raw)
      if (!Number.isFinite(n)) {
        out[tr.name] = null
        continue
      }
      switch (tr.type) {
        case 'log':
          out[tr.name] = n > 0 ? Math.log(n) : null
          break
        case 'log10':
          out[tr.name] = n > 0 ? Math.log10(n) : null
          break
        case 'zscore': {
          const agg = aggregates[tr.name]
          out[tr.name] = agg && agg.sd > 0 ? (n - agg.mean) / agg.sd : null
          break
        }
        case 'recode_reverse': {
          const lo = Number(tr.params?.min)
          const hi = Number(tr.params?.max)
          if (Number.isFinite(lo) && Number.isFinite(hi) && hi > lo) {
            out[tr.name] = hi + lo - n
          } else {
            out[tr.name] = null
          }
          break
        }
        default:
          out[tr.name] = null
      }
    }
    return out
  })
}
