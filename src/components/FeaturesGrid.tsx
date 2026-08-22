import React, { useState } from 'react';
import { DollarSign, Map, Zap, ArrowUpRight, CheckCircle, Clock, Navigation } from 'lucide-react';
import { FEATURES_DATA } from '../data/mockStations';

interface FeaturesGridProps {
  onOpenCalculator: () => void;
  onOpenStationFinder: () => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  onOpenCalculator,
  onOpenStationFinder,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-blue-400" />;
      case 'Map':
        return <Map className="w-5 h-5 text-blue-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-blue-400" />;
      default:
        return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section
      id="features-section"
      className="py-20 relative bg-[#051424] border-t border-slate-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-['Hanken_Grotesk']">
            Potencia tu viaje
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Tecnología diseñada para conductores inteligentes.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature) => {
            const isHovered = hoveredCard === feature.id;

            return (
              <div
                key={feature.id}
                id={`feature-card-${feature.id}`}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative rounded-2xl p-7 bg-[#122131]/60 hover:bg-[#182a3d]/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between shadow-lg shadow-black/20"
              >
                {/* Top Icon Pill */}
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-600/30 flex items-center justify-center mb-6 group-hover:bg-blue-600/20 group-hover:border-blue-400/60 transition-all duration-300 shadow-inner">
                    {getIcon(feature.iconName)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white tracking-tight mb-3 font-['Hanken_Grotesk'] group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Interactive Feature Micro-Action */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {feature.badge}
                  </span>

                  {feature.id === 'real-time' && (
                    <button
                      onClick={onOpenStationFinder}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Ver precios</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  )}

                  {feature.id === 'interactive-map' && (
                    <button
                      onClick={onOpenStationFinder}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Abrir radar</span>
                      <Navigation className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  )}

                  {feature.id === 'smart-savings' && (
                    <button
                      onClick={onOpenCalculator}
                      className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                    >
                      <span>Calcular</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  )}
                </div>

                {/* Subtle top edge glow highlight */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
