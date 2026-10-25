// Tìm kiếm trên trình duyệt, không phân biệt dấu: video, quân bài, đồ họa, người, mã nguồn.

import { VIDEOS, LAN_DIEU } from '../data/videos.js';
import { CARDS, phoById } from '../data/cards.js';
import { GRAPHICS } from '../data/graphics.js';
import { PEOPLE } from '../data/people.js';
import { SOURCES } from '../data/sources.js';
import { TOPICS } from '../data/topics.js';
import { fold, slugify } from './text.js';

const both = (o) => (o ? `${o.vi ?? ''} ${o.en ?? ''}` : '');

const INDEX = [
  ...VIDEOS.map((v) => ({
    type: 'video', id: v.id, to: `/video/${v.id}`, title: v.tieuDe, sub: v.id,
    text: fold(`${v.id} ${both(v.tieuDe)} ${v.nguoi.join(' ')} ${v.quan.join(' ')} ${v.lanDieu.join(' ')} ${both(v.moTa)}`),
  })),
  ...CARDS.filter((c) => c.trangThai === 'xac-nhan').map((c) => ({
    type: 'card', id: c.slug, to: `/quan-bai/${c.slug}`, title: { vi: c.ten, en: c.ten }, sub: phoById(c.pho).ten,
    text: fold(`${c.ten} ${c.tenKhac.map((a) => a.ten).join(' ')} ${both(phoById(c.pho).ten)}`),
  })),
  ...LAN_DIEU.map((d) => ({
    type: 'melody', id: d, to: `/video?lan-dieu=${slugify(d)}`, title: { vi: `Làn điệu ${d}`, en: `Melody: ${d}` }, sub: null,
    text: fold(`${d} lan dieu melody`),
  })),
  ...TOPICS.map((t) => ({
    type: 'topic', id: t.id, to: `/chu-de?muc=${t.id.toLowerCase()}`, title: t.ten, sub: t.id,
    text: fold(`${t.id} ${both(t.ten)} ${both(t.moTa)}`),
  })),
  ...GRAPHICS.map((g) => ({
    type: 'graphic', id: g.id, to: `/do-hoa?xem=${g.id}`, title: g.ten, sub: g.id,
    text: fold(`${g.id} ${both(g.ten)} ${both(g.moTa)}`),
  })),
  ...PEOPLE.map((p) => ({
    type: 'person', id: p.id, to: `/video?nguoi=${p.id}`, title: { vi: p.ten, en: p.ten }, sub: p.vaiTro,
    text: fold(`${p.ten} ${both(p.vaiTro)}`),
  })),
  ...SOURCES.filter((s) => s.moTa).map((s) => ({
    type: 'source', id: s.ma, to: `/nguon?ma=${s.ma}`, title: { vi: s.ma, en: s.ma }, sub: s.loai,
    text: fold(`${s.ma} ${both(s.loai)} ${both(s.moTa)}`),
  })),
];

export const TYPE_LABEL = {
  video: { vi: 'Video', en: 'Videos' },
  card: { vi: 'Quân bài', en: 'Cards' },
  melody: { vi: 'Làn điệu', en: 'Melodies' },
  topic: { vi: 'Chủ đề', en: 'Topics' },
  graphic: { vi: 'Đồ họa', en: 'Graphics' },
  person: { vi: 'Người thực hành', en: 'Practitioners' },
  source: { vi: 'Nguồn tư liệu', en: 'Sources' },
};

export function search(q, limit = Infinity) {
  const words = fold(q).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored = [];
  for (const item of INDEX) {
    // mỗi từ gõ vào phải khớp đầu một chữ, tránh "gi" khớp nhầm "giao"
    if (!words.every((w) => ` ${item.text}`.includes(` ${w}`))) continue;
    const titleText = fold(both(item.title));
    const score = (fold(item.id) === words.join(' ') ? 0 : 10) + (words.every((w) => titleText.includes(w)) ? 0 : 5);
    scored.push({ ...item, score });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.slice(0, limit);
}
