import React from 'react';
import {
  Home,
  GraduationCap,
  BookOpen,
  MessageSquareHeart,
  FileCheck2,
  Building2,
  ShieldAlert,
  User,
  Heart,
  Sparkles,
  Package,
  Globe,
  DollarSign,
  HelpCircle,
  Share2,
  PenTool,
  Settings,
  Compass,
  Calendar,
  Gift,
  Award,
  Layers,
  MapPin,
  Bell,
  LucideIcon
} from 'lucide-react';

export const ICON_OPTIONS: { name: string; label: string; icon: LucideIcon }[] = [
  { name: 'Home', label: 'Beranda (Home)', icon: Home },
  { name: 'GraduationCap', label: 'Topi Wisuda / Pendidikan', icon: GraduationCap },
  { name: 'BookOpen', label: 'Buku / Pelatihan', icon: BookOpen },
  { name: 'MessageSquareHeart', label: 'Cerita / Komunitas', icon: MessageSquareHeart },
  { name: 'FileCheck2', label: 'Laporan / Transparansi', icon: FileCheck2 },
  { name: 'Building2', label: 'Mitra RT/RW / Instansi', icon: Building2 },
  { name: 'User', label: 'Profil Pengguna', icon: User },
  { name: 'ShieldAlert', label: 'Admin / Keamanan', icon: ShieldAlert },
  { name: 'Heart', label: 'Kebaikan / Donasi', icon: Heart },
  { name: 'Sparkles', label: 'Bintang / Fitur Baru', icon: Sparkles },
  { name: 'Package', label: 'Sembako / Logistik', icon: Package },
  { name: 'DollarSign', label: 'Finansial / Tabungan', icon: DollarSign },
  { name: 'Globe', label: 'Publik / Web', icon: Globe },
  { name: 'Award', label: 'Prestasi / Prestise', icon: Award },
  { name: 'Calendar', label: 'Jadwal / Agenda', icon: Calendar },
  { name: 'Gift', label: 'Bingkisan / Kado', icon: Gift },
  { name: 'Layers', label: 'Kategori / Modul', icon: Layers },
  { name: 'MapPin', label: 'Wilayah / Bogor', icon: MapPin },
  { name: 'PenTool', label: 'Kreasi / Desain', icon: PenTool },
  { name: 'Settings', label: 'Pengaturan', icon: Settings },
];

export const getIconComponent = (iconName: string): LucideIcon => {
  const found = ICON_OPTIONS.find(item => item.name.toLowerCase() === iconName.toLowerCase());
  return found ? found.icon : Home;
};
