'use client';

import React, { useState } from 'react';
import { useEco } from '../../../context/EcoContext';
import { Target, Trophy, Users, Shield, Flame, Clock, Award, Zap, ChevronRight } from 'lucide-react';

export const CsrMissionsView: React.FC = () => {
  const { csrMissions, joinCsrMission } = useEco();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const filteredMissions =
    selectedDifficulty === 'ALL'
      ? csrMissions
      : csrMissions.filter((m) => m.difficulty === selectedDifficulty);

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="bg-[#09120D] border border-[#A855F7]/40 rounded-lg p-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#A855F7]/20 border border-[#A855F7]/40 text-[#A855F7] text-xs font-bold">
          <Target className="w-3.5 h-3.5" />
          <span>CSR SPONSORED ARENA MISSIONS</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-widest">LIVE CSR MISSIONS</h1>
        <p className="text-xs text-[#527A67]">
          Participate in corporate-funded real-world environmental campaigns to claim XP, Eco Points, & Cash Bounties.
        </p>
      </div>

      {/* ⚔️ COMPANY VS COMPANY CHALLENGE HERO BANNER */}
      <div className="bg-[#09120D] border-2 border-[#F5C518] rounded-lg p-5 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#F5C518] text-[#050B08] font-black">
            ⚔️ CORPORATE CSR CHAMPIONSHIP
          </span>
          <span className="text-xs text-[#F5C518] font-bold">LIVE MATCHUP // WEEK 4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* TechNova Side */}
          <div className="p-4 rounded bg-[#050B08] border border-[#00FF66]/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold">⚡ TECHNOVA INDUSTRIES</span>
              <span className="text-[#00FF66] font-extrabold">7,840 KG</span>
            </div>
            <div className="w-full bg-[#09120D] h-3 rounded-full overflow-hidden border border-[#12281D]">
              <div className="bg-[#00FF66] h-full rounded-full" style={{ width: '78.4%' }} />
            </div>
          </div>

          {/* GreenTech Side */}
          <div className="p-4 rounded bg-[#050B08] border border-[#A855F7]/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-bold">🌿 GREENTECH SOLUTIONS</span>
              <span className="text-[#A855F7] font-extrabold">6,420 KG</span>
            </div>
            <div className="w-full bg-[#09120D] h-3 rounded-full overflow-hidden border border-[#12281D]">
              <div className="bg-[#A855F7] h-full rounded-full" style={{ width: '64.2%' }} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-[#527A67] pt-2 border-t border-[#12281D]">
          <span>REMAINING TIME: 04D : 12H : 30M</span>
          <span className="text-[#F5C518] font-bold">PRIZE POOL SPONSORED: ₹2,00,000</span>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded bg-[#09120D] border border-[#12281D]">
        {['ALL', 'EASY', 'MEDIUM', 'HARD', 'EPIC', 'LEGENDARY'].map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
              selectedDifficulty === diff
                ? 'bg-[#A855F7] text-white shadow-md'
                : 'text-[#527A67] hover:text-white hover:bg-[#050B08]'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-[#09120D] border border-[#12281D] hover:border-[#00FF66]/50 rounded-lg p-5 space-y-4 transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold">
                  {mission.category}
                </span>
                <h3 className="text-base font-extrabold text-white mt-2">{mission.title}</h3>
                <span className="text-xs text-[#527A67]">{mission.subtitle}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5C518]/20 text-[#F5C518] font-bold border border-[#F5C518]/30">
                {mission.difficulty}
              </span>
            </div>

            {/* Sponsor & Stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded bg-[#050B08] border border-[#12281D]">
              <div>
                <span className="text-[9px] text-[#527A67]">SPONSOR</span>
                <div className="font-bold text-white text-[11px] truncate">{mission.sponsorName}</div>
              </div>
              <div>
                <span className="text-[9px] text-[#527A67]">PRIZE POOL</span>
                <div className="font-bold text-[#F5C518] text-[11px]">₹{mission.prizePoolInr.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-[9px] text-[#527A67]">REWARDS</span>
                <div className="font-bold text-[#00FF66] text-[11px]">+{mission.xpReward} XP</div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-[#527A67]">Progress</span>
                <span className="text-[#00FF66] font-bold">
                  {mission.currentKg.toLocaleString()} / {mission.targetKg.toLocaleString()} KG
                </span>
              </div>
              <div className="w-full bg-[#050B08] h-2.5 rounded-full overflow-hidden border border-[#12281D]">
                <div
                  className="bg-[#00FF66] h-full rounded-full"
                  style={{ width: `${(mission.currentKg / mission.targetKg) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => joinCsrMission(mission.id)}
              className="w-full py-2.5 bg-[#00FF66] text-[#050B08] font-extrabold text-xs rounded hover:bg-[#00FF66]/90 transition-all glow-green"
            >
              {mission.isJoined ? 'MISSION DEPLOYED ✓' : 'ENTER MISSION →'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
