/**
 * Fields map one-to-one onto what the original site publishes for each
 * project: title, year range, one-line summary, client, and a feature list
 * where one exists. Nothing is derived or added.
 */
export type Project = {
  slug: string;
  title: string;
  years: string;
  summary: string;
  client: string;
  features: string[];
  image: string;
  imageAlt: string;
};

/**
 * Copy is carried over verbatim from the WordPress build.
 *
 * The original gave every project page the same YOOtheme demo hero
 * (`elephant-office-hero.jpg`); each project now uses the image the original
 * paired with it elsewhere. One City Hill and Well Station Drive still have no
 * feature list on the source site — see CONTENT-NOTES.md.
 *
 * `imageAlt` describes only what is visible in the photograph. The library is
 * generic stock and none of it depicts the project it illustrates — a drone
 * over water for a road duplication, a ploughed field for light rail — so alt
 * text must not imply otherwise.
 */
export const PROJECTS: Project[] = [
  {
    slug: "well-station-drive",
    title:
      "Duplication of Well Station Drive to support East Gungahlin High School",
    years: "2022",
    summary: "Potholing and UGSD.",
    client: "ComplexCo",
    features: [],
    image: "/images/project-well-station-drive.jpg",
    imageAlt: "A drone in flight above water",
  },
  {
    slug: "cit-woden",
    title: "CIT Woden",
    years: "2023–2024",
    summary:
      "Investigated underground utilities. Metadata reported in accordance with AS5488.",
    client: "ARUP",
    features: [
      "project management of the site survey and subcontractors for hydro-vacuum excavation, traffic management, landscape reinstatement, and coordination with utility asset owners",
      "over 80 potholes/slit trenches, and the combined length of all services traced to quality B level was over 23 km",
    ],
    image: "/images/home-project-cit-woden.jpg",
    imageAlt: "Aerial view of a suburb with hills on the horizon",
  },
  {
    slug: "canberra-light-rail-stage-1",
    title: "Canberra Light Rail Stage 1",
    years: "2015–2018",
    summary:
      "Multiple surveying services from start to finish of construction of new track infrastructure.",
    client: "Canberra Metro Construction",
    features: [
      "daily problem solving and stakeholder engagement",
      "management utility services as-built model for installed, potholed and traced survey data including weekly reporting of digital models in various application formats to the design team",
      "allocation of surveyors to ensure that daily survey demands were met",
      "re-design of drainage lines, roads, pedestrian crossings and kerbs as requested by project engineers",
      "rail conformance surveys for 26 km of track laid, 1 WYE junction and 24 sets of points (turnouts, crossovers) – this work utilised the Amberg rail trolley to achieve the strict tolerances required for the project",
      "cadastral boundary redetermination surveys",
      "laser scanning of traffic intersections",
      "monitoring surveys for the movement of the trackform.",
    ],
    image: "/images/project-light-rail.jpg",
    imageAlt: "A ploughed field at sunset",
  },
  {
    slug: "one-city-hill",
    title: "One City Hill",
    years: "2019–2024",
    summary: "",
    client: "Morris Property Group",
    features: [],
    image: "/images/project-one-city-hill.jpg",
    imageAlt: "A surveyor operating a total station beside water",
  },
  {
    slug: "australian-war-memorial-anzac-hall",
    title: "Australian War Memorial, ANZAC Hall",
    years: "2022–2024",
    summary: "Surveying for all stages of construction including laser scanning.",
    client: "Australian War Memorial",
    features: [],
    image: "/images/project-anzac-hall.jpg",
    imageAlt:
      "Aerial view of workers standing on a reinforced concrete slab",
  },
];

export const getProject = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);
