'use client';

import React, { useState } from 'react';
import { useEco } from '../../../context/EcoContext';
import { FileText, Download, Eye, CheckCircle2, ShieldCheck, Printer, Sparkles } from 'lucide-react';

export const CsrReportsView: React.FC = () => {
  const { csrReports, addToast } = useEco();
  const [selectedReport, setSelectedReport] = useState<typeof csrReports[0] | null>(csrReports[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addToast('📄 Annual CSR Impact Audit Report Generated & Verified by City Guardian Audit Engine!', 'success');
    }, 1500);
  };

  const handleDownload = () => {
    addToast('📥 Downloading Official CSR Impact Compliance PDF Report...', 'info');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl p-6 space-y-2 shadow-2xl glow-teal">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#03E5B7]/20 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-black mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL CSR IMPACT AUDIT REPORT ENGINE</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-widest">CSR IMPACT REPORTS</h1>
            <p className="text-xs text-slate-300 font-bold">
              Generate ISO-compliant environmental compliance reports for corporate CSR filing and board audits.
            </p>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-5 py-3 bg-[#03E5B7] text-[#07080E] font-black text-xs rounded-lg hover:bg-[#03E5B7]/90 transition-all glow-teal flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'GENERATING REPORT...' : 'GENERATE NEW REPORT'}</span>
          </button>
        </div>
      </div>

      {/* Report Preview Document Card */}
      {selectedReport && (
        <div className="bg-[#0D0F17] border-2 border-[#FF007A] rounded-xl p-6 md:p-8 space-y-6 shadow-2xl glow-pink">
          <div className="flex flex-col md:flex-row justify-between items-start border-b border-[#1D2133] pb-4 gap-4">
            <div>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FF007A]/20 text-[#FF007A] font-black border border-[#FF007A]/40">
                VERIFIED CSR COMPLIANCE AUDIT
              </span>
              <h2 className="text-xl font-black text-white mt-2">
                {selectedReport.companyName.toUpperCase()} — ANNUAL CSR AUDIT REPORT
              </h2>
              <span className="text-xs text-slate-400 font-bold">DATE OF ISSUANCE: {selectedReport.generatedDate}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2.5 bg-[#07080E] border border-[#03E5B7] text-[#03E5B7] text-xs font-black rounded-lg hover:bg-[#03E5B7]/20 transition-all flex items-center gap-1.5 glow-teal"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
              </button>
            </div>
          </div>

          {/* Audit Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
              <span className="text-[9px] text-slate-400 font-bold">CSR INVESTMENT</span>
              <div className="font-black text-[#FFC700] text-base">₹{selectedReport.investmentInr.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
              <span className="text-[9px] text-slate-400 font-bold">WASTE RECOVERED</span>
              <div className="font-black text-[#03E5B7] text-base">{selectedReport.wasteRecoveredKg.toLocaleString()} KG</div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
              <span className="text-[9px] text-slate-400 font-bold">PLAYER DEPLOYMENTS</span>
              <div className="font-black text-white text-base">{selectedReport.participantsCount.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-[#07080E] border border-[#1D2133] space-y-1">
              <span className="text-[9px] text-slate-400 font-bold">CAMPUSES & PARTNERS</span>
              <div className="font-black text-white text-base">{selectedReport.campusesCount} Campuses • {selectedReport.partnersCount} NGOs</div>
            </div>
          </div>

          {/* Verification Stamp */}
          <div className="p-4 rounded-lg bg-[#07080E] border border-[#03E5B7]/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs glow-teal">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#03E5B7]" />
              <div>
                <span className="font-black text-white text-xs">CRYPTOGRAPHICALLY SIGNED AUDIT CERTIFICATE</span>
                <p className="text-[10px] text-slate-400 font-mono">Hash: 0x8f4a...93b2 • Verified on Indore Campus Telemetry Chain</p>
              </div>
            </div>
            <span className="text-[10px] px-3 py-1 rounded bg-[#03E5B7]/20 text-[#03E5B7] font-black border border-[#03E5B7]/40">
              STATUS: COMPLIANT ✓
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
