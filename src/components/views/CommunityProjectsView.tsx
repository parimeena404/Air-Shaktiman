'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { CommunityProject } from '../../types';
import { Users, Plus, Heart, MessageSquare, Gift, ArrowRight, X, CheckCircle, Sparkles } from 'lucide-react';

export const CommunityProjectsView: React.FC = () => {
  const { communityProjects, joinCommunityProject, donateToProject, addToast } = useEco();
  const [selectedProject, setSelectedProject] = useState<CommunityProject | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addToast(`🚀 Guild Idea "${newTitle}" created! Community members can now contribute materials.`, 'success');
    setShowSubmitModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>CAMPUS GUILD PROJECTS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Eco Community Ideas</h1>
          <p className="text-xs text-slate-400">
            Collaborative sustainability projects built from campus waste. Donate materials or join active squads.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#FF007A] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#FF007A]/25 glow-pink hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Guild Idea</span>
        </button>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={proj.creatorAvatar}
                    alt={proj.creatorName}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#03E5B7]"
                  />
                  <span className="text-[11px] text-slate-400 font-medium">{proj.creatorName}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] font-mono font-bold">
                  {proj.reusedImpactLabel}
                </span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Target Progress</span>
                  <span className="text-[#03E5B7] font-bold">
                    {proj.materialsCurrent} / {proj.materialsTarget} {proj.materialsUnit} ({proj.progressPercentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-[#03E5B7] to-[#10B981] rounded-full transition-all duration-500"
                    style={{ width: `${proj.progressPercentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {proj.studentsJoined} students joined project team
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <button className="flex items-center gap-1 hover:text-[#FF007A]">
                  <Heart className="w-3.5 h-3.5" /> 24
                </button>
                <button className="flex items-center gap-1 hover:text-[#03E5B7]">
                  <MessageSquare className="w-3.5 h-3.5" /> 8
                </button>
              </div>

              <button
                onClick={() => setSelectedProject(proj)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#FF007A] hover:text-[#FF007A] transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                  GUILD PROJECT DETAILS
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{selectedProject.title}</h2>
              </div>
              <button onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{selectedProject.description}</p>

            {/* Impact & Material Status */}
            <div className="p-4 rounded-xl bg-[#07080E] border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Current Material Pool</span>
                <span className="text-[#03E5B7] font-bold">
                  {selectedProject.materialsCurrent} / {selectedProject.materialsTarget} {selectedProject.materialsUnit}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
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
                  <div key={idx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
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
                  <div key={aIdx} className="p-2.5 rounded-xl bg-[#07080E] border border-slate-800 text-xs flex justify-between">
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
                className="py-3 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink"
              >
                Join Project Team
              </button>
              <button
                onClick={() => {
                  donateToProject(selectedProject.id, '10 bottles / scrap');
                  setSelectedProject(null);
                }}
                className="py-3 rounded-xl bg-[#03E5B7] text-slate-950 text-xs font-extrabold glow-teal"
              >
                Donate Material
              </button>
              <button
                onClick={() => {
                  addToast('₹500 sponsored to Guild Project via Eco Pass!', 'success');
                  setSelectedProject(null);
                }}
                className="py-3 rounded-xl bg-[#FFC700] text-slate-950 text-xs font-extrabold glow-gold"
              >
                Sponsor ₹500
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Idea Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateIdea}
            className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Guild Project</h3>
              <button type="button" onClick={() => setShowSubmitModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Project Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Recycled Laptop Donation Program"
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Description & Target Materials</label>
              <textarea
                rows={3}
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Explain the campus waste impact and what materials are needed..."
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink">
              Publish Guild Idea
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
