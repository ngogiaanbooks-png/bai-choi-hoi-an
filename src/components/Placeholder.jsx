import { asset } from '../data/media.js';

// Khung chờ media: đúng tỷ lệ, màu nền theo thiết kế, nhãn ngắn. Có `src` thì hiện ảnh thật.
export default function Placeholder({ src, alt = '', label, ratio = '16 / 9', tone = 'kem', className = '', loading = 'lazy', children }) {
  const url = asset(src);
  return (
    <div className={`ph ph-${tone} ${className}`} style={{ aspectRatio: ratio }}>
      {url ? (
        <img src={url} alt={alt} loading={loading} decoding="async" />
      ) : (
        <span className="ph-label" aria-hidden="true">{label}</span>
      )}
      {children}
    </div>
  );
}
