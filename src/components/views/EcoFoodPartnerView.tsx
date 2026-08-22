'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Utensils, Plus, Coins, ShieldCheck, Award, Heart, CheckCircle2, X } from 'lucide-react';

export const EcoFoodPartnerView: React.FC = () => {
  const { listSurplusFood, surplusFoodListings } = useEco();
  const [showListModal, setShowListModal] = useState(false);

  // Form State
  const [foodName, setFoodName] = useState('');
  const [category, setCategory] = useState<'Meals' | 'Bakery' | 'Groceries' | 'Restaurants' | 'Cafés'>('Meals');
  const [origPrice, setOrigPrice] = useState(180);
  const [discPrice, setDiscPrice] = useState(79);
  const [servings, setServings] = useState(24);
  const [pickup, setPickup] = useState('7:00 PM – 9:00 PM');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    listSurplusFood({
      restaurantName: 'Green Café',
      restaurantLogo: '🥗',
      foodName,
      category,
      originalPriceInr: Number(origPrice),
      discountedPriceInr: Number(discPrice),
      availableServings: Number(servings),
      pickupWindow: pickup,
    });

    setShowListModal(false);
    setFoodName('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#140A18] via-[#0D0F17] to-[#07080E] border border-[#03E5B7]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl glow-teal">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/20 border border-[#03E5B7]/50 text-[#03E5B7] text-xs font-mono font-bold">
            <span>🥗 GREEN CAFÉ PARTNER DASHBOARD</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">EcoFood Partner Portal</h1>
          <p className="text-xs text-slate-300">
            List unsold surplus meals, recover revenue, & earn Eco Points badges for zero food waste.
          </p>
        </div>

        <button
          onClick={() => setShowListModal(true)}
          className="px-5 py-3 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs flex items-center gap-2 glow-teal hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>+ List Surplus Food</span>
        </button>
      </div>

      {/* Top 4 Business Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">FOOD RESCUED</span>
          <div className="text-xl font-extrabold text-white font-mono">186 kg</div>
          <div className="text-[10px] text-[#03E5B7]">↑ 31% this month</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">MEALS SAVED</span>
          <div className="text-xl font-extrabold text-[#03E5B7] font-mono">428 Meals</div>
          <div className="text-[10px] text-slate-400">82 donated to NGOs</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">REVENUE RECOVERED</span>
          <div className="text-xl font-extrabold text-[#FFC700] font-mono">₹18,400</div>
          <div className="text-[10px] text-[#FFC700]">From surplus sales</div>
        </div>

        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">BUSINESS ECO SCORE</span>
          <div className="text-xl font-extrabold text-[#FF007A] font-mono">92 / 100</div>
          <div className="text-[10px] text-[#FF007A]">🌱 Champion Badge</div>
        </div>
      </div>

      {/* Active Listings Table */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono">ACTIVE SURPLUS FOOD LISTINGS</h3>

        <div className="space-y-3">
          {surplusFoodListings.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#07080E] border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <img src={item.imageUrl} alt={item.foodName} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div className="font-bold text-white text-xs">{item.foodName}</div>
                  <div className="text-[11px] text-slate-400">
                    Pickup: {item.pickupWindow} • Servings: <strong className="text-[#03E5B7]">{item.availableServings} left</strong>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-sm font-extrabold text-[#FFC700]">₹{item.discountedPriceInr}</div>
                <div className="text-[10px] text-slate-400 line-through">₹{item.originalPriceInr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List Food Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">List Surplus Food Item</h3>
              <button type="button" onClick={() => setShowListModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Food Item Name</label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Paneer Rice Bowl / Veg Thali Box"
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Original Price (₹)</label>
                <input
                  type="number"
                  required
                  value={origPrice}
                  onChange={(e) => setOrigPrice(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">EcoFood Price (₹)</label>
                <input
                  type="number"
                  required
                  value={discPrice}
                  onChange={(e) => setDiscPrice(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Available Servings</label>
                <input
                  type="number"
                  required
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Pickup Window</label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. 7:00 PM – 9:00 PM"
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs glow-teal">
              Publish Surplus Food (+20 Eco Pts)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
