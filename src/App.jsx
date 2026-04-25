import duoHead from './assets/duoduo-head.jpg'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-duo-amber-100 text-duo-amber-800 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-duo-amber-500"></span>
          Step 1 — scaffold deployed
        </div>

        {/* hero: 照片在左、中英文標題在右且左對齊 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <img
            src={duoHead}
            alt="多多"
            className="h-[76px] w-[76px] rounded-2xl object-cover"
          />
          <div className="text-left">
            <h1 className="text-5xl font-bold tracking-tight text-duo-cocoa-800 leading-none">
              多多快跑
            </h1>
            <p className="text-sm font-medium tracking-[0.2em] text-duo-amber-500 mt-2">
              DUODUORUN
            </p>
          </div>
        </div>

        <p className="text-lg text-duo-cocoa-600 mb-2">
          純前端統計分析工具，瀏覽器即可使用，免安裝、免費、隱私不外流
        </p>
        <p className="text-sm text-duo-cocoa-400 mb-10">
          A pure-frontend statistical tool — no install, no fees, no data leaves your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <div className="rounded-lg border border-duo-cream-200 bg-white px-4 py-3">
            <div className="text-xs text-duo-cocoa-400 mb-1">框架</div>
            <div className="text-sm font-medium text-duo-cocoa-800">React + Vite</div>
          </div>
          <div className="rounded-lg border border-duo-cream-200 bg-white px-4 py-3">
            <div className="text-xs text-duo-cocoa-400 mb-1">樣式</div>
            <div className="text-sm font-medium text-duo-cocoa-800">Tailwind CSS</div>
          </div>
          <div className="rounded-lg border border-duo-cream-200 bg-white px-4 py-3">
            <div className="text-xs text-duo-cocoa-400 mb-1">部署</div>
            <div className="text-sm font-medium text-duo-cocoa-800">GitHub Pages</div>
          </div>
        </div>

        <p className="text-xs text-duo-cocoa-300">
          UI 與統計功能將於 Step 2 — Step 3 陸續上線
        </p>
      </div>
    </div>
  )
}

export default App
