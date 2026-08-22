'use client';

import React, { useRef } from 'react';
import { useEco } from '../../context/EcoContext';
import { MainTab } from '../../types';
import {
  LayoutDashboard,
  Camera,
  History,
  Bot,
  ShoppingBag,
  Building2,
  Cpu,
  Hammer,
  Users,
  Trophy,
  Award,
  Gift,
  Activity,
  Zap,
  Droplet,
  Trash2,
  BarChart3,
  Shield,
  Utensils,
  Landmark,
  ShieldAlert,
  GitMerge,
  ChevronRight,
  Store,
  HeartHandshake,
  MapPin,
  QrCode,
  Globe,
  Sparkles,
  User,
  Briefcase,
  Target,
  Coins,
  FileText,
  Sprout,
  X,
} from 'lucide-react';

interface NavItem {
  id: MainTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, role, setRole, isMobileMenuOpen, closeMobileMenu, isAuthenticated, openAuthModal, logout } = useEco();

  const csrSection: NavSection = {
    title: 'CORPORATE IMPACT',
    items: [
      { id: 'csr-hub', label: 'CSR Impact Hub', icon: Building2, badge: 'ARENA' },
      { id: 'csr-missions', label: 'CSR Missions', icon: Target, badge: 'SPONSORED' },
      { id: 'csr-projects', label: 'Discover Projects', icon: Sprout },
      { id: 'csr-funding', label: 'Funding Center', icon: Coins, badge: '₹4.8Cr' },
      { id: 'csr-impact', label: 'Impact Dashboard', icon: BarChart3 },
      { id: 'csr-leaderboard', label: 'CSR Leaderboard', icon: Award },
      { id: 'csr-reports', label: 'CSR Reports', icon: FileText },
    ],
  };

  // Student Navigation Sections
  const studentSections: NavSection[] = [
    {
      title: 'MISSION CONTROL',
      items: [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'report-waste', label: 'Report Waste', icon: Camera, badge: '+10 Pts' },
        { id: 'contributions', label: 'My Contributions', icon: History },
        { id: 'eco-ai', label: 'Eco AI Handler', icon: Bot, badge: 'Copilot' },
      ],
    },
    {
      title: 'DISCOVER & NEARBY MAP',
      items: [
        { id: 'nearby', label: 'Nearby Map', icon: MapPin, badge: '🔵 YOU' },
        { id: 'redeem-rewards', label: 'Redeem Eco Points', icon: Gift, badge: 'Vault' },
        { id: 'my-rewards', label: 'My Vouchers', icon: QrCode },
        { id: 'partner-network', label: 'Partner Directory', icon: Store },
      ],
    },
    {
      title: 'COMMUNITY SOCIAL',
      items: [
        { id: 'community-feed', label: 'Community Feed', icon: Globe, badge: 'Social' },
        { id: 'community-groups', label: 'Eco Clubs & Events', icon: Users },
        { id: 'community-profile', label: 'Social Profile', icon: User },
      ],
    },
    {
      title: 'CIRCULAR ECONOMY',
      items: [
        { id: 'market', label: 'EcoMarket', icon: ShoppingBag },
        { id: 'industry-demand', label: 'Industry Demand', icon: Building2, badge: 'B2B' },
        { id: 'matching', label: 'AI Match Matrix', icon: Cpu },
        { id: 'reuse-ideas', label: 'Build From Waste', icon: Hammer },
        { id: 'community-projects', label: 'Guild Projects', icon: Users },
      ],
    },
    {
      title: 'ECOFOOD SURPLUS NETWORK',
      items: [
        { id: 'ecofood', label: 'EcoFood Marketplace', icon: Utensils, badge: '50% OFF' },
        { id: 'ecofood-partner', label: 'Restaurant Partner', icon: Store },
        { id: 'ecofood-ngo', label: 'NGO Food Rescue', icon: HeartHandshake },
      ],
    },
    {
      title: 'GOVERNMENT & CIVIC',
      items: [
        { id: 'government-connect', label: 'Government Connect', icon: Landmark, badge: 'CPCB/LiFE' },
        { id: 'civic-reporting', label: 'Civic Issue Tracker', icon: ShieldAlert },
      ],
    },
    {
      title: 'SURVIVAL ARENA',
      items: [
        { id: 'challenges', label: 'Eco Challenges', icon: Trophy, badge: '₹25k' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Award },
        { id: 'rewards', label: 'Rewards Vault', icon: Gift },
      ],
    },
    {
      title: 'CITY INTELLIGENCE',
      items: [
        { id: 'campus-monitor', label: 'City Monitor', icon: Activity },
        { id: 'energy', label: 'Energy Grid', icon: Zap },
        { id: 'water', label: 'Water Monitor', icon: Droplet },
        { id: 'waste-analytics', label: 'Waste Analytics', icon: Trash2 },
      ],
    },
    {
      title: 'GLOBAL IMPACT',
      items: [{ id: 'impact-dashboard', label: 'Impact Matrix', icon: BarChart3 }],
    },
  ];

  // Corporate Sponsor Navigation Sections
  const corporateSections: NavSection[] = [
    csrSection,
    {
      title: 'OPERATIONS',
      items: [
        { id: 'admin-overview', label: 'Command Overview', icon: LayoutDashboard },
        { id: 'report-waste', label: 'Waste Reports', icon: Camera },
      ],
    },
    {
      title: 'CIRCULAR MARKET',
      items: [
        { id: 'market', label: 'Marketplace', icon: ShoppingBag },
        { id: 'industry-demand', label: 'Industry Demand', icon: Building2 },
      ],
    },
  ];

  // Admin Front Man Navigation Sections
  const adminSections: NavSection[] = [
    csrSection,
    {
      title: 'OPERATIONS',
      items: [
        { id: 'admin-overview', label: 'Admin Dashboard', icon: LayoutDashboard },
        { id: 'report-waste', label: 'Waste Reports', icon: Camera },
        { id: 'cleanup-operations', label: 'Cleanup Operations', icon: ShieldAlert, badge: '12 Pending' },
      ],
    },
    {
      title: 'PARTNER NETWORK',
      items: [
        { id: 'nearby', label: 'Nearby Map', icon: MapPin },
        { id: 'partner-network', label: 'Rewards Partners', icon: Store },
        { id: 'redeem-rewards', label: 'Reward Management', icon: Gift },
      ],
    },
    {
      title: 'COMMUNITY SOCIAL',
      items: [
        { id: 'community-feed', label: 'Community Feed', icon: Globe },
        { id: 'user-management', label: 'User Directory', icon: Users },
        { id: 'community-groups', label: 'Eco Clubs', icon: Users },
      ],
    },
    {
      title: 'CIRCULAR ECONOMY',
      items: [
        { id: 'market', label: 'Marketplace', icon: ShoppingBag },
        { id: 'industry-demand', label: 'Industry Demand', icon: Building2 },
        { id: 'material-flow', label: 'Material Flow', icon: GitMerge },
      ],
    },
    {
      title: 'FOOD RESCUE',
      items: [
        { id: 'ecofood', label: 'EcoFood Listings', icon: Utensils },
        { id: 'ecofood-partner', label: 'Restaurants & Cafés', icon: Store },
        { id: 'ecofood-ngo', label: 'NGO Rescue Requests', icon: HeartHandshake },
      ],
    },
    {
      title: 'GOVERNMENT',
      items: [
        { id: 'government-connect', label: 'Government Programs', icon: Landmark },
        { id: 'civic-reporting', label: 'Civic Reports', icon: ShieldAlert },
      ],
    },
    {
      title: 'CITY INTELLIGENCE',
      items: [
        { id: 'campus-monitor', label: 'City Monitor', icon: Activity },
        { id: 'energy', label: 'Energy Grid', icon: Zap },
        { id: 'water', label: 'Water Grid', icon: Droplet },
        { id: 'waste-analytics', label: 'Waste Analytics', icon: Trash2 },
      ],
    },
    {
      title: 'ANALYTICS',
      items: [{ id: 'impact-dashboard', label: 'Environmental Impact', icon: BarChart3 }],
    },
  ];

  const currentSections =
    role === 'corporate'
      ? corporateSections
      : role === 'admin'
      ? adminSections
      : studentSections;

  const desktopNavRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const savedScroll = sessionStorage.getItem('sidebar_scroll_top');
    if (savedScroll) {
      const top = parseInt(savedScroll, 10);
      if (desktopNavRef.current) desktopNavRef.current.scrollTop = top;
      if (mobileNavRef.current) mobileNavRef.current.scrollTop = top;
    }
  }, [activeTab, role]);

  const handleItemClick = (id: MainTab) => {
    if (desktopNavRef.current) {
      sessionStorage.setItem('sidebar_scroll_top', desktopNavRef.current.scrollTop.toString());
    }
    if (mobileNavRef.current) {
      sessionStorage.setItem('sidebar_scroll_top', mobileNavRef.current.scrollTop.toString());
    }

    setActiveTab(id);
    closeMobileMenu();
  };

  const handleRoleChange = (newRole: 'student' | 'corporate' | 'admin') => {
    if (newRole === 'admin' && profile.role !== 'admin') {
      return;
    }
    if (newRole === 'corporate' && profile.role !== 'corporate' && profile.role !== 'admin') {
      return;
    }
    setRole(newRole);
    if (newRole === 'corporate') {
      setActiveTab('csr-hub');
    }
    closeMobileMenu();
  };

  const renderInnerContent = (isMobile = false) => (
    <>
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1D2133] space-y-1 bg-[#0D0F17] font-mono">
        <div className="flex items-center justify-between">
          <h1 className="font-black text-xl text-white tracking-wider flex items-center gap-2">
            <span className="text-[#FF007A] text-lg font-bold">◯ △ □</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF007A] via-[#FFC700] to-[#03E5B7]">
              CITY GUARDIAN
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] font-bold">
              SQUID EDITION
            </span>
            {isMobile && (
              <button
                onClick={closeMobileMenu}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1D2133]"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#03E5B7]">
          <span>CONTESTANT ARENA // R7</span>
          <span className="text-[#FF007A] flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF007A] inline-block animate-ping" />
            GAME ACTIVE
          </span>
        </div>
      </div>

      {/* Role Mode Selector */}
      <div className="px-3 py-2 bg-[#0D0F17] border-b border-[#1D2133] flex items-center justify-between text-xs font-sans">
        <span className="text-slate-400 text-[10px] font-bold">ROLE //</span>
        <div className="inline-flex p-0.5 rounded bg-[#07080E] border border-[#1D2133]">
          <button
            onClick={() => handleRoleChange('student')}
            className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
              role === 'student'
                ? 'bg-[#03E5B7] text-[#07080E] shadow-sm glow-teal'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            #456 PLAYER
          </button>
          {(profile.role === 'corporate' || profile.role === 'admin') && (
            <button
              onClick={() => handleRoleChange('corporate')}
              className={`px-2 py-0.5 rounded text-[10px] font-black transition-all flex items-center gap-1 ${
                role === 'corporate'
                  ? 'bg-[#FFC700] text-[#07080E] shadow-sm glow-gold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-2.5 h-2.5" />
              CSR
            </button>
          )}
          {profile.role === 'admin' && (
            <button
              onClick={() => handleRoleChange('admin')}
              className={`px-2 py-0.5 rounded text-[10px] font-black transition-all flex items-center gap-1 ${
                role === 'admin'
                  ? 'bg-[#FF007A] text-white shadow-sm glow-pink'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-2.5 h-2.5" />
              FRONT MAN
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        ref={isMobile ? mobileNavRef : desktopNavRef}
        onScroll={(e) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('sidebar_scroll_top', e.currentTarget.scrollTop.toString());
          }
        }}
        className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar"
      >
        {currentSections.map((sec) => (
          <div key={sec.title}>
            <div className="px-2 mb-1.5 text-[9px] font-bold text-[#FF007A] tracking-widest uppercase flex items-center justify-between font-sans">
              <span>{sec.title}</span>
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-[#180B1B] border border-[#FF007A] text-white font-bold shadow-[0_0_15px_rgba(255,0,122,0.3)] border-l-4 border-l-[#FF007A]'
                        : 'text-slate-300 hover:text-white hover:bg-[#0D0F17] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-[#FF007A]' : 'text-slate-500'
                        }`}
                      />
                      <span className="tracking-wide">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[8px] px-1.5 py-0.5 rounded font-mono font-bold ${
                            isActive
                              ? 'bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/40'
                              : 'bg-[#07080E] border border-[#1D2133] text-slate-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[#FF007A]' : 'text-slate-600'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer Player Info Card */}
      <div className="p-2.5 border-t border-[#1D2133] bg-[#0D0F17]">
        <div
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal();
              closeMobileMenu();
            } else {
              handleItemClick('community-profile');
            }
          }}
          className="p-2 rounded bg-[#07080E] border border-[#FF007A]/40 hover:border-[#FF007A] cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FF007A]/20 border border-[#FF007A] flex items-center justify-center text-[#FF007A] font-black text-xs">
              {profile.playerNumber || '#456'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate max-w-[100px]">{profile.name}</span>
                <span className={`text-[8px] px-1 py-0.2 rounded font-bold border ${
                  isAuthenticated
                    ? 'bg-[#03E5B7]/20 text-[#03E5B7] border-[#03E5B7]/40'
                    : 'bg-[#FF007A]/20 text-[#FF007A] border-[#FF007A]/40'
                }`}>
                  {isAuthenticated ? '◯ VERIFIED' : 'GUEST'}
                </span>
              </div>
              <p className="text-[9px] text-[#FF007A] font-bold">
                {isAuthenticated ? 'CONTESTANT · ACTIVE' : 'TAP TO AUTHENTICATE'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#FF007A]" />
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Persistent Desktop Navigation Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#07080E] border-r border-[#1D2133] h-screen sticky top-0 z-40 select-none font-mono">
        {renderInnerContent(false)}
      </aside>

      {/* Mobile Drawer Overlay & Slide-over Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />
          {/* Slide-over Container */}
          <aside className="relative flex flex-col w-72 max-w-[85vw] bg-[#07080E] border-r border-[#1D2133] h-full shadow-2xl z-10 select-none font-mono animate-in slide-in-from-left duration-200">
            {renderInnerContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};


