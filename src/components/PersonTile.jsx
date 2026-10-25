import { Link } from 'react-router-dom';
import { personMedia } from '../data/media.js';
import { useLang } from '../i18n.jsx';
import Placeholder from './Placeholder.jsx';

// Ô người thực hành: ảnh vuông 56px, tên, vai trò, (tuỳ chọn) số video. Bấm -> thư viện lọc theo người.
export default function PersonTile({ person, count }) {
  const { L, lang } = useLang();
  return (
    <Link to={`/video?nguoi=${person.id}`} className="ptile">
      <Placeholder src={personMedia(person.id).anh} label={lang === 'en' ? 'PHOTO' : 'ẢNH'} ratio="1 / 1" className="ptile-img" />
      <span className="ptile-text">
        <span className="ptile-name">{person.ten}</span>
        {person.vaiTro ? <span className="ptile-role">{L(person.vaiTro)}</span> : null}
        {count != null ? <span className="ptile-count">{count} video{lang === 'en' && count !== 1 ? 's' : ''}</span> : null}
      </span>
    </Link>
  );
}
