import React from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Heart, 
  FileText, 
  Info,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-200 flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-emerald-900 text-white p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h3 className="font-extrabold text-sm sm:text-base">Pemberitahuan Penyaluran</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-emerald-200 hover:text-white flex items-center gap-1 font-semibold"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Tandai Semua
            </button>
            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1 divide-y divide-stone-100">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              Belum ada notifikasi baru saat ini.
            </div>
          ) : (
            notifications.map((n) => (
              <div 
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`pt-2.5 first:pt-0 pb-1 cursor-pointer transition-colors ${
                  !n.read ? 'bg-emerald-50/50 -mx-2 px-2 rounded-xl' : ''
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {n.type === 'DONATION' ? '🌾' : '📖'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-stone-900 truncate">{n.title}</h4>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      {new Date(n.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
