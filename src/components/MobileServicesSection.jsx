import React from 'react';
import { ArrowRight, ShieldCheck, Cog, Diamond } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'lackschaden',
    number: '01',
    title: 'Lackschäden',
    description: 'Kratzer und kleinere Lackbeschädigungen gezielt aufbereiten – für ein gepflegtes Erscheinungsbild.',
    image: '/images/services/lackschaden.jpg',
    serviceKey: 'Lackschaden & Kratzer',
  },
  {
    id: 'felgenreparatur',
    number: '02',
    title: 'Felgenreparatur',
    description: 'Kleine Beschädigungen an Leichtmetallfelgen präzise bearbeiten und das Gesamtbild Ihres Fahrzeugs aufwerten.',
    image: '/images/services/felgenreparatur.jpg',
    serviceKey: 'Felgenaufbereitung',
  },
  {
    id: 'dellenentfernung',
    number: '03',
    title: 'Dellenentfernung',
    description: 'Kleine Dellen gezielt und schonend entfernen – ohne aufwendige Reparatur.',
    image: '/images/services/dellenentfernung.jpg',
    serviceKey: 'Dellentechnik (PDR)',
  },
  {
    id: 'scheinwerfer',
    number: '04',
    title: 'Scheinwerfer-Service',
    description: 'Wir prüfen und behandeln sichtbare Scheinwerfer-Beschädigungen für klare Sicht und Sicherheit.',
    image: '/images/services/scheinwerfer.jpg',
    serviceKey: 'Scheinwerfer-Aufbereitung',
  },
  {
    id: 'innenraum',
    number: '05',
    title: 'Innenraumaufbereitung',
    description: 'Gebrauchsspuren an ausgewählten Oberflächen sorgfältig behandeln und den Innenraum wieder gepflegt wirken lassen.',
    image: '/images/services/innenraum.jpg',
    serviceKey: 'Komplettaufbereitung',
  },
];

export default function MobileServicesSection({ onSelectService, onExploreAll }) {
  return (
    <section
      id="leistungen"
      className="relative w-full bg-[#F7F5F2] text-[#0D0D11] pt-12 pb-16 px-5 sm:px-6 z-20 transition-colors duration-300 selection:bg-[#E31B23] selection:text-white"
    >
      <div className="w-full max-w-[460px] mx-auto flex flex-col">
        {/* SECTION INTRODUCTION */}
        <div className="mb-8">
          {/* Eyebrow with red accent line */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-7 h-[2px] bg-[#E31B23] rounded-full inline-block" />
            <span className="text-[11px] font-mono tracking-[0.24em] uppercase text-[#6B7280] font-semibold">
              UNSERE LEISTUNGEN
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[32px] sm:text-[38px] font-display font-extrabold tracking-tight text-[#0D0D11] leading-[1.12] mb-3">
            <span>Kleine Schäden.</span>
            <br />
            <span className="text-[#E31B23]">Große Wirkung.</span>
          </h2>

          {/* Supporting Text */}
          <p className="text-xs sm:text-[13px] font-body text-[#52525B] leading-relaxed max-w-[340px]">
            Mit modernen Smart-Repair-Verfahren bringen wir Ihr Fahrzeug gezielt, präzise und kosteneffizient wieder in Bestform.
          </p>
        </div>

        {/* 5 VERTICALLY STACKED SERVICE CARDS */}
        <div className="flex flex-col gap-4 mb-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService && onSelectService(service.serviceKey)}
              className="group cursor-pointer select-none rounded-2xl p-2 sm:p-2.5 transition-all duration-200 hover:bg-white/90 active:scale-[0.99] flex items-center gap-3.5 sm:gap-4 border border-transparent hover:border-black/[0.04] hover:shadow-sm"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onSelectService) onSelectService(service.serviceKey);
                }
              }}
              aria-label={`${service.title} - ${service.description}`}
            >
              {/* Left Column: Automotive Thumbnail */}
              <div className="w-[124px] sm:w-[140px] aspect-[16/10] shrink-0 rounded-xl overflow-hidden bg-black/10 border border-black/5 shadow-sm relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Right Column: Number, Title, Description, and Circular Arrow Control */}
              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                {/* Header row: Number + Divider line + Red Circle Arrow */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#E31B23]">
                      {service.number}
                    </span>
                    <span className="w-6 h-[1.5px] bg-[#E4E4E7] rounded-full inline-block" />
                  </div>

                  {/* Red circular arrow control */}
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E31B23] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(227,27,35,0.3)] transition-transform duration-200 group-hover:scale-110 group-active:scale-95 shrink-0 ml-2">
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-display font-bold text-[15px] sm:text-base text-[#0D0D11] tracking-tight leading-snug mb-1 group-hover:text-[#E31B23] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-[11px] sm:text-[11.5px] font-body text-[#52525B] leading-snug line-clamp-3">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PRIMARY CTA: Full-width Red Button */}
        <div className="w-full mb-10">
          <button
            onClick={() => onExploreAll && onExploreAll()}
            className="w-full py-4 px-6 rounded-lg bg-[#E31B23] hover:bg-[#d01820] active:scale-[0.98] transition-all text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-[0_6px_22px_rgba(227,27,35,0.35)] cursor-pointer group"
          >
            <span className="tracking-wide">Alle Leistungen entdecken</span>
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* THREE BENEFIT HIGHLIGHTS */}
        <div className="w-full pt-6 border-t border-black/[0.08] grid grid-cols-3 divide-x divide-black/[0.08]">
          {/* Benefit 1: Schnell */}
          <div className="flex flex-col items-center text-center px-2">
            <div className="mb-2 text-[#0D0D11]">
              <ShieldCheck size={24} strokeWidth={1.8} />
            </div>
            <span className="font-display font-bold text-sm text-[#0D0D11] leading-tight block">
              Schnell
            </span>
            <span className="font-mono text-[9px] tracking-wider text-[#71717A] uppercase mt-0.5 block leading-tight">
              UND EFFIZIENT
            </span>
          </div>

          {/* Benefit 2: Präzise */}
          <div className="flex flex-col items-center text-center px-2">
            <div className="mb-2 text-[#0D0D11]">
              <Cog size={24} strokeWidth={1.8} />
            </div>
            <span className="font-display font-bold text-sm text-[#0D0D11] leading-tight block">
              Präzise
            </span>
            <span className="font-mono text-[9px] tracking-wider text-[#71717A] uppercase mt-0.5 block leading-tight">
              AUSFÜHRUNG
            </span>
          </div>

          {/* Benefit 3: Sichtbar */}
          <div className="flex flex-col items-center text-center px-2">
            <div className="mb-2 text-[#0D0D11]">
              <Diamond size={24} strokeWidth={1.8} />
            </div>
            <span className="font-display font-bold text-sm text-[#0D0D11] leading-tight block">
              Sichtbar
            </span>
            <span className="font-mono text-[9px] tracking-wider text-[#71717A] uppercase mt-0.5 block leading-tight">
              BESSERE ERGEBNISSE
            </span>
          </div>
        </div>

        {/* Minimal Bottom Subtle Footer for Polish */}
        <div className="w-full mt-12 pt-6 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#71717A]">
          <span className="font-mono uppercase tracking-wider text-[10px]">
            © {new Date().getFullYear()} SMART REPAIR
          </span>
          <div className="flex items-center gap-3 text-[10px]">
            <a href="#start" className="hover:text-[#0D0D11] transition-colors">Nach oben ↑</a>
          </div>
        </div>
      </div>
    </section>
  );
}
