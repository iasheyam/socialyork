import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.meta.name}`,
  description: `How ${site.business.legalName} collects, uses and protects your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { legalName, address } = site.business;
  const { email } = site.contact;
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 20, 2026"
      intro={`${legalName} ("SocialYork", "we", "us") respects your privacy. This policy explains what we collect through ${site.meta.domain}, why, and the choices you have.`}
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                Information you give us: when you use our contact or influencer
                application forms we collect your name, email address, phone
                number, company, website, and anything else you choose to
                include in your message.
              </p>
              <p>
                Information collected automatically: standard technical data
                such as browser type, device, pages viewed and approximate
                location, collected through server logs and, where enabled,
                analytics tools.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              To respond to your enquiry, evaluate and manage client and
              creator relationships, provide and improve our services and
              website, and meet legal obligations. We do not sell your personal
              information.
            </p>
          ),
        },
        {
          heading: "Service providers",
          body: (
            <p>
              We share information with vendors that help us operate the site
              and handle enquiries, such as form-processing, hosting and
              analytics providers. They may only use it to perform services for
              us. We may also disclose information if required by law or to
              protect our rights.
            </p>
          ),
        },
        {
          heading: "Cookies and analytics",
          body: (
            <p>
              We may use cookies or similar technologies to understand how the
              site is used. You can control cookies through your browser
              settings.
            </p>
          ),
        },
        {
          heading: "Retention and security",
          body: (
            <p>
              We keep information only as long as needed for the purposes above
              or as the law requires, and use reasonable safeguards to protect
              it. No method of transmission or storage is completely secure.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You may ask to access, correct or delete the personal information
              we hold about you, or opt out of marketing messages at any time,
              by contacting us at{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4">
                {email}
              </a>
              . Depending on where you live, you may have additional rights
              under local law.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              Our site is not directed to children under 13 and we do not
              knowingly collect their information.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>
              We may update this policy from time to time. The date above shows
              when it was last revised.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              {legalName}, {address}.{" "}
              <a href={`mailto:${email}`} className="underline underline-offset-4">
                {email}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
