/**
 * 簡單迴歸 — Config（左欄）
 *
 * 兩個下拉選單：依變項 Y、預測變項 X。X 與 Y 不可相同（已在選項中互斥）。
 */
import { useApp, useAnalysisState } from '../../context/AppContext'

function VarSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full h-9 px-3 pr-8 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

function Config() {
  const { dataset, variables, lang, t } = useApp()
  const [state, update] = useAnalysisState()
  if (!dataset) return null

  const labelMap = dataset.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}
  const numericCols = Object.keys(variables).filter(
    (c) => variables[c].type === 'continuous' || variables[c].type === 'ordinal'
  )
  const opts = numericCols.map((c) => ({ value: c, label: labelMap[c] || c }))

  return (
    <div className="space-y-3">
      <VarSelect
        label={t.simpleReg.config.yLabel}
        value={state.yVar}
        onChange={(v) => update({ yVar: v })}
        options={opts.filter((o) => o.value !== state.xVar)}
        placeholder={t.simpleReg.config.pickY}
      />
      <VarSelect
        label={t.simpleReg.config.xLabel}
        value={state.xVar}
        onChange={(v) => update({ xVar: v })}
        options={opts.filter((o) => o.value !== state.yVar)}
        placeholder={t.simpleReg.config.pickX}
      />
    </div>
  )
}

export default Config
