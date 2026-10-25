import { Link } from 'react-router-dom';
import { TOPICS } from '../data/topics.js';
import { videoById } from '../data/videos.js';
import { MEDIA } from '../data/media.js';
import { STATS, topicCount } from '../data/derive.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import { videoCountWord } from '../lib/words.js';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import DownloadLink from '../components/DownloadLink.jsx';
import { SourceList } from '../components/SourceRef.jsx';

const WAYS = [
  {
    band: 'var(--vang)', to: '/chu-de',
    ten: { vi: 'Theo chủ đề', en: 'By topic' }, ngan: { vi: 'Chủ đề', en: 'Topic' },
    moTa: { vi: 'Tám nhóm chủ đề, từ tổng quan tới bảo tồn và vận dụng.', en: 'Eight topics, from the overview to safeguarding.' },
    phu: { vi: 'Tám nhóm', en: 'Eight topics' }, link: { vi: 'Tám chủ đề →', en: 'Eight topics →' },
  },
  {
    band: 'var(--nau)', to: '/quan-bai',
    ten: { vi: 'Theo quân bài', en: 'By card' }, ngan: { vi: 'Quân bài', en: 'Card' },
    moTa: { vi: 'Tra cứu video liên quan theo từng quân bài trong bộ 30 quân.', en: 'Find the videos for each of the 30 cards.' },
    phu: { vi: 'Ba mươi quân', en: 'Thirty cards' }, link: { vi: 'Ba mươi quân bài →', en: 'Thirty cards →' },
  },
  {
    band: 'var(--xanh-dam)', to: '/video?mo=lan-dieu',
    ten: { vi: 'Theo làn điệu', en: 'By melody' }, ngan: { vi: 'Làn điệu', en: 'Melody' },
    moTa: { vi: 'Nghe các mẫu thị phạm Xàng xê, Hò Quảng, Xuân nữ và các chất liệu âm nhạc khác.', en: 'Hear demonstrations of Xàng xê, Hò Quảng, Xuân nữ and more.' },
    phu: { vi: 'Sáu làn điệu', en: 'Six melodies' }, link: { vi: 'Lọc theo làn điệu →', en: 'Filter by melody →' },
  },
  {
    band: 'var(--burgundy)', to: '/nguon?ma=nguoi',
    ten: { vi: 'Theo người thực hành', en: 'By practitioner' }, ngan: { vi: 'Người', en: 'People' },
    moTa: { vi: 'Tra cứu lời hô và mẫu thực hành theo nghệ nhân, nhạc công hoặc câu lạc bộ.', en: 'Find verses and demonstrations by artist, musician or club.' },
    phu: { vi: 'Hai mươi hai người', en: 'Twenty-two people' }, link: { vi: 'Người thực hành →', en: 'Practitioners →' },
  },
];

