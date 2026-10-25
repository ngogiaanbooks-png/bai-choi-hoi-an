import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV, S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import SearchBox from './SearchBox.jsx';

function LangToggle({ className = '' }) {
  const { lang, setLang, L } = useLang();
  return (
    <button type="button" className={`lang ${className}`} onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')} aria-label={L(S.langSwitch)}>
      <span className={lang === 'vi' ? 'on' : ''}>VI</span>
      <span className={lang === 'en' ? 'on' : ''}>EN</span>
    </button>
  );
}

// Băng vàng 8px + thanh điều hướng như thiết kế. Header dính: ẩn khi cuộn xuống, hiện lại khi cuộn lên.
export default function SiteHeader() {
  const { L } = useLang();
  const loc = useLocation();
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [find, setFind] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 160) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // chiều cao thật của header (đổi khi menu xuống dòng) -> biến CSS cho các thanh dính bên dưới
  const headerRef = useRef(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => { setMenu(false); setFind(false); setHidden(false); }, [loc.pathname, loc.search]);
  useEffect(() => {
    document.documentElement.classList.toggle('header-hidden', hidden);
  }, [hidden]);
  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenu(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menu]);

  return (
    <>
      <header ref={headerRef} className={`site-header ${hidden ? 'is-hidden' : ''}`}>
        <div className="wrap header-row">
          <Link to="/" className="logo" aria-label={`${L(S.siteName)} · ${L(S.home)}`}>
            <img src="./assets/logo.svg" alt="Bài Chòi Hội An" width="115" height="52" />
          </Link>
          <nav aria-label={L(S.mainNav)} className="main-nav">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>
                {L(n.label)}
              </NavLink>
            ))}
          </nav>
          <div className="header-tools">
            <SearchBox />
            <LangToggle />
          </div>
          <div className="header-phone">
            <button type="button" className="icon-btn" aria-label={L(S.search)} aria-expanded={find} onClick={() => setFind((v) => !v)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" /></svg>
            </button>
            <button type="button" className="icon-btn icon-btn-solid" aria-label={L(S.menu)} aria-expanded={menu} onClick={() => setMenu(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {find ? (
            <motion.div className="phone-search" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
              <div className="wrap"><SearchBox autoFocus id="q-phone" onDone={() => setFind(false)} /></div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menu ? (
          <motion.div
            className="phone-menu"
            role="dialog"
            aria-modal="true"
            aria-label={L(S.mainNav)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="phone-menu-top">
              <img src="./assets/logo-trang.svg" alt="Bài Chòi Hội An" width="88" height="40" />
              <button type="button" className="icon-btn icon-btn-yellow" onClick={() => setMenu(false)} aria-label={L(S.close)} autoFocus>✕</button>
            </div>
            <nav aria-label={L(S.mainNav)}>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'is-active' : '')}>{L(S.home)}</NavLink>
              {NAV.map((n, i) => (
                <motion.span key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * (i + 1), duration: 0.3 }}>
                  <NavLink to={n.to} className={({ isActive }) => (isActive ? 'is-active' : '')}>{L(n.label)}</NavLink>
                </motion.span>
              ))}
            </nav>
            <div className="phone-menu-foot">
              <LangToggle className="lang-dark" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
