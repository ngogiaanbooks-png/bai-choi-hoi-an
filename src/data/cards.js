// Bộ 30 quân, ba pho, mỗi pho mười quân, theo bảng BO trong khung "Bộ ba mươi thẻ bài".
// Năm quân pho Vạn chưa có tên trong tư liệu đã đối chiếu: trangThai 'cho' và không có trang riêng.

import { slugify } from '../lib/text.js';

export const PHO = [
  { id: 'van', ten: { vi: 'Pho Văn', en: 'Văn suit' } },
  { id: 'van2', ten: { vi: 'Pho Vạn', en: 'Vạn suit' } },
  { id: 'sach', ten: { vi: 'Pho Sách', en: 'Sách suit' } },
];

const NAMES = {
  van: ['Ông Ầm', 'Tráng Hai', 'Ba Bụng', 'Tứ Tượng', 'Ngũ Ruột', 'Sáu Mập', 'Bảy Liễu', 'Tám Miếng', 'Chín Cu', 'Chín Gối'],
  van2: ['Bạch Huê', 'Nhứt Trò', 'Nhì Bí', 'Tam Quăng', 'Tứ Móc', null, null, null, null, null],
  sach: ['Nhứt Nọc', 'Nhì Nghèo', 'Ba Gà', 'Tứ Xách', 'Ngũ Dụm', 'Lục Hột', 'Bảy Thưa', 'Tám Dừng', 'Cửu Điều', 'Tử Cẳng'],
};

// Tên gọi khác có nguồn dẫn. Chỉ công bố tên đã có mã nguồn.
const ALIASES = {
  'chin-goi': [{ ten: 'Gối', nguon: 'PV05' }],
  'nhut-tro': [{ ten: 'Trò', nguon: null }],
};

export const CARDS = Object.entries(NAMES).flatMap(([pho, names]) =>
  names.map((ten, i) => ({
    slug: ten ? slugify(ten) : `${pho}-${i + 1}`,
    ten,
    pho,
    thuTu: i + 1,
    trangThai: ten ? 'xac-nhan' : 'cho',
    tenKhac: (ten && ALIASES[slugify(ten)]) || [],
  })),
);

// Tên quân như được gọi trong video -> slug quân trong bộ 30 (chỉ những tên đã khớp được).
const VIDEO_NAME = Object.fromEntries(
  CARDS.flatMap((c) => [[c.ten, c.slug], ...c.tenKhac.map((a) => [a.ten, c.slug])]).filter(([k]) => k),
);
export const cardSlugForName = (name) => VIDEO_NAME[name] || null;

export const cardBySlug = (slug) => CARDS.find((c) => c.slug === slug && c.trangThai === 'xac-nhan');
export const phoById = (id) => PHO.find((p) => p.id === id);
