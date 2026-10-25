# Guideline dự án: Website học liệu Bài Chòi Hội An

Website song ngữ (Việt và Anh) của **Trung tâm Bảo tồn Di sản Văn hóa Thế giới Hội An**, dựng từ:

- `Trang học liệu Bài Chòi.html`: bản thiết kế khách đã duyệt (9 khung desktop và 3 khung điện thoại).
- `Noi_dung_website_Bai_Choi_bien_tap.docx`: nội dung đã biên tập.

Dự án cũ (Ngô Phương Thảo) đã được chuyển nguyên vẹn vào `legacy/ngo-phuong-thao/`.

## 1. Nguyên tắc không được phá

1. **Giữ thiết kế của khách.** Màu, chữ, khoảng cách lấy từ token trong `src/styles/tokens.css` (chép nguyên từ bản thiết kế). Không thêm màu, font hay kiểu thẻ mới.
2. **Một nguồn dữ liệu.** Mọi con số (số video theo chủ đề, theo người, theo quân) được tính trong `src/data/derive.js`. Không gõ số tay vào trang.
3. **Mọi mã đều là link.** Mã video (V15) dẫn tới trang video, mã nguồn (PV08) tới dòng của nó ở trang Nguồn, mã đồ họa (IG07) mở lightbox, tên người lọc thư viện theo người, tên quân mở trang quân.
4. **Trạng thái nằm trong URL.** Bộ lọc thư viện, pho đang chọn, đồ họa đang mở và mốc thời gian video đều nằm trong địa chỉ trang, nên chia sẻ được và nút Back hoạt động đúng.
5. **Không link chết.** Tệp chưa có thì hiện nút "Sắp có" ở trạng thái vô hiệu, không trỏ tới `#`.

## 2. Cấu trúc mã

```
index.html                 HTML gốc, preload font, nội dung <noscript>
src/main.jsx               HashRouter + MotionConfig reducedMotion="user" + LangProvider
src/App.jsx                Định tuyến, băng vàng đầu trang, quản lý cuộn và focus khi đổi trang
src/i18n.jsx               Ngôn ngữ: localStorage -> trình duyệt -> vi; L({vi,en}) thiếu en thì dùng vi
src/data/                  videos, topics, cards, people, sources, graphics, lessons, media, strings, derive
src/lib/                   text (bỏ dấu, mở rộng khoảng mã), search, hooks, words
src/components/            SiteHeader, SearchBox, Footer, Breadcrumbs, VideoCard, VideoPlayer, CardTile,
                           Placeholder, DownloadLink, SourceRef, PersonTile, Lightbox, Reveal, CountUp
src/pages/                 Home, Topics, Library, VideoDetail, Cards, CardDetail, Graphics, Teachers, Sources, Search, NotFound
src/styles/                tokens, base, layout, components, pages
public/assets/             logo.svg, logo-trang.svg, fonts/ (Noto Serif, Be Vietnam Pro), media/ (chờ tệp thật)
```

Lệnh: `npm run dev` (port 5173), `npm run build` (ra `dist/`), `npm run preview` (port 4173).
Website dùng đường dẫn dạng `#/video/V15`, nên đưa thư mục `dist/` lên bất kỳ hosting tĩnh nào cũng chạy mà không cần cấu hình server.

## 3. Đường dẫn

| Trang | Đường dẫn |
|---|---|
| Trang chủ | `#/` |
| Tám chủ đề | `#/chu-de`, cuộn tới chủ đề bằng `?muc=m4` |
| Thư viện | `#/video?chu-de=M4&nguoi=khanh&quan=goi&lan-dieu=xang-xe&sap-xep=ngan-truoc` |
| Chi tiết video | `#/video/V15`, mở tại giây thứ 20 bằng `?t=20` |
| Bộ thẻ bài | `#/quan-bai?pho=van` (`van`, `van2`, `sach`) |
| Chi tiết quân | `#/quan-bai/chin-goi` |
| Đồ họa | `#/do-hoa`, mở lightbox bằng `?xem=IG07` |
| Giáo viên | `#/giao-vien` |
| Nguồn | `#/nguon`, tô sáng dòng bằng `?ma=PV08`, tới phần người bằng `?ma=nguoi` |
| Tìm kiếm | `#/tim?q=xang xe` (không phân biệt dấu) |

## 4. Thay media thật

Chỉ sửa **`src/data/media.js`**. Ví dụ:

```js
videos: { V15: { poster: 'assets/media/poster/V15.jpg', src: 'assets/media/video/V15.mp4',
                 vtt: { vi: 'assets/media/sub/V15.vi.vtt', en: 'assets/media/sub/V15.en.vtt' },
                 tai: 'assets/media/tai/V15.zip' } },
cards:   { 'chin-goi': { a: 'assets/media/quan/chin-goi-a.png', ab: '…zip', in: '…pdf' } },
graphics:{ IG07: { img: 'assets/media/dohoa/IG07.jpg', goc: 'assets/media/dohoa/IG07.pdf' } },
downloads: { cardsPrint: 'assets/media/tai/30-quan-A4.pdf', kit: '…zip', lessons: { M1: '…pdf' } },
```

Đặt tệp vào `public/assets/media/…` (hoặc dùng URL đầy đủ của CDN hay YouTube cho `src`) rồi chạy `npm run build`. Khung chờ và nút "Sắp có" ở mọi trang sẽ tự đổi thành media thật.

## 5. Chuyển động

Dùng framer-motion và chỉ dùng transform/opacity:

- nội dung trồi lên lần lượt khi cuộn tới;
- dải màu đầu thẻ dày lên khi rê chuột;
- băng vàng đầu trang chạy khi đổi trang;
- số liệu đếm lên;
- thẻ sắp lại mượt khi lọc;
- lá bài lật khi chuyển quân.

Khi người dùng bật "giảm chuyển động" trong hệ điều hành, các hiệu ứng trượt tự tắt. Khi quay lại bằng nút Back, nội dung hiện ngay, không chạy lại hiệu ứng.

## 6. Việc còn mở

Xem `CONTENT-TODO.md` (nội dung cần khách xác nhận) và `TRANSLATION-TODO.md` (bản tiếng Anh cần duyệt).
