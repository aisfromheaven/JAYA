import React from 'react';
import { JybLogo } from './JybLogo';
import { useApp } from '../context/AppContext';
import { SiteSettings } from '../types';

interface SiteBrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  overrideSettings?: Partial<SiteSettings>;
  forceColor?: string;
}

export const SiteBrandLogo: React.FC<SiteBrandLogoProps> = ({
  className = '',
  size = 'md',
  overrideSettings,
  forceColor
}) => {
  const { siteSettings } = useApp();
  const settings = { ...siteSettings, ...overrideSettings };

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  }[size];

  const logoColor = forceColor || settings.logoColor || '#046A38';

  const renderInnerLogo = () => {
    if (settings.logoType === 'CUSTOM_IMAGE' && settings.logoCustomUrl) {
      return (
        <img
          src={settings.logoCustomUrl}
          alt={settings.siteTitle || 'Logo'}
          className="w-full h-full object-contain filter drop-shadow-xs"
          onError={(e) => {
            // Fallback to default JybLogo if image URL fails
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.parentElement) {
              const fallback = document.createElement('div');
              fallback.innerHTML = `<span class="font-black text-xs text-emerald-800">${(settings.siteTitle || 'JB').slice(0, 2).toUpperCase()}</span>`;
              target.parentElement.appendChild(fallback);
            }
          }}
        />
      );
    }

    if (settings.logoType === 'CUSTOM_TEXT') {
      const initials = (settings.siteTitle || 'JB')
        .split(' ')
        .map(w => w[0])
        .slice(0, 3)
        .join('')
        .toUpperCase();

      return (
        <div 
          className="w-full h-full flex items-center justify-center font-black tracking-tighter"
          style={{ color: logoColor }}
        >
          {initials}
        </div>
      );
    }

    // Default: Vector Preset
    return <JybLogo className="w-full h-full" color={logoColor} />;
  };

  const getContainerStyle = () => {
    switch (settings.logoContainerStyle) {
      case 'EMERALD_BOX':
        return 'bg-gradient-to-br from-emerald-800 to-emerald-950 p-1.5 rounded-2xl border border-emerald-700/60 shadow-md';
      case 'GOLD_BOX':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-2xl border border-amber-300 shadow-md';
      case 'WHITE_BOX':
        return 'bg-white p-1.5 rounded-2xl border border-stone-200 shadow-xs';
      case 'TRANSPARENT':
      default:
        return 'bg-transparent p-0';
    }
  };

  return (
    <div className={`flex items-center justify-center shrink-0 ${sizeClasses} ${getContainerStyle()} ${className}`}>
      {renderInnerLogo()}
    </div>
  );
};
