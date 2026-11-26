"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/app/lib/supabase";

const countriesByRegion: Record<string, string[]> = {
  Asia: [
    "Japan",
    "China",
    "South Korea",
    "Singapore",
    "Vietnam",
    "Taiwan",
  ],
  Europe: [
    "Lithuania",
    "Germany",
    "France",
    "Ireland",
    "United Kingdom",
  ],
  "North America": ["Canada"],
};

const services = [
  "University Selection",
  "Application Assistance",
  "Visa Guidance",
  "Scholarship Guidance",
];

export default function EnquiryForm() {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [qualification, setQualification] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quizNote, setQuizNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Pre-fill the form when the student arrives from the country pages
  // or from the scholarship eligibility check.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCountry = params.get("country");
    const urlQualification = params.get("qualification");
    const urlInterest = params.get("interest");

    if (urlCountry) {
      const matchedRegion = Object.keys(countriesByRegion).find((name) =>
        countriesByRegion[name].includes(urlCountry)
      );

      if (matchedRegion) {
        setRegion(matchedRegion);
        setCountry(urlCountry);
      }
    }

    if (urlQualification === "Intermediate" || urlQualification === "Graduates") {
      setQualification(urlQualification);
    }

    if (urlInterest) {
      setQuizNote(urlInterest);

      if (urlInterest.toLowerCase().startsWith("scholarship")) {
        setSelectedServices((previous) =>
          previous.includes("Scholarship Guidance")
            ? previous
            : [...previous, "Scholarship Guidance"]
        );
      }
    }
  }, []);

  function handleServiceChange(service: string) {
    setSelectedServices((previous) =>
      previous.includes(service)
        ? previous.filter((item) => item !== service)
        : [...previous, service]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    setSubmitting(true);
    setMessage("");

    const formData = new FormData(form);

    const { error } = await supabase.from("enquiries").insert([
      {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        region,
        country,
        qualification,
        interest: quizNote || null,
        services: selectedServices,
      },
    ]);

    setSubmitting(false);

    if (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
      return;
    }

    setMessage("Your enquiry has been submitted successfully!");
    form.reset();
    setRegion("");
    setCountry("");
    setQualification("");
    setSelectedServices([]);
    setQuizNote("");
  }

  /* ---------- Theme classes ---------- */
  const display = "font-[family-name:var(--font-serif)]";
  const mono = "font-[family-name:var(--font-mono)]";

  const fieldClass =
    "w-full rounded-2xl border border-[#0593C6]/25 bg-[#F3F9FC] px-4 py-3 text-[15px] text-[#0B3B4F] outline-none transition placeholder:text-[#0B3B4F]/45 focus:border-[#0593C6] focus:bg-[#FCFFFF] focus:ring-4 focus:ring-[#0593C6]/15 sm:px-5 sm:py-4 sm:text-sm";

  const labelClass = `${mono} mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#036F96]`;

  const isSuccess = message.includes("successfully");

  // Quiz answers arrive as "Scholarship check | Score: ... | English: ..."
  const quizLines = quizNote.includes(" | ")
    ? quizNote.split(" | ").slice(1)
    : [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center sm:mb-12">
        <p
          className={`${mono} mb-4 text-[11px] uppercase tracking-[0.22em] text-[#036F96] sm:mb-5`}
        >
          Start your journey
        </p>

        <h2
          className={`${display} text-3xl font-medium leading-[1.08] text-[#0593C6] sm:text-6xl sm:leading-[1.02]`}
        >
          Begin your study abroad{" "}
          <span className="italic text-[#590907]">journey.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#0B3B4F]/80 sm:mt-6 sm:text-base sm:leading-8">
          Tell us about your plans. Our team will help you explore the right
          opportunities for your future.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-[1.5rem] border border-[#0593C6]/15 bg-[#FCFFFF] p-4 shadow-[0_20px_60px_-30px_rgba(5,147,198,0.35)] sm:space-y-6 sm:rounded-[2rem] sm:p-10"
      >
        {quizLines.length > 0 && (
          <div className="rounded-2xl border border-[#0593C6]/25 bg-[#E6F4FA] p-4 sm:p-5">
            <p
              className={`${mono} mb-2 text-[11px] uppercase tracking-[0.2em] text-[#036F96]`}
            >
              Your scholarship check
            </p>

            <ul className="space-y-1 text-sm leading-6 text-[#0B3B4F]">
              {quizLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <p className="mt-3 text-xs leading-5 text-[#0B3B4F]/70">
              These answers will be sent with your enquiry so our counsellor
              can help you faster.
            </p>
          </div>
        )}

        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className={fieldClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Your contact number"
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div>
            <label htmlFor="region" className={labelClass}>
              Preferred region
            </label>
            <select
              id="region"
              name="region"
              required
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                setCountry("");
              }}
              className={fieldClass}
            >
              <option value="">Select a region</option>
              {Object.keys(countriesByRegion).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="country" className={labelClass}>
              Preferred country
            </label>
            <select
              id="country"
              name="country"
              required
              disabled={!region}
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={`${fieldClass} disabled:cursor-not-allowed disabled:bg-[#E6F4FA] disabled:text-[#0B3B4F]/40`}
            >
              <option value="">
                {region ? "Select a country" : "Select a region first"}
              </option>
              {region &&
                countriesByRegion[region].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qualification" className={labelClass}>
            Current qualification
          </label>
          <select
            id="qualification"
            name="qualification"
            required
            value={qualification}
            onChange={(event) => setQualification(event.target.value)}
            className={fieldClass}
          >
            <option value="">Select your qualification</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduates">Graduates</option>
          </select>
        </div>

        <div>
          <p className={`${labelClass} mb-3 sm:mb-4`}>
            Which services are you interested in?
          </p>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {services.map((service) => {
              const checked = selectedServices.includes(service);

              return (
                <label
                  key={service}
                  className={`flex cursor-pointer items-center gap-2 rounded-2xl border p-3 text-xs text-[#0B3B4F] transition sm:gap-3 sm:p-4 sm:text-sm ${
                    checked
                      ? "border-[#0593C6] bg-[#E6F4FA]"
                      : "border-[#0593C6]/20 bg-[#FCFFFF] hover:border-[#0593C6] hover:bg-[#F3F9FC]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleServiceChange(service)}
                    className="h-4 w-4 shrink-0 accent-[#0593C6]"
                  />
                  {service}
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`${mono} inline-flex w-full items-center justify-center gap-4 rounded-full bg-[#590907] px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-[#FCFFFF] transition duration-300 hover:bg-[#740D0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0593C6] disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:py-5`}
        >
          {submitting ? (
            "Submitting..."
          ) : (
            <>
              Submit enquiry <span aria-hidden>↗</span>
            </>
          )}
        </button>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-[1.5rem] border p-6 text-center sm:p-8 ${
              isSuccess
                ? "border-[#0593C6]/25 bg-[#E6F4FA]"
                : "border-red-300 bg-red-50"
            }`}
          >
            {isSuccess ? (
              <>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0593C6] sm:mb-5 sm:h-16 sm:w-16">
                  <span className="text-2xl font-bold text-[#FCFFFF] sm:text-3xl">
                    ✓
                  </span>
                </div>

                <h3
                  className={`${display} text-3xl font-medium leading-tight text-[#0593C6] sm:text-4xl`}
                >
                  Enquiry{" "}
                  <span className="italic text-[#590907]">submitted.</span>
                </h3>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#0B3B4F]/80">
                  Thank you for choosing Evynir. Your enquiry has been received
                  successfully.
                </p>

                <p className="mt-4 text-sm font-medium text-[#036F96]">
                  Our counselling team will contact you soon.
                </p>
              </>
            ) : (
              <p className="text-sm text-red-700">{message}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}