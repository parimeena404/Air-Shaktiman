'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { CommunityProject } from '../../types';
import { Users, Plus, Heart, MessageSquare, Gift, ArrowRight, X, CheckCircle, Sparkles, Target, Package, Layers } from 'lucide-react';

export const CommunityProjectsView: React.FC = () => {
  const { communityProjects, joinCommunityProject, createCommunityProject, donateToProject, addToast } = useEco();
  const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form State for creating a new Guild Project
  const [title, setTitle] = useState('');
  const [impactLabel, setImpactLabel] = useState('500 PET Bottles Saved');
  const [targetQty, setTargetQty] = useState<number>(200);
  const [targetUnit, setTargetUnit] = useState<string>('Bottles');
  const [materialsListStr, setMaterialsListStr] = useState('2L Plastic Bottles, PVC Support Pipes, Soil Bags');
  const [description, setDescription] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const materialsArray = materialsListStr
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    createCommunityProject({
      title,
      reusedImpactLabel: impactLabel || `${targetQty} ${targetUnit} Diverted`,
      materialsTarget: Number(targetQty),
      materialsUnit: targetUnit,
      materialsList: materialsArray.length > 0 ? materialsArray : ['Recyclable Scrap', 'PET Bottles', 'PVC Pipes'],
      description,
    });

    setShowSubmitModal(false);
    setTitle('');
    setDescription('');
    setMaterialsListStr('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>CAMPUS GUILD PROJECTS</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">Eco Community Projects</h1>
          <p className="text-xs text-slate-400 font-bold">
            Collaborative sustainability projects built from campus waste. Donate materials or join active squads.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-3 rounded-xl bg-[#FF007A] text-white font-black text-xs flex items-center gap-2 shadow-lg glow-pink hover:bg-[#FF007A]/90 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Guild Project</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#0D0F17] rounded-2xl p-5 border border-[#1D2133] hover:border-[#03E5B7]/50 space-y-4 flex flex-col justify-between transition-all shadow-lg group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={proj.creatorAvatar}
                    alt={proj.creatorName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250';
                    }}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#03E5B7]"
                  />
                  <span className="text-[11px] text-slate-300 font-bold">{proj.creatorName}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] font-mono font-black">
                  {proj.reusedImpactLabel}
                </span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400 font-bold">Target Progress</span>
                  <span className="text-[#03E5B7] font-bold">
                    {proj.materialsCurrent} / {proj.materialsTarget} {proj.materialsUnit} ({proj.progressPercentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#07080E] rounded-full overflow-hidden border border-[#1D2133]">
                  <div
                    className="h-full bg-gradient-to-r from-[#03E5B7] to-[#10B981] rounded-full transition-all duration-500"
                    style={{ width: `${proj.progressPercentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono font-bold">
                  {proj.studentsJoined} student squad members joined
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1D2133] flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                <button className="flex items-center gap-1 hover:text-[#FF007A]">
                  <Heart className="w-3.5 h-3.5 text-[#FF007A]" /> 24
                </button>
                <button className="flex items-center gap-1 hover:text-[#03E5B7]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#03E5B7]" /> 8
                </button>
              </div>

              <button
                onClick={() => setSelectedProject(proj)}
                className="px-3.5 py-1.5 rounded-lg bg-[#07080E] border border-[#1D2133] text-white text-xs font-black hover:border-[#FF007A] hover:text-[#FF007A] transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 glow-teal relative">
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                  GUILD PROJECT DETAILS
                </span>
                <h2 className="text-xl font-black text-white mt-1">{selectedProject.title}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white font-bold">
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedProject.description}</p>

            {/* Impact & Material Status */}
            <div className="p-4 rounded-xl bg-[#07080E] border border-[#1D2133] space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold">Current Material Pool</span>
                <span className="text-[#03E5B7] font-bold">
                  {selectedProject.materialsCurrent} / {selectedProject.materialsTarget} {selectedProject.materialsUnit}
                </span>
              </div>
              <div className="w-full h-3 bg-[#0D0F17] rounded-full overflow-hidden border border-[#1D2133]">
                <div
                  className="h-full bg-[#03E5B7] rounded-full"
                  style={{ width: `${selectedProject.progressPercentage}%` }}
                />
              </div>
              <div className="text-[11px] text-[#03E5B7] font-mono font-bold">
                Impact: {selectedProject.reusedImpactLabel}
              </div>
            </div>

            {/* Materials Needed List */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-300 font-bold">MATERIALS REQUIRED:</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {selectedProject.materialsList.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#07080E] border border-[#1D2133] text-slate-300 font-bold">
                    • {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-bold">RECENT GUILD ACTIVITY:</span>
              <div className="space-y-2">
                {selectedProject.recentActivity.map((act, aIdx) => (
                  <div key={aIdx} className="p-2.5 rounded-xl bg-[#07080E] border border-[#1D2133] text-xs flex justify-between">
                    <span className="text-slate-200">
                      <strong className="text-white">{act.user}</strong> {act.action}
                    </span>
                    <span className="text-slate-500 font-mono text-[10px]">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  joinCommunityProject(selectedProject.id);
                  setSelectedProject(null);
                }}
                className="py-3 rounded-xl bg-[#FF007A] text-white text-xs font-black glow-pink hover:bg-[#FF007A]/90 transition-all"
              >
                Join Project Team
              </button>
              <button
                onClick={() => {
                  donateToProject(selectedProject.id, '10 bottles / scrap');
                  setSelectedProject(null);
                }}
                className="py-3 rounded-xl bg-[#03E5B7] text-[#07080E] text-xs font-black glow-teal hover:bg-[#03E5B7]/90 transition-all"
              >
                Donate Material
              </button>
              <button
                onClick={() => {
                  addToast('₹500 sponsored to Guild Project via Eco Pass!', 'success');
                  setSelectedProject(null);
                }}
                className="py-3 rounded-xl bg-[#FFC700] text-[#07080E] text-xs font-black glow-gold hover:bg-[#FFC700]/90 transition-all"
              >
                Sponsor ₹500
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Submit Guild Idea Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProject}
            className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 glow-pink relative shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] font-bold">
                  🌱 NEW CAMPUS GUILD INITIATIVE
                </span>
                <h3 className="text-lg font-black text-white mt-1">Submit Guild Project Idea</h3>
              </div>
              <button type="button" onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-white font-bold">
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            </div>

            {/* Project Title */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">GUILD PROJECT TITLE</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Vertical Bottle Garden Guild"
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono"
              />
            </div>

            {/* Impact Badge */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[#03E5B7]" /> REUSED IMPACT BADGE / LABEL
              </label>
              <input
                type="text"
                required
                value={impactLabel}
                onChange={(e) => setImpactLabel(e.target.value)}
                placeholder="e.g. 500 PET Bottles Saved"
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#03E5B7] font-mono"
              />
            </div>

            {/* Target Amount & Unit */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">TARGET QUANTITY</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={targetQty}
                  onChange={(e) => setTargetQty(Number(e.target.value))}
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300 font-bold">TARGET UNIT</label>
                <input
                  type="text"
                  required
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value)}
                  placeholder="e.g. Bottles / kg / Boxes"
                  className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono"
                />
              </div>
            </div>

            {/* Materials List */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#FFC700]" /> REQUIRED MATERIALS LIST (COMMA SEPARATED)
              </label>
              <input
                type="text"
                required
                value={materialsListStr}
                onChange={(e) => setMaterialsListStr(e.target.value)}
                placeholder="e.g. 2L PET Bottles, PVC Pipes, Cable Ties, Soil"
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFC700] font-mono"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 font-bold">GUILD STRATEGY & DESCRIPTION</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the campus waste impact and how students will build this..."
                className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FF007A] text-white font-black text-xs glow-pink hover:bg-[#FF007A]/90 transition-all flex items-center justify-center gap-2 shadow-lg tracking-wider"
            >
              <span>PUBLISH GUILD PROJECT (+50 ECO PTS)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
