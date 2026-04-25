/**
 * Mulberry32 — 確定性 seed-based PRNG
 *
 * 用途：示範資料集需要在每次啟動時產出**相同**的資料（reproducibility），
 *       但又不想把 hundreds of rows 寫死在原始碼裡。
 *
 * 給定 seed，回傳一個 () => number 的函式，每次呼叫產出 [0, 1) 區間內的浮點數。
 *
 * 演算法來源：https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32
 * 在 [0,1) 區間分佈良好，週期 2^32，不適合密碼學但完全勝任合成資料。
 */
export function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 從陣列中按 PRNG 隨機取一個元素 */
export function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)]
}

/** 整數區間 [min, max] 含端點 */
export function randInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min
}

/** 截斷到 [min, max] 的整數 */
export function clampInt(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)))
}

/** Box-Muller 產生標準常態，給連續變數合成用 */
export function gaussian(rng) {
  const u = 1 - rng()
  const v = rng()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}
