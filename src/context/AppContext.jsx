/**
 * AppContext — 全域狀態
 *
 * 內含：
 *   lang           — 'zh-TW' | 'en'
 *   mode           — 'teaching' | 'report'
 *   activeAnalysis — 目前選中的分析 id；null = 未選
 *   activeDataset  — 目前載入的示範資料集 id；null = 未載入
 *   transforms     — 變數轉換清單（log / zscore / 反向計分等）
 *   dataset        — 套用 transforms 後的有效 dataset
 *   variables      — { col: meta }
 *   t              — i18n 字串表
 *   analysisState  — 各分析的設定狀態
 *   history        — 釘選的分析快照陣列（PR-4c）
 *
 * 操作：
 *   setLang / setMode / setActiveAnalysis / setActiveDataset(=switchDataset)
 *   addTransform / removeTransform
 *   getAnalysisState / updateAnalysisState
 *   pushSnapshot / restoreSnapshot / removeSnapshot / clearHistory
 *
 * 不接 localStorage。
 */
import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { getStrings } from '../i18n'
import { getDataset } from '../data'
import { summarizeAll } from '../lib/variableTypes'
import { applyTransforms } from '../lib/transforms'

const AppContext = createContext(null)

let snapCounter = 0
function newSnapId() {
  snapCounter += 1
  return `${Date.now()}-${snapCounter}`
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState('zh-TW')
  const [mode, setMode] = useState('teaching')
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [activeDataset, setActiveDatasetRaw] = useState(null)
  const [analysisState, setAnalysisState] = useState({})
  const [transforms, setTransforms] = useState([])
  const [history, setHistory] = useState([])

  const t = useMemo(() => getStrings(lang), [lang])

  // 切換資料集時清空轉換（轉換綁特定資料集的欄位）
  const switchDataset = useCallback((id) => {
    setActiveDatasetRaw(id)
    setTransforms([])
  }, [])

  // 套用 transforms 後的有效 dataset
  const dataset = useMemo(() => {
    if (!activeDataset) return null
    const raw = getDataset(activeDataset)
    if (!raw) return null
    if (transforms.length === 0) return raw
    const effectiveRows = applyTransforms(raw.rows, transforms)
    const effectiveLabels = {
      zh: { ...(raw.labels?.zh || {}) },
      en: { ...(raw.labels?.en || {}) },
    }
    for (const tr of transforms) {
      effectiveLabels.zh[tr.name] = tr.labels?.zh || tr.name
      effectiveLabels.en[tr.name] = tr.labels?.en || tr.name
    }
    return {
      ...raw,
      rows: effectiveRows,
      labels: effectiveLabels,
    }
  }, [activeDataset, transforms])

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

  const addTransform = useCallback((tr) => {
    setTransforms((prev) => {
      const filtered = prev.filter((p) => p.name !== tr.name)
      return [...filtered, tr]
    })
  }, [])
  const removeTransform = useCallback((name) => {
    setTransforms((prev) => prev.filter((p) => p.name !== name))
  }, [])

  /* ─────────────────────  history  ───────────────────── */

  const pushSnapshot = useCallback(
    (label) => {
      if (!activeDataset || !activeAnalysis) return null
      const settings = analysisState[activeAnalysis] || {}
      const snap = {
        id: newSnapId(),
        timestamp: Date.now(),
        datasetId: activeDataset,
        analysisId: activeAnalysis,
        settings: structuredClone(settings),
        transforms: structuredClone(transforms),
        mode,
        lang,
        label: label || null,
      }
      setHistory((prev) => [snap, ...prev]) // 最新在前
      return snap.id
    },
    [activeDataset, activeAnalysis, analysisState, transforms, mode, lang]
  )

  const restoreSnapshot = useCallback(
    (id) => {
      const snap = history.find((h) => h.id === id)
      if (!snap) return false
      // 直接設 activeDataset（繞過 switchDataset 以保留 transforms）
      setActiveDatasetRaw(snap.datasetId)
      setTransforms(snap.transforms ? structuredClone(snap.transforms) : [])
      setActiveAnalysis(snap.analysisId)
      setAnalysisState((prev) => ({
        ...prev,
        [snap.analysisId]: structuredClone(snap.settings),
      }))
      setMode(snap.mode)
      setLang(snap.lang)
      return true
    },
    [history]
  )

  const removeSnapshot = useCallback((id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const value = {
    lang, setLang,
    mode, setMode,
    activeAnalysis, setActiveAnalysis,
    activeDataset, setActiveDataset: switchDataset,
    transforms, addTransform, removeTransform,
    dataset,
    variables,
    t,
    getAnalysisState,
    updateAnalysisState,
    history,
    pushSnapshot,
    restoreSnapshot,
    removeSnapshot,
    clearHistory,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

export function useAnalysisState() {
  const { activeAnalysis, getAnalysisState, updateAnalysisState } = useApp()
  const state = getAnalysisState(activeAnalysis)
  const update = useCallback(
    (partial) => updateAnalysisState(activeAnalysis, partial),
    [activeAnalysis, updateAnalysisState]
  )
  return [state, update]
}
