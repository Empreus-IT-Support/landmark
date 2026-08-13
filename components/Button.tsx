import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "light";

const BASE =
  "group inline-flex items-center justify-center gap-3 px-8 py-4 font-display text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-navy text-white border border-navy hover:bg-ink hover:border-ink",
  outline:
    "border border-white/45 text-white hover:border-white hover:bg-white hover:text-navy",
  light: "bg-white text-navy border border-white hover:bg-transparent hover:text-white",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
