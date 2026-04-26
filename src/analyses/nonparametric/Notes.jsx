import { useApp, useAnalysisState } from '../../context/AppContext'

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">{title}</h4>
      <div className="text-sm text-duo-cocoa-700 leading-relaxed whitespace-pre-line">{children}</div>
    </section>
  )
}
function Formula({ children }) {
  return (
    <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cocoa-100 rounded-md px-3 py-2 my-1.5 overflow-x-auto">
      {children}
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const [state] = useAnalysisState()
  const type = state?.type || 'mw'
  const n = t.np.notes

  let purpose, assumptions
  if (type === 'mw') { purpose = n.purposeMW; assumptions = n.assumptionsMW }
  else if (type === 'wilcoxon') { purpose = n.purposeWil; assumptions = n.assumptionsWil }
  else { purpose = n.purposeKW; assumptions = n.assumptionsKW }

  return (
    <div>
      <Section title={n.purposeTitle}>{purpose}</Section>
      <Section title={n.assumpTitle}>{assumptions}</Section>
      <Section title={n.formulasTitle}>
        {type === 'mw' && (
          <>
            <Formula>{n.formulaMWU}</Formula>
            <Formula>{n.formulaMWZ}</Formula>
            <Formula>{n.formulaEffMW}</Formula>
          </>
        )}
        {type === 'wilcoxon' && (
          <>
            <Formula>{n.formulaWil}</Formula>
            <Formula>{n.formulaWilZ}</Formula>
            <Formula>{n.formulaEffMW}</Formula>
          </>
        )}
        {type === 'kw' && (
          <>
            <Formula>{n.formulaKW}</Formula>
            <Formula>{n.formulaKWdf}</Formula>
            <Formula>{n.formulaEffKW}</Formula>
          </>
        )}
      </Section>
      <Section title={n.readingTitle}>{n.reading}</Section>
      {type === 'kw' && n.dunnNote && (
        <Section title="Dunn's post-hoc">{n.dunnNote}</Section>
      )}
    </div>
  )
}

export default Notes
