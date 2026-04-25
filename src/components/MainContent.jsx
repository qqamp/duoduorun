/**
 * 三欄主內容區
 *
 * 三欄寬度：左 25% / 中 45% / 右 30%
 *   左欄 ConfigPanel  — 變數選擇與分析設定（Step 3 接入）
 *   中欄 ResultPanel  — 統計結果表格（Step 3 接入）
 *   右欄 ExplainPanel — 教學模式：方法說明、前提假設、公式
 *                      報告模式：APA 格式結果敘述（中英文）
 *
 * PR-2a：三欄都是占位文字，但右欄會根據 mode 切換不同 placeholder 文案，
 *        讓 Kevin 看到模式切換確實會影響右欄內容（為 Step 3 鋪路）。
 *
 * 未選分析時：三欄都顯示「請從左側選擇分析方法」型的引導文案 + 多多 idle 圖。
 */
import { useApp } from '../context/AppContext'
import { ANALYSIS_GROUPS } from '../config/analyses'
import DuoMascot from './DuoMascot'

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
  return (
    <div className="text-sm text-duo-cocoa-400 leading-relaxed">{children}</div>
  )
}

function ConfigPanel() {
  const { activeAnalysis, t } = useApp()
  const analysisLabel = findAnalysisLabel(activeAnalysis, t)

  return (
    <section className="flex-[25] min-w-0 p-5 border-r border-duo-cream-200 bg-white overflow-y-auto">
      <PanelHeading>{t.panels.configTitle}</PanelHeading>
      {analysisLabel ? (
        <div>
          <div className="text-sm font-medium text-duo-cocoa-800 mb-3">
            {analysisLabel}
          </div>
          <EmptyHint>{t.panels.resultEmpty}</EmptyHint>
        </div>
      ) : (
        <EmptyHint>{t.panels.configEmpty}</EmptyHint>
      )}
    </section>
  )
}

function ResultPanel() {
  const { activeAnalysis, t } = useApp()

  return (
    <section className="flex-[45] min-w-0 p-6 border-r border-duo-cream-200 bg-duo-cream-50 overflow-y-auto">
      <PanelHeading>{t.panels.resultTitle}</PanelHeading>
      {activeAnalysis ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={72} />
          <div className="mt-4 text-sm text-duo-cocoa-500">
            {t.panels.resultEmpty}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <DuoMascot state="idle" size={96} />
          <div className="mt-4 text-base font-medium text-duo-cocoa-700">
            {t.panels.configEmpty}
          </div>
          <div className="mt-2 text-xs text-duo-cocoa-400">
            {t.app.tagline}
          </div>
        </div>
      )}
    </section>
  )
}

function ExplainPanel() {
  const { activeAnalysis, mode, t } = useApp()

  return (
    <section className="flex-[30] min-w-0 p-5 bg-white overflow-y-auto">
      <PanelHeading>{t.panels.explainTitle}</PanelHeading>
      {activeAnalysis ? (
        <EmptyHint>
          {mode === 'teaching' ? t.panels.explainTeaching : t.panels.explainReport}
        </EmptyHint>
      ) : (
        <EmptyHint>{t.panels.explainEmpty}</EmptyHint>
      )}
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
