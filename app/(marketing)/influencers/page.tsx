import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { InfluencerApplyForm } from "@/components/sections/InfluencerApplyForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.influencerApply.title} — ${site.meta.name}`,
  description: site.influencerApply.body,
  alternates: { canonical: "/influencers" },
};

export default function InfluencersPage() {
  const { eyebrow, title, body } = site.influencerApply;
  return (
    <Section
      id="influencer-apply"
      tone="paper"
      className="pt-32 sm:pt-36 lg:pt-40"
    >
      <Reveal className="space-y-9">
        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="max-w-3xl font-display leading-[1.06] tracking-[-0.02em] text-[clamp(2.25rem,5.5vw,4rem)]">
          {title}
        </h1>

        <p className="max-w-xl text-[1.05rem] leading-relaxed text-current/65">
          {body}
        </p>

        <div className="pt-4">
          <InfluencerApplyForm />
        </div>
      </Reveal>
    </Section>
  );
}
