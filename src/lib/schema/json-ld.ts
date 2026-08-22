import { emailAddress, emailHref, githubHref, twitterHref } from "@/app/components/site-footer";
import { siteDescription, siteName, siteUrl } from "@/app/metadata";

export const jobTitle = "Design Engineer";
export const addressCountry = "DE";

const PERSON_ID = `${siteUrl}/#person`;
const ORGANIZATION_ID = `${siteUrl}/#org`;

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: siteName,
        url: siteUrl,
        email: emailHref,
        jobTitle,
        description: siteDescription,
        sameAs: [twitterHref, githubHref],
        worksFor: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: siteName,
        url: siteUrl,
        email: emailAddress,
        founder: { "@id": PERSON_ID },
        contactPoint: {
          "@type": "ContactPoint",
          email: emailAddress,
          contactType: "inquiries",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry,
        },
      },
    ],
  };
}
