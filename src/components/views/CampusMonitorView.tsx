'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Activity, Zap, Droplet, Trash2, Globe, AlertTriangle, ShieldAlert, Building2, MapPin, Layers } from 'lucide-react';
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
  const { alerts } = useEco();
  const [selectedZone, setSelectedZone] = useState<string>('All');

  // City-wise consumption telemetry data
  const cityZoneData = [
    {
      id: 'ZONE-01',
      zoneName: 'Indore Central Metro Zone',
      energyMwh: 1420,
      waterKL: 840,
      wasteRecoveredTons: 18.4,
      co2AvoidedTons: 24.2,
      efficiencyChange: '↓ 16%',
      status: 'Optimal',
      accentColor: '#03E5B7',
    },
    {
      id: 'ZONE-02',
      zoneName: 'Pithampur Industrial Hub',
      energyMwh: 2850,
      waterKL: 1250,
      wasteRecoveredTons: 42.1,
      co2AvoidedTons: 58.6,
      efficiencyChange: '↓ 22%',
      status: 'High Impact',
      accentColor: '#FFC700',
    },
    {
      id: 'ZONE-03',
      zoneName: 'Super Corridor Smart Zone',
      energyMwh: 980,
      waterKL: 410,
      wasteRecoveredTons: 12.6,
      co2AvoidedTons: 16.4,
      efficiencyChange: '↓ 14%',
      status: 'Optimal',
      accentColor: '#FF007A',
    },
    {
      id: 'ZONE-04',
      zoneName: 'Rau Knowledge & Campus Belt',
      energyMwh: 760,
      waterKL: 320,
      wasteRecoveredTons: 9.8,
      co2AvoidedTons: 12.1,
      efficiencyChange: '↓ 18%',
      status: 'Optimal',
      accentColor: '#3B82F6',
    },
  ];

  // 7-day city electricity consumption trend (MWh)
  const cityEnergyTrends = [
    { day: 'Mon', central: 1380, industrial: 2790, corridor: 940 },
    { day: 'Tue', central: 1410, industrial: 2820, corridor: 960 },
    { day: 'Wed', central: 1400, industrial: 2860, corridor: 970 },
    { day: 'Thu', central: 1430, industrial: 2840, corridor: 990 },
    { day: 'Fri', central: 1450, industrial: 2900, corridor: 1010 },
    { day: 'Sat', central: 1390, industrial: 2750, corridor: 920 },
    { day: 'Sun', central: 1360, industrial: 2680, corridor: 900 },
  ];

  // City-wide waste composition (%)
  const cityWasteComposition = [
    { name: 'Organic Food Waste', percentage: 38, color: '#03E5B7' },
    { name: 'Recyclable Plastics', percentage: 26, color: '#FF007A' },
    { name: 'E-Waste & Electronics', percentage: 14, color: '#FFC700' },
    { name: 'Paper & Cardboard', percentage: 12, color: '#3B82F6' },
    { name: 'Industrial Metal Scrap', percentage: 10, color: '#A855F7' },
  ];

  const filteredZones = cityZoneData.filter((z) => selectedZone === 'All' || z.id === selectedZone);

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7]/40 text-[#03E5B7] text-xs font-mono font-bold mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>CITY-WIDE TELEMETRY & SMART GRID</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider">City Intelligence Monitor</h1>
          <p className="text-xs text-slate-400 font-bold">
            Real-time IoT smart city telemetry for urban energy consumption, municipal water grids, & city waste diversion.
          </p>
        </div>

        {/* Zone Selector */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-[#0D0F17] border border-[#1D2133]">
          {['All', 'ZONE-01', 'ZONE-02', 'ZONE-03', 'ZONE-04'].map((zId) => (
            <button
              key={zId}
              onClick={() => setSelectedZone(zId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedZone === zId
                  ? 'bg-[#03E5B7] text-[#07080E] glow-teal'
                  : 'text-slate-400 hover:text-white hover:bg-[#07080E]'
              }`}
            >
              {zId === 'All' ? 'All City Zones' : zId}
            </button>
          ))}
        </div>
      </div>

      {/* City Zone Consumption Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredZones.map((zone) => (
          <div
            key={zone.id}
            className="bg-[#0D0F17] border border-[#1D2133] hover:border-[#03E5B7]/50 rounded-2xl p-5 space-y-3 transition-all shadow-xl group"
          >
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-2">
              <span className="text-[10px] font-bold text-slate-400">{zone.id}</span>
              <span
                className="text-[9px] px-2 py-0.5 rounded font-bold border"
                style={{
                  backgroundColor: `${zone.accentColor}20`,
                  color: zone.accentColor,
                  borderColor: `${zone.accentColor}50`,
                }}
              >
                {zone.status}
              </span>
            </div>

            <h3 className="font-bold text-white text-sm leading-snug">{zone.zoneName}</h3>

            <div className="space-y-2 text-xs font-mono pt-1">
              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FFC700]" /> Energy:
                </span>
                <strong className="text-white">{zone.energyMwh.toLocaleString()} MWh</strong>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-[#03E5B7]" /> Water:
                </span>
                <strong className="text-white">{zone.waterKL.toLocaleString()} kL/day</strong>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-[#FF007A]" /> Waste Recovered:
                </span>
                <strong className="text-[#03E5B7]">{zone.wasteRecoveredTons} tons</strong>
              </div>
            </div>

            <div className="text-[10px] text-[#03E5B7] font-bold pt-2 border-t border-[#1D2133] flex justify-between">
              <span>CO₂ Avoided: {zone.co2AvoidedTons}t</span>
              <span>{zone.efficiencyChange}</span>
            </div>
          </div>
        ))}
      </div>

      {/* AI City Threat System Banner */}
      <div className="bg-[#0D0F17] border-2 border-[#FF007A]/60 rounded-2xl p-6 space-y-4 glow-pink shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
          <h3 className="text-sm font-black text-white flex items-center gap-2 tracking-wide">
            <ShieldAlert className="w-5 h-5 text-[#FF007A]" />
            Front Man AI City Anomaly Alert System
          </h3>
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#FF007A] text-white font-mono font-black">
            3 CRITICAL CITY ALERTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alerts.map((alt) => (
            <div key={alt.id} className="p-4 rounded-xl bg-[#07080E] border border-[#1D2133] space-y-2">
              <div className="font-bold text-xs text-white flex items-center justify-between">
                <span>{alt.title}</span>
                <span className="text-[9px] text-[#FF007A] font-mono font-bold">{alt.type}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{alt.message}</p>
              <div className="text-[10px] text-[#03E5B7] font-mono font-bold pt-1 border-t border-[#1D2133]">
                Rec: {alt.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive SVG City Map */}
      <CampusMap />

      {/* Recharts City Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day City Electricity Consumption Line Chart */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 font-mono tracking-wide">
            <Zap className="w-4 h-4 text-[#FFC700]" /> 7-DAY CITY ELECTRICITY CONSUMPTION (MWh)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cityEnergyTrends}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#07080E', borderColor: '#1D2133', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="central" stroke="#FF007A" strokeWidth={2} name="Indore Central (MWh)" />
                <Line type="monotone" dataKey="industrial" stroke="#FFC700" strokeWidth={2} name="Pithampur Industrial (MWh)" />
                <Line type="monotone" dataKey="corridor" stroke="#03E5B7" strokeWidth={2} name="Super Corridor (MWh)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Composition Pie Chart */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 font-mono tracking-wide">
            <Trash2 className="w-4 h-4 text-[#03E5B7]" /> CITY-WIDE WASTE DIVERSION (%)
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cityWasteComposition}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percentage }: any) => `${name} ${percentage}%`}
                >
                  {cityWasteComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#07080E', borderColor: '#1D2133' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
