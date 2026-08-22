'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Users, Filter, CheckCircle2, Award, Shield, Search } from 'lucide-react';

export const UserManagementView: React.FC = () => {
  const { leaderboard, profile, promoteToAdmin, addToast } = useEco();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [promoteEmail, setPromoteEmail] = useState('');
  const [isPromoting, setIsPromoting] = useState(false);

  const filterTabs = ['All', 'Students', 'Volunteers', 'Organizations', 'Businesses', 'NGOs', 'Administrators'];

  const filteredUsers = leaderboard.filter((u) => {
    const matchesCategory = selectedFilter === 'All' || u.category === selectedFilter || (selectedFilter === 'Students' && u.category === 'Student');
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.playerNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePromoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteEmail) return;
    setIsPromoting(true);
    try {
      await promoteToAdmin(promoteEmail);
      setPromoteEmail('');
    } catch (err: any) {
      addToast(err.message || 'Failed to promote user', 'warning');
    } finally {
      setIsPromoting(false);
    }
  };

  const handlePromoteUserRow = async (target: string) => {
    try {
      await promoteToAdmin(target);
    } catch (err: any) {
      addToast(err.message || 'Failed to promote user', 'warning');
    }
  };

  const isAdmin = profile.role === 'admin';

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>COMMUNITY ENTITY DIRECTORY</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Community & User Management</h1>
        <p className="text-xs text-slate-400">
          Inspect, manage, & verify registered citizens, students, businesses, & NGOs across City Guardian.
        </p>
      </div>

      {/* Admin Quick Promotion Card (Visible only to Admins) */}
      {isAdmin && (
        <div className="p-4 rounded-xl bg-[#180B1B] border border-[#FF007A]/40 space-y-3 font-sans shadow-lg glow-pink">
          <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
            <Shield className="w-4 h-4 text-[#FF007A]" />
            <span>FRONT MAN COMMAND // GRANT ADMIN PRIVILEGES</span>
          </div>
          <form onSubmit={handlePromoteSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={promoteEmail}
              onChange={(e) => setPromoteEmail(e.target.value)}
              placeholder="Enter user email address or player number (#456)..."
              className="flex-1 bg-[#07080E] border border-[#FF007A]/40 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF007A]"
            />
            <button
              type="submit"
              disabled={isPromoting || !promoteEmail}
              className="px-4 py-2 rounded-lg bg-[#FF007A] text-white font-mono font-bold text-xs hover:bg-[#FF007A]/80 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{isPromoting ? 'PROMOTING...' : 'MAKE ADMIN'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Search & Category Filter Pills */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search user name or player number (#456)..."
            className="w-full bg-[#07080E] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#03E5B7]"
          />
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-slate-800">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedFilter === tab
                  ? 'bg-[#FF007A] text-white font-bold shadow-md shadow-[#FF007A]/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl overflow-hidden">
        <div className="divide-y divide-slate-800/80">
          {filteredUsers.map((user) => (
            <div
              key={user.rank}
              className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#03E5B7]/50" />
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{user.name}</span>
                    <span className="text-[10px] font-mono text-[#FF007A]">{user.playerNumber}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Sustainability Score: <strong className="text-[#03E5B7]">{user.score}</strong> • Waste Recovered: <strong className="text-white">{user.wasteRecoveredKg}kg</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[10px] px-3 py-1 rounded-full font-mono font-bold bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]">
                  Verified Contributor ✓
                </span>
                <span className="font-mono text-white font-bold">{user.points} Pts</span>
                {isAdmin && (
                  <button
                    onClick={() => handlePromoteUserRow(user.playerNumber)}
                    className="px-2.5 py-1 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] hover:bg-[#FF007A] hover:text-white transition-all text-[10px] font-mono font-bold flex items-center gap-1"
                    title="Promote user to Admin (FRONT MAN)"
                  >
                    <Shield className="w-3 h-3" />
                    <span>MAKE ADMIN</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
