/**
 * 無母數檢定 — Mann-Whitney U、Wilcoxon Signed-Rank、Kruskal-Wallis
 *
 * 對外 API：
 *   mannWhitneyU(x1, x2)     → 獨立兩組秩和檢定
 *   wilcoxonSignedRank(x1,x2)→ 配對樣本秩和檢定（1 樣本對 0 也可）
 *   kruskalWallis(groups)    → 三組以上秩和 ANOVA
 *
 * p-value：
 *   全部用 large-sample 常態近似（Z 檢定），含 tie 校正。
 *   小樣本（每組 < 10）的精確分布不實作；UI 端可加註樣本太小的提醒。
 *   實務上 n ≥ 10 / 組常態近似已足夠精確（< 1% 偏差）。
 */
import { normalCdf } from './pvalue.js'
import { pChiSq } from './pvalue.js'
import { ranks, pooledRanks } from './ranks.js'

/* ─────────────────────  Mann-Whitney U  ───────────────────── */

/**
 * Mann-Whitney U（獨立兩組）
 *
 * 公式：
 *   - 對 (x1 ∪ x2) 排序給平均秩
 *   - U₁ = Σranks_in_group1 - n₁(n₁+1)/2
 *   - U₂ = n₁n₂ - U₁
 *   - U  = min(U₁, U₂)
 *   - 期望 μ = n₁n₂ / 2
 *   - 變異 σ² = n₁n₂(n₁+n₂+1)/12，含 tie 校正：
 *     σ² = n₁n₂/(N(N-1)) · (N³-N - Σ(t³-t))/12
 *   - z = (U₁ - μ) / σ（取 U₁ 而非 min，可保留方向）
 *   - p = 2(1 - Φ(|z|))
 *   - 效果量 r = |z| / √N
 */
export function mannWhitneyU(x1, x2) {
  const n1 = x1.length
  const n2 = x2.length
  if (n1 < 2 || n2 < 2) return { error: 'each-group-needs-n>=2' }

  const { groupSums, totalN, tiedGroups } = pooledRanks([x1, x2])
  const R1 = groupSums[0]
  const U1 = R1 - (n1 * (n1 + 1)) / 2
  const U2 = n1 * n2 - U1
  const U = Math.min(U1, U2)

  const mu = (n1 * n2) / 2
  const N = n1 + n2

  // tie correction
  let tieSum = 0
  for (const t of tiedGroups) tieSum += t * t * t - t
  let sigma2
  if (tiedGroups.length === 0) {
    sigma2 = (n1 * n2 * (N + 1)) / 12
  } else {
    sigma2 = (n1 * n2 / (N * (N - 1))) * ((N * N * N - N - tieSum) / 12)
  }
  const sigma = Math.sqrt(sigma2)
  // z 用 U1 而非 min，保留方向
  const zRaw = (U1 - mu) / sigma
  const p = 2 * (1 - normalCdf(Math.abs(zRaw)))
  const r = Math.abs(zRaw) / Math.sqrt(N)

  return {
    U1, U2, U, R1, R2: totalN ? (n1 + n2) * (n1 + n2 + 1) / 2 - R1 : 0,
    n1, n2, N,
    z: zRaw,
    p: Math.max(0, Math.min(1, p)),
    r,
    tieCorrection: tiedGroups.length > 0,
  }
}

/* ─────────────────────  Wilcoxon Signed-Rank  ───────────────────── */

/**
 * Wilcoxon Signed-Rank（配對／單一樣本對 0）
 *
 * 演算法：
 *   D = x1 - x2（配對差）
 *   去除 D = 0 的配對
 *   對 |D| 排平均秩（含 tie 校正）
 *   W+ = Σranks for D>0
 *   W- = Σranks for D<0
 *   T  = min(W+, W-)
 *   n  = 有效配對數（D≠0）
 *   期望 μ = n(n+1)/4
 *   變異 σ² = n(n+1)(2n+1)/24，並做 tie 校正：
 *     σ² 扣掉 Σ(t³-t)/48
 *   z = (W+ - μ) / σ
 *   p = 2(1 - Φ(|z|))
 *   效果量 r = |z| / √n
 */
export function wilcoxonSignedRank(x1, x2) {
  if (x1.length !== x2.length) return { error: 'paired-arrays-must-match-length' }

  const diffs = []
  for (let i = 0; i < x1.length; i++) {
    const d = x1[i] - x2[i]
    if (d !== 0 && Number.isFinite(d)) diffs.push(d)
  }
  const n = diffs.length
  if (n < 2) return { error: 'need-n>=2-non-zero-diffs' }

  const absDiffs = diffs.map((d) => Math.abs(d))
  const { ranks: r, tiedGroups } = ranks(absDiffs)
  let Wpos = 0
  let Wneg = 0
  for (let i = 0; i < n; i++) {
    if (diffs[i] > 0) Wpos += r[i]
    else Wneg += r[i]
  }

  const mu = (n * (n + 1)) / 4
  let sigma2 = (n * (n + 1) * (2 * n + 1)) / 24
  let tieSum = 0
  for (const t of tiedGroups) tieSum += (t * t * t - t)
  sigma2 -= tieSum / 48
  const sigma = Math.sqrt(sigma2)
  const z = (Wpos - mu) / sigma
  const p = 2 * (1 - normalCdf(Math.abs(z)))
  const T = Math.min(Wpos, Wneg)
  const effR = Math.abs(z) / Math.sqrt(n)

  return {
    Wpos, Wneg, T,
    n, nDropped: x1.length - n,
    z,
    p: Math.max(0, Math.min(1, p)),
    r: effR,
    tieCorrection: tiedGroups.length > 0,
  }
}

