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
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#09120D] border border-[#F5C518]/40 rounded-lg p-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F5C518]/20 border border-[#F5C518]/40 text-[#F5C518] text-xs font-bold">
          <Coins className="w-3.5 h-3.5" />
          <span>CSR CAPITAL ALLOCATION & TRANSPARENCY PIPELINE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-widest">FUNDING CENTER</h1>
        <p className="text-xs text-[#527A67]">
          Monitor real-time corporate CSR budget deployment, verified financial flows, and project milestone releases.
        </p>
      </div>

      {/* Budget Summary Grid */}
      {company && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#09120D] border border-[#F5C518]/40 rounded-lg p-4 space-y-1">
            <span className="text-[10px] text-[#527A67]">TOTAL CSR FUND</span>
            <div className="text-xl font-extrabold text-[#F5C518]">₹{company.csrBudgetInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#09120D] border border-[#A855F7]/40 rounded-lg p-4 space-y-1">
            <span className="text-[10px] text-[#527A67]">ALLOCATED CAPITAL</span>
            <div className="text-xl font-extrabold text-[#A855F7]">₹{company.allocatedInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#09120D] border border-[#00FF66]/40 rounded-lg p-4 space-y-1">
            <span className="text-[10px] text-[#527A67]">REMAINING DEPLOYABLE</span>
            <div className="text-xl font-extrabold text-[#00FF66]">₹{company.remainingInr.toLocaleString()}</div>
          </div>
          <div className="bg-[#09120D] border border-[#00F0FF]/40 rounded-lg p-4 space-y-1">
            <span className="text-[10px] text-[#527A67]">ACTIVE PROJECTS</span>
            <div className="text-xl font-extrabold text-[#00F0FF]">{company.activeProjects} PROJECTS</div>
          </div>
        </div>
      )}

      {/* 🚀 VISUAL FUNDING PIPELINE TRACKER */}
      <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-white tracking-wider">CSR MISSION FUNDING PIPELINE STAGES</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
          {pipelineStages.map((stage, idx) => (
            <div
              key={stage.label}
              className={`p-3 rounded border text-center space-y-1 ${
                stage.status === 'current'
                  ? 'bg-[#00FF66]/15 border-[#00FF66] text-[#00FF66]'
                  : 'bg-[#050B08] border-[#12281D] text-[#527A67]'
              }`}
            >
              <div className="text-[9px] font-bold">STAGE 0{idx + 1}</div>
              <div className="text-xs font-black text-white">{stage.label}</div>
              <div className="text-[10px] text-[#00FF66] font-bold">{stage.count} Missions</div>
            </div>
          ))}
        </div>
      </div>

      {/* 📊 FINANCIAL TRANSPARENCY BREAKDOWN FLOW */}
      <div className="bg-[#09120D] border border-[#12281D] rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-white tracking-wider">
          FINANCIAL ALLOCATION TRANSPARENCY FLOW (EXAMPLE: ₹5,00,000)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1">
            <span className="text-[9px] text-[#527A67]">COLLECTION OPS</span>
            <div className="text-sm font-bold text-white">₹2,00,000 (40%)</div>
            <p className="text-[9px] text-[#527A67]">Bins, logistics & gear</p>
          </div>
          <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1">
            <span className="text-[9px] text-[#527A67]">TRANSPORTATION</span>
            <div className="text-sm font-bold text-white">₹1,00,000 (20%)</div>
            <p className="text-[9px] text-[#527A67]">EV hauling & fuel</p>
          </div>
          <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1">
            <span className="text-[9px] text-[#527A67]">RECYCLING</span>
            <div className="text-sm font-bold text-white">₹1,00,000 (20%)</div>
            <p className="text-[9px] text-[#527A67]">Refining & processing</p>
          </div>
          <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1">
            <span className="text-[9px] text-[#527A67]">COMMUNITY</span>
            <div className="text-sm font-bold text-white">₹50,000 (10%)</div>
            <p className="text-[9px] text-[#527A67]">Drives & workshops</p>
          </div>
          <div className="p-3 rounded bg-[#050B08] border border-[#00FF66]/40 space-y-1">
            <span className="text-[9px] text-[#00FF66] font-bold">PLAYER REWARDS</span>
            <div className="text-sm font-bold text-[#00FF66]">₹50,000 (10%)</div>
            <p className="text-[9px] text-[#527A67]">Student cash bounties</p>
          </div>
        </div>
      </div>
    </div>
  );
};
