/**
 * 三欄主內容區
 *
 * 三欄寬度：左 25% / 中 45% / 右 30%
 *
 * 三層條件順序：
 *   1. 沒資料 → 中欄秀「先載入資料集」+ 大版多多
 *   2. 沒選分析 → 左欄秀變數列表、中欄秀資料預覽
 *   3. 選了分析 → 看 registry 有沒有對應模組
 *      a. 有實作 → 三欄各 render registry 該分析的對應元件
 *         - Config 在左欄、Result 在中欄
 *         - 教學模式右欄 = Notes、報告模式右欄 = Narrative
 *      b. 沒實作（P2/P3 占位）→ 三欄秀「此分析將於 Step X 上線」
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
    <h2 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-3">
      {children}
    </h2>
  )
}

function EmptyHint({ children }) {
  return <div className="text-sm text-duo-cocoa-400 leading-relaxed">{children}</div>
}

/* ─────────────────────────  左欄  ───────────────────────── */

function ConfigPanel() {
  const { dataset, activeAnalysis, t } = useApp()
  const analysisLabel = findAnalysisLabel(activeAnalysis, t)
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  // 沒資料：提示載入
  if (!dataset) {
    return (
      <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
        <PanelHeading>{t.panels.configTitle}</PanelHeading>
        <EmptyHint>{t.panels.configNoDataset}</EmptyHint>
      </section>
    )
  }

  // 有資料 + 有分析 + 已實作 → 顯示 Config（不秀 VariableList，避免重複）
  if (analysisModule?.Config) {
    return (
      <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
        <analysisModule.Config />
      </section>
    )
  }

  // 有資料 + 有分析 + 未實作 → 變數列表 + 「此分析待實作」
  if (analysisLabel) {
    return (
      <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
        <div className="space-y-6">
          <VariableList />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-2">
              {t.panels.configTitle}
            </h3>
            <div className="text-sm font-medium text-duo-cocoa-800 mb-2">
              {analysisLabel}
            </div>
            <EmptyHint>{t.common.comingSoon}</EmptyHint>
          </div>
        </div>
      </section>
    )
  }

  // 有資料 + 沒選分析 → 變數列表
  return (
    <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
      <VariableList />
    </section>
  )
}

/* ─────────────────────────  中欄  ───────────────────────── */

function ResultPanel() {
  const { dataset, activeAnalysis, t } = useApp()
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  // 沒資料：大版多多
  if (!dataset) {
    return (
      <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={96} />
          <div className="mt-4 text-base font-medium text-duo-cocoa-700">
            {t.panels.resultNoDataset}
          </div>
          <div className="mt-2 text-xs text-duo-cocoa-400">{t.app.tagline}</div>
        </div>
      </section>
    )
  }

  // 有資料 + 有分析 + 已實作 → render Result
  if (analysisModule?.Result) {
    return (
      <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <analysisModule.Result />
      </section>
    )
  }

  // 有資料 + 有分析 + 未實作 → 占位
  if (activeAnalysis) {
    return (
      <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={72} />
          <div className="mt-4 text-sm text-duo-cocoa-500">{t.panels.resultEmpty}</div>
        </div>
      </section>
    )
  }

  // 有資料 + 沒選分析 → 資料預覽
  return (
    <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
      <PanelHeading>{t.panels.resultTitle}</PanelHeading>
      <DataPreviewTable />
    </section>
  )
}

/* ─────────────────────────  右欄  ───────────────────────── */

function ExplainPanel() {
  const { dataset, activeAnalysis, mode, t } = useApp()
  const analysisModule = activeAnalysis ? getAnalysisModule(activeAnalysis) : null

  // 沒資料 / 沒選分析 → 空提示
  if (!dataset || !activeAnalysis) {
    return (
      <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
        <PanelHeading>{t.panels.explainTitle}</PanelHeading>
        <EmptyHint>{t.panels.explainEmpty}</EmptyHint>
      </section>
    )
  }

  // 有實作 → 看 mode 切 Notes / Narrative
  if (analysisModule) {
    const Component = mode === 'teaching' ? analysisModule.Notes : analysisModule.Narrative
    return (
      <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
        <PanelHeading>{t.panels.explainTitle}</PanelHeading>
        {Component ? <Component /> : <EmptyHint>{t.panels.explainEmpty}</EmptyHint>}
      </section>
    )
  }

  // 未實作 → 退回原 placeholder
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
