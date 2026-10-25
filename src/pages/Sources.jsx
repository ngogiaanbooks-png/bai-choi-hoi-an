import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SOURCES, SOURCE_GROUPS, SOURCE_STATS } from '../data/sources.js';
import { PEOPLE, TOTAL_PARTICIPANTS } from '../data/people.js';
import { videosOfPerson } from '../data/derive.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';
import { scrollToId, usePageTitle } from '../lib/hooks.js';
import { compactCodes } from '../lib/text.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import CountUp from '../components/CountUp.jsx';
import PersonTile from '../components/PersonTile.jsx';

// Địa chỉ nhận tư liệu: khách cần cung cấp. Để null thì nút hiện "Sắp có".
const CONTACT_EMAIL = null;

const CREDITS = [
  { k: { vi: 'Chủ trì', en: 'Led by' }, v: S.org },
  { k: { vi: 'Thực hiện', en: 'Produced by' }, v: S.maker },
  { k: { vi: 'Cố vấn chuyên môn', en: 'Expert advisers' }, v: null },
  { k: { vi: 'Nhận diện và mỹ thuật', en: 'Identity and art direction' }, v: { vi: 'Studio Alt', en: 'Studio Alt' } },
  { k: { vi: 'Đơn vị tài trợ', en: 'Sponsors' }, v: null },
  { k: { vi: 'Hiện vật cho mượn', en: 'Objects on loan' }, v: null },
];

