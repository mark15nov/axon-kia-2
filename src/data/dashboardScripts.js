// Bootstraps Chart.js charts, tab switching, ticker tape and translate toggle.
import Chart from 'chart.js/auto';

export function bootstrapDashboard() {
  if (typeof window === 'undefined') return;
  window.Chart = Chart;

  // --- block 1 ---
  try {
    
    // ============================================================
    // CHART.JS GLOBAL DEFAULTS (Bloomberg/KIA aesthetic)
    // ============================================================
    Chart.defaults.font.family = 'Arial, "Helvetica Neue", Helvetica, sans-serif';
    Chart.defaults.font.size = 10.5;
    Chart.defaults.font.weight = '600';
    Chart.defaults.color = '#374151';
    Chart.defaults.borderColor = '#E5E7EB';
    Chart.defaults.scale.grid.color = '#F0F2F5';
    Chart.defaults.scale.grid.lineWidth = 1;
    Chart.defaults.scale.grid.drawTicks = false;
    Chart.defaults.scale.border = { display: false };
    Chart.defaults.scale.ticks.padding = 8;
    Chart.defaults.scale.ticks.color = '#6B7280';
    Chart.defaults.elements.bar.borderRadius = 0;
    Chart.defaults.elements.bar.borderWidth = 0;
    Chart.defaults.elements.line.tension = 0;
    Chart.defaults.elements.line.borderWidth = 1.5;
    Chart.defaults.elements.point.radius = 0;
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.plugins.legend.labels.boxWidth = 8;
    Chart.defaults.plugins.legend.labels.boxHeight = 8;
    Chart.defaults.plugins.legend.labels.padding = 12;
    Chart.defaults.plugins.legend.labels.font = { size: 9.5, weight: '700', family: 'inherit' };
    Chart.defaults.plugins.tooltip.backgroundColor = '#05141F';
    Chart.defaults.plugins.tooltip.titleColor = '#FFFFFF';
    Chart.defaults.plugins.tooltip.bodyColor = '#FFFFFF';
    Chart.defaults.plugins.tooltip.titleFont = { size: 10, weight: '700', family: 'inherit' };
    Chart.defaults.plugins.tooltip.bodyFont = { size: 11, weight: '600', family: 'inherit' };
    Chart.defaults.plugins.tooltip.padding = 10;
    Chart.defaults.plugins.tooltip.cornerRadius = 0;
    Chart.defaults.plugins.tooltip.boxPadding = 4;
    Chart.defaults.plugins.tooltip.borderColor = '#BB162B';
    Chart.defaults.plugins.tooltip.borderWidth = 0;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.titleMarginBottom = 6;
    Chart.defaults.layout.padding = { top: 4, right: 4, bottom: 0, left: 0 };
    
    // KIA palette for charts
    const KIA_PALETTE = ['#05141F','#BB162B','#2C5F8D','#6B7280','#00875A','#FF8B00','#8E44AD'];
    
    // ============================================================
    // TAB SWITCHING
    // ============================================================
    const bgChartsBuilt = { built: false };
    const profChartsBuilt = { built: false };
    
    function activateTab(tabId) {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      const tabBtn = document.querySelector(`.tab[data-tab="${tabId}"]`);
      if (tabBtn) tabBtn.classList.add("active");
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (tabId === "tab3" && !bgChartsBuilt.built) { buildBGCharts(); bgChartsBuilt.built = true; }
    }
    
    document.querySelectorAll(".tab").forEach(btn => {
      btn.addEventListener("click", () => activateTab(btn.dataset.tab));
    });
    
    // Scroll buttons (money-btn inside boxes)
    document.querySelectorAll("[data-scroll]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.scroll);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    
    // ============================================================
    // SHARED HELPERS
    // ============================================================
    const fmtMoney = (v) => {
      if (v === 0) return "$0";
      const abs = Math.abs(v);
      let s;
      if (abs >= 1e9) s = "$" + (v/1e9).toFixed(2) + "B";
      else if (abs >= 1e6) s = "$" + (v/1e6).toFixed(2) + "M";
      else if (abs >= 1e3) s = "$" + (v/1e3).toFixed(1) + "K";
      else s = "$" + v.toFixed(0);
      return v < 0 ? "(" + s.replace("-","") + ")" : s;
    };
    const fmtMillion = (v) => "$" + (v/1e6).toFixed(1) + "M";
    const fmtPct = (v) => (v*100).toFixed(1) + "%";
    const fmtFull = (v) => "$" + Math.round(v).toLocaleString("en-US");
    const fmtNum = (v) => v.toLocaleString("en-US");
    const COLORS = ["#05141F","#BB162B","#2C5F8D","#6B7280","#00875A","#FF8B00","#8E44AD","#374151"];
    
    // ============================================================
    // TAB 1 CHARTS
    // ============================================================
    const lineLabels = ["New Vehicles","Pre-Owned","F&I","Parts","Service","Body & Paint"];
    
    // ============================================================
    // TAB 2 — P&L DRILL-DOWN
    // ============================================================
    const PL1 = {
      total_mtd:    { sales:482904738, cost:408896757, gp:74007981, varE:14756152, staff:17079456, semi:7846045,  fixed:9880379,  bonus:20404, amort:610311, deprec:2071267, exp:52264014, op:21556530 },
      total_ytd:    { sales:544992476, cost:467760295, gp:77232181, varE:15270703, staff:18814340, semi:8479406,  fixed:10544396, bonus:19968, amort:671820, deprec:2304613, exp:56105246, op:20861234 },
      new_mtd:      { sales:372756525, cost:339770294, gp:32986231, varE:9210019,  staff:8210147,  semi:4645880,  fixed:5781637,  bonus:5547,  amort:349688, deprec:1107397, exp:29310315, op:3702927 },
      new_ytd:      { sales:432830312, cost:400115160, gp:32715152, varE:10016569, staff:9110928,  semi:5327905,  fixed:6457104,  bonus:4426,  amort:365503, deprec:1258821, exp:32541256, op:23649 },
      preowned_mtd: { sales:45405598,  cost:39522030,  gp:5883568,  varE:1394254,  staff:1163257,  semi:704453,   fixed:893590,   bonus:709,   amort:42953,  deprec:79951,   exp:4279167,  op:1617764 },
      preowned_ytd: { sales:41382159,  cost:35986312,  gp:5395847,  varE:1349449,  staff:1208753,  semi:651541,   fixed:910185,   bonus:835,   amort:48458,  deprec:94126,   exp:4263347,  op:1111983 },
      fi_mtd:       { sales:10764558,  cost:461916,    gp:10302642, varE:1130056,  staff:1293760,  semi:320115,   fixed:690784,   bonus:3870,  amort:38590,  deprec:257863,  exp:3735038,  op:6583749 },
      fi_ytd:       { sales:12593400,  cost:819192,    gp:11774208, varE:907278,   staff:1355773,  semi:320555,   fixed:720465,   bonus:5590,  amort:69053,  deprec:314841,  exp:3693555,  op:8074255 }
    };
    const PL1_LABELS = { total_mtd:"TOTAL MTD", total_ytd:"TOTAL YTD", new_mtd:"A — NEW MTD", new_ytd:"A — NEW YTD", fi_mtd:"C — F&I MTD", fi_ytd:"C — F&I YTD" };
    
    function computeTotal(rows) {
      const out = {};
      ["sales","cost","gp","varE","staff","semi","fixed","bonus","amort","deprec","exp","op"].forEach(k => {
        out[k] = rows.reduce((a,r) => a + r[k], 0);
      });
      return out;
    }
    const PL2_BASE = {
      parts_mtd:   { sales:34205844, cost:23699760, gp:10506084, varE:580797,  staff:1073879, semi:578587,  fixed:804851,  bonus:1075, amort:63181,  deprec:136563, exp:3238933,  op:7267151 },
      parts_ytd:   { sales:37566306, cost:25704364, gp:11861942, varE:665911,  staff:1198877, semi:508255,  fixed:830712,  bonus:1290, amort:59230,  deprec:144323, exp:3408598,  op:8453344 },
      service_mtd: { sales:14989908, cost:3040009,  gp:11949899, varE:2183912, staff:4597854, semi:1386892, fixed:1342995, bonus:8621, amort:98203,  deprec:397794, exp:10016271, op:1933628 },
      service_ytd: { sales:16182949, cost:2872226,  gp:13310723, varE:2056827, staff:4955914, semi:1421393, fixed:1281582, bonus:7316, amort:98925,  deprec:430438, exp:10252395, op:3058328 },
      body_mtd:    { sales:4782304,  cost:2402748,  gp:2379556,  varE:307247,  staff:906631,  semi:231895,  fixed:375383,  bonus:582,  amort:32762,  deprec:65204,  exp:1919704,  op:459852 },
      body_ytd:    { sales:4437351,  cost:2263042,  gp:2174309,  varE:276408,  staff:984094,  semi:249753,  fixed:344350,  bonus:511,  amort:30654,  deprec:62048,  exp:1947818,  op:226491 }
    };
    const PL2 = { ...PL2_BASE,
      total_mtd: computeTotal([PL2_BASE.parts_mtd, PL2_BASE.service_mtd, PL2_BASE.body_mtd]),
      total_ytd: computeTotal([PL2_BASE.parts_ytd, PL2_BASE.service_ytd, PL2_BASE.body_ytd])
    };
    const PL2_LABELS = { total_mtd:"TOTAL MTD", total_ytd:"TOTAL YTD", parts_mtd:"D — PARTS MTD", parts_ytd:"D — PARTS YTD", service_mtd:"E — SERVICE MTD", service_ytd:"E — SERVICE YTD", body_mtd:"F — BODY & PAINT MTD", body_ytd:"F — BODY & PAINT YTD" };
    
    // SVG icons
    const ICONS = {
      sales:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v0M6 14v0M18 10v0M18 14v0"/></svg>',
      cost:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12h8"/></svg>',
      gp:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
      exp:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>',
      op:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>',
      varE:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M12 3a9 9 0 0 1 9 9h-9z"/></svg>',
      staff:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="9" r="2.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.8"/></svg>',
      fix:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>'
    };
    
    // KPI metadata: simulated YoY%, target%, gauge range, inverted flag, color class
    const KPI_DEFS = [
      { id:"sales", key:"sales",  label:"Total Sales",        color:"",       yoy:12.9, target:15, range:[-5,30],  inverted:false, icon:"sales" },
      { id:"cost",  key:"cost",   label:"Sales Cost",         color:"orange", yoy:11.5, target:10, range:[-5,30],  inverted:true,  icon:"cost"  },
      { id:"gp",    key:"gp",     label:"Gross Profit",       color:"teal",   yoy: 9.1, target:12, range:[-5,30],  inverted:false, icon:"gp"    },
      { id:"exp",   key:"exp",    label:"Total Expenses",     color:"orange", yoy: 7.4, target: 5, range:[-10,25], inverted:true,  icon:"exp"   },
      { id:"op",    key:"op",     label:"Operating Profit",   color:"green",  yoy:-3.2, target:10, range:[-25,25], inverted:false, icon:"op"    },
      { id:"var",   key:"varE",   label:"Variable Expenses",  color:"",       yoy: 3.5, target: 0, range:[-15,20], inverted:true,  icon:"varE"  },
      { id:"staff", key:"staff",  label:"Personnel (Staff)",  color:"purple", yoy:10.2, target: 8, range:[-5,25],  inverted:true,  icon:"staff" },
      { id:"fix",   key:"_fix",   label:"Semi-Fixed + Fixed", color:"",       yoy: 6.5, target: 5, range:[-10,20], inverted:true,  icon:"fix"   }
    ];
    
    // Deterministic simulated YoY % — same view+kpi always returns same number (so toggling is consistent)
    const SIM_YOY_CACHE = {};
    function getSimYoY(view, kpiId, baseYoY, range) {
      const key = view + "::" + kpiId;
      if (SIM_YOY_CACHE[key] != null) return SIM_YOY_CACHE[key];
      // simple deterministic hash
      let h = 0;
      for (let i = 0; i < key.length; i++) { h = ((h << 5) - h) + key.charCodeAt(i); h |= 0; }
      const r = Math.abs((h * 9301 + 49297) % 233280) / 233280;
      // swing range: ±14 around base, but keep inside gauge range
      let sim = baseYoY + (r * 28 - 14);
      // clamp to gauge range with a small margin
      const lo = range[0] + 1.5, hi = range[1] - 1.5;
      if (sim < lo) sim = lo + r * 4;
      if (sim > hi) sim = hi - r * 4;
      SIM_YOY_CACHE[key] = Math.round(sim * 10) / 10;
      return SIM_YOY_CACHE[key];
    }
    
    // Simulated target % per view — varies slightly so the triangle marker moves with the line
    const SIM_TARGET_CACHE = {};
    function getSimTarget(view, kpiId, baseTarget, range) {
      const key = "tgt:" + view + "::" + kpiId;
      if (SIM_TARGET_CACHE[key] != null) return SIM_TARGET_CACHE[key];
      let h = 0;
      for (let i = 0; i < key.length; i++) { h = ((h << 5) - h) + key.charCodeAt(i); h |= 0; }
      const r = Math.abs((h * 9301 + 49297) % 233280) / 233280;
      // Smaller swing for target: ±4 around base
      let t = baseTarget + (r * 8 - 4);
      // Clamp to range with margin
      const lo = range[0] + 2, hi = range[1] - 2;
      if (t < lo) t = lo + r * 3;
      if (t > hi) t = hi - r * 3;
      SIM_TARGET_CACHE[key] = Math.round(t * 10) / 10;
      return SIM_TARGET_CACHE[key];
    }
    
    function clampPct(x){ return Math.max(2, Math.min(98, x)); }
    
    
    // Count-up animation for KPI value changes
    function tweenNumber(el, target, fmt, durationMs) {
      durationMs = durationMs || 650;
      const from = parseFloat(el.dataset.num);
      const start = isFinite(from) ? from : target * 0.85;
      el.dataset.num = target;
      const t0 = performance.now();
      function frame(now) {
        const p = Math.min((now - t0) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const cur = start + (target - start) * eased;
        el.textContent = fmt(cur);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    
    function buildKPICard(prefix, def, period, view) {
      const sim = getSimYoY(view, def.id, def.yoy, def.range);
      const yoySign = sim >= 0 ? "+" : "";
      const versus = period === "mtd" ? "vs MA" : "vs YA";
      const pos = clampPct(((sim - def.range[0]) / (def.range[1] - def.range[0])) * 100);
      const simTgt = getSimTarget(view, def.id, def.target, def.range);
      const targetPos = clampPct(((simTgt - def.range[0]) / (def.range[1] - def.range[0])) * 100);
      const barClass = def.inverted ? "gauge-bar inverted" : "gauge-bar";
      // Status traffic light: distance from target — color of LED, delta text, and gauge marker all share it
      const diff = def.inverted ? (simTgt - sim) : (sim - simTgt);
      let status = "alert";
      if (diff >= 0) status = "ok";
      else if (diff >= -5) status = "warn";
      return `
        <div class="kpi">
          <span class="kpi-status ${status}" title="${status === 'ok' ? 'On target' : status === 'warn' ? 'Watchlist' : 'Below target'}"></span>
          <div class="kpi-label">${def.label}</div>
          <div class="kpi-value ${def.color}" id="${prefix}-${def.id}">—</div>
          <div class="kpi-yoy ${status}">${yoySign}${sim.toFixed(1)}% ${versus}</div>
          <div class="kpi-sub" id="${prefix}-${def.id}-sub"></div>
        </div>
      `;
    }
    
    function renderPL(prefix, dataSet, labels, btnsId, chartRef) {
      const grp = document.getElementById(btnsId);
      const active = grp.querySelector(".view-btn.active");
      const val = active ? active.dataset.val : Object.keys(dataSet)[0];
      const d = dataSet[val];
      const period = val.endsWith("_mtd") ? "mtd" : "ytd";
      const $ = (id) => document.getElementById(id);
    
      // Rebuild KPI cards on every view change (so deltas & gauges animate too)
      const grid = $(`${prefix}-kpis`);
      if (grid.dataset.view !== val) {
        grid.innerHTML = KPI_DEFS.map(def => buildKPICard(prefix, def, period, val)).join("");
        grid.dataset.view = val;
      }
    
      // Animate count-up for each value
      tweenNumber($(`${prefix}-sales`), d.sales, fmtMoney);
      tweenNumber($(`${prefix}-cost`),  d.cost,  fmtMoney);
      tweenNumber($(`${prefix}-gp`),    d.gp,    fmtMoney);
      $(`${prefix}-gp-sub`).textContent = d.sales ? "Margin " + fmtPct(d.gp/d.sales) : "";
      tweenNumber($(`${prefix}-exp`),   d.exp,   fmtMoney);
      tweenNumber($(`${prefix}-op`),    d.op,    fmtMoney);
      $(`${prefix}-op-sub`).textContent = d.sales ? "Margin " + fmtPct(d.op/d.sales) : "";
      tweenNumber($(`${prefix}-var`),   d.varE,  fmtMoney);
      tweenNumber($(`${prefix}-staff`), d.staff, fmtMoney);
      tweenNumber($(`${prefix}-fix`),   d.semi + d.fixed, fmtMoney);
      document.getElementById(`${prefix}-chart-title`).textContent = "Expense Composition — " + labels[val];
      const opEl = $(`${prefix}-op`);
      opEl.classList.remove("red","green");
      opEl.classList.add(d.op >= 0 ? "green" : "red");
    
      const tbody = $(`${prefix}-tbody`);
      const rowsDef = [
        { lab:"Total Sales", v:d.sales, cls:"" },
        { lab:"Sales Cost", v:-d.cost, cls:"indent" },
        { lab:"Total Gross Profit", v:d.gp, cls:"subtotal" },
        { lab:"Variable Expenses", v:-d.varE, cls:"indent" },
        { lab:"Personnel (Staff)", v:-d.staff, cls:"indent" },
        { lab:"Semi-Fixed", v:-d.semi, cls:"indent" },
        { lab:"Fixed", v:-d.fixed, cls:"indent" },
        { lab:"Bonus", v:-d.bonus, cls:"indent" },
        { lab:"Amortization", v:-d.amort, cls:"indent" },
        { lab:"Depreciation", v:-d.deprec, cls:"indent" },
        { lab:"Total Expenses", v:-d.exp, cls:"subtotal" },
        { lab:"Total Operating Profit", v:d.op, cls:"total" }
      ];
      tbody.innerHTML = rowsDef.map(r => {
        const pct = d.sales ? fmtPct(r.v/d.sales) : "—";
        return `<tr class="${r.cls}"><td class="lab">${r.lab}</td><td class="num">${fmtFull(r.v)}</td><td class="num">${pct}</td></tr>`;
      }).join("");
    
      const expenseData = [d.varE, d.staff, d.semi, d.fixed, d.bonus, d.amort, d.deprec];
      const expenseLabels = ["Variable","Personnel","Semi-Fixed","Fixed","Bonus","Amortization","Depreciation"];
      // Serious red-gradient palette (darkest → lightest)
      const expenseBaseColors = ["#4A0911","#7A1320","#A8182A","#BB162B","#CC4A57","#D97983","#E5A7AE"];
      const totalExp = expenseData.reduce((a,b)=>a+b,0);
    
      // Build fine diagonal stripe pattern for each bar (subtle 8% white overlay)
      function makeStripePattern(baseColor) {
        const c = document.createElement("canvas");
        const SZ = 6;
        c.width = SZ; c.height = SZ;
        const x = c.getContext("2d");
        x.fillStyle = baseColor;
        x.fillRect(0, 0, SZ, SZ);
        x.strokeStyle = "rgba(255,255,255,0.10)";
        x.lineWidth = 0.6;
        x.beginPath();
        x.moveTo(-1, 7); x.lineTo(7, -1);
        x.moveTo(3, 9);  x.lineTo(9, 3);
        x.stroke();
        return x.createPattern(c, "repeat");
      }
      const expenseColors = expenseBaseColors.map(makeStripePattern);
    
      // Custom plugin: data labels at end of bars
      const barLabelPlugin = {
        id: "expBarLabel_" + prefix,
        afterDatasetsDraw(chart) {
          const { ctx } = chart;
          const meta = chart.getDatasetMeta(0);
          meta.data.forEach((bar, idx) => {
            const v = chart.data.datasets[0].data[idx];
            if (v == null) return;
            const pct = totalExp ? (v / totalExp * 100) : 0;
            const label = fmtMoney(v) + "  ·  " + pct.toFixed(1) + "%";
            ctx.save();
            ctx.fillStyle = "#05141F";
            ctx.font = "700 10.5px Arial, Helvetica, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(label, bar.x + 8, bar.y);
            ctx.restore();
          });
        }
      };
    
      if (chartRef.instance) chartRef.instance.destroy();
      chartRef.instance = new Chart(document.getElementById(`${prefix}-chart`), {
        type: "bar",
        data: {
          labels: expenseLabels,
          datasets: [{
            data: expenseData,
            backgroundColor: expenseColors,
            borderColor: expenseBaseColors,
            borderWidth: 0,
            borderRadius: 0,
            borderSkipped: false,
            maxBarThickness: 28
          }]
        },
        plugins: [barLabelPlugin],
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { right: 110 } },
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: {
              label: (c) => fmtMoney(c.parsed.x) + " · " + (c.parsed.x/totalExp*100).toFixed(1) + "% of total"
            } }
          },
          scales: {
            x: {
              beginAtZero: true,
              ticks: { callback: (v) => fmtMoney(v), font: { size: 9.5 }, color: "#6B7280" },
              grid: { color: "#F0F2F5" }
            },
            y: {
              ticks: { font: { size: 11, weight: 700 }, color: "#05141F" },
              grid: { display: false }
            }
          }
        }
      });
    }
    
    const pl1ChartRef = { instance: null };
    const pl2ChartRef = { instance: null };
    
    function wireButtonGroup(btnsId, onChange) {
      const grp = document.getElementById(btnsId);
      if (!grp) return;
      grp.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          grp.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          onChange();
        });
      });
    }
    wireButtonGroup("pl1-btns", () => renderPL("pl1", PL1, PL1_LABELS, "pl1-btns", pl1ChartRef));
    wireButtonGroup("pl2-btns", () => renderPL("pl2", PL2, PL2_LABELS, "pl2-btns", pl2ChartRef));
    renderPL("pl1", PL1, PL1_LABELS, "pl1-btns", pl1ChartRef);
    renderPL("pl2", PL2, PL2_LABELS, "pl2-btns", pl2ChartRef);
    
    // ============================================================
    // TAB 3 — BG CHARTS (lazy-built)
    // ============================================================
    function buildBGCharts() { /* cleared */ }
    // Deterministic simulated deltas for Profitability table (per period × unit × kpi)
    const PROF_DELTA_CACHE = {};
    function simProfDelta(unitId, kpiKey, period) {
      const key = period + "_" + unitId + "_" + kpiKey;
      if (PROF_DELTA_CACHE[key] != null) return PROF_DELTA_CACHE[key];
      let h = 0;
      for (let i = 0; i < key.length; i++) { h = ((h << 5) - h) + key.charCodeAt(i); h |= 0; }
      const r = Math.abs((h * 9301 + 49297) % 233280) / 233280;
      // MTD more volatile than YTD
      const lo = period === "mtd" ? -28 : -18;
      const hi = period === "mtd" ?  32 :  26;
      return PROF_DELTA_CACHE[key] = Math.round((lo + r * (hi - lo)) * 10) / 10;
    }
    function deltaTriangle(delta, inverted) {
      const isGood = inverted ? (delta < 0) : (delta > 0);
      const tri = delta >= 0 ? "▲" : "▼";
      const cls = isGood ? "good" : "bad";
      const sign = delta >= 0 ? "+" : "";
      return `<span class="delta-arrow ${cls}"><span class="tri">${tri}</span>${sign}${delta.toFixed(1)}%</span>`;
    }
    
    // ============================================================
    // PROFITABILITY ANALYSIS (lives inside Tab 2, reactive to MTD/YTD)
    // ============================================================
    const profCharts = { sales:null, gp:null, waterfall:null, ranking:null, margin:null };
    
    function buildProfTab(period, scope) {
      period = period || "ytd";
      scope = scope || "sales";
      const T = PL1[`total_${period}`];
      const totalNet = period === "ytd" ? 7210480 : 11671299;
      const netRatio = T.op ? (totalNet / T.op) : 0;
    
      // Sum-of helper for Post-Sales totals
      function sumOf(rows) {
        const out = {};
        ["sales","cost","gp","varE","staff","semi","fixed","bonus","amort","deprec","exp","op"].forEach(k => {
          out[k] = rows.reduce((a,r)=>a + (r[k]||0), 0);
        });
        return out;
      }
    
      let UNITS;
      if (scope === "postsales") {
        const parts   = { ...PL2[`parts_${period}`] };
        const service = { ...PL2[`service_${period}`] };
        const body    = { ...PL2[`body_${period}`] };
        const totalPS = sumOf([parts, service, body]);
        UNITS = [
          { id:"totalps", label:"Total Post-Sales", color:"#05141F", d: totalPS },
          { id:"parts",   label:"Parts",            color:"#BB162B", d: parts },
          { id:"service", label:"Service",          color:"#2C5F8D", d: service },
          { id:"body",    label:"Body & Paint",     color:"#6B7280", d: body }
        ];
      } else {
        UNITS = [
          { id:"total", label:"Total Company", color:"#05141F", d: { ...PL1[`total_${period}`] } },
          { id:"new",   label:"New Vehicles",  color:"#BB162B", d: { ...PL1[`new_${period}`] } },
          { id:"po",    label:"Pre-Owned",     color:"#2C5F8D", d: { ...PL1[`preowned_${period}`] } },
          { id:"fi",    label:"F&I",           color:"#6B7280", d: { ...PL1[`fi_${period}`] } }
        ];
      }
    
      // Update column header names dynamically
      const thRow = document.getElementById("prof-thead-row");
      if (thRow) {
        const ths = thRow.querySelectorAll(".col-name");
        UNITS.forEach((u, i) => { if (ths[i]) ths[i].textContent = u.label; });
      }
      // Allocate net by op share relative to total OP for the same period
      // For Post-Sales scope, allocate proportionally inside the Post-Sales total
      if (scope === "postsales") {
        const psTotalOp = UNITS[0].d.op || 1;
        // Net of Post-Sales group is a share of company's total net based on its OP contribution
        const psNet = (UNITS[0].d.op / T.op) * totalNet;
        UNITS.forEach(u => {
          if (u.id === "totalps") u.d.net = psNet;
          else u.d.net = (u.d.op / psTotalOp) * psNet;
        });
      } else {
        UNITS.forEach(u => {
          if (u.id === "total") u.d.net = totalNet;
          else u.d.net = u.d.op * netRatio;
        });
      }
    
      // ===== TABLE =====
      const tbody = document.getElementById("prof-tbody");
      const safe = (v) => isFinite(v) ? v : 0;
      const pctSales = (u, v) => u.d.sales ? (v / u.d.sales) : 0;
    
      const rows = [
        { type:"divider", lab:"SALES AND GROSS PROFIT" },
        { type:"data",   lab:"Sales",                           get:(u)=>u.d.sales,                fmt:fmtMoney, key:"sales", inv:false },
        { type:"data",   lab:"Cost of sales",                  get:(u)=>u.d.cost,                 fmt:fmtMoney, key:"cost",  inv:true  },
        { type:"data",   lab:"Gross profit",                   get:(u)=>u.d.gp,                   fmt:fmtMoney, key:"gp",    inv:false },
        { type:"margin", lab:"Gross margin %",                   get:(u)=>pctSales(u,u.d.gp),       fmt:fmtPct,   key:"gpm",   inv:false },
        { type:"divider", lab:"OPERATING EXPENSES" },
        { type:"data",   lab:"Variable expenses",                 get:(u)=>u.d.varE,                 fmt:fmtMoney, key:"varE",  inv:true },
        { type:"data",   lab:"Personnel expenses",               get:(u)=>u.d.staff,                fmt:fmtMoney, key:"staff", inv:true },
        { type:"data",   lab:"Semi-fixed expenses",                 get:(u)=>u.d.semi,                 fmt:fmtMoney, key:"semi",  inv:true },
        { type:"data",   lab:"Fixed expenses",                     get:(u)=>u.d.fixed,                fmt:fmtMoney, key:"fixed", inv:true },
        { type:"data",   lab:"Bonuses + Amortization + Depreciation", get:(u)=>u.d.bonus+u.d.amort+u.d.deprec, fmt:fmtMoney, key:"other", inv:true },
        { type:"data",   lab:"Total expenses",                   get:(u)=>u.d.exp,                  fmt:fmtMoney, key:"exp",   inv:true },
        { type:"divider", lab:"RESULT" },
        { type:"data",   lab:"Operating profit",               get:(u)=>u.d.op,                   fmt:fmtMoney, key:"op",    inv:false },
        { type:"margin", lab:"Operating margin %",               get:(u)=>pctSales(u,u.d.op),       fmt:fmtPct,   key:"opm",   inv:false },
        { type:"bottom", lab:"Net profit (est.)",           get:(u)=>u.d.net,                  fmt:fmtMoney, key:"net",   inv:false },
        { type:"bottom", lab:"Net margin %",                    get:(u)=>pctSales(u,u.d.net),      fmt:fmtPct,   key:"netm",  inv:false }
      ];
    
      tbody.innerHTML = rows.map(r => {
        if (r.type === "divider") return `<tr class="divider"><td colspan="5">${r.lab}</td></tr>`;
        const cls = r.type === "margin" ? "margin" : (r.type === "bottom" ? "bottom" : "");
        const cells = UNITS.map(u => {
          let html = r.fmt(r.get(u));
          if (r.key) {
            const d = simProfDelta(u.id, r.key, period);
            html += deltaTriangle(d, !!r.inv);
          }
          return `<td class="num">${html}</td>`;
        }).join("");
        return `<tr class="${cls}"><td class="lab">${r.lab}</td>${cells}</tr>`;
      }).join("");
    
      // Sync the "Δ vs YA / vs MA" sub-label in the table header with the active period
      const vsTxt = period === "mtd" ? "Δ vs MA" : "Δ vs YA";
      document.querySelectorAll(".prof-table thead .vs").forEach(el => { el.textContent = vsTxt; });
    
    }
    
    // ============================================================
    // Wire profitability period toggle + sync with Box 1 MTD/YTD selection
    // ============================================================
    function getProfPeriod() {
      const grp = document.getElementById("prof-period-btns");
      const active = grp.querySelector(".view-btn.active");
      return active ? active.dataset.val : "ytd";
    }
    function getProfScope() {
      const grp = document.getElementById("prof-scope-btns");
      const active = grp ? grp.querySelector(".view-btn.active") : null;
      return active ? active.dataset.val : "sales";
    }
    function setProfPeriod(p) {
      const grp = document.getElementById("prof-period-btns");
      grp.querySelectorAll(".view-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.val === p);
      });
      buildProfTab(p, getProfScope());
    }
    function setProfScope(s) {
      const grp = document.getElementById("prof-scope-btns");
      grp.querySelectorAll(".view-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.val === s);
      });
      buildProfTab(getProfPeriod(), s);
    }
    // Toggle clicks
    document.querySelectorAll("#prof-period-btns .view-btn").forEach(b => {
      b.addEventListener("click", () => setProfPeriod(b.dataset.val));
    });
    document.querySelectorAll("#prof-scope-btns .view-btn").forEach(b => {
      b.addEventListener("click", () => setProfScope(b.dataset.val));
    });
    // Sync from Box 1: when user clicks a *_ytd or *_mtd button, update profitability period
    function syncProfFromPL1() {
      const grp = document.getElementById("pl1-btns");
      const active = grp.querySelector(".view-btn.active");
      if (!active) return;
      const val = active.dataset.val;
      const period = val.endsWith("_mtd") ? "mtd" : "ytd";
      if (period !== getProfPeriod()) setProfPeriod(period);
    }
    document.querySelectorAll("#pl1-btns .view-btn").forEach(b => {
      b.addEventListener("click", () => setTimeout(syncProfFromPL1, 10));
    });
    // Initial build
    buildProfTab("ytd", "sales");
    
  } catch(e) { console.error('Block 1 failed:', e); }

  // --- block 2 ---
  try {
    
    // Gross Margin vs Operating Margin chart (static)
    (function() {
      function buildMarginCompare() {
        const canvas = document.getElementById("margin-compare");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        const labels = ["New","Pre-Owned","F&I","Parts","Service Labor","Body & Paint"];
        const gm = [7.6, 13.0, 93.5, 31.6, 82.3, 49.0];
        const om = [0.01, 2.7, 64.1, 22.5, 18.9, 5.1];
    
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Gross Margin %",
                data: gm,
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return "#05141F";
                  const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                  g.addColorStop(0, "#2C3A4E");
                  g.addColorStop(0.5, "#0E1B2A");
                  g.addColorStop(1, "#05141F");
                  return g;
                },
                borderRadius: { topRight: 3, bottomRight: 3, topLeft: 0, bottomLeft: 0 },
                borderSkipped: false,
                maxBarThickness: 26,
                categoryPercentage: 0.85,
                barPercentage: 1.0
              },
              {
                label: "Operating Margin %",
                data: om,
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return "#BB162B";
                  const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                  g.addColorStop(0, "#E63B52");
                  g.addColorStop(0.5, "#C71A30");
                  g.addColorStop(1, "#7A0E1A");
                  return g;
                },
                borderRadius: { topRight: 3, bottomRight: 3, topLeft: 0, bottomLeft: 0 },
                borderSkipped: false,
                maxBarThickness: 26,
                categoryPercentage: 0.85,
                barPercentage: 1.0
              }
            ]
          },
          plugins: [{
            id: "marginDataLabels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                const meta = chart.getDatasetMeta(di);
                meta.data.forEach((bar, idx) => {
                  const v = ds.data[idx];
                  if (v == null) return;
                  c.save();
                  c.fillStyle = di === 0 ? "#05141F" : "#7A0E1A";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "left";
                  c.textBaseline = "middle";
                  c.fillText(v.toFixed(1) + "%", bar.x + 6, bar.y);
                  c.restore();
                });
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 60 } },
            plugins: {
              legend: {
                display: true,
                position: "top",
                align: "end",
                labels: {
                  font: { size: 10, weight: 700, family: "Arial, Helvetica, sans-serif" },
                  color: "#05141F",
                  boxWidth: 12,
                  boxHeight: 12,
                  padding: 14
                }
              },
              tooltip: {
                callbacks: { label: (c) => c.dataset.label + ": " + c.parsed.x.toFixed(1) + "%" }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 100,
                ticks: { callback: (v) => v + "%", font: { size: 10 } },
                grid: { color: "#F0F2F5" }
              },
              y: {
                ticks: { font: { size: 11.5, weight: 700 }, color: "#05141F" },
                grid: { display: false }
              }
            }
          }
        });
      }
      // Build when DOM ready and also when tab2 is opened
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildMarginCompare);
      } else {
        buildMarginCompare();
      }
    })();
    
  } catch(e) { console.error('Block 2 failed:', e); }

  // --- block 3 ---
  try {
    
    // Expense Absorption chart
    (function() {
      function buildAbsorp() {
        const canvas = document.getElementById("absorp-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["Parts","F&I","Pre-Owned","Service Labor","Body & Paint","New"];
        const data   = [28.7, 31.4, 79.0, 77.0, 89.6, 99.5];
        // Color by threshold
        const colors = data.map(v => {
          if (v <= 40) return "#5DA38A";   // muted green
          if (v <= 80) return "#D4A559";   // muted amber
          return "#B66875";                 // muted red
        });
    
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [{
              label: "Absorption %",
              data: data,
              backgroundColor: (ctxObj) => {
                const chart = ctxObj.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return colors[ctxObj.dataIndex];
                const base = colors[ctxObj.dataIndex];
                const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                g.addColorStop(0, base + "CC");
                g.addColorStop(1, base);
                return g;
              },
              borderRadius: { topRight: 2, bottomRight: 2 },
              borderSkipped: false,
              maxBarThickness: 30
            }]
          },
          plugins: [{
            id: "absorpLabels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 12px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left";
                c.textBaseline = "middle";
                c.fillText(v.toFixed(1) + "%", bar.x + 8, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 60 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "Absorption: " + c.parsed.x.toFixed(1) + "%" } }
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 110,
                ticks: { callback: (v) => v + "%", font: { size: 10 } },
                grid: { color: "#F0F2F5" }
              },
              y: {
                ticks: { font: { size: 11.5, weight: 700 }, color: "#05141F" },
                grid: { display: false }
              }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildAbsorp);
      } else {
        buildAbsorp();
      }
    })();
    
  } catch(e) { console.error('Block 3 failed:', e); }

  // --- block 4 ---
  try {
    
    // Operating Profit Contribution donut
    (function() {
      function buildOPDonut() {
        const canvas = document.getElementById("op-donut");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["Parts","F&I","Service Labor","Pre-Owned","Body & Paint","New"];
        const data   = [8.45, 8.07, 3.06, 1.11, 0.23, 0.02];
        const palette = ["#05141F","#BB162B","#374151","#6B7280","#9CA3AF","#D1D5DB"];
        const totalOP = data.reduce((a,b)=>a+b, 0);
    
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: palette,
              borderColor: "#FFFFFF",
              borderWidth: 3,
              hoverOffset: 6
            }]
          },
          plugins: [{
            id: "centerText",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2;
              const cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif";
              c.fillStyle = "#6B7280";
              c.textAlign = "center";
              c.textBaseline = "middle";
              c.fillText("TOTAL UO YTD", cx, cy - 18);
              c.font = "900 22px 'Arial Black', Arial, sans-serif";
              c.fillStyle = "#05141F";
              c.fillText("$" + totalOP.toFixed(2) + "M", cx, cy + 4);
              c.restore();
            }
          }],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "62%",
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  font: { size: 10, weight: 700, family: "Arial, Helvetica, sans-serif" },
                  color: "#05141F",
                  boxWidth: 12,
                  boxHeight: 12,
                  padding: 10
                }
              },
              tooltip: {
                callbacks: {
                  label: (c) => c.label + ": $" + c.parsed.toFixed(2) + "M (" + (c.parsed/totalOP*100).toFixed(1) + "%)"
                }
              }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildOPDonut);
      } else {
        buildOPDonut();
      }
    })();
    
  } catch(e) { console.error('Block 4 failed:', e); }

  // --- block 5 ---
  try {
    
    // Block 01 — Financial Structure Donut
    (function() {
      function buildBS01() {
        const canvas = document.getElementById("bs01-donut");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Total Liabilities", "Stockholders' Equity"],
            datasets: [{
              data: [93.38, 51.25],
              backgroundColor: ["#BB162B", "#05141F"],
              borderColor: "#FFFFFF",
              borderWidth: 3,
              hoverOffset: 6
            }]
          },
          plugins: [{
            id: "bs01Center",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2;
              const cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif";
              c.fillStyle = "#6B7280";
              c.textAlign = "center";
              c.textBaseline = "middle";
              c.fillText("TOTAL ASSETS", cx, cy - 18);
              c.font = "900 22px 'Arial Black', Arial, sans-serif";
              c.fillStyle = "#05141F";
              c.fillText("$144.62M", cx, cy + 4);
              c.restore();
            }
          }],
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "62%",
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                labels: {
                  font: { size: 10, weight: 700, family: "Arial, Helvetica, sans-serif" },
                  color: "#05141F",
                  boxWidth: 12,
                  boxHeight: 12,
                  padding: 14
                }
              },
              tooltip: {
                callbacks: {
                  label: (c) => c.label + ": $" + c.parsed.toFixed(2) + "M (" + (c.parsed/144.63*100).toFixed(1) + "%)"
                }
              }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS01);
      } else {
        buildBS01();
      }
      // Re-build when tab3 activated
      const observer = new MutationObserver(() => {
        const tab3 = document.getElementById("tab3");
        if (tab3 && tab3.classList.contains("active")) buildBS01();
      });
      const tab3el = document.getElementById("tab3");
      if (tab3el) observer.observe(tab3el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 5 failed:', e); }

  // --- block 6 ---
  try {
    const I18N = {"bup_t1_title": {"es": "New Cars: motor de volumen, no de utilidad operativa", "en": "New Cars: volume engine, not operating profit"}, "bup_t1_desc": {"es": "Tiene <b>79.4% de las ventas</b> y <b>42.4% de la utilidad bruta</b>, pero <b>casi 0% de la utilidad operativa</b>. Su margen bruto se consume casi por completo en gastos operativos.", "en": "Holds <b>79.4% of sales</b> and <b>42.4% of gross profit</b>, but <b>almost 0% of operating profit</b>. Its gross margin is consumed almost entirely by operating expenses."}, "bup_t2_title": {"es": "F&amp;I: el negocio de mayor conversión a utilidad", "en": "F&amp;I: highest conversion to profit"}, "bup_t2_desc": {"es": "Con solo <b>2.3% de las ventas totales</b> genera <b>38.5% de la utilidad operativa</b>. Margen operativo del <b>64.1%</b>. Unidad crítica para rentabilidad.", "en": "With only <b>2.3% of total sales</b> it generates <b>38.5% of operating profit</b>. Operating margin of <b>64.1%</b>. Critical unit for profitability."}, "bup_t3_title": {"es": "Parts: el gran generador operativo", "en": "Parts: the main operating profit generator"}, "bup_t3_desc": {"es": "Genera <b>40.4% de la utilidad operativa total</b> con solo <b>6.9% de las ventas</b>. Postventa no es soporte: es <b>motor financiero</b>. Crítico para entender la salud del distribuidor.", "en": "Generates <b>40.4% of total operating profit</b> with only <b>6.9% of sales</b>. Aftersales is not support: it is the <b>financial engine</b>. Critical to understanding dealership health."}, "gm_t1_title": {"es": "New Cars · ¿Volumen o utilidad?", "en": "New Cars · Volume or profit?"}, "gm_t1_desc": {"es": "Margen bruto bajo (<b>7.6%</b>) y margen operativo casi inexistente (<b>0.01%</b>). <b>Pregunta estratégica</b>: ¿está funcionando como generador de utilidad o como generador de volumen para alimentar F&amp;I y postventa?", "en": "Low gross margin (<b>7.6%</b>) and almost non-existent operating margin (<b>0.01%</b>). <b>Strategic question</b>: Is it operating as a profit generator or as a volume engine feeding F&amp;I and aftersales?"}, "gm_t2_title": {"es": "F&amp;I · Máxima conversión", "en": "F&amp;I · Maximum conversion"}, "gm_t2_desc": {"es": "Altísima conversión de ventas a utilidad (<b>64.1%</b> margen operativo). <b>Pregunta estratégica</b>: ¿estamos maximizando penetración de financiamiento, seguros y productos adicionales por unidad vendida?", "en": "Very high conversion of sales to profit (<b>64.1%</b> operating margin). <b>Strategic question</b>: Are we maximizing penetration of financing, insurance, and add-on products per unit sold?"}, "gm_t3_title": {"es": "Service Labor · Fuga de margen", "en": "Service Labor · Margin leakage"}, "gm_t3_desc": {"es": "Margen bruto altísimo (<b>82.3%</b>) que se reduce drásticamente en utilidad operativa (<b>18.9%</b>). <b>Pregunta estratégica</b>: ¿la estructura de personal y gastos está absorbiendo demasiado margen de servicio?", "en": "Very high gross margin (<b>82.3%</b>) drastically reduced at operating profit (<b>18.9%</b>). <b>Strategic question</b>: Is the personnel and expense structure absorbing too much service margin?"}, "gm_t4_title": {"es": "Body &amp; Paint · ¿Escala o productividad?", "en": "Body &amp; Paint · Scale or productivity?"}, "gm_t4_desc": {"es": "Margen bruto sano (<b>49.0%</b>), pero utilidad operativa baja (<b>5.1%</b>). <b>Pregunta estratégica</b>: ¿Body &amp; Paint tiene problema de escala, productividad o absorción de gastos?", "en": "Healthy gross margin (<b>49.0%</b>), but low operating profit (<b>5.1%</b>). <b>Strategic question</b>: Does Body &amp; Paint have a scale, productivity, or expense absorption problem?"}, "abs_t1_title": {"es": "Parts · Más eficiente", "en": "Parts · Most efficient"}, "abs_t1_desc": {"es": "Solo consume <b>28.7%</b> de su margen bruto en gastos. Convierte la mayoría de utilidad bruta en operativa.", "en": "Consumes only <b>28.7%</b> of its gross margin in expenses. Converts most gross profit into operating profit."}, "abs_t2_title": {"es": "F&amp;I · Extremadamente rentable", "en": "F&amp;I · Extremely profitable"}, "abs_t2_desc": {"es": "Absorción del <b>31.4%</b>. Estructura ligera, márgenes elevados; cada peso vendido convierte fuerte a utilidad.", "en": "Absorption of <b>31.4%</b>. Lean structure, high margins; every peso sold converts strongly to profit."}, "abs_t3_title": {"es": "New · Punto de equilibrio", "en": "New · Breakeven"}, "abs_t3_desc": {"es": "Consume <b>99.5%</b> del margen bruto. El negocio que vende más, pero apenas conserva utilidad.", "en": "Consumes <b>99.5%</b> of gross margin. The business that sells the most, yet barely retains any profit."}, "abs_t4_title": {"es": "Body &amp; Paint · Muy presionado", "en": "Body &amp; Paint · Heavily pressured"}, "abs_t4_desc": {"es": "Absorción del <b>89.6%</b>. Margen bruto sano se diluye casi por completo. Problema de escala o gastos.", "en": "Absorption of <b>89.6%</b>. Healthy gross margin almost entirely diluted. Scale or expense problem."}, "abs_t5_title": {"es": "Service · Estructura pesada", "en": "Service · Heavy structure"}, "abs_t5_desc": {"es": "Pese a margen bruto del 82%, absorbe <b>77%</b> en gastos. Personal y estructura comen el margen.", "en": "Despite an 82% gross margin, it absorbs <b>77%</b> in expenses. Personnel and structure consume the margin."}, "opc_t1_title": {"es": "La utilidad operativa NO está distribuida según las ventas", "en": "Operating profit is NOT distributed according to sales"}, "opc_t1_desc": {"es": "El <b>management no debe dirigir el negocio solo por volumen</b>, market share o unidades vendidas. Las unidades de postventa (Parts, F&amp;I, Service) generan <b>93.5% de la utilidad operativa total</b> con apenas <b>12.1% de las ventas combinadas</b>. Mientras que New Cars con 79.4% de las ventas aporta solo 0.1% al resultado operativo. La dirección debe gestionarse por las 5 dimensiones de arriba, no por volumen aislado.", "en": "Management <b>must not run the business solely on volume</b>, market share, or units sold. Aftersales units (Parts, F&amp;I, Service) generate <b>93.5% of total operating profit</b> with just <b>12.1% of combined sales</b>. Meanwhile, New Cars with 79.4% of sales contributes only 0.1% to operating profit. Direction must be managed by the 5 dimensions above, not by isolated volume."}, "bs01_head": {"es": "Analisis", "en": "Analysis"}, "bs01_body": {"es": "La empresa tiene una estructura <b>más cargada hacia pasivos que hacia capital</b> (64.6% vs 35.4%). El apalancamiento de <b>1.82x</b> indica que por cada peso de capital propio, hay $1.82 en pasivos. El foco debe estar en la <b>calidad de esos pasivos</b>: corto plazo, floor plan, proveedores, impuestos y cuentas por pagar.", "en": "The company has a structure <b>weighted more toward liabilities than equity</b> (64.6% vs 35.4%). The leverage ratio of <b>1.82x</b> means that for every peso of equity there is $1.82 in liabilities. The focus must be on the <b>quality of those liabilities</b>: short-term, floor plan, suppliers, taxes, and accounts payable."}, "abs_lbl_consumed": {"es": "Casi todo el margen se consume", "en": "Margin almost fully consumed"}, "abs_lbl_weak": {"es": "Rentabilidad débil", "en": "Weak profitability"}, "abs_lbl_high_eff": {"es": "Alta eficiencia", "en": "High efficiency"}, "abs_lbl_vhigh_eff": {"es": "Muy alta eficiencia", "en": "Very high efficiency"}, "abs_lbl_high_consum": {"es": "Alto consumo operativo", "en": "High operating consumption"}, "abs_lbl_pressed": {"es": "Margen muy presionado", "en": "Margin under heavy pressure"}, "bs02_head": {"es": "Analisis", "en": "Analysis"}, "bs02_body": {"es": "La empresa tiene <b>más activos circulantes que pasivos circulantes</b> ($111.92M vs $85.51M). El <b>Current Ratio de 1.31x</b> indica capacidad sana para cubrir obligaciones de corto plazo. Sin embargo, hay que tener cuidado: <b>no todo el activo circulante es efectivo</b> — una parte importante está en inventario y cuentas por cobrar. El <b>Quick Ratio de 0.93x</b> (debajo de 1.0) revela que sin el inventario, la liquidez inmediata es ajustada.", "en": "The company has <b>more current assets than current liabilities</b> ($111.92M vs $85.51M). The <b>Current Ratio of 1.31x</b> indicates a healthy ability to cover short-term obligations. However, be careful: <b>not all current assets are cash</b> — a significant portion sits in inventory and accounts receivable. The <b>Quick Ratio of 0.93x</b> (below 1.0) reveals that, excluding inventory, immediate liquidity is tight."}, "bs03_head": {"es": "Analisis", "en": "Analysis"}, "bs03_body": {"es": "El activo circulante <b>NO está principalmente en caja</b> (solo 9.8%). Está concentrado en <b>Cuentas por Cobrar (38.2%)</b>, <b>Inventory (29.3%)</b> e <b>Impuestos recuperables (16.7%)</b>. Eso significa que la <b>liquidez real depende de qué tan rápido se cobre la cartera y qué tan rápido rote el inventario</b>. Para Corea esto es muy relevante: el balance se ve sano en papel, pero la conversión a efectivo requiere disciplina operativa en cobranza y rotación.", "en": "Current assets are <b>NOT primarily cash</b> (only 9.8%). They are concentrated in <b>Accounts Receivable (38.2%)</b>, <b>Inventory (29.3%)</b> and <b>Recoverable Taxes (16.7%)</b>. This means <b>real liquidity depends on how fast receivables are collected and how fast inventory turns over</b>. For Korea this is highly relevant: the balance sheet looks healthy on paper, but cash conversion requires operational discipline in collections and turnover."}, "bs04_head": {"es": "Analisis", "en": "Analysis"}, "bs04_body": {"es": "El inventario representa una parte importante del capital de trabajo ($32.77M, <b>29.3% del activo circulante</b>). La concentración es alta en autos nuevos (<b>64.7% del inventario total</b>). La pregunta no es solo cuánto inventario hay, sino: <b>¿está rotando suficientemente rápido para justificar el capital que consume?</b> Sin rotación adecuada, ese capital queda atrapado y presiona la liquidez.", "en": "Inventory is a significant share of working capital ($32.77M, <b>29.3% of current assets</b>). Concentration is high in new vehicles (<b>64.7% of total inventory</b>). The question is not just how much inventory exists, but: <b>is it turning fast enough to justify the capital it consumes?</b> Without adequate turnover, that capital stays trapped and pressures liquidity."}, "bs04ar_head": {"es": "Analisis", "en": "Analysis"}, "bs04ar_body": {"es": "Cuentas por cobrar es el <b>activo circulante más grande</b> ($42.73M, 38.2% of total). Eso significa que la <b>liquidez de National KIA depende más de cobranza que de caja</b>. Para top management esta es una <b>alerta sana</b>: hay utilidad contable, pero parte del dinero puede estar <b>atrapado en cuentas por cobrar</b> — particularmente en el <b>43.3% de \"Other AR\"</b> que no es claramente operativo y representa riesgo no funcional.", "en": "Accounts Receivable is the <b>largest current asset</b> ($42.73M, 38.2% of the total). This means <b>National KIA's liquidity depends more on collections than on cash</b>. For top management this is a <b>healthy alert</b>: there is accounting profit, but part of the money may be <b>trapped in receivables</b> — particularly in the <b>43.3% of \"Other AR\"</b> that is not clearly operational and represents non-functional risk."}, "bs05_head": {"es": "Analisis", "en": "Analysis"}, "bs05_body": {"es": "El pasivo está <b>muy cargado al corto plazo</b>: $85.51M de $93.38M total (<b>91.6%</b>). El componente más grande es el <b>Floor Plan</b> con $35.08M (41% del pasivo corto), seguido de <b>impuestos por pagar</b> ($14.07M, 16.4%). Esa estructura obliga a monitorear de cerca: <b>rotación de inventario, cobranza, flujo operativo, presión fiscal y costo financiero</b>. Cualquier disrupción en estos cinco frentes presiona directamente la solvencia de corto plazo.", "en": "Liabilities are <b>heavily weighted to the short term</b>: $85.51M of $93.38M total (<b>91.6%</b>). The largest component is the <b>Floor Plan</b> at $35.08M (41% of short-term liabilities), followed by <b>taxes payable</b> ($14.07M, 16.4%). This structure requires close monitoring of: <b>inventory turnover, collections, operating cash flow, fiscal pressure and financial cost</b>. Any disruption in these five fronts directly pressures short-term solvency."}, "sgm01_head": {"es": "Analisis", "en": "Analysis"}, "sgm01_body": {"es": "New Vehicles <b>crece en ventas, pero pierde calidad de margen</b>. Ventas +16.2% y unidades +76 vs año pasado, pero la <b>utilidad bruta cayó 6.3%</b> y el <b>margen bruto se contrajo 160 puntos base (8.1% → 6.5%)</b>. Esto es una <b>alerta ejecutiva</b>: se vendió más, pero se ganó menos margen bruto. La pregunta clave para dirección es <b>por qué se está erosionando el margen</b> — mix de modelos, descuentos comerciales, costo de adquisición, o presión competitiva.", "en": "New Vehicles <b>grows in sales but loses margin quality</b>. Sales +16.2% and units +76 vs prior year, but <b>gross profit dropped 6.3%</b> and <b>gross margin compressed 160 basis points (8.1% → 6.5%)</b>. This is an <b>executive alert</b>: more was sold, but less gross margin was earned. The key question for management is <b>why margin is eroding</b> — model mix, commercial discounts, acquisition cost, or competitive pressure."}, "sgm02_head": {"es": "Analisis", "en": "Analysis"}, "sgm02_body": {"es": "Fleet <b>crece fuerte, pero diluye margen</b>. Ventas <b>+80.7% vs año pasado</b> y unidades <b>más que se duplicaron</b> (65 → 132). La utilidad bruta crece <b>+44.8%</b>, pero el margen sigue siendo <b>extremadamente bajo</b> (1.65%, contra 2.06% PY). La lectura es clara: <b>Fleet ayuda a volumen pero presiona la rentabilidad promedio</b>. Si se busca volumen, Fleet sirve; si se busca rentabilidad, Fleet diluye.", "en": "Fleet <b>grows strongly but dilutes margin</b>. Sales <b>+80.7% vs prior year</b> and units <b>more than doubled</b> (65 → 132). Gross profit grows <b>+44.8%</b>, but margin remains <b>extremely low</b> (1.65%, vs 2.06% PY). The reading is clear: <b>Fleet helps volume but pressures average profitability</b>. If volume is the goal, Fleet works; if profitability is the goal, Fleet dilutes."}, "sgm03_head": {"es": "Analisis", "en": "Analysis"}, "sgm03_body": {"es": "F&amp;I es una <b>máquina de margen bruto</b>: 93.5% de margen — casi todo lo que vende, lo gana. Ventas suben +16.7% y utilidad bruta +14.6% vs año pasado. La lectura es clara: <b>F&amp;I no es volumen, es rentabilidad pura</b>. Para entender su salud completa, hay que analizar: <b>(1) Financial income por autos nuevos</b>, <b>(2) Comisiones de seguros</b>, <b>(3) Financial income de seminuevos</b>, <b>(4) Otros ingresos</b>, y sobre todo <b>(5) Penetración por unidad vendida</b> — cuántos productos F&amp;I se colocan por cada auto entregado.", "en": "F&amp;I is a <b>gross margin machine</b>: 93.5% margin — almost everything it sells, it earns. Sales up +16.7% and gross profit +14.6% vs prior year. The reading is clear: <b>F&amp;I is not volume, it's pure profitability</b>. To understand its full health, analyze: <b>(1) Financial income from new vehicles</b>, <b>(2) Insurance commissions</b>, <b>(3) Financial income from pre-owned</b>, <b>(4) Other income</b>, and above all <b>(5) Penetration per unit sold</b> — how many F&amp;I products are placed per delivered car."}, "sgm04_head": {"es": "Analisis", "en": "Analysis"}, "sgm04_body": {"es": "Service <b>crece en actividad, pero hay que revisar el ticket promedio</b>. A primera vista se ve bien: ventas +8% y utilidad bruta +11.8%. Pero ojo: <b>las unidades suben mucho más que las ventas</b> (+29% vs +8%). Eso puede significar: <b>(1)</b> más órdenes de menor ticket, <b>(2)</b> mayor volumen operativo, <b>(3)</b> posible presión en productividad, o <b>(4)</b> mejor penetración pero menor ingreso promedio por orden. El <b>Sales per RO cayó de $1,350 a $1,131 (-16.2%)</b> y el <b>GP per RO de $1,071 a $928 (-13.4%)</b>. Crece la operación, pero cada orden vale menos.", "en": "Service <b>grows in activity, but average ticket needs review</b>. At first glance it looks good: sales +8% and gross profit +11.8%. But careful: <b>units grow much more than sales</b> (+29% vs +8%). This may mean: <b>(1)</b> more orders at lower ticket, <b>(2)</b> higher operational volume, <b>(3)</b> potential productivity pressure, or <b>(4)</b> better penetration but lower average revenue per order. <b>Sales per RO dropped from $1,350 to $1,131 (-16.2%)</b> and <b>GP per RO from $1,071 to $928 (-13.4%)</b>. Operation grows, but each order is worth less."}, "sgm05_head": {"es": "Analisis", "en": "Analysis"}, "sgm05_body": {"es": "Parts está <b>creciendo con buena calidad de margen</b>. Esto es positivo: ventas +10% y utilidad bruta +12.7% — la utilidad crece <b>más rápido que las ventas</b>, y el margen mejora 90 puntos base. Parts <b>crece y además mejora margen</b>. Esto confirma lo que vimos en P&amp;L: <b>Refacciones es uno de los motores reales de utilidad</b>. Para profundizar hay que leer: <b>(1)</b> Warranty claims, <b>(2)</b> Counter sales retail, <b>(3)</b> Parts para órdenes mecánicas, <b>(4)</b> Parts para body &amp; paint, <b>(5)</b> Accessories, y <b>(6)</b> Packages / wear parts.", "en": "Parts is <b>growing with good margin quality</b>. This is positive: sales +10% and gross profit +12.7% — profit grows <b>faster than sales</b>, and margin improves 90 basis points. Parts <b>grows AND improves margin</b>. This confirms what we saw in P&amp;L: <b>Parts is one of the real profit engines</b>. To go deeper, analyze: <b>(1)</b> Warranty claims, <b>(2)</b> Counter sales retail, <b>(3)</b> Parts for mechanical repair orders, <b>(4)</b> Parts for body &amp; paint, <b>(5)</b> Accessories, and <b>(6)</b> Packages / wear parts."}, "sgm06_head": {"es": "Analisis", "en": "Analysis"}, "sgm06_body": {"es": "Body &amp; Paint <b>baja en volumen y margen absoluto</b>. Ventas -8.3%, unidades -12 vs año pasado y utilidad bruta -8.3%. Sin embargo, <b>mantiene el margen porcentual en 50%</b> — la operación sigue siendo eficiente cuando se ejecuta. La lectura: <b>Body &amp; Paint mantiene margen porcentual, pero pierde tamaño</b>. No parece un problema de margen, sino más bien un tema de: <b>(1)</b> menor volumen, <b>(2)</b> menor demanda, <b>(3)</b> menor captación, <b>(4)</b> menor actividad con aseguradoras, o <b>(5)</b> capacidad no aprovechada.", "en": "Body &amp; Paint <b>declines in volume and absolute margin</b>. Sales -8.3%, units -12 vs prior year, and gross profit -8.3%. However, it <b>holds the percentage margin at 50%</b> — operations remain efficient when executed. The reading: <b>Body &amp; Paint preserves percentage margin but loses size</b>. This is not a margin problem, but rather an issue of: <b>(1)</b> lower volume, <b>(2)</b> lower demand, <b>(3)</b> lower acquisition, <b>(4)</b> lower insurer activity, or <b>(5)</b> underutilized capacity."}, "d1_head": {"es": "Analisis", "en": "Analysis"}, "d1_body": {"es": "El margen bruto nacional <b>no se concentra donde están las ventas</b>. New Vehicles genera el <b>76% de las ventas pero solo el 40% del margen bruto</b>. F&amp;I, Service, Parts y Body &amp; Paint juntos <b>suman 54.6% de la utilidad bruta</b> con apenas 16% de las ventas. La calidad del margen vive en postventa y F&amp;I.", "en": "National gross margin <b>is not concentrated where sales are</b>. New Vehicles generates <b>76% of sales but only 40% of gross margin</b>. F&amp;I, Service, Parts and Body &amp; Paint combined <b>add up to 54.6% of gross profit</b> with only 16% of sales. Margin quality lives in aftersales and F&amp;I."}, "d2_head": {"es": "⚠ Alerta Principal", "en": "⚠ Main Alert"}, "d2_body": {"es": "<b>New Vehicles crece en ventas y unidades, pero CAE en margen bruto</b>. Volumen +16.2%, unidades +7.9%, pero la utilidad bruta retrocede -6.3% y el margen pierde 160 puntos base. Vender más y ganar menos es la señal clásica de erosión de mix o descuentos. <b>Parts y Service son los únicos que crecen con margen ganando puntos base</b>. F&amp;I crece fuerte pero su margen baja 220 bps — vigilar.", "en": "<b>New Vehicles grows in sales and units but FALLS in gross profit</b>. Volume +16.2%, units +7.9%, but gross profit drops -6.3% and margin loses 160 basis points. Selling more and earning less is the classic sign of mix erosion or discounting. <b>Parts and Service are the only units growing margin with positive basis points</b>. F&amp;I grows strongly but margin drops 220 bps — watch closely."}, "d3_head": {"es": "Analisis", "en": "Analysis"}, "d3_body": {"es": "<b>Modelos que venden mucho NO son los mismos que dejan más dinero</b>. K3 es líder absoluto en volumen (348 u) y GP ($6.8M), pero su GP por unidad ($19,656) es de los más bajos. <b>Sorento ($77K), Niro ($87K), Sportage ($48K) y K4 ($45K)</b> dejan mucho más dinero por unidad aunque vendan menos. Retail genera GP por unidad de $30K vs Fleet $7.3K — el canal Retail es <b>4x más rentable por auto</b>.", "en": "<b>Models that sell the most are NOT the ones that earn the most</b>. K3 leads volume (348 u) and total GP ($6.8M), but its GP per unit ($19,656) is among the lowest. <b>Sorento ($77K), Niro ($87K), Sportage ($48K) and K4 ($45K)</b> earn much more per unit even with lower volume. Retail generates $30K GP per unit vs Fleet $7.3K — the Retail channel is <b>4x more profitable per car</b>."}, "d4_head": {"es": "Analisis", "en": "Analysis"}, "d4_body": {"es": "F&amp;I es <b>margen incremental de altísima calidad</b>: cada unidad nueva vendida deja $11,329 adicionales de utilidad bruta por la venta del financiamiento y seguro. Con 93.5% de margen, prácticamente todo lo que vende, lo gana. <b>La penetración de Kia Finance del 12.3% es la palanca clave</b>: cada punto adicional de penetración mueve el aguja en utilidad. Finance Income + Insurance Fees representan <b>77% del GP de F&amp;I</b> — son los dos motores que hay que crecer.", "en": "F&amp;I is <b>incremental margin of the highest quality</b>: each new unit sold adds $11,329 of gross profit through financing and insurance. With 93.5% margin, almost everything it sells, it earns. <b>The 12.3% Kia Finance penetration is the key lever</b>: each additional point of penetration moves the needle on profit. Finance Income + Insurance Fees represent <b>77% of F&amp;I GP</b> — the two engines to grow."}, "d5_head": {"es": "Analisis", "en": "Analysis"}, "d5_body": {"es": "Postventa <b>sí está creciendo con calidad</b>. Service +11.8% en utilidad bruta con margen del 82.3%, Parts +12.7% con margen mejorando a 31.7%. Estos dos sostienen <b>$24.8M de utilidad bruta de altísima calidad</b>. <b>Body &amp; Paint requiere revisar escala</b>: el margen porcentual (50%) se mantiene, pero el negocio se está contrayendo en volumen y absoluto. No es problema de eficiencia, es problema de demanda y captación con aseguradoras.", "en": "Aftersales <b>is indeed growing with quality</b>. Service +11.8% in gross profit with 82.3% margin, Parts +12.7% with margin improving to 31.7%. These two sustain <b>$24.8M of high-quality gross profit</b>. <b>Body &amp; Paint requires scale review</b>: percentage margin (50%) is preserved, but the business is contracting in volume and absolute size. Not an efficiency problem, but a demand and insurer acquisition problem."}, "d1_sub": {"es": "¿Dónde se genera el margen bruto nacional?", "en": "Where is national gross margin generated?"}, "d2_sub": {"es": "¿Estamos creciendo con margen o solo con volumen?", "en": "Are we growing with margin or just with volume?"}, "d3_sub": {"es": "¿Qué modelos explican la venta y el margen?", "en": "Which models explain sales and margin?"}, "d4_sub": {"es": "¿Cuánto margen adicional generamos por cada vehículo vendido?", "en": "How much incremental margin do we generate per vehicle sold?"}, "d5_sub": {"es": "¿Postventa está creciendo con calidad?", "en": "Is aftersales growing with quality?"}, "add01_head": {"es": "Analisis", "en": "Analysis"}, "add01_body": {"es": "No basta con saber cuánto se debe: hay que saber <b>qué parte de la cobranza está envejecida</b> y qué tanto riesgo representa. La cartera total es de $43.49M, pero el <b>13.7% está vencido</b> (más de 30 días) y <b>$3.26M (7.5%) tiene más de 120 días</b> — cartera crítica. Si la cartera está concentrada en cuentas viejas, la empresa puede verse <b>rentable en papel, pero con presión real de efectivo</b>. La exposición de $19.65M en \"Other AR\" requiere explicación clara.", "en": "It's not enough to know how much is owed: we need to know <b>which portion of receivables is aging</b> and how much risk it represents. Total AR is $43.49M, but <b>13.7% is overdue</b> (over 30 days) and <b>$3.26M (7.5%) is over 120 days</b> — critical aging. If receivables are concentrated in old accounts, the company can look <b>profitable on paper but face real cash pressure</b>. The $19.65M exposure in \"Other AR\" requires clear explanation."}, "add02_head": {"es": "Analisis", "en": "Analysis"}, "add02_body": {"es": "Los <b>gastos financieros YTD ($9.90M) son 7.4x mayores que los productos financieros ($1.33M)</b>, generando un resultado financiero neto de <b>-$8.57M</b>. La pregunta fuerte: <b>la operación genera utilidad, pero el costo financiero la está reduciendo</b>. Los gastos financieros consumen el <b>12.8% del margen bruto</b> y el <b>43.2% del EBIT</b>. El <b>Floor Plan ($6.71M, 67.8%)</b> es el componente dominante — financiar inventario tiene un costo enorme que afecta directamente la utilidad final.", "en": "<b>Financial expenses YTD ($9.90M) are 7.4x higher than financial products ($1.33M)</b>, producing a net financial result of <b>-$8.57M</b>. The hard question: <b>operations generate profit, but financial cost is eroding it</b>. Financial expenses consume <b>12.8% of gross profit</b> and <b>43.2% of EBIT</b>. The <b>Floor Plan ($6.71M, 67.8%)</b> is the dominant component — financing inventory carries a huge cost that directly hits final profit."}, "add03_head": {"es": "Analisis", "en": "Analysis"}, "add03_body": {"es": "La pregunta clave: <b>¿la utilidad depende de operación real o de ingresos extraordinarios?</b> El neto de \"Other\" suma <b>+$2.07M (9% del EBIT)</b>, con <b>$1.46M en \"Diverse\"</b> como la categoría dominante — un componente que merece desglose para entender si es recurrente. Para Corea esto importa mucho: top management no solo quiere saber si se ganó dinero, sino si el <b>resultado es repetible</b>. Si el +$2.07M es no-recurrente, la utilidad operativa \"limpia\" sería menor de lo reportado.", "en": "The key question: <b>does profit depend on real operations or on extraordinary income?</b> Net Other adds up to <b>+$2.07M (9% of EBIT)</b>, with <b>$1.46M in \"Diverse\"</b> as the dominant category — a component that deserves breakdown to understand if it's recurring. For Korea this matters greatly: top management not only wants to know if money was made, but if the <b>result is repeatable</b>. If the +$2.07M is non-recurring, the \"clean\" operating profit would be lower than reported."}, "add04_head": {"es": "Analisis", "en": "Analysis"}, "add04_body": {"es": "Este bloque permite responder: <b>¿la estructura de personal está alineada con el volumen y la rentabilidad?</b> No se trata de decir \"hay mucha gente\" o \"hay poca gente\". Se trata de ver si <b>el personal produce suficiente venta, margen y actividad</b>. Cada empleado genera $9.73M en ventas y $1.38M en utilidad bruta. La estructura administrativa representa <b>33% del headcount total</b> — un ratio a vigilar para asegurar que el peso back-office no consume la productividad del front-office.", "en": "This block answers: <b>is the personnel structure aligned with volume and profitability?</b> It's not about saying \"too many people\" or \"too few\". It's about whether <b>personnel produces enough sales, margin and activity</b>. Each employee generates $9.73M in sales and $1.38M in gross profit. Administrative structure represents <b>33% of total headcount</b> — a ratio to watch to ensure back-office weight doesn't consume front-office productivity."}, "add05_head": {"es": "Analisis", "en": "Analysis"}, "add05_body": {"es": "La pregunta clave: <b>¿postventa está creciendo por demanda rentable o por trabajo interno/garantías?</b> No todas las órdenes tienen la misma calidad económica. Una orden de cliente normalmente vale más estratégicamente que una orden interna o de garantía. El mix actual es <b>sano</b>: <b>79% son órdenes de clientes</b> (11,722), solo <b>6% son garantías</b> (891) y <b>5% son internas</b> (770). El crecimiento de postventa está sustentado por <b>demanda real</b>, no por trabajo improductivo o cobertura de fallas.", "en": "The key question: <b>is aftersales growing by profitable demand or by internal work/warranties?</b> Not all orders have the same economic quality. A customer order is typically worth more strategically than an internal or warranty order. The current mix is <b>healthy</b>: <b>79% are customer orders</b> (11,722), only <b>6% are warranty</b> (891) and <b>5% are internal</b> (770). Aftersales growth is supported by <b>real demand</b>, not by unproductive work or failure coverage."}, "add06_head": {"es": "Analisis", "en": "Analysis"}, "add06_body": {"es": "Este bloque responde: <b>¿estamos usando bien la capacidad instalada o tenemos productividad atrapada?</b> Con <b>96.1% de utilización</b> (horas vendidas sobre horas trabajadas) y <b>94.4% de horas en clientes</b>, la capacidad está siendo bien aprovechada. Los <b>10 bays y 5 elevadores</b> producen 2,684 y 5,368 horas vendidas respectivamente. El flujo de <b>122 ROs por día operativo</b> es saludable. Para top management esto traduce postventa en <b>eficiencia operativa real</b>.", "en": "This block answers: <b>are we using installed capacity well or do we have trapped productivity?</b> With <b>96.1% utilization</b> (hours sold over hours worked) and <b>94.4% customer hours</b>, capacity is being well leveraged. The <b>10 bays and 5 elevators</b> produce 2,684 and 5,368 hours sold respectively. The flow of <b>122 ROs per operating day</b> is healthy. For top management this translates aftersales into <b>real operational efficiency</b>."}, "drivers_head": {"es": "Analisis", "en": "Analysis"}, "drivers_body": {"es": "Este cockpit ejecutivo consolida los <b>drivers operativos y financieros</b> que explican por qué la utilidad final no refleja la operación real. <b>Collections</b> muestra $3.26M crítico (>120 días). <b>Financial</b> es la mayor alerta: el resultado financiero neto destruye <b>43.2% del EBIT</b>, principalmente por Floor Plan ($6.71M). <b>Operations, productividad y capacidad</b> están en buen estado — postventa al 96.1% de utilización. <b>Inventory</b> de 165 vehículos nuevos requiere rotación para reducir el costo financiero del Floor Plan. Top management debería leer estas 5 categorías como las palancas que mueven el resultado final.", "en": "This executive cockpit consolidates the <b>operational and financial drivers</b> that explain why final profit doesn't reflect real operations. <b>Collections</b> shows $3.26M critical (>120 days). <b>Financial</b> is the biggest alert: net financial result destroys <b>43.2% of EBIT</b>, mainly from Floor Plan ($6.71M). <b>Operations, productivity and capacity</b> are healthy — aftersales at 96.1% utilization. <b>Inventory</b> of 165 new vehicles requires rotation to reduce Floor Plan financial cost. Top management should read these 5 categories as the levers that move the final result."}, "drv_cash_q": {"es": "Where is cash trapped?", "en": "Where is cash trapped?"}, "drv_fin_q": {"es": "How much of the result does financial cost destroy?", "en": "How much of the result does financial cost destroy?"}, "drv_aft_q": {"es": "Are we leveraging installed capacity?", "en": "Are we leveraging installed capacity?"}, "drv_qua_q": {"es": "Is profit real operational or extraordinary?", "en": "Is profit real operational or extraordinary?"}, "drv_head": {"es": "Analisis", "en": "Analysis"}, "drv_body": {"es": "Este cockpit consolida los <b>4 drivers que explican por qué la utilidad final no refleja la operación real</b>. <b>Cash Pressure</b> muestra $3.26M crítico (&gt;120 días) y $32.77M atrapado en inventario. <b>Financial Pressure</b> es la mayor alerta: el resultado financiero destruye <b>43.2% del EBIT</b>, principalmente por Floor Plan ($6.71M). <b>Aftersales Productivity</b> está sano — 96.1% de utilización. <b>Result Quality</b> tiene +$2.07M de ingresos extraordinarios cuyo desglose define si la utilidad es repetible. Top management debe leer estos 4 cuadrantes como las palancas que mueven el resultado final.", "en": "This cockpit consolidates the <b>4 drivers that explain why final profit doesn't reflect real operations</b>. <b>Cash Pressure</b> shows $3.26M critical (&gt;120 days) and $32.77M trapped in inventory. <b>Financial Pressure</b> is the biggest alert: net financial result destroys <b>43.2% of EBIT</b>, mainly from Floor Plan ($6.71M). <b>Aftersales Productivity</b> is healthy — 96.1% utilization. <b>Result Quality</b> has +$2.07M of extraordinary income whose breakdown defines whether profit is repeatable. Top management must read these 4 quadrants as the levers that move the final result."}, "drv_s01_head": {"es": "Analisis", "en": "Analysis"}, "drv_s01_body": {"es": "El portafolio crece de forma <b>desbalanceada</b>. Ventas totales +12.9% ($544.99M) y utilidad bruta +9.1%, pero <b>la utilidad crece más lento que las ventas</b> — primera señal de erosión de margen. Nuevos lidera con <b>+7.9% en unidades</b> (+76 u), mientras <b>Pre-Owned cae -9.0%</b> y resta tracción al pipeline. La pregunta ejecutiva no es si crecemos, sino <b>cómo</b>: ¿cuánto del +12.9% en ventas viene de mix, de precio promedio o de descuento agresivo? Y ¿por qué seminuevos pierde tracción cuando el mercado mexicano está hambriento de auto usado financiado?", "en": "The portfolio grows <b>unevenly</b>. Total sales +12.9% ($544.99M) and gross profit +9.1%, but <b>profit grows slower than sales</b> — the first sign of margin erosion. New leads with <b>+7.9% in units</b> (+76 u), while <b>Pre-Owned drops -9.0%</b> and pulls traction from the pipeline. The executive question is not whether we grow, but <b>how</b>: how much of the +12.9% in sales comes from mix, average price, or aggressive discounting? And why is Pre-Owned losing traction when the Mexican market is hungry for financed used cars?"}, "drv_s02_head": {"es": "Analisis", "en": "Analysis"}, "drv_s02_body": {"es": "El margen bruto consolidado de <b>14.2%</b> esconde una operación <b>de dos velocidades</b>. Nuevos opera a <b>6.5%</b> (cayendo) y Fleet a <b>1.65%</b> — apenas cubren costos directos. La rentabilidad real vive en <b>F&amp;I (93.5% de margen, $11.77M de GP)</b> y <b>Aftersales (35% de la GP consolidada, $27M)</b>. Estas dos áreas, con apenas <b>12% de las ventas</b>, sostienen prácticamente toda la utilidad bruta. La lectura: <b>cada vehículo nuevo vendido es un boleto de entrada</b> para colocar productos rentables — financiamiento, seguros, refacciones, servicio. Pregunta de dirección: ¿estamos midiendo a la fuerza de ventas por unidades cerradas o por <b>penetración de F&amp;I y captación de aftersales por unidad</b>?", "en": "The consolidated gross margin of <b>14.2%</b> hides a <b>two-speed operation</b>. New runs at <b>6.5%</b> (declining) and Fleet at <b>1.65%</b> — barely covering direct costs. Real profitability lives in <b>F&amp;I (93.5% margin, $11.77M GP)</b> and <b>Aftersales (35% of consolidated GP, $27M)</b>. These two areas, with just <b>12% of sales</b>, sustain practically all gross profit. The reading: <b>each new vehicle sold is an entry ticket</b> to place profitable products — financing, insurance, parts, service. Management question: are we measuring the sales force by closed units, or by <b>F&amp;I penetration and aftersales capture per unit</b>?"}, "drv_s03_head": {"es": "Analisis", "en": "Analysis"}, "drv_s03_body": {"es": "<b>$42.73M en cuentas por cobrar — la mayor partida del activo circulante (38.2%)</b>. La cobranza, no el efectivo, es lo que financia esta operación. Pero el envejecimiento preocupa: <b>$3.91M (9.0%) sobre 90 días</b> y <b>$3.26M (7.5%) crítico (+120 días)</b>. Suman <b>$7.17M en riesgo de incobrabilidad</b> — aproximadamente <b>el equivalente al EBIT de un mes</b>. El efectivo representa apenas el <b>9.8% del activo circulante</b>: buffer insuficiente ante cualquier disrupción de cobranza. <b>Acción ejecutiva</b>: comité de cobranza semanal sobre el bucket +120 días, provisión preventiva en cartera crítica, y revisión de los <b>$19.65M de \"Other AR\"</b> — si no son operativos, separarlos del análisis de salud comercial.", "en": "<b>$42.73M in receivables — the largest current-asset line (38.2%)</b>. Collections, not cash, fund this operation. But aging is concerning: <b>$3.91M (9.0%) over 90 days</b> and <b>$3.26M (7.5%) critical (+120 days)</b>. Combined, <b>$7.17M is at write-off risk</b> — roughly <b>one month of EBIT</b>. Cash represents just <b>9.8% of current assets</b>: insufficient buffer against any collection disruption. <b>Executive action</b>: weekly collections committee on the +120 day bucket, preventive provisioning on critical AR, and review of the <b>$19.65M in \"Other AR\"</b> — if non-operational, separate them from commercial health analysis."}, "drv_s04_head": {"es": "Analisis", "en": "Analysis"}, "drv_s04_body": {"es": "<b>$32.77M en inventario, 29.3% del activo circulante</b> — capital de trabajo concentrado en unidades sin vender. Nuevos representa el <b>64.7% ($21.21M)</b>, financiado al <b>107% con floor plan</b> — la línea financia más que el inventario físico, <b>señal clara de sobre-financiamiento</b>. Implica dos cosas: <b>(1)</b> cada día adicional en piso suma <b>~$22K diarios de costo financiero solo en floor plan</b>; <b>(2)</b> la salida es <b>rotación</b>, no más línea. <b>Palanca de dirección</b>: programa de rotación con metas semanales por modelo, descuentos focalizados a unidades <b>&gt;60 días en piso</b>, y revisión del mix de pedidos al fabricante — si el pull es menor al push, el problema seguirá creciendo.", "en": "<b>$32.77M in inventory, 29.3% of current assets</b> — working capital tied up in unsold units. New represents <b>64.7% ($21.21M)</b>, financed at <b>107% via floor plan</b> — the credit line finances more than the physical inventory, a <b>clear sign of over-financing</b>. Two implications: <b>(1)</b> each additional day on the lot adds <b>~$22K of daily financial cost from floor plan alone</b>; <b>(2)</b> the exit is <b>turnover</b>, not more credit. <b>Management lever</b>: turnover program with weekly model-level targets, focused discounts on units <b>&gt;60 days on the lot</b>, and review of the OEM order mix — if pull is below push, the problem keeps compounding."}, "drv_s05_head": {"es": "Analisis", "en": "Analysis"}, "drv_s05_body": {"es": "El balance se ve sano: <b>capital de trabajo positivo de $26.41M</b> y <b>current ratio de 1.31x</b>. Pero los detalles cuentan otra historia. El <b>67.5% del activo circulante está atrapado en AR + inventario</b> — liquidez existe, pero está <b>ilíquida</b>. El <b>91.6% del pasivo es de corto plazo</b>: vencimientos inminentes sin colchón estructural de largo plazo. El <b>quick ratio (sin inventario) cae a ~0.93x</b> — por debajo del umbral seguro. Lectura ejecutiva: la operación puede pagar a 90 días, pero <b>no resiste un shock de 30 días</b> en cobranza o ventas. Pregunta de dirección: ¿qué porcentaje del pasivo corto puede <b>refinanciarse a largo plazo</b> para liberar presión de tesorería?", "en": "The balance sheet looks healthy: <b>positive working capital of $26.41M</b> and <b>current ratio of 1.31x</b>. But the details tell another story. <b>67.5% of current assets are trapped in AR + inventory</b> — liquidity exists, but it's <b>illiquid</b>. <b>91.6% of liabilities are short-term</b>: imminent maturities with no long-term structural cushion. The <b>quick ratio (excluding inventory) drops to ~0.93x</b> — below the safe threshold. Executive reading: operations can pay at 90 days, but <b>cannot withstand a 30-day shock</b> in collections or sales. Management question: what share of short-term liabilities can be <b>refinanced long-term</b> to release treasury pressure?"}, "drv_s06_head": {"es": "Analisis", "en": "Analysis"}, "drv_s06_body": {"es": "El costo financiero es el <b>destructor silencioso de utilidad</b>. Gastos financieros YTD: <b>$9.90M</b>. Productos financieros: $1.33M. Resultado financiero neto: <b>-$8.57M</b>. Este monto consume <b>43.2% del EBIT</b> — casi la mitad de lo que genera la operación se va antes de impuestos en intereses. El <b>Floor Plan domina con $6.71M (67.8%)</b>: financiar inventario es, en proporción, más caro que el resto de la deuda combinada. La cadena es directa: <b>más días de inventario → más costo de piso → menos utilidad neta</b>. Palanca prioritaria: <b>reducir días de inventario en nuevos</b>. Una reducción de 15 días en piso libera <b>~$330K trimestrales</b> en costo financiero — dinero que cae directo a utilidad neta.", "en": "Financial cost is the <b>silent profit destroyer</b>. Financial expenses YTD: <b>$9.90M</b>. Financial income: $1.33M. Net financial result: <b>-$8.57M</b>. This amount consumes <b>43.2% of EBIT</b> — nearly half of what operations generate is gone in interest before taxes. The <b>Floor Plan dominates with $6.71M (67.8%)</b>: financing inventory is, proportionally, more expensive than all other debt combined. The chain is direct: <b>more inventory days → more floor plan cost → less net profit</b>. Priority lever: <b>reduce New Vehicle inventory days</b>. A 15-day reduction releases <b>~$330K quarterly</b> in financial cost — money that drops straight to net profit."}, "drv_s07_head": {"es": "Analisis", "en": "Analysis"}, "drv_s07_body": {"es": "Aftersales corre al <b>96.1% de utilización</b> con <b>14,781 órdenes YTD</b> — una de las áreas con mejor productividad operativa de toda la red. Cada técnico vende <b>3,834 horas/año</b> y procesa <b>2,112 órdenes</b>, con un mix sano (79% cliente, 6% garantía, 5% interno). La paradoja: el área <b>más productiva ya no tiene holgura</b>. La capacidad instalada es de <b>10 bahías / 5 elevadores</b> y está prácticamente saturada. <b>Crecer aquí no es cuestión de eficiencia — es cuestión de CapEx</b>. Pregunta de dirección: ¿cuál es el ROI de adicionar <b>2 bahías y 1 elevador</b>? Con ticket promedio de $1,131 y margen del 82%, el incremental de aftersales se paga con velocidad.", "en": "Aftersales runs at <b>96.1% utilization</b> with <b>14,781 orders YTD</b> — one of the most operationally productive areas in the network. Each technician sells <b>3,834 hours/year</b> and processes <b>2,112 orders</b>, with a healthy mix (79% customer, 6% warranty, 5% internal). The paradox: the <b>most productive area has no slack left</b>. Installed capacity is <b>10 bays / 5 lifts</b> and is essentially saturated. <b>Growth here is not about efficiency — it's about CapEx</b>. Management question: what's the ROI of adding <b>2 bays and 1 lift</b>? With an average ticket of $1,131 and 82% margin, the marginal aftersales investment pays back fast."}, "drv_s08_head": {"es": "Analisis", "en": "Analysis"}, "drv_s08_body": {"es": "La utilidad final <b>no refleja la calidad real</b> de la operación. <b>Net Other Result aporta +$2.07M (9% del EBIT)</b> — casi una décima parte del resultado operativo viene de partidas no operativas. La <b>brecha entre EBIT y Net Profit es brutal: -65.4% ($20.86M → $7.21M)</b>. El recorrido: la operación genera $20.86M, el costo financiero se lleva $8.57M, los impuestos y otros restantes terminan en $7.21M. <b>Calidad de utilidad: mixta</b>. Pregunta ejecutiva: ¿qué porcentaje de los <b>$2.95M en \"Other Products\"</b> es repetible trimestre tras trimestre? Si es recurrente, la operación es más sana de lo que parece; si no, el <b>EBIT \"limpio\" sería ~$18.8M</b> y la conversión a Net Profit aún más débil. Recomendación: <b>desglose mensual de Other Products/Expenses con bandera de recurrencia</b>.", "en": "Final profit <b>doesn't reflect the real quality</b> of operations. <b>Net Other Result adds +$2.07M (9% of EBIT)</b> — nearly a tenth of operating profit comes from non-operating items. The <b>gap between EBIT and Net Profit is brutal: -65.4% ($20.86M → $7.21M)</b>. The journey: operations generate $20.86M, financial cost takes $8.57M, taxes and other remainders end at $7.21M. <b>Profit quality: mixed</b>. Executive question: what share of the <b>$2.95M in \"Other Products\"</b> is repeatable quarter after quarter? If recurring, operations are healthier than they look; if not, <b>\"clean\" EBIT would be ~$18.8M</b> and Net Profit conversion even weaker. Recommendation: <b>monthly breakdown of Other Products/Expenses with a recurrence flag</b>."}};
    var __ANALISIS_LANG = "es"; /* still default Spanish for the insights; non-insight text is hardcoded English */
    function toggleAnalisisLang() {
      __ANALISIS_LANG = __ANALISIS_LANG === "es" ? "en" : "es";
      document.querySelectorAll("[data-i18n]").forEach(function(el) {
        var key = el.dataset.i18n;
        if (I18N[key] && I18N[key][__ANALISIS_LANG] != null) {
          el.innerHTML = I18N[key][__ANALISIS_LANG];
        }
      });
      document.querySelectorAll(".translate-btn").forEach(function(b) {
        b.textContent = __ANALISIS_LANG === "es" ? "Traducir Analisis" : "Switch to Spanish";
      });
    }
    window.toggleAnalisisLang = toggleAnalisisLang;
    const dashRoot = document.querySelector(".dashboard-root");
    if (dashRoot && dashRoot.dataset.i18nBound !== "1") {
      dashRoot.dataset.i18nBound = "1";
      dashRoot.addEventListener("click", function(e) {
        if (!e.target.closest(".translate-btn")) return;
        e.preventDefault();
        toggleAnalisisLang();
      });
    }

  } catch(e) { console.error('Block 6 failed:', e); }

  // --- block 7 ---
  try {
    
    // Block 02 — Liquidity chart
    (function() {
      function buildBS02() {
        const canvas = document.getElementById("bs02-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Current Assets", "Current Liabilities", "Working Capital"],
            datasets: [{
              data: [111.92, 85.51, 26.41],
              backgroundColor: (ctxObj) => {
                const chart = ctxObj.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) return ["#05141F","#BB162B","#00875A"][ctxObj.dataIndex];
                const colors = [
                  ["#2C3A4E", "#0E1B2A", "#05141F"],
                  ["#E63B52", "#C71A30", "#7A0E1A"],
                  ["#5DCE9B", "#00875A", "#005936"]
                ][ctxObj.dataIndex];
                const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
                g.addColorStop(0, colors[0]); g.addColorStop(0.5, colors[1]); g.addColorStop(1, colors[2]);
                return g;
              },
              borderRadius: { topRight: 3, bottomRight: 3 },
              borderSkipped: false,
              maxBarThickness: 38
            }]
          },
          plugins: [{
            id: "bs02Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 13px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left";
                c.textBaseline = "middle";
                c.fillText("$" + v.toFixed(2) + "M", bar.x + 8, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 80 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: {
                beginAtZero: true,
                ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } },
                grid: { color: "#F0F2F5" }
              },
              y: {
                ticks: { font: { size: 12, weight: 700 }, color: "#05141F" },
                grid: { display: false }
              }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS02);
      } else {
        buildBS02();
      }
      const tab3el = document.getElementById("tab3");
      if (tab3el) {
        new MutationObserver(() => { if (tab3el.classList.contains("active")) buildBS02(); })
          .observe(tab3el, { attributes: true, attributeFilter: ["class"] });
      }
    })();
    
  } catch(e) { console.error('Block 7 failed:', e); }

  // --- block 8 ---
  try {
    
    // Block 03 — Current Assets composition donut
    (function() {
      function buildBS03() {
        const canvas = document.getElementById("bs03-donut");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["Accounts Receivable","Inventories","Recoverable Taxes","Cash & Contracts","Prepaid Expenses","Other CA"];
        const data   = [42.73, 32.77, 18.64, 10.95, 5.55, 1.28];
        const palette = ["#BB162B","#05141F","#2C5F8D","#00875A","#6B7280","#9CA3AF"];
        const total = data.reduce((a,b)=>a+b, 0);
    
        new Chart(canvas, {
          type: "doughnut",
          data: { labels: labels, datasets: [{
            data: data,
            backgroundColor: palette,
            borderColor: "#FFFFFF", borderWidth: 3, hoverOffset: 6
          }]},
          plugins: [{
            id: "bs03Center",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2, cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif"; c.fillStyle = "#6B7280";
              c.textAlign = "center"; c.textBaseline = "middle";
              c.fillText("CURRENT ASSETS", cx, cy - 18);
              c.font = "900 22px 'Arial Black', Arial, sans-serif"; c.fillStyle = "#05141F";
              c.fillText("$" + total.toFixed(2) + "M", cx, cy + 4);
              c.restore();
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false, cutout: "62%",
            plugins: {
              legend: { display: true, position: "bottom", labels: {
                font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12, boxHeight: 12, padding: 10
              }},
              tooltip: { callbacks: {
                label: (c) => c.label + ": $" + c.parsed.toFixed(2) + "M (" + (c.parsed/total*100).toFixed(1) + "%)"
              }}
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS03);
      } else { buildBS03(); }
      const tab3el = document.getElementById("tab3");
      if (tab3el) new MutationObserver(() => { if (tab3el.classList.contains("active")) buildBS03(); })
        .observe(tab3el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 8 failed:', e); }

  // --- block 9 ---
  try {
    
    // Block 04 — Inventory composition chart
    (function() {
      function buildBS04() {
        const canvas = document.getElementById("bs04-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["New Cars","Pre-Owned Other Brands","Parts & Accessories","Kia Certified Pre-Owned","Demo Cars","Commercial / Used Trucks","Other Inventory"];
        const data   = [21.21, 5.39, 2.58, 1.61, 0.89, 0.22, 0.87];
        const colors = ["#BB162B","#05141F","#2C5F8D","#6B7280","#9CA3AF","#C9A227","#D1D5DB"];
    
        new Chart(canvas, {
          type: "bar",
          data: { labels: labels, datasets: [{
            data: data,
            backgroundColor: (ctxObj) => {
              const chart = ctxObj.chart; const { ctx, chartArea } = chart;
              if (!chartArea) return colors[ctxObj.dataIndex];
              const base = colors[ctxObj.dataIndex];
              const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              g.addColorStop(0, base + "CC"); g.addColorStop(1, base);
              return g;
            },
            borderRadius: { topRight: 3, bottomRight: 3 },
            borderSkipped: false,
            maxBarThickness: 26
          }]},
          plugins: [{
            id: "bs04Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 11px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left"; c.textBaseline = "middle";
                c.fillText("$" + v.toFixed(2) + "M", bar.x + 6, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { right: 70 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: { beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { ticks: { font: { size: 10.5, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS04);
      } else { buildBS04(); }
      const tab3el = document.getElementById("tab3");
      if (tab3el) new MutationObserver(() => { if (tab3el.classList.contains("active")) buildBS04(); })
        .observe(tab3el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 9 failed:', e); }

  // --- block 10 ---
  try {
    
    // Block 04 — Accounts Receivable composition chart
    (function() {
      function buildBS04AR() {
        const canvas = document.getElementById("bs04ar-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["Accounts Receivable - Customers","Documents and Accounts Receivable - Other","Notes Receivable - Customers","Kia Finance AR","Kia AR","Documents and Accounts Receivable - Officials","Documents and Accounts Receivable - Employees"];
        const data   = [20.97, 18.51, 1.43, 0.76, 0.73, 0.24, 0.10];
        const colors = ["#05141F","#BB162B","#2C5F8D","#6B7280","#9CA3AF","#C9A227","#D1D5DB"];
    
        new Chart(canvas, {
          type: "bar",
          data: { labels: labels, datasets: [{
            data: data,
            backgroundColor: (ctxObj) => {
              const chart = ctxObj.chart; const { ctx, chartArea } = chart;
              if (!chartArea) return colors[ctxObj.dataIndex];
              const base = colors[ctxObj.dataIndex];
              const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              g.addColorStop(0, base + "CC"); g.addColorStop(1, base);
              return g;
            },
            borderRadius: { topRight: 3, bottomRight: 3 },
            borderSkipped: false,
            maxBarThickness: 24
          }]},
          plugins: [{
            id: "bs04arLabels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 11px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left"; c.textBaseline = "middle";
                c.fillText("$" + v.toFixed(2) + "M", bar.x + 6, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { right: 70 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: { beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS04AR);
      } else { buildBS04AR(); }
      const tab3el = document.getElementById("tab3");
      if (tab3el) new MutationObserver(() => { if (tab3el.classList.contains("active")) buildBS04AR(); })
        .observe(tab3el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 10 failed:', e); }

  // --- block 11 ---
  try {
    
    // Block 05 — Short-term Liabilities composition
    (function() {
      function buildBS05() {
        const canvas = document.getElementById("bs05-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        const labels = ["Notes Payable - Floor Plan","Sales Taxes & Service","Accounts Payable - Suppliers","Reserves & Provisions","Other Notes Payable","Other Accounts Payable","Customer Advances","Other Taxes"];
        const data   = [35.08, 14.07, 8.42, 7.87, 5.16, 4.04, 3.42, 1.25];
        const colors = ["#BB162B","#05141F","#2C5F8D","#7A0E1A","#6B7280","#9CA3AF","#C9A227","#D1D5DB"];
    
        new Chart(canvas, {
          type: "bar",
          data: { labels: labels, datasets: [{
            data: data,
            backgroundColor: (ctxObj) => {
              const chart = ctxObj.chart; const { ctx, chartArea } = chart;
              if (!chartArea) return colors[ctxObj.dataIndex];
              const base = colors[ctxObj.dataIndex];
              const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
              g.addColorStop(0, base + "CC"); g.addColorStop(1, base);
              return g;
            },
            borderRadius: { topRight: 3, bottomRight: 3 },
            borderSkipped: false,
            maxBarThickness: 22
          }]},
          plugins: [{
            id: "bs05Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              const meta = chart.getDatasetMeta(0);
              meta.data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 11px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left"; c.textBaseline = "middle";
                c.fillText("$" + v.toFixed(2) + "M", bar.x + 6, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { right: 70 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: { beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildBS05);
      } else { buildBS05(); }
      const tab3el = document.getElementById("tab3");
      if (tab3el) new MutationObserver(() => { if (tab3el.classList.contains("active")) buildBS05(); })
        .observe(tab3el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 11 failed:', e); }

  // --- block 12 ---
  try {
    
    // S&GM Block 01 — New Vehicles PY vs CY
    (function() {
      function buildSGM01() {
        const canvas = document.getElementById("sgm01-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)"],
            datasets: [
              {
                label: "Prior YTD",
                data: [372.0, 30.1],
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart; const { ctx, chartArea } = chart;
                  if (!chartArea) return "#6B7280";
                  const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                  g.addColorStop(0, "#9CA3AF"); g.addColorStop(0.5, "#6B7280"); g.addColorStop(1, "#374151");
                  return g;
                },
                borderRadius: { topLeft: 3, topRight: 3 },
                borderSkipped: false,
                maxBarThickness: 60
              },
              {
                label: "Current YTD",
                data: [432.2, 28.2],
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart; const { ctx, chartArea } = chart;
                  if (!chartArea) return "#05141F";
                  const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                  g.addColorStop(0, "#2C3A4E"); g.addColorStop(0.5, "#0E1B2A"); g.addColorStop(1, "#05141F");
                  return g;
                },
                borderRadius: { topLeft: 3, topRight: 3 },
                borderSkipped: false,
                maxBarThickness: 60
              }
            ]
          },
          plugins: [{
            id: "sgm01Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                const meta = chart.getDatasetMeta(di);
                meta.data.forEach((bar, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + v.toFixed(1) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12, boxHeight: 12 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildSGM01);
      } else { buildSGM01(); }
      const tab4el = document.getElementById("tab4");
      if (tab4el) new MutationObserver(() => { if (tab4el.classList.contains("active")) buildSGM01(); })
        .observe(tab4el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 12 failed:', e); }

  // --- block 13 ---
  try {
    
    // S&GM Block 02 — Fleet PY vs CY
    (function() {
      function buildSGM02() {
        const canvas = document.getElementById("sgm02-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
    
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)"],
            datasets: [
              {
                label: "Prior YTD",
                data: [32.6, 0.67],
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart; const { ctx, chartArea } = chart;
                  if (!chartArea) return "#6B7280";
                  const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                  g.addColorStop(0, "#9CA3AF"); g.addColorStop(0.5, "#6B7280"); g.addColorStop(1, "#374151");
                  return g;
                },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60
              },
              {
                label: "Current YTD",
                data: [58.9, 0.97],
                backgroundColor: (ctxObj) => {
                  const chart = ctxObj.chart; const { ctx, chartArea } = chart;
                  if (!chartArea) return "#05141F";
                  const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                  g.addColorStop(0, "#2C3A4E"); g.addColorStop(0.5, "#0E1B2A"); g.addColorStop(1, "#05141F");
                  return g;
                },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60
              }
            ]
          },
          plugins: [{
            id: "sgm02Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                const meta = chart.getDatasetMeta(di);
                meta.data.forEach((bar, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + v.toFixed(2) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12, boxHeight: 12 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", buildSGM02);
      } else { buildSGM02(); }
      const tab4el = document.getElementById("tab4");
      if (tab4el) new MutationObserver(() => { if (tab4el.classList.contains("active")) buildSGM02(); })
        .observe(tab4el, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 13 failed:', e); }

  // --- block 14 ---
  try {
    
    // S&GM Block 03 — F&I PY vs CY
    (function() {
      function buildSGM03() {
        const canvas = document.getElementById("sgm03-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)"],
            datasets: [
              { label: "Prior YTD", data: [10.8, 10.3],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#6B7280";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#3B4A60"); g.addColorStop(0.5,"#1A2733"); g.addColorStop(1,"#05141F"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 },
              { label: "Current YTD", data: [12.6, 11.8],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#05141F";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#E63B52"); g.addColorStop(0.5,"#C71A30"); g.addColorStop(1,"#7A0E1A"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 }
            ]
          },
          plugins: [{
            id: "sgm03Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  c.save(); c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + ds.data[idx].toFixed(2) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildSGM03); } else { buildSGM03(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildSGM03(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // S&GM Block 04 — Service PY vs CY (Sales + GP + per-RO metrics)
    (function() {
      function buildSGM04() {
        const canvas = document.getElementById("sgm04-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)", "Units (k)"],
            datasets: [
              { label: "Prior YTD", data: [15.0, 11.9, 11.109],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#6B7280";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#3B4A60"); g.addColorStop(0.5,"#1A2733"); g.addColorStop(1,"#05141F"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 },
              { label: "Current YTD", data: [16.2, 13.3, 14.328],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#05141F";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#E63B52"); g.addColorStop(0.5,"#C71A30"); g.addColorStop(1,"#7A0E1A"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 }
            ]
          },
          plugins: [{
            id: "sgm04Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  c.save(); c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  const v = ds.data[idx];
                  const label = idx === 2 ? (v * 1000).toLocaleString("en-US") : "$" + v.toFixed(1) + "M";
                  c.fillText(label, bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => {
                if (c.dataIndex === 2) return c.dataset.label + ": " + (c.parsed.y * 1000).toLocaleString("en-US") + " ROs";
                return c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M";
              } } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildSGM04); } else { buildSGM04(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildSGM04(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 14 failed:', e); }

  // --- block 15 ---
  try {
    
    // S&GM Block 05 — Parts PY vs CY
    (function() {
      function buildSGM05() {
        const canvas = document.getElementById("sgm05-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)"],
            datasets: [
              { label: "Prior YTD", data: [33.0, 10.2],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#6B7280";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#3B4A60"); g.addColorStop(0.5,"#1A2733"); g.addColorStop(1,"#05141F"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 },
              { label: "Current YTD", data: [36.3, 11.5],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#05141F";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#E63B52"); g.addColorStop(0.5,"#C71A30"); g.addColorStop(1,"#7A0E1A"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 }
            ]
          },
          plugins: [{
            id: "sgm05Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  c.save(); c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + ds.data[idx].toFixed(2) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildSGM05); } else { buildSGM05(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildSGM05(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // S&GM Block 06 — Body & Paint PY vs CY
    (function() {
      function buildSGM06() {
        const canvas = document.getElementById("sgm06-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Sales ($M)", "Gross Profit ($M)", "Units (×10)"],
            datasets: [
              { label: "Prior YTD", data: [4.8, 2.4, 46.5],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#6B7280";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#3B4A60"); g.addColorStop(0.5,"#1A2733"); g.addColorStop(1,"#05141F"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 },
              { label: "Current YTD", data: [4.4, 2.2, 45.3],
                backgroundColor: (c) => { const a = c.chart.chartArea; if (!a) return "#BB162B";
                  const g = c.chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                  g.addColorStop(0,"#E63B52"); g.addColorStop(0.5,"#C71A30"); g.addColorStop(1,"#7A0E1A"); return g; },
                borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false, maxBarThickness: 60 }
            ]
          },
          plugins: [{
            id: "sgm06Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.data.datasets.forEach((ds, di) => {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  c.save(); c.fillStyle = "#05141F";
                  c.font = "900 11px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  const v = ds.data[idx];
                  const label = idx === 2 ? (v * 10).toFixed(0) + " u" : "$" + v.toFixed(2) + "M";
                  c.fillText(label, bar.x, bar.y - 10);
                  c.restore();
                });
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 60 } },
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => {
                if (c.dataIndex === 2) return c.dataset.label + ": " + (c.parsed.y * 10).toFixed(0) + " units";
                return c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M";
              } } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { beginAtZero: true, grace: "20%", ticks: { font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildSGM06); } else { buildSGM06(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildSGM06(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 15 failed:', e); }

  // --- block 16 ---
  try {
    
    
    // === Shared bar gradient helper for executive dashboards ===
    window.mkBarGrad = function(hex) {
      function toRgba(h, a) {
        const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      }
      return function(ctxObj) {
        const chart = ctxObj.chart;
        const area = chart.chartArea;
        if (!area) return hex;
        const grad = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
        grad.addColorStop(0,    toRgba(hex, 0.18));
        grad.addColorStop(0.45, toRgba(hex, 0.78));
        grad.addColorStop(0.85, hex);
        grad.addColorStop(1,    hex);
        return grad;
      };
    };
    
    // ============== Dashboard 1 — Gross Margin Overview ==============
    (function() {
      function buildD1() {
        const canvas = document.getElementById("d1-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        const labels = ["New Vehicles","Pre-Owned","F&I","Service","Parts","Body & Paint"];
        const sales = [432.2, 41.4, 12.6, 16.2, 36.3, 4.4];
        const gp = [28.2, 5.4, 11.8, 13.3, 11.5, 2.2];
        const gm = [6.5, 13.0, 93.5, 82.3, 31.7, 50.0];
        const d1Labels = {
          id: "d1BarLabels",
          afterDatasetsDraw(chart) {
            const c = chart.ctx;
            chart.data.datasets.forEach((ds, di) => {
              if (ds.type === "line") {
                chart.getDatasetMeta(di).data.forEach((pt, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#1B4D3E";
                  c.font = "700 9.5px Arial, Helvetica, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText(v.toFixed(1) + "%", pt.x, pt.y - 8);
                  c.restore();
                });
              } else {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#05141F";
                  c.font = "900 9.5px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + v.toFixed(1) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              }
            });
          }
        };
        new Chart(canvas, {
          type: "bar",
          plugins: [d1Labels],
          data: {
            labels: labels,
            datasets: [
              { label: "Sales ($M)", data: sales, backgroundColor: window.mkBarGrad("#05141F"), yAxisID: "y1", borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false },
              { label: "Gross Profit ($M)", data: gp, backgroundColor: window.mkBarGrad("#BB162B"), yAxisID: "y1", borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false },
              { label: "Gross Margin %", data: gm, type: "line", borderColor: "#1B4D3E", backgroundColor: "rgba(27,77,62,0.06)", borderWidth: 1.4, borderDash: [4, 3], yAxisID: "y2", tension: 0.35, fill: true, pointRadius: 3, pointBackgroundColor: "#FFFFFF", pointBorderColor: "#1B4D3E", pointBorderWidth: 1.5, pointHoverRadius: 5 }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => {
                if (c.dataset.label === "Gross Margin %") return c.dataset.label + ": " + c.parsed.y.toFixed(1) + "%";
                return c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M";
              } } }
            },
            scales: {
              x: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F", maxRotation: 25 }, grid: { display: false } },
              y1: { type: "linear", position: "left", beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y2: { type: "linear", position: "right", beginAtZero: true, max: 100, ticks: { callback: (v) => v + "%", font: { size: 10 }, color: "#1B4D3E" }, grid: { display: false } }
            },
            layout: { padding: { top: 30 } }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildD1); } else { buildD1(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildD1(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ============== Dashboard 2 — Volume vs Margin ==============
    (function() {
      function buildD2() {
        const canvas = document.getElementById("d2-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        const labels = ["New Vehicles","Pre-Owned","F&I","Service","Parts","Body & Paint"];
        const salesG = [16.2, -9.0, 16.7, 8.0, 10.0, -8.3];
        const unitsG = [7.9, -5.1, 0, 29.0, 0, -2.6];
        const gpG = [-6.3, -9.5, 14.6, 11.8, 12.7, -8.3];
        const mC = [-1.6, -0.07, -2.2, 2.48, 0.9, 0];
        const d2Labels = {
          id: "d2BarLabels",
          afterDatasetsDraw(chart) {
            const c = chart.ctx;
            // Only label the line (GM Change) for clarity — bars use tooltips
            chart.data.datasets.forEach((ds, di) => {
              if (ds.type !== "line") return;
              chart.getDatasetMeta(di).data.forEach((pt, idx) => {
                const v = ds.data[idx];
                const sign = v >= 0 ? "+" : "";
                const label = sign + v.toFixed(1) + "pp";
                // Background pill behind the text for readability
                c.save();
                c.font = "700 9px Arial, Helvetica, sans-serif";
                const tw = c.measureText(label).width;
                const padX = 5, padY = 2.5;
                const x = pt.x, y = pt.y - 14;
                c.fillStyle = "#FFFFFF";
                c.strokeStyle = "#1B4D3E";
                c.lineWidth = 1;
                c.beginPath();
                c.roundRect(x - tw/2 - padX, y - 8, tw + padX*2, 13, 6);
                c.fill(); c.stroke();
                c.fillStyle = "#1B4D3E";
                c.textAlign = "center"; c.textBaseline = "middle";
                c.fillText(label, x, y - 1.5);
                c.restore();
              });
            });
          }
        };
        new Chart(canvas, {
          type: "bar",
          plugins: [d2Labels],
          data: {
            labels: labels,
            datasets: [
              { label: "Sales Growth %", data: salesG, backgroundColor: window.mkBarGrad("#6B7280"), borderRadius: { topLeft: 2, topRight: 2 }, borderSkipped: false },
              { label: "Units Growth %", data: unitsG, backgroundColor: window.mkBarGrad("#2C5F8D"), borderRadius: { topLeft: 2, topRight: 2 }, borderSkipped: false },
              { label: "GP Growth %", data: gpG, backgroundColor: window.mkBarGrad("#BB162B"), borderRadius: { topLeft: 2, topRight: 2 }, borderSkipped: false },
              { label: "GM Change (pp)", data: mC, type: "line", borderColor: "#1B4D3E", backgroundColor: "rgba(27,77,62,0.06)", borderWidth: 1.4, borderDash: [4, 3], yAxisID: "y2", tension: 0.35, fill: true, pointRadius: 3, pointBackgroundColor: "#FFFFFF", pointBorderColor: "#1B4D3E", pointBorderWidth: 1.5, pointHoverRadius: 5 }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": " + c.parsed.y.toFixed(2) + (c.dataset.label.includes("pp") ? " pp" : "%") } }
            },
            scales: {
              x: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F", maxRotation: 25 }, grid: { display: false } },
              y: { type: "linear", position: "left", grace: "15%", ticks: { callback: (v) => v + "%", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y2: { type: "linear", position: "right", grace: "30%", ticks: { callback: (v) => v + "pp", font: { size: 10 }, color: "#1B4D3E" }, grid: { display: false } }
            },
            layout: { padding: { top: 50 } }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildD2); } else { buildD2(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildD2(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ============== Dashboard 3 — New Vehicles Mix ==============
    (function() {
      function buildD3() {
        function makeBar(id, labels, data, color, fmt) {
          const canvas = document.getElementById(id);
          if (!canvas || canvas.dataset.built) return;
          canvas.dataset.built = "1";
          new Chart(canvas, {
            type: "bar",
            data: { labels: labels, datasets: [{
              data: data,
              backgroundColor: window.mkBarGrad(color),
              borderRadius: { topRight: 3, bottomRight: 3 },
              borderSkipped: false,
              maxBarThickness: 22
            }]},
            plugins: [{
              id: id + "Labels",
              afterDatasetsDraw(chart) {
                const c = chart.ctx;
                chart.getDatasetMeta(0).data.forEach((bar, idx) => {
                  const v = chart.data.datasets[0].data[idx];
                  c.save(); c.fillStyle = "#05141F";
                  c.font = "900 10.5px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "left"; c.textBaseline = "middle";
                  c.fillText(fmt(v), bar.x + 6, bar.y);
                  c.restore();
                });
              }
            }],
            options: {
              indexAxis: "y",
              responsive: true, maintainAspectRatio: false,
              layout: { padding: { right: 80 } },
              plugins: { legend: { display: false } },
              scales: {
                x: { beginAtZero: true, ticks: { font: { size: 9.5 } }, grid: { color: "#F0F2F5" } },
                y: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
              }
            }
          });
        }
        const topUnits = ["K3","Seltos","Sonet","K3 Hatch.","Forte Sedan","Sportage","K4","Sorento"];
        const unitsData = [348, 151, 89, 88, 78, 65, 32, 21];
        makeBar("d3-units", topUnits, unitsData, "#05141F", (v) => v.toLocaleString("en-US") + " u");
        const topGP = ["K3","Seltos","Sportage","Sonet","K3 Hatch.","Sorento","K4","Niro"];
        const gpData = [6.84, 6.00, 3.14, 3.11, 2.80, 1.63, 1.44, 0.87];
        makeBar("d3-gp", topGP, gpData, "#BB162B", (v) => "$" + v.toFixed(2) + "M");
        const gpuLabels = ["Niro","Sorento","Sportage","K4","Seltos","Sonet","K3 Hatch.","K3","Forte Sedan"];
        const gpuData = [87040, 77576, 48377, 45150, 39766, 34970, 31785, 19656, 8493];
        makeBar("d3-gpu", gpuLabels, gpuData, "#2C5F8D", (v) => "$" + (v/1000).toFixed(1) + "K");
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildD3); } else { buildD3(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildD3(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ============== Dashboard 4 — F&I Monetization ==============
    (function() {
      function buildD4() {
        const canvas = document.getElementById("d4-mix");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Financial Income - New","Insurance Fees - New","Other Income","Insurance Fees - Pre-Owned","Financial Income - Pre-Owned","Admin Office"],
            datasets: [{
              data: [5.02, 4.12, 2.14, 0.26, 0.06, 0.19],
              backgroundColor: ["#05141F","#BB162B","#2C5F8D","#6B7280","#9CA3AF","#C9A227"],
              borderColor: "#FFFFFF", borderWidth: 3, hoverOffset: 6
            }]
          },
          plugins: [{
            id: "d4Center",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2, cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif"; c.fillStyle = "#6B7280";
              c.textAlign = "center"; c.textBaseline = "middle";
              c.fillText("F&I GROSS PROFIT", cx, cy - 16);
              c.font = "900 20px 'Arial Black', Arial, sans-serif"; c.fillStyle = "#05141F";
              c.fillText("$11.77M", cx, cy + 6);
              c.restore();
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false, cutout: "62%",
            plugins: {
              legend: { display: true, position: "bottom", labels: { font: { size: 9, weight: 700 }, color: "#05141F", boxWidth: 10, padding: 6 } },
              tooltip: { callbacks: { label: (c) => c.label + ": $" + c.parsed.toFixed(2) + "M" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildD4); } else { buildD4(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildD4(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ============== Dashboard 5 — Aftersales GP Engine ==============
    (function() {
      function buildD5() {
        const canvas = document.getElementById("d5-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        const d5Labels = {
          id: "d5BarLabels",
          afterDatasetsDraw(chart) {
            const c = chart.ctx;
            chart.data.datasets.forEach((ds, di) => {
              if (ds.type === "line") {
                chart.getDatasetMeta(di).data.forEach((pt, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#1B4D3E";
                  c.font = "700 9.5px Arial, Helvetica, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText(v.toFixed(1) + "%", pt.x, pt.y - 8);
                  c.restore();
                });
              } else {
                chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                  const v = ds.data[idx];
                  c.save();
                  c.fillStyle = "#05141F";
                  c.font = "900 9.5px 'Arial Black', Arial, sans-serif";
                  c.textAlign = "center"; c.textBaseline = "bottom";
                  c.fillText("$" + v.toFixed(1) + "M", bar.x, bar.y - 10);
                  c.restore();
                });
              }
            });
          }
        };
        new Chart(canvas, {
          type: "bar",
          plugins: [d5Labels],
          data: {
            labels: ["Service","Parts","Body & Paint"],
            datasets: [
              { label: "Sales ($M)", data: [16.2, 36.3, 4.4], backgroundColor: window.mkBarGrad("#6B7280"), yAxisID: "y1", borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false },
              { label: "Gross Profit ($M)", data: [13.3, 11.5, 2.2], backgroundColor: window.mkBarGrad("#05141F"), yAxisID: "y1", borderRadius: { topLeft: 3, topRight: 3 }, borderSkipped: false },
              { label: "Gross Margin %", data: [82.3, 31.7, 50.0], type: "line", borderColor: "#1B4D3E", backgroundColor: "rgba(27,77,62,0.06)", borderWidth: 1.4, borderDash: [4, 3], yAxisID: "y2", tension: 0.35, fill: true, pointRadius: 3, pointBackgroundColor: "#FFFFFF", pointBorderColor: "#1B4D3E", pointBorderWidth: 1.5, pointHoverRadius: 5 }
            ]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 10, weight: 700 }, color: "#05141F", boxWidth: 12 } },
              tooltip: { callbacks: { label: (c) => {
                if (c.dataset.label === "Gross Margin %") return c.dataset.label + ": " + c.parsed.y.toFixed(1) + "%";
                return c.dataset.label + ": $" + c.parsed.y.toFixed(2) + "M";
              } } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y1: { type: "linear", position: "left", beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y2: { type: "linear", position: "right", beginAtZero: true, max: 100, ticks: { callback: (v) => v + "%", font: { size: 10 }, color: "#1B4D3E" }, grid: { display: false } }
            },
            layout: { padding: { top: 30 } }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildD5); } else { buildD5(); }
      const t4 = document.getElementById("tab4");
      if (t4) new MutationObserver(() => { if (t4.classList.contains("active")) buildD5(); }).observe(t4, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 16 failed:', e); }

  // --- block 17 ---
  try {
    
    // Executive Dashboards — radio-style reveal via badge click (no scroll, no flicker)
    (function() {
      document.querySelectorAll(".badge-dash[data-show]").forEach(btn => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.show;
          const wrap = document.getElementById("dash-" + target);
          const hint = document.getElementById("dashboard-hint");
    
          // Toggle off if already active
          if (btn.classList.contains("active")) {
            if (wrap) wrap.classList.remove("active");
            btn.classList.remove("active");
            if (hint) hint.style.display = "";
            return;
          }
    
          // Hide every other dashboard and deactivate other badges
          document.querySelectorAll(".dashboard-wrap").forEach(w => w.classList.remove("active"));
          document.querySelectorAll(".badge-dash[data-show]").forEach(b => b.classList.remove("active"));
    
          // Reveal the chosen one
          if (wrap) wrap.classList.add("active");
          btn.classList.add("active");
          if (hint) hint.style.display = "none";
    
          // Resize any Chart.js charts that were just made visible (they may have rendered at 0x0 while hidden)
          setTimeout(() => {
            if (!wrap || typeof Chart === "undefined") return;
            wrap.querySelectorAll("canvas").forEach(canvas => {
              const chart = Chart.getChart(canvas);
              if (chart) chart.resize();
            });
          }, 60);
        });
      });
    })();
    
  } catch(e) { console.error('Block 17 failed:', e); }

  // --- block 18 ---
  try {
    
    // ADD Block 01 — AR Aging stacked horizontal bar
    (function() {
      function buildADD01() {
        const canvas = document.getElementById("add01-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["A/R Customers", "Other A/R", "Notes Receivable", "Kia Finance A/R", "KMM A/R", "Officials & Employees"],
            datasets: [
              { label: "30 days", data: [18.09, 16.42, 1.31, 0.77, 0.68, 0.27], backgroundColor: window.mkBarGrad("#00875A"), stack: "ar" },
              { label: "60 days", data: [1.37, 0.58, 0.05, 0.01, 0.02, 0.00], backgroundColor: window.mkBarGrad("#B7791F"), stack: "ar" },
              { label: "90 days", data: [0.32, 0.27, 0.04, 0.01, 0.01, 0.01], backgroundColor: window.mkBarGrad("#D97706"), stack: "ar" },
              { label: "120 days", data: [0.32, 0.23, 0.03, 0.00, 0.00, 0.00], backgroundColor: window.mkBarGrad("#BB162B"), stack: "ar" },
              { label: "> 120 days", data: [0.48, 2.15, 0.01, 0.03, 0.00, 0.01], backgroundColor: window.mkBarGrad("#7A0E1A"), stack: "ar" }
            ]
          },
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: true, position: "top", labels: { font: { size: 9.5, weight: 700 }, color: "#05141F", boxWidth: 12, padding: 8 } },
              tooltip: { callbacks: { label: (c) => c.dataset.label + ": $" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: { stacked: true, beginAtZero: true, ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { stacked: true, ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            },
            layout: { padding: { top: 10 } }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD01); } else { buildADD01(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD01(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ADD Block 02 — Financial Products vs Expenses comparison
    (function() {
      function buildADD02() {
        const canvas = document.getElementById("add02-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Financial Products", "Financial Expenses", "Net Result"],
            datasets: [{
              data: [1.33, 9.90, -8.57],
              backgroundColor: (ctxObj) => {
                const colors = ["#00875A","#BB162B","#7A0E1A"];
                const i = ctxObj.dataIndex;
                const chart = ctxObj.chart; const a = chart.chartArea;
                if (!a) return colors[i];
                const base = colors[i];
                const g = chart.ctx.createLinearGradient(0, a.top, 0, a.bottom);
                function toRgba(h, al) { const r = parseInt(h.slice(1,3),16), gg = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16); return "rgba(" + r + "," + gg + "," + b + "," + al + ")"; }
                g.addColorStop(0, toRgba(base, 0.18));
                g.addColorStop(0.45, toRgba(base, 0.78));
                g.addColorStop(0.85, base);
                g.addColorStop(1, base);
                return g;
              },
              borderRadius: { topLeft: 3, topRight: 3, bottomLeft: 3, bottomRight: 3 },
              borderSkipped: false,
              maxBarThickness: 90
            }]
          },
          plugins: [{
            id: "add02Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.getDatasetMeta(0).data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 12px 'Arial Black', Arial, sans-serif";
                c.textAlign = "center";
                if (v >= 0) { c.textBaseline = "bottom"; c.fillText("$" + v.toFixed(2) + "M", bar.x, bar.y - 6); }
                else { c.textBaseline = "top"; c.fillText("-$" + Math.abs(v).toFixed(2) + "M", bar.x, bar.y + 6); }
                c.restore();
              });
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { top: 30, bottom: 20 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.y.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { font: { size: 11, weight: 700 }, color: "#05141F" }, grid: { display: false } },
              y: { grace: "20%", ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD02); } else { buildADD02(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD02(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 18 failed:', e); }

  // --- block 19 ---
  try {
    
    // ADD Block 03 — Other Products vs Other Expenses
    (function() {
      function buildADD03() {
        const canvas = document.getElementById("add03-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Diverse", "Other Kia Products", "Recovery Adv.", "Sale of Assets", "Collection (income)", "Corp Expenses", "Diverse (expense)", "Collection (expense)"],
            datasets: [{
              data: [1.46, 1.24, 0.22, 0.02, 0.01, -0.15, -0.69, -0.03],
              backgroundColor: (ctxObj) => {
                const v = ctxObj.dataset.data[ctxObj.dataIndex];
                const base = v >= 0 ? "#00875A" : "#BB162B";
                const chart = ctxObj.chart; const a = chart.chartArea;
                if (!a) return base;
                const g = chart.ctx.createLinearGradient(a.left, 0, a.right, 0);
                function toRgba(h, al) { const r = parseInt(h.slice(1,3),16), gg = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16); return "rgba(" + r + "," + gg + "," + b + "," + al + ")"; }
                g.addColorStop(0, toRgba(base, 0.5));
                g.addColorStop(1, base);
                return g;
              },
              borderRadius: { topRight: 3, bottomRight: 3 },
              borderSkipped: false,
              maxBarThickness: 24
            }]
          },
          plugins: [{
            id: "add03Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.getDatasetMeta(0).data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 10px 'Arial Black', Arial, sans-serif";
                c.textBaseline = "middle";
                if (v >= 0) { c.textAlign = "left"; c.fillText("$" + v.toFixed(2) + "M", bar.x + 6, bar.y); }
                else { c.textAlign = "right"; c.fillText("-$" + Math.abs(v).toFixed(2) + "M", bar.x - 6, bar.y); }
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { left: 60, right: 70 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => "$" + c.parsed.x.toFixed(2) + "M" } }
            },
            scales: {
              x: { ticks: { callback: (v) => "$" + v + "M", font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD03); } else { buildADD03(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD03(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ADD Block 04 — Headcount Distribution
    (function() {
      function buildADD04() {
        const canvas = document.getElementById("add04-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Sales / Commercial","Administrative","Mechanical Technicians","Body & Paint Tech.","Service Advisors","Express / Other"],
            datasets: [{
              data: [17, 12, 7, 10, 5, 5],
              backgroundColor: ["#05141F","#6B7280","#BB162B","#2C5F8D","#00875A","#C9A227"],
              borderColor: "#FFFFFF", borderWidth: 3, hoverOffset: 6
            }]
          },
          plugins: [{
            id: "add04Center",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2, cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif"; c.fillStyle = "#6B7280";
              c.textAlign = "center"; c.textBaseline = "middle";
              c.fillText("TOTAL HEADCOUNT", cx, cy - 16);
              c.font = "900 24px 'Arial Black', Arial, sans-serif"; c.fillStyle = "#05141F";
              c.fillText("56", cx, cy + 8);
              c.restore();
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false, cutout: "60%",
            plugins: {
              legend: { display: true, position: "bottom", labels: { font: { size: 9.5, weight: 700 }, color: "#05141F", boxWidth: 12, padding: 8 } },
              tooltip: { callbacks: { label: (c) => c.label + ": " + c.parsed + " people (" + (c.parsed/56*100).toFixed(1) + "%)" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD04); } else { buildADD04(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD04(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
    // ADD Block 05 — Repair Orders by Type
    (function() {
      function buildADD05() {
        const canvas = document.getElementById("add05-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "bar",
          data: {
            labels: ["Customer Service","Express Service","Warranty","Internal","Previous Inspect.","Body Customer","Body Workshops","Pending"],
            datasets: [{
              data: [8479, 2989, 891, 770, 1199, 254, 199, 110],
              backgroundColor: (ctxObj) => {
                const colors = ["#00875A","#0E7C7B","#B7791F","#6B7280","#9CA3AF","#2C5F8D","#374151","#BB162B"];
                const base = colors[ctxObj.dataIndex];
                const chart = ctxObj.chart; const a = chart.chartArea;
                if (!a) return base;
                const g = chart.ctx.createLinearGradient(a.left, 0, a.right, 0);
                function toRgba(h, al) { const r = parseInt(h.slice(1,3),16), gg = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16); return "rgba(" + r + "," + gg + "," + b + "," + al + ")"; }
                g.addColorStop(0, toRgba(base, 0.5));
                g.addColorStop(1, base);
                return g;
              },
              borderRadius: { topRight: 3, bottomRight: 3 },
              borderSkipped: false,
              maxBarThickness: 24
            }]
          },
          plugins: [{
            id: "add05Labels",
            afterDatasetsDraw(chart) {
              const c = chart.ctx;
              chart.getDatasetMeta(0).data.forEach((bar, idx) => {
                const v = chart.data.datasets[0].data[idx];
                c.save();
                c.fillStyle = "#05141F";
                c.font = "900 10px 'Arial Black', Arial, sans-serif";
                c.textAlign = "left"; c.textBaseline = "middle";
                c.fillText(v.toLocaleString("en-US") + " ROs", bar.x + 6, bar.y);
                c.restore();
              });
            }
          }],
          options: {
            indexAxis: "y",
            responsive: true, maintainAspectRatio: false,
            layout: { padding: { right: 80 } },
            plugins: {
              legend: { display: false },
              tooltip: { callbacks: { label: (c) => c.parsed.x.toLocaleString("en-US") + " ROs" } }
            },
            scales: {
              x: { beginAtZero: true, ticks: { callback: (v) => v.toLocaleString("en-US"), font: { size: 10 } }, grid: { color: "#F0F2F5" } },
              y: { ticks: { font: { size: 10, weight: 700 }, color: "#05141F" }, grid: { display: false } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD05); } else { buildADD05(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD05(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 19 failed:', e); }

  // --- block 20 ---
  try {
    
    // ADD Block 06 — Hours Sold composition
    (function() {
      function buildADD06() {
        const canvas = document.getElementById("add06-chart");
        if (!canvas || canvas.dataset.built) return;
        canvas.dataset.built = "1";
        new Chart(canvas, {
          type: "doughnut",
          data: {
            labels: ["Customer Hours","Warranty Hours","In-House Hours","Previous Hours","Express Hours"],
            datasets: [{
              data: [25338, 317, 493, 368, 323],
              backgroundColor: ["#00875A","#B7791F","#6B7280","#9CA3AF","#0E7C7B"],
              borderColor: "#FFFFFF", borderWidth: 3, hoverOffset: 6
            }]
          },
          plugins: [{
            id: "add06Center",
            afterDraw(chart) {
              const c = chart.ctx;
              const { left, right, top, bottom } = chart.chartArea;
              const cx = (left + right) / 2, cy = (top + bottom) / 2;
              c.save();
              c.font = "700 9px Arial, sans-serif"; c.fillStyle = "#6B7280";
              c.textAlign = "center"; c.textBaseline = "middle";
              c.fillText("TOTAL HOURS SOLD", cx, cy - 16);
              c.font = "900 22px 'Arial Black', Arial, sans-serif"; c.fillStyle = "#05141F";
              c.fillText("26,839", cx, cy + 8);
              c.restore();
            }
          }],
          options: {
            responsive: true, maintainAspectRatio: false, cutout: "60%",
            plugins: {
              legend: { display: true, position: "bottom", labels: { font: { size: 9.5, weight: 700 }, color: "#05141F", boxWidth: 12, padding: 8 } },
              tooltip: { callbacks: { label: (c) => c.label + ": " + c.parsed.toLocaleString("en-US") + " hrs (" + (c.parsed/26839*100).toFixed(1) + "%)" } }
            }
          }
        });
      }
      if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", buildADD06); } else { buildADD06(); }
      const t5 = document.getElementById("tab5");
      if (t5) new MutationObserver(() => { if (t5.classList.contains("active")) buildADD06(); }).observe(t5, { attributes: true, attributeFilter: ["class"] });
    })();
    
  } catch(e) { console.error('Block 20 failed:', e); }
}
