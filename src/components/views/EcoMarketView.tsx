'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { ShoppingBag, Plus, Search, Filter, MapPin, Tag, ArrowRight, X, Bot, Camera, Trash2 } from 'lucide-react';

export const EcoMarketView: React.FC = () => {
  const { marketItems, listMarketItem, setActiveTab, addToast, role, deleteMarketItem } = useEco();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showListModal, setShowListModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'E-Waste' | 'Plastic' | 'Metal' | 'Paper' | 'Electronics' | 'Furniture' | 'Reusable Items'>('E-Waste');
  const [quantity, setQuantity] = useState('10 kg');
  const [priceInr, setPriceInr] = useState(1800);
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600';

  const categories = ['All', 'E-Waste', 'Plastic', 'Metal', 'Paper', 'Electronics', 'Furniture', 'Reusable Items'];

  const filteredItems = marketItems.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await listMarketItem({
        title,
        category,
        quantity,
        priceInr: Number(priceInr),
        imageUrl: imageUrl || fallbackImage,
      });

      setShowListModal(false);
      setTitle('');
      setImageUrl('');
    } catch (err) {
      addToast('Failed to publish item', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border border-[#FF007A]/50 rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg glow-pink">
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
          className="px-4 py-2.5 rounded bg-[#FF007A] text-white font-black text-xs flex items-center gap-2 glow-pink hover:bg-[#FF007A]/90 transition-all shadow-lg"
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
            className="bg-[#0D0F17] rounded-lg overflow-hidden border border-[#1D2133] hover:border-[#FF007A]/50 flex flex-col justify-between transition-all shadow-lg group"
          >
            <div className="relative h-44 bg-[#07080E] overflow-hidden">
              <img
                src={item.imageUrl || fallbackImage}
                alt={item.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackImage;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded bg-[#07080E]/90 text-[#FFC700] border border-[#FFC700]/40 font-mono font-black shadow-md">
                ₹{item.priceInr.toLocaleString()}
              </span>
              <span className="absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded bg-[#07080E]/90 text-[#03E5B7] border border-[#03E5B7]/30 font-mono font-bold shadow-md">
                Qty: {item.quantity}
              </span>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#FF007A] font-mono font-black">{item.category}</span>
                  <span className="text-slate-500 font-mono">{item.postedTime || 'Just now'}</span>
                </div>
                <h3 className="font-bold text-white text-sm line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#FF007A]" />
                  <span>{item.location || 'Indore Campus Workshop'}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1D2133] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={item.sellerAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                    alt={item.sellerName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';
                    }}
                    className="w-5 h-5 rounded-full object-cover border border-[#1D2133]"
                  />
                  <span className="text-[11px] text-slate-300 font-mono font-bold">{item.sellerName || 'Contestant'}</span>
                </div>

                <div className="flex items-center gap-2">
                  {role === 'admin' && (
                    <button
                      onClick={() => deleteMarketItem(item.id)}
                      className="px-2.5 py-1.5 rounded bg-red-600/20 hover:bg-red-600 border border-red-500/50 text-red-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                      title="Admin Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  )}
                  <button
                    onClick={() => addToast(`Contact request sent to ${item.sellerName || 'seller'}!`, 'success')}
                    className="px-3 py-1.5 rounded bg-[#FF007A] text-white text-xs font-black glow-pink hover:bg-[#FF007A]/90 transition-all"
                  >
                    Buy / Inquire
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* List Item Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handlePublish}
            className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 glow-teal relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-bold">
                  🛒 CIRCULAR MARKETPLACE
                </span>
                <h3 className="text-lg font-black text-white mt-1">List Waste Material for Sale</h3>
              </div>
              <button type="button" onClick={() => setShowListModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            </div>

            {/* Photo Upload Box */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">Material Photo</label>
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
                <div className="relative w-full h-36 rounded-xl border-2 border-dashed border-[#1D2133] bg-[#07080E] flex flex-col items-center justify-center p-2 overflow-hidden group-hover:border-[#03E5B7] transition-all">
                  <img
                    src={imageUrl || fallbackImage}
                    alt="Material Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative z-10 text-center bg-[#07080E]/90 px-3 py-1.5 rounded-lg border border-[#03E5B7]/50 flex items-center gap-2 glow-teal">
                    <Camera className="w-4 h-4 text-[#03E5B7]" />
                    <span className="text-xs font-bold text-white">
                      {imageUrl ? '📷 Photo Uploaded — Click to Change' : 'Click to Upload Material Photo'}
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">Item Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Heavy Duty Copper Wire (Scrap)"
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                >
                  <option value="E-Waste">E-Waste</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Metal">Metal</option>
                  <option value="Paper">Paper</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Reusable Items">Reusable Items</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">Quantity</label>
                <input
                  type="text"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 20 kg"
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">Asking Price (₹)</label>
              <input
                type="number"
                required
                value={priceInr}
                onChange={(e) => setPriceInr(Number(e.target.value))}
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />
            </div>

            {/* AI Price Estimator Box */}
            <div className="p-3.5 rounded-xl bg-[#07080E] border border-[#03E5B7]/40 space-y-1 glow-teal">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#03E5B7]">
                <Bot className="w-4 h-4" /> Eco AI Price Helper
              </div>
              <p className="text-[11px] text-slate-300">
                "Based on similar recyclable scrap in Indore, the estimated fair value is <strong className="text-[#FFC700]">₹1,800–₹2,200</strong>. Publishing credits <strong className="text-[#03E5B7]">+50 Eco Points</strong>."
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-[#07080E] border-t-transparent rounded-full animate-spin" />
              ) : (
                'PUBLISH LISTING TO ECOMARKET (+50 PTS)'
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
