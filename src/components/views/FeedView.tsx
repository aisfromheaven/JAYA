import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  Share2, 
  PlusCircle,
  MessageCircle,
  Clock,
  Search,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Calendar,
  MapPin,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StoryFeedPost, DonationProgram, BlogCategory } from '../../types';
import { ShareModal } from '../ShareModal';
import { BlogPostModal } from '../BlogPostModal';

interface FeedViewProps {
  onOpenCreateStory: () => void;
  onOpenDonate: (program?: DonationProgram) => void;
}

export const FeedView: React.FC<FeedViewProps> = ({ 
  onOpenCreateStory, 
  onOpenDonate 
}) => {
  const { storyPosts = [], likeStoryPost, programs = [], currentUser } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('SEMUA');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [selectedPostForShare, setSelectedPostForShare] = useState<StoryFeedPost | null>(null);
  const [selectedPostForReading, setSelectedPostForReading] = useState<StoryFeedPost | null>(null);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'SEMUA', label: 'Semua Artikel', icon: '📖' },
    { id: 'PENYALURAN', label: 'Penyaluran Sembako', icon: '🍚' },
    { id: 'KISAH_INSPIRATIF', label: 'Kisah Ibu Berdaya', icon: '🌸' },
    { id: 'PRESTASI_YATIM', label: 'Prestasi Yatim', icon: '🎓' },
    { id: 'AKADEMI_TIBERSA', label: 'Akademi Tibersa', icon: '💡' },
    { id: 'LAPORAN_RTRW', label: 'Laporan RT/RW', icon: '🏢' },
  ];

  const filteredPosts = (storyPosts || []).filter(post => {
    const matchesCategory = selectedCategory === 'SEMUA' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.beneficiaryName && post.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleOpenShare = (post: StoryFeedPost) => {
    setSelectedPostForShare(post);
  };

  const handleOpenReading = (post: StoryFeedPost) => {
    setSelectedPostForReading(post);
  };

  const handleDonateForStory = (post: StoryFeedPost, e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div className="space-y-4 pb-12">
      {/* Blog Hero Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-emerald-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
                📰 Blog & Kabar Binaan
              </span>
              <span className="text-[11px] text-emerald-200 font-medium">JAYA BOGOR</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-tight">
              Kabar Lapangan & Kisah Inspiratif
            </h2>
            <p className="text-xs text-emerald-100/80 max-w-sm">
              Dokumentasi nyata penyaluran sembako, tabungan pendidikan yatim, dan pelatihan ibu berdaya se-Bogor.
            </p>
          </div>

          {/* Admin Create Article Button */}
          {currentUser.role === 'ADMIN' ? (
            <button
              type="button"
              id="admin-write-blog-btn"
              onClick={onOpenCreateStory}
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs px-3.5 py-2.5 rounded-2xl flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tulis Artikel</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center space-x-1 text-[11px] text-emerald-200 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Verifikasi Resmi Admin</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative z-10 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel kabar, nama warga, atau kelurahan..."
              className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-stone-900 placeholder:text-stone-300 focus:placeholder:text-stone-400 border border-white/20 focus:border-white rounded-2xl pl-10 pr-4 py-2.5 text-xs transition-all focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="overflow-x-auto no-scrollbar py-0.5">
        <div className="flex items-center space-x-2 min-w-max">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-emerald-900 text-amber-300 shadow-xs'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Admin Notice if not admin */}
      {currentUser.role !== 'ADMIN' && (
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="text-[11px] font-medium leading-tight">
              Semua artikel & kabar cerita ditulis dan dipublikasikan resmi oleh <b>Admin JAYA BOGOR</b> demi transparansi.
            </span>
          </div>
        </div>
      )}

      {/* Blog Posts Stream */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 space-y-2">
          <p className="text-3xl">📰</p>
          <h4 className="font-extrabold text-sm text-stone-900">Belum Ada Artikel yang Cocok</h4>
          <p className="text-xs text-stone-500">Coba ubah kata kunci pencarian atau kategori di atas.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isLiked = post.likedByUserIds.includes(currentUser.id);
            return (
              <article
                key={post.id}
                id={`blog-card-${post.id}`}
                onClick={() => handleOpenReading(post)}
                className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden transition-all hover:shadow-md hover:border-emerald-700/40 cursor-pointer flex flex-col group"
              >
                {/* Featured Cover Photo */}
                {post.photoUrl && (
                  <div className="relative aspect-16/9 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={post.photoUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    
                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span className="bg-emerald-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider shadow-xs">
                        {post.category ? post.category.replace('_', ' ') : 'Kabar Lapangan'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {post.readingTime || '3 menit baca'}
                      </span>
                    </div>

                    {/* Bottom overlay text on photo */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="flex items-center gap-1 font-medium drop-shadow-sm">
                        <MapPin className="w-3 h-3 text-amber-400" /> {post.kelurahan}, {post.kecamatan}
                      </span>
                      {post.beneficiaryName && (
                        <span className="bg-amber-400 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                          {post.beneficiaryName}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Article Card Content */}
                <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Meta info */}
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <div className="flex items-center space-x-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-5 h-5 rounded-full object-cover border border-stone-200"
                        />
                        <span className="font-bold text-stone-700">{post.authorName}</span>
                      </div>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {post.title}
                    </h3>

                    {/* Summary / Excerpt */}
                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {post.summary || post.content}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    {/* Social Stats */}
                    <div className="flex items-center space-x-3 text-stone-500">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          likeStoryPost(post.id);
                        }}
                        className={`flex items-center space-x-1 font-bold transition-colors cursor-pointer ${
                          isLiked ? 'text-rose-600' : 'hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{post.likesCount} Doa</span>
                      </button>

                      <span className="flex items-center space-x-1 font-medium">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.comments.length}</span>
                      </span>
                    </div>

                    {/* Buttons: Share & Read More / Donate */}
                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        id={`share-btn-${post.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenShare(post);
                        }}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 transition-all cursor-pointer"
                        title="Bagikan ke WhatsApp, Email, Instagram, TikTok, Facebook"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Bagikan</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDonateForStory(post, e)}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all shadow-2xs cursor-pointer text-[11px]"
                      >
                        <Heart className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>Donasi</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={!!selectedPostForShare}
        onClose={() => setSelectedPostForShare(null)}
        post={selectedPostForShare}
      />

      {/* Full Blog Reader Modal */}
      <BlogPostModal
        isOpen={!!selectedPostForReading}
        onClose={() => setSelectedPostForReading(null)}
        post={selectedPostForReading}
        onOpenShare={(post) => {
          setSelectedPostForShare(post);
        }}
        onOpenDonate={onOpenDonate}
      />
    </div>
  );
};
