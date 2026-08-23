import React from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Heart, 
  Gift, 
  Compass,
  CheckCircle,
  MapPin,
  Calendar
} from 'lucide-react';
import { Beneficiary } from '../types';

interface BukuMimpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiary: Beneficiary | null;
  onDonateToChild: (beneficiary: Beneficiary) => void;
}

export const BukuMimpiModal: React.FC<BukuMimpiModalProps> = ({
  isOpen,
  onClose,
  beneficiary,
  onDonateToChild
}) => {
  if (!isOpen || !beneficiary) return null;

  const dream = beneficiary.dreamBook;
  const target = beneficiary.schoolYearTarget || 2500000;
  const current = beneficiary.currentEducationSavings || 0;
  const progressPercent = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header with warm story visual */}
        <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-800 text-white p-5 pb-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3.5">
            <img 
              src={beneficiary.photoUrl} 
              alt={beneficiary.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-200" /> Buku Mimpi & Tabungan Yatim
              </span>
              <h3 className="text-lg font-extrabold truncate text-white mt-0.5">
                {beneficiary.name}
              </h3>
              <p className="text-xs text-amber-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {beneficiary.rtRw}, Kel. {beneficiary.kelurahan}, Bogor ({beneficiary.age} Tahun)
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Progress Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-700 flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-emerald-700" />
                Target Tabungan Biaya Sekolah (1 Tahun)
              </span>
              <span className="font-extrabold text-emerald-800">{progressPercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Terkumpul: <b className="text-emerald-900">Rp {current.toLocaleString('id-ID')}</b>
              </span>
              <span className="text-stone-500">
                Target: <b>Rp {target.toLocaleString('id-ID')}</b>
              </span>
            </div>
          </div>

          {/* Dream Details */}
          {dream ? (
            <div className="space-y-3.5">
              {/* Dream Career */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
                <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-xs mb-1">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>CITA-CITA & IMPIAN MASA DEPAN</span>
                </div>
                <p className="text-sm font-bold text-stone-900">
                  {dream.dreamCareer}
                </p>
                {dream.gradeLevel && (
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Pendidikan saat ini: {dream.gradeLevel}
                  </p>
                )}
                {dream.favoriteQuote && (
                  <p className="text-xs text-amber-900/90 italic mt-2 bg-white/70 p-2 rounded-xl border border-amber-200">
                    "{dream.favoriteQuote}"
                  </p>
                )}
              </div>

              {/* Desired Books */}
              {dream.desiredBooks && dream.desiredBooks.length > 0 && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5">
                  <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs mb-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>BUKU YANG INGIN DIBACA & DIPELAJARI</span>
                  </div>
                  <ul className="space-y-1.5">
                    {dream.desiredBooks.map((book, idx) => (
                      <li key={idx} className="text-xs text-stone-800 flex items-start space-x-2 bg-white p-2 rounded-xl border border-emerald-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Wishlist item */}
              {dream.wishList && (
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5">
                  <div className="flex items-center space-x-2 text-purple-900 font-extrabold text-xs mb-1">
                    <Gift className="w-4 h-4 text-purple-700" />
                    <span>PERLENGKAPAN SEKOLAH YANG DIBUTUHKAN</span>
                  </div>
                  <p className="text-xs text-stone-800 font-medium">
                    {dream.wishList}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-stone-500 italic text-center py-2">
              Buku mimpi sedang dalam proses pengisian oleh pendamping RT/RW.
            </p>
          )}

          {/* Child story context */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 text-xs space-y-1 text-stone-600">
            <span className="font-bold text-stone-800 block text-[11px]">Kisah & Verifikasi RT/RW:</span>
            <p>{beneficiary.story}</p>
            <p className="text-[10px] text-stone-400 pt-1">
              Didaftarkan & Diverifikasi oleh: {beneficiary.registeredByRtRwName}
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center space-x-2 shrink-0">
          <button
            onClick={onClose}
            className="w-1/3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-3 rounded-xl text-xs"
          >
            Tutup
          </button>
          <button
            id="donate-to-child-btn"
            onClick={() => {
              onClose();
              onDonateToChild(beneficiary);
            }}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-800/20 flex items-center justify-center space-x-1.5"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Isi Tabungan Pendidikan (Min. 25rb)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
