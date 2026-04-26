/**
 * ICC — Notes（教學模式右欄）
 * Purpose / assumptions / formulas for all 6 variants / how to read.
 */
import { useApp } from '../../context/AppContext'

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

function FormulaRow({ label, body }) {
  return (
    <div className="flex items-start gap-2 my-1.5">
      <div className="font-mono text-xs text-duo-amber-700 font-semibold whitespace-nowrap min-w-[5.5rem]">
        {label}
      </div>
      <div className="font-mono text-xs text-duo-cocoa-800 bg-duo-cream-50 border border-duo-cream-200 rounded-md px-3 py-1.5 flex-1 overflow-x-auto">
        {body}
      </div>
    </div>
  )
}

function Notes() {
  const { t } = useApp()
  const n = t.icc.notes
  return (
    <div>
      <Section title={n.purposeTitle}>{n.purpose}</Section>
      <Section title={n.assumpTitle}>{n.assumptions}</Section>
      <Section title={n.formulasTitle}>
        <Formula>{n.formulaAnova}</Formula>
        <FormulaRow label="ICC(1,1)" body={n.formulaIcc1_1} />
        <FormulaRow label="ICC(1,k)" body={n.formulaIcc1_k} />
        <FormulaRow label="ICC(2,1)" body={n.formulaIcc2_1} />
        <FormulaRow label="ICC(2,k)" body={n.formulaIcc2_k} />
        <FormulaRow label="ICC(3,1)" body={n.formulaIcc3_1} />
        <FormulaRow label="ICC(3,k)" body={n.formulaIcc3_k} />
      </Section>
      <Section title={n.readingTitle}>{n.reading}</Section>
    </div>
  )
}

export default Notes
