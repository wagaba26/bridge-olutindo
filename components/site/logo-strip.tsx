const PARTNER_LOGOS = [
  { name: "Kyoto Language Academy" },
  { name: "Makerere University" },
  { name: "Toyota Industries" },
  { name: "Kampala Innovation Hub" },
  { name: "Tokyo Study Link" },
];

export function LogoStrip() {
  return (
    <section className="border-y bg-white py-8">
      <div className="container mx-auto px-4">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Trusted by institutions in Uganda and Japan
        </p>
        <div className="grid grid-cols-2 items-center gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex min-h-11 items-center justify-center border border-black bg-white px-4 py-3"
            >
              <span className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
