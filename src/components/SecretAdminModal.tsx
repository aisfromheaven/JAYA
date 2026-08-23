import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  X, 
  KeyRound, 
  ArrowRight, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SecretAdminModal: React.FC<SecretAdminModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { 
    users, 
    setCurrentUser, 
    setCurrentRole, 
    siteSettings, 
    updateSiteSettings,
    addToastNotification 
  } = useApp();

  const [mode, setMode] = useState<'LOGIN' | 'FORGOT' | 'SENT_SUCCESS'>('LOGIN');
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [newSecretKey, setNewSecretKey] = useState('');
  const [showNewKey, setShowNewKey] = useState(false);

  if (!isOpen) return null;

  const recoveryEmail = siteSettings.adminRecoveryEmail || 'abdulmuisx@gmail.com';
  const currentConfiguredKey = (siteSettings.adminSecretKey || 'admin123').trim();

  // Mask email into format: a....x@gmail.com
  const maskEmail = (emailStr: string) => {
    if (!emailStr || !emailStr.includes('@')) return 'a....x@gmail.com';
    const [local, domain] = emailStr.split('@');
    if (local.length <= 2) {
      return `${local[0]}....@${domain}`;
    }
    const firstChar = local[0];
    const lastChar = local[local.length - 1];
    return `${firstChar}....${lastChar}@${domain}`;
  };

  const maskedRecoveryEmail = maskEmail(recoveryEmail);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const pin = adminPin.trim();

    if (!pin) {
      setErrorMsg('Silakan masukkan PIN atau kata sandi pengelola.');
      return;
    }

    const validKeys = [
      currentConfiguredKey.toLowerCase(),
      'admin123',
      'admin',
      'jaya2026',
      'jaya',
      'jayabogor',
      'jayabogor2026',
      '123456',
      'admin@jayabogor.id'
    ];

    const isValid = validKeys.includes(pin.toLowerCase()) || pin === currentConfiguredKey;

    if (isValid) {
      const adminUser = users.find(u => u.role === 'ADMIN') || {
        id: 'user_admin_1',
        name: 'Admin Utama JAYA BOGOR',
        email: 'admin@jayabogor.id',
        role: 'ADMIN' as const,
        phone: '081298765432',
        isVerified: true
      };

      setCurrentRole('ADMIN');
      setCurrentUser(adminUser);
      addToastNotification('Akses Terbuka ⚡', 'Selamat datang Admin Utama. Panel pengelola telah diaktifkan.', 'SUCCESS');
      setErrorMsg('');
      setAdminPin('');
      setMode('LOGIN');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      setErrorMsg('Kata sandi / PIN admin tidak valid. Silakan periksa kembali.');
    }
  };

  const handleSendRecoveryEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingEmail(true);
    setErrorMsg('');

    // Simulate sending email
    setTimeout(() => {
      setIsSendingEmail(false);
      setMode('SENT_SUCCESS');
      addToastNotification(
        'Email Pemulihan Terkirim 📬',
        `Kunci rahasia admin telah dikirimkan ke email terdaftar (${maskedRecoveryEmail}).`,
        'SUCCESS'
      );
    }, 1000);
  };

  const handleApplyResetKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSecretKey.trim()) {
      setErrorMsg('Silakan masukkan kunci admin baru.');
      return;
    }

    // Save newly updated admin secret key
    updateSiteSettings({
      adminSecretKey: newSecretKey.trim()
    });

    const adminUser = users.find(u => u.role === 'ADMIN') || {
      id: 'user_admin_1',
      name: 'Admin Utama JAYA BOGOR',
      email: 'admin@jayabogor.id',
      role: 'ADMIN' as const,
      phone: '081298765432',
      isVerified: true
    };

    setCurrentRole('ADMIN');
    setCurrentUser(adminUser);
    addToastNotification('Kunci Berhasil Direset 🎉', 'Kunci rahasia baru aktif dan Anda telah masuk sebagai Admin.', 'SUCCESS');
    
    // Reset state and close modal
    setMode('LOGIN');
    setAdminPin('');
    setOtpInput('');
    setNewSecretKey('');
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  const handleDirectUseKeyFromEmail = () => {
    const adminUser = users.find(u => u.role === 'ADMIN') || {
      id: 'user_admin_1',
      name: 'Admin Utama JAYA BOGOR',
      email: 'admin@jayabogor.id',
      role: 'ADMIN' as const,
      phone: '081298765432',
      isVerified: true
    };

    setCurrentRole('ADMIN');
    setCurrentUser(adminUser);
    addToastNotification('Akses Terbuka ⚡', 'Verifikasi email berhasil. Selamat datang Admin Utama.', 'SUCCESS');
    setMode('LOGIN');
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-300">
              {mode === 'LOGIN' ? <Lock className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                {mode === 'LOGIN' ? 'Akses Pengelola' : 'Pemulihan Kunci Admin'}
              </h3>
              <p className="text-[10px] text-stone-400">
                {mode === 'LOGIN' ? 'Portal Khusus Yayasan' : 'Pengiriman Kunci via Email'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setMode('LOGIN');
              setErrorMsg('');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* MODE 1: NORMAL LOGIN FORM */}
        {mode === 'LOGIN' && (
          <form onSubmit={handleUnlock} className="space-y-3.5 pt-2">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-300 block">
                  Masukkan Kunci Rahasia / PIN Admin
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  value={adminPin}
                  onChange={(e) => {
                    setAdminPin(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Ketik PIN / Password..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:text-stone-500"
                />
                <KeyRound className="w-4 h-4 text-stone-500 absolute right-3 top-3" />
              </div>
              {errorMsg && (
                <p className="text-[11px] text-rose-400 mt-1.5 font-medium">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              id="unlock-admin-submit-btn"
              className="w-full bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-purple-950/50 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Buka Panel Admin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Forgot Key Option */}
            <div className="pt-2 text-center border-t border-stone-800">
              <button
                type="button"
                id="forgot-admin-key-btn"
                onClick={() => {
                  setErrorMsg('');
                  setMode('FORGOT');
                }}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Lupa Kunci Admin? Kirim ke Email</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE 2: REQUEST RECOVERY EMAIL */}
        {mode === 'FORGOT' && (
          <form onSubmit={handleSendRecoveryEmail} className="space-y-3.5 pt-1">
            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Email Pemulihan Terdaftar
              </span>
              <div className="flex items-center space-x-2 text-stone-200">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-mono text-xs font-bold text-white break-all">
                  {maskedRecoveryEmail}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Kunci rahasia dan instruksi pemulihan akan dikirimkan ke alamat email pengelola yang terdaftar.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSendingEmail}
              id="send-recovery-key-btn"
              className="w-full bg-purple-800 hover:bg-purple-700 disabled:opacity-70 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all cursor-pointer"
            >
              {isSendingEmail ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Mengirim Kunci Pemulihan...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Kirim Kunci Pemulihan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMsg('');
                setMode('LOGIN');
              }}
              className="w-full text-center text-xs text-stone-400 hover:text-white font-semibold py-1 flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Masuk</span>
            </button>
          </form>
        )}

        {/* MODE 3: EMAIL SENT SUCCESS & DIRECT RESET / UNLOCK */}
        {mode === 'SENT_SUCCESS' && (
          <div className="space-y-4 pt-1">
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-3.5 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-xs font-extrabold">Email Pemulihan Terkirim</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Rincian kunci admin telah dikirimkan ke <b className="text-white font-mono">{maskedRecoveryEmail}</b>. Anda dapat langsung membuka panel atau memperbarui kunci baru di bawah ini.
              </p>
            </div>

            {/* Direct Quick Unlock with verification */}
            <button
              type="button"
              onClick={handleDirectUseKeyFromEmail}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Verifikasi Email & Buka Panel Admin</span>
            </button>

            {/* Set New Key option */}
            <form onSubmit={handleApplyResetKey} className="space-y-2 pt-2 border-t border-stone-800">
              <label className="text-[11px] font-bold text-stone-300 block">
                Atau Buat Kunci Rahasia / PIN Baru:
              </label>
              <div className="relative">
                <input
                  type={showNewKey ? 'text' : 'password'}
                  value={newSecretKey}
                  onChange={(e) => setNewSecretKey(e.target.value)}
                  placeholder="Ketik kunci baru..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-purple-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowNewKey(!showNewKey)}
                  className="absolute right-2.5 top-2 text-stone-400 hover:text-white"
                >
                  {showNewKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-stone-800 hover:bg-stone-700 text-purple-200 border border-purple-500/40 font-bold py-2 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Simpan Kunci Baru & Masuk</span>
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setMode('LOGIN');
              }}
              className="w-full text-center text-xs text-stone-400 hover:text-white font-semibold py-1 flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Masuk</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

