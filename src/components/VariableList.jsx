/**
 * 變數列表
 *
 * 顯示目前資料集的所有欄位（含轉換後欄位），每個欄位帶：
 *   - 中／英 label
 *   - 型別徽章（continuous / ordinal / categorical / unknown）
 *   - 遺漏值計數
 *   - 若為轉換結果，會多一個「轉換」徽章 + 移除按鈕
 */
import { useApp } from '../context/AppContext'

const TYPE_COLORS = {
  continuous:  'bg-duo-amber-50 text-duo-amber-800 border-duo-amber-200',
  ordinal:     'bg-duo-denim-50 text-duo-denim-700 border-duo-denim-200',
  categorical: 'bg-duo-cocoa-50 text-duo-cocoa-700 border-duo-cocoa-100',
  unknown:     'bg-duo-cream-50 text-duo-cocoa-400 border-duo-cream-200',
}

function TypeBadge({ type, t }) {
  return (
    <span
      className={[
        'shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded border',
        TYPE_COLORS[type] || TYPE_COLORS.unknown,
      ].join(' ')}
    >
      {t.varTypes[type] || t.varTypes.unknown}
    </span>
  )
}

function VariableList() {
  const { dataset, variables, lang, t, transforms, removeTransform } = useApp()
  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const cols = Object.keys(variables)
  const transformNames = new Set(transforms.map((tr) => tr.name))

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-3">
        {t.panels.variablesTitle}
      </h3>
      <ul className="space-y-1.5">
        {cols.map(col => {
          const meta = variables[col]
          const label = labelMap[col] || col
          const isTransformed = transformNames.has(col)
          return (
            <li
              key={col}
              className={[
                'flex items-center gap-2 px-2.5 py-2 rounded-md transition group',
                isTransformed ? 'bg-duo-amber-50/30 hover:bg-duo-amber-50/60' : 'hover:bg-duo-cream-50',
              ].join(' ')}
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-duo-cocoa-800 truncate flex items-center gap-1.5">
                  {label}
                  {isTransformed && (
                    <span className="shrink-0 px-1 py-0.5 text-[9px] font-medium rounded bg-duo-amber-100 text-duo-amber-800">
                      {t.variables.transformed}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-duo-cocoa-400 mt-0.5 flex items-center gap-2">
                  <span className="font-mono">{col}</span>
                  <span className="text-duo-cocoa-300">·</span>
                  {meta.missing === 0
                    ? <span className="text-duo-leaf">{t.variables.noMissing}</span>
                    : <span className="text-duo-tongue">
                        {t.variables.missing.replace('{n}', meta.missing)}
                      </span>}
                </div>
              </div>
              <TypeBadge type={meta.type} t={t} />
              {isTransformed && (
                <button
                  type="button"
                  onClick={() => removeTransform(col)}
                  className="shrink-0 text-duo-tongue hover:text-duo-cocoa-700 px-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t.transform.removeBtn}
                >
                  ✕
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VariableList
