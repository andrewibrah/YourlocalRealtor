# Media workflow

How a film gets from a phone to the website, and the rules that cannot be
skipped.

## The rules

1. **Masters are never modified.** They live in
   `sharif-site-definition/assets/videos/` and are hashed before anything is
   done to them. Only derivatives ship.
2. **Nothing is scraped, hotlinked, or embedded.** No Instagram embed script, no
   oEmbed, no remote video URL. Where a film has not been supplied, the site
   links to the original post as attribution — a plain anchor, nothing more.
3. **No speaking video ships without captions and a transcript.** This is
   enforced in code, not by memory: `mediaFor()` in `src/content/videos.ts`
   returns `null` if a master has an audio track and no caption file, and the
   component layer renders the Film Slate instead. There is no way to publish
   around it short of editing the schema.
4. **Transcripts come from the audio.** Never from a post caption, a title, or a
   guess.
5. **9:16 is preserved.** No centre crop, no reframe, ever.
6. **Machine transcripts are provisional** until a human reads them.

## Adding a film

### 1. Drop in the master

`sharif-site-definition/assets/videos/`. Leave it alone after that.

### 2. Register it

Add the slug → filename mapping in three places:

- `scripts/encode-media.sh` → `MAP`
- `scripts/media-manifest.mjs` → `MASTERS`
- `src/content/videos.ts` → a new record

### 3. Encode

```bash
bash scripts/encode-media.sh
```

Produces, per film, into `public/media/`:

| Output | Notes |
| --- | --- |
| `<slug>.mp4` | H.264 High, CRF 30–33, AAC 96k, `+faststart` |
| `<slug>.jpg` | Poster, JPEG fallback |
| `<slug>.avif` | Poster, modern browsers |

Plus `hero-loop.mp4` — a 10-second, **silent** excerpt for the home hero. Audio
is stripped rather than muted: a muted track is still bytes on the wire.

**Two deliberate departures from the original spec:**

- **No WebM.** VP9 measured *larger* than H.264 at matched quality on this
  material (short, high-motion, already-compressed social exports). A second
  encode would have added megabytes to the artifact and to git history for
  nothing.
- **Posters are AVIF + JPEG, not AVIF + WebP.** The available ffmpeg build has
  no libwebp encoder; macOS `sips` produces AVIF and JPEG but not WebP. Coverage
  is the same.

### 4. Transcribe

```bash
# once
ffmpeg -i <master> -vn -ac 1 -ar 16000 /tmp/asr/<slug>.wav
python3 scripts/transcribe.py
```

Uses `faster-whisper` (`small.en`, CPU, int8) against the extracted audio.
Writes `public/media/<slug>.vtt` and `generated/transcripts/<slug>.txt`.

**Then read the transcript against the film.** Speech-to-text mishears names,
addresses, and figures — precisely the content on this site that must not be
wrong. A real example from this build: `why-me` transcribed "Brehaut" as
"Bregaud". Correct the `.txt`, re-run the manifest, and only then consider
moving the record's `verification` to `verified`.

### 5. Rebuild the manifest

```bash
node scripts/media-manifest.mjs
```

Writes `generated/media-manifest.json`: SHA-256 of both master and derivative,
dimensions, duration, byte size, poster and caption paths, the transcript split
into paragraphs, and whether captions are required (i.e. whether an audio stream
exists).

Dimensions and durations are **measured, not typed**. Hand-maintained media
metadata drifts out of sync with the files the moment anything is re-encoded.

### 6. Build and check

```bash
npm run build && npm run test:unit
```

If the film has an audio track and no captions, it will render as a slate rather
than a player. That is the system working.

## Loading behaviour

- Posters are `loading="lazy"` except the hero poster, which is
  `fetchPriority="high"` because it is the LCP element.
- Every player uses `preload="none"`. Not a single video byte is fetched until a
  visitor presses play.
- The hero loop is the sole exception: muted, silent, autoplaying, ~1.1 MB
  against a 3 MB ceiling — and not fetched at all under reduced motion, because
  the server-rendered snapshot of that preference is "reduced".
- Playback pauses when the player scrolls out of view or the tab is hidden.
- Only one video plays at a time, enforced at module scope.

## Budget

| | Current | Ceiling |
| --- | --- | --- |
| Deployed media total | ~39 MB | Not specified; well inside Pages limits |
| Fetched on home-page load | ~1.1 MB (hero loop only) | — |
| Hero loop | 1.11 MB | 3 MB |

`10seidman` is the outlier at 8.4 MB — 89 seconds at 720×1280. It is only ever
fetched on request. If total weight becomes a problem, re-encode the two tours
at 540×960 before considering another host.

## What is still outstanding

- **Music rights.** Several edits carry music. An Instagram licence does not
  transfer to a website. Blocking.
- **`1mcClean.mp4`** is referenced in `videos.md` but was not supplied.
- **`seller-questions`** (reel `DDLVnpxuuJH`) — no master.
- **Transcript review** for all eleven films.
- **`4OttavioPromenade,-1.mp4` vs "14 Ottavio Promenade"** — filename says 4,
  caption says 14. The caption was used.
