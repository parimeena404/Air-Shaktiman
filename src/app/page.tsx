'use client';

import React, { useEffect } from 'react';
import { useEco } from '../context/EcoContext';
import { AuthGateView } from '../components/auth/AuthGateView';
import { useRouter } from 'next/navigation';
import { SquidCyberBackground } from '../components/layout/SquidCyberBackground';

export default function Home() {
  const { isAuthenticated, token, role } = useEco();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated || token) {
      if (role === 'admin') {
        router.push('/organization');
      } else if (role === 'corporate') {
        router.push('/csr');
      } else {
        router.push('/user');
      }
    }
  }, [isAuthenticated, token, role, router]);

  if (!isAuthenticated && !token) {
    return <AuthGateView />;
  }

  // Loading state while redirecting
  return (
    <div className="flex min-h-screen relative items-center justify-center bg-[#07080E]">
      <SquidCyberBackground />
      <div className="relative z-10 flex flex-col items-center">
        <span className="inline-block w-12 h-12 border-4 border-[#FF007A] border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="text-[#03E5B7] font-mono tracking-widest text-xl animate-pulse">ROUTING TO PORTAL...</h2>
      </div>
    </div>
  );
}
