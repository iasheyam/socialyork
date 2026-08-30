/** Join class strings, dropping falsey values. No dependency, no merge logic. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
