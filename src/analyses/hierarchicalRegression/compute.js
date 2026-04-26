/**
 * 階層迴歸 — 把 settings 轉成計算結果。
 *
 * settings: { yVar, blocks: string[][] }
 *
 * 處理：
 *   - 直接呼叫 lib 的 hierarchicalRegression
 *   - listwise deletion 與 ΔR²/ΔF 計算皆在 lib 完成
 */
import { hierarchicalRegression } from '../../lib/stats/hierarchicalRegression.js'

export function runHierarchicalRegression(rows, settings) {
  const { yVar, blocks } = settings || {}
  if (!yVar) return { error: 'pickY' }
  if (!Array.isArray(blocks) || blocks.length < 1) {
    return { error: 'needBlock' }
  }
  // 至少需要一個 block 有變項
  const anyFilled = blocks.some((b) => Array.isArray(b) && b.length > 0)
  if (!anyFilled) return { error: 'emptyBlock' }
  // 任一 block 為空亦回報錯誤
  for (const b of blocks) {
    if (!Array.isArray(b) || b.length === 0) return { error: 'emptyBlock' }
  }
  return hierarchicalRegression(rows, yVar, blocks)
}
