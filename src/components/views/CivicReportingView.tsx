'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { ShieldAlert, Plus, MapPin, CheckCircle2, Download, AlertTriangle, X } from 'lucide-react';

export const CivicReportingView: React.FC = () => {
  const { civicReports, reportCivicIssue, generateImpactReport } = useEco();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Illegal Dumping' | 'Water Leakage' | 'Garbage Accumulation' | 'Polluted Water' | 'Plastic Waste'>('Illegal Dumping');
  const [location, setLocation] = useState('North Gate Perimeter Road');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    reportCivicIssue({
      title,
      category,
      location,
    });

    setShowModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>CIVIC ENVIRONMENTAL ISSUE REPORTING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Civic Issue Tracker</h1>
          <p className="text-xs text-slate-400">
            Report illegal dumping, water leakage, or uncollected garbage to campus authorities and local urban bodies.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={generateImpactReport}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold hover:border-[#03E5B7] flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#03E5B7]" />
            <span>Generate Official Impact Report</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink"
          >
            + Report Civic Issue
          </button>
        </div>
      </div>

      {/* Integration Notice */}
      <div className="p-3.5 rounded-xl bg-[#07080E] border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#FFC700]" />
          <span>Note: Prototype mode. Direct municipal API submission is under development.</span>
        </div>
        <span className="text-[10px] text-[#FF007A] font-mono font-bold">Government reporting integration — Coming Soon</span>
      </div>

      {/* Civic Issue Cards */}
      <div className="space-y-4">
        {civicReports.map((report) => (
          <div
            key={report.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <img src={report.imageUrl} alt={report.title} className="w-16 h-16 rounded-xl object-cover" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF007A]">{report.id}</span>
                  <h3 className="font-bold text-white text-sm">{report.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#03E5B7]" />
                  <span>{report.location}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Authority Route: <strong className="text-white">{report.authorityTag}</strong> • {report.confirmationsCount} Community Confirmations
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-[#FF007A]/15 text-[#FF007A] border border-[#FF007A]">
                {report.status}
              </span>
              <button
                onClick={() => reportCivicIssue({ title: report.title })}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white"
              >
                Confirm (+5 Pts)
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-[#0D0F17] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Report Civic Issue</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Issue Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Uncollected Garbage Heap near Canteen"
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#07080E] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
              >
                <option value="Illegal Dumping">Illegal Dumping</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Garbage Accumulation">Garbage Accumulation</option>
                <option value="Polluted Water">Polluted Water</option>
                <option value="Plastic Waste">Plastic Waste</option>
              </select>
            </div>

            <button type="submit" className="w-full py-3 rounded-xl bg-[#FF007A] text-white text-xs font-bold glow-pink">
              Submit Civic Report
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
