'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Users, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const CommunityGroupsView: React.FC = () => {
  const { ecoClubGroups, ecoEvents, joinClubGroup, rsvpEvent, setActiveTab } = useEco();

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>SUSTAINABILITY CLUBS & DRIVES</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Eco Communities & Events</h1>
        <p className="text-xs text-slate-400">
          Join specialized campus guilds, student clubs, & community cleanup drives around you.
        </p>
      </div>

      {/* CLUBS SECTION */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-400 tracking-wider">
          FEATURED ECO COMMUNITIES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ecoClubGroups.map((club) => (
            <div
              key={club.id}
              className="bg-squid-card bg-squid-card-hover rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{club.logo}</span>
                  <span className="text-[10px] font-mono text-[#03E5B7] font-bold">
                    {club.membersCount} Members
                  </span>
                </div>
                <h4 className="font-bold text-white text-base leading-snug">{club.name}</h4>
                <p className="text-xs text-slate-400">{club.description}</p>
              </div>

              <button
                onClick={() => joinClubGroup(club.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                  club.isJoined
                    ? 'bg-slate-900 border border-slate-700 text-[#03E5B7]'
                    : 'bg-[#03E5B7] text-slate-950 glow-teal'
                }`}
              >
                {club.isJoined ? 'Joined Member ✓' : 'Join Community'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS SECTION */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-xs font-mono font-bold text-slate-400 tracking-wider">
          UPCOMING COMMUNITY CLEANUP DRIVES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ecoEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-squid-card bg-squid-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div className="relative h-40">
                <img src={evt.imageUrl} alt={evt.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 text-[10px] px-2.5 py-1 rounded-full bg-slate-900/90 text-[#FFC700] font-mono font-extrabold shadow-lg">
                  📅 {evt.dateTime}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">{evt.title}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#FF007A]" />
                    <span>{evt.location}</span>
                  </div>
                  <div className="text-[11px] text-[#03E5B7] font-mono font-bold">
                    🎯 Goal: {evt.goalLabel} ({evt.attendingCount} attending)
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveTab('nearby')}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:text-white"
                  >
                    View Map
                  </button>
                  <button
                    onClick={() => rsvpEvent(evt.id)}
                    className={`flex-1 py-2 rounded-xl font-bold text-xs transition-all ${
                      evt.isJoined
                        ? 'bg-slate-900 border border-slate-700 text-[#03E5B7]'
                        : 'bg-[#FF007A] text-white glow-pink'
                    }`}
                  >
                    {evt.isJoined ? 'RSVP Confirmed ✓' : 'Join Event'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
