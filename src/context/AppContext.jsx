/**
 * AppContext — 全域狀態
 *
 * 內含：
 *   lang           — 'zh-TW' | 'en'
 *   mode           — 'teaching' | 'report'
 *   activeAnalysis — 目前選中的分析 id；null = 未選
 *   activeDataset  — 目前載入的示範資料集 id；null = 未載入
 *   dataset        — { id, rows, labels, valueLabels?, scaleVars? } 或 null
 *   variables      — { col: { name, type, missing, distinct, n } } 或 {}
 *   t              — 已決定好的 i18n 字串表（依 lang 自動切換）
 *   analysisState  — { [analysisId]: stateObj } 各分析的設定狀態
 *   getAnalysisState(id)             — 讀取特定分析的 state
 *   updateAnalysisState(id, partial) — 合併更新特定分析的 state
 *
 * 不接 localStorage：spec 訴求是純前端隱私不外流，使用者重整即重置。
 */
import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { getStrings } from '../i18n'
import { getDataset } from '../data'
import { summarizeAll } from '../lib/variableTypes'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('zh-TW')
  const [mode, setMode] = useState('teaching')
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [activeDataset, setActiveDataset] = useState(null)
  const [analysisState, setAnalysisState] = useState({})

  const t = useMemo(() => getStrings(lang), [lang])

  const dataset = useMemo(() => {
    if (!activeDataset) return null
    return getDataset(activeDataset)
  }, [activeDataset])

  const variables = useMemo(() => {
    if (!dataset) return {}
    return summarizeAll(dataset.rows)
  }, [dataset])

  const getAnalysisState = useCallback(
    (id) => analysisState[id] || {},
    [analysisState]
  )

  const updateAnalysisState = useCallback((id, partial) => {
    setAnalysisState((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), ...partial },
    }))
  }, [])

  const value = {
    lang, setLang,
    mode, setMode,
    activeAnalysis, setActiveAnalysis,
    activeDataset, setActiveDataset,
    dataset,
    variables,
    t,
    getAnalysisState,
    updateAnalysisState,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

/**
 * 便利 hook — 直接拿到目前 active analysis 的 state slice 與更新函式
 */
export function useAnalysisState() {
  const { activeAnalysis, getAnalysisState, updateAnalysisState } = useApp()
  const state = getAnalysisState(activeAnalysis)
  const update = useCallback(
    (partial) => updateAnalysisState(activeAnalysis, partial),
    [activeAnalysis, updateAnalysisState]
  )
  return [state, update]
}
