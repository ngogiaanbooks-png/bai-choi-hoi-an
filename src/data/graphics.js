// Mười đồ họa thông tin. "Video sử dụng" ghi theo file nội dung, khoảng mã được mở rộng khi tải.

import { expandCodes } from '../lib/text.js';

const ROWS = [
  ['IG01', 'Bài Chòi và các thành phần', 'Bài Chòi and its components', 'Hai hình thức thực hành chính và mối tương tác giữa người hiệu, người chơi, âm nhạc, thơ ca và hình quân bài.', 'The two main forms of practice and how callers, players, music, verse and card pictures interact.', 'V01, V02, V36'],
  ['IG02', 'Lịch sử và các hình thức thực hành', 'History and forms of practice', 'Tách chứng cứ khỏi giả thuyết; phân biệt hội chơi, hô hát và dân ca kịch.', 'Evidence kept apart from hypothesis; the game, the singing and the folk theatre told apart.', 'V03'],
  ['IG03', 'Ghi danh và tiếp nối di sản', 'Inscription and continuity', 'Tên di sản, mốc ngày 7 tháng 12 năm 2017, danh sách ghi danh và việc trao truyền.', 'The name of the element, the date of 7 December 2017, the list it is on, and its transmission.', 'V04, V34, V36'],
  ['IG04', 'Dấu mốc và không gian Hội An', 'Milestones and places in Hội An', 'Niên biểu hoạt động có nguồn đối chiếu; các không gian thực hành tại phố cổ, Nam Diêu — Thanh Hà, nhà trường và cộng đồng.', 'A sourced timeline; the places of practice in the old town, Nam Diêu — Thanh Hà, schools and the community.', 'V05, V06, V07, V08'],
  ['IG05', 'Bộ bài và tên quân theo phiên bản', 'The deck and card names by version', 'Bảng đối chiếu hình ảnh và tên quân của bộ bài thực hành; phân biệt loại quân, lá in, quân rút và thẻ người chơi.', 'Pictures and names of the practice deck side by side; card types, printed sheets, drawn cards and player cards told apart.', 'V09, V10, V11'],
  ['IG06', 'Trình tự một lượt và kiểm kết quả', 'One round, step by step, and checking a win', 'Trình tự rút quân, hô, công bố, đối chiếu thẻ, báo quân và xác nhận kết quả; điều kiện tới theo mô hình thực hành được ghi hình.', 'Drawing, calling, announcing, checking, claiming and confirming; the winning condition as recorded.', 'V12, V13, V29, V31'],
  ['IG07', 'Hô, hô hát và trình diễn qua mẫu có nguồn', 'Calling, singing and performing from sourced examples', 'Làn điệu, nhạc cụ và tín hiệu phối hợp. Chỉ đối chiếu những đặc điểm người thực hành đã xác nhận.', 'Melodies, instruments and cues. Only features confirmed by practitioners are compared.', 'V14 đến V20'],
  ['IG08', 'Lời hô và cách ghi nguồn', 'Verses and how to credit them', 'Chữ gợi quân, vần, câu ra quân; phân biệt tác giả lời, người sưu tầm, người thể hiện và người dạy.', 'Hint words, rhyme, the line that names the card; author, collector, performer and teacher told apart.', 'V21, V22, V23, V24'],
  ['IG09', 'Chi tiết thị phạm và tương tác', 'Demonstration detail and interaction', 'Phối hợp giữa hai người hiệu, hơi, chữ, nhịp, biểu cảm và cách xử lý tình huống theo mẫu thực hành.', 'Two callers working together: breath, words, rhythm, expression and handling situations.', 'V25 đến V29, V33'],
  ['IG10', 'Tổ chức thực hành và định hướng bảo tồn', 'Running a game and the way ahead', 'Chuẩn bị và tổ chức hội chơi; định hướng truyền dạy, phối hợp và sử dụng học liệu số theo ý kiến người tham gia.', 'Preparing and running a game; teaching, cooperation and digital materials, as participants see them.', 'V30 đến V36'],
];

export const GRAPHICS = ROWS.map(([id, vi, en, mvi, men, videos]) => ({
  id, ten: { vi, en }, moTa: { vi: mvi, en: men }, videos: expandCodes(videos),
}));

export const graphicById = (id) => GRAPHICS.find((g) => g.id === id);
