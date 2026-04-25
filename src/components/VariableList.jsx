/**
 * 變數列表
 *
 * 顯示目前資料集的所有欄位，每個欄位帶：
 *   - 中／英 label（從 dataset.labels 取對應語言；無對照則退回 raw column 名）
 *   - 型別徽章（continuous / ordinal / categorical / unknown）
 *   - 遺漏值計數
 *
 * Step 3 之後會加上：
 *   - 點選 / 拖拉到分析設定
 *   - 型別徽章可點擊覆寫
 *   - distinct 值預覽 hover 顯示
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
  const { dataset, variables, lang, t } = useApp()
  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const cols = Object.keys(variables)

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-3">
        {t.panels.variablesTitle}
      </h3>
      <ul className="space-y-1.5">
        {cols.map(col => {
          const meta = variables[col]
          const label = labelMap[col] || col
          return (
            <li
              key={col}
              className="flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-duo-cream-50 transition group"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-duo-cocoa-800 truncate">{label}</div>
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
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VariableList
