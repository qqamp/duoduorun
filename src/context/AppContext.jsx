/**
 * AppContext — 全域狀態
 *
 * 內含：
 *   lang           — 'zh-TW' | 'en'
 *   mode           — 'teaching' | 'report'
 *   activeAnalysis — 目前選中的分析 id；null = 未選
 *   activeDataset  — 目前載入的示範資料集 id；null = 未載入
 *   transforms     — 變數轉換清單（log / zscore / 反向計分等）
 *                    [{ name, source, type, params, labels: { zh, en } }]
 *   dataset        — 套用 transforms 後的有效 dataset（rows 含轉換欄位）
 *   variables      — { col: { name, type, missing, distinct, n } }
 *   t              — 已決定好的 i18n 字串表
 *   analysisState  — 各分析的設定狀態
 *   addTransform / removeTransform — transforms 操作
 *   getAnalysisState / updateAnalysisState — analysisState 操作
 */
import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { getStrings } from '../i18n'
import { getDataset } from '../data'
import { summarizeAll } from '../lib/variableTypes'
import { applyTransforms } from '../lib/transforms'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('zh-TW')
  const [mode, setMode] = useState('teaching')
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [activeDataset, setActiveDataset] = useState(null)
  const [analysisState, setAnalysisState] = useState({})
  const [transforms, setTransforms] = useState([])

  const t = useMemo(() => getStrings(lang), [lang])

  // 切換資料集時清空轉換（轉換綁特定資料集的欄位）
  const switchDataset = useCallback((id) => {
    setActiveDataset(id)
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
      // 同名覆蓋（避免重複）
      const filtered = prev.filter((p) => p.name !== tr.name)
      return [...filtered, tr]
    })
  }, [])

  const removeTransform = useCallback((name) => {
    setTransforms((prev) => prev.filter((p) => p.name !== name))
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
