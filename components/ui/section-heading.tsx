import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl",
        alignment,
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
