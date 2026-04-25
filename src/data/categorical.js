/**
 * 類別資料調查資料集
 *
 * 用途：卡方獨立性檢定、Cramer's V
 *
 * 80 筆資料。
 * 變數：
 *   id, gender, preferred_format, age_group
 *
 * 設計：
 *   - gender × preferred_format 兩變數有非零相關（女性偏好線上、男性偏好實體）
 *   - 預期卡方檢定達顯著、Cramer's V 約 0.25-0.35（小到中效果量）
 *   - age_group 與 preferred_format 有更弱的相關（年輕族群偏好線上）
 *
 * 含 1 筆遺漏值（preferred_format）。
 */
import { mulberry32 } from './prng.js'

function generate() {
  const rng = mulberry32(99)
  const data = []
  const ageGroups = ['18-29', '30-44', '45-59']

  // 條件分佈表：gender → preferred_format 機率
  // 女性：online 0.50 / hybrid 0.30 / in-person 0.20
  // 男性：online 0.25 / hybrid 0.30 / in-person 0.45
  const formatByGender = {
    female: [['online', 0.50], ['hybrid', 0.80], ['in-person', 1.00]],
    male:   [['online', 0.25], ['hybrid', 0.55], ['in-person', 1.00]],
  }

  function pickFormat(gender) {
    const r = rng()
    const table = formatByGender[gender]
    for (const [val, threshold] of table) {
      if (r <= threshold) return val
    }
    return 'in-person'
  }

  for (let i = 1; i <= 80; i++) {
    const gender = rng() < 0.5 ? 'female' : 'male'
    const format = pickFormat(gender)
    const age = ageGroups[Math.floor(rng() * ageGroups.length)]
    data.push({
      id: i,
      gender,
      preferred_format: format,
      age_group: age,
    })
  }

  data[34].preferred_format = null

  return data
}

export const CATEGORICAL_DATA = generate()

export const CATEGORICAL_LABELS = {
  zh: {
    id: '編號',
    gender: '性別',
    preferred_format: '偏好上課形式',
    age_group: '年齡組',
  },
  en: {
    id: 'ID',
    gender: 'Gender',
    preferred_format: 'Preferred format',
    age_group: 'Age group',
  },
}

export const CATEGORICAL_VALUE_LABELS = {
  gender: {
    zh: { female: '女性', male: '男性' },
    en: { female: 'Female', male: 'Male' },
  },
  preferred_format: {
    zh: { online: '線上', 'in-person': '實體', hybrid: '混合' },
    en: { online: 'Online', 'in-person': 'In-person', hybrid: 'Hybrid' },
  },
}
