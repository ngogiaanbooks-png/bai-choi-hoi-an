import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LangCtx = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'vi' || saved === 'en') return saved;
  } catch { /* storage blocked */ }
  // Tiếng Việt là mặc định; chỉ chuyển sang tiếng Anh khi trình duyệt không hỏi tiếng Việt và có hỏi tiếng Anh
  const langs = navigator.languages || [navigator.language || 'vi'];
  return !langs.some((l) => /^vi/i.test(l)) && langs.some((l) => /^en/i.test(l)) ? 'en' : 'vi';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch { /* storage blocked */ }
  }, [lang]);
  // L({vi, en}) -> chuỗi theo ngôn ngữ đang chọn; thiếu bản tiếng Anh thì dùng bản tiếng Việt
  const L = useCallback((o) => (o && typeof o === 'object' && !Array.isArray(o) ? o[lang] ?? o.vi : o), [lang]);
  const value = useMemo(() => ({ lang, setLang, L }), [lang, L]);
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
