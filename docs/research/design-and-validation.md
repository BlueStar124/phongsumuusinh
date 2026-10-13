# Vị mưu sinh — Thiết kế và kiểm tra

## Hướng thiết kế

Tham khảo tinh thần của dự án `hoa-si-chan-dung`: phóng sự dài, hình ảnh thật, nền ấm, chữ serif, phim và công cụ đọc bài. Tự viết bố cục và các thành phần cho dự án này: mở đầu chia hai cột, màu tím khoai mỡ, mục lục ba chương, ảnh dọc đi cùng trích đoạn, phim trên nền tím tối, bộ ảnh cuối bài. Không sao chép component hoặc CSS của website mẫu.

Theo điều chỉnh của người dùng, tiêu đề “Vị mưu sinh” hiển thị một hàng trên tất cả kích thước màn hình. Nhãn “PHIM PHÓNG SỰ”, thời lượng và liên kết “Lưu phim phóng sự” được đặt cùng hàng. Font Lora có đủ dấu tiếng Việt, được lưu và phục vụ tại chỗ.

Bố cục laptop đã được thu gọn: hero tối đa 560 px, bài viết rộng tối đa 880 px, giảm khoảng cách giữa các chương và các khối ảnh/phim. Các đoạn nội dung được căn đều hai lề. Đã kiểm tra tiêu đề một dòng và không tràn ngang tại 1366, 882 và 320 px.

Theo điều chỉnh tiếp theo, đã bỏ thanh “Trong câu chuyện này” và đặt ba chương trong menu “Câu chuyện” trên header, áp dụng cả laptop lẫn mobile. Menu đóng khi chọn chương, bấm bên ngoài hoặc Escape; Escape trả focus về nút mở. Đoạn kết giảm còn 24 px trên laptop, 20 px trên mobile, cân bằng dòng và giữ “ghi nhận” liền nhau bằng khoảng trắng không ngắt. Các biểu tượng sao được thay bằng logo chữ “vị” dùng chung với header.

## Tư liệu

| Tư liệu gốc | Sử dụng trên web |
| --- | --- |
| `IMAGE/Ảnh đầu_.jpg` | Mở đầu và bộ ảnh |
| `IMAGE/Dự phòng.jpg` | Đôi tay người bán, chương 1 và bộ ảnh |
| `IMAGE/Ảnh khoai mỡ_.jpg` | Chương 2 và bộ ảnh |
| `IMAGE/Ảnh bảng hiệu.jpg` | Chương 2 và bộ ảnh |
| `IMAGE/Ảnh cuối.jpg` | Chương 3 và bộ ảnh |
| `VIDEO/PS.mp4` | Phim H.264 720 × 1280, giữ âm thanh, 76,93 giây |
| `VIDEO/PS.mov` | Giữ nguyên tư liệu gốc; dùng MP4 tương thích trình duyệt để phát |
| WPS trong `docs_phongsumuusinh/` | Toàn bài, chú thích, tên tác giả, liên kết tải bản gốc |

Phim tối ưu: 17.540.859 byte, so với MP4 gốc 159.727.958 byte. Các bản WPS lặp lại được giữ nguyên; `source-text.txt` phục vụ đối chiếu nội dung. Chi tiết biên tập nhỏ được ghi trong README.

## Xác minh

- `npm run check`: ESLint, TypeScript strict và Next.js production build đều thành công.
- Trang chủ trả HTTP 200.
- Kiểm tra viewport 320, 390, 768 và 1440 px; không có tràn ngang toàn trang.
- Mobile: tiêu đề một dòng; tâm của hai thành phần trong hàng phim trùng nhau ở cả 320 và 390 px.
- Tất cả 10 vị trí ảnh trong trang tải được (5 ảnh xuất hiện trong bài và bộ ảnh).
- Menu mobile mở, điều hướng đến phim và tự đóng.
- Video không tải trước khi phát; khi nhấn phát, phim chạy, controls xuất hiện, thời lượng 76,927 giây.
- Lightbox chuyển từ ảnh 1 sang ảnh 2 bằng ArrowRight; Escape đóng và trả focus về nút mở ảnh.
- Thử nhánh sao chép liên kết với Clipboard API giả lập: đúng URL, thông báo “Đã sao chép liên kết”. Hộp chia sẻ hệ điều hành phụ thuộc thiết bị, không gửi dữ liệu cho bên ngoài trong kiểm tra.
- Không có lỗi console trong phiên QA. Next.js dev có thể cảnh báo LCP vì cùng ảnh mở đầu được dùng lại trong bộ ảnh; ảnh mở đầu đã được preload và loading eager.

Ảnh chụp giao diện được lưu ở `output/playwright/` (không commit). Native video controls được kiểm tra bằng Chrome; không kiểm tra trên thiết bị iOS thật.
