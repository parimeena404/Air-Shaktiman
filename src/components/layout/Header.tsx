'use client';

import React, { useState, useEffect } from 'react';
import { useEco } from '../../context/EcoContext';
import {
  Bell,
  Sparkles,
  Flame,
  Crown,
  Bot,
  Shield,
  Menu,
  X,
  CheckCircle2,
  Clock,
  Radio,
} from 'lucide-react';
import { MainTab } from '../../types';

export const Header: React.FC = () => {
  const { profile, role, setRole, activeTab, setActiveTab, alerts, toasts, removeToast } = useEco();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = (tab: MainTab): string => {
    switch (tab) {
      case 'overview':
        return 'ECOVERSE ARENA';
      case 'report-waste':
        return 'WASTE DISPOSAL // PROTOCOL';
      case 'contributions':
        return 'CONTRIBUTION MATRIX';
      case 'eco-ai':
        return 'AI HANDLER COPILOT';
      case 'nearby':
        return 'WORLD MAP & DISCOVERY';
      case 'redeem-rewards':
        return 'REWARD VAULT';
      case 'my-rewards':
        return 'ACTIVE VOUCHERS';
      case 'partner-network':
        return 'ECO PARTNERS DIRECTORY';
      case 'community-feed':
        return 'SOCIAL HUB // COMMUNITY';
      case 'community-groups':
        return 'SQUADS & CLUBS';
      case 'community-profile':
        return 'PLAYER PROFILE';
      case 'market':
        return 'ECO MARKETPLACE';
      case 'industry-demand':
        return 'INDUSTRY DEMAND BOARD';
      case 'matching':
        return 'AI MATCH MATRIX';
      case 'reuse-ideas':
        return 'BUILD FROM WASTE';
      case 'community-projects':
        return 'GUILD PROJECTS';
      case 'ecofood':
        return 'ECOFOOD SURPLUS MARKET';
      case 'ecofood-partner':
        return 'RESTAURANT PARTNER PORTAL';
      case 'ecofood-ngo':
        return 'NGO FOOD RESCUE ALLIANCE';
      case 'government-connect':
        return 'CIVIC & GOV CONNECT';
      case 'civic-reporting':
        return 'CIVIC ISSUE TRACKER';
      case 'challenges':
        return 'DAILY PROTOCOL & CHALLENGES';
      case 'leaderboard':
        return 'ARENA RANKING';
      case 'rewards':
        return 'REWARDS VAULT';
      case 'campus-monitor':
        return 'CAMPUS MONITOR';
      case 'energy':
        return 'ENERGY ANALYTICS';
      case 'water':
        return 'WATER ANALYTICS';
      case 'waste-analytics':
        return 'WASTE COMPOSITION';
      case 'admin-overview':
        return 'COMMAND CENTER // ADMIN';
      case 'cleanup-operations':
        return 'CLEANUP DISPATCH';
      case 'material-flow':
        return 'MATERIAL FLOW MATRIX';
      case 'user-management':
        return 'USER DIRECTORY';
      case 'impact-dashboard':
        return 'GLOBAL IMPACT DASHBOARD';
      case 'csr-hub':
        return 'CSR IMPACT HUB // ARENA';
      case 'csr-missions':
        return 'LIVE CSR SPONSORED MISSIONS';
      case 'csr-projects':
        return 'DISCOVER CSR PROJECTS';
      case 'csr-funding':
        return 'CSR FUNDING CENTER // PIPELINE';
      case 'csr-impact':
        return 'CSR IMPACT INTELLIGENCE';
      case 'csr-leaderboard':
        return 'CSR GLOBAL RANKING // LEADERBOARD';
      case 'csr-reports':
        return 'CSR IMPACT AUDIT REPORTS';
      default:
        return 'ECOVERSE ARENA';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#050B08]/95 backdrop-blur-md border-b border-[#12281D] px-4 md:px-6 py-2.5 flex items-center justify-between font-mono select-none">
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-lg border text-xs font-mono shadow-2xl flex items-center justify-between backdrop-blur-md animate-in slide-in-from-top-4 ${
              toast.type === 'success'
                ? 'bg-[#09120D] border-[#00FF66] text-[#00FF66] shadow-[#00FF66]/20'
                : toast.type === 'warning'
                ? 'bg-[#09120D] border-[#F5C518] text-[#F5C518] shadow-[#F5C518]/20'
                : 'bg-[#09120D] border-red-500 text-red-400 shadow-red-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-white ml-2">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Left: Mobile Toggle & Live Event Indicator */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#FF007A] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Live Event Ticker Badge */}
        <div className="flex items-center gap-2 bg-[#0D0F17] border border-[#FF007A]/50 px-3 py-1 rounded text-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
          <span className="text-[#FF007A] font-black tracking-wider">◯ SQUID ARENA LIVE</span>
          <span className="text-slate-400 hidden sm:inline text-[10px]">ZERO WASTE CAMPUS RAID</span>
        </div>
      </div>

      {/* Center: Player XP & Info Bar */}
      <div className="hidden lg:flex items-center gap-4 bg-[#0D0F17] border border-[#FF007A]/40 px-4 py-1.5 rounded-lg shadow-md">
        {/* Initial Badge Box */}
        <div className="w-8 h-8 rounded bg-[#FF007A]/20 border border-[#FF007A] flex items-center justify-center text-[#FF007A] font-black text-xs">
          #456
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px]">CONTESTANT // #456</span>
            <span className="text-white font-bold text-xs tracking-wide">DHEERAJ</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] rounded font-bold">
              LVL 12
            </span>
          </div>
          {/* XP Progress bar */}
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-32 bg-[#07080E] h-1.5 rounded-full overflow-hidden border border-[#1D2133]">
              <div className="bg-[#FF007A] h-full rounded-full glow-pink" style={{ width: '84%' }} />
            </div>
            <span className="text-[9px] text-[#03E5B7] font-bold">8,420 / 10,000 XP</span>
          </div>
        </div>
      </div>

      {/* Right: HUD Stats & Time Indicator */}
      <div className="flex items-center gap-3 md:gap-5">
        {/* Eco Points */}
        <div
          onClick={() => setActiveTab('redeem-rewards')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D0F17] border border-[#FFC700]/50 hover:border-[#FFC700] cursor-pointer transition-all glow-gold"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFC700]" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-slate-400 leading-none font-bold">ECO CASH POOL</span>
            <span className="text-xs font-black text-[#FFC700] leading-tight">
              ₹{profile.ecoPoints.toLocaleString()} Pts
            </span>
          </div>
        </div>

        {/* Streak Days */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D0F17] border border-[#FF007A]/40">
          <Flame className="w-3.5 h-3.5 text-[#FF007A]" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-slate-400 leading-none">SURVIVAL STREAK</span>
            <span className="text-xs font-bold text-white leading-tight">12 DAYS</span>
          </div>
        </div>

        {/* Global Rank */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D0F17] border border-[#03E5B7]/40">
          <Crown className="w-3.5 h-3.5 text-[#03E5B7]" />
          <div className="flex flex-col text-left">
            <span className="text-[9px] text-slate-400 leading-none">RANK</span>
            <span className="text-xs font-bold text-[#03E5B7] leading-tight">#27 / 456</span>
          </div>
        </div>

        {/* Clock & Sync Status */}
        <div className="hidden xl:flex flex-col text-right">
          <span className="text-[9px] text-slate-400">ARENA TIMER</span>
          <div className="flex items-center gap-1">
            <span className="text-xs text-white font-black tracking-widest">{timeString || '14:28:42'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#03E5B7] animate-ping" />
            <span className="text-[9px] text-[#03E5B7] font-bold">LIVE</span>
          </div>
        </div>

        {/* AI Handler Launch */}
        <button
          onClick={() => setActiveTab('eco-ai')}
          className="p-1.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/50 text-[#00FF66] hover:bg-[#00FF66]/20 transition-all glow-green-sm"
          title="Eco AI Handler"
        >
          <Bot className="w-4 h-4" />
        </button>

        {/* System Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded bg-[#09120D] border border-[#12281D] text-slate-400 hover:text-white relative"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00FF66] rounded-full animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#09120D] border border-[#00FF66]/40 rounded shadow-2xl p-3 z-50 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between border-b border-[#12281D] pb-2">
                <span className="font-bold text-[#00FF66] flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#00FF66]" /> SYSTEM ALERTS
                </span>
                <span className="text-[10px] text-[#00FF66]">{alerts.length} ACTIVE</span>
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {alerts.map((alt) => (
                  <div key={alt.id} className="p-2 rounded bg-[#050B08] border border-[#12281D] space-y-0.5">
                    <div className="font-bold text-white flex justify-between">
                      <span>{alt.title}</span>
                      <span className="text-[9px] text-[#00FF66]">{alt.severity}</span>
                    </div>
                    <p className="text-[10px] text-slate-400">{alt.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
