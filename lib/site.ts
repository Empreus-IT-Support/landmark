export const SITE_NAME = "Landmark Surveys";

/**
 * Assumed to be the www host on the existing domain. Nothing has confirmed
 * whether the live site will serve from www or the apex, so this is
 * overridable — set NEXT_PUBLIC_SITE_URL before building for production.
 * It feeds canonicals, Open Graph URLs, the sitemap and robots.txt.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.landmarksurveys.com.au";

/** The client's own home-page sentence, not a written-for-SEO paraphrase. */
export const SITE_DESCRIPTION =
  "Landmark Surveys was established in 2003 and is a leader in accurate and reliable land surveying services across the ACT and regional NSW.";

export const CONTACT = {
  addressLine: "Unit 15, 53-65 Wollongong Street",
  suburb: "Fyshwick",
  state: "ACT",
  postcode: "2609",
  get fullAddress() {
    return `${this.addressLine}, ${this.suburb} ${this.state} ${this.postcode}`;
  },
  phone: "(02) 6280 9608",
  phoneHref: "tel:+61262809608",
  email: "enquiries@landmarksurveys.com.au",
  emailHref: "mailto:enquiries@landmarksurveys.com.au",
  // Coordinates taken from the map block on the original contact page.
  lat: -35.3241382,
  lng: 149.1786439,
} as const;

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/work-with-us", label: "Work with us" },
  { href: "/contact", label: "Contact us" },
] as const;
