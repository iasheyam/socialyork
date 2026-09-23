import { site } from "@/content/site";

/**
 * llms.txt -- an emerging convention (proposed by Mintlify) giving AI systems
 * a clean, structured summary of the site, alongside robots.txt and
 * sitemap.xml. Generated from the same content source as the page copy so it
 * can't drift out of sync.
 */
export async function GET() {
  const url = `https://${site.meta.domain}`;
  const services = site.services
    .map((s) => `- **${s.label}**: ${s.body.join(" ")}`)
    .join("\n");
  const otherServices = site.otherServices.items
    .map((i) => `- ${i.name}: ${i.subtitle}`)
    .join("\n");

  const body = `# ${site.meta.name}

> ${site.meta.description}

${site.meta.name} is a social media marketing agency based in New York City,
serving New York businesses.

## Core services

${services}

## Also offers

${otherServices}

## Contact

- Email: ${site.contact.email}
- Phone: ${site.contact.phone}
- Instagram: ${site.contact.instagram}
- Apply as an influencer: ${url}/influencers

## Pages

- [Homepage](${url}/): positioning, services, client results, and reporting approach.
- [Influencer application](${url}/influencers): for creators who want to partner on brand content.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
