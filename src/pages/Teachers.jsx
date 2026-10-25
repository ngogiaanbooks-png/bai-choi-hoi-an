import { Link } from 'react-router-dom';
import { LESSONS, PRINTS, CLIPS, KIT } from '../data/lessons.js';
import { topicById } from '../data/topics.js';
import { videoById } from '../data/videos.js';
import { MEDIA } from '../data/media.js';
import { topicCount } from '../data/derive.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { scrollToId, usePageTitle, useScrollSpy } from '../lib/hooks.js';
import { videoCountWord } from '../lib/words.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import DownloadLink from '../components/DownloadLink.jsx';

const SECTIONS = [
  { id: 'giao-an', ten: { vi: 'Tám giáo án theo chủ đề', en: 'Eight lesson plans' } },
  { id: 'ban-in', ten: { vi: 'Tài liệu in phục vụ giảng dạy', en: 'Printouts for class' } },
  { id: 'trich-doan', ten: { vi: 'Trích đoạn ngắn dùng trên lớp', en: 'Short clips for class' } },
  { id: 'tai-bo', ten: { vi: 'Tải bộ học liệu', en: 'Download the full kit' } },
];

const time = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const printKey = { 'cards-a4': 'cardsPrint', 'graphics-print': 'graphicsAll', 'verses-a4': 'versesPrint' };

