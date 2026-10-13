import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3002"),
  title: "Vị mưu sinh — Bình dị một góc đường | Lê Thị Thu Hiệp",
  description: "Phóng sự ảnh và video về người phụ nữ bán khoai mỡ chiên giữa cái nắng Sài Gòn. Bình dị một góc đường, bền bỉ một hành trình mưu sinh.",
  openGraph: {
    title: "Vị mưu sinh — Bình dị một góc đường",
    description: "Bình dị một góc đường, bền bỉ một hành trình mưu sinh. Phóng sự: Lê Thị Thu Hiệp.",
    locale: "vi_VN",
    type: "article",
    images: [{ url: "/assets/xe-khoai.webp", width: 1059, height: 1412 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
