"use client";

import { useState, type FormEvent } from "react";
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
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
        country:
          new URLSearchParams(window.location.search).get("country") ||
          country,
        qualification,
        interest: new URLSearchParams(window.location.search).get("interest"),
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
  }

  /* ---------- Theme classes ---------- */
  const display = "font-[family-name:var(--font-serif)]";
  const mono = "font-[family-name:var(--font-mono)]";

  const fieldClass =
    "w-full rounded-2xl border border-[#0593C6]/25 bg-[#F3F9FC] px-5 py-4 text-sm text-[#0B3B4F] outline-none transition placeholder:text-[#0B3B4F]/45 focus:border-[#0593C6] focus:bg-[#FCFFFF] focus:ring-4 focus:ring-[#0593C6]/15";

  const labelClass = `${mono} mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#036F96]`;

  const isSuccess = message.includes("successfully");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-12 text-center">
        <p className={`${mono} mb-5 text-[11px] uppercase tracking-[0.22em] text-[#036F96]`}>
          Start your journey
        </p>

        <h2
          className={`${display} text-5xl font-medium leading-[1.02] text-[#0593C6] sm:text-6xl`}
        >
          Begin your study abroad{" "}
          <span className="italic text-[#590907]">journey.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#0B3B4F]/80">
          Tell us about your plans. Our team will help you explore the right
          opportunities for your future.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] border border-[#0593C6]/15 bg-[#FCFFFF] p-6 shadow-[0_20px_60px_-30px_rgba(5,147,198,0.35)] sm:p-10"
      >
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

        <div className="grid gap-6 sm:grid-cols-2">
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

        <div className="grid gap-6 sm:grid-cols-2">
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
          <p className={`${labelClass} mb-4`}>
            Which services are you interested in?
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const checked = selectedServices.includes(service);

              return (
                <label
                  key={service}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 text-sm text-[#0B3B4F] transition ${
                    checked
                      ? "border-[#0593C6] bg-[#E6F4FA]"
                      : "border-[#0593C6]/20 bg-[#FCFFFF] hover:border-[#0593C6] hover:bg-[#F3F9FC]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleServiceChange(service)}
                    className="h-4 w-4 accent-[#0593C6]"
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
          className={`${mono} inline-flex w-full items-center justify-center gap-4 rounded-full bg-[#590907] px-8 py-5 text-[11px] uppercase tracking-[0.22em] text-[#FCFFFF] transition duration-300 hover:bg-[#740D0A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0593C6] disabled:cursor-not-allowed disabled:opacity-60`}
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
            className={`rounded-[1.5rem] border p-8 text-center ${
              isSuccess
                ? "border-[#0593C6]/25 bg-[#E6F4FA]"
                : "border-red-300 bg-red-50"
            }`}
          >
            {isSuccess ? (
              <>
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#0593C6]">
                  <span className="text-3xl font-bold text-[#FCFFFF]">✓</span>
                </div>

                <h3
                  className={`${display} text-4xl font-medium leading-tight text-[#0593C6]`}
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