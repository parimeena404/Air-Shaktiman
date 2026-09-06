'use client';

import React, { useRef } from 'react';
import { useEco } from '../../context/EcoContext';
import { MainTab } from '../../types';
import { useRouter, usePathname } from 'next/navigation';
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
  ArrowLeft,
  GitMerge,
  HeartHandshake,
  Hammer,
  Cpu,
  QrCode,
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

// ─── Portal Configs ───────────────────────────────────────
interface PortalConfig {
  name: string;
  emoji: string;
  accentColor: string;
  accentBg: string;
  accentLight: string;
  sections: NavSection[];
}

const PORTAL_CONFIGS: Record<string, PortalConfig> = {
  user: {
    name: 'User Portal',
    emoji: '👤',
    accentColor: '#4285F4',
    accentBg: '#E8F0FE',
    accentLight: '#D2E3FC',
    sections: [
      {
        title: 'COMMUNITY',
        items: [
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'community-feed', label: 'Community Page', icon: Globe },
          { id: 'community-groups', label: 'Eco Clubs', icon: Users },
        ],
      },
      {
        title: 'COMPLAINTS',
        items: [
          { id: 'civic-reporting', label: 'Complain Page', icon: MessageSquare, badge: 'Report' },
          { id: 'report-waste', label: 'Report Waste', icon: Camera },
        ],
      },
      {
        title: 'COUPONS & REWARDS',
        items: [
          { id: 'redeem-rewards', label: 'Coupon Page', icon: Ticket },
          { id: 'my-rewards', label: 'My Vouchers', icon: Gift },
          { id: 'partner-network', label: 'Partner Stores', icon: Store },
        ],
      },
      {
        title: 'MY CONTRIBUTION',
        items: [
          { id: 'contributions', label: 'My Contributions', icon: History },
          { id: 'challenges', label: 'Eco Challenges', icon: Trophy },
          { id: 'market', label: 'EcoMarket', icon: ShoppingBag },
        ],
      },
      {
        title: 'EVENTS & PROFILE',
        items: [
          { id: 'community-profile', label: 'My Profile', icon: User },
          { id: 'nearby', label: 'Nearby Events & Map', icon: MapPin },
          { id: 'impact-dashboard', label: 'My Impact', icon: BarChart3 },
        ],
      },
      {
        title: 'AI CHATBOT',
        items: [
          { id: 'eco-ai', label: 'AI Eco Assistant', icon: Bot, badge: 'AI' },
        ],
      },
    ],
  },
  admin: {
    name: 'Admin Portal',
    emoji: '🛡️',
    accentColor: '#EA4335',
    accentBg: '#FCE8E6',
    accentLight: '#F8D7DA',
    sections: [
      {
        title: 'ADMINISTRATION',
        items: [
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'user-management', label: 'User Image & Tasks', icon: Image },
          { id: 'report-waste', label: 'Report Submissions', icon: Send, badge: 'Review' },
        ],
      },
      {
        title: 'AI & ANALYTICS',
        items: [
          { id: 'eco-ai', label: 'AI Decision Helper', icon: Bot, badge: 'AI' },
          { id: 'campus-monitor', label: 'Air / Pollution Index', icon: Wind },
          { id: 'energy', label: 'Reverse Timer', icon: Timer },
        ],
      },
      {
        title: 'ZONE MONITORING',
        items: [
          { id: 'nearby', label: 'Weather Maps & Zones', icon: CloudSun },
          { id: 'waste-analytics', label: 'Zone Analytics', icon: BarChart3 },
        ],
      },
      {
        title: 'LEADERBOARD & COMMUNITY',
        items: [
          { id: 'leaderboard', label: 'Inter-Zone Leaderboard', icon: Trophy, badge: '🏆' },
          { id: 'rewards', label: 'Gifts & Rewards', icon: Gift },
          { id: 'community-feed', label: 'Postings', icon: Globe },
        ],
      },
      {
        title: 'OPERATIONS',
        items: [
          { id: 'cleanup-operations', label: 'Cleanup Operations', icon: ShieldAlert },
          { id: 'material-flow', label: 'Material Flow', icon: Activity },
          { id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 },
        ],
      },
    ],
  },
  company: {
    name: 'Company Portal',
    emoji: '🏢',
    accentColor: '#E37400',
    accentBg: '#FEF7E0',
    accentLight: '#FCEFC7',
    sections: [
      {
        title: 'COMPANY PROFILE',
        items: [
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'csr-hub', label: 'Company Profile', icon: Building2 },
          { id: 'csr-projects', label: 'Our Projects', icon: Sprout },
          { id: 'csr-reports', label: 'Impact Reports', icon: FileText },
        ],
      },
      {
        title: 'USER POINTS & COUPONS',
        items: [
          { id: 'csr-funding', label: 'User Points & Coupon Redeem', icon: Coins, badge: '₹' },
          { id: 'csr-missions', label: 'Sponsored Missions', icon: Target },
          { id: 'redeem-rewards', label: 'Reward Management', icon: Gift },
        ],
      },
      {
        title: 'CSR RANKING',
        items: [
          { id: 'csr-leaderboard', label: 'CSR Rank', icon: Award, badge: '🏅' },
          { id: 'csr-impact', label: 'CSR Impact Score', icon: BarChart3 },
        ],
      },
      {
        title: 'ADMIN CHECK',
        items: [
          { id: 'admin-overview', label: 'Org (Admin) Check', icon: CheckCircle },
          { id: 'community-feed', label: 'Company Postings', icon: Globe },
        ],
      },
    ],
  },
  government: {
    name: 'Government Portal',
    emoji: '🏛️',
    accentColor: '#137333',
    accentBg: '#E6F4EA',
    accentLight: '#CEEAD6',
    sections: [
      {
        title: 'GOVERNMENT PORTAL',
        items: [
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'government-connect', label: 'Government Programs', icon: Landmark },
        ],
      },
      {
        title: 'CIVIC MANAGEMENT',
        items: [
          { id: 'civic-reporting', label: 'Civic Issue Tracker', icon: ShieldAlert },
          { id: 'report-waste', label: 'Report Submissions', icon: Send },
          { id: 'user-management', label: 'Citizen Directory', icon: Users },
        ],
      },
      {
        title: 'ENVIRONMENT',
        items: [
          { id: 'campus-monitor', label: 'Air / Pollution Index', icon: Wind },
          { id: 'nearby', label: 'Weather & Zone Maps', icon: CloudSun },
          { id: 'energy', label: 'Energy Grid', icon: Zap },
          { id: 'water', label: 'Water Monitor', icon: Droplet },
        ],
      },
      {
        title: 'OPERATIONS',
        items: [
          { id: 'cleanup-operations', label: 'Cleanup Operations', icon: Shield },
          { id: 'material-flow', label: 'Material Flow', icon: Activity },
          { id: 'impact-dashboard', label: 'Impact Dashboard', icon: BarChart3 },
        ],
      },
    ],
  },
};

