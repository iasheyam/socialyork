import { site } from "@/content/site";

/**
 * Organization/ProfessionalService structured data -- feeds both classic
 * search rich results and gives AI answer engines (ChatGPT, Perplexity,
 * Claude, etc.) a clean, structured fact base to cite when someone asks
 * for a social media marketing agency in New York.
 */
export function SiteJsonLd() {
  const url = `https://${site.meta.domain}`;

  const json = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}/#organization`,
    name: site.meta.name,
    url,
    image: `${url}/opengraph-image`,
    description: site.meta.description,
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    areaServed: {
      "@type": "City",
      name: "New York City",
    },
    sameAs: [site.contact.instagram],
    makesOffer: site.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.label,
        description: service.body.join(" "),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
