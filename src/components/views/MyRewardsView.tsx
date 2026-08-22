'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { QrCode, Gift, CheckCircle2, Clock } from 'lucide-react';

export const MyRewardsView: React.FC = () => {
  const { redeemedVouchers } = useEco();
  const [activeTab, setActiveTab] = useState<'Active' | 'Used' | 'Expired'>('Active');
  const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null);

  const filteredVouchers = redeemedVouchers.filter((v) => v.status === activeTab);

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC700]/15 border border-[#FFC700]/40 text-[#FFC700] text-xs font-mono font-bold mb-2">
            <Gift className="w-3.5 h-3.5" />
            <span>MY REDEEMED VOUCHERS HISTORY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">My Rewards</h1>
          <p className="text-xs text-slate-400">
            Access your active reward codes, QR passes, & redemption history.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-slate-800">
        {(['Active', 'Used', 'Expired'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'bg-[#03E5B7] text-slate-950 font-bold shadow-md shadow-[#03E5B7]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {tab} Vouchers ({redeemedVouchers.filter((v) => v.status === tab).length})
          </button>
        ))}
      </div>

      {/* Vouchers List */}
      <div className="space-y-4">
        {filteredVouchers.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#07080E] border border-slate-800 text-center text-xs text-slate-500 font-mono">
            No {activeTab.toLowerCase()} vouchers found.
          </div>
        ) : (
          filteredVouchers.map((vouch) => (
            <div
              key={vouch.id}
              className="bg-squid-card border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{vouch.businessLogo}</span>
                <div>
                  <div className="font-bold text-white text-sm">{vouch.rewardTitle}</div>
                  <div className="text-xs text-slate-400">
                    {vouch.businessName} • Redeemed {vouch.redeemedDate}
                  </div>
                  <div className="text-[11px] font-mono text-[#03E5B7] font-bold mt-1">
                    Code: {vouch.voucherCode}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-full font-mono font-bold bg-[#FFC700]/15 text-[#FFC700] border border-[#FFC700]/30">
                  {vouch.status}
                </span>

                {vouch.status === 'Active' && (
                  <button
                    onClick={() => setSelectedQrCode(vouch.qrCodePlaceholder)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs flex items-center gap-1.5 glow-teal"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Show QR</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* QR Code Modal */}
      {selectedQrCode && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-3xl max-w-xs w-full p-6 text-center space-y-4">
            <h3 className="text-sm font-bold text-white font-mono">REWARD QR CODE</h3>
            <div className="p-4 bg-white rounded-2xl w-40 h-40 mx-auto">
              <img src={selectedQrCode} alt="QR Code" className="w-full h-full" />
            </div>
            <button
              onClick={() => setSelectedQrCode(null)}
              className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
