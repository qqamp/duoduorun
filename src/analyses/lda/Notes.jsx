/**
 * LDA — Notes（教學模式右欄）
 *
 * Right-rail teaching notes: purpose / assumptions / formulas /
 * how to read coefficients vs structure matrix / how to read confusion matrix.
 */
import { useApp } from '../../context/AppContext'

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
    <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cream-200 rounded-md px-3 py-2 my-1.5 overflow-x-auto whitespace-pre">
      {children}
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const n = t.lda.notes
  return (
    <div>
      <Section title={n.purposeTitle}>{n.purpose}</Section>
      <Section title={n.assumpTitle}>{n.assumptions}</Section>
      <Section title={n.formulasTitle}>
        <Formula>{n.formulaW}</Formula>
        <Formula>{n.formulaB}</Formula>
        <Formula>{n.formulaSp}</Formula>
        <Formula>{n.formulaEig}</Formula>
        <Formula>{n.formulaCanR}</Formula>
        <Formula>{n.formulaWilks}</Formula>
        <Formula>{n.formulaDelta}</Formula>
      </Section>
      <Section title={n.readingTitle}>{n.reading}</Section>
      <Section title={n.classifyTitle}>{n.classifyHowTo}</Section>
    </div>
  )
}

export default Notes
