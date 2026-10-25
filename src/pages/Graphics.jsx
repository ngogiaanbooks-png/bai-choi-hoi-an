import { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GRAPHICS } from '../data/graphics.js';
import { graphicMedia, MEDIA } from '../data/media.js';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import { compactCodes } from '../lib/text.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import Placeholder from '../components/Placeholder.jsx';
import DownloadLink from '../components/DownloadLink.jsx';
import Lightbox from '../components/Lightbox.jsx';

export default function Graphics() {
  const { L, lang } = useLang();
  const [params, setParams] = useSearchParams();
  usePageTitle(L({ vi: 'Đồ họa thông tin', en: 'Information graphics' }));
  const open = GRAPHICS.findIndex((g) => g.id === params.get('xem'));

  const setOpen = useCallback((i) => {
    const next = new URLSearchParams(params);
    if (i == null) next.delete('xem'); else next.set('xem', GRAPHICS[i].id);
    setParams(next, { replace: i != null && open >= 0, preventScrollReset: true });
  }, [params, setParams, open]);

  return (
    <>
      <section className="band band-kem page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: L({ vi: 'Hình đồ họa thông tin', en: 'Information graphics' }) }]} />
          <Reveal as="h1" className="h1">{L({ vi: `${GRAPHICS.length} đồ họa thông tin`, en: `${GRAPHICS.length} information graphics` })}</Reveal>
          <Reveal as="p" i={1} className="lead measure">{L({ vi: 'Bộ 10 đồ họa thông tin hệ thống hóa các nội dung trọng tâm và được sử dụng trong nhiều video. Tệp gốc phục vụ trình chiếu và in khổ lớn.', en: 'Ten graphics that set out the key ideas and appear across many videos. Originals are for projection and large prints.' })}</Reveal>
          <Reveal as="p" i={2} className="small grey measure">{L({ vi: 'Mỗi đồ họa có nguồn dẫn và phân biệt dữ kiện với nhận định, diễn giải của người cung cấp thông tin.', en: 'Each graphic is sourced and separates facts from the opinions of those interviewed.' })}</Reveal>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          <div className="graphic-grid">
            {GRAPHICS.map((g, i) => (
              <Reveal as="article" key={g.id} i={i % 2} className="gcard">
                <button type="button" className="gcard-img" onClick={() => setOpen(i)} aria-label={`${L({ vi: 'Xem kích thước lớn', en: 'View large' })}: ${g.id} ${L(g.ten)}`}>
                  <Placeholder src={graphicMedia(g.id).img} label={g.id} ratio="4 / 3" />
                  <span className="gcard-zoom" aria-hidden="true">+</span>
                </button>
                <div className="gcard-body">
                  <p className="gcard-meta"><strong>{g.id}</strong><span>{g.videos.length} video{lang === 'en' && g.videos.length !== 1 ? 's' : ''}</span></p>
                  <h2 className="h3">{L(g.ten)}</h2>
                  <p className="body grey">{L(g.moTa)}</p>
                  <p className="small grey">
                    {L({ vi: 'Video sử dụng đồ họa:', en: 'Used in:' })}{' '}
                    {compactCodes(g.videos).map((c, j) => {
                      const [a, b] = c.split(' – ');
                      return (
                        <span key={c}>
                          {j ? ', ' : ''}
                          <Link to={`/video/${a}`}>{a}</Link>
                          {b ? <> – <Link to={`/video/${b}`}>{b}</Link></> : null}
                        </span>
                      );
                    })}
                  </p>
                  <div className="gcard-actions">
                    <button type="button" className="btn btn-dark" onClick={() => setOpen(i)}>{L({ vi: 'Xem kích thước lớn', en: 'View large' })}</button>
                    <DownloadLink href={graphicMedia(g.id).goc}>{L({ vi: 'Tải bản gốc', en: 'Download original' })}</DownloadLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-xanh">
        <div className="wrap split split-cta">
          <div>
            <Reveal as="h2" className="h2 on-green">{L({ vi: 'Tra cứu đồ họa trên thiết bị di động', en: 'Reading graphics on a phone' })}</Reveal>
            <Reveal as="p" i={1} className="body on-dark measure">{L({ vi: 'Đồ họa hỗ trợ xem toàn màn hình và phóng to trên thiết bị di động, thuận tiện cho việc tra cứu nội dung và chuẩn bị tài liệu giảng dạy.', en: 'Graphics open full screen and can be pinched to zoom on a phone, for quick reference and lesson preparation.' })}</Reveal>
          </div>
          <Reveal i={2}><DownloadLink href={MEDIA.downloads.graphicsAll} variant="yellow" className="btn-lg">{L({ vi: 'Tải bộ 10 đồ họa', en: 'Download all 10 graphics' })}</DownloadLink></Reveal>
        </div>
      </section>

      <AnimatePresence>
        {open >= 0 ? <Lightbox items={GRAPHICS} index={open} onIndex={setOpen} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </>
  );
}
