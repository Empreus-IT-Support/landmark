import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import ContactCta from "@/components/ContactCta";
import Contour from "@/components/Contour";
import Hero from "@/components/Hero";
import ImageBand from "@/components/ImageBand";
import Mark from "@/components/Mark";
import SectionHeading from "@/components/SectionHeading";
import { PROJECTS } from "@/lib/projects";

const FEATURED = [
  "canberra-light-rail-stage-1",
  "australian-war-memorial-anzac-hall",
  "cit-woden",
];

const HOME_PROJECT_IMAGES: Record<string, { src: string; alt: string }> = {
  "canberra-light-rail-stage-1": {
    src: "/images/home-project-light-rail.jpg",
    alt: "A wide avenue leading towards Parliament House, Canberra",
  },
  "australian-war-memorial-anzac-hall": {
    src: "/images/home-project-awm.jpg",
    alt: "The facade of the Australian War Memorial",
  },
  "cit-woden": {
    src: "/images/home-project-cit-woden.jpg",
    alt: "Aerial view of a suburb with hills on the horizon",
  },
};

const featuredProjects = FEATURED.map((slug) => {
  const project = PROJECTS.find((item) => item.slug === slug)!;
  return { ...project, ...HOME_PROJECT_IMAGES[slug] };
});

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services — one continuous navy expanse, split by a flush image band
          the way the original did. */}
      <section
        id="services"
        data-reveal
        className="relative isolate overflow-hidden bg-navy scroll-mt-24"
      >
        <Contour opacity={0.1} drift scale={720} />
        <Mark className="absolute -left-24 top-24 hidden h-[30rem] w-auto text-white/[0.045] lg:block" />

        <div className="relative mx-auto max-w-[1200px] px-6 pt-24 lg:px-10 lg:pt-32">
          <SectionHeading>Our services</SectionHeading>
          <p className="lede mt-8 max-w-3xl text-white/75">
            Experts in topographic surveys, UAV (drone) surveys, cadastral
            surveys, laser scanning and underground service locating.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1200px]">
          <ImageBand
            overlap={false}
            images={[
              {
                src: "/images/home-construction.jpg",
                alt: "A surveyor using a total station on a tripod, with a crane behind",
              },
              {
                src: "/images/home-documents.jpg",
                alt: "A worker in a hard hat and high-visibility vest, a building behind",
              },
            ]}
          />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10" data-stagger>
            <article>
              <h3 className="text-white">Construction surveying</h3>
              <p className="mt-4 text-white/75">
                Specialists in surveying solutions for residential, unit
                developments, multi storey buildings, roads, bridges and rail.
                Boundary identification, digital elevation models and
                topographic spatial surveys to suit your requirements.
              </p>
              <Link
                href="/services#construction-surveying"
                className="mt-6 inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-accent"
              >
                Read more
                <span className="sr-only"> about construction surveying</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article>
              <h3 className="text-white">Utility locating</h3>
              <p className="mt-4 text-white/75">
                Underground utility detection, location and mapping prior to
                major construction works. For potholing, our hydro-vacuum
                excavation equipment is non-destructive and accurate. We also
                use electro-magnetic tools combined with GPS.
              </p>
              <Link
                href="/services#utility-locating"
                className="mt-6 inline-flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-accent"
              >
                Read more
                <span className="sr-only"> about utility locating</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        data-reveal
        className="edge-cut-top relative isolate overflow-hidden bg-navy-deep text-white"
      >
        <Contour opacity={0.12} drift scale={560} />

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <SectionHeading>Our projects</SectionHeading>
          <p className="lede mt-8 max-w-3xl text-white/75">
            Capabilities spanning commercial and residential, utilities, civil
            and infrastructure, rail and industrial.
          </p>

          <ul className="mt-16 grid gap-10 md:grid-cols-3" data-stagger>
            {featuredProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="mt-3 text-sm text-white/65">
                      {project.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Button href="/projects" variant="outline">
              Explore our projects
            </Button>
          </div>
        </div>
      </section>

      {/* About — background photograph anchored top-right on large screens,
          the treatment the original used here. */}
      <section data-reveal className="relative isolate overflow-hidden bg-paper">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block">
          <Image
            src="/images/home-about.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="46vw"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/about-gallery-3.jpg"
                  alt="A survey tripod set up in a green field"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 items-center justify-center bg-navy lg:flex">
                <Mark className="h-14 w-auto text-white" />
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="About Landmark Surveys" tone="light">
                Landmark Surveys was
                <br />
                established in 2003
              </SectionHeading>
              <p className="lede mt-8 text-ink-soft">
                And is a leader in accurate and reliable land surveying services
                across the ACT and regional NSW.
              </p>
              <p className="mt-5 text-ink-soft">
                Our team of experienced professionals combine surveying
                expertise with a passion for clear communication and finding
                innovative solutions. Active registration in the ACT and NSW
                means we stay up to date with the latest technologies and
                legislation.
              </p>
              <p className="mt-5 text-ink-soft">
                We are proud to be the surveyor of choice for many of our
                long-term clients.
              </p>
              <div className="mt-10">
                <Button href="/about">Get to know us</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
