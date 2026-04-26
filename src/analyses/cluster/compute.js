/**
 * 集群分析 — 把 settings 轉成計算結果。
 *
 * settings: { vars, method: 'kmeans' | 'hierarchical', k, standardize }
 *
 * Wraps src/lib/stats/cluster.js for the panel and validates settings
 * before dispatch.
 */
import { clusterAnalysis } from '../../lib/stats/cluster.js'

export function runCluster(rows, settings) {
  const vars = settings?.vars || []
  if (vars.length < 2) return { error: 'needAtLeastTwoVars' }
  const method = settings?.method || 'kmeans'
  if (method !== 'kmeans' && method !== 'hierarchical') {
    return { error: 'unknownMethod' }
  }
  const k = Number(settings?.k ?? 3)
  if (!Number.isInteger(k) || k < 2 || k > 10) return { error: 'kRange' }
  const standardize = settings?.standardize !== false
  return clusterAnalysis(rows, { vars, method, k, standardize })
}
