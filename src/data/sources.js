// Hệ mã nguồn tư liệu. Cột "dùng trong" là nơi duy nhất ghi quan hệ nguồn -> video;
// danh sách nguồn của từng video được suy ra từ đây (derive.js).

import { expandCodes } from '../lib/text.js';

const LOAI = {
  pv: { vi: 'Rã băng điền dã', en: 'Field transcript' },
  tl: { vi: 'Tư liệu nội bộ', en: 'Internal document' },
  hs: { vi: 'Hồ sơ di sản', en: 'Heritage dossier' },
  xb: { vi: 'Tài liệu xuất bản', en: 'Published source' },
};

const ROWS = [
  ['PV05', 'pv', 'Buổi trao đổi về tên quân, tên gọi khác và giới hạn giải thích', 'Session on card names, variant names and the limits of explanation', 'V09, V10', 'tên quân và dị bản', 'card names and variants'],
  ['PV08', 'pv', 'Buổi ghi thị phạm làn điệu, kèm lời hô được người thể hiện xác nhận', 'Melody demonstration session, with verses confirmed by the performers', 'V15, V16', 'buổi ghi thị phạm làn điệu', 'melody demonstration session'],
  ['TL06', 'tl', 'Bảng mười lời hô thị phạm dùng trong video, kèm người thể hiện và phân loại nguồn lời', 'Table of the ten demonstration verses used in the videos, with performers and type of source', 'V15 – V19, V23, V24', 'bảng lời hô thị phạm', 'table of demonstration verses'],
  ['TL10', 'hs', 'Hồ sơ ghi danh nghệ thuật Bài Chòi Trung Bộ Việt Nam, số 01222; quyết định 12.COM/11.b.35', 'Nomination file for the Art of Bài Chòi in Central Viet Nam, no. 01222; decision 12.COM/11.b.35', 'V01, V04, V34, V36', 'hồ sơ ghi danh', 'nomination file'],
  ['TL13', 'tl', 'Bảng đối chiếu tư liệu nền và kết quả điền dã, nêu rõ chỗ hai nguồn khác nhau', 'Comparison of background sources and fieldwork, noting where they differ', 'V03, V06, V10', 'bảng đối chiếu tư liệu', 'source comparison table'],
  ['HNT2007', 'xb', 'Nghiên cứu về Bài Chòi xứ Quảng, bản chép năm 2007', 'A study of Bài Chòi in Quảng, 2007 copy', 'V03, V05', 'nghiên cứu Bài Chòi xứ Quảng', 'study of Bài Chòi in Quảng'],
  ['VP2022', 'xb', 'Tư liệu tham khảo chính thức về Bài Chòi Hội An', 'Official reference material on Bài Chòi in Hội An', 'V02, V05, V06', 'tư liệu tham khảo chính thức', 'official reference'],
  // Nguồn được nhắc tới ở video tổng quan nhưng chưa có dòng mô tả trong bảng.
  ['PV01', 'pv', null, null, 'V36', null, null],
  ['PV04', 'pv', null, null, 'V36', null, null],
];

export const SOURCES = ROWS.map(([ma, loai, vi, en, dung, nganVi, nganEn]) => ({
  ma,
  loai: LOAI[loai],
  moTa: vi ? { vi, en } : null,
  ngan: nganVi ? { vi: nganVi, en: nganEn } : null,
  dungTrong: expandCodes(dung),
}));

export const SOURCE_GROUPS = [
  { ma: 'PV01 – PV23', moTa: { vi: 'Rã băng điền dã: lời người thực hành nói trong các buổi phỏng vấn và ghi hình.', en: 'Field transcripts: what practitioners said in interviews and recording sessions.' } },
  { ma: 'TL01 – TL13', moTa: { vi: 'Tư liệu nội bộ của dự án: bảng tổng hợp, bản đối chiếu, bảng lời hô.', en: 'Internal project documents: summaries, comparisons, verse tables.' } },
  { ma: { vi: 'Mã riêng', en: 'Own codes' }, moTa: { vi: 'Tài liệu xuất bản và hồ sơ di sản, mỗi tài liệu một mã riêng.', en: 'Published works and heritage dossiers, one code each.' } },
];

export const SOURCE_STATS = [
  { so: 23, nhan: { vi: 'bản rã băng điền dã', en: 'field transcripts' } },
  { so: 13, nhan: { vi: 'tư liệu nội bộ', en: 'internal documents' } },
  { so: 22, nhan: { vi: 'người tham gia ghi hình', en: 'people recorded' } },
];

export const sourceByCode = (ma) => SOURCES.find((s) => s.ma === ma);
