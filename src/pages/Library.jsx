import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { VIDEOS } from '../data/videos.js';
import { applyFilters, countIf, FILTER_KEYS, filterOptions, SORTS } from '../data/derive.js';
import { useLang } from '../i18n.jsx';
import { useIsPhone, usePageTitle } from '../lib/hooks.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import Reveal from '../components/Reveal.jsx';
import VideoCard from '../components/VideoCard.jsx';

const AXES = {
  'chu-de': { vi: 'Tiêu chí 1 · Chủ đề', en: 'Filter 1 · Topic', chip: { vi: 'Chủ đề', en: 'Topic' } },
  nguoi: { vi: 'Tiêu chí 2 · Người thực hành', en: 'Filter 2 · Practitioner', chip: { vi: 'Người', en: 'Person' } },
  quan: { vi: 'Tiêu chí 3 · Quân bài', en: 'Filter 3 · Card', chip: { vi: 'Quân', en: 'Card' } },
  'lan-dieu': { vi: 'Tiêu chí 4 · Làn điệu', en: 'Filter 4 · Melody', chip: { vi: 'Làn điệu', en: 'Melody' } },
};

const NOTES = {
  nguoi: { vi: 'Tên người tham gia được thống nhất theo hồ sơ đối chiếu. Danh hiệu và chức vụ được công bố khi có căn cứ xác nhận.', en: 'Names follow the verified record. Titles are shown only when confirmed.' },
  quan: { vi: 'Bộ lọc hiển thị các quân bài có trong video.', en: 'Only cards that appear in a video are listed.' },
};

function FilterGroups({ filters, set, compact }) {
  const { L } = useLang();
  return FILTER_KEYS.map((key) => {
    const list = key === 'chu-de';
    return (
      <div className="fgroup" key={key} id={`loc-${key}`}>
        <h2 className="fgroup-h">{L(AXES[key])}</h2>
        <div className={list ? 'fopts-list' : 'fopts-wrap'}>
          {filterOptions[key].map((o) => {
            const on = filters[key] === o.value;
            const n = on ? applyFilters(filters).length : countIf(filters, key, o.value);
            return (
              <button
                key={o.value}
                type="button"
                className={`fopt ${on ? 'is-on' : ''} ${!n ? 'is-zero' : ''}`}
                aria-pressed={on}
                disabled={!n && !on}
                onClick={() => set(key, on ? null : o.value)}
              >
                <span>{o.prefix ? `${o.prefix} · ` : ''}{L(o.label)}</span>
                <span className="fopt-n">{n}</span>
              </button>
            );
          })}
        </div>
        {NOTES[key] && !compact ? (
          <p className="fgroup-note">
            {L(NOTES[key])}
            {key === 'quan' ? <> <Link to="/quan-bai">{L({ vi: 'Xem bộ 30 quân bài →', en: 'See all 30 cards →' })}</Link></> : null}
          </p>
        ) : null}
      </div>
    );
  });
}

