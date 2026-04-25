/**
 * TransformDialog — 變數轉換 modal
 *
 * 結構：
 *   左半：新增轉換表單（source、type、params、name + Add 按鈕）
 *   右半：已建立的轉換清單（每筆帶 Remove 按鈕）
 *
 * 互動：
 *   - 點 backdrop 關閉
 *   - 按 ESC 關閉
 *   - 加入後表單重置；name 衝突／格式不對顯示警告
 */
import { useEffect, useMemo, useState } from 'react'
import { useApp } from '../context/AppContext'
import { TRANSFORM_TYPES, suggestName, suggestLabel } from '../lib/transforms'

const NAME_RE = /^[A-Za-z_][A-Za-z0-9_]*$/

function TransformDialog({ open, onClose }) {
  const { dataset, variables, lang, t, transforms, addTransform, removeTransform } = useApp()

  const [source, setSource] = useState(null)
  const [type, setType] = useState('zscore')
  const [name, setName] = useState('')
  const [rangeMin, setRangeMin] = useState(1)
  const [rangeMax, setRangeMax] = useState(5)
  const [error, setError] = useState(null)

  const labelMap = dataset?.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || {}

  // 候選原始變數：numeric only，且非已是 transform 結果（依 name 排除）
  const transformNames = useMemo(() => new Set(transforms.map((tr) => tr.name)), [transforms])
  const sourceCandidates = useMemo(() => {
    return Object.keys(variables).filter((c) => {
      const v = variables[c]
      return (v.type === 'continuous' || v.type === 'ordinal') && !transformNames.has(c)
    })
  }, [variables, transformNames])

  // 預設 name 隨 source / type 變動
  useEffect(() => {
    if (source) setName(suggestName(source, type))
  }, [source, type])

  // 開啟時重置 source + type
  useEffect(() => {
    if (open) {
      setSource(sourceCandidates[0] || null)
      setType('zscore')
      setError(null)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // ESC 關閉
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open || !dataset) return null

  const handleAdd = () => {
    setError(null)
    if (!source) { setError('pickSource'); return }
    if (!NAME_RE.test(name) || transformNames.has(name) || name in (variables || {})) {
      setError('nameInvalid')
      return
    }
    if (type === 'recode_reverse') {
      const lo = Number(rangeMin)
      const hi = Number(rangeMax)
      if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi <= lo) {
        setError('rangeInvalid')
        return
      }
    }

    const sourceLabel = labelMap[source] || source
    const tr = {
      name,
      source,
      type,
      params: type === 'recode_reverse'
        ? { min: Number(rangeMin), max: Number(rangeMax) }
        : null,
      labels: {
        zh: suggestLabel(dataset.labels?.zh?.[source] || source, type, 'zh-TW'),
        en: suggestLabel(dataset.labels?.en?.[source] || source, type, 'en'),
      },
    }
    addTransform(tr)
    // 加完後關閉，讓使用者直接看到結果（也可選擇連續加 — 此處選關閉）
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-duo-cocoa-900/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-xl shadow-xl border border-duo-cream-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-5 py-3 border-b border-duo-cream-200">
          <h2 className="text-base font-semibold text-duo-cocoa-800">{t.transform.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-duo-cocoa-500 hover:text-duo-cocoa-700"
          >
            {t.transform.closeBtn} ✕
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-duo-cream-200">
          {/* 新增表單 */}
          <div className="p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400">
              {lang === 'zh-TW' ? '新增轉換' : 'Add transform'}
            </h3>

            <div>
              <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">
                {t.transform.sourceLabel}
              </label>
              <select
                value={source || ''}
                onChange={(e) => setSource(e.target.value || null)}
                className="w-full h-9 px-3 pr-8 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
              >
                <option value="">{t.transform.pickSource}</option>
                {sourceCandidates.map((c) => (
                  <option key={c} value={c}>
                    {labelMap[c] || c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">
                {t.transform.typeLabel}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-9 px-3 pr-8 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 cursor-pointer"
              >
                {TRANSFORM_TYPES.map((tp) => (
                  <option key={tp} value={tp}>
                    {t.transform.types[tp]}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-duo-cocoa-400 mt-1 leading-snug">
                {t.transform.typeHint[type]}
              </p>
            </div>

            {type === 'recode_reverse' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">
                    {t.transform.rangeMin}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={rangeMin}
                    onChange={(e) => setRangeMin(e.target.value)}
                    className="w-full h-9 px-3 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">
                    {t.transform.rangeMax}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={rangeMax}
                    onChange={(e) => setRangeMax(e.target.value)}
                    className="w-full h-9 px-3 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-duo-cocoa-700 mb-1">
                {t.transform.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 px-3 text-sm rounded-lg bg-white border border-duo-cream-200 text-duo-cocoa-800 hover:border-duo-amber-300 focus:outline-none focus:border-duo-amber-500 font-mono"
              />
              <p className="text-[11px] text-duo-cocoa-400 mt-1 leading-snug">
                {t.transform.nameHint}
              </p>
            </div>

            {error && (
              <div className="text-xs text-duo-tongue bg-duo-tongue/15 border border-duo-tongue rounded-md px-3 py-2">
                {t.transform[error] || error}
              </div>
            )}

            <button
              type="button"
              onClick={handleAdd}
              disabled={!source}
              className={[
                'w-full h-9 text-sm font-medium rounded-lg transition',
                source
                  ? 'bg-duo-amber-500 text-white hover:bg-duo-amber-600'
                  : 'bg-duo-cream-100 text-duo-cocoa-300 cursor-not-allowed',
              ].join(' ')}
            >
              {t.transform.addBtn}
            </button>
          </div>

          {/* 已建立的轉換清單 */}
          <div className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-duo-cocoa-400 mb-3">
              {t.variables.transformsTitle}
            </h3>
            {transforms.length === 0 ? (
              <p className="text-sm text-duo-cocoa-400">{t.variables.noTransforms}</p>
            ) : (
              <ul className="space-y-2">
                {transforms.map((tr) => (
                  <li
                    key={tr.name}
                    className="flex items-center justify-between gap-3 px-3 py-2 rounded-md bg-duo-cream-50 border border-duo-cream-200"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-duo-cocoa-800 font-medium truncate">
                        {tr.labels?.[lang === 'zh-TW' ? 'zh' : 'en'] || tr.name}
                      </div>
                      <div className="text-[10px] text-duo-cocoa-400 mt-0.5 font-mono truncate">
                        {tr.name} ← {tr.source} ({t.transform.types[tr.type]})
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTransform(tr.name)}
                      className="text-xs text-duo-tongue hover:text-duo-cocoa-700 px-2 py-1 rounded hover:bg-white"
                      title={t.transform.removeBtn}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransformDialog
