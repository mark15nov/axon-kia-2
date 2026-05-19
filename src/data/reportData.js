// Dealer Network · Financial Performance — KMX (KIA Mexico)
// Datos extraídos del PPT ejecutivo, replicados para el generador de reporte.
// Periodo: Feb. YTD (XXX = año en curso) — 100 DLRs reportados.

export const REPORT_META = {
  title: 'Dealer Network — Financial Performance',
  subtitle: 'KMX · 100 Dealers · Feb. YTD',
  period: '8 Apr · KMX CX OM Sub Group',
  team: 'Dealer Development Team',
  currency: 'MXN',
  fxRate: 19.80,
  reportingDealers: '100/101 DLR\'s Reported Financial Information',
  decisionMaking: false,
  informationSharing: true,
  direction: false,
};

// === HEADLINE KPIs (cover summary) ===
export const HEADLINE = {
  ros: { value: 3.37, yoy: -0.53, unit: '%', label: 'ROS' },
  ebitda: { value: 5.16, yoy: -0.88, unit: '%', label: 'EBITDA' },
  oar: { value: 64.26, yoy: -0.95, unit: '%', label: 'OAR' },
  dealersInLoss: { value: '5/100', yoy: '+1 DLR', label: 'Dealers in Loss' },
  reporting: { value: '100/101', label: 'Reporting Financial Info' },
};

// === SECTION 1 · Financial KPIs (Slide 2) ===
export const FINANCIAL_KPIS = {
  ros: {
    name: 'Return On Sales (%ROS)',
    yoy: -0.53,
    mom: -1.75,
    insideNumbers: 'Net Profit -52.16%, Gross Margin -17.98%; Financial Expenses -3.99%; Expenses -6.46%.',
    yoyText: 'YTD avg. (Feb YTD vs Feb 2025) decrease of -0.53 pp.',
    momText: 'ROS MTD decreased -1.75 pp MoM.',
  },
  oar: {
    name: 'Overhead Absorption Rate (%OAR)',
    yoy: -0.95,
    mom: -6.25,
    yoyText: 'YTD shows a decrease of -0.95 pp from last year.',
    momText: 'MTD performance decreased -6.25 pp vs prior month. Impact of SI 2.0 renovations contributed ~4.7 pp.',
    insideNumbers: 'SI 2.0 capex weighs on absorption; targeting 66% with service marketing & retention plays.',
  },
  ebitda: {
    name: '%EBITDA — Earnings Before Interest, Taxes, Depreciation & Amortisation',
    yoy: -0.88,
    mom: -1.45,
    yoyText: 'KMX network EBITDA 5.16% avg; -0.88 pp YoY.',
    momText: 'MTD result shows a decrease of -1.45 pp MoM.',
    insideNumbers: '-0.88 pp driven by Total Expenses +10.06 pp YoY: Fixed +7.84% ($13.29M), Variable +17.88% ($45.91M).',
  },
  profitPerDealer: {
    name: 'Average Profit per Dealer (1,000 MXN)',
    ytdDelta: -308,
    ytdPct: -8.71,
    momDelta: -1138,
    momPct: -52.15,
    yoyText: 'YTD: Feb YTD 2026 vs Feb YTD 2025, decrease of -308 K MXN (-8.71%).',
    momText: 'MoM: Feb vs Jan decrease of -1,138 K MXN (-52.15%).',
  },
};

// === SECTION 2.1 · P&L Business Unit MTD (Slide 3) ===
export const PNL_MTD = {
  period: 'Feb. YTD · MTD',
  summary: { ros: 2.41, oar: 60.77, ebitda: 4.34 },
  deltasYoY: {
    sales: -17.69, gm: -17.98, expenses: -6.46,
    commissions: -10.96, finExpenses: -3.99, netProfit: -52.16,
  },
  netAvgCurrent: 1_044_109,
  netAvgPrev: 2_182_671,
  totalExpenses: 501_257_000,
  rows: [
    { id: 'new', concept: 'New',          sales: 3_353_765_532, cost: 3_124_405_868, gm: 229_359_665, gmPct: 6.84,  contrib: 36.64, exp: 295_393_806, op: -66_034_141, opPct: -52.97 },
    { id: 'used', concept: 'Used',        sales:   323_277_848, cost:   279_100_278, gm:  44_177_570, gmPct: 13.67, contrib:  7.06, exp:  36_145_846, op:   8_031_724, opPct:   6.44 },
    { id: 'fi', concept: 'F&I',           sales:   133_586_324, cost:    10_480_349, gm: 123_105_975, gmPct: 92.15, contrib: 19.67, exp:  31_681_557, op:  91_424_418, opPct:  73.33 },
    { id: 'parts', concept: 'Parts',      sales:   340_590_347, cost:   238_659_601, gm: 101_930_746, gmPct: 29.93, contrib: 16.28, exp:  32_190_754, op:  69_739_992, opPct:  55.94 },
    { id: 'service', concept: 'Service',  sales:   133_526_702, cost:    25_606_908, gm: 107_919_795, gmPct: 80.82, contrib: 17.24, exp:  88_562_926, op:  19_356_869, opPct:  15.53 },
    { id: 'body', concept: 'Body & Paint*', sales:  39_295_967, cost:    19_862_395, gm:  19_433_572, gmPct: 49.45, contrib:  3.10, exp:  17_283_394, op:   2_150_178, opPct:   1.72 },
  ],
  total: {
    sales: 4_324_042_721, cost: 3_698_115_399, gm: 625_927_323, gmPct: 14.48,
    exp: 501_258_287, op: 124_669_035, otherIncomes: 36_472_462,
    ebit: 161_141_498, finExp: -56_730_574, netProfit: 104_410_924,
  },
  pct: { sales: 100, cost: 85.52, gm: 14.48, exp: 11.59, op: 2.88, other: 0.84, ebit: 3.73, fin: -1.31, net: 2.41 },
};

// === SECTION 2.2 · P&L Business Unit YTD (Slide 4) ===
export const PNL_YTD = {
  period: 'Feb. YTD',
  summary: { ros: 3.37, oar: 64.26, ebitda: 5.16 },
  deltasYoY: {
    sales: +5.25, gm: -0.10, expenses: +7.32,
    commissions: +17.02, finExpenses: -20.33, netProfit: -8.72,
  },
  netAvgCurrent: 3_226_780,
  netAvgPrev: 3_534_946,
  totalExpenses: 1_026_427_000,
  rows: [
    { id: 'new', concept: 'New',          sales: 7_400_010_150, cost: 6_879_012_700, gm: 520_997_450, gmPct: 7.04,  contrib: 37.92, exp: 607_984_798, op: -86_987_348, opPct: -25.04 },
    { id: 'used', concept: 'Used',        sales:   685_982_406, cost:   590_833_489, gm:  95_148_917, gmPct: 13.87, contrib:  6.93, exp:  75_686_842, op:  19_462_075, opPct:   5.60 },
    { id: 'fi', concept: 'F&I',           sales:   285_829_439, cost:    23_793_628, gm: 262_035_811, gmPct: 91.68, contrib: 19.07, exp:  67_523_473, op: 194_512_337, opPct:  55.99 },
    { id: 'parts', concept: 'Parts',      sales:   722_895_758, cost:   507_323_456, gm: 215_572_302, gmPct: 29.82, contrib: 15.69, exp:  60_873_956, op: 154_698_346, opPct:  44.53 },
    { id: 'service', concept: 'Service',  sales:   286_242_408, cost:    54_000_646, gm: 232_241_762, gmPct: 81.13, contrib: 16.90, exp: 178_906_222, op:  53_335_540, opPct:  15.35 },
    { id: 'body', concept: 'Body & Paint*', sales:  91_183_547, cost:    43_367_025, gm:  47_816_522, gmPct: 52.44, contrib:  3.48, exp:  35_451_993, op:  12_364_529, opPct:   3.56 },
  ],
  total: {
    sales: 9_472_143_707, cost: 8_098_330_944, gm: 1_373_812_763, gmPct: 14.50,
    exp: 1_026_427_296, op: 347_385_467, otherIncomes: 85_564_749,
    ebit: 432_950_216, finExp: -114_637_571, netProfit: 318_312_645,
  },
  pct: { sales: 100, cost: 85.50, gm: 14.50, exp: 10.84, op: 3.67, other: 0.90, ebit: 4.57, fin: -1.21, net: 3.37 },
};

// === SECTION 2.3 · P&L Analysis (Slide 5) ===
export const REVENUE_SUMMARY = [
  { bu: 'A — NEW',           cur: 7_400_010_150, curPct: 78.1, prev: 6_846_563_770, prevPct: 77.9, yoy:  8.1 },
  { bu: 'B — PRE-OWNED',     cur:   685_982_406, curPct:  7.2, prev:   662_414_363, prevPct:  7.5, yoy:  3.6 },
  { bu: 'C — F&I',           cur:   285_829_439, curPct:  3.0, prev:   269_595_632, prevPct:  3.1, yoy:  6.0 },
  { bu: 'D — PARTS',         cur:   722_895_758, curPct:  7.6, prev:   651_605_722, prevPct:  7.4, yoy: 10.9 },
  { bu: 'E — SERVICE (LABOUR)', cur: 286_242_408, curPct: 3.0, prev:  271_785_970, prevPct:  3.1, yoy:  5.3 },
  { bu: 'F — BODY & PAINT',  cur:    91_183_547, curPct:  1.0, prev:    81_671_543, prevPct:  0.9, yoy: 11.6 },
  { bu: 'Total Sales',       cur: 9_472_143_707, curPct:  100, prev: 8_783_637_000, prevPct:  100, yoy:  7.8, isTotal: true },
];

