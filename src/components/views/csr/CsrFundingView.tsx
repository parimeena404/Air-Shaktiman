'use client';

import React from 'react';
import { useEco } from '../../../context/EcoContext';
import { Coins, ArrowRight, ShieldCheck, CheckCircle2, Building2, BarChart3 } from 'lucide-react';

export const CsrFundingView: React.FC = () => {
  const { csrCompanies } = useEco();
  const company = csrCompanies[0];

  const pipelineStages = [
    { label: 'PENDING', status: 'done', count: 4 },
    { label: 'APPROVED', status: 'done', count: 6 },
    { label: 'FUNDED', status: 'done', count: 12 },
    { label: 'ACTIVE', status: 'current', count: 12 },
    { label: 'COMPLETED', status: 'done', count: 24 },
    { label: 'VERIFIED', status: 'done', count: 24 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border-2 border-[#FFC700] rounded-xl p-6 space-y-2 shadow-2xl glow-gold">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FFC700]/20 border border-[#FFC700]/40 text-[#FFC700] text-xs font-black">
          <Coins className="w-3.5 h-3.5" />
          <span>CSR CAPITAL ALLOCATION & TRANSPARENCY PIPELINE</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest">FUNDING CENTER</h1>
        <p className="text-xs text-slate-300 font-bold">
          Monitor real-time corporate CSR budget deployment, verified financial flows, and project milestone releases.
        </p>
      </div>

      {/* Budget Summary Grid */}
      {company && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0D0F17] border border-[#FFC700] rounded-xl p-4 space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 font-bold">TOTAL CSR FUND</span>
            <div className="text-xl font-black text-[#FFC700]">₹{company.csrBudgetInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#0D0F17] border border-[#FF007A] rounded-xl p-4 space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 font-bold">ALLOCATED CAPITAL</span>
            <div className="text-xl font-black text-[#FF007A]">₹{company.allocatedInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#0D0F17] border border-[#03E5B7] rounded-xl p-4 space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 font-bold">REMAINING DEPLOYABLE</span>
            <div className="text-xl font-black text-[#03E5B7]">₹{company.remainingInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-4 space-y-1 shadow-lg">
            <span className="text-[10px] text-slate-400 font-bold">ACTIVE PROJECTS</span>
            <div className="text-xl font-black text-white">{company.activeProjects} PROJECTS</div>
          </div>
        </div>
      )}

      {/* 🚀 VISUAL FUNDING PIPELINE TRACKER */}
      <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-5 space-y-4 shadow-lg">
        <h3 className="text-xs font-black text-white tracking-wider uppercase">CSR MISSION FUNDING PIPELINE STAGES</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
          {pipelineStages.map((stage, idx) => (
            <div
              key={stage.label}
              className={`p-3 rounded-lg border text-center space-y-1 ${
                stage.status === 'current'
                  ? 'bg-[#03E5B7]/15 border-[#03E5B7] text-[#03E5B7] glow-teal'
                  : 'bg-[#07080E] border-[#1D2133] text-slate-400'
              }`}
            >
              <div className="text-[9px] font-bold">STAGE 0{idx + 1}</div>
              <div className="text-xs font-black text-white">{stage.label}</div>
              <div className="text-[10px] text-[#03E5B7] font-bold">{stage.count} Missions</div>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 FINANCIAL TRANSPARENCY BREAKDOWN FLOW */}
      <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-5 space-y-4 shadow-lg">
        <h3 className="text-xs font-black text-white tracking-wider uppercase">
          FINANCIAL ALLOCATION TRANSPARENCY FLOW (EXAMPLE: ₹5,00,000)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
            <span className="text-[9px] text-[#FF007A] font-bold">COLLECTION OPS</span>
            <div className="text-sm font-black text-white">₹2,00,000 (40%)</div>
            <p className="text-[9px] text-slate-400 font-bold">Bins, logistics & gear</p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
            <span className="text-[9px] text-[#03E5B7] font-bold">TRANSPORTATION</span>
            <div className="text-sm font-black text-white">₹1,00,000 (20%)</div>
            <p className="text-[9px] text-slate-400 font-bold">EV hauling & fuel</p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
            <span className="text-[9px] text-[#FFC700] font-bold">RECYCLING</span>
            <div className="text-sm font-black text-white">₹1,00,000 (20%)</div>
            <p className="text-[9px] text-slate-400 font-bold">Refining & processing</p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
            <span className="text-[9px] text-[#FF007A] font-bold">COMMUNITY REWARDS</span>
            <div className="text-sm font-black text-white">₹50,000 (10%)</div>
            <p className="text-[9px] text-slate-400 font-bold">Contestant XP payouts</p>
          </div>
          <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
            <span className="text-[9px] text-[#03E5B7] font-bold">AUDIT & VERIFICATION</span>
            <div className="text-sm font-black text-white">₹50,000 (10%)</div>
            <p className="text-[9px] text-slate-400 font-bold">Third-party ESG audit</p>
          </div>
        </div>
      </div>
    </div>
  );
};
