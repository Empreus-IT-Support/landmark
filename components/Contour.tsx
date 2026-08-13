/**
 * Topographic contour texture from the brand assets (contour-texture.svg).
 *
 * The WordPress build never used it — it sat unused in the media library while
 * the pages leaned on stock photography. It is the strongest brand-owned
 * device available, so it backs the dark sections here.
 */
type Props = {
  className?: string;
  opacity?: number;
  /** Slowly drifts the pattern so dark expanses are never quite static. */
  drift?: boolean;
  /** Tile size in px. Larger reads as broader terrain. */
  scale?: number;
};

export default function Contour({
  className = "",
  opacity = 0.14,
  drift = false,
  scale = 620,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-[url('/images/contour-texture.svg')] bg-repeat ${
        drift ? "contour-drift" : ""
      } ${className}`}
      style={{ opacity, backgroundSize: `${scale}px` }}
    />
  );
}
