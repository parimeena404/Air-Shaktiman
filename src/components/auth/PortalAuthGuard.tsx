'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { UserRole } from '../../types';
import { useRouter } from 'next/navigation';
import { Shield, Lock, ArrowLeft, KeyRound, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PortalAuthGuardProps {
  allowedRoles: UserRole[];
  portalName: string;
  portalEmoji: string;
  portalColor: string;
  portalBg: string;
  demoEmail: string;
  children: React.ReactNode;
}

export const PortalAuthGuard: React.FC<PortalAuthGuardProps> = ({
  allowedRoles,
  portalName,
  portalEmoji,
  portalColor,
  portalBg,
  demoEmail,
  children,
}) => {
  const { isAuthenticated, role, profile, login } = useEco();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if current user role has access
  const hasAccess = isAuthenticated && allowedRoles.includes(role);

  if (hasAccess) {
    return <>{children}</>;
  }

  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      // Verify that this credential is valid for this portal
      const isAdminEmail = cleanEmail.includes('admin') || cleanEmail.includes('thakre');
      const isGovEmail = cleanEmail.includes('gov') || cleanEmail.includes('government');
      const isCorpEmail = cleanEmail.includes('corp') || cleanEmail.includes('company');

      let candidateRole: UserRole = 'student';
      if (isAdminEmail) candidateRole = 'admin';
      else if (isGovEmail) candidateRole = 'government';
      else if (isCorpEmail) candidateRole = 'corporate';

      if (!allowedRoles.includes(candidateRole) && !isAdminEmail) {
        throw new Error(
          `Access Denied: ${cleanEmail} is recognized as '${candidateRole}', but this portal requires ${allowedRoles.join(' or ')} clearance.`
        );
      }

      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail(demoEmail);
    setPassword('password123');
    setErrorMsg('');
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center p-4 font-sans select-none"
      style={{ backgroundColor: '#F8F9FA' }}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl overflow-hidden animate-fade-in-up"
        style={{
          boxShadow: '0 8px 32px rgba(60, 64, 67, 0.15), 0 1px 3px rgba(60, 64, 67, 0.1)',
          border: '1px solid #E8EAED',
        }}
      >
        {/* Accent Bar */}
        <div className="h-1.5" style={{ backgroundColor: portalColor }} />

        {/* Header */}
        <div className="p-6 text-center" style={{ borderBottom: '1px solid #E8EAED' }}>
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl shadow-sm"
            style={{ backgroundColor: portalBg }}
          >
            {portalEmoji}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold mb-2"
            style={{ backgroundColor: portalBg, color: portalColor }}>
            <Lock className="w-3.5 h-3.5" />
            <span>Restricted Access Control</span>
          </div>
          <h2 className="text-xl font-bold" style={{ color: '#202124' }}>
            {portalName}
          </h2>
          <p className="text-xs mt-1 text-gray-500">
            Requires authorized <strong>{allowedRoles.join(' / ')}</strong> credentials.
          </p>

          {/* Current Session Notice */}
          {isAuthenticated && (
            <div
              className="mt-4 p-2.5 rounded-xl text-left text-xs flex items-center justify-between"
              style={{ backgroundColor: '#F1F3F4', border: '1px solid #DADCE0' }}
            >
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Current Session:</span>
                <span className="font-semibold text-gray-800">{profile.name}</span>
                <span className="text-gray-500 text-[11px] ml-1">({role})</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-700">
                Unauthorized
              </span>
            </div>
          )}
        </div>

        {/* Security Login Form */}
        <form onSubmit={handlePortalLogin} className="p-6 space-y-4">
          {errorMsg && (
            <div
              className="p-3 rounded-xl flex items-start gap-2 text-xs"
              style={{ backgroundColor: '#FCE8E6', color: '#D93025', border: '1px solid #EA433530' }}
            >
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Authorized {portalName} Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={demoEmail}
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ border: '1px solid #DADCE0', backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Security Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{ border: '1px solid #DADCE0', backgroundColor: '#FFFFFF' }}
            />
          </div>

          {/* Quick Demo Fill Button */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={fillDemo}
              className="text-xs font-semibold flex items-center gap-1 hover:underline"
              style={{ color: portalColor }}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Autofill {portalName} Demo Credentials</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ backgroundColor: portalColor }}
          >
            <Shield className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : `Authorize & Enter ${portalName}`}</span>
          </button>

          <button
            type="button"
            onClick={() => router.push('/user')}
            className="w-full py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to User Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
};
