import Link from "next/link";
export const instant = false;
const countries: Record<string, string[]> = {
  asia: ["Japan", "China", "South Korea", "Singapore", "Vietnam", "Taiwan"],
  europe: ["Lithuania", "Germany", "France", "United Kingdom", "Ireland"],
  
 "north-america": ["Canada"],
};
const countryImages: Record<string, string> = {
  Japan: "/destinations/japan.jpg",
  China: "/destinations/china.jpg",
  "South Korea": "/destinations/South-korea.jpg",
  Singapore: "/destinations/singapore.jpg",
  Vietnam: "/destinations/vietnam.jpg",
  Taiwan: "/destinations/taiwan.jpg",
  Lithuania: "/destinations/lithuania.jpg",
  Germany: "/destinations/germany.jpg",
  France: "/destinations/france.jpg",
  "United Kingdom": "/destinations/united-kingdom.jpg",
  Ireland: "/destinations/ireland.jpg",
  Canada: "/destinations/canada.jpg",
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
  <Link
  key={country}
  href={`/destinations/${region}/${country.toLowerCase().replace(/\s+/g, "-")}`}
  className="min-h-[220px] border border-[#b89a55]/30 p-8 flex flex-col justify-between bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('${countryImages[country]}')`,
  backgroundSize: "cover",
backgroundPosition: "center",
  }}
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
</Link>
))}
            </div>
    </div>
    </main>
  );
}