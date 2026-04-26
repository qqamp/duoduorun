/**
 * ICC — Config（左欄）
 *
 * 多選評分者欄位（每欄 = 一位評分者；每列 = 一位受試者）。
 * 若資料集帶 scaleVars，且使用者尚未做過任何選擇，自動預選作為起點。
 *
 * Multi-checkbox of numeric rater columns. Wide format like Cronbach's α.
 */
import { useEffect } from 'react'
import { useApp, useAnalysisState } from '../../context/AppContext'

function Config() {
  const { dataset, variables, lang, t } = useApp()
  const [state, update] = useAnalysisState()
  const raterVars = state.raterVars

  // 自動預選 scaleVars（首次進入此分析、尚未動過時）
  useEffect(() => {
    if (raterVars === undefined && dataset?.scaleVars?.length) {
      update({ raterVars: [...dataset.scaleVars] })
    }
  }, [dataset, raterVars, update])

  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const numericCols = Object.keys(variables).filter(
    (c) => variables[c].type === 'continuous' || variables[c].type === 'ordinal'
  )
  const current = raterVars || []

  const toggle = (col) => {
    const next = current.includes(col)
      ? current.filter((v) => v !== col)
      : [...current, col]
    update({ raterVars: next })
  }
  const allSelected =
    numericCols.length > 0 && numericCols.every((c) => current.includes(c))
  const toggleAll = () =>
    update({ raterVars: allSelected ? [] : [...numericCols] })

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
        {t.icc.config.selectRatersTitle}
      </h3>
      <p className="text-[11px] text-duo-cocoa-400 mb-3 leading-snug">
        {t.icc.config.selectRatersHint}
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
          const checked = current.includes(col)
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
