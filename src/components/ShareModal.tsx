import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Copy, 
  Check, 
  Mail, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { StoryFeedPost } from '../types';
import { useApp } from '../context/AppContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: StoryFeedPost | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, post }) => {
  const { addToastNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const [igCopied, setIgCopied] = useState(false);
  const [tiktokCopied, setTiktokCopied] = useState(false);

  if (!isOpen || !post) return null;

  // Derive direct share URL
  const appBaseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${appBaseUrl}#cerita-${post.id}`;
  const shareTitle = `[JAYA BOGOR] ${post.title}`;
  const shareText = `Baca kabar inspiratif: "${post.title}" di JAYA BOGOR (Janda Yatim Bogor).\n\n${post.summary || post.content.slice(0, 140)}...\n\nMari bergotong royong bersama: ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      addToastNotification('Tautan Disalin! 📋', 'Tautan cerita blog telah disalin ke clipboard.', 'SUCCESS');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      addToastNotification('Gagal Menyalin', 'Silakan salin manual tautan di bawah.', 'INFO');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled or failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsApp = () => {
    const waText = encodeURIComponent(`*${post.title}*\n\n_${post.summary || post.content.slice(0, 150)}..._\n\nBaca selengkapnya & dukung warga binaan di platform resmi *JAYA BOGOR* (Janda Yatim Bogor):\n👉 ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Cerita Inspiratif: ${post.title} - JAYA BOGOR`);
    const body = encodeURIComponent(`Halo Sahabat,\n\nSaya ingin membagikan cerita kabar lapangan dari JAYA BOGOR:\n\n"${post.title}"\n\n${post.content}\n\nTautan lengkap: ${shareUrl}\n\nSalam hangat,\nJAYA BOGOR (Janda Yatim Bogor)`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleTwitter = () => {
    const tweetText = encodeURIComponent(`"${post.title}" - Kabar dan cerita binaan Janda & Yatim di Bogor. Mari peduli dan berdaya bersama JAYA BOGOR: ${shareUrl} #JAYABOGOR #BogorBerbagi`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleCopyInstagramCaption = async () => {
    const igCaption = `🌿 CERITA BINAAN JAYA BOGOR: ${post.title}\n\n"${post.summary || post.content.slice(0, 200)}..."\n\nMari bersama gotong royong memuliakan janda dhuafa dan tabungan pendidikan anak yatim di seluruh pelosok Bogor.\n\n🔗 Baca artikel lengkap & salurkan donasi via link di Bio!\n\n#JAYABOGOR #JandaYatimBogor #BogorBerbagi #SedekahBogor #AkademiTibersa #BukuMimpi`;
    try {
      await navigator.clipboard.writeText(igCaption);
      setIgCopied(true);
      addToastNotification('Caption Instagram Disalin! 📸', 'Teks caption Feed / Story siap ditempel di Instagram.', 'SUCCESS');
      setTimeout(() => setIgCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const handleCopyTikTokCaption = async () => {
    const tiktokCaption = `Kisah nyata binaan Janda & Yatim Bogor: ${post.title} 🌿 Donasi & kabar lengkap cek link di Bio! #JAYABOGOR #BogorBerbagi #Sedekah #KisahInspiratif`;
    try {
      await navigator.clipboard.writeText(tiktokCaption);
      setTiktokCopied(true);
      addToastNotification('Teks TikTok Disalin! 🎵', 'Caption untuk video / bio TikTok siap digunakan.', 'SUCCESS');
      setTimeout(() => setTiktokCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">Bagikan Cerita Blog</h3>
              <p className="text-[11px] text-emerald-200">Sebarkan kabar kebaikan ke media sosial & keluarga</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Post Preview Card */}
          <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 flex items-center space-x-3">
            {post.photoUrl && (
              <img 
                src={post.photoUrl} 
                alt={post.title}
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0" 
              />
            )}
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md uppercase">
                {post.category?.replace('_', ' ') || 'Blog Cerita'}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 line-clamp-2 mt-1 leading-snug">
                {post.title}
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                Oleh {post.authorName} • {post.readingTime || '3 menit baca'}
              </p>
            </div>
          </div>

          {/* Copy Link Input Bar */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-1.5 block">Tautan Langsung Cerita</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-800 font-mono select-all focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Share Target Channels Grid */}
          <div>
            <label className="text-xs font-bold text-stone-700 mb-2 block">Pilih Media Sosial / Kanal Berbagi</label>
            
            <div className="grid grid-cols-4 gap-2.5">
              {/* WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all text-emerald-950 shadow-2xs hover:scale-103 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-xs">
                  💬
                </div>
                <span className="text-[11px] font-extrabold mt-1.5 whitespace-nowrap">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={handleFacebook}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all text-blue-950 shadow-2xs hover:scale-103 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold shadow-xs">
                  📘
                </div>
                <span className="text-[11px] font-extrabold mt-1.5 whitespace-nowrap">Facebook</span>
              </button>

              {/* Twitter / X */}
              <button
                type="button"
                onClick={handleTwitter}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-all text-stone-900 shadow-2xs hover:scale-103 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-black shadow-xs">
                  𝕏
                </div>
                <span className="text-[11px] font-extrabold mt-1.5 whitespace-nowrap">X / Twitter</span>
              </button>

              {/* Email */}
              <button
                type="button"
                onClick={handleEmail}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all text-amber-950 shadow-2xs hover:scale-103 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-base font-bold shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-extrabold mt-1.5 whitespace-nowrap">Email</span>
              </button>
            </div>
          </div>

          {/* Special Cards for Instagram & TikTok (Story & Feed Copy Formats) */}
          <div className="space-y-2 pt-1 border-t border-stone-200">
            <label className="text-xs font-bold text-stone-700 block">Format Siap Tempel untuk Instagram & TikTok</label>

            {/* Instagram Story & Feed Box */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3 border border-purple-200/80 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-xs shrink-0">
                  📸
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-xs text-purple-950 leading-tight">Instagram (Feed & Story)</h5>
                  <p className="text-[10px] text-stone-600 truncate">Salin caption rapi + link bio untuk IG Post</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyInstagramCaption}
                className="bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl shrink-0 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
              >
                {igCopied ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                <span>{igCopied ? 'Tersalin' : 'Salin Teks'}</span>
              </button>
            </div>

            {/* TikTok Bio & Video Caption */}
            <div className="bg-stone-900 text-white rounded-2xl p-3 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-sm font-bold shrink-0">
                  🎵
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-xs text-stone-100 leading-tight">TikTok (Caption & Bio)</h5>
                  <p className="text-[10px] text-stone-400 truncate">Salin teks ringkas dan tautan video</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyTikTokCaption}
                className="bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-xl shrink-0 transition-all border border-stone-700 flex items-center gap-1 cursor-pointer"
              >
                {tiktokCopied ? <Check className="w-3 h-3 text-amber-300" /> : <Copy className="w-3 h-3" />}
                <span>{tiktokCopied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Native Smartphone Share button if available */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-emerald-800" />
              <span>Buka Menu Berbagi Sistem Ponsel</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
