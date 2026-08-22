import React, { useState, useEffect } from 'react';
import { GasStation, FuelType } from '../types';
import { 
  Search, 
  Menu, 
  Navigation, 
  Sparkles, 
  Wifi, 
  Battery, 
  Signal, 
  Plus, 
  Minus, 
  Layers, 
  RotateCw,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface PhoneMockupProps {
  stations: GasStation[];
  selectedStation: GasStation | null;
  onSelectStation: (station: GasStation) => void;
  onNavigateToStation: (station: GasStation) => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  stations,
  selectedStation,
  onSelectStation,
  onNavigateToStation,
}) => {
  const [activeFuel, setActiveFuel] = useState<FuelType>('regular');
  const [isScanning, setIsScanning] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [routeActive, setRouteActive] = useState(true);
  const [userLocation, setUserLocation] = useState({ x: 35, y: 75 });
  const [pulseCount, setPulseCount] = useState(0);

  const currentStation = selectedStation || stations[0];

  // Periodic radar pulse effect
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCount((prev) => (prev + 1) % 100);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getPinColor = (category: 'low' | 'medium' | 'high') => {
    switch (category) {
      case 'low':
        return {
          bg: 'bg-emerald-600',
          border: 'border-emerald-400',
          glow: 'shadow-emerald-500/50',
          badge: 'bg-emerald-500',
          text: 'text-emerald-300',
        };
      case 'medium':
        return {
          bg: 'bg-amber-600',
          border: 'border-amber-400',
          glow: 'shadow-amber-500/50',
          badge: 'bg-amber-500',
          text: 'text-amber-300',
        };
      case 'high':
        return {
          bg: 'bg-rose-600',
          border: 'border-rose-400',
          glow: 'shadow-rose-500/50',
          badge: 'bg-rose-500',
          text: 'text-rose-300',
        };
    }
  };

  return (
    <div
      id="phone-mockup-wrapper"
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px] aspect-[9/18.8] select-none"
    >
      {/* Outer ambient glow behind phone */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-indigo-600/30 rounded-[54px] blur-2xl -z-10 opacity-70 animate-pulse" />

      {/* Phone chassis */}
      <div className="relative w-full h-full bg-[#0d1624] border-[7px] border-[#1e293b] rounded-[48px] shadow-2xl shadow-black/80 overflow-hidden flex flex-col ring-1 ring-white/15">
        
        {/* Hardware details: top notch/island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-700/50 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-blue-900/60" />
          </div>
          <div className="w-8 h-1.5 rounded-full bg-neutral-800" />
        </div>

        {/* Status Bar */}
        <div className="pt-2.5 px-6 pb-1 flex items-center justify-between text-xs text-white font-semibold z-30 bg-[#0f172a]/70 backdrop-blur-sm">
          <span className="font-mono text-[11px] text-slate-200">10:03</span>
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="text-[10px] text-blue-400 font-mono">5G</span>
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          </div>
        </div>

        {/* In-App Header: Search bar + Menu */}
        <div className="px-3 py-2 z-30 bg-[#0f172a]/95 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              id="phone-menu-btn"
              className="w-8 h-8 rounded-lg bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white"
              title="Menú"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <input
                id="phone-search-input"
                type="text"
                readOnly
                value="Vernon, Los Angeles, CA"
                className="w-full h-8 pl-8 pr-3 bg-slate-800/90 border border-slate-700/60 rounded-lg text-[11px] text-slate-200 focus:outline-none placeholder-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
            <button
              id="phone-radar-btn"
              onClick={() => setIsScanning(!isScanning)}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${
                isScanning
                  ? 'bg-blue-600/30 border-blue-500/60 text-blue-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="Radar Scanner"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Fuel type selector chips */}
          <div className="flex items-center justify-between gap-1 mt-2 pt-1 border-t border-slate-800/60">
            {(['regular', 'premium', 'diesel', 'glp'] as FuelType[]).map((fuel) => {
              const labels: Record<FuelType, string> = {
                regular: 'Gas 95',
                premium: 'Gas 98',
                diesel: 'Diesel',
                glp: 'GLP',
              };
              const isActive = activeFuel === fuel;
              return (
                <button
                  key={fuel}
                  id={`phone-fuel-${fuel}-btn`}
                  onClick={() => setActiveFuel(fuel)}
                  className={`flex-1 py-1 rounded-md text-[10px] font-semibold tracking-tight transition-all text-center cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/50 border border-blue-400'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/30'
                  }`}
                >
                  {labels[fuel]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Body Canvas */}
        <div className="relative flex-1 bg-[#101b2b] overflow-hidden">
          {/* Map Base Graphic (Streets, grid, neighborhoods matching reference) */}
          <div
            className="absolute inset-0 transition-transform duration-300 origin-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* Dark Map Vector Rendering */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 320 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="320" height="480" fill="#0d1827" />

              {/* Street grid patterns */}
              {/* Secondary streets */}
              <line x1="0" y1="60" x2="320" y2="60" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="120" x2="320" y2="120" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="180" x2="320" y2="180" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="240" x2="320" y2="240" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="300" x2="320" y2="300" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="360" x2="320" y2="360" stroke="#1e293b" strokeWidth="2" />

              <line x1="60" y1="0" x2="60" y2="480" stroke="#1e293b" strokeWidth="2" />
              <line x1="120" y1="0" x2="120" y2="480" stroke="#1e293b" strokeWidth="2" />
              <line x1="180" y1="0" x2="180" y2="480" stroke="#1e293b" strokeWidth="2" />
              <line x1="240" y1="0" x2="240" y2="480" stroke="#1e293b" strokeWidth="2" />
              <line x1="300" y1="0" x2="300" y2="480" stroke="#1e293b" strokeWidth="2" />

              {/* Major Avenues (Thicker) */}
              {/* E 42nd St */}
              <line x1="0" y1="80" x2="320" y2="80" stroke="#2a3c53" strokeWidth="5" />
              {/* E Slauson Ave */}
              <line x1="0" y1="160" x2="320" y2="160" stroke="#2a3c53" strokeWidth="6" />
              {/* Randolph St */}
              <line x1="0" y1="210" x2="320" y2="210" stroke="#2a3c53" strokeWidth="4" />
              {/* E Gage Ave */}
              <line x1="0" y1="270" x2="320" y2="270" stroke="#2a3c53" strokeWidth="4.5" />
              {/* E Florence Ave */}
              <line x1="0" y1="340" x2="320" y2="340" stroke="#2a3c53" strokeWidth="7" />
              {/* Firestone Blvd */}
              <line x1="0" y1="410" x2="320" y2="410" stroke="#2a3c53" strokeWidth="6" />

              {/* Vertical Major Avenues */}
              {/* McKinley Ave */}
              <line x1="45" y1="0" x2="45" y2="480" stroke="#2a3c53" strokeWidth="4" />
              {/* Compton Ave */}
              <line x1="100" y1="0" x2="100" y2="480" stroke="#2a3c53" strokeWidth="6" />
              {/* Long Beach Ave */}
              <line x1="155" y1="0" x2="155" y2="480" stroke="#2a3c53" strokeWidth="7" />
              {/* S Alameda St */}
              <line x1="210" y1="0" x2="210" y2="480" stroke="#2a3c53" strokeWidth="8" />
              {/* S Santa Fe Ave */}
              <line x1="270" y1="0" x2="270" y2="480" stroke="#2a3c53" strokeWidth="6" />

              {/* Street Names Labels */}
              <text x="15" y="75" fill="#64748b" fontSize="8" fontFamily="Arial">42nd St</text>
              <text x="15" y="155" fill="#64748b" fontSize="8" fontFamily="Arial">E Slauson Ave</text>
              <text x="215" y="205" fill="#64748b" fontSize="8" fontFamily="Arial">Randolph St</text>
              <text x="215" y="265" fill="#64748b" fontSize="8" fontFamily="Arial">E Gage Ave</text>
              <text x="15" y="335" fill="#64748b" fontSize="8" fontFamily="Arial">E Florence Ave</text>
              <text x="170" y="405" fill="#64748b" fontSize="8" fontFamily="Arial">Firestone Blvd</text>
              <text x="215" y="450" fill="#64748b" fontSize="8" fontFamily="Arial">E 92nd St</text>

              {/* Neighborhoods */}
              <text x="235" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="Arial">Vernon</text>
              <text x="15" y="310" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="Arial">Florence-Graham</text>
              <text x="230" y="325" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="Arial">Walnut Park</text>

              {/* Route line to selected station if route active */}
              {routeActive && currentStation && (
                <g>
                  {/* Glowing route outline */}
                  <path
                    d={`M ${userLocation.x * 3.2} ${userLocation.y * 4.8} 
                        L 100 ${userLocation.y * 4.8} 
                        L 100 ${(currentStation.coords.y * 4.8) + 20} 
                        L ${(currentStation.coords.x * 3.2)} ${(currentStation.coords.y * 4.8) + 20} 
                        L ${(currentStation.coords.x * 3.2)} ${(currentStation.coords.y * 4.8)}`}
                    stroke="#3b82f6"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="6 4"
                    className="animate-pulse"
                    opacity="0.85"
                  />
                  {/* Inner neon line */}
                  <path
                    d={`M ${userLocation.x * 3.2} ${userLocation.y * 4.8} 
                        L 100 ${userLocation.y * 4.8} 
                        L 100 ${(currentStation.coords.y * 4.8) + 20} 
                        L ${(currentStation.coords.x * 3.2)} ${(currentStation.coords.y * 4.8) + 20} 
                        L ${(currentStation.coords.x * 3.2)} ${(currentStation.coords.y * 4.8)}`}
                    stroke="#60a5fa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}
            </svg>

            {/* Radar scanner sweep effect overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                  className="absolute w-72 h-72 rounded-full border border-blue-500/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      'conic-gradient(from 0deg at 50% 50%, rgba(59, 130, 246, 0) 0deg, rgba(59, 130, 246, 0) 300deg, rgba(59, 130, 246, 0.25) 360deg)',
                  }}
                >
                  <div className="w-full h-full animate-radar-sweep origin-center" />
                </div>
                <div className="absolute w-44 h-44 rounded-full border border-blue-400/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring" />
              </div>
            )}

            {/* User GPS location marker */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 animate-ping absolute" />
                <div className="w-5 h-5 rounded-full bg-blue-500/40 border border-white/60 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-white ring-2 ring-blue-600" />
                </div>
                {/* Heading cone */}
                <div className="absolute -top-3 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[8px] border-b-blue-400/80" />
              </div>
            </div>

            {/* Station Map Markers (Interactive pins) */}
            {stations.map((station) => {
              const isSelected = currentStation.id === station.id;
              const colorInfo = getPinColor(station.priceCategory);
              const price = station.prices[activeFuel] || station.bestPrice;

              return (
                <div
                  key={station.id}
                  id={`map-pin-${station.id}`}
                  onClick={() => onSelectStation(station)}
                  style={{ left: `${station.coords.x}%`, top: `${station.coords.y}%` }}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 group ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* Floating Price Pill Tag */}
                    <div
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full shadow-lg border transition-all text-white ${
                        isSelected
                          ? `${colorInfo.bg} ${colorInfo.border} ring-2 ring-white/50 shadow-xl ${colorInfo.glow}`
                          : `${colorInfo.bg}/90 border-white/30`
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-black/40 text-[9px] font-bold flex items-center justify-center">
                        {station.number}
                      </span>
                      <span className="text-[11px] font-bold font-mono tracking-tight">
                        ${price.toFixed(2)}
                      </span>
                    </div>

                    {/* Pin pointer triangle */}
                    <div
                      className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] ${
                        station.priceCategory === 'low'
                          ? 'border-t-emerald-600'
                          : station.priceCategory === 'medium'
                          ? 'border-t-amber-600'
                          : 'border-t-rose-600'
                      }`}
                    />

                    {/* Station Brand Mini Logo on Hover or Selected */}
                    {isSelected && (
                      <div className="absolute -bottom-4 px-1.5 py-0.2 bg-slate-900/90 border border-slate-700 rounded text-[9px] font-semibold text-slate-200 whitespace-nowrap shadow-md">
                        {station.name}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Overlay Controls (Floating on map) */}
          <div className="absolute right-2 top-3 z-30 flex flex-col gap-1.5">
            <button
              id="map-zoom-in"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="w-7 h-7 rounded-md bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-slate-200 hover:text-white flex items-center justify-center shadow"
              title="Acercar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              id="map-zoom-out"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
              className="w-7 h-7 rounded-md bg-slate-900/80 backdrop-blur-sm border border-slate-700/60 text-slate-200 hover:text-white flex items-center justify-center shadow"
              title="Alejar"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              id="map-toggle-route"
              onClick={() => setRouteActive(!routeActive)}
              className={`w-7 h-7 rounded-md backdrop-blur-sm border flex items-center justify-center shadow ${
                routeActive
                  ? 'bg-blue-600/80 border-blue-400 text-white'
                  : 'bg-slate-900/80 border-slate-700/60 text-slate-400'
              }`}
              title="Ruta al mejor precio"
            >
              <Navigation className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Card Bar (Exact matching the phone mockup in screenshot) */}
          <div className="absolute bottom-2 left-2 right-2 z-30 flex gap-2">
            {/* Lowest Station Main Highlight Card (e.g. 7-Eleven $5.19) */}
            <div
              id={`station-card-bottom-1`}
              onClick={() => onSelectStation(stations[0])}
              className={`flex-1 p-2 rounded-xl border transition-all cursor-pointer ${
                currentStation.id === stations[0].id
                  ? 'bg-slate-900/95 border-emerald-500/70 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/85 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span className="truncate max-w-[70px]">7-Eleven</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">1.1 mi</span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-extrabold text-white font-mono">
                  ${(stations[0].prices[activeFuel] || 5.19).toFixed(2)}
                </div>
                <span className="text-[9px] px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                  MEJOR PRECIO
                </span>
              </div>
            </div>

            {/* Second Station Highlight Card (e.g. Chevron $5.65) */}
            <div
              id={`station-card-bottom-2`}
              onClick={() => onSelectStation(stations[1])}
              className={`flex-1 p-2 rounded-xl border transition-all cursor-pointer ${
                currentStation.id === stations[1].id
                  ? 'bg-slate-900/95 border-amber-500/70 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/85 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1 text-[11px] font-bold text-white">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <span className="truncate max-w-[70px]">Chevron</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">2.4 mi</span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-extrabold text-white font-mono">
                  ${(stations[1].prices[activeFuel] || 5.65).toFixed(2)}
                </div>
                <span className="text-[9px] text-slate-400">
                  +0.46$
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Android bottom nav bar handles */}
        <div className="py-1 px-8 flex items-center justify-between bg-black text-neutral-600 z-30">
          <div className="w-3.5 h-3.5 border-l-2 border-b-2 border-neutral-500 rotate-45" />
          <div className="w-3 h-3 rounded-full border-2 border-neutral-500" />
          <div className="w-3.5 h-3.5 border-2 border-neutral-500" />
        </div>
      </div>
    </div>
  );
};
