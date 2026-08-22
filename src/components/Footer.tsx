import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#030d17] border-t border-slate-900 py-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded bg-[#0f172a] border border-blue-500/30 flex items-center justify-center p-1">
                <img
                  src="/images/logo.svg"
                  alt="GasRadar"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-['Hanken_Grotesk']">
                Gas<span className="text-blue-500">Radar</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              © 2024 GasRadar. Precision fueling for the modern commuter.
            </p>
          </div>

          {/* Legal and Support Links matching screenshot */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Contact Support
            </a>
            <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
              Careers
            </a>
          </nav>
        </div>

        {/* Bottom Social Icons matching screenshot */}
        <div className="pt-6 flex items-center justify-center md:justify-start gap-4 text-slate-400">
          <a
            id="social-instagram"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-500/40 transition-colors"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* TikTok Icon */}
          <a
            id="social-tiktok"
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            title="TikTok"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
            </svg>
          </a>

          <a
            id="social-facebook"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-500/40 transition-colors"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <a
            id="social-twitter"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center hover:text-sky-400 hover:border-sky-500/40 transition-colors"
            title="Twitter / X"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
};
