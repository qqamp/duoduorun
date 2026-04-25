/**
 * 繁體中文（台灣）字串對照表
 *
 * 命名空間：
 *   app.*       — 整體應用層級的字串（標題、副標題等）
 *   toolbar.*   — 頂部工具列
 *   sidebar.*   — 左側導覽列
 *   panels.*    — 三欄主內容區
 *   modes.*     — 教學模式 / 報告模式
 *   datasets.*  — 示範資料集名稱
 *   common.*    — 通用按鈕、提示
 */
export default {
  app: {
    title: '多多快跑',
    subtitle: 'DUODUORUN',
    tagline: '純前端統計分析工具，瀏覽器即可使用，免安裝、免費、隱私不外流',
  },
  toolbar: {
    selectDataset: '選擇示範資料集',
    uploadData: '上傳資料',
    export: '匯出報告',
    language: '語言',
    mode: '模式',
  },
  sidebar: {
    descriptive: '敘述統計',
    inferential: '推論統計',
    regression: '相關與迴歸',
    scale: '量表分析',
    descStats: '基本敘述統計',
    tTest: 't 檢定',
    oneWayAnova: '單因子 ANOVA',
    twoWayAnova: '雙因子 ANOVA',
    chiSquare: '卡方檢定',
    nonparametric: '無母數檢定',
    correlation: '相關分析',
    simpleRegression: '簡單迴歸',
    multipleRegression: '多元迴歸',
    logisticRegression: '邏輯斯迴歸',
    cronbachAlpha: "Cronbach's α",
    efa: '探索性因素分析',
  },
  panels: {
    configTitle: '分析設定',
    configEmpty: '請從左側選擇分析方法',
    configNoDataset: '先在右上角載入資料集',
    variablesTitle: '變數列表',
    resultTitle: '統計結果',
    resultEmpty: '此分析將於 Step 3 上線',
    resultNoDataset: '請先在右上角載入示範資料集',
    explainTitle: '方法說明',
    explainEmpty: '選擇分析方法後，此處顯示用途、前提假設、核心公式',
    explainTeaching: '此處將顯示分析方法的用途說明、前提假設、核心公式（教學模式）',
    explainReport: '此處將顯示 APA 格式的結果敘述（中文版 + 英文版）',
    previewTitle: '資料預覽',
    previewSubtitle: '顯示前 20 筆 — 共 {n} 筆 × {k} 個變數',
  },
  varTypes: {
    continuous: '連續',
    ordinal: '序次',
    categorical: '類別',
    unknown: '未知',
  },
  variables: {
    missing: '遺漏 {n}',
    distinct: '{n} 個不同值',
    noMissing: '無遺漏',
  },
  modes: {
    teaching: '教學模式',
    report: '報告模式',
  },
  datasets: {
    none: '尚未載入資料',
    employee: '員工滿意度調查',
    intervention: '教學介入實驗',
    multigroup: '多組比較研究',
    categorical: '類別資料調查',
    employeeDesc: 'Likert 量表 + 部門 + 年資 — 適合相關、迴歸、α',
    interventionDesc: '實驗組／控制組 + 前後測 — 適合 t 檢定',
    multigroupDesc: '三組以上的依變項 — 適合 ANOVA',
    categoricalDesc: '類別變數交叉 — 適合卡方',
  },
  common: {
    comingSoon: '陸續上線中',
    placeholder: '占位內容',
  },
}
