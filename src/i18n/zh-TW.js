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
    ordinal: '順序',
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
    copy: '複製',
    copied: '已複製',
  },
  desc: {
    selectVarsTitle: '選擇要分析的變數',
    selectVarsHint: '勾選下方數值變數（連續或順序），可複選',
    noVarsSelected: '請先勾選至少一個變數',
    cols: {
      variable: '變數',
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
      purposeTitle: '用途',
      purpose:
        '描述每個變數的集中趨勢（M、Median）、離散程度（SD、SE、Min、Max），以及分布形狀（Skew、Kurt）。是任何後續分析前必做的「先認識資料」工作。',
      assumptionsTitle: '前提假設',
      assumptions: '無——敘述統計不涉及推論，沒有假設前提需要檢核。',
      formulasTitle: '核心公式',
      formulaM: 'M = ΣX / n',
      formulaSD: 'SD = √( Σ(X - M)² / (n - 1) )',
      formulaSE: 'SE = SD / √n',
      formulaSkew:
        'Skew = n / [(n-1)(n-2)] · Σ((X - M) / SD)³（Fisher–Pearson type 2，與 SPSS 一致）',
      formulaKurt:
        'Kurt = n(n+1) / [(n-1)(n-2)(n-3)] · Σ((X - M) / SD)⁴ - 3(n-1)² / [(n-2)(n-3)]（excess kurtosis）',
      readingTitle: '怎麼讀',
      reading:
        '偏度（Skew）：>0 右偏（長尾在右）、<0 左偏（長尾在左）、≈0 對稱。' +
        '經驗法則 |Skew| < 1 視為近似對稱。' +
        '\n\n峰度（Kurt）：>0 高瘦（leptokurtic）、<0 平緩（platykurtic）、≈0 接近常態。' +
        '經驗法則 |Kurt| < 1 視為接近常態。',
    },
    apa: {
      // 占位符：{label} 變數標籤 / {n} / {m} / {sd} / {min} / {max} / {median} / {skew} / {kurt}
      sentence:
        '{label}（M = {m}, SD = {sd}, N = {n}, 全距 {min}–{max}, Median = {median}），偏度 = {skew}，峰度 = {kurt}。',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      // 教學模式的白話解讀（每個變數一段）
      // {label} {m} {sd} {n} {minMaxRange} {skewWord} {kurtWord}
      sentence:
        '{label} 共有 {n} 筆有效值，平均為 {m}，標準差 {sd}，範圍 {minMaxRange}。分布形狀為「{skewWord}」、「{kurtWord}」。',
      skewLeft: '左偏',
      skewRight: '右偏',
      skewSymmetric: '近似對稱',
      kurtHigh: '高瘦於常態',
      kurtLow: '平緩於常態',
      kurtNormal: '接近常態',
    },
  },
  ttest: {
    types: {
      independent: '獨立樣本',
      paired: '配對樣本',
      oneSample: '單一樣本',
    },
    typeHint: {
      independent: 'Welch 修正版本（不假設兩組變異數相等）',
      paired: '同一受試者的兩個變數（如前測、後測）',
      oneSample: '與一個指定值（μ₀）比較',
    },
    config: {
      typeLabel: 't 檢定型別',
      depVar: '依變項',
      groupVar: '分組變項',
      groupVarHint: '需為類別變項且剛好兩組',
      groupVarBadGroups: '此變項有 {k} 組，需要剛好 2 組',
      var1: '變項 1',
      var2: '變項 2',
      mu0: '比較值 μ₀',
      pickDep: '請選依變項',
      pickGroup: '請選分組變項',
      pickVar1: '請選變項 1',
      pickVar2: '請選變項 2',
      enterMu0: '請輸入比較值',
    },
    result: {
      groupStatsTitle: '各組敘述統計',
      groupCol: '組別',
      ttestTitle: 't 檢定結果',
      pairedDescTitle: '配對差敘述統計',
      oneSampleDescTitle: '樣本敘述統計',
      cols: {
        t: 't',
        df: 'df',
        p: 'p',
        meanDiff: '平均數差',
        se: 'SE',
        d: "Cohen's d",
        effect: '效果量',
      },
      assumpTitle: '假設前提檢核',
      normality: 'Shapiro-Wilk 常態性',
      homogeneity: "Levene's 等變異數",
      assumpOk: '通過（p ≥ .05）',
      assumpViolated: '違反（p < .05）',
      assumpViolationWarn:
        '注意：偵測到前提違反。獨立樣本 t 已預設使用 Welch 修正，對等變異數違反具穩健性；若常態性嚴重違反且樣本數小（n < 30），考慮改用無母數檢定（Mann-Whitney U / Wilcoxon）。',
    },
    effectSize: {
      trivial: '微小',
      small: '小',
      medium: '中等',
      large: '大',
    },
    notes: {
      purposeTitle: '用途',
      independentPurpose: '比較兩個獨立組別的平均數是否有差異（如：實驗組 vs 控制組）。',
      pairedPurpose: '比較同一組受試者在兩個時點 / 條件下的差異（如：前測 vs 後測）。',
      oneSamplePurpose: '比較一組樣本的平均數與一個已知母體值（μ₀）是否有差異。',
      assumpTitle: '前提假設',
      independentAssump:
        '1. 兩組獨立\n2. 兩組母體呈常態分布（n ≥ 30 時可由中央極限定理放寬）\n3. 兩組母體變異數相等 — 若違反，使用 Welch 修正（本工具預設即是）',
      pairedAssump: '1. 配對差呈常態分布\n2. 配對之間獨立',
      oneSampleAssump: '1. 樣本來自常態分布母體\n2. 觀察值之間獨立',
      formulasTitle: '核心公式',
      formulaIndepT: 't = (M₁ - M₂) / √(s₁²/n₁ + s₂²/n₂)',
      formulaIndepDf:
        'df = (s₁²/n₁ + s₂²/n₂)² / [ (s₁²/n₁)²/(n₁-1) + (s₂²/n₂)²/(n₂-1) ]（Welch–Satterthwaite）',
      formulaPairedT: 't = M_D / (SD_D / √n)，其中 D = X₁ - X₂',
      formulaOneT: 't = (M - μ₀) / (SD / √n)',
      formulaCohenIndep:
        "Cohen's d = (M₁ - M₂) / s_pooled，s_pooled = √[((n₁-1)s₁² + (n₂-1)s₂²) / (n₁+n₂-2)]",
      formulaCohenPaired: "Cohen's d = M_D / SD_D",
      formulaCohenOne: "Cohen's d = (M - μ₀) / SD",
      readingTitle: '怎麼讀',
      reading:
        'p < .05：兩個平均數差異達顯著（拒絕 H₀）。\n\n' +
        "Cohen's d 解讀：" +
        '|d| < 0.2 微小、0.2-0.5 小、0.5-0.8 中等、> 0.8 大效果量。\n\n' +
        '統計顯著 ≠ 實質重要。樣本越大越容易達到統計顯著，但效果量小可能無實務意義。建議同時看 p 與 d。',
    },
    apa: {
      independent:
        '獨立樣本 t 檢定結果顯示，{g1Name}（M = {m1}, SD = {sd1}, n = {n1}）與{g2Name}（M = {m2}, SD = {sd2}, n = {n2}）之間{sigWord}差異，t({df}) = {t}, p = {pStr}，Cohen\'s d = {d}（{effectWord}效果量）。',
      paired:
        '配對樣本 t 檢定結果顯示，{var1Name}（M = {m1}, SD = {sd1}）與{var2Name}（M = {m2}, SD = {sd2}）之間{sigWord}差異，配對差平均 {meanDiff}（SD = {sdDiff}），t({df}) = {t}, p = {pStr}，Cohen\'s d = {d}（{effectWord}效果量）。',
      oneSample:
        '單一樣本 t 檢定結果顯示，樣本平均（M = {m}, SD = {sd}, n = {n}）與比較值 μ₀ = {mu0} 之間{sigWord}差異，t({df}) = {t}, p = {pStr}，Cohen\'s d = {d}（{effectWord}效果量）。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      // 白話教學解讀
      independent:
        '結論：{g1Name}（M = {m1}）與{g2Name}（M = {m2}）的平均數差異{sigWord}（t = {t}, p = {pStr}）。' +
        ' Cohen\'s d = {d}，屬於{effectWord}效果量。{practical}',
      paired:
        '結論：{var1Name}（M = {m1}）與{var2Name}（M = {m2}）之間的配對差異{sigWord}（t = {t}, p = {pStr}）。' +
        ' Cohen\'s d = {d}，屬於{effectWord}效果量。{practical}',
      oneSample:
        '結論：樣本平均（M = {m}）與比較值 μ₀ = {mu0} 之間的差異{sigWord}（t = {t}, p = {pStr}）。' +
        " Cohen's d = {d}，屬於{effectWord}效果量。{practical}",
      practicalSig: '差異有統計意義；效果量可作為實務判斷的參考。',
      practicalNs: '尚不能拒絕「兩者沒有差異」的虛無假設；可能是真的沒差，或樣本太小檢定力不足。',
    },
  },
  corr: {
    title: '相關矩陣',
    selectVarsTitle: '選擇要分析的變數',
    selectVarsHint: '至少勾選 2 個數值變數（連續或順序）；會計算所有兩兩配對的 Pearson r',
    needAtLeastTwo: '請勾選至少 2 個變數',
    cellHint: '上三角顯示 r，下三角顯示 p。* p < .05、** p < .01、*** p < .001',
    notes: {
      purposeTitle: '用途',
      purpose:
        '描述兩個連續／順序變數之間「線性關聯的方向與強度」。\n正相關（r > 0）：兩變數同向變動。\n負相關（r < 0）：兩變數反向變動。\nr ≈ 0：無線性關聯（可能仍有非線性關係）。',
      assumpTitle: '前提假設',
      assumptions:
        '1. 兩變數均為連續變項（順序量表 ≥ 5 階亦可使用）\n2. 兩變數呈雙變量常態分布（n ≥ 30 時可由中央極限定理放寬）\n3. 兩變數呈線性關係 — 散佈圖明顯曲線時不應使用 Pearson r\n4. 觀察值之間獨立\n5. 同質變異（homoscedasticity）— 殘差散佈不應隨 X 改變',
      formulasTitle: '核心公式',
      formulaR: 'r = Σ((Xi - Mx)(Yi - My)) / √(Σ(Xi - Mx)² · Σ(Yi - My)²)',
      formulaT: 't = r √(n - 2) / √(1 - r²)，df = n - 2',
      readingTitle: '怎麼讀',
      reading:
        '|r| 強度建議（Cohen, 1988）：< 0.1 微弱、0.1-0.3 弱、0.3-0.5 中等、> 0.5 強。\n\n' +
        'r² 表示 X 與 Y 共享變異的比例（決定係數）。例：r = 0.5 → r² = 0.25 → X 解釋 Y 的 25% 變異。\n\n' +
        '相關 ≠ 因果。即使達顯著，也不能推論方向與因果。',
    },
    apa: {
      // 顯著的配對列出，無顯著時用 noSig 段落
      pairLine: '{labelA} 與 {labelB} 之間呈{strengthWord}{directionWord}相關（r = {r}, p = {pStr}, n = {n}）。',
      noSig: '本資料中無達顯著的相關配對（α = .05）。',
      copyHint: '一鍵複製 APA 敘述',
      strengthWord: { weak: '弱', moderate: '中等', strong: '強' },
      directionWord: { positive: '正', negative: '負' },
    },
    interp: {
      header: '解讀',
      // 教學模式：列出每個達顯著的配對
      pairLine: '{labelA} ↔ {labelB}：r = {r} → {strengthWord}{directionWord}相關，p = {pStr} → {sigWord}',
      noSig: '所有變數兩兩之間在 α = .05 下都未達顯著。可能是真的無關，或樣本太小檢定力不足。',
      sigYes: '顯著',
      sigNo: '不顯著',
    },
  },
  simpleReg: {
    title: '簡單線性迴歸',
    config: {
      yLabel: '依變項 Y',
      xLabel: '預測變項 X',
      pickY: '請選依變項',
      pickX: '請選預測變項',
      sameVar: 'X 與 Y 不可為同一變項',
    },
    result: {
      modelTitle: '模型摘要',
      anovaTitle: 'ANOVA 表',
      coefTitle: '係數表',
      cols: {
        r: 'r', r2: 'R²', adjR2: 'Adj. R²', se: 'SE 估計值',
        source: '變異來源', ss: 'SS', df: 'df', ms: 'MS', f: 'F', p: 'p',
        regression: '迴歸模型', residual: '殘差', total: '總和',
        predictor: '預測項', b: 'b', stdErr: 'SE', beta: 'β', t: 't',
        intercept: '常數項', slope: '斜率',
      },
      assumpTitle: '殘差常態性',
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '用一個連續預測變項 X 預測連續依變項 Y。回答的問題是：\n（1）X 是否能顯著預測 Y？（F 檢定 / b₁ 的 t 檢定）\n（2）X 解釋了 Y 的多少變異？（R²）\n（3）X 每增加 1 單位，Y 平均改變多少？（斜率 b₁）',
      assumpTitle: '前提假設',
      assumptions:
        '1. 線性關係：X 與 Y 之間為線性關係（散佈圖檢視）\n2. 觀察值獨立\n3. 殘差呈常態分布（Shapiro-Wilk 自動檢核）\n4. 同質變異：殘差變異不隨 X 改變（待 PR-3c.5 加 Breusch-Pagan）',
      formulasTitle: '核心公式',
      formulaB1: 'b₁ = Σ((Xi - Mx)(Yi - My)) / Σ(Xi - Mx)²',
      formulaB0: 'b₀ = My - b₁ · Mx',
      formulaR2: 'R² = SS_迴歸 / SS_總和 = 1 - SS_殘差 / SS_總和',
      formulaAdjR2: 'Adj. R² = 1 - (1 - R²)(n - 1)/(n - k - 1)（k 為預測變項數，此處 k = 1）',
      formulaF: 'F = MS_迴歸 / MS_殘差，df₁ = 1, df₂ = n - 2',
      formulaBeta: '標準化 β = b₁ · SD(X) / SD(Y)（簡單迴歸下 = r）',
      readingTitle: '怎麼讀',
      reading:
        '迴歸方程式：Ŷ = b₀ + b₁ · X\n\n' +
        '解讀步驟：\n' +
        '1. 看 F 與其 p — 是否整體模型顯著？\n' +
        '2. 看 R² — 模型解釋了 Y 的多少變異？（簡單迴歸下 R² = r²）\n' +
        '3. 看 b₁ 的方向與大小 — X 增加 1 單位，Y 平均如何變動？\n' +
        '4. 看標準化 β — 與其他模型比較預測強度時用。',
    },
    apa: {
      sentence:
        '簡單線性迴歸結果顯示，{xLabel} 顯著預測 {yLabel}（F({df1}, {df2}) = {f}, p = {pStr}），R² = {r2}，調整後 R² = {adjR2}。迴歸方程式為 {yLabel} = {b0} + {b1} × {xLabel}（β = {beta}, t({df2}) = {t}, p = {pStrSlope}）。',
      sentenceNs:
        '簡單線性迴歸結果顯示，{xLabel} 對 {yLabel} 之預測未達顯著（F({df1}, {df2}) = {f}, p = {pStr}），R² = {r2}，調整後 R² = {adjR2}。',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      sentence:
        '結論：{xLabel} 對 {yLabel} 的預測{sigWord}（F = {f}, p = {pStr}）。模型解釋了 {r2Pct}% 的變異（R² = {r2}）。' +
        '預測方程式為 Ŷ = {b0} + {b1} × X — X 每增加 1 單位，Y 平均改變 {b1} 單位。' +
        ' 標準化係數 β = {beta}，效果量{strengthWord}。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
      strengthWeak: '較弱',
      strengthModerate: '中等',
      strengthStrong: '較強',
    },
  },
  anova: {
    title: '單因子變異數分析',
    config: {
      depVar: '依變項',
      factor: '因子（分組變項）',
      pickDep: '請選依變項',
      pickFactor: '請選因子',
      factorHint: '需為類別變項且至少 3 組',
      factorBadGroups: '此變項有 {k} 組，需要至少 3 組',
    },
    result: {
      groupStatsTitle: '各組敘述統計',
      anovaTitle: 'ANOVA 表',
      effectSizeTitle: '效果量',
      tukeyTitle: 'Tukey HSD 事後比較',
      assumpTitle: '假設前提檢核',
      groupCol: '組別',
      cols: {
        source: '變異來源',
        ss: 'SS',
        df: 'df',
        ms: 'MS',
        f: 'F',
        p: 'p',
        between: '組間',
        within: '組內',
        total: '總和',
        eta2: 'η²',
        omega2: 'ω²',
        pair: '比較',
        meanDiff: '平均差',
        se: 'SE',
        q: 'q',
      },
      effectInterp: {
        eta2Label: 'η²（樣本內效果量）：',
        omega2Label: 'ω²（無偏估計）：',
        small: '小',
        medium: '中',
        large: '大',
        // Cohen 慣例：η² < 0.06 小、< 0.14 中、≥ 0.14 大
      },
      assumpViolationWarn:
        '注意：偵測到前提違反。傳統單因子 ANOVA 對中度違反具一定穩健性，但若常態性嚴重違反或變異數差距大，考慮改用 Welch ANOVA 或 Kruskal-Wallis 無母數檢定。',
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '比較三組（含）以上獨立樣本的平均數是否有差異。\n' +
        'F 檢定回答「至少有一組與其他組不同嗎？」（整體效果）；達顯著後再用 Tukey HSD 找出「具體是哪幾對組別不同」（事後比較）。',
      assumpTitle: '前提假設',
      assumptions:
        '1. 各組獨立\n' +
        '2. 各組母體呈常態分布（n ≥ 30 時可由中央極限定理放寬）\n' +
        '3. 各組母體變異數相等（homogeneity of variance）— 違反時改用 Welch ANOVA',
      formulasTitle: '核心公式',
      formulaSSb: 'SS_組間 = Σ n_i · (M_i - M̄)²',
      formulaSSw: 'SS_組內 = Σ_i Σ_j (X_ij - M_i)²',
      formulaF: 'F = (SS_組間 / df_組間) / (SS_組內 / df_組內)，df_組間 = k-1，df_組內 = N-k',
      formulaEta2: 'η² = SS_組間 / SS_總和',
      formulaOmega2: 'ω² = (SS_組間 - df_組間 · MS_組內) / (SS_總和 + MS_組內)',
      formulaTukey:
        'Tukey HSD：q_ij = |M_i - M_j| / √(MS_組內 · (1/n_i + 1/n_j) / 2)，' +
        'p 值用 studentized range 分布（k, df_組內）右尾',
      readingTitle: '怎麼讀',
      reading:
        '1. F 檢定 p < .05 → 至少一對組別不同（整體效果顯著），可進事後比較。\n' +
        '2. F 檢定 p ≥ .05 → 不可進事後比較（族系錯誤率失控）。\n\n' +
        'η² 解讀（Cohen, 1988）：< 0.06 小、0.06-0.14 中、≥ 0.14 大。\n\n' +
        'ω² 較 η² 無偏，特別是小樣本時建議報告。\n\n' +
        'Tukey HSD 已自動控制族系錯誤率（family-wise error），所有兩兩比較共用 α = .05。',
    },
    apa: {
      sentence:
        '單因子變異數分析結果顯示，{factor}對{depVar}的影響{sigWord}，F({df1}, {df2}) = {f}, p = {pStr}，η² = {eta2}（{etaInterp}效果量）。' +
        '{tukeySection}',
      sentenceNs:
        '單因子變異數分析結果顯示，{factor}對{depVar}的影響{sigWord}，F({df1}, {df2}) = {f}, p = {pStr}，η² = {eta2}。',
      tukeyOpener: 'Tukey HSD 事後比較顯示：',
      tukeyPairLine: '{a}（M = {ma}）與{b}（M = {mb}）之間達顯著差異（平均差 = {diff}, p = {pStr}）',
      tukeyNoSig: 'Tukey HSD 事後比較中，無任何兩組達顯著差異。',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      overall:
        '整體 F 檢定 {sigWord}：F({df1}, {df2}) = {f}, p = {pStr}。' +
        '\n效果量 η² = {eta2}，屬於{etaInterp}效果量；ω² = {omega2}（無偏估計）。',
      tukeyOpener: 'Tukey HSD 事後比較結果：',
      tukeyPair: '{a} vs {b}：平均差 = {diff}，q = {q}，p = {pStr} → {sigWord}',
      noPosthoc: '整體 F 不顯著，不進行事後比較。',
      sigYes: '顯著',
      sigNo: '不顯著',
    },
  },
}
