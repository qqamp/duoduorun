/**
 * Analysis registry — 將分析 id 映射到 { Config, Result, Notes, Narrative } 元件模組。
 *
 * 加入新分析的步驟：
 *   1. 建立 src/analyses/<id>/ 目錄與 Config/Result/Notes/Narrative.jsx
 *   2. 在 src/analyses/<id>/index.js export default { Config, Result, Notes, Narrative }
 *   3. 在這個檔案 import 並註冊
 *
 * MainContent 透過 getAnalysisModule(activeAnalysis) 找到對應模組後 render。
 */
import descriptive from './descriptive'
import ttest from './ttest'
import correlation from './correlation'
import simpleRegression from './simpleRegression'

const REGISTRY = {
  'desc-stats':       descriptive,
  't-test':           ttest,
  'correlation':      correlation,
  'simple-regression': simpleRegression,
  // 'one-way-anova':  oneWayAnova,    // PR-3d
  // 'cronbach-alpha': cronbachAlpha,  // PR-3e
}

export function getAnalysisModule(id) {
  return REGISTRY[id] || null
}

export function isAnalysisImplemented(id) {
  return id in REGISTRY
}
