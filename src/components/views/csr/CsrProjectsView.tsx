'use client';

import React, { useState } from 'react';
import { useEco } from '../../../context/EcoContext';
import { Sprout, Coins, CheckCircle2, ShieldCheck, ArrowRight, Building2, Layers } from 'lucide-react';
import { CsrProject } from '../../../types';

export const CsrProjectsView: React.FC = () => {
  const { csrProjects, csrCompanies, fundCsrProject } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [fundingModalProject, setFundingModalProject] = useState<CsrProject | null>(null);
  const [fundingAmount, setFundingAmount] = useState<number>(150000);
  const [isFundingSuccess, setIsFundingSuccess] = useState<boolean>(false);

  const mainCompany = csrCompanies[0];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? csrProjects
      : csrProjects.filter((p) => p.category.includes(selectedCategory));

  const handleConfirmFunding = () => {
    if (!fundingModalProject) return;
    fundCsrProject(fundingModalProject.id, fundingAmount);
    setIsFundingSuccess(true);
    setTimeout(() => {
      setIsFundingSuccess(false);
      setFundingModalProject(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#09120D] border border-[#00FF66]/40 rounded-lg p-5 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00FF66]/20 border border-[#00FF66]/40 text-[#00FF66] text-xs font-bold">
          <Sprout className="w-3.5 h-3.5" />
          <span>ENVIRONMENTAL CSR PROJECT MARKETPLACE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-widest">DISCOVER CSR PROJECTS</h1>
        <p className="text-xs text-[#527A67]">
          Browse verified NGO environmental initiatives and allocate corporate CSR capital to deploy live player missions.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded bg-[#09120D] border border-[#12281D]">
        {['ALL', 'Water', 'Plantation', 'E-Waste', 'Waste Management', 'Food Rescue'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#00FF66] text-[#050B08] shadow-md'
                : 'text-[#527A67] hover:text-white hover:bg-[#050B08]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((project) => {
          const percent = Math.min(100, Math.round((project.fundingCurrentInr / project.fundingRequiredInr) * 100));
          return (
            <div
              key={project.id}
              className="bg-[#09120D] border border-[#12281D] hover:border-[#00FF66]/50 rounded-lg p-5 space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-[#00FF66] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED NGO OPERATOR</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-base tracking-wide">{project.title}</h3>
                  <span className="text-xs text-[#527A67]">{project.location}</span>
                </div>

                <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1">
                  <div className="text-[10px] text-[#527A67]">EXPECTED IMPACT</div>
                  <div className="text-xs font-bold text-white">{project.expectedImpact}</div>
                  <div className="text-[10px] text-[#527A67] pt-1">
                    OPERATOR: <span className="text-white font-bold">{project.ngoOperatorName}</span> {project.ngoVerified && '✓'}
                  </div>
                </div>
              </div>

              {/* Funding Bar */}
              <div className="space-y-3 pt-3 border-t border-[#12281D]">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#527A67]">Funding Progress</span>
                    <span className="text-[#F5C518] font-bold">
                      ₹{project.fundingCurrentInr.toLocaleString()} / ₹{project.fundingRequiredInr.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#050B08] h-2.5 rounded-full overflow-hidden border border-[#12281D]">
                    <div className="bg-[#F5C518] h-full rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFundingModalProject(project);
                    setFundingAmount(project.fundingRequiredInr - project.fundingCurrentInr);
                  }}
                  className="w-full py-2.5 bg-[#F5C518] text-[#050B08] font-extrabold text-xs rounded hover:bg-[#F5C518]/90 transition-all flex items-center justify-center gap-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>FUND THIS PROJECT</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 💰 FUND PROJECT GAMING MODAL */}
      {fundingModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#09120D] border-2 border-[#F5C518] rounded-lg max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 font-mono">
            {!isFundingSuccess ? (
              <>
                <div className="flex justify-between items-center border-b border-[#12281D] pb-3">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#F5C518]/20 text-[#F5C518] font-bold">
                      FUND CSR MISSION
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      {fundingModalProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setFundingModalProject(null)}
                    className="text-[#527A67] hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-[#050B08] border border-[#12281D] flex justify-between">
                    <span className="text-[#527A67]">AVAILABLE CSR FUND</span>
                    <span className="text-[#00FF66] font-bold">
                      ₹{mainCompany?.remainingInr.toLocaleString() || '6,60,000'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-[#527A67]">ENTER CSR FUNDING AMOUNT (₹)</label>
                    <input
                      type="number"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#050B08] border border-[#12281D] rounded text-white text-sm focus:border-[#F5C518] outline-none"
                    />
                  </div>

                  {/* Financial Transparency Preview */}
                  <div className="p-3 rounded bg-[#050B08] border border-[#12281D] space-y-1 text-[10px]">
                    <span className="text-[#527A67] font-bold">FINANCIAL TRANSPARENCY FLOW:</span>
                    <div className="text-slate-300">
                      40% Collection • 20% Transport • 20% Recycling • 10% NGO • 10% Player Rewards
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleConfirmFunding}
                  className="w-full py-3 bg-[#F5C518] text-[#050B08] text-xs font-black rounded hover:bg-[#F5C518]/90 transition-all glow-green"
                >
                  CONFIRM CSR FUNDING & DEPLOY MISSION →
                </button>
              </>
            ) : (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-[#00FF66]/20 border border-[#00FF66] text-[#00FF66] flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#00FF66] font-bold">FUNDING VERIFIED</span>
                  <h3 className="text-xl font-extrabold text-white">MISSION DEPLOYED!</h3>
                  <p className="text-xs text-[#527A67]">
                    Players can now join the mission and submit waste recovery actions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
