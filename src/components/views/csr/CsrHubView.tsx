'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import {
  Building2,
  Target,
  Coins,
  BarChart3,
  Award,
  Users,
  Clock,
  Sparkles,
  Flame,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Globe,
  Zap,
} from 'lucide-react';

export const CsrHubView: React.FC = () => {
  const { csrCompanies, csrMissions, csrProjects, joinCsrMission, setActiveTab } = useEco();

  const mainCompany = csrCompanies[0];
  const liveMission = csrMissions[0];

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* 🚀 TOP HUD HEADER */}
      <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-5 md:p-6 relative overflow-hidden space-y-4 shadow-xl">
        {/* Background Poster Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/images/squid-game/media_1787398142284.jpg')" }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] text-xs font-black">
            <Building2 className="w-3.5 h-3.5" />
            <span>CSR IMPACT ARENA // MULTIPLAYER SQUID MISSIONS</span>
          </div>
          <span className="text-[10px] text-[#03E5B7] font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
            LIVE MULTIPLAYER NETWORK
          </span>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest">
            CSR IMPACT HUB
          </h1>
          <p className="text-xs text-[#03E5B7] font-black tracking-wider mt-1">
            "COMPANIES FUND THE MISSION. CONTESTANTS CREATE THE IMPACT."
          </p>
        </div>

        {/* HUD Top Stats Cards Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          <div className="p-3 rounded bg-[#07080E] border border-[#FFC700]/40 space-y-1">
            <span className="text-[9px] text-slate-400 font-bold">TOTAL CSR FUNDING</span>
            <div className="text-lg font-black text-[#FFC700]">₹4.82 Cr</div>
          </div>

          <div className="p-3 rounded bg-[#07080E] border border-[#FF007A]/40 space-y-1">
            <span className="text-[9px] text-slate-400 font-bold">ACTIVE CSR MISSIONS</span>
            <div className="text-lg font-black text-[#FF007A]">24 LIVE</div>
          </div>

          <div className="p-3 rounded bg-[#07080E] border border-[#03E5B7]/40 space-y-1">
            <span className="text-[9px] text-slate-400 font-bold">PROJECTS COMPLETED</span>
            <div className="text-lg font-black text-[#03E5B7]">118</div>
          </div>

          <div className="p-3 rounded bg-[#07080E] border border-[#FF007A]/40 space-y-1">
            <span className="text-[9px] text-slate-400 font-bold">TOTAL IMPACT</span>
            <div className="text-lg font-black text-[#FF007A]">42.8 TONNES</div>
          </div>

          <div className="p-3 rounded bg-[#07080E] border border-[#FFC700]/40 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[9px] text-slate-400 font-bold">CONTESTANTS</span>
            <div className="text-lg font-black text-white">18,420 PLAYERS</div>
          </div>
        </div>
      </div>

      {/* 🏢 CSR COMMAND CENTER WIDGET */}
      {mainCompany && (
        <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{mainCompany.logo}</span>
              <div>
                <span className="text-[9px] text-[#FF007A] font-bold">COMPANY COMMAND CENTER</span>
                <h3 className="text-base font-black text-white">{mainCompany.name}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
                ◯ ACTIVE SPONSOR
              </span>
              <button
                onClick={() => setActiveTab('csr-funding')}
                className="px-3 py-1 bg-[#FFC700]/20 border border-[#FFC700] text-[#FFC700] text-xs font-bold rounded hover:bg-[#FFC700]/30 transition-all glow-gold"
              >
                Manage Budget →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded bg-[#07080E] border border-[#1D2133]">
              <span className="text-[9px] text-slate-400 font-bold">CSR BUDGET</span>
              <div className="text-base font-black text-[#FFC700]">₹{mainCompany.csrBudgetInr.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-[#07080E] border border-[#1D2133]">
              <span className="text-[9px] text-slate-400 font-bold">ALLOCATED</span>
              <div className="text-base font-black text-[#FF007A]">₹{mainCompany.allocatedInr.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-[#07080E] border border-[#1D2133]">
              <span className="text-[9px] text-slate-400 font-bold">REMAINING</span>
              <div className="text-base font-black text-[#03E5B7]">₹{mainCompany.remainingInr.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded bg-[#07080E] border border-[#1D2133]">
              <span className="text-[9px] text-slate-400 font-bold">ACTIVE / COMPLETED</span>
              <div className="text-base font-black text-white">{mainCompany.activeProjects} / {mainCompany.completedProjects}</div>
            </div>
            <div className="p-3 rounded bg-[#07080E] border border-[#FF007A] glow-pink text-center col-span-2 md:col-span-1">
              <span className="text-[9px] text-[#FF007A] font-bold">CSR IMPACT SCORE</span>
              <div className="text-lg font-black text-[#FFC700]">{mainCompany.impactScore} / 1000</div>
            </div>
          </div>
        </div>
      )}

      {/* 🔴 HERO LIVE CSR EVENT (ZERO WASTE CAMPUS RAID) */}
      {liveMission && (
        <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-lg p-5 md:p-6 space-y-5 relative overflow-hidden shadow-2xl glow-pink">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FF007A] text-white font-black tracking-wider">
                  🔴 LIVE CSR EVENT
                </span>
                <span className="text-[10px] text-[#FFC700] font-bold">
                  {liveMission.sponsorLogo} SPONSORED BY {liveMission.sponsorName.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest">
                {liveMission.title}
              </h2>
              <p className="text-xs text-[#03E5B7] font-bold max-w-xl">{liveMission.subtitle}</p>
            </div>

            <div className="bg-[#07080E] border border-[#FFC700] p-4 rounded text-right min-w-[200px] glow-gold">
              <span className="text-[9px] text-slate-400 font-bold">PRIZE POOL</span>
              <div className="text-2xl font-black text-[#FFC700]">
                ₹{liveMission.prizePoolInr.toLocaleString()}
              </div>
              <span className="text-[9px] text-[#FF007A] font-bold">+500 XP & +300 ECO POINTS</span>
            </div>
          </div>

          {/* Mission Progress Bar */}
          <div className="space-y-1.5 bg-[#07080E] p-4 rounded border border-[#1D2133]">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-bold">MISSION OBJECTIVE: DIVERT 10,000 KG OF WASTE</span>
              <span className="text-[#FF007A] font-black">
                {liveMission.currentKg.toLocaleString()} / {liveMission.targetKg.toLocaleString()} KG (78.4%)
              </span>
            </div>
            <div className="w-full bg-[#0D0F17] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#1D2133]">
              <div className="bg-gradient-to-r from-[#FF007A] to-[#03E5B7] h-full rounded-full glow-pink" style={{ width: '78.4%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 pt-1 font-mono">
              <span>CONTESTANTS DEPLOYED: {liveMission.playersCount.toLocaleString()}</span>
              <span>CAMPUSES: {liveMission.campusesCount} • NGO PARTNERS: {liveMission.ngoPartnersCount}</span>
              <span className="text-[#FFC700] font-black">TIME REMAINING: {liveMission.timeRemaining}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => joinCsrMission(liveMission.id)}
              className="px-6 py-2.5 bg-[#FF007A] text-white font-black text-xs rounded hover:bg-[#FF007A]/90 transition-all flex items-center gap-2 glow-pink"
            >
              <span>{liveMission.isJoined ? 'MISSION DEPLOYED ✓' : 'ENTER MISSION'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('csr-impact')}
              className="px-4 py-2.5 bg-[#07080E] border border-[#03E5B7] text-[#03E5B7] hover:text-white hover:bg-[#03E5B7]/20 text-xs font-bold rounded transition-all"
            >
              VIEW IMPACT
            </button>

            <button
              onClick={() => setActiveTab('csr-leaderboard')}
              className="px-4 py-2.5 bg-[#07080E] border border-[#FFC700] text-[#FFC700] hover:text-white hover:bg-[#FFC700]/20 text-xs font-bold rounded transition-all"
            >
              VIEW LEADERBOARD
            </button>
          </div>
        </div>
      )}

      {/* 🎯 SPONSORED MISSIONS GRID (<CSRMissionCard />) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#1D2133] pb-2">
          <h3 className="text-sm font-black text-white tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#FF007A]" />
            ACTIVE SPONSORED CSR MISSIONS
          </h3>
          <button
            onClick={() => setActiveTab('csr-missions')}
            className="text-xs text-[#FF007A] hover:underline font-bold"
          >
            Explore All Missions →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {csrMissions.map((mission) => (
            <div
              key={mission.id}
              className="bg-[#0D0F17] border border-[#1D2133] hover:border-[#FF007A]/60 rounded-lg p-5 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/40 font-bold">
                    {mission.category}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FFC700]/20 text-[#FFC700] font-bold">
                    {mission.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xl">{mission.sponsorLogo}</span>
                  <span className="text-[10px] text-slate-400 font-bold">SPONSORED BY {mission.sponsorName}</span>
                </div>

                <h4 className="font-black text-white text-sm tracking-wide">{mission.title}</h4>
                <p className="text-[11px] text-slate-400">{mission.subtitle}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#1D2133]">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Progress</span>
                  <span className="text-[#FF007A] font-black">
                    {mission.currentKg} / {mission.targetKg} KG
                  </span>
                </div>
                <div className="w-full bg-[#07080E] h-2 rounded-full overflow-hidden border border-[#1D2133]">
                  <div
                    className="bg-[#FF007A] h-full rounded-full"
                    style={{ width: `${(mission.currentKg / mission.targetKg) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  <span>Prize: ₹{mission.prizePoolInr.toLocaleString()}</span>
                  <span>{mission.playersCount} Players</span>
                </div>
              </div>

              <button
                onClick={() => joinCsrMission(mission.id)}
                className="w-full py-2 bg-[#07080E] border border-[#1D2133] text-white text-xs font-bold rounded hover:border-[#FF007A] hover:text-[#FF007A] transition-all"
              >
                {mission.isJoined ? 'Joined Mission ✓' : 'JOIN MISSION'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