// ─── Detect portal from pathname ──────────────────────────
function getPortalKey(pathname: string): string {
  if (pathname.startsWith('/organization')) return 'admin';
  if (pathname.startsWith('/csr')) return 'company';
  if (pathname.startsWith('/government')) return 'government';
  return 'user';
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, isMobileMenuOpen, closeMobileMenu, isAuthenticated, openAuthModal, logout } = useEco();
  const router = useRouter();
  const pathname = usePathname();

  const portalKey = getPortalKey(pathname || '');
  const portal = PORTAL_CONFIGS[portalKey];

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
  }, [activeTab]);

  const handleItemClick = (id: MainTab) => {
    if (desktopNavRef.current) sessionStorage.setItem('sidebar_scroll_top', desktopNavRef.current.scrollTop.toString());
    if (mobileNavRef.current) sessionStorage.setItem('sidebar_scroll_top', mobileNavRef.current.scrollTop.toString());
    setActiveTab(id);
    closeMobileMenu();
  };

  const renderInnerContent = (isMobile = false) => (
    <>
      {/* Portal Brand Header */}
      <div className="p-4" style={{ borderBottom: `2px solid ${portal.accentColor}20` }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ backgroundColor: portal.accentBg }}>
              {portal.emoji}
            </div>
            <div>
              <h1 className="font-bold text-sm" style={{ color: '#202124' }}>
                {portal.name}
              </h1>
              <p className="text-[10px]" style={{ color: '#80868B' }}>Air Shaktiman</p>
            </div>
          </div>
          {isMobile && (
            <button onClick={closeMobileMenu} className="p-1 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5" style={{ color: '#5F6368' }} />
            </button>
          )}
        </div>
      </div>

      {/* Back to All Portals */}
      <button
        onClick={() => { router.push('/'); closeMobileMenu(); }}
        className="mx-3 mt-3 mb-1 px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium transition-all hover:bg-gray-50"
        style={{ color: portal.accentColor, border: `1px solid ${portal.accentColor}30` }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All Portals
      </button>

      {/* Navigation Menu */}
      <div
        ref={isMobile ? mobileNavRef : desktopNavRef}
        onScroll={(e) => {
          if (typeof window !== 'undefined') sessionStorage.setItem('sidebar_scroll_top', e.currentTarget.scrollTop.toString());
        }}
        className="flex-1 overflow-y-auto px-2 py-3 space-y-5"
      >
        {portal.sections.map((sec) => (
          <div key={sec.title}>
            <div className="px-2 mb-2 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5"
              style={{ color: portal.accentColor }}>
              <div className="w-1 h-3.5 rounded-full" style={{ backgroundColor: portal.accentColor, opacity: 0.5 }} />
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
                      backgroundColor: isActive ? portal.accentBg : 'transparent',
                      color: isActive ? portal.accentColor : '#3C4043',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-[18px] h-[18px]" style={{ color: isActive ? portal.accentColor : '#80868B' }} />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: isActive ? portal.accentLight : '#F1F3F4',
                            color: isActive ? portal.accentColor : '#80868B',
                          }}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5" style={{ color: isActive ? portal.accentColor : '#DADCE0' }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer — User Card */}
      <div className="p-2.5" style={{ borderTop: '1px solid #E8EAED' }}>
        <div
          onClick={() => {
            if (!isAuthenticated) { openAuthModal(); closeMobileMenu(); }
            else handleItemClick('community-profile');
          }}
          className="p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between hover:bg-gray-50"
          style={{ border: '1px solid #E8EAED' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: portal.accentColor }}>
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <span className="text-xs font-semibold block truncate max-w-[110px]" style={{ color: '#202124' }}>
                {profile.name}
              </span>
              <span className="text-[10px]" style={{ color: '#80868B' }}>
                {isAuthenticated ? `${profile.ecoPoints || 0} Eco Points` : 'Tap to sign in'}
              </span>
            </div>
          </div>
          {isAuthenticated && (
            <button
              onClick={(e) => { e.stopPropagation(); logout(); closeMobileMenu(); }}
              className="p-1.5 rounded-full hover:bg-gray-100" title="Sign out"
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
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 z-40 select-none"
        style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E8EAED' }}>
        {/* Portal accent bar */}
        <div className="h-1" style={{ backgroundColor: portal.accentColor }} />
        {renderInnerContent(false)}
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
          <aside className="relative flex flex-col w-72 max-w-[85vw] h-full z-10 select-none animate-slide-in-left"
            style={{ backgroundColor: '#FFFFFF', borderRight: '1px solid #E8EAED', boxShadow: '4px 0 24px rgba(60, 64, 67, 0.15)' }}>
            <div className="h-1" style={{ backgroundColor: portal.accentColor }} />
            {renderInnerContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
