/**
 * 頂部工具列
 *
 * 左側：brand（縮小版多多照片 + 中英文標題）
 * 右側：教學/報告模式切換、語言切換、示範資料集下拉、匯出按鈕
 *
 * 模式切換與語言切換用 segmented control 風格（暫時 inline，未來可抽成共用元件）
 * 資料集下拉與匯出按鈕為 PR-2a 占位（PR-2b 接 4 個示範資料集，Step 4 接匯出）
 */
import duoHead from '../assets/duoduo-head.jpg'
import { useApp } from '../context/AppContext'
import { SUPPORTED_LANGUAGES } from '../i18n'
import { DEMO_DATASETS } from '../config/analyses'

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

function TopToolbar() {
  const {
    lang, setLang,
    mode, setMode,
    activeDataset, setActiveDataset,
    t,
  } = useApp()

  // 副標若是英文（DUODUORUN）拉開字距，若是中文（多多快跑）保持正常字距
  const subtitleTracking = lang === 'zh-TW' ? 'tracking-[0.25em]' : 'tracking-normal'

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

        {/* 匯出按鈕 — PR-2a 暫禁用 */}
        <button
          type="button"
          disabled
          className="h-8 px-3 text-xs font-medium rounded-lg bg-duo-amber-500 text-white opacity-40 cursor-not-allowed"
          title={t.common.comingSoon}
        >
          {t.toolbar.export}
        </button>
      </div>
    </header>
  )
}

export default TopToolbar
