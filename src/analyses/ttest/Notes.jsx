/**
 * t 檢定 — Notes（教學模式右欄）
 *
 * 依當前選擇的 type 動態顯示對應的用途與假設。
 * 公式區三種 type 都列出，便於對照。
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
    <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cream-200 rounded-md px-3 py-2 my-1.5 overflow-x-auto">
      {children}
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const [state] = useAnalysisState()
  const type = state?.type || 'independent'
  const n = t.ttest.notes

  let purpose, assumptions
  if (type === 'independent') {
    purpose = n.independentPurpose
    assumptions = n.independentAssump
  } else if (type === 'paired') {
    purpose = n.pairedPurpose
    assumptions = n.pairedAssump
  } else {
    purpose = n.oneSamplePurpose
    assumptions = n.oneSampleAssump
  }

  return (
    <div>
      <Section title={n.purposeTitle}>{purpose}</Section>
      <Section title={n.assumpTitle}>{assumptions}</Section>

      <Section title={n.formulasTitle}>
        {type === 'independent' && (
          <>
            <Formula>{n.formulaIndepT}</Formula>
            <Formula>{n.formulaIndepDf}</Formula>
            <Formula>{n.formulaCohenIndep}</Formula>
          </>
        )}
        {type === 'paired' && (
          <>
            <Formula>{n.formulaPairedT}</Formula>
            <Formula>{n.formulaCohenPaired}</Formula>
          </>
        )}
        {type === 'oneSample' && (
          <>
            <Formula>{n.formulaOneT}</Formula>
            <Formula>{n.formulaCohenOne}</Formula>
          </>
        )}
      </Section>

      <Section title={n.readingTitle}>{n.reading}</Section>
    </div>
  )
}

export default Notes
