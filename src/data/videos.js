// 36 video. Dữ liệu gốc: bảng VIDEO trong khung "Thư viện video" của bản thiết kế,
// đối chiếu với danh sách theo chủ đề trong file nội dung đã biên tập.
// Cột: mã, chủ đề, tiêu đề vi, tiêu đề en, người thực hành, phút, quân bài, làn điệu.
// Quân bài ghi đúng tên gọi trong video; cards.js nối tên này với quân trong bộ 30.

const ROWS = [
  ['V01', 'M1', 'Bài Chòi là gì', 'What is Bài Chòi', ['Đỗ Linh'], 4],
  ['V02', 'M1', 'Các thành phần và giá trị của Bài Chòi', 'The components and value of Bài Chòi', ['Trần Văn An', 'Phùng Tấn Đông'], 4],
  ['V03', 'M1', 'Lịch sử hình thành và các hình thức phát triển', 'Origins and the forms it has taken', ['Trần Văn An', 'Phùng Tấn Đông'], 5],
  ['V04', 'M1', 'Ghi danh và trách nhiệm tiếp nối', 'Inscription and the duty to carry it on', ['Phùng Tấn Đông'], 4],
  ['V05', 'M2', 'Bài Chòi trong ký ức và sinh hoạt Hội An', 'Bài Chòi in the memory and life of Hội An', ['Trần Văn An', 'Phùng Tấn Đông'], 5],
  ['V06', 'M2', 'Các dấu mốc phục hồi và truyền dạy tại Hội An', 'Milestones of revival and teaching in Hội An', ['Phùng Tấn Đông'], 5],
  ['V07', 'M2', 'Không gian hội chơi và diễn xướng ở Hội An', 'Where games are played and performed in Hội An', ['Dương Quý'], 4],
  ['V08', 'M2', 'Con người và sáng tạo trong đời sống Bài Chòi Hội An', 'People and creativity in Hội An Bài Chòi', ['Phùng Tấn Đông'], 4],
  ['V09', 'M3', 'Bộ 30 quân và cách nhận diện hình tên', 'The 30 cards and how to recognise them', ['Trần Văn An'], 5, [], [], true],
  ['V10', 'M3', 'Tên quân dị bản và giới hạn giải thích', 'Variant card names and the limits of explanation', ['Trần Văn An', 'Phùng Tấn Đông'], 4],
  ['V11', 'M3', 'Nhận thẻ và chuẩn bị người chơi', 'Handing out cards and preparing players', ['Dương Quý'], 4],
  ['V12', 'M3', 'Nghe công bố, đối chiếu và báo quân', 'Listening, checking and calling a card', ['Dương Quý'], 4],
  ['V13', 'M3', 'Xác nhận kết quả và quy tắc công bằng', 'Confirming a win and the rules of fairness', ['Dương Quý'], 4],
  ['V14', 'M4', 'Hô, hô hát và trình diễn Bài Chòi', 'Calling, singing and performing Bài Chòi', ['Dương Quý'], 5],
  ['V15', 'M4', 'Thị phạm Xàng xê qua quân Gối', 'Xàng xê demonstrated on the card Gối', ['Khánh', 'Kim'], 5, ['Gối'], ['Xàng xê']],
  ['V16', 'M4', 'Thị phạm Hò Quảng qua quân Tám Tiền', 'Hò Quảng demonstrated on the card Tám Tiền', ['Sang', 'Thảo Ngọc'], 5, ['Tám Tiền'], ['Hò Quảng']],
  ['V17', 'M4', 'Thị phạm Xuân nữ qua quân Trò', 'Xuân nữ demonstrated on the card Trò', ['Ngọc Huệ'], 5, ['Trò'], ['Xuân nữ']],
  ['V18', 'M4', 'Thị phạm Cổ bản qua quân Giày', 'Cổ bản demonstrated on the card Giày', ['Dương Quý'], 5, ['Giày'], ['Cổ bản']],
  ['V19', 'M4', 'Dạy hô hát quân Hương theo điệu Hò ba lý', 'Teaching the card Hương to the Hò ba lý melody', ['Sử Thanh Phương'], 6, ['Hương'], ['Hò ba lý']],
  ['V20', 'M4', 'Nhạc cụ, nhạc đệm và tín hiệu hội chơi', 'Instruments, accompaniment and game cues', ['Nguyễn Tiến'], 5],
  ['V21', 'M5', 'Cấu trúc một lời hô và cách công bố quân', 'How a call is built and a card announced', ['Dương Quý'], 4],
  ['V22', 'M5', 'Nguồn lời: sưu tầm, sáng tác và cải biên', 'Where verses come from: collected, composed, adapted', ['Phùng Tấn Đông'], 4],
  ['V23', 'M5', 'Sáu mẫu lời hô dành cho người lớn', 'Six verses for adults', ['Dương Quý', 'Khánh', 'Kim', 'Sang', 'Thu Ly', 'Ngọc Huệ'], 6],
  ['V24', 'M5', 'Bốn mẫu lời dùng trong truyền dạy cho học sinh', 'Four verses for teaching pupils', ['Thảo Ngọc', 'Bảo Yến', 'Ngọc Huệ', 'Sang'], 5],
  ['V25', 'M6', 'Vai trò và sự phối hợp của người hiệu', 'The callers’ roles and how they work together', ['Dương Quý', 'Thu Ly'], 4],
  ['V26', 'M6', 'Tư thế, lấy hơi và nhả chữ', 'Posture, breath and articulation', ['Đỗ Linh'], 4],
  ['V27', 'M6', 'Mẫu quân Thầy theo điệu Vè Quảng', 'The card Thầy to the Vè Quảng melody', ['Dương Quý', 'Bảo Yến'], 6, ['Thầy'], ['Vè Quảng']],
  ['V28', 'M6', 'Biểu cảm, động tác và giao tiếp trong lời hô', 'Expression, gesture and contact while calling', ['Ngọc Huệ'], 5],
  ['V29', 'M6', 'Xử lý quên lời, gọi nhầm và người chơi chưa hiểu', 'Forgotten words, wrong calls and confused players', ['Dương Quý'], 5],
  ['V30', 'M7', 'Không gian, dụng cụ và phân vai trong hội Bài Chòi', 'Space, props and roles in a game', ['Thu Ly'], 5],
  ['V31', 'M7', 'Diễn biến một hội Bài Chòi và cách kết hội', 'How a game unfolds and how it closes', ['Dương Quý', 'Thu Ly', 'Ngọc Huệ'], 6],
  ['V32', 'M7', 'Bài Chòi trong hoạt động trải nghiệm ở lớp và cộng đồng', 'Bài Chòi as a class and community activity', ['Phùng Tấn Đông'], 5],
  ['V33', 'M8', 'Truyền dạy ở trường qua mẫu quân Hương', 'Teaching at school with the card Hương', ['Sử Thanh Phương'], 5, ['Hương']],
  ['V34', 'M8', 'Bảo tồn, sinh kế và du lịch văn hóa', 'Safeguarding, livelihoods and cultural tourism', ['Phùng Tấn Đông'], 5],
  ['V35', 'M8', 'Định hướng bảo tồn và trao truyền Bài Chòi Hội An', 'The way ahead for safeguarding Bài Chòi in Hội An', ['Phùng Tấn Đông'], 4],
  ['V36', 'TQ', 'Bài Chòi và giá trị di sản trong đời sống Hội An', 'Bài Chòi and its heritage value in Hội An life', ['Phùng Tấn Đông'], 4],
];

