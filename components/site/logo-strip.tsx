import Image from "next/image";

const PARTNER_LOGOS = [
  { name: "Kyoto Language Academy", src: "/next.svg" },
  { name: "Makerere University", src: "/vercel.svg" },
  { name: "Toyota Industries", src: "/globe.svg" },
  { name: "Kampala Innovation Hub", src: "/window.svg" },
  { name: "Tokyo Study Link", src: "/file.svg" },
];

export function LogoStrip() {
  return (
    <section className="border-y bg-white py-8">
      <div className="container mx-auto px-4">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Trusted by institutions in Uganda and Japan
        </p>
        <div className="grid grid-cols-2 items-center gap-5 opacity-70 grayscale sm:grid-cols-3 lg:grid-cols-5">
          {PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex min-h-11 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-50 px-4 py-3"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={26}
                className="h-6 w-auto object-contain"
                sizes="(max-width: 640px) 40vw, 140px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
