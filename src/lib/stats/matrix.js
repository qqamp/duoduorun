/**
 * 最小必要矩陣運算 — 多元迴歸 OLS 用
 *
 * 對外 API：
 *   transpose(M)         → M^T
 *   matmul(A, B)         → A · B
 *   matvec(A, v)         → A · v
 *   inverse(M)           → M^(-1) 透過 Gauss-Jordan elimination + 部分軸選
 *   identity(n)
 *   diag(M)              → 對角線陣列
 *
 * 矩陣表示：number[][]，外層為列、內層為行。
 *
 * 數值穩定性：
 *   inverse 用部分軸選（partial pivoting），對良態矩陣（如 OLS 中的 X'X，且
 *   無嚴重多重共線）足夠精度（< 1e-10）；極度共線時可能不穩，呼叫者需檢查
 *   結果合理性（例如 NaN / Infinity）。
 */

export function identity(n) {
  const M = []
  for (let i = 0; i < n; i++) {
    M.push(new Array(n).fill(0))
    M[i][i] = 1
  }
  return M
}

export function transpose(M) {
  const rows = M.length
  if (rows === 0) return []
  const cols = M[0].length
  const T = []
  for (let j = 0; j < cols; j++) {
    const row = new Array(rows)
    for (let i = 0; i < rows; i++) row[i] = M[i][j]
    T.push(row)
  }
  return T
}

export function matmul(A, B) {
  const aRows = A.length
  const aCols = A[0].length
  const bRows = B.length
  const bCols = B[0].length
  if (aCols !== bRows) throw new Error('matmul: dimension mismatch')
  const C = []
  for (let i = 0; i < aRows; i++) {
    const row = new Array(bCols).fill(0)
    for (let k = 0; k < aCols; k++) {
      const a = A[i][k]
      for (let j = 0; j < bCols; j++) row[j] += a * B[k][j]
    }
    C.push(row)
  }
  return C
}

export function matvec(A, v) {
  const rows = A.length
  const cols = A[0].length
  if (cols !== v.length) throw new Error('matvec: dimension mismatch')
  const out = new Array(rows).fill(0)
  for (let i = 0; i < rows; i++) {
    let s = 0
    const Ai = A[i]
    for (let j = 0; j < cols; j++) s += Ai[j] * v[j]
    out[i] = s
  }
  return out
}

export function diag(M) {
  const n = Math.min(M.length, M[0].length)
  const d = new Array(n)
  for (let i = 0; i < n; i++) d[i] = M[i][i]
  return d
}

/**
 * Gauss-Jordan inverse with partial pivoting.
 * 若 M 為奇異或嚴重病態，回傳 null。
 */
export function inverse(M) {
  const n = M.length
  // 複製為增廣矩陣 [M | I]
  const A = []
  for (let i = 0; i < n; i++) {
    const row = new Array(2 * n).fill(0)
    for (let j = 0; j < n; j++) row[j] = M[i][j]
    row[n + i] = 1
    A.push(row)
  }

  for (let col = 0; col < n; col++) {
    // partial pivoting：找此 column 中絕對值最大的列當 pivot
    let maxAbs = Math.abs(A[col][col])
    let maxRow = col
    for (let r = col + 1; r < n; r++) {
      const v = Math.abs(A[r][col])
      if (v > maxAbs) { maxAbs = v; maxRow = r }
    }
    if (maxAbs < 1e-12) return null // 奇異
    if (maxRow !== col) {
      const tmp = A[col]; A[col] = A[maxRow]; A[maxRow] = tmp
    }
    // normalize pivot row
    const pivot = A[col][col]
    const Acol = A[col]
    for (let j = 0; j < 2 * n; j++) Acol[j] /= pivot
    // eliminate other rows
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const factor = A[r][col]
      if (factor === 0) continue
      const Ar = A[r]
      for (let j = 0; j < 2 * n; j++) Ar[j] -= factor * Acol[j]
    }
  }

  // 取出右半 = M^(-1)
  const inv = []
  for (let i = 0; i < n; i++) {
    const row = new Array(n)
    for (let j = 0; j < n; j++) row[j] = A[i][n + j]
    inv.push(row)
  }
  return inv
}
