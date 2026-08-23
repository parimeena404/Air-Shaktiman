'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { useWeb3 } from '../../context/Web3Context';
import { RedeemedVoucher } from '../../types';
import { Gift, Coins, CheckCircle2, QrCode, ArrowRight, ShieldCheck, Sparkles, X, Wallet } from 'lucide-react';

export const RedeemRewardsView: React.FC = () => {
  const { profile, rewards, redeemPartnerVoucher, setActiveTab } = useEco();
  const { account, connectWallet, isConnecting } = useWeb3();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [confirmReward, setConfirmReward] = useState<{ title: string; business: string; cost: number; discount: number } | null>(null);
  const [successVoucher, setSuccessVoucher] = useState<RedeemedVoucher | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const categories = ['All', 'Cafés', 'Restaurants', 'Shops', 'Bookstores', 'Entertainment', 'Mobility', 'Sustainable Products'];

  const filteredRewards = rewards.filter((r) => {
    if (selectedCategory === 'All') return true;
    return r.category === selectedCategory;
  });

  const handleConfirmRedeem = () => {
    if (!confirmReward) return;
    const voucher = redeemPartnerVoucher(
      confirmReward.title,
      confirmReward.business,
      confirmReward.cost,
      confirmReward.discount
    );

    setConfirmReward(null);
    if (voucher) {
      setSuccessVoucher(voucher);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Points Balance Card */}
      <div className="bg-gradient-to-r from-[#1A1208] via-[#0D0F17] to-[#07080E] border-2 border-[#FFC700]/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl glow-gold">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC700]/20 border border-[#FFC700]/50 text-[#FFC700] text-xs font-mono font-bold">
            <Coins className="w-3.5 h-3.5" />
            <span>ECO POINTS VAULT & REWARDS STORE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Redeem Eco Points</h1>
          <p className="text-xs text-slate-300">
            Turn your environmental actions into real-world rewards at local partner cafés, shops, & bookstores.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#07080E]/90 border border-slate-800 text-right space-y-1 font-mono">
          <span className="text-[10px] text-slate-400">YOUR ECO POINTS BALANCE</span>
          <div className="text-3xl font-extrabold text-[#FFC700] flex items-center justify-end gap-2">
            <Coins className="w-6 h-6 text-[#FFC700]" />
            <span>{profile.ecoPoints.toLocaleString()}</span>
          </div>
          <div className="text-[10px] text-[#03E5B7]">Level: {profile.level} (840 pts to Tier 4)</div>
          
          <div className="pt-2 mt-2 border-t border-slate-800">
            {account ? (
              <div className="text-[10px] font-bold text-[#03E5B7] flex items-center justify-end gap-1">
                <Wallet className="w-3 h-3" />
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="w-full py-1.5 bg-[#F6851B]/10 hover:bg-[#F6851B]/20 border border-[#F6851B]/50 text-[#F6851B] text-[10px] font-bold rounded transition-colors disabled:opacity-50"
              >
                CONNECT METAMASK
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0D0F17] border border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#FFC700] text-slate-950 font-bold shadow-md shadow-[#FFC700]/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-squid-card bg-squid-card-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{reward.icon}</span>
                <span className="text-[10px] font-mono text-slate-400">📍 {reward.distanceMeters || 420} m</span>
              </div>
              <h3 className="font-bold text-white text-base leading-snug">{reward.title}</h3>
              <p className="text-xs text-slate-400">{reward.description}</p>
              <div className="text-[11px] font-mono text-[#03E5B7] font-bold pt-1">
                {reward.businessName || 'Green Partner'}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="font-mono text-sm font-extrabold text-[#FFC700]">
                {reward.pointsCost} Pts
              </div>

              <button
                onClick={() =>
                  setConfirmReward({
                    title: reward.title,
                    business: reward.businessName || 'Green Café',
                    cost: reward.pointsCost,
                    discount: reward.discountInr || 50,
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#FFC700] text-slate-950 font-extrabold text-xs glow-gold hover:opacity-90 transition-opacity"
              >
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REDEMPTION CONFIRMATION MODAL */}
      {confirmReward && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Confirm Reward Redemption</h3>
              <button onClick={() => setConfirmReward(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#07080E] border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-sm font-bold text-white">{confirmReward.title}</div>
              <div className="text-slate-400">Partner: <strong className="text-white">{confirmReward.business}</strong></div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span>Reward Cost:</span>
                <span className="font-extrabold text-[#FFC700]">{confirmReward.cost} Eco Points</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Current Balance:</span>
                <span>{profile.ecoPoints} Pts</span>
              </div>
              <div className="flex justify-between text-[#03E5B7] font-bold pt-1">
                <span>After Redemption:</span>
                <span>{profile.ecoPoints - confirmReward.cost} Pts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfirmReward(null)}
                className="py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRedeem}
                className="py-3 rounded-xl bg-[#FFC700] text-slate-950 font-extrabold text-xs glow-gold"
              >
                Confirm Redemption
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDEMPTION SUCCESS MODAL WITH VOUCHER CODE & QR CODE */}
      {successVoucher && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-3xl max-w-md w-full p-6 space-y-6 animate-in zoom-in-95 text-center">
            <div className="space-y-1">
              <div className="w-12 h-12 rounded-full bg-[#03E5B7]/20 border border-[#03E5B7] text-[#03E5B7] flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-xl font-extrabold text-white">🎉 Reward Redeemed!</h3>
              <p className="text-xs text-slate-400">You successfully redeemed {successVoucher.rewardTitle}</p>
            </div>

            {/* DUMMY VOUCHER CARD */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#140A18] to-[#07080E] border border-dashed border-[#03E5B7] space-y-3 font-mono">
              <div className="text-[10px] text-slate-500 tracking-widest">CITY GUARDIAN REWARD VOUCHER</div>
              <div className="text-lg font-extrabold text-[#03E5B7]">{successVoucher.businessName}</div>
              <div className="text-2xl font-black text-white">{successVoucher.rewardTitle}</div>
              <div className="py-2 px-4 rounded-xl bg-slate-900 border border-slate-700 text-lg font-bold text-[#FFC700] tracking-wider">
                {successVoucher.voucherCode}
              </div>
              <div className="text-[10px] text-slate-400">Valid until {successVoucher.expiryDate}</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowQrModal(true)}
                className="py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 hover:border-[#03E5B7]"
              >
                <QrCode className="w-4 h-4 text-[#03E5B7]" />
                <span>Show QR</span>
              </button>
              <button
                onClick={() => {
                  setSuccessVoucher(null);
                  setActiveTab('my-rewards');
                }}
                className="py-3 rounded-xl bg-[#03E5B7] text-slate-950 font-extrabold text-xs glow-teal"
              >
                View My Rewards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISUAL QR CODE PLACEHOLDER MODAL */}
      {showQrModal && successVoucher && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D0F17] border border-slate-800 rounded-3xl max-w-sm w-full p-6 space-y-4 text-center animate-in zoom-in-95">
            <div className="flex justify-end">
              <button onClick={() => setShowQrModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-base font-bold text-white">Show QR at {successVoucher.businessName}</h3>

            <div className="p-6 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center shadow-2xl">
              <img src={successVoucher.qrCodePlaceholder} alt="Voucher QR Code" className="w-full h-full" />
            </div>

            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div>Voucher: <strong className="text-white">{successVoucher.voucherCode}</strong></div>
              <div>Expires: {successVoucher.expiryDate}</div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
