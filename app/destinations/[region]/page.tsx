import Link from "next/link";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import Logo from "../../components/Logo";

export const instant = false;

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const display = "font-[family-name:var(--font-serif)]";
const label =
  "font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em]";

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

  const fontClasses = `${serif.variable} ${sans.variable} ${mono.variable}`;

  if (!regionCountries) {
    return (
      <main
        className={`${fontClasses} flex min-h-screen flex-col items-start justify-center gap-6 bg-[#FCFFFF] px-4 font-[family-name:var(--font-sans)] text-[#0B3B4F] sm:px-6 md:px-12`}
      >
        <h1 className={`${display} text-4xl text-[#0593C6] sm:text-5xl`}>
          Region not found.
        </h1>
        <Link
          href="/destinations"
          className={`${label} inline-flex items-center gap-3 rounded-full bg-[#0593C6] px-6 py-3.5 text-[#FCFFFF] transition hover:bg-[#036F96]`}
        >
          Back to destinations
        </Link>
      </main>
    );
  }

  return (
    <main
      className={`${fontClasses} min-h-screen bg-[#FCFFFF] font-[family-name:var(--font-sans)] text-[#0B3B4F]`}
    >
      {/* Top bar */}
      <header className="border-b border-[#0593C6]/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" aria-label="Evynir home">
            <Logo size={36} />
          </Link>

          <Link
            href="/destinations"
            className={`${label} inline-flex items-center gap-2 rounded-full bg-[#E6F4FA] px-4 py-3 text-[#036F96] transition hover:bg-[#D6EEF8] sm:gap-3 sm:px-6 sm:py-3.5`}
          >
            <span aria-hidden>←</span> All
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 md:py-28">
        <p className={`${label} text-[#036F96]`}>Explore your options</p>

        <h1
          className={`${display} mt-4 text-4xl font-medium leading-[1.02] text-[#0593C6] sm:mt-6 sm:text-6xl md:text-8xl`}
        >
          Study in{" "}
          <span className="italic text-[#590907]">{regionName}.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#0B3B4F]/80 sm:mt-6 sm:text-base sm:leading-8">
          Discover countries, universities and international study
          opportunities.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-3">
          {regionCountries.map((country, index) => (
            <Link
              key={country}
              href={`/destinations/${region}/${country
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[#064A63] p-4 transition duration-500 hover:-translate-y-1 sm:min-h-[380px] sm:justify-between sm:rounded-[2rem] sm:p-8 ${
                index === regionCountries.length - 1 &&
                regionCountries.length % 2 === 1
                  ? "col-span-2 lg:col-span-1"
                  : ""
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(5,147,198,0.15), rgba(2,31,43,0.88)), url('${countryImages[country]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span
                className={`${label} relative hidden text-[#BDE6F5] sm:block`}
              >
                Destination 0{index + 1}
              </span>

              <div className="relative">
                <h2
                  className={`${display} text-2xl font-medium leading-none text-[#FCFFFF] sm:text-5xl`}
                >
                  {country}
                </h2>

                <p className="mt-4 hidden text-sm text-[#FCFFFF]/85 sm:block">
                  Explore study opportunities
                </p>

                <span
                  aria-hidden
                  className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FCFFFF] text-base text-[#0593C6] transition group-hover:bg-[#590907] group-hover:text-[#FCFFFF] sm:mt-8 sm:h-12 sm:w-12 sm:text-lg"
                >
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}