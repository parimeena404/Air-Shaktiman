'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Landmark, ExternalLink, ShieldCheck, CheckCircle2, Award, Flag, ArrowUpRight } from 'lucide-react';

export const GovernmentConnectView: React.FC = () => {
  const { governmentPrograms, setActiveTab } = useEco();

  const alignmentThemes = [
    { title: 'Solid Waste Segregation', percentage: 86, color: '#03E5B7' },
    { title: 'E-Waste Recovery Rules', percentage: 72, color: '#FF007A' },
    { title: 'Plastic Waste Reduction', percentage: 64, color: '#FFC700' },
    { title: 'Urban Water Conservation', percentage: 78, color: '#06B6D4' },
    { title: 'Energy Saving Campus', percentage: 70, color: '#A855F7' },
    { title: 'Sustainable Lifestyle (LiFE)', percentage: 84, color: '#10B981' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>INDIA SUSTAINABILITY ECOSYSTEM CONNECT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Government & Civic Integration</h1>
          <p className="text-xs text-slate-400">
            Connect EcoVerse campus activities with India's national environmental framework & statutory programs.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('civic-reporting')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#FF007A]"
        >
          View Civic Reports →
        </button>
      </div>

      {/* Alignment Dashboard Progress Dials */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <Flag className="w-4 h-4 text-[#FF007A]" />
            NATIONAL POLICY ALIGNMENT INDEX
          </h3>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
            Illustrative Prototype Data
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {alignmentThemes.map((theme, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#07080E] border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 truncate">{theme.title}</span>
                <span className="font-bold" style={{ color: theme.color }}>
                  {theme.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${theme.percentage}%`, backgroundColor: theme.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Program Resource Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-slate-400 font-bold tracking-wider">
          OFFICIAL STATUTORY PROGRAMS & GUIDELINES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governmentPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FF007A]">{prog.organization}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-mono font-bold">
                    {prog.status}
                  </span>
                </div>

                <h4 className="font-bold text-white text-base leading-snug">{prog.programName}</h4>
                <p className="text-xs text-slate-300">{prog.coverage}</p>

                <div className="p-3 rounded-xl bg-[#07080E] border border-slate-800 text-xs text-[#03E5B7]">
                  <strong className="text-white">EcoVerse Alignment:</strong> {prog.ecoverseAlignment}
                </div>
              </div>

              <a
                href={prog.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#FF007A] hover:text-[#FF007A] transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Official Government Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
