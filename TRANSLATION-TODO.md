# Bản tiếng Anh: cần người dịch duyệt

Toàn bộ website đã có bản tiếng Anh **nháp** do tôi soạn, để nút VI/EN hoạt động ngay. Trước khi công bố, cần người dịch chuyên môn duyệt các phần sau:

1. **Tên tổ chức:** "Hội An Centre for Cultural Heritage Management and Conservation" (`src/data/strings.js`, khóa `org`). Cần dùng đúng tên tiếng Anh chính thức của Trung tâm.
2. **Tiêu đề 36 video** (`src/data/videos.js`, cột thứ 4).
3. **Tên và mô tả 8 chủ đề** (`src/data/topics.js`).
4. **Tên và mô tả 10 đồ họa** (`src/data/graphics.js`).
5. **Mô tả nguồn tư liệu** (`src/data/sources.js`) và **vai trò người thực hành** (`src/data/people.js`).
6. **Chữ riêng của từng trang** nằm ngay trong `src/pages/*.jsx`, dạng `L({ vi: '…', en: '…' })`.

Quy ước dịch:

- Giữ nguyên tiếng Việt cho tên quân, tên làn điệu (Xàng xê, Hò Quảng…), tên người và lời hô.
- "Bài Chòi" và "Hội An" giữ nguyên, có dấu.
- Chuỗi nào thiếu bản `en` thì website tự hiện bản tiếng Việt, nên có thể dịch dần mà không làm hỏng trang.
