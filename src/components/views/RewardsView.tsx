'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { useWeb3 } from '../../context/Web3Context';
import { Gift, Coins, CheckCircle2, Award, Sparkles, Coffee, Ticket, ShoppingBag, Wallet } from 'lucide-react';

export const RewardsView: React.FC = () => {
  const { profile, rewards, redeemReward } = useEco();
  const { account, connectWallet, connectDemoWallet, disconnectWallet, isConnecting, hasMetaMask, error } = useWeb3();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC700]/15 border border-[#FFC700]/40 text-[#FFC700] text-xs font-mono font-bold mb-2">
          <Gift className="w-3.5 h-3.5" />
          <span>PLAYER REWARD VAULT EXCHANGE</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Rewards Vault</h1>
        <p className="text-xs text-slate-400">
          Redeem your earned Eco Points for canteen vouchers, organic coffee, & exclusive sustainable merchandise.
        </p>
      </div>

      {/* Points & Level Header Banner */}
      <div className="bg-gradient-to-r from-[#140A18] via-[#0D0F17] to-[#07080E] border border-[#FFC700]/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl shadow-[#FFC700]/10 glow-gold">
        <div className="space-y-2">
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#FFC700] text-slate-950 font-mono font-bold">
            TIER 3 STATUS: {profile.level}
          </span>
          <h2 className="text-2xl font-extrabold text-white">Your Available Balance</h2>
          <p className="text-xs text-slate-300">
            Earn +10 pts for waste reports, +100 pts for e-waste recycling, +75 pts for cleanups.
          </p>
        </div>

        <div className="bg-[#07080E]/90 border border-[#FFC700]/60 p-5 rounded-2xl text-center space-y-1 min-w-[260px]">
          <div className="text-[10px] text-slate-400 font-mono font-bold">ECO POINTS BALANCE</div>
          <div className="text-4xl font-extrabold text-[#FFC700] font-mono flex items-center justify-center gap-2">
            <Coins className="w-8 h-8 text-[#FFC700]" />
            {profile.ecoPoints.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#03E5B7] font-mono">Next Tier: 5,000 pts (Eco Master)</div>
          
          <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
            {account ? (
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-[#03E5B7] flex items-center justify-center gap-2 bg-[#03E5B7]/10 py-1.5 px-3 rounded-lg border border-[#03E5B7]/30">
                  <Wallet className="w-4 h-4 text-[#03E5B7]" />
                  <span>{account.substring(0, 6)}...{account.substring(account.length - 4)}</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-[10px] text-slate-400 hover:text-red-400 font-mono underline transition-colors"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full py-2 bg-[#F6851B] hover:bg-[#E2761B] text-white text-[11px] font-mono font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-[#F6851B]/30 disabled:opacity-50 cursor-pointer"
                >
                  <Wallet className="w-4 h-4" />
                  {isConnecting ? 'Opening MetaMask...' : hasMetaMask ? 'CONNECT METAMASK' : 'INSTALL / CONNECT METAMASK'}
                </button>
                <button
                  onClick={connectDemoWallet}
                  className="text-[10px] text-slate-400 hover:text-[#03E5B7] font-mono underline transition-colors"
                >
                  Or use Demo Web3 Wallet
                </button>
              </div>
            )}
            {error && (
              <div className="p-2 bg-red-950/60 border border-red-800/60 rounded text-[10px] text-red-300 font-mono text-left leading-tight">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reward Items Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono text-slate-400 font-bold tracking-wider">
          REDEEMABLE CAMPUS PERKS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((item) => (
            <div
              key={item.id}
              className={`bg-squid-card rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                item.redeemed
                  ? 'border-[#03E5B7]/50 bg-[#03E5B7]/5'
                  : 'border-slate-800 bg-squid-card-hover'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-mono font-bold text-[#FFC700] bg-[#FFC700]/10 px-3 py-1 rounded-full border border-[#FFC700]/30">
                    {item.pointsCost.toLocaleString()} Pts
                  </span>
                </div>

                <h4 className="font-bold text-white text-base">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">{item.category} Perk</span>

                {item.redeemed ? (
                  <span className="text-xs font-mono font-bold text-[#03E5B7] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Redeemed Voucher Saved
                  </span>
                ) : (
                  <button
                    onClick={() => redeemReward(item.id)}
                    className="px-4 py-2 rounded-xl bg-[#FFC700] text-slate-950 text-xs font-extrabold glow-gold hover:opacity-90 transition-opacity"
                  >
                    Redeem Perk →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
