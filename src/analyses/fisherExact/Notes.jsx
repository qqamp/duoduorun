/**
 * Fisher 精確檢定 — 教學筆記
 */
import { useApp } from '../../context/AppContext'

function Notes() {
  const { t } = useApp()
  const n = t.fisherExact.notes
  return (
    <div className="text-sm text-duo-cocoa-700 leading-relaxed space-y-3">
      <div>
        <h3 className="font-serif text-base font-semibold text-duo-cocoa-900 mb-1">{n.q1}</h3>
        <p className="whitespace-pre-line">{n.a1}</p>
      </div>
      <div>
        <h3 className="font-serif text-base font-semibold text-duo-cocoa-900 mb-1">{n.q2}</h3>
        <p className="whitespace-pre-line">{n.a2}</p>
      </div>
      <div>
        <h3 className="font-serif text-base font-semibold text-duo-cocoa-900 mb-1">{n.q3}</h3>
        <p className="whitespace-pre-line">{n.a3}</p>
      </div>
      <div>
        <h3 className="font-serif text-base font-semibold text-duo-cocoa-900 mb-1">{n.q4}</h3>
        <p className="whitespace-pre-line">{n.a4}</p>
      </div>
    </div>
  )
}

export default Notes
