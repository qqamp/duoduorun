/**
 * AppContext — 全域狀態
 *
 * 內含：
 *   lang           — 'zh-TW' | 'en'
 *   mode           — 'teaching' | 'report'
 *   activeAnalysis — 目前選中的分析 id（對應 src/config/analyses.js）；null = 未選
 *   activeDataset  — 目前載入的示範資料集 id；null = 未載入
 *   dataset        — { id, rows, labels, valueLabels?, scaleVars? } 或 null
 *   variables      — { col: { name, type, missing, distinct, n } } 或 {}
 *   t              — 已決定好的 i18n 字串表（依 lang 自動切換）
 *
 * 不接 localStorage：spec 訴求是純前端隱私不外流，使用者重整即重置。
 * 將來真要持久化（例如記憶語言偏好）時，再用 IndexedDB。
 */
import { createContext, useContext, useState, useMemo } from 'react'
import { getStrings } from '../i18n'
import { getDataset } from '../data'
import { summarizeAll } from '../lib/variableTypes'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('zh-TW')
  const [mode, setMode] = useState('teaching')
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [activeDataset, setActiveDataset] = useState(null)

  const t = useMemo(() => getStrings(lang), [lang])

  // 載入 activeDataset 對應的 dataset 物件 + 變數 metadata
  // useMemo 確保只在 activeDataset 變動時重算
  const dataset = useMemo(() => {
    if (!activeDataset) return null
    return getDataset(activeDataset)
  }, [activeDataset])

  const variables = useMemo(() => {
    if (!dataset) return {}
    return summarizeAll(dataset.rows)
  }, [dataset])

  const value = {
    lang, setLang,
    mode, setMode,
    activeAnalysis, setActiveAnalysis,
    activeDataset, setActiveDataset,
    dataset,
    variables,
    t,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
