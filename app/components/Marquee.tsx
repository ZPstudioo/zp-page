"use client";

export default function Marquee() {
  const items = [
    "CASAIS",
    "RETRATOS",
    "GESTANTE",
    "EVENTOS",
    "SÃO PAULO",
    "ZP STUDIO",
    "FOTOGRAFIA",
  ];

  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span className="font-display text-[0.65rem] tracking-[0.45em] text-silver">
        {item}
      </span>
      <span className="w-1 h-1 rounded-full bg-flash shrink-0" aria-hidden />
    </span>
  ));

  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ borderColor: "rgba(59,130,246,0.08)" }}
      aria-hidden
    >
      <div className="flex animate-marquee gap-8">
        {/* Duplicated for seamless loop */}
        {track}
        {track}
        {track}
        {track}
      </div>
    </div>
  );
}
