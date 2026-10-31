
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
    "Finland",
  ],
  "North America": [
    "Canada",
  ],
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

  function handleServiceChange(service: string) {
    setSelectedServices((previous) =>
      previous.includes(service)
        ? previous.filter((item) => item !== service)
        : [...previous, service]
    );
  }
  const [submitting, setSubmitting] = useState(false);
const [message, setMessage] = useState("");

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

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-xs text-neutral-400">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-xs text-neutral-400">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a]"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-xs text-neutral-400">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="Your contact number"
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a]"
        />
      </div>

      <div>
        <label htmlFor="region" className="mb-2 block text-xs text-neutral-400">
          Preferred Region
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
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a]"
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
        <label htmlFor="country" className="mb-2 block text-xs text-neutral-400">
          Preferred Country
        </label>
        <select
          id="country"
          name="country"
          required
          disabled={!region}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a] disabled:opacity-40"
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

      <div>
        <label
          htmlFor="qualification"
          className="mb-2 block text-xs text-neutral-400"
        >
          Current Qualification
        </label>
        <select
          id="qualification"
          name="qualification"
          required
          value={qualification}
          onChange={(event) => setQualification(event.target.value)}
          className="w-full border border-white/15 bg-black px-4 py-4 text-sm text-white outline-none focus:border-[#c5a76a]"
        >
          <option value="">Select your qualification</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Graduates">Graduates</option>
        </select>
      </div>

      <div>
        <p className="mb-4 text-xs text-neutral-400">
          Which services are you interested in?
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-3 border border-white/15 p-4 text-sm text-neutral-300 transition hover:border-[#c5a76a]"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="accent-[#c5a76a]"
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#c5a76a] px-6 py-4 text-xs uppercase tracking-[0.25em] text-black transition hover:bg-[#e0c58c]"
      >
        Submit Enquiry ↗
      </button>
    </form>
  );
}
