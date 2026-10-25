import { Link, useLocation } from 'react-router-dom';
import { FOOTER_LINKS, S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';

// Chân trang burgundy như thiết kế. Danh sách liên kết tự bỏ trang đang xem.
export default function Footer() {
  const { L } = useLang();
  const { pathname } = useLocation();
  const links = FOOTER_LINKS.filter((l) => !pathname.startsWith(l.to)).slice(0, 4);
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <div className="footer-about">
          <img src="./assets/logo-trang.svg" alt="Bài Chòi Hội An" width="123" height="56" loading="lazy" />
          <p>{L(S.footerAbout)}</p>
        </div>
        <div>
          <p className="footer-h">{L(S.footerMade)}</p>
          <p>{L(S.org)}</p>
          <p>{L(S.maker)}</p>
        </div>
        <div>
          <p className="footer-h">{L(S.footerLinks)}</p>
          <nav aria-label={L(S.footNav)} className="footer-nav">
            {links.map((l) => <Link key={l.to} to={l.to}>{L(l.label)}</Link>)}
          </nav>
        </div>
      </div>
      <div className="wrap footer-legal">
        <p>{L(S.footerLegal)}</p>
      </div>
    </footer>
  );
}
