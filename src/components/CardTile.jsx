import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardMedia } from '../data/media.js';
import { phoById } from '../data/cards.js';
import { videosOfCard } from '../data/derive.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { videoCountWord } from '../lib/words.js';
import Placeholder from './Placeholder.jsx';

// Ô quân bài theo khung "Bộ ba mươi thẻ bài": tên trên dải nâu, hình 2:3, pho và số video.
// Quân chờ đối chiếu: dải xám, khung gạch, không bấm được.
export default function CardTile({ card, compact = false }) {
  const { L, lang } = useLang();
  const pending = card.trangThai === 'cho';
  const n = pending ? 0 : videosOfCard(card.slug).length;
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
      className={`ctile ${pending ? 'is-pending' : ''} ${compact ? 'is-compact' : ''}`}
      title={pending ? L(S.pendingHint) : undefined}
    >
      <div className="ctile-band">
        {pending ? (
          <span>{L(S.pending)}</span>
        ) : (
          <Link to={`/quan-bai/${card.slug}`} className="stretched">{card.ten}</Link>
        )}
      </div>
      <Placeholder
        src={pending ? null : cardMedia(card.slug).a}
        alt={card.ten || ''}
        label={pending ? '?' : card.ten}
        ratio="2 / 3"
        tone={pending ? 'cho' : 'kem'}
        className="ctile-img"
      />
      {compact ? null : (
        <div className="ctile-meta">
          <span>{L(phoById(card.pho).ten)}</span>
          <span className={n ? 'has' : ''}>{pending ? '—' : n ? videoCountWord(n, lang) : L(S.noVideoYet)}</span>
        </div>
      )}
    </motion.article>
  );
}
