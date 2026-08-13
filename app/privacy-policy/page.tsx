import type { Metadata } from "next";
import { CONTACT, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

/**
 * The source page ships with a heading and no body text.
 *
 * This is a holding page, not a policy. An earlier revision described how
 * enquiry data is used, retained and disclosed — none of which we can know,
 * and all of which is a statement of the client's legal obligations. It has
 * been removed. What remains states only what this website technically does
 * (facts about the build) and points to the business for the policy itself.
 *
 * Landmark Surveys must supply their own reviewed policy before launch, and
 * the page is noindex until they do. See CONTENT-NOTES.md.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-navy-dark">
        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-40 lg:px-10 lg:pb-24 lg:pt-52">
          <h1 className="text-white">Privacy Policy</h1>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-24">
          <div className="space-y-8 text-ink-soft">
            <p className="lede">
              {SITE_NAME}&apos;s privacy policy is available on request. Please
              contact us using the details below and we will provide a copy.
            </p>

            <div>
              <h2 className="text-navy">What this website collects</h2>
              <p className="mt-4">
                The only information this website collects is what you enter
                into the enquiry form on the contact page — your name,
                organisation, phone number, email address, the project address
                you supply and your message. It is sent to the business by
                email.
              </p>
              <p className="mt-4">
                The website sets no advertising or analytics cookies. The map on
                the contact page is served by OpenStreetMap, so opening that
                page sends a request to their servers in order to display it.
              </p>
            </div>

            <div>
              <h2 className="text-navy">Contact us</h2>
              <address className="mt-4 not-italic">
                {SITE_NAME}
                <br />
                {CONTACT.fullAddress}
                <br />
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-navy"
                >
                  {CONTACT.phone}
                </a>
                <br />
                <a
                  href={CONTACT.emailHref}
                  className="transition-colors hover:text-navy"
                >
                  {CONTACT.email}
                </a>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
