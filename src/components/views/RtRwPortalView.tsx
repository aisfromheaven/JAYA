import React, { useState } from 'react';
import { 
  Building2, 
  UserPlus, 
  Users, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Heart,
  Sparkles,
  ShieldCheck,
  Plus,
  FileSpreadsheet,
  Download,
  AlertCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Beneficiary } from '../../types';

interface RtRwPortalViewProps {
  onOpenAddBeneficiary: () => void;
  onOpenRegisterPartner: () => void;
  onSelectOrphan: (beneficiary: Beneficiary) => void;
}

export const RtRwPortalView: React.FC<RtRwPortalViewProps> = ({
  onOpenAddBeneficiary,
  onOpenRegisterPartner,
  onSelectOrphan
}) => {
  const { currentUser, beneficiaries = [], rtrwPartners = [], addToastNotification } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'YATIM' | 'JANDA'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Identify partner record
  const myPartnerProfile = (rtrwPartners || []).find(p => p.id === currentUser.id || p.userId === currentUser.id) || {
    name: currentUser.name || 'H. Suryadi (Ketua RT)',
    rtRwNumber: currentUser.rtRwNumber || 'RT 03 / RW 05',
    kelurahan: currentUser.kelurahan || 'Baranangsiang',
    kecamatan: currentUser.kecamatan || 'Bogor Timur',
    phone: currentUser.phone || '0812-3456-7890',
  };

  // Get beneficiaries in this RT/RW
  const allBinaan = beneficiaries || [];
  const jandaCount = allBinaan.filter(b => b.category === 'JANDA').length;
  const yatimCount = allBinaan.filter(b => b.category === 'YATIM').length;

  const filteredList = allBinaan.filter(b => {
    const matchesFilter = selectedFilter === 'ALL' || b.category === selectedFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleExportWarga = () => {
    const headers = ['ID', 'Nama Warga', 'Kategori', 'Usia', 'Alamat', 'RT/RW', 'Kelurahan', 'Kecamatan', 'Bantuan Diterima (Rp)'];
    const rows = allBinaan.map(b => [
      b.id,
      `"${b.name}"`,
      b.category === 'JANDA' ? 'Janda Dhuafa' : 'Anak Yatim',
      b.age,
      `"${b.address}"`,
      `"${b.rtRw}"`,
      `"${b.kelurahan}"`,
      `"${b.kecamatan}"`,
      b.totalAssistanceReceived || 0
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `data_warga_binaan_rtrw_${myPartnerProfile.kelurahan.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToastNotification('Ekspor Berhasil', 'Data warga binaan RT/RW berhasil diunduh.', 'SUCCESS');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-stone-900 rounded-3xl text-white p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="bg-amber-300 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
              🏛️ Portal Pengurus RT/RW Mitra
            </span>
            <span className="text-[11px] text-amber-200 font-bold">
              Wilayah Resmi Kota & Kab. Bogor
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              Manajemen Data <span className="text-amber-300">Warga Binaan</span>
            </h2>
            <p className="text-xs text-amber-100/90 leading-relaxed mt-1">
              Sebagai pengurus RT/RW, data yang Anda verifikasi memastikan sembako, santunan bulanan, dan tabungan pendidikan yatim tersalurkan tepat sasaran.
            </p>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              id="open-add-beneficiary-btn"
              onClick={onOpenAddBeneficiary}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Input Data Warga Binaan Baru</span>
            </button>

            <button
              type="button"
              onClick={handleExportWarga}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 px-3.5 rounded-2xl text-xs flex items-center justify-center space-x-1.5 border border-white/30 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
              <span>Unduh Rekap Warga (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profil Ketua RT & Wilayah Box */}
      <div className="bg-white rounded-3xl border border-stone-200 p-4 shadow-xs space-y-3.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-xl shadow-xs">
              🏛️
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                Pengurus / Ketua RT Terverifikasi
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-stone-900">
                {myPartnerProfile.name}
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                {myPartnerProfile.rtRwNumber}, Kel. {myPartnerProfile.kelurahan}, Kec. {myPartnerProfile.kecamatan}
              </p>
            </div>
          </div>
          <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
            ✓ Mitra Aktif
          </span>
        </div>

        {/* WhatsApp & Verification info */}
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Kontak WhatsApp: <b>{myPartnerProfile.phone}</b></span>
          </div>
          <div className="flex items-center gap-1 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data Terverifikasi Lapangan</span>
          </div>
        </div>

        {/* Detail Rekapitulasi Jumlah Warga Binaan */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-center">
            <span className="text-[10px] text-stone-500 font-bold uppercase block">Total Binaan</span>
            <p className="text-lg font-black text-stone-900 mt-0.5">{allBinaan.length}</p>
            <span className="text-[10px] text-stone-400">Warga Terdaftar</span>
          </div>

          <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-200 text-center">
            <span className="text-[10px] text-rose-800 font-bold uppercase block">🌸 Janda Dhuafa</span>
            <p className="text-lg font-black text-rose-900 mt-0.5">{jandaCount}</p>
            <span className="text-[10px] text-rose-700 font-medium">Keluarga</span>
          </div>

          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200 text-center">
            <span className="text-[10px] text-amber-900 font-bold uppercase block">🎓 Anak Yatim</span>
            <p className="text-lg font-black text-amber-950 mt-0.5">{yatimCount}</p>
            <span className="text-[10px] text-amber-800 font-medium">Anak Asuh</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-xs sm:text-sm text-stone-900">
            Daftar Warga Binaan ({filteredList.length})
          </h3>
          <div className="flex space-x-1">
            {(['ALL', 'JANDA', 'YATIM'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  selectedFilter === cat
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat === 'ALL' ? 'Semua' : cat === 'JANDA' ? '🌸 Janda' : '🎓 Yatim'}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama warga atau alamat..."
          className="w-full bg-white border border-stone-200 rounded-2xl px-3.5 py-2 text-xs text-stone-900 font-medium placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-700"
        />
      </div>

      {/* Beneficiary List Cards */}
      <div className="space-y-3">
        {filteredList.map((ben) => (
          <div
            key={ben.id}
            id={`binaan-card-${ben.id}`}
            className="bg-white rounded-3xl border border-stone-200 p-4 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start space-x-3.5">
              <img
                src={ben.photoUrl}
                alt={ben.name}
                className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    ben.category === 'YATIM'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-rose-100 text-rose-900'
                  }`}>
                    {ben.category === 'YATIM' ? `🎓 Anak Yatim (${ben.age} Thn)` : `🌸 Janda Dhuafa (${ben.dependentsCount || 2} Tanggungan)`}
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Terdaftar
                  </span>
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-stone-900 mt-1 truncate">
                  {ben.name}
                </h4>

                <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {ben.address} ({ben.rtRw})
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-2xl border border-stone-100 leading-relaxed">
              {ben.story}
            </p>

            {/* If Yatim: Dream Book Status */}
            {ben.dreamBook && (
              <div className="bg-amber-50/70 border border-amber-200/70 p-3 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Cita-cita: {ben.dreamBook.dreamCareer}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectOrphan(ben)}
                    className="text-emerald-800 font-extrabold underline text-[11px]"
                  >
                    Buku Mimpi
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600">
                  <span>Tabungan Pendidikan: <b>Rp {(ben.currentEducationSavings || 0).toLocaleString('id-ID')}</b></span>
                  <span className="font-semibold text-emerald-800">Target: Rp {(ben.schoolYearTarget || 2500000).toLocaleString('id-ID')}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
