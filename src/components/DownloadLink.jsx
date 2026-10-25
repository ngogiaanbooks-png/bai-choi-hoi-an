import { asset } from '../data/media.js';
import { S } from '../data/strings.js';
import { useLang } from '../i18n.jsx';

// Nút tải: có tệp thì là link tải thật; chưa có thì là nút vô hiệu "Sắp có", có giải thích.
export default function DownloadLink({ href, children, variant = 'outline', className = '', meta }) {
  const { L } = useLang();
  const url = asset(href);
  const cls = `btn btn-${variant} ${className}`;
  if (url) {
    return (
      <a className={cls} href={url} download>
        {children}
        {meta ? <span className="btn-meta">{meta}</span> : null}
      </a>
    );
  }
  return (
    <span className={`${cls} is-soon`} role="link" aria-disabled="true" title={L(S.soonHint)}>
      {children}
      <span className="btn-meta">{L(S.soon)}</span>
    </span>
  );
}
