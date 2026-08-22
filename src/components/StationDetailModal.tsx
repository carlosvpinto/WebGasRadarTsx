import React from 'react';
import { GasStation, FuelType } from '../types';
import { 
  X, 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Share2, 
  CheckCircle2, 
  ExternalLink,
  Flame,
  ShieldCheck,
  Zap,
  Phone
} from 'lucide-react';

interface StationDetailModalProps {
  station: GasStation | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReportModal: (station: GasStation) => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({
  station,
  isOpen,
  onClose,
  onOpenReportModal,
}) => {
  if (!isOpen || !station) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${station.name} - GasRadar`,
        text: `Gasolina en ${station.name} a solo $${station.bestPrice} (${station.distance})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${station.name}: $${station.bestPrice} (${station.address})`);
      alert('¡Enlace copiado al portapapeles!');
    }
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${station.name} ${station.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0d1c2d] border border-blue-500/30 p-6 sm:p-8 shadow-2xl shadow-black/80 text-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Station Title & Brand Logo */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center p-2 shrink-0">
            <img
              src={station.logo}
              alt={station.name}
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold font-['Hanken_Grotesk'] text-white">
                {station.name}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/30">
                #{station.number}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {station.neighborhood} • {station.distance} (~{station.distanceMinutes} min)
            </p>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                <span className="font-bold">{station.rating}</span>
                <span className="text-slate-500 ml-1">({station.reviewCount})</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-medium">{station.status}</span>
            </div>
          </div>
        </div>

        {/* Full Price Table */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Precios en Surtidor (Actualizados hoy)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'Gasolina 95', price: station.prices.regular, key: 'regular' },
              { label: 'Gasolina 98', price: station.prices.premium, key: 'premium' },
              { label: 'Diésel Plus', price: station.prices.diesel, key: 'diesel' },
              { label: 'Autogás GLP', price: station.prices.glp, key: 'glp' },
            ].map((item) => (
              <div
                key={item.key}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center"
              >
                <span className="text-[10px] text-slate-400 block font-medium">
                  {item.label}
                </span>
                <span className="text-base font-extrabold font-mono text-white block mt-0.5">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Location card */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-6 flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-white font-medium">{station.address}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Coordenadas: {station.lat.toFixed(4)}, {station.lng.toFixed(4)}
              </p>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Compartir ubicación"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Servicios e Instalaciones
          </h4>
          <div className="flex flex-wrap gap-2">
            {station.amenities.map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 border border-slate-700"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleOpenGoogleMaps}
            className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Navegar en GPS (Google Maps)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenReportModal(station);
            }}
            className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            Reportar Precio
          </button>
        </div>

      </div>
    </div>
  );
};
