import React from 'react';
import { BrandLogo } from './BrandLogo';

interface PreloaderProps {
  isDark: boolean;
  isExiting: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isDark, isExiting }) => (
  <div
    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 transition-opacity duration-500 ${
      isExiting ? 'pointer-events-none opacity-0' : 'opacity-100'
    } ${
      isDark ? 'bg-brand-950' : 'bg-white'
    }`}
    role="status"
    aria-live="polite"
    aria-label="Memuat situs"
  >
    <div className="preloader-logo-reveal">
      <BrandLogo size="md" />
    </div>
    <div className="w-32 overflow-hidden">
      <div className="h-px w-full bg-brand-200/70 dark:bg-white/15">
        <div className="preloader-sweep h-full w-1/3 bg-brand-600 dark:bg-brand-300" />
      </div>
    </div>
  </div>
);

export default Preloader;
