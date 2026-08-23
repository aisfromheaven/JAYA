import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Download, 
  QrCode,
  Calendar,
  Clock,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TrainingCourse } from '../types';

interface BeneficiaryTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: TrainingCourse | null;
}

export const BeneficiaryTrainingModal: React.FC<BeneficiaryTrainingModalProps> = ({
  isOpen,
  onClose,
  defaultCourse
}) => {
  const { trainingCourses, enrollInCourse, currentUser, addToastNotification } = useApp();

  const [category, setCategory] = useState<'JANDA' | 'YATIM'>(
    currentUser.beneficiaryCategory || 'JANDA'
  );
  const [name, setName] = useState(currentUser.name !== 'Admin JAYA BOGOR' && currentUser.name !== 'H. Suryadi' ? currentUser.name : '');
  const [age, setAge] = useState<number>(category === 'JANDA' ? 38 : 14);
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [rtRw, setRtRw] = useState(currentUser.rtRwNumber || 'RT 03 / RW 05');
  const [kelurahan, setKelurahan] = useState(currentUser.kelurahan || 'Baranangsiang');
  const [kecamatan, setKecamatan] = useState(currentUser.kecamatan || 'Bogor Timur');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    defaultCourse?.id || (trainingCourses[0]?.id || '')
  );
  const [motivation, setMotivation] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState<{
    id: string;
    courseTitle: string;
    participantName: string;
    category: string;
    date: string;
    time: string;
    location: string;
  } | null>(null);

  // Sync if defaultCourse changes
  React.useEffect(() => {
    if (defaultCourse) {
      setSelectedCourseId(defaultCourse.id);
    }
  }, [defaultCourse]);

  if (!isOpen) return null;

  const chosenCourse = trainingCourses.find(c => c.id === selectedCourseId) || trainingCourses[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Mohon isi nama lengkap dan nomor WhatsApp aktif.');
      return;
    }

    if (chosenCourse) {
      enrollInCourse(chosenCourse.id);
    }

    const ticket = {
      id: `JB-TR-${Date.now().toString().slice(-6)}`,
      courseTitle: chosenCourse?.title || 'Pelatihan Keterampilan Mandiri',
      participantName: name,
      category: category === 'JANDA' ? 'Janda Dhuafa' : 'Anak Yatim',
      date: chosenCourse?.scheduleDate || 'Sesuai Jadwal Akademi Tibersa',
      time: chosenCourse?.time || '13:00 - 15:30 WIB',
      location: chosenCourse?.location || 'Balai Warga & Online Akademi Tibersa'
    };

    setRegisteredTicket(ticket);
    setIsSuccess(true);
    addToastNotification(
      'Pendaftaran Pelatihan Berhasil! 🎓',
      `Selamat ${name}, Anda resmi terdaftar pada kelas ${ticket.courseTitle}.`,
      'SUCCESS'
    );
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setRegisteredTicket(null);
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
                <h3 className="font-extrabold text-sm sm:text-base">Pendaftaran Pelatihan Mandiri</h3>
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  Gratis
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">Khusus Janda Dhuafa & Anak Yatim di Wilayah Bogor</p>
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
          {isSuccess && registeredTicket ? (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-1">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-emerald-950">Pendaftaran Berhasil Dikonfirmasi!</h4>
                <p className="text-xs text-stone-600">
                  Data Anda telah masuk ke sistem JAYA BOGOR & Akademi Tibersa.
                </p>
              </div>

              {/* Admission Ticket Card */}
              <div className="bg-stone-50 border-2 border-emerald-600/30 rounded-3xl p-4 sm:p-5 space-y-3 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 bg-emerald-800 text-amber-300 font-extrabold text-[10px] px-3 py-1 rounded-bl-2xl">
                  KARTU PESERTA RESMI
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-stone-400 font-mono block">No. Registrasi: {registeredTicket.id}</span>
                  <h5 className="font-extrabold text-sm sm:text-base text-stone-900 leading-snug">
                    {registeredTicket.courseTitle}
                  </h5>
                  <p className="text-xs text-emerald-800 font-bold">
                    Peserta: {registeredTicket.participantName} ({registeredTicket.category})
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-2xl border border-stone-200">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-semibold">Jadwal Pelatihan:</span>
                    <p className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-700" /> {registeredTicket.date}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 block font-semibold">Waktu:</span>
                    <p className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-700" /> {registeredTicket.time}
                    </p>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-stone-100">
                    <span className="text-[10px] text-stone-400 block font-semibold">Lokasi / Platform:</span>
                    <p className="font-semibold text-stone-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" /> {registeredTicket.location}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-2.5 flex items-center space-x-2 text-xs text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <p className="text-[11px] leading-tight">
                    Tim pengurus RT/RW & pendamping Akademi Tibersa akan menghubungi Anda melalui WhatsApp untuk persiapan materi/bahan praktik.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md"
              >
                Selesai & Lihat Kelas Saya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Category Selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 block">Status Penerima Manfaat *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('JANDA');
                      if (age < 20) setAge(38);
                    }}
                    className={`p-2.5 rounded-2xl text-left border transition-all ${
                      category === 'JANDA'
                        ? 'bg-rose-50 border-rose-600 ring-2 ring-rose-500/20 text-rose-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">🌸 Janda Dhuafa</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Pemberdayaan usaha rumahan mandiri</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('YATIM');
                      if (age > 25) setAge(14);
                    }}
                    className={`p-2.5 rounded-2xl text-left border transition-all ${
                      category === 'YATIM'
                        ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/20 text-amber-950 font-bold'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    <span className="text-xs font-extrabold block">🎓 Anak Yatim</span>
                    <p className="text-[10px] text-stone-500 mt-0.5">Pengembangan bakat, digital & vokasi</p>
                  </button>
                </div>
              </div>

              {/* Selected Training Course */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Pilih Kelas Pelatihan *</label>
                <select
                  id="enroll-course-select"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  {trainingCourses.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.category}] {c.title} • {c.scheduleDate}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Data: Name & Age */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Nama Lengkap Peserta *</label>
                  <input
                    type="text"
                    required
                    id="enroll-participant-name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama sesuai KTP/KK"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Usia *</label>
                  <input
                    type="number"
                    required
                    id="enroll-participant-age-input"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-stone-900"
                  />
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Nomor WhatsApp Aktif / Wali *</label>
                <input
                  type="tel"
                  required
                  id="enroll-participant-phone-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890 (Untuk koordinasi jadwal & materi)"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900"
                />
              </div>

              {/* Address / RT RW Bogor */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Nomor RT/RW *</label>
                  <input
                    type="text"
                    required
                    id="enroll-participant-rtrw-input"
                    value={rtRw}
                    onChange={(e) => setRtRw(e.target.value)}
                    placeholder="Contoh: RT 03 / RW 05"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Kelurahan di Bogor *</label>
                  <input
                    type="text"
                    required
                    id="enroll-participant-kelurahan-input"
                    value={kelurahan}
                    onChange={(e) => setKelurahan(e.target.value)}
                    placeholder="Contoh: Baranangsiang"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                  />
                </div>
              </div>

              {/* Motivation / Skill Goal */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">Tujuan & Kebutuhan Usaha / Belajar</label>
                <textarea
                  rows={2}
                  id="enroll-participant-motivation-input"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="Contoh: Ingin membuka usaha katering rumahan / ingin belajar foto produk untuk jualan di WhatsApp..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-900"
                />
              </div>

              <button
                type="submit"
                id="submit-training-enrollment-btn"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-800/20 flex items-center justify-center space-x-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Kirim Pendaftaran Pelatihan (100% Gratis)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
