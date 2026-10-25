// Học liệu dành cho giáo viên: 8 giáo án, tài liệu in, trích đoạn và gói tải.
// Số video và mã đồ họa của mỗi giáo án được lấy từ chủ đề tương ứng (derive.js).

export const LESSONS = [
  { chuDe: 'M1', ghiChu: { vi: 'không cần bản in', en: 'no printouts needed' } },
  { chuDe: 'M2', ghiChu: { vi: 'bản đồ không gian hội chơi', en: 'map of game spaces' } },
  { chuDe: 'M3', ghiChu: { vi: 'cần bản in ba mươi quân', en: 'needs the 30-card printout' } },
  { chuDe: 'M4', ghiChu: { vi: 'cần thiết bị âm thanh phù hợp', en: 'needs suitable sound equipment' } },
  { chuDe: 'M5', ghiChu: { vi: 'bản in mười mẫu lời hô', en: 'printout of the ten verses' } },
  { chuDe: 'M6', ghiChu: { vi: 'cần không gian thực hành', en: 'needs room to practise' } },
  { chuDe: 'M7', ghiChu: { vi: 'dành cho buổi trải nghiệm', en: 'for a hands-on session' } },
  { chuDe: 'M8', ghiChu: { vi: 'gợi ý hoạt động ngoại khóa', en: 'ideas for outside class' } },
];

export const PRINTS = [
  {
    id: 'cards-a4',
    ten: { vi: 'Bộ 30 quân bài đen trắng', en: 'The 30 cards in black and white' },
    moTa: { vi: 'Bộ bài được dàn trang khổ A4, thuận tiện cho cắt rời và tổ chức thực hành tại lớp.', en: 'Laid out on A4, easy to cut out and use in class.' },
    khoGiay: 'A4', soTrang: null,
  },
  {
    id: 'graphics-print',
    ten: { vi: '10 đồ họa thông tin', en: 'The 10 information graphics' },
    moTa: { vi: 'Tệp in khổ A4 và A3 được thiết kế để bảo đảm khả năng đọc khi in đen trắng.', en: 'A4 and A3 files that stay readable in black and white.' },
    khoGiay: 'A4 · A3', soTrang: null,
  },
  {
    id: 'verses-a4',
    ten: { vi: 'Bảng mười mẫu lời hô', en: 'The ten verses' },
    moTa: { vi: 'Sáu mẫu cho người lớn và bốn mẫu dùng trong truyền dạy cho học sinh, kèm nguồn.', en: 'Six for adults and four for teaching pupils, with sources.' },
    khoGiay: 'A4', soTrang: null,
  },
];

// Mốc tính bằng giây; null = chưa có mốc.
export const CLIPS = [
  { video: 'V01', tu: 20, den: 80, noiDung: { vi: 'Đỗ Linh giới thiệu các hoạt động trong Bài Chòi', en: 'Đỗ Linh introduces what happens in Bài Chòi' }, dungDe: { vi: 'Mở đầu tiết học, đặt câu hỏi cho lớp', en: 'Open the lesson with a question for the class' } },
  { video: 'V09', tu: 20, den: 80, noiDung: { vi: 'Hướng dẫn nhận diện quân bài qua hình ảnh và tên gọi', en: 'Recognising cards by picture and name' }, dungDe: { vi: 'Trước khi phát bản in ba mươi quân', en: 'Before handing out the 30-card printout' } },
  { video: 'V12', tu: null, den: null, noiDung: { vi: 'Trình tự công bố và báo quân', en: 'Announcing and claiming a card' }, dungDe: { vi: 'Minh họa cách áp dụng luật chơi', en: 'Show how the rules work' } },
  { video: 'V15', tu: null, den: null, noiDung: { vi: 'Mẫu thị phạm Xàng xê trọn vẹn qua quân Gối', en: 'A complete Xàng xê demonstration on the card Gối' }, dungDe: { vi: 'Nghe mẫu làn điệu trọn vẹn', en: 'Hear a melody in full' } },
  { video: 'V24', tu: null, den: null, noiDung: { vi: 'Bốn mẫu lời dùng trong truyền dạy cho học sinh', en: 'Four verses for teaching pupils' }, dungDe: { vi: 'Hướng dẫn học sinh luyện hô', en: 'Help pupils practise calling' } },
  { video: 'V33', tu: null, den: null, noiDung: { vi: 'Một tiết truyền dạy ở trường qua mẫu quân Hương', en: 'A school lesson built on the card Hương' }, dungDe: { vi: 'Tham khảo phương pháp truyền dạy', en: 'See a teaching method at work' } },
];

export const KIT = { dungLuong: null, capNhat: null };
