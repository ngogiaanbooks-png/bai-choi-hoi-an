// BẢNG MEDIA: nơi duy nhất cần sửa khi có tệp thật.
// Để null thì website hiện khung chờ đúng tỷ lệ (ảnh) hoặc nút "Sắp có" (tệp tải).
// Đường dẫn tương đối tính từ thư mục public/, ví dụ 'assets/media/video/V15.mp4'.
//
// Ví dụ khi có tệp:
//   videos: { V15: { poster: 'assets/media/poster/V15.jpg', src: 'assets/media/video/V15.mp4',
//                    vtt: { vi: 'assets/media/sub/V15.vi.vtt', en: 'assets/media/sub/V15.en.vtt' },
//                    tai: 'assets/media/tai/V15.zip' } }

export const MEDIA = {
  videos: {},
  // Hình quân: a = đầy đủ có tên, b = không nền, in = bản in A4 riêng quân này
  cards: {},
  // Đồ họa: img = ảnh xem trên web, goc = tệp gốc tải về
  graphics: {},
  people: {},
  downloads: {
    cardsA: null,
    cardsB: null,
    cardsPrint: null,
    graphicsAll: null,
    versesPrint: null,
    kit: null,
    lessons: {}, // M1..M8
  },
};

const empty = {};
export const videoMedia = (id) => MEDIA.videos[id] || empty;
export const cardMedia = (slug) => MEDIA.cards[slug] || empty;
export const graphicMedia = (id) => MEDIA.graphics[id] || empty;
export const personMedia = (id) => MEDIA.people[id] || empty;
export const asset = (p) => (p ? (/^(https?:)?\/\//.test(p) ? p : `./${p.replace(/^\.?\//, '')}`) : null);
