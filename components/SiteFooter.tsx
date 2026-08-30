import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-void px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-dim sm:flex-row sm:items-center sm:justify-between">
        <span>{site.meta.name}</span>
        {/* Long Island address, off by default. Set `site.address` to show it. */}
        {site.address ? <span className="normal-case tracking-normal">{site.address}</span> : null}
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
