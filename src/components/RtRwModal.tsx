import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  UserPlus, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  BookOpen, 
  Heart,
  Upload,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Beneficiary } from '../types';

interface RtRwModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'REGISTER_PARTNER' | 'ADD_BENEFICIARY';
}

export const RtRwModal: React.FC<RtRwModalProps> = ({ 
  isOpen, 
  onClose,
  mode = 'ADD_BENEFICIARY' 
}) => {
  const { currentUser, registerRtRwPartner, addBeneficiary } = useApp();

  // Partner Registration Form State
  const [partnerName, setPartnerName] = useState(currentUser.name);
  const [partnerPhone, setPartnerPhone] = useState(currentUser.phone || '');
  const [partnerKecamatan, setPartnerKecamatan] = useState(currentUser.kecamatan || 'Bogor Timur');
  const [partnerKelurahan, setPartnerKelurahan] = useState(currentUser.kelurahan || 'Baranangsiang');
  const [partnerRtRw, setPartnerRtRw] = useState(currentUser.rtRwNumber || 'RT 03 / RW 05');

  // Beneficiary Input Form State
  const [benCategory, setBenCategory] = useState<'JANDA' | 'YATIM'>('YATIM');
  const [benName, setBenName] = useState('');
  const [benAge, setBenAge] = useState<number>(10);
  const [benAddress, setBenAddress] = useState('');
  const [benPhone, setBenPhone] = useState('');
  const [benStory, setBenStory] = useState('');
  const [benPhotoUrl, setBenPhotoUrl] = useState('');
  const [dependentsCount, setDependentsCount] = useState(2);
  
  // Yatim DreamBook Fields
  const [dreamCareer, setDreamCareer] = useState('');
  const [desiredBooks, setDesiredBooks] = useState('');
  const [wishList, setWishList] = useState('');
  const [schoolTarget, setSchoolTarget] = useState('2400000');

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerRtRwPartner({
      name: partnerName,
      phone: partnerPhone,
      kecamatan: partnerKecamatan,
      kelurahan: partnerKelurahan,
      rtRwNumber: partnerRtRw
    });
    setIsSuccess(true);
  };

  const handleBeneficiarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!benName.trim() || !benAddress.trim()) {
      alert('Mohon lengkapi nama dan alamat warga binaan.');
      return;
    }

    const defaultPhoto = benCategory === 'YATIM'
      ? 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=500&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80';

    addBeneficiary({
      name: benName,
      category: benCategory,
      age: benAge,
      rtRw: currentUser.rtRwNumber || partnerRtRw,
      kelurahan: currentUser.kelurahan || partnerKelurahan,
      kecamatan: currentUser.kecamatan || partnerKecamatan,
      address: benAddress,
      phone: benPhone.trim() || undefined,
      story: benStory.trim() || 'Warga binaan terverifikasi layak menerima bantuan sembako dan santunan sosial.',
      photoUrl: benPhotoUrl.trim() || defaultPhoto,
      dependentsCount: benCategory === 'JANDA' ? dependentsCount : undefined,
      schoolYearTarget: benCategory === 'YATIM' ? parseInt(schoolTarget, 10) || 2400000 : undefined,
      currentEducationSavings: 0,
      dreamBook: benCategory === 'YATIM' ? {
        dreamCareer: dreamCareer.trim() || 'Pendidikan Tinggi & Bermanfaat bagi Masyarakat',
        gradeLevel: `Usia ${benAge} Tahun`,
        desiredBooks: desiredBooks.split(',').map(b => b.trim()).filter(Boolean),
        wishList: wishList.trim() || 'Peralatan sekolah & seragam lengkap',
        favoriteQuote: 'Semangat belajar untuk meraih masa depan cerah.'
      } : undefined
    });

    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setBenName('');
    setBenAddress('');
    setBenStory('');
    setDreamCareer('');
    setDesiredBooks('');
    setWishList('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-300 text-amber-950 flex items-center justify-center font-black text-lg">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                {mode === 'REGISTER_PARTNER' ? 'Daftar Mitra Verifikasi RT/RW' : 'Input Data Warga Binaan'}
              </h3>
              <p className="text-[11px] text-amber-200">
                {mode === 'REGISTER_PARTNER' ? 'Verifikasi Wilayah untuk Penyaluran Tepat Sasaran' : 'Janda Dhuafa & Anak Yatim Wilayah Bogor'}
              </p>
            </div>
          </div>
          <button 
            onClick={isSuccess ? handleFinish : onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h4 className="text-lg font-extrabold text-stone-900">
                {mode === 'REGISTER_PARTNER' ? 'Pendaftaran Mitra Diajukan!' : 'Warga Binaan Berhasil Didaftarkan!'}
              </h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto">
                {mode === 'REGISTER_PARTNER'
                  ? 'Admin akan memverifikasi dokumen wilayah Anda. Segera setelah aktif, Anda dapat mendaftarkan warga binaan.'
                  : 'Data telah tersimpan di sistem JAYA BOGOR. Warga binaan siap menerima penyaluran sembako & santunan donatur.'}
              </p>
              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
              >
                Selesai & Lihat Data
              </button>
            </div>
          ) : mode === 'REGISTER_PARTNER' ? (
            <form onSubmit={handlePartnerSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Nama Lengkap Pengurus RT/RW *</label>
                <input
                  type="text"
                  required
                  id="rtrw-partner-name-input"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Contoh: H. Suryadi"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Nomor WhatsApp / HP Aktif *</label>
                <input
                  type="tel"
                  required
                  id="rtrw-partner-phone-input"
                  value={partnerPhone}
                  onChange={(e) => setPartnerPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Kecamatan *</label>
                  <select
                    id="rtrw-partner-kecamatan-select"
                    value={partnerKecamatan}
                    onChange={(e) => setPartnerKecamatan(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-2.5 py-2 text-xs text-stone-900 font-semibold"
                  >
                    <option value="Bogor Timur">Bogor Timur</option>
                    <option value="Bogor Tengah">Bogor Tengah</option>
                    <option value="Bogor Selatan">Bogor Selatan</option>
                    <option value="Bogor Utara">Bogor Utara</option>
                    <option value="Bogor Barat">Bogor Barat</option>
                    <option value="Tanah Sareal">Tanah Sareal</option>
                    <option value="Ciomas">Ciomas (Kab)</option>
                    <option value="Ciawi">Ciawi (Kab)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Kelurahan / Desa *</label>
                  <input
                    type="text"
                    required
                    id="rtrw-partner-kelurahan-input"
                    value={partnerKelurahan}
                    onChange={(e) => setPartnerKelurahan(e.target.value)}
                    placeholder="Contoh: Baranangsiang"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Nomor RT / RW Binaan *</label>
                <input
                  type="text"
                  required
                  id="rtrw-partner-number-input"
                  value={partnerRtRw}
                  onChange={(e) => setPartnerRtRw(e.target.value)}
                  placeholder="Contoh: RT 03 / RW 05"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold"
                />
              </div>

              <button
                type="submit"
                id="submit-rtrw-partner-btn"
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Kirim Formulir Pendaftaran Mitra</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleBeneficiarySubmit} className="space-y-3.5">
              {/* Category Selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 block">Status Penerima Manfaat *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setBenCategory('YATIM')}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      benCategory === 'YATIM'
                        ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/20 text-amber-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    🎓 Anak Yatim (Tabungan & Buku Mimpi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBenCategory('JANDA')}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      benCategory === 'JANDA'
                        ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-500/20 text-rose-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    🌸 Janda Dhuafa (Pemberdayaan)
                  </button>
                </div>
              </div>

              {/* Name & Age */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    id="beneficiary-name-input"
                    value={benName}
                    onChange={(e) => setBenName(e.target.value)}
                    placeholder="Nama warga binaan"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Usia (Thn) *</label>
                  <input
                    type="number"
                    required
                    id="beneficiary-age-input"
                    value={benAge}
                    onChange={(e) => setBenAge(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Alamat Lengkap (Jalan, Gang, No Rumah) *</label>
                <input
                  type="text"
                  required
                  id="beneficiary-address-input"
                  value={benAddress}
                  onChange={(e) => setBenAddress(e.target.value)}
                  placeholder="Jl. Pajajaran Gang Melati No. 4"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Nomor HP / Wali (Opsional)</label>
                <input
                  type="tel"
                  id="beneficiary-phone-input"
                  value={benPhone}
                  onChange={(e) => setBenPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                />
              </div>

              {/* Story */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Cerita Singkat Kondisi Warga</label>
                <textarea
                  rows={2}
                  id="beneficiary-story-input"
                  value={benStory}
                  onChange={(e) => setBenStory(e.target.value)}
                  placeholder="Ceritakan latar belakang keluarga, kondisi ekonomi, dan kebutuhan mendesak..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900"
                />
              </div>

              {/* Yatim: Buku Mimpi Fields */}
              {benCategory === 'YATIM' && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-amber-900 font-extrabold text-xs">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>BUKU MIMPI & KEBUTUHAN PENDIDIKAN</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block">Cita-Cita Anak *</label>
                    <input
                      type="text"
                      id="yatim-dream-career-input"
                      value={dreamCareer}
                      onChange={(e) => setDreamCareer(e.target.value)}
                      placeholder="Contoh: Dokter Anak, Guru, Arsitek"
                      className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block">Buku yang Ingin Dibaca (Pisahkan Koma)</label>
                    <input
                      type="text"
                      id="yatim-desired-books-input"
                      value={desiredBooks}
                      onChange={(e) => setDesiredBooks(e.target.value)}
                      placeholder="Ensiklopedia Sains, Novel Laskar Pelangi, Kamus Inggris"
                      className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block">Perlengkapan Sekolah yang Dibutuhkan</label>
                    <input
                      type="text"
                      id="yatim-wishlist-input"
                      value={wishList}
                      onChange={(e) => setWishList(e.target.value)}
                      placeholder="Sepatu ukuran 36, tas ransel anti air, alat tulis"
                      className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-900"
                    />
                  </div>
                </div>
              )}

              {/* Janda: Dependents */}
              {benCategory === 'JANDA' && (
                <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-3 space-y-2">
                  <label className="text-xs font-bold text-rose-950 block">Jumlah Tanggungan Anak / Anggota Keluarga</label>
                  <input
                    type="number"
                    value={dependentsCount}
                    onChange={(e) => setDependentsCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-white border border-rose-300 rounded-lg px-3 py-1.5 text-xs font-bold text-stone-900"
                  />
                </div>
              )}

              <button
                type="submit"
                id="submit-beneficiary-btn"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Simpan Data Warga Binaan</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
