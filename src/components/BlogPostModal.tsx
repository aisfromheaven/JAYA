import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Heart, 
  Send, 
  Clock, 
  Sparkles, 
  Tag, 
  Building2, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  UserCheck,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { StoryFeedPost, DonationProgram } from '../types';
import { useApp } from '../context/AppContext';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: StoryFeedPost | null;
  onOpenShare: (post: StoryFeedPost) => void;
  onOpenDonate: (program?: DonationProgram) => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  isOpen,
  onClose,
  post,
  onOpenShare,
  onOpenDonate
}) => {
  const { likeStoryPost, addStoryComment, programs, currentUser } = useApp();
  const [commentText, setCommentText] = useState('');

  if (!isOpen || !post) return null;

  const isLiked = post.likedByUserIds.includes(currentUser.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addStoryComment(post.id, commentText.trim());
    setCommentText('');
  };

  const handleDonateForStory = () => {
    if (post.linkedProgramId) {
      const match = programs.find(p => p.id === post.linkedProgramId);
      if (match) {
        onOpenDonate(match);
        return;
      }
    }
    onOpenDonate(programs[0]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[94vh]"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
              {post.category ? post.category.replace('_', ' ') : 'Kabar Cerita'}
            </span>
            <span className="text-[11px] text-emerald-200 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> {post.readingTime || '3 menit baca'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => onOpenShare(post)}
              className="bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bagikan</span>
            </button>
            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-stone-800 flex-1">
          {/* Article Header & Title */}
          <div className="space-y-2">
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-stone-900 tracking-tight leading-snug">
              {post.title}
            </h1>

            {/* Author Strip */}
            <div className="flex items-center justify-between border-y border-stone-100 py-2 text-xs text-stone-500">
              <div className="flex items-center space-x-2.5">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-9 h-9 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-stone-900 text-xs">{post.authorName}</span>
                    <span className="bg-purple-100 text-purple-900 font-black text-[9px] px-1.5 py-0.2 rounded-md">
                      {post.authorRole === 'ADMIN' ? 'Admin JAYA BOGOR' : post.authorRole}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    <span>•</span>
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {post.kelurahan}, {post.kecamatan}
                  </span>
                </div>
              </div>

              {post.beneficiaryName && (
                <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-bold px-2 py-1 rounded-lg">
                  Warga: {post.beneficiaryName}
                </span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {post.photoUrl && (
            <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs">
              <img
                src={post.photoUrl}
                alt={post.title}
                className="w-full max-h-80 object-cover"
              />
              <div className="p-2 bg-stone-50 text-[10px] text-stone-500 italic border-t border-stone-100 text-center">
                Dokumentasi Lapangan Resmi JAYA BOGOR • {post.kelurahan}, Kota/Kab Bogor
              </div>
            </div>
          )}

          {/* Summary Quote Box if available */}
          {post.summary && (
            <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border-l-4 border-emerald-700 p-3.5 rounded-r-2xl text-xs sm:text-sm italic text-stone-700 leading-relaxed font-medium">
              "{post.summary}"
            </div>
          )}

          {/* Main Article Content Paragraphs */}
          <div className="prose prose-stone text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3 font-normal whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags if any */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="bg-stone-100 text-stone-600 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-stone-200/60"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}

          {/* Direct Donation Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                🌿 Program Terkait
              </span>
              <span className="text-xs text-emerald-200 font-medium">Salurkan kepedulian Anda langsung</span>
            </div>

            <h4 className="font-extrabold text-sm sm:text-base text-white leading-snug">
              {post.linkedProgramTitle || 'Donasi Paket Sembako & Santunan Janda Yatim Bogor'}
            </h4>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Setiap donasi Anda disalurkan secara transparan dan diverifikasi pengurus RT/RW setempat.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                id="blog-modal-donate-btn"
                onClick={handleDonateForStory}
                className="flex-1 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-emerald-950 font-extrabold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-emerald-950" />
                <span>Salurkan Donasi Mulai Rp 10.000</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenShare(post)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>

          {/* Social Support & Comments Section */}
          <div className="pt-2 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <button
                type="button"
                id={`blog-like-btn-${post.id}`}
                onClick={() => likeStoryPost(post.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isLiked
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
                <span>{post.likesCount} Dukungan Doa</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenShare(post)}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan ke WA / Medsos</span>
              </button>
            </div>

            {/* Comments Stream */}
            <div className="space-y-2 pt-1">
              <h5 className="font-extrabold text-xs text-stone-800 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                Pesan Semangat & Doa Kebaikan ({post.comments.length})
              </h5>

              <div className="space-y-2">
                {post.comments.map(c => (
                  <div key={c.id} className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-stone-900">{c.userName}</span>
                      <span className="text-[10px] text-stone-400">
                        {new Date(c.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-stone-700">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-1">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Kirimkan doa dan kata semangat..."
                  className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
