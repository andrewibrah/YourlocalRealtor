#!/usr/bin/env bash
#
# Encode approved masters into the web derivative set.
#
# Masters live in `sharif-site-definition/assets/videos/` and are never
# modified. Only the outputs of this script are committed and deployed, per
# `sharif-site-definition/docs/08-premium-motion-and-media.md`.
#
# Every source is vertical 9:16. Nothing is centre-cropped or re-framed — the
# aspect ratio is preserved exactly, which is a hard requirement in `docs/02`.
#
# Two deliberate departures from the spec's suggested output set:
#
#   * No WebM. VP9 measured *larger* than H.264 at matched quality on this
#     material (short, high-motion, already-compressed social exports), so a
#     second encode would have added megabytes to the deployed artifact and to
#     git history in exchange for nothing. H.264/AAC in MP4 plays everywhere
#     the site targets.
#   * Posters are AVIF with a JPEG fallback rather than AVIF + WebP. The
#     ffmpeg build available here has no libwebp encoder; macOS `sips` produces
#     AVIF and JPEG but not WebP. AVIF covers modern browsers and JPEG covers
#     the rest, which is the same coverage WebP would have provided.
#
# Usage: bash scripts/encode-media.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/sharif-site-definition/assets/videos"
OUT="$ROOT/public/media"

mkdir -p "$OUT"
rm -f "$OUT"/*.webm "$OUT"/*.avif.failed

# slug|relative source path|max height|crf
MAP=$(cat <<'EOF'
budget-500k|500k.mp4|640|30
buy-vs-rent|rentVSbuy.mp4|640|30
why-me|WHY_ME.mp4|640|30
first-home-01|First_time_buyer_series/p1.mp4|640|30
first-home-02|First_time_buyer_series/p2.mp4|640|30
first-home-03|First_time_buyer_series/p3.mp4|640|30
first-home-04|First_time_buyer_series/p4.mp4|640|30
first-home-05|First_time_buyer_series/p5.mp4|640|30
tour-14-ottavio-promenade|4OttavioPromenade,-1.mp4|1280|31
tour-10-seidman-ave|10seidman.mp4|1280|33
brand-film|Nonrealestate_edited_video.mp4|1280|33
EOF
)

poster () {
  local slug="$1" src="$2" maxh="$3"
  ffmpeg -nostdin -v error -y -ss 1.2 -i "$src" -frames:v 1 \
    -vf "scale=-2:'min($maxh,ih)'" "/tmp/poster-$slug.png"
  sips -s format jpeg -s formatOptions 72 "/tmp/poster-$slug.png" \
    --out "$OUT/$slug.jpg" >/dev/null
  sips -s format avif "/tmp/poster-$slug.png" --out "$OUT/$slug.avif" >/dev/null
  rm -f "/tmp/poster-$slug.png"
}

while IFS='|' read -r slug file maxh crf; do
  [ -n "$slug" ] || continue
  in="$SRC/$file"
  if [ ! -f "$in" ]; then
    echo "  SKIP $slug — master not supplied ($file)"
    continue
  fi

  echo "  $slug"

  # `faststart` moves the index to the front so playback can begin before the
  # whole file arrives, and byte-range seeking works on a plain static host.
  ffmpeg -nostdin -v error -y -i "$in" \
    -vf "scale=-2:'min($maxh,ih)'" \
    -c:v libx264 -profile:v high -level 4.0 -preset slow -crf "$crf" \
    -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 96k -ac 2 \
    "$OUT/$slug.mp4"

  poster "$slug" "$in" "$maxh"
done <<< "$MAP"

# Hero loop: a short, silent, low-weight excerpt used only as the home-page
# hero. Audio is stripped rather than muted — a muted track is still bytes on
# the wire, and `docs/03` caps the hero loop at 3 MB.
HERO_SRC="$SRC/4OttavioPromenade,-1.mp4"
if [ -f "$HERO_SRC" ]; then
  echo "  hero-loop"
  ffmpeg -nostdin -v error -y -ss 3 -t 10 -i "$HERO_SRC" \
    -an -vf "scale=-2:960" \
    -c:v libx264 -profile:v high -preset slow -crf 31 \
    -pix_fmt yuv420p -movflags +faststart \
    "$OUT/hero-loop.mp4"
  poster "hero-loop" "$HERO_SRC" 960
fi

echo
du -h "$OUT"/* | sort -k2
echo
echo "Total: $(du -sh "$OUT" | cut -f1)"
