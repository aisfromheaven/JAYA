import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Upload, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  DollarSign, 
  Package, 
  Image as ImageIcon,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProgramType } from '../types';

interface CreateProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProgramModal: React.FC<CreateProgramModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, createDonationProgram, addToastNotification } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'SEMBAKO' | 'SANTUNAN' | 'TABUNGAN' | 'PELATIHAN'>('SEMBAKO');
  const [type, setType] = useState<ProgramType>('SEMBAKO_50K');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState<number>(5000000);
  const [packagePrice, setPackagePrice] = useState<number>(50000);
  const [packageItemsInput, setPackageItemsInput] = useState('Beras 5kg, Minyak Goreng 1L, Gula 1kg, Teh');
  const [location, setLocation] = useState('Kel. Baranangsiang, Kec. Bogor Timur');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80');
  const [badge, setBadge] = useState('Program Baru');

  if (!isOpen) return null;

  // Security barrier: only admin
  if (currentUser.role !== 'ADMIN') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-3 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Akses Terbatas Admin</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Untuk menjaga transparansi dan validitas, saat ini hanya akun <b>Admin Utama</b> yang berwenang mengunggah program donasi baru.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-stone-900 text-white font-bold py-2.5 rounded-xl text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const handleCategoryChange = (newCat: 'SEMBAKO' | 'SANTUNAN' | 'TABUNGAN' | 'PELATIHAN') => {
    setCategory(newCat);
    if (newCat === 'SEMBAKO') {
      setType('SEMBAKO_50K');
      setPackagePrice(50000);
      setCoverImage('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80');
      setBadge('Paket Sembako');
    } else if (newCat === 'SANTUNAN') {
      setType('SANTUNAN_JANDA');
      setPackagePrice(100000);
      setCoverImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80');
      setBadge('Santunan Janda');
    } else if (newCat === 'TABUNGAN') {
      setType('TABUNGAN_YATIM');
      setPackagePrice(250000);
      setCoverImage('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80');
      setBadge('Buku Mimpi');
    } else {
      setType('PELATIHAN');
      setPackagePrice(20000);
      setCoverImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80');
      setBadge('Akademi Tibersa');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Mohon isi judul dan deskripsi program donasi.');
      return;
    }

    const items = packageItemsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    createDonationProgram({
      title,
      type,
      category,
      description,
      targetAmount,
      packagePrice: packagePrice > 0 ? packagePrice : undefined,
      packageItems: items.length > 0 ? items : undefined,
      location,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80',
      badge: badge || undefined,
      isUrgent: false,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center font-black text-lg shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">Upload Program Donasi Baru</h3>
                <span className="bg-amber-400 text-purple-950 text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  Khusus Admin
                </span>
              </div>
              <p className="text-[11px] text-purple-200 font-medium">Hanya Admin JAYA BOGOR yang berwenang merilis kampanye</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block">Kategori Program Donasi *</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'SEMBAKO', label: '🍚 Paket Sembako', desc: 'Beras, minyak, gula untuk janda dhuafa' },
                { id: 'SANTUNAN', label: '🌸 Santunan Bulanan', desc: 'Uang tunai santunan hidup' },
                { id: 'TABUNGAN', label: '🎓 Tabungan Yatim', desc: 'Buku Mimpi & biaya sekolah' },
                { id: 'PELATIHAN', label: '💡 Pelatihan Tibersa', desc: 'Vokasi & modal usaha mandiri' },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategoryChange(item.id as any)}
                  className={`p-2.5 rounded-2xl text-left border transition-all ${
                    category === item.id
                      ? 'bg-purple-50 border-purple-700 ring-2 ring-purple-600/20 text-purple-950 font-bold'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  <span className="text-xs font-extrabold block">{item.label}</span>
                  <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Judul Program Donasi *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Paket Sembako Berkah 50 Janda Dhuafa Bogor Timur"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 font-semibold focus:ring-2 focus:ring-purple-700 focus:outline-hidden"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Deskripsi & Urgensi Program *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan latar belakang penerima manfaat, kondisi lapangan dari laporan RT/RW, dan rencana penyaluran..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-purple-700 focus:outline-hidden"
            />
          </div>

          {/* Target Amount & Package Price */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Target Dana (Rp) *</label>
              <input
                type="number"
                required
                min={50000}
                step={50000}
                value={targetAmount}
                onChange={(e) => setTargetAmount(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Harga Paket / Warga (Rp)</label>
              <input
                type="number"
                min={0}
                step={10000}
                value={packagePrice}
                onChange={(e) => setPackagePrice(parseInt(e.target.value, 10) || 0)}
                placeholder="50000"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
              />
            </div>
          </div>

          {/* Package Items */}
          {category === 'SEMBAKO' && (
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Rincian Isi Paket Sembako (Pisahkan Koma)</label>
              <input
                type="text"
                value={packageItemsInput}
                onChange={(e) => setPackageItemsInput(e.target.value)}
                placeholder="Beras 5kg, Minyak 1L, Gula 1kg, Teh, Telur 10 butir"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
              />
            </div>
          )}

          {/* Location & Badge */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Lokasi Wilayah di Bogor *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kel. Sukasari, Kec. Bogor Timur"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Label / Badge Promo</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Mendesak / Pilihan"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">URL Foto / Banner Program *</label>
            <input
              type="url"
              required
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono"
            />
            {coverImage && (
              <img
                src={coverImage}
                alt="Preview"
                className="w-full h-28 object-cover rounded-xl mt-2 border border-stone-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80';
                }}
              />
            )}
          </div>

          <button
            type="submit"
            id="submit-create-program-btn"
            className="w-full bg-purple-900 hover:bg-purple-800 text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4 text-amber-300" />
            <span>Terbitkan Program Donasi ke Beranda</span>
          </button>
        </form>
      </div>
    </div>
  );
};
