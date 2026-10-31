
import Link from "next/link";
import EnquiryForm from "./components/EnquiryForm";

const destinations = [
  {
    name: "Asia",
    detail: "Explore opportunities across Asia",
    code: "AS",
    href: "/destinations/asia",
    color: "from-amber-900 to-neutral-950",
  },
  {
    name: "Europe",
    detail: "Discover your European study journey",
    code: "EU",
    href: "/destinations/europe",
    color: "from-stone-700 to-neutral-950",
  },
  {
    name: "North America",
    detail: "Find your path across North America",
    code: "NA",
    href: "/destinations/north-america",
    color: "from-zinc-700 to-neutral-950",
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#b89a51]/20 bg-[#080808]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c5a76a] text-2xl text-[#c5a76a]">
              ✦
            </div>

            <div>
              <h1 className="font-serif text-xl text-[#d2b77c]">
                Elystria Atlas
              </h1>
              <p className="text-[9px] tracking-[0.25em] text-neutral-500">
                YOUR ATLAS TO ELYSTRIA
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 text-sm text-neutral-300 md:flex">
            <a href="#about" className="transition hover:text-[#d2b77c]">
              About
            </a>
            <a href="#destinations" className="transition hover:text-[#d2b77c]">
              Destinations
            </a>
            <a href="#services" className="transition hover:text-[#d2b77c]">
              Services
            </a>
            <a href="#enquire" className="transition hover:text-[#d2b77c]">
              Contact
            </a>
          </nav>

          <a
            href="#enquire"
            className="hidden border border-[#c5a76a] px-5 py-3 text-xs uppercase tracking-widest text-[#d2b77c] transition hover:bg-[#c5a76a] hover:text-black sm:inline-block"
          >
            Apply Now ↗
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden border-b border-[#b89a51]/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(170,125,45,0.13),transparent_55%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c5a76a]">
            Your journey begins here
          </p>

          <h1 className="max-w-4xl font-serif text-5xl leading-[1.12] md:text-7xl lg:text-8xl">
            Beyond borders,
            <span className="block italic text-[#c5a76a]">
              beyond possibilities.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-neutral-400">
            Discover international education opportunities and take the
            first step towards building your future across the world.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#destinations"
              className="bg-[#c5a76a] px-7 py-4 text-xs uppercase tracking-widest text-black transition hover:bg-[#e0c58c]"
            >
              Explore destinations ↗
            </a>

            <a
              href="#about"
              className="border border-white/20 px-7 py-4 text-xs uppercase tracking-widest text-white transition hover:border-[#c5a76a] hover:text-[#c5a76a]"
            >
              Discover Elystria
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#c5a76a]">
              About Elystria Atlas
            </p>

            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Every great journey begins with the right direction.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-neutral-400">
              Choosing to study abroad is a significant step towards your
              future. At Elystria Atlas, we help students explore
              international education opportunities and understand the
              journey ahead.
            </p>

            <p className="mt-5 text-base leading-8 text-neutral-400">
              From selecting a destination to navigating university
              applications, our aim is to make the process clearer,
              simpler and more accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section
        id="destinations"
        className="border-y border-[#b89a51]/20 bg-[#0c0c0c] py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c5a76a]">
                Find your direction
              </p>

              <h2 className="font-serif text-4xl md:text-5xl">
                Explore destinations
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-neutral-500">
              Discover different education systems, cultures and
              opportunities across the world.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((place) => (
              <Link
                href={place.href}
                key={place.code}
                className={`group relative flex min-h-[300px] flex-col justify-between overflow-hidden border border-[#b89a51]/30 bg-gradient-to-br ${place.color} p-8 transition duration-500 hover:-translate-y-2 hover:border-[#d2b77c]`}
              >
                <div className="absolute -right-2 top-5 font-serif text-9xl text-white/[0.04]">
                  {place.code}
                </div>

                <div className="relative">
                  <span className="text-xs tracking-[0.3em] text-[#d2b77c]">
                    {place.code}
                  </span>
                </div>

                <div className="relative">
                  <h3 className="font-serif text-3xl">
                    {place.name}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-400">
                    {place.detail}
                  </p>

                  <span className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-[#d2b77c] transition group-hover:translate-x-2">
                    Explore ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#c5a76a]">
            How we can help
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Guidance at every step.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.number}
              className="border border-[#b89a51]/20 p-8 transition duration-300 hover:border-[#c5a76a]/70 hover:bg-white/[0.02]"
            >
              <p className="mb-10 text-xs tracking-[0.3em] text-[#c5a76a]">
                {service.number}
              </p>

              <h3 className="font-serif text-2xl">
                {service.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

       <section id="enquire" className="scroll-mt-24">
  <EnquiryForm />
</section>

      {/* Footer */}
      <footer className="border-t border-[#b89a51]/20 bg-[#080808]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-2xl text-[#d2b77c]">
              Elystria Atlas
            </h2>
            <p className="mt-2 text-[10px] tracking-[0.3em] text-neutral-500">
              YOUR ATLAS TO ELYSTRIA
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-neutral-400">
            <a href="#about" className="hover:text-[#d2b77c]">About</a>
            <a href="#destinations" className="hover:text-[#d2b77c]">Destinations</a>
            <a href="#services" className="hover:text-[#d2b77c]">Services</a>
            <a href="#enquire" className="hover:text-[#d2b77c]">Contact</a>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-neutral-600">
          © 2026Elystria Atlas. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
