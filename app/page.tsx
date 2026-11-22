import Link from "next/link";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import EnquiryForm from "./components/EnquiryForm";
import Logo from "./components/Logo";

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

const destinations = [
  {
    name: "Asia",
    detail: "Explore opportunities across Asia",
    code: "AS",
    specialty: "Technology • Innovation • Culture",
    image: "/destinations/asia.jpg",
    href: "/destinations/asia",
  },
  {
    name: "Europe",
    detail: "Discover your European study journey",
    code: "EU",
    specialty: "Research • Heritage • Global Education",
    image: "/destinations/europe.jpg",
    href: "/destinations/europe",
  },
  {
    name: "North America",
    detail: "Find your path across North America",
    code: "NA",
    specialty: "Innovation • Research • Career Growth",
    image: "/destinations/north-america.jpg",
    href: "/destinations/north-america",
  },
];

const services = [
  {
    number: "01",
    title: "University Selection",
    description:
      "Find universities and programmes that align with your academic background, interests and future goals.",
  },
  {
    number: "02",
    title: "Application Assistance",
    description:
      "Get guidance throughout the application process, from preparing documents to submitting your applications.",
  },
  {
    number: "03",
    title: "Visa Guidance",
    description:
      "Understand the student visa process and prepare the documents required for your destination.",
  },
  {
    number: "04",
    title: "Scholarship Guidance",
    description:
      "Explore scholarship opportunities, tuition fee reductions and funding options for your studies.",
  },
];

const display = "font-[family-name:var(--font-serif)]";
const label =
  "font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em]";

