import { cn } from "@/lib/cn";

type Tone = "void" | "paper";

/**
 * One section = one idea per screen. Consistent horizontal padding and a single
 * max-width column, left-aligned to echo the hero's bottom-left anchor.
 * `center` makes it a full quiet screen (positioning, guarantee, contact).
 */
export function Section({
  id,
  tone = "void",
  center = false,
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone === "paper" ? "paper" : undefined}
      className={cn(
        "px-6 sm:px-10 lg:px-16",
        center
          ? // Content is vertically centered, well clear of the top edge already --
            // no scroll-margin needed, and adding one would reveal a sliver of
            // whatever section comes before this one when jumped to directly.
            "flex min-h-[92svh] scroll-mt-0 items-center py-24 md:py-28"
          : "scroll-mt-16 py-24 md:py-36 lg:py-44",
        tone === "paper" ? "bg-paper text-paper-ink" : "bg-void text-ink",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
