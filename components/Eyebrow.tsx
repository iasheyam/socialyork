import { cn } from "@/lib/cn";

/** Mono section label with an optional index, e.g. `01  Content Marketing`. */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      data-eyebrow
      className={cn(
        "flex items-baseline gap-3 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-gold",
        className,
      )}
    >
      {index ? (
        <span className="tabular-nums opacity-55">{index}</span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
