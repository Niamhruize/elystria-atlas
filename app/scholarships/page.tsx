import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import Logo from "../components/Logo";
import ScholarshipEvaluator from "../components/ScholarshipEvaluator";

export const metadata: Metadata = {
  title: "Scholarship eligibility check | Evynir",
  description:
    "Answer a few quick questions to see which kinds of scholarships you could explore for studying abroad.",
};

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

export default function ScholarshipsPage() {
  return (
    <main
      className={`${serif.variable} ${sans.variable} ${mono.variable} min-h-screen bg-[#FCFFFF] font-[family-name:var(--font-sans)] text-[#0B3B4F]`}
    >
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

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-12 sm:px-6 sm:pb-28 sm:pt-20">
        <p className={`${label} text-[#036F96]`}>Scholarship guidance</p>

        <h1
          className={`${display} mt-4 text-4xl font-medium leading-[1.02] text-[#0593C6] sm:mt-6 sm:text-6xl`}
        >
          Check your scholarship{" "}
          <span className="italic text-[#590907]">eligibility.</span>
        </h1>

        <p className="mb-8 mt-4 max-w-xl text-sm leading-7 text-[#0B3B4F]/80 sm:mb-12 sm:mt-6 sm:text-base sm:leading-8">
          Answer six quick questions and see which kinds of scholarships you
          could explore. It takes about a minute.
        </p>

        <ScholarshipEvaluator />
      </section>
    </main>
  );
}