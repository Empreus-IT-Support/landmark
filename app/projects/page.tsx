import type { Metadata } from "next";
import Button from "@/components/Button";
import ContactCta from "@/components/ContactCta";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import ProjectFeature from "@/components/ProjectFeature";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Landmark Surveys delivers reliable surveying to meet the distinct technical requirements of each project. From inception to completion, we are expert partners across both public and private sector projects.",
  alternates: { canonical: "/projects" },
};

/**
 * Split by how much the client has actually documented. Two projects carry a
 * feature list; the other three have a client name and a line. Giving them
 * the same treatment would either look empty or invite invented detail.
 */
const DETAILED = PROJECTS.filter((p) => p.features.length > 0);
const BRIEF = PROJECTS.filter((p) => p.features.length === 0);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        intro="Landmark Surveys delivers reliable surveying to meet the distinct technical requirements of each project. From inception to completion, we are expert partners across both public and private sector projects."
        image="/images/project-light-rail.jpg"
        imageAlt="A ploughed field at sunset"
      />

      <section data-reveal className="bg-white">
        <div className="mx-auto max-w-[1200px] space-y-24 px-6 py-20 lg:space-y-32 lg:px-10 lg:py-28">
          {DETAILED.map((project, i) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              index={i + 1}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <section data-reveal className="bg-paper">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          <div
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
            data-stagger
          >
            {BRIEF.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={DETAILED.length + i + 1}
              />
            ))}
          </div>

          <div className="mt-16">
            <Button href="/services">Explore our services</Button>
          </div>
        </div>
      </section>

      <ContactCta
        heading="Contact us"
        body="To discuss your project."
        ctaLabel="Get in touch"
      />
    </>
  );
}
