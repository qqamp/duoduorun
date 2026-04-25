/**
 * 三欄主內容區
 *
 * 三欄寬度：左 25% / 中 45% / 右 30%
 *
 * 狀態組合（dataset × analysis）：
 *
 *   無資料 + 無分析     → 中欄秀大版多多 + 引導「先載入資料集」
 *                         左／右欄秀對應的 empty hint
 *
 *   有資料 + 無分析     → 左欄秀 VariableList
 *                         中欄秀 DataPreviewTable（前 20 筆）
 *                         右欄秀 explainEmpty（提示「選個分析吧」）
 *
 *   有資料 + 有分析     → 左欄秀 VariableList + 分析名稱
 *                         中欄秀「此分析將於 Step 3 上線」+ 多多 idle
 *                         右欄秀 explainTeaching / explainReport
 *
 *   無資料 + 有分析     → 中欄提示「先載入資料集」（少見的組合，但 UI 不會崩）
 */
import { useApp } from '../context/AppContext'
import { ANALYSIS_GROUPS } from '../config/analyses'
import DuoMascot from './DuoMascot'
import VariableList from './VariableList'
import DataPreviewTable from './DataPreviewTable'

function findAnalysisLabel(activeAnalysis, t) {
  if (!activeAnalysis) return null
  for (const group of ANALYSIS_GROUPS) {
    const item = group.items.find(i => i.id === activeAnalysis)
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

function ConfigPanel() {
  const { dataset, activeAnalysis, t } = useApp()
  const analysisLabel = findAnalysisLabel(activeAnalysis, t)

  return (
    <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
      {dataset ? (
        <div className="space-y-6">
          <VariableList />
          {analysisLabel && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-3">
                {t.panels.configTitle}
              </h3>
              <div className="text-sm font-medium text-duo-cocoa-800 mb-2">
                {analysisLabel}
              </div>
              <EmptyHint>{t.common.comingSoon}</EmptyHint>
            </div>
          )}
        </div>
      ) : (
        <>
          <PanelHeading>{t.panels.configTitle}</PanelHeading>
          <EmptyHint>{t.panels.configNoDataset}</EmptyHint>
        </>
      )}
    </section>
  )
}

function ResultPanel() {
  const { dataset, activeAnalysis, t } = useApp()

  // 無資料：大版多多 + 引導
  if (!dataset) {
    return (
      <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={96} />
          <div className="mt-4 text-base font-medium text-duo-cocoa-700">
            {t.panels.resultNoDataset}
          </div>
          <div className="mt-2 text-xs text-duo-cocoa-400">
            {t.app.tagline}
          </div>
        </div>
      </section>
    )
  }

  // 有資料 + 有分析：占位（Step 3 接統計引擎）
  if (activeAnalysis) {
    return (
      <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
        <PanelHeading>{t.panels.resultTitle}</PanelHeading>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={72} />
          <div className="mt-4 text-sm text-duo-cocoa-500">
            {t.panels.resultEmpty}
          </div>
        </div>
      </section>
    )
  }

  // 有資料 + 無分析：資料預覽
  return (
    <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
      <PanelHeading>{t.panels.resultTitle}</PanelHeading>
      <DataPreviewTable />
    </section>
  )
}

function ExplainPanel() {
  const { dataset, activeAnalysis, mode, t } = useApp()

  let body
  if (!dataset) {
    body = <EmptyHint>{t.panels.explainEmpty}</EmptyHint>
  } else if (activeAnalysis) {
    body = (
      <EmptyHint>
        {mode === 'teaching' ? t.panels.explainTeaching : t.panels.explainReport}
      </EmptyHint>
    )
  } else {
    body = <EmptyHint>{t.panels.explainEmpty}</EmptyHint>
  }

  return (
    <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
      <PanelHeading>{t.panels.explainTitle}</PanelHeading>
      {body}
    </section>
  )
}

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
