// Mọi con số và liên kết chéo được tính ở đây từ dữ liệu gốc, để các trang không bao giờ lệch nhau.

import { VIDEOS, LAN_DIEU, videoById } from './videos.js';
import { TOPICS } from './topics.js';
import { CARDS, cardSlugForName } from './cards.js';
import { PEOPLE, personByName } from './people.js';
import { SOURCES } from './sources.js';
import { GRAPHICS } from './graphics.js';
import { slugify } from '../lib/text.js';

export const videosOfTopic = (id) => VIDEOS.filter((v) => v.chuDe === id);
export const topicCount = (id) => videosOfTopic(id).length;

export const videosOfPerson = (ten) => VIDEOS.filter((v) => v.nguoi.includes(ten));

// Video gắn riêng một quân (không tính V09 vì V09 nói về cả bộ).
export const videosOfCard = (slug) => VIDEOS.filter((v) => v.quan.some((q) => cardSlugForName(q) === slug));
export const deckVideos = () => VIDEOS.filter((v) => v.caBo);

export const sourcesOfVideo = (id) => SOURCES.filter((s) => s.dungTrong.includes(id));
export const graphicsOfVideo = (id) => GRAPHICS.filter((g) => g.videos.includes(id));

export const cardsOfVideo = (v) =>
  v.quan.map((q) => {
    const slug = cardSlugForName(q);
    return { ten: q, card: slug ? CARDS.find((c) => c.slug === slug) : null };
  });

export const peopleOfVideo = (v) => v.nguoi.map((ten) => personByName(ten) || { id: slugify(ten), ten, vaiTro: null });

// Trước / sau trong cùng chủ đề, theo thứ tự mã.
export function neighbours(id) {
  const v = videoById(id);
  if (!v) return {};
  const list = v.chuDe === 'TQ' ? VIDEOS : videosOfTopic(v.chuDe);
  const i = list.findIndex((x) => x.id === id);
  return { prev: list[i - 1] || null, next: list[i + 1] || null, index: i + 1, total: list.length };
}

// Video liên quan: cùng chủ đề trước, rồi cùng người thực hành, tối đa 4.
export function related(id, n = 4) {
  const v = videoById(id);
  if (!v) return [];
  const seen = new Set([id]);
  const out = [];
  const push = (x) => { if (!seen.has(x.id) && out.length < n) { seen.add(x.id); out.push(x); } };
  videosOfTopic(v.chuDe).forEach(push);
  VIDEOS.filter((x) => x.nguoi.some((p) => v.nguoi.includes(p))).forEach(push);
  return out;
}

// --- Bộ lọc thư viện ---------------------------------------------------------

export const FILTER_KEYS = ['chu-de', 'nguoi', 'quan', 'lan-dieu'];

export const filterOptions = {
  'chu-de': TOPICS.map((t) => ({ value: t.id, label: t.tenNgan, prefix: t.id })),
  nguoi: PEOPLE.filter((p) => videosOfPerson(p.ten).length).map((p) => ({ value: p.id, label: p.ten })),
  quan: [...new Set(VIDEOS.flatMap((v) => v.quan))].map((q) => ({ value: slugify(q), label: q })),
  'lan-dieu': LAN_DIEU.map((d) => ({ value: slugify(d), label: d })),
};

const matchers = {
  'chu-de': (v, val) => v.chuDe === val,
  nguoi: (v, val) => v.nguoi.some((n) => slugify(n) === val),
  quan: (v, val) => v.quan.some((q) => slugify(q) === val),
  'lan-dieu': (v, val) => v.lanDieu.some((d) => slugify(d) === val),
};

export function applyFilters(filters, list = VIDEOS) {
  return list.filter((v) => FILTER_KEYS.every((k) => !filters[k] || matchers[k](v, filters[k])));
}

// Số kết quả sẽ còn lại nếu chọn `val` ở trục `key`, giữ nguyên các trục khác.
export function countIf(filters, key, val) {
  return applyFilters({ ...filters, [key]: val }).length;
}

export const SORTS = {
  ma: (a, b) => a.id.localeCompare(b.id),
  'ngan-truoc': (a, b) => a.phut - b.phut || a.id.localeCompare(b.id),
  'chu-de': (a, b) => a.chuDe.localeCompare(b.chuDe) || a.id.localeCompare(b.id),
};

// --- Số liệu tổng -----------------------------------------------------------
export const STATS = {
  videos: VIDEOS.length,
  cards: CARDS.length,
  graphics: GRAPHICS.length,
  sources: 36,
};
