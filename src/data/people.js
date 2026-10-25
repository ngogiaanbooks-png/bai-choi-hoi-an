// Người thực hành hiển thị công khai (hồ sơ ghi nhận 22 người tham gia ghi hình).
// Số video của mỗi người được tính từ videos.js, không ghi tay.

import { slugify } from '../lib/text.js';

const ROWS = [
  ['Dương Quý', 'Người hiệu · dẫn hội', 'Caller · game leader'],
  ['Phùng Tấn Đông', 'Nhà nghiên cứu', 'Researcher'],
  ['Trần Văn An', 'Nhà nghiên cứu', 'Researcher'],
  ['Đỗ Linh', 'Người truyền dạy', 'Teacher of the tradition'],
  ['Ngọc Huệ', 'Người hiệu · hô hát', 'Caller · singer'],
  ['Thu Ly', 'Người hiệu · tổ chức hội', 'Caller · game organiser'],
  ['Khánh', 'Người hiệu · hô thị phạm', 'Caller · demonstration'],
  ['Kim', 'Người hiệu · hô thị phạm', 'Caller · demonstration'],
  ['Sang', 'Người hiệu · hô thị phạm', 'Caller · demonstration'],
  ['Thảo Ngọc', 'Người học · hô thị phạm', 'Learner · demonstration'],
  ['Bảo Yến', 'Người học · hô thị phạm', 'Learner · demonstration'],
  ['Sử Thanh Phương', 'Giáo viên · truyền dạy', 'Schoolteacher'],
  ['Nguyễn Tiến', 'Nhạc công', 'Musician'],
  ['Cẩm', 'Câu lạc bộ · tổ chức', 'Club · organiser'],
];

export const PEOPLE = ROWS.map(([ten, vi, en]) => ({ id: slugify(ten), ten, vaiTro: { vi, en } }));
export const TOTAL_PARTICIPANTS = 22;

export const personByName = (ten) => PEOPLE.find((p) => p.ten === ten);
export const personById = (id) => PEOPLE.find((p) => p.id === id);