export default function Home() {
  const { L, lang } = useLang();
  usePageTitle(null);
  const v36 = videoById('V36');
  const min = `${v36.phut} ${L(S.minutes)}`;

  const stats = [
    { n: STATS.videos, to: '/video', t: { vi: 'video bài học, mỗi video từ ba đến sáu phút', en: 'lesson videos, three to six minutes each' } },
    { n: STATS.cards, to: '/quan-bai', t: { vi: 'quân bài số hóa, chia ba pho, có bản in khổ A4', en: 'digitised cards in three suits, with A4 printouts' } },
    { n: STATS.graphics, to: '/do-hoa', t: { vi: 'hình đồ họa thông tin, tải được bản gốc', en: 'information graphics, originals to download' } },
    { n: STATS.sources, to: '/nguon', t: { vi: 'nguồn tư liệu được dẫn, từ điền dã và hồ sơ di sản', en: 'cited sources, from fieldwork and heritage files' } },
  ];

  return (
    <>
      {/* khối mở đầu: hai nút đưa xuống ngay dưới đoạn mô tả, cùng cột với tiêu đề */}
      <section className="band band-vang hero">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">{L(S.org)}</Reveal>
          <Reveal as="h1" i={1} className="hero-title">
            {lang === 'en' ? (
              <>Digital learning materials<br className="br-wide" /> for the art of<br className="br-wide" /> Bài Chòi in Hội An</>
            ) : (
              <>Bộ học liệu điện tử<br className="br-wide" /> truyền dạy nghệ thuật<br className="br-wide" /> Bài Chòi Hội An</>
            )}
          </Reveal>
          <Reveal as="p" i={2} className="hero-lead">
            {L({
              vi: `Bộ học liệu gồm ${STATS.videos} video, ${STATS.cards} quân bài số hóa và ${STATS.graphics} đồ họa thông tin, được xây dựng từ tư liệu ghi nhận với người thực hành tại Hội An, phục vụ tra cứu, học tập và giảng dạy.`,
              en: `${STATS.videos} videos, ${STATS.cards} digitised cards and ${STATS.graphics} information graphics, built from material recorded with practitioners in Hội An, for reference, learning and teaching.`,
            })}
          </Reveal>
          <Reveal i={3} className="hero-actions">
            <a href="#tong-quan" className="btn btn-dark btn-lg hide-phone" onClick={(e) => { e.preventDefault(); document.getElementById('tong-quan')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>
              {L({ vi: `Xem video tổng quan · ${min}`, en: `Watch the overview · ${min}` })}
            </a>
            <Link to="/video" className="btn btn-outline btn-lg hide-phone">{L({ vi: `Xem thư viện ${STATS.videos} video`, en: `Browse all ${STATS.videos} videos` })}</Link>
            <Link to="/video" className="btn btn-dark btn-lg show-phone">{L({ vi: 'Xem thư viện video', en: 'Browse the videos' })}</Link>
          </Reveal>
          <Reveal as="p" i={4} className="hero-note">{L({ vi: 'Xem và tải học liệu không cần đăng ký tài khoản.', en: 'Watch and download without an account.' })}</Reveal>
        </div>
      </section>

      {/* số liệu: chuyển lên ngay dưới hero để người mới thấy ngay quy mô; mỗi số là một lối vào */}
      <section className="band band-trang stats-band" aria-label={L({ vi: 'Bộ học liệu gồm', en: 'What is inside' })}>
        <div className="wrap stats">
          {stats.map((s, i) => (
            <Reveal key={i} i={i}>
              <Link to={s.to} className="stat">
                <CountUp to={s.n} className="stat-n" />
                <span className="stat-t">{L(s.t)}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* video tổng quan: phát ngay tại chỗ */}
      <section className="band band-do" id="tong-quan">
        <div className="wrap split split-media">
          <Reveal className="split-main">
            <p className="eyebrow eyebrow-vang show-phone">V36 · {L({ vi: 'Video tổng quan', en: 'Overview' })} · {min}</p>
            <VideoPlayer v={v36} compact />
          </Reveal>
          <div className="split-side">
            <Reveal as="p" i={1} className="eyebrow eyebrow-vang hide-phone">V36 · {L({ vi: 'Video tổng quan', en: 'Overview video' })} · {min}</Reveal>
            <Reveal as="h2" i={2} className="h2 on-dark">{L(v36.tieuDe)}</Reveal>
            <Reveal as="p" i={3} className="body on-dark">{L(v36.moTa)}</Reveal>
            <Reveal as="p" i={4} className="small on-dark-note">
              {L(v36.phuDe)} · {L({ vi: 'Nguồn', en: 'Sources' })} <SourceList codes={['TL10', 'PV01', 'PV04']} />
            </Reveal>
            <Reveal i={5}>
              <Link to="/video/V36" className="link-arrow link-on-red">{L({ vi: 'Mở trang video →', en: 'Open the video page →' })}</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* bốn cách tra cứu: mỗi thẻ dẫn thẳng tới trạng thái đã lọc sẵn */}
      <section className="band band-trang">
        <div className="wrap section">
          <Reveal as="p" className="eyebrow eyebrow-grey">{L({ vi: 'Bốn cách tra cứu', en: 'Four ways in' })}</Reveal>
          <Reveal as="h2" i={1} className="h2">{L({ vi: 'Tra cứu học liệu', en: 'Find what you need' })}</Reveal>
          <div className="ways">
            {WAYS.map((w, i) => (
              <Reveal key={w.to} i={i + 2} className="way-wrap">
                <Link to={w.to} className="way" style={{ '--band': w.band }}>
                  <span className="way-band" />
                  <span className="way-body">
                    <span className="h3 way-title"><span className="hide-phone">{L(w.ten)}</span><span className="show-phone">{L(w.ngan)}</span></span>
                    <span className="way-text hide-phone">{L(w.moTa)}</span>
                    <span className="way-text show-phone">{L(w.phu)}</span>
                    <span className="way-link hide-phone">{L(w.link)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* tám chủ đề */}
      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          <div className="section-head">
            <div>
              <Reveal as="p" className="eyebrow eyebrow-grey">{L({ vi: 'Mục 2', en: 'Section 2' })}</Reveal>
              <Reveal as="h2" i={1} className="h2">{L({ vi: 'Tám chủ đề tra cứu', en: 'Eight topics' })}</Reveal>
            </div>
            <Reveal as="p" i={2} className="section-aside">
              {L({ vi: 'Học liệu được tổ chức theo 8 chủ đề độc lập, cho phép lựa chọn nội dung phù hợp với nhu cầu tra cứu và học tập.', en: 'The materials are arranged in 8 independent topics, so you can pick what fits your purpose.' })}
            </Reveal>
          </div>
          <div className="topic-grid">
            {TOPICS.map((t, i) => (
              <Reveal key={t.id} i={i % 4}>
                <Link to={`/chu-de?muc=${t.id.toLowerCase()}`} className="tcard" style={{ '--nen': t.nen, '--chu': t.chu }}>
                  <span className="tcard-band">{t.id} · {videoCountWord(topicCount(t.id), lang).toUpperCase()}</span>
                  <span className="tcard-body">
                    <span className="h3 tcard-title">{L(t.ten)}</span>
                    <span className="tcard-text">{L(t.moTaNgan)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* dành cho giáo viên */}
      <section className="band band-kem">
        <div className="wrap split split-cta">
          <div>
            <Reveal as="p" className="eyebrow eyebrow-grey">{L({ vi: 'Mục 6', en: 'Section 6' })}</Reveal>
            <Reveal as="h2" i={1} className="h2">{L({ vi: 'Học liệu hỗ trợ giảng dạy Bài Chòi', en: 'Teaching resources for Bài Chòi' })}</Reveal>
            <Reveal as="p" i={2} className="body measure">
              {L({ vi: 'Tài nguyên dành cho giáo viên gồm 8 giáo án theo chủ đề, bộ 30 quân bài đen trắng khổ A4 và danh mục trích đoạn video phục vụ giảng dạy.', en: 'Eight lesson plans by topic, the 30 cards in black and white on A4, and a list of short clips for class.' })}
            </Reveal>
          </div>
          <Reveal i={3} className="stack-actions">
            <Link to="/giao-vien" className="btn btn-dark btn-lg">{L({ vi: 'Xem học liệu dành cho giáo viên', en: 'Resources for teachers' })}</Link>
            <DownloadLink href={MEDIA.downloads.cardsPrint} className="btn-lg">{L({ vi: 'Tải bản in ba mươi quân bài', en: 'Download the 30-card printout' })}</DownloadLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
