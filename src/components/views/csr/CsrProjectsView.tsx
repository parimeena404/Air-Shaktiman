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
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl p-6 space-y-2 shadow-2xl glow-teal">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-black">
          <Sprout className="w-3.5 h-3.5" />
          <span>ENVIRONMENTAL CSR PROJECT MARKETPLACE</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-widest">DISCOVER CSR PROJECTS</h1>
        <p className="text-xs text-slate-300 font-bold">
          Browse verified NGO environmental initiatives and allocate corporate CSR capital to deploy live player missions.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0D0F17] border border-[#1D2133]">
        {['ALL', 'Water', 'Plantation', 'E-Waste', 'Waste Management', 'Food Rescue'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all ${
              selectedCategory === cat
                ? 'bg-[#FF007A] text-white shadow-lg glow-pink'
                : 'text-slate-400 hover:text-white hover:bg-[#1D2133]'
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
              className="bg-[#0D0F17] border border-[#1D2133] hover:border-[#03E5B7] rounded-xl p-5 space-y-4 flex flex-col justify-between transition-all shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-[#03E5B7] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED NGO OPERATOR</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-white text-base tracking-wide">{project.title}</h3>
                  <span className="text-xs text-slate-400 font-bold">{project.location}</span>
                </div>

                <div className="p-3 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold">EXPECTED IMPACT</div>
                  <div className="text-xs font-black text-white">{project.expectedImpact}</div>
                  <div className="text-[10px] text-slate-400 font-bold pt-1">
                    OPERATOR: <span className="text-[#03E5B7] font-bold">{project.ngoOperatorName}</span> {project.ngoVerified && '✓'}
                  </div>
                </div>
              </div>

              {/* Funding Bar */}
              <div className="space-y-3 pt-3 border-t border-[#1D2133]">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Funding Raised</span>
                    <span className="text-[#FFC700]">
                      ₹{project.fundingCurrentInr.toLocaleString()} / ₹{project.fundingRequiredInr.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#07080E] h-2 rounded-full overflow-hidden border border-[#1D2133]">
                    <div className="bg-[#FFC700] h-full rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => setFundingModalProject(project)}
                  className="w-full py-2.5 bg-[#FF007A] text-white font-black text-xs rounded-lg hover:bg-[#FF007A]/90 transition-all glow-pink"
                >
                  ALLOCATE CSR FUNDING
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Funding Modal */}
      {fundingModalProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl glow-teal relative">
            <button
              onClick={() => setFundingModalProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="border-b border-[#1D2133] pb-3">
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-bold">
                💰 CORPORATE CAPITAL ALLOCATION
              </span>
              <h2 className="text-xl font-black text-white mt-1">{fundingModalProject.title}</h2>
            </div>

            {!isFundingSuccess ? (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
                  <div className="text-slate-400 font-bold">SPONSORING COMPANY</div>
                  <div className="text-sm font-black text-[#03E5B7]">{mainCompany?.name || 'TechNova Industries'}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-bold">Select Funding Amount (INR):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[50000, 100000, 200000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setFundingAmount(amt)}
                        className={`py-2 rounded-lg border font-black text-xs transition-all ${
                          fundingAmount === amt
                            ? 'bg-[#FFC700] text-[#07080E] border-[#FFC700] glow-gold'
                            : 'bg-[#07080E] text-slate-300 border-[#1D2133]'
                        }`}
                      >
                        ₹{(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleConfirmFunding}
                  className="w-full py-3 bg-[#03E5B7] text-[#07080E] font-black text-xs rounded-lg hover:bg-[#03E5B7]/90 transition-all glow-teal"
                >
                  CONFIRM ₹{fundingAmount.toLocaleString()} ALLOCATION
                </button>
              </div>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#03E5B7]/20 border border-[#03E5B7] text-[#03E5B7] flex items-center justify-center text-2xl font-black mx-auto glow-teal">
                  ✓
                </div>
                <h3 className="text-base font-black text-white">CSR FUNDING ALLOCATED!</h3>
                <p className="text-xs text-[#03E5B7] font-bold">Missions deployed to contestant arena</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
