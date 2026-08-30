/**
 * Phase 2 portal shell -- intentionally a stub.
 *
 * No routes live under this group yet and nothing links to it. It exists so that
 * when client auth, invoice / receipt download and performance reporting arrive,
 * none of the marketing code has to move. Auth provider and data layer are
 * deliberately unpicked (see the build brief, section 4 and section 10).
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-portal-root>{children}</div>;
}
