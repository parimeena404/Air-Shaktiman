'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Lock, Mail, User as UserIcon, Sparkles, Briefcase, AlertCircle, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { SquidCyberBackground } from '../layout/SquidCyberBackground';

export const AuthGateView: React.FC = () => {
  const { login, register } = useEco();
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'corporate' | 'admin'>('student');
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
        setSuccessMsg('Access Granted! Entering EcoVerse Arena...');
      } else {
        if (!name || !email || !password) {
          throw new Error('Please enter full name, email, and password.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.');
        }
        await register(name, email, password, role);
        setSuccessMsg('Account Created Successfully! Welcome contestant...');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#07080E] font-sans text-white overflow-hidden select-none">
      <SquidCyberBackground />

      <div className="relative z-10 w-full max-w-lg bg-[#07080E]/95 border-2 border-[#FF007A] rounded-2xl shadow-[0_0_80px_rgba(255,0,122,0.35)] overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-300">
        {/* Top Cyber Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#FF007A] via-[#FFC700] to-[#03E5B7]" />

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-[#1D2133] bg-[#0D0F17] text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#FF007A] text-lg font-bold">◯ △ □</span>
            <span className="text-xs font-mono font-bold tracking-widest text-[#03E5B7]">
              ECOVERSE AUTH GATEWAY // V2.0
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-white">
            {isLoginView ? (
              <>
                CONTESTANT <span className="text-[#FF007A]">LOGIN</span>
              </>
            ) : (
              <>
                CREATE <span className="text-[#03E5B7]">ACCOUNT</span>
              </>
            )}
          </h1>

          <p className="text-xs text-slate-400 font-mono">
            {isLoginView
              ? 'Authenticate your credentials to enter the Zero-Waste Arena.'
              : 'Register your contestant identity to start earning Eco Points.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-[#0D0F17] border-b border-[#1D2133] font-mono text-xs font-bold">
          <button
            type="button"
            onClick={() => toggleView(true)}
            className={`py-3 text-center rounded-lg transition-all ${
              isLoginView
                ? 'bg-[#FF007A] text-white shadow-lg glow-pink font-black'
                : 'text-slate-400 hover:text-white hover:bg-[#1D2133]'
            }`}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => toggleView(false)}
            className={`py-3 text-center rounded-lg transition-all ${
              !isLoginView
                ? 'bg-[#03E5B7] text-[#07080E] shadow-lg glow-teal font-black'
                : 'text-slate-400 hover:text-white hover:bg-[#1D2133]'
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4 font-mono">
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-[#FF007A]/15 border border-[#FF007A]/50 flex items-start gap-2.5 text-xs text-[#FF007A] font-bold animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-lg bg-[#03E5B7]/15 border border-[#03E5B7]/50 flex items-start gap-2.5 text-xs text-[#03E5B7] font-bold animate-in fade-in">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {!isLoginView && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Name / Contestant Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dheeraj Thakre"
                  className="w-full pl-10 pr-3 py-2.5 bg-[#0D0F17] border border-[#1D2133] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#03E5B7] transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@domain.com"
                className="w-full pl-10 pr-3 py-2.5 bg-[#0D0F17] border border-[#1D2133] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#03E5B7] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-[#0D0F17] border border-[#1D2133] rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#03E5B7] transition-all"
              />
            </div>
          </div>

          {!isLoginView && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Select Account Type
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    role === 'student'
                      ? 'bg-[#03E5B7]/20 border-[#03E5B7] text-[#03E5B7] font-bold shadow-md'
                      : 'bg-[#0D0F17] border-[#1D2133] text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Student Player</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('corporate')}
                  className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center gap-1 ${
                    role === 'corporate'
                      ? 'bg-[#FFC700]/20 border-[#FFC700] text-[#FFC700] font-bold shadow-md'
                      : 'bg-[#0D0F17] border-[#1D2133] text-slate-400 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>CSR Corporate</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 rounded-lg bg-gradient-to-r from-[#FF007A] via-[#FFC700] to-[#03E5B7] font-black text-sm text-[#07080E] hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_30px_rgba(3,229,183,0.4)] disabled:opacity-50 flex items-center justify-center gap-2 tracking-wider"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-[#07080E] border-t-transparent rounded-full animate-spin" />
            ) : isLoginView ? (
              <>
                <span>AUTHENTICATE & ENTER</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>CREATE ACCOUNT & ENTER ARENA</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="px-6 py-4 bg-[#0D0F17] border-t border-[#1D2133] text-center text-[10px] text-slate-500 font-mono flex items-center justify-between">
          <span className="flex items-center gap-1 text-[#03E5B7]">
            <Shield className="w-3.5 h-3.5" /> SECURED AUTH PROTOCOL
          </span>
          <span>MONGODB ATLAS // JWT</span>
        </div>
      </div>
    </div>
  );
};
