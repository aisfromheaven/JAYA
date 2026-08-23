import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  ExternalLink,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface InstructorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructorModal: React.FC<InstructorModalProps> = ({ isOpen, onClose }) => {
  const { applyAsInstructor, currentUser } = useApp();

  const [skill, setSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [proposedTopic, setProposedTopic] = useState('');
  const [feePreference, setFeePreference] = useState<'GRATIS' | 'BERBAYAR'>('GRATIS');
  const [proposedHonorarium, setProposedHonorarium] = useState<string>('500000');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skill.trim() || !proposedTopic.trim()) {
      alert('Mohon isi keahlian dan topik kelas yang ingin diajarkan.');
      return;
    }

    applyAsInstructor({
      skill,
      experience,
      portfolioUrl: portfolioUrl.trim() || undefined,
      proposedTopic,
      feePreference,
      proposedHonorarium: feePreference === 'BERBAYAR' ? parseInt(proposedHonorarium, 10) || 500000 : 0
    });

    setIsSubmitted(true);
  };

  const handleFinish = () => {
    setIsSubmitted(false);
    setSkill('');
    setExperience('');
    setPortfolioUrl('');
    setProposedTopic('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-lg">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">Jadi Pemateri JAYA BOGOR</h3>
                <span className="bg-amber-400/90 text-emerald-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Akademi Tibersa
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">Bagikan Keterampilan & Berdayakan Janda / Yatim Bogor</p>
            </div>
          </div>
          <button 
            onClick={isSubmitted ? handleFinish : onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-emerald-950">Pendaftaran Pemateri Berhasil!</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  Admin JAYA BOGOR & Tim Akademi Tibersa akan meninjau materi kelas Anda. Setelah disetujui, kelas akan tampil di platform dan donasi honorarium akan dibuka.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-xs text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Topik Kelas:</span>
                  <span className="font-bold text-stone-900 truncate max-w-[200px]">{proposedTopic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Skema Biaya:</span>
                  <span className="font-bold text-emerald-800">
                    {feePreference === 'GRATIS' ? 'Relawan Sukarela (Gratis)' : `Berbayar (Honor Target Rp ${parseInt(proposedHonorarium).toLocaleString('id-ID')})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    Menunggu Verifikasi Admin
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all"
              >
                Selesai & Lihat Daftar Kelas
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Partner Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start space-x-2.5">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 leading-relaxed">
                  Platform pelatihan disediakan <b>GRATIS</b> oleh <b>Akademi Tibersa</b> (<a href="https://akademitibersa.com" target="_blank" rel="noreferrer" className="underline font-bold">akademitibersa.com</a>). Anda dapat mengajar secara sukarela atau menetapkan honor yang didanai melalui crowdfunding donatur.
                </div>
              </div>

              {/* Topik Pelatihan */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Judul / Topik Pelatihan yang Ingin Diajarkan *
                </label>
                <input
                  type="text"
                  required
                  id="instructor-topic-input"
                  value={proposedTopic}
                  onChange={(e) => setProposedTopic(e.target.value)}
                  placeholder="Contoh: Pembuatan Kue Basah Khas Bogor / Pemasaran WhatsApp"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Keahlian & Bidang */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Bidang Keahlian Anda *
                </label>
                <input
                  type="text"
                  required
                  id="instructor-skill-input"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="Contoh: Kuliner Tradisional, Menjahit, Digital Marketing, Desain Canva"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Pengalaman */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Pengalaman Singkat / Latar Belakang
                </label>
                <textarea
                  rows={2}
                  id="instructor-experience-input"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Contoh: 4 tahun mengelola katering rumahan di Bogor, praktisi menjahit butik, dsb."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Portfolio / Media Sosial Link */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Tautan Portofolio / Instagram / LinkedIn (Opsional)
                </label>
                <input
                  type="url"
                  id="instructor-portfolio-input"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://instagram.com/akun_anda"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Fee Preference */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 block">
                  Pengaturan Biaya / Skema Honor Pelatihan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeePreference('GRATIS')}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      feePreference === 'GRATIS'
                        ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">🌱 GRATIS (Relawan)</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Berbagi ilmu sukarela tanpa honorarium</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeePreference('BERBAYAR')}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      feePreference === 'BERBAYAR'
                        ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/20 text-amber-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">💰 BERBAYAR</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Didanai donatur crowdfunding JAYA BOGOR</p>
                  </button>
                </div>
              </div>

              {/* If Paid: Target Honorarium */}
              {feePreference === 'BERBAYAR' && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 space-y-1.5">
                  <label className="text-xs font-bold text-amber-950 block">
                    Usulan Target Honor / Biaya Pelatihan (Rp)
                  </label>
                  <input
                    type="number"
                    value={proposedHonorarium}
                    onChange={(e) => setProposedHonorarium(e.target.value)}
                    placeholder="Contoh: 1000000"
                    className="w-full bg-white border border-amber-300 rounded-lg px-3 py-2 text-xs font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                  <p className="text-[10px] text-amber-800">
                    *Dana ini akan digalang melalui program donasi pelatihan agar peserta (janda/yatim) tetap dapat belajar secara GRATIS.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-instructor-application-btn"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-800/20 flex items-center justify-center space-x-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Ajukan Diri Sebagai Pemateri</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
