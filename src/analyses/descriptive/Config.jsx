/**
 * 敘述統計 — Config（左欄）
 *
 * 顯示資料集中所有「數值型」變數（continuous 或 ordinal），讓使用者勾選要分析的變數。
 * 類別變數不在此列（因為敘述統計算的是 mean/SD，類別變數應該用次數分配，那是另一個分析）。
 *
 * 選擇結果存到 analysisState['desc-stats'].selectedVars（陣列）。
 */
import { useApp, useAnalysisState } from '../../context/AppContext'

function Config() {
  const { dataset, variables, lang, t } = useApp()
  const [state, update] = useAnalysisState()
  const selectedVars = state.selectedVars || []

  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const numericCols = Object.keys(variables).filter(
    (col) => variables[col].type === 'continuous' || variables[col].type === 'ordinal'
  )

  const toggle = (col) => {
    const next = selectedVars.includes(col)
      ? selectedVars.filter((v) => v !== col)
      : [...selectedVars, col]
    update({ selectedVars: next })
  }

  const allSelected = numericCols.length > 0 && numericCols.every((c) => selectedVars.includes(c))
  const toggleAll = () => {
    update({ selectedVars: allSelected ? [] : [...numericCols] })
  }

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
        {t.desc.selectVarsTitle}
      </h3>
      <p className="text-[11px] text-duo-cocoa-400 mb-3 leading-snug">
        {t.desc.selectVarsHint}
      </p>

      <button
        type="button"
        onClick={toggleAll}
        className="text-[11px] text-duo-amber-600 hover:text-duo-amber-800 mb-2 underline-offset-2 hover:underline"
      >
        {allSelected ? '取消全選 / Deselect all' : '全選 / Select all'}
      </button>

      <ul className="space-y-1">
        {numericCols.map((col) => {
          const checked = selectedVars.includes(col)
          const label = labelMap[col] || col
          const meta = variables[col]
          return (
            <li key={col}>
              <label
                className={[
                  'flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer transition',
                  checked ? 'bg-duo-amber-50' : 'hover:bg-duo-cream-50',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(col)}
                  className="accent-duo-amber-500 w-3.5 h-3.5 cursor-pointer"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-duo-cocoa-800 truncate">{label}</div>
                  <div className="text-[10px] text-duo-cocoa-400 mt-0.5 font-mono">
                    {col} · {t.varTypes[meta.type]}
                  </div>
                </div>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Config
