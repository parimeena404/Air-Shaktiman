'use client';

import React, { useEffect } from 'react';
import { useEco } from '../context/EcoContext';
import { AuthGateView } from '../components/auth/AuthGateView';
import { useRouter } from 'next/navigation';

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
      features: ['User Tasks', 'Report Review', 'AI Decision Helper', 'Pollution Index', 'Zone Maps', 'Leaderboard'],
      available: profile.role === 'admin',
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
      features: ['Company Profile', 'Points & Coupons', 'CSR Rank', 'Admin Check'],
      available: profile.role === 'corporate' || profile.role === 'admin',
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
      features: ['Civic Issues', 'Pollution Monitor', 'Zone Maps', 'Cleanup Ops'],
      available: profile.role === 'government' || profile.role === 'admin',
    },
  ];

  // Filter to show available portals first, then locked
  const availablePortals = portals.filter(p => p.available);
  const lockedPortals = portals.filter(p => !p.available);

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

        {/* Available Portals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {availablePortals.map((portal) => (
            <button
              key={portal.id}
              onClick={() => {
                // Set role before navigating
                if (portal.id === 'admin') {
                  router.push('/organization');
                } else if (portal.id === 'company') {
                  router.push('/csr');
                } else if (portal.id === 'government') {
                  router.push('/government');
                } else {
                  router.push('/user');
                }
              }}
              className="text-left rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.99]"
              style={{ boxShadow: '0 2px 12px rgba(60, 64, 67, 0.12)', border: '1px solid #E8EAED' }}
            >
              {/* Color banner */}
              <div className="h-2" style={{ background: portal.bgGradient }} />
              <div className="p-5 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: portal.lightBg }}>
                      {portal.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#202124' }}>{portal.title}</h3>
                      <p className="text-xs" style={{ color: '#5F6368' }}>{portal.subtitle}</p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 mt-1" style={{ color: portal.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5">
                  {portal.features.map((f, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                      style={{ backgroundColor: portal.lightBg, color: portal.color }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Locked Portals */}
        {lockedPortals.length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1" style={{ backgroundColor: '#E8EAED' }} />
              <span className="text-xs font-semibold" style={{ color: '#80868B' }}>OTHER PORTALS</span>
              <div className="h-px flex-1" style={{ backgroundColor: '#E8EAED' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {lockedPortals.map((portal) => (
                <div
                  key={portal.id}
                  className="rounded-xl p-4 opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EAED' }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl">{portal.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-sm" style={{ color: '#202124' }}>{portal.title}</h4>
                      <p className="text-[10px]" style={{ color: '#80868B' }}>Requires {portal.id} role</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: '#F1F3F4', color: '#80868B' }}>
                    🔒 Locked
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
