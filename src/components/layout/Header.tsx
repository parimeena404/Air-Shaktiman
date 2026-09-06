'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Sparkles,
  Bot,
  Menu,
  X,
  CheckCircle2,
  LogIn,
  LogOut,
} from 'lucide-react';
import { MainTab } from '../../types';

// Portal accent colors by URL
function getPortalStyle(pathname: string) {
  if (pathname.startsWith('/organization')) return { color: '#EA4335', bg: '#FCE8E6', label: 'Admin Portal' };
  if (pathname.startsWith('/csr')) return { color: '#E37400', bg: '#FEF7E0', label: 'Company Portal' };
  if (pathname.startsWith('/government')) return { color: '#137333', bg: '#E6F4EA', label: 'Government Portal' };
  return { color: '#4285F4', bg: '#E8F0FE', label: 'User Portal' };
}

export const Header: React.FC = () => {
  const { profile, activeTab, setActiveTab, alerts, toasts, removeToast, isMobileMenuOpen, toggleMobileMenu, isAuthenticated, openAuthModal, logout, clearAlert, clearAllAlerts } = useEco();
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const portalStyle = getPortalStyle(pathname || '');

  const getPageTitle = (tab: MainTab): string => {
    const titles: Record<string, string> = {
      'overview': 'Dashboard',
      'report-waste': 'Report Waste',
      'contributions': 'My Contributions',
      'eco-ai': 'AI Assistant',
      'nearby': 'Nearby Map',
      'redeem-rewards': 'Redeem Points',
      'my-rewards': 'My Vouchers',
      'partner-network': 'Partner Directory',
      'community-feed': 'Community Feed',
      'community-groups': 'Eco Clubs & Events',
      'community-profile': 'Profile',
      'market': 'EcoMarket',
      'industry-demand': 'Industry Demand',
      'matching': 'AI Match System',
      'reuse-ideas': 'Build From Waste',
      'community-projects': 'Projects',
      'ecofood': 'EcoFood Marketplace',
      'ecofood-partner': 'Restaurant Partners',
      'ecofood-ngo': 'NGO Food Rescue',
      'government-connect': 'Government Programs',
      'civic-reporting': 'Civic Issue Tracker',
      'challenges': 'Eco Challenges',
      'leaderboard': 'Leaderboard',
      'rewards': 'Rewards',
      'campus-monitor': 'Air / Pollution Index',
      'energy': 'Energy Analytics',
      'water': 'Water Analytics',
      'waste-analytics': 'Waste Analytics',
      'admin-overview': 'Admin Dashboard',
      'cleanup-operations': 'Cleanup Operations',
      'material-flow': 'Material Flow',
      'user-management': 'User Directory',
      'impact-dashboard': 'Impact Dashboard',
      'csr-hub': 'Company Profile',
      'csr-missions': 'CSR Missions',
      'csr-projects': 'CSR Projects',
      'csr-funding': 'Funding Center',
      'csr-impact': 'CSR Impact',
      'csr-leaderboard': 'CSR Rank',
      'csr-reports': 'CSR Reports',
    };
    return titles[tab] || 'Dashboard';
  };

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between select-none"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        borderBottom: `1px solid #E8EAED`,
        boxShadow: '0 1px 3px rgba(60, 64, 67, 0.08)',
      }}
    >
      {/* Toasts */}
      <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 max-w-none sm:max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id}
            className="pointer-events-auto p-3 rounded-xl text-sm flex items-center justify-between animate-fade-in-up"
            style={{
              backgroundColor: toast.type === 'success' ? '#E6F4EA' : toast.type === 'warning' ? '#FEF7E0' : '#FCE8E6',
              color: toast.type === 'success' ? '#137333' : toast.type === 'warning' ? '#E37400' : '#D93025',
              border: `1px solid ${toast.type === 'success' ? '#34A853' : toast.type === 'warning' ? '#FBBC04' : '#EA4335'}40`,
              boxShadow: '0 4px 12px rgba(60, 64, 67, 0.15)',
            }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-medium">{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Left: Toggle + Title */}
      <div className="flex items-center gap-3">
        <button onClick={toggleMobileMenu} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100">
          {isMobileMenuOpen ? <X className="w-5 h-5" style={{ color: '#5F6368' }} /> : <Menu className="w-5 h-5" style={{ color: '#5F6368' }} />}
        </button>
        <div className="flex items-center gap-2.5">
          <h2 className="text-base sm:text-lg font-bold" style={{ color: '#202124' }}>
            {getPageTitle(activeTab)}
          </h2>
          <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: portalStyle.bg, color: portalStyle.color }}>
            {portalStyle.label}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Eco Points */}
        <button onClick={() => setActiveTab('redeem-rewards')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ backgroundColor: '#FEF7E0', color: '#E37400', border: '1px solid #FBBC0440' }}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>{profile.ecoPoints.toLocaleString()} Pts</span>
        </button>

        {/* AI */}
        <button onClick={() => setActiveTab('eco-ai')}
          className="p-2 rounded-full" style={{ backgroundColor: portalStyle.bg, color: portalStyle.color }} title="AI Assistant">
          <Bot className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full relative"
            style={{ backgroundColor: showNotifications ? portalStyle.bg : '#F1F3F4', color: showNotifications ? portalStyle.color : '#5F6368' }}>
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: '#EA4335' }}>
                {alerts.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl p-4 z-50 text-xs space-y-3 animate-fade-in-up"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EAED', boxShadow: '0 8px 24px rgba(60, 64, 67, 0.2)' }}>
              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: '1px solid #E8EAED' }}>
                <span className="font-bold flex items-center gap-2" style={{ color: '#202124' }}>
                  <Bell className="w-4 h-4" style={{ color: portalStyle.color }} /> Notifications
                </span>
                {alerts.length > 0 && (
                  <button onClick={clearAllAlerts} className="text-[10px] hover:underline" style={{ color: '#EA4335' }}>Clear All</button>
                )}
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {alerts.map((alt) => (
                  <div key={alt.id} className="p-3 rounded-lg group" style={{ backgroundColor: '#F8F9FA', border: '1px solid #E8EAED' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: '#202124' }}>{alt.title}</span>
                      <button onClick={() => clearAlert(alt.id)} className="opacity-0 group-hover:opacity-100" style={{ color: '#80868B' }}>
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] mt-1" style={{ color: '#5F6368' }}>{alt.message}</p>
                  </div>
                ))}
                {alerts.length === 0 && <div className="text-center py-6" style={{ color: '#80868B' }}>No notifications</div>}
              </div>
            </div>
          )}
        </div>

        {/* Auth */}
        {isAuthenticated ? (
          <button onClick={logout}
            className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
            style={{ backgroundColor: '#F1F3F4', color: '#5F6368', border: '1px solid #E8EAED' }}>
            <LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Sign Out</span>
          </button>
        ) : (
          <button onClick={openAuthModal}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5"
            style={{ backgroundColor: portalStyle.color }}>
            <LogIn className="w-3.5 h-3.5" /><span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
