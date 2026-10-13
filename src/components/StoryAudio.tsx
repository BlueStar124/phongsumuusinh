"use client";

import { useEffect, useRef, useState } from "react";
import { Headphones, Pause, Play } from "lucide-react";

const playbackRates = [1, 1.25, 1.5, 2];

function formatTime(seconds: number) {
  const time = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
}

export function StoryAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [rate, setRate] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let mounted = true;
    const syncDuration = () => {
      if (mounted && Number.isFinite(audio.duration)) setDuration(audio.duration);
    };
    // Metadata may finish loading before React hydrates the server-rendered audio.
    queueMicrotask(syncDuration);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    const pauseOtherMedia = (event: Event) => {
      if (!(event.target instanceof HTMLMediaElement)) return;
      if (event.target === audio) {
        document.querySelectorAll<HTMLMediaElement>("audio, video").forEach((media) => {
          if (media !== audio) media.pause();
        });
      } else audio.pause();
    };
    document.addEventListener("play", pauseOtherMedia, true);
    return () => {
      mounted = false;
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      document.removeEventListener("play", pauseOtherMedia, true);
    };
  }, []);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    try {
      if (audio.error) audio.load();
      await audio.play();
      setError("");
    } catch {
      setError("Chưa phát được audio. Hãy thử lại hoặc tải bản nghe.");
    }
  }

  function changeRate() {
    const nextRate = playbackRates[(playbackRates.indexOf(rate) + 1) % playbackRates.length];
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
    setRate(nextRate);
  }

  return <section className="hero-audio" aria-label="Nghe phóng sự Vị mưu sinh">
    <audio
      ref={audioRef}
      src="/assets/audio-phong-su.m4a"
      preload="metadata"
      onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onError={() => setError("Audio chưa tải được. Bạn có thể tải bản nghe bên dưới.")}
    />
    <button type="button" className="audio-play" onClick={togglePlayback} aria-label={playing ? "Tạm dừng phóng sự" : "Phát audio phóng sự"}>
      {playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
    </button>
    <div className="audio-body">
      <div className="audio-topline"><span className="audio-title"><Headphones size={13} /> Nghe phóng sự</span><span className="audio-time">{formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : "–:––"}</span></div>
      <input
        className="audio-seek"
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration)}
        disabled={duration <= 0}
        aria-label="Tua audio phóng sự"
        aria-valuetext={`${formatTime(currentTime)} trên ${formatTime(duration)}`}
        onChange={(event) => {
          const time = Number(event.currentTarget.value);
          if (audioRef.current) audioRef.current.currentTime = time;
          setCurrentTime(time);
        }}
      />
    </div>
    <button type="button" className="audio-rate" onClick={changeRate} aria-label={`Tốc độ phát ${rate} lần. Nhấn để đổi tốc độ.`}>{rate}×</button>
    {error && <p className="audio-error" role="alert">{error} <a href="/assets/audio-phong-su.m4a" download>Tải bản nghe</a></p>}
  </section>;
}
