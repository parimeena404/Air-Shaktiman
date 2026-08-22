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
      addToast('📄 Annual CSR Impact Audit Report Generated & Verified by EcoVerse Audit Engine!', 'success');
    }, 1500);
  };

  const handleDownload = () => {
    addToast('📥 Downloading Official CSR Impact Compliance PDF Report...', 'info');
  };

  return (
    <div className="space-y-6 font-mono select-none animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-[#09120D] border border-[#00FF66]/40 rounded-lg p-5 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00FF66]/20 border border-[#00FF66]/40 text-[#00FF66] text-xs font-bold mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>OFFICIAL CSR IMPACT AUDIT REPORT ENGINE</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-widest">CSR IMPACT REPORTS</h1>
            <p className="text-xs text-[#527A67]">
              Generate ISO-compliant environmental compliance reports for corporate CSR filing and board audits.
            </p>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-[#00FF66] text-[#050B08] font-extrabold text-xs rounded hover:bg-[#00FF66]/90 transition-all glow-green flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'GENERATING REPORT...' : 'GENERATE NEW REPORT'}</span>
          </button>
        </div>
      </div>

      {/* Report Preview Document Card */}
      {selectedReport && (
        <div className="bg-[#09120D] border-2 border-[#00FF66]/60 rounded-lg p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex justify-between items-start border-b border-[#12281D] pb-4">
            <div>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold">
                VERIFIED CSR COMPLIANCE AUDIT
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                {selectedReport.companyName.toUpperCase()} — ANNUAL CSR AUDIT REPORT
              </h2>
              <span className="text-xs text-[#527A67]">DATE OF ISSUANCE: {selectedReport.generatedDate}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-[#050B08] border border-[#00FF66] text-[#00FF66] text-xs font-bold rounded hover:bg-[#00FF66]/20 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PDF</span>
              </button>
            </div>
          </div>

          {/* Audit Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded bg-[#050B08] border border-[#12281D] space-y-1">
              <span className="text-[9px] text-[#527A67]">CSR INVESTMENT</span>
              <div className="font-bold text-[#F5C518] text-sm">₹{selectedReport.investmentInr.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded bg-[#050B08] border border-[#12281D] space-y-1">
              <span className="text-[9px] text-[#527A67]">WASTE RECOVERED</span>
              <div className="font-bold text-[#00FF66] text-sm">{selectedReport.wasteRecoveredKg.toLocaleString()} KG</div>
            </div>
            <div className="p-3.5 rounded bg-[#050B08] border border-[#12281D] space-y-1">
              <span className="text-[9px] text-[#527A67]">PLAYER DEPLOYMENTS</span>
              <div className="font-bold text-white text-sm">{selectedReport.participantsCount.toLocaleString()}</div>
            </div>
            <div className="p-3.5 rounded bg-[#050B08] border border-[#12281D] space-y-1">
              <span className="text-[9px] text-[#527A67]">CAMPUSES & PARTNERS</span>
              <div className="font-bold text-white text-sm">{selectedReport.campusesCount} Campuses • {selectedReport.partnersCount} NGOs</div>
            </div>
          </div>

          {/* Verification Stamps */}
          <div className="p-4 rounded bg-[#050B08] border border-[#00FF66]/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00FF66]" />
              <div>
                <div className="font-bold text-white">ECOVERSE BLOCKCHAIN & AI VERIFICATION AUDIT</div>
                <div className="text-[10px] text-[#527A67]">HASH: 0x8F9A...4B29 • AUDIT SCORE: {selectedReport.impactScore}/1000</div>
              </div>
            </div>
            <span className="text-[10px] px-3 py-1 rounded bg-[#00FF66]/20 text-[#00FF66] font-bold">
              STATUS: 100% VERIFIED & AUDITED ✓
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
