import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Image as ImageIcon, 
  MapPin, 
  Sparkles,
  Send,
  Upload,
  Lock,
  Tag,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BlogCategory } from '../types';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose }) => {
  const { createStoryPost, programs, currentUser, addToastNotification } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BlogCategory>('PENYALURAN');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80');
  const [linkedProgId, setLinkedProgId] = useState('');
  const [tagsInput, setTagsInput] = useState('#JAYABOGOR, #BogorBerbagi, #SembakoBerkah');
  const [kelurahan, setKelurahan] = useState('Baranangsiang');
  const [kecamatan, setKecamatan] = useState('Bogor Timur');

  if (!isOpen) return null;

  // Security barrier: only admin
  if (currentUser.role !== 'ADMIN') {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center space-y-3 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-stone-900">Akses Menulis Khusus Admin</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Untuk memastikan keaslian cerita dan laporan pertanggungjawaban publik, saat ini hanya akun <b>Admin JAYA BOGOR</b> yang berwenang menerbitkan artikel cerita.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full bg-stone-900 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  const samplePhotos = [
    { label: 'Penyaluran Sembako', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80' },
    { label: 'Anak Yatim Belajar', url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&auto=format&fit=crop&q=80' },
    { label: 'Ibu Janda Usaha', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80' },
    { label: 'Pelatihan Vokasi', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotoUrl(reader.result);
          addToastNotification('Foto Berhasil Dipilih', 'Foto lokal telah dimuat ke pratinjau artikel.', 'SUCCESS');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Mohon lengkapi judul dan isi artikel cerita.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    createStoryPost({
      title: title.trim(),
      summary: summary.trim() || undefined,
      content: content.trim(),
      category,
      tags: tags.length > 0 ? tags : undefined,
      beneficiaryName: beneficiaryName.trim() || undefined,
      photoUrl: photoUrl.trim() || samplePhotos[0].url,
      linkedProgramId: linkedProgId || undefined,
      kelurahan,
      kecamatan
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[94vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center font-bold shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">Tulis Artikel & Cerita Blog</h3>
                <span className="bg-amber-400 text-purple-950 text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  Admin Only
                </span>
              </div>
              <p className="text-[11px] text-purple-200">Publikasikan kabar penyaluran & kisah binaan Bogor</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {/* Category Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block">Kategori Cerita Blog *</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'PENYALURAN', label: '🍚 Penyaluran Sembako' },
                { id: 'KISAH_INSPIRATIF', label: '🌸 Kisah Ibu Berdaya' },
                { id: 'PRESTASI_YATIM', label: '🎓 Prestasi Yatim' },
                { id: 'AKADEMI_TIBERSA', label: '💡 Akademi Tibersa' },
                { id: 'LAPORAN_RTRW', label: '🏢 Laporan Mitra RT/RW' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as BlogCategory)}
                  className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    category === cat.id
                      ? 'bg-purple-50 border-purple-700 ring-2 ring-purple-600/20 text-purple-950 font-bold'
                      : 'bg-white border-stone-200 text-stone-600'
                  }`}
                >
                  <span className="text-xs font-extrabold block">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Judul Artikel Blog *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Senyum Haru Bu Ratna Terima Paket Sembako di Baranangsiang"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-purple-700 focus:outline-hidden"
            />
          </div>

          {/* Summary / Excerpt */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Ringkasan Artikel (Excerpt untuk Cuplikan & Medsos)</label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Ringkasan 1-2 kalimat yang menarik untuk pratinjau media sosial..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-purple-700 focus:outline-hidden"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Isi Lengkap Cerita & Artikel *</label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan kisah lengkap: latar belakang keluarga, kondisi ekonomi, verifikasi RT/RW, rasa syukur saat menerima bantuan, dan harapan masa depan..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-purple-700 focus:outline-hidden"
            />
          </div>

          {/* Beneficiary Name & Location */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Nama Warga Binaan</label>
              <input
                type="text"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder="Ibu Ratnasari / Rizky"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-700 mb-1 block">Kelurahan di Bogor</label>
              <input
                type="text"
                value={kelurahan}
                onChange={(e) => setKelurahan(e.target.value)}
                placeholder="Baranangsiang"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
              />
            </div>
          </div>

          {/* Photo Options: File Picker & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 block">Foto Utama Cerita Blog *</label>
              <label className="text-[11px] font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 cursor-pointer flex items-center gap-1 hover:bg-purple-100 transition-colors">
                <Upload className="w-3 h-3" />
                <span>Upload dari Galeri / Kamera</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
              </label>
            </div>

            {/* Custom URL Input */}
            <input
              type="url"
              required
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono"
            />

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {samplePhotos.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoUrl(p.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    photoUrl === p.url
                      ? 'border-purple-700 ring-2 ring-purple-500/30 scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] truncate px-1 py-0.5 text-center">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Link to Program */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Hubungkan ke Program Donasi (Donatur bisa donasi dari blog)</label>
            <select
              value={linkedProgId}
              onChange={(e) => setLinkedProgId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold"
            >
              <option value="">-- Hubungkan Otomatis ke Program Terkait --</option>
              {programs.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          {/* Hashtags */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1 block">Hashtag untuk Media Sosial (Pisahkan Koma)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="#JAYABOGOR, #BogorBerbagi, #Sedekah"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono"
            />
          </div>

          <button
            type="submit"
            id="submit-blog-post-btn"
            className="w-full bg-purple-900 hover:bg-purple-800 text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Terbitkan Artikel ke Blog Cerita Publik</span>
          </button>
        </form>
      </div>
    </div>
  );
};
