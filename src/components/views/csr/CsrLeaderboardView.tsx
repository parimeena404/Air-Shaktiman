'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import { Award, Crown, Trophy, Building2, ShieldCheck, Flame, Zap } from 'lucide-react';

export const CsrLeaderboardView: React.FC = () => {
  const { csrCompanies } = useEco();

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border-2 border-[#FFC700] rounded-xl p-6 space-y-2 shadow-2xl glow-gold">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFC700]/20 border border-[#FFC700]/40 text-[#FFC700] text-xs font-black">
          <Award className="w-3.5 h-3.5" />
          <span>CSR GLOBAL CORPORATE IMPACT RANKING</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest">CSR GLOBAL LEADERBOARD</h1>
        <p className="text-xs text-slate-300 font-bold">
          Rankings are strictly calculated from VERIFIED ENVIRONMENTAL IMPACT & CITIZEN ENGAGEMENT, not merely money spent.
        </p>
      </div>

      {/* Podium Top 3 Companies Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        {/* Rank 2 */}
        {csrCompanies[1] && (
          <div className="bg-[#0D0F17] border border-[#03E5B7] rounded-xl p-5 text-center space-y-3 relative order-2 sm:order-1 sm:mt-6 shadow-lg">
            <span className="text-3xl">{csrCompanies[1].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-[#03E5B7] font-black">🥈 RANK #2</span>
              <h3 className="font-black text-white text-base">{csrCompanies[1].name}</h3>
              <div className="text-xs text-[#FFC700] font-bold">{csrCompanies[1].impactScore} Impact Score</div>
            </div>
          </div>
        )}

        {/* Rank 1 Champion */}
        {csrCompanies[0] && (
          <div className="bg-[#0D0F17] border-2 border-[#FFC700] rounded-xl p-6 text-center space-y-3 relative order-1 sm:order-2 shadow-2xl glow-gold">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded bg-[#FFC700] text-[#07080E] font-black text-[10px] flex items-center gap-1">
              <Crown className="w-3 h-3" /> CORPORATE CHAMPION
            </div>
            <span className="text-4xl">{csrCompanies[0].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-[#FFC700] font-black">🥇 RANK #1</span>
              <h3 className="font-black text-white text-lg">{csrCompanies[0].name}</h3>
              <div className="text-sm text-[#FFC700] font-bold">{csrCompanies[0].impactScore} Impact Score</div>
              <div className="text-[10px] text-[#03E5B7] font-bold">24 Missions Completed</div>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {csrCompanies[2] && (
          <div className="bg-[#0D0F17] border border-[#FF007A] rounded-xl p-5 text-center space-y-3 relative order-3 sm:mt-10 shadow-lg">
            <span className="text-3xl">{csrCompanies[2].logo}</span>
            <div className="space-y-1">
              <span className="text-xs text-[#FF007A] font-black">🥉 RANK #3</span>
              <h3 className="font-black text-white text-base">{csrCompanies[2].name}</h3>
              <div className="text-xs text-[#FFC700] font-bold">{csrCompanies[2].impactScore} Impact Score</div>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl overflow-hidden font-mono shadow-xl">
        <div className="p-4 border-b border-[#1D2133] text-xs text-slate-400 flex justify-between font-bold">
          <span>CORPORATE STANDINGS</span>
          <span>CALCULATED VIA VERIFIED IMPACT</span>
        </div>

        <div className="divide-y divide-[#1D2133]">
          {csrCompanies.map((comp) => (
            <div
              key={comp.id}
              className={`p-4 flex items-center justify-between text-xs transition-colors ${
                comp.rank === 1 ? 'bg-[#FFC700]/10 border-l-4 border-l-[#FFC700]' : 'hover:bg-[#07080E]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`font-black text-sm w-6 ${
                    comp.rank <= 3 ? 'text-[#FFC700]' : 'text-slate-500'
                  }`}
                >
                  #{comp.rank}
                </span>
                <span className="text-2xl">{comp.logo}</span>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>{comp.name}</span>
                    <span className="text-[10px] text-[#03E5B7] font-bold">
                      {comp.rankShift > 0 ? `▲ +${comp.rankShift}` : `▼ ${comp.rankShift}`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {comp.badges.map((b) => (
                      <span
                        key={b}
                        className="text-[9px] px-2 py-0.5 rounded bg-[#07080E] text-[#03E5B7] border border-[#03E5B7]/30 font-bold"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#FFC700]">{comp.impactScore} Pts</div>
                <div className="text-[10px] text-slate-400 font-bold">
                  ₹{(comp.csrBudgetInr / 100000).toFixed(1)}L Allocated
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
