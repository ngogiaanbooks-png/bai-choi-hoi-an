import { Link } from 'react-router-dom';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';

// Đường dẫn ở đầu trang. Trên điện thoại chỉ còn "← mục cha" cho gọn.
export default function Breadcrumbs({ items, tone }) {
  const { L } = useLang();
  const all = [{ to: '/', label: L(S.home) }, ...items];
  const parent = all[all.length - 2];
  return (
    <nav aria-label={L(S.crumbs)} className={`crumbs ${tone ? `crumbs-${tone}` : ''}`}>
      <ol className="crumbs-full">
        {all.map((c, i) => (
          <li key={i}>
            {c.to && i < all.length - 1 ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
      <Link to={parent.to} className="crumbs-back">← {parent.label}</Link>
    </nav>
  );
}
