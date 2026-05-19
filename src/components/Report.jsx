import React, { useEffect, useRef, useState } from 'react';
import { exportSlidesToPdf, exportSlidesToPptx } from './reportExport.js';
import {
  REPORT_META, HEADLINE, FINANCIAL_KPIS,
  PNL_MTD, PNL_YTD, REVENUE_SUMMARY, PNL_SUMMARY_TABLE,
  ROS_EVOLUTION, DEALERS_IN_LOSS_MTD, ROS_TRENDS, ROS_TARGET, ROS_CALC, ROS_RANKING,
  OAR_TOP5, OAR_BOTTOM5, OAR_TRENDS, OAR_TARGET, OAR_CALC, OAR_RANKING,
  PNL_BY_GROUP, FIN_PERF_MXN, FIN_PERF_INSIGHTS,
  PROFIT_BY_MODEL, DEALERS_LOSS_TREND, BM_BY_STAGE, EXEC_COMMENTARY,
  KPI_BARS, WATERFALL_MTD, WATERFALL_YTD,
  REVENUE_MIX_BY_YEAR, GP_MIX_BY_YEAR, PNL_VARIATION,
  ROS_MONTHLY, OAR_MONTHLY, ROS_TRENDS_LABELED, OAR_TRENDS_LABELED,
  OAR_INTERNAL, PROFIT_MODEL_DETAIL, MODEL_YOY, LOSS_BY_MONTH,
} from '../data/reportData.js';
import {
  BarColumnChart, WaterfallChart, StackedColumnByYear, BarLineCombo,
  LineChartLabeled, HBarVariation, GroupedBarLineChart, GroupedBarsChart,
  DualStackedColumn, LossByMonthChart,
} from './ReportCharts.jsx';

// ============================================================================
// Formatters
// ============================================================================
const nf = new Intl.NumberFormat('en-US');
const fmt = (n) => (n == null ? '—' : nf.format(Math.round(n)));
const fmtPct = (n, digits = 2) => (n == null ? '—' : `${n.toFixed(digits)}%`);
const fmtPp  = (n, digits = 2) => {
  if (n == null) return '—';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(digits)} pp`;
};
const fmtPctSigned = (n, digits = 2) => {
  if (n == null) return '—';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(digits)}%`;
};
const fmtMoney = (n) => (n == null ? '—' : `$${nf.format(Math.round(n))}`);
const trendCls = (n) => (n == null ? '' : n >= 0 ? 'up' : 'down');
const trendArrow = (n) => (n == null ? '' : n >= 0 ? '▲' : '▼');

// ============================================================================
// Building blocks
// ============================================================================
function Slide({ n, total, section, title, badge, children, dense = false, dark = false }) {
  return (
    <section className={`rep-slide${dense ? ' is-dense' : ''}${dark ? ' is-dark' : ''}`}>
      <header className="rep-slide-head">
        <div className="rep-slide-head-left">
          {badge && <span className="rep-slide-badge">{badge}</span>}
          <div className="rep-slide-titles">
            {section && <div className="rep-slide-section">{section}</div>}
            <h2 className="rep-slide-title">{title}</h2>
          </div>
        </div>
        <div className="rep-slide-head-right">
          <span className="rep-slide-meta">KMX · 100 DLRs · MXN</span>
          <span className="rep-slide-pager">{n}<span>/{total}</span></span>
        </div>
      </header>
      <div className="rep-slide-body">{children}</div>
      <footer className="rep-slide-foot">
        <span>Dealer Network · Financial Performance</span>
        <span>KMX · Confidential</span>
      </footer>
    </section>
  );
}

