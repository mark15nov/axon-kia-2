import React from 'react';

// ============================================================================
// Reusable formatters
// ============================================================================
const nf = new Intl.NumberFormat('en-US');
const fmtNum = (n) => (n == null ? '' : nf.format(Math.round(n)));
const fmtPct = (n, d = 2) => (n == null ? '' : `${n.toFixed(d)}%`);
const fmtSigned = (n, d = 2) => {
  if (n == null) return '';
  const sign = n >= 0 ? '+' : '';
  return `${sign}${n.toFixed(d)}`;
};

// ============================================================================
// BarColumnChart — Yearly Results style (slide 2 quadrants)
//   bars: [{label, value, kind: 'lightgray'|'gray'|'black', current, sub}]
//   target: {value, label}
//   yMax (optional)
//   unit: '%' or 'k'
//   highlight: object {momLabel, momValue, momDelta}
// ============================================================================
export function BarColumnChart({ bars, target, yMax, unit = '%', highlight, height = 230 }) {
  const W = 460, H = height, pad = { l: 8, r: 8, t: 32, b: 36 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const maxV = yMax ?? Math.max(...bars.map((b) => b.value), target?.value ?? 0) * 1.18;
  const minV = 0;
  const y = (v) => pad.t + innerH - ((v - minV) / (maxV - minV)) * innerH;
  const bw = (innerW / bars.length) * 0.62;
  const step = innerW / bars.length;

  const fill = (kind) => {
    switch (kind) {
      case 'lightgray': return '#dcdcdc';
      case 'gray':      return '#9b9b9b';
      case 'black':     return '#0E0F14';
      default:          return '#9b9b9b';
    }
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      {/* baseline */}
      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {/* target dashed line */}
      {target && (
        <>
          <line
            x1={pad.l}
            x2={W - pad.r}
            y1={y(target.value)}
            y2={y(target.value)}
            className="ppt-target"
          />
          <text x={W - pad.r} y={y(target.value) - 4} textAnchor="end" className="ppt-target-label">
            {target.label}
          </text>
        </>
      )}

      {/* bars */}
      {bars.map((b, i) => {
        if (b.value == null) return null;
        const x = pad.l + i * step + (step - bw) / 2;
        const yy = y(b.value);
        const h = pad.t + innerH - yy;
        return (
          <g key={i}>
            <rect x={x} y={yy} width={bw} height={h} fill={fill(b.kind)} className="ppt-bar" />
            <text x={x + bw / 2} y={yy - 6} textAnchor="middle" className="ppt-bar-value">
              {unit === '%' ? fmtPct(b.value, 2) : fmtNum(b.value)}
            </text>
            <text x={x + bw / 2} y={H - 18} textAnchor="middle" className="ppt-bar-label">
              {b.label}
            </text>
            {b.sub && (
              <text x={x + bw / 2} y={H - 6} textAnchor="middle" className="ppt-bar-sub">
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* highlight badge on last bar */}
      {highlight && (
        <g className="ppt-delta-badge">
          <rect
            x={W - pad.r - 84}
            y={H - 64}
            width={76}
            height={20}
            rx={2}
          />
          <text x={W - pad.r - 46} y={H - 50} textAnchor="middle">
            {highlight}
          </text>
        </g>
      )}
    </svg>
  );
}

// ============================================================================
// Waterfall chart — P&L MTD / YTD (slide 3 / 4)
//   data: { startLabel, startValue, steps: [{label, delta, valueOverride, kind}], unit }
// ============================================================================
export function WaterfallChart({ data, height = 360 }) {
  const W = 1200, H = height, pad = { l: 60, r: 30, t: 30, b: 110 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  // Build cumulative path
  const items = [];
  let running = data.startValue;
  items.push({ label: data.startLabel, value: data.startValue, base: 0, kind: 'start' });
  data.steps.forEach((s) => {
    if (s.kind === 'subtotal' || s.kind === 'final') {
      const v = s.valueOverride;
      items.push({ label: s.label, value: v, base: 0, kind: s.kind });
      running = v;
    } else {
      const base = running + (s.delta < 0 ? s.delta : 0);
      const v = Math.abs(s.delta);
      items.push({ label: s.label, value: v, base, kind: s.kind, delta: s.delta });
      running = running + s.delta;
    }
  });

  const maxV = Math.max(...items.map((it) => it.base + it.value)) * 1.05;
  const y = (v) => pad.t + innerH - (v / maxV) * innerH;
  const step = innerW / items.length;
  const bw = step * 0.62;

  const colorOf = (it) => {
    if (it.kind === 'start' || it.kind === 'subtotal') return '#1d1d1f';
    if (it.kind === 'final') return '#1d1d1f';
    if (it.kind === 'down') return '#cc1f2a';
    if (it.kind === 'up') return '#7DBC44';
    return '#888';
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {/* Expenses bracket line (between Variable and Amort+Dep) */}
      {(() => {
        const startIdx = items.findIndex((i) => i.label.includes('Variable'));
        const endIdx = items.findIndex((i) => i.label.includes('Amort'));
        if (startIdx < 0 || endIdx < 0) return null;
        const x1 = pad.l + startIdx * step + step / 2;
        const x2 = pad.l + endIdx * step + step / 2;
        const yBracket = H - 88;
        return (
          <g className="ppt-wf-bracket">
            <line x1={x1} x2={x2} y1={yBracket} y2={yBracket} />
            <line x1={x1} x2={x1} y1={yBracket} y2={yBracket - 4} />
            <line x1={x2} x2={x2} y1={yBracket} y2={yBracket - 4} />
            <text x={(x1 + x2) / 2} y={yBracket + 14} textAnchor="middle" className="ppt-wf-bracket-label">
              {data.totalExpensesLabel}
            </text>
          </g>
        );
      })()}

      {/* Bars */}
      {items.map((it, i) => {
        const x = pad.l + i * step + (step - bw) / 2;
        const y0 = y(it.base);
        const y1 = y(it.base + it.value);
        const h = y0 - y1;
        const color = colorOf(it);
        return (
          <g key={i}>
            <rect x={x} y={y1} width={bw} height={Math.max(2, h)} fill={color} className="ppt-wf-bar" />
            <text x={x + bw / 2} y={y1 - 6} textAnchor="middle" className="ppt-wf-value">
              {it.delta != null ? fmtSigned(it.delta / 1, 0).replace('+', '') : fmtNum(it.value)}
            </text>
            <text
              x={x + bw / 2}
              y={H - 56}
              textAnchor="middle"
              className={`ppt-wf-label ${it.kind}`}
            >
              <tspan x={x + bw / 2} dy="0">{it.label.split(' ')[0]}</tspan>
              {it.label.split(' ').slice(1).join(' ') && (
                <tspan x={x + bw / 2} dy="14">{it.label.split(' ').slice(1).join(' ')}</tspan>
              )}
            </text>
          </g>
        );
      })}

      {/* Connector dashed lines between bars */}
      {items.slice(0, -1).map((it, i) => {
        const next = items[i + 1];
        const x1 = pad.l + i * step + (step + bw) / 2;
        const x2 = pad.l + (i + 1) * step + (step - bw) / 2;
        const topThis = y(it.base + it.value);
        const topNext = next.kind === 'subtotal' || next.kind === 'final'
          ? y(next.value)
          : y(next.base + next.value);
        return (
          <line key={`c${i}`} x1={x1} x2={x2} y1={topThis} y2={topNext} className="ppt-wf-connector" />
        );
      })}

      {/* Center label */}
      <text x={W / 2} y={pad.t + 20} textAnchor="middle" className="ppt-wf-center">
        Numbers in {data.unit}
      </text>
    </svg>
  );
}

// ============================================================================
// StackedColumnByYear — Slide 6
//   data: [{year, new, used, fi, parts, service, body}]
// ============================================================================
export function StackedColumnByYear({ data, palette, label, height = 280 }) {
  const W = 1000, H = height, pad = { l: 40, r: 30, t: 30, b: 36 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const step = innerW / data.length;
  const bw = step * 0.58;
  const segments = ['new', 'used', 'fi', 'parts', 'service', 'body'];
  const names = ['New', 'Used', 'F&I', 'Parts', 'Service', 'Body & Paint'];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      {/* Legend */}
      <g className="ppt-legend">
        {segments.map((s, i) => (
          <g key={s} transform={`translate(${W / 2 - 250 + i * 88}, ${pad.t - 18})`}>
            <rect x={0} y={-9} width={10} height={10} fill={palette[i]} />
            <text x={14} y={0} className="ppt-legend-text">{names[i]}</text>
          </g>
        ))}
      </g>

      {/* baseline */}
      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {/* bars */}
      {data.map((d, i) => {
        const x = pad.l + i * step + (step - bw) / 2;
        let acc = 0;
        return (
          <g key={i}>
            {segments.map((s, j) => {
              const v = d[s];
              const segH = (v / 100) * innerH;
              const yy = pad.t + innerH - acc - segH;
              acc += segH;
              return (
                <g key={s}>
                  <rect x={x} y={yy} width={bw} height={segH} fill={palette[j]} className="ppt-stack-seg" />
                  {segH > 14 && (
                    <text x={x + bw / 2} y={yy + segH / 2 + 4} textAnchor="middle" className="ppt-stack-value">
                      {v.toFixed(1)}%
                    </text>
                  )}
                </g>
              );
            })}
            <text x={x + bw / 2} y={H - 8} textAnchor="middle" className="ppt-stack-year">{d.year}</text>
          </g>
        );
      })}

      {label && <text x={W / 2} y={16} textAnchor="middle" className="ppt-stack-label">{label}</text>}
    </svg>
  );
}

// ============================================================================
// BarLineCombo — Slide 7 / 11 (monthly MTD bars + YTD cumulative lines)
// ============================================================================
export function BarLineCombo({ months, bars, lines, yMax = 6, height = 280, unit = '%' }) {
  const W = 1200, H = height, pad = { l: 40, r: 30, t: 40, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const step = innerW / months.length;
  const barCount = Object.keys(bars).length;
  const groupW = step * 0.78;
  const bw = groupW / barCount;

  const y = (v) => pad.t + innerH - (v / yMax) * innerH;

  const barColors = { y2024: '#dcdcdc', y2025: '#9b9b9b', y2026: '#0E0F14' };
  const lineColors = { y2024: '#bfbfbf', y2025: '#888', y2026: '#cc1f2a' };
  const lineDash = { y2024: '3 3', y2025: '5 3', y2026: '0' };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      {/* Legend */}
      <g className="ppt-legend">
        {[
          { k: 'y2024 line', x: 60,  c: '#bfbfbf', t: `% ${unit === '%' ? 'YTD' : ''} 2024`, dash: '3 3' },
          { k: 'y2025 line', x: 180, c: '#888',    t: `% YTD 2025`, dash: '5 3' },
          { k: 'y2026 line', x: 300, c: '#cc1f2a', t: `% YTD 2026`, dash: '0' },
          { k: 'y2024 bar',  x: 420, c: '#dcdcdc', t: `% MTD 2024` },
          { k: 'y2025 bar',  x: 540, c: '#9b9b9b', t: `% MTD 2025` },
          { k: 'y2026 bar',  x: 660, c: '#0E0F14', t: `% MTD 2026` },
        ].map((l, i) => (
          <g key={i} transform={`translate(${l.x}, ${pad.t - 22})`}>
            {l.k.includes('line') ? (
              <line x1={0} x2={14} y1={0} y2={0} stroke={l.c} strokeWidth={2} strokeDasharray={l.dash} />
            ) : (
              <rect x={0} y={-6} width={12} height={12} fill={l.c} />
            )}
            <text x={20} y={4} className="ppt-legend-text">{l.t}</text>
          </g>
        ))}
      </g>

      {/* baseline */}
      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {/* bars per month */}
      {months.map((m, mi) => {
        const xCenter = pad.l + mi * step + step / 2;
        return (
          <g key={m}>
            {Object.entries(bars).map(([k, arr], bi) => {
              const v = arr[mi];
              if (v == null) return null;
              const x = xCenter - groupW / 2 + bi * bw;
              const yy = y(v);
              const h = pad.t + innerH - yy;
              return (
                <g key={k}>
                  <rect x={x} y={yy} width={bw - 1} height={h} fill={barColors[k] || '#999'} />
                  <text x={x + bw / 2} y={pad.t + innerH - 4} textAnchor="middle" className="ppt-bl-bar-value">
                    {Math.round(v)}%
                  </text>
                </g>
              );
            })}
            <text x={xCenter} y={H - 32} textAnchor="middle" className="ppt-bl-month">{m}</text>
          </g>
        );
      })}

      {/* lines: YTD cumulative */}
      {Object.entries(lines).map(([k, arr]) => {
        const points = months
          .map((_, i) => ({ x: pad.l + i * step + step / 2, v: arr[i] }))
          .filter((p) => p.v != null);
        if (!points.length) return null;
        const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${y(p.v)}`).join(' ');
        return (
          <g key={k}>
            <path
              d={path}
              fill="none"
              stroke={lineColors[k]}
              strokeWidth={k === 'y2026' ? 2.5 : 1.6}
              strokeDasharray={lineDash[k]}
            />
            {points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={y(p.v)} r={k === 'y2026' ? 3 : 2.5} fill={lineColors[k]} />
                <text x={p.x} y={y(p.v) - 8} textAnchor="middle" className="ppt-bl-line-value" fill={lineColors[k]}>
                  {p.v.toFixed(p.v < 10 ? 2 : 0).replace(/(\.\d{2})0$/, '$1')}{k === 'y2026' && unit === '%' ? '%' : ''}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// LineChartLabeled — Slide 8 / 12 (clean trend with labeled points)
// ============================================================================
export function LineChartLabeled({ data, color = '#1F47C8', height = 320, yMax, yMin, valueFormat }) {
  const W = 1100, H = height, pad = { l: 40, r: 40, t: 40, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const values = data.map((d) => d.value);
  const max = yMax ?? Math.max(...values) * 1.15;
  const min = yMin ?? Math.max(0, Math.min(...values) * 0.5);
  const step = innerW / (data.length - 1);
  const y = (v) => pad.t + innerH - ((v - min) / (max - min)) * innerH;
  const x = (i) => pad.l + i * step;
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.value)}`).join(' ');
  const fmt = valueFormat || ((v) => v.toFixed(2));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart ppt-trend" preserveAspectRatio="xMidYMid meet">
      <rect x={pad.l} y={pad.t} width={innerW} height={innerH} fill="#bdbdbd" opacity={0.55} />
      <path d={path} fill="none" stroke="#fff" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(d.value)} r={6} fill={color} stroke="#fff" strokeWidth={2} />
          <text
            x={x(i)}
            y={y(d.value) - 14}
            textAnchor="middle"
            className="ppt-trend-value"
          >
            {fmt(d.value)}
          </text>
          <text x={x(i)} y={H - 16} textAnchor="middle" className="ppt-trend-year">
            {d.year}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// HBarVariation — Slide 5 horizontal bars (YoY %)
// ============================================================================
export function HBarVariation({ data, label, height }) {
  const rows = data.length;
  const rowH = 22;
  const W = 600, H = height ?? (rows * rowH + 40), pad = { l: 130, r: 60, t: 16, b: 8 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(...data.map((d) => Math.abs(d.pct))) * 1.1;
  const xCenter = pad.l + innerW * (Math.min(...data.map((d) => d.pct)) < 0 ? 0.30 : 0);
  // Simpler: zero-centered
  const zero = pad.l + (data.some((d) => d.pct < 0) ? innerW * 0.30 : pad.l);
  const yRow = (i) => pad.t + i * rowH + rowH / 2;
  const barLength = (v) => (v >= 0 ? (v / max) * (innerW - (zero - pad.l)) : (Math.abs(v) / max) * (zero - pad.l));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      {label && <text x={W / 2} y={12} textAnchor="middle" className="ppt-hbar-label">{label}</text>}
      <line x1={zero} x2={zero} y1={pad.t} y2={pad.t + innerH} stroke="#bbb" strokeDasharray="2 2" />
      {data.map((d, i) => {
        const yy = yRow(i);
        const isNeg = d.pct < 0;
        const fill = d.color === 'green' ? '#7DBC44' : d.color === 'amber' ? '#F0B85F' : '#A8C7F0';
        const x0 = isNeg ? zero - barLength(d.pct) : zero;
        const w = barLength(d.pct);
        return (
          <g key={i}>
            <text x={pad.l - 8} y={yy + 4} textAnchor="end" className="ppt-hbar-rowlabel">{d.label}</text>
            <rect x={x0} y={yy - rowH * 0.4} width={Math.max(2, w)} height={rowH * 0.8} fill={fill} />
            <text
              x={isNeg ? x0 - 4 : x0 + w + 4}
              y={yy + 4}
              textAnchor={isNeg ? 'end' : 'start'}
              className="ppt-hbar-pctlabel"
            >
              {fmtSigned(d.pct, 2)}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// GroupedBarLine — Slide 30 (Profit by Model: 2 bar series + 1 line)
// ============================================================================
export function GroupedBarLineChart({ data, height = 320 }) {
  const W = 1200, H = height, pad = { l: 50, r: 50, t: 50, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const step = innerW / data.length;
  const bw = step * 0.28;
  const maxBar = Math.max(...data.map((d) => Math.max(d.operationProfit, d.netProfit))) * 1.18;
  const maxLine = Math.max(...data.map((d) => d.distribution)) * 1.25;
  const yBar = (v) => pad.t + innerH - (v / maxBar) * innerH;
  const yLine = (v) => pad.t + innerH - (v / maxLine) * innerH;
  const xc = (i) => pad.l + i * step + step / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      <g className="ppt-legend">
        <g transform={`translate(${W / 2 - 200}, 18)`}>
          <line x1={0} x2={16} y1={6} y2={6} stroke="#1F47C8" strokeWidth={2.5} />
          <circle cx={8} cy={6} r={4} fill="#1F47C8" />
          <text x={22} y={10} className="ppt-legend-text">Profit Distribution</text>
        </g>
        <g transform={`translate(${W / 2 - 60}, 18)`}>
          <rect x={0} y={0} width={12} height={12} fill="#5e5e5e" />
          <text x={18} y={10} className="ppt-legend-text">Operation Profit</text>
        </g>
        <g transform={`translate(${W / 2 + 80}, 18)`}>
          <rect x={0} y={0} width={12} height={12} fill="#cdcdcd" />
          <text x={18} y={10} className="ppt-legend-text">Net Profit</text>
        </g>
      </g>

      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {/* grouped bars */}
      {data.map((d, i) => {
        const x = xc(i);
        return (
          <g key={i}>
            {/* Operation Profit */}
            <rect x={x - bw - 2} y={yBar(d.operationProfit)} width={bw} height={pad.t + innerH - yBar(d.operationProfit)} fill="#5e5e5e" />
            <text x={x - bw / 2 - 2} y={yBar(d.operationProfit) - 4} textAnchor="middle" className="ppt-gb-value">
              {fmtNum(d.operationProfit)}
            </text>
            {/* Net Profit */}
            <rect x={x + 2} y={yBar(d.netProfit)} width={bw} height={pad.t + innerH - yBar(d.netProfit)} fill="#cdcdcd" />
            <text x={x + bw / 2 + 2} y={yBar(d.netProfit) - 4} textAnchor="middle" className="ppt-gb-value">
              {fmtNum(d.netProfit)}
            </text>
            <text x={x} y={H - 24} textAnchor="middle" className="ppt-gb-model">{d.model}</text>
          </g>
        );
      })}

      {/* line: Profit Distribution */}
      <path
        d={data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xc(i)} ${yLine(d.distribution)}`).join(' ')}
        fill="none"
        stroke="#1F47C8"
        strokeWidth={2.5}
      />
      {data.map((d, i) => (
        <g key={`l${i}`}>
          <circle cx={xc(i)} cy={yLine(d.distribution)} r={5} fill="#1F47C8" />
          <text x={xc(i)} y={yLine(d.distribution) - 10} textAnchor="middle" className="ppt-gb-pct">
            {fmtPct(d.distribution, 2)}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ============================================================================
// GroupedBarChart — Slide 31 (Operating Profit YoY by Model)
// ============================================================================
export function GroupedBarsChart({ data, height = 280, keys = ['opFeb25', 'opFeb26'], labels = ['Feb 25', 'Feb 26'], colors = ['#cdcdcd', '#0E0F14'] }) {
  const W = 1200, H = height, pad = { l: 50, r: 30, t: 40, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const step = innerW / data.length;
  const bw = step * 0.28;
  const max = Math.max(...data.flatMap((d) => keys.map((k) => d[k]))) * 1.18;
  const y = (v) => pad.t + innerH - (v / max) * innerH;
  const xc = (i) => pad.l + i * step + step / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      <g className="ppt-legend">
        {labels.map((lbl, i) => (
          <g key={i} transform={`translate(${W / 2 - 80 + i * 90}, 14)`}>
            <rect x={0} y={0} width={12} height={12} fill={colors[i]} />
            <text x={18} y={10} className="ppt-legend-text">{lbl}</text>
          </g>
        ))}
      </g>

      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {data.map((d, i) => {
        const x = xc(i);
        return (
          <g key={i}>
            {keys.map((k, ki) => {
              const v = d[k];
              const offset = (ki - (keys.length - 1) / 2) * (bw + 2);
              return (
                <g key={k}>
                  <rect x={x + offset - bw / 2} y={y(v)} width={bw} height={pad.t + innerH - y(v)} fill={colors[ki]} />
                  <text x={x + offset} y={y(v) - 4} textAnchor="middle" className="ppt-gb-value">
                    {fmtNum(v)}
                  </text>
                </g>
              );
            })}
            <text x={x} y={H - 24} textAnchor="middle" className="ppt-gb-model">{d.model}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// DualStackedColumn — Slide 13 (OAR Internal Calculation visual)
// ============================================================================
export function DualStackedColumn({ left, right, result, height = 380 }) {
  const W = 1100, H = height, pad = { l: 40, r: 40, t: 40, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const max = Math.max(left.total, right.total) * 1.10;
  const y = (v) => pad.t + innerH - (v / max) * innerH;

  // Two columns: Expenses (left) and After-sales (right)
  const colW = 110;
  const xLeft = pad.l + 100;
  const xRight = W - pad.r - 200;

  let acc = 0;
  const leftSegs = left.blocks.map((b) => {
    const seg = { ...b, yStart: y(acc + b.value), height: y(acc) - y(acc + b.value) };
    acc += b.value;
    return seg;
  });
  acc = 0;
  const rightSegs = right.blocks.map((b) => {
    const seg = { ...b, yStart: y(acc + b.value), height: y(acc) - y(acc + b.value) };
    acc += b.value;
    return seg;
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      {/* Left column: Expenses */}
      <text x={xLeft + colW / 2} y={y(left.total) - 16} textAnchor="middle" className="ppt-ds-headtotal">
        Expenses
      </text>
      <text x={xLeft + colW / 2} y={y(left.total) - 2} textAnchor="middle" className="ppt-ds-headvalue">
        {fmtNum(left.total)}
      </text>
      {leftSegs.map((s, i) => (
        <g key={i}>
          <rect x={xLeft} y={s.yStart} width={colW} height={s.height} fill={s.color} stroke="#fff" />
          <text x={xLeft + colW / 2} y={s.yStart + s.height / 2 + 4} textAnchor="middle" className="ppt-ds-segvalue">
            {fmtNum(s.value)}
          </text>
          <text x={xLeft + colW + 8} y={s.yStart + s.height / 2 + 4} className="ppt-ds-seglabel" fill={s.isResult ? '#7DBC44' : '#555'}>
            {s.label}
          </text>
        </g>
      ))}
      <text x={xLeft + colW / 2} y={H - 14} textAnchor="middle" className="ppt-ds-foot">Expenses</text>

      {/* Center formula */}
      <g transform={`translate(${W / 2 - 20}, ${pad.t + 60})`}>
        <text x={0} y={0} className="ppt-ds-formula">OAR = (2) / (4)</text>
        <text x={0} y={32} className="ppt-ds-formula-big">= {result.toFixed(2)}%</text>
      </g>

      {/* Right column: After sales gross profit */}
      <text x={xRight + colW / 2} y={y(right.total) - 16} textAnchor="middle" className="ppt-ds-headtotal" fill="#1F47C8">
        (2) After sales gross profit
      </text>
      <text x={xRight + colW / 2} y={y(right.total) - 2} textAnchor="middle" className="ppt-ds-headvalue">
        {fmtNum(right.total)}
      </text>
      {rightSegs.map((s, i) => (
        <g key={i}>
          <rect x={xRight} y={s.yStart} width={colW} height={s.height} fill={s.color} stroke="#fff" />
          <text x={xRight + colW / 2} y={s.yStart + s.height / 2 + 4} textAnchor="middle" className="ppt-ds-segvalue">
            {fmtNum(s.value)}
          </text>
          <text x={xRight + colW + 8} y={s.yStart + s.height / 2 + 4} className="ppt-ds-seglabel">
            {s.label}
          </text>
        </g>
      ))}
      <text x={xRight + colW / 2} y={H - 14} textAnchor="middle" className="ppt-ds-foot">After sales gross profit</text>
    </svg>
  );
}

// ============================================================================
// LossByMonth — Slide 32 (Bars + Lines)
// ============================================================================
export function LossByMonthChart({ data, height = 320 }) {
  const W = 1200, H = height, pad = { l: 50, r: 30, t: 50, b: 60 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const step = innerW / data.months.length;
  const bw = step * 0.32;
  const max = Math.max(...data.mtd2025.filter((v) => v != null), ...data.mtd2026.filter((v) => v != null), 31) * 1.05;
  const y = (v) => pad.t + innerH - (v / max) * innerH;
  const xc = (i) => pad.l + i * step + step / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ppt-chart" preserveAspectRatio="xMidYMid meet">
      <g className="ppt-legend">
        <g transform={`translate(${W / 2 - 200}, 18)`}>
          <circle cx={6} cy={6} r={4} fill="#7DBC44" />
          <text x={16} y={10} className="ppt-legend-text">2025 YTD</text>
        </g>
        <g transform={`translate(${W / 2 - 100}, 18)`}>
          <line x1={0} x2={14} y1={6} y2={6} stroke="#cc1f2a" strokeWidth={2} strokeDasharray="3 2" />
          <text x={20} y={10} className="ppt-legend-text">2026 YTD</text>
        </g>
        <g transform={`translate(${W / 2 + 10}, 18)`}>
          <rect x={0} y={0} width={12} height={12} fill="#cdcdcd" />
          <text x={18} y={10} className="ppt-legend-text">2025 MTD</text>
        </g>
        <g transform={`translate(${W / 2 + 110}, 18)`}>
          <rect x={0} y={0} width={12} height={12} fill="#0E0F14" />
          <text x={18} y={10} className="ppt-legend-text">2026 MTD</text>
        </g>
      </g>

      <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH} y2={pad.t + innerH} className="ppt-baseline" />

      {data.months.map((m, i) => {
        const x = xc(i);
        const v25 = data.mtd2025[i];
        const v26 = data.mtd2026[i];
        return (
          <g key={m}>
            {v25 != null && (
              <>
                <rect x={x - bw - 1} y={y(v25)} width={bw} height={pad.t + innerH - y(v25)} fill="#cdcdcd" />
                <text x={x - bw / 2 - 1} y={pad.t + innerH - 4} textAnchor="middle" className="ppt-loss-bar-value">
                  {v25}
                </text>
              </>
            )}
            {v26 != null && (
              <>
                <rect x={x + 1} y={y(v26)} width={bw} height={pad.t + innerH - y(v26)} fill="#0E0F14" />
                <text x={x + bw / 2 + 1} y={pad.t + innerH - 4} textAnchor="middle" className="ppt-loss-bar-value" fill="#fff">
                  {v26}
                </text>
              </>
            )}
            <text x={x} y={H - 30} textAnchor="middle" className="ppt-loss-month">{m}</text>
          </g>
        );
      })}

      {/* Lines: 2025 YTD (green), 2026 YTD (red dashed) */}
      {[
        { key: 'ytd2025', color: '#7DBC44', dash: '0' },
        { key: 'ytd2026', color: '#cc1f2a', dash: '3 2' },
      ].map((s) => {
        const pts = data.months
          .map((_, i) => ({ x: xc(i), v: data[s.key][i] }))
          .filter((p) => p.v != null);
        if (!pts.length) return null;
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${y(p.v)}`).join(' ');
        return (
          <g key={s.key}>
            <path d={path} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray={s.dash} />
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={y(p.v)} r={3} fill={s.color} />
                <text x={p.x} y={y(p.v) - 8} textAnchor="middle" className="ppt-loss-line-value" fill={s.color}>
                  {p.v}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
