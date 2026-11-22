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
  "font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em]";

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
        className={`${fontClasses} flex min-h-screen flex-col items-start justify-center gap-6 bg-[#FCFFFF] px-6 font-[family-name:var(--font-sans)] text-[#0B3B4F] md:px-12`}
      >
        <h1 className={`${display} text-5xl text-[#0593C6]`}>
          Region not found.
        </h1>
        <Link
          href="/#destinations"
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Evynir home">
            <Logo />
          </Link>

          <Link
            href="/#destinations"
            className={`${label} inline-flex items-center gap-3 rounded-full bg-[#E6F4FA] px-6 py-3.5 text-[#036F96] transition hover:bg-[#D6EEF8]`}
          >
            <span aria-hidden>←</span> All destinations
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <p className={`${label} text-[#036F96]`}>Explore your options</p>

        <h1
          className={`${display} mt-6 text-6xl font-medium leading-[0.98] text-[#0593C6] md:text-8xl`}
        >
          Study in{" "}
          <span className="italic text-[#590907]">{regionName}.</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-[#0B3B4F]/80">
          Discover countries, universities and international study
          opportunities.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regionCountries.map((country, index) => (
            <Link
              key={country}
              href={`/destinations/${region}/${country
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#064A63] p-8 transition duration-500 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#590907]"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(5,147,198,0.15), rgba(2,31,43,0.88)), url('${countryImages[country]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className={`${label} relative text-[#BDE6F5]`}>
                Destination 0{index + 1}
              </span>

              <div className="relative">
                <h2
                  className={`${display} text-5xl font-medium leading-none text-[#FCFFFF]`}
                >
                  {country}
                </h2>

                <p className="mt-4 text-sm text-[#FCFFFF]/85">
                  Explore study opportunities
                </p>

                <span
                  aria-hidden
                  className="mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#FCFFFF] text-lg text-[#0593C6] transition group-hover:bg-[#590907] group-hover:text-[#FCFFFF]"
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