import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { search, TYPE_LABEL } from '../lib/search.js';

// Ô tìm trên header: gợi ý tối đa 6 mục khi gõ (↑↓ để chọn, Enter để mở), Enter khi chưa chọn -> trang kết quả.
// Phím "/" ở bất kỳ đâu sẽ đưa con trỏ vào ô này.
export default function SearchBox({ autoFocus = false, onDone, id = 'q' }) {
  const { L } = useLang();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [act, setAct] = useState(-1);
  const input = useRef(null);
  const listId = useId();
  const results = useMemo(() => search(q, 6), [q]);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
    const onKey = (e) => {
      if (e.key !== '/' || (e.target instanceof Element && e.target.closest('input, textarea, select'))) return;
      if (!input.current || input.current.offsetParent === null) return;
      e.preventDefault();
      input.current.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [autoFocus]);

  const go = (to) => { setOpen(false); setQ(''); setAct(-1); input.current?.blur(); onDone?.(); nav(to); };

  const onSubmit = (e) => {
    e.preventDefault();
    if (act >= 0 && results[act]) go(results[act].to);
    else if (q.trim()) go(`/tim?q=${encodeURIComponent(q.trim())}`);
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setAct((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setAct((a) => Math.max(a - 1, -1)); }
    else if (e.key === 'Escape') { setOpen(false); setAct(-1); }
  };

  const show = open && q.trim().length > 0;
  return (
    <form role="search" className="search" onSubmit={onSubmit}>
      <label htmlFor={id} className="sr-only">{L(S.search)}</label>
      <input
        ref={input}
        id={id}
        type="search"
        autoComplete="off"
        placeholder={L(S.searchPh)}
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setAct(-1); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={show}
        aria-controls={listId}
        aria-activedescendant={act >= 0 ? `${listId}-${act}` : undefined}
      />
      <button type="submit" aria-label={L(S.searchBtn)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M16.5 16.5 21 21" /></svg>
      </button>
      <AnimatePresence>
        {show ? (
          <motion.ul
            id={listId}
            role="listbox"
            className="search-pop"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {results.length ? results.map((r, i) => (
              <li key={`${r.type}-${r.id}`} id={`${listId}-${i}`} role="option" aria-selected={i === act}>
                <button type="button" className={i === act ? 'is-active' : ''} onMouseDown={(e) => e.preventDefault()} onClick={() => go(r.to)}>
                  <span className="search-type">{L(TYPE_LABEL[r.type])}</span>
                  <span className="search-title">{L(r.title)}</span>
                </button>
              </li>
            )) : (
              <li className="search-empty">{L({ vi: 'Không thấy kết quả. Thử gõ không dấu hoặc một từ khác.', en: 'No results. Try a different word.' })}</li>
            )}
            {results.length ? (
              <li className="search-all">
                <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => go(`/tim?q=${encodeURIComponent(q.trim())}`)}>
                  {L({ vi: 'Xem mọi kết quả cho', en: 'All results for' })} “{q.trim()}” →
                </button>
              </li>
            ) : null}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
