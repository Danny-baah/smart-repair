import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalMobileHero({ progress, onBookClick, onExploreClick }) {
  // Reveal starts at progress 0.88, smoothly reaching 100% visibility at 0.95 -> 1.00
  const startReveal = 0.88;
  const fullReveal = 0.95;

  let opacity = 0;
  let translateY = 14;

  if (progress > startReveal) {
    const t = Math.min(1, Math.max(0, (progress - startReveal) / (fullReveal - startReveal)));
    opacity = t;
    translateY = (1 - t) * 14;
  }

  const isVisible = opacity > 0.01;

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col justify-between pt-[max(4.5rem,calc(env(safe-area-inset-top)+3.5rem))] pb-[max(1rem,env(safe-area-inset-bottom))] px-6 transition-opacity duration-200 ${
        isVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{
        opacity,
        willChange: 'opacity, transform',
      }}
    >
      {/* Pristine Clean Background Image (Zero baked text, zero baked buttons) */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: 'url(/images/hero_final_clean.jpg)',
          opacity: Math.max(0, (opacity - 0.1) / 0.9),
        }}
      />

      {/* Atmospheric lighting gradient to guarantee crystal-clear text contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />

      {/* TOP/MIDDLE SECTION: Centered Vertically in the space above the car */}
      <div 
        className="flex-1 flex flex-col justify-center items-center w-full max-w-[380px] mx-auto text-center px-1"
        style={{
          transform: `translateY(${translateY}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Red Accent Line */}
        <div className="w-8 h-[2.5px] bg-[#E31B23] rounded-full mb-3 shadow-[0_0_10px_rgba(227,27,35,0.8)]" />

        {/* Uppercase Eyebrow */}
        <p className="text-[10px] sm:text-[11px] font-display font-medium tracking-[0.24em] text-white/85 uppercase mb-2 text-shadow-sm">
          SMART REPAIR. SICHTBAR BESSER.
        </p>

        {/* Dual-weight Headline */}
        <h1 className="text-[32px] sm:text-[38px] leading-[1.14] tracking-tight text-white mb-3 text-shadow-md">
          <span className="font-display font-bold block">Ihr Fahrzeug</span>
          <span className="font-display font-extralight block text-white/95">in besten Händen</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-[13px] font-body font-normal text-white/80 leading-relaxed max-w-[310px] mx-auto text-shadow-sm">
          Professionelle Smart-Repair-Lösungen für sichtbare Ergebnisse – schnell, präzise und kosteneffizient.
        </p>
      </div>

      {/* CAR AREA: Balanced proportional space allowing the vehicle front & headlights to be admired */}
      <div className="h-[24svh] sm:h-[26svh] pointer-events-none" />

      {/* BOTTOM SECTION: CTA Buttons & Scroll Indicator positioned below the vehicle */}
      <div 
        className="w-full max-w-[340px] mx-auto flex flex-col items-center gap-3.5 pb-1"
        style={{
          transform: `translateY(${-translateY * 0.5}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 pointer-events-auto">
          {/* Prominent Red CTA */}
          <button
            onClick={onBookClick}
            className="w-full py-3.5 px-6 rounded-lg bg-[#D81A22] hover:bg-[#e61c25] active:scale-[0.98] transition-all text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(216,26,34,0.45)] cursor-pointer group"
          >
            <span className="tracking-wide">Termin anfragen</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>

          {/* Secondary Outlined CTA */}
          <button
            onClick={onExploreClick}
            className="w-full py-3.5 px-6 rounded-lg bg-black/50 hover:bg-white/10 active:scale-[0.98] backdrop-blur-md border border-white/20 transition-all text-white font-medium text-xs tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <span>MEHR ENTDECKEN</span>
            <ArrowRight size={15} className="text-white/70 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Minimal Bottom SCROLLEN Indicator */}
        <div className="flex flex-col items-center justify-center select-none pt-0.5">
          <span className="w-[2px] h-3 bg-[#E31B23] rounded-full mb-1.5 shadow-[0_0_6px_rgba(227,27,35,0.8)]" />
          <span className="text-[9px] font-mono tracking-[0.24em] text-white/60 uppercase">
            SCROLLEN
          </span>
        </div>
      </div>
    </div>
  );
}
