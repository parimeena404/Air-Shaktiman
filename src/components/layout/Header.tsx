'use client';

import React, { useState, useEffect } from 'react';
import { useEco } from '../../context/EcoContext';
import {
  Bell,
  Sparkles,
  Bot,
  Shield,
  Menu,
  X,
  CheckCircle2,
  LogIn,
  LogOut,
} from 'lucide-react';
import { MainTab } from '../../types';

export const Header: React.FC = () => {
  const { profile, role, setRole, activeTab, setActiveTab, alerts, toasts, removeToast, isMobileMenuOpen, toggleMobileMenu, isAuthenticated, openAuthModal, logout, clearAlert, clearAllAlerts } = useEco();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = (tab: MainTab): string => {
    switch (tab) {
      case 'overview':
        return role === 'government' ? 'Government Dashboard' : role === 'admin' ? 'Admin Dashboard' : 'Dashboard';
      case 'report-waste':
        return 'Report Waste';
      case 'contributions':
        return 'My Contributions';
      case 'eco-ai':
        return 'AI Assistant';
      case 'nearby':
        return 'Nearby Map';
      case 'redeem-rewards':
        return 'Redeem Points';
      case 'my-rewards':
        return 'My Vouchers';
      case 'partner-network':
        return 'Partner Directory';
      case 'community-feed':
        return 'Community Feed';
      case 'community-groups':
        return 'Eco Clubs & Events';
      case 'community-profile':
        return 'Profile';
      case 'market':
        return 'EcoMarket';
      case 'industry-demand':
        return 'Industry Demand';
      case 'matching':
        return 'AI Match System';
      case 'reuse-ideas':
        return 'Build From Waste';
      case 'community-projects':
        return 'Projects';
      case 'ecofood':
        return 'EcoFood Marketplace';
      case 'ecofood-partner':
        return 'Restaurant Partners';
      case 'ecofood-ngo':
        return 'NGO Food Rescue';
      case 'government-connect':
        return 'Government Connect';
      case 'civic-reporting':
        return 'Civic Issue Tracker';
      case 'challenges':
        return 'Eco Challenges';
      case 'leaderboard':
        return 'Leaderboard';
      case 'rewards':
        return 'Rewards';
      case 'campus-monitor':
        return 'City Monitor';
      case 'energy':
        return 'Energy Analytics';
      case 'water':
        return 'Water Analytics';
      case 'waste-analytics':
        return 'Waste Analytics';
      case 'admin-overview':
        return 'Admin Dashboard';
      case 'cleanup-operations':
        return 'Cleanup Operations';
      case 'material-flow':
        return 'Material Flow';
      case 'user-management':
        return 'User Directory';
      case 'impact-dashboard':
        return 'Impact Dashboard';
      case 'csr-hub':
        return 'CSR Impact Hub';
      case 'csr-missions':
        return 'CSR Missions';
      case 'csr-projects':
        return 'CSR Projects';
      case 'csr-funding':
        return 'CSR Funding Center';
      case 'csr-impact':
        return 'CSR Impact Dashboard';
      case 'csr-leaderboard':
        return 'CSR Leaderboard';
      case 'csr-reports':
        return 'CSR Reports';
      default:
        return 'Dashboard';
    }
  };

  // Role badge config
  const roleBadgeConfig: Record<string, { label: string; color: string; bg: string }> = {
    student: { label: 'User', color: '#4285F4', bg: '#E8F0FE' },
    corporate: { label: 'Corporate', color: '#E37400', bg: '#FEF7E0' },
    admin: { label: 'Admin', color: '#D93025', bg: '#FCE8E6' },
    government: { label: 'Government', color: '#137333', bg: '#E6F4EA' },
  };

  const currentRoleBadge = roleBadgeConfig[role] || roleBadgeConfig.student;

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md px-3 sm:px-4 md:px-6 py-3 flex items-center justify-between select-none"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottom: '1px solid #E8EAED',
        boxShadow: '0 1px 3px rgba(60, 64, 67, 0.08)',
      }}
    >
      {/* Toast Notification Container */}
      <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 max-w-none sm:max-w-sm w-auto pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-3 rounded-xl text-sm flex items-center justify-between animate-fade-in-up"
            style={{
              backgroundColor: toast.type === 'success' ? '#E6F4EA' : toast.type === 'warning' ? '#FEF7E0' : '#FCE8E6',
              color: toast.type === 'success' ? '#137333' : toast.type === 'warning' ? '#E37400' : '#D93025',
              border: `1px solid ${toast.type === 'success' ? '#34A853' : toast.type === 'warning' ? '#FBBC04' : '#EA4335'}40`,
              boxShadow: '0 4px 12px rgba(60, 64, 67, 0.15)',
            }}
          >
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

      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" style={{ color: '#5F6368' }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: '#5F6368' }} />
          )}
        </button>

        {/* Page Title */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold" style={{ color: '#202124' }}>
            {getPageTitle(activeTab)}
          </h2>
          <span
            className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-semibold"
            style={{ backgroundColor: currentRoleBadge.bg, color: currentRoleBadge.color }}
          >
            {currentRoleBadge.label}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Eco Points */}
        {role !== 'admin' && (
          <button
            onClick={() => setActiveTab('redeem-rewards')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-semibold"
            style={{
              backgroundColor: '#FEF7E0',
              color: '#E37400',
              border: '1px solid #FBBC0440',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{profile.ecoPoints.toLocaleString()} Pts</span>
          </button>
        )}

        {/* AI Assistant */}
        <button
          onClick={() => setActiveTab('eco-ai')}
          className="p-2 rounded-full transition-all"
          style={{
            backgroundColor: '#E8F0FE',
            color: '#4285F4',
          }}
          title="AI Assistant"
        >
          <Bot className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full transition-all relative"
            style={{
              backgroundColor: showNotifications ? '#E8F0FE' : '#F1F3F4',
              color: showNotifications ? '#4285F4' : '#5F6368',
            }}
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                style={{ backgroundColor: '#EA4335' }}
              >
                {alerts.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl p-4 z-50 text-xs space-y-3 animate-fade-in-up"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8EAED',
                boxShadow: '0 8px 24px rgba(60, 64, 67, 0.2)',
              }}
            >
              <div className="flex items-center justify-between pb-2.5" style={{ borderBottom: '1px solid #E8EAED' }}>
                <span className="font-bold flex items-center gap-2" style={{ color: '#202124' }}>
                  <Bell className="w-4 h-4" style={{ color: '#4285F4' }} />
                  Notifications
                </span>
                <div className="flex items-center gap-2">
                  <span className="gdg-badge gdg-badge-blue">{alerts.length} new</span>
                  {alerts.length > 0 && (
                    <button onClick={clearAllAlerts} className="text-[10px] hover:underline" style={{ color: '#EA4335' }}>
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {alerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-3 rounded-lg transition-colors space-y-1 relative group"
                    style={{
                      backgroundColor: '#F8F9FA',
                      border: '1px solid #E8EAED',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-xs line-clamp-1" style={{ color: '#202124' }}>{alt.title}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span
                          className={`gdg-badge ${
                            alt.severity === 'Critical' ? 'gdg-badge-red' :
                            alt.severity === 'Warning' ? 'gdg-badge-yellow' : 'gdg-badge-green'
                          }`}
                        >
                          {alt.severity}
                        </span>
                        <button
                          onClick={() => clearAlert(alt.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                          style={{ color: '#80868B' }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] leading-snug" style={{ color: '#5F6368' }}>{alt.message}</p>
                    {alt.timestamp && (
                      <div className="text-[9px] text-right" style={{ color: '#80868B' }}>{alt.timestamp}</div>
                    )}
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-6 text-xs" style={{ color: '#80868B' }}>
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Auth Button */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
            style={{
              backgroundColor: '#F1F3F4',
              color: '#5F6368',
              border: '1px solid #E8EAED',
            }}
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        ) : (
          <button
            onClick={openAuthModal}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all flex items-center gap-1.5"
            style={{
              backgroundColor: '#4285F4',
              boxShadow: '0 1px 3px rgba(66, 133, 244, 0.4)',
            }}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
