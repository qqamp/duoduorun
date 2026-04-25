import { useApp, useAnalysisState } from '../../context/AppContext'

function VarSelect({ label, value, onChange, options, hint, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">{label}</label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full h-9 px-3 pr-8 text-sm rounded-md bg-white border border-duo-cocoa-100 text-duo-cocoa-800 hover:border-duo-cocoa-200 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
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

  const numOpts = numericCols.map((c) => ({ value: c, label: labelMap[c] || c }))
  const factorOpts = categoricalCols.map((c) => {
    const distinct = variables[c].distinct
    const tag = distinct >= 2 ? '' : ` (${distinct} ${lang === 'zh-TW' ? '組' : 'groups'})`
    return { value: c, label: (labelMap[c] || c) + tag }
  })

  return (
    <div className="space-y-3">
      <VarSelect
        label={t.anova2.config.depVar}
        value={state.depVar}
        onChange={(v) => update({ depVar: v })}
        options={numOpts}
        placeholder={t.anova2.config.pickDep}
      />
      <VarSelect
        label={t.anova2.config.factorA}
        value={state.factorA}
        onChange={(v) => update({ factorA: v })}
        options={factorOpts.filter((o) => o.value !== state.factorB)}
        placeholder={t.anova2.config.pickFactorA}
      />
      <VarSelect
        label={t.anova2.config.factorB}
        value={state.factorB}
        onChange={(v) => update({ factorB: v })}
        options={factorOpts.filter((o) => o.value !== state.factorA)}
        placeholder={t.anova2.config.pickFactorB}
        hint={t.anova2.config.hint}
      />
    </div>
  )
}

export default Config
