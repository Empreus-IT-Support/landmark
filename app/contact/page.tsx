import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Landmark Surveys is located at Unit 15, 53-65 Wollongong Street, Fyshwick ACT 2609. Phone (02) 6280 9608.",
  alternates: { canonical: "/contact" },
};

// Bounding box around the Fyshwick office for the OpenStreetMap embed.
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
  CONTACT.lng - 0.004
}%2C${CONTACT.lat - 0.0025}%2C${CONTACT.lng + 0.004}%2C${
  CONTACT.lat + 0.0025
}&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        intro="Using the latest measuring equipment, calculation and drafting software, Landmark Surveys delivers reliable and comprehensive surveying of the highest quality."
        image="/images/services-registration.jpg"
        imageAlt="A worker in a hard hat viewing a site map on a tablet"
      />

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <h2 className="text-navy">We&apos;re here for you!</h2>
              <p className="mt-5 text-ink-soft">
                Our team is experienced across the full spectrum of surveying,
                with active registration in the ACT and NSW.
              </p>

              <address className="mt-10 space-y-5 not-italic">
                <div>
                  <h3 className="eyebrow text-navy">
                    Address
                  </h3>
                  <p className="mt-2 text-ink-soft">
                    {CONTACT.addressLine}
                    <br />
                    {CONTACT.suburb} {CONTACT.state} {CONTACT.postcode}
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow text-navy">
                    Phone
                  </h3>
                  <p className="mt-2">
                    <a
                      href={CONTACT.phoneHref}
                      className="text-ink-soft transition-colors hover:text-navy"
                    >
                      {CONTACT.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="eyebrow text-navy">
                    Email
                  </h3>
                  <p className="mt-2">
                    <a
                      href={CONTACT.emailHref}
                      className="break-words text-ink-soft transition-colors hover:text-navy"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </address>
            </div>

            <div>
              <h2 className="text-navy">
                Have a current scope of work? Email it to us today for a quote.
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        The WordPress build had a map block gated behind a consent flag with no
        consent banner on the site, so it rendered as a 600px blank gap. This
        uses an OpenStreetMap embed that needs no API key and sets no cookies.
      */}
      <section data-reveal aria-labelledby="find-us">
        <h2 id="find-us" className="sr-only">
          Find us
        </h2>
        <iframe
          src={mapSrc}
          title={`Map showing Landmark Surveys at ${CONTACT.fullAddress}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[420px] w-full border-0 lg:h-[520px]"
        />
      </section>
    </>
  );
}
