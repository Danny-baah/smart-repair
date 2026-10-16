import React from 'react';
import { ShieldCheck, Zap, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function NextSectionTeaser({ onBookClick }) {
  const services = [
    {
      title: 'Lackreparatur & Spot-Repair',
      desc: 'Punktgenaue Nachlackierung für minimale Kosten und maximalen Werterhalt.',
      badge: 'Bis zu 70% Ersparnis',
    },
    {
      title: 'Felgenaufbereitung & Glanzdrehen',
      desc: 'Bordsteinschäden und Kratzer rückstandslos entfernen auf CNC-Niveau.',
      badge: 'TÜV-konform',
    },
    {
      title: 'Dellenentfernung ohne Lackieren (PDR)',
      desc: 'Sanftes Ausdrücken von Hagel- und Parkdellen bei 100% Originallack.',
      badge: 'Originallack bleibt',
    },
    {
      title: 'Scheinwerferaufbereitung',
      desc: 'Beseitigung von Vergilbungen und Trübungen für beste Leuchtkraft und TÜV-Segen.',
      badge: 'Klare Sicht',
    },
  ];

  return (
    <section id="leistungen" className="relative w-full bg-[#050507] text-white py-16 px-6 z-20 border-t border-white/10">
      <div className="w-full max-w-[480px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-[2px] bg-[#E31B23]" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#E31B23]">
            Meisterbetrieb
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 tracking-tight">
          Unsere Leistungen im Überblick
        </h2>
        <p className="text-xs sm:text-sm font-light text-white/60 mb-8 leading-relaxed">
          High-End Smart-Repair für anspruchsvolle Fahrzeughalter. Schnell, werterhaltend und kompromisslos präzise.
        </p>

        {/* Services List */}
        <div className="flex flex-col gap-4 mb-10">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#E31B23]/40 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#E31B23] bg-[#E31B23]/10 px-2 py-0.5 rounded">
                  {s.badge}
                </span>
                <span className="text-xs font-mono text-white/30">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="text-base font-display font-semibold text-white">
                {s.title}
              </h3>
              <p className="text-xs font-light text-white/60 leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quality Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121218] to-[#0a0a0e] border border-white/10 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-[#E31B23]/15 border border-[#E31B23]/30 flex items-center justify-center text-[#E31B23] mb-3">
            <Award size={24} />
          </div>
          <h4 className="text-lg font-display font-bold text-white mb-1">
            Qualitätsversprechen
          </h4>
          <p className="text-xs font-light text-white/70 mb-5 max-w-[280px]">
            Über 15 Jahre Erfahrung. Modernste Farbtonmessung & Original-Lacke.
          </p>
          <button
            onClick={onBookClick}
            className="w-full py-3 px-5 rounded-lg bg-[#E31B23] hover:bg-[#d01820] active:scale-[0.98] transition-all text-white font-medium text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(227,27,35,0.35)]"
          >
            Jetzt unverbindlich anfragen
          </button>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center text-center gap-3 text-[11px] text-white/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-3.5 bg-[#E31B23] rounded-full" />
            <span className="font-display font-bold text-white text-xs tracking-wider">
              LOGO
            </span>
          </div>
          <p>© {new Date().getFullYear()} Smart Repair. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4 text-white/50 text-[10px]">
            <a href="#impressum" className="hover:text-white transition-colors">Impressum</a>
            <span>•</span>
            <a href="#datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
            <span>•</span>
            <a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
