# National KIA · Financial Dashboard

Executive financial dashboard — 5 tabs (Drivers, P&L Drill-Down, Balance Sheet, S&GM, ADD).

## Stack
- Vite + React 18
- Chart.js v4

## Quick start
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Structure
```
src/
├── main.jsx           Entry
├── App.jsx            Root
├── components/Dashboard.jsx  Mounts the entire dashboard
├── tabs/              Stubs ready for refactor
├── context/I18nContext.jsx   ES/EN toggle (Context API)
├── data/
│   ├── dashboardHtml.js     Static markup (string)
│   ├── dashboardScripts.js  Chart.js builds + bootstrap
│   ├── financials.js        Typed source data
│   └── i18n.js              Translation stub
└── styles/styles.css        Full KIA/Bloomberg styling
```

## Refactor path
1. Extract brand bar, ticker tape, tab bar into proper components.
2. Move each tab's markup from `dashboardHtml.js` into its own component.
3. Replace `new Chart(...)` imperative builds with `react-chartjs-2`.
4. Move the I18N dict into `data/i18n.js` and wire via Context.
5. Pull numeric KPIs from `financials.js` instead of hardcoded strings.
