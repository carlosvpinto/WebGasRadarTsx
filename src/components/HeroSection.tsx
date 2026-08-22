import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { GasStation } from '../types';
import { Sparkles, TrendingDown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  stations: GasStation[];
  selectedStation: GasStation | null;
  onSelectStation: (station: GasStation) => void;
  onOpenDownload: () => void;
  onNavigateToStation: (station: GasStation) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  onOpenDownload,
  onNavigateToStation,
}) => {
  return (
    <section
      id="hero-radar"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-grid-blueprint"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & CTA Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Live radar badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white">Radar Activo:</span>
              <span>+14.200 estaciones analizadas en vivo</span>
            </div>

            {/* Main Headline from original design */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-['Hanken_Grotesk']">
              Encuentra la gasolina más barata{' '}
              <span className="text-[#3b82f6] inline-block relative">
                al instante
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-blue-500/40"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C50 2 150 2 199 5.5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle from original design */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              Ahorra en cada carga con precios en tiempo real y navegación directa.
              GasRadar analiza miles de estaciones para ofrecerte la mejor opción.
            </p>

            {/* Store Buttons (Matching design exactly) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              {/* App Store Button */}
              <button
                id="hero-app-store-btn"
                onClick={onOpenDownload}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all duration-200 shadow-lg shadow-black/40 group cursor-pointer"
              >
                {/* Apple icon */}
                <div className="text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.13 16.69C20.1 16.79 19.72 18.09 18.71 19.5ZM14.88 4.76C15.46 4.04 15.86 3.05 15.75 2.05C14.89 2.09 13.82 2.63 13.22 3.34C12.68 3.96 12.21 4.98 12.35 5.95C13.31 6.03 14.31 5.48 14.88 4.76Z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider leading-none">
                    Download on the
                  </span>
                  <span className="text-base font-bold text-white leading-tight font-['Hanken_Grotesk']">
                    App Store
                  </span>
                </div>
              </button>

              {/* Google Play Button */}
              <button
                id="hero-google-play-btn"
                onClick={onOpenDownload}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 transition-all duration-200 shadow-lg shadow-black/40 group cursor-pointer"
              >
                {/* Google Play icon */}
                <div className="text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.436V3.25c0-.555.223-1.057.609-1.436zm11.233 11.233l2.368 2.368-12.72 7.345 10.352-9.713zm0-2.094L4.49 1.24l12.72 7.345-2.368 2.368zm1.06 1.047l3.655-2.11a1.994 1.994 0 0 1 0 3.456l-3.655 2.11-1.04-1.728 1.04-1.728z" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider leading-none">
                    Get it on
                  </span>
                  <span className="text-base font-bold text-white leading-tight font-['Hanken_Grotesk']">
                    Google Play
                  </span>
                </div>
              </button>
            </div>

            {/* Highlighted Micro Benefits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 w-full max-w-xl">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  Ahorro medio: <strong className="text-emerald-400 font-mono">$0.25/gal</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  Actualización <strong className="text-white font-mono">c/ 60s</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-xs text-slate-300">
                  Precios <strong className="text-white">100% verificados</strong>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <PhoneMockup
              stations={stations}
              selectedStation={selectedStation}
              onSelectStation={onSelectStation}
              onNavigateToStation={onNavigateToStation}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
