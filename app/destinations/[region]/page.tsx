const countries: Record<string, string[]> = {
  asia: ["Japan", "China", "South Korea", "Singapore", "Vietnam", "Taiwan"],
  europe: ["Lithuania", "Germany", "France", "United Kingdom", "Ireland"],
  "north-america": ["Canada"],
};
export function generateStaticParams() {
  return Object.keys(countries).map((region) => ({
    region,
  }));
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;

  const regionName = region
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const regionCountries = countries[region.toLowerCase()];

  if (!regionCountries) {
    return <main className="min-h-screen bg-[#070707] text-white p-12">Region not found.</main>;
  }

  return (
    <main className="min-h-screen bg-[#070707] text-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c5a76a]">
          Explore your options
        </p>

        <h1 className="mt-4 font-serif text-5xl md:text-7xl">
          Study in {regionName}
        </h1>

        <p className="mt-5 text-neutral-400">
          Discover countries, universities and international study opportunities.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regionCountries.map((country, index) => (
            <div
              key={country}
              className="min-h-[220px] border border-[#b89a55]/30 bg-[#111] p-8 flex flex-col justify-between hover:border-[#c5a76a] transition"
            >
              <span className="text-xs tracking-widest text-[#c5a76a]">
                DESTINATION 0{index + 1}
              </span>

              <div>
                <h2 className="font-serif text-3xl">{country}</h2>
                <p className="mt-3 text-sm text-neutral-400">
                  Explore study opportunities
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}