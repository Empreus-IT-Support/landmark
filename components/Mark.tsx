/**
 * The Landmark Surveys mark: a surveyor's tripod / converging road with a
 * centre post and a vanishing point. Inlined from logo-mark.svg so it can
 * take currentColor and be used as a design device at any size.
 */
export default function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28.35 28.35"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon
        points="16.91 5.44 11.34 5.44 1.2 22.87 5 22.87 12.48 9.99 12.48 20.83 15.76 20.83 15.76 9.99 23.25 22.87 27.05 22.87 16.91 5.44"
        fill="currentColor"
      />
    </svg>
  );
}
