'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Utensils, Search, Clock, Tag, MapPin, CheckCircle2, ShieldCheck, Heart, Trash2 } from 'lucide-react';

export const EcoFoodView: React.FC = () => {
  const { surplusFoodListings, reserveSurplusFood, setActiveTab, role, deleteSurplusFoodListing } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('Nearby');
  const [searchTerm, setSearchTerm] = useState('');

  const fallbackFoodImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600';

  const categories = ['Nearby', 'Meals', 'Bakery', 'Groceries', 'Restaurants', 'Cafés'];

  const filteredListings = surplusFoodListings.filter((item) => {
    const matchesCat = selectedCategory === 'Nearby' || item.category === selectedCategory;
    const matchesSearch =
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D0F17] p-6 rounded-2xl border border-[#03E5B7]/40 shadow-xl glow-teal">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>SURPLUS FOOD RESCUE NETWORK</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wide">EcoFood Rescue Marketplace</h1>
          <p className="text-xs text-slate-400 font-bold">
            Good food shouldn't become waste. Rescue fresh unsold surplus food at 50%–70% off.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('ecofood-partner')}
            className="px-3.5 py-2.5 rounded-xl bg-[#07080E] border border-[#1D2133] text-slate-200 text-xs font-bold hover:border-[#03E5B7] transition-all"
          >
            Restaurant Partner Portal
          </button>
          <button
            onClick={() => setActiveTab('ecofood-ngo')}
            className="px-3.5 py-2.5 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink hover:bg-[#FF007A]/90 transition-all shadow-lg"
          >
            NGO Rescue Network
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-xl bg-[#0D0F17] border border-[#1D2133] flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-[#03E5B7]" />
          <span>All listed food is fresh unsold surplus prepared same-day under strict temperature controls.</span>
        </div>
        <span className="text-[10px] text-[#03E5B7] font-mono font-bold hidden md:inline">Safety Verified ✓</span>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Paneer Rice Bowl, Bakery Snack Box, Veg Thali..."
            className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#03E5B7] font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-[#1D2133]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-[#03E5B7] text-[#07080E] shadow-md glow-teal'
                  : 'text-slate-400 hover:text-white hover:bg-[#07080E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="bg-[#0D0F17] rounded-2xl overflow-hidden border border-[#1D2133] hover:border-[#03E5B7]/50 flex flex-col justify-between transition-all shadow-lg group"
          >
            <div className="relative h-44 bg-[#07080E] overflow-hidden">
              <img
                src={item.imageUrl || fallbackFoodImage}
                alt={item.foodName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackFoodImage;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF007A] text-white font-mono font-black shadow-lg glow-pink">
                {item.discountPercentage}% OFF
              </span>
              <span className="absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded bg-[#07080E]/90 text-white font-mono flex items-center gap-1 border border-[#1D2133]">
                <span>{item.restaurantLogo || '🥗'}</span> {item.restaurantName}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-sm leading-snug">{item.foodName}</h3>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-base font-black text-[#03E5B7]">₹{item.discountedPriceInr}</span>
                  <span className="line-through text-slate-500 text-[11px]">₹{item.originalPriceInr}</span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-1 pt-1 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FFC700]" />
                    <span>Pickup: {item.pickupWindow}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF007A]" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-mono pt-1 italic">{item.bestBeforeInfo}</p>
              </div>

              <div className="pt-3 border-t border-[#1D2133] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#03E5B7] font-bold">
                  {item.availableServings} Available
                </span>

                <div className="flex items-center gap-2">
                  {role === 'admin' && (
                    <button
                      onClick={() => deleteSurplusFoodListing(item.id)}
                      className="px-2.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white text-xs font-bold transition flex items-center gap-1"
                      title="Admin Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                  <button
                    onClick={() => reserveSurplusFood(item.id)}
                    disabled={item.availableServings === 0}
                    className="px-4 py-2 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all disabled:opacity-50"
                  >
                    {item.availableServings === 0 ? 'Sold Out' : 'Reserve Meal (+10 Pts)'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
