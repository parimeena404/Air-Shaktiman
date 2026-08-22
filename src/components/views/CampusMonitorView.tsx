'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';
import { Activity, Zap, Droplet, Trash2, Globe, AlertTriangle, ShieldAlert, ArrowDownRight } from 'lucide-react';
import { CampusMap } from '../map/CampusMap';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const CampusMonitorView: React.FC = () => {
  const { telemetry, alerts } = useEco();

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF007A]/15 border border-[#FF007A]/40 text-[#FF007A] text-xs font-mono font-bold mb-2">
          <Activity className="w-3.5 h-3.5" />
          <span>FRONT MAN CAMPUS TELEMETRY</span>
        </div>
        <h1 className="text-2xl font-extrabold text-white">Campus Intelligence Monitor</h1>
        <p className="text-xs text-slate-400">
          Real-time IoT grid monitoring for energy consumption, water pipe leakage, & waste diversion composition.
        </p>
      </div>

      {/* Top 4 Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-squid-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>ELECTRICITY GRID</span>
            <Zap className="w-4 h-4 text-[#FFC700]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
            <span>↓ 14%</span>
            <span className="text-xs text-[#03E5B7]">Efficiency gain</span>
          </div>
        </div>

        <div className="bg-squid-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>WATER CONSUMPTION</span>
            <Droplet className="w-4 h-4 text-[#03E5B7]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
            <span>↓ 11%</span>
            <span className="text-xs text-[#03E5B7]">Leakage alert active</span>
          </div>
        </div>

        <div className="bg-squid-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>TOTAL CAMPUS WASTE</span>
            <Trash2 className="w-4 h-4 text-[#FF007A]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
            <span>↓ 23%</span>
            <span className="text-xs text-[#03E5B7]">Landfill reduction</span>
          </div>
        </div>

        <div className="bg-squid-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>CARBON FOOTPRINT</span>
            <Globe className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
            <span>↓ 18%</span>
            <span className="text-xs text-[#03E5B7]">1.8t CO₂ avoided</span>
          </div>
        </div>
      </div>

      {/* AI Alert System Banner */}
      <div className="bg-squid-card border-2 border-[#FF007A]/60 rounded-2xl p-6 space-y-4 glow-pink">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#FF007A]" />
            Front Man AI Anomaly Alert System
          </h3>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FF007A] text-white font-mono font-bold">
            3 CRITICAL THREATS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alt) => (
            <div key={alt.id} className="p-4 rounded-xl bg-[#07080E] border border-slate-800 space-y-2">
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>{alt.title}</span>
                <span className="text-[9px] text-[#FF007A] font-mono font-bold">{alt.type}</span>
              </div>
              <p className="text-[11px] text-slate-300">{alt.message}</p>
              <div className="text-[10px] text-[#03E5B7] font-semibold pt-1 border-t border-slate-800/80">
                Rec: {alt.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive SVG Campus Map */}
      <CampusMap />

      {/* Recharts Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Energy Consumption Line Chart */}
        <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Zap className="w-4 h-4 text-[#FFC700]" /> 7-DAY ENERGY CONSUMPTION (kWh)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetry.energy.dailyData}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0D0F17', borderColor: '#334155', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="blockB" stroke="#FF007A" strokeWidth={2} name="Block B (Lab)" />
                <Line type="monotone" dataKey="blockA" stroke="#03E5B7" strokeWidth={2} name="Block A (Admin)" />
                <Line type="monotone" dataKey="hostel3" stroke="#FFC700" strokeWidth={2} name="Hostel 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Composition Pie Chart */}
        <div className="bg-squid-card border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
            <Trash2 className="w-4 h-4 text-[#03E5B7]" /> CAMPUS WASTE COMPOSITION (%)
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={telemetry.waste.composition}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percentage }: any) => `${name} ${percentage}%`}
                >
                  {telemetry.waste.composition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0D0F17', borderColor: '#334155' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
