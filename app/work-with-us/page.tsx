import type { Metadata } from "next";
import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import Contour from "@/components/Contour";
import Mark from "@/components/Mark";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Work with us",
  description:
    "Landmark Surveys is an established and credible business in the ACT. Interested in furthering your career in the innovative spatial and surveying industry? Get in touch with us.",
  alternates: { canonical: "/work-with-us" },
};

/** The five support points, verbatim and complete. */
const SUPPORT = [
  "interesting and challenging projects",
  "ongoing training and study leave",
  "a supportive work environment",
  "a variety of onsite and office work",
  "flexible work arrangements where possible.",
];

export default function WorkWithUsPage() {
  return (
    <>
      <PageHero
        title="Work with us"
        intro="Landmark Surveys is an established and credible business in the ACT."
        image="/images/project-one-city-hill.jpg"
        imageAlt="A surveyor operating a total station beside water"
      />

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          {/* The source page said "For 30 years" here while the About page
              dates the business to 2003 — see CONTENT-NOTES.md. */}
          <p className="max-w-4xl font-display text-[1.75rem] leading-[1.3] tracking-[-0.02em] text-navy lg:text-[2.25rem] lg:leading-[1.24]">
            Since 2003, we have built a reputation for delivering high-quality
            advice and efficient surveying services.
          </p>
          <p className="lede mt-8 max-w-2xl text-ink-soft">
            We boast a strong track-record of repeat clients and word-of-mouth
            referrals.
          </p>
        </div>
      </section>

      <section
        data-reveal
        className="relative isolate overflow-hidden bg-navy text-white"
      >
        <Contour opacity={0.1} drift scale={680} />
        <Mark className="absolute -right-24 -top-20 hidden h-[30rem] w-auto text-white/[0.05] lg:block" />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <h2>Our team is supported with:</h2>
          <div className="rule-converge mt-7 w-40 text-white/40" />

          <ol className="mt-14 border-t border-white/15" data-stagger>
            {SUPPORT.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-6 border-b border-white/15 py-6 lg:gap-10"
              >
                <span
                  className="index-numeral text-sm text-accent"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl lg:text-2xl">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Full-bleed band */}
      <section data-reveal aria-hidden="true" className="bg-navy-dark">
        <div className="relative aspect-[21/9] w-full lg:aspect-[3/1]">
          <Image
            src="/images/about-gallery-3.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section data-reveal className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <p className="max-w-3xl font-display text-2xl leading-[1.32] tracking-[-0.02em] text-navy lg:text-[1.75rem]">
            Interested in furthering your career in the innovative spatial and
            surveying industry? If you are a qualified surveyor or have a
            qualification in a related discipline, get in touch with us.
          </p>
        </div>
      </section>

      <ContactCta
        heading="Contact us"
        body="To discuss your opportunities."
        ctaLabel="Get in touch"
      />
    </>
  );
}
