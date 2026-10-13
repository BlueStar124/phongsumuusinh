"use client";

import { useRef, useState } from "react";
import { ArrowDownToLine, Play } from "lucide-react";

export function StoryFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");

  async function play() {
    try {
      await videoRef.current?.play();
      setStarted(true);
      setError("");
    } catch { setError("Chưa phát được video. Hãy thử lại hoặc tải phim bên dưới."); }
  }

  return <section id="phim" className="film-section" aria-labelledby="film-heading">
    <div className="film-inner">
      <div className="film-copy"><p className="eyebrow">LẮNG NGHE CÂU CHUYỆN</p><h2 id="film-heading">Một góc phố.<br />Một đời <em>cần mẫn.</em></h2><p>Có những câu chuyện được kể bằng tiếng phố, bằng đôi tay làm việc và những khoảnh khắc rất đời thường.</p><div className="film-actions"><p className="film-meta"><span className="film-dot" /> PHIM PHÓNG SỰ <span>01:17</span></p><a className="text-link" href="/assets/phong-su.mp4" download="vi-muu-sinh.mp4">Lưu phim phóng sự <ArrowDownToLine size={15} /></a></div></div>
      <div className="film-frame"><div className="film-player"><video ref={videoRef} controls={started} playsInline preload="none" poster="/assets/video-poster.jpg" onPlay={() => setStarted(true)} onError={() => setError("Video chưa tải được. Bạn có thể tải phim để xem.")} aria-label="Phóng sự Vị mưu sinh, thời lượng 1 phút 17 giây"><source src="/assets/phong-su.mp4" type="video/mp4" />Trình duyệt của bạn không hỗ trợ video. <a href="/assets/phong-su.mp4">Tải phim</a>.</video>{!started && <button type="button" className="film-play" onClick={play} aria-label="Phát phim phóng sự"><span><Play size={24} fill="currentColor" /></span><span>XEM PHÓNG SỰ</span></button>}</div><p className="film-caption">Ghi lại nhịp mưu sinh bên chiếc xe khoai mỡ nhỏ.</p>{error && <p role="alert" className="video-error">{error}</p>}</div>
    </div>
  </section>;
}
