type LogoProps = {
  light?: boolean;
  tagline?: boolean;
  size?: number;
};

export function LogoMark({
  light = false,
  size = 44,
}: Pick<LogoProps, "light" | "size">) {
  const badge = light ? "#FCFFFF" : "#0593C6";
  const ink = light ? "#0593C6" : "#FCFFFF";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      role="img"
      aria-label="Evynir"
      className="shrink-0"
    >
      <circle cx="256" cy="256" r="256" fill={badge} />

      <path
        d="M353.7 264.4 L391.3 250.7 M315.7 214.8 L338.6 182.0 M256.0 196.0 L256.0 156.0 M196.3 214.8 L173.4 182.0 M158.3 264.4 L120.7 250.7"
        fill="none"
        stroke={ink}
        strokeWidth="14"
        strokeLinecap="round"
      />

      <path d="M3.8 300 H508.2 A256 256 0 0 1 3.8 300 Z" fill={ink} />
      <path d="M180 300 A76 76 0 0 1 332 300 Z" fill="#590907" />

      <g stroke={badge} strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M170 350 H342" />
        <path d="M210 396 H302" />
      </g>
    </svg>
  );
}

export default function Logo({
  light = false,
  tagline = false,
  size = 44,
}: LogoProps) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark light={light} size={size} />

      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-serif)] text-4xl font-medium ${
            light ? "text-[#FCFFFF]" : "text-[#0593C6]"
          }`}
        >
          Evynir
        </span>
        {tagline && (
          <span
            className={`mt-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] ${
              light ? "text-[#BDE6F5]" : "text-[#036F96]"
            }`}
          >
            Your future, reimagined
          </span>
        )}
      </span>
    </span>
  );
}