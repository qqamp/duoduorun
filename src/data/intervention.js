/**
 * 教學介入實驗資料集
 *
 * 用途：獨立樣本 t（實驗 vs 控制）、配對樣本 t（前測 vs 後測）
 *
 * 60 筆資料：實驗組 30、控制組 30。
 * 變數：
 *   id, group(control/experimental), pre_score, post_score
 *
 * 設計：
 *   - 兩組前測平均接近（控制 65, 實驗 65）→ 兩組前測 t 應為 ns
 *   - 控制組後測上升 ~3 分（自然成長）
 *   - 實驗組後測上升 ~12 分（介入效果）
 *   - 後測 t 應達顯著
 *   - 配對 t（前後測）兩組都應顯著
 *
 * 含 2 筆遺漏值（post_score）。
 */
import { mulberry32, gaussian } from './prng.js'

function generate() {
  const rng = mulberry32(123)
  const data = []
  let id = 1

  // 控制組 30 人
  for (let i = 0; i < 30; i++) {
    const pre = Math.round(65 + gaussian(rng) * 8)
    const post = Math.round(pre + 3 + gaussian(rng) * 5)
    data.push({
      id: id++,
      group: 'control',
      pre_score: Math.max(40, Math.min(100, pre)),
      post_score: Math.max(40, Math.min(100, post)),
    })
  }

  // 實驗組 30 人
  for (let i = 0; i < 30; i++) {
    const pre = Math.round(65 + gaussian(rng) * 8)
    const post = Math.round(pre + 12 + gaussian(rng) * 6)
    data.push({
      id: id++,
      group: 'experimental',
      pre_score: Math.max(40, Math.min(100, pre)),
      post_score: Math.max(40, Math.min(100, post)),
    })
  }

  // 兩筆遺漏值
  data[5].post_score = null
  data[42].post_score = null

  return data
}

export const INTERVENTION_DATA = generate()

export const INTERVENTION_LABELS = {
  zh: {
    id: '編號',
    group: '組別',
    pre_score: '前測分數',
    post_score: '後測分數',
  },
  en: {
    id: 'ID',
    group: 'Group',
    pre_score: 'Pre-test score',
    post_score: 'Post-test score',
  },
}

/** 組別值的中英對照（categorical 顯示用） */
export const INTERVENTION_VALUE_LABELS = {
  group: {
    zh: { control: '控制組', experimental: '實驗組' },
    en: { control: 'Control', experimental: 'Experimental' },
  },
}
