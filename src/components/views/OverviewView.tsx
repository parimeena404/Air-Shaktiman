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
  const { profile, wasteReports, setActiveTab } = useEco();

  // Daily protocol tasks state simulation
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: 'Report one waste item', xp: 50, done: true },
    { id: 2, text: 'Recycle e-waste', xp: 100, done: true },
    { id: 3, text: 'Join a cleanup operation', xp: 150, done: false },
    { id: 4, text: 'Rescue surplus food', xp: 100, done: false },
  ]);

  const toggleTask = (id: number) => {
    setDailyTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = dailyTasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / dailyTasks.length) * 100);

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* HUD Header Banner */}
      <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-4 md:p-6 space-y-3 relative overflow-hidden">
        {/* Background Poster Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: "url('/images/squid-game/media_1787398142284.jpg')" }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <div className="text-[10px] text-[#03E5B7] flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF007A] animate-ping" />
            <span>◯ SQUID ECO-ARENA // CONTESTANT #456 CONTROL</span>
          </div>
          <button
            onClick={() => setActiveTab('eco-ai')}
            className="text-[10px] text-[#FF007A] border border-[#FF007A]/50 bg-[#160B18] px-3 py-1 rounded hover:bg-[#FF007A]/20 transition-all flex items-center gap-1 font-bold glow-pink"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>FRONT MAN COPILOT</span>
          </button>
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest flex items-center gap-3">
            CITY GUARDIAN <span className="text-[#FF007A]">SQUID ARENA</span>
          </h1>
          <p className="text-xs text-[#03E5B7] tracking-wider mt-0.5 font-bold">
            "SURVIVE THE WASTE. DIVERT THE RECYCLABLES. WIN THE CASH POOL."
          </p>
        </div>

        {/* Sub-module Tag Bar */}
        <div className="relative z-10 pt-2 border-t border-[#1D2133] flex items-center justify-between text-[10px]">
          <span className="text-[#FF007A] flex items-center gap-1.5 font-bold">
            <span className="text-sm">◯ △ □</span>
            ROUND 7 // LIVE CAMPUS RECYCLING PROTOCOL
          </span>
          <span className="text-[#FFC700] font-bold">💰 VAULT POOL: ₹45.6 BILLION</span>
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
            {dailyTasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded bg-[#050B08] border transition-all cursor-pointer flex items-center justify-between text-xs ${
                  task.done
                    ? 'border-[#12281D] text-slate-500 line-through'
                    : 'border-[#12281D] text-white hover:border-[#00FF66]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {task.done ? (
                    <CheckSquare className="w-4 h-4 text-[#00FF66] flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-[#527A67] flex-shrink-0" />
                  )}
                  <span>{task.text}</span>
                </div>
                <span className="text-[10px] text-[#F5C518] font-bold">+{task.xp} XP</span>
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
