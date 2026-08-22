'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Building2, CheckCircle2, MapPin, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const IndustryDemandView: React.FC = () => {
  const { industryDemands, offerMaterialToIndustry, setActiveTab } = useEco();
  const [selectedDemandId, setSelectedDemandId] = useState<string | null>(null);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B CORPORATE RECYCLING NETWORK</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Industry Material Demand</h1>
          <p className="text-xs text-slate-400">
            Verified corporate buyers state their bulk waste requirements & payout rates per kg.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('matching')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#EC4899] text-white font-bold text-xs flex items-center gap-2 glow-pink"
        >
          <Zap className="w-4 h-4" />
          <span>View AI Match Matrix</span>
        </button>
      </div>

      {/* Demand Cards List */}
      <div className="space-y-4">
        {industryDemands.map((dem) => (
          <div
            key={dem.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl flex-shrink-0">
                {dem.logo}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{dem.companyName}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]/30 font-mono">
                    Verified Partner
                  </span>
                </div>
                <div className="text-xs font-bold text-[#FF007A] font-mono">
                  LOOKING FOR: {dem.materialNeeded}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>Required Qty: <strong className="text-white">{dem.requiredQuantity}</strong></span>
                  <span>•</span>
                  <span>Pickup: <strong className="text-[#03E5B7]">{dem.pickupAvailable ? 'Available' : 'Self Drop'}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 self-end md:self-center">
              <div className="text-right">
                <div className="text-slate-400 text-[10px] font-mono">BUYOUT OFFER</div>
                <div className="text-xl font-extrabold text-[#FFC700] font-mono">
                  ₹{dem.offerPricePerKgInr}/kg
                </div>
              </div>

              <button
                onClick={() => offerMaterialToIndustry(dem.id, 20)}
                className="px-5 py-3 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs glow-teal hover:opacity-90 transition-opacity flex items-center gap-1.5"
              >
                <span>Offer Material</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
