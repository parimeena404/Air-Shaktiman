'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import { Camera, Upload, Bot, MapPin, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { CampusMap } from '../map/CampusMap';

export const ReportWasteView: React.FC = () => {
  const { reportWaste, setActiveTab, profile, addToast } = useEco();
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sampleImages = [
    {
      url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600',
      label: 'Plastic & Cardboard Stack',
    },
    {
      url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=600',
      label: 'E-waste Cables & Boards',
    },
    {
      url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600',
      label: 'Wooden Scrap & Furniture',
    },
  ];

  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [location, setLocation] = useState('Block B, North Gate');

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanned(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanned(true);
      addToast('AI Neural Vision Analysis complete!', 'success');
    }, 1600);
  };

  const handleSubmitReport = () => {
    reportWaste({
      title: 'Plastic & Mixed Campus Waste',
      location,
      detectedMaterials: ['PET Plastic Bottles', 'Corrugated Cardboard', 'Metal Can'],
      estimatedQuantityKg: 12.0,
      severity: 'High',
      recyclablePercentage: 78,
      imageUrl: selectedImage,
    });
    setSubmitted(true);
    addToast('Verified Waste Report Logged! +50 XP credited', 'success');
    setTimeout(() => {
      setShowAnalysisModal(false);
      setSubmitted(false);
      setScanned(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-mono select-none animate-in fade-in duration-300">
      {/* 🔴 1. HERO BANNER (MATCHING USER SCREENSHOT EXACTLY WITH SPIDER-MAN) */}
      <div className="relative overflow-hidden rounded-xl bg-[#07080E] border-2 border-[#FF007A] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl glow-pink min-h-[340px]">
        {/* Centered Spider-Man Image (Fitted properly without aggressive cropping) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src="/images/squid-game/spiderman.png"
            alt="Spider-Man Zero Waste Raid"
            className="h-full w-auto max-w-none object-contain object-center scale-115"
          />
        </div>

        {/* Left Dark Gradient Overlay for Left Text Readability */}
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-[#07080E] via-[#07080E]/85 to-transparent pointer-events-none z-0" />

        {/* Right Dark Gradient Overlay for Right Progress Card Readability */}
        <div className="absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-[#07080E] via-[#07080E]/85 to-transparent pointer-events-none z-0" />

        {/* Left Column Text & Action Buttons */}
        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="text-xs font-black text-[#FF007A] tracking-widest uppercase">
            PRIMARY MISSION // SQUID ARENA
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest leading-tight">
            ZERO WASTE <br />
            <span className="text-[#FF007A]">CAMPUS RAID</span>
          </h1>

          <p className="text-sm text-slate-200 font-bold tracking-wide">
            Clean Campus. Earn Points. Survive.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const uploadElem = document.getElementById('upload-dropzone');
                uploadElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-lg bg-[#FF007A] text-white font-black text-xs flex items-center gap-2 shadow-lg glow-pink hover:bg-[#FF007A]/90 transition-all hover:scale-105"
            >
              <Camera className="w-4 h-4" />
              <span>REPORT WASTE</span>
              <span className="bg-black/40 text-[#03E5B7] text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                +30 Pts
              </span>
            </button>

            <button
              onClick={() => setActiveTab('challenges')}
              className="px-5 py-3 rounded-lg bg-[#07080E]/80 border border-[#1D2133] hover:border-[#FF007A] text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <span>VIEW MISSION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Mission Progress & Timer inside Hero Card */}
        <div className="relative z-10 bg-[#07080E]/90 border border-[#1D2133] p-5 rounded-xl space-y-3 min-w-[260px] text-right backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold">MISSION PROGRESS</span>
            <div className="text-3xl font-black text-[#FF007A]">85.6%</div>
            <div className="w-full h-2 bg-[#0D0F17] rounded-full overflow-hidden border border-[#1D2133] p-0.5">
              <div className="h-full bg-gradient-to-r from-[#FF007A] to-[#03E5B7] rounded-full glow-pink" style={{ width: '85.6%' }} />
            </div>
            <div className="text-[9px] text-slate-400 font-mono pt-0.5">
              <span className="text-[#03E5B7] font-bold">428 KG DIVERTED</span> / 500 KG TARGET
            </div>
          </div>

          <div className="border-t border-[#1D2133] pt-2 space-y-0.5">
            <span className="text-[9px] text-slate-400 font-bold">TIMER REMAINING</span>
            <div className="text-sm font-black text-[#FFC700]">03D : 12H : 42M</div>
            <div className="text-[9px] text-[#03E5B7] font-bold">1,824 CONTESTANTS DEPLOYED ◯</div>
          </div>
        </div>
      </div>

      {/* 🟢 2. MIDDLE ROW (3 EQUAL COLUMNS - MATCHING USER SCREENSHOT) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: UPLOAD WASTE PHOTO Card */}
        <div id="upload-dropzone" className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center gap-2 border-b border-[#1D2133] pb-3">
            <Camera className="w-4 h-4 text-[#FF007A]" />
            <h3 className="text-xs font-black text-white tracking-wider uppercase">
              UPLOAD WASTE PHOTO
            </h3>
          </div>

          {/* Dotted Upload Dropzone Box */}
          <div className="relative group cursor-pointer">
            <div className="relative w-full h-36 rounded-lg border-2 border-dashed border-[#1D2133] bg-[#07080E] flex flex-col items-center justify-center p-4 overflow-hidden group-hover:border-[#FF007A] transition-colors">
              <img
                src={selectedImage}
                alt="Selected waste photo"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />

              {isScanning && (
                <div className="absolute inset-0 bg-[#FF007A]/20 scanline-overlay z-20 flex items-center justify-center">
                  <div className="w-full h-1 bg-[#FF007A] shadow-lg shadow-[#FF007A] animate-bounce" />
                  <div className="absolute font-mono text-[11px] font-bold text-[#FF007A] bg-[#07080E]/90 px-3 py-1 rounded border border-[#FF007A] glow-pink">
                    🔍 AI Neural Vision Scanning...
                  </div>
                </div>
              )}

              {!isScanning && (
                <div className="relative z-10 text-center space-y-1 bg-[#07080E]/85 p-3 rounded backdrop-blur-md border border-[#1D2133]">
                  <Camera className="w-6 h-6 text-[#FF007A] mx-auto" />
                  <div className="text-[11px] font-bold text-white">Drag & drop photo or click to upload</div>
                  <div className="text-[9px] text-slate-400 font-mono">JPG, PNG up to 10MB</div>
                </div>
              )}
            </div>
          </div>

          {/* Sample Preset Selector */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-bold">SAMPLE GARBAGE PHOTOS</span>
            <div className="grid grid-cols-3 gap-2">
              {sampleImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImage(img.url);
                    setScanned(false);
                  }}
                  className={`relative rounded overflow-hidden border-2 h-14 transition-all ${
                    selectedImage === img.url
                      ? 'border-[#FF007A] ring-2 ring-[#FF007A]/40'
                      : 'border-[#1D2133] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] text-white p-0.5 text-center truncate">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Location Picker */}
          <div className="space-y-1">
            <label className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#03E5B7]" /> CAMPUS LOCATION
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#07080E] border border-[#1D2133] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A] font-mono"
            >
              <option value="Block B, North Gate">Block B, North Gate</option>
              <option value="Electronics Lab 2, 2nd Floor">Electronics Lab 2</option>
              <option value="Hostel Block A, Backyard">Hostel Block A</option>
              <option value="Main Canteen Loading Bay">Main Canteen</option>
            </select>
          </div>

          {/* Bright Green Analyze Button */}
          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="w-full py-3 rounded-lg bg-[#00FF66] text-[#07080E] font-black text-xs flex items-center justify-center gap-2 hover:bg-[#00FF66]/90 transition-all glow-green shadow-lg"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>ANALYZING WITH AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>ANALYZE WASTE WITH AI</span>
              </>
            )}
          </button>
        </div>

        {/* Column 2: AI NEURAL VISION RESULTS Card */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
            <h3 className="text-xs font-black text-[#03E5B7] flex items-center gap-2 tracking-wider">
              <Bot className="w-4 h-4 text-[#03E5B7]" />
              AI NEURAL VISION RESULTS
            </h3>
            <span className="text-[9px] px-2 py-0.5 rounded bg-[#03E5B7]/15 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
              98.4% Confidence
            </span>
          </div>

          {/* Scanning Radar Circle & Waste Title */}
          <div className="flex items-center gap-4 bg-[#07080E] p-3 rounded-lg border border-[#1D2133]">
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#03E5B7] animate-spin-slow flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#03E5B7]/20 border border-[#03E5B7] flex items-center justify-center text-[#03E5B7] text-lg font-black">
                  ♻
                </div>
              </div>
            </div>
            <div>
              <span className="text-[9px] text-slate-400 font-bold uppercase">WASTE DETECTED</span>
              <h4 className="text-sm font-black text-white tracking-wide">Plastic & Cardboard</h4>
              <div className="text-[10px] text-[#03E5B7] font-bold flex items-center gap-1 pt-0.5">
                <MapPin className="w-3 h-3 text-[#FF007A]" />
                <span>Block B, North Gate</span>
              </div>
            </div>
          </div>

          {/* Waste Material Breakdown Bars */}
          <div className="space-y-2 bg-[#07080E] p-3 rounded-lg border border-[#1D2133] text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase">WASTE BREAKDOWN</span>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#03E5B7] font-bold">🟢 Plastic</span>
                <span className="text-slate-300">62% (2.8 kg)</span>
              </div>
              <div className="w-full h-1.5 bg-[#0D0F17] rounded-full overflow-hidden">
                <div className="h-full bg-[#03E5B7] rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#FFC700] font-bold">🟡 Cardboard</span>
                <span className="text-slate-300">25% (1.1 kg)</span>
              </div>
              <div className="w-full h-1.5 bg-[#0D0F17] rounded-full overflow-hidden">
                <div className="h-full bg-[#FFC700] rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-[#FF007A] font-bold">🔴 Metal</span>
                <span className="text-slate-300">8% (0.3 kg)</span>
              </div>
              <div className="w-full h-1.5 bg-[#0D0F17] rounded-full overflow-hidden">
                <div className="h-full bg-[#FF007A] rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-400 font-bold">🔴 Others</span>
                <span className="text-slate-300">5% (0.2 kg)</span>
              </div>
              <div className="w-full h-1.5 bg-[#0D0F17] rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAnalysisModal(true)}
            className="w-full py-2.5 rounded-lg bg-[#07080E] border border-[#03E5B7] text-[#03E5B7] hover:bg-[#03E5B7]/20 text-xs font-black tracking-wider transition-all"
          >
            VIEW FULL ANALYSIS
          </button>
        </div>

        {/* Column 3: INDORE CAMPUS LIVE GRID TELEMETRY MAP Card */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
            <h3 className="text-xs font-black text-white flex items-center gap-1.5 tracking-wider">
              <MapPin className="w-4 h-4 text-[#03E5B7]" />
              INDORE CAMPUS LIVE GRID TELEMETRY MAP
            </h3>
            <div className="flex items-center gap-2 text-[9px] font-bold">
              <span className="flex items-center gap-1 text-[#03E5B7]"><span className="w-1.5 h-1.5 rounded-full bg-[#03E5B7]" /> Normal</span>
              <span className="flex items-center gap-1 text-[#FFC700]"><span className="w-1.5 h-1.5 rounded-full bg-[#FFC700]" /> Attention</span>
              <span className="flex items-center gap-1 text-[#FF007A]"><span className="w-1.5 h-1.5 rounded-full bg-[#FF007A]" /> Anomaly</span>
            </div>
          </div>

          {/* Node Graph Map Graphic */}
          <div className="relative h-44 rounded bg-[#07080E] border border-[#1D2133] overflow-hidden flex items-center justify-center radar-grid">
            <svg className="w-full h-full p-4" viewBox="0 0 200 120">
              <line x1="30" y1="40" x2="80" y2="70" stroke="#03E5B7" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="80" y1="70" x2="130" y2="30" stroke="#03E5B7" strokeWidth="1.5" />
              <line x1="80" y1="70" x2="140" y2="90" stroke="#FF007A" strokeWidth="1.5" />
              <line x1="130" y1="30" x2="170" y2="60" stroke="#03E5B7" strokeWidth="1.5" />

              {/* Connected Nodes */}
              <circle cx="30" cy="40" r="7" fill="#07080E" stroke="#03E5B7" strokeWidth="2" />
              <circle cx="80" cy="70" r="9" fill="#07080E" stroke="#FFC700" strokeWidth="2" />
              <circle cx="130" cy="30" r="8" fill="#07080E" stroke="#03E5B7" strokeWidth="2" />
              <circle cx="140" cy="90" r="7" fill="#07080E" stroke="#FF007A" strokeWidth="2" />
              <circle cx="170" cy="60" r="6" fill="#07080E" stroke="#03E5B7" strokeWidth="2" />
            </svg>
            <div className="absolute right-2 bottom-2 flex flex-col gap-1">
              <span className="w-5 h-5 bg-[#0D0F17] border border-[#1D2133] rounded text-white flex items-center justify-center text-xs font-bold">+</span>
              <span className="w-5 h-5 bg-[#0D0F17] border border-[#1D2133] rounded text-white flex items-center justify-center text-xs font-bold">-</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('nearby')}
            className="w-full py-2.5 rounded-lg bg-[#07080E] border border-[#1D2133] text-white hover:border-[#03E5B7] hover:text-[#03E5B7] text-xs font-black tracking-wider transition-all"
          >
            EXPLORE FULL MAP
          </button>
        </div>
      </div>

      {/* 🟡 3. BOTTOM ROW (4 METRIC CARDS - MATCHING USER SCREENSHOT) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: YOUR IMPACT SCORE */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-4 flex items-center gap-4 shadow-lg">
          <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1D2133" strokeWidth="8" fill="transparent" />
              <circle cx="50" cy="50" r="40" stroke="#03E5B7" strokeWidth="8" strokeDasharray="251" strokeDashoffset="50" strokeLinecap="round" fill="transparent" />
            </svg>
            <span className="absolute font-black text-xs text-white">7,840</span>
          </div>
          <div>
            <span className="text-[10px] font-black text-[#FF007A] tracking-wider uppercase">YOUR IMPACT SCORE</span>
            <div className="text-sm font-black text-[#03E5B7]">ECO POINTS</div>
            <span className="text-[10px] text-slate-400">Top 27% of Contestants</span>
          </div>
        </div>

        {/* Card 2: SURVIVAL STREAK */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-4 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#FF007A]/15 border border-[#FF007A] flex items-center justify-center text-[#FF007A] text-xl flex-shrink-0 glow-pink">
            🔥
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">SURVIVAL STREAK</span>
            <div className="text-base font-black text-white">12 DAYS</div>
            <span className="text-[10px] text-slate-400">Keep it up, Survivor!</span>
          </div>
        </div>

        {/* Card 3: RANK */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-4 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#03E5B7]/15 border border-[#03E5B7] flex items-center justify-center text-[#03E5B7] text-xl flex-shrink-0 glow-teal">
            👑
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">RANK</span>
            <div className="text-base font-black text-[#03E5B7]">#27</div>
            <span className="text-[10px] text-slate-400">of 456 Contestants</span>
          </div>
        </div>

        {/* Card 4: ECO CASH POOL */}
        <div className="bg-[#0D0F17] border border-[#1D2133] rounded-xl p-4 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#FFC700]/15 border border-[#FFC700] flex items-center justify-center text-[#FFC700] text-xl flex-shrink-0 glow-gold">
            💰
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">ECO CASH POOL</span>
            <div className="text-base font-black text-[#FFC700]">₹2,840 Pts</div>
            <span className="text-[10px] text-slate-400">Total rewards this round</span>
          </div>
        </div>
      </div>

      {/* 🤖 AI NEURAL VISION ANALYSIS DETAILS MODAL */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono">
          <div className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-xl max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 glow-teal relative">
            <button
              onClick={() => setShowAnalysisModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#03E5B7]/20 text-[#03E5B7] border border-[#03E5B7]/40 font-bold">
                  🤖 AI NEURAL VISION TELEMETRY
                </span>
                <h2 className="text-xl font-black text-white mt-1">AI WASTE ANALYSIS BREAKDOWN</h2>
              </div>
              <span className="text-xs font-bold text-[#03E5B7] bg-[#03E5B7]/10 px-2.5 py-1 rounded border border-[#03E5B7]/30">
                98.4% CONFIDENCE
              </span>
            </div>

            {/* Analysis Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded bg-[#07080E] border border-[#1D2133] space-y-1.5">
                <span className="text-slate-400 text-[10px] font-bold">DETECTED MATERIALS</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="bg-[#FF007A]/20 text-[#FF007A] px-2 py-0.5 rounded text-[10px] font-bold border border-[#FF007A]/30">PET Plastic (70%)</span>
                  <span className="bg-[#03E5B7]/20 text-[#03E5B7] px-2 py-0.5 rounded text-[10px] font-bold border border-[#03E5B7]/30">Cardboard (20%)</span>
                  <span className="bg-[#FFC700]/20 text-[#FFC700] px-2 py-0.5 rounded text-[10px] font-bold border border-[#FFC700]/30">Metal Cans (10%)</span>
                </div>
              </div>

              <div className="p-3.5 rounded bg-[#07080E] border border-[#1D2133] space-y-1">
                <span className="text-slate-400 text-[10px] font-bold">ESTIMATED QUANTITY</span>
                <div className="font-black text-white text-xl">~12.0 KG</div>
                <span className="text-[9px] text-[#03E5B7]">Diverted from Landfill</span>
              </div>

              <div className="p-3.5 rounded bg-[#07080E] border border-[#1D2133] space-y-1">
                <span className="text-slate-400 text-[10px] font-bold">SEVERITY LEVEL</span>
                <div className="font-black text-[#FF007A] text-sm flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4 text-[#FF007A]" /> HIGH PRIORITY
                </div>
                <span className="text-[9px] text-slate-400">Urgent Campus Diversion</span>
              </div>

              <div className="p-3.5 rounded bg-[#07080E] border border-[#1D2133] space-y-1">
                <span className="text-slate-400 text-[10px] font-bold">RECYCLABILITY INDEX</span>
                <div className="font-black text-[#03E5B7] text-xl">78% RECYCLABLE</div>
                <span className="text-[9px] text-[#03E5B7]">High Circular Value</span>
              </div>
            </div>

            {/* AI Recommendation Quote Box */}
            <div className="p-4 rounded bg-[#07080E] border border-[#03E5B7]/50 space-y-1.5 glow-teal">
              <span className="text-[10px] text-[#03E5B7] font-black flex items-center gap-1">
                💡 FRONT MAN AI RECOMMENDATION:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                "This waste site contains high-grade PET plastic bottles and clean corrugated cardboard. Nearest collection hub is <strong className="text-[#03E5B7]">Indore Hub #2 (240m away)</strong>. Submitting a verified report will credit <strong className="text-[#FFC700]">+50 XP & +300 Eco Points</strong>."
              </p>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  handleSubmitReport();
                  addToast('Verified AI Waste Report Logged! +50 XP awarded', 'success');
                }}
                className="flex-1 py-3 rounded bg-[#03E5B7] text-[#07080E] font-black text-xs glow-teal hover:bg-[#03E5B7]/90 transition-all"
              >
                DISPATCH CLEANUP SQUAD (+50 XP)
              </button>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="px-5 py-3 rounded bg-[#07080E] border border-[#1D2133] text-white text-xs font-bold hover:bg-[#1D2133]"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

