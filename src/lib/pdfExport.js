/**
 * PDF 匯出工具
 *
 * 對外 API：
 *   exportToPdf({ targetEl, headerData })
 *
 *   targetEl   — DOM 節點，要被截圖的內容（通常是 MainContent）
 *   headerData — { datasetZh, datasetEn, analysisZh, analysisEn, filename }
 *
 * 流程：
 *   1. 動態 import jspdf 與 html2canvas（避免初載入體積過大）
 *   2. html2canvas 截圖目標元素
 *   3. 動態建立 bilingual header DOM（含中文）並截圖（用 html2canvas 處理中文，避免 jsPDF 內建字體不支援中文）
 *   4. A4 直式、自動分頁；每頁附 header 與 footer
 *   5. 檔名：duoduorun-{filename}-{YYYY-MM-DD}.pdf
 */

const PAGE = { width: 210, height: 297 } // A4 mm
const MARGIN = 12
const HEADER_H_MM = 18
const FOOTER_H_MM = 8

function isoDate() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** 在 document.body 建立離屏的 header DOM，回傳元素引用 */
function buildHeaderDom({ datasetZh, datasetEn, analysisZh, analysisEn }) {
  const div = document.createElement('div')
  div.style.cssText = [
    'position:fixed',
    'top:0',
    'left:-99999px',
    'width:1100px',
    'background:white',
    'padding:14px 20px',
    'font-family:system-ui,-apple-system,Segoe UI,Microsoft JhengHei,PingFang TC,sans-serif',
  ].join(';')
  div.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e8d8c0;padding-bottom:10px;">
      <div>
        <div style="font-size:18px;font-weight:600;color:#2b1d14;">多多快跑 / DuoDuoRun</div>
        <div style="font-size:11px;color:#8f6d4f;margin-top:2px;letter-spacing:0.15em;">純前端統計分析工具</div>
      </div>
      <div style="text-align:right;font-size:11px;color:#5a432a;line-height:1.6;">
        <div><span style="color:#8f6d4f;">資料集：</span>${datasetZh} <span style="color:#a98257;">/</span> ${datasetEn}</div>
        <div><span style="color:#8f6d4f;">分析：</span>${analysisZh} <span style="color:#a98257;">/</span> ${analysisEn}</div>
        <div style="color:#a98257;font-size:10px;margin-top:2px;">${new Date().toLocaleString('zh-TW')}</div>
      </div>
    </div>
  `
  document.body.appendChild(div)
  return div
}

export async function exportToPdf({ targetEl, headerData }) {
  if (!targetEl) throw new Error('exportToPdf: targetEl is required')

  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ])

  const headerDom = buildHeaderDom(headerData)

  let bodyCanvas, headerCanvas
  try {
    bodyCanvas = await html2canvas(targetEl, {
      scale: 2,
      backgroundColor: '#fbeed8', // duo-cream-100
      useCORS: true,
      logging: false,
    })
    headerCanvas = await html2canvas(headerDom, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
    })
  } finally {
    document.body.removeChild(headerDom)
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const contentW = PAGE.width - 2 * MARGIN
  const contentH = PAGE.height - 2 * MARGIN - HEADER_H_MM - FOOTER_H_MM

  // header image to mm
  const headerImg = headerCanvas.toDataURL('image/png', 0.92)
  const headerScale = contentW / headerCanvas.width
  const headerScaledH = headerCanvas.height * headerScale

  // body image
  const pxToMmBody = contentW / bodyCanvas.width
  const pageContentHeightPx = contentH / pxToMmBody
  const totalPages = Math.max(1, Math.ceil(bodyCanvas.height / pageContentHeightPx))

  const drawHeaderFooter = (pageIdx) => {
    pdf.addImage(
      headerImg,
      'PNG',
      MARGIN,
      MARGIN,
      contentW,
      headerScaledH
    )
    pdf.setFontSize(8)
    pdf.setTextColor(143, 109, 79) // duo-cocoa-400 ish
    pdf.text(
      `${pageIdx + 1} / ${totalPages}`,
      PAGE.width / 2,
      PAGE.height - 5,
      { align: 'center' }
    )
    pdf.text(
      'https://qqamp.github.io/duoduorun/',
      PAGE.width - MARGIN,
      PAGE.height - 5,
      { align: 'right' }
    )
  }

  for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
    if (pageIdx > 0) pdf.addPage()
    drawHeaderFooter(pageIdx)

    const sliceY = pageIdx * pageContentHeightPx
    const sliceH = Math.min(pageContentHeightPx, bodyCanvas.height - sliceY)

    const slice = document.createElement('canvas')
    slice.width = bodyCanvas.width
    slice.height = sliceH
    slice.getContext('2d').drawImage(bodyCanvas, 0, -sliceY)
    const sliceData = slice.toDataURL('image/png', 0.92)

    pdf.addImage(
      sliceData,
      'PNG',
      MARGIN,
      MARGIN + headerScaledH + 4,
      contentW,
      sliceH * pxToMmBody
    )
  }

  pdf.save(`duoduorun-${headerData.filename}-${isoDate()}.pdf`)
}
