import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base path 必須與 GitHub repo 名稱對齊，否則 Pages 部署後資源會 404
// 部署網址：https://<github-username>.github.io/duoduorun/
export default defineConfig({
  plugins: [react()],
  base: '/duoduorun/',
})
