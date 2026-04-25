/**
 * 左側垂直導覽列
 *
 * 結構：4 大類別（敘述／推論／相關迴歸／量表），每類可摺疊，
 *       點選二級項目時更新 AppContext 的 activeAnalysis。
 *
 * 視覺：
 *   - 預設四大類都展開（Step 3 開始可考慮預設摺疊）
 *   - 第一優先（priority=1）的項目正常顯示
 *   - 第二、三優先項目用淡化色與小徽章標示「Coming soon」
 *   - 目前選中的項目用 duo-amber 系列高亮
 */
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { ANALYSIS_GROUPS } from '../config/analyses'

function ChevronIcon({ open }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className={`transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
        'ml-auto px-1.5 py-0.5 text-[9px] font-medium rounded',
        priority === 2
          ? 'bg-duo-denim-50 text-duo-denim-500'
          : 'bg-duo-cream-50 text-duo-cocoa-300',
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
    <aside className="w-60 shrink-0 border-r border-duo-cream-200 bg-white overflow-y-auto">
      <nav className="py-3">
        {ANALYSIS_GROUPS.map(group => {
          const open = openGroups[group.id]
          return (
            <div key={group.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-duo-cocoa-700 hover:bg-duo-cream-50 transition"
              >
                <span className="text-duo-cocoa-400">
                  <ChevronIcon open={open} />
                </span>
                {t.sidebar[group.i18nKey]}
              </button>

              {open && (
                <ul className="pl-9">
                  {group.items.map(item => {
                    const isActive = activeAnalysis === item.id
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveAnalysis(item.id)}
                          className={[
                            'w-full flex items-center px-3 py-1.5 text-xs rounded-md text-left transition',
                            isActive
                              ? 'bg-duo-amber-50 text-duo-amber-800 font-medium'
                              : 'text-duo-cocoa-600 hover:bg-duo-cream-50 hover:text-duo-cocoa-800',
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
