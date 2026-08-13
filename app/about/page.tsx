import type { Metadata } from "next";
import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import Contour from "@/components/Contour";
import Mark from "@/components/Mark";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About us",
  description:
    "At Landmark Surveys, we are driven by a passion for surveying excellence and a commitment to modernising processes.",
  alternates: { canonical: "/about" },
};

/**
 * The WordPress build used leftover accountancy-template icons here
 * (services-05-audit-and-assurance.svg, services-01-tax-planning.svg,
 * services-06-consulting.svg). Replaced with purpose-drawn marks.
 */
const VALUES = [
  {
    title: "Qualified and registered surveying experts",
    icon: (
      <>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </>
    ),
  },
  {
    title: "Innovative solutions",
    icon: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v0h6v0c0-.4.1-.8.5-1.1A6 6 0 0 0 12 3z" />
      </>
    ),
  },
  {
    title: "Nationally accredited WHS systems",
    icon: (
      <>
        <path d="M12 3l7 3v6c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
];

const TEAM = [
  {
    name: "Ben Cleaver",
    role: "Director",
    credentials: "Registered Surveyor in the ACT and NSW (AMR).",
    bio: "With over 15 years of surveying experience, Ben has a wealth of knowledge in successfully managing large projects and teams, particularly across construction.",
  },
  {
    name: "Samuel Hathaway",
    role: "Director | Survey Manager",
    credentials:
      "Bachelor of Spatial Science (USQ), Certified Locator with BYDA, Qualified surveyor in the ACT.",
    bio: "Sam has a long history with Landmark Surveys and drives the day-to-day management of the team.",
  },
  {
    name: "Walter Schmidt",
    role: "Surveyor",
    credentials: "Qualified surveyor in the ACT.",
    bio: "Walter brings an exceptional array of skills having been a surveyor for 30 years.",
  },
  {
    name: "Tom Rugg",
    role: "Surveyor",
    credentials:
      "Associate Degree of Spatial Science (USQ), Qualified surveyor in the ACT.",
    bio: "",
  },
  {
    name: "Luke Bell",
    role: "Surveyor",
    credentials: "Diploma of Surveying, Qualified surveyor in the ACT.",
    bio: "",
  },
  {
    name: "Toby Baillie",
    role: "Surveyor",
    credentials:
      "Studying Bachelor of Spatial Science (USQ), Qualified surveyor in the ACT.",
    bio: "",
  },
  {
    name: "Jack Panne",
    role: "Surveyor",
    credentials: "Cert IV Surveying, Studying Diploma of Surveying.",
    bio: "",
  },
];

const GALLERY = [
  {
    src: "/images/about-gallery-1.jpg",
    alt: "Two people shaking hands",
  },
  {
    src: "/images/about-gallery-2.jpg",
    alt: "A person drafting on paper plans at a desk",
  },
  {
    src: "/images/about-gallery-4.jpg",
    alt: "A survey tripod in grass with a city skyline beyond",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About us"
        image="/images/about-history.jpg"
        imageAlt="Canberra's parliamentary buildings floodlit at dusk"
      />

      {/* Zone 1 — the opening statement, given room to breathe. */}
      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <p className="max-w-4xl font-display text-[1.75rem] leading-[1.3] tracking-[-0.02em] text-navy lg:text-[2.5rem] lg:leading-[1.22]">
            At Landmark Surveys, we are driven by a passion for surveying
            excellence and a commitment to modernising processes.
          </p>
        </div>
      </section>

      {/* Zone 2 — the three value statements, on dark. */}
      <section
        data-reveal
        className="relative isolate overflow-hidden bg-navy text-white"
      >
        <Contour opacity={0.1} drift scale={700} />
        <Mark className="absolute -left-24 -bottom-24 hidden h-[28rem] w-auto text-white/[0.05] lg:block" />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-28">
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10" data-stagger>
            {VALUES.map((value, i) => (
              <li key={value.title} className="border-t border-white/20 pt-7">
                <div className="flex items-start justify-between gap-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                    aria-hidden="true"
                  >
                    {value.icon}
                  </svg>
                  <span
                    className="index-numeral text-xs text-white/65"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 text-xl leading-snug">{value.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zone 3 — history as a timeline. */}
      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/about-history.jpg"
                  alt="Canberra's parliamentary buildings floodlit at dusk"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <h2 className="text-navy">Our history</h2>
              <div className="rule-converge mt-7 w-40 text-muted" />

              <div className="mt-8 space-y-5 text-ink-soft">
                <p>
                  Landmark Surveys was established in 2003 and quickly became
                  recognised for its accurate and efficient land surveying.
                  After almost 20 years of success and evolution, Sam and Ben
                  took over the business in 2021, having already worked within
                  the team for numerous years.
                </p>
                <p>
                  Since then, Landmark Surveys has cemented its reputation in
                  the industry for its professional and reliable services across
                  civil, construction and commercial industries.
                </p>
                <p>
                  Landmark Surveys is an established presence in Canberra and
                  surrounding region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zone 4 — full-bleed strip, doing the job of a divider. */}
      <section data-reveal aria-hidden="true" className="bg-navy-dark">
        <ul className="grid grid-cols-3">
          {GALLERY.map((item) => (
            <li key={item.src} className="relative aspect-[4/3] sm:aspect-[3/2]">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="33vw"
                className="object-cover opacity-85"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Zone 5 — mission and vision as two large statements. */}
      <section data-reveal className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid gap-14 md:grid-cols-2 md:gap-16">
            {[
              {
                label: "Our mission",
                body: "Deliver precise, cutting-edge spatial information to our clients, alleviating their stress and ensuring seamless execution and project success.",
              },
              {
                label: "Our vision",
                body: "To be recognised as the leading provider of innovative and reliable land surveying solutions, trusted by clients for our integrity and professionalism.",
              },
            ].map((item) => (
              <div key={item.label}>
                <h2 className="text-navy">{item.label}</h2>
                <div className="rule-converge mt-6 w-24 text-muted" />
                <p className="mt-6 font-display text-2xl leading-[1.32] tracking-[-0.02em] text-navy lg:text-[1.75rem]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zone 6 — the team. */}
      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="max-w-3xl">
            <h2 className="text-navy">Our team</h2>
            <div className="rule-converge mt-7 w-40 text-muted" />
            <p className="lede mt-8 text-ink-soft">
              Together we are not only committed to delivering exceptional work,
              but we are also part of the Landmark Surveys family, with most
              having worked in the business for more than 5 years. Every day, we
              are focused on delivering with precision and continually enhancing
              our technical capabilities.
            </p>
          </div>

          {/*
           * The original repeated one stock avatar for all seven people. A
           * monogram tile reads as deliberate instead of unfinished, and real
           * headshots drop into the same square when they arrive.
           */}
          <ul
            data-stagger
            className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TEAM.map((member, i) => (
              <li
                key={member.name}
                className="group border-t border-line pt-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center bg-navy font-display text-base text-white transition-colors group-hover:bg-accent group-hover:text-navy"
                    aria-hidden="true"
                  >
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span
                    className="index-numeral text-xs text-muted"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 text-xl text-navy">{member.name}</h3>
                <p className="field-label mt-2 text-accent-deep">{member.role}</p>
                <p className="field-value mt-4 text-ink-soft">
                  {member.credentials}
                </p>
                {member.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {member.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta
        heading="Interested in working with us?"
        body="We are always keen to hear from qualified surveyors and related professionals."
        ctaLabel="Find out more"
        ctaHref="/work-with-us"
      />
    </>
  );
}
