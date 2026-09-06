'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { CampusMap } from '../map/CampusMap';
import {
  Camera,
  MapPin,
  Gift,
  Bot,
  Globe,
  Trophy,
  CheckSquare,
  Square,
  ArrowRight,
  Target,
  Sparkles,
  Users,
  Clock,
  Shield,
  Activity,
  Flame,
  ChevronRight,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const { profile, wasteReports, setActiveTab, dailyMissions, completeDailyMission } = useEco();

  const completedCount = dailyMissions.filter((t) => t.done).length;
  const progressPercent = dailyMissions.length > 0 ? Math.round((completedCount / dailyMissions.length) * 100) : 0;

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* GDG Citizen Action Hero Banner with workspace photo */}
      <div className="bg-white border border-[#E8EAED] rounded-2xl p-6 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 flex-1 space-y-3 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#1A73E8]">
              Air Shaktiman • GDG Citizen Workspace
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#202124] tracking-tight">
            Turn Daily Waste Into Verified Impact
          </h1>
          <p className="text-xs md:text-sm text-[#5F6368] max-w-xl">
            Report local waste spots, earn eco points, redeem merchant coupons, and collaborate with your neighborhood eco clubs.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setActiveTab('report-waste')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#4285F4] hover:bg-[#1A73E8] shadow-sm transition-all flex items-center gap-2"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Report Waste Spot</span>
            </button>
            <button
              onClick={() => setActiveTab('redeem-rewards')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#E37400] bg-[#FEF7E0] border border-[#FBBC0460] hover:bg-amber-100 transition-all flex items-center gap-2"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Redeem Coupons</span>
            </button>
          </div>
        </div>
        <div className="relative z-10 flex-shrink-0">
          <img
            src="/images/workspace-collaboration.jpg"
            alt="Workspace Collaboration"
            className="max-h-40 w-auto object-contain rounded-xl shadow-sm hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* 🚀 FEATURED MISSION CARD (ZERO WASTE CAMPUS RADAR HUD) */}
      <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-lg p-5 md:p-6 relative overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 glow-pink">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-[10px] text-[#FF007A] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
            <span>PRIMARY MISSION // SQUID ARENA</span>
          </div>

          <div>
            <h2 className="text-3xl font-black text-white tracking-wider">
              ZERO WASTE CAMPUS RAID
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              <span className="text-[#FF007A] font-bold">OBJECTIVE:</span> Divert <span className="text-[#03E5B7] font-bold">500 KG</span> of waste before the elimination timer expires.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span className="text-[#03E5B7] font-bold">COMMUNITY PROGRESS</span>
              <span className="text-[#FF007A] font-extrabold">85.6%</span>
            </div>
            <div className="w-full bg-[#07080E] h-3 rounded-full overflow-hidden border border-[#1D2133] p-0.5">
              <div className="bg-gradient-to-r from-[#FF007A] to-[#03E5B7] h-full rounded-full glow-pink transition-all duration-500" style={{ width: '85.6%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span className="text-[#03E5B7] font-bold">428 KG DIVERTED</span>
              <span>/ 500 KG TARGET</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('challenges')}
              className="px-5 py-2.5 bg-[#FF007A] text-white font-black text-xs rounded hover:bg-[#FF007A]/90 transition-all flex items-center gap-2 glow-pink"
            >
              <span>ENTER SQUID ARENA</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('nearby')}
              className="px-4 py-2.5 bg-[#07080E] border border-[#03E5B7] text-[#03E5B7] hover:text-white hover:bg-[#03E5B7]/20 font-bold text-xs rounded transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#03E5B7]" />
              <span>RADAR MAP</span>
            </button>
          </div>
        </div>

        {/* Radar Map Circle Display Graphic */}
        <div className="bg-[#07080E] border border-[#1D2133] rounded-lg p-4 flex flex-col items-center justify-between relative min-h-[220px] radar-grid">
          {/* Concentric Circle Visual */}
          <div className="relative w-36 h-36 rounded-full border border-[#FF007A]/40 flex items-center justify-center my-auto">
            <div className="w-24 h-24 rounded-full border border-[#03E5B7]/30 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#FF007A]/20 border border-[#FF007A] flex flex-col items-center justify-center text-center">
                <span className="text-base font-black text-[#FF007A] leading-none">428</span>
                <span className="text-[7px] text-[#03E5B7] font-bold leading-none mt-0.5">KG diverted</span>
              </div>
            </div>
            {/* Blip dots */}
            <span className="absolute top-2 right-6 w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
            <span className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#03E5B7]" />
          </div>

          <div className="w-full flex items-center justify-between text-[10px] border-t border-[#1D2133] pt-2">
            <span className="text-slate-400 font-bold">TIMER REMAINING</span>
            <span className="text-[#FFC700] font-black">03D : 12H : 42M</span>
          </div>
          <div className="w-full text-center text-[9px] text-[#03E5B7] font-bold mt-1">
            1,824 CONTESTANTS DEPLOYED ◯
          </div>
        </div>
      </div>

      {/* 📊 PROTOCOL & LEADERBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DAILY PROTOCOL WIDGET */}
        <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#12281D] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#00FF66]">⚡</span>
              <div>
                <span className="text-[9px] text-[#527A67]">DAILY PROTOCOL</span>
                <h3 className="text-base font-extrabold text-white">DAILY MISSIONS</h3>
              </div>
            </div>
            <span className="text-lg font-bold text-[#00FF66]">{progressPercent}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#050B08] h-2 rounded-full overflow-hidden border border-[#12281D]">
            <div className="bg-[#00FF66] h-full rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
          </div>

          {/* Tasks List */}
          <div className="space-y-2">
            {dailyMissions.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded bg-[#050B08] border transition-all flex items-center justify-between text-xs group ${
                  task.done
                    ? 'border-[#12281D] text-slate-500 line-through'
                    : 'border-[#12281D] text-white hover:border-[#00FF66]/50'
                }`}
              >
                <div
                  onClick={() => completeDailyMission(task.id)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  {task.done ? (
                    <CheckSquare className="w-4 h-4 text-[#00FF66] flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[#527A67] group-hover:text-[#00FF66] flex-shrink-0 transition-colors" />
                  )}
                  <span className={task.done ? 'line-through text-slate-500' : 'text-slate-100 font-bold'}>
                    {task.text}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {!task.done && task.targetTab && (
                    <button
                      onClick={() => setActiveTab(task.targetTab!)}
                      className="px-2 py-0.5 rounded bg-[#00FF66]/10 hover:bg-[#00FF66]/25 text-[#00FF66] text-[10px] font-bold border border-[#00FF66]/30 transition-all flex items-center gap-1"
                      title={`Go to ${task.targetTab}`}
                    >
                      <span>GO</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                  <span className={`text-[10px] font-bold ${task.done ? 'text-slate-600 line-through' : 'text-[#F5C518]'}`}>
                    +{task.xp} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARENA RANKING WIDGET */}
        <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#12281D] pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#00FF66]" />
              <div>
                <span className="text-[9px] text-[#527A67]">ARENA RANKING</span>
                <h3 className="text-base font-extrabold text-white">TOP PLAYERS</h3>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="p-1 rounded bg-[#050B08] border border-[#12281D] text-[#00FF66] hover:border-[#00FF66]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Leaderboard Entries */}
          <div className="space-y-2">
            <div className="p-2.5 rounded bg-[#050B08] border border-[#12281D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-bold">01</span>
                <div className="w-7 h-7 rounded bg-[#F5C518]/20 border border-[#F5C518] flex items-center justify-center text-[#F5C518] font-bold text-[10px]">
                  AR
                </div>
                <div>
                  <span className="font-bold text-white">AARAV R.</span>
                  <p className="text-[9px] text-[#527A67]">LVL 18 // DIAMOND</p>
                </div>
              </div>
              <span className="text-[#00FF66] font-bold">10,840</span>
            </div>

            <div className="p-2.5 rounded bg-[#050B08] border border-[#12281D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-bold">02</span>
                <div className="w-7 h-7 rounded bg-[#00FF66]/20 border border-[#00FF66] flex items-center justify-center text-[#00FF66] font-bold text-[10px]">
                  PR
                </div>
                <div>
                  <span className="font-bold text-white">PRIYA R.</span>
                  <p className="text-[9px] text-[#527A67]">LVL 15 // PLATINUM</p>
                </div>
              </div>
              <span className="text-[#00FF66] font-bold">9,240</span>
            </div>

            <div className="p-2.5 rounded bg-[#050B08] border border-[#12281D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-bold">03</span>
                <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-500 font-bold text-[10px]">
                  MK
                </div>
                <div>
                  <span className="font-bold text-white">MEERA K.</span>
                  <p className="text-[9px] text-[#527A67]">LVL 14 // GOLD</p>
                </div>
              </div>
              <span className="text-[#00FF66] font-bold">8,990</span>
            </div>

            {/* Current User Row */}
            <div className="p-3 rounded bg-[#00FF66]/10 border border-[#00FF66] flex items-center justify-between text-xs glow-green-sm">
              <div className="flex items-center gap-3">
                <span className="text-[#00FF66] font-bold">27</span>
                <span className="font-bold text-white">YOU // DHEERAJ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00FF66] font-bold">8,420</span>
                <span className="text-[9px] text-[#00FF66]">▲ +3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📍 LIVE MAP & QUICK CONTROLS */}
      <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            <h3 className="text-sm font-bold text-white tracking-wider">
              LIVE CAMPUS ECO-GRID RADAR
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('report-waste')}
            className="px-3 py-1 bg-[#00FF66]/10 border border-[#00FF66]/40 text-[#00FF66] rounded text-xs font-bold hover:bg-[#00FF66]/20 transition-all"
          >
            + DISPOSE WASTE (+50 XP)
          </button>
        </div>
        <CampusMap />
      </div>
    </div>
  );
};
