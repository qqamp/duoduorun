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
    transformed: 'transformed',
    addTransform: 'Add transform',
    transformsTitle: 'Existing transforms',
    noTransforms: 'No transforms yet',
  },
  transform: {
    title: 'Variable transformation',
    sourceLabel: 'Source variable',
    typeLabel: 'Transform type',
    nameLabel: 'New column name',
    nameHint: 'Letters, digits, underscore only; keep the default prefix for easy identification',
    nameInvalid: 'Letters/digits/underscore only; must not collide with existing columns',
    types: {
      log: 'Natural log ln(x)',
      log10: 'Log base 10 log₁₀(x)',
      zscore: 'Z-score standardization',
      recode_reverse: 'Reverse-code Likert',
    },
    typeHint: {
      log: 'x ≤ 0 becomes missing',
      log10: 'x ≤ 0 becomes missing',
      zscore: '(x − M) / SD using full-column M and SD over non-missing values',
      recode_reverse: 'new = max + min − x; typical for restoring reverse-coded items',
    },
    rangeMin: 'Min',
    rangeMax: 'Max',
    pickSource: 'Pick a source variable',
    addBtn: 'Add',
    removeBtn: 'Remove',
    closeBtn: 'Close',
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
  corr: {
    title: 'Correlation matrix',
    selectVarsTitle: 'Select variables for analysis',
    selectVarsHint:
      'Tick at least 2 numeric variables (continuous or ordinal); Pearson r is computed for all pairs',
    needAtLeastTwo: 'Tick at least 2 variables',
    cellHint:
      'Upper triangle: r. Lower triangle: p. * p < .05, ** p < .01, *** p < .001.',
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Describe the direction and strength of linear association between two continuous/ordinal variables.\nPositive r: variables move together.\nNegative r: variables move in opposite directions.\nr ≈ 0: no linear association (non-linear relationship may still exist).',
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Both variables are continuous (5+ point ordinal scales acceptable)\n2. Bivariate normality (relaxed by CLT for n ≥ 30)\n3. Linear relationship — do not use Pearson r for clearly curved scatterplots\n4. Independent observations\n5. Homoscedasticity — residuals should not vary systematically with X',
      formulasTitle: 'Core formulas',
      formulaR: 'r = Σ((Xi - Mx)(Yi - My)) / √(Σ(Xi - Mx)² · Σ(Yi - My)²)',
      formulaT: 't = r √(n - 2) / √(1 - r²), df = n - 2',
      readingTitle: 'How to read it',
      reading:
        '|r| strength (Cohen, 1988): < 0.1 trivial, 0.1-0.3 weak, 0.3-0.5 moderate, > 0.5 strong.\n\n' +
        'r² is the proportion of shared variance (coefficient of determination). E.g., r = 0.5 → r² = 0.25 → X explains 25% of Y\'s variance.\n\n' +
        'Correlation ≠ causation. Even if significant, you cannot infer direction or causality.',
    },
    apa: {
      pairLine:
        '{labelA} and {labelB} showed a {strengthWord} {directionWord} correlation (r = {r}, p = {pStr}, n = {n}).',
      noSig: 'No significant correlations were found in this dataset (α = .05).',
      copyHint: 'Copy APA narrative',
      strengthWord: { weak: 'weak', moderate: 'moderate', strong: 'strong' },
      directionWord: { positive: 'positive', negative: 'negative' },
    },
    interp: {
      header: 'Reading',
      pairLine:
        '{labelA} ↔ {labelB}: r = {r} → {strengthWord} {directionWord} correlation, p = {pStr} → {sigWord}',
      noSig: 'No pair was significant at α = .05. Could be a true null, or insufficient power.',
      sigYes: 'significant',
      sigNo: 'not significant',
    },
  },
  simpleReg: {
    title: 'Simple linear regression',
    config: {
      yLabel: 'Dependent (Y)',
      xLabel: 'Predictor (X)',
      pickY: 'Pick a dependent variable',
      pickX: 'Pick a predictor',
      sameVar: 'X and Y cannot be the same variable',
    },
    result: {
      modelTitle: 'Model summary',
      anovaTitle: 'ANOVA',
      coefTitle: 'Coefficients',
      cols: {
        r: 'r', r2: 'R²', adjR2: 'Adj. R²', se: 'SE estimate',
        source: 'Source', ss: 'SS', df: 'df', ms: 'MS', f: 'F', p: 'p',
        regression: 'Regression', residual: 'Residual', total: 'Total',
        predictor: 'Predictor', b: 'b', stdErr: 'SE', beta: 'β', t: 't',
        intercept: 'Intercept', slope: 'Slope',
      },
      assumpTitle: 'Residual normality',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Predict a continuous Y from a single continuous X. Answers:\n(1) Does X significantly predict Y? (F-test / t on b₁)\n(2) How much variance in Y does X explain? (R²)\n(3) For each unit increase in X, how does Y change? (slope b₁)',
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Linearity: X and Y have a linear relationship (check scatterplot)\n2. Independence of observations\n3. Normally distributed residuals (Shapiro-Wilk auto-checked)\n4. Homoscedasticity: residual variance constant across X (Breusch-Pagan to be added in PR-3c.5)',
      formulasTitle: 'Core formulas',
      formulaB1: 'b₁ = Σ((Xi - Mx)(Yi - My)) / Σ(Xi - Mx)²',
      formulaB0: 'b₀ = My - b₁ · Mx',
      formulaR2: 'R² = SS_regression / SS_total = 1 - SS_residual / SS_total',
      formulaAdjR2: 'Adj. R² = 1 - (1 - R²)(n - 1)/(n - k - 1) (k = number of predictors, here k = 1)',
      formulaF: 'F = MS_regression / MS_residual, df₁ = 1, df₂ = n - 2',
      formulaBeta: 'Standardized β = b₁ · SD(X) / SD(Y) (= r in simple regression)',
      readingTitle: 'How to read it',
      reading:
        'Regression equation: Ŷ = b₀ + b₁ · X\n\n' +
        'Reading order:\n' +
        '1. F and its p — is the overall model significant?\n' +
        '2. R² — how much variance in Y is explained? (= r² in simple regression)\n' +
        '3. b₁ direction and magnitude — how does Y change per unit increase in X?\n' +
        '4. Standardized β — for comparing predictor strength across models.',
    },
    apa: {
      sentence:
        '{xLabel} significantly predicted {yLabel} in a simple linear regression, F({df1}, {df2}) = {f}, p = {pStr}, R² = {r2}, adjusted R² = {adjR2}. The regression equation was {yLabel} = {b0} + {b1} × {xLabel} (β = {beta}, t({df2}) = {t}, p = {pStrSlope}).',
      sentenceNs:
        '{xLabel} did not significantly predict {yLabel} in a simple linear regression, F({df1}, {df2}) = {f}, p = {pStr}, R² = {r2}, adjusted R² = {adjR2}.',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      sentence:
        'Conclusion: {xLabel} {sigWord} predicts {yLabel} (F = {f}, p = {pStr}). The model explains {r2Pct}% of the variance (R² = {r2}). ' +
        'Equation: Ŷ = {b0} + {b1} × X — Y changes by {b1} per unit increase in X on average.' +
        ' Standardized coefficient β = {beta}, indicating a {strengthWord} effect.',
      sigYes: 'significantly',
      sigNo: 'does not significantly',
      strengthWeak: 'weak',
      strengthModerate: 'moderate',
      strengthStrong: 'strong',
    },
  },
  anova: {
    title: 'One-way ANOVA',
    config: {
      depVar: 'Dependent variable',
      factor: 'Factor (grouping variable)',
      pickDep: 'Pick a dependent variable',
      pickFactor: 'Pick a factor',
      factorHint: 'Must be categorical with at least 3 groups',
      factorBadGroups: 'This factor has {k} groups; needs at least 3',
    },
    result: {
      groupStatsTitle: 'Group descriptives',
      anovaTitle: 'ANOVA table',
      effectSizeTitle: 'Effect size',
      tukeyTitle: 'Tukey HSD post-hoc',
      assumpTitle: 'Assumption checks',
      groupCol: 'Group',
      cols: {
        source: 'Source',
        ss: 'SS',
        df: 'df',
        ms: 'MS',
        f: 'F',
        p: 'p',
        between: 'Between',
        within: 'Within',
        total: 'Total',
        eta2: 'η²',
        omega2: 'ω²',
        pair: 'Comparison',
        meanDiff: 'Mean diff',
        se: 'SE',
        q: 'q',
      },
      effectInterp: {
        eta2Label: 'η² (within-sample effect):',
        omega2Label: 'ω² (unbiased estimate):',
        small: 'small',
        medium: 'medium',
        large: 'large',
      },
      assumpViolationWarn:
        'Note: assumption violation detected. Classic one-way ANOVA is moderately robust to mild violations, but for severe normality violation or large variance differences, consider Welch ANOVA or Kruskal-Wallis nonparametric test.',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Compare means of three or more independent groups.\n' +
        'F-test answers "is at least one group different from the others?" (omnibus effect); if significant, use Tukey HSD to find "which specific pairs differ" (post-hoc).',
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Groups are independent\n' +
        '2. Each population is normally distributed (relaxed by CLT for n ≥ 30)\n' +
        '3. Equal population variances (homogeneity) — if violated, use Welch ANOVA',
      formulasTitle: 'Core formulas',
      formulaSSb: 'SS_between = Σ n_i · (M_i - M̄)²',
      formulaSSw: 'SS_within = Σ_i Σ_j (X_ij - M_i)²',
      formulaF: 'F = (SS_between / df_between) / (SS_within / df_within), df_between = k-1, df_within = N-k',
      formulaEta2: 'η² = SS_between / SS_total',
      formulaOmega2: 'ω² = (SS_between - df_between · MS_within) / (SS_total + MS_within)',
      formulaTukey:
        'Tukey HSD: q_ij = |M_i - M_j| / √(MS_within · (1/n_i + 1/n_j) / 2), ' +
        'p-value from upper tail of studentized range distribution (k, df_within)',
      readingTitle: 'How to read it',
      reading:
        '1. F-test p < .05 → at least one pair differs (omnibus significant), proceed to post-hoc.\n' +
        '2. F-test p ≥ .05 → do not run post-hoc (inflates family-wise error).\n\n' +
        'η² (Cohen, 1988): < 0.06 small, 0.06-0.14 medium, ≥ 0.14 large.\n\n' +
        'ω² is less biased than η², especially with small samples.\n\n' +
        "Tukey HSD already controls the family-wise error rate; all pairwise comparisons share α = .05.",
    },
    apa: {
      sentence:
        'A one-way ANOVA showed a {sigWord} effect of {factor} on {depVar}, F({df1}, {df2}) = {f}, p = {pStr}, η² = {eta2} ({etaInterp} effect). {tukeySection}',
      sentenceNs:
        'A one-way ANOVA showed no significant effect of {factor} on {depVar}, F({df1}, {df2}) = {f}, p = {pStr}, η² = {eta2}.',
      tukeyOpener: 'Tukey HSD post-hoc revealed: ',
      tukeyPairLine:
        '{a} (M = {ma}) and {b} (M = {mb}) differed significantly (mean diff = {diff}, p = {pStr})',
      tukeyNoSig: 'Tukey HSD post-hoc found no pairs significantly different.',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      overall:
        'Overall F-test is {sigWord}: F({df1}, {df2}) = {f}, p = {pStr}.' +
        '\nEffect size η² = {eta2}, indicating a {etaInterp} effect; ω² = {omega2} (unbiased).',
      tukeyOpener: 'Tukey HSD post-hoc results:',
      tukeyPair: '{a} vs {b}: mean diff = {diff}, q = {q}, p = {pStr} → {sigWord}',
      noPosthoc: 'Overall F is not significant; post-hoc not performed.',
      sigYes: 'significant',
      sigNo: 'not significant',
    },
  },
  alpha: {
    title: "Cronbach's α reliability",
    selectVarsTitle: 'Select scale items',
    selectVarsHint:
      'Tick items that belong to the same scale (≥ 3 items recommended; reverse-coded items should be recoded first in Step 4 variable transformation)',
    needAtLeast2: 'Pick at least 2 items',
    summaryTitle: 'Overall reliability',
    itemTitle: 'Item analysis',
    cols: {
      alpha: 'Cronbach α',
      kItems: 'Items',
      n: 'Valid n',
      meanInter: 'Mean inter-item r',
      item: 'Item',
      mean: 'M',
      sd: 'SD',
      itemTotalCorr: 'Corrected item-total r',
      alphaIfDeleted: 'α if deleted',
      interpretation: 'Reading',
    },
    interpretation: {
      excellent: 'Excellent',
      good: 'Good',
      acceptable: 'Acceptable',
      questionable: 'Questionable',
      poor: 'Poor',
      unacceptable: 'Unacceptable',
    },
    droppedNote: '{n} rows dropped (listwise deletion)',
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Assess internal consistency reliability of a scale.\n' +
        'Answers: "Do these items measure the same construct? Does it make sense to sum them into a total score?"\n\n' +
        "Note: α is a measure of homogeneity, not validity. High α means items are internally consistent, not that they really measure what you intend (that's construct validity — needs EFA/CFA/convergent validity).",
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Items measure the same latent construct (unidimensionality) — α is misleading for multidimensional scales\n' +
        '2. Items are conceptually summable (not ordinal-rank, not nominal)\n' +
        '3. Reverse-coded items have been recoded to the same direction\n' +
        '4. Item measurement errors are independent (tau-equivalence; if violated, α is a lower bound)',
      formulasTitle: 'Core formulas',
      formulaAlpha: 'α = (k / (k-1)) · (1 - Σσ²_i / σ²_t)',
      formulaItc:
        'Corrected item-total r_i = Pearson(X_i, Σ_{j≠i} X_j)',
      formulaAlphaDel: 'α if deleted (i) = α recomputed using k - 1 items (excluding X_i)',
      readingTitle: 'How to read it',
      reading:
        'α conventions (DeVellis 2017 / Nunnally 1978):\n' +
        '≥ 0.90 excellent, 0.80-0.89 good, 0.70-0.79 acceptable, 0.60-0.69 questionable, 0.50-0.59 poor, < 0.50 unacceptable.\n\n' +
        'Read corrected item-total r:\n' +
        '- ≥ 0.30: item shares reasonable common content with the scale\n' +
        '- < 0.30: item is weakly related to the rest, consider revision\n' +
        '- Near 0 or negative: possibly forgot reverse-coding, or item measures a different construct\n\n' +
        'Read α-if-deleted:\n' +
        '- α rises noticeably after deletion → that item hurts consistency\n' +
        '- All α-if-deleted are lower than overall → scale structure is sound\n\n' +
        'Note: α tends to rise with k (number of items) due to the k/(k-1) factor. Compare α across scales of similar length.',
    },
    apa: {
      sentence:
        "Internal consistency reliability of the scale was assessed via Cronbach's α. The scale contained {k} items (n = {n}); α = {alpha} ({interp}), mean inter-item correlation = {meanInter}.",
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      summary:
        'The scale has {k} items with {n} valid respondents. Cronbach α = {alpha} ({interp} reliability). ' +
        'Mean inter-item correlation = {meanInter}. {recommendation}',
      recommendExcellent: 'Internal consistency is excellent; the scale can be used as is.',
      recommendGood: 'Internal consistency is good; the scale can be used.',
      recommendAcceptable:
        'Internal consistency is acceptable. Review items with corrected item-total r < 0.30, and consider revising/dropping items where α-if-deleted rises noticeably.',
      recommendLow:
        'Internal consistency is low. Steps to consider: (1) verify all reverse-coded items have been recoded; (2) inspect items with low corrected item-total r; (3) if α remains low, reconsider the construct definition and item wording.',
    },
  },
}
