/**
 * 頂部工具列
 *
 * 左側：brand（縮小版多多照片 + 中英文標題）
 * 右側：教學/報告模式切換、語言切換、示範資料集下拉、匯出按鈕
 */
import { useState } from 'react'
import duoHead from '../assets/duoduo-head.jpg'
import { useApp } from '../context/AppContext'
import { SUPPORTED_LANGUAGES, getStrings } from '../i18n'
import { DEMO_DATASETS, ANALYSIS_GROUPS } from '../config/analyses'
import { isAnalysisImplemented } from '../analyses/registry'
import { exportToPdf } from '../lib/pdfExport'
import TransformDialog from './TransformDialog'

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg bg-duo-cream-50 border border-duo-cream-200 p-0.5">
      {options.map(opt => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={[
              'px-3 py-1 text-xs font-medium rounded-md transition',
              active
                ? 'bg-white text-duo-cocoa-800 shadow-sm'
                : 'text-duo-cocoa-500 hover:text-duo-cocoa-700',
            ].join(' ')}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

/** 從 analysis id 取出 zh / en label（用於 PDF header） */
function findAnalysisLabels(activeAnalysis) {
  if (!activeAnalysis) return { zh: '—', en: '—' }
  for (const group of ANALYSIS_GROUPS) {
    const item = group.items.find(i => i.id === activeAnalysis)
    if (item) {
      return {
        zh: getStrings('zh-TW').sidebar[item.i18nKey] || activeAnalysis,
        en: getStrings('en').sidebar[item.i18nKey] || activeAnalysis,
      }
    }
  }
  return { zh: activeAnalysis, en: activeAnalysis }
}

function findDatasetLabels(activeDataset) {
  if (!activeDataset) return { zh: '—', en: '—' }
  return {
    zh: getStrings('zh-TW').datasets[activeDataset] || activeDataset,
    en: getStrings('en').datasets[activeDataset] || activeDataset,
  }
}

function TopToolbar() {
  const {
    lang, setLang,
    mode, setMode,
    activeDataset, setActiveDataset,
    activeAnalysis,
    t,
  } = useApp()

  const [exporting, setExporting] = useState(false)
  const [transformOpen, setTransformOpen] = useState(false)

  // 副標若是英文（DUODUORUN）拉開字距，若是中文（多多快跑）保持正常字距
  const subtitleTracking = lang === 'zh-TW' ? 'tracking-[0.25em]' : 'tracking-normal'

  // 匯出條件：要有資料集 + 有選定的分析 + 該分析已實作
  const canExport =
    !!activeDataset && !!activeAnalysis && isAnalysisImplemented(activeAnalysis)

  const handleExport = async () => {
    if (!canExport || exporting) return
    const target = document.querySelector('main')
    if (!target) return
    setExporting(true)
    try {
      const ds = findDatasetLabels(activeDataset)
      const an = findAnalysisLabels(activeAnalysis)
      await exportToPdf({
        targetEl: target,
        headerData: {
          datasetZh: ds.zh,
          datasetEn: ds.en,
          analysisZh: an.zh,
          analysisEn: an.en,
          filename: activeAnalysis,
        },
      })
    } catch (err) {
      console.error('Export failed:', err)
      alert(`匯出失敗 / Export failed: ${err.message || err}`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <header className="flex items-center justify-between px-6 h-16 bg-white border-b border-duo-cream-200">
      {/* 左：brand */}
      <div className="flex items-center gap-3">
        <img
          src={duoHead}
          alt="多多"
          className="h-12 w-12 rounded-xl object-cover"
        />
        <div className="text-left">
          <h1 className="text-lg font-bold tracking-tight text-duo-cocoa-800 leading-none">
            {t.app.title}
          </h1>
          <p className={`text-[10px] font-medium text-duo-amber-500 mt-1 ${subtitleTracking}`}>
            {t.app.subtitle}
          </p>
        </div>
      </div>

      {/* 右：控制群 */}
      <div className="flex items-center gap-3">
        {/* 模式切換 */}
        <SegmentedControl
          options={[
            { value: 'teaching', label: t.modes.teaching },
            { value: 'report',   label: t.modes.report },
          ]}
          value={mode}
          onChange={setMode}
        />

        {/* 語言切換 */}
        <SegmentedControl
          options={SUPPORTED_LANGUAGES.map(l => ({ value: l.code, label: l.shortLabel }))}
          value={lang}
          onChange={setLang}
        />

        {/* 示範資料集下拉 */}
        <select
          value={activeDataset || ''}
          onChange={e => setActiveDataset(e.target.value || null)}
          className="h-8 px-3 pr-8 text-xs rounded-lg bg-duo-cream-50 border border-duo-cream-200 text-duo-cocoa-700 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
        >
          <option value="">{t.toolbar.selectDataset}</option>
          {DEMO_DATASETS.map(d => (
            <option key={d.id} value={d.id}>
              {t.datasets[d.i18nKey]}
            </option>
          ))}
        </select>

        {/* 變數轉換按鈕 */}
        <button
          type="button"
          disabled={!activeDataset}
          onClick={() => setTransformOpen(true)}
          className={[
            'h-8 px-3 text-xs font-medium rounded-lg border transition',
            activeDataset
              ? 'bg-white border-duo-cream-200 text-duo-cocoa-700 hover:border-duo-amber-300 hover:text-duo-cocoa-800 cursor-pointer'
              : 'bg-duo-cream-50 border-duo-cream-200 text-duo-cocoa-300 cursor-not-allowed',
          ].join(' ')}
          title={
            activeDataset
              ? t.transform.title
              : (lang === 'zh-TW' ? '需先載入資料集' : 'Load a dataset first')
          }
        >
          + {t.variables.addTransform}
        </button>

        {/* 匯出按鈕 */}
        <button
          type="button"
          disabled={!canExport || exporting}
          onClick={handleExport}
          className={[
            'h-8 px-3 text-xs font-medium rounded-lg bg-duo-amber-500 text-white transition',
            !canExport || exporting
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-duo-amber-600 cursor-pointer',
          ].join(' ')}
          title={
            exporting
              ? (lang === 'zh-TW' ? '正在匯出 PDF...' : 'Exporting PDF...')
              : !canExport
                ? (lang === 'zh-TW' ? '需先選擇資料集與分析方法' : 'Select a dataset and analysis first')
                : t.toolbar.export
          }
        >
          {exporting
            ? (lang === 'zh-TW' ? '匯出中…' : 'Exporting…')
            : t.toolbar.export}
        </button>
      </div>

      <TransformDialog open={transformOpen} onClose={() => setTransformOpen(false)} />
    </header>
  )
}

export default TopToolbar
