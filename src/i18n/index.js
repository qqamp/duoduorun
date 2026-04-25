/**
 * i18n loader
 *
 * 用法：
 *   import { getStrings } from './i18n'
 *   const t = getStrings('zh-TW')
 *   t.app.title // → '多多快跑'
 *
 * 實際上應用層用 `useApp()` 取得已決定好的 t（見 src/context/AppContext.jsx），
 * 這裡只是 loader 與 lang 列表的單一來源。
 */
import zhTW from './zh-TW'
import en from './en'

const TABLES = {
  'zh-TW': zhTW,
  en,
}

export const SUPPORTED_LANGUAGES = [
  { code: 'zh-TW', label: '中文', shortLabel: '中' },
  { code: 'en',    label: 'English', shortLabel: 'EN' },
]

export function getStrings(lang) {
  return TABLES[lang] || TABLES['zh-TW']
}
