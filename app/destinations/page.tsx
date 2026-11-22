import Link from "next/link";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import Logo from "../components/Logo";

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

const regions = [
  {
    name: "Asia",
    detail: "Explore opportunities across Asia",
    specialty: "Technology • Innovation • Culture",
    image: "/destinations/asia.jpg",
    href: "/destinations/asia",
  },
  {
    name: "Europe",
    detail: "Discover your European study journey",
    specialty: "Research • Heritage • Global Education",
    image: "/destinations/europe.jpg",
    href: "/destinations/europe",
  },
  {
    name: "North America",
    detail: "Find your path across North America",
    specialty: "Innovation • Research • Career Growth",
    image: "/destinations/north-america.jpg",
    href: "/destinations/north-america",
  },
];

export default function DestinationsPage() {
  return (
    <main
      className={`${serif.variable} ${sans.variable} ${mono.variable} min-h-screen bg-[#FCFFFF] font-[family-name:var(--font-sans)] text-[#0B3B4F]`}
    >
      {/* Top bar */}
      <header className="border-b border-[#0593C6]/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" aria-label="Evynir home">
            <Logo size={36} />
          </Link>

          <Link
            href="/#enquire"
            className={`${label} inline-flex items-center gap-2 rounded-full bg-[#0593C6] px-4 py-3 text-[#FCFFFF] transition hover:bg-[#036F96] sm:gap-3 sm:px-6 sm:py-3.5`}
          >
            Apply now <span aria-hidden>↗</span>
          </Link>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-20 md:pt-28">
        <p className={`${label} text-[#036F96]`}>Find your direction</p>

        <h1
          className={`${display} mt-4 text-4xl font-medium leading-[1.02] text-[#0593C6] sm:mt-6 sm:text-6xl md:text-8xl`}
        >
          Study <span className="italic text-[#590907]">destinations.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#0B3B4F]/80 sm:mt-6 sm:text-base sm:leading-8">
          Explore your study abroad opportunities with Evynir.
        </p>
      </section>

      {/* Regions */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-28">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {regions.map((region, index) => (
            <Link
              href={region.href}
              key={region.name}
              className={`group relative flex min-h-[230px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[#064A63] p-4 transition duration-500 hover:-translate-y-1 sm:min-h-[420px] sm:justify-between sm:rounded-[2rem] sm:p-8 ${
                index === regions.length - 1 && regions.length % 2 === 1
                  ? "col-span-2 lg:col-span-1"
                  : ""
              }`}
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(5,147,198,0.15), rgba(2,31,43,0.88)), url('${region.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span
                className={`${label} relative hidden text-[#BDE6F5] sm:block`}
              >
                {region.specialty}
              </span>

              <div className="relative">
                <h2
                  className={`${display} text-2xl font-medium leading-none text-[#FCFFFF] sm:text-5xl`}
                >
                  {region.name}
                </h2>

                <p className="mt-4 hidden max-w-xs text-sm leading-6 text-[#FCFFFF]/85 sm:block">
                  {region.detail}
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
      </section>
    </main>
  );
}