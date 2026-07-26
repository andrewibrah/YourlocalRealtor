import Link from "next/link";

import { PlanMyMove } from "@/components/contact/PlanMyMoveButton";
import { InstagramGlyph } from "@/components/primitives/Icons";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import { HeroLoop } from "./HeroLoop";
import { proofStories } from "@/content/proof";
import { formatPrice } from "@/lib/format";
import { getVideo, heroLoop, videos } from "@/content/videos";
import { instagram } from "@/lib/site-config";
import { pad2 } from "@/lib/utils";

/**
 * Home hero.
 *
 * The slate. A promise line at display scale against the 9:16 unit, over a mono
 * metadata strip that states — in the first screen — coverage, how many
 * transactions are documented, their combined value with its scope attached,
 * and how large the film library is.
 *
 * `docs/01` forbids leading with an unscoped lifetime-sales figure. The number
 * here is not that: it is the exact sum of the three transactions documented on
 * this site, labelled as such, and it links to the page where each one is
 * itemised. Scope travels with the number.
 */
export function Hero() {
  const heroVideo = getVideo("tour-14-ottavio-promenade");

  const documentedTotal = proofStories.reduce(
    (sum, story) => sum + story.outcome.amount,
    0,
  );

  const slate = [
    { label: "Coverage", value: "Staten Island · Brooklyn" },
    { label: "Documented closings", value: pad2(proofStories.length) },
    {
      label: "Combined, these three",
      value: formatPrice(documentedTotal),
      href: "/results/",
    },
    { label: "Films in the library", value: pad2(videos.length) },
  ];

  return (
    <section id="hero" className="on-ink relative bg-ink text-paper">
      <div className="page-gutter mx-auto w-full max-w-page">
        <div className="grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-20">
          <div className="flex min-w-0 flex-col gap-8">
            <p className="flex items-center gap-3 font-data text-caption tracking-[0.2em] text-signal uppercase">
              <span aria-hidden="true">00</span>
              <span aria-hidden="true" className="h-px w-8 bg-ink-rule" />
              New York real estate
            </p>

            <h1 className="max-w-[14ch] font-display text-display-xl text-balance text-paper">
              Know the move before you make it.
            </h1>

            <p className="max-w-reading text-body-lg text-pretty text-ink-muted">
              Straight answers, serious property films, and hands-on
              representation for New York buyers and sellers. Watch first. Decide
              second. Nobody here will chase you.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <PlanMyMove variant="onInk" size="lg" />
              <Link
                href="/videos/"
                className="inline-flex min-h-11 items-center gap-2 rounded-button border border-ink-rule px-7 py-4 text-body-lg font-semibold text-paper transition-colors duration-[--duration-fast] hover:border-signal hover:text-signal"
              >
                Watch the films
              </Link>

              {/*
                Outbound link only — no embed and no script. The glyph is drawn
                to the site's own line weight rather than dropped in as the
                filled brand mark, so it sits beside the two primary actions
                without outranking them. The accessible name carries the
                destination and the new-tab behaviour; the icon is decorative.
              */}
              <a
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex size-14 min-h-11 items-center justify-center rounded-button border border-ink-rule text-paper transition-colors duration-[--duration-fast] hover:border-signal hover:text-signal"
              >
                <InstagramGlyph className="size-6" />
                <span className="sr-only">
                  Sharif on Instagram, @{instagram.handle} (opens in a new tab)
                </span>
              </a>
            </div>
          </div>

          {heroLoop ? (
            <div className="mx-auto flex w-full max-w-[22rem] flex-col gap-3 lg:mx-0 lg:ml-auto">
              <HeroLoop
                src={heroLoop.src}
                poster={heroLoop.poster}
                posterAvif={heroLoop.posterAvif}
                width={heroLoop.width}
                height={heroLoop.height}
                className="w-full"
              />
              <p className="font-data text-caption tracking-[0.14em] text-ink-muted uppercase">
                14 Ottavio Promenade, Tottenville
              </p>
            </div>
          ) : heroVideo ? (
            <div className="flex flex-col gap-3">
              <VideoFrame video={heroVideo} className="w-full" />
              <SourceLink video={heroVideo} tone="paper" />
            </div>
          ) : null}
        </div>
      </div>

      {/* The slate strip. */}
      <div className="border-t border-ink-rule">
        <dl className="page-gutter mx-auto grid w-full max-w-page grid-cols-2 gap-x-6 gap-y-6 py-6 lg:grid-cols-4">
          {slate.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="font-data text-caption tracking-[0.16em] text-ink-muted uppercase">
                {item.label}
              </dt>
              <dd className="tabular font-data text-body-lg text-paper">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="underline decoration-signal decoration-2 underline-offset-4 hover:text-signal"
                  >
                    {item.value}
                  </Link>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
