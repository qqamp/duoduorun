/**
 * 資料預覽表格
 *
 * 顯示目前資料集前 20 筆。
 * 標題列用變數的中／英 label；遺漏值顯示為「—」。
 * categorical 變數若 dataset 有 valueLabels 則顯示對照後的標籤（例如 control → 控制組）。
 *
 * 樣式：水平捲動容器（資料欄位多時不破版）；首列 sticky header。
 */
import { useApp } from '../context/AppContext'

const PREVIEW_ROWS = 20

function formatCell(value, col, valueLabels, lang) {
  if (value === null || value === undefined || value === '') return '—'
  const localized = valueLabels?.[col]?.[lang === 'zh-TW' ? 'zh' : 'en']?.[value]
  if (localized) return localized
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2)
  }
  return value
}

function DataPreviewTable() {
  const { dataset, variables, lang, t } = useApp()
  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const cols = Object.keys(variables)
  const rows = dataset.rows.slice(0, PREVIEW_ROWS)

  const subtitle = t.panels.previewSubtitle
    .replace('{n}', dataset.rows.length)
    .replace('{k}', cols.length)

  return (
    <div className="bg-white border border-duo-cream-200 rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-duo-cream-200">
        <h3 className="text-sm font-semibold text-duo-cocoa-800">
          {t.panels.previewTitle}
        </h3>
        <p className="text-xs text-duo-cocoa-400 mt-0.5">{subtitle}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-duo-cream-50 sticky top-0">
            <tr>
              {cols.map(col => (
                <th
                  key={col}
                  className="px-3 py-2 text-left font-medium text-duo-cocoa-700 whitespace-nowrap border-b border-duo-cream-200"
                >
                  {labelMap[col] || col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-duo-cream-50 transition">
                {cols.map(col => (
                  <td
                    key={col}
                    className="px-3 py-1.5 text-duo-cocoa-700 whitespace-nowrap border-b border-duo-cream-100"
                  >
                    {formatCell(row[col], col, dataset.valueLabels, lang)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataPreviewTable
