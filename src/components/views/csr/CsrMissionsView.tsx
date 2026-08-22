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
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header Title */}
      <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-xl p-6 space-y-2 shadow-2xl glow-pink">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] text-xs font-black">
          <Target className="w-3.5 h-3.5" />
          <span>CSR SPONSORED ARENA MISSIONS</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest">LIVE CSR MISSIONS</h1>
        <p className="text-xs text-slate-300 font-bold">
          Participate in corporate-funded real-world environmental campaigns to claim XP, Eco Points, & Cash Bounties.
        </p>
      </div>

      {/* ⚔️ COMPANY VS COMPANY CHALLENGE HERO BANNER */}
      <div className="bg-[#0D0F17] border-2 border-[#FFC700] rounded-xl p-6 space-y-4 shadow-2xl glow-gold relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FFC700] text-[#07080E] font-black">
            ⚔️ CORPORATE CSR CHAMPIONSHIP
          </span>
          <span className="text-xs text-[#FFC700] font-bold">LIVE MATCHUP // WEEK 4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* TechNova Side */}
          <div className="p-4 rounded-lg bg-[#07080E] border border-[#03E5B7] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-black">⚡ TECHNOVA INDUSTRIES</span>
              <span className="text-[#03E5B7] font-black">7,840 KG</span>
            </div>
            <div className="w-full bg-[#0D0F17] h-3 rounded-full overflow-hidden border border-[#1D2133]">
              <div className="bg-[#03E5B7] h-full rounded-full" style={{ width: '78.4%' }} />
            </div>
          </div>

          {/* GreenTech Side */}
          <div className="p-4 rounded-lg bg-[#07080E] border border-[#FF007A] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-black">🌿 GREENTECH SOLUTIONS</span>
              <span className="text-[#FF007A] font-black">6,420 KG</span>
            </div>
            <div className="w-full bg-[#0D0F17] h-3 rounded-full overflow-hidden border border-[#1D2133]">
              <div className="bg-[#FF007A] h-full rounded-full" style={{ width: '64.2%' }} />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400 font-bold pt-2 border-t border-[#1D2133]">
          <span>REMAINING TIME: 04D : 12H : 30M</span>
          <span className="text-[#FFC700] font-black">PRIZE POOL SPONSORED: ₹2,00,000</span>
        </div>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0D0F17] border border-[#1D2133]">
        {['ALL', 'EASY', 'MEDIUM', 'HARD', 'EPIC', 'LEGENDARY'].map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all ${
              selectedDifficulty === diff
                ? 'bg-[#FF007A] text-white shadow-lg glow-pink'
                : 'text-slate-400 hover:text-white hover:bg-[#1D2133]'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission: any) => (
          <div
            key={mission.id}
            className="bg-[#0D0F17] border border-[#1D2133] hover:border-[#03E5B7] rounded-xl p-5 space-y-4 transition-all shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
                    {mission.category}
                  </span>
                  <h3 className="text-base font-black text-white mt-2">{mission.title}</h3>
                  <span className="text-xs text-slate-400 font-bold">{mission.subtitle}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] font-bold border border-[#FF007A]/30">
                  {mission.difficulty}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-400">Target Progress</span>
                  <span className="text-[#03E5B7]">
                    {mission.currentValue} / {mission.targetValue} {mission.unit}
                  </span>
                </div>
                <div className="w-full bg-[#07080E] h-2 rounded-full overflow-hidden border border-[#1D2133]">
                  <div
                    className="bg-[#03E5B7] h-full rounded-full"
                    style={{ width: `${(mission.currentValue / mission.targetValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1D2133]">
              <div className="text-xs font-black text-[#FFC700]">
                +{mission.rewardPoints} XP & Bounties
              </div>
              <button
                onClick={() => joinCsrMission(mission.id)}
                className="px-4 py-2 rounded-lg bg-[#03E5B7] text-[#07080E] font-black text-xs hover:bg-[#03E5B7]/90 transition-all glow-teal"
              >
                JOIN MISSION
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
