/**
 * 排序與平均秩（averaged ranks）
 *
 * 對外 API：
 *   ranks(arr) → { ranks, tiedGroups }
 *
 *   ranks       — number[]，與 arr 相同長度，每個值為 1-based 平均秩
 *   tiedGroups  — number[]，每個並列組的大小（不含 size=1 的單值）；
 *                 用於 Mann-Whitney U / Wilcoxon / Kruskal-Wallis 的 tie 校正
 *
 * 並列處理：給予該組值的「平均秩」（如三個並列且原為第 4-6 順位 → 都得 5）。
 *
 * 範例：
 *   ranks([2, 1, 3, 2]) → { ranks: [2.5, 1, 4, 2.5], tiedGroups: [2] }
 */
export function ranks(arr) {
  const n = arr.length
  const indexed = arr.map((v, i) => ({ v: Number(v), i }))
  indexed.sort((a, b) => a.v - b.v)
  const r = new Array(n)
  const tiedGroups = []
  let i = 0
  while (i < n) {
    let j = i
    while (j + 1 < n && indexed[j + 1].v === indexed[i].v) j++
    const size = j - i + 1
    // 平均秩：(i+1) 到 (j+1) 的平均，因 rank 是 1-based
    const avgRank = ((i + 1) + (j + 1)) / 2
    for (let k = i; k <= j; k++) r[indexed[k].i] = avgRank
    if (size > 1) tiedGroups.push(size)
    i = j + 1
  }
  return { ranks: r, tiedGroups }
}

/** 把多組陣列合併並算出每組的「秩和」與全體並列組統計 */
export function pooledRanks(groupArrays) {
  const merged = []
  const owners = []
  for (let g = 0; g < groupArrays.length; g++) {
    for (const v of groupArrays[g]) {
      merged.push(v)
      owners.push(g)
    }
  }
  const { ranks: r, tiedGroups } = ranks(merged)
  const groupSums = new Array(groupArrays.length).fill(0)
  const groupNs = new Array(groupArrays.length).fill(0)
  for (let i = 0; i < r.length; i++) {
    groupSums[owners[i]] += r[i]
    groupNs[owners[i]] += 1
  }
  return { groupSums, groupNs, totalN: merged.length, tiedGroups }
}
