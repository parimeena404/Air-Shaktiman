'use client';

import React, { useEffect } from 'react';
import { useEco } from '../context/EcoContext';
import { AuthGateView } from '../components/auth/AuthGateView';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated, token, role, profile, setRole } = useEco();
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
    <div className="min-h-screen" style={{ backgroundColor: '#F8F9FA' }}>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E8EAED' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4285F4' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EA4335' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#34A853' }} />
          </div>
          <h1 className="font-bold text-lg" style={{ color: '#202124' }}>Air Shaktiman</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: '#4285F4' }}>
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium hidden sm:inline" style={{ color: '#202124' }}>{profile.name}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: '#202124' }}>
            Welcome back, {profile.name?.split(' ')[0] || 'User'} 👋
          </h2>
          <p className="text-base" style={{ color: '#5F6368' }}>
            Choose a portal to get started. Each portal is designed for a specific role.
          </p>
        </div>

        {/* 4 Connected Portals (Flipkart / GDG Model with Security Gates) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
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
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ backgroundColor: portal.lightBg, color: portal.color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
