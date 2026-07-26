import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Section, SectionHeading } from "@/components/primitives/Typography";
import { VideoLibrary } from "@/components/video/VideoLibrary";
import { videos } from "@/content/videos";
import {
  JsonLd,
  breadcrumbSchema,
  buildMetadata,
  itemListSchema,
} from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Film library",
  description:
    "An owned library of buyer education, seller education, market decisions, and property films — with written summaries and transcripts. Not an Instagram feed.",
  path: "/videos/",
});

export default function VideosPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="The library"
        title="Everything, organised by the decision it helps with."
        standfirst="This is a library, not a feed. Each film is filed under the decision it belongs to, with a written summary and — once the licensed masters land — a full transcript."
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Videos", href: "/videos/" },
        ]}
        meta={[
          { label: "Films", value: String(videos.length).padStart(2, "0") },
          { label: "Series", value: "First home · Property films" },
          { label: "Autoplay with sound", value: "Never" },
        ]}
      />

      <Section id="library" tone="paper">
        <SectionHeading
          index="01"
          eyebrow="Browse"
          title="The library."
          standfirst="Filter by topic, or scroll the lot."
        />
        <div className="mt-10">
          <VideoLibrary videos={videos} />
        </div>
      </Section>

      <Section id="how" tone="quiet">
        <SectionHeading
          index="02"
          eyebrow="How this works"
          title="Why some films are not playable yet."
          standfirst="These films were published on social platforms. Publishing there does not grant the right to re-host them on a website, and the music licence almost never transfers."
        />
        <div className="mt-8 flex max-w-reading flex-col gap-5 text-body-lg text-pretty text-gray-600">
          <p>
            Rather than embed a social player, scrape the files, or hotlink
            someone else&rsquo;s bandwidth, this site waits for a rights-cleared
            export of each film, together with captions and a written transcript.
          </p>
          <p>
            Until then each entry shows a slate: what the film covers and where it
            was originally published. Nothing here pretends to be a frame of a
            film that has not been released.
          </p>
          <p>
            When a master arrives, the slate is replaced by a real player with
            captions on by default, a visible transcript, and full keyboard
            control. No page needs to be rebuilt for that to happen.
          </p>
        </div>
      </Section>

      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos/" },
          ]),
          itemListSchema(
            "Film library",
            videos.map((video) => ({
              name: video.topic,
              path: `/videos/${video.slug}/`,
            })),
          ),
        ]}
      />
    </>
  );
}
