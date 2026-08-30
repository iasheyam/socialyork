import { Fragment } from "react";

/**
 * Renders a copy string, wrapping any literal `[DEMO: token]` in a visibly
 * placeholder marker (dashed outline, mono). This is what makes the section 0
 * replacement checklist self-evident in the build: unverified values look
 * unverified. Replace the token in `content/site.ts` and the marker disappears.
 */
const DEMO_PREFIX = "[DEMO:";
const SPLIT = /(\[DEMO:[^\]]*\])/g;

export function Demo({ children }: { children: string }) {
  const parts = children.split(SPLIT);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith(DEMO_PREFIX) ? (
          <mark
            key={i}
            className="mx-0.5 inline-block rounded-[3px] border border-dashed border-current/45 bg-transparent px-1.5 align-baseline font-mono text-[0.78em] not-italic tracking-tight text-current opacity-75"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
