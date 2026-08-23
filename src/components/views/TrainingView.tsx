import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Heart, 
  CheckCircle2,
  DollarSign,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrainingCourse, DonationProgram } from '../../types';

interface TrainingViewProps {
  onOpenInstructorModal: () => void;
  onOpenBeneficiaryEnrollModal: (course?: TrainingCourse) => void;
  onOpenDonate: (program?: DonationProgram) => void;
}

export const TrainingView: React.FC<TrainingViewProps> = ({
  onOpenInstructorModal,
  onOpenBeneficiaryEnrollModal,
  onOpenDonate
}) => {
  const { trainingCourses = [], programs = [] } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredCourses = (trainingCourses || []).filter(c => {
    if (selectedCategory === 'ALL') return true;
    return c.category === selectedCategory;
  });

  const handleDonateHonor = (course: TrainingCourse) => {
    const matchingProg = (programs || []).find(p => p.type === 'PELATIHAN') || programs[0];
    onOpenDonate(matchingProg);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Tibersa Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 rounded-3xl text-white p-5 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-emerald-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              🎓 Akademi Tibersa
            </span>
            <span className="text-[11px] text-emerald-200 font-semibold">
              Platform Pelatihan Kemitraan
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-snug">
            Pemberdayaan Keterampilan Mandiri <span className="text-amber-300">Janda & Yatim</span>
          </h2>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Didukung oleh platform <b>Akademi Tibersa</b> (<a href="https://akademitibersa.com" target="_blank" rel="noreferrer" className="underline font-bold text-amber-200">akademitibersa.com</a>). Keterampilan kuliner khas Bogor, menjahit busana muslim, foto produk HP, dan servis vokasi.
          </p>

          {/* Direct Beneficiary & Instructor Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              id="open-beneficiary-enroll-btn"
              onClick={() => onOpenBeneficiaryEnrollModal()}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>Pendaftaran Pelatihan (Khusus Janda & Yatim)</span>
            </button>

            <button
              type="button"
              id="open-instructor-apply-btn"
              onClick={onOpenInstructorModal}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center space-x-1.5 border border-white/30 transition-all cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-amber-300" />
              <span>Daftar Jadi Pemateri (Donatur Mengajar)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'ALL', label: 'Semua Bidang' },
          { id: 'KULINER', label: '🍲 Kuliner Bogor' },
          { id: 'JAHIT', label: '✂️ Menjahit Busana' },
          { id: 'DIGITAL', label: '📱 Desain & Foto HP' },
          { id: 'USAHA_RUMAHAN', label: '🧺 Usaha Rumahan' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div className="space-y-3.5">
        {filteredCourses.map((course) => {
          const isCrowdfunded = course.feeType === 'BERBAYAR' && course.honorariumTarget > 0;
          const honorPercent = Math.min(
            100, 
            Math.round((course.honorariumCollected / (course.honorariumTarget || 1)) * 100)
          );

          return (
            <div 
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Badge & Price Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black tracking-wider uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {course.feeType === 'GRATIS' ? (
                      <span className="bg-amber-100 text-amber-950 font-black text-xs px-2.5 py-0.5 rounded-full">
                        100% Gratis Peserta
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-stone-700">
                        Honorium Didanai Donatur
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Instructor Profile */}
                <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img 
                      src={course.instructorAvatar} 
                      alt={course.instructorName} 
                      className="w-10 h-10 rounded-full object-cover border border-stone-300"
                    />
                    <div>
                      <h4 className="font-extrabold text-xs text-stone-900">
                        {course.instructorName}
                      </h4>
                      <p className="text-[10px] text-stone-500 font-medium">
                        {course.instructorTitle}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    course.instructorType === 'TIBERSA' ? 'bg-purple-100 text-purple-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {course.instructorType === 'TIBERSA' ? 'Mitra Tibersa' : 'Donatur Mengajar'}
                  </span>
                </div>

                {/* Schedule & Location Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50/50 p-2.5 rounded-2xl border border-stone-100">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{course.scheduleDate}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{course.time}</span>
                  </div>
                  <div className="col-span-2 flex items-center space-x-1.5 pt-1 border-t border-stone-200/50">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{course.location}</span>
                  </div>
                </div>

                {/* Crowdfunding progress if paid honorarium */}
                {isCrowdfunded && (
                  <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-950">Patungan Honor Pemateri:</span>
                      <span className="font-extrabold text-emerald-900">
                        Rp {course.honorariumCollected.toLocaleString('id-ID')} / Rp {course.honorariumTarget.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-700 h-full rounded-full transition-all" style={{ width: `${honorPercent}%` }}></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onOpenBeneficiaryEnrollModal(course)}
                    className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center space-x-1 shadow-md shadow-emerald-800/10 transition-all cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Daftar Ikut Kelas Ini</span>
                  </button>

                  {isCrowdfunded && (
                    <button
                      type="button"
                      onClick={() => handleDonateHonor(course)}
                      className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black py-2.5 px-3 rounded-2xl text-xs flex items-center justify-center space-x-1 transition-all cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-emerald-950" />
                      <span>Patungan</span>
                    </button>
                  )}

                  <a
                    href={course.tibersaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-2xl border border-stone-200 text-stone-500 hover:text-emerald-800 hover:bg-stone-50 transition-colors"
                    title="Buka detail di Akademi Tibersa"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
