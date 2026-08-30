import { SiteFooter } from "@/components/SiteFooter";
import { Wordmark } from "@/components/Wordmark";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Wordmark />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
