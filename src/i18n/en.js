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
  ttest: {
    types: {
      independent: 'Independent samples',
      paired: 'Paired samples',
      oneSample: 'One sample',
    },
    typeHint: {
      independent: "Welch's correction (does not assume equal variances)",
      paired: 'Two variables on the same subjects (e.g., pre/post test)',
      oneSample: 'Compare to a specified value (μ₀)',
    },
    config: {
      typeLabel: 't-test type',
      depVar: 'Dependent variable',
      groupVar: 'Grouping variable',
      groupVarHint: 'Must be categorical with exactly 2 groups',
      groupVarBadGroups: 'This variable has {k} groups; needs exactly 2',
      var1: 'Variable 1',
      var2: 'Variable 2',
      mu0: 'Test value μ₀',
      pickDep: 'Pick a dependent variable',
      pickGroup: 'Pick a grouping variable',
      pickVar1: 'Pick variable 1',
      pickVar2: 'Pick variable 2',
      enterMu0: 'Enter a test value',
    },
    result: {
      groupStatsTitle: 'Group descriptives',
      groupCol: 'Group',
      ttestTitle: 't-test results',
      pairedDescTitle: 'Paired difference descriptives',
      oneSampleDescTitle: 'Sample descriptives',
      cols: {
        t: 't',
        df: 'df',
        p: 'p',
        meanDiff: 'Mean diff',
        se: 'SE',
        d: "Cohen's d",
        effect: 'Effect',
      },
      assumpTitle: 'Assumption checks',
      normality: 'Shapiro-Wilk normality',
      homogeneity: "Levene's homogeneity",
      assumpOk: 'OK (p ≥ .05)',
      assumpViolated: 'Violated (p < .05)',
      assumpViolationWarn:
        "Note: assumption violation detected. Welch's correction is already applied for independent t-test (robust to unequal variances). " +
        'For severe normality violation with small n (< 30), consider nonparametric alternatives (Mann-Whitney U / Wilcoxon).',
    },
    effectSize: {
      trivial: 'trivial',
      small: 'small',
      medium: 'medium',
      large: 'large',
    },
    notes: {
      purposeTitle: 'Purpose',
      independentPurpose:
        'Compare means of two independent groups (e.g., experimental vs control).',
      pairedPurpose:
        'Compare the same subjects across two time points or conditions (e.g., pre vs post).',
      oneSamplePurpose:
        'Compare a sample mean to a known population value (μ₀).',
      assumpTitle: 'Assumptions',
      independentAssump:
        '1. The two groups are independent\n2. Each population is normally distributed (relaxed by CLT for n ≥ 30)\n3. Equal population variances — if violated, use Welch (default in this tool)',
      pairedAssump: '1. The paired differences are normally distributed\n2. Pairs are independent',
      oneSampleAssump: '1. Sample comes from a normal population\n2. Observations are independent',
      formulasTitle: 'Core formulas',
      formulaIndepT: 't = (M₁ - M₂) / √(s₁²/n₁ + s₂²/n₂)',
      formulaIndepDf:
        'df = (s₁²/n₁ + s₂²/n₂)² / [ (s₁²/n₁)²/(n₁-1) + (s₂²/n₂)²/(n₂-1) ] (Welch–Satterthwaite)',
      formulaPairedT: 't = M_D / (SD_D / √n), where D = X₁ - X₂',
      formulaOneT: 't = (M - μ₀) / (SD / √n)',
      formulaCohenIndep:
        "Cohen's d = (M₁ - M₂) / s_pooled, s_pooled = √[((n₁-1)s₁² + (n₂-1)s₂²) / (n₁+n₂-2)]",
      formulaCohenPaired: "Cohen's d = M_D / SD_D",
      formulaCohenOne: "Cohen's d = (M - μ₀) / SD",
      readingTitle: 'How to read it',
      reading:
        'p < .05: the mean difference is statistically significant (reject H₀).\n\n' +
        "Cohen's d interpretation: |d| < 0.2 trivial, 0.2-0.5 small, 0.5-0.8 medium, > 0.8 large.\n\n" +
        'Statistical significance ≠ practical importance. Larger samples make significance easier to reach but small effects may have no practical meaning. Always interpret p alongside d.',
    },
    apa: {
      independent:
        "An independent samples t-test revealed a {sigWord} difference between {g1Name} (M = {m1}, SD = {sd1}, n = {n1}) and {g2Name} (M = {m2}, SD = {sd2}, n = {n2}), t({df}) = {t}, p = {pStr}, Cohen's d = {d} ({effectWord} effect).",
      paired:
        "A paired samples t-test revealed a {sigWord} difference between {var1Name} (M = {m1}, SD = {sd1}) and {var2Name} (M = {m2}, SD = {sd2}); mean of paired differences = {meanDiff} (SD = {sdDiff}), t({df}) = {t}, p = {pStr}, Cohen's d = {d} ({effectWord} effect).",
      oneSample:
        "A one-sample t-test revealed a {sigWord} difference between the sample mean (M = {m}, SD = {sd}, n = {n}) and the test value μ₀ = {mu0}, t({df}) = {t}, p = {pStr}, Cohen's d = {d} ({effectWord} effect).",
      sigYes: 'significant',
      sigNo: 'non-significant',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      independent:
        'Conclusion: the mean difference between {g1Name} (M = {m1}) and {g2Name} (M = {m2}) is {sigWord} (t = {t}, p = {pStr}). ' +
        "Cohen's d = {d}, indicating a {effectWord} effect. {practical}",
      paired:
        'Conclusion: the paired difference between {var1Name} (M = {m1}) and {var2Name} (M = {m2}) is {sigWord} (t = {t}, p = {pStr}). ' +
        "Cohen's d = {d}, indicating a {effectWord} effect. {practical}",
      oneSample:
        'Conclusion: the difference between the sample mean (M = {m}) and μ₀ = {mu0} is {sigWord} (t = {t}, p = {pStr}). ' +
        "Cohen's d = {d}, indicating a {effectWord} effect. {practical}",
      practicalSig:
        'The difference is statistically meaningful; the effect size informs practical interpretation.',
      practicalNs:
        'Cannot reject the null hypothesis of no difference; this could be a true null, or insufficient power due to small sample.',
    },
  },
}