export default function Teachers() {
  const { L, lang } = useLang();
  const active = useScrollSpy(SECTIONS.map((s) => s.id), 200);
  usePageTitle(L({ vi: 'Dành cho giáo viên', en: 'For teachers' }));

  return (
    <>
      <section className="band band-kem page-head">
        <div className="wrap split split-head">
          <div>
            <Breadcrumbs items={[{ label: L({ vi: 'Dành cho giáo viên', en: 'For teachers' }) }]} />
            <Reveal as="h1" className="h1">{L({ vi: 'Học liệu hỗ trợ giảng dạy Bài Chòi', en: 'Teaching resources for Bài Chòi' })}</Reveal>
            <Reveal as="p" i={1} className="lead measure">{L({ vi: 'Tài nguyên gồm 8 giáo án theo chủ đề, bộ 30 quân bài bản in, 10 đồ họa thông tin và danh mục trích đoạn video. Giáo viên có thể tải tài liệu phục vụ giảng dạy mà không cần đăng ký tài khoản.', en: 'Eight lesson plans, the 30 cards to print, 10 graphics and a list of video clips. Download everything without an account.' })}</Reveal>
          </div>
          <Reveal i={2}>
            <button type="button" className="btn btn-dark btn-lg" onClick={() => scrollToId('tai-bo')}>{L({ vi: 'Tải bộ học liệu ↓', en: 'Download the kit ↓' })}</button>
          </Reveal>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap with-toc">
          {/* mục lục dính bên trái, tô mục đang đọc */}
          <aside className="toc-side">
            <nav aria-label={L({ vi: 'Trong mục này', en: 'On this page' })}>
              <p className="label-h">{L({ vi: 'Trong mục này', en: 'On this page' })}</p>
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined} onClick={(e) => { e.preventDefault(); scrollToId(s.id); }}>
                      {L(s.ten)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="toc-note hide-phone">
              <p className="label-h">{L({ vi: 'Về việc đánh giá', en: 'About assessment' })}</p>
              <p className="small grey">{L({ vi: 'Nội dung đánh giá được tích hợp trong giáo án để giáo viên lựa chọn và điều chỉnh phù hợp với lớp học. Website không triển khai kiểm tra hoặc chấm điểm trực tuyến.', en: 'Assessment is built into the lesson plans for teachers to adapt. The website has no online tests or grading.' })}</p>
            </div>
          </aside>

          <div className="toc-main">
            <section id="giao-an" className="tsec">
              <Reveal as="h2" className="h2">{L(SECTIONS[0].ten)}</Reveal>
              <Reveal as="p" i={1} className="body grey measure">{L({ vi: 'Mỗi giáo án tương ứng với một chủ đề, xác định mục tiêu, video tham khảo, tài liệu in và tiến trình tổ chức hoạt động. Giáo án phục vụ tiết học 45 phút hoặc hoạt động trải nghiệm.', en: 'One plan per topic, with goals, reference videos, printouts and a running order, for a 45-minute lesson or a hands-on session.' })}</Reveal>
              <div className="lesson-grid">
                {LESSONS.map((l, i) => {
                  const t = topicById(l.chuDe);
                  return (
                    <Reveal as="article" key={l.chuDe} i={i % 4} className="lesson" style={{ '--nen': t.nen, '--chu': t.chu }}>
                      <div className="lesson-band">{L({ vi: 'GIÁO ÁN', en: 'LESSON' })} {l.chuDe}</div>
                      <div className="lesson-body">
                        <h3 className="h3"><Link to={`/chu-de?muc=${l.chuDe.toLowerCase()}`}>{L(t.ten)}</Link></h3>
                        <p className="small grey">{videoCountWord(topicCount(l.chuDe), lang).replace(/^./, (c) => c.toUpperCase())} · {t.doHoa.join(', ')} · {L(l.ghiChu)}</p>
                        <DownloadLink href={MEDIA.downloads.lessons[l.chuDe]} variant="dark">{L({ vi: 'Tải giáo án', en: 'Download plan' })}</DownloadLink>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            <section id="ban-in" className="tsec">
              <Reveal as="h2" className="h2">{L(SECTIONS[1].ten)}</Reveal>
              <Reveal as="p" i={1} className="body grey measure">{L({ vi: 'Tài liệu được chuẩn bị cho máy in thông dụng, hỗ trợ in đen trắng trên giấy A4.', en: 'Prepared for ordinary printers, in black and white on A4.' })}</Reveal>
              <ul className="prints">
                {PRINTS.map((p, i) => (
                  <Reveal as="li" key={p.id} i={i} className="print">
                    <div>
                      <h3 className="h3">{L(p.ten)}</h3>
                      <p className="body grey">{L(p.moTa)}</p>
                    </div>
                    <p className="print-meta">{p.khoGiay}{p.soTrang ? ` · ${p.soTrang} ${L({ vi: 'trang', en: 'pages' })}` : ''}</p>
                    <DownloadLink href={MEDIA.downloads[printKey[p.id]]}>{L(S.download)}</DownloadLink>
                  </Reveal>
                ))}
              </ul>
            </section>

            <section id="trich-doan" className="tsec">
              <Reveal as="h2" className="h2">{L(SECTIONS[2].ten)}</Reveal>
              <Reveal as="p" i={1} className="body grey measure">{L({ vi: 'Danh mục trích đoạn ngắn hỗ trợ lựa chọn nội dung trình chiếu tại lớp. Mỗi mục liên kết đến mốc thời gian tương ứng trong video gốc.', en: 'Short clips to show in class. Each opens the original video at the right moment.' })}</Reveal>
              <div className="table-wrap">
                <table className="clips">
                  <thead>
                    <tr>
                      <th scope="col">{L({ vi: 'Video', en: 'Video' })}</th>
                      <th scope="col">{L({ vi: 'Trích đoạn', en: 'Clip' })}</th>
                      <th scope="col">{L({ vi: 'Mốc', en: 'Time' })}</th>
                      <th scope="col">{L({ vi: 'Dùng để', en: 'Use it to' })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLIPS.map((c) => (
                      <tr key={c.video}>
                        <td><Link to={`/video/${c.video}`} className="strong">{c.video}</Link></td>
                        <td>
                          <Link to={c.tu != null ? `/video/${c.video}?t=${c.tu}` : `/video/${c.video}`}>{L(c.noiDung)}</Link>
                          <span className="xsmall grey block">{L(videoById(c.video).tieuDe)}</span>
                        </td>
                        <td className="nowrap">{c.tu != null ? <Link to={`/video/${c.video}?t=${c.tu}`}>{time(c.tu)} – {time(c.den)}</Link> : <span className="grey">{L(S.updating)}</span>}</td>
                        <td>{L(c.dungDe)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="tai-bo" className="tsec kit">
              <Reveal as="h2" className="h2 on-dark">{L(SECTIONS[3].ten)}</Reveal>
              <Reveal as="p" i={1} className="body on-dark measure">{L({ vi: 'Tệp nén gồm 8 giáo án, bộ 30 quân bài bản in, 10 đồ họa thông tin và danh mục trích đoạn, phục vụ sử dụng ngoại tuyến.', en: 'One archive with the 8 plans, the 30-card printout, 10 graphics and the clip list, for offline use.' })}</Reveal>
              <Reveal i={2} className="kit-row">
                <DownloadLink href={MEDIA.downloads.kit} variant="yellow" className="btn-lg">{L({ vi: 'Tải bộ học liệu', en: 'Download the kit' })}</DownloadLink>
                <span className="small on-dark-note">
                  {KIT.dungLuong || L({ vi: 'Dung lượng đang cập nhật', en: 'Size to be confirmed' })} · {L({ vi: 'cập nhật', en: 'updated' })} {KIT.capNhat || L({ vi: 'sắp có', en: 'soon' })}
                </span>
              </Reveal>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
