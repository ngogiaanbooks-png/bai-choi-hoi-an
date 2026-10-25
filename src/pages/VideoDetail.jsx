import { Link, useParams, useSearchParams } from 'react-router-dom';
import { videoById } from '../data/videos.js';
import { topicById } from '../data/topics.js';
import { phoById } from '../data/cards.js';
import { cardMedia, graphicMedia, MEDIA } from '../data/media.js';
import { cardsOfVideo, graphicsOfVideo, neighbours, peopleOfVideo, related, sourcesOfVideo } from '../data/derive.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import { minutesLabel, slugify } from '../lib/text.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import VideoCard from '../components/VideoCard.jsx';
import PersonTile from '../components/PersonTile.jsx';
import Placeholder from '../components/Placeholder.jsx';
import SourceRef, { SourceList } from '../components/SourceRef.jsx';
import DownloadLink from '../components/DownloadLink.jsx';
import NotFound from './NotFound.jsx';

function Panel({ title, nen, chu, children }) {
  return (
    <div className="panel">
      <div className="panel-head" style={{ background: nen, color: chu }}>{title}</div>
      <div className="panel-body">{children}</div>
    </div>
  );
}

export default function VideoDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const { L, lang } = useLang();
  const v = videoById(String(id).toUpperCase());
  usePageTitle(v ? `${v.id} · ${L(v.tieuDe)}` : null);
  if (!v) return <NotFound />;

  const t = topicById(v.chuDe);
  const nb = neighbours(v.id);
  const cards = cardsOfVideo(v);
  const graphics = graphicsOfVideo(v.id);
  const sources = sourcesOfVideo(v.id).filter((s) => s.moTa);
  const people = peopleOfVideo(v);
  const rel = related(v.id, 3);
  const start = Number(params.get('t')) || 0;
  const desc = v.moTa || t.moTa;
  const topicLabel = v.chuDe === 'TQ' ? L(t.ten) : `${v.chuDe} ${L(t.ten)}`;

  const NavStep = ({ to, dir }) => (to ? (
    <Link to={`/video/${to.id}`} className={`step step-${dir}`}>
      <span className="step-k">{dir === 'prev' ? L({ vi: '← Trước', en: '← Previous' }) : L({ vi: 'Tiếp theo →', en: 'Next →' })}</span>
      <span className="step-t">{to.id} · {L(to.tieuDe)}</span>
    </Link>
  ) : <span className="step step-empty" />);

  return (
    <>
      {/* khối 1: trình phát trên nền màu của chủ đề */}
      <section className="band player-band" style={{ background: t.nen, '--crumb': t.chu }}>
        <div className="wrap">
          <Breadcrumbs
            tone="on-color"
            items={[
              { to: '/video', label: L({ vi: 'Thư viện video', en: 'Video library' }) },
              ...(v.chuDe === 'TQ' ? [] : [{ to: `/video?chu-de=${v.chuDe}`, label: topicLabel }]),
              { label: v.id },
            ]}
          />
          <VideoPlayer v={v} start={start} key={v.id} />
          {/* học tuần tự trong cùng chủ đề mà không phải quay lại danh sách */}
          <nav className="steps" aria-label={L({ vi: 'Video trong cùng chủ đề', en: 'Videos in this topic' })}>
            <NavStep to={nb.prev} dir="prev" />
            <span className="steps-pos">{L({ vi: `${nb.index} / ${nb.total} trong ${v.chuDe === 'TQ' ? 'thư viện' : `chủ đề ${v.chuDe}`}`, en: `${nb.index} of ${nb.total} in ${v.chuDe === 'TQ' ? 'the library' : `topic ${v.chuDe}`}` })}</span>
            <NavStep to={nb.next} dir="next" />
          </nav>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap detail">
          <div className="detail-main">
            {/* khối 2: thông tin */}
            <div className="tags">
              <span className="tag tag-solid" style={{ background: t.nen, color: t.chu }}>{v.id} · {v.chuDe === 'TQ' ? 'TQ01' : v.chuDe}</span>
              <span className="tag">{minutesLabel(v.phut, lang)}</span>
              {v.lanDieu.map((d) => <Link key={d} className="tag tag-link" to={`/video?lan-dieu=${slugify(d)}`}>{L({ vi: 'Làn điệu', en: 'Melody' })} {d}</Link>)}
              {cards.map((c) => (c.card
                ? <Link key={c.ten} className="tag tag-link" to={`/quan-bai/${c.card.slug}`}>{L(S.card)} {c.ten}</Link>
                : <Link key={c.ten} className="tag tag-link" to={`/video?quan=${slugify(c.ten)}`}>{L(S.card)} {c.ten}</Link>))}
            </div>
            <Reveal as="h1" className="h1 h1-detail">{L(v.tieuDe)}</Reveal>
            <Reveal as="p" i={1} className="lead measure">{L(desc)}</Reveal>

            <h2 className="label-h">{L({ vi: 'Người thực hành trong video', en: 'Practitioners in this video' })}</h2>
            <div className="people-grid">
              {people.map((p) => <PersonTile key={p.id} person={p} />)}
            </div>

            {/* khối 3: lời hô */}
            {v.loiHo ? (
              <>
                <h2 className="h2 h2-sm">{L({ vi: 'Lời hô trong video', en: 'The verse in this video' })}</h2>
                <div className="verse">
                  {v.loiHo.lines ? (
                    <p className="verse-text">{v.loiHo.lines.join('\n')}</p>
                  ) : (
                    <p className="verse-text verse-pending">{L({ vi: 'Lời hô đang được đối chiếu với bản rã băng và người thể hiện; sẽ cập nhật khi được xác nhận.', en: 'The verse is being checked against the transcript and the performers; it will appear once confirmed.' })}</p>
                  )}
                  <div className="verse-meta">
                    <p><strong>{L({ vi: 'Người thể hiện:', en: 'Performed by:' })}</strong> {v.loiHo.nguoiTheHien.join(', ')}</p>
                    <p><strong>{L({ vi: 'Nguồn lời:', en: 'Source:' })}</strong> <SourceList codes={v.loiHo.nguon} /></p>
                    <p><strong>{L({ vi: 'Phân loại:', en: 'Type:' })}</strong> {L(v.loiHo.phanLoai)}</p>
                  </div>
                </div>
                <p className="small grey measure">
                  {L({ vi: 'Phụ đề được biên soạn theo bản ghi âm của video. Các dị bản khác có thể gửi về Trung tâm để bổ sung hồ sơ tư liệu; nội dung phụ đề được giữ thống nhất với bản ghi.', en: 'Subtitles follow the recording. Other variants can be sent to the Centre for the archive; the subtitles stay faithful to the recording.' })}
                </p>
              </>
            ) : null}

            {/* khối 6: video liên quan */}
            <h2 className="h2 h2-sm">{L({ vi: 'Video liên quan', en: 'Related videos' })}</h2>
            <p className="body grey">{v.chuDe === 'TQ'
              ? L({ vi: 'Các video khác của cùng người thực hành.', en: 'More from the same practitioner.' })
              : L({ vi: `Các video liên quan trong chủ đề ${v.chuDe}.`, en: `Related videos in topic ${v.chuDe}.` })}</p>
            <div className="vgrid vgrid-2">
              {rel.map((r) => <VideoCard key={r.id} v={r} />)}
            </div>
          </div>

          {/* cột phải dính: quân bài, làn điệu và đồ họa, nguồn */}
          <aside className="detail-side">
            {cards.length || v.caBo ? (
              <Panel title={L({ vi: 'QUÂN BÀI TRONG VIDEO', en: 'CARDS IN THIS VIDEO' })} nen="var(--nau)" chu="var(--dao)">
                {cards.map((c) => (
                  <div className="mini-card" key={c.ten}>
                    {c.card ? (
                      <Link to={`/quan-bai/${c.card.slug}`} className="mini-card-img"><Placeholder src={cardMedia(c.card.slug).a} label={c.card.ten} ratio="2 / 3" /></Link>
                    ) : (
                      <span className="mini-card-img"><Placeholder label={c.ten} ratio="2 / 3" /></span>
                    )}
                    <div>
                      <h3 className="h3 h3-card">{c.card ? <Link to={`/quan-bai/${c.card.slug}`}>{c.card.ten}</Link> : c.ten}</h3>
                      {c.card ? <p className="small grey">{L(phoById(c.card.pho).ten)}</p> : <p className="small grey">{L({ vi: 'Đang đối chiếu với bộ 30 quân', en: 'Being matched to the 30-card deck' })}</p>}
                      {c.card?.tenKhac.map((a) => (
                        <p key={a.ten} className="xsmall grey">{L({ vi: 'Tên gọi khác:', en: 'Also called:' })} {a.ten}{a.nguon ? <> ({L({ vi: 'nguồn', en: 'source' })} <SourceRef code={a.nguon} />)</> : null}</p>
                      ))}
                      <p className="xsmall grey"><strong>{L({ vi: 'Phiên bản bộ bài:', en: 'Deck version:' })}</strong> {L({ vi: 'bộ bài thực hành được lựa chọn', en: 'the chosen practice deck' })}</p>
                    </div>
                  </div>
                ))}
                {v.caBo ? <p className="body">{L({ vi: 'Video giới thiệu toàn bộ 30 quân.', en: 'This video introduces all 30 cards.' })} <Link to="/quan-bai">{L({ vi: 'Xem bộ 30 quân →', en: 'See the 30 cards →' })}</Link></p> : null}
              </Panel>
            ) : null}

            {v.lanDieu.length || graphics.length ? (
              <Panel title={L({ vi: 'LÀN ĐIỆU VÀ HÌNH ĐỒ HỌA', en: 'MELODY AND GRAPHICS' })} nen="var(--xanh-dam)" chu="var(--xanh-nhat)">
                {v.lanDieu.length ? (
                  <>
                    <p className="small grey">{L({ vi: 'Làn điệu', en: 'Melody' })}</p>
                    <p className="melody">{v.lanDieu.map((d) => <Link key={d} to={`/video?lan-dieu=${slugify(d)}`}>{d}</Link>)}</p>
                  </>
                ) : null}
                {graphics.length ? (
                  <>
                    <p className="small grey">{L({ vi: 'Hình đồ họa dùng trong video', en: 'Graphics used in this video' })}</p>
                    {graphics.map((g) => (
                      <Link key={g.id} to={`/do-hoa?xem=${g.id}`} className="mini-graphic">
                        <Placeholder src={graphicMedia(g.id).img} label={g.id} ratio="64 / 44" className="mini-graphic-img" />
                        <span>{L(g.ten)}</span>
                      </Link>
                    ))}
                  </>
                ) : null}
              </Panel>
            ) : null}

            <Panel title={L({ vi: 'NGUỒN TƯ LIỆU', en: 'SOURCES' })} nen="var(--burgundy)" chu="var(--vang)">
              {sources.length ? (
                <ul className="src-list">
                  {sources.map((s) => <li key={s.ma}><SourceRef code={s.ma} className="strong" /> · {L(s.loai)}, {L(s.ngan)}</li>)}
                </ul>
              ) : <p className="small grey">{L({ vi: 'Mã nguồn của video này đang được cập nhật.', en: 'Source codes for this video are being added.' })}</p>}
              <Link to="/nguon" className="link-arrow">{L({ vi: 'Tra cứu nguồn tư liệu →', en: 'All source codes →' })}</Link>
            </Panel>

            {v.chuDe !== 'TQ' ? (
              <div className="teach-box">
                <h2 className="h3">{L({ vi: 'Tài nguyên hỗ trợ giảng dạy', en: 'Teaching resources' })}</h2>
                <p className="small">{L({ vi: 'Tài liệu tải về phục vụ chuẩn bị tiết dạy:', en: 'Files to prepare a lesson:' })}</p>
                <div className="stack-actions">
                  {cards.filter((c) => c.card).map((c) => (
                    <DownloadLink key={c.ten} href={cardMedia(c.card.slug).in}>{L({ vi: `Bản in quân ${c.ten} khổ A4`, en: `A4 print of ${c.ten}` })}</DownloadLink>
                  ))}
                  {graphics.slice(0, 2).map((g) => (
                    <DownloadLink key={g.id} href={graphicMedia(g.id).goc}>{L({ vi: `Tải hình đồ họa ${g.id}`, en: `Download graphic ${g.id}` })}</DownloadLink>
                  ))}
                  <DownloadLink href={MEDIA.downloads.lessons[v.chuDe]} variant="dark">{L({ vi: `Giáo án chủ đề ${v.chuDe}`, en: `Lesson plan for ${v.chuDe}` })}</DownloadLink>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}

