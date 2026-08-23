import React, { useState } from 'react';
import { SiteBrandLogo } from '../SiteBrandLogo';
import { 
  FileCheck2, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  Download, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  FileText, 
  Sparkles,
  Heart,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransparencyReport, Transaction } from '../../types';

export const TransparencyView: React.FC = () => {
  const { transparencyReports = [], transactions = [], currentUser, addToastNotification, siteSettings } = useApp();
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'REPORTS' | 'MY_FOOTPRINT'>('DASHBOARD');
  const [selectedReport, setSelectedReport] = useState<TransparencyReport | null>(null);
  const [certificateModal, setCertificateModal] = useState<Transaction | null>(null);

  // Financial calculations
  const totalIn = 52400000;
  const totalOut = 48500000;
  const currentBalance = totalIn - totalOut;
  const operationalExpense = 1200000; // 2.3% of total, well below 5% max
  const operationalPercent = ((operationalExpense / totalIn) * 100).toFixed(1);

  // User's personal verified donations
  const myDonations = (transactions || []).filter(t => t.userId === currentUser?.id);

  const handleDownloadCertificate = (tx: Transaction) => {
    setCertificateModal(tx);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-stone-900 rounded-3xl text-white p-5 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
              🛡️ 100% Transparan
            </span>
            <span className="text-[11px] text-emerald-200">
              Audit Mandiri & Jejak Penyaluran RT/RW
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black leading-snug">
            Transparansi Dana & <span className="text-amber-300">Jejak Kebaikan</span>
          </h2>

          <p className="text-xs text-emerald-100/90 leading-relaxed">
            Setiap rupiah amanah tercatat terbuka. Maksimal biaya operasional hanya <b>5%</b> untuk memastikan dana sampai utuh kepada janda dan anak yatim di Bogor.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-stone-100 p-1 rounded-2xl flex border border-stone-200">
        <button
          type="button"
          id="tab-transparency-dashboard"
          onClick={() => setActiveTab('DASHBOARD')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'DASHBOARD'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Ringkasan Kas
        </button>
        <button
          type="button"
          id="tab-transparency-reports"
          onClick={() => setActiveTab('REPORTS')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'REPORTS'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Laporan Lapangan
        </button>
        <button
          type="button"
          id="tab-transparency-footprint"
          onClick={() => setActiveTab('MY_FOOTPRINT')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'MY_FOOTPRINT'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Jejak Saya ({myDonations.length})
        </button>
      </div>

      {/* Tab 1: Financial Dashboard */}
      {activeTab === 'DASHBOARD' && (
        <div className="space-y-4">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[11px] text-stone-500 font-bold block">Total Dana Terhimpun</span>
              <p className="text-base sm:text-lg font-black text-emerald-800">
                Rp {totalIn.toLocaleString('id-ID')}
              </p>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Dari 142 Donatur
              </span>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-[11px] text-stone-500 font-bold block">Total Dana Tersalurkan</span>
              <p className="text-base sm:text-lg font-black text-amber-700">
                Rp {totalOut.toLocaleString('id-ID')}
              </p>
              <span className="text-[10px] text-stone-500 font-semibold flex items-center gap-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> 100% Tervalidasi RT/RW
              </span>
            </div>
          </div>

          {/* Operational Policy Guarantee Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-xs sm:text-sm text-stone-900">
                  Kebijakan Biaya Operasional (Maksimal 5%)
                </h3>
              </div>
              <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                Realisasi: {operationalPercent}%
              </span>
            </div>

            {/* Gauge representation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-stone-600">
                <span>Penggunaan Saat Ini: Rp {operationalExpense.toLocaleString('id-ID')}</span>
                <span>Batas Maksimum: 5.0%</span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
                <div 
                  className="bg-emerald-600 h-full rounded-full" 
                  style={{ width: `${(parseFloat(operationalPercent) / 5) * 100}%` }} 
                />
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                Seluruh sisa saldo <b>Rp {currentBalance.toLocaleString('id-ID')}</b> dialokasikan untuk jadwal penyaluran sembako & SPP yatim minggu depan.
              </p>
            </div>
          </div>

          {/* Fund Allocation Breakdown Chart Simulation */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 space-y-3 shadow-xs">
            <h3 className="font-extrabold text-xs sm:text-sm text-stone-900">
              Alokasi Penyaluran Sesuai Kebutuhan
            </h3>

            <div className="space-y-2 text-xs">
              {[
                { label: '🍚 Paket Sembako Bulanan', amount: 24500000, percent: 50.5, color: 'bg-emerald-600' },
                { label: '🎓 Tabungan Pendidikan Yatim (Buku Mimpi)', amount: 14200000, percent: 29.3, color: 'bg-amber-500' },
                { label: '🌸 Santunan Langsung Janda Dhuafa', amount: 6800000, percent: 14.0, color: 'bg-rose-500' },
                { label: '💡 Pelatihan Keterampilan Tibersa', amount: 3000000, percent: 6.2, color: 'bg-purple-600' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-stone-800">{item.label}</span>
                    <span className="font-bold text-stone-900">
                      Rp {item.amount.toLocaleString('id-ID')} ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Field Reports */}
      {activeTab === 'REPORTS' && (
        <div className="space-y-3.5">
          {transparencyReports.map((report) => (
            <div
              key={report.id}
              id={`transparency-report-${report.id}`}
              className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    {report.type}
                  </span>
                  <h4 className="font-extrabold text-sm sm:text-base text-stone-900 mt-1">
                    {report.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    <span>•</span>
                    <MapPin className="w-3 h-3 text-emerald-700" /> {report.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-bold">Total Disalurkan</span>
                  <span className="font-black text-sm text-emerald-800">
                    Rp {report.amountSpent.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Photo Evidence */}
              {report.photos && report.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {report.photos.map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo}
                      alt="Dokumentasi"
                      className="w-full h-28 object-cover rounded-xl border border-stone-200"
                    />
                  ))}
                </div>
              )}

              {/* Beneficiary List Tagged */}
              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-100 space-y-1.5 text-xs">
                <span className="font-bold text-stone-700 block text-[11px]">
                  Penerima Manfaat Lapangan ({report.beneficiaryNames.length} Warga):
                </span>
                <div className="flex flex-wrap gap-1">
                  {report.beneficiaryNames.map((name, idx) => (
                    <span key={idx} className="bg-white border border-stone-200 px-2 py-0.5 rounded-md text-[11px] text-stone-800">
                      ✓ {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified by RT/RW Badge */}
              <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-[11px]">
                <span className="text-stone-500 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verifikator: <b>{report.verifiedByRtRw}</b>
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Surat Berita Acara Sah
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Jejak Kebaikan Donatur */}
      {activeTab === 'MY_FOOTPRINT' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-amber-950">Jejak Kebaikan Pribadi</h4>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                Pantau setiap donasi Anda, status verifikasi penyaluran, serta unduh <b>Sertifikat Amal Digital</b>.
              </p>
            </div>
          </div>

          {myDonations.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 text-stone-500 text-xs space-y-2">
              <p>Anda belum memiliki riwayat donasi.</p>
              <p className="text-[11px] text-stone-400">Mulailah kebaikan pertama Anda dengan berdonasi paket sembako atau tabungan yatim.</p>
            </div>
          ) : (
            myDonations.map((tx) => (
              <div
                key={tx.id}
                id={`my-donation-${tx.id}`}
                className="bg-white rounded-3xl border border-stone-200 p-4 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono">ID: {tx.id}</span>
                    <h4 className="font-extrabold text-sm text-stone-900 mt-0.5">
                      {tx.programTitle}
                    </h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-800 block">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tx.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {tx.status === 'VERIFIED' ? '✓ Tersalurkan' : 'Proses Verifikasi'}
                    </span>
                  </div>
                </div>

                {/* Proof & Notes if any */}
                {tx.message && (
                  <p className="text-xs bg-stone-50 p-2.5 rounded-xl border border-stone-100 italic text-stone-600">
                    "{tx.message}"
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-2.5">
                  <span className="text-[11px] text-stone-500">
                    Metode: <b>{tx.paymentMethod}</b>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadCertificate(tx)}
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Lihat Sertifikat Digital</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Certificate Modal */}
      {certificateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-center border-4 border-amber-400 relative">
            <button
              onClick={() => setCertificateModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-sm font-bold"
            >
              ✕
            </button>

            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <SiteBrandLogo size="xl" />
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full">
                SERTIFIKAT AMAL & APRESIASI
              </span>
              <h3 className="text-lg font-black text-emerald-950 mt-2">
                {siteSettings.siteTitle || 'JAYA BOGOR'}
              </h3>
              <p className="text-xs text-stone-500">{siteSettings.siteTagline || 'Janda Yatim Bogor'} • Donasi, Berdaya, dan Cerdas</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 text-xs text-stone-800">
              <p className="text-stone-600">Diberikan sebagai bukti amal kebaikan kepada:</p>
              <p className="text-base font-black text-emerald-900">
                {certificateModal.donorName}
              </p>
              <p className="text-stone-600">
                Telah menyalurkan donasi sebesar:
              </p>
              <p className="text-xl font-extrabold text-amber-700">
                Rp {certificateModal.amount.toLocaleString('id-ID')}
              </p>
              <p className="text-[11px] text-stone-500">
                Untuk Program: <b>{certificateModal.programTitle}</b>
              </p>
              <p className="text-[10px] text-stone-400 pt-1">
                Tercatat pada {new Date(certificateModal.createdAt).toLocaleDateString('id-ID', { dateStyle: 'full' })}
              </p>
            </div>

            <p className="text-[11px] text-stone-500 italic">
              "Semoga Allah membalas dengan kebaikan yang berlipat ganda, melapangkan rezeki, dan membawa keberkahan keluarga."
            </p>

            <button
              onClick={() => {
                addToastNotification('Disimpan', 'Sertifikat amal digital berhasil diunduh.', 'SUCCESS');
                setCertificateModal(null);
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Sertifikat (Gambar / PDF)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
