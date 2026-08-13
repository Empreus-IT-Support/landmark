import Contour from "@/components/Contour";
import Mark from "@/components/Mark";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactCta from "@/components/ContactCta";
import { PROJECTS, getProject } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} (${project.years})`;
  return {
    title,
    // Falls back to the project's own register line rather than an invented
    // sentence about what the work involved.
    description: project.summary || `${title}. Client: ${project.client}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = PROJECTS.filter((item) => item.slug !== project.slug).slice(
    0,
    3,
  );

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 -z-10">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="ken-burns object-cover"
          />
          <div
            className="absolute inset-0 bg-navy-dark/35 mix-blend-multiply"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/75 to-navy-dark/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-navy-dark/40"
            aria-hidden="true"
          />
          <Contour opacity={0.1} drift scale={660} />
        </div>

        <Mark className="absolute -bottom-16 right-[-4rem] -z-10 hidden h-[26rem] w-auto text-white/[0.05] lg:block" />

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
          <Link
            href="/projects"
            className="eyebrow text-white/60 transition-colors hover:text-accent"
          >
            ← All projects
          </Link>
          {/* The WordPress build made this an h2 and left the page with no h1. */}
          <h1 className="mt-6 max-w-4xl text-white">
            {project.title}{" "}
            <span className="whitespace-nowrap">({project.years})</span>
          </h1>
          <div className="rule-converge mt-8 w-44 text-white/40" />
          {project.summary && (
            <p className="lede mt-8 max-w-2xl text-white/75">
              {project.summary}
            </p>
          )}
        </div>
      </section>

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          {/* Client and years are the only project metadata the source
              site publishes. */}
          <dl className="grid grid-cols-2 gap-px border border-line bg-line">
            {[
              ["Client", project.client],
              ["Years", project.years],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-6">
                <dt className="field-label text-muted">{label}</dt>
                <dd className="field-value mt-3 text-navy">{value}</dd>
              </div>
            ))}
          </dl>

          {/* The source site labels this list "Features". Three of the five
              projects have no list at all, so the block is simply omitted
              rather than filled with a stand-in line. */}
          {project.features.length > 0 && (
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <h2 className="text-navy">Features</h2>
                <div className="rule-converge mt-6 w-24 text-muted" />
              </div>

              <ol className="border-t border-line">
                {project.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex gap-5 border-b border-line py-5 text-ink-soft lg:gap-8"
                  >
                    <span
                      className="index-numeral shrink-0 text-xs text-accent-deep"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-20 grid gap-6 sm:grid-cols-2">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/project-detail-1.jpg"
                alt="Two surveyors with a total station on a hillside, one pointing"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/images/project-detail-2.jpg"
                alt="Two surveyors setting up a total station on a dirt road"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-24">
          <h2 className="text-navy">More projects</h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 text-lg text-navy transition-colors group-hover:text-ink">
                    {item.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
