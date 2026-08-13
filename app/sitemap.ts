import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/work-with-us", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
