// Chuỗi giao diện dùng chung. Chữ riêng của từng trang nằm ngay trong trang đó.

export const NAV = [
  { to: '/chu-de', label: { vi: 'Tám chủ đề', en: 'Eight topics' } },
  { to: '/video', label: { vi: 'Thư viện video', en: 'Video library' } },
  { to: '/quan-bai', label: { vi: 'Bộ thẻ bài', en: 'The cards' } },
  { to: '/do-hoa', label: { vi: 'Hình đồ họa', en: 'Graphics' } },
  { to: '/giao-vien', label: { vi: 'Dành cho giáo viên', en: 'For teachers' } },
  { to: '/nguon', label: { vi: 'Nguồn tư liệu', en: 'Sources' } },
];

export const FOOTER_LINKS = [
  { to: '/chu-de', label: { vi: 'Tám chủ đề', en: 'Eight topics' } },
  { to: '/video', label: { vi: 'Thư viện video', en: 'Video library' } },
  { to: '/quan-bai', label: { vi: 'Bộ thẻ bài', en: 'The cards' } },
  { to: '/giao-vien', label: { vi: 'Dành cho giáo viên', en: 'For teachers' } },
  { to: '/nguon', label: { vi: 'Nguồn tư liệu và ghi công', en: 'Sources and credits' } },
];

export const S = {
  siteName: { vi: 'Bài Chòi Hội An', en: 'Bài Chòi Hội An' },
  siteTitle: { vi: 'Học liệu Bài Chòi Hội An', en: 'Bài Chòi Hội An learning materials' },
  org: { vi: 'Trung tâm Bảo tồn Di sản Văn hóa Thế giới Hội An', en: 'Hội An Centre for Cultural Heritage Management and Conservation' },
  maker: { vi: 'Công ty TNHH MTV Cuộc Sống Hội An', en: 'Cuộc Sống Hội An Co., Ltd.' },
  home: { vi: 'Trang chủ', en: 'Home' },
  skip: { vi: 'Bỏ qua, tới nội dung chính', en: 'Skip to main content' },
  search: { vi: 'Tìm trong học liệu', en: 'Search the materials' },
  searchPh: { vi: 'Tìm video, quân bài, làn điệu', en: 'Search videos, cards, melodies' },
  searchBtn: { vi: 'Tìm', en: 'Search' },
  menu: { vi: 'Mở danh mục', en: 'Open menu' },
  close: { vi: 'Đóng', en: 'Close' },
  mainNav: { vi: 'Điều hướng chính', en: 'Main navigation' },
  footNav: { vi: 'Điều hướng chân trang', en: 'Footer navigation' },
  crumbs: { vi: 'Đường dẫn', en: 'Breadcrumb' },
  langSwitch: { vi: 'Chuyển sang tiếng Anh', en: 'Switch to Vietnamese' },
  footerAbout: {
    vi: 'Bộ học liệu điện tử truyền dạy nghệ thuật Bài Chòi Hội An. Học liệu được sử dụng cho mục đích học tập, giảng dạy và nghiên cứu với điều kiện ghi nguồn.',
    en: 'Digital learning materials for teaching the art of Bài Chòi in Hội An. Free to use for learning, teaching and research, with credit.',
  },
  footerMade: { vi: 'Chủ trì và thực hiện', en: 'Led and produced by' },
  footerLinks: { vi: 'Liên kết', en: 'Links' },
  footerLegal: {
    vi: '© 2026 Trung tâm Bảo tồn Di sản Văn hóa Thế giới Hội An. Hình quân bài và tư liệu điền dã thuộc hồ sơ dự án; mọi trích dẫn xin dẫn nguồn theo mã ghi tại mục Nguồn tư liệu.',
    en: '© 2026 Hội An Centre for Cultural Heritage Management and Conservation. Card images and field records belong to the project archive; please cite by the codes listed under Sources.',
  },
  video: { vi: 'video', en: 'videos' },
  minutes: { vi: 'phút', en: 'min' },
  card: { vi: 'Quân', en: 'Card' },
  soon: { vi: 'Sắp có', en: 'Coming soon' },
  soonHint: { vi: 'Tệp đang được hoàn thiện và sẽ có sớm.', en: 'The file is being finalised and will be available soon.' },
  updating: { vi: 'Đang cập nhật', en: 'Being updated' },
  download: { vi: 'Tải', en: 'Download' },
  noVideoYet: { vi: 'Chưa có video liên quan', en: 'No related video yet' },
  pending: { vi: 'Chờ đối chiếu', en: 'Awaiting verification' },
  pendingHint: { vi: 'Quân này chưa có tên trong tư liệu đã đối chiếu.', en: 'This card has no name in the verified sources yet.' },
  viewAll: { vi: 'Xem tất cả', en: 'View all' },
  notFound: { vi: 'Không tìm thấy trang', en: 'Page not found' },
};

// "4 video" / "4 videos"; chữ số theo bản biên tập (36 video, 30 quân).
export const countLabel = (n, lang, vi = 'video', en = n === 1 ? 'video' : 'videos') => `${n} ${lang === 'en' ? en : vi}`;
