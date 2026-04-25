/**
 * 三欄主內容區
 *
 * 三欄寬度：左 25% / 中 45% / 右 30%
 * 視覺：1px hairline 邊框（border-duo-cocoa-100）、small caps eyebrow heading
 */
import { useApp } from '../context/AppContext'
import { ANALYSIS_GROUPS } from '../config/analyses'
import { getAnalysisModule } from '../analyses/registry'
import DuoMascot from './DuoMascot'
import VariableList from './VariableList'
import DataPreviewTable from './DataPreviewTable'

function findAnalysisLabel(activeAnalysis, t) {
  if (!activeAnalysis) return null
  for (const group of ANALYSIS_GROUPS) {
    const item = group.items.find((i) => i.id === activeAnalysis)
    if (item) return t.sidebar[item.i18nKey]
  }
  return null
}

function PanelHeading({ children }) {
  return (
    <h2 className="heading-eyebrow mb-3">{children}</h2>
  )
}

function EmptyHint({ children }) {
  return <div className="text-sm text-duo-cocoa-400 leading-relaxed">{children}</div>
}

const PANEL_BORDER = 'border-duo-cocoa-100'

/* ─────────────────────────  左欄  ───────────────────────── */

function ConfigPanel() {
  const { dataset, activeAnalysis, t } = useApp()
  const analysisLabel = findAnalysisLabel(activeAnalysis, t)
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  if (!dataset) {
    return (
      <section className={`flex-[25] min-w-0 p-5 border-r ${PANEL_BORDER} bg-white overflow-y-auto`}>
        <PanelHeading>{t.panels.configTitle}</PanelHeading>
        <EmptyHint>{t.panels.configNoDataset}</EmptyHint>
      </section>
    )
  }

  if (analysisModule?.Config) {
    return (
      <section className={`flex-[25] min-w-0 p-5 border-r ${PANEL_BORDER} bg-white overflow-y-auto`}>
        <analysisModule.Config />
      </section>
    )
  }

  if (analysisLabel) {
    return (
      <section className={`flex-[25] min-w-0 p-5 border-r ${PANEL_BORDER} bg-white overflow-y-auto`}>
        <div className="space-y-6">
          <VariableList />
          <div>
            <h3 className="heading-eyebrow mb-2">{t.panels.configTitle}</h3>
            <div className="font-serif text-base font-medium text-duo-cocoa-900 mb-1">
              {analysisLabel}
            </div>
            <EmptyHint>{t.common.comingSoon}</EmptyHint>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`flex-[25] min-w-0 p-5 border-r ${PANEL_BORDER} bg-white overflow-y-auto`}>
      <VariableList />
    </section>
  )
}

/* ─────────────────────────  中欄  ───────────────────────── */

function ResultPanel() {
  const { dataset, activeAnalysis, t } = useApp()
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  if (!dataset) {
    return (
      <section className={`flex-[45] min-w-0 p-6 border-r ${PANEL_BORDER} bg-duo-cream-50 overflow-y-auto`}>
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={96} />
          <div className="mt-5 font-serif text-xl font-semibold text-duo-cocoa-900">
            {t.panels.resultNoDataset}
          </div>
          <div className="mt-2 text-xs text-duo-cocoa-400 max-w-md">{t.app.tagline}</div>
        </div>
      </section>
    )
  }

  if (analysisModule?.Result) {
    return (
      <section className={`flex-[45] min-w-0 p-6 border-r ${PANEL_BORDER} bg-duo-cream-50 overflow-y-auto`}>
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <analysisModule.Result />
      </section>
    )
  }

  if (activeAnalysis) {
    return (
      <section className={`flex-[45] min-w-0 p-6 border-r ${PANEL_BORDER} bg-duo-cream-50 overflow-y-auto`}>
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={72} />
          <div className="mt-4 font-serif text-base text-duo-cocoa-600">{t.panels.resultEmpty}</div>
        </div>
      </section>
    )
  }

  return (
    <section className={`flex-[45] min-w-0 p-6 border-r ${PANEL_BORDER} bg-duo-cream-50 overflow-y-auto`}>
      <PanelHeading>{t.panels.resultTitle}</PanelHeading>
      <DataPreviewTable />
    </section>
  )
}

/* ─────────────────────────  右欄  ───────────────────────── */

function ExplainPanel() {
  const { dataset, activeAnalysis, mode, t } = useApp()
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  if (!dataset || !activeAnalysis) {
    return (
      <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
        <PanelHeading>{t.panels.explainTitle}</PanelHeading>
        <EmptyHint>{t.panels.explainEmpty}</EmptyHint>
      </section>
    )
  }

  if (analysisModule) {
    const Component = mode === 'teaching' ? analysisModule.Notes : analysisModule.Narrative
    return (
      <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
        <PanelHeading>{t.panels.explainTitle}</PanelHeading>
        {Component ? <Component /> : <EmptyHint>{t.panels.explainEmpty}</EmptyHint>}
      </section>
    )
  }

  return (
    <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
      <PanelHeading>{t.panels.explainTitle}</PanelHeading>
      <EmptyHint>
        {mode === 'teaching' ? t.panels.explainTeaching : t.panels.explainReport}
      </EmptyHint>
    </section>
  )
}

/* ─────────────────────────  整合  ───────────────────────── */

function MainContent() {
  return (
    <main className="flex-1 flex min-w-0">
      <ConfigPanel />
      <ResultPanel />
      <ExplainPanel />
    </main>
  )
}

export default MainContent
