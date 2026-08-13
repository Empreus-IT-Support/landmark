import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ContactCta from "@/components/ContactCta";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Using the latest measuring equipment, calculation and drafting software, Landmark Surveys delivers reliable and comprehensive surveying of the highest quality.",
  alternates: { canonical: "/services" },
};

const BLOCKS = [
  {
    id: "construction-surveying",
    title: "Construction surveying",
    intro:
      "Across every project, we support developers, builders, engineers and architects with:",
    items: [
      "subdivision/stratum surveying, including lodgement",
      "boundary identification for a property",
      "topographic surveying for details of land features",
      "UAV and drone aerial imagery and digital elevation models (CASA certified)",
      "survey certificates.",
    ],
    image: "/images/services-construction.jpg",
    imageAlt: "A surveyor with a total station beside a rural road",
    cta: null,
  },
  {
    id: "utility-locating",
    title: "Utility locating",
    intro:
      "Essential pre-excavation requires the accurate location of existing underground utilities. We provide effective sub-surface utility detection and mapping using:",
    items: [
      "potholing",
      "electro-magnetic tools",
      "hydro-vacuum excavation (non-destructive).",
    ],
    image: "/images/services-utility-locating.jpg",
    imageAlt: "A worker in a high-visibility vest holding rolled plans in woodland",
    cta: { href: "/projects", label: "Explore our recent projects" },
  },
  {
    id: "registration",
    title: "Registration",
    intro:
      "Active registration is vital to ensure our services are delivered competently, accurately and in line with various Acts and Regulations. To be registered in the ACT and NSW, surveyors must have:",
    items: [
      "completed a four-year degree in surveying or equivalent",
      "two years of practical experience",
      "a Certificate of Competency",
      "ongoing professional development to stay up to date with technology and legislation.",
    ],
    image: "/images/services-registration.jpg",
    imageAlt: "A worker in a hard hat viewing a site map on a tablet",
    cta: { href: "/about", label: "Meet our team" },
  },
  {
    id: "our-tools",
    title: "Our tools",
    intro:
      "To back our expertise, we use a mix of modern surveying instruments including:",
    items: [
      "Global Navigation Satellite System (GNSS)",
      "Global Positioning System (GPS)",
      "UAV/drones",
      "drafting software.",
    ],
    image: "/images/services-tools.jpg",
    imageAlt: "An operator using a drone controller beside a field",
    cta: null,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our services"
        intro="Using the latest measuring equipment, calculation and drafting software, Landmark Surveys delivers reliable and comprehensive surveying of the highest quality."
        image="/images/services-construction.jpg"
        imageAlt="A surveyor with a total station beside a rural road"
      />

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="lede max-w-3xl text-ink-soft">
            Our team is experienced across the full spectrum of surveying, with
            active registration in the ACT and NSW.
          </p>

          {/* Jump index — the page reads as a numbered schedule of services. */}
          <nav aria-label="Services on this page" className="mt-14">
            <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {BLOCKS.map((block, index) => (
                <li key={block.id} className="bg-white">
                  <a
                    href={`#${block.id}`}
                    className="group flex h-full items-baseline gap-4 p-6 transition-colors hover:bg-navy"
                  >
                    <span className="index-numeral text-xs text-accent-deep group-hover:text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg text-navy transition-colors group-hover:text-white">
                      {block.title}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div data-stagger className="mt-24 space-y-28">
            {BLOCKS.map((block, index) => (
              <article
                key={block.id}
                id={block.id}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={block.image}
                      alt={block.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  {/* Oversized index numeral straddling the image edge. */}
                  <span
                    aria-hidden="true"
                    className={`index-numeral absolute -top-8 hidden text-[5.5rem] leading-none text-muted lg:block ${
                      index % 2 === 1 ? "-right-4" : "-left-4"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h2 className="text-navy">{block.title}</h2>
                  <div className="rule-converge mt-6 w-28 text-muted" />
                  <p className="mt-6 text-ink-soft">{block.intro}</p>
                  <ul className="mt-7 border-t border-line">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-b border-line py-3 text-ink-soft"
                      >
                        <span
                          className="index-numeral mt-0.5 shrink-0 text-[0.625rem] text-muted"
                          aria-hidden="true"
                        >
                          ●
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {block.cta && (
                    <div className="mt-8">
                      <Button href={block.cta.href}>{block.cta.label}</Button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        heading="Contact us"
        body="To discuss your upcoming project."
        ctaLabel="Get in touch"
      />
    </>
  );
}
