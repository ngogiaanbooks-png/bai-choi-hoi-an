import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { TOPICS } from '../data/topics.js';
import { videosOfTopic } from '../data/derive.js';
import { useLang } from '../i18n.jsx';
import { scrollToId, usePageTitle, useScrollSpy } from '../lib/hooks.js';
import { minutesLabel } from '../lib/text.js';
import { videoCountWord } from '../lib/words.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';

const IDS = TOPICS.map((t) => t.id.toLowerCase());

export default function Topics() {
  const { L, lang } = useLang();
  const [params] = useSearchParams();
  const active = useScrollSpy(IDS, 220);
  usePageTitle(L({ vi: 'Tám chủ đề', en: 'Eight topics' }));

  // đến từ thẻ chủ đề ở trang chủ: cuộn tới đúng chủ đề
  const muc = params.get('muc');
  useEffect(() => {
    if (muc) setTimeout(() => scrollToId(muc), 250);
  }, [muc]);

  return (
    <>
      <section className="band band-kem page-head">
        <div className="wrap split split-head">
          <div>
            <Breadcrumbs items={[{ label: L({ vi: 'Tám chủ đề tra cứu', en: 'Eight topics' }) }]} />
            <Reveal as="h1" className="h1">{L({ vi: 'Tám chủ đề tra cứu', en: 'Eight topics' })}</Reveal>
            <Reveal as="p" i={1} className="lead measure">
              {L({ vi: 'Thư viện được tổ chức theo 8 chủ đề và có video tổng quan. Người sử dụng có thể lựa chọn từng video theo mục tiêu học tập, giảng dạy hoặc nghiên cứu.', en: 'The library is arranged in 8 topics plus an overview video. Pick each video for your own learning, teaching or research.' })}
            </Reveal>
          </div>
          <Reveal as="p" i={2} className="section-aside">
            {L({ vi: 'Giáo án hướng dẫn sử dụng học liệu được cung cấp tại ', en: 'Lesson plans for using the materials are in ' })}
            <Link to="/giao-vien">{L({ vi: 'mục Dành cho giáo viên', en: 'For teachers' })}</Link>.
          </Reveal>
        </div>
      </section>

      {/* mục lục chủ đề dính dưới header; chip đang xem được tô */}
      <nav className="toc-bar" aria-label={L({ vi: 'Các chủ đề', en: 'Topics' })}>
        <div className="wrap toc-row">
          {TOPICS.map((t) => {
            const id = t.id.toLowerCase();
            return (
              <a
                key={t.id}
                href={`#${id}`}
                className={`toc-chip ${active === id ? 'is-active' : ''}`}
                aria-current={active === id ? 'true' : undefined}
                title={L(t.ten)}
                onClick={(e) => { e.preventDefault(); scrollToId(id); }}
              >
                {t.id}<span className="toc-chip-name"> · {L(t.tenNgan)}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          <div className="topic-list">
            {TOPICS.map((t, i) => {
              const vids = videosOfTopic(t.id);
              return (
                <Reveal as="article" key={t.id} i={i % 2} className="tblock" id={t.id.toLowerCase()} style={{ '--nen': t.nen, '--chu': t.chu }}>
                  <div className="tblock-band">
                    <span className="tblock-code">{t.id}</span>
                    <span className="tblock-count">{videoCountWord(vids.length, lang).toUpperCase()}</span>
                  </div>
                  <div className="tblock-body">
                    <h2 className="h3 tblock-title">{L(t.ten)}</h2>
                    <p className="body grey">{L(t.moTa)}</p>
                    <ul className="vlist">
                      {vids.map((v) => (
                        <li key={v.id}>
                          <Link to={`/video/${v.id}`}>
                            <span className="vlist-code">{v.id}</span>
                            <span className="vlist-title">{L(v.tieuDe)}</span>
                            <span className="vlist-min">{minutesLabel(v.phut, lang)}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="small grey">
                      {L({ vi: 'Hình đồ họa dùng trong chủ đề:', en: 'Graphics in this topic:' })}{' '}
                      {t.doHoa.map((g, j) => <span key={g}>{j ? ', ' : ''}<Link to={`/do-hoa?xem=${g}`}>{g}</Link></span>)}
                    </p>
                    <Link to={`/video?chu-de=${t.id}`} className="link-arrow">{L({ vi: 'Xem video theo chủ đề →', en: 'See this topic in the library →' })}</Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band band-do">
        <div className="wrap split split-cta">
          <div>
            <Reveal as="p" className="eyebrow eyebrow-vang">TQ01 · V36</Reveal>
            <Reveal as="h2" i={1} className="h2 on-dark">{L({ vi: 'Giới thiệu tổng quan các chủ đề', en: 'An overview of all topics' })}</Reveal>
            <Reveal as="p" i={2} className="body on-dark measure">{L({ vi: 'Video tổng quan giới thiệu 8 chủ đề, hỗ trợ lựa chọn nội dung phù hợp với nhu cầu sử dụng.', en: 'The overview walks through all 8 topics so you can choose what you need.' })}</Reveal>
          </div>
          <Reveal i={3}><Link to="/video/V36" className="btn btn-yellow btn-lg">{L({ vi: 'Xem video tổng quan', en: 'Watch the overview' })}</Link></Reveal>
        </div>
      </section>

      <section className="band band-xanh">
        <div className="wrap section">
          <Reveal as="h2" className="h2 on-green">{L({ vi: 'Các phương thức tra cứu khác', en: 'Other ways to search' })}</Reveal>
          <Reveal as="p" i={1} className="body on-dark measure">{L({ vi: 'Ngoài chủ đề, video có thể được tra cứu theo quân bài, làn điệu và người thực hành.', en: 'Besides topics, videos can be found by card, by melody and by practitioner.' })}</Reveal>
          <div className="alt-ways">
            {[
              { to: '/quan-bai', h: { vi: 'Ba mươi quân bài', en: 'Thirty cards' }, p: { vi: 'Tra cứu danh sách video có sự xuất hiện của từng quân bài.', en: 'Find the videos each card appears in.' } },
              { to: '/video?mo=lan-dieu', h: { vi: 'Làn điệu', en: 'Melodies' }, p: { vi: 'Xàng xê, Hò Quảng, Xuân nữ, Cổ bản, Hò ba lý, Vè Quảng.', en: 'Xàng xê, Hò Quảng, Xuân nữ, Cổ bản, Hò ba lý, Vè Quảng.' } },
              { to: '/nguon?ma=nguoi', h: { vi: 'Người thực hành', en: 'Practitioners' }, p: { vi: 'Lời hô và mẫu thực hành của nghệ nhân, nhạc công và câu lạc bộ.', en: 'Verses and demonstrations by artists, musicians and clubs.' } },
            ].map((w, i) => (
              <Reveal key={w.to} i={i + 2}>
                <Link to={w.to} className="alt-way">
                  <span className="h3">{L(w.h)}</span>
                  <span className="small grey">{L(w.p)}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
