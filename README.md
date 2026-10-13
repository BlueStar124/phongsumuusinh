# Vị mưu sinh — Bình dị một góc đường

Website phóng sự độc lập, làm bằng Next.js 16, React 19 và TypeScript. Nội dung, 5 ảnh và phim lấy từ `docs_phongsumuusinh/`. Giao diện riêng với nền giấy ấm, màu tím khoai mỡ, bố cục tạp chí, mục lục theo chương, bộ ảnh phóng to và phim dọc.

## Chạy từ GitHub

```powershell
git clone https://github.com/BlueStar124/phongsumuusinh.git
cd phongsumuusinh
npm ci
npm run dev
```

Mở **http://localhost:3002**. Mã nguồn và toàn bộ tài nguyên website nằm trong repository. File ZIP, các tư liệu thô trong `docs_phongsumuusinh/`, dependencies và bản build cục bộ không được đưa lên GitHub.

## Chạy tại workspace hiện tại

```powershell
cd D:\web_thuhiep\Phongsumuusinh
npm run dev
```

Mở **http://localhost:3002**. Dự án dùng được dependencies đã có ở thư mục cha. Khi sao chép dự án sang máy khác, chạy `npm install` trong thư mục này trước.

```powershell
npm run check
npm run start
```

`check` kiểm tra ESLint, TypeScript và production build. `start` phục vụ bản build tại cổng 3002.

Khi triển khai, đặt biến môi trường `SITE_URL` thành địa chỉ website chính thức để ảnh chia sẻ có URL đúng.

## Sửa nội dung

- `src/lib/story.ts`: bài viết, thông tin ảnh, tiêu đề các chương.
- `src/app/page.tsx`: bố cục trang.
- `src/app/globals.css`: màu sắc, font, giao diện desktop/mobile.
- `public/assets/`: ảnh WebP, phim MP4 H.264 720p, ảnh bìa phim và bài WPS gốc để tải.
- `public/assets/audio-phong-su.m4a`: bản nghe 2 phút 38 giây, tách từ `AUDIO/Audio.mov` và giữ nguyên luồng AAC. Thanh nghe nằm dưới ảnh mở đầu, có phát/dừng, tua và đổi tốc độ; không tự phát. Audio và phim tự tạm dừng nhau để tránh phát chồng tiếng.
- `public/fonts/`: font Lora hỗ trợ tiếng Việt, phục vụ cục bộ; kèm giấy phép OFL.
- `docs/research/source-text.txt`: văn bản trích từ WPS để đối chiếu.

Tư liệu gốc vẫn nằm tại `docs_phongsumuusinh/` trên máy làm việc, bao gồm cả MP4 và MOV. Website dùng bản MP4 tối ưu tương thích trình duyệt trong `public/assets/`; không tự tải phim trước khi người đọc nhấn phát. Không có dịch vụ bên ngoài hoặc cơ sở dữ liệu bắt buộc.

Để tạo lại tài nguyên từ bản gốc, cần đặt lại thư mục tư liệu `docs_phongsumuusinh/` cạnh `scripts/` và cài Python, Pillow, imageio-ffmpeg. Website đã có tài nguyên tối ưu nên không cần chạy bước này để sử dụng:

```powershell
python scripts/prepare-assets.py
```

Bài viết được chia đoạn cho dễ đọc. Đã sửa lỗi gõ “đông đuc” thành “đông đúc” và hoàn chỉnh cụm cuối đoạn bị thiếu “nơi phố” thành “nơi phố thị”; các thông tin và ý nghĩa được giữ nguyên. Chú thích ảnh dự phòng mô tả trực tiếp ảnh, các chú thích còn lại lấy từ bài gốc. Không suy đoán tên nhân vật hay địa chỉ cụ thể.
