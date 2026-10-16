import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function MobileNavbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Start', href: '#start', num: '01' },
    { label: 'Leistungen', href: '#leistungen', num: '02' },
    { label: 'Über uns', href: '#ueber-uns', num: '03' },
    { label: 'Ablauf', href: '#ablauf', num: '04' },
    { label: 'Kontakt', href: '#kontakt', num: '05' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
        <div className="w-full max-w-[540px] mx-auto px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3 flex items-center justify-between pointer-events-auto">
          {/* Logo with Red Accent Bar as in Reference */}
          <a
            href="#start"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Smart Repair Logo"
          >
            <span className="w-[3px] h-5 bg-[#E31B23] rounded-full shadow-[0_0_8px_rgba(227,27,35,0.7)] transition-transform duration-300 group-hover:scale-y-110" />
            <span className="text-xl font-bold tracking-[0.18em] text-white font-display uppercase select-none">
              LOGO
            </span>
          </a>

          {/* Minimal Hamburger Menu */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 -mr-2 flex flex-col items-end justify-center gap-[5px] text-white cursor-pointer focus:outline-none transition-opacity active:opacity-60"
            aria-label="Menü öffnen"
          >
            <span className="w-6 h-[2px] bg-white rounded-full transition-transform" />
            <span className="w-6 h-[2px] bg-white rounded-full transition-transform" />
            <span className="w-6 h-[2px] bg-white rounded-full transition-transform" />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl transition-all duration-400 ease-out flex flex-col justify-between p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] ${
          isOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Header inside overlay */}
        <div className="flex items-center justify-between w-full max-w-[540px] mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-[3px] h-5 bg-[#E31B23] rounded-full shadow-[0_0_8px_rgba(227,27,35,0.7)]" />
            <span className="text-xl font-bold tracking-[0.18em] text-white font-display uppercase">
              LOGO
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 -mr-2 flex items-center justify-center text-white/80 hover:text-white transition-colors active:scale-95"
            aria-label="Menü schließen"
          >
            <X size={26} strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="w-full max-w-[540px] mx-auto my-auto py-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#E31B23] mb-6">
            Navigation
          </p>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-2 text-2xl font-light text-white/90 hover:text-white transition-colors border-b border-white/5"
              >
                <span className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-white/40 group-hover:text-[#E31B23] transition-colors">
                    {link.num}
                  </span>
                  <span className="font-display tracking-tight text-white group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="text-white/30 group-hover:text-[#E31B23] group-hover:translate-x-1 transition-all"
                />
              </a>
            ))}
          </nav>

          {/* Quick CTA inside Menu */}
          <div className="mt-8">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onBookClick) onBookClick();
              }}
              className="w-full py-3.5 px-6 rounded-lg bg-[#E31B23] hover:bg-[#d01820] active:scale-[0.98] transition-all text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(227,27,35,0.4)]"
            >
              <span>Termin unverbindlich anfragen</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Footer info in overlay */}
        <div className="w-full max-w-[540px] mx-auto pt-4 border-t border-white/10 flex flex-col gap-3 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#E31B23]" />
            <span>Zertifizierter Smart-Repair-Fachbetrieb</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> Meisterwerkstatt
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> Mo-Fr 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