export default function Sources() {
  const { L, lang } = useLang();
  const [params] = useSearchParams();
  const [flash, setFlash] = useState(null);
  usePageTitle(L({ vi: 'Nguồn tư liệu và ghi công', en: 'Sources and credits' }));

  // đến từ một mã nguồn ở trang khác: cuộn tới dòng đó và tô sáng 2 giây
  const ma = params.get('ma');
  useEffect(() => {
    if (!ma) return undefined;
    const t1 = setTimeout(() => { scrollToId(ma === 'nguoi' ? 'nguoi' : `src-${ma}`); setFlash(ma); }, 250);
    const t2 = setTimeout(() => setFlash(null), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ma]);

  const rows = SOURCES.filter((s) => s.moTa);

  return (
    <>
      <section className="band band-burgundy page-head">
        <div className="wrap">
          <Breadcrumbs tone="on-burgundy" items={[{ label: L({ vi: 'Nguồn tư liệu và ghi công', en: 'Sources and credits' }) }]} />
          <Reveal as="h1" className="h1 on-dark">{L({ vi: 'Nguồn tư liệu và ghi công', en: 'Sources and credits' })}</Reveal>
          <Reveal as="p" i={1} className="lead on-dark measure">{L({ vi: 'Hệ thống nguồn tư liệu cung cấp căn cứ tham chiếu cho nội dung video, xác định người cung cấp thông tin và ghi nhận đóng góp của các cá nhân, đơn vị tham gia xây dựng học liệu.', en: 'The source system backs every video with references, names who gave the information, and credits everyone who helped build the materials.' })}</Reveal>
          <div className="src-stats">
            {SOURCE_STATS.map((s, i) => (
              <Reveal key={i} i={i + 2} className="src-stat">
                <CountUp to={s.so} className="stat-n stat-n-yellow" />
                <span className="small on-dark">{L(s.nhan)}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap detail">
          <div className="detail-main">
            <Reveal as="h2" className="h2">{L({ vi: 'Hệ mã nguồn', en: 'Source codes' })}</Reveal>
            <Reveal as="p" i={1} className="body grey measure">{L({ vi: 'Mã nguồn được hiển thị cùng video và đồ họa, liên kết đến thông tin buổi ghi hình hoặc tài liệu tham chiếu tương ứng.', en: 'Codes appear with each video and graphic and point to the recording session or document behind it.' })}</Reveal>
            <div className="table-wrap">
              <table className="src-table">
                <thead>
                  <tr>
                    <th scope="col">{L({ vi: 'Mã', en: 'Code' })}</th>
                    <th scope="col">{L({ vi: 'Loại', en: 'Type' })}</th>
                    <th scope="col">{L({ vi: 'Mô tả', en: 'Description' })}</th>
                    <th scope="col">{L({ vi: 'Dùng trong', en: 'Used in' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((s) => (
                    <tr key={s.ma} id={`src-${s.ma}`} className={flash === s.ma ? 'is-flash' : ''}>
                      <th scope="row">{s.ma}</th>
                      <td className="nowrap">{L(s.loai)}</td>
                      <td>{L(s.moTa)}</td>
                      <td>
                        {compactCodes(s.dungTrong).map((c, j) => {
                          const [a, b] = c.split(' – ');
                          return <span key={c}>{j ? ', ' : ''}<Link to={`/video/${a}`}>{a}</Link>{b ? <> – <Link to={`/video/${b}`}>{b}</Link></> : null}</span>;
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <aside className="detail-side">
            <div className="panel">
              <div className="panel-head" style={{ background: 'var(--burgundy)', color: 'var(--vang)' }}>{L({ vi: 'BA NHÓM MÃ', en: 'THREE GROUPS OF CODES' })}</div>
              <div className="panel-body">
                {SOURCE_GROUPS.map((g, i) => (
                  <div key={i} className="group-row">
                    <p className="strong">{L(g.ma)}</p>
                    <p className="small grey">{L(g.moTa)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="note-box note-box-tight">
              <h3 className="h3">{L({ vi: 'Thông tin về dị bản', en: 'About variants' })}</h3>
              <p className="small grey">
                {L({ vi: 'Các khác biệt về tên quân, mốc thời gian và cách diễn giải được ghi nhận kèm nguồn đối chiếu. Xem thêm ', en: 'Differences in card names, dates and interpretation are recorded with their sources. See ' })}
                <Link to="/video/V10">V10</Link> {L({ vi: 'và', en: 'and' })} <Link to="/video/V03">V03</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="band band-trang" id="nguoi">
        <div className="wrap section section-tight-top">
          <Reveal as="h2" className="h2">{L({ vi: 'Người thực hành trong học liệu', en: 'Practitioners in the materials' })}</Reveal>
          <Reveal as="p" i={1} className="body grey measure">{L({ vi: `Hồ sơ ghi nhận ${TOTAL_PARTICIPANTS} người tham gia ghi hình, gồm nghệ nhân, nhạc công, nhà nghiên cứu, giáo viên, thành viên câu lạc bộ và người học. Chọn tên để tra cứu các video liên quan.`, en: `${TOTAL_PARTICIPANTS} people were recorded: artists, musicians, researchers, teachers, club members and learners. Choose a name to see their videos.` })}</Reveal>
          <div className={`people-grid people-grid-wide ${ma === 'nguoi' && flash ? 'is-flash' : ''}`}>
            {PEOPLE.map((p, i) => (
              <Reveal key={p.id} i={i % 4}><PersonTile person={p} count={videosOfPerson(p.ten).length} /></Reveal>
            ))}
          </div>
          <p className="small grey measure">{L({ vi: 'Tên người tham gia được thống nhất trong toàn bộ học liệu. Danh hiệu và chức vụ chỉ được công bố khi có căn cứ xác nhận. Năm sinh và thông tin liên hệ được lưu trong hồ sơ nội bộ.', en: 'Names are consistent throughout. Titles are shown only when confirmed. Birth years and contact details stay in the internal record.' })}</p>
        </div>
      </section>

      <section className="band band-kem">
        <div className="wrap section">
          <Reveal as="h2" className="h2">{L({ vi: 'Ghi công', en: 'Credits' })}</Reveal>
          <dl className="credits">
            {CREDITS.map((c, i) => (
              <Reveal key={i} i={i % 3} className="credit">
                <dt className="eyebrow eyebrow-grey">{L(c.k)}</dt>
                <dd className={c.v ? 'body' : 'body grey'}>{c.v ? L(c.v) : L({ vi: 'Đang cập nhật theo hồ sơ', en: 'Being confirmed' })}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap split split-two">
          <div>
            <Reveal as="h2" className="h2 h2-sm">{L({ vi: 'Hướng dẫn sử dụng và trích dẫn', en: 'Using and citing' })}</Reveal>
            <Reveal as="p" i={1} className="body measure">{L({ vi: 'Video, hình quân bài, đồ họa và tài liệu in được sử dụng cho mục đích học tập, giảng dạy và nghiên cứu với điều kiện ghi nguồn. Khi trích dẫn video, cần ghi mã video và tên người thực hành trong trích đoạn.', en: 'Videos, card images, graphics and printouts may be used for learning, teaching and research with credit. When citing a video, give its code and the practitioners in the clip.' })}</Reveal>
            <Reveal as="p" i={2} className="body measure">{L({ vi: 'Việc sử dụng cho mục đích thương mại phải có văn bản chấp thuận của Trung tâm. Hình quân bài phải giữ nguyên mỹ thuật gốc, không thay đổi màu sắc hoặc ghép hình với tên của quân khác.', en: 'Commercial use needs written permission from the Centre. Card images must keep their original artwork, colours, and names.' })}</Reveal>
          </div>
          <Reveal i={1} className="contribute">
            <h2 className="h3">{L({ vi: 'Đóng góp tư liệu và dị bản', en: 'Contribute material or a variant' })}</h2>
            <p className="body grey">{L({ vi: 'Thông tin bổ sung về lời hô, tên quân và mốc thời gian có thể gửi về Trung tâm để đối chiếu và cập nhật hồ sơ tư liệu.', en: 'Additional verses, card names and dates can be sent to the Centre to be checked and added to the record.' })}</p>
            {CONTACT_EMAIL ? (
              <a className="btn btn-dark" href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(lang === 'en' ? 'Bài Chòi materials: contribution' : 'Học liệu Bài Chòi: góp tư liệu')}`}>{L({ vi: 'Gửi tư liệu', en: 'Send material' })}</a>
            ) : (
              <span className="btn btn-dark is-soon" aria-disabled="true" title={L(S.soonHint)}>{L({ vi: 'Gửi tư liệu', en: 'Send material' })}<span className="btn-meta">{L(S.soon)}</span></span>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
