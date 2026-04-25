/**
 * 相關分析 — Notes（教學模式右欄）
 *
 * 依當前 method（pearson / spearman）動態切換用途、前提、公式內容。
 * Reading 區的 |r| 字面用 {sym} 占位符替換為 r 或 ρ。
 */
import { useApp, useAnalysisState } from '../../context/AppContext'

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
        {title}
      </h4>
      <div className="text-sm text-duo-cocoa-700 leading-relaxed whitespace-pre-line">
        {children}
      </div>
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
  const method = state?.method || 'pearson'
  const sym = t.corr.symbol[method] || 'r'
  const n = t.corr.notes

  const purpose = method === 'spearman' ? n.purposeSpearman : n.purposePearson
  const assumptions = method === 'spearman' ? n.assumptionsSpearman : n.assumptionsPearson

  // {sym} 替換在 reading 文字中
  const reading = n.reading.replaceAll('{sym}', sym)

  return (
    <div>
      <Section title={n.purposeTitle}>{purpose}</Section>
      <Section title={n.assumpTitle}>{assumptions}</Section>
      <Section title={n.formulasTitle}>
        {method === 'spearman' ? (
          <>
            <Formula>{n.formulaRho}</Formula>
            <Formula>{n.formulaTSpearman}</Formula>
          </>
        ) : (
          <>
            <Formula>{n.formulaR}</Formula>
            <Formula>{n.formulaT}</Formula>
          </>
        )}
      </Section>
      <Section title={n.readingTitle}>{reading}</Section>
    </div>
  )
}

export default Notes
