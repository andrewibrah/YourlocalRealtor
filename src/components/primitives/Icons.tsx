/**
 * Icon set.
 *
 * `docs/04` §Iconography: one 1.75px rounded-line set. Brand glyphs are drawn
 * to the same weight and radius as the rest rather than dropped in as filled
 * marks, so a social link does not visually outrank the primary actions beside
 * it.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "size-5"}
      aria-hidden="true"
      {...stroke}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
