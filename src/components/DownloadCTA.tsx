import React from 'react';
import { Download, Sparkles, QrCode } from 'lucide-react';

interface DownloadCTAProps {
  onOpenDownload: () => void;
}

export const DownloadCTA: React.FC<DownloadCTAProps> = ({ onOpenDownload }) => {
  return (
    <section
      id="download-cta"
      className="py-24 relative bg-[#051424] border-t border-slate-800/60 overflow-hidden"
    >
      {/* Background subtle radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Large Centered Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Hanken_Grotesk']">
          ¿Listo para ahorrar?
        </h2>

        {/* Subtitle matching design */}
        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Únete a miles de conductores que ya optimizan sus rutas y su presupuesto diario.
        </p>

        {/* Action Buttons: App Store & Google Play */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          
          {/* App Store button */}
          <button
            id="cta-app-store-btn"
            onClick={onOpenDownload}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-black/40 group cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-400 group-hover:-translate-y-0.5 transition-transform" />
            <span className="font-['Hanken_Grotesk']">App Store</span>
          </button>

          {/* Google Play button */}
          <button
            id="cta-google-play-btn"
            onClick={onOpenDownload}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-black/40 group cursor-pointer"
          >
            {/* Play icon */}
            <svg className="w-4 h-4 text-blue-400 fill-current group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.436V3.25c0-.555.223-1.057.609-1.436zm11.233 11.233l2.368 2.368-12.72 7.345 10.352-9.713zm0-2.094L4.49 1.24l12.72 7.345-2.368 2.368zm1.06 1.047l3.655-2.11a1.994 1.994 0 0 1 0 3.456l-3.655 2.11-1.04-1.728 1.04-1.728z" />
            </svg>
            <span className="font-['Hanken_Grotesk']">Google Play</span>
          </button>

          {/* QR Code Quick Scan button */}
          <button
            id="cta-qr-btn"
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-semibold text-sm transition-all cursor-pointer"
            title="Escanear código QR"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Código QR</span>
          </button>

        </div>

      </div>
    </section>
  );
};
