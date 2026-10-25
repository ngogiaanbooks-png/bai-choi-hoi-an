import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { CARDS, PHO } from '../data/cards.js';
import { MEDIA } from '../data/media.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import CardTile from '../components/CardTile.jsx';
import DownloadLink from '../components/DownloadLink.jsx';

const VERSIONS = [
  { k: 'BẢN A', href: () => MEDIA.downloads.cardsA, ten: { vi: 'Bản đầy đủ có tên', en: 'Full, with name' }, moTa: { vi: 'Hình quân bài kèm tên, giữ màu sắc bản gốc; phù hợp với trình chiếu và in màu.', en: 'Card picture with its name in the original colours; for projection and colour print.' }, nut: { vi: 'Tải cả bộ bản A', en: 'Download set A' } },
  { k: 'BẢN B', href: () => MEDIA.downloads.cardsB, ten: { vi: 'Bản không nền', en: 'Transparent background' }, moTa: { vi: 'Hình quân bài có nền trong suốt, phục vụ biên soạn bài giảng và ấn phẩm.', en: 'Card picture on a transparent background, for slides and publications.' }, nut: { vi: 'Tải cả bộ bản B', en: 'Download set B' } },
  { k: 'BẢN C', href: () => MEDIA.downloads.cardsPrint, ten: { vi: 'Bản in đen trắng A4', en: 'Black and white A4' }, moTa: { vi: 'Bộ 30 quân được dàn trang khổ A4, phù hợp với máy in thông dụng và hoạt động thực hành tại lớp.', en: 'All 30 cards laid out on A4, for an ordinary printer and class activities.' }, nut: { vi: 'Tải bản in A4', en: 'Download A4 print' } },
];

export default function Cards() {
  const { L } = useLang();
  const [params, setParams] = useSearchParams();
  const pho = PHO.some((p) => p.id === params.get('pho')) ? params.get('pho') : null;
  const list = CARDS.filter((c) => !pho || c.pho === pho);
  usePageTitle(L({ vi: 'Bộ 30 quân bài', en: 'The 30 cards' }));

  const choose = (id) => {
    const next = new URLSearchParams(params);
    if (id) next.set('pho', id); else next.delete('pho');
    setParams(next, { preventScrollReset: true });
  };

  return (
    <>
      <section className="band band-nau page-head">
        <div className="wrap split split-head">
          <div>
            <Breadcrumbs tone="on-brown" items={[{ label: L({ vi: 'Bộ thẻ bài', en: 'The cards' }) }]} />
            <Reveal as="h1" className="h1 on-dark">{L({ vi: 'Bộ 30 quân bài', en: 'The 30 cards' })}</Reveal>
            <Reveal as="p" i={1} className="lead on-dark measure">
              {L({ vi: 'Bộ bài gồm 3 pho, mỗi pho 10 quân. Mỗi trang quân bài cung cấp hình ảnh, tên gọi khác, câu hô mẫu và video liên quan, kèm tệp in khổ A4 phục vụ giảng dạy.', en: 'Three suits of ten cards. Each card page has its picture, other names, a sample verse and related videos, with an A4 file for class.' })}
            </Reveal>
          </div>
          <Reveal i={2} className="deck-version">
            <p className="eyebrow eyebrow-peach">{L({ vi: 'Phiên bản bộ bài', en: 'Deck version' })}</p>
            <p className="small on-dark">{L({ vi: 'Bộ bài thực hành sử dụng trong ghi hình, được số hóa từ bảng ảnh 30 quân.', en: 'The practice deck used in the recordings, digitised from a photo sheet of all 30 cards.' })}</p>
          </Reveal>
        </div>
      </section>

      {/* chọn pho: dính dưới header */}
      <div className="pho-bar">
        <div className="wrap pho-row">
          <div className="seg" role="group" aria-label={L({ vi: 'Lọc theo pho', en: 'Filter by suit' })}>
            {[{ id: null, ten: { vi: 'Cả ba pho', en: 'All suits' } }, ...PHO].map((p) => (
              <button key={p.id || 'all'} type="button" className={pho === p.id ? 'is-on' : ''} aria-pressed={pho === p.id} onClick={() => choose(p.id)}>
                {L(p.ten)}
              </button>
            ))}
          </div>
          <p className="pho-count" aria-live="polite">{L({ vi: 'Đang hiển thị', en: 'Showing' })} <strong>{list.length}</strong> {L({ vi: 'quân', en: 'cards' })}</p>
          <span className="hide-phone">
            <DownloadLink href={MEDIA.downloads.cardsPrint}>{L({ vi: 'Tải bản in A4 cả ba mươi quân', en: 'Download all 30 on A4' })}</DownloadLink>
          </span>
        </div>
      </div>

      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          <LayoutGroup>
            <div className="card-grid">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((c) => <CardTile key={c.slug} card={c} />)}
              </AnimatePresence>
            </div>
          </LayoutGroup>

          <div className="note-box">
            <h2 className="h3">{L({ vi: 'Về tên quân và dị bản', en: 'About card names and variants' })}</h2>
            <p className="body measure">{L({ vi: 'Tên quân bài có thể khác nhau theo vùng và nguồn tư liệu. Hình ảnh và tên gọi trên website được đối chiếu với bộ bài sử dụng trong ghi hình, kèm thông tin phiên bản. Tên gọi khác chỉ được công bố khi có nguồn dẫn; hình ảnh và tên quân phải thuộc cùng một bộ bài.', en: 'Card names vary by region and source. Pictures and names here are checked against the deck used in the recordings. Other names are only shown with a source, and picture and name always come from the same deck.' })}</p>
            <p className="body measure">
              {L({ vi: 'Nội dung giải thích tên quân được trình bày trong ', en: 'Card names are explained in ' })}
              <Link to="/video/V10">V10 — {L({ vi: 'Tên quân dị bản và giới hạn giải thích', en: 'Variant card names and the limits of explanation' })}</Link>
              {L({ vi: ', phù hợp với mức độ xác thực của tư liệu.', en: ', as far as the sources allow.' })}
            </p>
          </div>
        </div>
      </section>

      <section className="band band-kem">
        <div className="wrap section">
          <Reveal as="h2" className="h2">{L({ vi: 'Ba phiên bản tệp cho mỗi quân', en: 'Three file versions for every card' })}</Reveal>
          <Reveal as="p" i={1} className="body measure">{L({ vi: 'Các phiên bản phục vụ trình chiếu, biên soạn bài giảng và in tài liệu cho học sinh.', en: 'For projecting, preparing lessons and printing for pupils.' })}</Reveal>
          <div className="versions">
            {VERSIONS.map((x, i) => (
              <Reveal key={x.k} i={i + 2} className="version">
                <p className="eyebrow eyebrow-red">{x.k}</p>
                <h3 className="h3">{L(x.ten)}</h3>
                <p className="body grey">{L(x.moTa)}</p>
                <DownloadLink href={x.href()} variant="dark">{L(x.nut)}</DownloadLink>
              </Reveal>
            ))}
          </div>
          <p className="small grey">{L({ vi: 'Hình quân bài thuộc hồ sơ dự án. Được sử dụng cho học tập, giảng dạy và nghiên cứu với điều kiện ghi nguồn.', en: 'Card images belong to the project archive. Free for learning, teaching and research, with credit.' })}</p>
        </div>
      </section>
    </>
  );
}
