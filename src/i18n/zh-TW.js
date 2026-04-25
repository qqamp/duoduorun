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
    uploadHint: '支援 .csv / .xlsx / .xls；資料只在你的瀏覽器解析，不會上傳到伺服器',
    uploadingFile: '解析中…',
    uploadSuccess: '已載入 {n} 筆 × {k} 欄',
    uploadError: '上傳失敗：{msg}',
    uploadedLabel: '已上傳：{name}',
    uploadedGroupLabel: '使用者上傳',
    demoGroupLabel: '示範資料集',
    unsupportedFormat: '不支援的檔案格式：.{ext}（只支援 csv / xlsx / xls）',
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
    normality: '常態性檢定',
    visualization: '資料視覺化',
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
    transformed: '轉換',
    addTransform: '新增轉換',
    transformsTitle: '已建立的轉換',
    noTransforms: '尚未建立任何轉換',
  },
  viz: {
    title: '資料視覺化',
    types: {
      scatter: '散佈圖',
      histogram: '直方圖',
      boxplot: '盒鬚圖',
      heatmap: '相關矩陣熱圖',
    },
    typeHint: {
      scatter: '兩變數的線性關係，可選 X 與 Y；自動加上迴歸線',
      histogram: '單變數的次數分布；用 Freedman-Diaconis 規則自動分箱',
      boxplot: '單變數的中位數、四分位距與離群值；可分組',
      heatmap: '多變數兩兩相關矩陣，正相關 amber、負相關 denim',
    },
    config: {
      typeLabel: '圖型',
      xLabel: 'X 變數',
      yLabel: 'Y 變數',
      pickX: '請選 X',
      pickY: '請選 Y',
      groupVar: '分組變項（可選）',
      groupVarHint: '若選定類別變項，盒鬚圖會分組顯示',
      none: '不分組',
      multiVarsTitle: '選擇變數',
      multiVarsHint: '至少 2 個（熱圖）或 1 個（直方圖）',
      needAtLeastOne: '請選擇至少 1 個變數',
      needAtLeastTwo: '請選擇至少 2 個變數',
      regressionLine: '加上迴歸線',
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '視覺化是統計分析的「先看一眼」工具。\n' +
        '- 散佈圖：判斷兩變數是否線性、是否有離群值、是否有非線性關係\n' +
        '- 直方圖：判斷分布形狀（是否常態、偏態、雙峰）\n' +
        '- 盒鬚圖：比較多組的中央趨勢與離散；快速辨識離群值\n' +
        '- 熱圖：在多變數情境一眼看出相關結構',
      tipsTitle: '解讀提示',
      tips:
        '散佈圖：\n' +
        '- 點分布越接近一條直線 → 線性相關越強\n' +
        '- 點散得開但有方向感 → 弱線性相關\n' +
        '- 曲線形狀 → Pearson r 不適用，考慮 Spearman 或非線性模型\n\n' +
        '直方圖：\n' +
        '- 對稱單峰 → 接近常態\n' +
        '- 右尾長 → 右偏（如收入、反應時間）\n' +
        '- 雙峰 → 樣本可能混合兩個族群\n\n' +
        '盒鬚圖：\n' +
        '- 中位線在盒中位置偏離 → 偏態\n' +
        '- 鬚位不對稱 → 偏態\n' +
        '- 離群點散佈 → 極端值需檢視\n\n' +
        '熱圖：\n' +
        '- amber 越深 → 正相關越強；denim 越深 → 負相關越強\n' +
        '- 對角線是自相關（永遠 = 1）',
    },
  },
  norm: {
    title: '常態性檢定',
    selectVarsTitle: '選擇要檢定的變數',
    selectVarsHint: '勾選下方數值變數（連續或順序），會同時跑 Shapiro-Wilk 與 Kolmogorov-Smirnov',
    needAtLeastOne: '請至少勾選一個變數',
    cols: {
      variable: '變數',
      n: 'n',
      sw_w: 'SW W',
      sw_p: 'SW p',
      ks_d: 'KS D',
      ks_p: 'KS p',
      verdict: '判讀',
    },
    verdict: {
      normal: '近似常態',
      nonNormal: '違反常態',
      mixed: '結果不一致',
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '檢定樣本是否來自常態分布母體。\n常見用途：在執行 t 檢定／ANOVA／迴歸前，檢核「殘差或變數呈常態」的前提；違反時考慮無母數替代或變數轉換。',
      assumpTitle: '前提',
      assumptions:
        '1. 觀察值獨立\n2. 至少順序測量尺度\n3. 兩種檢定都對極小樣本（n < 20）檢定力不足，建議搭配 Q-Q 圖／直方圖視覺判讀',
      compareTitle: '兩種檢定的差別',
      compare:
        'Shapiro-Wilk（W）：對偏度敏感，n ≤ 50 一般檢定力較強；可至 n = 5000（Royston 1992）。\n' +
        'Kolmogorov-Smirnov（D，Lilliefors 修正）：對中央偏離敏感，傳統 KS 用樣本平均/SD 當參數須做 Lilliefors 修正才不過於保守，本工具已自動修正。\n\n' +
        '實務建議：\n' +
        '- 兩個都跑、都不顯著 → 常態假設站得住\n' +
        '- 只有 SW 顯著 → 偏度問題；考慮取對數或 Box-Cox\n' +
        '- 只有 KS 顯著 → 中央偏離（如雙峰）；視覺檢視\n' +
        '- n 很大 (> 300) → 兩個檢定都會「過於敏感」對輕微偏離也顯著，此時應該以 Q-Q 圖與偏峰度為主要判讀依據',
      formulasTitle: '核心公式',
      formulaSW: 'W = (Σa_i · x_(i))² / Σ(x_i − M̄)²',
      formulaKS: 'D = max |F_emp(x) − Φ((x − M̄) / SD)|',
      readingTitle: '怎麼讀',
      reading:
        'p < .05 → 拒絕「樣本來自常態母體」；p ≥ .05 → 不能拒絕（不等於「證明常態」）。\n\n' +
        '搭配偏度／峰度與 Q-Q 圖（待視覺化模組上線）一起判讀，比僅看 p 值穩健。',
    },
    apa: {
      sentence:
        '常態性檢定結果 — {var}：Shapiro-Wilk W = {w}, p = {pSW}；Kolmogorov-Smirnov（Lilliefors 修正）D = {d}, p = {pKS}（n = {n}）。',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      line: '{var}：{verdict}（SW: W = {w}, p = {pSW}；KS: D = {d}, p = {pKS}）',
    },
  },
  np: {
    title: '無母數檢定',
    types: {
      mw: 'Mann-Whitney U（獨立兩組）',
      wilcoxon: 'Wilcoxon Signed-Rank（配對）',
      kw: 'Kruskal-Wallis（三組以上）',
    },
    typeHint: {
      mw: '兩組獨立樣本秩和檢定；對應 t 檢定，但不要求常態',
      wilcoxon: '配對樣本秩和檢定；對應配對 t 檢定，但不要求差值常態',
      kw: '三組以上獨立樣本秩和 ANOVA；對應單因子 ANOVA，但不要求常態',
    },
    config: {
      typeLabel: '檢定型別',
      depVar: '依變項（連續或順序）',
      groupVar: '分組變項（剛好 2 組）',
      groupVarKW: '分組變項（≥ 3 組）',
      var1: '變項 1',
      var2: '變項 2',
      pickDep: '請選依變項',
      pickGroup: '請選分組變項',
      pickVar1: '請選變項 1',
      pickVar2: '請選變項 2',
      groupVarBadGroups: '此變項有 {k} 組，需要剛好 2 組',
      factorBadGroups: '此變項有 {k} 組，需要至少 3 組',
    },
    result: {
      statsTitle: '檢定統計量',
      groupRanksTitle: '各組秩和',
      groupCol: '組別',
      cols: {
        u: 'U', u1: 'U₁', u2: 'U₂', wpos: 'W⁺', wneg: 'W⁻', t: 'T',
        h: 'H', df: 'df', z: 'z', p: 'p', n: 'n', meanRank: '平均秩', sumRank: '秩和',
        eps2: 'ε²', r: 'r（效果量）',
      },
      tieNote: '結果含並列校正',
      droppedNote: '已剔除 {n} 對 D = 0',
      effect: {
        small: '小', medium: '中', large: '大',
      },
      kwSigPosthoc:
        '整體 H 顯著時，建議用 Dunn 檢定做事後兩兩比較（本工具未內建，可在 R::dunn.test 或 JASP 跑）',
    },
    notes: {
      purposeTitle: '用途',
      purposeMW:
        'Mann-Whitney U（亦稱 Wilcoxon rank-sum）檢定兩組獨立樣本的中位數位置是否不同。\n適用情境：' +
        '\n- 樣本不呈常態分布' +
        '\n- 順序量表資料（Likert）' +
        '\n- 樣本量小（n < 30）且常態性可疑',
      purposeWil:
        'Wilcoxon Signed-Rank 檢定兩個配對樣本的差值中位數是否為零。\n適用情境：' +
        '\n- 配對 t 檢定的差值不呈常態' +
        '\n- 順序量表的前後測比較',
      purposeKW:
        'Kruskal-Wallis H 檢定三組以上獨立樣本的位置參數是否不同。\n適用情境：' +
        '\n- 各組不呈常態分布' +
        '\n- 各組變異數明顯不等' +
        '\n- 順序量表的多組比較',
      assumpTitle: '前提假設',
      assumptionsMW:
        '1. 兩組獨立\n2. 兩組分布形狀類似（檢定中位數差異需此）\n3. 至少順序測量尺度',
      assumptionsWil: '1. 配對之間獨立\n2. 差值的分布對稱（檢定中位數差異需此）',
      assumptionsKW:
        '1. 各組獨立\n2. 各組分布形狀類似（檢定中位數差異需此）\n3. 至少順序測量尺度',
      formulasTitle: '核心公式',
      formulaMWU: 'U₁ = R₁ − n₁(n₁+1)/2，U₂ = n₁n₂ − U₁，U = min(U₁, U₂)',
      formulaMWZ: 'z = (U₁ − μ) / σ，含並列校正；p = 2(1 − Φ(|z|))',
      formulaWil: 'W⁺ = Σ rank(|D|) where D > 0；T = min(W⁺, W⁻)',
      formulaWilZ:
        'z = (W⁺ − n(n+1)/4) / √((n(n+1)(2n+1) − Σ(t³−t)/2)/24)',
      formulaKW:
        'H = (12/(N(N+1))) Σ(R_i² / n_i) − 3(N+1)，並列校正後 / (1 − Σ(t³−t)/(N³−N))',
      formulaKWdf: 'df = k − 1；p 從 χ²(df) 右尾',
      formulaEffMW: '效果量 r = |z| / √N',
      formulaEffKW: '效果量 ε² = (H − k + 1) / (N − k)',
      readingTitle: '怎麼讀',
      reading:
        '1. p < .05 → 拒絕 H₀（兩組／多組分布位置相同）\n' +
        '2. 效果量 r：< 0.1 微弱、< 0.3 小、< 0.5 中、≥ 0.5 大\n' +
        '3. KW 顯著後建議跑 Dunn 兩兩事後比較\n\n' +
        '與 t / ANOVA 的選用：\n' +
        '- 樣本量小、常態性可疑、有極端值或順序量表 → 無母數\n' +
        '- 樣本量大且常態性 OK → t / ANOVA 通常更具檢定力',
    },
    apa: {
      mw:
        'Mann-Whitney U 檢定結果顯示，{g1Name} 與 {g2Name} 之間的{depLabel}{sigWord}差異，U = {u}, z = {z}, p = {pStr}，效果量 r = {r}（{effect}）。',
      wilcoxon:
        'Wilcoxon Signed-Rank 檢定結果顯示，{var1Name} 與 {var2Name} 之間{sigWord}差異，T = {t}, z = {z}, p = {pStr}, n = {n}（剔除 {nDropped} 對 D = 0），效果量 r = {r}（{effect}）。',
      kw:
        'Kruskal-Wallis H 檢定結果顯示，{factor} 對 {depLabel} 的影響{sigWord}，H({df}, N = {n}) = {h}, p = {pStr}，ε² = {eps2}。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      mw:
        '結論：{g1Name}（平均秩 = {mr1}）與 {g2Name}（平均秩 = {mr2}）的{depLabel}{sigWord}差異（U = {u}, z = {z}, p = {pStr}）。' +
        '\n效果量 r = {r}，屬於{effect}效果量。',
      wilcoxon:
        '結論：{var1Name} 與 {var2Name} 之間的差異{sigWord}（W⁺ = {wpos}, W⁻ = {wneg}, T = {t}, z = {z}, p = {pStr}, n = {n}）。' +
        '\n效果量 r = {r}，屬於{effect}效果量。',
      kw:
        '結論：{factor} 對 {depLabel} 的影響{sigWord}（H({df}, N = {n}) = {h}, p = {pStr}）。' +
        '\nε² = {eps2}。',
      kwPosthoc: '注意：H 顯著後，建議跑 Dunn 兩兩事後比較。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
    },
  },
  chiSq: {
    title: '卡方檢定',
    types: {
      independence: '獨立性檢定',
      gof: '適合度檢定',
    },
    typeHint: {
      independence: '兩個類別變數之間是否獨立（列聯表分析）',
      gof: '一個類別變數的觀察次數是否符合給定的理論分布',
    },
    config: {
      typeLabel: '檢定型別',
      rowVar: '列變數',
      colVar: '欄變數',
      gofVar: '類別變數',
      pickRow: '請選列變數',
      pickCol: '請選欄變數',
      pickGof: '請選類別變數',
      bothCategorical: '兩個變數均需為類別型',
      varNeedCategorical: '需為類別型變數',
      sameVar: '列與欄不可為同一變數',
      expectedProps: '理論機率',
      expectedHint: '預設為均勻（1/k）；可手動填入總和為 1 的機率（不為 1 會自動正規化）',
    },
    result: {
      contingencyTitle: '列聯表（觀察次數）',
      expectedTitle: '期望次數',
      stdResidualsTitle: '標準化殘差',
      statsTitle: '檢定統計量',
      assumpTitle: '假設前提',
      assumpExpected: '期望次數 ≥ 5（{ok}/{total} cells）',
      assumpExpectedDetail: 'Cochran 規則：≥ 80% cells 期望次數 ≥ 5；最小期望次數 = {min}',
      assumpViolatedHint: '若違反，考慮合併相近類別、改用 Fisher exact、或樣本量擴大',
      cols: {
        chi2: 'χ²', df: 'df', p: 'p', n: 'n', cramerV: "Cramer's V",
        category: '類別', observed: '觀察 O', expected: '期望 E', residual: '標準化殘差 z',
      },
      total: '總和',
      cramerHint: '|z| ≥ 1.96 對應該 cell p < .05（雙尾）',
      effectInterp: {
        trivial: '微弱',
        small: '小',
        medium: '中',
        large: '大',
      },
    },
    notes: {
      purposeTitle: '用途',
      purposeIndep:
        '檢定兩個類別變數是否獨立（無相關）。\n例：性別與偏好上課形式之間有沒有關聯？\nH₀：兩變數獨立 / H₁：兩變數相關',
      purposeGof:
        '檢定一個類別變數的觀察次數是否符合給定的理論分布。\n例：擲骰子 600 次，各點數出現次數與「均勻 1/6」是否相符？\nH₀：觀察分布符合理論分布 / H₁：不符合',
      assumpTitle: '前提假設',
      assumptions:
        '1. 觀察值之間獨立\n' +
        '2. 樣本來自簡單隨機抽樣\n' +
        '3. 期望次數 ≥ 5 在至少 80% 的 cell（Cochran 規則）\n' +
        '4. 變數為類別型（非連續）',
      formulasTitle: '核心公式',
      formulaChi2: 'χ² = Σ ((O − E)² / E)',
      formulaIndepE: '獨立性檢定 E_ij = (row_i 總和 × col_j 總和) / N，df = (r − 1)(c − 1)',
      formulaGofE: '適合度檢定 E_i = N · p_i，df = k − 1',
      formulaCramer: "Cramer's V = √(χ² / (N · min(r − 1, c − 1)))",
      formulaResid: '標準化殘差 z_ij = (O_ij − E_ij) / √E_ij',
      readingTitle: '怎麼讀',
      reading:
        '1. 看整體 χ² 的 p 值 — 兩變數是否相關？\n' +
        "2. 看 Cramer's V — 相關強度（< 0.1 微弱、< 0.3 弱、< 0.5 中、≥ 0.5 強）\n" +
        '3. 看標準化殘差 — 哪個 cell 的偏離特別大？|z| ≥ 1.96 對應該 cell p < .05\n' +
        '4. 期望次數 < 5 的 cell 太多（> 20%）→ 結果失準，考慮合併類別或改用 Fisher exact 檢定（精確檢定，2×2 為主）',
    },
    apa: {
      indepSig:
        '卡方獨立性檢定結果顯示，{rowVar} 與 {colVar} 兩變數呈顯著關聯，χ²({df}, N = {n}) = {chi2}, p = {pStr}，Cramer\'s V = {v}（{effect}效果量）。',
      indepNs:
        '卡方獨立性檢定結果顯示，{rowVar} 與 {colVar} 兩變數之間無顯著關聯，χ²({df}, N = {n}) = {chi2}, p = {pStr}。',
      gofSig:
        '卡方適合度檢定結果顯示，{var} 的觀察分布與理論分布{sig}差異，χ²({df}, N = {n}) = {chi2}, p = {pStr}。',
      gofNs:
        '卡方適合度檢定結果顯示，{var} 的觀察分布與理論分布無顯著差異，χ²({df}, N = {n}) = {chi2}, p = {pStr}。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
      sigYesDiff: '存在顯著',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      indepOverall:
        '整體檢定 χ²({df}, N = {n}) = {chi2}, p = {pStr} → {sigWord}。' +
        '\nCramer\'s V = {v}，屬於{effect}效果量。',
      gofOverall:
        '整體檢定 χ²({df}, N = {n}) = {chi2}, p = {pStr} → {sigWord}。',
      residSection: '標準化殘差檢視（|z| ≥ 1.96 為主要偏離 cell）：',
      residLine: '{cellLabel}：z = {z}{flag}',
      flagHigh: ' 顯著偏離',
      sigYes: '顯著',
      sigNo: '不顯著',
    },
  },
  multReg: {
    title: '多元線性迴歸',
    config: {
      yLabel: '依變項 Y',
      xLabel: '預測變項（複選）',
      pickY: '請選依變項',
      pickXs: '請至少勾選 1 個預測變項',
      hint: '勾選下方數值變數作為預測變項；不可包含 Y',
    },
    result: {
      modelTitle: '模型摘要',
      anovaTitle: 'ANOVA 表（整體模型 F 檢定）',
      coefTitle: '係數表',
      assumpTitle: '殘差常態性',
      cols: {
        r: 'R', r2: 'R²', adjR2: 'Adj. R²', se: 'SE 估計值', n: 'n',
        source: '變異來源', ss: 'SS', df: 'df', ms: 'MS', f: 'F', p: 'p',
        regression: '迴歸模型', residual: '殘差', total: '總和',
        predictor: '預測項', b: 'b', stdErr: 'SE', beta: 'β', t: 't', vif: 'VIF',
        intercept: '常數項',
      },
      vifWarn:
        '注意：VIF > 5 的預測變項顯示多重共線跡象（VIF > 10 視為嚴重）。考慮：移除高度相關的變項、加總成綜合分數、或改用主成分迴歸。',
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '用多個連續預測變項聯合預測一個連續依變項。回答的問題：\n（1）整體模型是否能顯著預測 Y？（F 檢定）\n（2）控制其他變項後，每一個預測變項對 Y 的獨立貢獻？（個別係數的 t 檢定）\n（3）模型解釋了 Y 的多少變異？（R² 與 Adj. R²）\n（4）哪個預測變項的相對影響力最大？（標準化係數 β）',
      assumpTitle: '前提假設',
      assumptions:
        '1. Y 與 X 之間為線性關係\n' +
        '2. 觀察值獨立\n' +
        '3. 殘差呈常態分布（Shapiro-Wilk 自動檢核）\n' +
        '4. 同質變異\n' +
        '5. 無嚴重多重共線（VIF 自動計算；> 5 警示）\n' +
        '6. 適當的樣本量：n ≥ 10–20 × 預測變項數',
      formulasTitle: '核心公式',
      formulaBeta: 'β = (X\'X)⁻¹ X\'y',
      formulaSE: 'SE(β) = √( MSE · diag((X\'X)⁻¹) )',
      formulaF: 'F = (R² / k) / ((1 − R²) / (n − k − 1))，df₁ = k, df₂ = n − k − 1',
      formulaAdjR2: 'Adj. R² = 1 − (1 − R²) · (n − 1) / (n − k − 1)',
      formulaStdBeta: '標準化 β_i = b_i · SD(X_i) / SD(Y)',
      formulaVIF: 'VIF_i = 1 / (1 − R²_i)，R²_i 為 X_i 對其他預測變項的迴歸 R²',
      readingTitle: '怎麼讀',
      reading:
        '1. 看整體 F 檢定 — 模型整體有沒有顯著預測力？\n' +
        '2. 看 R² 與 Adj. R² — 解釋了多少變異？（多元迴歸建議報告 Adj. R²）\n' +
        '3. 看個別係數的 p 值 — 哪些 X 在控制其他變項後仍顯著？\n' +
        '4. 比較標準化 β 的絕對值 — 哪個 X 的相對影響力最大？\n' +
        '5. 看 VIF — 有沒有多重共線問題？（> 5 警示，> 10 嚴重）\n' +
        '6. 看殘差常態性 — 推論前提是否符合？\n\n' +
        '常見陷阱：\n' +
        '- 個別 t 檢定都不顯著但整體 F 顯著 → 多重共線\n' +
        '- R² 高但個別係數都不顯著 → 同上\n' +
        '- 加入更多 X 一定會讓 R² 上升 → 用 Adj. R² 才公平比較',
    },
    apa: {
      sentence:
        '多元線性迴歸結果顯示，{predictors} 聯合預測 {yLabel} 之模型整體{sigWord}（F({df1}, {df2}) = {f}, p = {pStr}），R² = {r2}，調整後 R² = {adjR2}。{coefList}',
      sentenceNs:
        '多元線性迴歸結果顯示，{predictors} 對 {yLabel} 之預測未達顯著（F({df1}, {df2}) = {f}, p = {pStr}），R² = {r2}，調整後 R² = {adjR2}。',
      coefSig:
        '{name}（b = {b}, SE = {se}, β = {beta}, t = {t}, p = {pStr}）',
      coefOpener: '個別係數中，',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      overall:
        '整體模型 F({df1}, {df2}) = {f}, p = {pStr} → {sigWord}。' +
        ' R² = {r2}（解釋 {r2Pct}% 變異），調整後 R² = {adjR2}。',
      coefSection: '個別預測項：',
      coefLine:
        '{name}：b = {b}（SE = {se}，β = {beta}，t = {t}，p = {pStr}） → {sigWord}',
      vifSection: 'VIF 檢視：',
      vifLine: '{name}: VIF = {vif} {warn}',
      vifWarnHigh: '⚠ 警示',
      vifWarnSevere: '⚠ 嚴重',
      sigYes: '達顯著',
      sigNo: '未達顯著',
    },
  },
  history: {
    title: '分析歷史',
    saveCurrent: '釘選目前分析到歷史',
    saveCurrentHint: '把目前的資料集、分析方法、變數選擇、模式與語言一併保存，方便事後比對',
    needSetup: '需先載入資料集並選擇分析方法',
    empty: '尚無歷史紀錄',
    listTitle: '已釘選的快照（最新在最上）',
    restoreBtn: '還原',
    removeBtn: '移除',
    clearAllBtn: '全部清空',
    clearConfirm: '確定要清空所有歷史紀錄？',
    timeAgo: {
      seconds: '{n} 秒前',
      minutes: '{n} 分鐘前',
      hours: '{n} 小時前',
      days: '{n} 天前',
    },
  },
  transform: {
    title: '變數轉換',
    sourceLabel: '原始變數',
    typeLabel: '轉換型別',
    nameLabel: '新欄位名稱',
    nameHint: '只能用英數與底線；建議保留預設前綴方便識別',
    nameInvalid: '名稱僅可含英數、底線；不可與既有欄位重複',
    types: {
      log: '自然對數 ln(x)',
      log10: '常用對數 log₁₀(x)',
      zscore: 'Z 分數標準化',
      recode_reverse: 'Likert 反向計分',
    },
    typeHint: {
      log: 'x ≤ 0 之值會轉為遺漏',
      log10: 'x ≤ 0 之值會轉為遺漏',
      zscore: '(x − M) / SD，使用該欄全部非缺值之 M 與 SD',
      recode_reverse: 'new = max + min − x；常用於反向計分題還原',
    },
    rangeMin: '最小值',
    rangeMax: '最大值',
    pickSource: '請選原始變數',
    addBtn: '加入',
    removeBtn: '移除',
    closeBtn: '關閉',
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
    methodLabel: '相關方法',
    methods: {
      pearson: 'Pearson r',
      spearman: 'Spearman ρ',
    },
    methodHint: {
      pearson: '線性相關；要求兩變數為連續且呈雙變量常態',
      spearman: '基於秩的單調相關；不要求常態，順序量表也適用',
    },
    symbol: {
      pearson: 'r',
      spearman: 'ρ',
    },
    methodLabelInline: {
      pearson: 'Pearson 積差相關',
      spearman: 'Spearman 等級相關',
    },
    selectVarsTitle: '選擇要分析的變數',
    selectVarsHint: '至少勾選 2 個數值變數（連續或順序）；會計算所有兩兩配對',
    needAtLeastTwo: '請勾選至少 2 個變數',
    cellHint: '矩陣顯示 {sym}（顯著時加星號）+ p 值與 n。* p < .05、** p < .01、*** p < .001',
    notes: {
      purposeTitle: '用途',
      purposePearson:
        '描述兩個連續／順序變數之間「線性關聯的方向與強度」。\n正相關（r > 0）：兩變數同向變動。\n負相關（r < 0）：兩變數反向變動。\nr ≈ 0：無線性關聯（可能仍有非線性關係）。',
      purposeSpearman:
        '描述兩個變數之間「單調關聯的方向與強度」（不要求線性）。\n演算法：對 X 與 Y 各自取秩後，套 Pearson 公式。\n相對於 Pearson r 的優點：不要求常態、對極端值較穩健、可處理順序量表。',
      assumpTitle: '前提假設',
      assumptionsPearson:
        '1. 兩變數均為連續變項（順序量表 ≥ 5 階亦可使用）\n2. 兩變數呈雙變量常態分布（n ≥ 30 時可由中央極限定理放寬）\n3. 兩變數呈線性關係 — 散佈圖明顯曲線時不應使用 Pearson r\n4. 觀察值之間獨立\n5. 同質變異（homoscedasticity）— 殘差散佈不應隨 X 改變',
      assumptionsSpearman:
        '1. 兩變數至少為順序測量尺度\n2. 兩變數呈單調關係（同向或反向，不必線性）\n3. 觀察值之間獨立\n（不要求常態、不要求線性、對極端值較穩健）',
      formulasTitle: '核心公式',
      formulaR: 'r = Σ((Xi - Mx)(Yi - My)) / √(Σ(Xi - Mx)² · Σ(Yi - My)²)',
      formulaT: 't = r √(n - 2) / √(1 - r²)，df = n - 2',
      formulaRho: 'ρ = Pearson(rank(X), rank(Y))（並列值用平均秩）',
      formulaTSpearman: 't = ρ √(n - 2) / √(1 - ρ²)，df = n - 2',
      readingTitle: '怎麼讀',
      reading:
        '|{sym}| 強度建議（Cohen, 1988）：< 0.1 微弱、0.1-0.3 弱、0.3-0.5 中等、> 0.5 強。\n\n' +
        '{sym}² 表示 X 與 Y 共享變異的比例（決定係數）。例：{sym} = 0.5 → {sym}² = 0.25 → 解釋 25% 變異。\n\n' +
        '相關 ≠ 因果。即使達顯著，也不能推論方向與因果。',
    },
    apa: {
      // 顯著的配對列出，無顯著時用 noSig 段落
      methodPrefix: '本研究採用{methodInline}分析。',
      pairLine: '{labelA} 與 {labelB} 之間呈{strengthWord}{directionWord}相關（{sym} = {r}, p = {pStr}, n = {n}）。',
      noSig: '本資料中無達顯著的相關配對（α = .05）。',
      copyHint: '一鍵複製 APA 敘述',
      strengthWord: { weak: '弱', moderate: '中等', strong: '強' },
      directionWord: { positive: '正', negative: '負' },
    },
    interp: {
      header: '解讀',
      // 教學模式：列出每個達顯著的配對
      pairLine: '{labelA} ↔ {labelB}：{sym} = {r} → {strengthWord}{directionWord}相關，p = {pStr} → {sigWord}',
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
  anova2: {
    title: '雙因子變異數分析',
    config: {
      depVar: '依變項（連續或順序）',
      factorA: '因子 A',
      factorB: '因子 B',
      pickDep: '請選依變項',
      pickFactorA: '請選因子 A',
      pickFactorB: '請選因子 B',
      sameFactor: '兩個因子不可為同一變項',
      hint: '兩個因子均需為類別型，且各 ≥ 2 組',
    },
    result: {
      cellMeansTitle: '細格平均（Cell Means）',
      anovaTitle: 'ANOVA 表（Type III SS）',
      effectSizeTitle: '效果量',
      interactionPlotTitle: '交互作用圖',
      cols: {
        source: '變異來源',
        ss: 'SS',
        df: 'df',
        ms: 'MS',
        f: 'F',
        p: 'p',
        partialEta2: '偏 η²',
        effectA: '主效果 A',
        effectB: '主效果 B',
        effectAB: '交互作用 A × B',
        error: '誤差',
        total: '總和',
        cell: '細格',
        marginalRow: '邊際 A',
        marginalCol: '邊際 B',
        grandMean: '總平均',
        n: 'n',
        mean: 'M',
        sd: 'SD',
      },
      effectInterp: {
        small: '小', medium: '中', large: '大',
      },
    },
    notes: {
      purposeTitle: '用途',
      purpose:
        '同時檢驗兩個類別自變項對一個連續依變項的影響。回答的問題：\n' +
        '（1）A 因子的主效果：忽略 B 時，A 各組是否有差？\n' +
        '（2）B 因子的主效果：忽略 A 時，B 各組是否有差？\n' +
        '（3）A × B 交互作用：A 對 Y 的效果是否會隨 B 的層級而不同？\n' +
        '當交互作用顯著時，主效果的解讀需在交互作用條件下進行（不能只看邊際）。',
      assumpTitle: '前提假設',
      assumptions:
        '1. 觀察值獨立\n' +
        '2. 每個細格的母體呈常態分布（n ≥ 30 / 細格時可放寬）\n' +
        '3. 細格間變異數同質（Levene\'s 待後續加入）\n' +
        '4. 各變項均正確分類（無誤分組）\n' +
        '5. 樣本量：建議每細格至少 5 筆',
      formulasTitle: '核心公式（Type III SS）',
      formulaSS:
        '對每個效果 E，採設計矩陣效果編碼後跑 OLS：\n' +
        'SS_E = ESS(完整模型移除 E) − ESS(完整模型)',
      formulaDf: 'df_A = nA − 1, df_B = nB − 1, df_AB = (nA − 1)(nB − 1), df_誤差 = N − nA · nB',
      formulaPartialEta2: '偏 η² = SS_效果 / (SS_效果 + SS_誤差)',
      readingTitle: '怎麼讀',
      reading:
        '解讀步驟：\n' +
        '1. 先看交互作用 A × B 的 p — 顯著嗎？\n' +
        '2. 若交互作用顯著 → 主效果的解讀必須在不同 B 層級分別檢視（簡單主效應分析），不能單純看邊際平均\n' +
        '3. 若交互作用不顯著 → 可分別解讀兩個主效果\n' +
        '4. 偏 η² 解讀：< 0.06 小、0.06-0.14 中、≥ 0.14 大\n\n' +
        '交互作用圖判讀：\n' +
        '- 兩條線平行 → 無交互作用\n' +
        '- 兩條線交叉 → 序級交互作用（disordinal）\n' +
        '- 兩條線同向但斜率不同 → 量級交互作用（ordinal）',
    },
    apa: {
      sentence:
        '雙因子變異數分析結果顯示，{factorA} 主效果{sigA}（F({df1A}, {df2}) = {fA}, p = {pA}, 偏 η² = {peA}）、' +
        '{factorB} 主效果{sigB}（F({df1B}, {df2}) = {fB}, p = {pB}, 偏 η² = {peB}）、' +
        '{factorA} × {factorB} 交互作用{sigAB}（F({df1AB}, {df2}) = {fAB}, p = {pAB}, 偏 η² = {peAB}）。',
      sigYes: '達顯著',
      sigNo: '未達顯著',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      summary:
        '主效果 A（{factorA}）：F({df1A}, {df2}) = {fA}, p = {pA} → {sigA}（偏 η² = {peA}, {effectA}）\n' +
        '主效果 B（{factorB}）：F({df1B}, {df2}) = {fB}, p = {pB} → {sigB}（偏 η² = {peB}, {effectB}）\n' +
        '交互作用 A × B：F({df1AB}, {df2}) = {fAB}, p = {pAB} → {sigAB}（偏 η² = {peAB}, {effectAB}）',
      interactionWarn: '交互作用顯著：主效果只能在「特定 B 層級」內解讀；建議搭配交互作用圖與簡單主效應檢定。',
      sigYes: '顯著',
      sigNo: '不顯著',
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
      bonferroniTitle: 'Bonferroni 事後比較',
      bonferroniHint: 'p_adj = min(1, p_raw × m)，m = {m}（比較組數）；較保守但與 Tukey 結果一致時可雙重佐證',
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
        t: 't',
        pRaw: 'p（未校正）',
        pAdj: 'p（Bonferroni）',
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
  alpha: {
    title: "Cronbach's α 信度分析",
    selectVarsTitle: '選擇量表題',
    selectVarsHint:
      '勾選同一個量表的題目（建議至少 3 題；若有反向題，請先在 Step 4 變數轉換中重新編碼）',
    needAtLeast2: '請選至少 2 題',
    summaryTitle: '總體信度',
    itemTitle: '項目分析',
    cols: {
      alpha: 'Cronbach α',
      kItems: '題數',
      n: '有效樣本',
      meanInter: '平均項間相關',
      item: '項目',
      mean: 'M',
      sd: 'SD',
      itemTotalCorr: '校正項目-總分相關',
      alphaIfDeleted: '刪題後 α',
      interpretation: '解讀',
    },
    interpretation: {
      excellent: '極佳',
      good: '良好',
      acceptable: '可接受',
      questionable: '疑慮',
      poor: '不佳',
      unacceptable: '不可接受',
    },
    droppedNote: '因遺漏值剔除 {n} 列（listwise deletion）',
    notes: {
      purposeTitle: '用途',
      purpose:
        '評估量表內部一致性信度（internal consistency reliability）。\n' +
        '回答的問題：「這幾道題目是不是在量同一個構念？分數加總有沒有道理？」\n\n' +
        '注意：α 是「同質性」的指標，不是「效度」。α 高只代表題目互相一致，不代表它們真的測到你想測的東西（那是建構效度的問題，需要 EFA / CFA / 收斂效度等）。',
      assumpTitle: '前提假設',
      assumptions:
        '1. 各題測量同一個潛在構念（單向度）— α 在多向度量表會失準\n' +
        '2. 各題之間在概念上應為加總有意義（不是排序、不是分類）\n' +
        '3. 反向題已先重新編碼為同方向\n' +
        '4. 各題測量誤差互相獨立（tau-equivalent 假設；違反時 α 為下界估計）',
      formulasTitle: '核心公式',
      formulaAlpha: 'α = (k / (k-1)) · (1 - Σσ²_i / σ²_t)',
      formulaItc:
        '校正項目-總分相關 r_i = Pearson(X_i, Σ_{j≠i} X_j)',
      formulaAlphaDel:
        "刪題後 α(i) = α 用 k - 1 題重算（去掉 X_i）",
      readingTitle: '怎麼讀',
      reading:
        'α 解讀慣例（DeVellis 2017 / Nunnally 1978）：\n' +
        '≥ 0.90 極佳、0.80-0.89 良好、0.70-0.79 可接受、0.60-0.69 疑慮、0.50-0.59 不佳、< 0.50 不可接受。\n\n' +
        '檢視「校正項目-總分相關」：\n' +
        '- ≥ 0.30：該題與整份量表共識性合理\n' +
        '- < 0.30：該題與其他題共識性低，建議檢視題意或考慮刪除\n' +
        '- 接近 0 或為負：該題可能反向計分未處理，或測量到不同構念\n\n' +
        '檢視「刪題後 α」：\n' +
        '- 若刪除某題後 α 顯著上升，該題可能損害一致性，建議檢視\n' +
        '- 若所有題刪題後 α 都下降，量表內部結構穩健\n\n' +
        '注意：題數越多，α 通常越高（公式中 k/(k-1) 的影響）。比較不同量表的 α 時要考慮題數差異。',
    },
    apa: {
      sentence:
        '本研究以 Cronbach\'s α 評估量表的內部一致性信度。{itemList} 共 {k} 題（n = {n}），α = {alpha}（{interp}），平均項間相關 = {meanInter}。',
      copyHint: '一鍵複製 APA 敘述',
    },
    interp: {
      header: '解讀',
      summary:
        '本量表共 {k} 題，有效樣本 {n} 筆，Cronbach α = {alpha}（{interp}信度）。' +
        '平均項間相關 = {meanInter}。{recommendation}',
      recommendExcellent: '量表內部一致性極佳，可直接使用。',
      recommendGood: '量表內部一致性良好，可使用。',
      recommendAcceptable:
        '量表內部一致性可接受，建議檢視「校正項目-總分相關 < 0.30」的題目；若有「刪題後 α 明顯上升」的題目，考慮修訂或刪除。',
      recommendLow:
        '量表內部一致性偏低，建議：（1）檢視反向題是否已重新編碼；（2）檢視校正項目-總分相關過低的題目；（3）若仍偏低，需重新檢視量表的構念與題目設計。',
    },
  },
}
