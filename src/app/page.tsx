import { ArrowDown, ArrowDownToLine, ArrowUpRight, MapPin } from "lucide-react";
import { ShareButton, StoryHeader } from "@/components/StoryControls";
import { SiteLogo } from "@/components/SiteLogo";
import { StoryPhoto } from "@/components/StoryPhoto";
import { StoryFilm } from "@/components/StoryFilm";
import { StoryAudio } from "@/components/StoryAudio";
import { photos, story } from "@/lib/story";

export default function HomePage() {
  return <>
    <StoryHeader />
    <main id="dau-trang">
      <section className="hero" aria-labelledby="story-title">
        <div className="hero-copy"><div className="hero-kicker"><span className="small-dot" /> PHÓNG SỰ ĐỜI SỐNG <span className="kicker-line" /></div><p className="hero-location"><MapPin size={13} /> SÀI GÒN · VIỆT NAM</p><h1 id="story-title">Vị<br className="hero-title-break" />{" "}<em>mưu sinh</em><span className="title-period">.</span></h1><div className="hero-subtitle"><span className="subtitle-line" /><h2>Bình dị một góc đường,<br />bền bỉ một hành trình.</h2></div><p className="hero-description">{story.introduction}</p><div className="hero-bottom"><a href="#noi-dung" className="read-link"><span className="circle-arrow"><ArrowDown size={17} /></span> CHẬM LẠI ĐỂ ĐỌC</a><span className="hero-credit">BÀI & ẢNH<span>Lê Thị Thu Hiệp</span></span></div></div>
        <div className="hero-visual"><StoryPhoto index={0} caption={false} priority className="hero-photo" /><StoryAudio /><span className="hero-photo-number">01 / 05</span></div>
      </section>

      <div className="story-ribbon"><span>MỘT GÓC SÀI GÒN</span><span className="ribbon-words">Mùi khoai nóng. Đôi tay cần mẫn. Một nhịp sống bình dị.</span><SiteLogo className="ribbon-logo" /></div>

      <div id="noi-dung" className="editorial-layout"><article className="article-content">
        <div className="article-opening"><p className="eyebrow">BÌNH DỊ MỘT GÓC ĐƯỜNG</p><p className="intro-paragraph">{story.introduction}</p><div className="article-byline"><span>Thực hiện: <strong>Lê Thị Thu Hiệp</strong></span><span>Phóng sự ảnh & video</span></div></div>
        <section id="cau-chuyen" className="chapter"><div className="chapter-heading"><span className="chapter-number">01</span><div><p className="eyebrow">NHỊP MƯU SINH</p><h2>Mưu sinh giữa<br />cái nắng Sài Gòn</h2></div></div>{story.first.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="portrait-story"><StoryPhoto index={1} /><div className="portrait-note"><span className="quote-mark">“</span><p>Không cửa hàng rộng rãi, không máy lạnh, chỉ có chiếc chảo dầu nóng và đôi tay thoăn thoắt vo từng viên khoai.</p><span className="eyebrow">TỪ CÂU CHUYỆN</span></div></div><p>{story.first[2]}</p></section>

        <section id="vi-binh-di" className="chapter"><div className="chapter-heading"><span className="chapter-number">02</span><div><p className="eyebrow">HƯƠNG VỊ CỦA SỰ TẢO TẦN</p><h2>Túi khoai tuy nhỏ,<br />gửi gắm một đời tảo tần</h2></div></div><p>{story.second[0]}</p><div className="photo-pair"><StoryPhoto index={2} /><StoryPhoto index={3} /></div><div className="price-note"><span className="price-value"><span className="price-label">Chỉ từ</span>10.000–20.000đ</span><p>Một gói khoai mỡ chiên.<br />Một món quà vặt quen thuộc giữa lòng thành phố.</p></div><p>{story.second[1]}</p></section>
      </article></div>

      <StoryFilm />

      <div className="closing-layout"><div className="closing-photo"><StoryPhoto index={4} /></div><section id="dieu-nho-be" className="chapter closing-copy"><div className="chapter-heading"><span className="chapter-number">03</span><div><p className="eyebrow">CHẬM LẠI MỘT CHÚT</p><h2>Trân trọng<br />những điều bình dị</h2></div></div>{story.last.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="closing-signature"><span className="small-dot" /><span>Mỗi cố gắng đều xứng đáng được ghi nhận.</span></div></section></div>

      <section className="closing-quote"><span className="eyebrow">SAU CÙNG, ĐIỀU CÒN LẠI</span><blockquote>{story.closing.replace("ghi nhận", "ghi\u00a0nhận")}</blockquote><SiteLogo className="closing-logo" /></section>

      <section id="khoanh-khac" className="gallery-section" aria-labelledby="gallery-title"><div className="section-topline"><div><p className="eyebrow">NHÌN LẠI CÂU CHUYỆN</p><h2 id="gallery-title">Những khoảnh khắc bình dị</h2></div><span className="gallery-hint">05 BỨC ẢNH <ArrowUpRight size={17} /></span></div><div className="photo-gallery">{photos.map((photo, index) => <StoryPhoto key={photo.src} index={index} caption={false} />)}</div><p className="gallery-caption">Chạm vào ảnh để xem trọn khoảnh khắc. <span>Ảnh: Lê Thị Thu Hiệp</span></p></section>

      <section className="end-note"><div><span className="eyebrow">BÀI VIẾT & HÌNH ẢNH</span><p>Lê Thị Thu Hiệp</p></div><div className="end-note-actions"><a className="text-link" href="/assets/vi-muu-sinh.wps" download>Tải bài viết gốc <ArrowDownToLine size={15} /></a><ShareButton label="Chia sẻ câu chuyện" /></div></section>
    </main>
    <footer><a className="footer-title" href="#dau-trang">Vị mưu sinh<span>.</span></a><p>Bình dị một góc đường. Bền bỉ một hành trình.</p><span className="footer-credit">MỘT PHÓNG SỰ CỦA LÊ THỊ THU HIỆP · SÀI GÒN</span></footer>
  </>;
}
