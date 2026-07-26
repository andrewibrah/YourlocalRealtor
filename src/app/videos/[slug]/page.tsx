import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactActions } from "@/components/contact/ContactActions";
import { PageHero } from "@/components/layout/PageHero";
import { VerificationNote } from "@/components/primitives/Data";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { MarkSeriesStep } from "@/components/video/BuyerSeries";
import { SourceLink, VideoFrame } from "@/components/video/VideoFrame";
import { properties } from "@/content/properties";
import { VIDEO_CATEGORY_LABELS } from "@/content/video-taxonomy";
import { buyerSeries, getVideo, videos } from "@/content/videos";
import { JsonLd, absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { pad2 } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return videos.map((video) => ({ slug: video.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = getVideo(slug);

  if (!video) return {};

  return buildMetadata({
    title: video.topic,
    description: video.outcome,
    path: `/videos/${video.slug}/`,
  });
}

export default async function VideoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const video = getVideo(slug);

  if (!video) notFound();

  const seriesIndex = buyerSeries.findIndex((item) => item.slug === video.slug);
  const inSeries = seriesIndex !== -1;
  const previous = inSeries ? buyerSeries[seriesIndex - 1] : undefined;
  const next = inSeries ? buyerSeries[seriesIndex + 1] : undefined;

  const relatedProperty = properties.find(
    (property) => property.videoSlug === video.slug,
  );

  return (
    <>
      {/* Records that this episode was opened. Local, non-identifying. */}
      {inSeries ? <MarkSeriesStep slug={video.slug} /> : null}

      <PageHero
        index={video.episode !== null ? pad2(video.episode) : "—"}
        eyebrow={VIDEO_CATEGORY_LABELS[video.category]}
        title={video.topic}
        standfirst={video.outcome}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Videos", href: "/videos/" },
          { name: video.topic, href: `/videos/${video.slug}/` },
        ]}
        meta={[
          { label: "Topic", value: VIDEO_CATEGORY_LABELS[video.category] },
          {
            label: "Series",
            value: video.series
              ? video.series === "first-time-homebuyer"
                ? "First home"
                : "Property films"
              : "Standalone",
          },
          {
            label: "Playback",
            value: video.media ? "Available" : "Awaiting master",
          },
        ]}
      />

      <Section id="film" tone="paper">
        <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
          <div className="flex flex-col gap-4 lg:max-w-sm">
            <VideoFrame video={video} />
            <SourceLink video={video} />
          </div>

          <div className="flex flex-col gap-8">
            <SectionHeading
              index="01"
              eyebrow="About this film"
              title="What it covers."
              standfirst={video.outcome}
            />

            <VerificationNote
              verification={video.verification}
              variant="block"
            />

            {video.media ? (
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-heading-md">Transcript</h3>
                <div className="flex max-w-reading flex-col gap-4 text-body-lg text-pretty text-ink/85">
                  {video.media.transcript.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex max-w-reading flex-col gap-3 rounded-card border border-gray-300 bg-gray-100 p-5">
                <h3 className="font-display text-heading-md">Transcript</h3>
                <p className="text-body text-pretty text-gray-600">
                  The transcript is produced from the licensed master, not
                  guessed from the post caption. It will appear here alongside
                  the player once the master, the caption file, and the rights
                  confirmation are all in place.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={video.cta.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-button bg-ink px-7 py-4 text-body-lg font-semibold text-paper transition-colors hover:bg-action-dark"
              >
                {video.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
              {relatedProperty ? (
                <Link
                  href={`/properties/${relatedProperty.slug}/`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-button border border-ink/25 px-7 py-4 text-body-lg font-semibold text-ink transition-colors hover:border-ink"
                >
                  About this property
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Section>

      {inSeries ? (
        <Section id="series" tone="quiet">
          <SectionHeading
            index="02"
            eyebrow="First-home series"
            title="Where this sits in the sequence."
          />
          <nav
            aria-label="Series navigation"
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/videos/${previous.slug}/`}
                className="flex flex-col gap-1 rounded-card border border-gray-300 bg-white p-5 transition-colors hover:border-ink"
              >
                <span className="font-data text-caption tracking-[0.14em] text-gray-600 uppercase">
                  ← Part {pad2(previous.episode ?? 0)}
                </span>
                <span className="font-display text-heading-md text-balance">
                  {previous.topic}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/videos/${next.slug}/`}
                className="flex flex-col gap-1 rounded-card border border-gray-300 bg-white p-5 text-right transition-colors hover:border-ink sm:col-start-2"
              >
                <span className="font-data text-caption tracking-[0.14em] text-gray-600 uppercase">
                  Part {pad2(next.episode ?? 0)} →
                </span>
                <span className="font-display text-heading-md text-balance">
                  {next.topic}
                </span>
              </Link>
            ) : (
              <Link
                href="/contact/"
                className="flex flex-col gap-1 rounded-card border border-ink bg-ink p-5 text-right text-paper transition-colors hover:bg-action-dark sm:col-start-2"
              >
                <span className="font-data text-caption tracking-[0.14em] text-signal uppercase">
                  Series complete →
                </span>
                <span className="font-display text-heading-md text-balance">
                  Now make it about your situation
                </span>
              </Link>
            )}
          </nav>
          <p className="mt-8">
            <Link
              href="/buy/first-home/"
              className="font-semibold text-action-ink underline underline-offset-4 hover:text-ink"
            >
              See the whole runway
            </Link>
          </p>
        </Section>
      ) : null}

      <Section id="contact" tone="ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            index={inSeries ? "03" : "02"}
            eyebrow="Next"
            tone="paper"
            title="Ask about your own situation."
            standfirst="No form, no account, nothing submitted from this website."
          />
          <ContactActions tone="paper" />
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos/" },
            { name: video.topic, path: `/videos/${video.slug}/` },
          ]),
          /*
           * `VideoObject` is emitted only when a real, hosted media package
           * exists. Marking up a film that cannot be played — with no
           * `contentUrl`, no `thumbnailUrl`, and no `uploadDate` — would tell
           * search engines a video is available here when it is not.
           */
          ...(video.media
            ? [
                {
                  "@type": "VideoObject",
                  name: video.topic,
                  description: video.outcome,
                  thumbnailUrl: absoluteUrl(video.media.poster),
                  contentUrl: absoluteUrl(video.media.sources[0].src),
                  duration: `PT${Math.round(video.media.durationSeconds)}S`,
                },
              ]
            : []),
        ]}
      />
    </>
  );
}