export const PNL_SUMMARY_TABLE = [
  { ref: '(1)', label: 'Total Sales',                 op: '+',  cur: 9_472_143_707, prev: 8_783_637_000, yoy:  7.84 },
  { ref:  '',   label: 'Sales cost',                   op: '-',  cur: 8_098_330_944, prev: 7_441_532_273, yoy:  8.83 },
  { ref: '(2)', label: 'Total Gross Profit',           op: '=',  cur: 1_373_812_763, prev: 1_342_104_728, yoy:  2.36, isSub: true },
  { ref:  '',   label: 'Variable',                     op: '+',  cur:   302_712_848, prev:   256_807_779, yoy: 17.88 },
  { ref:  '',   label: 'Staff',                        op: '+',  cur:   341_904_574, prev:   319_217_039, yoy:  7.11 },
  { ref:  '',   label: 'Semi-Fixed',                   op: '+',  cur:   146_612_912, prev:   137_553_269, yoy:  6.59 },
  { ref:  '',   label: 'Fixed',                        op: '+',  cur:   182_706_905, prev:   169_419_275, yoy:  7.84 },
  { ref:  '',   label: 'Amortization',                 op: '+',  cur:    10_739_801, prev:    10_082_081, yoy:  6.52 },
  { ref:  '',   label: 'Depreciation',                 op: '+',  cur:    41_750_257, prev:    39_548_905, yoy:  5.57 },
  { ref: '(3)', label: 'Total Expenses',               op: '=',  cur: 1_026_427_296, prev:   932_628_349, yoy: 10.06, isSub: true },
  { ref: '(4)', label: 'Operating Profit = (2) - (3)', op: '=',  cur:   347_385_467, prev:   409_476_379, yoy: -15.16, isSub: true },
  { ref:  '',   label: 'Other Incomes / Other Expenses', op: '+', cur:   85_564_749, prev:    72_140_890, yoy: 18.61 },
  { ref:  '',   label: 'Financial Incomes / Expenses', op: '+',  cur:  -114_637_571, prev:  -140_309_019, yoy: -18.30 },
  { ref: '(5)', label: 'Net Profit Before Taxes',      op: '=',  cur:   318_312_645, prev:   341_308_250, yoy: -6.74, isTotal: true },
];

// === SECTION 3.1 · ROS Evolution + Dealers in Loss MTD (Slide 7) ===
export const ROS_EVOLUTION = {
  mtd: { ros: 2.41, oar: 60.77, ebitda: 4.34 },
  lossCount: 18, totalDealers: 100, profitableCount: 82,
  perDealer: {
    salesNow: 43.2, salesPrev: 43.2, salesPct: 0.0,
    gmNow: 6.2, gmPrev: 6.6, gmPct: -5.3,
    netNow: 1.0, netPrev: 1.5, netPct: -49.87,
    totalExpNow: 5.0, totalExpPrev: 4.7, totalExpPct: +4.9,
    payrollNow: 976, payrollPrev: 868, payrollPct: +12.3,
    finExpNow: 655, finExpPrev: 784, finExpPct: -16.5,
    floorPlanNow: 410, floorPlanPrev: 554, floorPlanPct: -26.0,
  },
};

export const DEALERS_IN_LOSS_MTD = [
  { dlr: 'Kia Vision',      stage: 5, group: 'OPTIMA',       ros: -12.67, prev: -0.32 },
  { dlr: 'Kia Bajio',       stage: 2, group: 'AUTOCOM',      ros:  -7.73, prev: -2.53 },
  { dlr: 'Kia Cuautitlan',  stage: 2, group: 'SATÉLITE',     ros:  -6.14, prev:  3.16 },
  { dlr: 'Kia Cabos',       stage: 3, group: 'PREMIER',      ros:  -5.04, prev:  5.70 },
  { dlr: 'Kia Cajeme',      stage: 3, group: 'PREMIER',      ros:  -4.17, prev:  2.81 },
  { dlr: 'Kia Brisas',      stage: 6, group: 'PLASENCIA',    ros:  -3.53, prev: -0.18 },
  { dlr: 'Kia Coatza',      stage: 2, group: 'FARRERA',      ros:  -3.14, prev:  4.90 },
  { dlr: 'Kia Iztapalapa',  stage: 3, group: 'DAYTONA',      ros:  -2.81, prev: -0.43 },
  { dlr: 'Kia Tlahuac',     stage: 4, group: 'CONTINENTAL',  ros:  -2.50, prev:  0.37 },
  { dlr: 'Kia Coliman',     stage: 3, group: 'PLASENCIA',    ros:  -2.30, prev:  2.67 },
  { dlr: 'Kia Boca',        stage: 2, group: 'FARRERA',      ros:  -2.06, prev:  3.78 },
  { dlr: 'Kia Sureste',     stage: 2, group: 'FARRERA',      ros:  -1.29, prev:  4.27 },
  { dlr: 'Kia Coapa',       stage: 1, group: 'CONTINENTAL',  ros:  -0.85, prev:  1.91 },
  { dlr: 'Kia Aeropuerto',  stage: 1, group: 'SATÉLITE',     ros:  -0.68, prev:  0.41 },
  { dlr: 'Kia Baja Sur',    stage: 6, group: 'PREMIER',      ros:  -0.56, prev:  0.83 },
  { dlr: 'Kia Bonampak',    stage: 2, group: 'MONTEJO',      ros:  -0.55, prev:  4.15 },
  { dlr: 'Kia Salina Cruz', stage: 9, group: 'BONN',         ros:  -0.38, prev:  2.91 },
  { dlr: 'Kia Capital',     stage: 4, group: 'SONI',         ros:  -0.09, prev:  3.23 },
];

// === SECTION 3.2 · ROS Trends 2015–YTD (Slide 8) ===
export const ROS_TRENDS = [
  { year: 2015, ros: 0.92 }, { year: 2016, ros: 1.45 }, { year: 2017, ros: 1.78 },
  { year: 2018, ros: 2.15 }, { year: 2019, ros: 2.42 }, { year: 2020, ros: 1.65 },
  { year: 2021, ros: 3.10 }, { year: 2022, ros: 4.27 }, { year: 2023, ros: 4.05 },
  { year: 2024, ros: 3.70 }, { year: 2025, ros: 3.90 }, { year: 2026, ros: 3.37 },
];
export const ROS_TARGET = 2.90;

// === SECTION 3.3 · ROS Calculations (Slide 9) ===
export const ROS_CALC = {
  internal: [
    { ref: '(1)', label: 'Total Sales',              op: '',  v: 9_472_143_707 },
    { ref:  '',   label: 'Sales Cost',               op: '-', v: 8_098_330_944 },
    { ref:  '',   label: 'Total Gross Profit',       op: '',  v: 1_373_812_763 },
    { ref: '(2)', label: 'Total Expenses (T863)',    op: '+', v: 1_026_427_296 },
    { ref:  '',   label: 'Total Operating Profit',   op: '-', v:   347_385_467 },
    { ref: '(3)', label: 'Net Profit Before Taxes',  op: '-', v:   318_312_645 },
    { ref: 'ROS% = (3)/(1)', label: '',              op: '=', v: '3.37%', isResult: true },
  ],
  withoutSI20: [
    { ref: '(1)', label: 'Total Sales',                                op: '',  v: 9_472_143_707 },
    { ref:  '',   label: 'Sales Cost',                                 op: '-', v: 8_098_330_944 },
    { ref:  '',   label: 'Total Gross Profit',                         op: '',  v: 1_373_812_763 },
    { ref: '(2)', label: 'Total Expenses (T863) w/o SI 2.0 & Service', op: '+', v:   973_289_316 },
    { ref:  '',   label: 'Total Operating Profit',                     op: '-', v:   347_385_467 },
    { ref: '(3)', label: 'Net Profit Before Taxes',                    op: '-', v:   343_906_893 },
    { ref: 'ROS% = (3)/(1)', label: '',                                op: '=', v: '3.63%', isResult: true },
  ],
  delta: 53_137_981,
};

