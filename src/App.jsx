import React, { useState } from 'react';
import MobileNavbar from './components/MobileNavbar';
import MobileStoryHero from './components/MobileStoryHero';
import MobileServicesSection from './components/MobileServicesSection';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Lackschaden & Kratzer');

  const handleBookClick = () => {
    setSelectedService('Lackschaden & Kratzer');
    setIsBookingOpen(true);
  };

  const handleSelectService = (serviceKey) => {
    setSelectedService(serviceKey);
    setIsBookingOpen(true);
  };

  const handleExploreClick = () => {
    const leistungenEl = document.getElementById('leistungen');
    if (leistungenEl) {
      leistungenEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[100svh] w-full bg-[#050507] text-white flex flex-col items-center overflow-x-hidden">
      {/* Mobile-first Container: Full width on mobile, centered smartphone canvas on larger displays */}
      <div className="relative w-full max-w-[540px] min-h-[100svh] shadow-2xl bg-[#050507] flex flex-col">
        {/* Mobile Navbar with LOGO and Hamburger */}
        <MobileNavbar onBookClick={handleBookClick} />

        {/* Cinematic Scroll Story Hero with 160-frame HTML5 Canvas */}
        <MobileStoryHero
          onBookClick={handleBookClick}
          onExploreClick={handleExploreClick}
        />

        {/* Mobile Smart Repair Services Section (Reference Match) */}
        <MobileServicesSection
          onSelectService={handleSelectService}
          onExploreAll={handleBookClick}
        />
      </div>

      {/* Booking & Consultation Drawer Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  );
}
