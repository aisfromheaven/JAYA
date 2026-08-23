/**
 * JAYA BOGOR
 * Tagline: Janda Yatim Bogor
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DonateModal } from './components/DonateModal';
import { BukuMimpiModal } from './components/BukuMimpiModal';
import { InstructorModal } from './components/InstructorModal';
import { BeneficiaryTrainingModal } from './components/BeneficiaryTrainingModal';
import { CreateProgramModal } from './components/CreateProgramModal';
import { RtRwModal } from './components/RtRwModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AuthModal } from './components/AuthModal';
import { SecretAdminModal } from './components/SecretAdminModal';

import { HomeView } from './components/views/HomeView';
import { OrphansView } from './components/views/OrphansView';
import { TrainingView } from './components/views/TrainingView';
import { FeedView } from './components/views/FeedView';
import { TransparencyView } from './components/views/TransparencyView';
import { RtRwPortalView } from './components/views/RtRwPortalView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { ProfileView } from './components/views/ProfileView';
import { Beneficiary, DonationProgram, TrainingCourse } from './types';
import { CheckCircle2, Info, AlertTriangle, Mail, Phone, Heart, Lock, KeyRound, ArrowLeft } from 'lucide-react';
import { SiteBrandLogo } from './components/SiteBrandLogo';

const MainLayout: React.FC = () => {
  const { toastNotification, clearToastNotification, currentUser, siteSettings, setCurrentRole, addToastNotification } = useApp();

  // Active View State
  const [activeView, setActiveView] = useState<string>('home');

  // Modal States
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<DonationProgram | null>(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);

  const [isBukuMimpiOpen, setIsBukuMimpiOpen] = useState(false);
  const [activeDreamOrphan, setActiveDreamOrphan] = useState<Beneficiary | null>(null);

  const [isInstructorModalOpen, setIsInstructorModalOpen] = useState(false);
  const [isBeneficiaryTrainingOpen, setIsBeneficiaryTrainingOpen] = useState(false);
  const [selectedTrainingCourse, setSelectedTrainingCourse] = useState<TrainingCourse | null>(null);

  const [isCreateProgramOpen, setIsCreateProgramOpen] = useState(false);

  const [isRtRwModalOpen, setIsRtRwModalOpen] = useState(false);
  const [rtRwModalMode, setRtRwModalMode] = useState<'REGISTER_PARTNER' | 'ADD_BENEFICIARY'>('ADD_BENEFICIARY');

  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSecretAdminOpen, setIsSecretAdminOpen] = useState(false);

  // Helper actions
  const handleOpenDonate = (program?: DonationProgram, beneficiary?: Beneficiary) => {
    setSelectedProgram(program || null);
    setSelectedBeneficiary(beneficiary || null);
    setIsDonateOpen(true);
  };

  const handleOpenDreamBook = (orphan: Beneficiary) => {
    setActiveDreamOrphan(orphan);
    setIsBukuMimpiOpen(true);
  };

  const handleDonateToOrphanChild = (orphan: Beneficiary) => {
    handleOpenDonate(undefined, orphan);
  };

  const handleOpenAddBeneficiary = () => {
    setRtRwModalMode('ADD_BENEFICIARY');
    setIsRtRwModalOpen(true);
  };

  const handleOpenRegisterPartner = () => {
    setRtRwModalMode('REGISTER_PARTNER');
    setIsRtRwModalOpen(true);
  };

  const handleOpenBeneficiaryTraining = (course?: TrainingCourse) => {
    setSelectedTrainingCourse(course || null);
    setIsBeneficiaryTrainingOpen(true);
  };

  const handleOpenCreateProgram = () => {
    setIsCreateProgramOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-emerald-950">
      {/* Toast Notification Alert */}
      {toastNotification && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm animate-in slide-in-from-top-4 duration-200">
          <div 
            onClick={clearToastNotification}
            className={`p-3 rounded-2xl shadow-xl flex items-center space-x-3 cursor-pointer border ${
              toastNotification.type === 'SUCCESS'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toastNotification.type === 'WARNING'
                ? 'bg-amber-900 text-white border-amber-700'
                : 'bg-stone-900 text-white border-stone-700'
            }`}
          >
            {toastNotification.type === 'SUCCESS' ? (
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <h5 className="font-extrabold text-xs leading-tight">{toastNotification.title}</h5>
              <p className="text-[11px] text-stone-200 truncate">{toastNotification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top App Bar */}
      <Navbar
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        setActiveView={setActiveView}
        activeView={activeView}
      />

      {/* Main Responsive Frame */}
      <main className="flex-1 max-w-md sm:max-w-xl md:max-w-2xl w-full mx-auto px-3.5 sm:px-4 pt-3 pb-24">
        {activeView === 'home' && (
          <HomeView 
            onOpenDonate={handleOpenDonate} 
            setActiveView={setActiveView}
            onOpenCreateProgram={handleOpenCreateProgram}
          />
        )}

        {activeView === 'orphans' && (
          <OrphansView
            onSelectOrphan={handleOpenDreamBook}
            onDonateToOrphan={handleDonateToOrphanChild}
          />
        )}

        {activeView === 'training' && (
          <TrainingView
            onOpenInstructorModal={() => setIsInstructorModalOpen(true)}
            onOpenBeneficiaryEnrollModal={handleOpenBeneficiaryTraining}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {activeView === 'feed' && (
          <FeedView
            onOpenCreateStory={() => setIsCreateStoryOpen(true)}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {activeView === 'transparency' && (
          <TransparencyView />
        )}

        {activeView === 'rtrw' && (
          <RtRwPortalView
            onOpenAddBeneficiary={handleOpenAddBeneficiary}
            onOpenRegisterPartner={handleOpenRegisterPartner}
            onSelectOrphan={handleOpenDreamBook}
          />
        )}

        {activeView === 'admin' && (
          currentUser.role === 'ADMIN' ? (
            <AdminDashboardView 
              onOpenCreateProgram={handleOpenCreateProgram}
              onOpenCreateStory={() => setIsCreateStoryOpen(true)}
              onExitAdmin={() => {
                setCurrentRole('DONATUR');
                setActiveView('home');
                addToastNotification('Mode Admin Terkunci', 'Anda telah kembali ke tampilan publik.', 'INFO');
              }}
            />
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 text-center space-y-4 shadow-sm my-6">
              <div className="w-16 h-16 bg-stone-100 border border-stone-200 rounded-2xl flex items-center justify-center mx-auto text-stone-600">
                <Lock className="w-8 h-8 text-stone-700" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-stone-900">Akses Terbatas Pengelola</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Halaman ini khusus untuk pengurus yayasan. Masukkan kunci rahasia untuk melanjutkan.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsSecretAdminOpen(true)}
                  className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>Masukkan Kunci Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('home')}
                  className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Beranda</span>
                </button>
              </div>
            </div>
          )
        )}

        {activeView === 'profile' && (
          <ProfileView
            onOpenAuth={() => setIsAuthOpen(true)}
            setActiveView={setActiveView}
          />
        )}

        {/* Global Dynamic Footer */}
        <footer className="mt-12 pt-8 pb-4 border-t border-stone-200/80 text-center space-y-3 text-stone-500">
          <div className="flex items-center justify-center space-x-2">
            <SiteBrandLogo size="sm" />
            <span className="font-extrabold text-xs text-stone-800 tracking-tight">
              {siteSettings.siteTitle || 'JAYA BOGOR'}
            </span>
            <button 
              type="button"
              onClick={() => setIsSecretAdminOpen(true)}
              className="text-stone-300 hover:text-stone-500 transition-colors p-0.5 cursor-pointer"
              title="Akses Pengelola"
            >
              •
            </button>
            <span className="text-xs font-semibold text-amber-800">
              {siteSettings.siteTagline || 'Janda Yatim Bogor'}
            </span>
          </div>

          <p className="text-[11px] text-stone-500 max-w-md mx-auto leading-relaxed px-2">
            {siteSettings.footerNote || siteSettings.siteDescription || 'Yayasan Solidaritas Janda Dhuafa & Tabungan Masa Depan Yatim Bogor'}
          </p>

          <div className="flex items-center justify-center flex-wrap gap-4 text-[11px] text-stone-500">
            {siteSettings.contactEmail && (
              <a href={`mailto:${siteSettings.contactEmail}`} className="flex items-center gap-1 hover:text-emerald-800 transition-colors">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>{siteSettings.contactEmail}</span>
              </a>
            )}
            {siteSettings.contactPhone && (
              <a href={`tel:${siteSettings.contactPhone}`} className="flex items-center gap-1 hover:text-emerald-800 transition-colors">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{siteSettings.contactPhone}</span>
              </a>
            )}
          </div>
        </footer>
      </main>

      {/* Bottom Sticky Mobile Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Secret Admin Authentication Modal */}
      <SecretAdminModal
        isOpen={isSecretAdminOpen}
        onClose={() => setIsSecretAdminOpen(false)}
        onSuccess={() => setActiveView('admin')}
      />

      {/* Modals */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => {
          setIsDonateOpen(false);
          setSelectedProgram(null);
          setSelectedBeneficiary(null);
        }}
        selectedProgram={selectedProgram}
        selectedBeneficiary={selectedBeneficiary}
      />

      <BukuMimpiModal
        isOpen={isBukuMimpiOpen}
        onClose={() => {
          setIsBukuMimpiOpen(false);
          setActiveDreamOrphan(null);
        }}
        beneficiary={activeDreamOrphan}
        onDonateToChild={handleDonateToOrphanChild}
      />

      <InstructorModal
        isOpen={isInstructorModalOpen}
        onClose={() => setIsInstructorModalOpen(false)}
      />

      <BeneficiaryTrainingModal
        isOpen={isBeneficiaryTrainingOpen}
        onClose={() => {
          setIsBeneficiaryTrainingOpen(false);
          setSelectedTrainingCourse(null);
        }}
        defaultCourse={selectedTrainingCourse}
      />

      <CreateProgramModal
        isOpen={isCreateProgramOpen}
        onClose={() => setIsCreateProgramOpen(false)}
      />

      <RtRwModal
        isOpen={isRtRwModalOpen}
        onClose={() => setIsRtRwModalOpen(false)}
        mode={rtRwModalMode}
      />

      <CreateStoryModal
        isOpen={isCreateStoryOpen}
        onClose={() => setIsCreateStoryOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccessNavigateDonate={() => handleOpenDonate()}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