// === SECTION 3.4 · ROS Ranking per Group (Slide 10) ===
// Compacted: top 30 groups (parent + dealers)
export const ROS_RANKING = [
  { rnk:  1, group: 'GEISHA (2 DLR)',       netProfit: 25_566_005, sales: 335_954_145, ros:  7.61, above: true,
    dealers: [
      { name: 'Kia Nova Qro',     net: 20_003_068, sales: 249_132_354, ros:  8.03 },
      { name: 'Kia San Juan',     net:  5_562_937, sales:  86_821_791, ros:  6.41 },
    ]},
  { rnk:  2, group: 'ALDEN (1 DLR)',        netProfit: 11_596_142, sales: 174_498_290, ros:  6.65, above: true,
    dealers: [{ name: 'Kia Satelite', net: 11_596_142, sales: 174_498_290, ros: 6.65 }]},
  { rnk:  3, group: 'CARONE (5 DLR)',       netProfit: 34_552_721, sales: 621_419_638, ros:  5.56, above: true,
    dealers: [
      { name: 'Kia Frontera',     net:  5_992_557, sales:  47_464_441, ros: 12.63 },
      { name: 'Kia Linda Vista',  net: 12_594_353, sales: 205_127_611, ros:  6.14 },
      { name: 'Kia Gonzalitos',   net: 13_716_263, sales: 255_927_227, ros:  5.36 },
      { name: 'Kia La Fe',        net:  1_194_530, sales:  59_717_542, ros:  2.00 },
      { name: 'Kia Laredo',       net:  1_055_019, sales:  53_182_816, ros:  1.98 },
    ]},
  { rnk:  4, group: 'FAME (4 DLR)',         netProfit:  8_383_151, sales: 164_652_271, ros:  5.09, above: true,
    dealers: [
      { name: 'Kia Mil Cumbres',  net:  3_424_876, sales:  44_172_123, ros:  7.75 },
      { name: 'Kia Del Duero',    net:  1_152_594, sales:  17_153_502, ros:  6.72 },
      { name: 'Kia Pedregal',     net:  3_544_156, sales:  78_164_651, ros:  4.53 },
      { name: 'Kia Paricutin',    net:    261_524, sales:  25_161_995, ros:  1.04 },
    ]},
  { rnk:  5, group: 'AUTOFIN (3 DLR)',      netProfit: 18_868_415, sales: 409_597_895, ros:  4.61, above: true,
    dealers: [
      { name: 'Kia Division del Norte', net:  7_622_755, sales: 147_249_437, ros:  5.18 },
      { name: 'Kia Del Valle',          net: 11_245_660, sales: 262_348_458, ros:  4.29 },
      { name: 'Kia Diamante',           net: null,       sales: null,        ros: null, na: true },
    ]},
  { rnk:  6, group: 'HM AUTOMOTRIZ (3 DLR)', netProfit: 12_190_787, sales: 276_922_442, ros: 4.40, above: true,
    dealers: [
      { name: 'Kia Laguna',     net: 5_204_815, sales: 115_294_177, ros: 4.51 },
      { name: 'Kia Vallejo',    net: 5_233_812, sales: 119_667_534, ros: 4.37 },
      { name: 'Kia Guadiana',   net: 1_752_161, sales:  41_960_730, ros: 4.18 },
    ]},
  { rnk:  7, group: 'EXCELENCIA (5 DLR)',   netProfit: 14_936_829, sales: 358_049_663, ros:  4.17, above: true,
    dealers: [
      { name: 'Kia Malinche',    net: 4_085_717, sales:  81_515_154, ros: 5.01 },
      { name: 'Kia Angelopolis', net: 7_364_143, sales: 148_714_347, ros: 4.95 },
      { name: 'Kia Cholula',     net: 1_857_789, sales:  52_420_783, ros: 3.54 },
      { name: 'Kia Dorada',      net:   977_110, sales:  39_700_284, ros: 2.46 },
      { name: 'Kia Manantial',   net:   652_071, sales:  35_699_095, ros: 1.83 },
    ]},
  { rnk:  8, group: 'TORRES CORZO (5 DLR)', netProfit: 26_836_836, sales: 661_082_136, ros:  4.06, above: true,
    dealers: [
      { name: 'Kia Campestre',  net:  6_953_855, sales: 150_624_100, ros: 4.62 },
      { name: 'Kia Via Alta',   net:  2_426_297, sales:  53_974_850, ros: 4.50 },
      { name: 'Kia Lomas',      net: 11_142_639, sales: 266_386_416, ros: 4.18 },
      { name: 'Kia Villas',     net:  3_143_643, sales:  86_777_475, ros: 3.62 },
      { name: 'Kia Bernardez',  net:  3_170_403, sales: 103_319_295, ros: 3.07 },
    ]},
  { rnk:  9, group: 'CLEBER (7 DLR)',       netProfit: 27_812_988, sales: 757_991_890, ros:  3.67, above: true,
    dealers: [
      { name: 'Kia Max',      net: 6_836_072, sales: 108_566_754, ros: 6.30 },
      { name: 'Kia Cumbres',  net: 6_273_373, sales: 106_750_818, ros: 5.88 },
      { name: 'Kia Sendero',  net: 8_750_694, sales: 245_236_417, ros: 3.57 },
      { name: 'Kia Pape',     net: 1_977_184, sales:  56_440_860, ros: 3.50 },
      { name: 'Kia Victoria', net: 1_763_999, sales:  82_868_421, ros: 2.13 },
      { name: 'Kia Tajin',    net: 1_227_785, sales:  73_428_843, ros: 1.67 },
      { name: 'Kia Avenida',  net:   983_881, sales:  84_699_777, ros: 1.16 },
    ]},
  { rnk: 10, group: 'KASA (2 DLR)',         netProfit:  7_621_915, sales: 212_099_974, ros:  3.59, above: true,
    dealers: [
      { name: 'Kia Coacalco', net: 4_201_595, sales: 105_123_418, ros: 4.00 },
      { name: 'Kia Ecatepec', net: 3_420_321, sales: 106_976_555, ros: 3.20 },
    ]},
  { rnk: 11, group: 'GRUPO HG (2 DLR)',     netProfit:  5_525_387, sales: 154_879_984, ros:  3.57, above: true,
    dealers: [
      { name: 'Kia Juarez',   net: 3_562_542, sales: 79_280_841, ros: 4.49 },
      { name: 'Kia Juventud', net: 1_962_846, sales: 75_599_143, ros: 2.60 },
    ]},
  { rnk: 12, group: 'DAYTONA (2 DLR)',      netProfit:  6_894_205, sales: 193_376_328, ros:  3.57, above: true,
    dealers: [
      { name: 'Kia Interlomas', net: 5_592_776, sales: 100_850_535, ros: 5.55 },
      { name: 'Kia Iztapalapa', net: 1_301_429, sales:  92_525_793, ros: 1.41 },
    ]},
  { rnk: 13, group: 'SURMAN (2 DLR)',       netProfit:  7_283_451, sales: 215_957_329, ros:  3.37, above: true,
    dealers: [
      { name: 'Kia Valle Oriente',     net: 4_659_544, sales: 129_547_808, ros: 3.60 },
      { name: 'Kia Carretera Nacional',net: 2_623_907, sales:  86_409_520, ros: 3.04 },
    ]},
  { rnk: 14, group: 'BONN (5 DLR)',         netProfit:  7_863_129, sales: 240_724_915, ros:  3.27, above: false,
    dealers: [
      { name: 'Kia Salina Cruz',     net: 1_553_772, sales: 37_613_060, ros: 4.13 },
      { name: 'Kia Los Fuertes',     net: 1_902_867, sales: 47_881_739, ros: 3.97 },
      { name: 'Kia Plaza del Valle', net: 2_662_145, sales: 76_492_434, ros: 3.48 },
      { name: 'Kia Serdan',          net: 1_560_247, sales: 68_535_097, ros: 2.28 },
      { name: 'Kia Puerto Escondido',net:   184_097, sales: 10_202_585, ros: 1.80 },
    ]},
  { rnk: 15, group: 'SONI (2 DLR)',         netProfit:  4_933_643, sales: 153_665_245, ros:  3.21, above: false,
    dealers: [
      { name: 'Kia Center',  net: 4_890_051, sales: 104_166_427, ros: 4.69 },
      { name: 'Kia Capital', net:    43_592, sales:  49_498_817, ros: 0.09 },
    ]},
  { rnk: 16, group: 'CEVER (2 DLR)',        netProfit:  8_774_718, sales: 273_711_228, ros:  3.21, above: false,
    dealers: [
      { name: 'Kia Metepec',      net: 4_952_465, sales: 144_372_631, ros: 3.43 },
      { name: 'Kia Lomas Verdes', net: 3_822_252, sales: 129_338_597, ros: 2.96 },
    ]},
  { rnk: 17, group: 'MONTEJO (4 DLR)',      netProfit: 10_580_577, sales: 354_083_838, ros:  2.99, above: false,
    dealers: [
      { name: 'Kia Peninsula', net: 7_706_527, sales: 144_943_677, ros: 5.32 },
      { name: 'Kia Caribe',    net: 1_387_898, sales:  34_436_781, ros: 4.03 },
      { name: 'Kia Bahia',     net:   985_618, sales:  59_060_163, ros: 1.67 },
      { name: 'Kia Bonampak',  net:   500_534, sales: 115_643_216, ros: 0.43 },
    ]},
  { rnk: 18, group: 'DALTON (5 DLR)',       netProfit: 16_074_803, sales: 563_264_896, ros:  2.85, above: false,
    dealers: [
      { name: 'Kia Lopez Mateos',     net: 6_055_247, sales: 137_866_669, ros: 4.39 },
      { name: 'Kia Country Club',     net: 3_554_499, sales: 102_812_568, ros: 3.46 },
      { name: 'Kia Carretera 57',     net: 3_606_508, sales: 127_764_557, ros: 2.82 },
      { name: 'Kia Mariano Escobedo', net: 1_850_564, sales:  91_577_379, ros: 2.02 },
      { name: 'Kia San Joaquin',      net: 1_007_985, sales: 103_243_723, ros: 0.98 },
    ]},
  { rnk: 19, group: 'PLATINO (2 DLR)',      netProfit:  3_942_761, sales: 147_037_943, ros:  2.68, above: false,
    dealers: [
      { name: 'Kia Animas',         net: 3_015_934, sales: 91_146_963, ros: 3.31 },
      { name: 'Kia Altas Montañas', net:   926_827, sales: 55_890_980, ros: 1.66 },
    ]},
  { rnk: 20, group: 'FARRERA (7 DLR)',      netProfit: 14_596_660, sales: 550_906_213, ros:  2.65, above: false,
    dealers: [
      { name: 'Kia Ruiz Cortines', net: 5_176_099, sales: 124_946_468, ros: 4.14 },
      { name: 'Kia Sureste',       net: 3_037_757, sales:  79_476_197, ros: 3.82 },
      { name: 'Kia Playacar',      net: 2_581_972, sales:  69_148_758, ros: 3.73 },
      { name: 'Kia Tapachula',     net:   444_875, sales:  16_843_109, ros: 2.64 },
      { name: 'Kia Coatza',        net:   854_897, sales:  45_674_470, ros: 1.87 },
      { name: 'Kia Norte',         net: 1_360_140, sales: 103_593_709, ros: 1.31 },
      { name: 'Kia Boca',          net: 1_140_920, sales: 111_223_501, ros: 1.03 },
    ]},
  { rnk: 21, group: 'SOLANA (2 DLR)',       netProfit:  4_266_685, sales: 169_677_037, ros:  2.51, above: false,
    dealers: [
      { name: 'Kia Santa Fe',  net: 3_212_777, sales: 122_138_991, ros: 2.63 },
      { name: 'Kia Esmeralda', net: 1_053_909, sales:  47_538_045, ros: 2.22 },
    ]},
  { rnk: 22, group: 'CAMARENA (3 DLR)',     netProfit:  6_786_018, sales: 269_903_045, ros:  2.51, above: false,
    dealers: [
      { name: 'Kia Santa Anita', net: 2_049_260, sales:  76_550_660, ros: 2.68 },
      { name: 'Kia Patria',      net: 2_887_898, sales: 117_796_222, ros: 2.45 },
      { name: 'Kia Vallarta',    net: 1_848_859, sales:  75_556_162, ros: 2.45 },
    ]},
  { rnk: 23, group: 'PREMIER (6 DLR)',      netProfit:  7_592_330, sales: 327_223_943, ros:  2.32, above: false,
    dealers: [
      { name: 'Kia Morelos',  net: 5_010_613, sales: 107_367_199, ros:  4.67 },
      { name: 'Kia Country',  net: 2_704_781, sales:  76_382_436, ros:  3.54 },
      { name: 'Kia Ahome',    net:   909_789, sales:  49_530_510, ros:  1.84 },
      { name: 'Kia Baja Sur', net:   346_033, sales:  36_467_946, ros:  0.95 },
      { name: 'Kia Cajeme',   net:  -435_961, sales:  27_611_200, ros: -1.58, loss: true },
      { name: 'Kia Cabos',    net:  -942_926, sales:  29_864_652, ros: -3.16, loss: true },
    ]},
  { rnk: 24, group: 'VANGUARDIA (2 DLR)',   netProfit:  5_792_453, sales: 263_543_858, ros:  2.20, above: false,
    dealers: [
      { name: 'Kia Corregidora', net: 3_313_315, sales: 137_295_682, ros: 2.41 },
      { name: 'Kia Altaria',     net: 2_479_138, sales: 126_248_177, ros: 1.96 },
    ]},
  { rnk: 25, group: 'ZIGA (3 DLR)',         netProfit:  4_734_534, sales: 260_783_741, ros:  1.82, above: false,
    dealers: [
      { name: 'Kia Texcoco',    net: 2_044_465, sales:  78_445_219, ros: 2.61 },
      { name: 'Kia Primavera',  net: 1_760_417, sales: 112_641_459, ros: 1.56 },
      { name: 'Kia Ixtapaluca', net:   929_652, sales:  69_697_063, ros: 1.33 },
    ]},
  { rnk: 26, group: 'PLASENCIA (6 DLR)',    netProfit:  7_091_467, sales: 451_831_449, ros:  1.57, above: false,
    dealers: [
      { name: 'Kia Nayarita',       net: 2_236_649, sales: 69_474_512, ros:  3.22 },
      { name: 'Kia Pacific',        net: 1_710_984, sales: 71_036_162, ros:  2.41 },
      { name: 'Kia Galerias',       net: 2_082_301, sales: 99_388_521, ros:  2.10 },
      { name: 'Kia Gonzalez Gallo', net:   819_204, sales: 114_897_321, ros: 0.71 },
      { name: 'Kia Coliman',        net:   495_764, sales:  71_856_171, ros: 0.69 },
      { name: 'Kia Brisas',         net:  -253_435, sales:  25_178_762, ros: -1.01, loss: true },
    ]},
  { rnk: 27, group: 'OPTIMA (3 DLR)',       netProfit:  3_707_964, sales: 281_324_911, ros:  1.32, above: false,
    dealers: [
      { name: 'Kia Futura', net:  4_669_185, sales: 115_198_493, ros:   4.05 },
      { name: 'Kia Innova', net:  3_511_806, sales: 133_136_983, ros:   2.64 },
      { name: 'Kia Vision', net: -4_473_026, sales:  32_989_435, ros: -13.56, loss: true, bottom: true },
    ]},
  { rnk: 28, group: 'SATÉLITE (2 DLR)',     netProfit:  2_662_647, sales: 248_942_714, ros:  1.07, above: false,
    dealers: [
      { name: 'Kia Aeropuerto',  net: 2_452_002, sales: 136_224_570, ros: 1.80 },
      { name: 'Kia Cuautitlan',  net:   210_645, sales: 112_718_143, ros: 0.19 },
    ]},
  { rnk: 29, group: 'AUTOCOM (2 DLR)',      netProfit:  1_125_673, sales: 177_956_613, ros:  0.63, above: false,
    dealers: [
      { name: 'Kia Poliforum', net: 539_162, sales: 84_235_452, ros: 0.64 },
      { name: 'Kia Bajio',     net: 586_511, sales: 93_721_161, ros: 0.63 },
    ]},
  { rnk: 30, group: 'CONTINENTAL (2 DLR)',  netProfit:    179_383, sales: 191_873_108, ros:  0.09, above: false, bottom: true,
    dealers: [
      { name: 'Kia Coapa',    net:  1_289_578, sales: 127_766_769, ros:  1.01 },
      { name: 'Kia Tlahuac',  net: -1_110_195, sales:  64_106_340, ros: -1.73, loss: true },
    ]},
];

