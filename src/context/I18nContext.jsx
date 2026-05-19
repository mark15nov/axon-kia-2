import React, { createContext, useContext, useState } from 'react';
const I18nContext = createContext(null);
export function I18nProvider({ children, initialLang = 'es' }) {
  const [lang, setLang] = useState(initialLang);
  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'));
  return <I18nContext.Provider value={{ lang, setLang, toggle }}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
