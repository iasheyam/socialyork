import { ClientReel } from "@/components/sections/ClientReel";
import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";

export function Clients() {
  const { label, lead, logoNote, items } = site.clients;
  return (
    <Section id="clients">
      <Reveal className="space-y-10">
        <Eyebrow>{label}</Eyebrow>

        <p className="max-w-2xl font-display leading-[1.3] text-[clamp(1.35rem,2.6vw,2rem)] text-current/85">
          {lead}
        </p>

        <ul className="flex flex-wrap gap-x-10 gap-y-12">
          {items.map((client) => (
            <li key={client.name} className="w-full max-w-[320px] space-y-4">
              <ClientReel client={client} />
              <div className="space-y-1">
                <p className="font-display text-lg text-ink">{client.name}</p>
                {client.location ? (
                  <p className="text-[0.8rem] text-ink-dim">{client.location}</p>
                ) : null}
              </div>
              {client.result ? (
                <div className="space-y-2 pt-1">
                  <p className="font-display text-3xl leading-none text-gold">
                    {client.result.stat}
                  </p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-dim">
                    {client.result.caption}
                  </p>
                  <p className="pt-1 text-sm leading-relaxed text-ink-dim">
                    {client.result.story}
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        {logoNote ? (
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">
            <Demo>{logoNote}</Demo>
          </p>
        ) : null}
      </Reveal>
    </Section>
  );
}