// === SECTION 4.1 · OAR Top/Bottom 5 (Slide 11) ===
export const OAR_TOP5 = [
  { dlr: 'Kia Lopez Mateos', stage: 1, group: 'DALTON',       oar: 131.59, prev: 130.75, var:  0.84 },
  { dlr: 'Kia Satelite',     stage: 1, group: 'ALDEN',        oar: 121.92, prev:  69.76, var: 52.16 },
  { dlr: 'Kia Campestre',    stage: 2, group: 'TORRES CORZO', oar: 108.32, prev:  82.80, var: 25.53 },
  { dlr: 'Kia Country Club', stage: 5, group: 'DALTON',       oar: 107.33, prev: 113.29, var: -5.97 },
  { dlr: 'Kia Max',          stage: 2, group: 'CLEBER',       oar: 107.23, prev:  93.14, var: 14.09 },
];
export const OAR_BOTTOM5 = [
  { dlr: 'Kia Dorada',     stage:  9, group: 'EXCELENCIA', oar: 33.11, prev: 21.24, var: 11.86 },
  { dlr: 'Kia Caribe',     stage: 10, group: 'MONTEJO',    oar: 31.15, prev: null,  var: null },
  { dlr: 'Kia Capital',    stage:  4, group: 'SONI',       oar: 30.98, prev: 44.05, var: -13.07 },
  { dlr: 'Kia Tapachula',  stage: 10, group: 'FARRERA',    oar:  3.25, prev: null,  var: null },
  { dlr: 'Kia La Fe',      stage: 11, group: 'CARONE',     oar: -1.01, prev: null,  var: null },
];

// === SECTION 4.2 · OAR Trends (Slide 12) ===
export const OAR_TRENDS = [
  { year: 2015, oar: 40 }, { year: 2016, oar: 45 }, { year: 2017, oar: 48 },
  { year: 2018, oar: 51 }, { year: 2019, oar: 54 }, { year: 2020, oar: 55 },
  { year: 2021, oar: 58 }, { year: 2022, oar: 60 }, { year: 2023, oar: 61 },
  { year: 2024, oar: 62 }, { year: 2025, oar: 65.21 }, { year: 2026, oar: 64.26 },
];
export const OAR_TARGET = 66;

// === SECTION 4.3.1 · OAR Calculations (Slide 14) ===
export const OAR_CALC = {
  internal: [
    { ref: '(1)', label: 'Total service gross profit (GT370)',       op: '+', v: 232_900_515 },
    { ref:  '',   label: 'Total gross profit-parts (GT380)',          op: '+', v: 216_318_555 },
    { ref:  '',   label: 'Total gross profit-body  (GT400)',          op: '+', v:  47_848_075 },
    { ref: '(2)', label: 'After sales gross profit',                  op: '=', v: 497_067_145, isSub: true },
    { ref: '(3)', label: 'Total Expenses (T863)',                     op: '+', v: 1_025_272_759 },
    { ref:  '',   label: 'Total variables expenses-new (TA810)',      op: '-', v: 205_079_411 },
    { ref:  '',   label: 'Total variables expenses-semi new (TB810)', op: '-', v:  25_865_172 },
    { ref:  '',   label: 'Total variables expenses-F&I (TC810)',      op: '-', v:  20_820_057 },
    { ref: '(4)', label: 'Expenses w/o Var',                          op: '=', v: 773_508_120, isSub: true },
    { ref: 'OAR% = (2)/(4)', label: '',                               op: '=', v: '64.26%', isResult: true },
  ],
  withoutSI20: [
    { ref: '(1)', label: 'After sales gross profit',                op: '+', v: 497_067_145 },
    { ref: '(2)', label: 'Total Expenses (T863)',                   op: '+', v: 1_025_272_759 },
    { ref:  '',   label: 'Total variables (TA810/TB810/TC810)',     op: '-', v: 251_764_640 },
    { ref:  '',   label: 'Building Maintenance (804-A,B,C)',        op: '-', v:  10_616_080 },
    { ref:  '',   label: 'Installation costs (873)',                op: '-', v:     794_169 },
    { ref:  '',   label: 'Improvements to leased properties (875)', op: '-', v:   4_546_224 },
    { ref:  '',   label: 'Equipment Leasing (876)',                 op: '-', v:     895_408 },
    { ref:  '',   label: 'Building & improvements (880)',           op: '-', v:  15_970_565 },
    { ref:  '',   label: 'Machinery and equipment (881)',           op: '-', v:   5_852_754 },
    { ref:  '',   label: 'Furniture and Eq. Office (882)',          op: '-', v:   6_256_092 },
    { ref:  '',   label: 'Tools (885)',                             op: '-', v:     738_681 },
    { ref:  '',   label: 'Other Fixed Assets (886)',                op: '-', v:   7_468_007 },
    { ref: '(4)', label: 'Expenses w/o Var & SI 2.0',               op: '=', v: 720_370_139, isSub: true },
    { ref: 'OAR% = (2)/(4)', label: '',                             op: '=', v: '69.00%', isResult: true },
  ],
  delta: 53_137_981,
};

