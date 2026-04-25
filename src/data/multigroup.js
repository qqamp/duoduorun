/**
 * 多組比較研究資料集
 *
 * 用途：單因子 ANOVA + Tukey HSD / Bonferroni 事後比較
 *
 * 60 筆資料：傳統講授 / 課堂討論 / 翻轉教室 各 20 人。
 * 變數：
 *   id, teaching_method, exam_score
 *
 * 設計：
 *   - lecture       平均 ~70
 *   - discussion    平均 ~75（與 lecture 差異不顯著）
 *   - flipped       平均 ~82（與 lecture 顯著差異、與 discussion 邊緣顯著）
 *   - 整體 ANOVA 應達顯著
 *   - Tukey HSD 預期 lecture < flipped 顯著、discussion < flipped 邊緣顯著、lecture vs discussion ns
 *
 * 含 1 筆遺漏值（exam_score）。
 */
import { mulberry32, gaussian } from './prng.js'

function generate() {
  const rng = mulberry32(7)
  const data = []
  let id = 1
  const groups = [
    { method: 'lecture',    mean: 70, sd: 7 },
    { method: 'discussion', mean: 75, sd: 7 },
    { method: 'flipped',    mean: 82, sd: 7 },
  ]

  for (const g of groups) {
    for (let i = 0; i < 20; i++) {
      const score = Math.round(g.mean + gaussian(rng) * g.sd)
      data.push({
        id: id++,
        teaching_method: g.method,
        exam_score: Math.max(40, Math.min(100, score)),
      })
    }
  }

  data[27].exam_score = null

  return data
}

export const MULTIGROUP_DATA = generate()

export const MULTIGROUP_LABELS = {
  zh: {
    id: '編號',
    teaching_method: '教學方法',
    exam_score: '考試分數',
  },
  en: {
    id: 'ID',
    teaching_method: 'Teaching method',
    exam_score: 'Exam score',
  },
}

export const MULTIGROUP_VALUE_LABELS = {
  teaching_method: {
    zh: { lecture: '傳統講授', discussion: '課堂討論', flipped: '翻轉教室' },
    en: { lecture: 'Lecture', discussion: 'Discussion', flipped: 'Flipped' },
  },
}
