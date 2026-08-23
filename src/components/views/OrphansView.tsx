import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  Heart, 
  Gift, 
  MapPin, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Beneficiary } from '../../types';

interface OrphansViewProps {
  onSelectOrphan: (beneficiary: Beneficiary) => void;
  onDonateToOrphan: (beneficiary: Beneficiary) => void;
}

export const OrphansView: React.FC<OrphansViewProps> = ({ 
  onSelectOrphan, 
  onDonateToOrphan 
}) => {
  const { beneficiaries = [] } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKelurahan, setSelectedKelurahan] = useState('ALL');

  // Filter only orphan category
  const orphans = (beneficiaries || []).filter(b => b.category === 'YATIM');

  const filteredOrphans = orphans.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.kelurahan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.dreamBook?.dreamCareer && o.dreamBook.dreamCareer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesKelurahan = selectedKelurahan === 'ALL' || o.kelurahan === selectedKelurahan;
    return matchesSearch && matchesKelurahan;
  });

  const uniqueKelurahan = Array.from(new Set(orphans.map(o => o.kelurahan)));

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 rounded-3xl text-white p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 backdrop-blur-xs text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
              🎓 Tabungan Pendidikan
            </span>
            <span className="text-[11px] text-amber-100 font-medium">Buku Mimpi Yatim</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-snug">
            Adopsi & Tabung Pendidikan <span className="text-amber-200">Anak Yatim</span> Bogor
          </h2>

          <p className="text-xs text-amber-100/90 leading-relaxed">
            Setiap anak memiliki <b>Buku Mimpi</b> berisi cita-cita dan buku yang ingin dibaca. Dukung tabungan biaya sekolah mereka mulai Rp 25.000/bulan.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            id="search-orphan-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama anak, cita-cita, atau kelurahan..."
            className="w-full bg-white border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden shadow-2xs"
          />
        </div>

        {/* Kelurahan Chips */}
        <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedKelurahan('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedKelurahan === 'ALL'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600'
            }`}
          >
            Semua Wilayah
          </button>
          {uniqueKelurahan.map(kel => (
            <button
              key={kel}
              onClick={() => setSelectedKelurahan(kel)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedKelurahan === kel
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-600'
              }`}
            >
              Kel. {kel}
            </button>
          ))}
        </div>
      </div>

      {/* Orphans Grid / List */}
      <div className="space-y-3.5">
        {filteredOrphans.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-stone-500 text-xs">
            Tidak ditemukan data anak yatim untuk pencarian ini.
          </div>
        ) : (
          filteredOrphans.map((orphan) => {
            const target = orphan.schoolYearTarget || 2500000;
            const current = orphan.currentEducationSavings || 0;
            const progress = Math.min(100, Math.round((current / target) * 100));

            return (
              <div
                key={orphan.id}
                id={`orphan-card-${orphan.id}`}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden p-4 space-y-3"
              >
                <div className="flex items-start space-x-3.5">
                  <img
                    src={orphan.photoUrl}
                    alt={orphan.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-amber-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                        {orphan.age} Tahun
                      </span>
                      <span className="text-stone-400 text-xs">•</span>
                      <span className="text-stone-600 text-[11px] font-semibold flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-emerald-700" /> {orphan.kelurahan}, {orphan.kecamatan}
                      </span>
                    </div>

                    <h3 className="font-black text-sm sm:text-base text-stone-900 mt-1 truncate">
                      {orphan.name}
                    </h3>

                    {orphan.dreamBook && (
                      <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-2 mt-1.5 flex items-start space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="min-w-0 text-[11px] leading-tight">
                          <span className="font-bold text-amber-950 block truncate">
                            Cita-cita: {orphan.dreamBook.dreamCareer}
                          </span>
                          <span className="text-stone-500 line-clamp-1">
                            Buku: {orphan.dreamBook.desiredBooks.slice(0, 2).join(', ')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar Biaya Sekolah */}
                <div className="space-y-1 bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-stone-600 font-bold flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-700" /> Tabungan Sekolah:
                    </span>
                    <span className="font-extrabold text-emerald-900">
                      Rp {current.toLocaleString('id-ID')} / {target.toLocaleString('id-ID')} ({progress}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    id={`open-dream-book-${orphan.id}`}
                    onClick={() => onSelectOrphan(orphan)}
                    className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>Buka Buku Mimpi</span>
                  </button>

                  <button
                    type="button"
                    id={`donate-orphan-direct-${orphan.id}`}
                    onClick={() => onDonateToOrphan(orphan)}
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Tabung (Min 25rb)</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
