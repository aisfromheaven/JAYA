import React, { useState } from 'react';
import { JybLogo } from '../JybLogo';
import { 
  Heart, 
  ShoppingBag, 
  Users, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Repeat,
  PlusCircle,
  ShieldCheck,
  Lock,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DonationProgram } from '../../types';
import { RecurringDonationCard } from '../RecurringDonationCard';

interface HomeViewProps {
  onOpenDonate: (program?: DonationProgram) => void;
  setActiveView: (view: string) => void;
  onOpenCreateProgram?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onOpenDonate, setActiveView, onOpenCreateProgram }) => {
  const { programs = [], beneficiaries = [], rtrwPartners = [], transactions = [], currentUser, deleteDonationProgram } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter programs
  const filteredPrograms = (programs || []).filter(p => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'SEMBAKO') return p.category === 'SEMBAKO';
    if (selectedCategory === 'SANTUNAN') return p.category === 'SANTUNAN';
    if (selectedCategory === 'TABUNGAN') return p.category === 'TABUNGAN';
    if (selectedCategory === 'PELATIHAN') return p.category === 'PELATIHAN';
    return true;
  });

  // Calculate totals
  const totalCollected = (transactions || [])
    .filter(t => t.status === 'VERIFIED')
    .reduce((sum, t) => sum + t.amount, 0) + 40000000; // baseline seed
  const totalBeneficiaries = (beneficiaries || []).length;
  const verifiedRtRwCount = (rtrwPartners || []).filter(p => p.status === 'VERIFIED').length;

  return (
    <div className="space-y-5 pb-12">
      {/* Hero Impact Card (Mobile-Optimized) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 text-white p-5 sm:p-6 shadow-xl">
        {/* Background Subtle Accent & Logo Watermark */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-3 -right-3 w-28 h-28 opacity-15 pointer-events-none transform rotate-12">
          <JybLogo className="w-full h-full" color="#FDE68A" />
        </div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-emerald-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
              🌿 Bogor Berbagi
            </span>
            <span className="text-[11px] text-emerald-200 font-medium">
              Transparan • Terverifikasi RT/RW
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
            Gotong Royong Muliakan <span className="text-amber-300 underline decoration-amber-400/50 decoration-2">Janda & Yatim</span> di Bogor
          </h2>

          <p className="text-xs text-emerald-100/90 leading-relaxed max-w-sm">
            Donasi paket sembako, tabungan pendidikan yatim (Buku Mimpi), dan pelatihan keterampilan berdaya bersama Akademi Tibersa.
          </p>

          {/* Key Impact Stats Metric Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-700/50">
            <div className="bg-emerald-950/60 backdrop-blur-xs p-2 rounded-xl text-center border border-emerald-700/30">
              <span className="text-[10px] text-emerald-300 font-medium block">Tersalurkan</span>
              <p className="text-xs sm:text-sm font-black text-amber-300 truncate">
                Rp 48,5 Jt+
              </p>
            </div>
            <div className="bg-emerald-950/60 backdrop-blur-xs p-2 rounded-xl text-center border border-emerald-700/30">
              <span className="text-[10px] text-emerald-300 font-medium block">Binaan</span>
              <p className="text-xs sm:text-sm font-black text-white">
                {totalBeneficiaries} Warga
              </p>
            </div>
            <div className="bg-emerald-950/60 backdrop-blur-xs p-2 rounded-xl text-center border border-emerald-700/30">
              <span className="text-[10px] text-emerald-300 font-medium block">Mitra RT/RW</span>
              <p className="text-xs sm:text-sm font-black text-amber-300">
                {verifiedRtRwCount} Wilayah
              </p>
            </div>
          </div>

          {/* Quick Donate Action Button */}
          <button
            type="button"
            id="hero-fast-donate-btn"
            onClick={() => onOpenDonate()}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-emerald-950 font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center space-x-2 mt-1 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-emerald-950" />
            <span>Donasi Sekarang (Mulai Rp 10.000)</span>
          </button>
        </div>
      </div>

      {/* Feature Navigation Quick Grid */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { id: 'SEMBAKO', label: 'Sembako', icon: '🍚', color: 'bg-emerald-50 text-emerald-900 border-emerald-200', target: 'SEMBAKO' },
          { id: 'orphans', label: 'Buku Mimpi', icon: '📖', color: 'bg-amber-50 text-amber-900 border-amber-200', isView: true },
          { id: 'training', label: 'Pelatihan', icon: '🎓', color: 'bg-purple-50 text-purple-900 border-purple-200', isView: true },
          { id: 'transparency', label: 'Jejak Kasih', icon: '📊', color: 'bg-blue-50 text-blue-900 border-blue-200', isView: true },
        ].map((item) => (
          <button
            key={item.id}
            id={`quick-feature-${item.id}`}
            onClick={() => {
              if (item.isView) {
                setActiveView(item.id);
              } else {
                setSelectedCategory(item.target || 'ALL');
              }
            }}
            className={`p-2.5 rounded-2xl border text-center transition-all hover:scale-102 flex flex-col items-center justify-center ${item.color} shadow-2xs cursor-pointer`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[11px] font-extrabold mt-1 whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Donasi Berlangganan Banner Widget */}
      <RecurringDonationCard />

      {/* Program Crowdfunding Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-stone-900 tracking-tight flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Program Donasi Pilihan
            </h3>
            <p className="text-xs text-stone-500">Penyaluran langsung diverifikasi pengurus RT/RW</p>
          </div>

          {/* Admin-only Upload Button */}
          {currentUser.role === 'ADMIN' && onOpenCreateProgram && (
            <button
              type="button"
              id="admin-upload-program-btn"
              onClick={onOpenCreateProgram}
              className="bg-purple-900 hover:bg-purple-800 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-purple-950/20 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>+ Upload Program</span>
            </button>
          )}
        </div>

        {/* Verification Policy Notice */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-2.5 flex items-center space-x-2 text-xs text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="text-[11px] font-medium leading-tight">
            <b>Terpusat & Terpercaya:</b> Seluruh program donasi diverifikasi dan dikelola secara resmi demi keamanan dan kepastian penyaluran.
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'ALL', label: 'Semua Program' },
            { id: 'SEMBAKO', label: '🍚 Paket Sembako' },
            { id: 'SANTUNAN', label: '🌸 Santunan Bulanan' },
            { id: 'TABUNGAN', label: '🎓 Tabungan Yatim' },
            { id: 'PELATIHAN', label: '💡 Pelatihan Tibersa' },
          ].map((cat) => (
            <button
              key={cat.id}
              id={`filter-category-${cat.id.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Program Cards List */}
        <div className="space-y-3.5">
          {filteredPrograms.map((prog) => {
            const progress = Math.min(100, Math.round((prog.collectedAmount / prog.targetAmount) * 100));
            return (
              <div
                key={prog.id}
                id={`program-card-${prog.id}`}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="relative h-40 w-full overflow-hidden bg-stone-100">
                  <img
                    src={prog.coverImage}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge tag */}
                  {prog.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-emerald-950 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
                      {prog.badge}
                    </span>
                  )}

                  {/* Admin Delete Action */}
                  {currentUser.role === 'ADMIN' && (
                    <button
                      type="button"
                      title="Hapus Program (Admin)"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Hapus program donasi "${prog.title}"?`)) {
                          deleteDonationProgram(prog.id);
                        }
                      }}
                      className="absolute top-3 right-3 bg-rose-600/90 hover:bg-rose-700 text-white p-1.5 rounded-full shadow-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Location badge */}
                  <span className="absolute bottom-3 left-3 text-white text-[11px] font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {prog.location}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-sm sm:text-base text-stone-900 leading-snug">
                      {prog.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Package Items Pills if available */}
                    {prog.packageItems && prog.packageItems.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {prog.packageItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-50 text-emerald-900 border border-emerald-200/70 text-[10px] font-bold px-2 py-0.5 rounded-md"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress Bar & Amount */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-500">
                        Terkumpul: <b className="text-emerald-800">Rp {prog.collectedAmount.toLocaleString('id-ID')}</b>
                      </span>
                      <span className="font-extrabold text-emerald-900">{progress}%</span>
                    </div>

                    <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200/60">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>Target: Rp {prog.targetAmount.toLocaleString('id-ID')}</span>
                      <span>{prog.donorCount} Donatur</span>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <button
                    type="button"
                    id={`donate-btn-${prog.id}`}
                    onClick={() => onOpenDonate(prog)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donasi Sekarang {prog.packagePrice ? `(Rp ${prog.packagePrice.toLocaleString('id-ID')})` : ''}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
