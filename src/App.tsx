import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { SavingsCalculator } from './components/SavingsCalculator';
import { InteractiveStationFinder } from './components/InteractiveStationFinder';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { StationDetailModal } from './components/StationDetailModal';
import { PriceReportModal } from './components/PriceReportModal';
import { INITIAL_STATIONS } from './data/mockStations';
import { GasStation, FuelType } from './types';

export default function App() {
  const [stations, setStations] = useState<GasStation[]>(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(INITIAL_STATIONS[0]);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingStation, setReportingStation] = useState<GasStation | null>(null);
  const [showExplorer, setShowExplorer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSelectStation = (station: GasStation) => {
    setSelectedStation(station);
    setIsDetailModalOpen(true);
  };

  const handleNavigateToStation = (station: GasStation) => {
    setSelectedStation(station);
    showToast(`Iniciando ruta hacia ${station.name} (${station.distance})`);
  };

  const handleOpenReportModal = (station: GasStation) => {
    setReportingStation(station);
    setIsReportModalOpen(true);
  };

  const handleSubmitPriceReport = (stationId: string, fuelType: FuelType, newPrice: number) => {
    setStations((prev) =>
      prev.map((st) => {
        if (st.id === stationId) {
          const updatedPrices = { ...st.prices, [fuelType]: newPrice };
          const priceValues = Object.values(updatedPrices) as number[];
          const minPrice = Math.min(...priceValues);
          return {
            ...st,
            prices: updatedPrices,
            bestPrice: minPrice,
            priceCategory: newPrice < 5.3 ? 'low' : newPrice < 5.75 ? 'medium' : 'high',
          };
        }
        return st;
      })
    );
    showToast(`¡Precio de ${fuelType} actualizado a $${newPrice.toFixed(2)} correctamente!`);
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-blue-600 text-white font-medium text-sm shadow-2xl shadow-blue-950/80 border border-blue-400 flex items-center gap-2 animate-in slide-in-from-bottom-5 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header / Navbar */}
      <Navbar
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenStationFinder={() => setShowExplorer((prev) => !prev)}
        activeSection="home"
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section matching the reference screenshot */}
        <HeroSection
          stations={stations}
          selectedStation={selectedStation}
          onSelectStation={handleSelectStation}
          onOpenDownload={() => setIsDownloadOpen(true)}
          onNavigateToStation={handleNavigateToStation}
        />

        {/* 3 Core Features Grid ("Potencia tu viaje") */}
        <FeaturesGrid
          onOpenCalculator={() => {
            const el = document.getElementById('calculator-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenStationFinder={() => setShowExplorer(true)}
        />

        {/* Testimonials Section ("Lo que dicen nuestros conductores") */}
        <TestimonialsSection />

        {/* Smart Savings Calculator */}
        <SavingsCalculator />

        {/* Interactive Station Finder / Radar Explorer (Accessible via button or nav) */}
        {showExplorer && (
          <InteractiveStationFinder
            stations={stations}
            onSelectStation={handleSelectStation}
            onOpenReportModal={handleOpenReportModal}
            onClose={() => setShowExplorer(false)}
          />
        )}

        {/* Call to Action Banner ("¿Listo para ahorrar?") */}
        <DownloadCTA onOpenDownload={() => setIsDownloadOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />

      <StationDetailModal
        station={selectedStation}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onOpenReportModal={handleOpenReportModal}
      />

      <PriceReportModal
        station={reportingStation}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitReport={handleSubmitPriceReport}
      />

    </div>
  );
}
