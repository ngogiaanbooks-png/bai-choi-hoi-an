import { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CARDS, cardBySlug, phoById } from '../data/cards.js';
import { cardMedia } from '../data/media.js';
import { deckVideos, videosOfCard } from '../data/derive.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import { numberWord } from '../lib/words.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import CardTile from '../components/CardTile.jsx';
import VideoCard from '../components/VideoCard.jsx';
import DownloadLink from '../components/DownloadLink.jsx';
import { SourceList } from '../components/SourceRef.jsx';
import NotFound from './NotFound.jsx';

const ORDINAL = ['', 'nhất', 'hai', 'ba', 'tư', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

export default function CardDetail() {
  const { slug } = useParams();
  const { L, lang } = useLang();
  const nav = useNavigate();
  const card = cardBySlug(slug);
  usePageTitle(card ? card.ten : null);
  const dir = useRef(1);
  const touch = useRef(null);

  // quân trước / sau trong cùng pho, chỉ tính quân đã có tên
  const siblings = card ? CARDS.filter((c) => c.pho === card.pho && c.trangThai === 'xac-nhan') : [];
  const i = siblings.findIndex((c) => c.slug === slug);
  const prev = siblings[(i - 1 + siblings.length) % siblings.length];
  const next = siblings[(i + 1) % siblings.length];
  const go = (c, d) => { dir.current = d; nav(`/quan-bai/${c.slug}`, { replace: false }); };

  useEffect(() => {
    if (!card) return undefined;
    const onKey = (e) => {
      if ((e.target instanceof Element && e.target.closest('input, textarea, select, [role="dialog"]')) || e.altKey || e.metaKey || e.ctrlKey) return;
      if (e.key === 'ArrowLeft') go(prev, -1);
      if (e.key === 'ArrowRight') go(next, 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }); // eslint-disable-line react-hooks/exhaustive-deps

  if (!card) return <NotFound />;

  const pho = phoById(card.pho);
  const own = videosOfCard(card.slug);
  const videos = [...own, ...deckVideos()];
  const verseVideo = own.find((v) => v.loiHo);
  const m = cardMedia(card.slug);

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? next : prev, dx < 0 ? 1 : -1);
    touch.current = null;
  };

  return (
    <>
      <section className="band band-nau">
        <div className="wrap">
          <Breadcrumbs
            tone="on-brown"
            items={[
              { to: '/quan-bai', label: L({ vi: 'Bộ thẻ bài', en: 'The cards' }) },
              { to: `/quan-bai?pho=${card.pho}`, label: L(pho.ten) },
              { label: card.ten },
            ]}
          />
          <div className="card-hero">
            {/* lá bài lật qua trục Y khi chuyển quân; vuốt ngang trên điện thoại */}
            <div className="card-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={card.slug}
                  className="card-figure"
                  initial={{ rotateY: dir.current * -90, opacity: 0.4 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: dir.current * 90, opacity: 0.4 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <Placeholder src={m.a} alt={card.ten} label={card.ten} ratio="2 / 3" loading="eager" />
                </motion.figure>
              </AnimatePresence>
              <figcaption className="xsmall on-dark-note">{L({ vi: 'Hình chụp từ bộ bài thực hành dùng trong ghi hình. Mỹ thuật giữ nguyên bản gốc, không chỉnh sửa.', en: 'Photographed from the practice deck used in the recordings. Artwork unaltered.' })}</figcaption>
            </div>

            <div className="card-info">
              <p className="eyebrow eyebrow-peach">{L(pho.ten)} · {lang === 'en' ? `card ${card.thuTu}` : `quân thứ ${ORDINAL[card.thuTu]}`}</p>
              <h1 className="h1 h1-card on-dark">{card.ten}</h1>
              <dl className="card-facts">
                <div>
                  <dt>{L({ vi: 'Tên gọi khác', en: 'Other names' })}</dt>
                  <dd>{card.tenKhac.length ? card.tenKhac.map((a) => <span key={a.ten}>{a.ten}{a.nguon ? <> — {L({ vi: 'nguồn', en: 'source' })} <SourceList codes={[a.nguon]} /></> : null}</span>) : L({ vi: 'Chưa ghi nhận', en: 'None recorded' })}</dd>
                </div>
                <div>
                  <dt>{L({ vi: 'Phiên bản bộ bài', en: 'Deck version' })}</dt>
                  <dd>{L({ vi: 'Bộ bài thực hành được lựa chọn', en: 'The chosen practice deck' })}</dd>
                </div>
                <div>
                  <dt>{L({ vi: 'Xuất hiện trong', en: 'Appears in' })}</dt>
                  <dd>{own.length ? (lang === 'en' ? `${own.length} video${own.length > 1 ? 's' : ''}` : `${numberWord(own.length, lang).replace(/^./, (c) => c.toUpperCase())} video`) : L({ vi: 'Chưa có video riêng', en: 'No video of its own yet' })}</dd>
                </div>
                <div>
                  <dt>{L({ vi: 'Câu hô mẫu đã ghi', en: 'Recorded verse' })}</dt>
                  <dd>{verseVideo ? L({ vi: 'Một mẫu, có nguồn', en: 'One, with source' }) : L({ vi: 'Chưa có', en: 'None yet' })}</dd>
                </div>
              </dl>
              <div className="card-actions">
                <DownloadLink href={m.in} variant="yellow">{L({ vi: 'Tải bản in A4 quân này', en: 'Download A4 print' })}</DownloadLink>
                <DownloadLink href={m.ab} variant="ghost-yellow">{L({ vi: 'Tải bản A và bản B', en: 'Download versions A and B' })}</DownloadLink>
              </div>
              <nav className="card-steps" aria-label={L({ vi: 'Quân khác trong pho', en: 'Other cards in this suit' })}>
                <button type="button" className="btn btn-ghost-light" onClick={() => go(prev, -1)}>← {prev.ten}</button>
                <span className="xsmall on-dark-note">{i + 1} / {siblings.length}</span>
                <button type="button" className="btn btn-ghost-light" onClick={() => go(next, 1)}>{next.ten} →</button>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap detail">
          <div className="detail-main">
            <Reveal as="h2" className="h2">{L({ vi: 'Câu hô mẫu cho quân này', en: 'Sample verse for this card' })}</Reveal>
            <Reveal as="p" i={1} className="body grey measure">{L({ vi: 'Lời hô được xác nhận bởi người thể hiện, kèm thông tin ghi công và nguồn dẫn. Mẫu ghi nhận là một phiên bản thực hành, không đại diện cho toàn bộ các dị bản.', en: 'Verses are confirmed by their performers, with credits and sources. A recorded verse is one version, not every variant.' })}</Reveal>
            {verseVideo ? (
              <div className="verse">
                <p className="verse-text verse-pending">{L({ vi: 'Câu hô mẫu đang được đối chiếu với bản rã băng; sẽ hiển thị đúng chữ và dấu như người thể hiện đã hát.', en: 'The verse is being checked against the transcript and will appear exactly as sung.' })}</p>
                <div className="verse-grid">
                  <div><p className="xsmall grey">{L({ vi: 'Người thể hiện', en: 'Performed by' })}</p><p>{verseVideo.loiHo.nguoiTheHien.join(', ')}</p></div>
                  <div><p className="xsmall grey">{L({ vi: 'Làn điệu', en: 'Melody' })}</p><p>{verseVideo.lanDieu.join(', ')}</p></div>
                  <div><p className="xsmall grey">{L({ vi: 'Nguồn lời', en: 'Source' })}</p><p><SourceList codes={verseVideo.loiHo.nguon} /></p></div>
                  <div><p className="xsmall grey">{L({ vi: 'Phân loại', en: 'Type' })}</p><p>{L({ vi: 'Sưu tầm', en: 'Collected' })}</p></div>
                </div>
              </div>
            ) : (
              <div className="verse"><p className="verse-text verse-pending">{L({ vi: 'Chưa có câu hô mẫu được ghi cho quân này.', en: 'No verse has been recorded for this card yet.' })}</p></div>
            )}
          </div>
          <aside className="detail-side">
            <p className="label-h">{L({ vi: 'Các quân khác trong', en: 'Other cards in the' })} {L(pho.ten).toLowerCase()}</p>
            <div className="mini-grid">
              {siblings.filter((c) => c.slug !== card.slug).slice(Math.max(0, i - 2), Math.max(0, i - 2) + 4).map((c) => <CardTile key={c.slug} card={c} compact />)}
            </div>
            <Link to="/quan-bai" className="link-arrow">{L({ vi: 'Xem bộ 30 quân bài →', en: 'See all 30 cards →' })}</Link>
          </aside>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          <Reveal as="h2" className="h2">{L({ vi: `Video có quân ${card.ten}`, en: `Videos with ${card.ten}` })}</Reveal>
          <Reveal as="p" i={1} className="body grey">{L({ vi: `Danh sách video có sự xuất hiện của quân ${card.ten}.`, en: `Videos in which ${card.ten} appears.` })}</Reveal>
          <div className="vgrid vgrid-3">
            {videos.map((v) => (
              <VideoCard
                key={v.id}
                v={v}
                meta={v.caBo ? L({ vi: 'Toàn bộ ba mươi quân', en: 'All thirty cards' }) : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

