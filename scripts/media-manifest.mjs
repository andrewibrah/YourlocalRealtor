/**
 * Build the media manifest.
 *
 * `sharif-site-definition/docs/08` requires source-to-derivative traceability:
 * every master is hashed and inventoried before editing, and every shipped
 * derivative can be traced back to it. This script produces that record by
 * measuring the files rather than by anyone typing numbers into a content file,
 * which is how dimensions and durations drift out of sync with reality.
 *
 * Output: generated/media-manifest.json (committed, read at build time).
 *
 * Usage: node scripts/media-manifest.mjs
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "sharif-site-definition/assets/videos");
const OUT = path.join(ROOT, "public/media");
const TRANSCRIPTS = path.join(ROOT, "generated/transcripts");

/** slug → master file, relative to the masters directory. */
const MASTERS = {
  "budget-500k": "500k.mp4",
  "buy-vs-rent": "rentVSbuy.mp4",
  "why-me": "WHY_ME.mp4",
  "first-home-01": "First_time_buyer_series/p1.mp4",
  "first-home-02": "First_time_buyer_series/p2.mp4",
  "first-home-03": "First_time_buyer_series/p3.mp4",
  "first-home-04": "First_time_buyer_series/p4.mp4",
  "first-home-05": "First_time_buyer_series/p5.mp4",
  "tour-14-ottavio-promenade": "4OttavioPromenade,-1.mp4",
  "tour-10-seidman-ave": "10seidman.mp4",
  "brand-film": "Nonrealestate_edited_video.mp4",
  "hero-loop": "4OttavioPromenade,-1.mp4",
};

function probe(file) {
  const raw = execFileSync(
    "ffprobe",
    [
      "-v", "error",
      "-show_entries", "stream=codec_type,width,height:format=duration",
      "-of", "json",
      file,
    ],
    { encoding: "utf8" },
  );
  const data = JSON.parse(raw);
  const video = data.streams.find((s) => s.codec_type === "video");
  const audio = data.streams.find((s) => s.codec_type === "audio");
  return {
    width: video?.width ?? null,
    height: video?.height ?? null,
    durationSeconds: Number(Number(data.format.duration).toFixed(2)),
    hasAudio: Boolean(audio),
  };
}

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

const manifest = {};

for (const [slug, master] of Object.entries(MASTERS)) {
  const masterPath = path.join(SRC, master);
  const derivative = path.join(OUT, `${slug}.mp4`);

  if (!existsSync(masterPath) || !existsSync(derivative)) {
    console.warn(`  skip ${slug} — missing master or derivative`);
    continue;
  }

  const info = probe(derivative);
  const transcriptFile = path.join(TRANSCRIPTS, `${slug}.txt`);
  const hasTranscript = existsSync(transcriptFile);

  manifest[slug] = {
    master: path.relative(ROOT, masterPath),
    masterSha256: sha256(masterPath),
    derivativeSha256: sha256(derivative),
    bytes: statSync(derivative).size,
    ...info,
    poster: existsSync(path.join(OUT, `${slug}.jpg`)) ? `/media/${slug}.jpg` : null,
    posterAvif: existsSync(path.join(OUT, `${slug}.avif`)) ? `/media/${slug}.avif` : null,
    captions: existsSync(path.join(OUT, `${slug}.vtt`)) ? `/media/${slug}.vtt` : null,
    transcript: hasTranscript
      ? readFileSync(transcriptFile, "utf8")
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean)
      : [],
    /*
     * Every master here carries an audio track, so every one of them needs
     * captions before it may be published. This flag makes that checkable in
     * the content layer rather than a matter of memory.
     */
    captionsRequired: info.hasAudio,
  };
}

writeFileSync(
  path.join(ROOT, "generated/media-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

const total = Object.values(manifest).reduce((sum, m) => sum + m.bytes, 0);
console.log(`Wrote ${Object.keys(manifest).length} entries.`);
console.log(`Deployed video weight: ${(total / 1024 / 1024).toFixed(1)} MB`);
for (const [slug, m] of Object.entries(manifest)) {
  const flag = m.captionsRequired && !m.captions ? "  ⚠ NO CAPTIONS" : "";
  console.log(
    `  ${slug.padEnd(28)} ${String(m.width)}x${String(m.height).padEnd(5)} ` +
      `${String(m.durationSeconds).padStart(6)}s ${(m.bytes / 1024 / 1024).toFixed(2)}MB${flag}`,
  );
}
