'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { UserCheck, UserPlus, Edit3, Save, X, Camera, Sparkles } from 'lucide-react';

export const CommunityProfileView: React.FC = () => {
  const { profile, toggleFollowUser, socialPosts, updateUserProfile, isAuthenticated, openAuthModal, role } = useEco();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [level, setLevel] = useState(profile.level || 'Eco Champion (Tier 3)');
  const [isSaving, setIsSaving] = useState(false);

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({
        name,
        avatar,
        level,
      });
      setIsEditing(false);
    } catch (e) {
    } finally {
      setIsSaving(false);
    }
  };

  const userPosts = socialPosts.filter(
    (p) =>
      p.authorName.toLowerCase().includes(profile.name.toLowerCase()) ||
      p.authorName.includes('Dheeraj'),
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Cover & Profile Header Card */}
      <div className="bg-squid-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="h-32 bg-gradient-to-r from-[#FF007A] via-[#80003E] to-[#07080E] relative" />
        
        <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <div className="relative group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-[#0D0F17] shadow-xl"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#FF007A] text-white hover:scale-110 transition-all shadow-md"
                title="Change Avatar"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">{profile.name}</h1>
                <span className="text-xs font-mono text-[#FF007A] font-bold">{profile.playerNumber}</span>
              </div>
              <p className="text-xs text-[#03E5B7] font-mono font-bold">{profile.level}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center font-mono text-xs">
            <div className="text-center px-2">
              <div className="font-bold text-white text-base">{profile.followersCount}</div>
              <div className="text-slate-400 text-[10px]">Followers</div>
            </div>
            <div className="text-center px-2">
              <div className="font-bold text-white text-base">{profile.followingCount}</div>
              <div className="text-slate-400 text-[10px]">Following</div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-[#0D0F17] border border-[#03E5B7] text-[#03E5B7] hover:bg-[#03E5B7]/10"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>EDIT PROFILE</span>
            </button>
          </div>
        </div>

        {/* Inline Edit Profile Panel */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="p-6 border-t border-slate-800 bg-[#07080E] space-y-4 font-sans animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF007A]" />
                <span>EDIT PLAYER PROFILE INFO</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase">Display Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0D0F17] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase">Rank & Level (Auto-Calculated)</label>
                <div className="w-full bg-[#0D0F17] border border-slate-800/80 rounded-lg px-3 py-2 text-xs text-[#03E5B7] font-mono font-bold flex items-center justify-between">
                  <span>{profile.level}</span>
                  <span className="text-[10px] text-slate-500 font-sans">⚡ Auto-calculated from Eco Points</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-300 font-bold uppercase">Avatar Image URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#0D0F17] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
              />

              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono text-slate-500">Quick Presets:</span>
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(url)}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${
                      avatar === url ? 'border-[#03E5B7] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-400 hover:text-white"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#FF007A] to-[#03E5B7] text-[#07080E] font-mono font-bold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'SAVING...' : 'SAVE PROFILE'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Impact Stats Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#07080E] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">WASTE RECOVERED</span>
          <div className="text-xl font-extrabold text-white font-mono">{profile.wasteRecoveredKg} kg</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#07080E] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">CO₂ AVOIDED</span>
          <div className="text-xl font-extrabold text-[#03E5B7] font-mono">{profile.co2SavedKg} kg</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#07080E] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">ECO POINTS</span>
          <div className={`text-xl font-extrabold font-mono ${role === 'admin' ? 'text-red-400 text-sm' : 'text-[#FFC700]'}`}>
            {role === 'admin' ? '0 Pts (DEBARRED)' : `${profile.ecoPoints} Pts`}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#07080E] border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400">CONTRIBUTIONS</span>
          <div className="text-xl font-extrabold text-[#FF007A] font-mono">{profile.communityContributions}</div>
        </div>
      </div>

      {/* Badges Vault */}
      <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 tracking-wider">EARNED COMMUNITY BADGES</h3>
        <div className="flex flex-wrap gap-3">
          {['🏆 Eco Champion', '♻️ Recycling Hero', '🌱 Community Builder', '🍱 Food Saver', '⚡ Verified Contributor'].map(
            (b, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-[#03E5B7]"
              >
                {b}
              </span>
            )
          )}
        </div>
      </div>

      {/* User Posts Timeline */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase">
          POSTS BY {profile.name}
        </h3>
        {userPosts.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-squid-card border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between font-mono text-slate-400 text-[10px]">
              <span>{p.timestamp} • {p.locationTag}</span>
              <span className="text-[#03E5B7] font-bold">❤️ {p.likesCount} Likes</span>
            </div>
            <p className="text-white">{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
