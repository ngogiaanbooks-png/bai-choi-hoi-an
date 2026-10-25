import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { asset, graphicMedia } from '../data/media.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import DownloadLink from './DownloadLink.jsx';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

// Xem đồ họa kích thước lớn: phóng bằng cuộn chuột / chụm tay / nút +−, kéo để xem, ←/→ đổi đồ họa, Esc đóng.
export default function Lightbox({ items, index, onIndex, onClose }) {
  const { L, lang } = useLang();
  const g = items[index];
  const m = graphicMedia(g.id);
  const [z, setZ] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const closeRef = useRef(null);
  const backTo = useRef(document.activeElement);

  useEffect(() => { setZ(1); setPos({ x: 0, y: 0 }); }, [index]);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = backTo.current;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
      else if (e.key === '+' || e.key === '=') setZ((v) => clamp(v * 1.25, 1, 4));
      else if (e.key === '-') setZ((v) => clamp(v / 1.25, 1, 4));
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [index, items.length, onClose, onIndex]);

  const onWheel = (e) => setZ((v) => clamp(v * (e.deltaY < 0 ? 1.1 : 1 / 1.1), 1, 4));
  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), z };
    }
  };
  const onMove = (e) => {
    const last = pointers.current.get(e.pointerId);
    if (!last) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      setZ(clamp((pinch.current.z * Math.hypot(a.x - b.x, a.y - b.y)) / pinch.current.d, 1, 4));
    } else if (z > 1) {
      setPos((p) => ({ x: p.x + e.clientX - last.x, y: p.y + e.clientY - last.y }));
    }
  };
  const onUp = (e) => { pointers.current.delete(e.pointerId); if (pointers.current.size < 2) pinch.current = null; };

  return (
    <motion.div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${g.id} · ${L(g.ten)}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="lb-top">
        <p className="lb-title"><strong>{g.id}</strong> · {L(g.ten)}</p>
        <div className="lb-tools">
          <button type="button" className="lb-btn" onClick={() => setZ((v) => clamp(v / 1.25, 1, 4))} aria-label={lang === 'en' ? 'Zoom out' : 'Thu nhỏ'}>−</button>
          <span className="lb-zoom">{Math.round(z * 100)}%</span>
          <button type="button" className="lb-btn" onClick={() => setZ((v) => clamp(v * 1.25, 1, 4))} aria-label={lang === 'en' ? 'Zoom in' : 'Phóng to'}>+</button>
          <DownloadLink href={m.goc} variant="yellow">{lang === 'en' ? 'Download original' : 'Tải bản gốc'}</DownloadLink>
          <button ref={closeRef} type="button" className="lb-btn" onClick={onClose} aria-label={L(S.close)}>✕</button>
        </div>
      </div>
      <div
        className="lb-stage"
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={() => { setZ((v) => (v > 1 ? 1 : 2)); setPos({ x: 0, y: 0 }); }}
        style={{ cursor: z > 1 ? 'grab' : 'zoom-in' }}
      >
        <motion.div
          key={g.id}
          className="lb-img"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: z, x: z > 1 ? pos.x : 0, y: z > 1 ? pos.y : 0 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {m.img ? <img src={asset(m.img)} alt={L(g.ten)} draggable="false" /> : <span className="lb-ph">{g.id}</span>}
        </motion.div>
      </div>
      <div className="lb-nav">
        <button type="button" className="lb-btn" onClick={() => onIndex((index - 1 + items.length) % items.length)}>← {items[(index - 1 + items.length) % items.length].id}</button>
        <span>{index + 1} / {items.length}</span>
        <button type="button" className="lb-btn" onClick={() => onIndex((index + 1) % items.length)}>{items[(index + 1) % items.length].id} →</button>
      </div>
    </motion.div>
  );
}