export default function Library() {
  const { L, lang } = useLang();
  const phone = useIsPhone();
  const [params, setParams] = useSearchParams();
  const [sheet, setSheet] = useState(false);
  usePageTitle(L({ vi: 'Thư viện video', en: 'Video library' }));

  const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k)]));
  const sort = SORTS[params.get('sap-xep')] ? params.get('sap-xep') : 'ma';
  const active = FILTER_KEYS.filter((k) => filters[k]);
  const results = useMemo(() => applyFilters(filters).sort(SORTS[sort]), [params.toString()]); // eslint-disable-line react-hooks/exhaustive-deps

  // lối vào "Theo làn điệu" ở trang chủ: mở thẳng nhóm lọc làn điệu
  const openGroup = params.get('mo');
  useEffect(() => {
    if (!openGroup) return;
    if (phone) setSheet(true);
    else setTimeout(() => document.getElementById(`loc-${openGroup}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    const next = new URLSearchParams(params);
    next.delete('mo');
    setParams(next, { replace: true });
  }, [openGroup]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key, val) => {
    const next = new URLSearchParams(params);
    if (val) next.set(key, val); else next.delete(key);
    setParams(next, { replace: false, preventScrollReset: true });
  };
  const clear = () => {
    const next = new URLSearchParams();
    if (sort !== 'ma') next.set('sap-xep', sort);
    setParams(next);
  };
  const dropLast = () => set(active[active.length - 1], null);

  const label = (k) => {
    const o = filterOptions[k].find((x) => x.value === filters[k]);
    return o ? `${o.prefix ? `${o.prefix} · ` : ''}${L(o.label)}` : filters[k];
  };

  // video gợi ý khi không còn kết quả: bỏ tiêu chí cuối cùng
  const fallback = active.length ? applyFilters({ ...filters, [active[active.length - 1]]: null }).slice(0, 3) : [];

  useEffect(() => {
    if (!sheet) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [sheet]);

  return (
    <>
      <section className="band band-kem page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: L({ vi: 'Thư viện video', en: 'Video library' }) }]} />
          <Reveal as="h1" className="h1">{L({ vi: `Thư viện ${VIDEOS.length} video`, en: `Library of ${VIDEOS.length} videos` })}</Reveal>
          <Reveal as="p" i={1} className="lead measure">
            {L({
              vi: 'Tra cứu 36 video theo 4 tiêu chí: chủ đề, người thực hành, quân bài và làn điệu. Có thể kết hợp các bộ lọc hoặc xóa bộ lọc để hiển thị toàn bộ thư viện.',
              en: 'Search the 36 videos by four filters: topic, practitioner, card and melody. Combine them, or clear them to see the whole library.',
            })}
          </Reveal>
        </div>
      </section>

      <section className="band band-trang">
        <div className="wrap lib">
          {/* cột lọc: dính khi cuộn trên máy tính */}
          <aside className="lib-filters hide-phone" aria-label={L({ vi: 'Bộ lọc', en: 'Filters' })}>
            <div className="fpanel">
              <div className="fpanel-head">
                <span>{L({ vi: 'BỘ LỌC', en: 'FILTERS' })}</span>
                {active.length ? <button type="button" onClick={clear}>{L({ vi: 'Xóa bộ lọc', en: 'Clear filters' })}</button> : null}
              </div>
              <FilterGroups filters={filters} set={set} />
            </div>
          </aside>

          <div className="lib-main">
            {/* điện thoại: nút mở bảng lọc + hàng chip cuộn ngang */}
            <div className="lib-phonebar show-phone">
              <button type="button" className="btn btn-dark" onClick={() => setSheet(true)} aria-haspopup="dialog">
                {L({ vi: 'Bộ lọc', en: 'Filters' })}{active.length ? ` (${active.length})` : ''}
              </button>
              <label className="sort sort-compact">
                <span className="sr-only">{L({ vi: 'Sắp xếp theo', en: 'Sort by' })}</span>
                <select value={sort} onChange={(e) => set('sap-xep', e.target.value === 'ma' ? null : e.target.value)}>
                  <option value="ma">{L({ vi: 'Thứ tự mã', en: 'By code' })}</option>
                  <option value="chu-de">{L({ vi: 'Theo chủ đề', en: 'By topic' })}</option>
                  <option value="ngan-truoc">{L({ vi: 'Ngắn trước', en: 'Shortest first' })}</option>
                </select>
              </label>
            </div>

            <div className="lib-bar">
              <p className="lib-count" aria-live="polite">
                <strong>{results.length}</strong> video{lang === 'en' && results.length !== 1 ? 's' : ''}{' '}
                <span>{active.length ? L({ vi: '· đang lọc', en: '· filtered' }) : L({ vi: '· chưa lọc, hiện đủ bộ', en: '· showing everything' })}</span>
              </p>
              <label className="sort hide-phone">
                <span>{L({ vi: 'Sắp xếp theo', en: 'Sort by' })}</span>
                <select value={sort} onChange={(e) => set('sap-xep', e.target.value === 'ma' ? null : e.target.value)}>
                  <option value="ma">{L({ vi: 'Thứ tự mã video', en: 'Video code' })}</option>
                  <option value="chu-de">{L({ vi: 'Theo chủ đề', en: 'Topic' })}</option>
                  <option value="ngan-truoc">{L({ vi: 'Thời lượng ngắn trước', en: 'Shortest first' })}</option>
                </select>
              </label>
            </div>

            <AnimatePresence initial={false}>
              {active.length ? (
                <motion.ul className="chips" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  {active.map((k) => (
                    <li key={k}>
                      <button type="button" className="chip" onClick={() => set(k, null)} aria-label={`${L({ vi: 'Bỏ lọc', en: 'Remove filter' })} ${L(AXES[k].chip)}: ${label(k)}`}>
                        <span className="chip-k">{L(AXES[k].chip)}</span> {label(k)} <span aria-hidden="true">×</span>
                      </button>
                    </li>
                  ))}
                  <li><button type="button" className="chip-clear" onClick={clear}>{L({ vi: 'Xóa bộ lọc', en: 'Clear filters' })}</button></li>
                </motion.ul>
              ) : null}
            </AnimatePresence>

            {results.length ? (
              <LayoutGroup>
                <div className="vgrid">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {results.map((v) => <VideoCard key={v.id} v={v} layout />)}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            ) : (
              <div className="empty">
                <p className="h3">{L({ vi: 'Không có video nào khớp cả các tiêu chí đang chọn', en: 'No video matches all the filters you chose' })}</p>
                <p className="body">{L({ vi: 'Bỏ tiêu chí vừa chọn rồi lọc lại, hoặc xem cả thư viện.', en: 'Remove the last filter, or see the whole library.' })}</p>
                <div className="empty-actions">
                  <button type="button" className="btn btn-dark" onClick={dropLast}>{L({ vi: 'Bỏ tiêu chí cuối', en: 'Remove last filter' })}</button>
                  <button type="button" className="btn btn-outline" onClick={clear}>{L({ vi: 'Xem cả 36 video', en: 'See all 36 videos' })}</button>
                </div>
                {fallback.length ? (
                  <>
                    <p className="empty-sub">{L({ vi: 'Gần với điều bạn tìm:', en: 'Close to what you looked for:' })}</p>
                    <div className="vgrid">{fallback.map((v) => <VideoCard key={v.id} v={v} />)}</div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* bảng lọc trượt từ dưới lên trên điện thoại */}
      <AnimatePresence>
        {sheet ? (
          <>
            <motion.div className="sheet-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)} />
            <motion.div
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={L({ vi: 'Bộ lọc', en: 'Filters' })}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="sheet-head">
                <span>{L({ vi: 'Bộ lọc', en: 'Filters' })}</span>
                {active.length ? <button type="button" onClick={clear}>{L({ vi: 'Xóa bộ lọc', en: 'Clear' })}</button> : null}
                <button type="button" className="icon-btn" onClick={() => setSheet(false)} aria-label={L({ vi: 'Đóng', en: 'Close' })} autoFocus>✕</button>
              </div>
              <div className="sheet-body"><FilterGroups filters={filters} set={set} compact /></div>
              <div className="sheet-foot">
                <button type="button" className="btn btn-dark btn-block" onClick={() => setSheet(false)}>
                  {L({ vi: `Xem ${results.length} video`, en: `Show ${results.length} video${results.length === 1 ? '' : 's'}` })}
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
