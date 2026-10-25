import { Link } from 'react-router-dom';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';

export default function NotFound() {
  const { L } = useLang();
  usePageTitle(L(S.notFound));
  return (
    <section className="band band-vang page-head">
      <div className="wrap">
        <h1 className="h1">{L(S.notFound)}</h1>
        <p className="lead measure">{L({ vi: 'Đường dẫn này không có trong học liệu. Bạn có thể bắt đầu lại từ một trong các lối vào dưới đây.', en: 'This address is not part of the materials. Start again from one of these.' })}</p>
        <div className="empty-actions">
          <Link to="/" className="btn btn-dark">{L(S.home)}</Link>
          <Link to="/video" className="btn btn-outline">{L({ vi: 'Thư viện video', en: 'Video library' })}</Link>
          <Link to="/quan-bai" className="btn btn-outline">{L({ vi: 'Bộ thẻ bài', en: 'The cards' })}</Link>
        </div>
      </div>
    </section>
  );
}
