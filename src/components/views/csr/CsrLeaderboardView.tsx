'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import { Award, Crown, Trophy, Building2, ShieldCheck, Flame, Zap } from 'lucide-react';

export const CsrLeaderboardView: React.FC = () => {
  const { csrCompanies } = useEco();

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#09120D] border border-[#F5C518]/50 rounded-lg p-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5C518]/20 border border-[#F5C518]/40 text-[#F5C518] text-xs font-bold">
          <Award className="w-3.5 h-3.5" />
          <span>CSR GLOBAL CORPORATE IMPACT RANKING</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-widest">CSR GLOBAL LEADERBOARD</h1>
        <p className="text-xs text-[#527A67]">
          Rankings are strictly calculated from VERIFIED ENVIRONMENTAL IMPACT & CITIZEN ENGAGEMENT, not merely money spent.
        </p>
      </div>

      {/* Podium Top 3 Companies Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Rank 2 */}
        {csrCompanies[1] && (
          <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 text-center space-y-3 relative order-2 sm:order-1 sm:mt-6">
            <span className="text-3xl">{csrCompanies[1].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-[#00FF66] font-bold">🥈 RANK #2</span>
              <h3 className="font-bold text-white text-base">{csrCompanies[1].name}</h3>
              <div className="text-xs text-[#F5C518] font-bold">{csrCompanies[1].impactScore} Impact Score</div>
            </div>
          </div>
        )}

        {/* Rank 1 Champion */}
        {csrCompanies[0] && (
          <div className="bg-[#09120D] border-2 border-[#F5C518] rounded-lg p-6 text-center space-y-3 relative order-1 sm:order-2 shadow-2xl glow-green">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-[#F5C518] text-[#050B08] font-extrabold text-[10px] flex items-center gap-1">
              <Crown className="w-3 h-3" /> CORPORATE CHAMPION
            </div>
            <span className="text-4xl">{csrCompanies[0].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-[#F5C518] font-black">🥇 RANK #1</span>
              <h3 className="font-black text-white text-lg">{csrCompanies[0].name}</h3>
              <div className="text-sm text-[#F5C518] font-bold">{csrCompanies[0].impactScore} Impact Score</div>
              <div className="text-[10px] text-[#00FF66] font-bold">24 Missions Completed</div>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {csrCompanies[2] && (
          <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 text-center space-y-3 relative order-3 sm:mt-10">
            <span className="text-3xl">{csrCompanies[2].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-amber-500 font-bold">🥉 RANK #3</span>
              <h3 className="font-bold text-white text-base">{csrCompanies[2].name}</h3>
              <div className="text-xs text-[#F5C518] font-bold">{csrCompanies[2].impactScore} Impact Score</div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#09120D] border border-[#12281D] rounded-lg overflow-hidden font-mono">
        <div className="p-4 border-b border-[#12281D] text-xs text-[#527A67] flex justify-between font-bold">
          <span>CORPORATE STANDINGS</span>
          <span>CALCULATED VIA VERIFIED IMPACT</span>
        </div>

        <div className="divide-y divide-[#12281D]">
          {csrCompanies.map((comp) => (
            <div
              key={comp.id}
              className={`p-4 flex items-center justify-between text-xs transition-colors ${
                comp.rank === 1 ? 'bg-[#00FF66]/10 border-l-4 border-l-[#00FF66]' : 'hover:bg-[#050B08]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-black text-sm w-6 ${
                    comp.rank <= 3 ? 'text-[#F5C518]' : 'text-[#527A67]'
                  }`}
                >
                  #{comp.rank}
                </span>
                <span className="text-2xl">{comp.logo}</span>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{comp.name}</span>
                    <span className="text-[10px] text-[#00FF66] font-bold">
                      {comp.rankShift > 0 ? `▲ +${comp.rankShift}` : `▼ ${comp.rankShift}`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {comp.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[9px] px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30 font-bold"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-black text-[#F5C518] text-sm">{comp.impactScore} SCORE</div>
                <div className="text-[10px] text-[#527A67]">{comp.activeProjects} Active Projects</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