// === SECTION 4.4 · OAR Ranking per Group (Slide 15) ===
// 30 groups sorted by OAR
export const OAR_RANKING = [
  { rnk:  1, group: 'ALDEN (1 DLR)',         oar: 121.92, above: true },
  { rnk:  2, group: 'DALTON (5 DLR)',        oar: 107.35, above: true },
  { rnk:  3, group: 'SOLANA (2 DLR)',        oar:  78.19, above: true },
  { rnk:  4, group: 'TORRES CORZO (5 DLR)',  oar:  76.07, above: true },
  { rnk:  5, group: 'AUTOFIN (3 DLR)',       oar:  74.60, above: true },
  { rnk:  6, group: 'CLEBER (7 DLR)',        oar:  74.48, above: true },
  { rnk:  7, group: 'GEISHA (2 DLR)',        oar:  72.72, above: true },
  { rnk:  8, group: 'DAYTONA (2 DLR)',       oar:  71.14, above: true },
  { rnk:  9, group: 'HM AUTOMOTRIZ (3 DLR)', oar:  70.71, above: true },
  { rnk: 10, group: 'AUTOCOM (2 DLR)',       oar:  69.61, above: true },
  { rnk: 11, group: 'CONTINENTAL (2 DLR)',   oar:  66.34, above: true },
  { rnk: 12, group: 'KASA (2 DLR)',          oar:  65.50, above: false },
  { rnk: 13, group: 'CEVER (2 DLR)',         oar:  65.00, above: false },
  { rnk: 14, group: 'FAME (4 DLR)',          oar:  63.33, above: false },
  { rnk: 15, group: 'EXCELENCIA (5 DLR)',    oar:  60.66, above: false },
  { rnk: 16, group: 'CAMARENA (3 DLR)',      oar:  59.38, above: false },
  { rnk: 17, group: 'OPTIMA (3 DLR)',        oar:  59.10, above: false },
  { rnk: 18, group: 'GRUPO HG (2 DLR)',      oar:  58.99, above: false },
  { rnk: 19, group: 'MONTEJO (4 DLR)',       oar:  58.57, above: false },
  { rnk: 20, group: 'CARONE (5 DLR)',        oar:  57.59, above: false },
  { rnk: 21, group: 'PREMIER (6 DLR)',       oar:  57.05, above: false },
  { rnk: 22, group: 'FARRERA (7 DLR)',       oar:  56.40, above: false },
  { rnk: 23, group: 'BONN (5 DLR)',          oar:  55.57, above: false },
  { rnk: 24, group: 'PLATINO (2 DLR)',       oar:  54.78, above: false },
  { rnk: 25, group: 'PLASENCIA (6 DLR)',     oar:  53.69, above: false },
  { rnk: 26, group: 'VANGUARDIA (2 DLR)',    oar:  51.53, above: false },
  { rnk: 27, group: 'ZIGA (3 DLR)',          oar:  50.40, above: false },
  { rnk: 28, group: 'SATÉLITE (2 DLR)',      oar:  49.78, above: false, bottom: true },
  { rnk: 29, group: 'SONI (2 DLR)',          oar:  45.08, above: false, bottom: true },
  { rnk: 30, group: 'SURMAN (2 DLR)',        oar:  42.27, above: false, bottom: true },
];

// === SECTION 5.1 · P&L by Dealer Group — 30 groups (Slides 16-25) ===
// Each row: group P&L totals by Business Unit
export const PNL_BY_GROUP = [
  { rnk: '#1/30',  group: 'CLEBER',       owner: 'Eugenio Clariond',    dealers: 7,
    sales: 757_991_890, cost: 649_357_786, gm: 108_634_104, gmPct: 14.3, expPct: 9.6, opPct: 4.8, netPct: 3.7, netProfit: 27_812_988, units: 1537 },
  { rnk: '#2/30',  group: 'TORRES CORZO', owner: 'Gabriel Torres',      dealers: 5,
    sales: 661_082_136, cost: 588_403_407, gm:  72_678_728, gmPct: 11.0, expPct: 8.5, opPct: 2.5, netPct: 4.1, netProfit: 26_836_836, units: 1132 },
  { rnk: '#3/30',  group: 'CARONE',       owner: 'Adrian Osuna',        dealers: 5,
    sales: 621_419_638, cost: 516_925_373, gm: 104_494_265, gmPct: 16.8, expPct: 12.1, opPct: 4.7, netPct: 5.6, netProfit: 34_552_721, units: 1429 },
  { rnk: '#4/30',  group: 'DALTON',       owner: 'Salomón Chidán',      dealers: 5,
    sales: 563_264_896, cost: 475_483_041, gm:  87_781_855, gmPct: 15.6, expPct: 11.0, opPct: 4.5, netPct: 2.9, netProfit: 16_074_803, units: 1160 },
  { rnk: '#5/30',  group: 'FARRERA',      owner: 'Fernando Farrera',    dealers: 7,
    sales: 550_906_213, cost: 470_833_762, gm:  80_072_451, gmPct: 14.5, expPct: 10.9, opPct: 3.6, netPct: 2.6, netProfit: 14_596_660, units: 1292 },
  { rnk: '#6/30',  group: 'PLASENCIA',    owner: 'Eduardo Plasencia',   dealers: 6,
    sales: 451_831_449, cost: 383_361_427, gm:  68_470_022, gmPct: 15.2, expPct: 12.3, opPct: 2.9, netPct: 1.6, netProfit:  7_091_467, units:  949 },
  { rnk: '#7/30',  group: 'AUTOFIN',      owner: 'Juan Hernandez',      dealers: 3,
    sales: 409_597_895, cost: 356_098_107, gm:  53_499_788, gmPct: 13.1, expPct: 7.9,  opPct: 5.2, netPct: 4.6, netProfit: 18_868_415, units:  846 },
  { rnk: '#8/30',  group: 'EXCELENCIA',   owner: 'Ruben Contreras',     dealers: 5,
    sales: 358_049_663, cost: 309_188_483, gm:  48_861_180, gmPct: 13.6, expPct: 10.3, opPct: 3.4, netPct: 4.2, netProfit: 14_936_829, units:  678 },
  { rnk: '#9/30',  group: 'MONTEJO',      owner: 'Guillermo Diaz',      dealers: 4,
    sales: 354_083_838, cost: 300_805_145, gm:  53_278_693, gmPct: 15.0, expPct: 11.0, opPct: 4.1, netPct: 3.0, netProfit: 10_580_577, units:  795 },
  { rnk: '#10/30', group: 'GEISHA',       owner: 'Agustín Velasco',     dealers: 2,
    sales: 335_954_145, cost: 271_741_952, gm:  64_212_193, gmPct: 19.1, expPct: 10.3, opPct: 8.8, netPct: 7.6, netProfit: 25_566_005, units:  718 },
  { rnk: '#11/30', group: 'PREMIER',      owner: 'Santiago Gaxiola',    dealers: 6,
    sales: 327_223_943, cost: 268_087_486, gm:  59_136_457, gmPct: 18.1, expPct: 14.5, opPct: 3.6, netPct: 2.3, netProfit:  7_592_330, units:  733 },
  { rnk: '#12/30', group: 'OPTIMA',       owner: 'Salvador Gutierrez',  dealers: 3,
    sales: 281_324_911, cost: 230_001_550, gm:  51_323_361, gmPct: 18.2, expPct: 14.6, opPct: 3.6, netPct: 1.3, netProfit:  3_707_964, units:  584 },
  { rnk: '#13/30', group: 'HM AUTOMOTRIZ',owner: 'Munir Sobh',          dealers: 3,
    sales: 276_922_442, cost: 238_573_340, gm:  38_349_102, gmPct: 13.8, expPct: 8.8,  opPct: 5.1, netPct: 4.4, netProfit: 12_190_787, units:  586 },
  { rnk: '#14/30', group: 'CEVER',        owner: 'Cesar Verdes',        dealers: 2,
    sales: 273_711_228, cost: 237_220_585, gm:  36_490_643, gmPct: 13.3, expPct: 9.2,  opPct: 4.2, netPct: 3.2, netProfit:  8_774_718, units:  501 },
  { rnk: '#15/30', group: 'CAMARENA',     owner: 'Felipe Martin',       dealers: 3,
    sales: 269_903_045, cost: 229_714_066, gm:  40_188_979, gmPct: 14.9, expPct: 11.8, opPct: 3.1, netPct: 2.5, netProfit:  6_786_018, units:  544 },
  { rnk: '#16/30', group: 'VANGUARDIA',   owner: 'Ignacio Robles',      dealers: 2,
    sales: 263_543_858, cost: 228_537_357, gm:  35_006_501, gmPct: 13.3, expPct: 13.6, opPct: -0.3, netPct: 2.2, netProfit:  5_792_453, units:  495 },
  { rnk: '#17/30', group: 'ZIGA',         owner: 'Luis Rivero',         dealers: 3,
    sales: 260_783_741, cost: 225_342_985, gm:  35_440_756, gmPct: 13.6, expPct: 11.1, opPct: 2.5, netPct: 1.8, netProfit:  4_734_534, units:  588 },
  { rnk: '#18/30', group: 'SATÉLITE',     owner: 'Beny Schoenfeld',     dealers: 2,
    sales: 248_942_714, cost: 210_711_119, gm:  38_231_595, gmPct: 15.4, expPct: 12.0, opPct: 3.4, netPct: 1.1, netProfit:  2_662_647, units:  544 },
  { rnk: '#19/30', group: 'BONN',         owner: 'Jesus Rodriguez',     dealers: 5,
    sales: 240_724_915, cost: 217_408_935, gm:  23_315_980, gmPct: 9.7,  expPct: 9.9,  opPct: -0.2, netPct: 3.3, netProfit:  7_863_129, units:  607 },
  { rnk: '#20/30', group: 'SURMAN',       owner: 'Samir Mansur',        dealers: 2,
    sales: 215_957_329, cost: 186_359_759, gm:  29_597_570, gmPct: 13.7, expPct: 11.2, opPct: 2.5, netPct: 3.4, netProfit:  7_283_451, units:  372 },
  { rnk: '#21/30', group: 'KASA',         owner: 'Gil Sverdlin',        dealers: 2,
    sales: 212_099_974, cost: 181_596_403, gm:  30_503_570, gmPct: 14.4, expPct: 10.9, opPct: 3.4, netPct: 3.6, netProfit:  7_621_915, units:  429 },
  { rnk: '#22/30', group: 'DAYTONA',      owner: 'Juan Lecumberri',     dealers: 2,
    sales: 193_376_328, cost: 167_696_371, gm:  25_679_957, gmPct: 13.3, expPct: 11.5, opPct: 1.8, netPct: 3.6, netProfit:  6_894_205, units:  347 },
  { rnk: '#23/30', group: 'CONTINENTAL',  owner: 'Hector Mena',         dealers: 2,
    sales: 191_873_108, cost: 169_920_072, gm:  21_953_036, gmPct: 11.4, expPct: 10.4, opPct: 1.0, netPct: 0.1, netProfit:    179_383, units:  411 },
  { rnk: '#24/30', group: 'AUTOCOM',      owner: 'Manuel Garrido',      dealers: 2,
    sales: 177_956_613, cost: 149_448_193, gm:  28_508_420, gmPct: 16.0, expPct: 10.6, opPct: 5.4, netPct: 0.6, netProfit:  1_125_673, units:  367 },
  { rnk: '#25/30', group: 'ALDEN',        owner: 'Carlos Lopez',        dealers: 1,
    sales: 174_498_290, cost: 146_591_141, gm:  27_907_148, gmPct: 16.0, expPct: 8.0,  opPct: 7.9, netPct: 6.6, netProfit: 11_596_142, units:  345 },
  { rnk: '#26/30', group: 'SOLANA',       owner: 'Ernesto Solana',      dealers: 2,
    sales: 169_677_037, cost: 150_928_946, gm:  18_748_091, gmPct: 11.0, expPct: 7.3,  opPct: 3.8, netPct: 2.5, netProfit:  4_266_685, units:  412 },
  { rnk: '#27/30', group: 'FAME',         owner: 'Francisco Medina',    dealers: 4,
    sales: 164_652_271, cost: 141_782_102, gm:  22_870_168, gmPct: 13.9, expPct: 15.1, opPct: -1.3, netPct: 5.1, netProfit:  8_383_151, units:  370 },
  { rnk: '#28/30', group: 'GRUPO HG',     owner: 'Gabriel Haddad',      dealers: 2,
    sales: 154_879_984, cost: 124_570_701, gm:  30_309_283, gmPct: 19.6, expPct: 16.2, opPct: 3.3, netPct: 3.6, netProfit:  5_525_387, units:  342 },
  { rnk: '#29/30', group: 'SONI',         owner: 'Javier Marina',       dealers: 2,
    sales: 153_665_245, cost: 132_960_929, gm:  20_704_316, gmPct: 13.5, expPct: 9.7,  opPct: 3.8, netPct: 3.2, netProfit:  4_933_643, units:  275 },
  { rnk: '#30/30', group: 'PLATINO',      owner: 'Alvaro Porres',       dealers: 2,
    sales: 147_037_943, cost: 129_195_846, gm:  17_842_098, gmPct: 12.1, expPct: 8.9,  opPct: 3.2, netPct: 2.7, netProfit:  3_942_761, units:  339 },
];

