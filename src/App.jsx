import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigationType } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { S } from './data/strings.js';
import { useLang } from './i18n.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';

const Topics = lazy(() => import('./pages/Topics.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const VideoDetail = lazy(() => import('./pages/VideoDetail.jsx'));
const Cards = lazy(() => import('./pages/Cards.jsx'));
const CardDetail = lazy(() => import('./pages/CardDetail.jsx'));
const Graphics = lazy(() => import('./pages/Graphics.jsx'));
const Teachers = lazy(() => import('./pages/Teachers.jsx'));
const Sources = lazy(() => import('./pages/Sources.jsx'));
const Search = lazy(() => import('./pages/Search.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const scrollKey = (loc) => `scroll:${loc.key}`;

// Đổi trang: lên đầu và đưa focus vào h1. Quay lại bằng Back: trả về đúng vị trí cuộn cũ.
// Đổi bộ lọc trên cùng một trang (chỉ khác ?query) thì giữ nguyên vị trí.
function ScrollManager() {
  const loc = useLocation();
  const type = useNavigationType();
  const prevPath = useRef(loc.pathname);

  useEffect(() => {
    const save = () => { try { sessionStorage.setItem(scrollKey(loc), String(window.scrollY)); } catch { /* ignore */ } };
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [loc]);

  useLayoutEffect(() => {
    const samePage = prevPath.current === loc.pathname;
    prevPath.current = loc.pathname;
    if (type === 'POP') {
      let y = 0;
      try { y = Number(sessionStorage.getItem(scrollKey(loc))) || 0; } catch { /* ignore */ }
      // chờ trang lười tải xong rồi mới cuộn
      let tries = 0;
      const restore = () => {
        if (document.documentElement.scrollHeight >= y + window.innerHeight || tries++ > 20) window.scrollTo(0, y);
        else requestAnimationFrame(restore);
      };
      restore();
      return;
    }
    if (samePage) return;
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      const h1 = document.querySelector('main h1');
      if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    }, 60);
    return () => clearTimeout(t);
  }, [loc, type]);
  return null;
}

// Băng vàng 8px trên đỉnh trang chạy ngang mỗi lần đổi trang, như một thanh tiến trình.
function TopBand() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  return (
    <div className="top-band" aria-hidden="true">
      <motion.span
        key={pathname}
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      />
    </div>
  );
}

function Page({ children }) {
  const { pathname } = useLocation();
  const type = useNavigationType();
  return (
    <motion.div
      key={pathname}
      initial={type === 'POP' ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { L } = useLang();
  return (
    <>
      <a href="#noi-dung" className="skip" onClick={(e) => { e.preventDefault(); document.getElementById('noi-dung')?.focus(); }}>{L(S.skip)}</a>
      <ScrollManager />
      <TopBand />
      <SiteHeader />
      <main id="noi-dung" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" />}>
          <Page>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chu-de" element={<Topics />} />
              <Route path="/video" element={<Library />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/quan-bai" element={<Cards />} />
              <Route path="/quan-bai/:slug" element={<CardDetail />} />
              <Route path="/do-hoa" element={<Graphics />} />
              <Route path="/giao-vien" element={<Teachers />} />
              <Route path="/nguon" element={<Sources />} />
              <Route path="/tim" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Page>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
