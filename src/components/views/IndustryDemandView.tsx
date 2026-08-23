'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { IndustryDemand } from '../../types';
import { Building2, CheckCircle2, MapPin, ArrowRight, ShieldCheck, Zap, X, Coins, QrCode, AlertTriangle, Trash2 } from 'lucide-react';

export const IndustryDemandView: React.FC = () => {
  const { industryDemands, offerMaterialToIndustry, setActiveTab, role, deleteIndustryDemand } = useEco();
  const [selectedDemand, setSelectedDemand] = useState<IndustryDemand | null>(null);
  const [quantityKg, setQuantityKg] = useState<number>(25);
  const [offerResult, setOfferResult] = useState<any | null>(null);

  const handleOpenModal = (dem: IndustryDemand) => {
    setSelectedDemand(dem);
    const initialQty = Math.min(25, dem.remainingQuantityKg ?? 500);
    setQuantityKg(initialQty > 0 ? initialQty : 1);
    setOfferResult(null);
  };

  const handleCloseModal = () => {
    setSelectedDemand(null);
    setOfferResult(null);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDemand || quantityKg <= 0) return;

    const maxAllowed = selectedDemand.remainingQuantityKg ?? 500;
    const finalQty = Math.min(quantityKg, maxAllowed);

    const result = offerMaterialToIndustry(selectedDemand.id, Number(finalQty));
    setOfferResult(result);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B CORPORATE RECYCLING NETWORK</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">Industry Material Demand</h1>
          <p className="text-xs text-slate-400 font-bold">
            Verified corporate buyers state their bulk waste requirements & payout rates per kg.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('matching')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#EC4899] text-white font-bold text-xs flex items-center gap-2 glow-pink shadow-lg hover:opacity-90 transition-all"
        >
          <Zap className="w-4 h-4" />
          <span>View AI Match Matrix</span>
        </button>
      </div>

      {/* Demand Cards List */}
      <div className="space-y-4">
        {industryDemands.map((dem) => {
          const isFulfilled = (dem.remainingQuantityKg ?? 0) <= 0;

          return (
            <div
              key={dem.id}
              className={`bg-[#0D0F17] rounded-2xl p-6 border transition-all shadow-lg group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                isFulfilled ? 'border-[#03E5B7]/30 opacity-75' : 'border-[#1D2133] hover:border-[#03E5B7]/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#07080E] border border-[#1D2133] flex items-center justify-center text-2xl flex-shrink-0 glow-teal group-hover:scale-105 transition-transform">
                  {dem.logo}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base tracking-wide">{dem.companyName}</h3>
                    {isFulfilled ? (
                      <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-mono font-bold">
                        ✓ DEMAND FULFILLED
                      </span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]/30 font-mono font-bold">
                        Verified Partner
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-[#FF007A] font-mono">
                    LOOKING FOR: {dem.materialNeeded}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono pt-1">
                    <span>
                      Required Demand:{' '}
                      <strong className={isFulfilled ? 'text-[#03E5B7]' : 'text-white'}>
                        {dem.remainingQuantityKg} kg remaining
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Pickup: <strong className="text-[#03E5B7]">{dem.pickupAvailable ? 'Available' : 'Self Drop'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 self-end md:self-center">
                <div className="text-right">
                  <div className="text-slate-400 text-[10px] font-mono font-bold">BUYOUT OFFER</div>
                  <div className="text-xl font-black text-[#FFC700] font-mono">
                    ₹{dem.offerPricePerKgInr}/kg
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {role === 'admin' && (
                    <button
                      onClick={() => deleteIndustryDemand(dem.id)}
                      className="px-3 py-3 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white text-xs font-bold transition flex items-center gap-1"
                      title="Admin Delete Demand"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                  <button
                    disabled={isFulfilled}
                    onClick={() => handleOpenModal(dem)}
                    className={`px-5 py-3 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-lg ${
                      isFulfilled
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : 'bg-[#03E5B7] text-[#07080E] glow-teal hover:bg-[#03E5B7]/90'
                    }`}
                  >
                    <span>{isFulfilled ? 'Demand Closed' : 'Offer Material'}</span>
                    {!isFulfilled && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Offer Modal */}
      {selectedDemand && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 glow-teal relative shadow-2xl">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            {!offerResult ? (
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div className="border-b border-[#1D2133] pb-3 space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-bold">
                    🏬 B2B MATERIAL DISPATCH PROTOCOL
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Offer Material to {selectedDemand.companyName}</h3>
                  <p className="text-xs text-slate-400 font-bold">
                    Material Needed: <strong className="text-[#FF007A]">{selectedDemand.materialNeeded}</strong> @{' '}
                    <strong className="text-[#FFC700]">₹{selectedDemand.offerPricePerKgInr}/kg</strong>
                  </p>
                </div>

                {/* Constraint Alert */}
                <div className="p-3.5 rounded-xl bg-[#FF007A]/10 border border-[#FF007A]/40 text-xs text-[#FF007A] font-bold space-y-1">
                  <div className="flex items-center gap-1.5 font-mono">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>MAXIMUM REMAINING DEMAND CONSTRAINED</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    This company requires up to <strong className="text-white">{selectedDemand.remainingQuantityKg} kg</strong> max. You cannot offer more than this remaining requirement.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono font-bold">
                    <label className="text-slate-300">QUANTITY OFFERING (IN KG)</label>
                    <span className="text-[#03E5B7]">Max: {selectedDemand.remainingQuantityKg} kg</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max={selectedDemand.remainingQuantityKg}
                    required
                    value={quantityKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const maxKg = selectedDemand.remainingQuantityKg ?? 500;
                      if (val > maxKg) {
                        setQuantityKg(maxKg);
                      } else {
                        setQuantityKg(val);
                      }
                    }}
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-4 py-3 text-sm text-white font-mono font-bold focus:outline-none focus:border-[#03E5B7]"
                  />
                  {quantityKg >= (selectedDemand.remainingQuantityKg ?? 500) && (
                    <p className="text-[10px] text-[#FFC700] font-mono font-bold pt-0.5">
                      ⚡ Offering maximum available requirement ({selectedDemand.remainingQuantityKg} kg).
                    </p>
                  )}
                </div>

                {/* Calculation Preview Card */}
                <div className="p-4 rounded-xl bg-[#07080E] border border-[#1D2133] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-400 font-bold">
                    <span>ESTIMATED CASH PAYOUT:</span>
                    <span className="text-base font-black text-[#FFC700]">
                      ₹{(Math.min(quantityKg, selectedDemand.remainingQuantityKg ?? 500) * selectedDemand.offerPricePerKgInr).toLocaleString()} INR
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400 font-bold">
                    <span>ECO POINTS TOKEN BONUS:</span>
                    <span className="text-sm font-black text-[#03E5B7]">
                      +{Math.max(50, Math.round(Math.min(quantityKg, selectedDemand.remainingQuantityKg ?? 500) * 10))} Eco Points
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-400 font-bold border-t border-[#1D2133] pt-2">
                    <span>REMAINING AFTER THIS OFFER:</span>
                    <span className="text-white font-bold">
                      {Math.max(0, (selectedDemand.remainingQuantityKg ?? 500) - quantityKg)} kg remaining
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all flex items-center justify-center gap-2 tracking-wider shadow-lg"
                >
                  <span>CONFIRM & GENERATE MATERIAL TOKEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Token Voucher Display */
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#03E5B7]/20 border-2 border-[#03E5B7] flex items-center justify-center text-3xl mx-auto glow-teal">
                  🤝
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
                    DEMAND DEDUCTED & SAVED TO MONGO DB
                  </span>
                  <h3 className="text-xl font-black text-white">B2B Material Offer Dispatched!</h3>
                  <p className="text-xs text-slate-300">
                    You offered <strong className="text-[#03E5B7]">{offerResult.quantityKg} kg</strong>. Remaining company demand updated!
                  </p>
                </div>

                {/* Token Box */}
                <div className="p-4 rounded-xl bg-[#07080E] border-2 border-dashed border-[#FFC700] space-y-2 text-center glow-gold">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">OFFICIAL DISPATCH TOKEN</span>
                  <div className="text-2xl font-black text-[#FFC700] font-mono tracking-widest">
                    {offerResult.tokenCode}
                  </div>
                  <div className="text-xs text-slate-300 font-bold flex justify-center gap-4 pt-1">
                    <span>Qty: <strong className="text-white">{offerResult.quantityKg} kg</strong></span>
                    <span>Payout: <strong className="text-[#FFC700]">₹{offerResult.totalEarnedInr.toLocaleString()}</strong></span>
                    <span>Points: <strong className="text-[#03E5B7]">+{offerResult.pointsAwarded} Pts</strong></span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      setActiveTab('contributions');
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#FF007A] text-white font-black text-xs glow-pink hover:bg-[#FF007A]/90 transition-all"
                  >
                    VIEW IN MY CONTRIBUTIONS
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-5 py-3 rounded-xl bg-[#07080E] border border-slate-700 text-slate-300 text-xs font-bold hover:text-white"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