// === SECTION 6.1 · Financial Performance Snapshot (Slide 27) ===
export const FIN_PERF_MXN = {
  ros: { mtdDec25: 2.80, mtdJan: 4.16, mtdFeb: 3.37, ytd: 3.37, yoy: -0.53, prevYtd: 3.90, prevFeb: 3.90, prevJan: 4.09, prevDec: 2.63 },
  rosMtd: { mtdDec25: 2.41, mtdJan: 4.16, mtdFeb: 2.41, prevFeb: 3.66, prevJan: 4.09, prevDec: 1.44 },
  oar: { mtdDec25: 61.71, mtdJan: 67.02, mtdFeb: 64.26, ytd: 64.26, yoy: -0.95, prevYtd: 65.21, prevFeb: 65.21, prevJan: 69.02, prevDec: 61.82 },
  oarMtd: { mtdDec25: 53.37, mtdJan: 67.02, mtdFeb: 60.77, prevFeb: 61.12, prevJan: 69.02, prevDec: 54.99 },
  loss:    { mtdDec25: '8/97',  mtdJan: '4/97',  mtdFeb: '5/100', ytd: '5/100', yoy: '+1', prevYtd: '4/98', prevFeb: '4/98', prevJan: '8/97', prevDec: '10/97' },
  lossMtd: { mtdDec25: '25/97', mtdJan: '4/97',  mtdFeb: '18/100', prevFeb: '8/98', prevJan: '8/97', prevDec: '32/97' },
  sales:       { dec25: 56_667_451, jan: 52_531_643, feb: 43_240_427, ytd: 95_772_070, yoy: 5.25, prevYtd: 90_998_746, prevFeb: 43_241_395, prevJan: 47_757_351, prevDec: 44_367_726 },
  gm:          { dec25:  7_073_806, jan:  7_631_484, feb:  6_259_273, ytd: 13_890_757, yoy: -0.10, prevYtd: 13_904_247, prevFeb:  6_607_205, prevJan:  7_297_042, prevDec:  5_693_413 },
  netProfit:   { dec25:  1_371_134, jan:  2_182_671, feb:  1_044_109, ytd:  3_226_780, yoy: -8.72, prevYtd:  3_534_946, prevFeb:  1_581_503, prevJan:  1_953_443, prevDec:    638_227 },
  totalExp:    { dec25:  5_445_995, jan:  5_358_867, feb:  5_012_583, ytd: 10_371_450, yoy: 7.32, prevYtd:  9_663_981, prevFeb:  4_777_790, prevJan:  4_886_191, prevDec:  4_576_133 },
  payroll:     { dec25:  1_721_681, jan:  1_785_116, feb:  1_669_628, ytd:  3_454_744, yoy: 4.43, prevYtd:  3_308_061, prevFeb:  1_664_835, prevJan:  1_643_225, prevDec:  1_562_256 },
  commissions: { dec25:  1_063_708, jan:  1_096_234, feb:    976_056, ytd:  2_072_290, yoy: 17.02, prevYtd:  1_770_894, prevFeb:    868_952, prevJan:    901_942, prevDec:    897_900 },
  finExp:      { dec25:    768_462, jan:    699_982, feb:    655_689, ytd:  1_355_671, yoy: -17.20, prevYtd:  1_637_244, prevFeb:    784_974, prevJan:    852_270, prevDec:    868_649 },
  floorPlan:   { dec25:    549_450, jan:    495_981, feb:    410_599, ytd:    906_580, yoy: -20.31, prevYtd:  1_137_624, prevFeb:    554_774, prevJan:    582_850, prevDec:    616_547 },
  interest:    { dec25:    169_639, jan:    120_486, feb:    170_534, ytd:    291_020, yoy: -12.15, prevYtd:    331_265, prevFeb:    159_343, prevJan:    171_922, prevDec:    176_937 },
};

export const FIN_PERF_INSIGHTS = [
  'KMX YTD: ROS 3.37% │ OAR 64.26% │ EBITDA 5.19%. Profitable Dealers 95% (95/100).',
  'Dealer in loss: 5/100 YTD · 18/100 MTD.',
  'Profit Feb -8.72% vs Feb 2025.',
  'Total Expenses +7.32% vs Feb 2025 YTD.',
  'Sales Commissions +17.02% vs Feb 2025.',
  'Financial Expenses -17.20% vs Feb 2025.',
  'YTD Net Loss (ROS): Kia Vision (OPTIMA) -13.56%, Kia Cabos (PREMIER) -3.16%, Kia Tlahuac (CONTINENTAL) -1.73%, Kia Cajeme (PREMIER) -1.58%, Kia Brisas (PLASENCIA) -1.01%.',
];

// === SECTION 7 · Financial Performance by Model (Slides 30-31) ===
export const PROFIT_BY_MODEL = [
  { model: 'K3',           feb26: 30.49, feb25: 24.25, yoy:  6.24 },
  { model: 'K4',           feb26: 13.66, feb25: 18.26, yoy: -4.60 },
  { model: 'Seltos',       feb26: 21.26, feb25: 16.64, yoy:  4.62 },
  { model: 'Sonet',        feb26: 11.48, feb25: 11.97, yoy: -0.49 },
  { model: 'K3 HB',        feb26:  9.87, feb25:  7.79, yoy:  2.08 },
  { model: 'Sportage',     feb26: 10.07, feb25: 10.23, yoy: -0.16 },
  { model: 'Sorento',      feb26:  2.66, feb25:  4.61, yoy: -1.95 },
  { model: 'Niro',         feb26:  0.67, feb25:  2.23, yoy: -1.56 },
  { model: 'Telluride',    feb26:  0.61, feb25:  1.64, yoy: -1.03 },
  { model: 'Sportage HEV', feb26:  2.33, feb25:  1.59, yoy:  0.74 },
  { model: 'Soul',         feb26: -0.02, feb25: null,  yoy: null },
  { model: 'EV6',          feb26: -2.70, feb25: null,  yoy: null },
];

