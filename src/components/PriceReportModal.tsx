import React, { useState } from 'react';
import { GasStation, FuelType } from '../types';
import { X, Check, DollarSign, Camera, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

interface PriceReportModalProps {
  station: GasStation | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (stationId: string, fuelType: FuelType, newPrice: number) => void;
}

export const PriceReportModal: React.FC<PriceReportModalProps> = ({
  station,
  isOpen,
  onClose,
  onSubmitReport,
}) => {
  const [selectedFuel, setSelectedFuel] = useState<FuelType>('regular');
  const [reportedPrice, setReportedPrice] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !station) return null;

  const currentPrice = station.prices[selectedFuel] || station.bestPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(reportedPrice || currentPrice.toString());
    if (isNaN(priceNum) || priceNum <= 0) return;

    onSubmitReport(station.id, selectedFuel, priceNum);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0f2035] border border-blue-500/30 p-6 sm:p-8 shadow-2xl shadow-black/80 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center p-1.5">
            <DollarSign className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-['Hanken_Grotesk'] text-white">
              Actualizar Precio en Vivo
            </h3>
            <p className="text-xs text-slate-400">
              {station.name} — {station.neighborhood}
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">¡Gracias por tu aporte!</h4>
            <p className="text-xs text-slate-300">
              El precio de {station.name} ha sido verificado y actualizado en la red de GasRadar.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fuel selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
                Tipo de Combustible
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'regular', label: 'Gasolina 95' },
                  { id: 'premium', label: 'Gasolina 98' },
                  { id: 'diesel', label: 'Diésel' },
                  { id: 'glp', label: 'GLP' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedFuel(item.id as FuelType);
                      setReportedPrice((station.prices[item.id as FuelType] || 5.19).toString());
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex justify-between items-center cursor-pointer ${
                      selectedFuel === item.id
                        ? 'bg-blue-600/30 border-blue-400 text-white'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[11px] text-slate-300">
                      ${station.prices[item.id as FuelType]?.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price input */}
            <div>
             <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
              Precio Observado ($ / gal)
            </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  placeholder={currentPrice.toFixed(2)}
                  value={reportedPrice}
                  onChange={(e) => setReportedPrice(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-slate-900 border border-slate-700 text-xl font-bold font-mono text-white focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-3 text-lg font-bold text-slate-400">
                  $
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Precio actual en base de datos: ${currentPrice.toFixed(2)}
              </p>
            </div>

            {/* Community badge reward info */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-start gap-2.5 text-xs text-blue-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Gana +25 Puntos Radar de Conductor y ayuda a miles a no pagar de más.</span>
            </div>

            {/* Submit button */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirmar Precio</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
