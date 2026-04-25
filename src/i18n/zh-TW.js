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
}
