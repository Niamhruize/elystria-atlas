export const instant = false
export default async function CountryPage({
  params,
}: {
  params: Promise<{ region: string; country: string }>;
}) {
  const { region, country } = await params;

  const countryName = country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="min-h-screen bg-[#070707] text-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c5a76a]">
          Study Destination
        </p>

        <h1 className="mt-4 font-serif text-5xl md:text-7xl">
          Study in {countryName}
        </h1>
<div className="mt-8 overflow-hidden rounded-xl border border-[#b89a55]/30">
  <img
    src={`/destinations/${country}.jpg`}
    alt="Mount Fuji, Japan"
    className="h-[280px] w-full object-cover md:h-[420px]"
  />
</div>
        <p className="mt-5 max-w-2xl text-neutral-400">
          Explore universities, admission requirements, tuition fees,
          scholarships and student visa guidance for {countryName}.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {[
    "Universities",
    "Admission Requirements",
    "Tuition Fees",
    "Scholarships",
    "Student Visa",
    "Part-Time Work",
  ].map((item, index) => (
    <a
      key={item}
      href={`/?country=${encodeURIComponent(countryName)}&interest=${encodeURIComponent(item)}#enquire`}
      className="block border border-[#b89a55]/30 bg-[#111] p-8 transition hover:border-[#b89a55]"
    >
      <p className="text-xs tracking-widest text-[#c5a76a]">
        INFORMATION 0{index + 1}
      </p>

      <h2 className="mt-5 font-serif text-2xl">{item}</h2>

      <p className="mt-3 text-sm text-neutral-400">
        Get guidance about {item.toLowerCase()} in {countryName}.
      </p>
    </a>
  ))}
</div>
      </div>
    </main>
  );
}