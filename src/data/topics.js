// Tám chủ đề và video tổng quan. Màu nền/chữ lấy đúng bảng NEN/CHU của bản thiết kế.
// `moTaNgan` dùng ở thẻ chủ đề trang chủ, `moTa` dùng ở trang Tám chủ đề, `tenNgan` dùng trong bộ lọc.

export const TOPICS = [
  {
    id: 'M1', nen: 'var(--vang)', chu: 'var(--burgundy)', doHoa: ['IG01', 'IG02', 'IG03'],
    ten: { vi: 'Tổng quan về Bài Chòi', en: 'Bài Chòi at a glance' },
    tenNgan: { vi: 'Tổng quan về Bài Chòi', en: 'Overview' },
    moTaNgan: { vi: 'Khái niệm, nguồn gốc và giá trị di sản của nghệ thuật Bài Chòi.', en: 'What Bài Chòi is, where it comes from and why it is heritage.' },
    moTa: { vi: 'Các thành phần, lịch sử hình thành và trách nhiệm bảo tồn, trao truyền Bài Chòi sau ghi danh.', en: 'Its components, how it took shape, and the duty to safeguard and pass it on after inscription.' },
  },
  {
    id: 'M2', nen: 'var(--vang)', chu: 'var(--burgundy)', doHoa: ['IG04'],
    ten: { vi: 'Bài Chòi trong không gian văn hóa Hội An', en: 'Bài Chòi in the cultural life of Hội An' },
    tenNgan: { vi: 'Không gian văn hóa Hội An', en: 'Hội An cultural space' },
    moTaNgan: { vi: 'Mối liên hệ giữa hội Bài Chòi với đời sống phố cổ, làng xã và lễ hội.', en: 'How the game lives in the old town, the villages and the festivals.' },
    moTa: { vi: 'Hội Bài Chòi trong ký ức cộng đồng, không gian văn hóa và đời sống người dân Hội An.', en: 'Bài Chòi in community memory, in its cultural spaces and in the daily life of Hội An people.' },
  },
  {
    id: 'M3', nen: 'var(--nau)', chu: 'var(--dao)', doHoa: ['IG05', 'IG06'],
    ten: { vi: 'Bộ bài và cách chơi', en: 'The deck and how to play' },
    tenNgan: { vi: 'Bộ bài và cách chơi', en: 'Deck and play' },
    moTaNgan: { vi: 'Hệ thống 30 quân thuộc 3 pho và trình tự tổ chức hội chơi.', en: 'Thirty cards in three suits, and the order of a game.' },
    moTa: { vi: 'Nhận diện hình và tên của 30 quân bài; trình tự lượt chơi và quy trình xác nhận kết quả.', en: 'Recognising the pictures and names of the 30 cards; the order of a round and how a win is confirmed.' },
  },
  {
    id: 'M4', nen: 'var(--xanh-dam)', chu: 'var(--xanh-nhat)', doHoa: ['IG07'],
    ten: { vi: 'Làn điệu, nhạc cụ và nhịp điệu', en: 'Melodies, instruments and rhythm' },
    tenNgan: { vi: 'Làn điệu, nhạc cụ, nhịp điệu', en: 'Melodies and instruments' },
    moTaNgan: { vi: 'Các làn điệu, nhạc cụ và tín hiệu phối hợp trong thực hành Bài Chòi.', en: 'The melodies, instruments and cues used in a game.' },
    moTa: { vi: 'Các video thị phạm làn điệu qua từng quân bài, hướng dẫn hô hát và giới thiệu nhạc cụ, tín hiệu phối hợp trong hội chơi.', en: 'Demonstrations of each melody on a single card, guidance on calling and singing, and the instruments and cues of a game.' },
  },
  {
    id: 'M5', nen: 'var(--xanh-dam)', chu: 'var(--xanh-nhat)', doHoa: ['IG08'],
    ten: { vi: 'Câu hô thai và nghệ thuật lời ca', en: 'Riddle verses and the art of the lyric' },
    tenNgan: { vi: 'Câu hô thai và lời ca', en: 'Verses and lyrics' },
    moTaNgan: { vi: 'Cấu trúc câu thai và nghệ thuật gợi dẫn tên quân bài qua lời hô.', en: 'How a verse is built to lead players to the name of the card.' },
    moTa: { vi: 'Cấu trúc lời hô, nguồn gốc lời ca và 10 mẫu lời được ghi nhận cho người lớn và học sinh.', en: 'How a call is structured, where the lyrics come from, and 10 recorded verses for adults and pupils.' },
  },
  {
    id: 'M6', nen: 'var(--kem)', chu: 'var(--burgundy)', doHoa: ['IG06', 'IG09'],
    ten: { vi: 'Kỹ năng anh hiệu và chị hiệu', en: 'The skills of the callers' },
    tenNgan: { vi: 'Kỹ năng anh hiệu, chị hiệu', en: 'Caller skills' },
    moTaNgan: { vi: 'Kỹ năng giọng hát, nhịp điệu, điều hành hội chơi và ứng biến của người hiệu.', en: 'Voice, rhythm, running the game and improvising.' },
    moTa: { vi: 'Kỹ năng phối hợp giữa người hiệu, lấy hơi, nhả chữ và xử lý các tình huống trong hội chơi.', en: 'How callers work together, breathe, articulate and handle what happens during a game.' },
  },
  {
    id: 'M7', nen: 'var(--kem)', chu: 'var(--burgundy)', doHoa: ['IG06', 'IG10'],
    ten: { vi: 'Tổ chức và thực hành hội Bài Chòi', en: 'Organising a Bài Chòi game' },
    tenNgan: { vi: 'Tổ chức và thực hành hội', en: 'Organising a game' },
    moTaNgan: { vi: 'Không gian, nhân sự, đạo cụ và quy trình tổ chức hội Bài Chòi.', en: 'Space, people, props and the running order of a game.' },
    moTa: { vi: 'Hướng dẫn bố trí không gian, chuẩn bị dụng cụ, phân công vai trò và tổ chức hội Bài Chòi từ khai hội đến kết hội.', en: 'Laying out the space, preparing the props, assigning roles and running a game from opening to close.' },
  },
  {
    id: 'M8', nen: 'var(--burgundy)', chu: 'var(--vang)', doHoa: ['IG03', 'IG09', 'IG10'],
    ten: { vi: 'Bảo tồn, trao truyền và vận dụng', en: 'Safeguarding, transmission and use' },
    tenNgan: { vi: 'Bảo tồn và vận dụng', en: 'Safeguarding' },
    moTaNgan: { vi: 'Vai trò của người thực hành, phương thức trao truyền và ứng dụng trong giáo dục.', en: 'The role of practitioners, ways of passing it on, and use in education.' },
    moTa: { vi: 'Truyền dạy trong nhà trường, mối liên hệ với sinh kế và du lịch văn hóa, cùng định hướng bảo tồn nghề tại Hội An.', en: 'Teaching in schools, links to livelihoods and cultural tourism, and the direction of safeguarding in Hội An.' },
  },
];

// Video tổng quan (V36) có màu riêng: đỏ nền, chữ trắng.
export const OVERVIEW = {
  id: 'TQ', nen: 'var(--do)', chu: 'var(--trang)',
  ten: { vi: 'Video tổng quan', en: 'Overview' },
  tenNgan: { vi: 'Video tổng quan', en: 'Overview' },
};

export const topicById = (id) => TOPICS.find((t) => t.id === id) || (id === 'TQ' ? OVERVIEW : null);
