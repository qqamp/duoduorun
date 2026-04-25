/**
 * English string table.
 *
 * Same namespace structure as zh-TW.js — keep keys in sync.
 */
export default {
  app: {
    title: 'DuoDuoRun',
    subtitle: '多多快跑',
    tagline: 'A pure-frontend statistical tool — no install, no fees, no data leaves your browser.',
  },
  toolbar: {
    selectDataset: 'Select demo dataset',
    uploadData: 'Upload data',
    export: 'Export report',
    language: 'Language',
    mode: 'Mode',
  },
  sidebar: {
    descriptive: 'Descriptive statistics',
    inferential: 'Inferential statistics',
    regression: 'Correlation & regression',
    scale: 'Scale analysis',
    descStats: 'Basic descriptive stats',
    tTest: 't-test',
    oneWayAnova: 'One-way ANOVA',
    twoWayAnova: 'Two-way ANOVA',
    chiSquare: 'Chi-square test',
    nonparametric: 'Nonparametric tests',
    correlation: 'Correlation',
    simpleRegression: 'Simple linear regression',
    multipleRegression: 'Multiple regression',
    logisticRegression: 'Logistic regression',
    cronbachAlpha: "Cronbach's α",
    efa: 'Exploratory factor analysis',
  },
  panels: {
    configTitle: 'Analysis settings',
    configEmpty: 'Pick an analysis from the sidebar',
    configNoDataset: 'Load a dataset first (top right)',
    variablesTitle: 'Variables',
    resultTitle: 'Statistical results',
    resultEmpty: 'This analysis ships in Step 3',
    resultNoDataset: 'Load a demo dataset from the top right',
    explainTitle: 'Method notes',
    explainEmpty: 'Pick an analysis to see purpose, assumptions, and formula',
    explainTeaching: 'Will show method purpose, assumptions, and core formula (teaching mode)',
    explainReport: 'Will show APA-formatted result narrative (Chinese + English)',
    previewTitle: 'Data preview',
    previewSubtitle: 'Showing first 20 of {n} rows × {k} variables',
  },
  varTypes: {
    continuous: 'Continuous',
    ordinal: 'Ordinal',
    categorical: 'Categorical',
    unknown: 'Unknown',
  },
  variables: {
    missing: '{n} missing',
    distinct: '{n} distinct',
    noMissing: 'no missing',
  },
  modes: {
    teaching: 'Teaching mode',
    report: 'Report mode',
  },
  datasets: {
    none: 'No data loaded',
    employee: 'Employee satisfaction survey',
    intervention: 'Teaching intervention experiment',
    multigroup: 'Multi-group comparison study',
    categorical: 'Categorical survey data',
    employeeDesc: 'Likert + department + tenure — for correlation, regression, α',
    interventionDesc: 'Treatment/control + pre/post — for t-test',
    multigroupDesc: 'Three or more groups — for ANOVA',
    categoricalDesc: 'Cross-tab of categorical vars — for chi-square',
  },
  common: {
    comingSoon: 'Coming soon',
    placeholder: 'Placeholder content',
  },
}
