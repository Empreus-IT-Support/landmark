import Image from "next/image";

type BandImage = { src: string; alt: string };

type Props = {
  images: BandImage[];
  /** Pulls the band up so it straddles the boundary with the section above. */
  overlap?: boolean;
};

/**
 * Full-bleed band of tall images sitting flush between padded sections.
 *
 * This is the device the WordPress build leaned on for depth — its
 * `uk-section-overlap` classes carried no CSS of their own, the effect came
 * from tall image rows butting straight up against the next block.
 */
export default function ImageBand({ images, overlap = true }: Props) {
  return (
    <div
      className={`relative z-10 grid gap-4 px-6 sm:gap-6 lg:px-10 ${
        overlap ? "-mt-16 lg:-mt-28" : ""
      } ${images.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {images.map((image) => (
        <div
          key={image.src}
          className="group relative aspect-[3/4] overflow-hidden sm:aspect-[4/5]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
