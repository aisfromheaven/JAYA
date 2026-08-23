import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Building2, 
  GraduationCap, 
  FileSpreadsheet, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Download, 
  Search,
  DollarSign,
  PlusCircle,
  Sparkles,
  BookOpen,
  Package,
  Trash2,
  Lock,
  Upload,
  Share2,
  Heart,
  MessageCircle,
  FileText,
  PenTool
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Beneficiary, DonationProgram, StoryFeedPost } from '../../types';
import { ShareModal } from '../ShareModal';
import { AdminSiteSettingsTab } from '../admin/AdminSiteSettingsTab';
import { Palette } from 'lucide-react';

interface AdminDashboardViewProps {
  onOpenCreateProgram?: () => void;
  onOpenCreateStory?: () => void;
  onExitAdmin?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ 
  onOpenCreateProgram,
  onOpenCreateStory,
  onExitAdmin
}) => {
  const { 
    transactions = [], 
    verifyDonation, 
    beneficiaries = [], 
    rtrwPartners = [], 
    programs = [], 
    deleteDonationProgram,
    storyPosts = [],
    deleteStoryPost,
    trainingCourses = [],
    addToastNotification,
    setCurrentRole
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'OVERVIEW' | 'SETTINGS' | 'PROGRAMS' | 'BLOG_POSTS' | 'TRANSACTIONS' | 'BENEFICIARIES' | 'COURSES' | 'PARTNERS'>('OVERVIEW');
  const [txFilter, setTxFilter] = useState<'ALL' | 'PENDING' | 'VERIFIED'>('ALL');
  const [sharePost, setSharePost] = useState<StoryFeedPost | null>(null);

  // Stats
  const totalIn = (transactions || []).filter(t => t.status === 'VERIFIED').reduce((sum, t) => sum + t.amount, 0) + 40000000;
  const pendingTx = (transactions || []).filter(t => t.status === 'PENDING');
  const totalBinaan = (beneficiaries || []).length;
  const totalPartners = (rtrwPartners || []).length;

  const filteredTransactions = (transactions || []).filter(t => {
    if (txFilter === 'ALL') return true;
    return t.status === txFilter;
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Nama Donatur', 'Program', 'Nominal (IDR)', 'Metode', 'Status', 'Tanggal'];
    const rows = transactions.map(t => [
      t.id,
      t.isAnonymous ? 'Hamba Allah' : t.donorName,
      `"${t.programTitle}"`,
      t.amount,
      t.paymentMethod,
      t.status,
      new Date(t.createdAt).toISOString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `laporan_donasi_jayabogor_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToastNotification('Ekspor Berhasil', 'File CSV Laporan Donasi JAYA BOGOR berhasil diunduh.', 'SUCCESS');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-stone-900 rounded-3xl text-white p-5 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="bg-amber-400 text-purple-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
              ⚡ Admin Central JAYA BOGOR
            </span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Ekspor Laporan</span>
              </button>
              <button
                type="button"
                id="exit-admin-mode-btn"
                onClick={() => {
                  if (onExitAdmin) {
                    onExitAdmin();
                  } else {
                    setCurrentRole('DONATUR');
                    addToastNotification('Mode Admin Ditutup', 'Anda telah keluar dari panel pengelola.', 'INFO');
                  }
                }}
                className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/50 font-extrabold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                title="Keluar dan Kunci Mode Admin"
              >
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Kunci Admin</span>
              </button>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-snug">
            Panel Pengelola & Validasi Donasi
          </h2>
          <p className="text-xs text-purple-200">
            Kelola verifikasi transfer donasi, rilis program donasi, tulis cerita blog, dan pantau mitra RT/RW se-Bogor.
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            <button
              type="button"
              id="admin-header-upload-program-btn"
              onClick={onOpenCreateProgram}
              className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Upload Program Donasi</span>
            </button>

            <button
              type="button"
              id="admin-header-write-story-btn"
              onClick={onOpenCreateStory}
              className="bg-purple-800 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-purple-600 shadow-md cursor-pointer"
            >
              <PenTool className="w-4 h-4 text-amber-300" />
              <span>+ Tulis Cerita Blog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'OVERVIEW', label: 'Ringkasan', icon: TrendingUp },
          { id: 'SETTINGS', label: '⚙️ Identitas & Menu', icon: Palette },
          { id: 'PROGRAMS', label: `Program Donasi (${programs.length})`, icon: Package },
          { id: 'BLOG_POSTS', label: `Cerita Blog (${storyPosts.length})`, icon: FileText },
          { id: 'TRANSACTIONS', label: `Verifikasi Donasi (${pendingTx.length})`, icon: DollarSign },
          { id: 'BENEFICIARIES', label: `Warga Binaan (${totalBinaan})`, icon: Users },
          { id: 'COURSES', label: `Pelatihan Tibersa (${trainingCourses.length})`, icon: BookOpen },
          { id: 'PARTNERS', label: `Mitra RT/RW (${totalPartners})`, icon: Building2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Settings (Branding, Logo, Title, Menu Customizer) */}
      {activeAdminTab === 'SETTINGS' && (
        <AdminSiteSettingsTab />
      )}

      {/* Tab: Overview */}
      {activeAdminTab === 'OVERVIEW' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Total Kas Terverifikasi</span>
              <p className="text-sm sm:text-base font-black text-emerald-800">
                Rp {totalIn.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Donasi Menunggu Verifikasi</span>
              <p className="text-sm sm:text-base font-black text-amber-600">
                {pendingTx.length} Transaksi
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Total Program Aktif</span>
              <p className="text-sm sm:text-base font-black text-purple-900">
                {programs.length} Program
              </p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase">Artikel Cerita Blog</span>
              <p className="text-sm sm:text-base font-black text-stone-900">
                {storyPosts.length} Cerita
              </p>
            </div>
          </div>

          {/* Quick Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Quick Upload Callout */}
            <div className="bg-gradient-to-br from-purple-50 to-amber-50 border border-purple-200 rounded-3xl p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-purple-900 bg-purple-200/60 px-2 py-0.5 rounded-md">
                  📦 Program Donasi
                </span>
                <h4 className="font-extrabold text-xs sm:text-sm text-purple-950">Unggah Program Donasi Baru</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Rilis paket sembako, santunan uang tunai, atau tabungan pendidikan yatim resmi.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCreateProgram}
                className="bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shrink-0 shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Upload Program Baru</span>
              </button>
            </div>

            {/* Quick Write Blog Callout */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-200/60 px-2 py-0.5 rounded-md">
                  ✍️ Blog & Cerita
                </span>
                <h4 className="font-extrabold text-xs sm:text-sm text-emerald-950">Tulis Cerita & Kabar Lapangan</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Bagikan dokumentasi penyaluran & kisah binaan yang siap dibagikan ke WhatsApp dan Medsos.
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenCreateStory}
                className="bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shrink-0 shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PenTool className="w-3.5 h-3.5 text-amber-300" />
                <span>Tulis Artikel Cerita</span>
              </button>
            </div>
          </div>

          {/* Quick Pending Verifications Callout */}
          {pendingTx.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Ada {pendingTx.length} Transaksi Perlu Diverifikasi
                </span>
                <button
                  type="button"
                  onClick={() => setActiveAdminTab('TRANSACTIONS')}
                  className="text-xs font-black text-amber-800 underline"
                >
                  Buka Menu Verifikasi →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Programs */}
      {activeAdminTab === 'PROGRAMS' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Daftar Program Donasi Aktif</h3>
              <p className="text-[11px] text-stone-500">Kelola dan pantau penggalangan dana resmi yayasan</p>
            </div>
            <button
              type="button"
              onClick={onOpenCreateProgram}
              className="bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Upload Program</span>
            </button>
          </div>

          {programs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-stone-300 p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center mx-auto text-xl">
                📦
              </div>
              <h4 className="font-extrabold text-sm text-stone-900">Belum Ada Program Donasi</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Buat program donasi sembako, santunan janda, tabungan yatim, atau pelatihan untuk mulai menggalang donasi.
              </p>
              <button
                type="button"
                onClick={onOpenCreateProgram}
                className="bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-300" />
                <span>Buat Program Sekarang</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {programs.map((p) => {
                const target = p.targetAmount || 1;
                const collected = p.collectedAmount || 0;
                const progress = Math.min(100, Math.round((collected / target) * 100));
                const cover = p.coverImage || (p as any).imageUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80';
                const pkgPrice = p.packagePrice ?? (p as any).pricePerPackage;

                return (
                  <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-3.5 space-y-2.5 shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-3 min-w-0">
                        <img 
                          src={cover} 
                          alt={p.title} 
                          className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100" 
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-purple-900 bg-purple-50 border border-purple-200/60 px-2 py-0.5 rounded-full">
                              {p.category || 'PROGRAM'}
                            </span>
                            {p.badge && (
                              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded-md">
                                {p.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 mt-1 leading-snug truncate">
                            {p.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                            {p.location || 'Bogor'} {pkgPrice ? `• Rp ${pkgPrice.toLocaleString('id-ID')} / paket` : ''}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus program donasi "${p.title}"?`)) {
                            deleteDonationProgram(p.id);
                          }
                        }}
                        className="text-stone-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors cursor-pointer shrink-0"
                        title="Hapus Program"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-emerald-800">
                          Terkumpul: Rp {collected.toLocaleString('id-ID')}
                        </span>
                        <span className="text-stone-600">
                          Target: Rp {target.toLocaleString('id-ID')} ({progress}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-600 to-teal-500 h-full rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-stone-500 pt-0.5">
                        <span>{p.donorCount || 0} Donatur Berpartisipasi</span>
                        <span>{p.type ? p.type.replace('_', ' ') : 'Donasi'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Blog Posts Management */}
      {activeAdminTab === 'BLOG_POSTS' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-stone-900">Kelola Cerita Blog & Kabar Lapangan</h3>
              <p className="text-[11px] text-stone-500">Hanya admin yang berhak menulis dan menghapus artikel</p>
            </div>
            <button
              type="button"
              onClick={onOpenCreateStory}
              className="bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Tulis Artikel Baru</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {storyPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl border border-stone-200 p-3.5 space-y-2.5 shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    {post.photoUrl && (
                      <img 
                        src={post.photoUrl} 
                        alt={post.title} 
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0" 
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md uppercase">
                          {post.category ? post.category.replace('_', ' ') : 'Kabar Lapangan'}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {post.readingTime || '3 menit baca'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 mt-1 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate max-w-xs mt-0.5">
                        {post.summary || post.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSharePost(post)}
                      className="text-emerald-800 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Bagikan Cerita"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Hapus artikel cerita "${post.title}"?`)) {
                          deleteStoryPost(post.id);
                        }
                      }}
                      className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-rose-600 font-bold">
                      <Heart className="w-3 h-3 fill-rose-500" /> {post.likesCount} Doa
                    </span>
                    <span className="flex items-center gap-1 text-stone-600">
                      <MessageCircle className="w-3 h-3" /> {post.comments.length} Komentar
                    </span>
                  </span>
                  <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Transactions */}
      {activeAdminTab === 'TRANSACTIONS' && (
        <div className="space-y-3">
          {/* Filters */}
          <div className="flex space-x-2">
            {(['ALL', 'PENDING', 'VERIFIED'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  txFilter === f
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-600'
                }`}
              >
                {f === 'ALL' ? 'Semua' : f === 'PENDING' ? 'Menunggu Konfirmasi' : 'Terverifikasi'}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-white rounded-2xl border border-stone-200 p-3.5 space-y-2 shadow-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      tx.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {tx.status}
                    </span>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 mt-1">{tx.programTitle}</h4>
                    <p className="text-[11px] text-stone-500">
                      Oleh: <span className="font-bold text-stone-800">{tx.isAnonymous ? 'Hamba Allah' : tx.donorName}</span> ({tx.donorEmail})
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-black text-emerald-800">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </span>
                    <p className="text-[10px] text-stone-400 font-mono mt-0.5">{tx.paymentMethod}</p>
                  </div>
                </div>

                {tx.message && (
                  <p className="text-xs bg-stone-50 p-2 rounded-xl text-stone-700 italic border border-stone-200/50">
                    "{tx.message}"
                  </p>
                )}

                {tx.status === 'PENDING' && (
                  <div className="flex space-x-2 pt-1 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => verifyDonation(tx.id, true)}
                      className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verifikasi Sah</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => verifyDonation(tx.id, false)}
                      className="bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 font-bold text-xs px-3 py-2 rounded-xl cursor-pointer"
                    >
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Beneficiaries */}
      {activeAdminTab === 'BENEFICIARIES' && (
        <div className="space-y-3">
          <div className="space-y-2">
            {beneficiaries.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl border border-stone-200 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={b.photoUrl} alt={b.name} className="w-10 h-10 rounded-xl object-cover border border-stone-200" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs text-stone-900">{b.name}</h4>
                      <span className="text-[9px] font-black bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded-md">
                        {b.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Kel. {b.kelurahan}, Kec. {b.kecamatan}</p>
                  </div>
                </div>
                <span className="text-xs text-stone-500 font-bold">
                  {b.registeredByRtRwName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Courses */}
      {activeAdminTab === 'COURSES' && (
        <div className="space-y-3">
          <div className="space-y-2">
            {trainingCourses.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-stone-200 p-3 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-full">
                      {c.category}
                    </span>
                    <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 mt-1">{c.title}</h4>
                    <p className="text-[11px] text-stone-500">Pemateri: {c.instructorName} ({c.instructorType})</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">
                    {c.feeType === 'GRATIS' ? 'Gratis' : `Rp ${c.coursePrice.toLocaleString('id-ID')}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Partners */}
      {activeAdminTab === 'PARTNERS' && (
        <div className="space-y-3">
          <div className="space-y-2">
            {rtrwPartners.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-stone-200 p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">{p.name}</h4>
                  <p className="text-[11px] text-stone-500">{p.rtRwNumber}, Kel. {p.kelurahan}, Kec. {p.kecamatan}</p>
                  <p className="text-[10px] text-stone-400">Telp: {p.phone}</p>
                </div>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                  ✓ Mitra Terverifikasi
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal in Admin */}
      <ShareModal
        isOpen={!!sharePost}
        onClose={() => setSharePost(null)}
        post={sharePost}
      />
    </div>
  );
};
