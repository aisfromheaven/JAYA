import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Beneficiary,
  DonationProgram,
  DonationTransaction,
  TrainingCourse,
  TransparencyReport,
  StoryFeedPost,
  BlogCategory,
  RtRwPartner,
  InstructorApplication,
  UserRole,
  SiteSettings,
  MenuItemConfig
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_BENEFICIARIES,
  INITIAL_PROGRAMS,
  INITIAL_TRAINING_COURSES,
  INITIAL_TRANSPARENCY_REPORTS,
  INITIAL_STORIES,
  INITIAL_TRANSACTIONS,
  INITIAL_RTRW_PARTNERS,
  INITIAL_INSTRUCTOR_APPLICATIONS,
  DEFAULT_SITE_SETTINGS
} from '../data/seedData';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type?: 'SUCCESS' | 'INFO' | 'WARNING' | 'DONATION';
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'SUCCESS' | 'INFO' | 'DONATION' | 'REPORT';
  timestamp: string;
  read: boolean;
}

interface AppContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  beneficiaries: Beneficiary[];
  programs: DonationProgram[];
  transactions: DonationTransaction[];
  trainingCourses: TrainingCourse[];
  transparencyReports: TransparencyReport[];
  stories: StoryFeedPost[];
  storyPosts: StoryFeedPost[];
  rtrwPartners: RtRwPartner[];
  instructorApplications: InstructorApplication[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  toastNotification: ToastNotification | null;
  clearToastNotification: () => void;

  // Site & Branding & Menu Customizer (Admin)
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  resetSiteSettings: () => void;
  updateMenuItem: (id: string, updates: Partial<MenuItemConfig>) => void;
  addMenuItem: (item: Omit<MenuItemConfig, 'id' | 'order'>) => void;
  deleteMenuItem: (id: string) => void;
  reorderMenuItems: (startIndex: number, endIndex: number) => void;
  isDarkMode: boolean;
  toggleThemeMode: () => void;
  
  // Auth & Role
  setCurrentRole: (role: UserRole) => void;
  loginUser: (email: string, role?: UserRole) => boolean;
  registerUser: (data: Partial<UserProfile> & { password?: string }) => void;
  logoutUser: () => void;
  updateCurrentUserProfile: (data: Partial<UserProfile>) => void;
  
  // Donations
  makeDonation: (data: {
    programId: string;
    beneficiaryId?: string;
    amount: number;
    paymentMethod: 'QRIS' | 'BCA' | 'MANDIRI' | 'BANK_JABAR';
    transferProofUrl?: string;
    message?: string;
    isAnonymous: boolean;
  }) => DonationTransaction;
  verifyDonation: (transactionId: string, isApproved: boolean) => void;
  createDonationProgram: (data: Omit<DonationProgram, 'id' | 'collectedAmount' | 'donorCount' | 'createdAt'>) => void;
  deleteDonationProgram: (programId: string) => void;
  
  // Recurring donation
  toggleSubscription: (config: {
    active: boolean;
    amount: number;
    billingDay: 1 | 15;
    targetType: 'SEMBAKO' | 'YATIM' | 'JANDA' | 'PELATIHAN' | 'UMUM';
  }) => void;
  
  // RT/RW operations
  registerRtRwPartner: (data: {
    name: string;
    phone: string;
    kecamatan: string;
    kelurahan: string;
    rtRwNumber: string;
  }) => void;
  verifyRtRwPartner: (partnerId: string, isApproved: boolean) => void;
  addBeneficiary: (data: Omit<Beneficiary, 'id' | 'registeredAt' | 'totalAssistanceReceived' | 'registeredByRtRwId' | 'registeredByRtRwName' | 'status'>) => void;
  
  // Training & Instructor
  applyAsInstructor: (data: {
    skill: string;
    experience: string;
    portfolioUrl?: string;
    proposedTopic: string;
    feePreference: 'GRATIS' | 'BERBAYAR';
    proposedHonorarium?: number;
  }) => void;
  verifyInstructorApplication: (applicationId: string, isApproved: boolean) => void;
  enrollInCourse: (courseId: string) => void;
  
  // Stories & Blog
  createStoryPost: (data: {
    title: string;
    content: string;
    summary?: string;
    category?: BlogCategory;
    readingTime?: string;
    tags?: string[];
    photoUrl?: string;
    beneficiaryName?: string;
    kelurahan?: string;
    kecamatan?: string;
    linkedProgramId?: string;
  }) => void;
  deleteStoryPost: (storyId: string) => void;
  likeStoryPost: (storyId: string) => void;
  addStoryComment: (storyId: string, text: string) => void;
  
  // Transparency & Admin
  addTransparencyReport: (data: Omit<TransparencyReport, 'id' | 'receiptNumber'>) => void;
  deleteTransparencyReport: (reportId: string) => void;
  
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addToastNotification: (title: string, message: string, type?: 'SUCCESS' | 'INFO' | 'DONATION') => void;
  
  // Reset Data helper
  resetToSeedData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for safe localStorage array retrieval
const getStoredArray = <T,>(key: string, fallback: T[]): T[] => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const getStoredObject = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state initialization
  const [users, setUsers] = useState<UserProfile[]>(() => getStoredArray('jb_users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => getStoredObject('jb_current_user', INITIAL_USERS[1]));
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => getStoredArray('jb_beneficiaries', INITIAL_BENEFICIARIES));
  const [programs, setPrograms] = useState<DonationProgram[]>(() => getStoredArray('jb_programs', INITIAL_PROGRAMS));
  const [transactions, setTransactions] = useState<DonationTransaction[]>(() => getStoredArray('jb_transactions', INITIAL_TRANSACTIONS));
  const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>(() => getStoredArray('jb_training_courses', INITIAL_TRAINING_COURSES));
  const [transparencyReports, setTransparencyReports] = useState<TransparencyReport[]>(() => getStoredArray('jb_transparency_reports', INITIAL_TRANSPARENCY_REPORTS));
  const [stories, setStories] = useState<StoryFeedPost[]>(() => getStoredArray('jb_stories', INITIAL_STORIES));
  const [rtrwPartners, setRtrwPartners] = useState<RtRwPartner[]>(() => getStoredArray('jb_rtrw_partners', INITIAL_RTRW_PARTNERS));
  const [instructorApplications, setInstructorApplications] = useState<InstructorApplication[]>(() => getStoredArray('jb_instructor_apps', INITIAL_INSTRUCTOR_APPLICATIONS));
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const stored = getStoredObject<Partial<SiteSettings>>('jb_site_settings', DEFAULT_SITE_SETTINGS);
    return { ...DEFAULT_SITE_SETTINGS, ...stored };
  });
  const [toastNotification, setToastNotification] = useState<ToastNotification | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_1',
      title: 'Donasi Tersalurkan! 🌾',
      message: 'Donasi Anda sebesar Rp 100.000 telah disalurkan untuk Paket Sembako Berkah di Baranangsiang.',
      type: 'DONATION',
      timestamp: '2026-08-10T14:30:00Z',
      read: false
    },
    {
      id: 'notif_2',
      title: 'Kabar Baik dari Siti Nur Aisyah 📖',
      message: 'Aisyah telah menerima buku-buku impiannya dari program Tabungan Pendidikan & Buku Mimpi.',
      type: 'INFO',
      timestamp: '2026-08-15T09:00:00Z',
      read: true
    }
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('jb_users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    localStorage.setItem('jb_current_user', JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem('jb_beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);
  useEffect(() => {
    localStorage.setItem('jb_programs', JSON.stringify(programs));
  }, [programs]);
  useEffect(() => {
    localStorage.setItem('jb_transactions', JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem('jb_training_courses', JSON.stringify(trainingCourses));
  }, [trainingCourses]);
  useEffect(() => {
    localStorage.setItem('jb_transparency_reports', JSON.stringify(transparencyReports));
  }, [transparencyReports]);
  useEffect(() => {
    localStorage.setItem('jb_stories', JSON.stringify(stories));
  }, [stories]);
  useEffect(() => {
    localStorage.setItem('jb_rtrw_partners', JSON.stringify(rtrwPartners));
  }, [rtrwPartners]);
  useEffect(() => {
    localStorage.setItem('jb_instructor_apps', JSON.stringify(instructorApplications));
  }, [instructorApplications]);
  useEffect(() => {
    localStorage.setItem('jb_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Dark Mode detection & DOM class / CSS variables sync
  const isDarkMode = 
    siteSettings.themeMode === 'DARK' || 
    (siteSettings.themeMode === 'SYSTEM' && (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));

  const toggleThemeMode = () => {
    const nextMode = isDarkMode ? 'LIGHT' : 'DARK';
    updateSiteSettings({ themeMode: nextMode });
    addToastNotification(
      nextMode === 'DARK' ? 'Mode Gelap Aktif 🌙' : 'Mode Terang Aktif ☀️',
      `Tampilan beralih ke ${nextMode === 'DARK' ? 'Mode Gelap' : 'Mode Terang'}.`,
      'INFO'
    );
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        if (siteSettings.darkModeBg) {
          document.documentElement.style.setProperty('--app-dark-bg', siteSettings.darkModeBg);
        }
        if (siteSettings.darkModeCardBg) {
          document.documentElement.style.setProperty('--app-dark-card-bg', siteSettings.darkModeCardBg);
        }
        if (siteSettings.darkModeAccent) {
          document.documentElement.style.setProperty('--app-dark-accent', siteSettings.darkModeAccent);
        }
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [isDarkMode, siteSettings.darkModeBg, siteSettings.darkModeCardBg, siteSettings.darkModeAccent]);

  const addToastNotification = (title: string, message: string, type: 'SUCCESS' | 'INFO' | 'DONATION' | 'WARNING' = 'INFO') => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type: type === 'WARNING' ? 'INFO' : type,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Also trigger floating toast
    setToastNotification({
      id: `toast_${Date.now()}`,
      title,
      message,
      type
    });

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToastNotification(prev => (prev?.id === `toast_${Date.now()}` ? null : prev));
    }, 4000);
  };

  const clearToastNotification = () => {
    setToastNotification(null);
  };

  // Site Settings & Branding Customizer
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
    addToastNotification('Pengaturan Disimpan', 'Identitas dan konfigurasi situs berhasil diperbarui.', 'SUCCESS');
  };

  const resetSiteSettings = () => {
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    addToastNotification('Pengaturan Direset', 'Pengaturan situs dikembalikan ke konfigurasi awal.', 'INFO');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItemConfig>) => {
    setSiteSettings(prev => ({
      ...prev,
      navigationItems: prev.navigationItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    }));
    addToastNotification('Menu Diperbarui', 'Perubahan item menu berhasil disimpan.', 'SUCCESS');
  };

  const addMenuItem = (item: Omit<MenuItemConfig, 'id' | 'order'>) => {
    setSiteSettings(prev => {
      const maxOrder = Math.max(...prev.navigationItems.map(i => i.order), 0);
      const newItem: MenuItemConfig = {
        ...item,
        id: `nav_custom_${Date.now()}`,
        order: maxOrder + 1
      };
      return {
        ...prev,
        navigationItems: [...prev.navigationItems, newItem]
      };
    });
    addToastNotification('Menu Ditambahkan', `Menu "${item.label}" berhasil ditambahkan ke navigasi.`, 'SUCCESS');
  };

  const deleteMenuItem = (id: string) => {
    setSiteSettings(prev => ({
      ...prev,
      navigationItems: prev.navigationItems.filter(item => item.id !== id)
    }));
    addToastNotification('Menu Dihapus', 'Item menu telah dihapus dari navigasi.', 'INFO');
  };

  const reorderMenuItems = (startIndex: number, endIndex: number) => {
    setSiteSettings(prev => {
      const items = [...prev.navigationItems];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      const reindexed = items.map((item, idx) => ({ ...item, order: idx + 1 }));
      return { ...prev, navigationItems: reindexed };
    });
  };

  const setCurrentRole = (role: UserRole) => {
    // Switch to an existing user with this role or update current user
    const existing = users.find(u => u.role === role);
    if (existing) {
      setCurrentUser(existing);
      addToastNotification('Beralih Peran', `Anda kini melihat aplikasi sebagai ${role}`, 'INFO');
    } else {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
      setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      addToastNotification('Peran Diperbarui', `Peran akun disetel ke ${role}`, 'INFO');
    }
  };

  const loginUser = (email: string, role?: UserRole): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      addToastNotification('Selamat Datang!', `Berhasil masuk sebagai ${found.name}`, 'SUCCESS');
      return true;
    } else if (role) {
      // Auto register demo
      const newUser: UserProfile = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        isVerified: role === 'DONATUR'
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      addToastNotification('Akun Dibuat', `Selamat bergabung di JAYA BOGOR, ${newUser.name}!`, 'SUCCESS');
      return true;
    }
    return false;
  };

  const registerUser = (data: Partial<UserProfile> & { password?: string }) => {
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: data.name || 'Pengguna Baru',
      email: data.email || `user_${Date.now()}@jayabogor.id`,
      role: data.role || 'DONATUR',
      phone: data.phone,
      kelurahan: data.kelurahan,
      kecamatan: data.kecamatan,
      rtRwNumber: data.rtRwNumber,
      avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      isVerified: data.role === 'DONATUR'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    if (data.role === 'RT_RW') {
      const newPartner: RtRwPartner = {
        id: `rtrw_${Date.now()}`,
        userId: newUser.id,
        name: newUser.name,
        phone: newUser.phone || '-',
        kecamatan: newUser.kecamatan || 'Bogor Tengah',
        kelurahan: newUser.kelurahan || 'Babakan',
        rtRwNumber: newUser.rtRwNumber || 'RT 01 / RW 01',
        registeredWargaCount: 0,
        status: 'PENDING',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setRtrwPartners(prev => [newPartner, ...prev]);
    }

    addToastNotification('Pendaftaran Berhasil', `Akun ${newUser.role} Anda berhasil didaftarkan.`, 'SUCCESS');
  };

  const logoutUser = () => {
    setCurrentUser(INITIAL_USERS[1]); // back to donatur guest
    addToastNotification('Keluar Akun', 'Anda telah keluar dari akun.', 'INFO');
  };

  const updateCurrentUserProfile = (data: Partial<UserProfile>) => {
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    addToastNotification('Profil Diperbarui', 'Data profil Anda telah berhasil disimpan.', 'SUCCESS');
  };

  // Donasi
  const makeDonation = (data: {
    programId: string;
    beneficiaryId?: string;
    amount: number;
    paymentMethod: 'QRIS' | 'BCA' | 'MANDIRI' | 'BANK_JABAR';
    transferProofUrl?: string;
    message?: string;
    isAnonymous: boolean;
  }): DonationTransaction => {
    const prog = programs.find(p => p.id === data.programId);
    const ben = data.beneficiaryId ? beneficiaries.find(b => b.id === data.beneficiaryId) : undefined;

    const newTrx: DonationTransaction = {
      id: `trx_${Date.now()}`,
      donorId: currentUser.id,
      donorName: data.isAnonymous ? 'Hamba Allah' : currentUser.name,
      donorEmail: currentUser.email,
      programId: data.programId,
      programTitle: prog ? prog.title : 'Program Donasi JAYA BOGOR',
      beneficiaryId: data.beneficiaryId,
      beneficiaryName: ben?.name,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      transferProofUrl: data.transferProofUrl,
      status: 'VERIFIED', // Instant auto-verification for seamless demo experience
      message: data.message,
      isAnonymous: data.isAnonymous,
      createdAt: new Date().toISOString(),
      verifiedAt: new Date().toISOString()
    };

    // Update state
    setTransactions(prev => [newTrx, ...prev]);

    // Update program collected
    setPrograms(prev => prev.map(p => {
      if (p.id === data.programId) {
        return {
          ...p,
          collectedAmount: p.collectedAmount + data.amount,
          donorCount: p.donorCount + 1
        };
      }
      return p;
    }));

    // If beneficiary tabungan
    if (data.beneficiaryId) {
      setBeneficiaries(prev => prev.map(b => {
        if (b.id === data.beneficiaryId) {
          return {
            ...b,
            currentEducationSavings: (b.currentEducationSavings || 0) + data.amount,
            totalAssistanceReceived: b.totalAssistanceReceived + data.amount,
            lastAssistanceDate: new Date().toISOString().split('T')[0]
          };
        }
        return b;
      }));
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2E7D32', '#FFC107', '#4CAF50', '#FFD54F']
      });
    } catch {
      // ignore
    }

    addToastNotification(
      'Donasi Berhasil Diterima! 🌿',
      `Terima kasih! Donasi Rp ${data.amount.toLocaleString('id-ID')} untuk ${newTrx.programTitle} telah tercatat di sistem JAYA BOGOR.`,
      'DONATION'
    );

    return newTrx;
  };

  const verifyDonation = (transactionId: string, isApproved: boolean) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: isApproved ? 'VERIFIED' : 'REJECTED',
          verifiedAt: isApproved ? new Date().toISOString() : undefined
        };
      }
      return t;
    }));
    addToastNotification(
      'Verifikasi Donasi',
      `Transaksi ${transactionId} telah ${isApproved ? 'diverifikasi' : 'ditolak'}.`,
      'INFO'
    );
  };

  const toggleSubscription = (config: {
    active: boolean;
    amount: number;
    billingDay: 1 | 15;
    targetType: 'SEMBAKO' | 'YATIM' | 'JANDA' | 'PELATIHAN' | 'UMUM';
  }) => {
    const updatedUser: UserProfile = {
      ...currentUser,
      subscription: {
        active: config.active,
        amount: config.amount,
        billingDay: config.billingDay,
        targetType: config.targetType,
        createdAt: new Date().toISOString()
      }
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    if (config.active) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2E7D32', '#FFC107']
        });
      } catch {
        // ignore
      }
      addToastNotification(
        'Donasi Berlangganan Aktif! 🔄',
        `Donasi otomatis bulanan Rp ${config.amount.toLocaleString('id-ID')} aktif setiap tanggal ${config.billingDay}. Terima kasih atas istiqomahnya.`,
        'SUCCESS'
      );
    } else {
      addToastNotification('Berlangganan Dimatikan', 'Donasi otomatis bulanan Anda telah dinonaktifkan.', 'INFO');
    }
  };

  // RT/RW
  const registerRtRwPartner = (data: {
    name: string;
    phone: string;
    kecamatan: string;
    kelurahan: string;
    rtRwNumber: string;
  }) => {
    const newPartner: RtRwPartner = {
      id: `rtrw_${Date.now()}`,
      userId: currentUser.id,
      name: data.name,
      phone: data.phone,
      kecamatan: data.kecamatan,
      kelurahan: data.kelurahan,
      rtRwNumber: data.rtRwNumber,
      registeredWargaCount: 0,
      status: 'PENDING',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setRtrwPartners(prev => [newPartner, ...prev]);
    addToastNotification(
      'Pendaftaran Mitra Diajukan 📋',
      'Data RT/RW Anda telah terkirim. Admin akan memverifikasi dalam 1x24 jam.',
      'SUCCESS'
    );
  };

  const verifyRtRwPartner = (partnerId: string, isApproved: boolean) => {
    setRtrwPartners(prev => prev.map(p => {
      if (p.id === partnerId) {
        return {
          ...p,
          status: isApproved ? 'VERIFIED' : 'REJECTED',
          verifiedAt: isApproved ? new Date().toISOString() : undefined
        };
      }
      return p;
    }));
    addToastNotification(
      'Status RT/RW Diperbarui',
      `Mitra RT/RW telah ${isApproved ? 'disetujui & diverifikasi' : 'ditolak'}.`,
      'INFO'
    );
  };

  const addBeneficiary = (data: Omit<Beneficiary, 'id' | 'registeredAt' | 'totalAssistanceReceived' | 'registeredByRtRwId' | 'registeredByRtRwName' | 'status'>) => {
    const newBen: Beneficiary = {
      ...data,
      id: `ben_${Date.now()}`,
      registeredByRtRwId: currentUser.id,
      registeredByRtRwName: `${currentUser.name} (${currentUser.rtRwNumber || 'Mitra RT/RW'})`,
      status: 'VERIFIED',
      totalAssistanceReceived: 0,
      currentEducationSavings: data.category === 'YATIM' ? (data.currentEducationSavings || 0) : undefined
    };

    setBeneficiaries(prev => [newBen, ...prev]);

    // If orphan, also create a tabungan program
    if (newBen.category === 'YATIM') {
      const newProg: DonationProgram = {
        id: `prog_tabungan_${newBen.id}`,
        title: `Tabungan Pendidikan ${newBen.name}`,
        type: 'TABUNGAN_YATIM',
        category: 'TABUNGAN',
        description: `Bantu wujudkan mimpi ${newBen.name} (${newBen.dreamBook?.dreamCareer || 'Pendidikan'}). Target tahunan untuk perlengkapan sekolah dan buku.`,
        targetAmount: newBen.schoolYearTarget || 2500000,
        collectedAmount: newBen.currentEducationSavings || 0,
        donorCount: 0,
        beneficiaryId: newBen.id,
        beneficiaryName: newBen.name,
        coverImage: newBen.photoUrl,
        location: `Kel. ${newBen.kelurahan}, ${newBen.kecamatan}`,
        badge: 'Buku Mimpi',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setPrograms(prev => [newProg, ...prev]);
    }

    // Increment partner count
    setRtrwPartners(prev => prev.map(p => {
      if (p.userId === currentUser.id) {
        return { ...p, registeredWargaCount: p.registeredWargaCount + 1 };
      }
      return p;
    }));

    addToastNotification(
      'Warga Binaan Berhasil Didaftarkan 🤝',
      `Data ${newBen.name} (${newBen.category}) telah tersimpan dan dapat menerima bantuan donatur.`,
      'SUCCESS'
    );
  };

  // Instructor
  const applyAsInstructor = (data: {
    skill: string;
    experience: string;
    portfolioUrl?: string;
    proposedTopic: string;
    feePreference: 'GRATIS' | 'BERBAYAR';
    proposedHonorarium?: number;
  }) => {
    const newApp: InstructorApplication = {
      id: `app_${Date.now()}`,
      userId: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || '08123456789',
      skill: data.skill,
      experience: data.experience,
      portfolioUrl: data.portfolioUrl,
      proposedTopic: data.proposedTopic,
      feePreference: data.feePreference,
      proposedHonorarium: data.proposedHonorarium,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setInstructorApplications(prev => [newApp, ...prev]);
    addToastNotification(
      'Pendaftaran Pemateri Dikirim 🎓',
      'Terima kasih telah bersedia berbagi ilmu melalui platform Akademi Tibersa & JAYA BOGOR.',
      'SUCCESS'
    );
  };

  const verifyInstructorApplication = (applicationId: string, isApproved: boolean) => {
    let appData: InstructorApplication | undefined;
    setInstructorApplications(prev => prev.map(a => {
      if (a.id === applicationId) {
        appData = a;
        return { ...a, status: isApproved ? 'APPROVED' : 'REJECTED' };
      }
      return a;
    }));

    if (isApproved && appData) {
      // Auto create a training course from approved instructor
      const newCourse: TrainingCourse = {
        id: `course_${Date.now()}`,
        title: appData.proposedTopic,
        category: 'USAHA_RUMAHAN',
        instructorType: 'DONATUR',
        instructorId: appData.userId,
        instructorName: appData.name,
        instructorTitle: `Praktisi & Pemateri Donatur JAYA BOGOR`,
        instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        feeType: appData.feePreference === 'GRATIS' ? 'GRATIS' : 'BERBAYAR',
        coursePrice: appData.feePreference === 'GRATIS' ? 0 : 20000,
        honorariumTarget: appData.proposedHonorarium || 1000000,
        honorariumCollected: 0,
        scheduleDate: '2026-09-10',
        time: '13:00 - 15:30 WIB',
        location: 'Online via Akademi Tibersa & Balai Warga',
        description: `Pelatihan praktis bersama ${appData.name}: ${appData.proposedTopic}. Keterampilan: ${appData.skill}.`,
        targetAudience: 'UMUM',
        enrolledCount: 0,
        maxParticipants: 30,
        isVerifiedByAdmin: true,
        curriculum: [
          'Pengenalan dasar dan peluang pasar',
          'Langkah-langkah praktik langsung',
          'Tanya jawab interaktif dan konsultasi lanjutan'
        ],
        coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
        tibersaUrl: 'https://akademitibersa.com/courses/donatur-class'
      };
      setTrainingCourses(prev => [newCourse, ...prev]);
    }

    addToastNotification(
      'Status Pemateri Diperbarui',
      `Permohonan pemateri telah ${isApproved ? 'disetujui & kelas dibuatkan' : 'ditolak'}.`,
      'INFO'
    );
  };

  const enrollInCourse = (courseId: string) => {
    setTrainingCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolledCount: c.enrolledCount + 1 };
      }
      return c;
    }));
    addToastNotification(
      'Berhasil Mendaftar Pelatihan! 🎯',
      'Anda telah terdaftar di kelas Akademi Tibersa. Link dan jadwal telah disimpan.',
      'SUCCESS'
    );
  };

  // Stories
  const createStoryPost = (data: {
    title: string;
    content: string;
    summary?: string;
    category?: BlogCategory;
    readingTime?: string;
    tags?: string[];
    photoUrl?: string;
    beneficiaryName?: string;
    kelurahan?: string;
    kecamatan?: string;
    linkedProgramId?: string;
  }) => {
    if (currentUser.role !== 'ADMIN') {
      addToastNotification(
        'Akses Terbatas ⚠️',
        'Hanya Admin JAYA BOGOR yang berwenang menerbitkan artikel cerita blog.',
        'INFO'
      );
      return;
    }

    const prog = data.linkedProgramId ? programs.find(p => p.id === data.linkedProgramId) : undefined;
    const wordCount = data.content.split(/\s+/).length;
    const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 130));
    
    const newStory: StoryFeedPost = {
      id: `story_${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.name || 'Admin JAYA BOGOR',
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      title: data.title,
      content: data.content,
      summary: data.summary || (data.content.slice(0, 160) + (data.content.length > 160 ? '...' : '')),
      category: data.category || 'KISAH_INSPIRATIF',
      readingTime: data.readingTime || `${estimatedMinutes} menit baca`,
      tags: data.tags || ['#JAYABOGOR', '#BogorBerbagi', '#ZakatInfaq'],
      photoUrl: data.photoUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      beneficiaryName: data.beneficiaryName,
      kelurahan: data.kelurahan || currentUser.kelurahan || 'Baranangsiang',
      kecamatan: data.kecamatan || currentUser.kecamatan || 'Bogor Timur',
      likesCount: 0,
      likedByUserIds: [],
      comments: [],
      linkedProgramId: data.linkedProgramId,
      linkedProgramTitle: prog?.title,
      createdAt: new Date().toISOString()
    };

    setStories(prev => [newStory, ...prev]);
    addToastNotification('Artikel Terbit 🌟', 'Kabar cerita blog resmi telah dipublikasikan ke publik.', 'SUCCESS');
  };

  const deleteStoryPost = (storyId: string) => {
    if (currentUser.role !== 'ADMIN') {
      addToastNotification('Akses Terbatas ⚠️', 'Hanya Admin yang berwenang menghapus cerita blog.', 'INFO');
      return;
    }
    setStories(prev => prev.filter(s => s.id !== storyId));
    addToastNotification('Artikel Dihapus', 'Cerita blog telah berhasil dihapus.', 'INFO');
  };

  const likeStoryPost = (storyId: string) => {
    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        const isLiked = s.likedByUserIds.includes(currentUser.id);
        return {
          ...s,
          likesCount: isLiked ? s.likesCount - 1 : s.likesCount + 1,
          likedByUserIds: isLiked
            ? s.likedByUserIds.filter(id => id !== currentUser.id)
            : [...s.likedByUserIds, currentUser.id]
        };
      }
      return s;
    }));
  };

  const addStoryComment = (storyId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comm_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    setStories(prev => prev.map(s => {
      if (s.id === storyId) {
        return { ...s, comments: [...s.comments, newComment] };
      }
      return s;
    }));
  };

  // Transparency Reports
  const addTransparencyReport = (data: Omit<TransparencyReport, 'id' | 'receiptNumber'>) => {
    const newReport: TransparencyReport = {
      ...data,
      id: `rep_${Date.now()}`,
      receiptNumber: `JB-DISB-${Date.now().toString().slice(-8)}`
    };
    setTransparencyReports(prev => [newReport, ...prev]);
    addToastNotification(
      'Laporan Transparansi Diterbitkan 📊',
      `Laporan penyaluran ${newReport.title} berhasil diunggah ke publik.`,
      'SUCCESS'
    );
  };

  const deleteTransparencyReport = (reportId: string) => {
    setTransparencyReports(prev => prev.filter(r => r.id !== reportId));
    addToastNotification('Laporan Dihapus', 'Laporan penyaluran berhasil dihapus.', 'INFO');
  };

  // Admin Program Management
  const createDonationProgram = (data: Omit<DonationProgram, 'id' | 'collectedAmount' | 'donorCount' | 'createdAt'>) => {
    if (currentUser.role !== 'ADMIN') {
      addToastNotification(
        'Akses Terbatas ⚠️',
        'Untuk sementara waktu, hanya Admin Pengelola yang berwenang mengunggah program donasi baru.',
        'INFO'
      );
      return;
    }

    const newProg: DonationProgram = {
      ...data,
      id: `prog_${Date.now()}`,
      collectedAmount: 0,
      donorCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPrograms(prev => [newProg, ...prev]);
    addToastNotification(
      'Program Donasi Diterbitkan 🌿',
      `Program "${newProg.title}" berhasil diunggah oleh Admin dan siap menerima donasi.`,
      'SUCCESS'
    );
  };

  const deleteDonationProgram = (programId: string) => {
    if (currentUser.role !== 'ADMIN') {
      addToastNotification(
        'Akses Terbatas ⚠️',
        'Hanya Admin Pengelola yang berwenang menghapus program donasi.',
        'INFO'
      );
      return;
    }

    setPrograms(prev => prev.filter(p => p.id !== programId));
    addToastNotification('Program Dihapus', 'Program donasi telah berhasil dihapus.', 'INFO');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToSeedData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUser(INITIAL_USERS[1]);
    setBeneficiaries(INITIAL_BENEFICIARIES);
    setPrograms(INITIAL_PROGRAMS);
    setTransactions(INITIAL_TRANSACTIONS);
    setTrainingCourses(INITIAL_TRAINING_COURSES);
    setTransparencyReports(INITIAL_TRANSPARENCY_REPORTS);
    setStories(INITIAL_STORIES);
    setRtrwPartners(INITIAL_RTRW_PARTNERS);
    setInstructorApplications(INITIAL_INSTRUCTOR_APPLICATIONS);
    setSiteSettings(DEFAULT_SITE_SETTINGS);
    addToastNotification('Data Diperbarui', 'Seluruh data telah disinkronkan ke data awal Bogor.', 'INFO');
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        beneficiaries,
        programs,
        transactions,
        trainingCourses,
        transparencyReports,
        stories,
        storyPosts: stories,
        rtrwPartners,
        instructorApplications,
        notifications,
        unreadNotificationCount,
        toastNotification,
        clearToastNotification,
        siteSettings,
        updateSiteSettings,
        resetSiteSettings,
        updateMenuItem,
        addMenuItem,
        deleteMenuItem,
        reorderMenuItems,
        isDarkMode,
        toggleThemeMode,
        setCurrentRole,
        loginUser,
        registerUser,
        logoutUser,
        updateCurrentUserProfile,
        makeDonation,
        verifyDonation,
        createDonationProgram,
        deleteDonationProgram,
        toggleSubscription,
        registerRtRwPartner,
        verifyRtRwPartner,
        addBeneficiary,
        applyAsInstructor,
        verifyInstructorApplication,
        enrollInCourse,
        createStoryPost,
        deleteStoryPost,
        likeStoryPost,
        addStoryComment,
        addTransparencyReport,
        deleteTransparencyReport,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addToastNotification,
        resetToSeedData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
