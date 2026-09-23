import { ClientReel } from "@/components/sections/ClientReel";
import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Clients() {
  const { label, title, body, logoNote, items } = site.clients;
  return (
    <Section
      id="clients"
      tone="paper"
      className="pt-10 pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
    >
      <Reveal className="space-y-10">
        <Eyebrow>{label}</Eyebrow>

        <h2 className="max-w-3xl font-display leading-[1.06] tracking-[-0.02em] text-[clamp(2rem,5vw,3.75rem)]">
          {title}
        </h2>

        <div className="max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-current/65">
          {body.map((paragraph, i) => (
            <p key={i}>
              <Demo>{paragraph}</Demo>
            </p>
          ))}
        </div>

        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:snap-none sm:gap-x-10 sm:gap-y-12 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {items.map((client) => (
            <li
              key={client.name}
              className="w-[280px] shrink-0 snap-start space-y-4 sm:w-full sm:max-w-[320px] sm:shrink"
            >
              <ClientReel client={client} />
              <div className="space-y-1">
                <p className="font-display text-lg text-current">{client.name}</p>
                {client.location ? (
                  <p className="text-[0.8rem] text-current/60">{client.location}</p>
                ) : null}
              </div>
              {client.result ? (
                <div className="space-y-2 pt-1">
                  <p
                    data-stat
                    className="font-display text-3xl leading-none text-gold"
                  >
                    {client.result.stat}
                  </p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-current/60">
                    {client.result.caption}
                  </p>
                  <p className="pt-1 text-sm leading-relaxed text-current/60">
                    {client.result.story}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        {logoNote ? (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-current/40">
            <Demo>{logoNote}</Demo>
          </p>
        ) : null}
      </Reveal>
    </Section>
  );
}