// Mô tả và lời hô chỉ có ở những video đã được biên tập; video khác dùng mô tả chủ đề.
const EXTRA = {
  V15: {
    moTa: {
      vi: 'Video thị phạm trọn vẹn làn điệu Xàng xê qua quân Gối, giúp người học nhận biết cách vào câu, ngân giọng và công bố tên quân trong lời hô.',
      en: 'A complete demonstration of the Xàng xê melody on the card Gối, so learners hear how a line begins, how the voice is held and how the card is named.',
    },
    loiHo: { lines: null, nguoiTheHien: ['Khánh', 'Kim'], nguon: ['PV08', 'TL06'], phanLoai: { vi: 'Sưu tầm, không phải sáng tác mới', en: 'Collected, not newly composed' } },
  },
  V36: {
    moTa: {
      vi: 'Video giới thiệu diễn biến hội Bài Chòi, vai trò của các thành phần tham gia và những hình thức thực hành đang được duy trì tại Hội An.',
      en: 'How a Bài Chòi game unfolds, who takes part, and the forms of practice still kept alive in Hội An.',
    },
    phuDe: { vi: 'Phụ đề tiếng Việt và tiếng Anh', en: 'Vietnamese and English subtitles' },
  },
};

export const VIDEOS = ROWS.map(([id, chuDe, vi, en, nguoi, phut, quan = [], lanDieu = [], caBo = false]) => ({
  id, chuDe, tieuDe: { vi, en }, nguoi, phut, quan, lanDieu, caBo, ...(EXTRA[id] || {}),
}));

export const LAN_DIEU = ['Xàng xê', 'Hò Quảng', 'Xuân nữ', 'Cổ bản', 'Hò ba lý', 'Vè Quảng'];

export const videoById = (id) => VIDEOS.find((v) => v.id === id);