export default function Home() {
  return (
    <main
      className={`${serif.variable} ${sans.variable} ${mono.variable} min-h-screen bg-[#FCFFFF] font-[family-name:var(--font-sans)] text-[#0B3B4F]`}
    >
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#0593C6]/15 bg-[#FCFFFF]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" aria-label="Evynir home">
            <Logo size={36} />
          </Link>

          <nav className="hidden items-center gap-9 text-sm text-[#0B3B4F] md:flex">
            <a href="#about" className="transition hover:text-[#0593C6]">
              About
            </a>
            <a href="#destinations" className="transition hover:text-[#0593C6]">
              Destinations
            </a>
            <a href="#services" className="transition hover:text-[#0593C6]">
              Services
            </a>
            <a href="#enquire" className="transition hover:text-[#0593C6]">
              Contact
            </a>
          </nav>

          <a
            href="#enquire"
            className={`${label} inline-flex items-center gap-2 rounded-full bg-[#0593C6] px-4 py-3 text-[#FCFFFF] transition hover:bg-[#036F96] sm:gap-3 sm:px-6 sm:py-3.5`}
          >
            Apply now <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Mobile menu row */}
        <nav className="flex items-center justify-between border-t border-[#0593C6]/10 px-6 py-2.5 text-xs text-[#0B3B4F] md:hidden">
          <a href="#about">About</a>
          <a href="#destinations">Destinations</a>
          <a href="#services">Services</a>
          <a href="#enquire">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden bg-[#064A63] sm:min-h-[640px] md:min-h-[720px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/homepageimage.jpeg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0593C6]/10 via-[#064A63]/40 to-[#021F2B]/85" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pb-20 sm:pt-36 md:pb-24">
          <p className={`${label} mb-4 text-[#BDE6F5] sm:mb-6`}>
            Study abroad guidance
          </p>

          <h1
            className={`${display} max-w-4xl text-4xl font-medium leading-[1.05] text-[#FCFFFF] sm:text-6xl md:text-7xl lg:text-8xl`}
          >
            Beyond borders,
            <span className="block italic text-[#BDE6F5]">
              beyond possibilities.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#FCFFFF]/90 sm:mt-8 sm:text-base sm:leading-8">
            Discover international education opportunities and take the first
            step towards building your future across the world.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-6">
            <a
              href="#destinations"
              className={`${label} inline-flex items-center gap-3 rounded-full bg-[#590907] px-6 py-3.5 text-[#FCFFFF] transition hover:bg-[#740D0A] sm:gap-4 sm:px-8 sm:py-4`}
            >
              Explore destinations <span aria-hidden>→</span>
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-[#FCFFFF] underline-offset-8 transition hover:underline"
            >
              Discover Evynir <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-28 bg-[#FCFFFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-32">
          <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-12">
            <div>
              <p className={`${label} mb-4 text-[#036F96] sm:mb-6`}>
                About Evynir
              </p>

              <h2
                className={`${display} text-3xl font-medium leading-[1.08] text-[#0593C6] sm:text-5xl md:text-6xl`}
              >
                Every great journey begins with the right{" "}
                <span className="italic text-[#590907]">direction.</span>
              </h2>
            </div>

            <div className="md:max-w-md">
              <p className="text-sm leading-7 text-[#0B3B4F]/80 sm:text-base sm:leading-8">
                Choosing to study abroad is a significant step towards your
                future. At Evynir, we help students explore international
                education opportunities and understand the journey ahead.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#0B3B4F]/80 sm:mt-5 sm:text-base sm:leading-8">
                From selecting a destination to navigating university
                applications, our aim is to make the process clearer, simpler
                and more accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section
        id="destinations"
        className="scroll-mt-28 bg-[#F3F9FC] py-16 sm:py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-14 md:flex-row md:items-end">
            <div>
              <p className={`${label} mb-4 text-[#036F96] sm:mb-5`}>
                Find your direction
              </p>

              <h2
                className={`${display} text-3xl font-medium leading-[1.08] text-[#0593C6] sm:text-5xl md:text-6xl`}
              >
                Explore{" "}
                <span className="italic text-[#590907]">destinations.</span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-[#0B3B4F]/80">
              Discover different education systems, cultures and opportunities
              across the world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {destinations.map((place, index) => (
              <Link
                href={place.href}
                key={place.code}
                className={`group relative flex min-h-[230px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-[#064A63] p-4 transition duration-500 hover:-translate-y-1 sm:min-h-[420px] sm:justify-between sm:rounded-[2rem] sm:p-8 ${
                  index === destinations.length - 1 &&
                  destinations.length % 2 === 1
                    ? "col-span-2 lg:col-span-1"
                    : ""
                }`}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(5,147,198,0.15), rgba(2,31,43,0.88)), url('${place.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span
                  className={`${label} relative hidden text-[#BDE6F5] sm:block`}
                >
                  {place.specialty}
                </span>

                <div className="relative">
                  <h3
                    className={`${display} text-2xl font-medium leading-none text-[#FCFFFF] sm:text-5xl`}
                  >
                    {place.name}
                  </h3>

                  <p className="mt-4 hidden max-w-xs text-sm leading-6 text-[#FCFFFF]/85 sm:block">
                    {place.detail}
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
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-28 bg-[#FCFFFF]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-32">
          <div className="mb-8 sm:mb-14">
            <p className={`${label} mb-4 text-[#036F96] sm:mb-5`}>
              How we can help
            </p>

            <h2
              className={`${display} text-3xl font-medium leading-[1.08] text-[#0593C6] sm:text-5xl md:text-6xl`}
            >
              Guidance at every{" "}
              <span className="italic text-[#590907]">step.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {services.map((service) => (
              <div
                key={service.number}
                className="rounded-[1.5rem] bg-[#E6F4FA] p-5 transition duration-300 hover:bg-[#D6EEF8] sm:rounded-[2rem] sm:p-10"
              >
                <p className={`${label} mb-6 text-[#036F96] sm:mb-14`}>
                  {service.number}
                </p>

                <h3
                  className={`${display} text-xl font-medium leading-tight text-[#0593C6] sm:text-4xl`}
                >
                  {service.title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-[#0B3B4F]/80 sm:mt-4 sm:max-w-md sm:text-sm sm:leading-7">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section
        id="enquire"
        className="scroll-mt-24 bg-[#F3F9FC] px-4 py-14 sm:px-6 sm:py-20"
      >
        <EnquiryForm />
      </section>

      {/* Footer */}
      <footer className="bg-[#0B3B4F] text-[#FCFFFF]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-10 sm:px-6 sm:py-14 md:flex-row md:items-center">
          <Logo light tagline size={40} />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#FCFFFF]/85 sm:gap-8">
            <a href="#about" className="transition hover:text-[#BDE6F5]">
              About
            </a>
            <a href="#destinations" className="transition hover:text-[#BDE6F5]">
              Destinations
            </a>
            <a href="#services" className="transition hover:text-[#BDE6F5]">
              Services
            </a>
            <a href="#enquire" className="transition hover:text-[#BDE6F5]">
              Contact
            </a>
          </div>
        </div>

        <div className="border-t border-[#FCFFFF]/15 px-4 py-5 text-center text-xs text-[#FCFFFF]/60">
          © 2026 Evynir. All rights reserved.
        </div>
      </footer>
    </main>
  );
}