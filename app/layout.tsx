import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Display face — squared terminals and a technical bearing that suits the
// angular mark better than a soft geometric sans.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Neutral, high-legibility body face.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Mono carries the survey-register detail: indices, localities, field labels.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // The WordPress build titled every page "Land Surveying Specialists",
    // so the business name never appeared in search results.
    default: `${SITE_NAME} | Land Surveying Specialists, Canberra ACT`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Land Surveying Specialists, Canberra ACT`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/home-hero.jpg",
        width: 1500,
        height: 1101,
        alt: "Two workers in high-visibility clothing examining plans at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Land Surveying Specialists`,
    description: SITE_DESCRIPTION,
    images: ["/images/home-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * Only facts the source site states directly: name, contact details, the 2003
 * founding date and the service areas it names. No `image` — the photography
 * is generic stock and shouldn't be published as representing the business.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-navy.svg`,
  description: SITE_DESCRIPTION,
  telephone: "+61262809608",
  email: CONTACT.email,
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.addressLine,
    addressLocality: CONTACT.suburb,
    addressRegion: CONTACT.state,
    postalCode: CONTACT.postcode,
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CONTACT.lat,
    longitude: CONTACT.lng,
  },
  areaServed: ["Australian Capital Territory", "Regional New South Wales"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Surveying services",
    itemListElement: [
      "Construction surveying",
      "Cadastral surveying",
      "Topographic surveying",
      "UAV and drone surveys",
      "Laser scanning",
      "Underground utility locating",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          // Every value here is a local constant, but JSON.stringify does not
          // escape "</script>" — escaping the angle bracket means this stays
          // safe if the object is ever fed from data.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
