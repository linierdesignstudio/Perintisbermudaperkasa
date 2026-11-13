import React from 'react';
import logo from '../src/assets/images/logo-perintis.png';
import logoMark from '../src/assets/images/logo-perintis-mark.png';

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'horizontal' | 'vertical' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  lightModeForce?: boolean;
  compactOnMobile?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  iconOnly = false,
  variant = 'horizontal',
  size = 'md',
  lightModeForce = false,
  compactOnMobile = false,
}) => {
  const icon = iconOnly || variant === 'icon';
  const sizeClasses = {
    sm: icon ? 'h-8 w-8' : 'h-10',
    md: icon ? 'h-10 w-10' : compactOnMobile ? 'h-8 sm:h-16' : 'h-14 sm:h-16',
    lg: icon ? 'h-16 w-16' : 'h-20 sm:h-24',
    xl: icon ? 'h-24 w-24' : 'h-28 sm:h-32',
    auto: 'h-auto w-full',
  };
  const textColor = lightModeForce ? 'text-white' : 'text-zinc-950 dark:text-white';

  if (variant === 'vertical' && !iconOnly) {
    return (
      <img
        src={logo}
        alt="PT Perintis Bermuda Perkasa — Shipping Agency"
        className={`h-auto w-36 object-contain sm:w-44 ${className}`}
      />
    );
  }

  if (icon) {
    return (
      <img
        src={logoMark}
        alt="Perintis Bermuda Perkasa"
        className={`shrink-0 object-contain ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div className={`flex shrink-0 items-center gap-2 sm:gap-3 ${sizeClasses[size]} ${className}`}>
      <img
        src={logoMark}
        alt=""
        aria-hidden="true"
        className="h-full w-auto shrink-0 object-contain"
      />
      <span className={`${compactOnMobile ? 'hidden sm:flex' : 'flex'} flex-col leading-none ${textColor}`}>
        <span className="text-base font-extrabold tracking-[0.08em] sm:text-lg">PERINTIS</span>
        <span className="mt-1 whitespace-nowrap text-[9px] font-bold tracking-[0.12em] sm:text-[10px]">
          BERMUDA PERKASA
        </span>
        <span className="mt-1 whitespace-nowrap text-[8px] font-medium tracking-[0.16em] text-brand-700 dark:text-brand-300 sm:text-[9px]">
          SHIPPING AGENCY
        </span>
      </span>
    </div>
  );
};