// === SECTION 8 · Dealers in Loss Trend (Slide 32) ===
export const DEALERS_LOSS_TREND = [
  { period: 'Dec 24', count: 10, total: 97 },
  { period: 'Jan 25', count:  8, total: 97 },
  { period: 'Feb 25', count:  4, total: 98 },
  { period: 'Dec 25', count:  8, total: 97 },
  { period: 'Jan 26', count:  4, total: 97 },
  { period: 'Feb 26', count:  5, total: 100 },
];

// === SECTION 9 · BM KPI by Opening Stage (Slide 33) ===
export const BM_BY_STAGE = {
  averages: {
    s1: { ros: 4.11, oar: 74.53, count: 21 },
    s2: { ros: 3.33, oar: 62.72, count: 27 },
    s3: { ros: 2.93, oar: 58.49, count: 25 },
    s4: { ros: 2.88, oar: 59.05, count: 12 },
    s5: { ros: 1.39, oar: 72.35, count:  4 },
    s6: { ros: 3.13, oar: 55.32, count:  6 },
    s8_11: { ros: 2.89, oar: 22.47, count: 6 },
    national: { ros: 3.37, oar: 64.26 },
  },
  stage1: [
    { dlr: 'Kia Nova Qro',          ros: 8.03, oar:  77.74 },
    { dlr: 'Kia Satelite',          ros: 6.65, oar: 121.92 },
    { dlr: 'Kia Linda Vista',       ros: 6.14, oar:  56.90 },
    { dlr: 'Kia Interlomas',        ros: 5.55, oar:  85.36 },
    { dlr: 'Kia Angelopolis',       ros: 4.95, oar:  76.12 },
    { dlr: 'Kia Pedregal',          ros: 4.53, oar:  67.27 },
    { dlr: 'Kia Lopez Mateos',      ros: 4.39, oar: 131.59 },
    { dlr: 'Kia Vallejo',           ros: 4.37, oar:  73.29 },
    { dlr: 'Kia Del Valle',         ros: 4.29, oar:  75.34 },
    { dlr: 'Kia Ruiz Cortines',     ros: 4.14, oar:  67.04 },
    { dlr: 'Kia Valle Oriente',     ros: 3.60, oar:  46.90 },
    { dlr: 'Kia Lomas Verdes',      ros: 2.96, oar:  59.04 },
    { dlr: 'Kia Carretera 57',      ros: 2.82, oar:  94.95 },
    { dlr: 'Kia Santa Fe',          ros: 2.63, oar:  74.95 },
    { dlr: 'Kia Juventud',          ros: 2.60, oar:  61.22 },
    { dlr: 'Kia Patria',            ros: 2.45, oar:  61.36 },
    { dlr: 'Kia Galerias',          ros: 2.10, oar:  59.48 },
    { dlr: 'Kia Mariano Escobedo',  ros: 2.02, oar:  98.86 },
    { dlr: 'Kia Aeropuerto',        ros: 1.80, oar:  58.12 },
    { dlr: 'Kia Norte',             ros: 1.31, oar:  66.68 },
    { dlr: 'Kia Coapa',             ros: 1.01, oar:  77.37 },
  ],
};

// === SLIDE 2 — Yearly Results + MoM bars (4 KPIs) ===
// Each KPI: yearly bars (CY24, Feb24, CY25, Feb25, Feb26) + MoM bars (Feb25, Jan26, Feb26)
export const KPI_BARS = {
  ros: {
    yearly: [
      { label: 'CY 24',  value: 2.63, kind: 'lightgray' },
      { label: 'Feb 24', value: 3.94, kind: 'gray' },
      { label: 'CY 25',  value: 2.80, kind: 'lightgray' },
      { label: 'Feb 25', value: 3.90, kind: 'gray' },
      { label: 'Feb 26', value: 3.37, kind: 'black', current: true },
    ],
    target: { value: 2.80, label: 'Target \'26: 2.80%' },
    mom: [
      { label: 'Feb 25', value: 3.90, kind: 'lightgray' },
      { label: 'Jan 26', value: 4.16, kind: 'gray' },
      { label: 'Feb 26', value: 2.41, kind: 'black', current: true },
    ],
    yoyDelta: -0.53, momDelta: -1.75,
  },
  ebitda: {
    yearly: [
      { label: 'CY 24',  value: 4.79, kind: 'lightgray' },
      { label: 'Feb 24', value: 5.72, kind: 'gray' },
      { label: 'CY 25',  value: 4.74, kind: 'lightgray' },
      { label: 'Feb 25', value: 6.04, kind: 'gray' },
      { label: 'Feb 26', value: 5.16, kind: 'black', current: true },
    ],
    target: null,
    mom: [
      { label: 'Feb 25', value: 6.04, kind: 'lightgray' },
      { label: 'Jan 26', value: 5.79, kind: 'gray' },
      { label: 'Feb 26', value: 4.34, kind: 'black', current: true },
    ],
    yoyDelta: -0.88, momDelta: -1.45,
  },
  oar: {
    yearly: [
      { label: 'CY 24',  value: 61.82, kind: 'lightgray' },
      { label: 'Feb 24', value: 64.82, kind: 'gray' },
      { label: 'CY 25',  value: 61.71, kind: 'lightgray' },
      { label: 'Feb 25', value: 65.21, kind: 'gray' },
      { label: 'Feb 26', value: 64.26, kind: 'black', current: true },
    ],
    target: { value: 66, label: 'Target \'26: 66%' },
    mom: [
      { label: 'Feb 25', value: 65.21, kind: 'lightgray' },
      { label: 'Jan 26', value: 67.02, kind: 'gray' },
      { label: 'Feb 26', value: 60.77, kind: 'black', current: true },
    ],
    yoyDelta: -0.95, momDelta: -6.25,
  },
  profit: {
    yearly: [
      { label: '2021', value: 12_193, kind: 'lightgray' },
      { label: '2022', value: 16_482, kind: 'gray' },
      { label: '2023', value: 18_709, kind: 'gray' },
      { label: '2024', value: 14_357, kind: 'gray' },
      { label: '2025', value: 16_481, kind: 'gray' },
      { label: 'Feb 26 (YTD)', value: 3_534, kind: 'lightgray', sub: '(YTD)' },
      { label: 'Feb 26 (M)',   value: 3_226, kind: 'black', sub: '(M Avg)', current: true },
    ],
    target: null,
    mom: [
      { label: 'Feb 25', value: 1_581, kind: 'lightgray' },
      { label: 'Jan 26', value: 2_182, kind: 'gray' },
      { label: 'Feb 26', value: 1_044, kind: 'black', current: true },
    ],
    yoyDelta: -8.71, momDelta: -52.15,
    note: 'Net Profit before taxes · 1,000 MXN',
  },
};

// === WATERFALL data for P&L MTD (Slide 3) ===
// Steps from Gross Margin → Net Profit
export const WATERFALL_MTD = {
  startLabel: 'Gross Margin',
  startValue: 625_927,
  steps: [
    { label: 'Variable Selling Exp',  delta: -150_914,  kind: 'down' },
    { label: 'Staff',                  delta: -166_963,  kind: 'down' },
    { label: 'Semi-Fixed',             delta:  -69_150,  kind: 'down' },
    { label: 'Fixed Expenses',         delta:  -87_774,  kind: 'down' },
    { label: 'Amort + Dep',            delta:  -26_457,  kind: 'down' },
    { label: 'Operating Profit',       valueOverride: 124_669, kind: 'subtotal' },
    { label: 'Other Incs / Exps',      delta:  +36_472,  kind: 'up' },
    { label: 'EBIT',                   valueOverride: 161_141, kind: 'subtotal' },
    { label: 'Finance Exps',           delta:  -56_731,  kind: 'down' },
    { label: 'Net Profit',             valueOverride: 104_411, kind: 'final' },
  ],
  totalExpensesLabel: '501,257 Expenses',
  totalExpenses: 501_257,
  note: '*Only include labour and paint material',
  unit: '1,000 MXN',
};

export const WATERFALL_YTD = {
  startLabel: 'Gross Margin',
  startValue: 1_373_813,
  steps: [
    { label: 'Variable Selling Exp',  delta: -302_713,  kind: 'down' },
    { label: 'Staff',                  delta: -341_904,  kind: 'down' },
    { label: 'Semi-Fixed',             delta: -146_613,  kind: 'down' },
    { label: 'Fixed Expenses',         delta: -182_707,  kind: 'down' },
    { label: 'Amort + Dep',            delta:  -52_490,  kind: 'down' },
    { label: 'Operating Profit',       valueOverride: 347_385, kind: 'subtotal' },
    { label: 'Other Incs / Exps',      delta:  +85_565,  kind: 'up' },
    { label: 'EBIT',                   valueOverride: 432_950, kind: 'subtotal' },
    { label: 'Finance Exps',           delta: -114_638,  kind: 'down' },
    { label: 'Net Profit',             valueOverride: 318_313, kind: 'final' },
  ],
  totalExpensesLabel: '1,026,427 Expenses',
  totalExpenses: 1_026_427,
  unit: '1,000 MXN',
};

// === Slide 6 — Revenue/GP Mix by Year (stacked columns) ===
export const REVENUE_MIX_BY_YEAR = [
  // Year row × 6 BUs (in percentage)
  { year: '2022',    new: 75.0, used:  9.1, fi: 2.0, parts: 10.5, service: 2.3, body: 1.1 },
  { year: '2023',    new: 77.2, used:  8.0, fi: 2.1, parts:  9.4, service: 2.2, body: 1.0 },
  { year: '2024',    new: 79.4, used:  7.0, fi: 1.9, parts:  7.6, service: 3.3, body: 0.8 },
  { year: '2025',    new: 80.0, used:  6.9, fi: 2.0, parts:  6.9, service: 3.4, body: 0.8 },
  { year: 'Feb 2026',new: 78.1, used:  7.2, fi: 3.0, parts:  7.6, service: 3.0, body: 1.0 },
];

