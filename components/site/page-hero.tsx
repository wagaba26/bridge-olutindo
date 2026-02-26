import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";

type HeroScene = {
  src: string;
  label: string;
  caption: string;
};

type HeroCta = {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
  onClick?: () => void;
};

export function PageHero({
  eyebrow,
  title,
  description,
  scenes,
  chips,
  ctas,
  showImages = false,
  hideVisualPanel = false,
  compact = false,
  mobileImageFirst = false,
  mergeWithHeaderOnMobile = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  scenes: HeroScene[];
  chips?: readonly string[];
  ctas?: HeroCta[];
  showImages?: boolean;
  hideVisualPanel?: boolean;
  compact?: boolean;
  mobileImageFirst?: boolean;
  mergeWithHeaderOnMobile?: boolean;
}) {
  const primaryScene = scenes[0];
  const secondaryScenes = scenes.slice(1, 3);
  const sectionSpacing = compact
    ? mergeWithHeaderOnMobile
      ? "pt-0 pb-0 md:py-2"
      : "py-1 md:py-2"
    : "section-shell";
  const containerSpacing = compact
    ? mergeWithHeaderOnMobile
      ? "pt-0 pb-0 md:py-3"
      : "py-2 md:py-3"
    : "py-10 md:py-14";

  return (
    <section className={`relative overflow-hidden border-b border-slate-300/70 bg-white ${sectionSpacing}`}>
      <div
        className={`container mx-auto grid gap-6 px-4 ${containerSpacing} ${
          hideVisualPanel ? "" : "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end"
        }`}
      >
        {mobileImageFirst && primaryScene ? (
          <FadeIn>
            <div className="-mx-4 -mt-px border-y border-slate-300 bg-slate-50 md:hidden">
              <div className="relative h-[clamp(188px,34vh,320px)] w-full">
                {showImages ? (
                  <Image
                    src={primaryScene.src}
                    alt={primaryScene.label}
                    fill
                    sizes="100vw"
                    priority={mobileImageFirst}
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full border-x border-slate-300 bg-slate-50" aria-hidden="true" />
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" aria-hidden="true" />
              </div>
            </div>
          </FadeIn>
        ) : null}

        <div className="space-y-4 border border-slate-300 bg-white p-5 md:p-6">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-balance">{title}</h1>
            <p className="mt-4 max-w-3xl text-sm text-slate-600 md:text-base">{description}</p>
          </FadeIn>

          {chips && chips.length > 0 ? (
            <FadeIn delay={0.05}>
              <div className="flex flex-wrap gap-2 text-xs">
                {chips.map((item) => (
                  <p key={item} className="border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700">
                    {item}
                  </p>
                ))}
              </div>
            </FadeIn>
          ) : null}

          {ctas && ctas.length > 0 ? (
            <FadeIn delay={0.08}>
              <div className="flex flex-col gap-3 sm:flex-row">
                {ctas.map((cta) => (
                  <Button key={cta.href + cta.label} asChild variant={cta.variant ?? "default"} className="h-11 px-5">
                    <Link href={cta.href} onClick={cta.onClick}>
                      {cta.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </FadeIn>
          ) : null}
        </div>

        {!hideVisualPanel ? (
          <FadeIn delay={0.06}>
            <div className="hidden h-full min-h-[260px] border border-slate-300 bg-white p-6 text-sm text-slate-600 md:flex md:flex-col md:justify-between">
              <div className="space-y-3">
                {primaryScene ? (
                  <div className="border border-slate-300 p-3">
                    <div className="relative aspect-[4/3] border border-slate-300 bg-white">
                      {showImages ? (
                        <Image
                          src={primaryScene.src}
                          alt={primaryScene.label}
                          fill
                          sizes="(min-width: 1024px) 320px, 100vw"
                          className="object-cover"
                        />
                      ) : <div className="h-full w-full bg-white" aria-hidden="true" />}
                    </div>
                    {showImages ? (
                      <>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{primaryScene.label}</p>
                        <p className="mt-1 text-sm text-slate-700">{primaryScene.caption}</p>
                      </>
                    ) : null}
                  </div>
                ) : null}
                {secondaryScenes.length > 0
                  ? secondaryScenes.map((scene) => (
                      <div key={scene.label} className="border border-slate-300 p-3">
                        {showImages ? (
                          <>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{scene.label}</p>
                            <p className="mt-1 text-sm text-slate-700">{scene.caption}</p>
                          </>
                        ) : (
                          <div className="aspect-[16/10] w-full bg-white" aria-hidden="true" />
                        )}
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </FadeIn>
        ) : null}
      </div>
    </section>
  );
}
