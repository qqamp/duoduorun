/**
 * 左側垂直導覽列
 *
 * 視覺風格（暖色 AI 質感）：
 *   - 群組標題：serif、半粗、低調
 *   - 選中項目：左 2px duo-amber border + duo-amber-700 文字（不用色塊背景）
 *   - 未選 hover：底色 duo-cream-50
 *   - Priority 徽章：font-mono、細邊框
 */
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ANALYSIS_GROUPS } from '../config/analyses'

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      className={`transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 4 10 8 6 12" />
    </svg>
  )
}

function PriorityBadge({ priority }) {
  if (priority === 1) return null
  return (
    <span
      className={[
        'ml-auto font-mono px-1.5 py-0.5 text-[9px] font-medium rounded border',
        priority === 2
          ? 'border-duo-denim-200 text-duo-denim-600'
          : 'border-duo-cocoa-100 text-duo-cocoa-300',
      ].join(' ')}
    >
      {priority === 2 ? 'P2' : 'P3'}
    </span>
  )
}

function Sidebar() {
  const { activeAnalysis, setActiveAnalysis, t } = useApp()
  const [openGroups, setOpenGroups] = useState(
    () => Object.fromEntries(ANALYSIS_GROUPS.map(g => [g.id, true]))
  )

  const toggleGroup = (id) => {
    setOpenGroups(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="w-60 shrink-0 border-r border-duo-cocoa-100 bg-white overflow-y-auto">
      <nav className="py-4">
        {ANALYSIS_GROUPS.map(group => {
          const open = openGroups[group.id]
          return (
            <div key={group.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center gap-2.5 px-5 py-2 font-serif text-[15px] font-semibold text-duo-cocoa-900 hover:text-duo-amber-700 transition"
              >
                <span className="text-duo-cocoa-300">
                  <ChevronIcon open={open} />
                </span>
                {t.sidebar[group.i18nKey]}
              </button>

              {open && (
                <ul className="pl-5">
                  {group.items.map(item => {
                    const isActive = activeAnalysis === item.id
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveAnalysis(item.id)}
                          className={[
                            'w-full flex items-center pl-5 pr-3 py-1.5 text-xs text-left transition border-l-2',
                            isActive
                              ? 'border-duo-amber-500 text-duo-amber-700 bg-duo-amber-50/40 font-medium'
                              : 'border-transparent text-duo-cocoa-600 hover:text-duo-cocoa-900 hover:bg-duo-cream-50',
                          ].join(' ')}
                        >
                          <span>{t.sidebar[item.i18nKey]}</span>
                          <PriorityBadge priority={item.priority} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
