import { Link } from 'react-router-dom';
import { sourceByCode } from '../data/sources.js';
import { useLang } from '../i18n.jsx';

// Mã nguồn (PV08, TL06…) luôn là link tới dòng của nó ở trang Nguồn tư liệu, kèm chú thích ngắn khi rê chuột hoặc focus.
export default function SourceRef({ code, className = '' }) {
  const { L } = useLang();
  const s = sourceByCode(code);
  const tip = s?.moTa ? `${L(s.loai)} · ${L(s.moTa)}` : s ? L(s.loai) : null;
  return (
    <Link to={`/nguon?ma=${code}`} className={`src-ref ${className}`} data-tip={tip || undefined} aria-label={tip ? `${code}: ${tip}` : code}>
      {code}
    </Link>
  );
}

export function SourceList({ codes }) {
  return codes.map((c, i) => (
    <span key={c}>
      {i ? ', ' : ''}
      <SourceRef code={c} />
    </span>
  ));
}
