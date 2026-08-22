import React from 'react';
import { Star, User, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockStations';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials-section"
      className="py-20 relative bg-[#051424] border-t border-slate-800/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-['Hanken_Grotesk']">
            Lo que dicen nuestros conductores
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Miles de personas ya ahorran cada vez que llenan el tanque.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="group relative rounded-2xl p-7 bg-[#122131]/60 hover:bg-[#182a3d]/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                {/* 5 Blue/Cyan Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#38bdf8]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#38bdf8] text-[#38bdf8]"
                    />
                  ))}
                </div>

                {/* Testimonial Quote matching design text */}
                <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed mb-6 font-normal">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar Icon */}
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center p-0.5">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5 font-['Hanken_Grotesk']">
                      <span>{item.author}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>
                </div>

                {/* Saved Tag */}
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {item.savedAmount}
                </span>
              </div>

              {/* Subtle hover top border glow */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
