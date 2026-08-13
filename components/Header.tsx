"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Solid navy bar once the hero has scrolled past, so the white logo and
  // nav keep their contrast over light page sections.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-navy-dark/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <Link href="/" aria-label="Landmark Surveys — home">
          <Image
            src="/images/logo.svg"
            alt="Landmark Surveys"
            width={220}
            height={49}
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-display text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-white ${
                      active ? "text-white" : "text-white/70"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`mt-1.5 block h-px origin-left transition-transform duration-200 ${
                        active
                          ? "scale-x-100 bg-accent"
                          : "scale-x-0 bg-white/60"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-0 z-40 bg-navy-dark px-6 pt-28 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block border-b border-white/12 py-5 font-display text-base font-medium uppercase tracking-[0.18em] text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
