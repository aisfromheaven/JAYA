import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Repeat, 
  Award, 
  LogOut, 
  ShieldCheck, 
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecurringDonationCard } from '../RecurringDonationCard';

interface ProfileViewProps {
  onOpenAuth: () => void;
  setActiveView: (view: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAuth, setActiveView }) => {
  const { currentUser, transactions = [], setCurrentRole, logoutUser } = useApp();

  const myTransactions = (transactions || []).filter(t => t.userId === currentUser?.id);
  const myTotalDonated = myTransactions
    .filter(t => t.status === 'VERIFIED')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-4 pb-12">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {currentUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="font-black text-base text-stone-900 truncate">
                {currentUser.name}
              </h2>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                currentUser.role === 'ADMIN'
                  ? 'bg-purple-100 text-purple-900'
                  : currentUser.role === 'RT_RW'
                  ? 'bg-amber-100 text-amber-900'
                  : currentUser.role === 'PENERIMA'
                  ? 'bg-rose-100 text-rose-900'
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {currentUser.role === 'RT_RW' ? 'Mitra RT/RW' : currentUser.role}
              </span>
            </div>

            <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
              <Mail className="w-3.5 h-3.5 text-stone-400" /> {currentUser.email}
            </p>
            {currentUser.phone && (
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-400" /> {currentUser.phone}
              </p>
            )}
          </div>
        </div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
            <span className="text-[10px] text-stone-500 block font-semibold">Total Donasi Saya</span>
            <p className="text-sm font-black text-emerald-800">
              Rp {myTotalDonated.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
            <span className="text-[10px] text-stone-500 block font-semibold">Transaksi Berhasil</span>
            <p className="text-sm font-black text-stone-900">
              {myTransactions.length} Kali
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-1.5 pt-1">
          {currentUser.role === 'ADMIN' && (
            <button
              onClick={() => setActiveView('admin')}
              className="w-full bg-purple-900 hover:bg-purple-800 text-white p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors shadow-sm"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                Masuk ke Panel Pengelola Yayasan (Admin)
              </span>
              <ChevronRight className="w-4 h-4 text-purple-300" />
            </button>
          )}

          <button
            onClick={() => setActiveView('transparency')}
            className="w-full bg-stone-50 hover:bg-stone-100 text-stone-800 p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors border border-stone-200"
          >
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              Lihat Riwayat Donasi & Sertifikat Amal
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={onOpenAuth}
            className="w-full bg-stone-50 hover:bg-stone-100 text-stone-800 p-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-colors border border-stone-200"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              Ganti Akun / Masuk dengan Email Lain
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>
      </div>

      {/* Subscription Settings */}
      <RecurringDonationCard />
    </div>
  );
};
