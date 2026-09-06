'use client';

import React from 'react';
import { useEco } from '../context/EcoContext';
import { AuthGateView } from '../components/auth/AuthGateView';
import { useRouter } from 'next/navigation';
import { SquidCyberBackground } from '../components/layout/SquidCyberBackground';
import { Sparkles, ArrowRight, Shield, Users, Landmark, Building2 } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, token, role, profile } = useEco();
  const router = useRouter();

  // If not logged in, show auth
  if (!isAuthenticated && !token) {
    return <AuthGateView />;
  }

  // Portal cards for logged-in users
  const portals = [
    {
      id: 'user',
      title: 'User Portal',
      subtitle: 'Community, complaints, coupons & contributions',
      emoji: '👤',
      color: '#4285F4',
      bgGradient: 'linear-gradient(135deg, #4285F4 0%, #1A73E8 100%)',
      lightBg: '#E8F0FE',
      route: '/user',
      role: 'student' as const,
      features: ['Community Page', 'Complain & Report', 'Coupons & Rewards', 'My Contributions', 'Events & Profile', 'AI Chatbot'],
      available: true,
    },
    {
      id: 'admin',
      title: 'Admin Portal',
      subtitle: 'Monitor zones, manage reports & AI decisions',
      emoji: '🛡️',
      color: '#EA4335',
      bgGradient: 'linear-gradient(135deg, #EA4335 0%, #D93025 100%)',
      lightBg: '#FCE8E6',
      route: '/organization',
      role: 'admin' as const,
      features: ['User Tasks', 'Report Review', 'AI Decision Helper', 'Pollution Index', 'Zone Maps', 'Leaderboard'],
      available: true,
    },
    {
      id: 'company',
      title: 'Company Portal',
      subtitle: 'CSR ranking, funding & impact tracking',
      emoji: '🏢',
      color: '#FBBC04',
      bgGradient: 'linear-gradient(135deg, #FBBC04 0%, #E37400 100%)',
      lightBg: '#FEF7E0',
      route: '/csr',
      role: 'corporate' as const,
      features: ['Company Profile', 'Points & Coupons', 'CSR Rank', 'Admin Check'],
      available: true,
    },
    {
      id: 'government',
      title: 'Government Portal',
      subtitle: 'Civic management, environment & operations',
      emoji: '🏛️',
      color: '#34A853',
      bgGradient: 'linear-gradient(135deg, #34A853 0%, #137333 100%)',
      lightBg: '#E6F4EA',
      route: '/government',
      role: 'government' as const,
      features: ['Civic Issues', 'Pollution Monitor', 'Zone Maps', 'Cleanup Ops'],
      available: true,
    },
  ];

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Living GDG Floating Bubbles Wallpaper Animation */}
      <SquidCyberBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className="px-6 py-4 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid #E8EAED' }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4285F4' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EA4335' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#34A853' }} />
            </div>
            <h1 className="font-bold text-lg" style={{ color: '#202124' }}>
              Air Shaktiman <span className="text-xs font-normal text-gray-500">× GDG Community</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: '#4285F4' }}
              >
                {profile.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium hidden sm:inline" style={{ color: '#202124' }}>
                {profile.name}
              </span>
            </div>
          </div>
        </header>

        {/* Hero & Portal Selection */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 flex-1 w-full">
          {/* GDG Community Innovation Hero Card with Image 1 */}
          <div
            className="bg-white rounded-2xl overflow-hidden mb-8 border border-[#E8EAED] shadow-sm flex flex-col md:flex-row items-center justify-between animate-fade-in-up"
          >
            <div className="p-6 md:p-8 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-[#E8F0FE] text-[#1A73E8]">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-ping" />
                <span>Google Developer Groups (GDG) Eco Ecosystem</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#202124] mb-2 tracking-tight">
                AI & Circular Economy Platform
              </h2>
              <p className="text-xs md:text-sm text-[#5F6368] leading-relaxed max-w-xl">
                Welcome back, <strong>{profile.name?.split(' ')[0] || 'User'}</strong> 👋. Connect across citizen action, municipal oversight, and corporate sustainability powered by Google Cloud & AI.
              </p>
            </div>
            <div className="p-4 md:p-6 flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/google-dots.png"
                alt="Google Dots Theme"
                className="max-h-32 md:max-h-36 w-auto object-contain rounded-xl hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Select Portal Experience</h3>
            <span className="text-xs text-gray-500">Separated & Secured via Role Access</span>
          </div>

          {/* 4 Connected Portals (Flipkart / GDG Model with Security Gates) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {portals.map((portal) => {
              const hasAccess =
                portal.id === 'user' ||
                role === 'admin' ||
                role === portal.role ||
                (portal.id === 'government' && role === 'government');

              return (
                <button
                  key={portal.id}
                  onClick={() => {
                    router.push(portal.route);
                  }}
                  className="text-left rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.99] group bg-white"
                  style={{ boxShadow: '0 2px 12px rgba(60, 64, 67, 0.12)', border: '1px solid #E8EAED' }}
                >
                  {/* Color banner */}
                  <div className="h-2.5 transition-all" style={{ background: portal.bgGradient }} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: portal.lightBg }}
                        >
                          {portal.emoji}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg flex items-center gap-2" style={{ color: '#202124' }}>
                            {portal.title}
                            {hasAccess ? (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                style={{ backgroundColor: portal.lightBg, color: portal.color }}
                              >
                                ✓ Unlocked
                              </span>
                            ) : (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                                style={{ backgroundColor: '#F1F3F4', color: '#5F6368', border: '1px solid #DADCE0' }}
                              >
                                <span>🔒</span> Requires Login
                              </span>
                            )}
                          </h3>
                          <p className="text-xs" style={{ color: '#5F6368' }}>{portal.subtitle}</p>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-colors group-hover:bg-gray-100"
                        style={{ color: portal.color }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {portal.features.map((f, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                          style={{ backgroundColor: portal.lightBg, color: portal.color }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Platform Ecosystem Pillars with Images 2, 3, 4 */}
          <div className="mt-8">
            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Platform Pillars & Community Highlights</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Pillar 1: Cloud & Operations (Image 2) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/images/google-cloud-team.jpg"
                  alt="Cloud Infrastructure"
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    Cloud Operations
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">
                    Google Cloud Command Engine
                  </h4>
                  <p className="text-xs text-gray-600 leading-normal">
                    Real-time environmental telemetry, AI-assisted decision making, and municipal issue tracking.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Developer Champions (Image 3) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/images/developer-community.jpg"
                  alt="Developer Community"
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    GDG Hackathon
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">
                    Developer Community & Arena
                  </h4>
                  <p className="text-xs text-gray-600 leading-normal">
                    Hackathons, campus leaderboards, and code challenges transforming waste into verified impact.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Citizen Workspace (Image 4) */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src="/images/workspace-collaboration.jpg"
                  alt="Citizen Workspace"
                  className="w-full h-36 object-cover"
                />
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    Citizen Action
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-2 mb-1">
                    Smart Workspace & Eco Actions
                  </h4>
                  <p className="text-xs text-gray-600 leading-normal">
                    Citizen reporting, recycling points, and partner voucher rewards directly from your workspace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
