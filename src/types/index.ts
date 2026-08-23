export type UserRole = 'DONATUR' | 'PENERIMA' | 'RT_RW' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  rtRwNumber?: string;
  kelurahan?: string;
  kecamatan?: string;
  isVerified?: boolean;
  nik?: string;
  beneficiaryCategory?: 'JANDA' | 'YATIM';
  instructorProfile?: {
    skill: string;
    experience: string;
    portfolioUrl?: string;
    feeType: 'GRATIS' | 'BERBAYAR';
    proposedFee?: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  };
  subscription?: {
    active: boolean;
    amount: number;
    billingDay: 1 | 15;
    targetType: 'SEMBAKO' | 'YATIM' | 'JANDA' | 'PELATIHAN' | 'UMUM';
    createdAt: string;
  };
}

export interface DreamBook {
  dreamCareer: string;
  desiredBooks: string[];
  wishList: string;
  favoriteQuote?: string;
  gradeLevel?: string;
  hobbies?: string[];
}

export interface Beneficiary {
  id: string;
  name: string;
  category: 'JANDA' | 'YATIM';
  age: number;
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  address: string;
  phone?: string;
  story: string;
  photoUrl: string;
  schoolYearTarget?: number;
  currentEducationSavings?: number;
  dreamBook?: DreamBook;
  dependentsCount?: number;
  skillNeeds?: string[];
  registeredByRtRwId: string;
  registeredByRtRwName: string;
  status: 'VERIFIED' | 'PENDING';
  totalAssistanceReceived: number;
  lastAssistanceDate?: string;
  bankOrAccountNote?: string;
}

export type ProgramType = 
  | 'SEMBAKO_50K' 
  | 'SEMBAKO_100K' 
  | 'NOMINAL_BEBAS' 
  | 'SANTUNAN_JANDA' 
  | 'SANTUNAN_YATIM'
  | 'TABUNGAN_YATIM'
  | 'PELATIHAN';

export interface DonationProgram {
  id: string;
  title: string;
  type: ProgramType;
  category: 'SEMBAKO' | 'SANTUNAN' | 'TABUNGAN' | 'PELATIHAN';
  description: string;
  targetAmount: number;
  collectedAmount: number;
  donorCount: number;
  coverImage: string;
  packagePrice?: number;
  packageItems?: string[];
  beneficiaryId?: string;
  beneficiaryName?: string;
  location: string;
  isUrgent?: boolean;
  badge?: string;
  createdAt: string;
}

export interface DonationTransaction {
  id: string;
  donorId: string;
  donorName: string;
  donorEmail: string;
  programId: string;
  programTitle: string;
  beneficiaryId?: string;
  beneficiaryName?: string;
  amount: number;
  paymentMethod: 'QRIS' | 'BCA' | 'MANDIRI' | 'BANK_JABAR';
  transferProofUrl?: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  message?: string;
  isAnonymous: boolean;
  createdAt: string;
  verifiedAt?: string;
  disbursedAt?: string;
  disbursedReportId?: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: 'KERAJINAN' | 'KULINER' | 'DIGITAL' | 'JAHIT' | 'USAHA_RUMAHAN' | 'PERTANIAN_KOTA';
  instructorType: 'TIBERSA' | 'DONATUR';
  instructorId?: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  feeType: 'GRATIS' | 'BERBAYAR';
  coursePrice: number; // 0 if gratis
  honorariumTarget: number;
  honorariumCollected: number;
  scheduleDate: string;
  time: string;
  location: string;
  description: string;
  targetAudience: 'JANDA' | 'YATIM' | 'UMUM';
  enrolledCount: number;
  maxParticipants: number;
  isVerifiedByAdmin: boolean;
  curriculum: string[];
  coverImage: string;
  tibersaUrl: string;
}

export interface InstructorApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  skill: string;
  experience: string;
  portfolioUrl?: string;
  proposedTopic: string;
  feePreference: 'GRATIS' | 'BERBAYAR';
  proposedHonorarium?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface TransparencyReport {
  id: string;
  title: string;
  programId: string;
  programTitle: string;
  disbursedAmount: number;
  packageCount: number;
  beneficiaryCategory: 'JANDA' | 'YATIM' | 'GABUNGAN';
  rtRw: string;
  kelurahan: string;
  kecamatan: string;
  distributionDate: string;
  photoUrls: string[];
  summaryText: string;
  documentationStory: string;
  verifiedByAdminName: string;
  receiptNumber: string;
  donorCountBenefited?: number;
}

export type BlogCategory = 'PENYALURAN' | 'KISAH_INSPIRATIF' | 'PRESTASI_YATIM' | 'AKADEMI_TIBERSA' | 'LAPORAN_RTRW';

export interface StoryFeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  title: string;
  content: string;
  summary?: string;
  category?: BlogCategory;
  readingTime?: string;
  tags?: string[];
  photoUrl?: string;
  beneficiaryName?: string;
  kelurahan: string;
  kecamatan: string;
  likesCount: number;
  likedByUserIds: string[];
  comments: {
    id: string;
    userId: string;
    userName: string;
    userRole: UserRole;
    text: string;
    createdAt: string;
  }[];
  linkedProgramId?: string;
  linkedProgramTitle?: string;
  createdAt: string;
}

export interface RtRwPartner {
  id: string;
  userId: string;
  name: string;
  phone: string;
  kecamatan: string;
  kelurahan: string;
  rtRwNumber: string;
  registeredWargaCount: number;
  verifiedAt?: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  joinedDate: string;
}

export type Transaction = DonationTransaction;

export interface MenuItemConfig {
  id: string;
  viewId: string; // e.g. 'home', 'orphans', 'training', 'feed', 'transparency', 'rtrw', 'profile', 'admin', 'custom'
  label: string;
  iconName: string; // 'Home' | 'GraduationCap' | 'BookOpen' | 'MessageSquareHeart' | 'FileCheck2' | 'Building2' | 'Heart' | 'Sparkles' | 'Users' | 'Globe' | 'Package'
  badge?: string;
  isVisible: boolean;
  order: number;
  customUrl?: string;
  isExternal?: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteTitleColor?: string;
  siteTagline: string;
  siteTaglineColor?: string;
  siteDescription: string;
  logoType: 'PRESET_VECTOR' | 'CUSTOM_IMAGE' | 'CUSTOM_TEXT';
  logoCustomUrl?: string;
  logoColor: string; // e.g. '#046A38' or '#F59E0B'
  logoContainerStyle: 'TRANSPARENT' | 'EMERALD_BOX' | 'GOLD_BOX' | 'WHITE_BOX';
  themeMode?: 'LIGHT' | 'DARK' | 'SYSTEM';
  darkModeBg?: string;
  darkModeCardBg?: string;
  darkModeAccent?: string;
  footerNote: string;
  contactEmail: string;
  contactPhone: string;
  adminSecretKey?: string;
  adminRecoveryEmail?: string;
  navigationItems: MenuItemConfig[];
}

