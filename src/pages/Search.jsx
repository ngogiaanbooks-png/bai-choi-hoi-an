import { Link, useSearchParams } from 'react-router-dom';
import { useLang } from '../i18n.jsx';
import { usePageTitle } from '../lib/hooks.js';
import { search, TYPE_LABEL } from '../lib/search.js';
import Breadcrumbs from '../components/Breadcrumbs.jsx';
import SearchBox from '../components/SearchBox.jsx';

const ORDER = ['video', 'card', 'melody', 'topic', 'graphic', 'person', 'source'];

export default function Search() {
  const { L } = useLang();
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const results = search(q);
  usePageTitle(L({ vi: 'Tìm kiếm', en: 'Search' }));
  const groups = ORDER.map((type) => [type, results.filter((r) => r.type === type)]).filter(([, l]) => l.length);

  return (
    <>
      <section className="band band-kem page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: L({ vi: 'Tìm kiếm', en: 'Search' }) }]} />
          <h1 className="h1">{q ? <>{L({ vi: 'Kết quả cho', en: 'Results for' })} “{q}”</> : L({ vi: 'Tìm trong học liệu', en: 'Search the materials' })}</h1>
          <p className="lead" aria-live="polite">
            {q ? L({ vi: `${results.length} kết quả`, en: `${results.length} result${results.length === 1 ? '' : 's'}` }) : L({ vi: 'Gõ có dấu hay không dấu đều được.', en: 'Type with or without Vietnamese accents.' })}
          </p>
          <div className="search-page-box"><SearchBox id="q-page" /></div>
        </div>
      </section>
      <section className="band band-trang">
        <div className="wrap section section-tight-top">
          {groups.length ? groups.map(([type, list]) => (
            <div key={type} className="sgroup">
              <h2 className="h3">{L(TYPE_LABEL[type])} <span className="grey">({list.length})</span></h2>
              <ul className="slist">
                {list.map((r) => (
                  <li key={r.id}>
                    <Link to={r.to}>
                      <span className="slist-title">{L(r.title)}</span>
                      {r.sub ? <span className="small grey">{L(r.sub)}</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )) : q ? (
            <div className="empty">
              <p className="h3">{L({ vi: 'Không tìm thấy kết quả', en: 'Nothing found' })}</p>
              <p className="body">{L({ vi: 'Thử một từ ngắn hơn, hoặc duyệt theo cách khác:', en: 'Try a shorter word, or browse instead:' })}</p>
              <div className="empty-actions">
                <Link to="/chu-de" className="btn btn-outline">{L({ vi: 'Tám chủ đề', en: 'Eight topics' })}</Link>
                <Link to="/video" className="btn btn-outline">{L({ vi: 'Thư viện video', en: 'Video library' })}</Link>
                <Link to="/quan-bai" className="btn btn-outline">{L({ vi: 'Bộ thẻ bài', en: 'The cards' })}</Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
