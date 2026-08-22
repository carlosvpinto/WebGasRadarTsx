import React, { useState } from 'react';
import { Download, Sparkles, Navigation, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
  onOpenStationFinder: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, onOpenStationFinder }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#051424]/90 backdrop-blur-md border-b border-blue-900/30 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          id="nav-logo-btn"
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-9 h-9 rounded-lg bg-[#0f172a] border border-blue-500/30 flex items-center justify-center p-1.5 shadow-md shadow-blue-950/50 group-hover:border-blue-400/60 transition-colors">
            <img
              src="/images/logo.svg"
              alt="GasRadar Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-['Hanken_Grotesk']">
                Gas<span className="text-[#3b82f6]">Radar</span>
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE
              </span>
            </div>
          </div>
        </a>

        {/* Navigation links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            id="nav-link-map"
            onClick={() => scrollTo('hero-radar')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-400" />
            Mapa en Vivo
          </button>
          <button
            id="nav-link-features"
            onClick={() => scrollTo('features-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ventajas
          </button>
          <button
            id="nav-link-calculator"
            onClick={() => scrollTo('calculator-section')}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Calculadora
          </button>
          <button
            id="nav-link-testimonials"
            onClick={() => scrollTo('testimonials-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Testimonios
          </button>
          <button
            id="nav-link-radar-search"
            onClick={onOpenStationFinder}
            className="hover:text-blue-400 text-blue-300/90 transition-colors cursor-pointer"
          >
            Explorador Web
          </button>
        </nav>

        {/* Action Button matching design header "Download Now" */}
        <div className="flex items-center gap-3">
          <button
            id="nav-download-now-btn"
            onClick={onOpenDownload}
            className="relative group overflow-hidden px-5 py-2 rounded-lg bg-[#0566d9] hover:bg-[#0452af] active:bg-[#03408c] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>Download Now</span>
          </button>
        </div>
      </div>
    </header>
  );
};
