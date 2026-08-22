'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { History, Coins, Recycle, Trash2, Sparkles, MapPin } from 'lucide-react';

export const MyContributionsView: React.FC = () => {
  const { wasteReports } = useEco();
  const [filter, setFilter] = useState<'All' | 'Waste Reports' | 'Recycling' | 'Cleanup' | 'Projects' | 'Challenges'>('All');

  const historyItems = [
    {
      id: 'HIST-101',
      title: 'Plastic & Mixed Waste Report',
      location: 'Block B, North Gate',
      type: 'Waste Reports',
      details: 'Plastic + Cardboard detected (2.2kg)',
      status: 'Cleared',
      points: 30,
      timestamp: '10 mins ago',
      badge: '📷 Waste Report',
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=300',
      icon: '♻',
    },
    {
      id: 'HIST-102',
      title: 'E-Waste Peripherals Recycled',
      location: 'Electronics Lab 2',
      type: 'Recycling',
      details: '2.4 kg Components & PCB returned to Eco Hub 02',
      status: 'Verified',
      points: 150,
      timestamp: '2 hours ago',
      badge: '⚡ E-Waste',
      imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=300',
      icon: '🗑️',
    },
    {
      id: 'HIST-103',
      title: 'Narmada Stream Cleanup Drive',
      location: 'River Stretch 1',
      type: 'Cleanup',
      details: 'Removed 1.6kg from floating plastic bottles',
      status: 'Completed',
      points: 75,
      timestamp: 'Yesterday',
      badge: '🌊 Cleanup Drive',
      imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=300',
      icon: '🧹',
    },
    {
      id: 'HIST-104',
      title: 'Vertical Bottle Garden Guild',
      location: 'Canteen Balcony',
      type: 'Projects',
      details: 'Donated 10 PET 2L bottles & assisted assembly',
      status: 'Active',
      points: 100,
      timestamp: '2 days ago',
      badge: '🌱 Guild Project',
      imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300',
      icon: '🌱',
    },
    {
      id: 'HIST-105',
      title: 'Clean Campus Challenge Sprint',
      location: 'Campus Wide',
      type: 'Challenges',
      details: 'Contributed 18.4 kg total waste diversion',
      status: 'Completed',
      points: 250,
      timestamp: '3 days ago',
      badge: '🏆 Arena Challenge',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=300',
      icon: '🏆',
    },
  ];

  const filteredItems = historyItems.filter((item) => filter === 'All' || item.type === filter);

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold">
          <History className="w-3.5 h-3.5" />
          <span>PLAYER CONTRIBUTION LOG</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-wide">My Contribution History</h1>
        <p className="text-xs text-slate-400 font-bold">
          Track your eco-missions and earn amazing rewards while helping a cleaner campus.
        </p>
      </div>

      {/* 🔴 KACHRA SETH MEME HERO BANNER (UN-CROPPED & CENTERED WITH BLACK BLUR OVERLAYS) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#07080E] border-2 border-[#FF007A] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl glow-pink min-h-[220px]">
        {/* Blurred background fill + Uncropped Centered Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
          <img
            src="/images/squid-game/kachra-seth-meme.jpg"
            alt="Kachra Seth Background Fill"
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110"
          />
          <img
            src="/images/squid-game/kachra-seth-meme.jpg"
            alt="Kachra Seth Meme"
            className="h-full w-auto max-w-none object-contain object-center opacity-85 z-0"
          />
        </div>

        {/* Left Dark Gradient Overlay for Left Text Readability */}
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#07080E] via-[#07080E]/85 to-transparent pointer-events-none z-10" />

        {/* Right Dark Gradient Overlay for Right Card Readability */}
        <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-[#07080E] via-[#07080E]/85 to-transparent pointer-events-none z-10" />

        {/* Left Side Content: 150 POINTS DEGA! */}
        <div className="relative z-10 space-y-2 max-w-lg">
          <span className="text-xs font-black text-[#FF007A] tracking-widest uppercase">
            COMPLETE MISSIONS. SAVE CAMPUS.
          </span>

          <h2 className="text-3xl md:text-5xl font-black tracking-widest leading-none">
            <span className="text-[#FF007A]">150 POINTS</span> <br />
            <span className="text-white">DEGA!</span>
          </h2>

          <p className="text-xs text-slate-300 font-bold tracking-wide pt-1">
            Keep contributing, keep the campus clean!
          </p>
        </div>

        {/* Right Side Card inside Kachra Seth Banner */}
        <div className="relative z-10 bg-[#07080E]/80 border border-[#FF007A]/50 rounded-xl p-5 text-center min-w-[220px] backdrop-blur-md glow-pink space-y-1">
          <div className="text-3xl font-black text-[#FF007A] tracking-tight">
            +150 <span className="text-sm text-white">PTS</span>
          </div>
          <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
            FOR EVERY VERIFIED <br /> CONTRIBUTION
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0D0F17] border border-[#1D2133]">
        {(['All', 'Waste Reports', 'Recycling', 'Cleanup', 'Projects', 'Challenges'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all ${
              filter === tab
                ? 'bg-[#FF007A] text-white shadow-lg glow-pink'
                : 'text-slate-400 hover:text-white hover:bg-[#1D2133]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contribution History Items Stream */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#0D0F17] border border-[#1D2133] hover:border-[#03E5B7] rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-lg group"
          >
            {/* Left Section: Icon + Image Thumbnail + Info */}
            <div className="flex items-center gap-4">
              {/* Circular Icon */}
              <div className="w-12 h-12 rounded-full bg-[#07080E] border-2 border-[#03E5B7] flex items-center justify-center text-xl flex-shrink-0 glow-teal group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              {/* Image Thumbnail */}
              <div className="w-24 h-16 rounded-lg overflow-hidden border border-[#1D2133] flex-shrink-0 bg-[#07080E]">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* Title, Details, Location */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-black text-white tracking-wide">{item.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#07080E] border border-[#1D2133] text-slate-300">
                    {item.location}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-bold">{item.details}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono pt-0.5">
                  <span>{item.badge}</span>
                  <span>•</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Right Section: Status Badge + Points */}
            <div className="flex items-center gap-4 self-end md:self-center">
              <span className="text-[10px] px-3 py-1 rounded bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]/40 font-black tracking-wider">
                {item.status}
              </span>
              <div className="text-sm font-black text-[#FFC700] flex items-center gap-1 font-mono">
                <Coins className="w-4 h-4 text-[#FFC700]" /> +{item.points} Pts
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
