'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';

export const AuthGateView: React.FC = () => {
  const { login, register } = useEco();
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'corporate' | 'admin' | 'government'>('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const toggleView = (viewIsLogin: boolean) => {
    setIsLoginView(viewIsLogin);
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
      } else {
        if (!name || !email || !password) {
          throw new Error('Please enter full name, email, and password.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await register(name, email, password, role);
        setSuccessMsg('Account created successfully! Welcome aboard.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      id: 'student' as const,
      label: 'User',
      description: 'Report waste, earn points, join community',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: '#4285F4',
      bgColor: '#E8F0FE',
    },
    {
      id: 'corporate' as const,
      label: 'Corporate / CSR',
      description: 'Fund projects, track CSR impact',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: '#FBBC04',
      bgColor: '#FEF7E0',
    },
    {
      id: 'government' as const,
      label: 'Government',
      description: 'Monitor civic issues, manage operations',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
        </svg>
      ),
      color: '#34A853',
      bgColor: '#E6F4EA',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans select-none"
      style={{ background: 'linear-gradient(135deg, #F8F9FA 0%, #E8F0FE 50%, #E6F4EA 100%)' }}>

      {/* Decorative dots */}
      <div className="fixed top-8 left-8 flex gap-2 opacity-30">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4285F4' }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EA4335' }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#34A853' }} />
      </div>

      <div className="w-full max-w-md animate-fade-in-up">
        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 4px 24px rgba(60, 64, 67, 0.15), 0 1px 4px rgba(60, 64, 67, 0.1)' }}>

          {/* Google 4-color accent bar */}
          <div className="gdg-accent-bar" />

          {/* Header */}
          <div className="px-8 pt-8 pb-4 text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#4285F4' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EA4335' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FBBC04' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#34A853' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: '#5F6368' }}>
                Air Shaktiman
              </span>
            </div>

            <h1 className="text-2xl font-bold mb-1" style={{ color: '#202124' }}>
              {isLoginView ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-sm" style={{ color: '#5F6368' }}>
              {isLoginView
                ? 'Sign in to continue to your dashboard'
                : 'Join the eco-smart platform and start making impact'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="mx-8 flex rounded-full p-1 mb-6" style={{ backgroundColor: '#F1F3F4' }}>
            <button
              type="button"
              onClick={() => toggleView(true)}
              className="flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all duration-200"
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
              onClick={() => toggleView(false)}
              className="flex-1 py-2.5 text-center rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: !isLoginView ? '#FFFFFF' : 'transparent',
                color: !isLoginView ? '#202124' : '#5F6368',
                boxShadow: !isLoginView ? '0 1px 3px rgba(60, 64, 67, 0.15)' : 'none',
              }}
            >
              Create Account
            </button>
          </div>

          {/* Form Body */}
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
              <div className="p-3 rounded-lg flex items-start gap-2 text-sm"
                style={{ backgroundColor: '#FCE8E6', color: '#D93025' }}>
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-lg flex items-start gap-2 text-sm"
                style={{ backgroundColor: '#E6F4EA', color: '#137333' }}>
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successMsg}</span>
              </div>
            )}

            {!isLoginView && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="gdg-input"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@example.com"
                className="gdg-input"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="gdg-input"
              />
            </div>

            {!isLoginView && (
              <div className="space-y-2">
                <label className="text-xs font-semibold" style={{ color: '#5F6368' }}>
                  Select Account Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className="p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1.5"
                      style={{
                        borderColor: role === r.id ? r.color : '#E8EAED',
                        backgroundColor: role === r.id ? r.bgColor : '#FFFFFF',
                        color: role === r.id ? r.color : '#5F6368',
                      }}
                    >
                      <div style={{ color: role === r.id ? r.color : '#80868B' }}>
                        {r.icon}
                      </div>
                      <span className="text-xs font-semibold">{r.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center" style={{ color: '#80868B' }}>
                  {roles.find(r => r.id === role)?.description}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 rounded-full font-semibold text-sm text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                backgroundColor: '#4285F4',
                boxShadow: '0 1px 3px rgba(66, 133, 244, 0.4)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1A73E8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4285F4')}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isLoginView ? (
                <>
                  <span>Sign In</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 text-center text-xs flex items-center justify-between"
            style={{ backgroundColor: '#F8F9FA', borderTop: '1px solid #E8EAED', color: '#80868B' }}>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Authentication
            </span>
            <span>Powered by Air Shaktiman</span>
          </div>
        </div>
      </div>
    </div>
  );
};
