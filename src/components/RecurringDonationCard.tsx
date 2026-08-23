import React, { useState } from 'react';
import { 
  Repeat, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RecurringDonationCard: React.FC = () => {
  const { currentUser, toggleSubscription } = useApp();

  const subscription = currentUser.subscription;
  const isSubscribed = subscription?.active || false;

  const [selectedAmount, setSelectedAmount] = useState<number>(subscription?.amount || 50000);
  const [billingDay, setBillingDay] = useState<1 | 15>(subscription?.billingDay || 1);
  const [targetType, setTargetType] = useState<'SEMBAKO' | 'YATIM' | 'JANDA' | 'PELATIHAN' | 'UMUM'>(
    subscription?.targetType || 'SEMBAKO'
  );

  const amounts = [10000, 25000, 50000, 100000];

  const handleToggle = () => {
    toggleSubscription({
      active: !isSubscribed,
      amount: selectedAmount,
      billingDay,
      targetType
    });
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-emerald-700/50 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md">
            <Repeat className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-amber-400/30">
              Sedekah Istiqomah
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">Donasi Berlangganan</h3>
          </div>
        </div>

        {/* Active badge */}
        {isSubscribed ? (
          <span className="bg-amber-400 text-emerald-950 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
          </span>
        ) : (
          <span className="bg-white/10 text-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
            1-Tap Aktivasi
          </span>
        )}
      </div>

      <p className="text-xs text-emerald-100/90 mt-2.5 leading-relaxed relative z-10">
        Otomatisasi kebaikan bulanan Anda untuk kebutuhan sembako dan tabungan sekolah anak yatim di Bogor.
      </p>

      {/* Configuration if not active or modifying */}
      <div className="mt-4 space-y-3.5 relative z-10 bg-emerald-950/50 backdrop-blur-xs p-3.5 rounded-2xl border border-emerald-700/40">
        {/* Nominal selection */}
        <div>
          <label className="text-[11px] font-bold text-emerald-200 block mb-1.5">
            Pilih Nominal Bulanan (Rp 10rb - 100rb)
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                id={`recurring-amt-${amt}`}
                disabled={isSubscribed}
                onClick={() => setSelectedAmount(amt)}
                className={`py-2 px-1 rounded-xl text-center font-extrabold text-xs transition-all ${
                  selectedAmount === amt
                    ? 'bg-amber-400 text-emerald-950 shadow-md ring-2 ring-amber-300'
                    : 'bg-emerald-900/80 text-white hover:bg-emerald-800 disabled:opacity-50'
                }`}
              >
                {amt >= 1000 ? `${amt / 1000}rb` : amt}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Day */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <label className="text-[11px] font-bold text-emerald-200 block mb-1">Jadwal Penarikan</label>
            <div className="flex rounded-xl overflow-hidden border border-emerald-700">
              <button
                type="button"
                id="recurring-day-1"
                disabled={isSubscribed}
                onClick={() => setBillingDay(1)}
                className={`flex-1 py-1.5 text-center font-bold ${
                  billingDay === 1 ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-200'
                }`}
              >
                Tgl 1
              </button>
              <button
                type="button"
                id="recurring-day-15"
                disabled={isSubscribed}
                onClick={() => setBillingDay(15)}
                className={`flex-1 py-1.5 text-center font-bold ${
                  billingDay === 15 ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-200'
                }`}
              >
                Tgl 15
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-emerald-200 block mb-1">Target Fokus</label>
            <select
              id="recurring-target-type-select"
              disabled={isSubscribed}
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as any)}
              className="w-full bg-emerald-900 border border-emerald-700 text-white text-xs rounded-xl py-1.5 px-2 font-bold focus:outline-hidden disabled:opacity-50"
            >
              <option value="SEMBAKO">Paket Sembako</option>
              <option value="YATIM">Tabungan Yatim</option>
              <option value="JANDA">Santunan Janda</option>
              <option value="PELATIHAN">Pelatihan Tibersa</option>
              <option value="UMUM">Paling Membutuhkan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Activation Button */}
      <button
        type="button"
        id="toggle-recurring-subscription-btn"
        onClick={handleToggle}
        className={`w-full mt-3.5 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center space-x-2 shadow-lg relative z-10 ${
          isSubscribed
            ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-900/30'
            : 'bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-emerald-950 shadow-amber-950/20'
        }`}
      >
        {isSubscribed ? (
          <span>Hentikan Donasi Otomatis Bulanan</span>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-emerald-950" />
            <span>Aktifkan Donasi Rutin (Rp {selectedAmount.toLocaleString('id-ID')}/bln)</span>
          </>
        )}
      </button>
    </div>
  );
};
