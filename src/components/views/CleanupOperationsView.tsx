'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { ShieldAlert, CheckCircle2, UserCheck, MapPin, ArrowRight } from 'lucide-react';

export const CleanupOperationsView: React.FC = () => {
  const { cleanupOperations, assignCleanup } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>FIELD OPERATIONS DISPATCH</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Cleanup Operations</h1>
        <p className="text-xs text-slate-400">
          Manage, assign, & track field sanitation teams for reported waste spots.
        </p>
      </div>

      {/* Top Operations Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-mono text-slate-400">PENDING</span>
          <div className="text-2xl font-extrabold text-[#FF007A] font-mono">12</div>
        </div>
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-mono text-slate-400">ASSIGNED</span>
          <div className="text-2xl font-extrabold text-[#FFC700] font-mono">8</div>
        </div>
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-mono text-slate-400">IN PROGRESS</span>
          <div className="text-2xl font-extrabold text-[#06B6D4] font-mono">5</div>
        </div>
        <div className="p-4 rounded-xl bg-squid-card border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-mono text-slate-400">COMPLETED</span>
          <div className="text-2xl font-extrabold text-[#03E5B7] font-mono">142</div>
        </div>
      </div>

      {/* Operations List */}
      <div className="space-y-4">
        {cleanupOperations.map((op) => (
          <div
            key={op.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#FF007A]">{op.id}</span>
                <h3 className="font-bold text-white text-sm">{op.location}</h3>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Priority: <strong className="text-[#FF007A]">{op.priority}</strong> • Est Waste: <strong className="text-white">{op.estimatedWasteKg} kg</strong>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Assigned Squad: <strong className="text-[#03E5B7]">{op.assignedTeam}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]">
                {op.status}
              </span>

              <button
                onClick={() => assignCleanup(op.id, 'Eco Squad')}
                className="px-4 py-2 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink"
              >
                Assign Squad
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
