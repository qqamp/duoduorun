/**
 * 使用者上傳檔案的解析器（純前端）
 *
 * 對外 API：
 *   parseFile(file) → Promise<{ name, rows, columns }>
 *
 *   支援副檔名：.csv (Papa Parse) / .xlsx / .xls (SheetJS)
 *
 * 設計原則：
 *   - 動態 import 避免初載入體積膨脹
 *   - 第一列當欄位名稱（自動偵測）
 *   - 數值字串自動轉 number
 *   - 多工作表的 XLSX 只取第一張
 *   - 完全在瀏覽器解析，不上傳到任何伺服器
 *
 * 隱私聲明：本函式只在 user 的瀏覽器執行，檔案內容永遠不會離開本機。
 */

const SUPPORTED_EXTENSIONS = ['csv', 'xlsx', 'xls']

/** 取出小寫副檔名（無副檔名回傳空字串） */
function getExt(filename) {
  const i = filename.lastIndexOf('.')
  if (i < 0) return ''
  return filename.slice(i + 1).toLowerCase()
}

/** 嘗試把字串轉成數值，若無法則保留原 string */
function tryNumber(v) {
  if (v === null || v === undefined) return v
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const trimmed = v.trim()
    if (trimmed === '') return null
    // 純數字（含負號、小數）
    if (/^-?\d+(\.\d+)?(e[+-]?\d+)?$/i.test(trimmed)) {
      const n = Number(trimmed)
      return Number.isFinite(n) ? n : v
    }
  }
  return v
}

/** 把 row 中所有欄位嘗試轉數字，並把空字串視為 null（遺漏值） */
function normalizeRow(row) {
  const out = {}
  for (const k of Object.keys(row)) {
    const v = row[k]
    if (v === '' || v === null || v === undefined) {
      out[k] = null
    } else {
      out[k] = tryNumber(v)
    }
  }
  return out
}

async function parseCsv(file) {
  const Papa = (await import('papaparse')).default
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: false, // 我們自己控制 type conversion
      skipEmptyLines: true,
      transformHeader: (h) => String(h).trim(),
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          reject(new Error('empty-file'))
          return
        }
        const rows = results.data.map(normalizeRow)
        resolve(rows)
      },
      error: (err) => reject(err),
    })
  })
}

async function parseXlsx(file) {
  const XLSX = await import('xlsx')
  const buffer = await file.arrayBuffer()
  const wb = XLSX.read(buffer, { type: 'array' })
  if (!wb.SheetNames || wb.SheetNames.length === 0) {
    throw new Error('empty-workbook')
  }
  const sheet = wb.Sheets[wb.SheetNames[0]]
  // header row 用第一列；defval: '' 把空 cell 補空字串，後續 normalizeRow 轉 null
  const json = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: true })
  if (json.length === 0) throw new Error('empty-sheet')
  return json.map(normalizeRow)
}

/**
 * 解析使用者上傳的檔案。
 *
 * @param {File} file
 * @returns {Promise<{ name: string, rows: object[], columns: string[] }>}
 */
export async function parseFile(file) {
  if (!file) throw new Error('no-file')
  const ext = getExt(file.name)
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    const err = new Error('unsupported-format')
    err.ext = ext
    throw err
  }

  let rows
  if (ext === 'csv') rows = await parseCsv(file)
  else rows = await parseXlsx(file)

  if (!rows || rows.length === 0) throw new Error('empty-after-parse')
  const columns = Object.keys(rows[0])
  if (columns.length === 0) throw new Error('no-columns')

  return { name: file.name, rows, columns }
}
