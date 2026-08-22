import React, { useState, useMemo } from 'react';
import { GasStation, FuelType } from '../types';
import { 
  Search, 
  Filter, 
  MapPin, 
  Navigation, 
  Star, 
  Clock, 
  DollarSign, 
  TrendingDown, 
  CheckCircle, 
  SlidersHorizontal,
  Flame,
  X
} from 'lucide-react';

interface InteractiveStationFinderProps {
  stations: GasStation[];
  onSelectStation: (station: GasStation) => void;
  onOpenReportModal: (station: GasStation) => void;
  onClose?: () => void;
}

export const InteractiveStationFinder: React.FC<InteractiveStationFinderProps> = ({
  stations,
  onSelectStation,
  onOpenReportModal,
  onClose,
}) => {
  const [selectedFuel, setSelectedFuel] = useState<FuelType>('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'distance' | 'rating'>('price');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const filteredStations = useMemo(() => {
    return stations
      .filter((station) => {
        const matchesSearch =
          station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand =
          selectedBrand === 'all' || station.brand === selectedBrand;
        return matchesSearch && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === 'price') {
          return (a.prices[selectedFuel] || 0) - (b.prices[selectedFuel] || 0);
        }
        if (sortBy === 'distance') {
          return parseFloat(a.distance) - parseFloat(b.distance);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
  }, [stations, searchQuery, selectedBrand, sortBy, selectedFuel]);

  const fuelLabels: Record<FuelType, string> = {
    regular: 'Gasolina 95',
    premium: 'Gasolina 98',
    diesel: 'Diésel Plus',
    glp: 'Autogás GLP',
  };

  return (
    <div id="interactive-radar-explorer" className="py-16 bg-[#040e1b] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Explorador en Vivo</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-['Hanken_Grotesk']">
              Radar de Estaciones Cercanas
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Compara precios actualizados, filtra por tipo de combustible y planifica tu ruta más económica.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="self-start md:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Cerrar Explorador</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-[#0d1c2d] border border-slate-800 mb-8 space-y-4 shadow-xl">
          
          {/* Top Row: Search input & Fuel selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por calle, barrio o gasolinera (ej. Compton, Shell, Vernon)..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Fuel Selector Tabs */}
            <div className="md:col-span-6 flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(['regular', 'premium', 'diesel', 'glp'] as FuelType[]).map((fuel) => (
                <button
                  key={fuel}
                  onClick={() => setSelectedFuel(fuel)}
                  className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl text-xs font-semibold transition-all border text-center cursor-pointer ${
                    selectedFuel === fuel
                      ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fuelLabels[fuel]}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Brand filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
            
            {/* Brand filter chips */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-slate-400 font-medium shrink-0">Marca:</span>
              {['all', '7-eleven', 'chevron', 'shell', 'bp', 'costco'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-slate-700 text-white border border-slate-500'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {brand === 'all' ? 'Todas' : brand}
                </button>
              ))}
            </div>

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-medium">Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="price">Más Barata Primero</option>
                <option value="distance">Más Cercana (Distancia)</option>
                <option value="rating">Mejor Valorada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stations Results List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station, index) => {
            const price = station.prices[selectedFuel] || station.bestPrice;
            const isCheapest = index === 0 && sortBy === 'price';

            return (
              <div
                key={station.id}
                id={`station-item-${station.id}`}
                className={`relative rounded-2xl p-6 bg-[#0f2035]/70 hover:bg-[#152942]/90 border transition-all duration-200 backdrop-blur-md flex flex-col justify-between shadow-lg ${
                  isCheapest
                    ? 'border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {isCheapest && (
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-black" />
                    MEJOR OPCIÓN EN TU ZONA
                  </div>
                )}

                <div>
                  {/* Station Name & Distance */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img
                          src={station.logo}
                          alt={station.name}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white tracking-tight font-['Hanken_Grotesk']">
                          {station.name}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {station.neighborhood}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-semibold text-blue-400 block">
                        {station.distance}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ~{station.distanceMinutes} min
                      </span>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{station.address}</span>
                  </p>

                  {/* Price Box */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-medium">
                        {fuelLabels[selectedFuel]}
                      </span>
                      <div className="text-2xl font-extrabold text-white font-mono tracking-tight flex items-baseline gap-1">
                        ${price.toFixed(2)}
                        <span className="text-xs font-normal text-slate-400">/ gal</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          station.priceCategory === 'low'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : station.priceCategory === 'medium'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {station.priceCategory === 'low'
                          ? 'Económica'
                          : station.priceCategory === 'medium'
                          ? 'Promedio'
                          : 'Elevada'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {station.status}
                      </div>
                    </div>
                  </div>

                  {/* Amenities tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {station.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 rounded bg-slate-800/80 text-[10px] text-slate-300 border border-slate-700/50"
                      >
                        {amenity}
                      </span>
                    ))}
                    {station.amenities.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                        +{station.amenities.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    id={`btn-navigate-${station.id}`}
                    onClick={() => onSelectStation(station)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Ver en Mapa</span>
                  </button>

                  <button
                    id={`btn-report-${station.id}`}
                    onClick={() => onOpenReportModal(station)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                    title="Reportar o actualizar precio"
                  >
                    Reportar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
