"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fade-up reveal for sections as they enter the viewport.
 *
 * Fails open: content is only hidden once we know IntersectionObserver exists
 * and the document is actually visible, so a background tab or a prerender can
 * never leave sections stuck at opacity 0. Honours prefers-reduced-motion and
 * re-initialises on route change.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | null = null;

    const init = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
      );

      document
        .querySelectorAll<HTMLElement>("main section[data-reveal]")
        .forEach((el) => {
          if (!el.classList.contains("reveal-in")) {
            el.classList.add("reveal-init");
            observer?.observe(el);
          }
        });
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        document.removeEventListener("visibilitychange", onVisible);
        init();
      }
    };

    if (document.visibilityState === "visible") {
      init();
    } else {
      document.addEventListener("visibilitychange", onVisible);
    }

    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
