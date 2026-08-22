'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { UserCheck, UserPlus, Award, ShieldCheck, Heart, MapPin } from 'lucide-react';

export const CommunityProfileView: React.FC = () => {
  const { profile, toggleFollowUser, socialPosts } = useEco();

  const userPosts = socialPosts.filter((p) => p.authorName === 'Dheeraj');

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Cover & Profile Header Card */}
      <div className="bg-squid-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="h-32 bg-gradient-to-r from-[#FF007A] via-[#80003E] to-[#07080E] relative" />
        <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#0D0F17] shadow-xl"
            />
            <div className="space-y-1 mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white">{profile.name}</h1>
                <span className="text-xs font-mono text-[#FF007A] font-bold">{profile.playerNumber}</span>
              </div>
              <p className="text-xs text-[#03E5B7] font-mono font-bold">{profile.level}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center font-mono text-xs">
            <div className="text-center">
              <div className="font-bold text-white text-base">{profile.followersCount}</div>
              <div className="text-slate-400 text-[10px]">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-base">{profile.followingCount}</div>
              <div className="text-slate-400 text-[10px]">Following</div>
            </div>

            <button
              onClick={toggleFollowUser}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                profile.isFollowing
                  ? 'bg-slate-900 border border-slate-700 text-[#03E5B7]'
                  : 'bg-[#FF007A] text-white glow-pink'
              }`}
            >
              {profile.isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              <span>{profile.isFollowing ? 'Following ✓' : 'Follow'}</span>
            </button>
          </div>
        </div>
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
          <div className="text-xl font-extrabold text-[#FFC700] font-mono">{profile.ecoPoints} Pts</div>
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
        <h3 className="text-xs font-mono font-bold text-slate-400 tracking-wider">POSTS BY DHEERAJ</h3>
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
