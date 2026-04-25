/**
 * 員工滿意度調查資料集
 *
 * 用途：相關分析、簡單／多元迴歸、Cronbach's α
 *
 * 50 筆資料，含 1 筆遺漏值（performance_score）。
 *
 * 變數設計邏輯：
 *   department    — 5 類別均勻分佈
 *   tenure_years  — 連續變數 1-25 年
 *   q1-q5         — Likert 1-5 滿意度量表，q1/q2/q3/q5 共享同一個潛在因子（適合 α）
 *                   q4「薪資福利」刻意設計與其他項較弱相關（在α分析中會看到刪題後 α 上升）
 *   performance   — 績效分數，與 tenure_years 與 q5 正相關
 */
import { mulberry32, pick, randInt, gaussian, clampInt } from './prng'

function generate() {
  const rng = mulberry32(42)
  const departments = ['人事', '資訊', '業務', '財務', '研發']
  const data = []

  for (let i = 1; i <= 50; i++) {
    const dept = pick(rng, departments)
    const tenure = randInt(rng, 1, 25)

    // 基礎滿意度因子：個人傾向
    const baseLevel = 3 + gaussian(rng) * 0.7

    // q1/q2/q3/q5 共享 baseLevel
    const q1 = clampInt(baseLevel + gaussian(rng) * 0.5, 1, 5)
    const q2 = clampInt(baseLevel + gaussian(rng) * 0.5, 1, 5)
    const q3 = clampInt(baseLevel + gaussian(rng) * 0.6, 1, 5)
    const q5 = clampInt(baseLevel + gaussian(rng) * 0.4, 1, 5)
    // q4 故意較獨立
    const q4 = clampInt(2.5 + gaussian(rng) * 1.0, 1, 5)

    const performance = Math.round(
      55 + tenure * 1.0 + (q5 - 3) * 6 + gaussian(rng) * 8
    )

    data.push({
      id: i,
      department: dept,
      tenure_years: tenure,
      q1, q2, q3, q4, q5,
      performance_score: Math.max(40, Math.min(100, performance)),
    })
  }

  // 故意製造遺漏值供「遺漏值處理」功能展示
  data[3].performance_score = null
  data[12].q4 = null

  return data
}

export const EMPLOYEE_DATA = generate()

/** 變數標籤（用於 VariableList 顯示） */
export const EMPLOYEE_LABELS = {
  zh: {
    id: '編號',
    department: '部門',
    tenure_years: '年資（年）',
    q1: '工作環境',
    q2: '同事關係',
    q3: '主管溝通',
    q4: '薪資福利',
    q5: '整體滿意',
    performance_score: '績效分數',
  },
  en: {
    id: 'ID',
    department: 'Department',
    tenure_years: 'Tenure (years)',
    q1: 'Work environment',
    q2: 'Coworker relations',
    q3: 'Supervisor communication',
    q4: 'Compensation',
    q5: 'Overall satisfaction',
    performance_score: 'Performance score',
  },
}

/** α 分析的量表題組（提供給 Cronbach's α 預設選擇） */
export const EMPLOYEE_SCALE_VARS = ['q1', 'q2', 'q3', 'q4', 'q5']
