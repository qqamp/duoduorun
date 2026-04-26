/**
 * 無母數檢定 — 把 settings 轉成計算結果。
 *
 * settings:
 *   { type, depVar, groupVar, var1, var2 }
 *
 *   type ∈ { 'mw', 'wilcoxon', 'kw' }
 */
import { isMissing } from '../../lib/variableTypes.js'
import { mannWhitneyU, wilcoxonSignedRank, kruskalWallis, dunnPostHoc } from '../../lib/stats/nonparametric.js'

export function runNonparametric(rows, settings) {
  const type = settings?.type || 'mw'

  if (type === 'mw') return runMW(rows, settings)
  if (type === 'wilcoxon') return runWilcoxon(rows, settings)
  if (type === 'kw') return runKW(rows, settings)
  return { error: 'unknown-type' }
}

function runMW(rows, { depVar, groupVar }) {
  if (!depVar) return { error: 'pickDep' }
  if (!groupVar) return { error: 'pickGroup' }

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
  const keys = Object.keys(buckets)
  if (keys.length !== 2) return { error: 'groupVarBadGroups', meta: { k: keys.length } }
  const [g1Name, g2Name] = keys
  const r = mannWhitneyU(buckets[g1Name], buckets[g2Name])
  if (r.error) return { error: r.error }
  return { type: 'mw', depVar, groupVar, g1Name, g2Name, ...r }
}

function runWilcoxon(rows, { var1, var2 }) {
  if (!var1) return { error: 'pickVar1' }
  if (!var2) return { error: 'pickVar2' }
  if (var1 === var2) return { error: 'sameVar' }
  const x1 = []
  const x2 = []
  for (const row of rows) {
    const a = row[var1]
    const b = row[var2]
    if (isMissing(a) || isMissing(b)) continue
    const na = Number(a)
    const nb = Number(b)
    if (!Number.isFinite(na) || !Number.isFinite(nb)) continue
    x1.push(na)
    x2.push(nb)
  }
  const r = wilcoxonSignedRank(x1, x2)
  if (r.error) return { error: r.error }
  return { type: 'wilcoxon', var1, var2, ...r }
}

function runKW(rows, { depVar, groupVar, dunnPostHoc: doDunn }) {
  if (!depVar) return { error: 'pickDep' }
  if (!groupVar) return { error: 'pickGroup' }

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
  const groupNames = Object.keys(buckets)
  if (groupNames.length < 3) return { error: 'factorBadGroups', meta: { k: groupNames.length } }
  const groups = groupNames.map((name) => ({ name, values: buckets[name] }))
  const r = kruskalWallis(groups)
  if (r.error) return { error: r.error }
  const out = { type: 'kw', depVar, factor: groupVar, ...r }
  if (doDunn) {
    const d = dunnPostHoc(groups)
    if (!d.error) out.dunn = d
  }
  return out
}
