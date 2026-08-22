'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Heart, Bot, CheckCircle2, ArrowRight, Zap, Building2, Phone, MapPin, MessageSquare, X } from 'lucide-react';
import { NGORequest } from '../../types';

export const EcoFoodNgoView: React.FC = () => {
  const { ngoRequests, offerFoodToNGO, surplusFoodListings, addToast } = useEco();
  const [selectedNgo, setSelectedNgo] = useState<NGORequest | null>(null);

  // Modal Form State
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Central Canteen Complex, Gate 2');
  const [remarks, setRemarks] = useState('25 Fresh Veg Meals prepared today, packed in foil boxes.');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tokenCode, setTokenCode] = useState('');

  const handleOpenModal = (ngo: NGORequest) => {
    setSelectedNgo(ngo);
    setIsSubmitted(false);
    setTokenCode('');
  };

  const handleCloseModal = () => {
    setSelectedNgo(null);
    setIsSubmitted(false);
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNgo) return;

    const generatedToken = `NGO-FOOD-${Math.floor(1000 + Math.random() * 9000)}-RES`;
    setTokenCode(generatedToken);

    offerFoodToNGO(selectedNgo.id, {
      phone,
      location,
      remarks,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
          <Heart className="w-3.5 h-3.5" />
          <span>NGO FOOD RESCUE ALLIANCE</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-wider">NGO Food Rescue Network</h1>
        <p className="text-xs text-slate-400 font-bold">
          Connect surplus food directly with verified NGOs, shelters, and community kitchens.
        </p>
      </div>

      {/* AI Food Matching Feature Showcase */}
      <div className="bg-[#0D0F17] border-2 border-[#03E5B7]/50 rounded-2xl p-6 space-y-4 glow-teal shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#03E5B7]" />
            <h3 className="text-sm font-bold text-white tracking-wide">EcoFood AI Matchmaker Engine</h3>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
            92% ACCURACY
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#07080E] border border-[#1D2133] space-y-2">
          <div className="text-xs font-bold text-white flex justify-between">
            <span>Green Café Available Surplus: 42 Meals</span>
            <span className="text-[#FFC700] font-mono">Pickup window: 8:00 PM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-[#0D0F17] border border-[#1D2133] space-y-1">
              <span className="text-[#FF007A] font-bold">🥇 BEST MATCH: Food For All Foundation</span>
              <p className="text-[11px] text-slate-400">92% Match • Distance: 2.1 km • Capacity: 50 meals</p>
            </div>
            <div className="p-3 rounded-lg bg-[#0D0F17] border border-[#1D2133] space-y-1">
              <span className="text-[#03E5B7] font-bold">🥈 STUDENT DEMAND: 64 Students Nearby</span>
              <p className="text-[11px] text-slate-400">Potential sales: 38 meals on EcoFood</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#03E5B7]/10 border border-[#03E5B7]/30 text-xs text-[#03E5B7] font-bold pt-2">
            💡 AI RECOMMENDATION: "Donate 20 meals to Food For All NGO and offer 22 meals through EcoFood at a 56% discount."
          </div>
        </div>
      </div>

      {/* NGO Requests Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono text-slate-400 font-bold tracking-wider">
          ACTIVE NGO SURPLUS MEAL DEMANDS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ngoRequests.map((ngo) => (
            <div
              key={ngo.id}
              className="bg-[#0D0F17] rounded-2xl p-6 border border-[#1D2133] hover:border-[#FF007A]/50 space-y-4 flex flex-col justify-between transition-all shadow-lg group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{ngo.ngoLogo}</span>
                    <h4 className="font-bold text-white text-base tracking-wide">{ngo.ngoName}</h4>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                    {ngo.matchScore}% Match
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{ngo.needsDescription}</p>

                <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-1 border-t border-[#1D2133]">
                  <div>Needed: <strong className="text-white">{ngo.quantityNeeded}</strong></div>
                  <div>Status: <strong className="text-[#03E5B7]">{ngo.pickupStatus}</strong></div>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(ngo)}
                className="w-full py-3 rounded-xl bg-[#FF007A] text-white text-xs font-black glow-pink hover:bg-[#FF007A]/90 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Offer Surplus Food (+25 Community Pts)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal to Offer Surplus Food */}
      {selectedNgo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-2xl max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 glow-pink relative shadow-2xl">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div className="border-b border-[#1D2133] pb-3 space-y-1">
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] font-bold">
                    🤝 NGO SURPLUS FOOD RESCUE
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">Offer Food to {selectedNgo.ngoName}</h3>
                  <p className="text-xs text-slate-400 font-bold">
                    Provide contact & pickup details so the NGO pickup squad can dispatch.
                  </p>
                </div>

                {/* Contact Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#FF007A]" /> CONTACT PHONE / WHATSAPP NUMBER
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono"
                  />
                </div>

                {/* Pickup Location */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#03E5B7]" /> PICKUP LOCATION & ADDRESS
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Central Canteen Gate 2, Indore Campus"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
                  />
                </div>

                {/* Remarks / Food Notes */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#FFC700]" /> FOOD DETAILS & REMARKS / COMMENTS
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Describe food items, quantity, preparation time, packaging type..."
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FFC700] font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF007A] text-white font-black text-xs glow-pink hover:bg-[#FF007A]/90 transition-all flex items-center justify-center gap-2 shadow-lg tracking-wider"
                >
                  <span>DISPATCH FOOD RESCUE OFFER (+25 PTS)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Confirmation */
              <div className="space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF007A]/20 border-2 border-[#FF007A] flex items-center justify-center text-3xl mx-auto glow-pink">
                  🤝
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-bold">
                    SAVED TO MONGO DB & DISPATCHED
                  </span>
                  <h3 className="text-xl font-black text-white">Food Rescue Request Dispatched!</h3>
                  <p className="text-xs text-slate-300">
                    Your surplus food donation request has been transmitted to <strong className="text-[#FF007A]">{selectedNgo.ngoName}</strong>.
                  </p>
                </div>

                {/* Token Box */}
                <div className="p-4 rounded-xl bg-[#07080E] border-2 border-dashed border-[#03E5B7] space-y-1 text-center glow-teal">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">FOOD RESCUE VOUCHER CODE</span>
                  <div className="text-xl font-black text-[#03E5B7] font-mono tracking-widest">
                    {tokenCode}
                  </div>
                  <div className="text-[11px] text-slate-300 pt-1">
                    Contact: <strong className="text-white">{phone}</strong> • +25 Eco Points Credited!
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all"
                >
                  DONE & CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
