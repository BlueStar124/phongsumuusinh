"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { photos } from "@/lib/story";

export function StoryPhoto({ index, className = "", caption = true, priority = false }: { index: number; className?: string; caption?: boolean; priority?: boolean }) {
  const [selected, setSelected] = useState(index);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const photo = photos[index];
  const selectedPhoto = photos[selected];

  function move(offset: number) { setSelected((current) => (current + offset + photos.length) % photos.length); }
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const keyboard = (event: KeyboardEvent) => {
      if (!dialog.open) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    };
    dialog.addEventListener("keydown", keyboard);
    return () => dialog.removeEventListener("keydown", keyboard);
  }, []);

  return <>
    <figure className={`story-photo ${className}`}>
      <button type="button" className="photo-open" aria-label={`Phóng to ảnh: ${photo.alt}`} onClick={() => { setSelected(index); dialogRef.current?.showModal(); }}>
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 100vw, 55vw" preload={priority} loading={priority ? "eager" : "lazy"} />
        <span className="photo-expand" aria-hidden="true"><Expand size={16} /></span>
      </button>
      {caption && <figcaption><span>{photo.caption}</span><span className="photo-credit">Ảnh: Lê Thị Thu Hiệp</span></figcaption>}
    </figure>
    <dialog className="photo-dialog" ref={dialogRef} aria-label="Bộ ảnh Vị mưu sinh" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="lightbox-content">
        <div className="lightbox-toolbar"><span>VỊ MƯU SINH <span className="lightbox-count">{selected + 1} / {photos.length}</span></span><button type="button" aria-label="Đóng ảnh" onClick={() => dialogRef.current?.close()}><X size={24} /></button></div>
        <div className="lightbox-image"><Image src={selectedPhoto.src} alt={selectedPhoto.alt} width={selectedPhoto.width} height={selectedPhoto.height} sizes="90vw" unoptimized /><button type="button" className="lightbox-prev" aria-label="Ảnh trước" onClick={() => move(-1)}><ArrowLeft size={22} /></button><button type="button" className="lightbox-next" aria-label="Ảnh tiếp theo" onClick={() => move(1)}><ArrowRight size={22} /></button></div>
        <p>{selectedPhoto.caption} <span>Ảnh: Lê Thị Thu Hiệp</span></p>
      </div>
    </dialog>
  </>;
}
