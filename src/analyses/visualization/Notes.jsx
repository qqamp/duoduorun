import { useApp } from '../../context/AppContext'

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">{title}</h4>
      <div className="text-sm text-duo-cocoa-700 leading-relaxed whitespace-pre-line">{children}</div>
    </section>
  )
}

function Notes() {
  const { t } = useApp()
  const n = t.viz.notes
  return (
    <div>
      <Section title={n.purposeTitle}>{n.purpose}</Section>
      <Section title={n.tipsTitle}>{n.tips}</Section>
    </div>
  )
}

export default Notes
