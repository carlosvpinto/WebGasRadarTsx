import React, { useState } from 'react';
import { FuelType } from '../types';
import { Calculator, Sparkles, TrendingDown, ArrowRight, ShieldCheck, Gauge, Check } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
  const [fuelType, setFuelType] = useState<FuelType>('regular');
const [tankSize, setTankSize] = useState<number>(50); // Liters
const [refillsPerMonth, setRefillsPerMonth] = useState<number>(3); // times
const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');

const priceDiffPerLiter: Record<FuelType, number> = {
  regular: 0.25,
  premium: 0.35,
  diesel: 0.28,
  glp: 0.18,
};

const currentDiff = priceDiffPerLiter[fuelType];
const savingsPerTank = (tankSize / 3.785) * currentDiff * 3.785;
const monthlySavings = (tankSize * currentDiff * refillsPerMonth) / 3.785;
const annualSavings = monthlySavings * 12;

const symbol = '$';

  return (
    <section
      id="calculator-section"
      className="py-20 relative bg-[#09182b] border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-grid-dense opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Calculadora de Ahorro Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-['Hanken_Grotesk']">
            ¿Cuánto puedes ahorrar con GasRadar?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Ajusta los datos de tu vehículo y descubre el impacto en tu bolsillo mes a mes.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0f2035]/90 border border-blue-900/40 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Fuel Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  Tipo de Combustible
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'regular', label: 'Gasolina 95' },
                    { id: 'premium', label: 'Gasolina 98' },
                    { id: 'diesel', label: 'Diésel' },
                    { id: 'glp', label: 'GLP / Eco' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      id={`calc-fuel-${item.id}`}
                      onClick={() => setFuelType(item.id as FuelType)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        fuelType === item.id
                          ? 'bg-blue-600 border-blue-400 text-white shadow-md shadow-blue-600/40'
                          : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tank Size Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Capacidad del Depósito
                  </label>
                  <span className="text-sm font-bold font-mono text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-lg border border-blue-800/40">
                    {tankSize} Litros
                  </span>
                </div>
                <input
                  id="calc-tank-slider"
                  type="range"
                  min="30"
                  max="90"
                  step="5"
                  value={tankSize}
                  onChange={(e) => setTankSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>30L (Compacto)</span>
                  <span>50L (Sedán)</span>
                  <span>70L (SUV)</span>
                  <span>90L (Grande)</span>
                </div>
              </div>

              {/* Refills per month */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Llenados al Mes
                  </label>
                  <span className="text-sm font-bold font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-800/40">
                    {refillsPerMonth} {refillsPerMonth === 1 ? 'tanque' : 'tanques'} / mes
                  </span>
                </div>
                <input
                  id="calc-refills-slider"
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={refillsPerMonth}
                  onChange={(e) => setRefillsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>1x (Poco uso)</span>
                  <span>3x (Uso normal)</span>
                  <span>5x (Comuter)</span>
                  <span>8x (Profesional)</span>
                </div>
              </div>
            </div>

            {/* Results Panel (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#13273e] to-[#0d1c2d] p-6 rounded-2xl border border-blue-500/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/50">
                  <span className="text-xs font-semibold text-slate-400 uppercase">
                    Ahorro Estimado
                  </span>
                 <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <TrendingDown className="w-3 h-3" />
                  -{(currentDiff * 100).toFixed(0)} centavos/gal
                </span>
                </div>

                {/* Big number hero: Monthly */}
                <div className="mb-4">
                  <span className="text-xs text-slate-400">Por mes:</span>
                <div className="text-4xl font-extrabold text-white font-['Hanken_Grotesk'] tracking-tight">
                  {symbol}{monthlySavings.toFixed(2)}{' '}
                  <span className="text-sm font-normal text-slate-400">/ mes</span>
                </div>
                </div>

                {/* Annual projection */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 mb-4">
                  <div className="text-xs text-blue-300 font-medium mb-1">
                    Ahorro acumulado al año:
                  </div>
                 <div className="text-2xl font-bold text-emerald-400 font-mono">
                    ~{symbol}{annualSavings.toFixed(0)} al año
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    Suficiente para pagar tu seguro, mantenimiento o varias cenas.
                  </p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Basado en diferencias reales entre estaciones en un radio de 5 km.</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
