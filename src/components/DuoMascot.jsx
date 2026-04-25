/**
 * 多多吉祥物占位元件
 *
 * 介面契約：
 *   <DuoMascot state="idle" size={48} />
 *
 *   state 支援：
 *     - "idle"        站著，舌頭吐出來（預設）
 *     - "running"     計算中跑步
 *     - "thinking"    分析前提檢核時
 *     - "celebrating" 結果通過時
 *
 *   size 預設 48（單位 px）
 *
 * 將來插畫師畫好真的 Q 版多多後，只要替換內部的 SVG 路徑，
 * 外部所有用到此元件的地方不必變動。
 *
 * 配色全部走 duo palette（直接用 hex，因為是 inline SVG）：
 *   主毛色 #f1a14a（duo-amber-300）
 *   亮毛色 #f8c180（duo-amber-200）
 *   耳朵深 #3f2d1f（duo-cocoa-700）
 *   舌頭粉 #f4a8a8（duo-tongue）
 */
function DuoMascot({ state = 'idle', size = 48 }) {
  const colors = {
    fur:      '#f1a14a',
    furLight: '#f8c180',
    dark:     '#3f2d1f',
    nose:     '#2b1d14',
    eye:      '#1a110a',
    tongue:   '#f4a8a8',
  }

  // 共用：頭、耳、眼、鼻
  const head = (
    <>
      <ellipse cx="38" cy="20" rx="9" ry="8" fill={colors.fur} />
      <path d="M 42 12 L 47 6 L 47 14 Z" fill={colors.dark} />
      <path d="M 33 12 L 28 6 L 31 14 Z" fill={colors.dark} />
      <circle cx="42" cy="20" r="1.5" fill={colors.eye} />
      <ellipse cx="46" cy="22" rx="2.5" ry="1.5" fill={colors.nose} />
    </>
  )

  // 各 state 對應的 body + 腳 + 舌頭 + 尾巴
  let pose
  switch (state) {
    case 'running':
      pose = (
        <>
          <ellipse cx="22" cy="26" rx="14" ry="8" fill={colors.fur} />
          <ellipse cx="10"  cy="36" rx="2" ry="4" fill={colors.furLight} transform="rotate(-25 10 36)" />
          <ellipse cx="18"  cy="38" rx="2" ry="3.5" fill={colors.fur}      transform="rotate(15 18 38)" />
          <ellipse cx="26"  cy="36" rx="2" ry="4" fill={colors.fur}        transform="rotate(-20 26 36)" />
          <ellipse cx="33"  cy="38" rx="2" ry="3" fill={colors.fur}        transform="rotate(20 33 38)" />
          <path d="M 47 23 L 52 27 L 47 26 Z" fill={colors.tongue} />
          <path d="M 8 22 Q 0 16 4 26" stroke={colors.fur} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )
      break

    case 'thinking':
      pose = (
        <>
          <ellipse cx="22" cy="26" rx="14" ry="9" fill={colors.fur} />
          <ellipse cx="14" cy="36" rx="2" ry="4" fill={colors.furLight} />
          <ellipse cx="20" cy="38" rx="2" ry="3" fill={colors.fur} />
          <ellipse cx="26" cy="32" rx="2" ry="3" fill={colors.fur} transform="rotate(45 26 32)" />
          <ellipse cx="32" cy="38" rx="2" ry="3" fill={colors.fur} />
          <path d="M 8 20 Q 4 14 6 22" stroke={colors.fur} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )
      break

    case 'celebrating':
      pose = (
        <>
          <ellipse cx="22" cy="22" rx="14" ry="9" fill={colors.fur} />
          <ellipse cx="13" cy="32" rx="2" ry="4" fill={colors.furLight} transform="rotate(-30 13 32)" />
          <ellipse cx="20" cy="34" rx="2" ry="3" fill={colors.fur}      transform="rotate(15 20 34)" />
          <ellipse cx="26" cy="32" rx="2" ry="4" fill={colors.fur}      transform="rotate(30 26 32)" />
          <ellipse cx="32" cy="34" rx="2" ry="3" fill={colors.fur}      transform="rotate(-15 32 34)" />
          <path d="M 47 22 L 52 19 L 49 26 Z" fill={colors.tongue} />
          <path d="M 8 16 Q 0 8 4 18" stroke={colors.fur} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )
      break

    case 'idle':
    default:
      pose = (
        <>
          <ellipse cx="22" cy="26" rx="14" ry="9" fill={colors.fur} />
          <ellipse cx="14" cy="36" rx="2" ry="3.5" fill={colors.furLight} />
          <ellipse cx="20" cy="38" rx="2" ry="3"   fill={colors.fur} />
          <ellipse cx="26" cy="35" rx="2" ry="4"   fill={colors.fur} />
          <ellipse cx="32" cy="38" rx="2" ry="3"   fill={colors.fur} />
          <path d="M 47 22 L 50 24 L 47 25 Z" fill={colors.tongue} />
          <path d="M 8 20 Q 4 18 6 24" stroke={colors.fur} strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )
  }

  return (
    <svg
      width={size}
      height={(size * 44) / 56}
      viewBox="0 0 56 44"
      role="img"
      aria-label={`多多 ${state}`}
    >
      {pose}
      {head}
    </svg>
  )
}

export default DuoMascot
