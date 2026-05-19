// Source data from the National KIA YTD statement.
export const COMPANY = {
  totalSales: 544_992_476, totalCost: 467_760_295,
  grossProfit: 77_232_181, operatingProfit: 20_861_234,
  ebit: 22_929_408, netProfit: 7_210_480,
  grossMargin: 0.142, operatingMargin: 0.038, netMargin: 0.013,
};
export const BUSINESS_LINES = [
  { id: 'new',    name: 'New Vehicles',  sales: 432_830_312, cost: 400_115_160, gp: 32_715_152, op: 23_649,    units: 1039 },
  { id: 'po',     name: 'Pre-Owned',     sales: 41_382_159,  cost: 35_986_312,  gp: 5_395_847,  op: 1_111_983, units: 130 },
  { id: 'fi',     name: 'F&I',           sales: 12_593_400,  cost: 819_192,     gp: 11_774_208, op: 8_074_255, units: null },
  { id: 'parts',  name: 'Parts',         sales: 37_566_306,  cost: 25_704_364,  gp: 11_861_942, op: 8_453_344, units: null },
  { id: 'service',name: 'Service',       sales: 16_182_949,  cost: 2_872_226,   gp: 13_310_723, op: 3_058_328, units: 14328 },
  { id: 'body',   name: 'Body & Paint',  sales: 4_437_351,   cost: 2_263_042,   gp: 2_174_309,  op: 226_491,   units: 453 },
];
export const BALANCE_SHEET = {
  totalAssets: 144_622_757, currentAssets: 111_919_963, fixedAssets: 35_946_171,
  totalLiabilities: 93_376_141, currentLiabilities: 85_507_812, totalEquity: 51_246_616,
  workingCapital: 26_412_151, inventory: 32_767_330, accountsReceivable: 42_731_361,
};
export const RATIOS = {
  currentRatio: 1.31, quickRatio: 0.93, debtEquity: 1.82, roe: 0.141, roa: 0.0499,
};
