/**
 * HomePage — 首頁畫面
 *
 * 顯示時機：尚未載入資料集且未選任何分析時。
 *
 * 結構（Google 首頁式三段）：
 *   - 上：多多照片（圓形）
 *   - 中：中英文標題 + tagline
 *   - 下：4 張資訊卡（用途、開發、隱私、引用）+ footer
 */
import { useApp } from '../context/AppContext'
import duoduoHead from '../assets/duoduo-head.jpg'

function InfoCard({ title, body }) {
  return (
    <div className="bg-white rounded-lg border border-duo-cocoa-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-serif text-base font-semibold text-duo-cocoa-900 mb-2">
        {title}
      </h3>
      <div className="text-sm text-duo-cocoa-700 leading-relaxed whitespace-pre-line">
        {body}
      </div>
    </div>
  )
}

function HomePage() {
  const { t } = useApp()
  const cards = t.home?.cards || {}

  return (
    <div className="flex-1 overflow-y-auto bg-duo-cream-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* 上：多多照片 */}
        <div className="flex justify-center">
          <div className="rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-duo-cocoa-100"
               style={{ width: 168, height: 168 }}>
            <img
              src={duoduoHead}
              alt="多多"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 中：標題與 tagline */}
        <div className="text-center mt-8">
          <h1 className="font-serif text-5xl font-bold text-duo-cocoa-900 tracking-tight">
            {t.app.title}
          </h1>
          <div className="font-mono text-sm tracking-[0.3em] text-duo-amber-700 mt-3 uppercase">
            {t.app.subtitle}
          </div>
          {t.home?.byAuthor && (
            <div className="mt-4 text-sm text-duo-cocoa-600">
              <a
                href={t.home.authorUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif italic hover:text-duo-amber-700 underline-offset-4 hover:underline transition"
              >
                {t.home.byAuthor}
              </a>
            </div>
          )}
          <p className="mt-5 text-base text-duo-cocoa-600 max-w-2xl mx-auto leading-relaxed">
            {t.home?.heroTagline || t.app.tagline}
          </p>
        </div>

        {/* 下：4 張資訊卡 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.purpose && (
            <InfoCard title={cards.purpose.title} body={cards.purpose.body} />
          )}
          {cards.author && (
            <InfoCard title={cards.author.title} body={cards.author.body} />
          )}
          {cards.privacy && (
            <InfoCard title={cards.privacy.title} body={cards.privacy.body} />
          )}
          {cards.citation && (
            <InfoCard title={cards.citation.title} body={cards.citation.body} />
          )}
        </div>

        {/* Footer */}
        {t.home?.footer && (
          <div className="mt-10 pb-4 text-center text-xs text-duo-cocoa-400 leading-relaxed">
            {t.home.footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
