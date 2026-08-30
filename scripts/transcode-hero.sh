#!/usr/bin/env bash
#
# Rebuild the hero footage from source clips.
#
# Phase 1 uses placeholder NYC stock footage. The swap to final licensed footage
# is a one-directory drop: put three source files at scripts/src/hero-01..03
# (any format ffmpeg reads) and run this. No code changes.
#
# Output per clip, written to public/video/:
#   hero-0N.mp4   H.264 high, faststart, <=1600px wide, 30fps, ~8s
#   hero-0N.webm  VP9
#   hero-0N.jpg   first-frame poster
#
# Requires ffmpeg on PATH (brew install ffmpeg) or set FFMPEG=/path/to/ffmpeg.

set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="${1:-$ROOT/scripts/src}"
OUT_DIR="$ROOT/public/video"
CLIP_SECONDS="${CLIP_SECONDS:-8}"
SCALE="scale='min(1600,iw)':-2:flags=lanczos,fps=30"

mkdir -p "$OUT_DIR"

for i in 01 02 03; do
  src=$(ls "$SRC_DIR"/hero-"$i".* 2>/dev/null | head -1 || true)
  if [ -z "$src" ]; then
    echo "skip hero-$i: no source at $SRC_DIR/hero-$i.*"
    continue
  fi
  echo "hero-$i  <-  $src"
  "$FFMPEG" -y -ss 0 -t "$CLIP_SECONDS" -i "$src" -an \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -movflags +faststart \
    -vf "$SCALE" -crf 27 -preset slow "$OUT_DIR/hero-$i.mp4" -loglevel error
  "$FFMPEG" -y -ss 0 -t "$CLIP_SECONDS" -i "$src" -an \
    -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 \
    -vf "$SCALE" "$OUT_DIR/hero-$i.webm" -loglevel error
  "$FFMPEG" -y -i "$src" -vf "select=eq(n\,0),$SCALE" -frames:v 1 -q:v 4 \
    "$OUT_DIR/hero-$i.jpg" -loglevel error
done

echo "done -> $OUT_DIR"
