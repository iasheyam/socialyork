import { Demo } from "@/components/Demo";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { cn } from "@/lib/cn";
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

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((client) => (
            <li key={client.name} className="space-y-3">
              <div className="flex h-12 items-center">
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-9 w-auto opacity-85"
                  />
                ) : (
                  <span className="font-display text-lg text-ink">
                    {client.name}
                  </span>
                )}
              </div>
              <p className="font-mono text-sm text-ink-dim">
                <Demo>{client.result}</Demo>
              </p>
              {client.logo ? (
                <p className="font-display text-base text-ink">{client.name}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <p
          className={cn(
            "font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint",
          )}
        >
          <Demo>{logoNote}</Demo> logo files drop into /public/logos
        </p>
      </Reveal>
    </Section>
  );
}
