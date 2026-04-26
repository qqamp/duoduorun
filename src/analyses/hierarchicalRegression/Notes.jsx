/**
 * 階層迴歸 — 教學筆記（右欄，教學模式）
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
    <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cocoa-100 rounded-md px-3 py-2 my-1.5 overflow-x-auto">
      {children}
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const n = t.hierReg.notes
  return (
    <div>
      <Section title={n.purposeTitle}>{n.purpose}</Section>
      <Section title={n.assumpTitle}>{n.assumptions}</Section>
      <Section title={n.formulasTitle}>
        <Formula>{n.formulaDeltaR2}</Formula>
        <Formula>{n.formulaDeltaF}</Formula>
        <Formula>{n.formulaDf}</Formula>
      </Section>
      <Section title={n.readingTitle}>{n.reading}</Section>
    </div>
  )
}

export default Notes
