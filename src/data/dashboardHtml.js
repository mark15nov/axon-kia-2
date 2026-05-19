// Static dashboard markup — refactor incrementally into JSX components.
export const DASHBOARD_HTML = `

<!-- ============================================================ -->
<!-- TOP TAB NAVIGATION                                          -->
<!-- ============================================================ -->
<div class="brandbar">
  <div class="logo-wrap">
    <img class="logo" src="/kia-logo.png" alt="KIA" />
    <div class="vbar"></div>
    <div class="titles">
      <h1>National · Financial Cockpit</h1>
      <div class="sub">YTD &amp; MTD · Executive intelligence terminal</div>
    </div>
  </div>
  <div class="brand-spacer"></div>
  <div class="meta">
    <div class="pulse">Live data</div>
    <div class="item"><span>Total Sales YTD</span><span class="v">$544.99M</span></div>
    <div class="item"><span>Net Profit</span><span class="v">$7.21M</span></div>
    <div class="item"><span>Period</span><span class="v">YTD 2026</span></div>
  </div>
  <div class="user-avatar" title="Luis Rivera · luis.rivera@profitsolutions.mx">
    <span>LR</span>
  </div>
</div>

<div class="ticker">
  <div class="marker">Live</div>
  <div class="ticker-viewport">
    <div class="ticker-track"><span class="ticker-item"><span class="sym">Total Sales</span><span class="val">$544.99M</span><span class="delta up"><span class="arrow">▲</span> +12.9% YoY</span></span><span class="ticker-item"><span class="sym">Gross Profit</span><span class="val">$77.23M</span><span class="delta up"><span class="arrow">▲</span> +9.1% YoY</span></span><span class="ticker-item"><span class="sym">Operating Profit</span><span class="val">$20.86M</span><span class="delta down"><span class="arrow">▼</span> -3.2% YoY</span></span><span class="ticker-item"><span class="sym">Net Profit</span><span class="val">$7.21M</span><span class="delta down"><span class="arrow">▼</span> -38.2% YoY</span></span><span class="ticker-item"><span class="sym">Gross Margin</span><span class="val">14.2%</span></span><span class="ticker-item"><span class="sym">Op. Margin</span><span class="val">3.8%</span></span><span class="ticker-item"><span class="sym">Net Margin</span><span class="val">1.3%</span></span><span class="ticker-item"><span class="sym">New Vehicles</span><span class="val">$432.83M</span><span class="delta up"><span class="arrow">▲</span> +16.2%</span></span><span class="ticker-item"><span class="sym">Pre-Owned</span><span class="val">$41.38M</span><span class="delta down"><span class="arrow">▼</span> -9.0%</span></span><span class="ticker-item"><span class="sym">F&I</span><span class="val">$12.59M</span><span class="delta up"><span class="arrow">▲</span> +17.0%</span></span><span class="ticker-item"><span class="sym">Parts</span><span class="val">$37.57M</span><span class="delta up"><span class="arrow">▲</span> +9.9%</span></span><span class="ticker-item"><span class="sym">Service</span><span class="val">$16.18M</span><span class="delta up"><span class="arrow">▲</span> +8.1%</span></span><span class="ticker-item"><span class="sym">Body & Paint</span><span class="val">$4.44M</span><span class="delta down"><span class="arrow">▼</span> -7.2%</span></span><span class="ticker-item"><span class="sym">Units New</span><span class="val">1,039 u</span><span class="delta up"><span class="arrow">▲</span> +76</span></span><span class="ticker-item"><span class="sym">ROs Service</span><span class="val">14,328</span><span class="delta up"><span class="arrow">▲</span> +3,219</span></span><span class="ticker-item"><span class="sym">Inventory</span><span class="val">$32.77M</span></span><span class="ticker-item"><span class="sym">Total Assets</span><span class="val">$144.62M</span></span><span class="ticker-item"><span class="sym">Total Equity</span><span class="val">$51.25M</span></span><span class="ticker-item"><span class="sym">Working Capital</span><span class="val">$26.41M</span></span><span class="ticker-item"><span class="sym">Current Ratio</span><span class="val">1.31x</span></span><span class="ticker-item"><span class="sym">Debt/Equity</span><span class="val">1.82x</span></span><span class="ticker-item"><span class="sym">ROE</span><span class="val">14.1%</span></span><span class="ticker-item"><span class="sym">ROA</span><span class="val">4.99%</span></span><span class="ticker-item"><span class="sym">Total Sales</span><span class="val">$544.99M</span><span class="delta up"><span class="arrow">▲</span> +12.9% YoY</span></span><span class="ticker-item"><span class="sym">Gross Profit</span><span class="val">$77.23M</span><span class="delta up"><span class="arrow">▲</span> +9.1% YoY</span></span><span class="ticker-item"><span class="sym">Operating Profit</span><span class="val">$20.86M</span><span class="delta down"><span class="arrow">▼</span> -3.2% YoY</span></span><span class="ticker-item"><span class="sym">Net Profit</span><span class="val">$7.21M</span><span class="delta down"><span class="arrow">▼</span> -38.2% YoY</span></span><span class="ticker-item"><span class="sym">Gross Margin</span><span class="val">14.2%</span></span><span class="ticker-item"><span class="sym">Op. Margin</span><span class="val">3.8%</span></span><span class="ticker-item"><span class="sym">Net Margin</span><span class="val">1.3%</span></span><span class="ticker-item"><span class="sym">New Vehicles</span><span class="val">$432.83M</span><span class="delta up"><span class="arrow">▲</span> +16.2%</span></span><span class="ticker-item"><span class="sym">Pre-Owned</span><span class="val">$41.38M</span><span class="delta down"><span class="arrow">▼</span> -9.0%</span></span><span class="ticker-item"><span class="sym">F&I</span><span class="val">$12.59M</span><span class="delta up"><span class="arrow">▲</span> +17.0%</span></span><span class="ticker-item"><span class="sym">Parts</span><span class="val">$37.57M</span><span class="delta up"><span class="arrow">▲</span> +9.9%</span></span><span class="ticker-item"><span class="sym">Service</span><span class="val">$16.18M</span><span class="delta up"><span class="arrow">▲</span> +8.1%</span></span><span class="ticker-item"><span class="sym">Body & Paint</span><span class="val">$4.44M</span><span class="delta down"><span class="arrow">▼</span> -7.2%</span></span><span class="ticker-item"><span class="sym">Units New</span><span class="val">1,039 u</span><span class="delta up"><span class="arrow">▲</span> +76</span></span><span class="ticker-item"><span class="sym">ROs Service</span><span class="val">14,328</span><span class="delta up"><span class="arrow">▲</span> +3,219</span></span><span class="ticker-item"><span class="sym">Inventory</span><span class="val">$32.77M</span></span><span class="ticker-item"><span class="sym">Total Assets</span><span class="val">$144.62M</span></span><span class="ticker-item"><span class="sym">Total Equity</span><span class="val">$51.25M</span></span><span class="ticker-item"><span class="sym">Working Capital</span><span class="val">$26.41M</span></span><span class="ticker-item"><span class="sym">Current Ratio</span><span class="val">1.31x</span></span><span class="ticker-item"><span class="sym">Debt/Equity</span><span class="val">1.82x</span></span><span class="ticker-item"><span class="sym">ROE</span><span class="val">14.1%</span></span><span class="ticker-item"><span class="sym">ROA</span><span class="val">4.99%</span></span></div>
  </div>
</div>
<div class="tabbar">
  <button class="tab active" data-tab="tab1">Drivers</button>
  <button class="tab" data-tab="tab2">P&amp;L Drill-Down</button>
  <button class="tab" data-tab="tab3">Balance Sheet</button>
  <button class="tab" data-tab="tab4">S&amp;GM</button>
  <button class="tab" data-tab="tab5">ADD</button>
</div>

<div id="tab1" class="tab-panel active">
  <div style="padding: 24px 24px 8px;">
    <div style="font-size: 18px; font-weight: 800; color: var(--kia-black); letter-spacing: 0.12em; text-transform: uppercase;">Drivers</div>
    
  </div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">01</span>Commercial Performance</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">Is the business growing in sales and units?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>$544.99M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">New Vehicle Units</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>1,039</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Pre-Owned Units</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow down">▼</span>130</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>$77.23M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Sales Growth</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>+12.9%</div>
        <div class="kpi-delta">vs. Prior YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Unit Growth</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>+7.9%</div>
        <div class="kpi-delta">vs. Prior YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Pre-Owned Growth</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▼</span>-9.0%</div>
        <div class="kpi-delta">vs. Prior YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit Growth</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>+9.1%</div>
        <div class="kpi-delta">vs. Prior YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s01_head">Analisis</div>
      <span data-i18n="drv_s01_body">El portafolio crece de forma <b>desbalanceada</b>. Ventas totales +12.9% ($544.99M) y utilidad bruta +9.1%, pero <b>la utilidad crece más lento que las ventas</b> — primera señal de erosión de margen. Nuevos lidera con <b>+7.9% en unidades</b> (+76 u), mientras <b>Pre-Owned cae -9.0%</b> y resta tracción al pipeline. La pregunta ejecutiva no es si crecemos, sino <b>cómo</b>: ¿cuánto del +12.9% en ventas viene de mix, de precio promedio o de descuento agresivo? Y ¿por qué seminuevos pierde tracción cuando el mercado mexicano está hambriento de auto usado financiado?</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">02</span>Margin Mix Quality</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">Is commercial growth generating quality margin?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin %</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>14.2%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">New Vehicles Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▼</span>6.5%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Fleet Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▼</span>1.65%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Pre-Owned Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>13.0%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">F&amp;I Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>$11.77M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Aftersales GP Contribution</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>35.0%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s02_head">Analisis</div>
      <span data-i18n="drv_s02_body">El margen bruto consolidado de <b>14.2%</b> esconde una operación <b>de dos velocidades</b>. Nuevos opera a <b>6.5%</b> (cayendo) y Fleet a <b>1.65%</b> — apenas cubren costos directos. La rentabilidad real vive en <b>F&amp;I (93.5% de margen, $11.77M de GP)</b> y <b>Aftersales (35% de la GP consolidada, $27M)</b>. Estas dos áreas, con apenas <b>12% de las ventas</b>, sostienen prácticamente toda la utilidad bruta. La lectura: <b>cada vehículo nuevo vendido es un boleto de entrada</b> para colocar productos rentables — financiamiento, seguros, refacciones, servicio. Pregunta de dirección: ¿estamos midiendo a la fuerza de ventas por unidades cerradas o por <b>penetración de F&amp;I y captación de aftersales por unidad</b>?</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">03</span>Cash Pressure</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">How much cash is trapped in receivables?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Accounts Receivable</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow down">▲</span>$42.73M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AR &gt; 90 Days</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>$3.91M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AR &gt; 120 Days</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>$3.26M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">% Risky Receivables</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>9.0%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">% Critical Receivables</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>7.5%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cash / Current Assets</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▼</span>9.8%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s03_head">Analisis</div>
      <span data-i18n="drv_s03_body"><b>$42.73M en cuentas por cobrar — la mayor partida del activo circulante (38.2%)</b>. La cobranza, no el efectivo, es lo que financia esta operación. Pero el envejecimiento preocupa: <b>$3.91M (9.0%) sobre 90 días</b> y <b>$3.26M (7.5%) crítico (+120 días)</b>. Suman <b>$7.17M en riesgo de incobrabilidad</b> — aproximadamente <b>el equivalente al EBIT de un mes</b>. El efectivo representa apenas el <b>9.8% del activo circulante</b>: buffer insuficiente ante cualquier disrupción de cobranza. <b>Acción ejecutiva</b>: comité de cobranza semanal sobre el bucket +120 días, provisión preventiva en cartera crítica, y revisión de los <b>$19.65M de "Other AR"</b> — si no son operativos, separarlos del análisis de salud comercial.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">04</span>Inventory Pressure</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">How much capital is tied up in inventory?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow down">▲</span>$32.77M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">New Vehicle Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>$21.21M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Pre-Owned Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow down">▲</span>$7.22M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Parts Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow down">▲</span>$2.58M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Inventory / Current Assets</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>29.3%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Floor Plan / Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>107%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s04_head">Analisis</div>
      <span data-i18n="drv_s04_body"><b>$32.77M en inventario, 29.3% del activo circulante</b> — capital de trabajo concentrado en unidades sin vender. Nuevos representa el <b>64.7% ($21.21M)</b>, financiado al <b>107% con floor plan</b> — la línea financia más que el inventario físico, <b>señal clara de sobre-financiamiento</b>. Implica dos cosas: <b>(1)</b> cada día adicional en piso suma <b>~$22K diarios de costo financiero solo en floor plan</b>; <b>(2)</b> la salida es <b>rotación</b>, no más línea. <b>Palanca de dirección</b>: programa de rotación con metas semanales por modelo, descuentos focalizados a unidades <b>&gt;60 días en piso</b>, y revisión del mix de pedidos al fabricante — si el pull es menor al push, el problema seguirá creciendo.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">05</span>Working Capital Health</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">Short-term capacity to cover obligations.</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Current Assets</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>$111.92M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Current Liabilities</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>$85.51M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Working Capital</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>$26.41M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Current Ratio</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>1.31x</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AR + Inv / CA</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>67.5%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ST Liab / Total Liab</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>91.6%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s05_head">Analisis</div>
      <span data-i18n="drv_s05_body">El balance se ve sano: <b>capital de trabajo positivo de $26.41M</b> y <b>current ratio de 1.31x</b>. Pero los detalles cuentan otra historia. El <b>67.5% del activo circulante está atrapado en AR + inventario</b> — liquidez existe, pero está <b>ilíquida</b>. El <b>91.6% del pasivo es de corto plazo</b>: vencimientos inminentes sin colchón estructural de largo plazo. El <b>quick ratio (sin inventario) cae a ~0.93x</b> — por debajo del umbral seguro. Lectura ejecutiva: la operación puede pagar a 90 días, pero <b>no resiste un shock de 30 días</b> en cobranza o ventas. Pregunta de dirección: ¿qué porcentaje del pasivo corto puede <b>refinanciarse a largo plazo</b> para liberar presión de tesorería?</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">06</span>Financial Pressure</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">How much of the result is consumed by financial cost?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Financial Expenses</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>$9.90M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Floor Plan Interest</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>$6.71M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Net Financial Result</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▼</span>-$8.57M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Financial Expenses / EBIT</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>43.2%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Floor Plan / Fin. Expenses</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>67.8%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Financial Expenses / GP</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>12.8%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s06_head">Analisis</div>
      <span data-i18n="drv_s06_body">El costo financiero es el <b>destructor silencioso de utilidad</b>. Gastos financieros YTD: <b>$9.90M</b>. Productos financieros: $1.33M. Resultado financiero neto: <b>-$8.57M</b>. Este monto consume <b>43.2% del EBIT</b> — casi la mitad de lo que genera la operación se va antes de impuestos en intereses. El <b>Floor Plan domina con $6.71M (67.8%)</b>: financiar inventario es, en proporción, más caro que el resto de la deuda combinada. La cadena es directa: <b>más días de inventario → más costo de piso → menos utilidad neta</b>. Palanca prioritaria: <b>reducir días de inventario en nuevos</b>. Una reducción de 15 días en piso libera <b>~$330K trimestrales</b> en costo financiero — dinero que cae directo a utilidad neta.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">07</span>Aftersales Productivity</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">Is aftersales leveraging its installed capacity?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Repair Orders</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>14,781</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Hours Sold / Hours Worked</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>96.1%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Hours Sold per Technician</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>3,834</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ROs per Technician</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>2,112</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bays / Elevators</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;"><span class="kpi-arrow up">▲</span>10 / 5</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Capacity Utilization</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>96.1%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s07_head">Analisis</div>
      <span data-i18n="drv_s07_body">Aftersales corre al <b>96.1% de utilización</b> con <b>14,781 órdenes YTD</b> — una de las áreas con mejor productividad operativa de toda la red. Cada técnico vende <b>3,834 horas/año</b> y procesa <b>2,112 órdenes</b>, con un mix sano (79% cliente, 6% garantía, 5% interno). La paradoja: el área <b>más productiva ya no tiene holgura</b>. La capacidad instalada es de <b>10 bahías / 5 elevadores</b> y está prácticamente saturada. <b>Crecer aquí no es cuestión de eficiencia — es cuestión de CapEx</b>. Pregunta de dirección: ¿cuál es el ROI de adicionar <b>2 bahías y 1 elevador</b>? Con ticket promedio de $1,131 y margen del 82%, el incremental de aftersales se paga con velocidad.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header" style="flex-direction: column; align-items: flex-start; gap: 4px;">
      <h2 style="margin: 0;"><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">08</span>Result Quality</h2>
      <div style="font-size: 15.5px; font-weight: 600; color: rgba(255,255,255,0.55); letter-spacing: 0.06em; margin-left: 42px;">Does profit come from real operations or non-recurring effects?</div>
    </div>
    <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Other Products YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>$2.95M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Other Expenses YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▲</span>$0.88M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Net Other Result</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;"><span class="kpi-arrow up">▲</span>+$2.07M</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Net Other / EBIT</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>9.0%</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Non-Recurring Risk</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;"><span class="kpi-arrow down">▲</span>Mixed</div>
        <div class="kpi-delta">YTD</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">OP vs Net Profit Gap</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);"><span class="kpi-arrow down">▼</span>-65.4%</div>
        <div class="kpi-delta">YTD</div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="drv_s08_head">Analisis</div>
      <span data-i18n="drv_s08_body">La utilidad final <b>no refleja la calidad real</b> de la operación. <b>Net Other Result aporta +$2.07M (9% del EBIT)</b> — casi una décima parte del resultado operativo viene de partidas no operativas. La <b>brecha entre EBIT y Net Profit es brutal: -65.4% ($20.86M → $7.21M)</b>. El recorrido: la operación genera $20.86M, el costo financiero se lleva $8.57M, los impuestos y otros restantes terminan en $7.21M. <b>Calidad de utilidad: mixta</b>. Pregunta ejecutiva: ¿qué porcentaje de los <b>$2.95M en "Other Products"</b> es repetible trimestre tras trimestre? Si es recurrente, la operación es más sana de lo que parece; si no, el <b>EBIT "limpio" sería ~$18.8M</b> y la conversión a Net Profit aún más débil. Recomendación: <b>desglose mensual de Other Products/Expenses con bandera de recurrencia</b>.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button">Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
</div>

<!-- ============================================================ -->
<!-- TAB 2: P&L DRILL-DOWN                                        -->
<!-- ============================================================ -->
<div id="tab2" class="tab-panel">

  <div class="banner">
    <h1>P&amp;L Drill-Down by Channel</h1>
    <div class="sub">Switch between Total and individual lines using the selectors · MTD &amp; YTD views</div>
  </div>

  <div class="box">
    <div class="box-head">
      <div class="box-title"><span class="num">1</span> P&amp;L 1 — VEHICLES, PRE-OWNED &amp; F&amp;I</div>
      <div class="selector">
        <label>View:</label>
        <div class="btn-group" id="pl1-btns">
          <button class="view-btn active" data-val="total_ytd">TOTAL YTD</button>
          <button class="view-btn" data-val="total_mtd">TOTAL MTD</button>
          <button class="view-btn" data-val="new_ytd">A — NEW YTD</button>
          <button class="view-btn" data-val="new_mtd">A — NEW MTD</button>
          <button class="view-btn" data-val="fi_ytd">C — F&amp;I YTD</button>
          <button class="view-btn" data-val="fi_mtd">C — F&amp;I MTD</button>
        </div>
      </div>
    </div>
    <div class="box-body">
      <div class="kpi-grid" id="pl1-kpis"></div>

      <div class="breakdown">
        <div class="bd-table-wrap">
          <table>
            <thead>
              <tr><th class="l">P&amp;L Line</th><th class="r">Value</th><th class="r">% of Sales</th></tr>
            </thead>
            <tbody id="pl1-tbody"></tbody>
          </table>
        </div>
        <div class="chart-box">
          <h4 id="pl1-chart-title">Expense Composition</h4>
          <div class="chart-canvas tall"><canvas id="pl1-chart"></canvas></div>
        </div>
      </div>

      <div class="box-actions">
        <button class="deep-btn" type="button">
          Analisis
        </button>
      </div>
    </div>
  </div>

  <div class="box">
    <div class="box-head">
      <div class="box-title"><span class="num">2</span> P&amp;L 2 — PARTS, SERVICE &amp; BODY</div>
      <div class="selector">
        <label>View:</label>
        <div class="btn-group" id="pl2-btns">
          <button class="view-btn active" data-val="total_ytd">TOTAL YTD</button>
          <button class="view-btn" data-val="total_mtd">TOTAL MTD</button>
          <button class="view-btn" data-val="parts_ytd">D — PARTS YTD</button>
          <button class="view-btn" data-val="parts_mtd">D — PARTS MTD</button>
          <button class="view-btn" data-val="service_ytd">E — SERVICE YTD</button>
          <button class="view-btn" data-val="service_mtd">E — SERVICE MTD</button>
          <button class="view-btn" data-val="body_ytd">F — BODY &amp; PAINT YTD</button>
          <button class="view-btn" data-val="body_mtd">F — BODY &amp; PAINT MTD</button>
        </div>
      </div>
    </div>
    <div class="box-body">
      <div class="kpi-grid" id="pl2-kpis"></div>

      <div class="breakdown">
        <div class="bd-table-wrap">
          <table>
            <thead>
              <tr><th class="l">P&amp;L Line</th><th class="r">Value</th><th class="r">% of Sales</th></tr>
            </thead>
            <tbody id="pl2-tbody"></tbody>
          </table>
        </div>
        <div class="chart-box">
          <h4 id="pl2-chart-title">Expense Composition</h4>
          <div class="chart-canvas tall"><canvas id="pl2-chart"></canvas></div>
        </div>
      </div>

      <div class="box-actions">
        <button class="deep-btn" type="button">
          Analisis
        </button>
      </div>
    </div>
  </div>

  <!-- ============================================================ -->
  <!-- PROFITABILITY SECTION (inside Tab 2)                          -->
  <!-- ============================================================ -->
  <div id="prof-anchor"></div>

  <div class="box prof-section">
    <div class="box-head">
      <div class="box-title">
        <span class="num">04</span>
        Profitability by Business Unit
      </div>
      <div class="selector">
        <label>Scope</label>
        <div class="btn-group" id="prof-scope-btns">
          <button class="view-btn active" data-val="sales">Sales</button>
          <button class="view-btn" data-val="postsales">Post-Sales</button>
        </div>
        <span style="opacity:0.3; padding:0 6px;">|</span>
        <label>Period</label>
        <div class="btn-group" id="prof-period-btns">
          <button class="view-btn active" data-val="ytd">YTD</button>
          <button class="view-btn" data-val="mtd">MTD</button>
        </div>
      </div>
    </div>
    <div class="box-body">
      <div class="bd-table-wrap">
        <table class="prof-table">
          <thead>
            <tr id="prof-thead-row"><th class="l">Indicator</th><th class="prof-h-total"><span class="col-name">Total Company</span><span class="vs">Δ vs YA</span></th><th class="prof-h-new"><span class="col-name">New Vehicles</span><span class="vs">Δ vs YA</span></th><th class="prof-h-po"><span class="col-name">Pre-Owned</span><span class="vs">Δ vs YA</span></th><th class="prof-h-fi"><span class="col-name">F&amp;I</span><span class="vs">Δ vs YA</span></th></tr>
          </thead>
          <tbody id="prof-tbody"></tbody>
        </table>
      </div>


    </div>
  </div>


  <!-- Spacer + Business Unit Profitability Matrix -->
  <div class="analisis-cta"><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2>Business Unit Profitability Matrix</h2>
    </div>
    <div class="matrix-table-wrap">
      <table class="matrix-table">
        <thead>
          <tr>
            <th class="l">Unidad</th>
            <th>Sales YTD<span class="sub">% of total</span></th>
            <th>Gross Profit YTD<span class="sub">% of total</span></th>
            <th>Operating Profit YTD<span class="sub">% of total</span></th>
            <th>Operating Margin<span class="sub">OP / Sales</span></th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="unit">New</td>
          <td>
            <span class="val">$432.83M</span>
            <span class="pctmix">79.4% MIX</span>
            <div class="matrix-bar"><span style="width:79.4%"></span></div>
          </td>
          <td>
            <span class="val">$32.72M</span>
            <span class="pctmix">42.4% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:42.4%"></span></div>
          </td>
          <td>
            <span class="val">$0.02M</span>
            <span class="pctmix">0.1% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:0.4%"></span></div>
          </td>
          <td><span class="margin low">0.0%</span></td>
        </tr>

        <tr>
          <td class="unit">Pre-Owned</td>
          <td>
            <span class="val">$41.38M</span>
            <span class="pctmix">7.6% MIX</span>
            <div class="matrix-bar"><span style="width:7.6%"></span></div>
          </td>
          <td>
            <span class="val">$5.40M</span>
            <span class="pctmix">7.0% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:7.0%"></span></div>
          </td>
          <td>
            <span class="val">$1.11M</span>
            <span class="pctmix">5.3% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:5.3%"></span></div>
          </td>
          <td><span class="margin low">2.7%</span></td>
        </tr>

        <tr>
          <td class="unit">F&I</td>
          <td>
            <span class="val">$12.59M</span>
            <span class="pctmix">2.3% MIX</span>
            <div class="matrix-bar"><span style="width:2.3%"></span></div>
          </td>
          <td>
            <span class="val">$11.77M</span>
            <span class="pctmix">15.2% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:15.2%"></span></div>
          </td>
          <td>
            <span class="val">$8.07M</span>
            <span class="pctmix">38.5% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:38.5%"></span></div>
          </td>
          <td><span class="margin high">64.1%</span></td>
        </tr>

        <tr>
          <td class="unit">Parts</td>
          <td>
            <span class="val">$37.57M</span>
            <span class="pctmix">6.9% MIX</span>
            <div class="matrix-bar"><span style="width:6.9%"></span></div>
          </td>
          <td>
            <span class="val">$11.86M</span>
            <span class="pctmix">15.4% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:15.4%"></span></div>
          </td>
          <td>
            <span class="val">$8.45M</span>
            <span class="pctmix">40.4% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:40.4%"></span></div>
          </td>
          <td><span class="margin high">22.5%</span></td>
        </tr>

        <tr>
          <td class="unit">Service Labor</td>
          <td>
            <span class="val">$16.18M</span>
            <span class="pctmix">3.0% MIX</span>
            <div class="matrix-bar"><span style="width:3.0%"></span></div>
          </td>
          <td>
            <span class="val">$13.31M</span>
            <span class="pctmix">17.2% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:17.2%"></span></div>
          </td>
          <td>
            <span class="val">$3.06M</span>
            <span class="pctmix">14.6% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:14.6%"></span></div>
          </td>
          <td><span class="margin mid">18.9%</span></td>
        </tr>

        <tr>
          <td class="unit">Body & Paint</td>
          <td>
            <span class="val">$4.44M</span>
            <span class="pctmix">0.8% MIX</span>
            <div class="matrix-bar"><span style="width:0.8%"></span></div>
          </td>
          <td>
            <span class="val">$2.17M</span>
            <span class="pctmix">2.8% MIX</span>
            <div class="matrix-bar"><span class="green" style="width:2.8%"></span></div>
          </td>
          <td>
            <span class="val">$0.23M</span>
            <span class="pctmix">1.1% MIX</span>
            <div class="matrix-bar"><span class="red" style="width:1.1%"></span></div>
          </td>
          <td><span class="margin mid">5.1%</span></td>
        </tr>

        <tr style="background: var(--kia-black); color: var(--kia-white); border-top: 2px solid var(--kia-black);">
          <td class="unit" style="color: var(--kia-white);">TOTAL</td>
          <td>
            <span class="val" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">$544.99M</span>
            <span class="pctmix" style="color: rgba(255,255,255,0.6);">100% MIX</span>
          </td>
          <td>
            <span class="val" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">$77.23M</span>
            <span class="pctmix" style="color: rgba(255,255,255,0.6);">100% MIX</span>
          </td>
          <td>
            <span class="val" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">$20.95M</span>
            <span class="pctmix" style="color: rgba(255,255,255,0.6);">100% MIX</span>
          </td>
          <td><span class="margin" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">3.8%</span></td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="truths">
      <div class="truth alt">
        <div class="tnum">01</div>
        <div class="title" data-i18n="bup_t1_title">New Cars: motor de volumen, no de utilidad operativa</div>
        <div class="desc" data-i18n="bup_t1_desc">Tiene <b>79.4% de las ventas</b> y <b>42.4% de la utilidad bruta</b>, pero <b>casi 0% de la utilidad operativa</b>. Su margen bruto se consume casi por completo en gastos operativos.</div>
        <div class="stat">
          <div class="item"><span class="k">Sales mix</span><span class="v">79.4%</span></div>
          <div class="item"><span class="k">GP mix</span><span class="v">42.4%</span></div>
          <div class="item"><span class="k">OP mix</span><span class="v">0.1%</span></div>
        </div>
      </div>
      <div class="truth">
        <div class="tnum">02</div>
        <div class="title" data-i18n="bup_t2_title">F&amp;I: el negocio de mayor conversión a utilidad</div>
        <div class="desc" data-i18n="bup_t2_desc">Con solo <b>2.3% de las ventas totales</b> genera <b>38.5% de la utilidad operativa</b>. Margen operativo del <b>64.1%</b>. Unidad crítica para rentabilidad.</div>
        <div class="stat">
          <div class="item"><span class="k">Sales mix</span><span class="v">2.3%</span></div>
          <div class="item"><span class="k">OP mix</span><span class="v">38.5%</span></div>
          <div class="item"><span class="k">Margin</span><span class="v">64.1%</span></div>
        </div>
      </div>
      <div class="truth">
        <div class="tnum">03</div>
        <div class="title" data-i18n="bup_t3_title">Parts: el gran generador operativo</div>
        <div class="desc" data-i18n="bup_t3_desc">Genera <b>40.4% de la utilidad operativa total</b> con solo <b>6.9% de las ventas</b>. Postventa no es soporte: es <b>motor financiero</b>. Crítico para entender la salud del distribuidor.</div>
        <div class="stat">
          <div class="item"><span class="k">Sales mix</span><span class="v">6.9%</span></div>
          <div class="item"><span class="k">OP mix</span><span class="v">40.4%</span></div>
          <div class="item"><span class="k">Margin</span><span class="v">22.5%</span></div>
        </div>
      </div>
    </div>
  </div>


  <!-- Spacer + Gross vs Operating Margin -->
  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2>Gross Margin vs Operating Margin</h2>
    </div>
    <div class="matrix-table-wrap" style="padding: 20px;">
      <div class="chart-canvas" style="height: 360px;"><canvas id="margin-compare"></canvas></div>
    </div>

    <div class="matrix-table-wrap" style="border-top: 1px solid var(--border);">
      <table class="matrix-table">
        <thead>
          <tr>
            <th class="l">Unidad</th>
            <th>Gross Margin<span class="sub">GP / Sales</span></th>
            <th>Operating Margin<span class="sub">OP / Sales</span></th>
            <th>Margin Loss<span class="sub">Δ (GM − OM)</span></th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="unit">New</td>
          <td><span class="val">7.6%</span><div class="matrix-bar"><span class="green" style="width:7.6%"></span></div></td>
          <td><span class="val">0.0%</span><div class="matrix-bar"><span class="red" style="width:0.0%"></span></div></td>
          <td><span class="margin high">7.6%</span></td>
        </tr>

        <tr>
          <td class="unit">Pre-Owned</td>
          <td><span class="val">13.0%</span><div class="matrix-bar"><span class="green" style="width:13.0%"></span></div></td>
          <td><span class="val">2.7%</span><div class="matrix-bar"><span class="red" style="width:2.7%"></span></div></td>
          <td><span class="margin mid">10.3%</span></td>
        </tr>

        <tr>
          <td class="unit">F&I</td>
          <td><span class="val">93.5%</span><div class="matrix-bar"><span class="green" style="width:93.5%"></span></div></td>
          <td><span class="val">64.1%</span><div class="matrix-bar"><span class="red" style="width:64.1%"></span></div></td>
          <td><span class="margin mid">29.4%</span></td>
        </tr>

        <tr>
          <td class="unit">Parts</td>
          <td><span class="val">31.6%</span><div class="matrix-bar"><span class="green" style="width:31.6%"></span></div></td>
          <td><span class="val">22.5%</span><div class="matrix-bar"><span class="red" style="width:22.5%"></span></div></td>
          <td><span class="margin high">9.1%</span></td>
        </tr>

        <tr>
          <td class="unit">Service Labor</td>
          <td><span class="val">82.3%</span><div class="matrix-bar"><span class="green" style="width:82.3%"></span></div></td>
          <td><span class="val">18.9%</span><div class="matrix-bar"><span class="red" style="width:18.9%"></span></div></td>
          <td><span class="margin low">63.4%</span></td>
        </tr>

        <tr>
          <td class="unit">Body & Paint</td>
          <td><span class="val">49.0%</span><div class="matrix-bar"><span class="green" style="width:49.0%"></span></div></td>
          <td><span class="val">5.1%</span><div class="matrix-bar"><span class="red" style="width:5.1%"></span></div></td>
          <td><span class="margin low">43.9%</span></td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="truths" style="grid-template-columns: repeat(4, 1fr);">
      <div class="truth alt">
        <div class="tnum">01</div>
        <div class="title" data-i18n="gm_t1_title">New Cars · ¿Volumen o utilidad?</div>
        <div class="desc" data-i18n="gm_t1_desc">Margen bruto bajo (<b>7.6%</b>) y margen operativo casi inexistente (<b>0.01%</b>). <b>Pregunta estratégica</b>: ¿está funcionando como generador de utilidad o como generador de volumen para alimentar F&amp;I y postventa?</div>
        <div class="stat">
          <div class="item"><span class="k">Gross M.</span><span class="v">7.6%</span></div>
          <div class="item"><span class="k">Op. M.</span><span class="v">0.01%</span></div>
          <div class="item"><span class="k">Loss</span><span class="v">7.6pp</span></div>
        </div>
      </div>
      <div class="truth">
        <div class="tnum">02</div>
        <div class="title" data-i18n="gm_t2_title">F&amp;I · Máxima conversión</div>
        <div class="desc" data-i18n="gm_t2_desc">Altísima conversión de ventas a utilidad (<b>64.1%</b> margen operativo). <b>Pregunta estratégica</b>: ¿estamos maximizando penetración de financiamiento, seguros y productos adicionales por unidad vendida?</div>
        <div class="stat">
          <div class="item"><span class="k">Gross M.</span><span class="v">93.5%</span></div>
          <div class="item"><span class="k">Op. M.</span><span class="v">64.1%</span></div>
          <div class="item"><span class="k">Loss</span><span class="v">29.4pp</span></div>
        </div>
      </div>
      <div class="truth">
        <div class="tnum">03</div>
        <div class="title" data-i18n="gm_t3_title">Service Labor · Fuga de margen</div>
        <div class="desc" data-i18n="gm_t3_desc">Margen bruto altísimo (<b>82.3%</b>) que se reduce drásticamente en utilidad operativa (<b>18.9%</b>). <b>Pregunta estratégica</b>: ¿la estructura de personal y gastos está absorbiendo demasiado margen de servicio?</div>
        <div class="stat">
          <div class="item"><span class="k">Gross M.</span><span class="v">82.3%</span></div>
          <div class="item"><span class="k">Op. M.</span><span class="v">18.9%</span></div>
          <div class="item"><span class="k">Loss</span><span class="v">63.4pp</span></div>
        </div>
      </div>
      <div class="truth">
        <div class="tnum">04</div>
        <div class="title" data-i18n="gm_t4_title">Body &amp; Paint · ¿Escala o productividad?</div>
        <div class="desc" data-i18n="gm_t4_desc">Margen bruto sano (<b>49.0%</b>), pero utilidad operativa baja (<b>5.1%</b>). <b>Pregunta estratégica</b>: ¿Body &amp; Paint tiene problema de escala, productividad o absorción de gastos?</div>
        <div class="stat">
          <div class="item"><span class="k">Gross M.</span><span class="v">49.0%</span></div>
          <div class="item"><span class="k">Op. M.</span><span class="v">5.1%</span></div>
          <div class="item"><span class="k">Loss</span><span class="v">43.9pp</span></div>
        </div>
      </div>
    </div>
  </div>


  <!-- Spacer + Expense Absorption -->
  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2>Expense Absorption by Business Unit</h2>
    </div>
    <div class="matrix-table-wrap" style="padding: 20px;">
      <div class="chart-canvas" style="height: 320px;"><canvas id="absorp-chart"></canvas></div>
    </div>

    <div class="matrix-table-wrap" style="border-top: 1px solid var(--border);">
      <table class="matrix-table">
        <thead>
          <tr>
            <th class="l">Unidad</th>
            <th>Total Expenses</th>
            <th>Gross Profit</th>
            <th>Absorption %<span class="sub">Expenses / GP</span></th>
            <th class="l">Lectura</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td class="unit">New</td>
          <td>
            <span class="val">$32.54M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$32.72M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin low">99.5%</span>
            <div class="matrix-bar"><span class="red" style="width:99.5%"></span></div>
          </td>
          <td><span class="absorp-label low" data-i18n="abs_lbl_consumed">Casi todo el margen se consume</span></td>
        </tr>

        <tr>
          <td class="unit">Pre-Owned</td>
          <td>
            <span class="val">$4.26M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$5.40M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin mid">79.0%</span>
            <div class="matrix-bar"><span class="" style="width:79.0%"></span></div>
          </td>
          <td><span class="absorp-label mid" data-i18n="abs_lbl_weak">Rentabilidad débil</span></td>
        </tr>

        <tr>
          <td class="unit">F&I</td>
          <td>
            <span class="val">$3.69M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$11.77M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin high">31.4%</span>
            <div class="matrix-bar"><span class="green" style="width:31.4%"></span></div>
          </td>
          <td><span class="absorp-label high" data-i18n="abs_lbl_high_eff">Alta eficiencia</span></td>
        </tr>

        <tr>
          <td class="unit">Parts</td>
          <td>
            <span class="val">$3.41M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$11.86M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin high">28.7%</span>
            <div class="matrix-bar"><span class="green" style="width:28.7%"></span></div>
          </td>
          <td><span class="absorp-label high" data-i18n="abs_lbl_vhigh_eff">Muy alta eficiencia</span></td>
        </tr>

        <tr>
          <td class="unit">Service Labor</td>
          <td>
            <span class="val">$10.25M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$13.31M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin mid">77.0%</span>
            <div class="matrix-bar"><span class="" style="width:77.0%"></span></div>
          </td>
          <td><span class="absorp-label mid" data-i18n="abs_lbl_high_consum">Alto consumo operativo</span></td>
        </tr>

        <tr>
          <td class="unit">Body & Paint</td>
          <td>
            <span class="val">$1.95M</span>
            <span class="pctmix">EXPENSES</span>
          </td>
          <td>
            <span class="val">$2.17M</span>
            <span class="pctmix">GROSS PROFIT</span>
          </td>
          <td>
            <span class="margin low">89.6%</span>
            <div class="matrix-bar"><span class="red" style="width:89.6%"></span></div>
          </td>
          <td><span class="absorp-label low" data-i18n="abs_lbl_pressed">Margen muy presionado</span></td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="truths" style="grid-template-columns: repeat(5, 1fr); gap: 12px;">
      <div class="truth">
        <div class="tnum">01</div>
        <div class="title" data-i18n="abs_t1_title">Parts · Más eficiente</div>
        <div class="desc" data-i18n="abs_t1_desc">Solo consume <b>28.7%</b> de su margen bruto en gastos. Convierte la mayoría de utilidad bruta en operativa.</div>
      </div>
      <div class="truth">
        <div class="tnum">02</div>
        <div class="title" data-i18n="abs_t2_title">F&amp;I · Extremadamente rentable</div>
        <div class="desc" data-i18n="abs_t2_desc">Absorción del <b>31.4%</b>. Estructura ligera, márgenes elevados; cada peso vendido convierte fuerte a utilidad.</div>
      </div>
      <div class="truth alt">
        <div class="tnum">03</div>
        <div class="title" data-i18n="abs_t3_title">New · Punto de equilibrio</div>
        <div class="desc" data-i18n="abs_t3_desc">Consume <b>99.5%</b> del margen bruto. El negocio que vende más, pero apenas conserva utilidad.</div>
      </div>
      <div class="truth">
        <div class="tnum">04</div>
        <div class="title" data-i18n="abs_t4_title">Body &amp; Paint · Muy presionado</div>
        <div class="desc" data-i18n="abs_t4_desc">Absorción del <b>89.6%</b>. Margen bruto sano se diluye casi por completo. Problema de escala o gastos.</div>
      </div>
      <div class="truth">
        <div class="tnum">05</div>
        <div class="title" data-i18n="abs_t5_title">Service · Estructura pesada</div>
        <div class="desc" data-i18n="abs_t5_desc">Pese a margen bruto del 82%, absorbe <b>77%</b> en gastos. Personal y estructura comen el margen.</div>
      </div>
    </div>
  </div>


  <!-- Spacer + Operating Profit Contribution -->
  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2>Operating Profit Contribution</h2>
    </div>

    <div class="op-grid">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Operating Profit Mix
        </h4>
        <div class="chart-canvas" style="height: 360px;"><canvas id="op-donut"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Ranking YTD by Operating Profit
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="c">Rank</th>
              <th class="l">Unidad</th>
              <th>Operating Profit</th>
              <th>% Mix</th>
            </tr>
          </thead>
          <tbody>
        <tr>
          <td class="c"><span class="rank-pos gold">1</span></td>
          <td class="l rank-name">Parts</td>
          <td>
            <span class="rank-op">$8.45M</span>
            <div class="rank-bar"><span style="width:40.4%"></span></div>
          </td>
          <td><span class="rank-mix">40.4%</span></td>
        </tr>

        <tr>
          <td class="c"><span class="rank-pos silver">2</span></td>
          <td class="l rank-name">F&I</td>
          <td>
            <span class="rank-op">$8.07M</span>
            <div class="rank-bar"><span style="width:38.5%"></span></div>
          </td>
          <td><span class="rank-mix">38.5%</span></td>
        </tr>

        <tr>
          <td class="c"><span class="rank-pos bronze">3</span></td>
          <td class="l rank-name">Service Labor</td>
          <td>
            <span class="rank-op">$3.06M</span>
            <div class="rank-bar"><span style="width:14.6%"></span></div>
          </td>
          <td><span class="rank-mix">14.6%</span></td>
        </tr>

        <tr>
          <td class="c"><span class="rank-pos ">4</span></td>
          <td class="l rank-name">Pre-Owned</td>
          <td>
            <span class="rank-op">$1.11M</span>
            <div class="rank-bar"><span style="width:5.3%"></span></div>
          </td>
          <td><span class="rank-mix">5.3%</span></td>
        </tr>

        <tr>
          <td class="c"><span class="rank-pos ">5</span></td>
          <td class="l rank-name">Body & Paint</td>
          <td>
            <span class="rank-op">$0.23M</span>
            <div class="rank-bar"><span style="width:1.1%"></span></div>
          </td>
          <td><span class="rank-mix">1.1%</span></td>
        </tr>

        <tr>
          <td class="c"><span class="rank-pos ">6</span></td>
          <td class="l rank-name">New</td>
          <td>
            <span class="rank-op">$0.02M</span>
            <div class="rank-bar"><span style="width:0.1%"></span></div>
          </td>
          <td><span class="rank-mix">0.1%</span></td>
        </tr>

          </tbody>
        </table>
      </div>
    </div>

    <div class="dimensions">
      <div class="dim"><div class="ico">01</div><div class="lab">Gross<br>Margin</div></div>
      <div class="dim"><div class="ico">02</div><div class="lab">Conversion to<br>Operating Profit</div></div>
      <div class="dim"><div class="ico">03</div><div class="lab">Business<br>Mix</div></div>
      <div class="dim"><div class="ico">04</div><div class="lab">Expense<br>Absorption</div></div>
      <div class="dim"><div class="ico">05</div><div class="lab">Profitability<br>per Unit</div></div>
    </div>

    <div class="truths" style="grid-template-columns: 1fr;">
      <div class="truth alt">
        <div class="tnum">⌂</div>
        <div class="title" data-i18n="opc_t1_title">La utilidad operativa NO está distribuida según las ventas</div>
        <div class="desc" data-i18n="opc_t1_desc">El <b>management no debe dirigir el negocio solo por volumen</b>, market share o unidades vendidas. Las unidades de postventa (Parts, F&amp;I, Service) generan <b>93.5% de la utilidad operativa total</b> con apenas <b>12.1% de las ventas combinadas</b>. Mientras que New Cars con 79.4% de las ventas aporta solo 0.1% al resultado operativo. La dirección debe gestionarse por las 5 dimensiones de arriba, no por volumen aislado.</div>
      </div>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
</div>

<!-- ============================================================ -->
<!-- TAB 3: BALANCE SHEET                                         -->
<!-- ============================================================ -->
<div id="tab3" class="tab-panel">
  <div style="padding: 24px 24px 8px;">
    <div style="font-size: 18px; font-weight: 800; color: var(--kia-black); letter-spacing: 0.12em; text-transform: uppercase;">Balance Sheet · Executive View</div>
    
  </div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">01</span>Financial Structure</h2>
    </div>

    <!-- KPI cards (composition of the right side of balance sheet) -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Assets</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$144.62M</div>
        <div class="kpi-delta">100% comparison base</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Total Liabilities</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$93.38M</div>
        <div class="kpi-delta">64.6% of total assets</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Stockholders' Equity</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$51.25M</div>
        <div class="kpi-delta">35.4% of total assets</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Liabilities / Equity</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">1.82x</div>
        <div class="kpi-delta">High leverage</div>
      </div>
    </div>

    <!-- Two-column: donut + indicators table -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Funding Composition
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="bs01-donut"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Structure Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">Indicator</th>
              <th class="l">What it measures</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Total Liabilities / Total Assets</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">How much the company relies on debt and obligations</td>
              <td><span class="rank-op" style="color: var(--kia-red);">64.6%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Equity / Total Assets</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">How much is funded with own equity</td>
              <td><span class="rank-op">35.4%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Liabilities / Equity</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Leverage ratio</td>
              <td><span class="rank-op" style="color: var(--kia-red);">1.82x</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Executive Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="bs01_head">Analisis</div>
      <span data-i18n="bs01_body">La empresa tiene una estructura <b>más cargada hacia pasivos que hacia capital</b> (64.6% vs 35.4%). El apalancamiento de <b>1.82x</b> indica que por cada peso de capital propio, hay $1.82 en pasivos. El foco debe estar en la <b>calidad de esos pasivos</b>: corto plazo, floor plan, proveedores, impuestos y cuentas por pagar.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">02</span>Liquidity &amp; Working Capital</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Current Assets</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$111.92M</div>
        <div class="kpi-delta">Cash · A/R · Inventory · Prepaid</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Current Liabilities</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$85.51M</div>
        <div class="kpi-delta">Short-term obligations</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Working Capital</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$26.41M</div>
        <div class="kpi-delta">CA − CL</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Current Ratio</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">1.31x</div>
        <div class="kpi-delta">Healthy &gt; 1.0</div>
      </div>
    </div>

    <!-- Chart + Indicators -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Current Assets vs Current Liabilities
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="bs02-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Liquidity Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">Indicator</th>
              <th class="l">What it measures</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Current Ratio</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Ability to cover short-term obligations</td>
              <td><span class="rank-op" style="color: #00875A;">1.31x</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Quick Ratio</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Liquidity excluding inventory</td>
              <td><span class="rank-op">0.93x</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Working Capital</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Net short-term financing capacity</td>
              <td><span class="rank-op" style="color: #00875A;">$26.41M</span></td>
            </tr>
            <tr>
              <td class="l rank-name">WC / Sales</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Operational cushion vs annual revenue</td>
              <td><span class="rank-op">4.85%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight (in Spanish) -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="bs02_head">Analisis</div>
      <span data-i18n="bs02_body">La empresa tiene <b>más activos circulantes que pasivos circulantes</b> ($111.92M vs $85.51M). El <b>Current Ratio de 1.31x</b> indica capacidad sana para cubrir obligaciones de corto plazo. Sin embargo, hay que tener cuidado: <b>no todo el activo circulante es efectivo</b> — una parte importante está en inventario y cuentas por cobrar. El <b>Quick Ratio de 0.93x</b> (debajo de 1.0) revela que sin el inventario, la liquidez inmediata es ajustada.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

    <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">03</span>Inventory</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Inventory</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$32.77M</div>
        <div class="kpi-delta">29.3% of Current Assets</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">New Cars share</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">64.7%</div>
        <div class="kpi-delta">$21.21M concentrated in new units</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Parts &amp; Acc. share</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">7.9%</div>
        <div class="kpi-delta">$2.58M for aftersales</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Inventory / CL</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">38.3%</div>
        <div class="kpi-delta">Backs 38% of short-term debt</div>
      </div>
    </div>

    <!-- Composition + Indicators -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Inventory Composition
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="bs04-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">KPI</th>
              <th class="l">What it measures</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Inventory / Current Assets</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Inventory weight in liquidity</td>
              <td><span class="rank-op">29.3%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">New Cars Inv. / Total Inv.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">New vehicle concentration</td>
              <td><span class="rank-op" style="color: var(--kia-red);">64.7%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Parts Inv. / Total Inv.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Aftersales weight</td>
              <td><span class="rank-op">7.9%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Inventory / Current Liabilities</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Short-term liability coverage by inventory</td>
              <td><span class="rank-op">38.3%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="bs04_head">Analisis</div>
      <span data-i18n="bs04_body">El inventario representa una parte importante del capital de trabajo ($32.77M, <b>29.3% del activo circulante</b>). La concentración es alta en autos nuevos (<b>64.7% del inventario total</b>). La pregunta no es solo cuánto inventario hay, sino: <b>¿está rotando suficientemente rápido para justificar el capital que consume?</b> Sin rotación adecuada, ese capital queda atrapado y presiona la liquidez.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">04</span>Accounts Receivable</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Receivables</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$42.73M</div>
        <div class="kpi-delta">Largest current asset · 38.2%</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Customer AR</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$22.40M</div>
        <div class="kpi-delta">52.4% — Core operational</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Other AR</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$18.51M</div>
        <div class="kpi-delta">43.3% — Non-operating risk</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">DSO (estim.)</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">28.6 days</div>
        <div class="kpi-delta">AR / Sales × 365</div>
      </div>
    </div>

    <!-- Composition + Indicators -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Receivables Composition
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="bs04ar-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">KPI</th>
              <th class="l">What it measures</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">AR / Current Assets</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Weight of receivables in current assets</td>
              <td><span class="rank-op" style="color: var(--kia-red);">38.2%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">AR / Sales</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Days or collection pressure (vs P&amp;L)</td>
              <td><span class="rank-op">7.8%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Customer AR / Total AR</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Customer concentration</td>
              <td><span class="rank-op">52.4%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Other AR / Total AR</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Risk of non-clearly operative accounts</td>
              <td><span class="rank-op" style="color: var(--kia-red);">43.3%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="bs04ar_head">Analisis</div>
      <span data-i18n="bs04ar_body">Cuentas por cobrar es el <b>activo circulante más grande</b> ($42.73M, 38.2% of total). Eso significa que la <b>liquidez de National KIA depende más de cobranza que de caja</b>. Para top management esta es una <b>alerta sana</b>: hay utilidad contable, pero parte del dinero puede estar <b>atrapado en cuentas por cobrar</b> — particularmente en el <b>43.3% de "Other AR"</b> que no es claramente operativo y representa riesgo no funcional.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">05</span>Short-term Liabilities</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Short-term Liab.</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$85.51M</div>
        <div class="kpi-delta">91.6% of total liabilities</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Floor Plan</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$35.08M</div>
        <div class="kpi-delta">41.0% — Inventory financing</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Taxes Payable</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$14.07M</div>
        <div class="kpi-delta">16.4% — Fiscal pressure</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Suppliers AP</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$8.42M</div>
        <div class="kpi-delta">9.8% — Operational creditors</div>
      </div>
    </div>

    <!-- Composition + Indicators -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Short-term Liabilities Composition
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="bs05-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">KPI</th>
              <th class="l">What it measures</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Floor Plan / Current Liab.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Dependence on inventory financing</td>
              <td><span class="rank-op" style="color: var(--kia-red);">41.0%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Suppliers AP / Current Liab.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Weight of suppliers</td>
              <td><span class="rank-op">9.8%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Taxes Payable / Current Liab.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Fiscal pressure</td>
              <td><span class="rank-op">16.4%</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Short-Term Liab. / Total Liab.</td>
              <td class="l" style="color: var(--kia-600); font-weight: 500;">Near-term maturity risk</td>
              <td><span class="rank-op" style="color: var(--kia-red);">91.6%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="bs05_head">Analisis</div>
      <span data-i18n="bs05_body">El pasivo está <b>muy cargado al corto plazo</b>: $85.51M de $93.38M total (<b>91.6%</b>). El componente más grande es el <b>Floor Plan</b> con $35.08M (41% del pasivo corto), seguido de <b>impuestos por pagar</b> ($14.07M, 16.4%). Esa estructura obliga a monitorear de cerca: <b>rotación de inventario, cobranza, flujo operativo, presión fiscal y costo financiero</b>. Cualquier disrupción en estos cinco frentes presiona directamente la solvencia de corto plazo.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
</div>


<!-- ============================================================ -->
<!-- TAB 4: S&GM — Sales & Gross Margin                          -->
<!-- ============================================================ -->
<div id="tab4" class="tab-panel">
  <div style="padding: 24px 24px 8px;">
    <div style="font-size: 18px; font-weight: 800; color: var(--kia-black); letter-spacing: 0.12em; text-transform: uppercase;">Sales &amp; Gross Margin · Combined View</div>
    
  </div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">01</span>New Vehicles</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$432.2M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +16.2% vs PY · was $372.0M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Units</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">1,039</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +76 units vs PY · was 963</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$28.2M</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -6.3% vs PY · was $30.1M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">6.5%</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -160bps vs PY · was 8.1%</div>
      </div>
    </div>

    <!-- Chart + Comparison Table -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm01-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">New Vehicles</th>
              <th>Prior YTD</th>
              <th>Current YTD</th>
              <th>Reading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Sales</td>
              <td><span class="rank-op">$372.0M</span></td>
              <td><span class="rank-op">$432.2M</span></td>
              <td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Units</td>
              <td><span class="rank-op">963</span></td>
              <td><span class="rank-op">1,039</span></td>
              <td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Gross Profit</td>
              <td><span class="rank-op">$30.1M</span></td>
              <td><span class="rank-op" style="color: var(--kia-red);">$28.2M</span></td>
              <td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Gross Margin</td>
              <td><span class="rank-op">8.1%</span></td>
              <td><span class="rank-op" style="color: var(--kia-red);">6.5%</span></td>
              <td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm01_head">Analisis</div>
      <span data-i18n="sgm01_body">New Vehicles <b>crece en ventas, pero pierde calidad de margen</b>. Ventas +16.2% y unidades +76 vs año pasado, pero la <b>utilidad bruta cayó 6.3%</b> y el <b>margen bruto se contrajo 160 puntos base (8.1% → 6.5%)</b>. Esto es una <b>alerta ejecutiva</b>: se vendió más, pero se ganó menos margen bruto. La pregunta clave para dirección es <b>por qué se está erosionando el margen</b> — mix de modelos, descuentos comerciales, costo de adquisición, o presión competitiva.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">02</span>Fleet / Other Sales</h2>
    </div>

    <!-- KPI cards -->
    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$58.9M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +80.7% vs PY · was $32.6M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Units</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">132</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +67 units vs PY · was 65</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$0.97M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +44.8% vs PY · was $0.67M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">1.65%</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -41bps vs PY · was 2.06%</div>
      </div>
    </div>

    <!-- Chart + Comparison Table -->
    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm02-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead>
            <tr>
              <th class="l">Fleet / Other Sales</th>
              <th>Prior YTD</th>
              <th>Current YTD</th>
              <th>Reading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="l rank-name">Sales</td>
              <td><span class="rank-op">$32.6M</span></td>
              <td><span class="rank-op">$58.9M</span></td>
              <td><span class="delta-arrow good"><span class="tri">▲</span> Up strong</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Units</td>
              <td><span class="rank-op">65</span></td>
              <td><span class="rank-op">132</span></td>
              <td><span class="delta-arrow good"><span class="tri">▲</span> Up strong</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Gross Profit</td>
              <td><span class="rank-op">$0.67M</span></td>
              <td><span class="rank-op">$0.97M</span></td>
              <td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td>
            </tr>
            <tr>
              <td class="l rank-name">Gross Margin</td>
              <td><span class="rank-op">2.06%</span></td>
              <td><span class="rank-op" style="color: var(--kia-red);">1.65%</span></td>
              <td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insight -->
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm02_head">Analisis</div>
      <span data-i18n="sgm02_body">Fleet <b>crece fuerte, pero diluye margen</b>. Ventas <b>+80.7% vs año pasado</b> y unidades <b>más que se duplicaron</b> (65 → 132). La utilidad bruta crece <b>+44.8%</b>, pero el margen sigue siendo <b>extremadamente bajo</b> (1.65%, contra 2.06% PY). La lectura es clara: <b>Fleet ayuda a volumen pero presiona la rentabilidad promedio</b>. Si se busca volumen, Fleet sirve; si se busca rentabilidad, Fleet diluye.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">03</span>Finance &amp; Insurance (F&amp;I)</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$12.6M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +16.7% vs PY · was $10.8M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$11.8M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +14.6% vs PY · was $10.3M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">93.5%</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -220bps vs PY · was 95.7%</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Penetration / Unit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$12.1K</div>
        <div class="kpi-delta">F&amp;I income per new unit sold</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm03-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">F&amp;I</th><th>Prior YTD</th><th>Current YTD</th><th>Reading</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Sales</td><td><span class="rank-op">$10.8M</span></td><td><span class="rank-op">$12.6M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Gross Profit</td><td><span class="rank-op">$10.3M</span></td><td><span class="rank-op">$11.8M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Gross Margin</td><td><span class="rank-op">95.7%</span></td><td><span class="rank-op" style="color: var(--kia-red);">93.5%</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm03_head">Analisis</div>
      <span data-i18n="sgm03_body">F&amp;I es una <b>máquina de margen bruto</b>: 93.5% de margen — casi todo lo que vende, lo gana. Ventas suben +16.7% y utilidad bruta +14.6% vs año pasado. La lectura es clara: <b>F&amp;I no es volumen, es rentabilidad pura</b>. Para entender su salud completa, hay que analizar: <b>(1) Financial income por autos nuevos</b>, <b>(2) Comisiones de seguros</b>, <b>(3) Financial income de seminuevos</b>, <b>(4) Otros ingresos</b>, y sobre todo <b>(5) Penetración por unidad vendida</b> — cuántos productos F&amp;I se colocan por cada auto entregado.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">04</span>Service Labor</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$16.2M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +8.0% vs PY · was $15.0M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Repair Orders (Units)</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">14,328</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +29.0% vs PY · was 11,109</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Sales per RO</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$1,131</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -16.2% vs PY · was $1,350</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">GP per RO</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$928</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -13.4% vs PY · was $1,071</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm04-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">Service</th><th>Prior YTD</th><th>Current YTD</th><th>Reading</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Sales</td><td><span class="rank-op">$15.0M</span></td><td><span class="rank-op">$16.2M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Units (ROs)</td><td><span class="rank-op">11,109</span></td><td><span class="rank-op">14,328</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up strong</span></td></tr>
            <tr><td class="l rank-name">Gross Profit</td><td><span class="rank-op">$11.9M</span></td><td><span class="rank-op">$13.3M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Sales per RO</td><td><span class="rank-op">$1,350</span></td><td><span class="rank-op" style="color: var(--kia-red);">$1,131</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
            <tr><td class="l rank-name">GP per RO</td><td><span class="rank-op">$1,071</span></td><td><span class="rank-op" style="color: var(--kia-red);">$928</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm04_head">Analisis</div>
      <span data-i18n="sgm04_body">Service <b>crece en actividad, pero hay que revisar el ticket promedio</b>. A primera vista se ve bien: ventas +8% y utilidad bruta +11.8%. Pero ojo: <b>las unidades suben mucho más que las ventas</b> (+29% vs +8%). Eso puede significar: <b>(1)</b> más órdenes de menor ticket, <b>(2)</b> mayor volumen operativo, <b>(3)</b> posible presión en productividad, o <b>(4)</b> mejor penetración pero menor ingreso promedio por orden. El <b>Sales per RO cayó de $1,350 a $1,131 (-16.2%)</b> y el <b>GP per RO de $1,071 a $928 (-13.4%)</b>. Crece la operación, pero cada orden vale menos.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">05</span>Spare Parts</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$36.3M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +10.0% vs PY · was $33.0M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$11.5M</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +12.7% vs PY · was $10.2M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">31.7%</div>
        <div class="kpi-delta" style="color: #00875A;">▲ +90bps vs PY · was 30.8%</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Quality Signal</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">Healthy</div>
        <div class="kpi-delta">Volume + margin grow together</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm05-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">Parts</th><th>Prior YTD</th><th>Current YTD</th><th>Reading</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Sales</td><td><span class="rank-op">$33.0M</span></td><td><span class="rank-op">$36.3M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Gross Profit</td><td><span class="rank-op">$10.2M</span></td><td><span class="rank-op" style="color: #00875A;">$11.5M</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
            <tr><td class="l rank-name">Gross Margin</td><td><span class="rank-op">30.8%</span></td><td><span class="rank-op" style="color: #00875A;">31.7%</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Up</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm05_head">Analisis</div>
      <span data-i18n="sgm05_body">Parts está <b>creciendo con buena calidad de margen</b>. Esto es positivo: ventas +10% y utilidad bruta +12.7% — la utilidad crece <b>más rápido que las ventas</b>, y el margen mejora 90 puntos base. Parts <b>crece y además mejora margen</b>. Esto confirma lo que vimos en P&amp;L: <b>Refacciones es uno de los motores reales de utilidad</b>. Para profundizar hay que leer: <b>(1)</b> Warranty claims, <b>(2)</b> Counter sales retail, <b>(3)</b> Parts para órdenes mecánicas, <b>(4)</b> Parts para body &amp; paint, <b>(5)</b> Accessories, y <b>(6)</b> Packages / wear parts.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">06</span>Body &amp; Paint</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Sales</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$4.4M</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -8.3% vs PY · was $4.8M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Units</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">453</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -12 units vs PY · was 465</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Profit</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$2.2M</div>
        <div class="kpi-delta" style="color: var(--kia-red);">▼ -8.3% vs PY · was $2.4M</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Gross Margin</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">50.0%</div>
        <div class="kpi-delta">Flat vs PY · margin preserved</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Prior YTD vs Current YTD
        </h4>
        <div class="chart-canvas" style="height: 320px;"><canvas id="sgm06-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Comparison Table
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">Body &amp; Paint</th><th>Prior YTD</th><th>Current YTD</th><th>Reading</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Sales</td><td><span class="rank-op">$4.8M</span></td><td><span class="rank-op" style="color: var(--kia-red);">$4.4M</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
            <tr><td class="l rank-name">Units</td><td><span class="rank-op">465</span></td><td><span class="rank-op" style="color: var(--kia-red);">453</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
            <tr><td class="l rank-name">Gross Profit</td><td><span class="rank-op">$2.4M</span></td><td><span class="rank-op" style="color: var(--kia-red);">$2.2M</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Down</span></td></tr>
            <tr><td class="l rank-name">Gross Margin</td><td><span class="rank-op">50.0%</span></td><td><span class="rank-op">50.0%</span></td><td><span class="delta-arrow flat"><span class="tri">→</span> Flat</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="sgm06_head">Analisis</div>
      <span data-i18n="sgm06_body">Body &amp; Paint <b>baja en volumen y margen absoluto</b>. Ventas -8.3%, unidades -12 vs año pasado y utilidad bruta -8.3%. Sin embargo, <b>mantiene el margen porcentual en 50%</b> — la operación sigue siendo eficiente cuando se ejecuta. La lectura: <b>Body &amp; Paint mantiene margen porcentual, pero pierde tamaño</b>. No parece un problema de margen, sino más bien un tema de: <b>(1)</b> menor volumen, <b>(2)</b> menor demanda, <b>(3)</b> menor captación, <b>(4)</b> menor actividad con aseguradoras, o <b>(5)</b> capacidad no aprovechada.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>

  <div class="section-divider">
    <div class="pretitle">Part 02 · Strategic Layer</div>
    <h2>Executive Dashboards</h2>
    <div class="subtitle">5 Cross-Unit Views · Deeper Analytics · Strategic Reading</div>
    <div class="badges">
      <button class="badge-dash" data-show="d1" type="button"><span class="num">01</span>Gross Margin Overview</button>
      <button class="badge-dash" data-show="d2" type="button"><span class="num">02</span>Volume vs Margin</button>
      <button class="badge-dash" data-show="d3" type="button"><span class="num">03</span>New Vehicles Mix</button>
      <button class="badge-dash" data-show="d4" type="button"><span class="num">04</span>F&amp;I Monetization</button>
      <button class="badge-dash" data-show="d5" type="button"><span class="num">05</span>Aftersales GP Engine</button>
    </div>
  </div>
<div class="dashboard-hint" id="dashboard-hint">Selecciona un dashboard para abrirlo · Click a badge above to open</div>

  <!-- ============== DASHBOARD 1 — Gross Margin Overview ============== -->
  <div class="dashboard-wrap" id="dash-d1"><div class="dashboard-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-black); color: var(--kia-red); width: 32px; height: 32px; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px; vertical-align: middle;" class="num">D1</span>Gross Margin Overview<span class="sub" data-i18n="d1_sub">¿Dónde se genera el margen bruto nacional?</span></h2>
    </div>
    <div class="dash-body">
      <div class="chart-canvas" style="height: 380px; margin-bottom: 20px;"><canvas id="d1-chart"></canvas></div>
      <table class="rank-table">
        <thead><tr><th class="l">Unit</th><th>Sales</th><th>Gross Profit</th><th>Gross Margin</th><th>GP Mix</th></tr></thead>
        <tbody>
          <tr><td class="l rank-name">New Vehicles</td><td><span class="rank-op">$432.2M</span></td><td><span class="rank-op">$28.2M</span></td><td><span class="rank-op" style="color: var(--kia-red);">6.5%</span></td><td><span class="rank-op">39.7%</span></td></tr>
          <tr><td class="l rank-name">Pre-Owned</td><td><span class="rank-op">$41.4M</span></td><td><span class="rank-op">$5.4M</span></td><td><span class="rank-op">13.0%</span></td><td><span class="rank-op">7.6%</span></td></tr>
          <tr><td class="l rank-name">F&amp;I</td><td><span class="rank-op">$12.6M</span></td><td><span class="rank-op" style="color: #00875A;">$11.8M</span></td><td><span class="rank-op" style="color: #00875A;">93.5%</span></td><td><span class="rank-op">16.6%</span></td></tr>
          <tr><td class="l rank-name">Service</td><td><span class="rank-op">$16.2M</span></td><td><span class="rank-op" style="color: #00875A;">$13.3M</span></td><td><span class="rank-op" style="color: #00875A;">82.3%</span></td><td><span class="rank-op">18.7%</span></td></tr>
          <tr><td class="l rank-name">Parts</td><td><span class="rank-op">$36.3M</span></td><td><span class="rank-op">$11.5M</span></td><td><span class="rank-op">31.7%</span></td><td><span class="rank-op">16.2%</span></td></tr>
          <tr><td class="l rank-name">Body &amp; Paint</td><td><span class="rank-op">$4.4M</span></td><td><span class="rank-op">$2.2M</span></td><td><span class="rank-op">50.0%</span></td><td><span class="rank-op">3.1%</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="d1_head">Analisis</div>
      <span data-i18n="d1_body">El margen bruto nacional <b>no se concentra donde están las ventas</b>. New Vehicles genera el <b>76% de las ventas pero solo el 40% del margen bruto</b>. F&amp;I, Service, Parts y Body &amp; Paint juntos <b>suman 54.6% de la utilidad bruta</b> con apenas 16% de las ventas. La calidad del margen vive en postventa y F&amp;I.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div></div>

  <!-- ============== DASHBOARD 2 — Volume vs Margin ============== -->
  <div class="dashboard-wrap" id="dash-d2"><div class="dashboard-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-black); color: var(--kia-red); width: 32px; height: 32px; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px; vertical-align: middle;" class="num">D2</span>Volume vs Margin<span class="sub" data-i18n="d2_sub">¿Estamos creciendo con margen o solo con volumen?</span></h2>
    </div>
    <div class="dash-body">
      <div class="chart-canvas" style="height: 400px; margin-bottom: 20px;"><canvas id="d2-chart"></canvas></div>
      <table class="rank-table">
        <thead><tr><th class="l">Unit</th><th>Sales Growth</th><th>Units Growth</th><th>GP Growth</th><th>GM Change</th></tr></thead>
        <tbody>
          <tr style="background: #FEEBEC;">
            <td class="l rank-name" style="color: var(--kia-red);">New Vehicles ⚠</td>
            <td><span class="rank-op" style="color: #00875A;">+16.2%</span></td>
            <td><span class="rank-op" style="color: #00875A;">+7.9%</span></td>
            <td><span class="rank-op" style="color: var(--kia-red);">-6.3%</span></td>
            <td><span class="rank-op" style="color: var(--kia-red);">-160 bps</span></td>
          </tr>
          <tr><td class="l rank-name">Pre-Owned</td><td><span class="rank-op" style="color: var(--kia-red);">-9.0%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-5.1%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-9.5%</span></td><td><span class="rank-op">-7 bps</span></td></tr>
          <tr><td class="l rank-name">F&amp;I</td><td><span class="rank-op" style="color: #00875A;">+16.7%</span></td><td><span class="rank-op">—</span></td><td><span class="rank-op" style="color: #00875A;">+14.6%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-220 bps</span></td></tr>
          <tr><td class="l rank-name">Service</td><td><span class="rank-op" style="color: #00875A;">+8.0%</span></td><td><span class="rank-op" style="color: #00875A;">+29.0%</span></td><td><span class="rank-op" style="color: #00875A;">+11.8%</span></td><td><span class="rank-op" style="color: #00875A;">+248 bps</span></td></tr>
          <tr><td class="l rank-name">Parts</td><td><span class="rank-op" style="color: #00875A;">+10.0%</span></td><td><span class="rank-op">—</span></td><td><span class="rank-op" style="color: #00875A;">+12.7%</span></td><td><span class="rank-op" style="color: #00875A;">+90 bps</span></td></tr>
          <tr><td class="l rank-name">Body &amp; Paint</td><td><span class="rank-op" style="color: var(--kia-red);">-8.3%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-2.6%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-8.3%</span></td><td><span class="rank-op">0 bps</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px; border-left-color: var(--kia-red);">
      <div class="head" data-i18n="d2_head">⚠ Alerta Principal</div>
      <span data-i18n="d2_body"><b>New Vehicles crece en ventas y unidades, pero CAE en margen bruto</b>. Volumen +16.2%, unidades +7.9%, pero la utilidad bruta retrocede -6.3% y el margen pierde 160 puntos base. Vender más y ganar menos es la señal clásica de erosión de mix o descuentos. <b>Parts y Service son los únicos que crecen con margen ganando puntos base</b>. F&amp;I crece fuerte pero su margen baja 220 bps — vigilar.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div></div>

  <!-- ============== DASHBOARD 3 — New Vehicles Mix ============== -->
  <div class="dashboard-wrap" id="dash-d3"><div class="dashboard-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-black); color: var(--kia-red); width: 32px; height: 32px; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px; vertical-align: middle;" class="num">D3</span>New Vehicles Mix<span class="sub" data-i18n="d3_sub">¿Qué modelos explican la venta y el margen?</span></h2>
    </div>
    <div class="dash-body">
      <div class="op-grid" style="background: var(--border); gap: 1px; margin-bottom: 20px;">
        <div style="background: var(--surface); padding: 18px;">
          <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">Top Models by Units</h4>
          <div class="chart-canvas" style="height: 280px;"><canvas id="d3-units"></canvas></div>
        </div>
        <div style="background: var(--surface); padding: 18px;">
          <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">Top Models by Gross Profit</h4>
          <div class="chart-canvas" style="height: 280px;"><canvas id="d3-gp"></canvas></div>
        </div>
      </div>

      <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">Gross Profit per Unit by Model</h4>
      <div class="chart-canvas" style="height: 280px; margin-bottom: 20px;"><canvas id="d3-gpu"></canvas></div>

      <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">Retail vs Fleet</h4>
      <table class="rank-table">
        <thead><tr><th class="l">Channel</th><th>Units</th><th>Sales</th><th>Gross Profit</th><th>GP per Unit</th><th>Margin</th></tr></thead>
        <tbody>
          <tr><td class="l rank-name">Retail</td><td><span class="rank-op">907</span></td><td><span class="rank-op">$373.3M</span></td><td><span class="rank-op">$27.2M</span></td><td><span class="rank-op">$30,011</span></td><td><span class="rank-op">7.3%</span></td></tr>
          <tr><td class="l rank-name">Fleet / Other</td><td><span class="rank-op">132</span></td><td><span class="rank-op">$58.9M</span></td><td><span class="rank-op">$0.97M</span></td><td><span class="rank-op" style="color: var(--kia-red);">$7,348</span></td><td><span class="rank-op" style="color: var(--kia-red);">1.65%</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="d3_head">Analisis</div>
      <span data-i18n="d3_body"><b>Modelos que venden mucho NO son los mismos que dejan más dinero</b>. K3 es líder absoluto en volumen (348 u) y GP ($6.8M), pero su GP por unidad ($19,656) es de los más bajos. <b>Sorento ($77K), Niro ($87K), Sportage ($48K) y K4 ($45K)</b> dejan mucho más dinero por unidad aunque vendan menos. Retail genera GP por unidad de $30K vs Fleet $7.3K — el canal Retail es <b>4x más rentable por auto</b>.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div></div>

  <!-- ============== DASHBOARD 4 — F&I Monetization ============== -->
  <div class="dashboard-wrap" id="dash-d4"><div class="dashboard-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-black); color: var(--kia-red); width: 32px; height: 32px; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px; vertical-align: middle;" class="num">D4</span>F&amp;I Monetization<span class="sub" data-i18n="d4_sub">¿Cuánto margen adicional generamos por cada vehículo vendido?</span></h2>
    </div>
    <div class="dash-body">
      <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); margin-bottom: 20px;">
        <div class="kpi-card">
          <div class="kpi-label">F&amp;I Gross Profit</div>
          <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$11.77M</div>
          <div class="kpi-delta">15.2% of company gross profit</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">F&amp;I Gross Margin</div>
          <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">93.5%</div>
          <div class="kpi-delta">Highest in dealership</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">F&amp;I per Vehicle Sold</div>
          <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$11,329</div>
          <div class="kpi-delta">GP / new vehicles sold</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Kia Finance Penetration</div>
          <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">12.3%</div>
          <div class="kpi-delta">128 of 1,039 new units</div>
        </div>
      </div>

      <div class="op-grid" style="background: var(--border); gap: 1px;">
        <div style="background: var(--surface); padding: 18px;">
          <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">Finance Income vs Insurance Commission</h4>
          <div class="chart-canvas" style="height: 280px;"><canvas id="d4-mix"></canvas></div>
        </div>
        <div style="background: var(--surface); padding: 18px;">
          <h4 style="margin:0 0 10px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">F&amp;I Income Breakdown (YTD)</h4>
          <table class="rank-table">
            <thead><tr><th class="l">Source</th><th>Amount</th><th>% of F&amp;I GP</th></tr></thead>
            <tbody>
              <tr><td class="l rank-name">Financial Income - New</td><td><span class="rank-op">$5.02M</span></td><td><span class="rank-op">42.6%</span></td></tr>
              <tr><td class="l rank-name">Insurance Fees - New</td><td><span class="rank-op">$4.12M</span></td><td><span class="rank-op">34.9%</span></td></tr>
              <tr><td class="l rank-name">Financial Income - Pre-Owned</td><td><span class="rank-op">$58.6K</span></td><td><span class="rank-op">0.5%</span></td></tr>
              <tr><td class="l rank-name">Insurance Fees - Pre-Owned</td><td><span class="rank-op">$258.7K</span></td><td><span class="rank-op">2.2%</span></td></tr>
              <tr><td class="l rank-name">Other Income</td><td><span class="rank-op">$2.14M</span></td><td><span class="rank-op">18.1%</span></td></tr>
              <tr><td class="l rank-name">Admin Office Income</td><td><span class="rank-op">$189K</span></td><td><span class="rank-op">1.6%</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="d4_head">Analisis</div>
      <span data-i18n="d4_body">F&amp;I es <b>margen incremental de altísima calidad</b>: cada unidad nueva vendida deja $11,329 adicionales de utilidad bruta por la venta del financiamiento y seguro. Con 93.5% de margen, prácticamente todo lo que vende, lo gana. <b>La penetración de Kia Finance del 12.3% es la palanca clave</b>: cada punto adicional de penetración mueve el aguja en utilidad. Finance Income + Insurance Fees representan <b>77% del GP de F&amp;I</b> — son los dos motores que hay que crecer.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div></div>

  <!-- ============== DASHBOARD 5 — Aftersales GP Engine ============== -->
  <div class="dashboard-wrap" id="dash-d5"><div class="dashboard-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-black); color: var(--kia-red); width: 32px; height: 32px; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px; vertical-align: middle;" class="num">D5</span>Aftersales Gross Profit Engine<span class="sub" data-i18n="d5_sub">¿Postventa está creciendo con calidad?</span></h2>
    </div>
    <div class="dash-body">
      <div class="chart-canvas" style="height: 380px; margin-bottom: 20px;"><canvas id="d5-chart"></canvas></div>
      <table class="rank-table">
        <thead><tr><th class="l">Aftersales Line</th><th>Sales</th><th>Gross Profit</th><th>Gross Margin</th><th>GP Growth</th><th>Quality Signal</th></tr></thead>
        <tbody>
          <tr><td class="l rank-name">Service</td><td><span class="rank-op">$16.2M</span></td><td><span class="rank-op">$13.3M</span></td><td><span class="rank-op" style="color: #00875A;">82.3%</span></td><td><span class="rank-op" style="color: #00875A;">+11.8%</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Healthy</span></td></tr>
          <tr><td class="l rank-name">Parts</td><td><span class="rank-op">$36.3M</span></td><td><span class="rank-op">$11.5M</span></td><td><span class="rank-op" style="color: #00875A;">31.7%</span></td><td><span class="rank-op" style="color: #00875A;">+12.7%</span></td><td><span class="delta-arrow good"><span class="tri">▲</span> Healthy</span></td></tr>
          <tr><td class="l rank-name">Body &amp; Paint</td><td><span class="rank-op" style="color: var(--kia-red);">$4.4M</span></td><td><span class="rank-op" style="color: var(--kia-red);">$2.2M</span></td><td><span class="rank-op">50.0%</span></td><td><span class="rank-op" style="color: var(--kia-red);">-8.3%</span></td><td><span class="delta-arrow bad"><span class="tri">▼</span> Scale issue</span></td></tr>
          <tr style="background: var(--kia-black); color: var(--kia-white);">
            <td class="l rank-name" style="color: var(--kia-white);">TOTAL AFTERSALES</td>
            <td><span class="rank-op" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">$56.9M</span></td>
            <td><span class="rank-op" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">$27.0M</span></td>
            <td><span class="rank-op" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">47.4%</span></td>
            <td><span class="rank-op" style="color: var(--kia-white); -webkit-text-stroke-color: var(--kia-white);">+9.6%</span></td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="d5_head">Analisis</div>
      <span data-i18n="d5_body">Postventa <b>sí está creciendo con calidad</b>. Service +11.8% en utilidad bruta con margen del 82.3%, Parts +12.7% con margen mejorando a 31.7%. Estos dos sostienen <b>$24.8M de utilidad bruta de altísima calidad</b>. <b>Body &amp; Paint requiere revisar escala</b>: el margen porcentual (50%) se mantiene, pero el negocio se está contrayendo en volumen y absoluto. No es problema de eficiencia, es problema de demanda y captación con aseguradoras.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div></div>
</div>


<!-- ============================================================ -->
<!-- TAB 5: ADD — Additional Operational & Financial Data        -->
<!-- ============================================================ -->
<div id="tab5" class="tab-panel">
  <div style="padding: 24px 24px 8px;">
    <div style="font-size: 18px; font-weight: 800; color: var(--kia-black); letter-spacing: 0.12em; text-transform: uppercase;">ADD · Additional Data</div>
    
  </div><div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">01</span>Accounts Receivable Aging</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total AR</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$43.49M</div>
        <div class="kpi-delta">Total accounts receivable</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AR &gt; 90 days</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;">$3.91M</div>
        <div class="kpi-delta">9.0% — Risky receivables</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">AR &gt; 120 days</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$3.26M</div>
        <div class="kpi-delta">7.5% — Critical receivables</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">% Overdue (&gt; 30 days)</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">13.7%</div>
        <div class="kpi-delta">Collection quality</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Aging Distribution
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add01-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td class="l rank-name">Total AR</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Total accounts receivable</td><td><span class="rank-op">$43.49M</span></td></tr>
            <tr><td class="l rank-name">AR &gt; 90 days</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Risky receivables</td><td><span class="rank-op" style="color: #B7791F;">$3.91M (9.0%)</span></td></tr>
            <tr><td class="l rank-name">AR &gt; 120 days</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Critical receivables</td><td><span class="rank-op" style="color: var(--kia-red);">$3.26M (7.5%)</span></td></tr>
            <tr><td class="l rank-name">% Overdue</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Collection quality</td><td><span class="rank-op" style="color: var(--kia-red);">13.7%</span></td></tr>
            <tr><td class="l rank-name">Customer AR</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Customer exposure</td><td><span class="rank-op">$22.01M (50.6%)</span></td></tr>
            <tr><td class="l rank-name">Other AR</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Accounts requiring explanation</td><td><span class="rank-op" style="color: var(--kia-red);">$19.65M (45.2%)</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add01_head">Analisis</div>
      <span data-i18n="add01_body">No basta con saber cuánto se debe: hay que saber <b>qué parte de la cobranza está envejecida</b> y qué tanto riesgo representa. La cartera total es de $43.49M, pero el <b>13.7% está vencido</b> (más de 30 días) y <b>$3.26M (7.5%) tiene más de 120 días</b> — cartera crítica. Si la cartera está concentrada en cuentas viejas, la empresa puede verse <b>rentable en papel, pero con presión real de efectivo</b>. La exposición de $19.65M en "Other AR" requiere explicación clara.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>


  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">02</span>Financial Products vs Financial Expenses</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Financial Products YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$1.33M</div>
        <div class="kpi-delta">Financial income</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Financial Expenses YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$9.90M</div>
        <div class="kpi-delta">Financial cost</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Net Financial Result</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">-$8.57M</div>
        <div class="kpi-delta">Destroys profit</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Floor Plan Interest</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$6.71M</div>
        <div class="kpi-delta">67.8% of financial expenses</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Products vs Expenses (YTD)
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add02-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead>
            <tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr>
          </thead>
          <tbody>
            <tr><td class="l rank-name">Financial Products YTD</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Financial income</td><td><span class="rank-op" style="color: #00875A;">$1.33M</span></td></tr>
            <tr><td class="l rank-name">Financial Expenses YTD</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Financial cost</td><td><span class="rank-op" style="color: var(--kia-red);">$9.90M</span></td></tr>
            <tr><td class="l rank-name">Net Financial Result</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Net financial impact</td><td><span class="rank-op" style="color: var(--kia-red);">-$8.57M</span></td></tr>
            <tr><td class="l rank-name">Floor Plan Interest</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Inventory financing cost</td><td><span class="rank-op" style="color: var(--kia-red);">$6.71M</span></td></tr>
            <tr><td class="l rank-name">Financial Expenses / Gross Profit</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Financial pressure on margin</td><td><span class="rank-op" style="color: var(--kia-red);">12.8%</span></td></tr>
            <tr><td class="l rank-name">Financial Expenses / EBIT</td><td class="l" style="color: var(--kia-600); font-weight: 500;">EBIT consumed</td><td><span class="rank-op" style="color: var(--kia-red);">43.2%</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add02_head">Analisis</div>
      <span data-i18n="add02_body">Los <b>gastos financieros YTD ($9.90M) son 7.4x mayores que los productos financieros ($1.33M)</b>, generando un resultado financiero neto de <b>-$8.57M</b>. La pregunta fuerte: <b>la operación genera utilidad, pero el costo financiero la está reduciendo</b>. Los gastos financieros consumen el <b>12.8% del margen bruto</b> y el <b>43.2% del EBIT</b>. El <b>Floor Plan ($6.71M, 67.8%)</b> es el componente dominante — financiar inventario tiene un costo enorme que afecta directamente la utilidad final.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>


  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">03</span>Other Products & Other Expenses</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Other Products YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$2.95M</div>
        <div class="kpi-delta">Non-operating income</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Other Expenses YTD</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">$0.88M</div>
        <div class="kpi-delta">Non-operating expenses</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Net Other Result</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">+$2.07M</div>
        <div class="kpi-delta">Positive net impact</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Quality Signal</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;">Mixed</div>
        <div class="kpi-delta">Recurring vs non-recurring</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Other Products vs Expenses Breakdown
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add03-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Other Products YTD</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Non-operating income</td><td><span class="rank-op" style="color: #00875A;">$2.95M</span></td></tr>
            <tr><td class="l rank-name">Other Expenses YTD</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Non-operating expenses</td><td><span class="rank-op" style="color: var(--kia-red);">$0.88M</span></td></tr>
            <tr><td class="l rank-name">Net Other Result</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Net impact</td><td><span class="rank-op" style="color: #00875A;">+$2.07M</span></td></tr>
            <tr><td class="l rank-name">Diverse Income</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Largest category</td><td><span class="rank-op">$1.46M (49.4%)</span></td></tr>
            <tr><td class="l rank-name">Recurring vs Non-recurring</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Result quality</td><td><span class="rank-op" style="color: #B7791F;">Mixed</span></td></tr>
            <tr><td class="l rank-name">Net Other / EBIT</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Extraordinary dependency</td><td><span class="rank-op">9.0%</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add03_head">Analisis</div>
      <span data-i18n="add03_body">La pregunta clave: <b>¿la utilidad depende de operación real o de ingresos extraordinarios?</b> El neto de "Other" suma <b>+$2.07M (9% del EBIT)</b>, con <b>$1.46M en "Diverse"</b> como la categoría dominante — un componente que merece desglose para entender si es recurrente. Para Corea esto importa mucho: top management no solo quiere saber si se ganó dinero, sino si el <b>resultado es repetible</b>. Si el +$2.07M es no-recurrente, la utilidad operativa "limpia" sería menor de lo reportado.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">04</span>Employees / Headcount</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Employees</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">56</div>
        <div class="kpi-delta">Structure size</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Sales per Employee</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">$9.73M</div>
        <div class="kpi-delta">Commercial productivity</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">GP per Employee</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">$1.38M</div>
        <div class="kpi-delta">Economic productivity</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ROs per Technician</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">2,047</div>
        <div class="kpi-delta">Technical productivity</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Headcount Distribution by Role
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add04-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Productivity Indicators
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Total Employees</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Structure size</td><td><span class="rank-op">56</span></td></tr>
            <tr><td class="l rank-name">Sales per Employee</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Commercial productivity</td><td><span class="rank-op" style="color: #00875A;">$9.73M</span></td></tr>
            <tr><td class="l rank-name">GP per Employee</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Economic productivity</td><td><span class="rank-op">$1.38M</span></td></tr>
            <tr><td class="l rank-name">ROs per Technician</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Technical productivity</td><td><span class="rank-op">2,047</span></td></tr>
            <tr><td class="l rank-name">Hours Sold per Technician</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Operational efficiency</td><td><span class="rank-op">3,620</span></td></tr>
            <tr><td class="l rank-name">Admin / Operating Ratio</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Administrative weight</td><td><span class="rank-op" style="color: #B7791F;">33%</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add04_head">Analisis</div>
      <span data-i18n="add04_body">Este bloque permite responder: <b>¿la estructura de personal está alineada con el volumen y la rentabilidad?</b> No se trata de decir "hay mucha gente" o "hay poca gente". Se trata de ver si <b>el personal produce suficiente venta, margen y actividad</b>. Cada empleado genera $9.73M en ventas y $1.38M en utilidad bruta. La estructura administrativa representa <b>33% del headcount total</b> — un ratio a vigilar para asegurar que el peso back-office no consume la productividad del front-office.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">05</span>Repair Orders</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Total Repair Orders</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">14,781</div>
        <div class="kpi-delta">Operational volume</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Customer ROs</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">11,722</div>
        <div class="kpi-delta">79% — Real demand</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Warranty ROs</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #B7791F;">891</div>
        <div class="kpi-delta">6% — Warranty weight</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Pending Orders</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: var(--kia-red);">110</div>
        <div class="kpi-delta">Backlog risk</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Repair Orders by Type
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add05-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Key Indicators
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Total Repair Orders</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Operational volume</td><td><span class="rank-op">14,781</span></td></tr>
            <tr><td class="l rank-name">Customer Repair Orders</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Real customer demand</td><td><span class="rank-op" style="color: #00875A;">11,722 (79%)</span></td></tr>
            <tr><td class="l rank-name">Warranty Repair Orders</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Warranty weight</td><td><span class="rank-op" style="color: #B7791F;">891 (6%)</span></td></tr>
            <tr><td class="l rank-name">Internal Repair Orders</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Internal consumption</td><td><span class="rank-op">770 (5%)</span></td></tr>
            <tr><td class="l rank-name">Pending Orders</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Backlog risk</td><td><span class="rank-op" style="color: var(--kia-red);">110</span></td></tr>
            <tr><td class="l rank-name">RO Mix Quality</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Work composition</td><td><span class="rank-op" style="color: #00875A;">Healthy</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add05_head">Analisis</div>
      <span data-i18n="add05_body">La pregunta clave: <b>¿postventa está creciendo por demanda rentable o por trabajo interno/garantías?</b> No todas las órdenes tienen la misma calidad económica. Una orden de cliente normalmente vale más estratégicamente que una orden interna o de garantía. El mix actual es <b>sano</b>: <b>79% son órdenes de clientes</b> (11,722), solo <b>6% son garantías</b> (891) y <b>5% son internas</b> (770). El crecimiento de postventa está sustentado por <b>demanda real</b>, no por trabajo improductivo o cobertura de fallas.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
  <div class="matrix-divider"></div>

  <div class="matrix-section">
    <div class="matrix-header">
      <h2><span style="display:inline-block; background: var(--kia-red); color: var(--kia-white); width: 30px; height: 30px; text-align: center; line-height: 30px; margin-right: 12px; font-size: 14px; vertical-align: middle;">06</span>Inventory, Hours &amp; Capacity</h2>
    </div>

    <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--border);">
      <div class="kpi-card">
        <div class="kpi-label">Hours Sold / Worked</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">96.1%</div>
        <div class="kpi-delta">Utilization</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Customer / Total Sold</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif; color: #00875A;">94.4%</div>
        <div class="kpi-delta">Sold hours quality</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Hours Sold / Bay</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">2,684</div>
        <div class="kpi-delta">Productivity per bay</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ROs / Operating Day</div>
        <div class="kpi-value" style="font-size:18px; font-weight:900; -webkit-text-stroke: 0.3px currentColor; font-stretch: 110%; font-family: 'Arial Black', Arial, sans-serif;">122</div>
        <div class="kpi-delta">Daily operational flow · 121 days</div>
      </div>
    </div>

    <div class="op-grid" style="border-top: 1px solid var(--border);">
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Hours Sold Composition (YTD)
        </h4>
        <div class="chart-canvas" style="height: 340px;"><canvas id="add06-chart"></canvas></div>
      </div>
      <div>
        <h4 style="margin:0 0 14px; font-size:10px; font-weight:800; color:var(--kia-600); letter-spacing:0.16em; text-transform:uppercase; padding-bottom:6px; border-bottom:1px solid var(--border);">
          Capacity &amp; Inventory Indicators
        </h4>
        <table class="rank-table">
          <thead><tr><th class="l">KPI</th><th class="l">What it measures</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td class="l rank-name">Hours Sold / Hours Worked</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Utilization</td><td><span class="rank-op" style="color: #00875A;">96.1%</span></td></tr>
            <tr><td class="l rank-name">Customer Hours / Total Sold</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Sold hours quality</td><td><span class="rank-op" style="color: #00875A;">94.4%</span></td></tr>
            <tr><td class="l rank-name">Hours Sold per Bay</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Capacity productivity</td><td><span class="rank-op">2,684</span></td></tr>
            <tr><td class="l rank-name">Hours Sold per Elevator</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Infrastructure use</td><td><span class="rank-op">5,368</span></td></tr>
            <tr><td class="l rank-name">Repair Orders per Operating Day</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Daily operational flow</td><td><span class="rank-op">122</span></td></tr>
            <tr><td class="l rank-name">Pending Orders / Total ROs</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Operational pressure</td><td><span class="rank-op">0.7%</span></td></tr>
            <tr><td class="l rank-name">New Vehicle Inventory</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Tied-up capital</td><td><span class="rank-op">165 units</span></td></tr>
            <tr><td class="l rank-name">Pre-Owned Inventory</td><td class="l" style="color: var(--kia-600); font-weight: 500;">Tied-up capital</td><td><span class="rank-op">20 units</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="insight-card" style="margin: 18px 24px 24px;">
      <div class="head" data-i18n="add06_head">Analisis</div>
      <span data-i18n="add06_body">Este bloque responde: <b>¿estamos usando bien la capacidad instalada o tenemos productividad atrapada?</b> Con <b>96.1% de utilización</b> (horas vendidas sobre horas trabajadas) y <b>94.4% de horas en clientes</b>, la capacidad está siendo bien aprovechada. Los <b>10 bays y 5 elevadores</b> producen 2,684 y 5,368 horas vendidas respectivamente. El flujo de <b>122 ROs por día operativo</b> es saludable. Para top management esto traduce postventa en <b>eficiencia operativa real</b>.</span>
    </div>
  </div>

  <div class="analisis-cta"><button class="translate-btn" type="button" >Traducir Analisis</button><button class="deep-btn" type="button">Analisis</button></div>
</div>





















<div class="global-footer">
  <div class="powered">Powered by <b>AXON B2B</b></div>
</div>

`;
