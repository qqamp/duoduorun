/**
 * 單因子 ANOVA — Config（左欄）
 *
 * 依變項：numeric（continuous / ordinal）下拉
 * 因子：categorical 下拉，需 ≥ 3 組
 */
import { useApp, useAnalysisState } from '../../context/AppContext'

function VarSelect({ label, value, onChange, options, hint, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full h-9 px-3 pr-8 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && <p className="text-[10px] text-duo-cocoa-400 mt-1 leading-snug">{hint}</p>}
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
  const categoricalCols = Object.keys(variables).filter((c) => variables[c].type === 'categorical')

  const numericOpts = numericCols.map((c) => ({ value: c, label: labelMap[c] || c }))
  const factorOpts = categoricalCols.map((c) => {
    const distinct = variables[c].distinct
    const tag = distinct >= 3 ? '' : ` (${distinct} ${lang === 'zh-TW' ? '組' : 'groups'})`
    return { value: c, label: (labelMap[c] || c) + tag }
  })

  return (
    <div className="space-y-3">
      <VarSelect
        label={t.anova.config.depVar}
        value={state.depVar}
        onChange={(v) => update({ depVar: v })}
        options={numericOpts}
        placeholder={t.anova.config.pickDep}
      />
      <VarSelect
        label={t.anova.config.factor}
        value={state.factor}
        onChange={(v) => update({ factor: v })}
        options={factorOpts}
        placeholder={t.anova.config.pickFactor}
        hint={t.anova.config.factorHint}
      />
    </div>
  )
}

export default Config
