import React, { useEffect } from 'react';
import { DASHBOARD_HTML } from '../data/dashboardHtml.js';
import { bootstrapDashboard } from '../data/dashboardScripts.js';

export default function Dashboard({ onOpenReport }) {
  useEffect(() => {
    const t = setTimeout(() => bootstrapDashboard(), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        className="dashboard-root"
        dangerouslySetInnerHTML={{ __html: DASHBOARD_HTML }}
      />
      <button
        type="button"
        className="generate-report-fab"
        onClick={onOpenReport}
        aria-label="Generar reporte ejecutivo PDF"
      >
        <span className="fab-icon" aria-hidden="true">▦</span>
        <span className="fab-label">
          <span className="fab-label-main">Generar Reporte</span>
          <span className="fab-label-sub">Dealer Network · 30 slides</span>
        </span>
      </button>
    </>
  );
}
