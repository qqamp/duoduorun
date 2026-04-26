/**
 * 集群分析 — Notes（教學模式右欄）
 *
 * Right-rail teaching notes: purpose / assumptions / formulas /
 * how to read the elbow / silhouette / centroids / when to prefer
 * which method.
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
    <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cocoa-100 rounded-md px-3 py-2 my-1.5 overflow-x-auto whitespace-pre">
      {children}
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const n = t.cluster.notes
  return (
    <div>
      <Section title={n.purposeTitle}>{n.purpose}</Section>
      <Section title={n.assumpTitle}>{n.assumptions}</Section>
      <Section title={n.formulasTitle}>
        <Formula>{n.formulaTSS}</Formula>
        <Formula>{n.formulaWSS}</Formula>
        <Formula>{n.formulaBSS}</Formula>
        <Formula>{n.formulaWard}</Formula>
        <Formula>{n.formulaSil}</Formula>
      </Section>
      <Section title={n.readingTitle}>{n.reading}</Section>
      <Section title={n.chooseTitle}>{n.chooseMethod}</Section>
    </div>
  )
}

export default Notes
