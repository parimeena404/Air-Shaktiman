'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { BuildIdea } from '../../types';
import { Hammer, Sparkles, ShoppingBag, Recycle, Lightbulb, ArrowRight, X, Clock, Users, ShieldCheck } from 'lucide-react';

export const BuildFromWasteView: React.FC = () => {
  const { buildIdeas, setActiveTab } = useEco();
  const [selectedIdea, setSelectedIdea] = useState<BuildIdea | null>(null);
  const [activePathway, setActivePathway] = useState<'build' | 'recycle' | 'sell' | 'reuse'>('build');

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-xl p-6 space-y-2 shadow-2xl glow-pink">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#FF007A]/20 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-black">
          <Hammer className="w-3.5 h-3.5" />
          <span>AI CRAFTING WORKBENCH // SQUID ARENA</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-wide font-mono">What Can I Do With My Waste?</h1>
        <p className="text-xs text-slate-300 font-mono font-bold">
          Upload any waste photo or select waste categories to generate 4 AI recovery pathways (Recycle, Sell, Reuse, or Build).
        </p>
      </div>

      {/* Large Scan Box & Detection Showcase */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600"
            alt="Old keyboard and computer parts"
            className="w-full md:w-64 h-48 rounded-xl object-cover border border-slate-700"
          />

          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#03E5B7] font-bold">
                AI RECOVERY VISION DETECTED:
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#A855F7] font-mono font-bold">
                1.8 kg E-Waste
              </span>
            </div>

            <h3 className="text-base font-bold text-white">Old Keyboard + Computer Wires & Components</h3>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/30">
                ⚡ Copper Wire
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/30">
                🟩 PCB Circuits
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#FFC700]/20 text-[#FFC700] border border-[#FFC700]/30">
                🔳 ABS Plastic
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                🔩 Metal Screws
              </span>
            </div>
          </div>
        </div>

        {/* 4 Large Action Pathways Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Pathway 1: Recycle */}
          <button
            onClick={() => {
              setActivePathway('recycle');
              setActiveTab('report-waste');
            }}
            className={`p-4 rounded-xl text-left border space-y-2 transition-all ${
              activePathway === 'recycle'
                ? 'bg-[#03E5B7]/15 border-[#03E5B7] text-white shadow-lg shadow-[#03E5B7]/20'
                : 'bg-[#07080E] border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold text-[#03E5B7]">
              <span>♻️ RECYCLE</span>
              <span>₹350–₹500</span>
            </div>
            <div className="text-xs text-slate-400">Nearest e-waste dropoff 80m away.</div>
          </button>

          {/* Pathway 2: Sell */}
          <button
            onClick={() => {
              setActivePathway('sell');
              setActiveTab('market');
            }}
            className={`p-4 rounded-xl text-left border space-y-2 transition-all ${
              activePathway === 'sell'
                ? 'bg-[#FF007A]/15 border-[#FF007A] text-white shadow-lg shadow-[#FF007A]/20'
                : 'bg-[#07080E] border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold text-[#FF007A]">
              <span>💰 SELL</span>
              <span>4 Buyers</span>
            </div>
            <div className="text-xs text-slate-400">ABC Recycling offering ₹320/kg.</div>
          </button>

          {/* Pathway 3: Reuse */}
          <button
            onClick={() => {
              setActivePathway('reuse');
              setActiveTab('community-projects');
            }}
            className={`p-4 rounded-xl text-left border space-y-2 transition-all ${
              activePathway === 'reuse'
                ? 'bg-[#FFC700]/15 border-[#FFC700] text-white shadow-lg shadow-[#FFC700]/20'
                : 'bg-[#07080E] border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold text-[#FFC700]">
              <span>🔨 REUSE</span>
              <span>7 Guild Projects</span>
            </div>
            <div className="text-xs text-slate-400">Contribute to E-Waste Sculpture.</div>
          </button>

          {/* Pathway 4: Build */}
          <button
            onClick={() => setActivePathway('build')}
            className={`p-4 rounded-xl text-left border space-y-2 transition-all ${
              activePathway === 'build'
                ? 'bg-[#A855F7]/15 border-[#A855F7] text-white shadow-lg shadow-[#A855F7]/20'
                : 'bg-[#07080E] border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono font-bold text-[#A855F7]">
              <span>💡 BUILD</span>
              <span>AI Ideas</span>
            </div>
            <div className="text-xs text-slate-400">Generate DIY STEM projects.</div>
          </button>
        </div>
      </div>

      {/* AI Ideas Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-slate-400 font-bold tracking-wider">
          AI GENERATED BUILD BLUEPRINTS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buildIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-squid-card bg-squid-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div className="relative h-44">
                <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 rounded-full bg-[#07080E]/90 text-[#03E5B7] border border-[#03E5B7]/40 font-mono font-bold">
                  {idea.difficulty}
                </span>
                <span className="absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded bg-slate-900/90 text-white font-mono">
                  Source: {idea.wasteSource}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">{idea.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{idea.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Est cost: ₹{idea.estimatedCostInr}</span>
                  <span className="text-[#03E5B7]">{idea.peopleRequired} People Needed</span>
                </div>

                <button
                  onClick={() => setSelectedIdea(idea)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#FF007A] hover:text-[#FF007A] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/20 text-[#A855F7] font-mono font-bold">
                  BUILD BLUEPRINT #{selectedIdea.id}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">{selectedIdea.title}</h2>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={selectedIdea.imageUrl}
              alt={selectedIdea.title}
              className="w-full h-48 rounded-xl object-cover border border-slate-800"
            />

            <p className="text-xs text-slate-300 leading-relaxed">{selectedIdea.description}</p>

            <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px]">ESTIMATED COST</span>
                <div className="font-bold text-[#FFC700]">₹{selectedIdea.estimatedCostInr}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px]">DIFFICULTY</span>
                <div className="font-bold text-[#03E5B7]">{selectedIdea.difficulty}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px]">TEAM SIZE</span>
                <div className="font-bold text-[#FF007A]">{selectedIdea.peopleRequired} Person</div>
              </div>
            </div>

            {/* Materials Required */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-bold">MATERIALS REQUIRED:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {selectedIdea.materialsRequired.map((mat, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    • {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-step instructions */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-bold">STEP-BY-STEP CONCEPT:</span>
              <div className="space-y-2 text-xs text-slate-300">
                {selectedIdea.steps.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#07080E] border border-slate-800 flex gap-2">
                    <span className="font-mono font-bold text-[#FF007A]">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedIdea(null);
                setActiveTab('community-projects');
              }}
              className="w-full py-3 rounded-xl bg-[#FF007A] text-white font-bold text-xs glow-pink"
            >
              Start This Project in Community Guild →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
