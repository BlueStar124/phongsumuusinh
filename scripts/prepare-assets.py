"""Create web assets from the supplied local material. Requires Pillow and imageio-ffmpeg."""
from pathlib import Path
import shutil
import subprocess
from PIL import Image, ImageOps
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs_phongsumuusinh"
TARGET = ROOT / "public" / "assets"
TARGET.mkdir(parents=True, exist_ok=True)

photos = {
  "Ảnh đầu_.jpg": "xe-khoai",
  "Ảnh khoai mỡ_.jpg": "khoai-mo",
  "Ảnh bảng hiệu.jpg": "bang-hieu",
  "Ảnh cuối.jpg": "muu-sinh",
  "Dự phòng.jpg": "doi-tay",
}
for filename, slug in photos.items():
  with Image.open(SOURCE / "IMAGE" / filename) as original:
    image = ImageOps.exif_transpose(original).convert("RGB")
    image.save(TARGET / f"{slug}.webp", quality=87, method=6)

shutil.copy2(next(SOURCE.glob("*.wps")), TARGET / "vi-muu-sinh.wps")
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([
  ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
  "-i", str(SOURCE / "VIDEO" / "PS.mp4"),
  "-vf", "scale=720:-2", "-c:v", "libx264", "-crf", "27",
  "-maxrate", "1800k", "-bufsize", "3600k",
  "-preset", "fast", "-c:a", "aac", "-b:a", "128k",
  "-movflags", "+faststart", str(TARGET / "phong-su.mp4"),
], check=True)
subprocess.run([
  ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
  "-ss", "5", "-i", str(SOURCE / "VIDEO" / "PS.mp4"),
  "-frames:v", "1", "-vf", "scale=720:-2", str(TARGET / "video-poster.jpg"),
], check=True)
print("Prepared all 5 photographs, video, poster and original article.")

audio_source = SOURCE / "AUDIO" / "Audio.mov"
if audio_source.exists():
  subprocess.run([
    ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
    "-i", str(audio_source), "-map", "0:a:0", "-vn", "-c:a", "copy",
    "-movflags", "+faststart", str(TARGET / "audio-phong-su.m4a"),
  ], check=True)
  print("Prepared narration audio without re-encoding.")
