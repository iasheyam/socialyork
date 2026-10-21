import Link from "next/link";
import { InstagramIcon } from "@/components/InstagramIcon";
import { site } from "@/content/site";

export function SiteFooter() {
  const { legalName, address } = site.business;
  return (
    <footer className="border-t border-hairline bg-void px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <address className="space-y-1 font-mono text-[0.72rem] not-italic tracking-[0.04em] text-ink-dim">
          <p className="uppercase tracking-[0.18em] text-ink">{legalName}</p>
          <p>{address}</p>
        </address>

        <div className="space-y-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-dim sm:text-right">
          <nav className="flex gap-6 sm:justify-end">
            <Link href="/contact" className="transition-colors hover:text-ink">
              Contact
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </nav>
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SocialYork on Instagram"
            className="inline-flex transition-colors hover:text-gold"
          >
            <InstagramIcon />
          </a>
          <p>
            &copy; {new Date().getFullYear()} {legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
