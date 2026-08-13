import Image from "next/image";
import Contour from "./Contour";
import Mark from "./Mark";

type Props = {
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  eyebrow?: string;
};

export default function PageHero({
  title,
  intro,
  image,
  imageAlt,
  eyebrow,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-dark">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="ken-burns object-cover"
        />
        <div
          className="absolute inset-0 bg-navy-dark/35 mix-blend-multiply"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/75 to-navy-dark/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-navy-dark/40"
          aria-hidden="true"
        />
        <Contour opacity={0.1} drift scale={660} />
      </div>

      <Mark className="absolute -bottom-16 right-[-4rem] -z-10 hidden h-[26rem] w-auto text-white/[0.05] lg:block" />

      <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
        <div className="hero-in">
          {eyebrow && <p className="eyebrow text-white/65">{eyebrow}</p>}
          <h1 className="max-w-4xl text-white">{title}</h1>
          <div className="rule-converge mt-8 w-44 text-white/40" />
          {intro && (
            <p className="lede mt-8 max-w-2xl text-white/75">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}
