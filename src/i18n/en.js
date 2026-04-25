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
    normality: 'Normality tests',
    visualization: 'Visualization',
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
  viz: {
    title: 'Data visualization',
    types: {
      scatter: 'Scatter plot',
      histogram: 'Histogram',
      boxplot: 'Box plot',
      heatmap: 'Correlation heatmap',
    },
    typeHint: {
      scatter: 'Linear relationship between two variables; auto-adds a regression line',
      histogram: 'Frequency distribution of one variable; bins via Freedman-Diaconis',
      boxplot: 'Median, IQR, and outliers; can be grouped by a categorical variable',
      heatmap: 'Pairwise correlation matrix; amber = positive, denim = negative',
    },
    config: {
      typeLabel: 'Chart type',
      xLabel: 'X variable',
      yLabel: 'Y variable',
      pickX: 'Pick X',
      pickY: 'Pick Y',
      groupVar: 'Grouping variable (optional)',
      groupVarHint: 'If a categorical variable is picked, the box plot will be grouped',
      none: 'No grouping',
      multiVarsTitle: 'Select variables',
      multiVarsHint: 'At least 2 (heatmap) or 1 (histogram)',
      needAtLeastOne: 'Pick at least 1 variable',
      needAtLeastTwo: 'Pick at least 2 variables',
      regressionLine: 'Show regression line',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Visualization is the "always-look-first" companion to statistical analysis.\n' +
        '- Scatter: linearity, outliers, non-linear patterns between two variables\n' +
        '- Histogram: distribution shape (normal, skewed, bimodal)\n' +
        '- Box plot: central tendency and spread across groups; quick outlier ID\n' +
        '- Heatmap: spot the correlation structure across many variables at a glance',
      tipsTitle: 'Reading hints',
      tips:
        'Scatter:\n' +
        '- Tighter line → stronger linear correlation\n' +
        '- Diffuse but directional → weak linear correlation\n' +
        '- Curve shape → Pearson r misleading; try Spearman or nonlinear models\n\n' +
        'Histogram:\n' +
        '- Single-peaked symmetric → near normal\n' +
        '- Long right tail → right-skewed (income, reaction time)\n' +
        '- Two peaks → sample may mix two subpopulations\n\n' +
        'Box plot:\n' +
        '- Median offset within the box → skewed\n' +
        '- Asymmetric whiskers → skewed\n' +
        '- Outlier dots → values to inspect\n\n' +
        'Heatmap:\n' +
        '- Darker amber → stronger positive correlation; darker denim → stronger negative\n' +
        '- Diagonal is self-correlation (always = 1)',
    },
  },
  norm: {
    title: 'Normality tests',
    selectVarsTitle: 'Select variables to test',
    selectVarsHint:
      'Tick numeric variables (continuous or ordinal); both Shapiro-Wilk and Kolmogorov-Smirnov are run',
    needAtLeastOne: 'Tick at least one variable',
    cols: {
      variable: 'Variable',
      n: 'n',
      sw_w: 'SW W',
      sw_p: 'SW p',
      ks_d: 'KS D',
      ks_p: 'KS p',
      verdict: 'Verdict',
    },
    verdict: {
      normal: 'Approximately normal',
      nonNormal: 'Non-normal',
      mixed: 'Mixed verdict',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        "Test whether a sample comes from a normal population.\nTypical use: check the normality assumption before running t-tests, ANOVA, or regression; if violated, consider nonparametric alternatives or variable transformation.",
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Independent observations\n2. At least ordinal scale\n3. Both tests have low power for very small n (< 20); pair with Q-Q plot / histogram',
      compareTitle: 'Differences between SW and KS',
      compare:
        'Shapiro-Wilk (W): more sensitive to skewness; usually more powerful at n ≤ 50; works up to n = 5000 (Royston 1992).\n' +
        "Kolmogorov-Smirnov (D, Lilliefors-corrected): sensitive to central deviations; classic KS with sample mean/SD as parameters is overly conservative without correction — Lilliefors correction is auto-applied here.\n\n" +
        'Practical guidance:\n' +
        '- Both non-significant → normality assumption holds\n' +
        '- Only SW significant → skewness issue; try log or Box-Cox transform\n' +
        '- Only KS significant → central deviation (e.g., bimodal); inspect visually\n' +
        '- Very large n (> 300) → both tests become hyper-sensitive to trivial deviations; rely on Q-Q plot + skew/kurt instead',
      formulasTitle: 'Core formulas',
      formulaSW: 'W = (Σa_i · x_(i))² / Σ(x_i − M̄)²',
      formulaKS: 'D = max |F_emp(x) − Φ((x − M̄) / SD)|',
      readingTitle: 'How to read it',
      reading:
        'p < .05 → reject "sample is from a normal population"; p ≥ .05 → cannot reject (does NOT prove normality).\n\n' +
        'Pair with skewness/kurtosis and a Q-Q plot (visual module forthcoming) for robust judgement, not p-values alone.',
    },
    apa: {
      sentence:
        'Normality results — {var}: Shapiro-Wilk W = {w}, p = {pSW}; Kolmogorov-Smirnov (Lilliefors-corrected) D = {d}, p = {pKS} (n = {n}).',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      line: '{var}: {verdict} (SW: W = {w}, p = {pSW}; KS: D = {d}, p = {pKS})',
    },
  },
  np: {
    title: 'Nonparametric tests',
    types: {
      mw: 'Mann-Whitney U (independent 2 groups)',
      wilcoxon: 'Wilcoxon Signed-Rank (paired)',
      kw: 'Kruskal-Wallis (3+ groups)',
    },
    typeHint: {
      mw: 'Two-group rank-sum test; nonparametric counterpart of independent t-test',
      wilcoxon: 'Paired-rank test; nonparametric counterpart of paired t-test',
      kw: 'Three-or-more-group rank ANOVA; nonparametric counterpart of one-way ANOVA',
    },
    config: {
      typeLabel: 'Test type',
      depVar: 'Dependent (continuous or ordinal)',
      groupVar: 'Grouping variable (exactly 2 groups)',
      groupVarKW: 'Grouping variable (≥ 3 groups)',
      var1: 'Variable 1',
      var2: 'Variable 2',
      pickDep: 'Pick a dependent variable',
      pickGroup: 'Pick a grouping variable',
      pickVar1: 'Pick variable 1',
      pickVar2: 'Pick variable 2',
      groupVarBadGroups: 'This variable has {k} groups; needs exactly 2',
      factorBadGroups: 'This factor has {k} groups; needs at least 3',
    },
    result: {
      statsTitle: 'Test statistics',
      groupRanksTitle: 'Group rank sums',
      groupCol: 'Group',
      cols: {
        u: 'U', u1: 'U₁', u2: 'U₂', wpos: 'W⁺', wneg: 'W⁻', t: 'T',
        h: 'H', df: 'df', z: 'z', p: 'p', n: 'n', meanRank: 'Mean rank', sumRank: 'Rank sum',
        eps2: 'ε²', r: 'r (effect size)',
      },
      tieNote: 'Result includes tie correction',
      droppedNote: '{n} pairs with D = 0 dropped',
      effect: { small: 'small', medium: 'medium', large: 'large' },
      kwSigPosthoc:
        "After significant H, run Dunn's test for pairwise comparisons (not yet built; use R::dunn.test or JASP).",
    },
    notes: {
      purposeTitle: 'Purpose',
      purposeMW:
        'Mann-Whitney U (a.k.a. Wilcoxon rank-sum) tests whether two independent groups differ in median location. Use when:\n' +
        '- Samples not normally distributed\n' +
        '- Ordinal data (Likert)\n' +
        '- Small n (< 30) with questionable normality',
      purposeWil:
        'Wilcoxon Signed-Rank tests whether the median paired difference equals zero. Use when:\n' +
        '- Paired t-test differences not normal\n' +
        '- Ordinal pre/post comparisons',
      purposeKW:
        'Kruskal-Wallis H tests whether three or more independent groups differ in location. Use when:\n' +
        '- Groups not normally distributed\n' +
        '- Variances clearly unequal\n' +
        '- Ordinal multi-group comparison',
      assumpTitle: 'Assumptions',
      assumptionsMW:
        '1. Independent groups\n2. Similar shape across groups (for median-shift inference)\n3. At least ordinal scale',
      assumptionsWil: '1. Pairs are independent\n2. Differences are symmetric around the median',
      assumptionsKW:
        '1. Independent groups\n2. Similar shape across groups\n3. At least ordinal scale',
      formulasTitle: 'Core formulas',
      formulaMWU: 'U₁ = R₁ − n₁(n₁+1)/2, U₂ = n₁n₂ − U₁, U = min(U₁, U₂)',
      formulaMWZ: 'z = (U₁ − μ) / σ with tie correction; p = 2(1 − Φ(|z|))',
      formulaWil: 'W⁺ = Σ rank(|D|) where D > 0; T = min(W⁺, W⁻)',
      formulaWilZ:
        'z = (W⁺ − n(n+1)/4) / √((n(n+1)(2n+1) − Σ(t³−t)/2)/24)',
      formulaKW:
        'H = (12/(N(N+1))) Σ(R_i² / n_i) − 3(N+1), tie-corrected by dividing 1 − Σ(t³−t)/(N³−N)',
      formulaKWdf: 'df = k − 1; p from χ²(df) right tail',
      formulaEffMW: 'Effect size r = |z| / √N',
      formulaEffKW: 'Effect size ε² = (H − k + 1) / (N − k)',
      readingTitle: 'How to read it',
      reading:
        '1. p < .05 → reject H₀ (groups differ in location)\n' +
        '2. Effect size r: < 0.1 trivial, < 0.3 small, < 0.5 medium, ≥ 0.5 large\n' +
        "3. After significant KW, run Dunn's pairwise post-hoc\n\n" +
        'When to choose nonparametric over t / ANOVA:\n' +
        '- Small n, suspect normality, outliers, or ordinal scale → nonparametric\n' +
        '- Large n with normality OK → t / ANOVA usually more powerful',
    },
    apa: {
      mw:
        'A Mann-Whitney U test indicated a {sigWord} difference in {depLabel} between {g1Name} and {g2Name}, U = {u}, z = {z}, p = {pStr}, effect size r = {r} ({effect}).',
      wilcoxon:
        'A Wilcoxon signed-rank test indicated a {sigWord} difference between {var1Name} and {var2Name}, T = {t}, z = {z}, p = {pStr}, n = {n} ({nDropped} zero-difference pairs dropped), effect size r = {r} ({effect}).',
      kw:
        'A Kruskal-Wallis H test indicated a {sigWord} effect of {factor} on {depLabel}, H({df}, N = {n}) = {h}, p = {pStr}, ε² = {eps2}.',
      sigYes: 'significant',
      sigNo: 'non-significant',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      mw:
        'Conclusion: {depLabel} differed {sigWord} between {g1Name} (mean rank = {mr1}) and {g2Name} (mean rank = {mr2}); U = {u}, z = {z}, p = {pStr}.' +
        '\nEffect size r = {r} ({effect}).',
      wilcoxon:
        'Conclusion: the difference between {var1Name} and {var2Name} was {sigWord} (W⁺ = {wpos}, W⁻ = {wneg}, T = {t}, z = {z}, p = {pStr}, n = {n}).' +
        '\nEffect size r = {r} ({effect}).',
      kw:
        'Conclusion: the effect of {factor} on {depLabel} was {sigWord} (H({df}, N = {n}) = {h}, p = {pStr}).' +
        '\nε² = {eps2}.',
      kwPosthoc: "Note: after significant H, run Dunn's pairwise post-hoc.",
      sigYes: 'significant',
      sigNo: 'not significant',
    },
  },
  chiSq: {
    title: 'Chi-square test',
    types: {
      independence: 'Test of independence',
      gof: 'Goodness-of-fit',
    },
    typeHint: {
      independence: 'Are two categorical variables independent? (contingency-table analysis)',
      gof: 'Do observed counts of a categorical variable match a theoretical distribution?',
    },
    config: {
      typeLabel: 'Test type',
      rowVar: 'Row variable',
      colVar: 'Column variable',
      gofVar: 'Categorical variable',
      pickRow: 'Pick a row variable',
      pickCol: 'Pick a column variable',
      pickGof: 'Pick a categorical variable',
      bothCategorical: 'Both variables must be categorical',
      varNeedCategorical: 'Must be a categorical variable',
      sameVar: 'Row and column cannot be the same variable',
      expectedProps: 'Expected proportions',
      expectedHint:
        'Default uniform (1/k); enter probabilities that sum to 1 (will be auto-normalized otherwise)',
    },
    result: {
      contingencyTitle: 'Contingency table (observed)',
      expectedTitle: 'Expected counts',
      stdResidualsTitle: 'Standardized residuals',
      statsTitle: 'Test statistics',
      assumpTitle: 'Assumptions',
      assumpExpected: 'Expected counts ≥ 5 ({ok}/{total} cells)',
      assumpExpectedDetail:
        "Cochran's rule: ≥ 80% cells should have expected count ≥ 5; minimum expected = {min}",
      assumpViolatedHint:
        'If violated, consider merging adjacent categories, switching to Fisher exact (2×2 mostly), or larger sample.',
      cols: {
        chi2: 'χ²', df: 'df', p: 'p', n: 'n', cramerV: "Cramer's V",
        category: 'Category', observed: 'Observed O', expected: 'Expected E', residual: 'Std. residual z',
      },
      total: 'Total',
      cramerHint: '|z| ≥ 1.96 corresponds to cell-level two-tailed p < .05',
      effectInterp: {
        trivial: 'trivial',
        small: 'small',
        medium: 'medium',
        large: 'large',
      },
    },
    notes: {
      purposeTitle: 'Purpose',
      purposeIndep:
        'Test whether two categorical variables are independent (unrelated).\nExample: Is gender related to preferred class format?\nH₀: independent / H₁: associated',
      purposeGof:
        'Test whether observed counts of a categorical variable match a theoretical distribution.\nExample: After 600 dice rolls, do face counts match a uniform 1/6?\nH₀: observed = expected / H₁: deviates',
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Independent observations\n' +
        '2. Simple random sample\n' +
        "3. Expected counts ≥ 5 in at least 80% of cells (Cochran's rule)\n" +
        '4. Variables are categorical (not continuous)',
      formulasTitle: 'Core formulas',
      formulaChi2: 'χ² = Σ ((O − E)² / E)',
      formulaIndepE:
        'Independence: E_ij = (row_i total × col_j total) / N, df = (r − 1)(c − 1)',
      formulaGofE: 'Goodness-of-fit: E_i = N · p_i, df = k − 1',
      formulaCramer: "Cramer's V = √(χ² / (N · min(r − 1, c − 1)))",
      formulaResid: 'Standardized residual z_ij = (O_ij − E_ij) / √E_ij',
      readingTitle: 'How to read it',
      reading:
        '1. Look at the overall χ² p-value — are the variables related?\n' +
        "2. Look at Cramer's V — strength of association (< 0.1 trivial, < 0.3 weak, < 0.5 moderate, ≥ 0.5 strong)\n" +
        '3. Look at standardized residuals — which cells deviate most? |z| ≥ 1.96 → cell p < .05\n' +
        '4. Too many cells with expected < 5 (> 20%) → results unreliable; consider merging categories or using Fisher exact (mostly 2×2).',
    },
    apa: {
      indepSig:
        "A chi-square test of independence revealed a significant association between {rowVar} and {colVar}, χ²({df}, N = {n}) = {chi2}, p = {pStr}, Cramer's V = {v} ({effect} effect).",
      indepNs:
        '{rowVar} and {colVar} were not significantly associated in a chi-square test of independence, χ²({df}, N = {n}) = {chi2}, p = {pStr}.',
      gofSig:
        'A chi-square goodness-of-fit test revealed that the observed distribution of {var} differed {sig} from the expected distribution, χ²({df}, N = {n}) = {chi2}, p = {pStr}.',
      gofNs:
        'The observed distribution of {var} did not differ significantly from the expected distribution, χ²({df}, N = {n}) = {chi2}, p = {pStr}.',
      sigYes: 'significantly',
      sigNo: 'not significantly',
      sigYesDiff: 'significantly',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      indepOverall:
        'Overall χ²({df}, N = {n}) = {chi2}, p = {pStr} → {sigWord}.' +
        "\nCramer's V = {v}, indicating a {effect} effect.",
      gofOverall:
        'Overall χ²({df}, N = {n}) = {chi2}, p = {pStr} → {sigWord}.',
      residSection: 'Cells with |z| ≥ 1.96 (notable deviation):',
      residLine: '{cellLabel}: z = {z}{flag}',
      flagHigh: ' notable',
      sigYes: 'significant',
      sigNo: 'not significant',
    },
  },
  multReg: {
    title: 'Multiple linear regression',
    config: {
      yLabel: 'Dependent (Y)',
      xLabel: 'Predictors (multi-select)',
      pickY: 'Pick a dependent variable',
      pickXs: 'Pick at least 1 predictor',
      hint: 'Tick numeric variables as predictors; cannot include Y',
    },
    result: {
      modelTitle: 'Model summary',
      anovaTitle: 'ANOVA (omnibus F-test)',
      coefTitle: 'Coefficients',
      assumpTitle: 'Residual normality',
      cols: {
        r: 'R', r2: 'R²', adjR2: 'Adj. R²', se: 'SE estimate', n: 'n',
        source: 'Source', ss: 'SS', df: 'df', ms: 'MS', f: 'F', p: 'p',
        regression: 'Regression', residual: 'Residual', total: 'Total',
        predictor: 'Predictor', b: 'b', stdErr: 'SE', beta: 'β', t: 't', vif: 'VIF',
        intercept: 'Intercept',
      },
      vifWarn:
        'Note: predictors with VIF > 5 indicate multicollinearity (VIF > 10 considered severe). Consider: dropping highly correlated variables, summing into a composite, or principal-component regression.',
    },
    notes: {
      purposeTitle: 'Purpose',
      purpose:
        'Predict a continuous Y from multiple continuous predictors jointly. Answers:\n(1) Does the overall model significantly predict Y? (F-test)\n(2) After controlling for other variables, does each predictor independently contribute? (per-coefficient t-test)\n(3) How much variance in Y does the model explain? (R² and Adj. R²)\n(4) Which predictor has the largest relative effect? (standardized β)',
      assumpTitle: 'Assumptions',
      assumptions:
        '1. Linear relationship between Y and Xs\n' +
        '2. Independent observations\n' +
        '3. Normally distributed residuals (Shapiro-Wilk auto-checked)\n' +
        '4. Homoscedasticity\n' +
        '5. No severe multicollinearity (VIF auto-computed; warn at > 5)\n' +
        '6. Adequate sample size: n ≥ 10–20 × number of predictors',
      formulasTitle: 'Core formulas',
      formulaBeta: "β = (X'X)⁻¹ X'y",
      formulaSE: "SE(β) = √( MSE · diag((X'X)⁻¹) )",
      formulaF: 'F = (R² / k) / ((1 − R²) / (n − k − 1)), df₁ = k, df₂ = n − k − 1',
      formulaAdjR2: 'Adj. R² = 1 − (1 − R²) · (n − 1) / (n − k − 1)',
      formulaStdBeta: 'Standardized β_i = b_i · SD(X_i) / SD(Y)',
      formulaVIF: 'VIF_i = 1 / (1 − R²_i), where R²_i is from regressing X_i on other predictors',
      readingTitle: 'How to read it',
      reading:
        '1. Look at the omnibus F-test — does the model predict significantly overall?\n' +
        '2. Look at R² and Adj. R² — how much variance is explained? (Report Adj. R² for multiple regression)\n' +
        '3. Look at individual p-values — which predictors remain significant after controlling for others?\n' +
        '4. Compare |standardized β| — which predictor has the largest relative effect?\n' +
        '5. Look at VIF — any multicollinearity? (warn at > 5, severe at > 10)\n' +
        '6. Check residual normality — inferential assumption met?\n\n' +
        'Common pitfalls:\n' +
        '- All individual ts non-significant but overall F significant → multicollinearity\n' +
        '- High R² but no significant coefficients → same as above\n' +
        '- Adding more predictors always raises R² → compare with Adj. R² instead',
    },
    apa: {
      sentence:
        '{predictors} jointly predicted {yLabel} {sigWord} in a multiple linear regression, F({df1}, {df2}) = {f}, p = {pStr}, R² = {r2}, adjusted R² = {adjR2}. {coefList}',
      sentenceNs:
        '{predictors} did not significantly predict {yLabel} in a multiple linear regression, F({df1}, {df2}) = {f}, p = {pStr}, R² = {r2}, adjusted R² = {adjR2}.',
      coefSig:
        '{name} (b = {b}, SE = {se}, β = {beta}, t = {t}, p = {pStr})',
      coefOpener: 'Among the predictors, ',
      copyHint: 'Copy APA narrative',
    },
    interp: {
      header: 'Reading',
      overall:
        'Omnibus model F({df1}, {df2}) = {f}, p = {pStr} → {sigWord}.' +
        ' R² = {r2} (explains {r2Pct}% of variance), Adj. R² = {adjR2}.',
      coefSection: 'Individual predictors:',
      coefLine:
        '{name}: b = {b} (SE = {se}, β = {beta}, t = {t}, p = {pStr}) → {sigWord}',
      vifSection: 'VIF check:',
      vifLine: '{name}: VIF = {vif} {warn}',
      vifWarnHigh: '⚠ warn',
      vifWarnSevere: '⚠ severe',
      sigYes: 'significantly',
      sigNo: 'not significantly',
    },
  },
  history: {
    title: 'Analysis history',
    saveCurrent: 'Pin current analysis to history',
    saveCurrentHint: 'Save the dataset, analysis, variable selection, mode and language together for later comparison',
    needSetup: 'Load a dataset and pick an analysis first',
    empty: 'No history yet',
    listTitle: 'Pinned snapshots (newest first)',
    restoreBtn: 'Restore',
    removeBtn: 'Remove',
    clearAllBtn: 'Clear all',
    clearConfirm: 'Clear all history?',
    timeAgo: {
      seconds: '{n}s ago',
      minutes: '{n}m ago',
      hours: '{n}h ago',
      days: '{n}d ago',
    },
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
    methodLabel: 'Correlation method',
    methods: {
      pearson: 'Pearson r',
      spearman: 'Spearman ρ',
    },
    methodHint: {
      pearson: 'Linear correlation; assumes bivariate normality with continuous variables',
      spearman: 'Rank-based monotonic correlation; no normality assumption, ordinal scales OK',
    },
    selectVarsTitle: 'Select variables for analysis',
    selectVarsHint:
      'Tick at least 2 numeric variables (continuous or ordinal); all pairs computed',
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
      bonferroniTitle: 'Bonferroni post-hoc',
      bonferroniHint: 'p_adj = min(1, p_raw × m), m = {m} (number of comparisons); more conservative but corroborates Tukey when results agree',
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
        t: 't',
        pRaw: 'p (raw)',
        pAdj: 'p (Bonferroni)',
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
