import Image from "next/image";
import Link from "next/link";
import Contour from "./Contour";
import { CONTACT, SITE_NAME } from "@/lib/site";

const PAGE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About us" },
  { href: "/work-with-us", label: "Work with us" },
  { href: "/contact", label: "Contact us" },
];

/**
 * The WordPress footer linked four social profiles that were never changed
 * from the YOOtheme demo (instagram.com, pinterest.de, facebook.com/yootheme
 * and YOOtheme's YouTube channel). They are left out until real accounts are
 * supplied — see CONTENT-NOTES.md.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <Contour opacity={0.08} />

      <div className="relative mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo.svg"
              alt="Landmark Surveys"
              width={220}
              height={49}
              className="h-10 w-auto"
            />
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-white/65">Pages</h2>
            <ul className="mt-6 space-y-3">
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-white/65">Contact</h2>
            <address className="mt-6 space-y-3 text-sm not-italic text-white/75">
              <p>
                {CONTACT.addressLine}
                <br />
                {CONTACT.suburb} {CONTACT.state} {CONTACT.postcode}
              </p>
              <p>
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-accent"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={CONTACT.emailHref}
                  className="break-words transition-colors hover:text-accent"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/12 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            ©{year} All rights reserved. {SITE_NAME}.
          </p>
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-accent"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
