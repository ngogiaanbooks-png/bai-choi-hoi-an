# Nội dung cần khách xác nhận hoặc bổ sung

Danh sách này tìm ra khi đối chiếu file `Noi_dung_website_Bai_Choi_bien_tap.docx` với bản thiết kế `Trang học liệu Bài Chòi.html`.
Website lấy **mọi con số từ dữ liệu** (`src/data/`), nên khi sửa dữ liệu thì mọi trang tự cập nhật theo.

## 1. Số liệu lệch nhau giữa các trang

| Mục | Trang chủ (docx) | Danh sách video thực tế | Website đang hiện |
|---|---|---|---|
| Video tổng quan V36 | "6 phút" (hero desktop) | "4 phút" (thư viện, khung điện thoại) | **4 phút** |
| M4 | NĂM VIDEO | 7 video (V14–V20) | **bảy video** |
| M5 | NĂM VIDEO | 4 video (V21–V24) | **bốn video** |
| M7 | BỐN VIDEO | 3 video (V30–V32) | **ba video** |
| M8 | BỐN VIDEO | 3 video (V33–V35) | **ba video** |
| Dương Quý | 11 video | 12 video có tên trong bảng video | **12** |
| Phùng Tấn Đông | 9 video | 12 video có tên trong bảng video | **12** |
| Cẩm | 2 video | không có trong video nào | **0** |
| Quân Chín Gối | 2 video | 1 video riêng (V15) + V09 giới thiệu cả bộ | "1 video", danh sách hiện cả V15 và V09 |

→ Nếu số ở trang chủ mới là đúng, cần sửa lại bảng video trong `src/data/videos.js`.

## 2. Tiêu đề V36

- Trang chủ: "Bài Chòi và giá trị di sản trong đời sống Hội An" (website đang dùng tiêu đề này).
- Thư viện: "Tổng quan bộ học liệu Bài Chòi Hội An".
- Trang chủ đề: "Giới thiệu tổng quan các chủ đề".

Cần chọn một tiêu đề.

## 3. Quân bài trong video chưa khớp với bộ 30 quân

Các video gọi quân bằng tên: **Gối** (V15), **Tám Tiền** (V16), **Trò** (V17), **Giày** (V18), **Hương** (V19, V33), **Thầy** (V27).

- Đã nối: Gối → Chín Gối (nguồn PV05), Trò → Nhứt Trò.
- **Chưa nối được:** Tám Tiền, Giày, Hương, Thầy. Bốn tên này không có trong 25 quân đã có tên. Có thể chúng là 4 trong 5 quân pho Vạn đang "chờ đối chiếu". Khi xác nhận xong, thêm tên vào `src/data/cards.js` thì các video sẽ tự liên kết sang trang quân.
- Trang Bộ thẻ bài trong bản thiết kế ghi Ông Ầm, Tứ Tượng và Bạch Huê mỗi quân "1 video", nhưng không video nào nhắc tới ba quân này.

## 4. Còn để trống trong file nội dung

- Tên 5 quân pho Vạn.
- Lời hô thị phạm (V15, quân Chín Gối) và câu hô mẫu của từng quân.
- Mô tả riêng của 34 video. Hiện chỉ V15 và V36 có mô tả; các video khác tạm dùng mô tả chủ đề.
- Mốc trích đoạn của V12, V15, V24, V33.
- Số trang của các bản in, dung lượng và ngày cập nhật của gói tải.
- Danh sách cố vấn chuyên môn, nhà tài trợ và người cho mượn hiện vật.
- **Email nhận tư liệu** cho nút "Gửi tư liệu". Điền vào `CONTACT_EMAIL` trong `src/pages/Sources.jsx`.
- Ảnh chân dung người thực hành.
- Mã nguồn của các video ngoài bảng 7 nguồn (bảng hiện chỉ phủ khoảng 20 video).
- PV01 và PV04 được nhắc ở V36 nhưng chưa có dòng mô tả trong bảng mã nguồn.
- Hồ sơ ghi 22 người tham gia nhưng mới có 14 người được công bố.

## 5. Media (36 video, 30 hình quân, 10 đồ họa, các tệp tải)

Chưa có tệp nào. Website đang hiện khung chờ đúng tỷ lệ và nút "Sắp có".
Khi có tệp, chỉ cần điền đường dẫn vào **`src/data/media.js`** (xem ví dụ ở đầu file) rồi build lại.
