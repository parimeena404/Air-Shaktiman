'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Cpu, CheckCircle2, Zap, ArrowRight, Bot, Building2 } from 'lucide-react';

export const MatchingSystemView: React.FC = () => {
  const { industryDemands, offerMaterialToIndustry } = useEco();

  const userMaterials = [
    { title: 'Scrap Heavy Copper Wire', quantityKg: 20, matchScore: 92, targetDemand: industryDemands[0] },
    { title: 'Sorted PET Plastic Bottles', quantityKg: 50, matchScore: 84, targetDemand: industryDemands[1] },
    { title: 'Old PCBs & Motherboards', quantityKg: 15, matchScore: 78, targetDemand: industryDemands[2] },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>AI AUTOMATED MATCHMAKING MATRIX</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">AI Material Matching System</h1>
        <p className="text-xs text-slate-400">
          Our AI constantly cross-references your reported waste inventory against live corporate supply demands for highest yield payouts.
        </p>
      </div>

      {/* Matching Matrix Cards */}
      <div className="space-y-6">
        {userMaterials.map((mat, idx) => (
          <div
            key={idx}
            className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400">AVAILABLE IN YOUR INVENTORY</span>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  {mat.title} <span className="text-xs text-[#03E5B7] font-mono">({mat.quantityKg} kg available)</span>
                </h3>
              </div>

              {/* Match Percentage Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] font-mono font-extrabold text-sm glow-teal">
                <Zap className="w-4 h-4" /> {mat.matchScore}% MATCH ACCURACY
              </div>
            </div>

            {/* Matched Buyer Details */}
            <div className="bg-[#07080E] border border-slate-800/80 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xl">
                  {mat.targetDemand?.logo || '⚡'}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{mat.targetDemand?.companyName || 'Corporate Buyer Partner'}</div>
                  <div className="text-[11px] text-slate-400">
                    Quota: {mat.targetDemand?.requiredQuantity || '100–500 kg'} • Rate: <strong className="text-[#FFC700]">₹{mat.targetDemand?.offerPricePerKgInr || 300}/kg</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">ESTIMATED PAYOUT</div>
                  <div className="text-sm font-extrabold text-[#03E5B7] font-mono">
                    ₹{(mat.quantityKg * (mat.targetDemand?.offerPricePerKgInr || 300)).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => offerMaterialToIndustry(mat.targetDemand?.id || 'IND-01', mat.quantityKg)}
                  className="px-4 py-2.5 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink hover:opacity-90 transition-opacity flex items-center gap-1.5"
                >
                  <span>1-Click Dispatch Offer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
