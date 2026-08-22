import React, { useState } from 'react';
import { X, QrCode, Smartphone, Download, Check, Sparkles, Send } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>('ios');

  if (!isOpen) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setPhoneNumber('');
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#0d1c2d] border border-blue-500/30 p-6 sm:p-8 shadow-2xl shadow-blue-950/50 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 mx-auto flex items-center justify-center p-2 mb-3">
            <img
              src="/images/logo.svg"
              alt="GasRadar"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl font-bold font-['Hanken_Grotesk']">
            Descarga GasRadar Gratis
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            Disponible para iOS y Android. Comienza a ahorrar hoy.
          </p>
        </div>

        {/* QR Code Card */}
        <div className="bg-[#081320] p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-36 h-36 bg-white p-2.5 rounded-xl shrink-0 shadow-lg flex items-center justify-center">
            <img
              src="/images/qr-download.svg"
              alt="QR Code GasRadar"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 mb-2">
              <QrCode className="w-3.5 h-3.5" />
              Escaneo Rápido
            </span>
            <h4 className="text-base font-semibold text-white">
              Apunta la cámara de tu móvil
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Detectará automáticamente tu sistema operativo y abrirá la tienda correspondiente.
            </p>
          </div>
        </div>

        {/* Direct Download Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            id="modal-app-store-link"
            href="https://apple.com/app-store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-semibold transition-all hover:border-slate-500 text-white"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.13 16.69C20.1 16.79 19.72 18.09 18.71 19.5ZM14.88 4.76C15.46 4.04 15.86 3.05 15.75 2.05C14.89 2.09 13.82 2.63 13.22 3.34C12.68 3.96 12.21 4.98 12.35 5.95C13.31 6.03 14.31 5.48 14.88 4.76Z" />
            </svg>
            <span>App Store</span>
          </a>

          <a
            id="modal-google-play-link"
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-semibold transition-all hover:border-slate-500 text-white"
          >
            <svg className="w-5 h-5 fill-current text-blue-400" viewBox="0 0 24 24">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.436V3.25c0-.555.223-1.057.609-1.436zm11.233 11.233l2.368 2.368-12.72 7.345 10.352-9.713zm0-2.094L4.49 1.24l12.72 7.345-2.368 2.368zm1.06 1.047l3.655-2.11a1.994 1.994 0 0 1 0 3.456l-3.655 2.11-1.04-1.728 1.04-1.728z" />
            </svg>
            <span>Google Play</span>
          </a>
        </div>

        {/* Send link via SMS / WhatsApp */}
        <form onSubmit={handleSendLink} className="space-y-2">
          <label className="text-xs text-slate-400 font-medium">
            O recibe el enlace directo en tu teléfono por SMS:
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              placeholder="+34 600 000 000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isSent || !phoneNumber}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Enviado!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