function KpiStrip({ items }) {
  return (
    <div className="rep-kpi-strip">
      {items.map((k, i) => (
        <div key={i} className="rep-kpi">
          <div className="rep-kpi-label">{k.label}</div>
          <div className={`rep-kpi-value ${k.tone || ''}`}>{k.value}</div>
          {k.delta && (
            <div className={`rep-kpi-delta ${trendCls(k.deltaNum)}`}>
              {k.deltaNum != null && <span className="rep-kpi-arrow">{trendArrow(k.deltaNum)}</span>}
              {k.delta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Callout({ title, children, tone = '' }) {
  return (
    <div className={`rep-callout ${tone}`}>
      <div className="rep-callout-head">{title}</div>
      <div className="rep-callout-body">{children}</div>
    </div>
  );
}

// SVG: ROS / OAR trend line
function TrendLine({ data, target, yMax = 5, yMin = 0, color = '#E60012', label = '' }) {
  const W = 900, H = 220, pad = { l: 40, r: 20, t: 20, b: 30 };
  const xs = data.map((d, i) => pad.l + (i * (W - pad.l - pad.r)) / (data.length - 1));
  const y = (v) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xs[i]} ${y(d.ros ?? d.oar)}`).join(' ');
  const targetY = y(target);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="rep-svg" preserveAspectRatio="none">
      <g className="rep-grid">
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line key={i} x1={pad.l} x2={W - pad.r} y1={pad.t + p * (H - pad.t - pad.b)} y2={pad.t + p * (H - pad.t - pad.b)} />
        ))}
      </g>
      <line x1={pad.l} x2={W - pad.r} y1={targetY} y2={targetY} className="rep-target-line" />
      <text x={W - pad.r - 4} y={targetY - 4} className="rep-target-label" textAnchor="end">Target {target}%</text>
      <path d={path} className="rep-line" stroke={color} />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xs[i]} cy={y(d.ros ?? d.oar)} r={4} className="rep-dot" stroke={color} />
          <text x={xs[i]} y={y(d.ros ?? d.oar) - 10} className="rep-dot-label" textAnchor="middle">
            {(d.ros ?? d.oar).toFixed(1)}
          </text>
          <text x={xs[i]} y={H - 10} className="rep-axis-x" textAnchor="middle">{d.year}</text>
        </g>
      ))}
      <text x={pad.l - 6} y={pad.t + 4} className="rep-axis-y" textAnchor="end">{yMax}%</text>
      <text x={pad.l - 6} y={H - pad.b} className="rep-axis-y" textAnchor="end">{yMin}%</text>
      {label && <text x={W - pad.r} y={pad.t + 4} className="rep-chart-label" textAnchor="end">{label}</text>}
    </svg>
  );
}

// SVG: Bar chart for revenue/gp mix
function MixBars({ data, valueKey, palette, label }) {
  const W = 900, H = 240, pad = { l: 40, r: 20, t: 30, b: 70 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d[valueKey]));
  const bw = (innerW / data.length) * 0.65;
  const gap = (innerW / data.length) * 0.35;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="rep-svg">
      <text x={pad.l} y={20} className="rep-chart-label">{label}</text>
      {data.map((d, i) => {
        const v = d[valueKey];
        const x = pad.l + i * (bw + gap) + gap / 2;
        const h = (v / max) * innerH;
        const y = pad.t + innerH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} fill={palette[i % palette.length]} className="rep-bar" />
            <text x={x + bw / 2} y={y - 6} className="rep-bar-value" textAnchor="middle">
              {fmtPct(v, 1)}
            </text>
            <text x={x + bw / 2} y={H - 52} className="rep-bar-label" textAnchor="middle">{d.bu || d.model}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// SLIDE GENERATORS
// ============================================================================
function SlideCover({ n, total }) {
  return (
    <section className="rep-slide is-cover">
      <div className="rep-cover-bg" />
      <div className="rep-cover-grid" />
      <div className="rep-cover-content">
        <div className="rep-cover-eyebrow">
          <span className="rep-cover-mark" /> KMX · DEALER DEVELOPMENT TEAM
        </div>
        <h1 className="rep-cover-title">
          Dealer Network<br />
          <span className="rep-cover-accent">Financial Performance</span>
        </h1>
        <div className="rep-cover-period">
          KMX Feb. YTD &nbsp;·&nbsp; ROS <b>3.37%</b>
          &nbsp;·&nbsp; EBITDA <b>5.16%</b>
          &nbsp;·&nbsp; OAR <b>64.26%</b>
        </div>
        <div className="rep-cover-headline">
          <div className="rep-cover-hl">
            <span className="rep-cover-hl-k">ROS</span>
            <span className="rep-cover-hl-v">3.37%</span>
            <span className="rep-cover-hl-d down">▼ -0.53 pp YoY</span>
          </div>
          <div className="rep-cover-hl">
            <span className="rep-cover-hl-k">EBITDA</span>
            <span className="rep-cover-hl-v">5.16%</span>
            <span className="rep-cover-hl-d down">▼ -0.88 pp YoY</span>
          </div>
          <div className="rep-cover-hl">
            <span className="rep-cover-hl-k">OAR</span>
            <span className="rep-cover-hl-v">64.26%</span>
            <span className="rep-cover-hl-d down">▼ -0.95 pp YoY</span>
          </div>
          <div className="rep-cover-hl">
            <span className="rep-cover-hl-k">DLR's in Loss</span>
            <span className="rep-cover-hl-v">5/100</span>
            <span className="rep-cover-hl-d down">▲ +1 DLR YoY</span>
          </div>
          <div className="rep-cover-hl">
            <span className="rep-cover-hl-k">Reporting</span>
            <span className="rep-cover-hl-v">100/101</span>
            <span className="rep-cover-hl-d">Dealers</span>
          </div>
        </div>
        <div className="rep-cover-meta">
          <div className="rep-cover-meta-row">
            <span className="rep-cover-meta-k">Decision Making</span><span className="rep-cover-dot off" />
            <span className="rep-cover-meta-k">Information Sharing</span><span className="rep-cover-dot on" />
            <span className="rep-cover-meta-k">Direction</span><span className="rep-cover-dot off" />
          </div>
          <div className="rep-cover-meta-row dim">
            <span>{REPORT_META.period}</span><span>·</span><span>{REPORT_META.team}</span>
          </div>
        </div>
        <div className="rep-cover-foot">
          <div className="rep-cover-kia">KIA · KMX</div>
          <span className="rep-cover-pager">{n} / {total}</span>
        </div>
      </div>
    </section>
  );
}

function KpiQuadrant({ title, bars, inside, unit = '%' }) {
  return (
    <div className="ppt-kpi-quad">
      <div className="ppt-kpi-quad-head">{title}</div>
      <div className="ppt-kpi-quad-charts">
        <div className="ppt-kpi-chart-wrap">
          <div className="ppt-kpi-chart-cap">Yearly Results</div>
          <BarColumnChart bars={bars.yearly} target={bars.target} unit={unit} height={210} />
          <div className="ppt-kpi-delta-bottom">
            <span className={`ppt-delta-tag ${bars.yoyDelta < 0 ? 'down' : 'up'}`}>
              {fmtPp(bars.yoyDelta)}
            </span>
          </div>
        </div>
        <div className="ppt-kpi-chart-wrap">
          <div className="ppt-kpi-chart-cap">Month over Month</div>
          <BarColumnChart bars={bars.mom} unit={unit} height={210} />
          <div className="ppt-kpi-delta-bottom">
            <span className={`ppt-delta-tag ${bars.momDelta < 0 ? 'down' : 'up'}`}>
              {fmtPp(bars.momDelta)}
            </span>
          </div>
        </div>
      </div>
      <Callout title="Inside the numbers" tone="muted">{inside}</Callout>
    </div>
  );
}

function SlideFinancialKPIs({ n, total }) {
  const { ros, oar, ebitda, profitPerDealer } = FINANCIAL_KPIS;
  return (
    <Slide n={n} total={total} section="1. Financial KPIs" title="ROS · EBITDA · OAR · Profit per Dealer" badge="01">
      <div className="ppt-kpi-grid">
        <KpiQuadrant title="Return On Sales (%ROS)"  bars={KPI_BARS.ros}    inside={ros.insideNumbers} />
        <KpiQuadrant title="%EBITDA"                 bars={KPI_BARS.ebitda} inside={ebitda.insideNumbers} />
        <KpiQuadrant title="Overhead Absorption Rate (%OAR)" bars={KPI_BARS.oar} inside={oar.insideNumbers} />
        <KpiQuadrant title="Average Profit per Dealer (1,000 MXN)" bars={KPI_BARS.profit} unit="k"
          inside={`${profitPerDealer.yoyText} ${profitPerDealer.momText}`} />
      </div>
    </Slide>
  );
}

function PnLTable({ data, periodLabel }) {
  return (
    <div className="rep-pnl-wrap">
      <table className="rep-pnl-table">
        <thead>
          <tr>
            <th rowSpan={2}>Concept</th>
            <th rowSpan={2}>Sales</th>
            <th rowSpan={2}>Cost</th>
            <th colSpan={3}>Gross Margin</th>
            <th rowSpan={2}>Expenses<br /><span className="th-sub">(% of sales)</span></th>
            <th colSpan={2}>Operating Profit</th>
          </tr>
          <tr>
            <th>$</th>
            <th>%</th>
            <th>% Contrib.</th>
            <th>$</th>
            <th>% Contrib.</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((r) => (
            <tr key={r.id} className={`rep-pnl-row rep-pnl-${r.id}`}>
              <td className="rep-pnl-concept">{r.concept}</td>
              <td className="num">{fmt(r.sales)}</td>
              <td className="num">{fmt(r.cost)}</td>
              <td className="num">{fmt(r.gm)}</td>
              <td className="num">{fmtPct(r.gmPct, 2)}</td>
              <td className="num">{fmtPct(r.contrib, 2)}</td>
              <td className="num">{fmt(r.exp)}</td>
              <td className={`num ${r.op < 0 ? 'down' : 'up'}`}>{fmt(r.op)}</td>
              <td className="num">{fmtPct(r.opPct, 2)}</td>
            </tr>
          ))}
          <tr className="rep-pnl-total">
            <td>Total</td>
            <td className="num">{fmt(data.total.sales)}</td>
            <td className="num">{fmt(data.total.cost)}</td>
            <td className="num">{fmt(data.total.gm)}</td>
            <td className="num">{fmtPct(data.total.gmPct, 2)}</td>
            <td className="num">100.00%</td>
            <td className="num">{fmt(data.total.exp)}</td>
            <td className="num">{fmt(data.total.op)}</td>
            <td className="num">100.00%</td>
          </tr>
          <tr className="rep-pnl-pct">
            <td>%</td>
            <td className="num">{fmtPct(data.pct.sales, 2)}</td>
            <td className="num">{fmtPct(data.pct.cost, 2)}</td>
            <td className="num">{fmtPct(data.pct.gm, 2)}</td>
            <td colSpan={2}></td>
            <td className="num">{fmtPct(data.pct.exp, 2)}</td>
            <td className="num">{fmt(data.total.netProfit)}</td>
            <td className={`num ${data.pct.net >= 0 ? 'up' : 'down'}`}>{fmtPct(data.pct.net, 2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="rep-pnl-bottomline">
        <span className="rep-bl-k">Other Incomes</span><span className="rep-bl-v">{fmt(data.total.otherIncomes)}</span>
        <span className="rep-bl-k">EBIT</span><span className="rep-bl-v">{fmt(data.total.ebit)}</span>
        <span className="rep-bl-k">Fin Expenses</span><span className="rep-bl-v down">{fmt(data.total.finExp)}</span>
        <span className="rep-bl-k">Net Profit</span><span className="rep-bl-v rep-bl-net">{fmt(data.total.netProfit)}</span>
        <span className="rep-bl-k">{periodLabel} %</span><span className="rep-bl-v">{fmtPct(data.pct.net, 2)}</span>
      </div>
    </div>
  );
}

function SlidePnLMTD({ n, total }) {
  const d = PNL_MTD;
  return (
    <Slide n={n} total={total} section="2.1 P&L Business Unit" title="MTD · Feb." badge="02">
      <KpiStrip items={[
        { label: 'ROS MTD',  value: fmtPct(d.summary.ros) },
        { label: 'OAR MTD',  value: fmtPct(d.summary.oar) },
        { label: 'EBITDA',   value: fmtPct(d.summary.ebitda) },
        { label: 'Net Avg Profit', value: `$${nf.format(d.netAvgCurrent)}`, delta: `prev $${nf.format(d.netAvgPrev)}`, deltaNum: -52.16 },
      ]} />
      <PnLTable data={d} periodLabel="ROS MTD" />
      <div className="rep-pnl-with-waterfall">
        <WaterfallChart data={WATERFALL_MTD} height={300} />
        <Callout title="MoM MTD Average per Dealer" tone="dark">
          <ul className="rep-bullets">
            <li>Total Sales <span className="down">{fmtPctSigned(d.deltasYoY.sales)}</span></li>
            <li>Gross Margin <span className="down">{fmtPctSigned(d.deltasYoY.gm)}</span></li>
            <li>Expenses <span className="up">{fmtPctSigned(d.deltasYoY.expenses)}</span></li>
            <li>Sales commissions <span className="up">{fmtPctSigned(d.deltasYoY.commissions)}</span></li>
            <li>Fin. Expenses <span className="up">{fmtPctSigned(d.deltasYoY.finExpenses)}</span></li>
            <li>Net Profit <span className="down">{fmtPctSigned(d.deltasYoY.netProfit)}</span></li>
          </ul>
          <div className="rep-callout-note">
            '26 Net Avg Profit MTD <b>${nf.format(d.netAvgCurrent)}</b><br />
            '25 Net Avg Profit MTD <b>${nf.format(d.netAvgPrev)}</b>
          </div>
        </Callout>
      </div>
    </Slide>
  );
}

function SlidePnLYTD({ n, total }) {
  const d = PNL_YTD;
  return (
    <Slide n={n} total={total} section="2.2 P&L Business Unit" title="YTD · Feb." badge="02">
      <KpiStrip items={[
        { label: 'ROS YTD',    value: fmtPct(d.summary.ros) },
        { label: 'OAR YTD',    value: fmtPct(d.summary.oar) },
        { label: 'EBITDA',     value: fmtPct(d.summary.ebitda) },
        { label: 'Net Avg Profit YTD', value: `$${nf.format(d.netAvgCurrent)}`, delta: `prev $${nf.format(d.netAvgPrev)}`, deltaNum: -8.72 },
      ]} />
      <PnLTable data={d} periodLabel="ROS YTD" />
      <div className="rep-pnl-with-waterfall">
        <WaterfallChart data={WATERFALL_YTD} height={300} />
        <Callout title="YoY YTD Average per Dealer" tone="dark">
          <ul className="rep-bullets">
            <li>Total Sales <span className="up">{fmtPctSigned(d.deltasYoY.sales)}</span></li>
            <li>Gross Margin <span className="down">{fmtPctSigned(d.deltasYoY.gm)}</span></li>
            <li>Expenses <span className="up">{fmtPctSigned(d.deltasYoY.expenses)}</span></li>
            <li>Sales commissions <span className="up">{fmtPctSigned(d.deltasYoY.commissions)}</span></li>
            <li>Fin. Expenses <span className="down">{fmtPctSigned(d.deltasYoY.finExpenses)}</span></li>
            <li>Net Profit <span className="down">{fmtPctSigned(d.deltasYoY.netProfit)}</span></li>
          </ul>
          <div className="rep-callout-note">
            '26 Net Avg Profit YTD <b>${nf.format(d.netAvgCurrent)}</b><br />
            '25 Net Avg Profit YTD <b>${nf.format(d.netAvgPrev)}</b>
          </div>
        </Callout>
      </div>
    </Slide>
  );
}

function SlidePnLAnalysis({ n, total }) {
  return (
    <Slide n={n} total={total} section="2.3 P&L Analysis" title="Revenue & Expense Summary · YTD" badge="02">
      <div className="rep-grid-2-pnl">
        <div>
          <div className="rep-subtitle">Revenue Summary · YoY</div>
          <table className="rep-data-table">
            <thead>
              <tr><th>Business Unit</th><th className="num">Feb '26</th><th className="num">%</th><th className="num">Feb '25</th><th className="num">%</th><th className="num">YoY</th></tr>
            </thead>
            <tbody>
              {REVENUE_SUMMARY.map((r, i) => (
                <tr key={i} className={r.isTotal ? 'rep-row-total' : ''}>
                  <td>{r.bu}</td>
                  <td className="num">{fmt(r.cur)}</td>
                  <td className="num">{fmtPct(r.curPct, 1)}</td>
                  <td className="num">{fmt(r.prev)}</td>
                  <td className="num">{fmtPct(r.prevPct, 1)}</td>
                  <td className={`num ${r.yoy >= 0 ? 'up' : 'down'}`}>{fmtPctSigned(r.yoy, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="rep-subtitle" style={{ marginTop: 14 }}>P&L Summary · YoY</div>
          <table className="rep-data-table rep-data-table-compact">
            <thead>
              <tr><th></th><th>Concept</th><th></th><th className="num">'26</th><th className="num">'25</th><th className="num">YoY</th></tr>
            </thead>
            <tbody>
              {PNL_SUMMARY_TABLE.map((r, i) => (
                <tr key={i} className={r.isTotal ? 'rep-row-total' : r.isSub ? 'rep-row-sub' : ''}>
                  <td className="rep-pnl-ref">{r.ref}</td>
                  <td>{r.label}</td>
                  <td className="rep-pnl-op">{r.op}</td>
                  <td className="num">{fmt(r.cur)}</td>
                  <td className="num">{fmt(r.prev)}</td>
                  <td className={`num ${r.yoy >= 0 ? 'up' : 'down'}`}>{fmtPctSigned(r.yoy, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="rep-subtitle">P&L Summary Variation · YoY YTD Feb '26 vs Feb '25</div>
          <HBarVariation data={PNL_VARIATION} height={360} />
          <Callout title="Reading" tone="dark">
            <ul className="rep-bullets">
              <li>Sales <b>+7.84%</b> y Sales Cost <b>+8.83%</b> — cost outpacing revenue.</li>
              <li>Variable expenses dispararon <b>+17.88%</b> — la palanca que más presiona Op. Profit.</li>
              <li>Operating Profit <b>-15.16%</b> y Net Profit Before Taxes <b>-6.74%</b> aún con Fin. Expenses cayendo -18%.</li>
            </ul>
          </Callout>
        </div>
      </div>
    </Slide>
  );
}

function SlideRevGpYoY({ n, total }) {
  const palette = ['#5e5e5e', '#9b9b9b', '#1d1d1f', '#bdbdbd', '#d8d8d8', '#ebebeb'];
  return (
    <Slide n={n} total={total} section="2.3.1 Revenue · Gross Profit YoY" title="Mix between Business Units · 2022–Feb 2026" badge="02">
      <div className="ppt-stack-pair">
        <div className="ppt-stack-block">
          <div className="rep-subtitle">Revenue portion between Business Unit YoY</div>
          <StackedColumnByYear data={REVENUE_MIX_BY_YEAR} palette={palette} height={260} />
        </div>
        <div className="ppt-stack-block">
          <div className="rep-subtitle">Gross Profit portion between Business Unit YoY</div>
          <StackedColumnByYear data={GP_MIX_BY_YEAR} palette={palette} height={260} />
        </div>
      </div>
      <Callout title="Mix Insight" tone="dark">
        <b>New</b> vende 78% pero genera solo 38% del GP. <b>F&I</b> sigue subiendo: 14.8% → 19.1% del GP en 5 años — palanca de margen. <b>Parts + Service + Body</b> aportan 36% del GP con apenas 11.6% de ventas.
      </Callout>
    </Slide>
  );
}

function SlideROSEvolution({ n, total }) {
  const d = ROS_EVOLUTION;
  return (
    <Slide n={n} total={total} section="3.1 ROS Evolution" title="Monthly · MTD bars + YTD lines · 2024–2026" badge="03">
      <KpiStrip items={[
        { label: "ROS YTD '26", value: fmtPct(3.37), deltaNum: -0.53, delta: '-0.53 pp YoY' },
        { label: 'ROS MTD Feb', value: fmtPct(d.mtd.ros), deltaNum: -1.75, delta: '-1.75 pp MoM' },
        { label: 'OAR MTD',     value: fmtPct(d.mtd.oar) },
        { label: 'EBITDA MTD',  value: fmtPct(d.mtd.ebitda) },
        { label: 'DLR in Loss MTD', value: `${d.lossCount}/${d.totalDealers}`, delta: '18% · 82% Profitable' },
      ]} />
      <BarLineCombo months={ROS_MONTHLY.months} bars={ROS_MONTHLY.bars} lines={ROS_MONTHLY.lines} yMax={6} height={300} unit="%" />
      <Callout title="Summary · Feb MTD" tone="dark">
        <ul className="rep-bullets">
          <li>Sales <b>$43.2M</b> vs $43.2M (0.00%) │ Gross Margin <b>$6.2M</b> vs $6.6M (-5.3%) │ Net Profit <b>$1.0M</b> vs $1.5M (-49.87%).</li>
          <li>Payroll <b>$976K</b> vs $868K (+12.3%) │ Fin. Expenses <b>$655K</b> vs $784K (-16.5%) │ Floor Plan <b>$410K</b> vs $554K (-26.0%).</li>
        </ul>
      </Callout>
    </Slide>
  );
}

function SlideDealersInLossMTD({ n, total }) {
  const loss = DEALERS_IN_LOSS_MTD;
  return (
    <Slide n={n} total={total} section="3.1 ROS Evolution" title="18 Dealers in Loss · Feb MTD · Detail" badge="03" dense>
      <KpiStrip items={[
        { label: 'DLR in Loss MTD', value: '18 / 100', deltaNum: 1, delta: '+10 vs Feb 25' },
        { label: 'Profitable',      value: '82 / 100' },
        { label: 'Worst ROS',       value: 'Kia Vision -12.67%' },
        { label: 'Concentration',   value: '5× FARRERA · 3× PREMIER' },
      ]} />
      <div className="rep-grid-2">
        <table className="rep-data-table rep-data-table-compact">
          <thead>
            <tr><th>DLR</th><th className="num">Stage</th><th>Group</th><th className="num">% ROS '26</th><th className="num">Feb '25</th></tr>
          </thead>
          <tbody>
            {loss.slice(0, 9).map((r) => (
              <tr key={r.dlr}>
                <td>{r.dlr}</td>
                <td className="num">{r.stage}</td>
                <td>{r.group}</td>
                <td className="num down">{fmtPctSigned(r.ros, 2)}</td>
                <td className={`num ${r.prev >= 0 ? 'up' : 'down'}`}>{fmtPctSigned(r.prev, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="rep-data-table rep-data-table-compact">
          <thead>
            <tr><th>DLR</th><th className="num">Stage</th><th>Group</th><th className="num">% ROS '26</th><th className="num">Feb '25</th></tr>
          </thead>
          <tbody>
            {loss.slice(9).map((r) => (
              <tr key={r.dlr}>
                <td>{r.dlr}</td>
                <td className="num">{r.stage}</td>
                <td>{r.group}</td>
                <td className="num down">{fmtPctSigned(r.ros, 2)}</td>
                <td className={`num ${r.prev >= 0 ? 'up' : 'down'}`}>{fmtPctSigned(r.prev, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout title="Reading" tone="dark">
        13 de los 18 DLRs en pérdida en Feb '26 estaban en utilidad en Feb '25 — un giro brusco MoM driven por: capex SI 2.0, comisiones +17%, payroll +12.3% sin crecimiento equivalente de sales.
      </Callout>
    </Slide>
  );
}

function SlideROSTrends({ n, total }) {
  return (
    <Slide n={n} total={total} section="3.2 Dealer ROS % Trends" title="KMX ROS (%) Trends · 2015 → Feb 26" badge="03">
      <div className="rep-trend-bullets">
        <ul className="rep-bullets">
          <li><b>The ROS peaked in 2022 with 4.27%</b>, thanks to market demand during the pandemic.</li>
          <li>The <span className="kw-blue">SI 2.0 construction</span> influenced KMX dealers' ROS since 2022, gradually.</li>
          <li><span className="kw-blue">KMX has turned around its positive growth</span> last year and will achieve the XXX target 2.90%.</li>
        </ul>
      </div>
      <LineChartLabeled data={ROS_TRENDS_LABELED} color="#1F47C8" yMax={5} yMin={0} height={340}
        valueFormat={(v) => v.toFixed(2)} />
    </Slide>
  );
}

function CalcTable({ rows }) {
  return (
    <table className="rep-calc-table">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className={`${r.isSub ? 'is-sub' : ''} ${r.isResult ? 'is-result' : ''}`}>
            <td className="rep-calc-ref">{r.ref}</td>
            <td className="rep-calc-label">{r.label}</td>
            <td className="rep-calc-op">{r.op}</td>
            <td className="rep-calc-val num">
              {typeof r.v === 'number' ? nf.format(r.v) : r.v}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SlideROSCalc({ n, total }) {
  return (
    <Slide n={n} total={total} section="3.3 ROS Calculations" title="Internal vs Without SI 2.0" badge="03">
      <div className="rep-grid-2-calc">
        <div className="rep-calc-block">
          <div className="rep-calc-block-head">Internal Calculation</div>
          <CalcTable rows={ROS_CALC.internal} />
        </div>
        <div className="rep-calc-block">
          <div className="rep-calc-block-head">Without SI 2.0 Calculation</div>
          <CalcTable rows={ROS_CALC.withoutSI20} />
          <div className="rep-calc-delta">Δ {nf.format(ROS_CALC.delta)} en Expenses</div>
        </div>
      </div>
      <Callout title="Reading" tone="dark">
        Excluyendo SI 2.0 e investimentos de Service Expansion, ROS subiría a <b>3.63%</b> (+0.26 pp vs Internal 3.37%).
      </Callout>
    </Slide>
  );
}

function SlideROSRanking({ n, total, slice, sliceLabel }) {
  return (
    <Slide n={n} total={total} section="3.4 ROS Ranking per Group" title={`${sliceLabel} · Net Profit (MXN)`} badge="03" dense>
      <KpiStrip items={[
        { label: 'National YTD', value: fmtPct(3.37) },
        { label: 'Target',       value: fmtPct(2.80) },
        { label: 'Profitable',   value: '95 / 100' },
        { label: 'Bottom',       value: 'OPTIMA · CONTINENTAL · AUTOCOM' },
      ]} />
      <table className="rep-rank-table">
        <thead>
          <tr><th>Rnk</th><th>Group / DLR</th><th className="num">Net Profit</th><th className="num">Total Sales</th><th className="num">% ROS</th></tr>
        </thead>
        <tbody>
          {slice.map((g) => (
            <React.Fragment key={g.rnk}>
              <tr className={`rep-rank-group ${g.above ? 'is-above' : 'is-below'} ${g.bottom ? 'is-bottom' : ''}`}>
                <td className="rep-rank-rnk">{g.rnk}</td>
                <td>{g.group}</td>
                <td className="num">{fmt(g.netProfit)}</td>
                <td className="num">{fmt(g.sales)}</td>
                <td className={`num ${g.ros >= 3.37 ? 'up' : 'down'}`}>{fmtPct(g.ros, 2)}</td>
              </tr>
              {g.dealers.map((d) => (
                <tr key={d.name} className={`rep-rank-dlr ${d.loss ? 'is-loss' : ''} ${d.bottom ? 'is-bottom-dlr' : ''}`}>
                  <td></td>
                  <td className="rep-rank-dlr-name">{d.name}{d.na ? ' (NA)' : ''}</td>
                  <td className="num">{d.na ? 'NA' : fmt(d.net)}</td>
                  <td className="num">{d.na ? 'NA' : fmt(d.sales)}</td>
                  <td className={`num ${d.na ? 'is-na' : d.ros >= 3.37 ? 'up' : 'down'}`}>{d.na ? 'NA' : fmtPct(d.ros, 2)}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </Slide>
  );
}

function SlideOAREvolution({ n, total }) {
  return (
    <Slide n={n} total={total} section="4.1 OAR Evolution" title="Monthly · MTD bars + YTD lines · 2024–2026" badge="04">
      <KpiStrip items={[
        { label: 'OAR YTD',           value: fmtPct(64.26), deltaNum: -0.95, delta: '-0.95 pp YoY' },
        { label: 'OAR MTD',           value: fmtPct(60.77), deltaNum: -6.25, delta: '-6.25 pp MoM' },
        { label: 'EBITDA YTD',        value: fmtPct(5.16) },
        { label: 'Below Nat. Avg.',   value: '62 / 100' },
        { label: 'Target',            value: fmtPct(66, 0) },
      ]} />
      <BarLineCombo months={OAR_MONTHLY.months} bars={OAR_MONTHLY.bars} lines={OAR_MONTHLY.lines} yMax={80} height={300} unit="%" />
      <Callout title="Summary" tone="dark">
        KMX YTD: ROS 3.37% │ OAR 64.26% │ EBITDA 5.16%. <b>62 / 100 DLRs below national average</b>.
      </Callout>
    </Slide>
  );
}

function SlideOARTopBottom({ n, total }) {
  return (
    <Slide n={n} total={total} section="4.1 OAR Evolution" title="Top 5 & Bottom 5 Dealers · Feb YTD" badge="04">
      <div className="rep-grid-2">
        <div>
          <div className="rep-subtitle">Top 5 · OAR YTD</div>
          <table className="rep-data-table">
            <thead><tr><th>DLR</th><th>Stage</th><th>Group</th><th className="num">'26</th><th className="num">'25</th><th className="num">Var %</th></tr></thead>
            <tbody>
              {OAR_TOP5.map((r) => (
                <tr key={r.dlr}>
                  <td>{r.dlr}</td>
                  <td className="num">{r.stage}</td>
                  <td>{r.group}</td>
                  <td className="num up">{fmtPct(r.oar, 2)}</td>
                  <td className="num">{r.prev != null ? fmtPct(r.prev, 2) : 'N/A'}</td>
                  <td className={`num ${r.var != null && r.var >= 0 ? 'up' : 'down'}`}>{r.var != null ? fmtPctSigned(r.var, 2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="rep-subtitle">Bottom 5 · OAR YTD</div>
          <table className="rep-data-table">
            <thead><tr><th>DLR</th><th>Stage</th><th>Group</th><th className="num">'26</th><th className="num">'25</th><th className="num">Var %</th></tr></thead>
            <tbody>
              {OAR_BOTTOM5.map((r) => (
                <tr key={r.dlr}>
                  <td>{r.dlr}</td>
                  <td className="num">{r.stage}</td>
                  <td>{r.group}</td>
                  <td className="num down">{fmtPct(r.oar, 2)}</td>
                  <td className="num">{r.prev != null ? fmtPct(r.prev, 2) : 'N/A'}</td>
                  <td className={`num ${r.var != null && r.var >= 0 ? 'up' : 'down'}`}>{r.var != null ? fmtPctSigned(r.var, 2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Callout title="Reading" tone="dark">
        <ul className="rep-bullets">
          <li>Top 5: dealers en stage temprano (1-2) o líderes consolidados — todos &gt;107% OAR. <b>Kia Lopez Mateos</b> sigue como anchor con 131.59%.</li>
          <li>Bottom 5: dealers en SI 2.0 reciente o stage tardío — <b>Kia La Fe</b> con OAR negativo refleja gross profit absorbido por gastos fijos.</li>
        </ul>
      </Callout>
    </Slide>
  );
}

function SlideOARTrends({ n, total }) {
  return (
    <Slide n={n} total={total} section="4.2 Overhead Absorption Rate % Trends" title="KMX OAR (%) Trends · 2015 → Feb 26" badge="04">
      <div className="rep-trend-bullets">
        <ul className="rep-bullets">
          <li>The OAR has <b>maintained its constant growth</b> since the beginning of the KMX business.</li>
          <li>After reaching <span className="kw-blue">62% in 2024</span>, the OAR growth has temporarily slowed down due to <span className="kw-blue">SI 2.0 investment</span>.</li>
          <li>KMX plans to support <span className="kw-blue">OAR growth via service marketing and improvement service retention</span> to <span className="kw-blue">achieve 66% in XXX</span>.</li>
        </ul>
      </div>
      <LineChartLabeled data={OAR_TRENDS_LABELED} color="#1F47C8" yMax={80} yMin={0} height={340}
        valueFormat={(v) => v.toFixed(2)} />
    </Slide>
  );
}

function SlideOARInternal({ n, total }) {
  return (
    <Slide n={n} total={total} section="4.3 OAR Internal Calculation" title="Building blocks per dealer · Numbers in 1,000 MXN" badge="04">
      <DualStackedColumn
        left={OAR_INTERNAL.expenses}
        right={OAR_INTERNAL.afterSales}
        result={OAR_INTERNAL.result}
        height={360}
      />
      <Callout title="Reading" tone="dark">
        Expenses w/o Variables son <b>$773.5M</b>. After-sales GP combinado: <b>$497.1M</b> (Service <b>$232.9M</b> · Parts <b>$216.3M</b> · Body <b>$47.8M</b>). OAR = (2) / (4) = <b>64.26%</b>.
      </Callout>
    </Slide>
  );
}

function SlideOARCalc({ n, total }) {
  return (
    <Slide n={n} total={total} section="4.3.1 OAR Calculations" title="Internal vs Without SI 2.0" badge="04">
      <div className="rep-grid-2-calc">
        <div className="rep-calc-block">
          <div className="rep-calc-block-head">Internal Calculation</div>
          <CalcTable rows={OAR_CALC.internal} />
        </div>
        <div className="rep-calc-block">
          <div className="rep-calc-block-head">Without SI 2.0 Calculation</div>
          <CalcTable rows={OAR_CALC.withoutSI20} />
          <div className="rep-calc-delta">Δ {nf.format(OAR_CALC.delta)} en Expenses</div>
        </div>
      </div>
      <Callout title="Reading" tone="dark">
        Sin SI 2.0, OAR alcanzaría <b>69.00%</b> (+4.74 pp vs Internal 64.26%).
      </Callout>
    </Slide>
  );
}

function SlideOARRanking({ n, total }) {
  const cols = [
    OAR_RANKING.slice(0, 10),
    OAR_RANKING.slice(10, 20),
    OAR_RANKING.slice(20, 30),
  ];
  return (
    <Slide n={n} total={total} section="4.4 OAR Rank per Group" title="30 Groups Sorted · Target 66%" badge="04">
      <KpiStrip items={[
        { label: 'National YTD', value: fmtPct(64.26, 2) },
        { label: 'Target',       value: fmtPct(66, 0) },
        { label: 'Above Avg',    value: '11 groups' },
        { label: 'Below Avg',    value: '19 groups' },
      ]} />
      <div className="rep-rank-3col">
        {cols.map((col, i) => (
          <table key={i} className="rep-rank-mini">
            <thead><tr><th>Rnk</th><th>Group</th><th className="num">OAR</th></tr></thead>
            <tbody>
              {col.map((r) => (
                <tr key={r.rnk} className={`${r.above ? 'is-above' : 'is-below'} ${r.bottom ? 'is-bottom' : ''}`}>
                  <td>{r.rnk}</td>
                  <td>{r.group}</td>
                  <td className={`num ${r.oar >= 64.26 ? 'up' : 'down'}`}>{fmtPct(r.oar, 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </Slide>
  );
}

function SlidePnLByGroup({ n, total, slice, sliceLabel }) {
  return (
    <Slide n={n} total={total} section="5.1 P&L by Dealer Group" title={`${sliceLabel} · Sorted by Total Sales`} badge="05" dense>
      <table className="rep-group-table rep-group-table-dense">
        <thead>
          <tr>
            <th>#</th><th>Group</th><th>Owner</th><th className="num">DLR</th>
            <th className="num">Sales</th><th className="num">GM</th><th className="num">GM %</th>
            <th className="num">Exp %</th><th className="num">OP %</th><th className="num">Net %</th>
            <th className="num">Net Profit</th><th className="num">Units</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((g) => (
            <tr key={g.rnk}>
              <td className="rep-rank-rnk">{g.rnk}</td>
              <td className="rep-group-name">{g.group}</td>
              <td className="rep-group-owner">{g.owner}</td>
              <td className="num">{g.dealers}</td>
              <td className="num">{fmt(g.sales)}</td>
              <td className="num">{fmt(g.gm)}</td>
              <td className="num">{fmtPct(g.gmPct, 1)}</td>
              <td className="num">{fmtPct(g.expPct, 1)}</td>
              <td className={`num ${g.opPct >= 0 ? 'up' : 'down'}`}>{fmtPct(g.opPct, 1)}</td>
              <td className={`num ${g.netPct >= 3.37 ? 'up' : 'down'}`}>{fmtPct(g.netPct, 1)}</td>
              <td className="num">{fmt(g.netProfit)}</td>
              <td className="num">{nf.format(g.units)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Slide>
  );
}

function SlidePnLByGroupNational({ n, total }) {
  return (
    <Slide n={n} total={total} section="5.2 P&L by Dealer Group" title="National Average · Areas of Improvement" badge="05">
      <KpiStrip items={[
        { label: 'GM% Used',   value: fmtPct(13.5, 1), delta: '> New (6.9%)', deltaNum: 1 },
        { label: 'GM% New',    value: fmtPct(6.9, 1) },
        { label: 'Used Mix',   value: '7.2%' },
        { label: 'F&I Mix GP', value: '19.1%' },
      ]} />
      <div className="rep-grid-2">
        <Callout title="Used Car · Áreas de mejora" tone="dark">
          <ul className="rep-bullets">
            <li><b>DALTON</b> — GM Used -0.8%</li>
            <li><b>CONTINENTAL</b> — Used pesa solo 0.5% del mix</li>
            <li><b>SOLANA</b> — Used contribuye 6.6%, oportunidad de F&I attach</li>
          </ul>
        </Callout>
        <Callout title="Service · Áreas de mejora" tone="dark">
          <ul className="rep-bullets">
            <li><b>CLEBER</b> — Service margin 66% (vs network 81%)</li>
            <li><b>SONI</b> — Service margin 66.6% y contribución 15.8% del GP</li>
          </ul>
        </Callout>
      </div>
      <Callout title="Conclusion" tone="muted">
        Used cars muestran mejor GM% (<b>13.5%</b>) que New (<b>6.9%</b>) — disciplinar mix hacia Used y F&I es la palanca de margen más clara.
      </Callout>
    </Slide>
  );
}

function FinPerfTable() {
  const d = FIN_PERF_MXN;
  const Row = ({ label, k, sub, fmtFn = fmt, yoyFmt = (v) => fmtPctSigned(v, 2) }) => (
    <tr className={sub ? 'rep-row-sub' : ''}>
      <td>{label}</td>
      <td className="num">{fmtFn(k.dec25)}</td>
      <td className="num">{fmtFn(k.jan)}</td>
      <td className="num">{fmtFn(k.feb)}</td>
      <td className="num rep-cell-ytd">{fmtFn(k.ytd)}</td>
      <td className={`num ${typeof k.yoy === 'number' ? trendCls(k.yoy) : ''}`}>{typeof k.yoy === 'number' ? yoyFmt(k.yoy) : k.yoy}</td>
      <td className="num rep-cell-ytd">{fmtFn(k.prevYtd)}</td>
      <td className="num">{fmtFn(k.prevFeb)}</td>
      <td className="num">{fmtFn(k.prevJan)}</td>
      <td className="num">{fmtFn(k.prevDec)}</td>
    </tr>
  );
  const pct = (v) => (typeof v === 'number' ? fmtPct(v, 2) : v);
  return (
    <table className="rep-data-table rep-perf-table">
      <thead>
        <tr>
          <th rowSpan={2}></th>
          <th colSpan={4} className="rep-group-head">MTD Dec 2025 → Feb '26</th>
          <th rowSpan={2}>YoY YTD</th>
          <th colSpan={4} className="rep-group-head">MTD Dec '24 → Feb '25</th>
        </tr>
        <tr>
          <th>Dec 25</th><th>Jan 26</th><th>Feb 26</th><th>Feb 26 YTD</th>
          <th>Feb 25 YTD</th><th>Feb 25</th><th>Jan 25</th><th>Dec 24</th>
        </tr>
      </thead>
      <tbody>
        <tr className="rep-perf-section"><td colSpan={10}>% ROS</td></tr>
        <Row label="ROS YTD" k={d.ros} fmtFn={pct} />
        <tr><td>ROS MTD</td><td className="num">{pct(d.rosMtd.mtdDec25)}</td><td className="num">{pct(d.rosMtd.mtdJan)}</td><td className="num">{pct(d.rosMtd.mtdFeb)}</td><td colSpan={2}></td><td className="num">{pct(d.rosMtd.prevFeb)}</td><td className="num">{pct(d.rosMtd.prevJan)}</td><td className="num">{pct(d.rosMtd.prevDec)}</td><td></td></tr>
        <tr className="rep-perf-section"><td colSpan={10}>% OAR</td></tr>
        <Row label="OAR YTD" k={d.oar} fmtFn={pct} />
        <tr><td>OAR MTD</td><td className="num">{pct(d.oarMtd.mtdDec25)}</td><td className="num">{pct(d.oarMtd.mtdJan)}</td><td className="num">{pct(d.oarMtd.mtdFeb)}</td><td colSpan={2}></td><td className="num">{pct(d.oarMtd.prevFeb)}</td><td className="num">{pct(d.oarMtd.prevJan)}</td><td className="num">{pct(d.oarMtd.prevDec)}</td><td></td></tr>
        <tr className="rep-perf-section"><td colSpan={10}>DLRs in loss</td></tr>
        <Row label="DLRs in loss YTD" k={d.loss} fmtFn={(v) => v} yoyFmt={(v) => v} />
        <tr><td>DLRs in loss MTD</td><td className="num">{d.lossMtd.mtdDec25}</td><td className="num">{d.lossMtd.mtdJan}</td><td className="num">{d.lossMtd.mtdFeb}</td><td colSpan={2}></td><td className="num">{d.lossMtd.prevFeb}</td><td className="num">{d.lossMtd.prevJan}</td><td className="num">{d.lossMtd.prevDec}</td><td></td></tr>
        <tr className="rep-perf-section"><td colSpan={10}>Income</td></tr>
        <Row label="Sales" k={d.sales} fmtFn={fmtMoney} />
        <Row label="Gross Margin" k={d.gm} fmtFn={fmtMoney} />
        <Row label="Net Profit" k={d.netProfit} fmtFn={fmtMoney} />
        <tr className="rep-perf-section"><td colSpan={10}>Expenses</td></tr>
        <Row label="Total Expenses" k={d.totalExp} fmtFn={fmtMoney} />
        <Row label="Payroll" k={d.payroll} fmtFn={fmtMoney} />
        <Row label="Sales commissions" k={d.commissions} fmtFn={fmtMoney} />
        <tr className="rep-perf-section"><td colSpan={10}>Financial Cost</td></tr>
        <Row label="Financial Expenses" k={d.finExp} fmtFn={fmtMoney} />
        <Row label="Floor Plan" k={d.floorPlan} fmtFn={fmtMoney} />
        <Row label="Interest" k={d.interest} fmtFn={fmtMoney} />
      </tbody>
    </table>
  );
}

function SlideFinPerf({ n, total, currency = 'MXN' }) {
  return (
    <Slide n={n} total={total} section="6.1 Fin. Performance" title={`Feb. YTD · Avg per Dealer · ${currency}`} badge="06" dense>
      <Callout title="Key insights" tone="dark">
        <ul className="rep-bullets">
          {FIN_PERF_INSIGHTS.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </Callout>
      <FinPerfTable />
      {currency === 'USD' && (
        <div className="rep-fx-note">FX Rate: 1 USD = 19.80 MXN</div>
      )}
    </Slide>
  );
}

function SlideNetProfitRank({ n, total }) {
  // Reuse ROS_RANKING but show in USD
  const fx = 19.80;
  const cols = [
    ROS_RANKING.slice(0, 8),
    ROS_RANKING.slice(8, 16),
    ROS_RANKING.slice(16, 23),
    ROS_RANKING.slice(23, 30),
  ];
  return (
    <Slide n={n} total={total} section="6.2 Net Profit Rank per Group" title="Feb. YTD · 30 Groups · USD" badge="06" dense>
      <div className="rep-rank-4col">
        {cols.map((col, i) => (
          <table key={i} className="rep-rank-mini">
            <thead><tr><th>Rnk</th><th>Group</th><th className="num">Net Profit USD</th></tr></thead>
            <tbody>
              {col.map((g) => (
                <tr key={g.rnk} className={`${g.above ? 'is-above' : 'is-below'} ${g.bottom ? 'is-bottom' : ''}`}>
                  <td>{g.rnk}</td>
                  <td>{g.group}</td>
                  <td className={`num ${g.netProfit >= 0 ? 'up' : 'down'}`}>{fmt(g.netProfit / fx)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </Slide>
  );
}

function SlideByModel({ n, total }) {
  return (
    <Slide n={n} total={total} section="7. Financial Performance by Model" title="Profit Distribution + Op & Net Profit (MXN)" badge="07">
      <GroupedBarLineChart data={PROFIT_MODEL_DETAIL} height={320} />
      <table className="rep-data-table rep-data-table-compact">
        <thead>
          <tr>
            <th>Model</th>
            {PROFIT_BY_MODEL.map((m) => (<th key={m.model} className="num">{m.model}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Average Profit %</b></td>
            {PROFIT_BY_MODEL.map((m) => (
              <td key={m.model} className={`num ${m.feb26 >= 0 ? 'up' : 'down'}`}>{fmtPct(m.feb26, 2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Slide>
  );
}

function SlideByModelYoY({ n, total }) {
  return (
    <Slide n={n} total={total} section="7.2 Financial Performance by Model YoY" title="Average Operating Profit per Model · MXN" badge="07">
      <GroupedBarsChart data={MODEL_YOY} height={280} />
      <table className="rep-data-table rep-data-table-compact">
        <thead>
          <tr>
            <th>Model</th>
            {MODEL_YOY.map((m) => (<th key={m.model} className="num">{m.model}</th>))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Operation Profit Feb 26</td>
            {MODEL_YOY.map((m) => (<td key={m.model} className="num">{fmt(m.opFeb26)}</td>))}
          </tr>
          <tr>
            <td>Operation Profit Feb 25</td>
            {MODEL_YOY.map((m) => (<td key={m.model} className="num">{fmt(m.opFeb25)}</td>))}
          </tr>
          <tr className="rep-row-total">
            <td>YoY Variation</td>
            {MODEL_YOY.map((m) => (
              <td key={m.model} className={`num ${m.varPct >= 0 ? 'up' : 'down'}`}>{fmtPctSigned(m.varPct, 2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </Slide>
  );
}

function SlideLossTrend({ n, total }) {
  return (
    <Slide n={n} total={total} section="8. # of Dealers in Loss" title="Trend · MTD + YTD · 2025 vs 2026" badge="08">
      <KpiStrip items={[
        { label: 'YTD Feb 26', value: '5 / 100', deltaNum: 1, delta: '+1 vs Feb 25' },
        { label: 'YTD Feb 25', value: '4 / 98' },
        { label: 'MTD Feb 26', value: '18 / 100', deltaNum: 1, delta: '+10 vs Feb 25' },
        { label: 'MTD Feb 25', value: '8 / 98' },
      ]} />
      <LossByMonthChart data={LOSS_BY_MONTH} height={320} />
      <Callout title="Insight" tone="dark">
        El número de DLR en pérdida <b>YTD</b> se mantiene estable (4–10), pero <b>MTD Feb 26</b> salta a <b>18/100</b> — alerta de presión MoM. Los picos estacionales (Sep, Dec) requieren coberturas anticipadas.
      </Callout>
    </Slide>
  );
}

function SlideBMByStage({ n, total }) {
  const s = BM_BY_STAGE.averages;
  return (
    <Slide n={n} total={total} section="9. BM KPI by Opening Stage" title="ROS & OAR · Por etapa de apertura" badge="09">
      <KpiStrip items={[
        { label: 'National Avg ROS',  value: fmtPct(s.national.ros) },
        { label: 'National Avg OAR',  value: fmtPct(s.national.oar) },
        { label: 'Best Stage (ROS)',  value: '1st (2016)', delta: `${fmtPct(s.s1.ros)}`, deltaNum: 1 },
        { label: 'Worst Stage (ROS)', value: '5th (2020)', delta: `${fmtPct(s.s5.ros)}`, deltaNum: -1 },
      ]} />
      <table className="rep-data-table">
        <thead><tr><th>Stage</th><th>Year</th><th className="num">Dealers</th><th className="num">Avg ROS</th><th className="num">Avg OAR</th></tr></thead>
        <tbody>
          {[
            ['1st Stage', '2016', s.s1],
            ['2nd Stage', '2017', s.s2],
            ['3rd Stage', '2018', s.s3],
            ['4th Stage', '2019', s.s4],
            ['5th Stage', '2020', s.s5],
            ['6th Stage', '2021', s.s6],
            ['8th–11th',  '2023–26', s.s8_11],
          ].map(([name, year, st], i) => (
            <tr key={i}>
              <td><b>{name}</b></td>
              <td>{year}</td>
              <td className="num">{st.count}</td>
              <td className={`num ${st.ros >= s.national.ros ? 'up' : 'down'}`}>{fmtPct(st.ros, 2)}</td>
              <td className={`num ${st.oar >= s.national.oar ? 'up' : 'down'}`}>{fmtPct(st.oar, 2)}</td>
            </tr>
          ))}
          <tr className="rep-row-total">
            <td colSpan={3}><b>National Average</b></td>
            <td className="num">{fmtPct(s.national.ros)}</td>
            <td className="num">{fmtPct(s.national.oar)}</td>
          </tr>
        </tbody>
      </table>
      <Callout title="Reading" tone="dark">
        Los dealers más maduros (Stage 1) entregan ROS <b>{fmtPct(s.s1.ros)}</b> y OAR <b>{fmtPct(s.s1.oar)}</b> — la curva de aprendizaje y absorción es real. Stage 5 muestra el mayor stress por SI 2.0.
      </Callout>
    </Slide>
  );
}

function SlideExecSummary({ n, total }) {
  return (
    <Slide n={n} total={total} section="Executive Summary" title="Lectura final · Key Takeaways" badge="*" dark>
      <div className="rep-exec-grid">
        <Callout title="Business Units" tone="muted">
          <ul className="rep-bullets">{EXEC_COMMENTARY.bizUnits.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </Callout>
        <Callout title="Highlights" tone="muted">
          <ul className="rep-bullets">{EXEC_COMMENTARY.highlights.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </Callout>
        <Callout title="ROS Narrative" tone="muted">{EXEC_COMMENTARY.rosNarrative}</Callout>
        <Callout title="OAR Narrative" tone="muted">{EXEC_COMMENTARY.oarNarrative}</Callout>
      </div>
    </Slide>
  );
}

// ============================================================================
// Main Report Component
// ============================================================================
export default function Report({ onClose }) {
  const rootRef = useRef(null);
  const [exporting, setExporting] = useState(null); // null | 'pdf' | 'pptx'
  const [progress, setProgress] = useState({ cur: 0, total: 0 });

  useEffect(() => {
    document.body.classList.add('report-open');
    return () => document.body.classList.remove('report-open');
  }, []);

  const runExport = async (kind) => {
    console.log('[report] runExport called:', kind);
    if (exporting) {
      console.log('[report] already exporting, ignoring click');
      return;
    }
    setExporting(kind);
    setProgress({ cur: 0, total: 0 });
    try {
      const onProgress = (cur, total) => {
        console.log('[report] progress:', cur, '/', total);
        setProgress({ cur, total });
      };
      console.log('[report] starting export pipeline...');
      if (kind === 'pdf') {
        await exportSlidesToPdf({ onProgress });
      } else {
        await exportSlidesToPptx({ onProgress });
      }
      console.log('[report] export complete');
    } catch (err) {
      console.error('[report] Export failed:', err);
      alert(`Export failed: ${err?.message ?? err}\n\nCheck the browser console for details.`);
    } finally {
      setExporting(null);
      setProgress({ cur: 0, total: 0 });
    }
  };

  // Total slide count
  const slides = [];
  let i = 1;

  // ROS Ranking is split across slides since it has 30 groups
  const rosSlice1 = ROS_RANKING.slice(0, 10);
  const rosSlice2 = ROS_RANKING.slice(10, 20);
  const rosSlice3 = ROS_RANKING.slice(20, 30);

  // P&L by Group split (3 groups per slide × 10 = 30 groups)
  const groupSlices = [
    PNL_BY_GROUP.slice(0, 15),
    PNL_BY_GROUP.slice(15, 30),
  ];

  const TOTAL = 2 + 3 + 1 + 1 + 4 + 1 + 5 + groupSlices.length + 1 + 2 + 1 + 1 + 1 + 1; // tracks total

  const all = [];
  all.push(<SlideCover n={i++} total={0} key="cover" />);
  all.push(<SlideFinancialKPIs n={i++} total={0} key="fkpi" />);
  all.push(<SlidePnLMTD n={i++} total={0} key="pnlmtd" />);
  all.push(<SlidePnLYTD n={i++} total={0} key="pnlytd" />);
  all.push(<SlidePnLAnalysis n={i++} total={0} key="pnlana" />);
  all.push(<SlideRevGpYoY n={i++} total={0} key="rgyoy" />);
  all.push(<SlideROSEvolution n={i++} total={0} key="rosev" />);
  all.push(<SlideDealersInLossMTD n={i++} total={0} key="rosdetail" />);
  all.push(<SlideROSTrends n={i++} total={0} key="rostr" />);
  all.push(<SlideROSCalc n={i++} total={0} key="roscalc" />);
  all.push(<SlideROSRanking n={i++} total={0} slice={rosSlice1} sliceLabel="Top 1–10" key="rosrk1" />);
  all.push(<SlideROSRanking n={i++} total={0} slice={rosSlice2} sliceLabel="Rank 11–20" key="rosrk2" />);
  all.push(<SlideROSRanking n={i++} total={0} slice={rosSlice3} sliceLabel="Rank 21–30" key="rosrk3" />);
  all.push(<SlideOAREvolution n={i++} total={0} key="oarev" />);
  all.push(<SlideOARTopBottom n={i++} total={0} key="oartopbot" />);
  all.push(<SlideOARTrends n={i++} total={0} key="oartr" />);
  all.push(<SlideOARInternal n={i++} total={0} key="oarint" />);
  all.push(<SlideOARCalc n={i++} total={0} key="oarcalc" />);
  all.push(<SlideOARRanking n={i++} total={0} key="oarrk" />);
  groupSlices.forEach((sl, idx) => {
    const label = idx === 0 ? 'Top 1–15 Groups' : 'Rank 16–30 Groups';
    all.push(<SlidePnLByGroup n={i++} total={0} slice={sl} sliceLabel={label} key={`g${idx}`} />);
  });
  all.push(<SlidePnLByGroupNational n={i++} total={0} key="grpavg" />);
  all.push(<SlideFinPerf n={i++} total={0} currency="MXN" key="fpmxn" />);
  all.push(<SlideFinPerf n={i++} total={0} currency="USD" key="fpusd" />);
  all.push(<SlideNetProfitRank n={i++} total={0} key="netrk" />);
  all.push(<SlideByModel n={i++} total={0} key="model" />);
  all.push(<SlideByModelYoY n={i++} total={0} key="modelyoy" />);
  all.push(<SlideLossTrend n={i++} total={0} key="loss" />);
  all.push(<SlideBMByStage n={i++} total={0} key="stage" />);
  all.push(<SlideExecSummary n={i++} total={0} key="exec" />);

  const realTotal = all.length;
  // Patch totals
  const stamped = all.map((el, idx) => React.cloneElement(el, { total: realTotal, n: idx + 1 }));

  return (
    <div className="rep-root" ref={rootRef} role="dialog" aria-label="Dealer Network Financial Performance Report">
      <div className="rep-toolbar no-print">
        <div className="rep-toolbar-left">
          <div className="rep-toolbar-brand">
            <div className="rep-toolbar-logo">KIA</div>
            <div>
              <div className="rep-toolbar-title">Dealer Network · Financial Performance</div>
              <div className="rep-toolbar-sub">{realTotal} slides · Feb. YTD · KMX</div>
            </div>
          </div>
        </div>
        <div className="rep-toolbar-right">
          <button className="rep-btn rep-btn-ghost" onClick={onClose} disabled={!!exporting}>
            ← Volver al Dashboard
          </button>
          <button
            className="rep-btn rep-btn-secondary"
            onClick={() => runExport('pptx')}
            disabled={!!exporting}
            aria-busy={exporting === 'pptx'}
          >
            {exporting === 'pptx' ? `Generando… ${progress.cur}/${progress.total || realTotal}` : '↓ Descargar PPTX'}
          </button>
          <button
            className="rep-btn rep-btn-primary"
            onClick={() => runExport('pdf')}
            disabled={!!exporting}
            aria-busy={exporting === 'pdf'}
          >
            {exporting === 'pdf' ? `Generando… ${progress.cur}/${progress.total || realTotal}` : '↓ Descargar PDF'}
          </button>
        </div>
      </div>
      <main className="rep-deck">{stamped}</main>
      {exporting && (
        <div className="rep-export-overlay no-print" role="status" aria-live="polite">
          <div className="rep-export-card">
            <div className="rep-export-spinner" />
            <div className="rep-export-title">
              Generando {exporting === 'pdf' ? 'PDF' : 'PPTX'}…
            </div>
            <div className="rep-export-progress">
              Slide <b>{progress.cur || 0}</b> de <b>{progress.total || realTotal}</b>
            </div>
            <div className="rep-export-bar">
              <div
                className="rep-export-bar-fill"
                style={{ width: `${progress.total ? (progress.cur / progress.total) * 100 : 0}%` }}
              />
            </div>
            <div className="rep-export-hint">
              Se conserva el diseño exacto de cada slide (4:3 landscape).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
