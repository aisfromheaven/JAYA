import React from 'react';
import { 
  Building2, 
  ShieldAlert,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getIconComponent } from '../utils/iconMap';

interface BottomNavProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenDonate: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  activeView, 
  setActiveView, 
}) => {
  const { currentUser, siteSettings } = useApp();

  // Filter visible items and sort by order
  const dynamicNavItems = (siteSettings.navigationItems || [])
    .filter(item => item.isVisible !== false)
    .sort((a, b) => a.order - b.order);

  // If there are more than 5 items, we can show up to 5 on bottom nav and allow switching
  const primaryNavItems = dynamicNavItems.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-md md:max-w-3xl mx-auto px-2 py-1.5 flex items-center justify-around overflow-x-auto no-scrollbar">
        {primaryNavItems.map((item) => {
          const Icon = getIconComponent(item.iconName);
          const isActive = activeView === item.viewId;
          return (
            <button
              key={item.id}
              id={`bottom-nav-${item.viewId}`}
              onClick={() => setActiveView(item.viewId)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative shrink-0 min-w-[54px] ${
                isActive 
                  ? 'text-emerald-800 font-bold scale-105' 
                  : 'text-stone-500 hover:text-stone-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-amber-500 text-white text-[9px] font-extrabold px-1 rounded-full leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 whitespace-nowrap tracking-tight ${isActive ? 'text-emerald-900 font-bold' : 'text-stone-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5"></span>
              )}
            </button>
          );
        })}

        {/* Extra Role-Specific Tab or Profile Tab */}
        {currentUser.role === 'ADMIN' ? (
          <button
            id="bottom-nav-admin"
            onClick={() => setActiveView('admin')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all shrink-0 min-w-[54px] ${
              activeView === 'admin' 
                ? 'text-purple-800 font-bold scale-105' 
                : 'text-stone-500 hover:text-purple-700 font-medium'
            }`}
          >
            <ShieldAlert className={`w-5 h-5 ${activeView === 'admin' ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
            <span className="text-[10px] mt-0.5 whitespace-nowrap font-bold">Admin</span>
            {activeView === 'admin' && (
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-0.5"></span>
            )}
          </button>
        ) : currentUser.role === 'RT_RW' ? (
          <button
            id="bottom-nav-rtrw"
            onClick={() => setActiveView('rtrw')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all shrink-0 min-w-[54px] ${
              activeView === 'rtrw' 
                ? 'text-amber-800 font-bold scale-105' 
                : 'text-stone-500 hover:text-amber-700 font-medium'
            }`}
          >
            <Building2 className={`w-5 h-5 ${activeView === 'rtrw' ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
            <span className="text-[10px] mt-0.5 whitespace-nowrap font-bold">Mitra RT</span>
            {activeView === 'rtrw' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-0.5"></span>
            )}
          </button>
        ) : (
          <button
            id="bottom-nav-profile"
            onClick={() => setActiveView('profile')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all shrink-0 min-w-[54px] ${
              activeView === 'profile' 
                ? 'text-emerald-800 font-bold scale-105' 
                : 'text-stone-500 hover:text-stone-800 font-medium'
            }`}
          >
            <User className={`w-5 h-5 ${activeView === 'profile' ? 'stroke-[2.5px]' : 'stroke-[1.75px]'}`} />
            <span className="text-[10px] mt-0.5 whitespace-nowrap">Profil</span>
            {activeView === 'profile' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5"></span>
            )}
          </button>
        )}
      </div>
    </nav>
  );
};
