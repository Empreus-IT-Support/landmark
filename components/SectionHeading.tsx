import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Section heading with the converging rule beneath it — the taper echoes the
 * vanishing point in the tripod mark.
 */
export default function SectionHeading({
  eyebrow,
  children,
  tone = "dark",
  className = "",
}: Props) {
  const isDark = tone === "dark";

  return (
    <div className={className}>
      {eyebrow && (
        <p
          className={`eyebrow ${isDark ? "text-white/55" : "text-muted"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-4 ${isDark ? "text-white" : "text-navy"}`}>
        {children}
      </h2>
      <div
        className={`rule-converge mt-7 w-40 ${
          isDark ? "text-white/40" : "text-muted"
        }`}
      />
    </div>
  );
}
