import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
}: SectionHeadingProps) {
  const alignmentClass = align === "center" ? "text-center" : "text-left";
  const eyebrowClass =
    tone === "inverse" ? "text-sky-300" : "text-sky-700";
  const titleClass =
    tone === "inverse" ? "text-white" : "text-slate-950";
  const descriptionClass =
    tone === "inverse" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={`max-w-2xl ${alignmentClass}`}>
      {eyebrow ? (
        <p
          className={`text-sm font-semibold uppercase tracking-[0.24em] ${eyebrowClass}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${titleClass}`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 sm:text-lg ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}
