import { useEffect, useState } from 'react';
import { useNavigationType } from 'react-router-dom';

export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

export const useIsPhone = () => useMediaQuery('(max-width: 760px)');

// Khi quay lại bằng nút Back, nội dung hiện ngay, không chạy lại hiệu ứng xuất hiện.
export const useIsBack = () => useNavigationType() === 'POP';

// Mục nào đang nằm trong vùng đọc (dùng cho mục lục dính).
export function useScrollSpy(ids, offset = 160) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = ids[0];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top - offset <= 0) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, offset]);
  return active;
}

export function scrollToId(id, behavior = 'smooth') {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--offset-top')) || 120);
  window.scrollTo({ top, behavior: reduce ? 'auto' : behavior });
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Bài Chòi Hội An` : 'Học liệu Bài Chòi Hội An';
  }, [title]);
}
