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
  Landmark,
  ShieldAlert,
  ChevronRight,
  Store,
  MapPin,
  Globe,
  User,
  Briefcase,
  Target,
  Coins,
  FileText,
  Sprout,
  X,
  LogOut,
  MessageSquare,
  Ticket,
  CalendarDays,
  CloudSun,
  Wind,
  Timer,
  Image,
  Send,
  CheckCircle,
} from 'lucide-react';

interface NavItem {
  id: MainTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavSection {
  title: string;
  color: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, role, setRole, isMobileMenuOpen, closeMobileMenu, isAuthenticated, openAuthModal, logout } = useEco();

  // ─────────────────────────────────────────────────────────
  // ADMIN (Government) Dashboard Sections
  // ─────────────────────────────────────────────────────────
  const adminSections: NavSection[] = [
    {
      title: 'ADMINISTRATION',
      color: '#EA4335',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'user-management', label: 'User Image & Tasks', icon: Image },
        { id: 'report-waste', label: 'Report Submissions', icon: Send, badge: 'Review' },
      ],
    },
    {
      title: 'AI & ANALYTICS',
      color: '#4285F4',
      items: [
        { id: 'eco-ai', label: 'AI Decision Helper', icon: Bot, badge: 'AI' },
        { id: 'campus-monitor', label: 'Air / Pollution Index', icon: Wind },
        { id: 'energy', label: 'Reverse Timer', icon: Timer },
      ],
    },
    {
      title: 'ZONE MONITORING',
      color: '#34A853',
      items: [
        { id: 'nearby', label: 'Weather Maps & Zones', icon: CloudSun },
        { id: 'waste-analytics', label: 'Zone Analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'COMMUNITY',
      color: '#FBBC04',
      items: [
        { id: 'leaderboard', label: 'Inter-Zone Leaderboard', icon: Trophy, badge: '🏆' },
        { id: 'rewards', label: 'Gifts & Rewards', icon: Gift },
        { id: 'community-feed', label: 'Postings', icon: Globe },
      ],
    },
    {
      title: 'OPERATIONS',
      color: '#EA4335',
      items: [
        { id: 'cleanup-operations', label: 'Cleanup Operations', icon: ShieldAlert },
        { id: 'material-flow', label: 'Material Flow', icon: Activity },
        { id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────
  // USER Dashboard Sections
  // ─────────────────────────────────────────────────────────
  const userSections: NavSection[] = [
    {
      title: 'MY DASHBOARD',
      color: '#4285F4',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'COMMUNITY',
      color: '#34A853',
      items: [
        { id: 'community-feed', label: 'Community Page', icon: Globe },
        { id: 'community-groups', label: 'Eco Clubs', icon: Users },
      ],
    },
    {
      title: 'COMPLAINTS',
      color: '#EA4335',
      items: [
        { id: 'civic-reporting', label: 'Complain Page', icon: MessageSquare, badge: 'Report' },
        { id: 'report-waste', label: 'Report Waste', icon: Camera },
      ],
    },
    {
      title: 'COUPONS & REWARDS',
      color: '#FBBC04',
      items: [
        { id: 'redeem-rewards', label: 'Coupon Page', icon: Ticket },
        { id: 'my-rewards', label: 'My Vouchers', icon: Gift },
        { id: 'partner-network', label: 'Partner Stores', icon: Store },
      ],
    },
    {
      title: 'MY CONTRIBUTION',
      color: '#4285F4',
      items: [
        { id: 'contributions', label: 'My Contributions', icon: History },
        { id: 'challenges', label: 'Eco Challenges', icon: Trophy },
        { id: 'market', label: 'EcoMarket', icon: ShoppingBag },
      ],
    },
    {
      title: 'EVENTS & PROFILE',
      color: '#34A853',
      items: [
        { id: 'community-profile', label: 'My Profile', icon: User },
        { id: 'nearby', label: 'Nearby Events & Map', icon: MapPin },
        { id: 'impact-dashboard', label: 'My Impact', icon: BarChart3 },
      ],
    },
    {
      title: 'AI CHATBOT',
      color: '#4285F4',
      items: [
        { id: 'eco-ai', label: 'AI Eco Assistant', icon: Bot, badge: 'AI' },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────
  // COMPANY (Corporate) Dashboard Sections
  // ─────────────────────────────────────────────────────────
  const companySections: NavSection[] = [
    {
      title: 'COMPANY DASHBOARD',
      color: '#FBBC04',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'COMPANY PROFILE',
      color: '#4285F4',
      items: [
        { id: 'csr-hub', label: 'Company Profile', icon: Building2 },
        { id: 'csr-projects', label: 'Our Projects', icon: Sprout },
        { id: 'csr-reports', label: 'Impact Reports', icon: FileText },
      ],
    },
    {
      title: 'USER POINTS & COUPONS',
      color: '#34A853',
      items: [
        { id: 'csr-funding', label: 'User Points & Coupon Redeem', icon: Coins, badge: '₹' },
        { id: 'csr-missions', label: 'Sponsored Missions', icon: Target },
        { id: 'redeem-rewards', label: 'Reward Management', icon: Gift },
      ],
    },
    {
      title: 'CSR RANKING',
      color: '#EA4335',
      items: [
        { id: 'csr-leaderboard', label: 'CSR Rank', icon: Award, badge: '🏅' },
        { id: 'csr-impact', label: 'CSR Impact Score', icon: BarChart3 },
      ],
    },
    {
      title: 'ADMIN CHECK',
      color: '#FBBC04',
      items: [
        { id: 'admin-overview', label: 'Org (Admin) Check', icon: CheckCircle },
        { id: 'community-feed', label: 'Company Postings', icon: Globe },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────
  // GOVERNMENT Dashboard Sections (similar to admin but focused)
  // ─────────────────────────────────────────────────────────
  const governmentSections: NavSection[] = [
    {
      title: 'GOVERNMENT PORTAL',
      color: '#34A853',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'government-connect', label: 'Government Programs', icon: Landmark },
      ],
    },
    {
      title: 'CIVIC MANAGEMENT',
      color: '#4285F4',
      items: [
        { id: 'civic-reporting', label: 'Civic Issue Tracker', icon: ShieldAlert },
        { id: 'report-waste', label: 'Report Submissions', icon: Send },
        { id: 'user-management', label: 'Citizen Directory', icon: Users },
      ],
    },
    {
      title: 'ENVIRONMENT',
      color: '#EA4335',
      items: [
        { id: 'campus-monitor', label: 'Air / Pollution Index', icon: Wind },
        { id: 'nearby', label: 'Weather & Zone Maps', icon: CloudSun },
        { id: 'energy', label: 'Energy Grid', icon: Zap },
        { id: 'water', label: 'Water Monitor', icon: Droplet },
      ],
    },
    {
      title: 'OPERATIONS',
      color: '#FBBC04',
      items: [
        { id: 'cleanup-operations', label: 'Cleanup Operations', icon: Shield },
        { id: 'material-flow', label: 'Material Flow', icon: Activity },
        { id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 },
      ],
    },
  ];

  const currentSections =
    role === 'corporate'
      ? companySections
      : role === 'admin'
      ? adminSections
      : role === 'government'
      ? governmentSections
      : userSections;

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
    if (newRole === 'admin' && profile.role !== 'admin') return;
    if (newRole === 'corporate' && profile.role !== 'corporate' && profile.role !== 'admin') return;
    if (newRole === 'government' && profile.role !== 'government' && profile.role !== 'admin') return;
    setRole(newRole);
    setActiveTab('overview');
    closeMobileMenu();
  };

  // Role badge & tab styling
  const roleConfig: Record<string, { label: string; color: string; bg: string; emoji: string }> = {
    student: { label: 'User', color: '#4285F4', bg: '#E8F0FE', emoji: '👤' },
    corporate: { label: 'Company', color: '#E37400', bg: '#FEF7E0', emoji: '🏢' },
    admin: { label: 'Admin', color: '#D93025', bg: '#FCE8E6', emoji: '🛡️' },
    government: { label: 'Government', color: '#137333', bg: '#E6F4EA', emoji: '🏛️' },
  };

  const currentRole = roleConfig[role] || roleConfig.student;

  // Determine which role tabs to show
  const availableRoles: Array<{ key: string; label: string; color: string; bg: string }> = [
    { key: 'student', label: 'User', color: '#4285F4', bg: '#E8F0FE' },
  ];
  if (profile.role === 'corporate' || profile.role === 'admin') {
    availableRoles.push({ key: 'corporate', label: 'Company', color: '#E37400', bg: '#FEF7E0' });
  }
  if (profile.role === 'government' || profile.role === 'admin') {
    availableRoles.push({ key: 'government', label: 'Gov', color: '#137333', bg: '#E6F4EA' });
  }
  if (profile.role === 'admin') {
    availableRoles.push({ key: 'admin', label: 'Admin', color: '#D93025', bg: '#FCE8E6' });
  }

  const renderInnerContent = (isMobile = false) => (
    <>
      {/* Brand Header */}
      <div className="p-4" style={{ borderBottom: '1px solid #E8EAED' }}>
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
              style={{ backgroundColor: currentRole.bg, color: currentRole.color }}
            >
              {currentRole.emoji} {currentRole.label}
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

      {/* Role Switcher Tabs */}
      {availableRoles.length > 1 && (
        <div className="px-3 py-2.5" style={{ borderBottom: '1px solid #E8EAED', backgroundColor: '#F8F9FA' }}>
          <div className="text-[9px] font-bold mb-1.5" style={{ color: '#80868B', letterSpacing: '0.05em' }}>
            SWITCH DASHBOARD
          </div>
          <div className="flex gap-1">
            {availableRoles.map((r) => (
              <button
                key={r.key}
                onClick={() => handleRoleChange(r.key as any)}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                style={{
                  backgroundColor: role === r.key ? r.bg : 'transparent',
                  color: role === r.key ? r.color : '#80868B',
                  border: role === r.key ? `1px solid ${r.color}40` : '1px solid transparent',
                }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <div
        ref={isMobile ? mobileNavRef : desktopNavRef}
        onScroll={(e) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('sidebar_scroll_top', e.currentTarget.scrollTop.toString());
          }
        }}
        className="flex-1 overflow-y-auto px-2 py-3 space-y-5"
      >
        {currentSections.map((sec) => (
          <div key={sec.title}>
            <div className="px-2 mb-2 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
              style={{ color: sec.color }}>
              <div className="w-1 h-3.5 rounded-full" style={{ backgroundColor: sec.color, opacity: 0.6 }} />
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
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] transition-all"
                    style={{
                      backgroundColor: isActive ? '#E8F0FE' : 'transparent',
                      color: isActive ? '#1A73E8' : '#3C4043',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-[18px] h-[18px]"
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
        ))}
      </div>

      {/* Footer — User Info Card */}
      <div className="p-2.5" style={{ borderTop: '1px solid #E8EAED' }}>
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
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: currentRole.color }}
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
                  {isAuthenticated ? '✓ Verified' : 'Guest'}
                </span>
              </div>
              <p className="text-[10px]" style={{ color: '#80868B' }}>
                {isAuthenticated ? `${currentRole.label} Dashboard` : 'Tap to sign in'}
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
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40 select-none"
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E8EAED',
        }}
      >
        {renderInnerContent(false)}
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />
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
