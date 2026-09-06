'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useEco();
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'corporate' | 'admin' | 'government'>('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLoginView) {
        if (!email || !password) {
          throw new Error('Please enter your email and password.');
        }
        await login(email, password);
        setSuccessMsg('Login successful! Redirecting...');
        setTimeout(() => closeAuthModal(), 800);
      } else {
        if (!name || !email || !password) {
          throw new Error('All fields are required.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await register(name, email, password, role);
        setSuccessMsg('Account created! Welcome aboard.');
        setTimeout(() => closeAuthModal(), 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { id: 'student' as const, label: 'User', color: '#4285F4', bg: '#E8F0FE' },
    { id: 'corporate' as const, label: 'Corporate', color: '#FBBC04', bg: '#FEF7E0' },
    { id: 'government' as const, label: 'Government', color: '#34A853', bg: '#E6F4EA' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={closeAuthModal}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl overflow-hidden animate-fade-in-up"
        style={{ boxShadow: '0 8px 32px rgba(60, 64, 67, 0.25)' }}>

        {/* Accent bar */}
        <div className="gdg-accent-bar" />

        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10"
          style={{ backgroundColor: '#F1F3F4', color: '#5F6368' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#202124' }}>
            {isLoginView ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-sm" style={{ color: '#5F6368' }}>
            {isLoginView ? 'Access your dashboard' : 'Join Air Shaktiman'}
          </p>
        </div>

        {/* Tab */}
        <div className="mx-8 flex rounded-full p-1 mb-5" style={{ backgroundColor: '#F1F3F4' }}>
          <button
            type="button"
            onClick={() => { setIsLoginView(true); resetForm(); }}
            className="flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: isLoginView ? '#FFFFFF' : 'transparent',
              color: isLoginView ? '#202124' : '#5F6368',
              boxShadow: isLoginView ? '0 1px 3px rgba(60, 64, 67, 0.15)' : 'none',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsLoginView(false); resetForm(); }}
            className="flex-1 py-2 text-center rounded-full text-sm font-semibold transition-all"
            style={{
              backgroundColor: !isLoginView ? '#FFFFFF' : 'transparent',
              color: !isLoginView ? '#202124' : '#5F6368',
              boxShadow: !isLoginView ? '0 1px 3px rgba(60, 64, 67, 0.15)' : 'none',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {/* Quick Demo Logins for instant review */}
          {isLoginView && (
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Quick Demo Accounts:</span>
                <span className="text-[10px] text-gray-400">1-click fill</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@airshaktiman.com');
                    setPassword('password123');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-102"
                  style={{ border: '1px solid #EA433540', color: '#EA4335', backgroundColor: '#FCE8E6' }}
                >
                  <span>🛡️</span> <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('gov@airshaktiman.com');
                    setPassword('password123');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-102"
                  style={{ border: '1px solid #34A85340', color: '#137333', backgroundColor: '#E6F4EA' }}
                >
                  <span>🏛️</span> <span>Government</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('company@airshaktiman.com');
                    setPassword('password123');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-102"
                  style={{ border: '1px solid #FBBC0460', color: '#E37400', backgroundColor: '#FEF7E0' }}
                >
                  <span>🏢</span> <span>Company</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('user@airshaktiman.com');
                    setPassword('password123');
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-102"
                  style={{ border: '1px solid #4285F440', color: '#1A73E8', backgroundColor: '#E8F0FE' }}
                >
                  <span>👤</span> <span>User</span>
                </button>
              </div>
            </div>
          )}
          {errorMsg && (
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#FCE8E6', color: '#D93025' }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#E6F4EA', color: '#137333' }}>
              {successMsg}
            </div>
          )}

          {!isLoginView && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name" className="gdg-input" />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" className="gdg-input" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" className="gdg-input" />
          </div>

          {!isLoginView && (
            <div className="space-y-2">
              <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>Account Type</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button key={r.id} type="button" onClick={() => setRole(r.id)}
                    className="p-2.5 rounded-xl border-2 text-center transition-all text-xs font-semibold"
                    style={{
                      borderColor: role === r.id ? r.color : '#E8EAED',
                      backgroundColor: role === r.id ? r.bg : '#FFFFFF',
                      color: role === r.id ? r.color : '#5F6368',
                    }}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-full font-semibold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: '#4285F4' }}>
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              <span>{isLoginView ? 'Sign In' : 'Create Account'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
