/**
 * 相關分析 — Config（左欄）
 *
 * 多選 numeric 變數（continuous + ordinal），與敘述統計類似。
 */
import { useApp, useAnalysisState } from '../../context/AppContext'

function Config() {
  const { dataset, variables, lang, t } = useApp()
  const [state, update] = useAnalysisState()
  const selectedVars = state.selectedVars || []
  const method = state.method || 'pearson'

  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const numericCols = Object.keys(variables).filter(
    (c) => variables[c].type === 'continuous' || variables[c].type === 'ordinal'
  )

  const toggle = (col) => {
    const next = selectedVars.includes(col)
      ? selectedVars.filter((v) => v !== col)
      : [...selectedVars, col]
    update({ selectedVars: next })
  }
  const allSelected = numericCols.length > 0 && numericCols.every((c) => selectedVars.includes(c))
  const toggleAll = () => update({ selectedVars: allSelected ? [] : [...numericCols] })

  return (
    <div>
      {/* method 切換 — Pearson / Spearman */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
          {t.corr.methodLabel}
        </h3>
        <div className="inline-flex rounded-md bg-duo-cream-50 border border-duo-cocoa-100 p-0.5 w-full">
          {['pearson', 'spearman'].map((m) => {
            const active = method === m
            return (
              <button
                key={m}
                type="button"
                onClick={() => update({ method: m })}
                className={[
                  'flex-1 px-2 py-1.5 text-xs font-medium rounded transition',
                  active
                    ? 'bg-white text-duo-cocoa-900 border border-duo-cocoa-100'
                    : 'text-duo-cocoa-500 hover:text-duo-cocoa-800',
                ].join(' ')}
              >
                {t.corr.methods[m]}
              </button>
            )
          })}
        </div>
        <p className="text-[11px] text-duo-cocoa-400 mt-1.5 leading-snug">
          {t.corr.methodHint[method]}
        </p>
      </div>

      <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
        {t.corr.selectVarsTitle}
      </h3>
      <p className="text-[11px] text-duo-cocoa-400 mb-3 leading-snug">
        {t.corr.selectVarsHint}
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
