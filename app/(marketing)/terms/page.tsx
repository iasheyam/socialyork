import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${site.meta.name}`,
  description: `The terms for using ${site.meta.domain}, operated by ${site.business.legalName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const { legalName, address } = site.business;
  const { email } = site.contact;
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 20, 2026"
      intro={`These terms govern your use of ${site.meta.domain}, operated by ${legalName}. By using the site you agree to them. Client engagements are governed by a separate written agreement.`}
      sections={[
        {
          heading: "Use of the site",
          body: (
            <p>
              You may use the site for lawful purposes only. You agree not to
              interfere with its operation, attempt unauthorized access, or
              submit false or misleading information through our forms.
            </p>
          ),
        },
        {
          heading: "Our services",
          body: (
            <p>
              Information on the site describes our services in general terms
              and is not an offer. Scope, fees and deliverables are set out in
              a written agreement signed with each client or creator.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The site, including its text, design, logos and video, is owned
              by {legalName} or its licensors and is protected by intellectual
              property law. Client names, logos and work shown remain the
              property of their respective owners. You may not copy or reuse
              our content without written permission.
            </p>
          ),
        },
        {
          heading: "Submissions",
          body: (
            <p>
              Information you send through our forms is handled under our{" "}
              <a href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </a>
              . Submitting a form does not create a client relationship.
            </p>
          ),
        },
        {
          heading: "Disclaimer",
          body: (
            <p>
              The site is provided &ldquo;as is&rdquo; without warranties of
              any kind. We do not guarantee that it will be uninterrupted or
              error-free, or that marketing results will meet any particular
              level.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the fullest extent permitted by law, {legalName} is not
              liable for indirect, incidental or consequential damages arising
              from your use of the site.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of the State of New York,
              without regard to conflict-of-law rules.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms at any time; continued use means you
              accept the changes. Questions:{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4">
                {email}
              </a>
              , or write to {legalName}, {address}.
            </p>
          ),
        },
      ]}
    />
  );
}
