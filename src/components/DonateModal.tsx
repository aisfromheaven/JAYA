import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  QrCode, 
  Building, 
  Upload, 
  CheckCircle2, 
  Copy, 
  Info, 
  ShieldCheck,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DonationProgram, Beneficiary } from '../types';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram?: DonationProgram | null;
  selectedBeneficiary?: Beneficiary | null;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  selectedProgram,
  selectedBeneficiary
}) => {
  const { programs, makeDonation, currentUser, addToastNotification } = useApp();

  const [activeProgId, setActiveProgId] = useState<string>(
    selectedProgram?.id || (programs[0] ? programs[0].id : 'prog_sembako_50k')
  );
  const [customAmount, setCustomAmount] = useState<string>('50000');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'BCA' | 'MANDIRI' | 'BANK_JABAR'>('QRIS');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorMessage, setDonorMessage] = useState('');
  const [transferProof, setTransferProof] = useState<string | null>(null);
  const [step, setStep] = useState<'INPUT' | 'PAYMENT' | 'SUCCESS'>('INPUT');
  const [copiedAccount, setCopiedAccount] = useState(false);

  // Sync if selectedProgram changes
  React.useEffect(() => {
    if (selectedProgram) {
      setActiveProgId(selectedProgram.id);
      if (selectedProgram.packagePrice) {
        setCustomAmount(selectedProgram.packagePrice.toString());
      }
    }
  }, [selectedProgram]);

  if (!isOpen) return null;

  const currentProgram = programs.find(p => p.id === activeProgId) || programs[0];

  const presetAmounts = [
    { label: 'Paket Sembako Berkah', amount: 50000, desc: 'Beras 3kg, Minyak, Telur, Mie' },
    { label: 'Paket Sembako Keluarga', amount: 100000, desc: 'Beras 5kg, Minyak 2L, Telur 1kg, Sembako Lengkap' },
    { label: 'Santunan Yatim', amount: 50000, desc: 'Saku & Nutrisi Bulanan' },
    { label: 'Santunan Janda', amount: 100000, desc: 'Nafkah & Modal Dagang' },
    { label: 'Tabungan Yatim', amount: 25000, desc: 'Buku & Seragam Sekolah' },
    { label: 'Nominal Bebas (250k)', amount: 250000, desc: 'Bantuan Skala Besar' }
  ];

  const parsedAmount = parseInt(customAmount.replace(/\D/g, ''), 10) || 0;

  const handleCopyAccount = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    addToastNotification('Disalin', 'Nomor rekening telah disalin ke papan klip.', 'INFO');
    setTimeout(() => setCopiedAccount(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTransferProof(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitDonation = () => {
    if (parsedAmount < 10000) {
      alert('Minimal donasi adalah Rp 10.000');
      return;
    }

    makeDonation({
      programId: currentProgram.id,
      beneficiaryId: selectedBeneficiary?.id,
      amount: parsedAmount,
      paymentMethod,
      transferProofUrl: transferProof || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=80',
      message: donorMessage.trim() || undefined,
      isAnonymous
    });

    setStep('SUCCESS');
  };

  const handleFinish = () => {
    setStep('INPUT');
    setDonorMessage('');
    setTransferProof(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4 fill-emerald-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">Salurkan Kebaikan Bogor</h3>
              <p className="text-[11px] text-emerald-200">100% Amanah & Transparan Bersama Mitra RT/RW</p>
            </div>
          </div>
          <button 
            id="close-donate-modal-btn"
            onClick={step === 'SUCCESS' ? handleFinish : onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {step === 'INPUT' && (
            <>
              {/* Program Selector */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 block">
                  Pilih Program Donasi
                </label>
                <select
                  id="select-program-dropdown"
                  value={activeProgId}
                  onChange={(e) => {
                    setActiveProgId(e.target.value);
                    const found = programs.find(p => p.id === e.target.value);
                    if (found?.packagePrice) {
                      setCustomAmount(found.packagePrice.toString());
                    }
                  }}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                >
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} {p.packagePrice ? `(Rp ${p.packagePrice.toLocaleString('id-ID')})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Beneficiary Highlight if any */}
              {selectedBeneficiary && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center space-x-3">
                  <img 
                    src={selectedBeneficiary.photoUrl} 
                    alt={selectedBeneficiary.name}
                    className="w-12 h-12 rounded-xl object-cover border border-amber-300" 
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                      Penerima Khusus: {selectedBeneficiary.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate mt-0.5">
                      {selectedBeneficiary.name}
                    </h4>
                    <p className="text-[11px] text-stone-600 truncate">
                      {selectedBeneficiary.rtRw}, Kel. {selectedBeneficiary.kelurahan}
                    </p>
                  </div>
                </div>
              )}

              {/* Amount Presets */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Pilihan Nominal Donasi</span>
                  <span className="text-[11px] text-emerald-700 font-medium">Min. Rp 10.000</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presetAmounts.map((preset) => {
                    const isSelected = parsedAmount === preset.amount;
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => setCustomAmount(preset.amount.toString())}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-xs'
                            : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">Rp {preset.amount.toLocaleString('id-ID')}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </div>
                        <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{preset.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Atau Masukkan Nominal Lain (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">
                    Rp
                  </span>
                  <input
                    type="text"
                    id="custom-donation-amount-input"
                    value={parsedAmount > 0 ? parsedAmount.toLocaleString('id-ID') : ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setCustomAmount(val);
                    }}
                    placeholder="Contoh: 100.000"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Donor Name & Anonymous */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-600">Donatur:</span>
                  <span className="text-xs font-bold text-stone-900">{currentUser.name}</span>
                </div>
                <label className="flex items-center space-x-2 text-xs font-semibold text-stone-700 cursor-pointer pt-1 border-t border-stone-200">
                  <input
                    type="checkbox"
                    id="anonymous-donation-checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 border-stone-300"
                  />
                  <span>Sembunyikan nama saya (Tampil sebagai Hamba Allah)</span>
                </label>
              </div>

              {/* Message / Doa */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Pesan Kebaikan / Doa (Opsional)
                </label>
                <textarea
                  id="donation-message-input"
                  rows={2}
                  value={donorMessage}
                  onChange={(e) => setDonorMessage(e.target.value)}
                  placeholder="Tuliskan doa atau dukungan untuk janda/anak yatim penerima..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs text-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                id="proceed-to-payment-btn"
                disabled={parsedAmount < 10000}
                onClick={() => setStep('PAYMENT')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-emerald-800/20 flex items-center justify-center space-x-2"
              >
                <span>Lanjut ke Pembayaran • Rp {parsedAmount.toLocaleString('id-ID')}</span>
              </button>
            </>
          )}

          {step === 'PAYMENT' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Total Donasi</span>
                  <p className="text-base font-extrabold text-emerald-950">
                    Rp {parsedAmount.toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('INPUT')}
                  className="text-xs text-emerald-700 font-bold underline"
                >
                  Ubah
                </button>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 block">
                  Pilih Metode Pembayaran
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'QRIS', label: 'QRIS (Semua E-Wallet)', icon: QrCode, desc: 'GoPay, OVO, Dana, Shopee' },
                    { id: 'BCA', label: 'Bank BCA', icon: Building, desc: 'Transfer / VA 174-00-888999-1' },
                    { id: 'MANDIRI', label: 'Bank Mandiri', icon: Building, desc: 'Transfer 133-00-555222-7' },
                    { id: 'BANK_JABAR', label: 'Bank BJB (Jabar)', icon: Building, desc: 'Transfer 001-223344-01' },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-xs'
                            : 'bg-white border-stone-200 hover:border-emerald-300 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center space-x-1.5">
                          <Icon className="w-4 h-4 text-emerald-700" />
                          <span className="text-xs font-extrabold">{m.label}</span>
                        </div>
                        <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{m.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Details View */}
              {paymentMethod === 'QRIS' ? (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-center space-y-2.5">
                  <span className="text-xs font-extrabold text-stone-800">Scan QRIS JAYA BOGOR</span>
                  <div className="bg-white p-3 rounded-xl border border-stone-300 inline-block shadow-xs">
                    {/* Simulated Dynamic QRIS SVG */}
                    <div className="w-40 h-40 bg-emerald-900 text-white rounded-lg flex flex-col items-center justify-center p-2 relative overflow-hidden">
                      <div className="absolute inset-2 bg-white rounded-md p-2 flex flex-col items-center justify-center text-stone-900">
                        <QrCode className="w-24 h-24 text-emerald-900" />
                        <span className="text-[9px] font-extrabold text-emerald-900 tracking-wider">NMID: ID1020304050</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Bisa di-scan dari BCA Mobile, GoPay, OVO, DANA, ShopeePay, LinkAja, Livin Mandiri
                  </p>
                </div>
              ) : (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-500">Nomor Rekening:</span>
                      <p className="text-sm font-extrabold text-stone-900 font-mono">
                        {paymentMethod === 'BCA' && '174-00-888999-1'}
                        {paymentMethod === 'MANDIRI' && '133-00-555222-7'}
                        {paymentMethod === 'BANK_JABAR' && '001-223344-01'}
                      </p>
                      <p className="text-[11px] text-emerald-800 font-bold">a.n. Yayasan JAYA BOGOR Berkah</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyAccount(
                        paymentMethod === 'BCA' ? '174008889991' : paymentMethod === 'MANDIRI' ? '133005552227' : '00122334401'
                      )}
                      className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedAccount ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Proof (Optional / Simulation) */}
              <div>
                <label className="text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Upload Bukti Transfer (Opsional)</span>
                  <span className="text-[10px] text-stone-400">JPG/PNG</span>
                </label>
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-3 text-center bg-stone-50/50 hover:bg-stone-50 transition-colors">
                  {transferProof ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={transferProof} alt="Bukti" className="w-10 h-10 object-cover rounded-lg border" />
                        <span className="text-xs font-bold text-emerald-700">Bukti telah dipilih</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setTransferProof(null)} 
                        className="text-xs text-rose-600 font-bold"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center space-y-1">
                      <Upload className="w-5 h-5 text-emerald-700" />
                      <span className="text-xs font-bold text-emerald-800">Pilih Foto Bukti Transfer</span>
                      <span className="text-[10px] text-stone-400">Atau konfirmasi langsung tanpa bukti</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('INPUT')}
                  className="w-1/3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl text-xs"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  id="confirm-donation-btn"
                  onClick={handleSubmitDonation}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-800/20 flex items-center justify-center space-x-1.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Konfirmasi & Kirim Donasi</span>
                </button>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-4 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-emerald-950">Alhamdulillah, Donasi Diterima!</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  Semoga menjadi amal jariyah yang membawa keberkahan bagi Anda dan keluarga.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Program:</span>
                  <span className="font-bold text-stone-900 text-right truncate max-w-[180px]">{currentProgram.title}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Nominal:</span>
                  <span className="font-extrabold text-emerald-800">Rp {parsedAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Atas Nama:</span>
                  <span className="font-semibold text-stone-900">{isAnonymous ? 'Hamba Allah' : currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status Penyaluran:</span>
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
                    Diproses ke Mitra RT/RW
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 italic">
                Anda dapat memantau dokumentasi foto penyaluran di tab <b>Laporan / Jejak Kebaikan</b>.
              </p>

              <button
                type="button"
                id="finish-donation-success-btn"
                onClick={handleFinish}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md shadow-emerald-800/20"
              >
                Selesai & Lihat Jejak Kebaikan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
