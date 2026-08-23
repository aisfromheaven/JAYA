import React, { useState } from 'react';
import { SiteBrandLogo } from './SiteBrandLogo';
import { 
  Heart, 
  Bell, 
  UserCheck, 
  Shield, 
  Sparkles, 
  Download, 
  RefreshCw,
  LogOut,
  ChevronDown,
  User,
  LogIn,
  Moon,
  Sun
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

interface NavbarProps {
  onOpenNotifications: () => void;
  onOpenAuth: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenNotifications, 
  onOpenAuth, 
  activeView, 
  setActiveView 
}) => {
  const { 
    currentUser, 
    setCurrentRole, 
    unreadNotificationCount, 
    resetToSeedData, 
    siteSettings,
    isDarkMode,
    toggleThemeMode
  } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  // Only public roles are displayed here. Admin is strictly accessible via secret login.
  const roles: { role: UserRole; label: string; icon: string; color: string; desc: string }[] = [
    { role: 'DONATUR', label: 'Donatur', icon: '🤲', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', desc: 'Bisa donasi, jadi pemateri, lihat laporan' },
    { role: 'RT_RW', label: 'Mitra RT/RW', icon: '🏛️', color: 'bg-amber-100 text-amber-800 border-amber-300', desc: 'Input warga binaan, pantau bantuan' },
    { role: 'PENERIMA', label: 'Penerima (Janda/Yatim)', icon: '🌸', color: 'bg-rose-100 text-rose-800 border-rose-300', desc: 'Akses pelatihan, tabungan, cerita' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200/90 dark:border-stone-800 shadow-2xs transition-colors">
      {/* Main Bar */}
      <div className="max-w-md sm:max-w-xl md:max-w-4xl mx-auto px-3.5 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Precision Tagline */}
        <button 
          id="brand-logo-btn"
          onClick={() => setActiveView('home')} 
          className="flex items-center space-x-2.5 text-left group shrink-0 cursor-pointer"
        >
          <div className="w-10 h-10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
            <SiteBrandLogo size="md" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 
              className="font-black text-base sm:text-lg tracking-tight leading-tight whitespace-nowrap"
              style={{ color: siteSettings.siteTitleColor || (isDarkMode ? '#f5f5f4' : '#064e3b') }}
            >
              {siteSettings.siteTitle || 'JAYA BOGOR'}
            </h1>
            <p 
              className="text-[11px] font-extrabold leading-none whitespace-nowrap mt-0.5 tracking-tight"
              style={{ color: siteSettings.siteTaglineColor || (isDarkMode ? '#fbbf24' : '#92400e') }}
            >
              {siteSettings.siteTagline || 'Janda Yatim Bogor'}
            </p>
          </div>
        </button>

        {/* Right Actions: Theme Toggle & Role Switcher & Notification & Auth */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Quick Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={toggleThemeMode}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
            title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600 animate-in spin-in-180 duration-200" />
            )}
          </button>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              id="role-switcher-btn"
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-semibold bg-stone-50 hover:bg-stone-100 transition-colors shadow-2xs border-stone-300 text-stone-800"
              title="Pilih Profil Pengguna"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span className="hidden sm:inline text-stone-500 font-medium">Peran:</span>
              <span className="font-bold text-emerald-900 max-w-[90px] sm:max-w-none truncate">
                {roles.find(r => r.role === currentUser.role)?.label || currentUser.role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            </button>

            {/* Role Switcher Dropdown */}
            {showRoleMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowRoleMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-stone-200 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                    <span className="text-xs font-extrabold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Pilih Profil Pengguna
                    </span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 font-bold px-2 py-0.5 rounded-full">
                      {currentUser.role === 'ADMIN' ? 'Mode Admin' : '3 Peran'}
                    </span>
                  </div>

                  {currentUser.role === 'ADMIN' && (
                    <div className="mb-2 p-2.5 bg-purple-900 text-white rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">⚡</span>
                        <div>
                          <p className="text-xs font-extrabold leading-tight">Admin Utama Aktif</p>
                          <p className="text-[10px] text-purple-200">Panel pengelola yayasan terbuka</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentRole('DONATUR');
                          setActiveView('home');
                          setShowRoleMenu(false);
                        }}
                        className="text-[10px] bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg font-bold"
                      >
                        Keluar
                      </button>
                    </div>
                  )}
                  
                  <div className="space-y-1.5">
                    {roles.map(r => (
                      <button
                        key={r.role}
                        id={`switch-role-${r.role.toLowerCase()}`}
                        onClick={() => {
                          setCurrentRole(r.role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-start space-x-2.5 border ${
                          currentUser.role === r.role 
                            ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400 shadow-2xs' 
                            : 'hover:bg-stone-50 border-transparent'
                        }`}
                      >
                        <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-extrabold text-xs text-stone-900">{r.label}</p>
                            {currentUser.role === r.role && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-full">
                                Aktif
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{r.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      id="reset-seed-data-btn"
                      onClick={() => {
                        resetToSeedData();
                        setShowRoleMenu(false);
                      }}
                      className="text-stone-500 hover:text-rose-600 flex items-center gap-1 text-[11px] font-medium"
                    >
                      <RefreshCw className="w-3 h-3" /> Kembalikan Data Awal
                    </button>
                    <button
                      id="nav-auth-btn"
                      onClick={() => {
                        setShowRoleMenu(false);
                        onOpenAuth();
                      }}
                      className="text-emerald-800 font-extrabold text-[11px] hover:underline flex items-center gap-1"
                    >
                      <LogIn className="w-3 h-3" /> Masuk / Daftar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notifications Button */}
          <button
            id="notifications-bell-btn"
            onClick={onOpenNotifications}
            className="relative p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-full transition-colors"
            title="Pemberitahuan Penyaluran & Kabar"
          >
            <Bell className="w-5 h-5" />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