/* ─────────────────────  Kruskal-Wallis  ───────────────────── */

/**
 * Kruskal-Wallis H（k 組獨立樣本秩和 ANOVA）
 *
 * 公式：
 *   - 合併所有組，給平均秩
 *   - H = (12 / (N(N+1))) · Σ(R_i² / n_i) - 3(N+1)
 *   - tie 校正：H' = H / (1 - Σ(t³-t) / (N³-N))
 *   - df = k - 1
 *   - p = pChiSq right-tail
 *   - 效果量 ε² = (H - k + 1) / (N - k)
 */
export function kruskalWallis(groups) {
  const k = groups.length
  if (k < 2) return { error: 'need->=2-groups' }
  for (const g of groups) {
    if (!g.values || g.values.length < 1) return { error: 'group-empty' }
  }

  const arrays = groups.map((g) => g.values)
  const { groupSums, groupNs, totalN, tiedGroups } = pooledRanks(arrays)
  const N = totalN
  if (N <= k) return { error: 'need-N>k' }

  let sumRsqOverN = 0
  for (let i = 0; i < k; i++) {
    sumRsqOverN += (groupSums[i] * groupSums[i]) / groupNs[i]
  }
  let H = (12 / (N * (N + 1))) * sumRsqOverN - 3 * (N + 1)

  // tie correction
  let tieSum = 0
  for (const t of tiedGroups) tieSum += (t * t * t - t)
  const tieFactor = 1 - tieSum / (N * N * N - N)
  if (tieFactor > 0) H = H / tieFactor

  const df = k - 1
  const p = pChiSq(H, df)
  const eps2 = N - k > 0 ? (H - k + 1) / (N - k) : NaN

  return {
    H, df, p, N, k,
    epsilon2: eps2,
    groupStats: groups.map((g, i) => ({
      name: g.name,
      n: groupNs[i],
      meanRank: groupSums[i] / groupNs[i],
      sumRank: groupSums[i],
    })),
    tieCorrection: tiedGroups.length > 0,
  }
}

/* ─────────────────────  Dunn's Post-Hoc（KW 事後比較）  ───────────────────── */

/**
 * Dunn's test — Kruskal-Wallis 顯著後的兩兩比較
 *
 * 公式：
 *   - 對全資料的 pooled ranks 計算各組平均秩 R̄_g
 *   - 對每對 (i, j)：
 *       SE = √( [ (N(N+1) − T_correct) / 12 ] · (1/n_i + 1/n_j) )
 *       其中 T_correct = Σ(t³ − t) / (N − 1)（並列校正）；無並列時 T_correct = 0
 *       z = (R̄_i − R̄_j) / SE
 *       p_raw = 2(1 − Φ(|z|))   ← 常態分布
 *       p_adj = min(1, p_raw · m)，m = k(k−1)/2（Bonferroni）
 *
 * 注意：z 用常態分布（並非 t），因 Dunn 的衍生基於 ranks 的常態近似。
 *
 * @param {Array<{name, values: number[]}>} groups
 * @returns {{ comparisons, k, n, tieCorrection } | { error }}
 */
export function dunnPostHoc(groups) {
  const k = groups.length
  if (k < 3) return { error: 'need->=3-groups' }
  for (const g of groups) {
    if (!g.values || g.values.length < 1) return { error: 'group-empty' }
  }

  const arrays = groups.map((g) => g.values)
  const { groupSums, groupNs, totalN, tiedGroups } = pooledRanks(arrays)
  const N = totalN
  if (N <= k) return { error: 'need-N>k' }

  // tie correction term
  let tieSum = 0
  for (const t of tiedGroups) tieSum += (t * t * t - t)
  // base variance term: N(N+1)/12 with tie correction
  // SE² = [ (N(N+1) − tieSum/(N−1)) / 12 ] · (1/n_i + 1/n_j)
  const tieAdjust = N > 1 ? tieSum / (N - 1) : 0
  const variancePart = (N * (N + 1) - tieAdjust) / 12

  const meanRanks = groupSums.map((s, i) => s / groupNs[i])
  const m = (k * (k - 1)) / 2
  const comparisons = []
  for (let i = 0; i < k; i++) {
    for (let j = i + 1; j < k; j++) {
      const ni = groupNs[i]
      const nj = groupNs[j]
      const se = Math.sqrt(variancePart * (1 / ni + 1 / nj))
      const mri = meanRanks[i]
      const mrj = meanRanks[j]
      const diff = mri - mrj
      const z = se > 0 ? diff / se : 0
      const pRaw = 2 * (1 - normalCdf(Math.abs(z)))
      const pAdj = Math.min(1, pRaw * m)
      comparisons.push({
        groupA: groups[i].name,
        groupB: groups[j].name,
        nA: ni,
        nB: nj,
        meanRankA: mri,
        meanRankB: mrj,
        diff,
        z,
        p: Math.max(0, Math.min(1, pRaw)),
        pAdj: Math.max(0, Math.min(1, pAdj)),
      })
    }
  }
  return {
    comparisons,
    k,
    n: N,
    m,
    tieCorrection: tiedGroups.length > 0,
  }
}
