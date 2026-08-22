'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { ShoppingBag, Plus, Search, Filter, MapPin, Tag, ArrowRight, X, Bot } from 'lucide-react';

export const EcoMarketView: React.FC = () => {
  const { marketItems, listMarketItem, setActiveTab, addToast } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showListModal, setShowListModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'E-Waste' | 'Plastic' | 'Metal' | 'Paper' | 'Electronics' | 'Furniture' | 'Reusable Items'>('E-Waste');
  const [quantity, setQuantity] = useState('10 kg');
  const [priceInr, setPriceInr] = useState(1800);

  const categories = ['All', 'E-Waste', 'Plastic', 'Metal', 'Paper', 'Electronics', 'Furniture', 'Reusable Items'];

  const filteredItems = marketItems.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    listMarketItem({
      title,
      category,
      quantity,
      priceInr: Number(priceInr),
    });

    setShowListModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>SQUID RECYCLING MARKETPLACE</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest">ECOMARKET</h1>
          <p className="text-xs text-[#03E5B7] font-bold">
            Buy, sell, or trade recyclable campus materials directly in the circular economy.
          </p>
        </div>

        <button
          onClick={() => setShowListModal(true)}
          className="px-4 py-2.5 rounded bg-[#FF007A] text-white font-black text-xs flex items-center gap-2 glow-pink hover:bg-[#FF007A]/90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>+ LIST WASTE MATERIAL</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search copper wire, motherboards, wooden boards, PET plastic..."
              className="w-full bg-[#07080E] border border-[#1D2133] rounded pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#FF007A] font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded bg-[#0D0F17] border border-[#1D2133]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded text-xs font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-[#FF007A] text-white shadow-md glow-pink'
                  : 'text-slate-400 hover:text-white hover:bg-[#07080E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#0D0F17] rounded-lg overflow-hidden border border-[#1D2133] hover:border-[#FF007A]/50 flex flex-col justify-between transition-all"
          >
            <div className="relative h-44">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded bg-[#07080E]/90 text-[#FFC700] border border-[#FFC700]/40 font-mono font-black">
                ₹{item.priceInr.toLocaleString()}
              </span>
              <span className="absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded bg-[#07080E]/90 text-[#03E5B7] border border-[#03E5B7]/30 font-mono font-bold">
                Qty: {item.quantity}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#FF007A] font-mono font-black">{item.category}</span>
                  <span className="text-slate-500 font-mono">{item.postedTime}</span>
                </div>
                <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#FF007A]" />
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1D2133] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={item.sellerAvatar} alt={item.sellerName} className="w-5 h-5 rounded-full object-cover border border-[#1D2133]" />
                  <span className="text-[11px] text-slate-300 font-mono">{item.sellerName}</span>
                </div>

                <button
                  onClick={() => addToast(`Contact request sent to ${item.sellerName}!`, 'success')}
                  className="px-3 py-1.5 rounded bg-[#FF007A] text-white text-xs font-black glow-pink"
                >
                  Buy / Inquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* List Item Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handlePublish}
            className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">List Waste Material for Sale</h3>
              <button type="button" onClick={() => setShowListModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Item Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scrap Copper Wire (20 kg)"
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                >
                  <option value="E-Waste">E-Waste</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                  <option value="Paper">Paper</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">Quantity</label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 20 kg"
                  className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Asking Price (₹)</label>
              <input
                type="number"
                required
                value={priceInr}
                onChange={(e) => setPriceInr(Number(e.target.value))}
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />
            </div>

            {/* AI Price Estimator Box */}
            <div className="p-3.5 rounded-xl bg-[#07080E] border border-[#03E5B7]/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#03E5B7]">
                <Bot className="w-4 h-4" /> Eco AI Price Helper
              </div>
              <p className="text-[11px] text-slate-300">
                "Based on similar recyclable scrap in Indore, the estimated fair value is <strong className="text-[#FFC700]">₹1,800–₹2,200</strong>."
              </p>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs glow-teal">
              Publish Listing to EcoMarket
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
