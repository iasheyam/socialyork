import { Demo } from "@/components/Demo";
import { site } from "@/content/site";

/** [DEMO: creator-handles] -- four sample creator cards under Service 02. */
export function NetworkCards() {
  return (
    <div className="pt-4">
      <p className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint">
        {site.network.note}
      </p>
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[4px] bg-hairline sm:grid-cols-2 lg:grid-cols-4">
        {site.network.creators.map((creator) => (
          <li key={creator.handle} className="bg-void p-5">
            <p className="font-mono text-sm text-ink">{creator.handle}</p>
            <p className="mt-3 text-xs text-ink-dim">
              <Demo>{creator.vertical}</Demo>
            </p>
            <p className="mt-1 font-display text-2xl text-ink">
              <Demo>{creator.followers}</Demo>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
