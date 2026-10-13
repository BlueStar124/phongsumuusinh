"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Menu, Share2, X } from "lucide-react";
import { chapters, story } from "@/lib/story";
import { SiteLogo } from "@/components/SiteLogo";

function ChapterMenu({ onNavigate }: { onNavigate?: () => void }) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target) && menuRef.current) menuRef.current.open = false;
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, []);

  return <details className="chapter-menu" ref={menuRef}>
    <summary>Câu chuyện <ChevronDown size={14} /></summary>
    <nav className="chapter-links" aria-label="Các chương phóng sự">
      {chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => { if (menuRef.current) menuRef.current.open = false; onNavigate?.(); }}><span>{chapter.number}</span>{chapter.title}</a>)}
    </nav>
  </details>;
}

export function ShareButton({ label = "Chia sẻ", className = "" }: { label?: string; className?: string }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: story.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Đã sao chép liên kết");
      }
    } catch (error) {
      if (!(error instanceof Error && error.name === "AbortError")) setMessage("Không thể sao chép. Bạn có thể sao chép địa chỉ trên trình duyệt.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4500);
  }

  return <span className="share-wrapper">
    <button type="button" className={`share-button ${className}`} onClick={share} aria-label="Chia sẻ phóng sự">
      {message.startsWith("Đã") ? <Check size={15} /> : <Share2 size={15} />}<span>{label}</span>
    </button>
    <span className="share-feedback" role="status">{message}</span>
  </span>;
}

export function StoryHeader() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <>
    <a href="#noi-dung" className="skip-link">Đến nội dung</a>
    <header className="masthead">
      <div className="masthead-inner">
        <a href="#dau-trang" className="brand" aria-label="Vị mưu sinh — về đầu trang"><SiteLogo className="brand-symbol" /><span>LÊ THỊ THU HIỆP<span className="brand-sub">GHI CHÉP ĐỜI THƯỜNG</span></span></a>
        <nav className="desktop-nav" aria-label="Điều hướng chính"><ChapterMenu /><a href="#phim">Phim phóng sự</a><a href="#khoanh-khac">Khoảnh khắc</a></nav>
        <div className="header-actions"><ShareButton /><button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Đóng mục lục" : "Mở mục lục"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
      </div>
      <div className="reading-progress" role="progressbar" aria-label="Tiến độ đọc bài" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><div style={{ width: `${progress}%` }} /></div>
      {open && <nav id="mobile-menu" className="mobile-menu" aria-label="Mục lục"><ChapterMenu onNavigate={() => setOpen(false)} /><a href="#phim" onClick={() => setOpen(false)}>Phim phóng sự <ArrowUpRight size={17} /></a><a href="#khoanh-khac" onClick={() => setOpen(false)}>Khoảnh khắc <ArrowUpRight size={17} /></a></nav>}
    </header>
    {progress > 9 && <a className="back-top" href="#dau-trang" aria-label="Về đầu trang"><ChevronUp size={20} /></a>}
  </>;
}

