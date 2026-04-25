/**
 * 分析方法選單結構
 *
 * 結構：
 *   ANALYSIS_GROUPS = [{ id, i18nKey, items: [{ id, i18nKey, priority }] }]
 *
 *   id        — 唯一識別碼，用於 URL hash、AppContext 的 activeAnalysis
 *   i18nKey   — 對應 i18n 檔內的 sidebar.* 鍵名
 *   priority  — 1（第一優先，Step 3 上線）
 *               2（第二優先）
 *               3（第三優先）
 *               用於 PR-2a 顯示「Step 3 上線」徽章與否
 *
 * 將來 Step 3 開始接統計引擎後，會在每個 item 加上 component 欄位指向實際分析元件。
 */
export const ANALYSIS_GROUPS = [
  {
    id: 'descriptive',
    i18nKey: 'descriptive',
    items: [
      { id: 'desc-stats', i18nKey: 'descStats', priority: 1 },
      { id: 'normality',  i18nKey: 'normality',  priority: 2 },
    ],
  },
  {
    id: 'inferential',
    i18nKey: 'inferential',
    items: [
      { id: 't-test',          i18nKey: 'tTest',           priority: 1 },
      { id: 'one-way-anova',   i18nKey: 'oneWayAnova',     priority: 1 },
      { id: 'two-way-anova',   i18nKey: 'twoWayAnova',     priority: 3 },
      { id: 'chi-square',      i18nKey: 'chiSquare',       priority: 2 },
      { id: 'nonparametric',   i18nKey: 'nonparametric',   priority: 2 },
    ],
  },
  {
    id: 'regression',
    i18nKey: 'regression',
    items: [
      { id: 'correlation',           i18nKey: 'correlation',          priority: 1 },
      { id: 'simple-regression',     i18nKey: 'simpleRegression',     priority: 1 },
      { id: 'multiple-regression',   i18nKey: 'multipleRegression',   priority: 2 },
      { id: 'logistic-regression',   i18nKey: 'logisticRegression',   priority: 3 },
    ],
  },
  {
    id: 'scale',
    i18nKey: 'scale',
    items: [
      { id: 'cronbach-alpha', i18nKey: 'cronbachAlpha', priority: 1 },
      { id: 'efa',            i18nKey: 'efa',           priority: 3 },
    ],
  },
]

/**
 * 4 個示範資料集（PR-2b 才會接實際資料解析；PR-2a 只顯示 metadata）
 */
export const DEMO_DATASETS = [
  { id: 'employee',      i18nKey: 'employee',      descKey: 'employeeDesc' },
  { id: 'intervention',  i18nKey: 'intervention',  descKey: 'interventionDesc' },
  { id: 'multigroup',    i18nKey: 'multigroup',    descKey: 'multigroupDesc' },
  { id: 'categorical',   i18nKey: 'categorical',   descKey: 'categoricalDesc' },
]
