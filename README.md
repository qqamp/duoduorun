# StatLite

純前端統計分析工具。所有運算在瀏覽器本地執行，資料不上傳，免安裝、免費，部署於 GitHub Pages。

> 目標：讓學生不需購買 SPSS 即可完成常見統計分析，並確保計算結果與商用統計軟體（SPSS、R）一致。

## 技術堆疊

- **框架**：React 19 + Vite 8
- **樣式**：Tailwind CSS v3
- **統計計算**：純 JavaScript 自行實作（不依賴外部統計函式庫，p-value 使用 regularized incomplete beta function，方法參照 *Numerical Recipes*）
- **檔案解析**：Papa Parse（CSV）、SheetJS（XLSX）— *待第三步接入*
- **圖表**：Recharts — *待第三步接入*
- **PDF 匯出**：jsPDF + html2canvas — *待第四步接入*
- **托管**：GitHub Pages（透過 GitHub Actions 自動部署）

## 本地開發

```bash
npm install
npm run dev
```

預設於 http://localhost:5173 啟動，因為設定了 `base: '/duoduorun/'`，本地開發網址會是 http://localhost:5173/duoduorun/

## 部署流程

只要 push 到 `main` 分支，GitHub Actions 會自動：

1. 安裝相依套件（`npm ci`）
2. 執行 `vite build`（產出至 `dist/`）
3. 上傳 artifact 至 GitHub Pages

部署網址：`https://<github-username>.github.io/duoduorun/`

### 首次部署需要的 GitHub 設定

依序執行：

1. **在本機先跑一次 `npm install`** —— 這會產生 `package-lock.json`。GitHub Actions 的 workflow 用 `npm ci` 部署，需要 lockfile 存在於 repo 裡，否則 CI 會失敗
2. 在 GitHub 建立名為 **duoduorun** 的 public repo（必須叫這個名字，因為 `vite.config.js` 的 `base` 是 `/duoduorun/`；若改名，記得同步改 `vite.config.js` 的 base 與 README 對應位置）
3. 設定 git remote 並 push（指令在下一節）
4. 進入 repo 的 **Settings → Pages**
5. **Source** 選擇 **GitHub Actions**（不要選 Deploy from a branch）
6. Actions 跑完後，Pages 會自動上線

### 第一次推上 GitHub 的完整指令

請在 **Windows PowerShell** 開啟此資料夾後依序執行（不要在 Cowork sandbox 跑，會被 OneDrive 鎖權限）：

```powershell
# 1. 先清掉 sandbox 殘留的損壞 .git 目錄與空的 _scaffold 目錄
Remove-Item -Recurse -Force .git
Remove-Item -Recurse -Force _scaffold

# 2. 安裝相依套件（產生 package-lock.json，是 CI 的必要檔）
npm install

# 3. 本地驗證一下（可選）
npm run dev
# 訪問 http://localhost:5173/duoduorun/ 看到 StatLite 占位畫面就 OK
# 按 Ctrl+C 結束

# 4. git init 與第一個 commit
git init -b main
git add -A
git commit -m "feat: scaffold Vite+React+Tailwind with GitHub Pages deploy workflow"

# 5. 設定 remote 並推送（將 <your-username> 換成 GitHub 帳號）
git remote add origin https://github.com/<your-username>/duoduorun.git
git push -u origin main
```

push 完成後到 repo 的 **Settings → Pages**，Source 選 **GitHub Actions**，第一次 build 結束後 Pages 就會上線。

## 專案結構

```
duoduorun/
├── .github/workflows/deploy.yml   # GitHub Actions 自動部署
├── public/                        # 靜態資源（favicon 等）
├── reference/                     # 既有原型 statlite.jsx，計算層之後會抽出至 src/lib/stats/
├── src/
│   ├── App.jsx                    # 主元件（目前是 Step 1 占位畫面）
│   ├── main.jsx
│   └── index.css                  # Tailwind directives
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 開發里程碑

- [x] **Step 1**：scaffold + GitHub Pages 部署流程
- [ ] **Step 2**：完整 UI 架構（左側導覽列、三欄主內容區、教學/報告模式切換、語言切換、示範資料集載入）
- [ ] **Step 3**：第一優先統計功能（敘述統計、t 檢定、Pearson 相關、單因子 ANOVA、簡單迴歸、Cronbach's α），以及對應的 APA 中英文敘述模板與假設前提檢核
- [ ] **Step 4**：實用功能（一鍵複製、PDF 匯出、資料預覽、分析歷史）
- [ ] **Step 5**：第一優先版本上線；之後進入第二優先（多元迴歸、卡方、無母數、視覺化）與第三優先（雙因子 ANOVA、邏輯斯迴歸、EFA）

## 隱私

所有資料解析、統計運算、結果產出，全部在瀏覽器本地執行。**沒有任何資料會上傳到外部伺服器**。本工具不呼叫任何 API、不收集任何使用者資訊。

## 授權

待定（建議 MIT 或 GPL）。
