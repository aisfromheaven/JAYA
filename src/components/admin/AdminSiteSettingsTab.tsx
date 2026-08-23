import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  FileText, 
  Image as ImageIcon, 
  Menu, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  EyeOff, 
  Check, 
  RotateCcw, 
  Upload, 
  Link as LinkIcon, 
  Sparkles,
  Phone,
  Mail,
  Sliders,
  Edit2,
  Lock,
  KeyRound,
  ShieldCheck,
  Moon,
  Sun,
  Monitor,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SiteBrandLogo } from '../SiteBrandLogo';
import { MenuItemConfig, SiteSettings } from '../../types';
import { ICON_OPTIONS, getIconComponent } from '../../utils/iconMap';

export const AdminSiteSettingsTab: React.FC = () => {
  const { 
    siteSettings, 
    updateSiteSettings, 
    resetSiteSettings,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem,
    reorderMenuItems,
    addToastNotification
  } = useApp();

  // Local draft state for form editing
  const [formData, setFormData] = useState<SiteSettings>({
    adminSecretKey: 'admin123',
    adminRecoveryEmail: 'abdulmuisx@gmail.com',
    siteTitleColor: '#064e3b',
    siteTaglineColor: '#92400e',
    themeMode: 'LIGHT',
    darkModeBg: '#0c0a09',
    darkModeCardBg: '#1c1917',
    darkModeAccent: '#10b981',
    ...siteSettings
  });

  const [showAdminKey, setShowAdminKey] = useState(false);

  // Modal / Form state for Adding or Editing a Menu Item
  const [editingItem, setEditingItem] = useState<MenuItemConfig | null>(null);
  const [isAddingNewMenu, setIsAddingNewMenu] = useState(false);
  const [newMenuForm, setNewMenuForm] = useState<{
    label: string;
    viewId: string;
    iconName: string;
    badge: string;
    isVisible: boolean;
  }>({
    label: '',
    viewId: 'home',
    iconName: 'Sparkles',
    badge: '',
    isVisible: true
  });

  // Quick preset colors for logo
  const PRESET_COLORS = [
    { label: 'Hijau Jaya Bogor', hex: '#046A38' },
    { label: 'Emas Berkah', hex: '#D97706' },
    { label: 'Biru Amanah', hex: '#0284C7' },
    { label: 'Ungu Mulia', hex: '#7E22CE' },
    { label: 'Merah Kasih', hex: '#E11D48' },
    { label: 'Hitam Elegan', hex: '#18181B' },
  ];

  // Presets for Site Title Color
  const TITLE_COLOR_PRESETS = [
    { label: 'Hijau Emerald (Default)', hex: '#064e3b' },
    { label: 'Hijau Daun Segar', hex: '#047857' },
    { label: 'Biru Navy Malam', hex: '#1e1b4b' },
    { label: 'Biru Samudera', hex: '#0284c7' },
    { label: 'Jingga Hangat', hex: '#7c2d12' },
    { label: 'Ungu Mulia', hex: '#581c87' },
    { label: 'Hitam Slate', hex: '#18181b' },
    { label: 'Putih Terang', hex: '#ffffff' },
  ];

  // Presets for Tagline Color
  const TAGLINE_COLOR_PRESETS = [
    { label: 'Emas Amber (Default)', hex: '#92400e' },
    { label: 'Kuning Emas Berkah', hex: '#d97706' },
    { label: 'Hijau Tua Amanah', hex: '#047857' },
    { label: 'Biru Langit', hex: '#0284c7' },
    { label: 'Ungu Anggun', hex: '#7e22ce' },
    { label: 'Merah Kasih', hex: '#e11d48' },
    { label: 'Abu-abu Netral', hex: '#57534e' },
    { label: 'Putih Bersih', hex: '#ffffff' },
  ];

  // Presets for Dark Mode Background
  const DARK_BG_PRESETS = [
    { label: 'Charcoal Stone (Default)', hex: '#0c0a09' },
    { label: 'Midnight Slate', hex: '#0f172a' },
    { label: 'Deep Zinc', hex: '#09090b' },
    { label: 'Royal Obsidian', hex: '#120d1c' },
    { label: 'Emerald Forest Dark', hex: '#022c22' },
  ];

  // Presets for Dark Mode Cards/Surfaces
  const DARK_CARD_PRESETS = [
    { label: 'Stone Card (Default)', hex: '#1c1917' },
    { label: 'Slate Card', hex: '#1e293b' },
    { label: 'Zinc Card', hex: '#18181b' },
    { label: 'Obsidian Purple Card', hex: '#1f162e' },
    { label: 'Emerald Card', hex: '#064e3b' },
  ];

  // Presets for Dark Mode Accent Color
  const DARK_ACCENT_PRESETS = [
    { label: 'Emerald Hijau', hex: '#10b981' },
    { label: 'Amber Emas Berkah', hex: '#f59e0b' },
    { label: 'Ungu Mewah', hex: '#a855f7' },
    { label: 'Cyan Terang', hex: '#06b6d4' },
    { label: 'Rose Merah Kasih', hex: '#f43f5e' },
  ];

  // Available views that can be targeted by a navigation item
  const AVAILABLE_VIEWS = [
    { id: 'home', label: 'Beranda (Home)' },
    { id: 'orphans', label: 'Tabungan Yatim (Orphans)' },
    { id: 'training', label: 'Pelatihan Dhuafa (Training)' },
    { id: 'feed', label: 'Cerita & Blog (Feed)' },
    { id: 'transparency', label: 'Laporan Transparansi' },
    { id: 'rtrw', label: 'Mitra RT / RW' },
    { id: 'profile', label: 'Profil Pengguna' },
    { id: 'admin', label: 'Admin Dashboard' }
  ];

  // Handle image upload as Base64 for instant client preview and offline preservation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file gambar maksimal 2 MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setFormData(prev => ({
          ...prev,
          logoType: 'CUSTOM_IMAGE',
          logoCustomUrl: reader.result as string
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveAllGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Kembalikan logo, judul situs, keterangan, dan navigasi ke pengaturan awal Jaya Bogor?')) {
      resetSiteSettings();
      // Reload defaults into form
      setTimeout(() => {
        setFormData({ ...siteSettings });
      }, 50);
    }
  };

  const handleAddNewMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuForm.label.trim()) return;

    addMenuItem({
      label: newMenuForm.label.trim(),
      viewId: newMenuForm.viewId,
      iconName: newMenuForm.iconName,
      badge: newMenuForm.badge.trim() || undefined,
      isVisible: newMenuForm.isVisible
    });

    // Reset add form
    setNewMenuForm({
      label: '',
      viewId: 'home',
      iconName: 'Sparkles',
      badge: '',
      isVisible: true
    });
    setIsAddingNewMenu(false);
  };

  const handleSaveEditedMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.label.trim()) return;

    updateMenuItem(editingItem.id, {
      label: editingItem.label.trim(),
      viewId: editingItem.viewId,
      iconName: editingItem.iconName,
      badge: editingItem.badge?.trim() || undefined,
      isVisible: editingItem.isVisible
    });

    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Live Preview */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-emerald-950 rounded-3xl text-white p-5 sm:p-6 shadow-xl border border-stone-700/60">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                Kustomisasi Penuh
              </span>
              <span className="text-stone-400 text-xs flex items-center gap-1 font-medium">
                <Sliders className="w-3.5 h-3.5 text-amber-400" /> Branding & Menu
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-stone-100">
              Pengaturan Identitas Situs & Menu Navigasi
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              Anda memiliki kendali penuh untuk mengganti logo, judul situs, tagline, deskripsi umum, warna merek, serta menambah atau mengubah urutan seluruh menu di aplikasi ini.
            </p>
          </div>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="self-start md:self-auto bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer shadow-xs shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
            <span>Reset Bawaan</span>
          </button>
        </div>

        {/* Live Preview Box */}
        <div className="mt-5 pt-4 border-t border-stone-700/70">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block mb-2">
            👁️ Pratinjau Tampilan Header Saat Ini:
          </span>
          <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-md flex items-center justify-between gap-3 text-stone-900">
            <div className="flex items-center space-x-3">
              <SiteBrandLogo 
                size="md" 
                overrideSettings={formData}
              />
              <div>
                <h4 
                  className="font-black text-base sm:text-lg leading-tight transition-colors"
                  style={{ color: formData.siteTitleColor || '#064e3b' }}
                >
                  {formData.siteTitle || 'JAYA BOGOR'}
                </h4>
                <p 
                  className="text-xs font-extrabold leading-tight transition-colors"
                  style={{ color: formData.siteTaglineColor || '#92400e' }}
                >
                  {formData.siteTagline || 'Janda Yatim Bogor'}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl">
              <span>{siteSettings.navigationItems.filter(i => i.isVisible !== false).length} Menu Aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveAllGeneral} className="space-y-6">
        {/* Section 1: Logo & Gaya Visual */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-base text-stone-900">
                1. Kustomisasi Logo Situs
              </h4>
              <p className="text-xs text-stone-500">
                Pilih format logo vektor bawaan, unggah logo gambar sendiri, atau logo monogram.
              </p>
            </div>
          </div>

          {/* Logo Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              Tipe & Format Logo:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Preset Vector */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, logoType: 'PRESET_VECTOR' }))}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  formData.logoType === 'PRESET_VECTOR'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-stone-100 rounded-xl">
                  <SiteBrandLogo 
                    size="sm" 
                    overrideSettings={{ logoType: 'PRESET_VECTOR', logoColor: formData.logoColor }} 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-stone-900">Vektor Resmi JYB</span>
                    {formData.logoType === 'PRESET_VECTOR' && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Vektor transparan huruf J-Y-B geometris Bogor
                  </p>
                </div>
              </button>

              {/* Option 2: Custom Image */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, logoType: 'CUSTOM_IMAGE' }))}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  formData.logoType === 'CUSTOM_IMAGE'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-stone-100 rounded-xl text-stone-600">
                  <ImageIcon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-stone-900">Gambar Kustom</span>
                    {formData.logoType === 'CUSTOM_IMAGE' && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Upload logo PNG/SVG/JPG atau URL dari internet
                  </p>
                </div>
              </button>

              {/* Option 3: Monogram / Text */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, logoType: 'CUSTOM_TEXT' }))}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  formData.logoType === 'CUSTOM_TEXT'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-stone-100 rounded-xl font-black text-emerald-800 text-sm">
                  {(formData.siteTitle || 'JB').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-stone-900">Monogram Teks</span>
                    {formData.logoType === 'CUSTOM_TEXT' && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                    Inisial nama situs otomatis berdesain modern
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Input for Custom Image */}
          {formData.logoType === 'CUSTOM_IMAGE' && (
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200/80 space-y-3">
              <label className="text-xs font-bold text-emerald-950 block">
                Unggah Berkas Logo atau Masukkan URL Gambar:
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                {/* Upload button */}
                <label className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs shrink-0">
                  <Upload className="w-4 h-4" />
                  <span>Pilih File dari HP / Laptop</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <div className="relative flex-1">
                  <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={formData.logoCustomUrl || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoCustomUrl: e.target.value }))}
                    placeholder="https://domain.com/logo-anda.png"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {formData.logoCustomUrl && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[11px] text-stone-500 font-medium">Pratinjau Gambar:</span>
                  <img
                    src={formData.logoCustomUrl}
                    alt="Logo Preview"
                    className="w-10 h-10 object-contain rounded-lg border border-stone-200 bg-white p-1"
                  />
                </div>
              )}
            </div>
          )}

          {/* Color & Container Styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Logo Accent Color */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                Warna Aksen Logo:
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, logoColor: c.hex }))}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                      formData.logoColor === c.hex ? 'scale-110 border-stone-900 shadow-xs' : 'border-white'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  >
                    {formData.logoColor === c.hex && (
                      <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <input
                  type="color"
                  value={formData.logoColor || '#046A38'}
                  onChange={(e) => setFormData(prev => ({ ...prev, logoColor: e.target.value }))}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-stone-300 p-0.5"
                />
                <input
                  type="text"
                  value={formData.logoColor || '#046A38'}
                  onChange={(e) => setFormData(prev => ({ ...prev, logoColor: e.target.value }))}
                  className="w-28 px-2.5 py-1 text-xs border border-stone-300 rounded-lg uppercase font-mono font-bold text-stone-700"
                />
              </div>
            </div>

            {/* Container Style */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 block">
                Gaya Latar Logo (Container):
              </label>
              <select
                value={formData.logoContainerStyle || 'TRANSPARENT'}
                onChange={(e) => setFormData(prev => ({ ...prev, logoContainerStyle: e.target.value as any }))}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-emerald-600"
              >
                <option value="TRANSPARENT">Transparan Murni (Bebas Latar Belakang)</option>
                <option value="EMERALD_BOX">Kotak Gradasi Hijau Emerald</option>
                <option value="GOLD_BOX">Kotak Gradasi Emas Berkah</option>
                <option value="WHITE_BOX">Kotak Putih Bersih Minimalis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Judul, Tagline, & Keterangan Situs */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-base text-stone-900">
                2. Judul, Tagline, & Keterangan Situs
              </h4>
              <p className="text-xs text-stone-500">
                Ubah nama instansi, slogan utama, serta informasi kontak resmi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Site Title & Title Color */}
            <div className="space-y-2 p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200">
              <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                <span>Judul Situs / Nama Yayasan:</span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: formData.siteTitleColor || '#064e3b' }} />
                  {formData.siteTitleColor || '#064e3b'}
                </span>
              </label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, siteTitle: e.target.value }))}
                placeholder="Contoh: JAYA BOGOR"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-emerald-600"
              />

              {/* Title Color Picker & Presets */}
              <div className="pt-1.5 space-y-1.5 border-t border-stone-200/70">
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600">
                  <span>Pilihan Warna Judul:</span>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] text-emerald-800 font-bold cursor-pointer hover:underline">
                      Kustom:
                    </label>
                    <input
                      type="color"
                      value={formData.siteTitleColor || '#064e3b'}
                      onChange={(e) => setFormData(prev => ({ ...prev, siteTitleColor: e.target.value }))}
                      className="w-6 h-6 p-0 border border-stone-300 rounded-md cursor-pointer"
                      title="Pilih Warna Judul Kustom"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TITLE_COLOR_PRESETS.map(c => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, siteTitleColor: c.hex }))}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                        formData.siteTitleColor?.toLowerCase() === c.hex.toLowerCase()
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
                      }`}
                      title={c.label}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="truncate max-w-[85px]">{c.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Site Tagline & Tagline Color */}
            <div className="space-y-2 p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200">
              <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
                <span>Tagline Singkat:</span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                  <span className="w-3 h-3 rounded-full border border-stone-300" style={{ backgroundColor: formData.siteTaglineColor || '#92400e' }} />
                  {formData.siteTaglineColor || '#92400e'}
                </span>
              </label>
              <input
                type="text"
                required
                value={formData.siteTagline}
                onChange={(e) => setFormData(prev => ({ ...prev, siteTagline: e.target.value }))}
                placeholder="Contoh: Janda Yatim Bogor"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-emerald-600"
              />

              {/* Tagline Color Picker & Presets */}
              <div className="pt-1.5 space-y-1.5 border-t border-stone-200/70">
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600">
                  <span>Pilihan Warna Tagline:</span>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] text-amber-800 font-bold cursor-pointer hover:underline">
                      Kustom:
                    </label>
                    <input
                      type="color"
                      value={formData.siteTaglineColor || '#92400e'}
                      onChange={(e) => setFormData(prev => ({ ...prev, siteTaglineColor: e.target.value }))}
                      className="w-6 h-6 p-0 border border-stone-300 rounded-md cursor-pointer"
                      title="Pilih Warna Tagline Kustom"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TAGLINE_COLOR_PRESETS.map(c => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, siteTaglineColor: c.hex }))}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-all cursor-pointer ${
                        formData.siteTaglineColor?.toLowerCase() === c.hex.toLowerCase()
                          ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-500'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-100'
                      }`}
                      title={c.label}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: c.hex }} />
                      <span className="truncate max-w-[85px]">{c.label.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Site Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">
              Keterangan / Deskripsi Situs (Visi Misi):
            </label>
            <textarea
              rows={2}
              value={formData.siteDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, siteDescription: e.target.value }))}
              placeholder="Deskripsi singkat mengenai program dan misi kebaikan yayasan..."
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-emerald-600"
            />
          </div>

          {/* Footer Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700">
              Catatan Kaki (Footer Note):
            </label>
            <input
              type="text"
              value={formData.footerNote || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, footerNote: e.target.value }))}
              placeholder="Contoh: Yayasan Solidaritas Janda Yatim Bogor | Amanah & Mandiri"
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-emerald-600"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>Email Resmi:</span>
              </label>
              <input
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="salam@jayabogor.id"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Kontak WhatsApp / Telp:</span>
              </label>
              <input
                type="text"
                value={formData.contactPhone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+62 812-9876-5432"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-xl text-xs text-stone-800 focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              id="save-general-settings-btn"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Identitas Situs & Logo</span>
            </button>
          </div>
        </div>
      </form>

      {/* Section 3: Mode Tampilan & Kustomisasi Mode Gelap (Dark Mode) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-amber-300 shadow-xs">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base text-stone-900">
                  3. Mode Tampilan & Kustomisasi Mode Gelap (Dark Mode)
                </h4>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                  Fitur Tema
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Pilih mode tema tampilan situs serta sesuaikan palet warna gelap (background, kartu, dan aksen) sesuai preferensi Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Mode Selector (Light / Dark / System) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-800 block">
            Mode Tema Utama Situs:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, themeMode: 'LIGHT' }))}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
                formData.themeMode === 'LIGHT' || !formData.themeMode
                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                formData.themeMode === 'LIGHT' || !formData.themeMode ? 'bg-amber-100 text-amber-800' : 'bg-white text-stone-500 border border-stone-200'
              }`}>
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs block">Mode Terang (Light)</span>
                <span className="text-[10px] text-stone-500 font-normal">Tampilan putih & hijau segar</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, themeMode: 'DARK' }))}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
                formData.themeMode === 'DARK'
                  ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 text-purple-950 font-bold'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                formData.themeMode === 'DARK' ? 'bg-purple-900 text-amber-300' : 'bg-white text-stone-500 border border-stone-200'
              }`}>
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs block">Mode Gelap (Dark)</span>
                <span className="text-[10px] text-stone-500 font-normal">Nyaman untuk mata & malam hari</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, themeMode: 'SYSTEM' }))}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
                formData.themeMode === 'SYSTEM'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 text-blue-950 font-bold'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                formData.themeMode === 'SYSTEM' ? 'bg-blue-100 text-blue-800' : 'bg-white text-stone-500 border border-stone-200'
              }`}>
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs block">Otomatis (Sistem)</span>
                <span className="text-[10px] text-stone-500 font-normal">Menyesuaikan pengaturan HP/PC</span>
              </div>
            </button>
          </div>
        </div>

        {/* Dark Mode Color Overrides */}
        <div className="p-4 bg-stone-900 text-stone-100 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Penyesuaian Palet Warna Mode Gelap (Dark Mode Palette):</span>
            </span>
            <span className="text-[10px] text-stone-400">Pratinjau langsung otomatis aktif</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dark Mode Background Color */}
            <div className="space-y-2 p-3 bg-stone-950/60 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-300">Warna Latar Gelap:</span>
                <span className="text-[11px] font-mono text-amber-300">{formData.darkModeBg || '#0c0a09'}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.darkModeBg || '#0c0a09'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeBg: e.target.value }))}
                  className="w-8 h-8 rounded-lg border border-stone-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.darkModeBg || '#0c0a09'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeBg: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs font-mono text-white focus:outline-amber-400"
                />
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {DARK_BG_PRESETS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, darkModeBg: c.hex }))}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono flex items-center gap-1 border cursor-pointer ${
                      formData.darkModeBg?.toLowerCase() === c.hex.toLowerCase()
                        ? 'border-amber-400 bg-amber-950 text-amber-300'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{c.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Card Background Color */}
            <div className="space-y-2 p-3 bg-stone-950/60 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-300">Warna Kartu & Kotak:</span>
                <span className="text-[11px] font-mono text-amber-300">{formData.darkModeCardBg || '#1c1917'}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.darkModeCardBg || '#1c1917'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeCardBg: e.target.value }))}
                  className="w-8 h-8 rounded-lg border border-stone-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.darkModeCardBg || '#1c1917'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeCardBg: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs font-mono text-white focus:outline-amber-400"
                />
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {DARK_CARD_PRESETS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, darkModeCardBg: c.hex }))}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono flex items-center gap-1 border cursor-pointer ${
                      formData.darkModeCardBg?.toLowerCase() === c.hex.toLowerCase()
                        ? 'border-amber-400 bg-amber-950 text-amber-300'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{c.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Mode Accent Color */}
            <div className="space-y-2 p-3 bg-stone-950/60 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-300">Warna Aksen Sorotan:</span>
                <span className="text-[11px] font-mono text-amber-300">{formData.darkModeAccent || '#10b981'}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.darkModeAccent || '#10b981'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeAccent: e.target.value }))}
                  className="w-8 h-8 rounded-lg border border-stone-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.darkModeAccent || '#10b981'}
                  onChange={(e) => setFormData(prev => ({ ...prev, darkModeAccent: e.target.value }))}
                  className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs font-mono text-white focus:outline-amber-400"
                />
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {DARK_ACCENT_PRESETS.map(c => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, darkModeAccent: c.hex }))}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono flex items-center gap-1 border cursor-pointer ${
                      formData.darkModeAccent?.toLowerCase() === c.hex.toLowerCase()
                        ? 'border-amber-400 bg-amber-950 text-amber-300'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.hex }} />
                    <span>{c.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Live Dark Mode Preview Card */}
          <div 
            className="p-4 rounded-2xl border border-white/10 transition-colors shadow-lg"
            style={{ backgroundColor: formData.darkModeBg || '#0c0a09' }}
          >
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-stone-400 block mb-2">
              Pratinjau Mode Gelap Interaktif:
            </span>
            <div 
              className="p-3.5 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              style={{ backgroundColor: formData.darkModeCardBg || '#1c1917' }}
            >
              <div className="flex items-center space-x-3">
                <SiteBrandLogo size="sm" overrideSettings={formData} />
                <div>
                  <h5 
                    className="font-bold text-sm leading-tight"
                    style={{ color: formData.siteTitleColor || '#ffffff' }}
                  >
                    {formData.siteTitle || 'JAYA BOGOR'}
                  </h5>
                  <p 
                    className="text-xs leading-tight"
                    style={{ color: formData.siteTaglineColor || '#f59e0b' }}
                  >
                    {formData.siteTagline || 'Janda Yatim Bogor'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span 
                  className="text-xs font-bold px-3 py-1.5 rounded-lg text-stone-950 shadow-sm"
                  style={{ backgroundColor: formData.darkModeAccent || '#10b981' }}
                >
                  Tombol Aksen
                </span>
                <span className="text-[11px] text-stone-300 font-mono px-2 py-1 bg-white/5 rounded-lg border border-white/10">
                  Mode Gelap Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Theme Settings Button */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            id="save-theme-settings-btn"
            onClick={() => {
              updateSiteSettings({
                themeMode: formData.themeMode || 'LIGHT',
                siteTitleColor: formData.siteTitleColor || '#064e3b',
                siteTaglineColor: formData.siteTaglineColor || '#92400e',
                darkModeBg: formData.darkModeBg || '#0c0a09',
                darkModeCardBg: formData.darkModeCardBg || '#1c1917',
                darkModeAccent: formData.darkModeAccent || '#10b981',
              });
              addToastNotification('Pengaturan Tema Tersimpan 🎨', 'Preferensi mode tampilan dan warna gelap telah diterapkan.', 'SUCCESS');
            }}
            className="bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Simpan Mode Tampilan & Warna Gelap</span>
          </button>
        </div>
      </div>

      {/* Section 4: Kunci Rahasia & Pemulihan Akses Admin */}
      <div className="bg-white rounded-3xl border border-purple-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-purple-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-900 flex items-center justify-center text-amber-300 shadow-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-base text-stone-900">
                  4. Kunci Rahasia & Pemulihan Akses Admin
                </h4>
                <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                  Privat
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Ubah kata sandi/PIN admin dan kelola email darurat jika sewaktu-waktu lupa kunci.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Admin Secret Key Input */}
          <div className="space-y-1.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
            <label className="text-xs font-bold text-stone-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-purple-700" />
                <span>Kunci Rahasia / PIN Admin:</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAdminKey(!showAdminKey)}
                className="text-[11px] text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                {showAdminKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showAdminKey ? 'Sembunyikan' : 'Lihat'}</span>
              </button>
            </label>
            <div className="relative">
              <input
                type={showAdminKey ? 'text' : 'password'}
                required
                value={formData.adminSecretKey || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, adminSecretKey: e.target.value }))}
                placeholder="Contoh: admin123 / PIN Rahasia"
                className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono font-bold text-stone-900 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
              />
            </div>
            <p className="text-[11px] text-stone-500 leading-tight">
              Gunakan kunci ini untuk membuka panel admin melalui tombol titik rahasia (<code className="font-bold">•</code>) di footer atau formulir login.
            </p>
          </div>

          {/* Admin Recovery Email Input */}
          <div className="space-y-1.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
            <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-purple-700" />
              <span>Email Pemulihan Akses (Lupa Kunci):</span>
            </label>
            <input
              type="email"
              required
              value={formData.adminRecoveryEmail || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, adminRecoveryEmail: e.target.value }))}
              placeholder="abdulmuisx@gmail.com"
              className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-purple-600 focus:ring-1 focus:ring-purple-600"
            />
            <p className="text-[11px] text-stone-500 leading-tight">
              Jika lupa kunci, tautan pemulihan & PIN baru akan dikirimkan langsung ke email <b>{formData.adminRecoveryEmail || 'abdulmuisx@gmail.com'}</b>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Kunci rahasia tersimpan secara lokal dan terenkripsi aman pada peramban Anda.</span>
          </div>

          <button
            type="button"
            id="save-admin-key-btn"
            onClick={() => {
              if (!formData.adminSecretKey?.trim()) {
                alert('Kunci rahasia admin tidak boleh kosong.');
                return;
              }
              if (!formData.adminRecoveryEmail?.trim()) {
                alert('Email pemulihan admin tidak boleh kosong.');
                return;
              }
              updateSiteSettings({
                adminSecretKey: formData.adminSecretKey.trim(),
                adminRecoveryEmail: formData.adminRecoveryEmail.trim()
              });
              addToastNotification('Kunci Admin Tersimpan 🔐', `Kunci rahasia baru aktif dan email pemulihan disetel ke ${formData.adminRecoveryEmail}.`, 'SUCCESS');
            }}
            className="w-full sm:w-auto bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4 text-amber-300" />
            <span>Simpan Kunci & Email Pemulihan</span>
          </button>
        </div>
      </div>

      {/* Section 5: Pengatur Menu Navigasi Lengkap (Menu Customizer) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-800">
              <Menu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-base text-stone-900">
                5. Manajemen Menu Navigasi
              </h4>
              <p className="text-xs text-stone-500">
                Ubah nama menu, ganti ikon, atur urutan posisi, atau tambahkan menu kustom baru.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingNewMenu(true)}
            className="bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Menu Baru</span>
          </button>
        </div>

        {/* Add New Menu Modal/Drawer */}
        {isAddingNewMenu && (
          <form onSubmit={handleAddNewMenuItem} className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-xs text-purple-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Formulir Tambah Menu Navigasi</span>
              </h5>
              <button
                type="button"
                onClick={() => setIsAddingNewMenu(false)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Nama / Label Menu:
                </label>
                <input
                  type="text"
                  required
                  value={newMenuForm.label}
                  onChange={(e) => setNewMenuForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Contoh: Donasi Sembako"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Target Halaman (View):
                </label>
                <select
                  value={newMenuForm.viewId}
                  onChange={(e) => setNewMenuForm(prev => ({ ...prev, viewId: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                >
                  {AVAILABLE_VIEWS.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Pilih Ikon:
                </label>
                <select
                  value={newMenuForm.iconName}
                  onChange={(e) => setNewMenuForm(prev => ({ ...prev, iconName: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                >
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.name} value={opt.name}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Badge Label Tambahan (Opsional):
                </label>
                <input
                  type="text"
                  value={newMenuForm.badge}
                  onChange={(e) => setNewMenuForm(prev => ({ ...prev, badge: e.target.value }))}
                  placeholder="Misal: Baru, Hot, Mimpi"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingNewMenu(false)}
                className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-600 text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold"
              >
                Tambahkan ke Menu
              </button>
            </div>
          </form>
        )}

        {/* Edit Modal */}
        {editingItem && (
          <form onSubmit={handleSaveEditedMenuItem} className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-3.5">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                <Edit2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Edit Item Menu: {editingItem.label}</span>
              </h5>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                Batal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Nama / Label Menu:
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Target Halaman (View):
                </label>
                <select
                  value={editingItem.viewId}
                  onChange={(e) => setEditingItem({ ...editingItem, viewId: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                >
                  {AVAILABLE_VIEWS.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Pilih Ikon:
                </label>
                <select
                  value={editingItem.iconName}
                  onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900 font-bold"
                >
                  {ICON_OPTIONS.map(opt => (
                    <option key={opt.name} value={opt.name}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Badge Label:
                </label>
                <input
                  type="text"
                  value={editingItem.badge || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                  placeholder="Misal: Mimpi"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs text-stone-900"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 rounded-xl border border-stone-300 bg-white text-stone-600 text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}

        {/* Navigation Items List */}
        <div className="space-y-2.5">
          {siteSettings.navigationItems.map((item, index) => {
            const Icon = getIconComponent(item.iconName);
            const isFirst = index === 0;
            const isLast = index === siteSettings.navigationItems.length - 1;

            return (
              <div 
                key={item.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                  item.isVisible !== false 
                    ? 'bg-white border-stone-200 shadow-2xs' 
                    : 'bg-stone-50 border-stone-200/60 opacity-60'
                }`}
              >
                {/* Left: Drag / Order indicator & Info */}
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => reorderMenuItems(index, index - 1)}
                      className={`p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 ${
                        isFirst ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      title="Geser Naik"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-black text-stone-400">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => reorderMenuItems(index, index + 1)}
                      className={`p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 ${
                        isLast ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                      title="Geser Turun"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="font-extrabold text-xs sm:text-sm text-stone-900 truncate">
                        {item.label}
                      </h5>
                      {item.badge && (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 truncate">
                      Target Halaman: <span className="font-semibold text-stone-700">{item.viewId}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => updateMenuItem(item.id, { isVisible: item.isVisible === false })}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      item.isVisible !== false
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                    }`}
                    title={item.isVisible !== false ? 'Sembunyikan Menu' : 'Tampilkan Menu'}
                  >
                    {item.isVisible !== false ? (
                      <Eye className="w-3.5 h-3.5" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer transition-colors"
                    title="Edit Menu"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete (if more than 2 items) */}
                  {siteSettings.navigationItems.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Hapus menu "${item.label}"?`)) {
                          deleteMenuItem(item.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer transition-colors"
                      title="Hapus Menu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
