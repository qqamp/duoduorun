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
    copy: 'Copy',
    copied: 'Copied',
  },
  desc: {
    selectVarsTitle: 'Select variables for analysis',
    selectVarsHint: 'Tick numeric variables below (continuous or ordinal); multiple allowed',
    noVarsSelected: 'Tick at least one variable to start',
    cols: {
      variable: 'Variable',
      n: 'N',
      mean: 'M',
      sd: 'SD',
      se: 'SE',
      min: 'Min',
      max: 'Max',
      median: 'Median',
      skew: 'Skew',
      kurt: 'Kurt',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        "Summarize each variable's central tendency (M, Median), spread (SD, SE, Min, Max), and shape (Skew, Kurt). Always run this first to get to know your data before any inferential analysis.",
      assumptionsTitle: 'Assumptions',
      assumptions: 'None — descriptive statistics involves no inference, so no assumptions to check.',
      formulasTitle: 'Core formulas',
      formulaM: 'M = ΣX / n',
      formulaSD: 'SD = √( Σ(X - M)² / (n - 1) )',
      formulaSE: 'SE = SD / √n',
      formulaSkew:
        'Skew = n / [(n-1)(n-2)] · Σ((X - M) / SD)³ (Fisher–Pearson type 2, matches SPSS)',
      formulaKurt:
        'Kurt = n(n+1) / [(n-1)(n-2)(n-3)] · Σ((X - M) / SD)⁴ - 3(n-1)² / [(n-2)(n-3)] (excess kurtosis)',
      readingTitle: 'How to read it',
      reading:
        'Skewness: >0 right-skewed (tail on right), <0 left-skewed (tail on left), ≈0 symmetric.' +
        ' Rule of thumb: |Skew| < 1 is approximately symmetric.' +
        '\n\nKurtosis: >0 leptokurtic (peaked, heavy-tailed), <0 platykurtic (flat), ≈0 near normal.' +
        ' Rule of thumb: |Kurt| < 1 is close to normal.',
    },
    apa: {
      sentence:
        '{label} (M = {m}, SD = {sd}, N = {n}, range {min}–{max}, Median = {median}), skewness = {skew}, kurtosis = {kurt}.',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      sentence:
        '{label} has {n} valid observations, mean = {m}, SD = {sd}, range {minMaxRange}. Distribution shape: {skewWord}, {kurtWord}.',
      skewLeft: 'left-skewed',
      skewRight: 'right-skewed',
      skewSymmetric: 'approximately symmetric',
      kurtHigh: 'more peaked than normal',
      kurtLow: 'flatter than normal',
      kurtNormal: 'close to normal',
    },
  },
}
