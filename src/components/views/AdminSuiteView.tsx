'use client';

import React, { useState } from 'react';
import { useEco } from '../../context/EcoContext';
import {
  Shield,
  Trash2,
  Plus,
  ArrowLeft,
  Recycle,
  Building,
  ShoppingBag,
  Utensils,
  HardHat,
  MessageSquare,
  Truck,
  Activity,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  MapPin,
  Tag,
  Clock,
  Radio,
  Download,
  Flame,
} from 'lucide-react';

export const AdminSuiteView: React.FC = () => {
  const {
    role,
    setRole,
    setActiveTab,
    wasteReports,
    civicReports,
    marketItems,
    surplusFoodListings,
    communityProjects,
    socialPosts,
    industryDemands,
    cleanupOperations,
    activityFeed,
    deleteWasteReport,
    deleteCivicReport,
    deleteMarketItem,
    deleteSurplusFoodListing,
    deleteCommunityProject,
    deleteSocialPost,
    deleteIndustryDemand,
    deleteCleanupOperation,
    deleteActivityFeedItem,
    purgeSectionData,
    reportWaste,
    reportCivicIssue,
    listMarketItem,
    listSurplusFood,
    createCommunityProject,
    createSocialPost,
    addToast,
  } = useEco();

  const [activeSection, setActiveSection] = useState<string>('waste-reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmPurgeSection, setConfirmPurgeSection] = useState<string | null>(null);

  // Forms State for Adding Data in any section
  // 1. Waste Report Form
  const [wTitle, setWTitle] = useState('');
  const [wLocation, setWLocation] = useState('Block B, North Gate');
  const [wQuantityKg, setWQuantityKg] = useState<number>(15);
  const [wSeverity, setWSeverity] = useState<'Low' | 'Medium' | 'High'>('High');

  // 2. Civic Issue Form
  const [cTitle, setCTitle] = useState('');
  const [cCategory, setCCategory] = useState<'Illegal Dumping' | 'Water Leakage' | 'Garbage Accumulation' | 'Polluted Water' | 'Plastic Waste'>('Illegal Dumping');
  const [cLocation, setCLocation] = useState('Central Campus Boulevard');
  const [cAuthority, setCAuthority] = useState('Indore Municipal Sanitation Division');

  // 3. Market Item Form
  const [mTitle, setMTitle] = useState('');
  const [mCategory, setMCategory] = useState<'E-Waste' | 'Plastic' | 'Metal' | 'Paper' | 'Electronics' | 'Furniture' | 'Reusable Items'>('E-Waste');
  const [mPriceInr, setMPriceInr] = useState<number>(850);
  const [mQuantity, setMQuantity] = useState('15 kg');
  const [mCondition, setMCondition] = useState<'Good' | 'Fair' | 'Like New' | 'Raw Waste'>('Good');
  const [mDescription, setMDescription] = useState('Verified upcycled item approved by admin.');

  // 4. Surplus Food Form
  const [fFoodName, setFFoodName] = useState('');
  const [fRestaurantName, setFRestaurantName] = useState('Campus Central Dining Hall');
  const [fServings, setFServings] = useState<number>(20);
  const [fDiscountedPrice, setFDiscountedPrice] = useState<number>(40);
  const [fOriginalPrice, setFOriginalPrice] = useState<number>(120);
  const [fPickupWindow, setFPickupWindow] = useState('06:00 PM - 08:30 PM');
  const [fLocation, setFLocation] = useState('Main Cafeteria Counter 3');

  // 5. Community Project Form
  const [pTitle, setPTitle] = useState('');
  const [pDescription, setPDescription] = useState('');
  const [pTargetGoal, setPTargetGoal] = useState<number>(300);
  const [pTargetUnit, setPTargetUnit] = useState('Plastic Bottles');

  // 6. Social Feed Announcement Form
  const [sContent, setSContent] = useState('');
  const [sImpactBadge, setSImpactBadge] = useState('Official Admin Broadcast');
  const [sPointsEarned, setSPointsEarned] = useState<number>(50);

  // 7. Industry Demand Form
  const [iCompany, setICompany] = useState('Central MP Recyclers Ltd');
  const [iMaterial, setIMaterial] = useState('HDPE Plastic Drums & Containers');
  const [iQuantity, setIQuantity] = useState('500 kg');
  const [iPricePerKg, setIPricePerKg] = useState<number>(34);

  const sectionsList = [
    { key: 'waste-reports', label: 'Waste Reports', icon: Recycle, count: wasteReports.length, color: 'text-[#00FF66]' },
    { key: 'civic-reports', label: 'Civic Issues', icon: Building, count: civicReports.length, color: 'text-[#FF007A]' },
    { key: 'market-items', label: 'EcoMarket', icon: ShoppingBag, count: marketItems.length, color: 'text-[#03E5B7]' },
    { key: 'surplus-food', label: 'Surplus Food', icon: Utensils, count: surplusFoodListings.length, color: 'text-[#FFC700]' },
    { key: 'community-projects', label: 'Guild Projects', icon: HardHat, count: communityProjects.length, color: 'text-[#A855F7]' },
    { key: 'social-posts', label: 'Social Feed', icon: MessageSquare, count: socialPosts.length, color: 'text-[#38BDF8]' },
    { key: 'industry-demands', label: 'Industry Demands', icon: FactoryIcon, count: industryDemands.length, color: 'text-[#F97316]' },
    { key: 'cleanup-ops', label: 'Cleanup Squads', icon: Truck, count: cleanupOperations.length, color: 'text-[#EC4899]' },
    { key: 'activity-feed', label: 'Activity Logs', icon: Activity, count: activityFeed.length, color: 'text-[#10B981]' },
  ];

  function FactoryIcon(props: any) {
    return (
      <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  }

  const handleReturnToCitizen = () => {
    setRole('student');
    setActiveTab('overview');
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeSection === 'waste-reports') {
      if (!wTitle.trim()) return;
      reportWaste({
        title: `[ADMIN VERIFIED] ${wTitle}`,
        location: wLocation,
        estimatedQuantityKg: wQuantityKg,
        severity: wSeverity,
        status: 'AI Verified',
        imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600',
      });
      setWTitle('');
      addToast('Admin: New Waste Site posted! Visible across all citizen accounts.', 'success');
    } else if (activeSection === 'civic-reports') {
      if (!cTitle.trim()) return;
      reportCivicIssue({
        title: `[OFFICIAL NOTICE] ${cTitle}`,
        category: cCategory,
        location: cLocation,
        authorityTag: cAuthority,
        status: 'Assigned',
      });
      setCTitle('');
      addToast('Admin: Official Civic Issue posted to citizen tracker.', 'success');
    } else if (activeSection === 'market-items') {
      if (!mTitle.trim()) return;
      listMarketItem({
        title: `[ADMIN VERIFIED] ${mTitle}`,
        category: mCategory,
        priceInr: mPriceInr,
        quantity: mQuantity,
        condition: mCondition,
        description: mDescription,
        location: 'Indore Central Hub',
        imageUrl: 'https://images.unsplash.com/photo-1605557202138-097824c3fdb2?auto=format&fit=crop&q=80&w=600',
      });
      setMTitle('');
      addToast('Admin: New item published to EcoMarket.', 'success');
    } else if (activeSection === 'surplus-food') {
      if (!fFoodName.trim()) return;
      listSurplusFood({
        foodName: `[ADMIN SURPLUS] ${fFoodName}`,
        restaurantName: fRestaurantName,
        availableServings: fServings,
        discountedPriceInr: fDiscountedPrice,
        originalPriceInr: fOriginalPrice,
        pickupWindow: fPickupWindow,
        location: fLocation,
        status: 'Available',
        bestBeforeInfo: 'Freshly prepared — Safety Inspected',
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      });
      setFFoodName('');
      addToast('Admin: Emergency Surplus Food Batch published.', 'success');
    } else if (activeSection === 'community-projects') {
      if (!pTitle.trim()) return;
      createCommunityProject({
        title: `[CAMPUS MISSION] ${pTitle}`,
        description: pDescription || 'Official campus sustainability initiative.',
        materialsTarget: pTargetGoal,
        materialsUnit: pTargetUnit,
        materialsCurrent: 0,
        progressPercentage: 0,
        creatorName: 'Thakre (Apex Admin)',
        creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      });
      setPTitle('');
      setPDescription('');
      addToast('Admin: New Campus Guild Project launched.', 'success');
    } else if (activeSection === 'social-posts') {
      if (!sContent.trim()) return;
      createSocialPost({
        content: `📢 [OFFICIAL ADMIN BROADCAST]: ${sContent}`,
        authorName: 'Thakre (Apex Admin)',
        authorBadge: 'Apex Administrator',
        locationTag: 'Indore Central Command',
        postType: 'Achievement',
        impactBadge: sImpactBadge,
        pointsEarned: sPointsEarned,
      });
      setSContent('');
      addToast('Admin: Broadcast announcement posted to live feed.', 'success');
    }

    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-mono select-none animate-in fade-in duration-300 pb-16">
      {/* Top Header Control Suite */}
      <div className="bg-[#07080E] border-2 border-[#FF007A] rounded-3xl p-6 shadow-[0_0_50px_rgba(255,0,122,0.25)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 glow-pink">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <button
              onClick={handleReturnToCitizen}
              className="px-3 py-1.5 rounded-xl bg-[#0D0F17] hover:bg-[#1D2133] border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← RETURN TO CITIZEN ARENA</span>
            </button>
            <span className="px-2.5 py-1 rounded-full bg-[#FF007A]/20 border border-[#FF007A]/50 text-[#FF007A] text-[10px] font-black">
              APEX ADMIN ROOM
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide">
            ECO-SMART ADMIN CONTROL SUITE
          </h1>
          <p className="text-xs text-slate-400">
            Authenticated as <strong className="text-[#00FF66]">thakrethe@gmail.com</strong> • Debarred Status: <strong className="text-red-400">0 Pts (Host Auditor)</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF007A] via-[#FFC700] to-[#03E5B7] text-[#07080E] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_25px_rgba(3,229,183,0.4)] flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#07080E]" />
            <span>+ ADD NEW DATA IN THIS SECTION</span>
          </button>
        </div>
      </div>

      {/* Top Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">WASTE</span>
          <div className="text-lg font-black text-[#00FF66]">{wasteReports.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">CIVIC</span>
          <div className="text-lg font-black text-[#FF007A]">{civicReports.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">MARKET</span>
          <div className="text-lg font-black text-[#03E5B7]">{marketItems.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">FOOD</span>
          <div className="text-lg font-black text-[#FFC700]">{surplusFoodListings.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">GUILD</span>
          <div className="text-lg font-black text-[#A855F7]">{communityProjects.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">POSTS</span>
          <div className="text-lg font-black text-[#38BDF8]">{socialPosts.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">INDUSTRY</span>
          <div className="text-lg font-black text-[#F97316]">{industryDemands.length}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 text-center space-y-1">
          <span className="text-[9px] text-slate-400">CLEANUP</span>
          <div className="text-lg font-black text-[#EC4899]">{cleanupOperations.length}</div>
        </div>
      </div>

      {/* Main Section Navigation Bar */}
      <div className="bg-[#0D0F17] border border-[#1D2133] rounded-3xl p-5 space-y-5">
        <div className="flex flex-wrap gap-2.5">
          {sectionsList.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.key;
            return (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#FF007A] text-white shadow-xl glow-pink scale-105'
                    : 'bg-[#07080E] border border-[#1D2133] text-slate-300 hover:border-[#FF007A]/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : sec.color}`} />
                <span>{sec.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-black/40 text-white' : 'bg-[#1D2133] text-slate-400'
                }`}>
                  {sec.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search + Add + Purge Section Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#1D2133]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder={`Search in ${activeSection.replace('-', ' ')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-[#FF007A]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#03E5B7] hover:bg-[#03E5B7]/90 text-[#07080E] rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md glow-teal"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Entry</span>
            </button>
            <button
              onClick={() => setConfirmPurgeSection(activeSection)}
              className="flex-1 sm:flex-none px-4 py-2 bg-red-950/60 hover:bg-red-900 border border-red-500/60 text-red-400 hover:text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>PURGE SECTION</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION CONTENT LIST */}
      <div className="space-y-4">
        {/* 1. WASTE REPORTS SECTION */}
        {activeSection === 'waste-reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wasteReports
              .filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.location.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#00FF66]">{item.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FF007A]/20 text-[#FF007A] border border-[#FF007A]/40">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">📍 {item.location} • {item.estimatedQuantityKg} kg</p>
                    <p className="text-[11px] text-slate-500">Reported by: {item.reportedBy} ({item.timestamp})</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Points: +{item.pointsAwarded} XP</span>
                    <button
                      onClick={() => deleteWasteReport(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            {wasteReports.length === 0 && (
              <div className="col-span-3 p-12 text-center bg-[#0D0F17] rounded-2xl text-slate-500 text-xs">
                No waste reports. Click "+ ADD NEW DATA" to post one.
              </div>
            )}
          </div>
        )}

        {/* 2. CIVIC REPORTS SECTION */}
        {activeSection === 'civic-reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {civicReports
              .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#FF007A]">{item.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">📍 {item.location} • {item.category}</p>
                    <p className="text-[11px] text-slate-500">Route: {item.authorityTag}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteCivicReport(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            {civicReports.length === 0 && (
              <div className="col-span-3 p-12 text-center bg-[#0D0F17] rounded-2xl text-slate-500 text-xs">
                No civic issues logged.
              </div>
            )}
          </div>
        )}

        {/* 3. ECOMARKET ITEMS SECTION */}
        {activeSection === 'market-items' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketItems
              .filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.sellerName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#03E5B7]">{item.id}</span>
                      <span className="font-bold text-[#FFC700]">₹{item.priceInr}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.description}</p>
                    <p className="text-[11px] text-slate-500">Seller: {item.sellerName} • {item.quantity}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteMarketItem(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 4. SURPLUS FOOD LISTINGS */}
        {activeSection === 'surplus-food' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surplusFoodListings
              .filter((f) => f.foodName.toLowerCase().includes(searchQuery.toLowerCase()) || f.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#FFC700]">{item.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{item.foodName}</h3>
                    <p className="text-xs text-slate-400">📍 {item.location} • {item.availableServings} Servings</p>
                    <p className="text-[11px] text-slate-500">Partner: {item.restaurantName} (₹{item.discountedPriceInr})</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteSurplusFoodListing(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 5. COMMUNITY PROJECTS SECTION */}
        {activeSection === 'community-projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityProjects
              .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.creatorName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#A855F7]">{item.id}</span>
                      <span className="text-[10px] text-slate-400">{item.studentsJoined} members</span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                    <p className="text-xs text-slate-400">{item.description}</p>
                    <p className="text-[11px] text-slate-500">Lead: {item.creatorName} • Target: {item.materialsTarget} {item.materialsUnit}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteCommunityProject(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 6. SOCIAL FEED POSTS */}
        {activeSection === 'social-posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialPosts
              .filter((p) => p.content.toLowerCase().includes(searchQuery.toLowerCase()) || p.authorName.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#38BDF8]">{item.authorName}</span>
                      <span className="text-[10px] text-slate-500">{item.locationTag}</span>
                    </div>
                    <p className="text-xs text-white leading-relaxed">{item.content}</p>
                    <div className="text-[10px] text-slate-400">❤️ {item.likesCount} Likes • 💬 {item.comments?.length || 0} Comments</div>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteSocialPost(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Post</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 7. INDUSTRY DEMANDS */}
        {activeSection === 'industry-demands' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryDemands
              .filter((d) => d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || d.materialNeeded.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((item) => (
                <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#F97316]">{item.id}</span>
                      <span className="font-bold text-[#00FF66]">₹{item.offerPricePerKgInr}/kg</span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{item.companyName}</h3>
                    <p className="text-xs text-slate-400">Material: {item.materialNeeded} • {item.requiredQuantity}</p>
                  </div>

                  <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                    <button
                      onClick={() => deleteIndustryDemand(item.id)}
                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* 8. CLEANUP OPS */}
        {activeSection === 'cleanup-ops' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cleanupOperations.map((item) => (
              <div key={item.id} className="bg-[#0D0F17] border border-[#1D2133] rounded-2xl p-5 space-y-3 hover:border-slate-700 transition flex flex-col justify-between shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#EC4899]">{item.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EC4899]/20 text-[#EC4899]">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white">Location: {item.location}</h3>
                  <p className="text-xs text-slate-400">Squad: {item.assignedTeam} • Priority: {item.priority}</p>
                </div>

                <div className="pt-3 border-t border-[#1D2133] flex items-center justify-end">
                  <button
                    onClick={() => deleteCleanupOperation(item.id)}
                    className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 9. ACTIVITY FEED */}
        {activeSection === 'activity-feed' && (
          <div className="space-y-3">
            {activityFeed.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#0D0F17] border border-slate-800 flex justify-between items-center text-xs hover:border-[#FF007A]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-500 w-16 flex-shrink-0">
                    {item.timestamp}
                  </span>
                  <span className="text-slate-200">
                    <strong className="text-white font-bold">{item.userOrOrg}</strong> {item.actionText}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteActivityFeedItem(item.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition"
                    title="Delete log"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD DATA MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95">
          <form
            onSubmit={handleAddSubmit}
            className="bg-[#0D0F17] border-2 border-[#03E5B7] rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-[0_0_50px_rgba(3,229,183,0.3)] max-h-[90vh] overflow-y-auto glow-teal relative"
          >
            <div className="flex items-center justify-between border-b border-[#1D2133] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#03E5B7] uppercase tracking-wider">
                  ADMIN BROADCAST & DATA ENTRY
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  Add New {sectionsList.find(s => s.key === activeSection)?.label}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5 text-[#FF007A]" />
              </button>
            </div>

            {/* Waste Report Form Fields */}
            {activeSection === 'waste-reports' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Waste Site Title</label>
                  <input
                    type="text"
                    required
                    value={wTitle}
                    onChange={(e) => setWTitle(e.target.value)}
                    placeholder="e.g. South Gate Scrap Pile"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Location</label>
                    <input
                      type="text"
                      value={wLocation}
                      onChange={(e) => setWLocation(e.target.value)}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Est. Kg</label>
                    <input
                      type="number"
                      value={wQuantityKg}
                      onChange={(e) => setWQuantityKg(Number(e.target.value))}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Civic Issues Form Fields */}
            {activeSection === 'civic-reports' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Issue Title</label>
                  <input
                    type="text"
                    required
                    value={cTitle}
                    onChange={(e) => setCTitle(e.target.value)}
                    placeholder="e.g. Uncollected Garbage Heap near Canteen"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Category</label>
                    <select
                      value={cCategory}
                      onChange={(e) => setCCategory(e.target.value as any)}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
                    >
                      <option value="Illegal Dumping">Illegal Dumping</option>
                      <option value="Water Leakage">Water Leakage</option>
                      <option value="Garbage Accumulation">Garbage Accumulation</option>
                      <option value="Polluted Water">Polluted Water</option>
                      <option value="Plastic Waste">Plastic Waste</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Location</label>
                    <input
                      type="text"
                      value={cLocation}
                      onChange={(e) => setCLocation(e.target.value)}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF007A]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EcoMarket Form Fields */}
            {activeSection === 'market-items' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Product Title</label>
                  <input
                    type="text"
                    required
                    value={mTitle}
                    onChange={(e) => setMTitle(e.target.value)}
                    placeholder="e.g. Heavy Duty Upcycled Copper Coil Spool"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Price (₹)</label>
                    <input
                      type="number"
                      value={mPriceInr}
                      onChange={(e) => setMPriceInr(Number(e.target.value))}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Quantity</label>
                    <input
                      type="text"
                      value={mQuantity}
                      onChange={(e) => setMQuantity(e.target.value)}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#03E5B7]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Surplus Food Form Fields */}
            {activeSection === 'surplus-food' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Food Item Name</label>
                  <input
                    type="text"
                    required
                    value={fFoodName}
                    onChange={(e) => setFFoodName(e.target.value)}
                    placeholder="e.g. 50x Fresh Vegetable Biryani Packets"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC700]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Servings Available</label>
                    <input
                      type="number"
                      value={fServings}
                      onChange={(e) => setFServings(Number(e.target.value))}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC700]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-300 font-bold">Discounted Price (₹)</label>
                    <input
                      type="number"
                      value={fDiscountedPrice}
                      onChange={(e) => setFDiscountedPrice(Number(e.target.value))}
                      className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFC700]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Community Projects Form Fields */}
            {activeSection === 'community-projects' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Project Title</label>
                  <input
                    type="text"
                    required
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder="e.g. Solar Upcycled E-Waste Charging Tree"
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Description & Scope</label>
                  <textarea
                    rows={2}
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    placeholder="Describe materials needed and community goal..."
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>
            )}

            {/* Social Feed Form Fields */}
            {activeSection === 'social-posts' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-bold">Broadcast Announcement Message</label>
                  <textarea
                    rows={3}
                    required
                    value={sContent}
                    onChange={(e) => setSContent(e.target.value)}
                    placeholder="Write an announcement visible to all contestants..."
                    className="w-full bg-[#07080E] border border-[#1D2133] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF007A] via-[#FFC700] to-[#03E5B7] text-[#07080E] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(3,229,183,0.3)]"
              >
                PUBLISH DIRECTLY TO ECO-SMART ARENA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONFIRMATION PURGE MODAL */}
      {confirmPurgeSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#0D0F17] border border-red-500/60 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <h3 className="font-black text-base text-white">CONFIRM SECTION-WIDE DATA PURGE</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete all user-submitted entries in <strong className="text-white font-bold">{confirmPurgeSection.toUpperCase()}</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmPurgeSection(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  purgeSectionData(confirmPurgeSection);
                  setConfirmPurgeSection(null);
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition shadow-lg flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>CONFIRM PURGE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
