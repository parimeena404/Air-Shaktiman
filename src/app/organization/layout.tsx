import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { AuthModal } from '../../components/auth/AuthModal';
import { SquidCyberBackground } from '../../components/layout/SquidCyberBackground';
import { PortalAuthGuard } from '../../components/auth/PortalAuthGuard';

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen relative" style={{ backgroundColor: '#F8F9FA' }}>
      <SquidCyberBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <Header />
        <main className="flex-1 p-3 sm:p-5 md:p-8 max-w-7xl w-full mx-auto pb-20 md:pb-8">
          <PortalAuthGuard
            allowedRoles={['admin']}
            portalName="Admin Portal"
            portalEmoji="🛡️"
            portalColor="#EA4335"
            portalBg="#FCE8E6"
            demoEmail="admin@airshaktiman.com"
          >
            {children}
          </PortalAuthGuard>
        </main>
      </div>
      <AuthModal />
    </div>
  );
}
