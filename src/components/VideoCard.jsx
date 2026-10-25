import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { topicById } from '../data/topics.js';
import { videoMedia } from '../data/media.js';
import { useLang } from '../i18n.jsx';
import { minutesLabel } from '../lib/text.js';
import Placeholder from './Placeholder.jsx';

// Thẻ video theo khung "Thư viện video": dải mã màu chủ đề, ảnh đại diện 16:9, tiêu đề, người, nhãn phụ.
// Cả thẻ bấm được (link phủ toàn thẻ qua tiêu đề), dùng `layout` để sắp lại mượt khi lọc.
export default function VideoCard({ v, meta, layout = false, headingLevel = 3 }) {
  const { L, lang } = useLang();
  const t = topicById(v.chuDe);
  const H = `h${headingLevel}`;
  const tags = meta ?? [
    ...v.quan.map((q) => `${lang === 'en' ? 'Card' : 'Quân'} ${q}`),
    ...v.lanDieu,
    L(t.tenNgan),
  ].join(' · ');
  return (
    <motion.article
      layout={layout ? 'position' : false}
      initial={layout ? { opacity: 0, scale: 0.98 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      className="vcard"
      style={{ '--nen': t.nen, '--chu': t.chu }}
    >
      <div className="vcard-band">
        <span className="vcard-code">{v.id} · {v.chuDe === 'TQ' ? 'TQ01' : v.chuDe}</span>
        <span>{minutesLabel(v.phut, lang)}</span>
      </div>
      <div className="vcard-media">
        <Placeholder src={videoMedia(v.id).poster} label={v.id} />
      </div>
      <div className="vcard-body">
        <H className="vcard-title">
          <Link to={`/video/${v.id}`} className="stretched">{L(v.tieuDe)}</Link>
        </H>
        <p className="vcard-people">{v.nguoi.join(', ')}</p>
        {tags ? <p className="vcard-tags">{tags}</p> : null}
      </div>
    </motion.article>
  );
}
