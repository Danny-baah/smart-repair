import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Car, Sparkles, Phone, Mail, User } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, initialService }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialService || 'Lackschaden & Kratzer',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);


  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 2.5s
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex flex-col justify-end sm:justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-[460px] mx-auto bg-[#101014] border border-white/10 rounded-2xl p-6 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          aria-label="Schließen"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E31B23]/20 border border-[#E31B23] flex items-center justify-center mb-4 text-[#E31B23]">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-display font-semibold text-white mb-2">
              Anfrage erfolgreich versendet!
            </h3>
            <p className="text-sm font-light text-white/70 max-w-[320px]">
              Vielen Dank. Unser Smart-Repair-Meisterbetrieb meldet sich innerhalb von 30 Minuten bei Ihnen.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#E31B23]" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">
                Express-Beratung
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-1">
              Termin anfragen
            </h3>
            <p className="text-xs text-white/60 mb-6 font-light">
              Kostenlose Schadensanalyse & Festpreis-Garantie
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Gewünschte Leistung
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full py-2.5 px-3.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#E31B23] transition-colors"
                >
                  <option value="Lackschaden & Kratzer">Lackschaden & Kratzerbeseitigung</option>
                  <option value="Felgenaufbereitung">Felgeninstandsetzung & Glanzdrehen</option>
                  <option value="Dellentechnik (PDR)">Dellenentfernung ohne Lackieren (PDR)</option>
                  <option value="Scheinwerfer-Aufbereitung">Scheinwerfer-Aufbereitung & Politur</option>
                  <option value="Komplettaufbereitung">Exklusive Komplettaufbereitung</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Name
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder="Ihr vollständiger Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full py-2.5 pl-10 pr-3.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E31B23] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-white/70 mb-1.5">
                  Telefonnummer für Rückruf
                </label>
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-3 text-white/40" />
                  <input
                    type="tel"
                    required
                    placeholder="+49 170 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full py-2.5 pl-10 pr-3.5 bg-black/60 border border-white/15 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E31B23] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-lg bg-[#D81A22] hover:bg-[#e61c25] active:scale-[0.98] transition-all text-white font-medium text-sm flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(216,26,34,0.4)] cursor-pointer"
              >
                <span>Anfrage absenden</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
