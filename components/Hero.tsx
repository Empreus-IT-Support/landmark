import Image from "next/image";
import Button from "./Button";
import Contour from "./Contour";
import Mark from "./Mark";

/**
 * Full-viewport home hero.
 *
 * 100svh (not vh) so mobile browser chrome doesn't push the scroll cue off
 * screen. Layered back to front: photograph, gradient, contour texture,
 * oversized cropped mark, content.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 -z-10">
        {/*
         * The photograph reads at full strength. Legibility comes from a
         * directional scrim over the text column only, not a blanket wash —
         * the earlier version sat the image at 30% under two full-bleed
         * gradients, which buried it.
         */}
        <Image
          src="/images/home-hero.jpg"
          alt="Two workers in high-visibility clothing examining plans at sunset"
          fill
          priority
          sizes="100vw"
          className="ken-burns object-cover"
        />
        <div
          className="absolute inset-0 bg-navy-dark/25 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent lg:via-navy-dark/60 lg:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-transparent to-navy-dark/50"
          aria-hidden="true"
        />
        <Contour opacity={0.09} drift scale={680} />
      </div>

      <Mark className="absolute -right-28 bottom-[-6rem] -z-10 hidden h-[46rem] w-auto text-white/[0.055] lg:block" />

      <div className="mx-auto flex w-full max-w-[1200px] flex-1 items-center px-6 pb-28 pt-36 lg:px-10 lg:pb-36 lg:pt-44">
        <div className="hero-in">
          <h1 className="max-w-3xl text-white">
            Your project,
            <br />
            our expertise
          </h1>
          <div className="rule-converge mt-9 w-52 text-white/45" />
          <p className="lede mt-9 max-w-xl text-white/75">
            Landmark Surveys for all your surveying needs.
          </p>
          <div className="mt-11 flex flex-wrap gap-4">
            <Button href="/services" variant="light">
              Our services
            </Button>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="group absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2 text-white/70 transition-colors hover:text-white"
      >
        <span className="eyebrow text-[0.625rem]">Scroll</span>
        <svg
          width="18"
          height="26"
          viewBox="0 0 18 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="scroll-cue"
          aria-hidden="true"
        >
          <path d="M9 4v14M4 13l5 5 5-5" />
        </svg>
        <span className="sr-only">Skip to our services</span>
      </a>
    </section>
  );
}
