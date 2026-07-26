"""
Generate WebVTT captions and plain-text transcripts from the approved masters.

Captions are a hard accessibility requirement for every speaking video
(WCAG 2.2 SC 1.2.2, and `sharif-site-definition/docs/03-video-content-system.md`
makes them a publication gate). They are produced here from the actual audio of
the master files — never written from a post caption or a title, which
`docs/03` prohibits outright.

The output is machine-generated. It is accurate enough to publish as an
accessibility affordance and is explicitly *not* treated as verified content:
every transcript carries `awaiting-approval` until a human has read it against
the film. Speech-to-text mishears names, addresses, and figures, which are
exactly the things on this site that must not be wrong.

Usage: python3 scripts/transcribe.py
"""

from __future__ import annotations

import json
import pathlib
import sys

from faster_whisper import WhisperModel

ROOT = pathlib.Path(__file__).resolve().parent.parent
AUDIO = pathlib.Path("/tmp/asr")
CAPTIONS = ROOT / "public" / "media"
TRANSCRIPTS = ROOT / "generated" / "transcripts"

CAPTIONS.mkdir(parents=True, exist_ok=True)
TRANSCRIPTS.mkdir(parents=True, exist_ok=True)


def timestamp(seconds: float) -> str:
    """WebVTT cue timestamp: HH:MM:SS.mmm"""
    ms = int(round(seconds * 1000))
    hours, ms = divmod(ms, 3_600_000)
    minutes, ms = divmod(ms, 60_000)
    secs, ms = divmod(ms, 1000)
    return f"{hours:02d}:{minutes:02d}:{secs:02d}.{ms:03d}"


def main() -> int:
    model = WhisperModel(
        "small.en", device="cpu", compute_type="int8", local_files_only=True
    )

    index: dict[str, dict] = {}

    for wav in sorted(AUDIO.glob("*.wav")):
        slug = wav.stem
        print(f"  {slug} …", flush=True)

        segments, info = model.transcribe(
            str(wav),
            language="en",
            vad_filter=True,
            beam_size=5,
        )

        cues: list[str] = ["WEBVTT", ""]
        paragraphs: list[str] = []
        buffer: list[str] = []

        for i, segment in enumerate(segments, start=1):
            text = segment.text.strip()
            if not text:
                continue

            cues.append(str(i))
            cues.append(f"{timestamp(segment.start)} --> {timestamp(segment.end)}")
            cues.append(text)
            cues.append("")

            buffer.append(text)
            # Break a paragraph on sentence-final punctuation so the readable
            # transcript is prose rather than a wall of cue fragments.
            if text.endswith((".", "!", "?")) and len(" ".join(buffer)) > 180:
                paragraphs.append(" ".join(buffer))
                buffer = []

        if buffer:
            paragraphs.append(" ".join(buffer))

        (CAPTIONS / f"{slug}.vtt").write_text("\n".join(cues), encoding="utf-8")
        (TRANSCRIPTS / f"{slug}.txt").write_text(
            "\n\n".join(paragraphs), encoding="utf-8"
        )

        index[slug] = {
            "durationSeconds": round(info.duration, 2),
            "paragraphs": paragraphs,
        }
        print(f"     {len(paragraphs)} paragraphs, {info.duration:.1f}s", flush=True)

    (TRANSCRIPTS / "index.json").write_text(
        json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"\nWrote {len(index)} transcripts.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
