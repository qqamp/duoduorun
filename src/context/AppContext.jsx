/**
 * AppContext — 全域狀態
 *
 * 內含：
 *   lang           — 'zh-TW' | 'en'
 *   mode           — 'teaching' | 'report'
 *   activeAnalysis — 目前選中的分析 id（對應 src/config/analyses.js）；null = 未選
 *   activeDataset  — 目前載入的示範資料集 id；null = 未載入
 *   t              — 已決定好的 i18n 字串表（依 lang 自動切換）
 *
 * 不接 localStorage：spec 訴求是純前端隱私不外流，使用者重整即重置。
 * 將來真要持久化（例如記憶語言偏好）時，再用 IndexedDB。
 */
import { createContext, useContext, useState, useMemo } from 'react'
import { getStrings } from '../i18n'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('zh-TW')
  const [mode, setMode] = useState('teaching')
  const [activeAnalysis, setActiveAnalysis] = useState(null)
  const [activeDataset, setActiveDataset] = useState(null)

  const t = useMemo(() => getStrings(lang), [lang])

  const value = {
    lang, setLang,
    mode, setMode,
    activeAnalysis, setActiveAnalysis,
    activeDataset, setActiveDataset,
    t,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