export const GP_MIX_BY_YEAR = [
  { year: '2022',    new: 42.3, used:  9.1, fi: 14.8, parts: 16.8, service: 13.9, body: 3.1 },
  { year: '2023',    new: 44.6, used:  8.0, fi: 13.9, parts: 16.1, service: 14.2, body: 3.2 },
  { year: '2024',    new: 42.3, used:  7.0, fi: 15.3, parts: 17.2, service: 15.4, body: 2.8 },
  { year: '2025',    new: 41.5, used:  6.6, fi: 16.6, parts: 17.4, service: 15.0, body: 2.8 },
  { year: 'Feb 2026',new: 37.9, used:  6.9, fi: 19.1, parts: 16.9, service: 15.7, body: 3.5 },
];

// === Slide 5 — Horizontal bar of P&L variation YoY ===
export const PNL_VARIATION = [
  { label: 'Total Sales',          pct:  7.84, color: 'blue' },
  { label: 'Sales Cost',           pct:  8.83, color: 'blue' },
  { label: 'Gross Profit',         pct:  2.36, color: 'blue' },
  { label: 'Variable',             pct: 17.88, color: 'blue', group: 'expenses' },
  { label: 'Staff',                pct:  7.11, color: 'blue', group: 'expenses' },
  { label: 'Semi-Fixed',           pct:  6.59, color: 'blue', group: 'expenses' },
  { label: 'Fixed',                pct:  7.84, color: 'blue', group: 'expenses' },
  { label: 'Amortization',         pct:  6.52, color: 'blue', group: 'expenses' },
  { label: 'Depreciation',         pct:  5.57, color: 'blue', group: 'expenses' },
  { label: 'Total Expenses',       pct: 10.06, color: 'blue' },
  { label: 'Operating Profit',     pct:-15.16, color: 'green' },
  { label: 'Profit Before Taxes',  pct: -6.74, color: 'amber' },
];

// === Slide 7 — ROS Monthly (Bar + Line combo) ===
// Bars: MTD ROS for each year. Lines: YTD ROS cumulative.
export const ROS_MONTHLY = {
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  bars: {
    y2024: [4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],         // light gray
    y2025: [4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3],         // mid gray
    y2026: [4, 2, null, null, null, null, null, null, null, null, null, null], // black current
  },
  lines: {
    y2024: [4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    y2025: [4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3],
    y2026: [4.16, 3.37, null, null, null, null, null, null, null, null, null, null],
  },
  yMax: 6,
};

// === Slide 8 — ROS Trends (labeled line) ===
// Already in ROS_TRENDS but with full historical labels:
export const ROS_TRENDS_LABELED = [
  { year: '2015',   value: 0.83 },
  { year: '2016',   value: 1.31 },
  { year: '2017',   value: 0.42 },
  { year: '2018',   value: 1.41 },
  { year: '2019',   value: 1.61 },
  { year: '2020',   value: 1.72 },
  { year: '2021',   value: 3.36 },
  { year: '2022',   value: 4.27 },
  { year: '2023',   value: 3.85 },
  { year: '2024',   value: 2.63 },
  { year: '2025',   value: 2.80 },
  { year: 'Feb 26', value: 3.37, current: true },
];

// === Slide 11 — OAR Monthly (Bar + Line combo) ===
export const OAR_MONTHLY = {
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  bars: {
    y2024: [66, 61, 64, 70, 63, 64, 66, 63, 57, 62, 57, 55],
    y2025: [69, 61, 63, 63, 62, 63, 64, 63, 61, 61, 59, 53],
    y2026: [67, 61, null, null, null, null, null, null, null, null, null, null],
  },
  lines: {
    y2024: [69, 67, 65, 65, 65, 65, 65, 64, 63, 63, 63, 62],
    y2025: [69, 65, 65, 64, 64, 64, 64, 64, 63, 63, 63, 62],
    y2026: [67.02, 64.26, null, null, null, null, null, null, null, null, null, null],
  },
  yMax: 80,
};

// === Slide 12 — OAR Trends labeled ===
export const OAR_TRENDS_LABELED = [
  { year: '2015',   value: 1.96 },
  { year: '2016',   value: 8.75 },
  { year: '2017',   value: 19.68 },
  { year: '2018',   value: 28.40 },
  { year: '2019',   value: 38.16 },
  { year: '2020',   value: 45.08 },
  { year: '2021',   value: 51.11 },
  { year: '2022',   value: 57.75 },
  { year: '2023',   value: 60.94 },
  { year: '2024',   value: 61.82 },
  { year: '2025',   value: 61.71 },
  { year: 'Feb 26', value: 64.26, current: true },
];

// === Slide 13 — OAR Internal Stacked Bars ===
export const OAR_INTERNAL = {
  expenses: {
    total: 1_025_272,
    blocks: [
      { label: 'Variable Expenses new',      value: 205_079, color: '#a8a8a8' },
      { label: 'Variable Expenses semi-new', value:  25_865, color: '#bababa' },
      { label: 'Variable expenses F&I',      value:  20_820, color: '#cacaca' },
      { label: 'Expenses w/o Variables',     value: 773_508, color: '#6e6e6e', isResult: true },
    ],
  },
  afterSales: {
    total: 497_067,
    blocks: [
      { label: 'Total gross profit Body (GT400)',  value:  47_848, color: '#a8a8a8' },
      { label: 'Total gross profit Parts (GT380)', value: 216_318, color: '#bababa' },
      { label: 'Total Service gross profit (GT370)', value: 232_900, color: '#cacaca' },
    ],
  },
  result: 64.26,
};

// === Slide 30 — Profit by Model (combo: bars + line) ===
export const PROFIT_MODEL_DETAIL = [
  { model: 'K3',           operationProfit: 22_275, netProfit: 18_877, distribution: 30.49 },
  { model: 'K4',           operationProfit: 43_639, netProfit: 36_982, distribution: 13.66 },
  { model: 'Seltos',       operationProfit: 42_108, netProfit: 35_685, distribution: 21.26 },
  { model: 'Sonet',        operationProfit: 33_076, netProfit: 28_030, distribution: 11.48 },
  { model: 'K3 HB',        operationProfit: 41_018, netProfit: 34_761, distribution:  9.87 },
  { model: 'Sportage',     operationProfit: 64_468, netProfit: 54_634, distribution: 10.07 },
  { model: 'Sorento',      operationProfit: 63_219, netProfit: 53_575, distribution:  2.66 },
  { model: 'Niro',         operationProfit: 32_871, netProfit: 27_857, distribution:  0.67 },
  { model: 'Telluride',    operationProfit: 66_947, netProfit: 56_735, distribution:  0.61 },
  { model: 'Sportage HEV', operationProfit: 64_134, netProfit: 54_351, distribution:  2.33 },
];

// === Slide 31 — YoY Operating Profit per Model ===
export const MODEL_YOY = [
  { model: 'K3',           opFeb25: 23_197, opFeb26: 22_275, varPct:  6.24 },
  { model: 'K4',           opFeb25: 43_663, opFeb26: 43_639, varPct: -4.60 },
  { model: 'Seltos',       opFeb25: 39_337, opFeb26: 42_108, varPct:  4.62 },
  { model: 'Sonet',        opFeb25: 35_559, opFeb26: 33_076, varPct: -0.49 },
  { model: 'K3 HB',        opFeb25: 29_586, opFeb26: 41_018, varPct:  2.08 },
  { model: 'Sportage',     opFeb25: 58_137, opFeb26: 64_468, varPct: -0.16 },
  { model: 'Sorento',      opFeb25: 75_545, opFeb26: 63_219, varPct: -1.95 },
  { model: 'Niro',         opFeb25: 57_707, opFeb26: 32_871, varPct: -1.56 },
  { model: 'Telluride',    opFeb25:114_508, opFeb26: 66_947, varPct: -1.03 },
  { model: 'Sportage HEV', opFeb25:210_312, opFeb26: 64_134, varPct:  0.74 },
];

// === Slide 32 — Dealers in Loss by month (bars + lines) ===
export const LOSS_BY_MONTH = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  // 2025 MTD values (light gray bars), 2026 MTD (black bars - only Jan/Feb actual)
  mtd2025: [8, 8, 13, 22, 18, 15, 12, 11, 31, 15, 12, 25],
  mtd2026: [4, 18, null, null, null, null, null, null, null, null, null, null],
  // YTD lines
  ytd2025: [8, 4, 4, 7, 9, 10, 7, 6, 7, 7, 7, 8],
  ytd2026: [4, 5, null, null, null, null, null, null, null, null, null, null],
};

// === EXECUTIVE COMMENTARY (Slide 26 + 32 narrative) ===
export const EXEC_COMMENTARY = {
  bizUnits: [
    'El gross margin de Used (13.5%) supera al de New (6.9%) — palanca de mix.',
    'Áreas de mejora en Used: DALTON, CONTINENTAL, SOLANA.',
    'Áreas de mejora en Service: CLEBER, SONI.',
  ],
  highlights: [
    'KMX Network Profit YTD -8.72% vs 2025 a pesar de +7.84% en Sales.',
    'Variable Expenses crecieron +17.88% YoY — apretando Net Profit a pesar de la línea superior.',
    'Floor Plan -20.31% y Financial Expenses -17.20% son palancas positivas.',
    'Top 3 dealers en loss MTD: Kia Vision (-12.67%), Kia Bajio (-7.73%), Kia Cuautitlan (-6.14%).',
  ],
  rosNarrative: 'ROS pico 2022 (4.27%) por demanda post-pandemia. SI 2.0 inversiones desde 2022 atenúan ROS gradualmente. KMX gira a crecimiento positivo y va a alcanzar target 2.90%.',
  oarNarrative: 'OAR creció constante desde el inicio de KMX. Tras llegar a 62% en 2024, el crecimiento se frena temporalmente por inversión SI 2.0. KMX impulsa OAR vía service marketing y mejora en retention para llegar a 66%.',
};
