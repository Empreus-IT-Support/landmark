import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

/**
 * Compact entry for projects the source site records only briefly.
 *
 * Splitting these out from the full case studies is content-driven: three of
 * the five projects have a client name and a line of copy, and padding them
 * out to match the detailed ones would either look empty or invent detail.
 */
export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="group h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="flex h-full flex-col border-t-2 border-navy/15 pt-6 transition-colors hover:border-accent"
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="index-numeral text-xs text-muted" aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <span className="field-label text-muted">{project.years}</span>
        </div>

        <div className="relative mt-5 aspect-[3/2] overflow-hidden">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
        </div>

        <h3 className="mt-6 text-xl text-navy transition-colors group-hover:text-ink">
          {project.title}
        </h3>

        <p className="field-value mt-3 text-muted">{project.client}</p>

        <span
          aria-hidden="true"
          className="mt-auto pt-6 font-display text-xs uppercase tracking-[0.18em] text-navy"
        >
          View
          <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
