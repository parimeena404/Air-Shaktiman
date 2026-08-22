'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Utensils, Plus, Coins, ShieldCheck, Award, Heart, CheckCircle2, X, Camera } from 'lucide-react';

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
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fallbackFoodImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName.trim()) return;

    setIsSubmitting(true);
    try {
      await listSurplusFood({
        restaurantName: 'Green Café',
        restaurantLogo: '🥗',
        foodName,
        category,
        originalPriceInr: Number(origPrice),
        discountedPriceInr: Number(discPrice),
        availableServings: Number(servings),
        pickupWindow: pickup,
        imageUrl: imageUrl || fallbackFoodImage,
      });

      setShowListModal(false);
      setFoodName('');
      setImageUrl('');
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#140A18] via-[#0D0F17] to-[#07080E] border border-[#03E5B7]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl glow-teal">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/20 border border-[#03E5B7]/50 text-[#03E5B7] text-xs font-mono font-bold">
            <span>🥗 GREEN CAFÉ PARTNER DASHBOARD</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">EcoFood Partner Portal</h1>
          <p className="text-xs text-slate-300 font-bold">
            List unsold surplus meals, recover revenue, & earn Eco Points badges for zero food waste.
          </p>
        </div>

        <button
          onClick={() => setShowListModal(true)}
          className="px-5 py-3 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs flex items-center gap-2 glow-teal hover:bg-[#03E5B7]/90 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>+ List Surplus Food</span>
        </button>
      </div>

      {/* Top 4 Business Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 font-bold">FOOD RESCUED</span>
          <div className="text-xl font-black text-white font-mono">186 kg</div>
          <div className="text-[10px] text-[#03E5B7] font-bold">↑ 31% this month</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 font-bold">MEALS SAVED</span>
          <div className="text-xl font-black text-[#03E5B7] font-mono">428 Meals</div>
          <div className="text-[10px] text-slate-400 font-bold">82 donated to NGOs</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 font-bold">REVENUE RECOVERED</span>
          <div className="text-xl font-black text-[#FFC700] font-mono">₹18,400</div>
          <div className="text-[10px] text-[#FFC700] font-bold">From surplus sales</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] space-y-1 shadow-lg">
          <span className="text-[10px] font-mono text-slate-400 font-bold">BUSINESS ECO SCORE</span>
          <div className="text-xl font-black text-[#FF007A] font-mono">92 / 100</div>
          <div className="text-[10px] text-[#FF007A] font-bold">🌱 Champion Badge</div>
        </div>
      </div>

      {/* Active Listings Table */}
      <div className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-xs font-black text-white font-mono tracking-wider">ACTIVE SURPLUS FOOD LISTINGS</h3>

        <div className="space-y-3">
          {surplusFoodListings.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#07080E] border border-[#1D2133] flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.imageUrl || fallbackFoodImage}
                  alt={item.foodName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackFoodImage;
                  }}
                  className="w-12 h-12 rounded-lg object-cover border border-[#1D2133]"
                />
                <div>
                  <div className="font-bold text-white text-xs">{item.foodName}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Pickup: {item.pickupWindow} • Servings: <strong className="text-[#03E5B7]">{item.availableServings} left</strong>
                  </div>
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-sm font-black text-[#FFC700]">₹{item.discountedPriceInr}</div>
                <div className="text-[10px] text-slate-500 line-through">₹{item.originalPriceInr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* List Food Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 glow-teal shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <h3 className="text-base font-black text-white">List Surplus Food Item</h3>
              <button type="button" onClick={() => setShowListModal(false)} className="text-slate-400 hover:text-white font-bold">
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            </div>

            {/* Photo Upload Box */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">Meal Photo</label>
              <label className="relative group cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        if (ev.target?.result) {
                          setImageUrl(ev.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="relative w-full h-32 rounded-xl border-2 border-dashed border-[#1D2133] bg-[#07080E] flex flex-col items-center justify-center p-2 overflow-hidden group-hover:border-[#03E5B7] transition-all">
                  <img
                    src={imageUrl || fallbackFoodImage}
                    alt="Meal Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10 text-center bg-[#07080E]/90 px-3 py-1.5 rounded-lg border border-[#03E5B7]/50 flex items-center gap-2 glow-teal">
                    <Camera className="w-4 h-4 text-[#03E5B7]" />
                    <span className="text-xs font-bold text-white">
                      {imageUrl ? '📷 Photo Loaded — Click to Change' : 'Click to Upload Meal Photo'}
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">Food Item Name</label>
              <input
                type="text"
                required
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g. Paneer Rice Bowl / Veg Thali Box"
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">Original Price (₹)</label>
                <input
                  type="number"
                  required
                  value={origPrice}
                  onChange={(e) => setOrigPrice(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">EcoFood Price (₹)</label>
                <input
                  type="number"
                  required
                  value={discPrice}
                  onChange={(e) => setDiscPrice(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">Available Servings</label>
                <input
                  type="number"
                  required
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">Pickup Window</label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. 7:00 PM – 9:00 PM"
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-[#07080E] border-t-transparent rounded-full animate-spin" />
              ) : (
                'PUBLISH SURPLUS FOOD (+30 ECO PTS)'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
