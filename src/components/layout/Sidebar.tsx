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
  LogOut,
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

// Google color mapping for section titles
const sectionColors: Record<string, string> = {
  'MISSION CONTROL': '#4285F4',
  'DISCOVER & NEARBY': '#EA4335',
  'COMMUNITY': '#34A853',
  'CIRCULAR ECONOMY': '#FBBC04',
  'ECO FOOD': '#EA4335',
  'GOVERNMENT & CIVIC': '#34A853',
  'CHALLENGES & REWARDS': '#4285F4',
  'CITY INTELLIGENCE': '#FBBC04',
  'IMPACT': '#34A853',
  'CORPORATE IMPACT': '#FBBC04',
  'OPERATIONS': '#4285F4',
  'CIRCULAR MARKET': '#34A853',
  'PARTNER NETWORK': '#EA4335',
  'COMMUNITY SOCIAL': '#34A853',
  'FOOD RESCUE': '#EA4335',
  'GOVERNMENT': '#34A853',
  'ANALYTICS': '#FBBC04',
  'CIVIC OPERATIONS': '#4285F4',
  'MONITORING': '#FBBC04',
  'GOVERNMENT PORTAL': '#34A853',
};

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, role, setRole, isMobileMenuOpen, closeMobileMenu, isAuthenticated, openAuthModal, logout } = useEco();

  const csrSection: NavSection = {
    title: 'CORPORATE IMPACT',
    items: [
      { id: 'csr-hub', label: 'CSR Impact Hub', icon: Building2 },
      { id: 'csr-missions', label: 'CSR Missions', icon: Target },
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
        { id: 'eco-ai', label: 'Eco AI Assistant', icon: Bot, badge: 'AI' },
      ],
    },
    {
      title: 'DISCOVER & NEARBY',
      items: [
        { id: 'nearby', label: 'Nearby Map', icon: MapPin },
        { id: 'redeem-rewards', label: 'Redeem Eco Points', icon: Gift },
        { id: 'my-rewards', label: 'My Vouchers', icon: QrCode },
        { id: 'partner-network', label: 'Partner Directory', icon: Store },
      ],
    },
    {
      title: 'COMMUNITY',
      items: [
        { id: 'community-feed', label: 'Community Feed', icon: Globe },
        { id: 'community-groups', label: 'Eco Clubs & Events', icon: Users },
        { id: 'community-profile', label: 'Profile', icon: User },
      ],
    },
    {
      title: 'CIRCULAR ECONOMY',
      items: [
        { id: 'market', label: 'EcoMarket', icon: ShoppingBag },
        { id: 'industry-demand', label: 'Industry Demand', icon: Building2, badge: 'B2B' },
        { id: 'matching', label: 'AI Match', icon: Cpu },
        { id: 'reuse-ideas', label: 'Build From Waste', icon: Hammer },
        { id: 'community-projects', label: 'Projects', icon: Users },
      ],
    },
    {
      title: 'ECO FOOD',
      items: [
        { id: 'ecofood', label: 'Food Marketplace', icon: Utensils },
        { id: 'ecofood-partner', label: 'Restaurant Partner', icon: Store },
        { id: 'ecofood-ngo', label: 'NGO Food Rescue', icon: HeartHandshake },
      ],
    },
    {
      title: 'GOVERNMENT & CIVIC',
      items: [
        { id: 'government-connect', label: 'Government Connect', icon: Landmark },
        { id: 'civic-reporting', label: 'Civic Issue Tracker', icon: ShieldAlert },
      ],
    },
    {
      title: 'CHALLENGES & REWARDS',
      items: [
        { id: 'challenges', label: 'Eco Challenges', icon: Trophy },
        { id: 'leaderboard', label: 'Leaderboard', icon: Award },
        { id: 'rewards', label: 'Rewards', icon: Gift },
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
      title: 'IMPACT',
      items: [{ id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 }],
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
        { id: 'cleanup-operations', label: 'Cleanup Operations', icon: ShieldAlert, badge: '12' },
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

  // Government Navigation Sections
  const governmentSections: NavSection[] = [
    {
      title: 'GOVERNMENT PORTAL',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'government-connect', label: 'Government Programs', icon: Landmark },
        { id: 'civic-reporting', label: 'Civic Issue Tracker', icon: ShieldAlert },
      ],
    },
    {
      title: 'CIVIC OPERATIONS',
      items: [
        { id: 'cleanup-operations', label: 'Cleanup Operations', icon: Shield, badge: 'Active' },
        { id: 'material-flow', label: 'Material Flow', icon: GitMerge },
        { id: 'user-management', label: 'Citizen Directory', icon: Users },
      ],
    },
    {
      title: 'MONITORING',
      items: [
        { id: 'campus-monitor', label: 'City Monitor', icon: Activity },
        { id: 'energy', label: 'Energy Grid', icon: Zap },
        { id: 'water', label: 'Water Monitor', icon: Droplet },
        { id: 'waste-analytics', label: 'Waste Analytics', icon: Trash2 },
      ],
    },
    {
      title: 'IMPACT',
      items: [{ id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 }],
    },
  ];

  const currentSections =
    role === 'corporate'
      ? corporateSections
      : role === 'admin'
      ? adminSections
      : role === 'government'
      ? governmentSections
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

  const handleRoleChange = (newRole: 'student' | 'corporate' | 'admin' | 'government') => {
    if (newRole === 'admin' && profile.role !== 'admin') {
      return;
    }
    if (newRole === 'corporate' && profile.role !== 'corporate' && profile.role !== 'admin') {
      return;
    }
    if (newRole === 'government' && profile.role !== 'government' && profile.role !== 'admin') {
      return;
    }
    setRole(newRole);
    if (newRole === 'corporate') {
      setActiveTab('csr-hub');
    } else if (newRole === 'government') {
      setActiveTab('overview');
    }
    closeMobileMenu();
  };

  // Role badge styling
  const roleBadgeConfig: Record<string, { label: string; color: string; bg: string }> = {
    student: { label: 'User', color: '#4285F4', bg: '#E8F0FE' },
    corporate: { label: 'Corporate', color: '#E37400', bg: '#FEF7E0' },
    admin: { label: 'Admin', color: '#D93025', bg: '#FCE8E6' },
    government: { label: 'Government', color: '#137333', bg: '#E6F4EA' },
  };

  const currentRoleBadge = roleBadgeConfig[role] || roleBadgeConfig.student;

  const renderInnerContent = (isMobile = false) => (
    <>
      {/* Brand Header */}
      <div className="p-4 border-b" style={{ borderColor: '#E8EAED' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Google 4-dot logo */}
            <div className="flex gap-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4285F4' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EA4335' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#34A853' }} />
            </div>
            <h1 className="font-bold text-base" style={{ color: '#202124' }}>
              Air Shaktiman
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: currentRoleBadge.bg, color: currentRoleBadge.color }}
            >
              {currentRoleBadge.label}
            </span>
            {isMobile && (
              <button
                onClick={closeMobileMenu}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" style={{ color: '#5F6368' }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Role Mode Selector */}
      <div className="px-3 py-2 border-b flex items-center justify-between text-xs"
        style={{ borderColor: '#E8EAED', backgroundColor: '#F8F9FA' }}>
        <span className="text-[10px] font-semibold" style={{ color: '#80868B' }}>Dashboard</span>
        <div className="inline-flex p-0.5 rounded-full" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EAED' }}>
          <button
            onClick={() => handleRoleChange('student')}
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
            style={{
              backgroundColor: role === 'student' ? '#E8F0FE' : 'transparent',
              color: role === 'student' ? '#4285F4' : '#80868B',
            }}
          >
            User
          </button>
          {(profile.role === 'corporate' || profile.role === 'admin') && (
            <button
              onClick={() => handleRoleChange('corporate')}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all flex items-center gap-1"
              style={{
                backgroundColor: role === 'corporate' ? '#FEF7E0' : 'transparent',
                color: role === 'corporate' ? '#E37400' : '#80868B',
              }}
            >
              CSR
            </button>
          )}
          {(profile.role === 'government' || profile.role === 'admin') && (
            <button
              onClick={() => handleRoleChange('government')}
              className="px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all"
              style={{
                backgroundColor: role === 'government' ? '#E6F4EA' : 'transparent',
                color: role === 'government' ? '#137333' : '#80868B',
              }}
            >
              Gov
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
        className="flex-1 overflow-y-auto px-2 py-3 space-y-4"
      >
        {currentSections.map((sec) => {
          const sectionColor = sectionColors[sec.title] || '#4285F4';
          return (
            <div key={sec.title}>
              <div className="px-2 mb-1.5 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
                style={{ color: sectionColor }}>
                <div className="w-1 h-3 rounded-full" style={{ backgroundColor: sectionColor, opacity: 0.5 }} />
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
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all"
                      style={{
                        backgroundColor: isActive ? '#E8F0FE' : 'transparent',
                        color: isActive ? '#1A73E8' : '#3C4043',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className="w-4 h-4"
                          style={{ color: isActive ? '#4285F4' : '#80868B' }}
                        />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                            style={{
                              backgroundColor: isActive ? '#D2E3FC' : '#F1F3F4',
                              color: isActive ? '#1A73E8' : '#80868B',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight
                          className="w-3.5 h-3.5"
                          style={{ color: isActive ? '#4285F4' : '#DADCE0' }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Player Info Card */}
      <div className="p-2.5 border-t" style={{ borderColor: '#E8EAED' }}>
        <div
          onClick={() => {
            if (!isAuthenticated) {
              openAuthModal();
              closeMobileMenu();
            } else {
              handleItemClick('community-profile');
            }
          }}
          className="p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between hover:bg-gray-50"
          style={{ border: '1px solid #E8EAED' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ backgroundColor: '#4285F4' }}
            >
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold truncate max-w-[100px]"
                  style={{ color: '#202124' }}>
                  {profile.name}
                </span>
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{
                    backgroundColor: isAuthenticated ? '#E6F4EA' : '#FCE8E6',
                    color: isAuthenticated ? '#137333' : '#D93025',
                  }}
                >
                  {isAuthenticated ? 'Verified' : 'Guest'}
                </span>
              </div>
              <p className="text-[10px]" style={{ color: '#80868B' }}>
                {isAuthenticated ? `${profile.ecoPoints || 0} Eco Points` : 'Tap to sign in'}
              </p>
            </div>
          </div>
          {isAuthenticated && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                logout();
                closeMobileMenu();
              }}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" style={{ color: '#80868B' }} />
            </button>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Persistent Desktop Navigation Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40 select-none"
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8EAED',
        }}
      >
        {renderInnerContent(false)}
      </aside>

      {/* Mobile Drawer Overlay & Slide-over Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />
          {/* Slide-over Container */}
          <aside
            className="relative flex flex-col w-72 max-w-[85vw] h-full z-10 select-none animate-slide-in-left"
            style={{
              backgroundColor: '#FFFFFF',
              borderRight: '1px solid #E8EAED',
              boxShadow: '4px 0 24px rgba(60, 64, 67, 0.15)',
            }}
          >
            {renderInnerContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
