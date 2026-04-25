function App() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          Step 1 — scaffold deployed
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-4">
          StatLite
        </h1>

        <p className="text-lg text-slate-600 mb-2">
          純前端統計分析工具，瀏覽器即可使用，免安裝、免費、隱私不外流
        </p>
        <p className="text-sm text-slate-500 mb-10">
          A pure-frontend statistical tool — no install, no fees, no data leaves your browser.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs text-slate-500 mb-1">框架</div>
            <div className="text-sm font-medium text-slate-900">React + Vite</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs text-slate-500 mb-1">樣式</div>
            <div className="text-sm font-medium text-slate-900">Tailwind CSS</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <div className="text-xs text-slate-500 mb-1">部署</div>
            <div className="text-sm font-medium text-slate-900">GitHub Pages</div>
          </div>
        </div>

        <p className="text-xs text-slate-400">
          UI 與統計功能將於 Step 2 — Step 3 陸續上線
        </p>
      </div>
    </div>
  )
}

export default App
