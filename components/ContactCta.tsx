import Button from "./Button";
import Contour from "./Contour";
import Mark from "./Mark";

type Props = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ContactCta({
  heading = "Have a current scope of work?",
  body = "Contact us for a quote or to discuss your specifications.",
  ctaLabel = "Contact us",
  ctaHref = "/contact",
}: Props) {
  return (
    <section
      data-reveal
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      <Contour opacity={0.12} drift scale={600} />
      <Mark className="absolute -right-10 -top-10 hidden h-72 w-auto text-white/[0.06] lg:block" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-white">{heading}</h2>
          <div className="rule-converge mt-6 w-32 text-white/40" />
          <p className="lede mt-6 text-white/75">{body}</p>
        </div>
        <Button href={ctaHref} variant="light" className="shrink-0">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
