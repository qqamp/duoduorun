/**
 * 單因子變異數分析（One-way ANOVA） + Tukey HSD 事後比較
 *
 * 對外 API：
 *   oneWayANOVA(groups) → 完整 ANOVA 結果
 *   tukeyHSD(groups, msw, dfw) → 兩兩比較陣列
 *
 *   groups: { name: string, values: number[] }[]
 *
 * ANOVA 公式：
 *   M_i      — 第 i 組平均
 *   M̄        — 總平均
 *   SS_between = Σ n_i (M_i - M̄)²
 *   SS_within  = Σ_i Σ_j (X_ij - M_i)²
 *   SS_total   = SS_between + SS_within
 *   df_between = k - 1
 *   df_within  = N - k
 *   df_total   = N - 1
 *   MS_between = SS_between / df_between
 *   MS_within  = SS_within / df_within
 *   F          = MS_between / MS_within
 *   p          = F 分布右尾
 *   η²         = SS_between / SS_total（樣本內 effect size）
 *   ω²         = (SS_between - df_between · MS_within) / (SS_total + MS_within)（無偏估計）
 *
 * Tukey HSD（Tukey-Kramer for unequal n）：
 *   q_ij = |M_i - M_j| / √( MS_within · (1/n_i + 1/n_j) / 2 )
 *   p    = ptukeyUpper(q, k, df_within)
 *
 *   95% CI：M_i - M_j ± q_critical · √( MS_within · (1/n_i + 1/n_j) / 2 )
 *   （本實作不傳 CI，UI 端要時可從 q_critical 反推；q_critical = qtukey 預留）
 */
import { mean } from './descriptive.js'
import { pF, pT } from './pvalue.js'
import { ptukeyUpper } from './ptukey.js'

export function oneWayANOVA(groups) {
  const k = groups.length
  if (k < 2) return { error: 'need->=2-groups' }
  for (const g of groups) {
    if (!g.values || g.values.length < 1)
      return { error: 'group-empty', meta: { name: g.name } }
  }

  const N = groups.reduce((s, g) => s + g.values.length, 0)
  if (N <= k) return { error: 'need-N>k' }

  // 各組統計
  const groupStats = groups.map((g) => {
    const m = mean(g.values)
    const n = g.values.length
    let ss = 0
    for (const v of g.values) ss += (v - m) * (v - m)
    return { name: g.name, n, mean: m, sd: Math.sqrt(n > 1 ? ss / (n - 1) : 0), ssWithin: ss }
  })

  // 總平均
  const allValues = groups.flatMap((g) => g.values)
  const grandMean = mean(allValues)

  // SS_between
  let ssBetween = 0
  for (const gs of groupStats) {
    ssBetween += gs.n * Math.pow(gs.mean - grandMean, 2)
  }
  // SS_within
  let ssWithin = 0
  for (const gs of groupStats) ssWithin += gs.ssWithin
  const ssTotal = ssBetween + ssWithin

  const dfBetween = k - 1
  const dfWithin = N - k
  const dfTotal = N - 1

  const msBetween = ssBetween / dfBetween
  const msWithin = dfWithin > 0 ? ssWithin / dfWithin : NaN

  const F = msWithin > 0 ? msBetween / msWithin : Infinity
  const p = pF(F, dfBetween, dfWithin)

  // Effect sizes
  const eta2 = ssTotal === 0 ? NaN : ssBetween / ssTotal
  const omega2 =
    ssTotal + msWithin === 0
      ? NaN
      : (ssBetween - dfBetween * msWithin) / (ssTotal + msWithin)

  return {
    k,
    N,
    groupStats,
    grandMean,
    ssBetween, ssWithin, ssTotal,
    dfBetween, dfWithin, dfTotal,
    msBetween, msWithin,
    F, p,
    eta2, omega2,
  }
}

/**
 * Tukey HSD 兩兩比較
 *
 * @param {Array<{name, values, mean, n}>} groupStats 由 oneWayANOVA 回傳的 groupStats
 * @param {number} msWithin
 * @param {number} dfWithin
 * @returns {Array<{ a, b, meanDiff, se, q, p }>}
 */
export function tukeyHSD(groupStats, msWithin, dfWithin) {
  const k = groupStats.length
  const pairs = []
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const gi = groupStats[i]
      const gj = groupStats[j]
      const meanDiff = gi.mean - gj.mean
      const se = Math.sqrt((msWithin * (1 / gi.n + 1 / gj.n)) / 2)
      const q = Math.abs(meanDiff) / se
      const p = ptukeyUpper(q, k, dfWithin)
      pairs.push({
        a: gi.name,
        b: gj.name,
        meanDiff,
        se,
        q,
        p,
      })
    }
  }
  return pairs
}

/**
 * Bonferroni 事後比較
 *
 * 對每對組別做配對 t 檢定（用 ANOVA 的 pooled MSE），再把 raw p 乘以
 * 比較組數 m = k(k-1)/2，最後 clamp 到 1。
 *
 * 公式：
 *   t_ij = (M_i − M_j) / √( MS_within · (1/n_i + 1/n_j) )
 *   p_raw = 2 · (1 − F_t(|t_ij|, df_within))
 *   p_adj = min(1, p_raw · m)
 *
 * 與 Tukey HSD 比較：Bonferroni 較保守（family-wise error control 但會犧牲 power），
 * Tukey HSD 對於「所有兩兩比較」最佳化，通常更具檢定力。
 *
 * @param {Array<{name, n, mean}>} groupStats
 * @param {number} msWithin
 * @param {number} dfWithin
 * @returns {Array<{ a, b, meanDiff, se, t, df, pRaw, p }>}
 */
export function bonferroni(groupStats, msWithin, dfWithin) {
  const k = groupStats.length
  const m = (k * (k - 1)) / 2 // 比較組數
  const pairs = []
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const gi = groupStats[i]
      const gj = groupStats[j]
      const meanDiff = gi.mean - gj.mean
      const se = Math.sqrt(msWithin * (1 / gi.n + 1 / gj.n))
      const t = meanDiff / se
      const pRaw = pT(Math.abs(t), dfWithin)
      const pAdj = Math.min(1, pRaw * m)
      pairs.push({
        a: gi.name,
        b: gj.name,
        meanDiff,
        se,
        t,
        df: dfWithin,
        pRaw,
        p: pAdj,
      })
    }
  }
  return { pairs, m }
}
