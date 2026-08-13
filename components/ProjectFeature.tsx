import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
  /** Flips the image to the right on large screens. */
  flip?: boolean;
};

/**
 * Full case-study row for projects that carry real scope detail.
 *
 * Deliberately not hover-dependent: everything that matters is on the page at
 * rest, and hover only adds a slow image scale. The previous index/preview
 * version hid content behind a hover state and broke when the wipe layer lost
 * its stacking context.
 */
export default function ProjectFeature({ project, index, flip }: Props) {
  return (
    <article className="group relative">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div
          className={`relative lg:col-span-7 ${
            flip ? "lg:order-2 lg:col-start-6" : ""
          }`}
        >
          <Link
            href={`/projects/${project.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="block overflow-hidden"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
          </Link>

          <span
            aria-hidden="true"
            className={`index-numeral pointer-events-none absolute -top-10 hidden text-[7rem] leading-none text-muted lg:block ${
              flip ? "-right-6" : "-left-6"
            }`}
          >
            {String(index).padStart(2, "0")}
          </span>
        </div>

        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <h3 className="text-3xl text-navy lg:text-[2.25rem] lg:leading-[1.1]">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-ink"
            >
              {project.title}
            </Link>
          </h3>

          <div className="rule-converge mt-6 w-24 text-muted" />

          {project.summary && (
            <p className="lede mt-6 text-ink-soft">{project.summary}</p>
          )}

          <dl className="mt-8 border-t border-line">
            {[
              ["Client", project.client],
              ["Years", project.years],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-6 border-b border-line py-3">
                <dt className="field-label w-24 shrink-0 pt-0.5 text-muted">
                  {label}
                </dt>
                <dd className="field-value text-navy">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-8 inline-flex items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:text-ink"
          >
            View project
            <span className="sr-only">: {project.title}</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
