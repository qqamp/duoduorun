/**
 * t 檢定 — 把使用者設定（type, dep, group, var1, var2, mu0）轉成計算結果。
 *
 * 流程：
 *   1. 依 type 選對應的計算函式
 *   2. 從 rows 中抽出對應的數值（per-pair / per-group listwise 處理遺漏值）
 *   3. 跑 t 檢定
 *   4. 跑前提檢核（Shapiro-Wilk 常態性 + Levene's 等變異數）
 *   5. 回傳統一格式的結果
 *
 * 回傳：{ type, ttest, assumptions } 或 { error: <string> }
 */
import { isMissing } from '../../lib/variableTypes.js'
import { independentT, pairedT, oneSampleT } from '../../lib/stats/ttest.js'
import { shapiroWilk } from '../../lib/stats/normality.js'
import { levene } from '../../lib/stats/levene.js'
import { describe } from '../../lib/stats/descriptive.js'

/**
 * @param {Array<object>} rows
 * @param {{ type, depVar, groupVar, var1, var2, mu0 }} settings
 */
export function runTTest(rows, settings) {
  const { type } = settings

  if (type === 'independent') return runIndependent(rows, settings)
  if (type === 'paired')      return runPaired(rows, settings)
  if (type === 'oneSample')   return runOneSample(rows, settings)
  return { error: 'unknown-type' }
}

/* ─────────────────────  獨立樣本  ───────────────────── */

function runIndependent(rows, { depVar, groupVar }) {
  if (!depVar)   return { error: 'pickDep' }
  if (!groupVar) return { error: 'pickGroup' }

  // 依分組變項分桶
  const buckets = {}
  for (const r of rows) {
    const g = r[groupVar]
    const v = r[depVar]
    if (isMissing(g) || isMissing(v)) continue
    const num = Number(v)
    if (!Number.isFinite(num)) continue
    if (!buckets[g]) buckets[g] = []
    buckets[g].push(num)
  }
  const groupKeys = Object.keys(buckets)
  if (groupKeys.length !== 2) {
    return { error: 'groupVarBadGroups', meta: { k: groupKeys.length } }
  }
  const [g1Name, g2Name] = groupKeys
  const x1 = buckets[g1Name]
  const x2 = buckets[g2Name]

  const ttest = independentT(x1, x2)
  if (ttest.error) return { error: ttest.error }

  // 前提檢核
  const sw1 = shapiroWilk(x1)
  const sw2 = shapiroWilk(x2)
  const lv = levene([x1, x2])

  return {
    type: 'independent',
    ttest: { ...ttest, g1Name, g2Name },
    assumptions: {
      normality: [
        { name: g1Name, ...sw1 },
        { name: g2Name, ...sw2 },
      ],
      homogeneity: lv,
    },
  }
}

/* ─────────────────────  配對樣本  ───────────────────── */

function runPaired(rows, { var1, var2 }) {
  if (!var1) return { error: 'pickVar1' }
  if (!var2) return { error: 'pickVar2' }
  if (var1 === var2) return { error: 'var1-equals-var2' }

  // listwise pair-wise：兩變數任一缺值即剔除整對
  const x1 = []
  const x2 = []
  for (const r of rows) {
    const a = r[var1]
    const b = r[var2]
    if (isMissing(a) || isMissing(b)) continue
    const na = Number(a)
    const nb = Number(b)
    if (!Number.isFinite(na) || !Number.isFinite(nb)) continue
    x1.push(na)
    x2.push(nb)
  }

  const ttest = pairedT(x1, x2)
  if (ttest.error) return { error: ttest.error }

  // 配對差的常態性
  const diffs = x1.map((v, i) => v - x2[i])
  const sw = shapiroWilk(diffs)

  return {
    type: 'paired',
    ttest: { ...ttest, var1Name: var1, var2Name: var2 },
    diffStats: describe(diffs),
    assumptions: {
      normality: [{ name: 'diff', ...sw }],
    },
  }
}

/* ─────────────────────  單一樣本  ───────────────────── */

function runOneSample(rows, { depVar, mu0 }) {
  if (!depVar) return { error: 'pickDep' }
  if (typeof mu0 !== 'number' || !Number.isFinite(mu0)) return { error: 'enterMu0' }

  const x = []
  for (const r of rows) {
    const v = r[depVar]
    if (isMissing(v)) continue
    const num = Number(v)
    if (Number.isFinite(num)) x.push(num)
  }

  const ttest = oneSampleT(x, mu0)
  if (ttest.error) return { error: ttest.error }

  const sw = shapiroWilk(x)

  return {
    type: 'oneSample',
    ttest,
    assumptions: {
      normality: [{ name: depVar, ...sw }],
    },
  }
}
