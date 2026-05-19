import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard.jsx';
import Report from './components/Report.jsx';

export default function App() {
  const initial = typeof window !== 'undefined' && window.location.search.includes('view=report')
    ? 'report'
    : 'dashboard';
  const [view, setView] = useState(initial);

  // Expose a global so a hand-attached DOM button (inside dashboardHtml.js)
  // can open the report from outside the React tree.
  useEffect(() => {
    window.openReport = () => setView('report');
    return () => { delete window.openReport; };
  }, []);

  return (
    <>
      <Dashboard onOpenReport={() => setView('report')} />
      {view === 'report' && <Report onClose={() => setView('dashboard')} />}
    </>
  );
}
