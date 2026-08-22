'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Shield, CheckCircle2, XCircle, MapPin, Bot, AlertTriangle, UserCheck } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { wasteReports, verifyWasteReport } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A] text-white text-xs font-mono font-bold mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>FRONT MAN ADMINISTRATIVE CONTROL</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Pending Waste Report Verifications</h1>
        <p className="text-xs text-slate-400">
          Review computer-vision flagged student waste reports, dispatch cleanup guards, & verify Eco Point awards.
        </p>
      </div>

      {/* Reports Queue */}
      <div className="space-y-4">
        {wasteReports.map((report) => (
          <div
            key={report.id}
            className="bg-squid-card border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-20 h-20 rounded-xl object-cover border border-slate-700 flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF007A]">{report.id}</span>
                  <span className="text-xs font-bold text-white">{report.title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-[#03E5B7]" />
                  <span>{report.location}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Reported by: <strong className="text-white">{report.reportedBy}</strong> • Qty: ~{report.estimatedQuantityKg}kg ({report.recyclablePercentage}% recyclable)
                </div>
                <div className="flex gap-1.5 pt-1">
                  {report.detectedMaterials.map((m, idx) => (
                    <span key={idx} className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <span
                className={`text-xs px-3 py-1 rounded-full font-mono font-bold ${
                  report.status === 'Cleaned'
                    ? 'bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]'
                    : report.status === 'Rejected'
                    ? 'bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]'
                    : 'bg-[#FFC700]/20 text-[#FFC700] border border-[#FFC700]'
                }`}
              >
                {report.status}
              </span>

              {report.status !== 'Cleaned' && report.status !== 'Rejected' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => verifyWasteReport(report.id, true)}
                    className="px-3.5 py-2 rounded-xl bg-[#03E5B7] text-slate-950 text-xs font-extrabold flex items-center gap-1 glow-teal"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Verify (+50 Pts)
                  </button>
                  <button
                    onClick={() => verifyWasteReport(report.id, false)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold hover:text-[#FF007A] hover:border-[#FF007A]"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
