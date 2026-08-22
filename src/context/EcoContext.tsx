'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  UserRole,
  MainTab,
  UserProfile,
  WasteReport,
  MarketItem,
  IndustryDemand,
  BuildIdea,
  CommunityProject,
  EcoChallenge,
  RewardItem,
  LeaderboardUser,
  CampusTelemetry,
  AIAlert,
  ChatMessage,
  SurplusFoodListing,
  NGORequest,
  CivicReport,
  GovernmentProgram,
  CleanupOperation,
  BusinessPartner,
  ActivityFeedItem,
  NearbyPartner,
  RedeemedVoucher,
  SocialPost,
  EcoClubGroup,
  EcoEvent,
  CsrCompany,
  CsrMission,
  CsrProject,
  CsrReport,
} from '../types';
import {
  initialUserProfile,
  initialWasteReports,
  initialMarketItems,
  initialIndustryDemands,
  initialBuildIdeas,
  initialCommunityProjects,
  initialChallenges,
  initialRewardItems,
  initialLeaderboard,
  initialCampusTelemetry,
  initialAiAlerts,
  initialSurplusFoodListings,
  initialNgoRequests,
  initialCivicReports,
  initialGovernmentPrograms,
  initialCleanupOperations,
  initialBusinessPartners,
  initialActivityFeed,
  initialNearbyPartners,
  initialRedeemedVouchers,
  initialSocialPosts,
  initialEcoClubGroups,
  initialEcoEvents,
  initialCsrCompanies,
  initialCsrMissions,
  initialCsrProjects,
  initialCsrReports,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface EcoContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  profile: UserProfile;
  wasteReports: WasteReport[];
  marketItems: MarketItem[];
  industryDemands: IndustryDemand[];
  buildIdeas: BuildIdea[];
  communityProjects: CommunityProject[];
  challenges: EcoChallenge[];
  rewards: RewardItem[];
  leaderboard: LeaderboardUser[];
  telemetry: CampusTelemetry;
  alerts: AIAlert[];
  chatMessages: ChatMessage[];
  toasts: Toast[];

  // Mobile Navigation Drawer State
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Features State
  surplusFoodListings: SurplusFoodListing[];
  ngoRequests: NGORequest[];
  civicReports: CivicReport[];
  governmentPrograms: GovernmentProgram[];
  cleanupOperations: CleanupOperation[];
  businessPartners: BusinessPartner[];
  activityFeed: ActivityFeedItem[];

  // Nearby, Rewards & Social State
  nearbyPartners: NearbyPartner[];
  selectedPartnerOnMap: NearbyPartner | null;
  redeemedVouchers: RedeemedVoucher[];
  socialPosts: SocialPost[];
  ecoClubGroups: EcoClubGroup[];
  ecoEvents: EcoEvent[];

  // CSR Corporate Impact State
  csrCompanies: CsrCompany[];
  csrMissions: CsrMission[];
  csrProjects: CsrProject[];
  csrReports: CsrReport[];

  // Core Actions
  reportWaste: (report: Partial<WasteReport>) => void;
  verifyWasteReport: (id: string, approve: boolean) => void;
  listMarketItem: (item: Partial<MarketItem>) => void;
  offerMaterialToIndustry: (demandId: string, quantityKg: number) => void;
  joinCommunityProject: (projectId: string) => void;
  donateToProject: (projectId: string, itemLabel: string) => void;
  joinChallenge: (challengeId: string) => void;
  redeemReward: (rewardId: string) => void;
  sendChatMessage: (text: string) => void;
  removeToast: (id: string) => void;
  addToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;

  // Add-On Actions
  reserveSurplusFood: (foodId: string) => void;
  listSurplusFood: (listing: Partial<SurplusFoodListing>) => void;
  offerFoodToNGO: (foodId: string, ngoId: string) => void;
  reportCivicIssue: (issue: Partial<CivicReport>) => void;
  assignCleanup: (operationId: string, teamName: string) => void;
  approveFoodListing: (id: string) => void;
  generateImpactReport: () => void;

  // Map, Rewards & Social Actions
  selectPartnerOnMap: (partnerId: string | null) => void;
  redeemPartnerVoucher: (title: string, businessName: string, pointsCost: number, discountInr: number) => RedeemedVoucher | null;
  toggleLikePost: (postId: string) => void;
  addPostComment: (postId: string, text: string) => void;
  createSocialPost: (post: Partial<SocialPost>) => void;
  toggleFollowUser: () => void;
  joinClubGroup: (clubId: string) => void;
  rsvpEvent: (eventId: string) => void;

  // CSR Corporate Actions
  fundCsrProject: (projectId: string, amountInr: number) => void;
  joinCsrMission: (missionId: string) => void;
}

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export const EcoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<MainTab>('overview');
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [wasteReports, setWasteReports] = useState<WasteReport[]>(initialWasteReports);
  const [marketItems, setMarketItems] = useState<MarketItem[]>(initialMarketItems);
  const [industryDemands] = useState<IndustryDemand[]>(initialIndustryDemands);
  const [buildIdeas] = useState<BuildIdea[]>(initialBuildIdeas);
  const [communityProjects, setCommunityProjects] = useState<CommunityProject[]>(initialCommunityProjects);
  const [challenges, setChallenges] = useState<EcoChallenge[]>(initialChallenges);
  const [rewards, setRewards] = useState<RewardItem[]>(initialRewardItems);
  const [leaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);
  const [telemetry] = useState<CampusTelemetry>(initialCampusTelemetry);
  const [alerts] = useState<AIAlert[]>(initialAiAlerts);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Features State Providers
  const [surplusFoodListings, setSurplusFoodListings] = useState<SurplusFoodListing[]>(initialSurplusFoodListings);
  const [ngoRequests] = useState<NGORequest[]>(initialNgoRequests);
  const [civicReports, setCivicReports] = useState<CivicReport[]>(initialCivicReports);
  const [governmentPrograms] = useState<GovernmentProgram[]>(initialGovernmentPrograms);
  const [cleanupOperations, setCleanupOperations] = useState<CleanupOperation[]>(initialCleanupOperations);
  const [businessPartners] = useState<BusinessPartner[]>(initialBusinessPartners);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(initialActivityFeed);

  // Nearby, Rewards & Social State Providers
  const [nearbyPartners] = useState<NearbyPartner[]>(initialNearbyPartners);
  const [selectedPartnerOnMap, setSelectedPartnerOnMap] = useState<NearbyPartner | null>(initialNearbyPartners[0]);
  const [redeemedVouchers, setRedeemedVouchers] = useState<RedeemedVoucher[]>(initialRedeemedVouchers);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(initialSocialPosts);
  const [ecoClubGroups, setEcoClubGroups] = useState<EcoClubGroup[]>(initialEcoClubGroups);
  const [ecoEvents, setEcoEvents] = useState<EcoEvent[]>(initialEcoEvents);

  // CSR Corporate State Providers
  const [csrCompanies, setCsrCompanies] = useState<CsrCompany[]>(initialCsrCompanies);
  const [csrMissions, setCsrMissions] = useState<CsrMission[]>(initialCsrMissions);
  const [csrProjects, setCsrProjects] = useState<CsrProject[]>(initialCsrProjects);
  const [csrReports, setCsrReports] = useState<CsrReport[]>(initialCsrReports);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'I have 5 old computer wires and two broken keyboards. What can I do with them?',
      timestamp: '10:42 AM',
    },
    {
      id: 'msg-2',
      sender: 'ai',
      text: `I identified copper wire, plastic, and electronic components.

Options available:
1. 💰 Sell on EcoMarket
2. ♻️ Recycle at E-Waste Collection Hub #2 (240m away)
3. 🔨 Craft Cyberpunk Keycap Clock`,
      timestamp: '10:42 AM',
    },
  ]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const reportWaste = (newReport: Partial<WasteReport>) => {
    const report: WasteReport = {
      id: 'RPT-' + Math.floor(1000 + Math.random() * 9000),
      title: newReport.title || 'Reported Waste Site',
      location: newReport.location || 'Block B, North Gate',
      detectedMaterials: newReport.detectedMaterials || ['Plastic', 'Cardboard'],
      estimatedQuantityKg: newReport.estimatedQuantityKg || 12.0,
      severity: newReport.severity || 'High',
      recyclablePercentage: newReport.recyclablePercentage || 78,
      status: 'Reported',
      reportedBy: `${profile.name} (${profile.playerNumber})`,
      timestamp: 'Just now',
      pointsAwarded: 10,
      imageUrl: newReport.imageUrl || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600',
      nearestCollectionPoint: 'Eco Hub #2',
      distanceMeters: 240,
    };

    setWasteReports((prev) => [report, ...prev]);
    setProfile((prev) => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 10,
      sustainabilityScore: prev.sustainabilityScore + 5,
      communityContributions: prev.communityContributions + 1,
    }));

    addToast('🎯 Waste report submitted! +10 Eco Points added.', 'success');
  };

  const verifyWasteReport = (id: string, approve: boolean) => {
    setWasteReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: approve ? 'Cleaned' : 'Rejected' } : r))
    );
    if (approve) {
      setProfile((prev) => ({
        ...prev,
        wasteRecoveredKg: parseFloat((prev.wasteRecoveredKg + 12).toFixed(1)),
        ecoPoints: prev.ecoPoints + 50,
      }));
      addToast(`⚡ Report ${id} verified & cleaned! +50 Eco Points granted.`, 'success');
    }
  };

  const listMarketItem = (item: Partial<MarketItem>) => {
    const newItem: MarketItem = {
      id: 'MKT-' + Math.floor(10 + Math.random() * 90),
      title: item.title || 'Recyclable Material',
      category: item.category || 'E-Waste',
      quantity: item.quantity || '10 kg',
      priceInr: item.priceInr || 1500,
      location: item.location || 'Indore Campus Tech Lab',
      sellerName: `${profile.name} (${profile.playerNumber})`,
      sellerAvatar: profile.avatar,
      condition: item.condition || 'Good',
      imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1605557202138-097824c3fdb2?auto=format&fit=crop&q=80&w=600',
      pickupAvailable: true,
      postedTime: 'Just now',
    };
    setMarketItems((prev) => [newItem, ...prev]);
    addToast('🛒 Published to EcoMarket!', 'success');
  };

  const offerMaterialToIndustry = (demandId: string, quantityKg: number) => {
    const demand = industryDemands.find((d) => d.id === demandId);
    const earned = quantityKg * (demand?.offerPricePerKgInr || 300);
    setProfile((prev) => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 150,
      wasteRecoveredKg: parseFloat((prev.wasteRecoveredKg + quantityKg).toFixed(1)),
    }));
    addToast(`⚡ Material offer dispatched to ${demand?.companyName}! Est payout ₹${earned}. +150 Pts!`, 'success');
  };

  const joinCommunityProject = (projectId: string) => {
    setCommunityProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            studentsJoined: p.studentsJoined + 1,
            recentActivity: [
              { user: `${profile.name} (${profile.playerNumber})`, action: 'joined the team', time: 'Just now' },
              ...p.recentActivity,
            ],
          };
        }
        return p;
      })
    );
    addToast('🤝 You joined the Guild Project team! +25 Eco Points.', 'success');
  };

  const donateToProject = (projectId: string, itemLabel: string) => {
    setCommunityProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newCurrent = Math.min(p.materialsTarget, p.materialsCurrent + 10);
          return {
            ...p,
            materialsCurrent: newCurrent,
            progressPercentage: Math.round((newCurrent / p.materialsTarget) * 100),
          };
        }
        return p;
      })
    );
    setProfile((prev) => ({ ...prev, ecoPoints: prev.ecoPoints + 100 }));
    addToast(`🎁 Donated ${itemLabel}! +100 Eco Points.`, 'success');
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, isJoined: true, participantsCount: c.participantsCount + 1 } : c))
    );
    addToast('🏆 Registered for the Arena Challenge!', 'success');
  };

  const redeemReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) return;

    if (profile.ecoPoints < reward.pointsCost) {
      addToast(`⚠️ Insufficient Eco Points! Need ${reward.pointsCost} pts (you have ${profile.ecoPoints}).`, 'warning');
      return;
    }

    redeemPartnerVoucher(reward.title, reward.businessName || 'Partner', reward.pointsCost, reward.discountInr || 50);
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMsg: ChatMessage = {
      id: 'msg-' + (Date.now() + 1),
      sender: 'ai',
      text: `Analyzed "${text}": Options updated across nearby map & marketplace.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  const reserveSurplusFood = (foodId: string) => {
    setSurplusFoodListings((prev) =>
      prev.map((item) => {
        if (item.id === foodId) {
          const newServings = Math.max(0, item.availableServings - 1);
          return {
            ...item,
            availableServings: newServings,
            status: newServings === 0 ? 'Reserved' : 'Available',
          };
        }
        return item;
      })
    );
    setProfile((prev) => ({ ...prev, ecoPoints: prev.ecoPoints + 10 }));
    addToast('🍱 Meal reserved on EcoFood! +10 Eco Points credited.', 'success');
  };

  const listSurplusFood = (listing: Partial<SurplusFoodListing>) => {
    const newListing: SurplusFoodListing = {
      id: 'FOOD-' + Math.floor(2000 + Math.random() * 800),
      restaurantName: listing.restaurantName || 'Green Café',
      restaurantLogo: listing.restaurantLogo || '🥗',
      foodName: listing.foodName || 'Surplus Meal Box',
      category: listing.category || 'Meals',
      quantityLabel: listing.quantityLabel || '10 kg (20 servings)',
      originalPriceInr: listing.originalPriceInr || 150,
      discountedPriceInr: listing.discountedPriceInr || 69,
      discountPercentage: Math.round(((150 - 69) / 150) * 100),
      pickupWindow: listing.pickupWindow || '7:00 PM – 9:00 PM',
      availableServings: listing.availableServings || 20,
      location: listing.location || 'Central Canteen Complex',
      status: 'Available',
      bestBeforeInfo: listing.bestBeforeInfo || 'Prepared fresh today.',
      imageUrl: listing.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    };

    setSurplusFoodListings((prev) => [newListing, ...prev]);
    addToast(`🍱 Surplus food "${newListing.foodName}" published!`, 'success');
  };

  const offerFoodToNGO = (foodId: string, ngoId: string) => {
    setSurplusFoodListings((prev) => prev.map((f) => (f.id === foodId ? { ...f, status: 'Donated' } : f)));
    addToast('🤝 Food rescue donation dispatched to NGO! +25 Community Points.', 'success');
  };

  const reportCivicIssue = (issue: Partial<CivicReport>) => {
    const newReport: CivicReport = {
      id: 'CIV-' + Math.floor(1000 + Math.random() * 9000),
      title: issue.title || 'Civic Environmental Issue',
      category: issue.category || 'Illegal Dumping',
      location: issue.location || 'Indore Campus Perimeter',
      severity: issue.severity || 'High',
      confirmationsCount: 1,
      status: 'Reported',
      authorityTag: 'Indore Municipal Corporation / ULB',
      reportedTime: 'Just now',
      imageUrl: issue.imageUrl || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600',
    };
    setCivicReports((prev) => [newReport, ...prev]);
    addToast('🏛️ Civic report created! Government reporting integration — Coming Soon.', 'info');
  };

  const assignCleanup = (operationId: string, teamName: string) => {
    setCleanupOperations((prev) =>
      prev.map((op) => (op.id === operationId ? { ...op, assignedTeam: teamName, status: 'Assigned' } : op))
    );
    addToast(`🧹 Operation ${operationId} assigned to team "${teamName}".`, 'success');
  };

  const approveFoodListing = (id: string) => {
    setSurplusFoodListings((prev) => prev.map((f) => (f.id === id ? { ...f, status: 'Available' } : f)));
    addToast(`✅ Food listing ${id} approved.`, 'success');
  };

  const generateImpactReport = () => {
    addToast('📄 Official Impact Report generated & downloaded (PDF summary)!', 'success');
  };

  // --- NEW MAP, REWARDS & SOCIAL ACTIONS ---

  const selectPartnerOnMap = (partnerId: string | null) => {
    if (!partnerId) {
      setSelectedPartnerOnMap(null);
      return;
    }
    const partner = nearbyPartners.find((p) => p.id === partnerId);
    if (partner) {
      setSelectedPartnerOnMap(partner);
    }
  };

  const redeemPartnerVoucher = (
    title: string,
    businessName: string,
    pointsCost: number,
    discountInr: number
  ): RedeemedVoucher | null => {
    if (profile.ecoPoints < pointsCost) {
      addToast(`⚠️ Insufficient Eco Points! Need ${pointsCost} pts (you have ${profile.ecoPoints}).`, 'warning');
      return null;
    }

    const codeChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const randPart = Array.from({ length: 4 }, () => codeChars[Math.floor(Math.random() * codeChars.length)]).join('');
    const voucherCode = `ECO-${randPart}-KP`;

    const newVoucher: RedeemedVoucher = {
      id: 'VOUCH-' + Date.now(),
      voucherCode,
      businessName,
      businessLogo: businessName.includes('Café') ? '☕' : businessName.includes('Mart') ? '🛍️' : '🎁',
      rewardTitle: title,
      discountInr,
      pointsCost,
      redeemedDate: 'Just now',
      expiryDate: '30 Sep 2026',
      status: 'Active',
      qrCodePlaceholder: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${voucherCode}`,
    };

    setProfile((prev) => ({
      ...prev,
      ecoPoints: prev.ecoPoints - pointsCost,
    }));

    setRedeemedVouchers((prev) => [newVoucher, ...prev]);

    addToast(`🎉 Reward "${title}" redeemed! Code ${voucherCode} created.`, 'success');
    return newVoucher;
  };

  const toggleLikePost = (postId: string) => {
    setSocialPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const addPostComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c-' + Date.now(),
      authorName: profile.name,
      authorAvatar: profile.avatar,
      text,
      timestamp: 'Just now',
    };

    setSocialPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
    addToast('💬 Comment posted to Community Feed!', 'success');
  };

  const createSocialPost = (post: Partial<SocialPost>) => {
    const newPost: SocialPost = {
      id: 'POST-' + Date.now(),
      authorName: profile.name,
      authorAvatar: profile.avatar,
      authorBadge: `${profile.level} · Just now`,
      postType: post.postType || 'Contribution',
      timestamp: 'Just now',
      locationTag: post.locationTag || 'SAGE University Campus',
      content: post.content || 'Share something done for the planet!',
      imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600',
      impactBadge: post.impactBadge || 'Verified Action',
      pointsEarned: 50,
      likesCount: 1,
      isLiked: true,
      sharesCount: 0,
      comments: [],
    };

    setSocialPosts((prev) => [newPost, ...prev]);
    setProfile((prev) => ({ ...prev, ecoPoints: prev.ecoPoints + 50 }));
    addToast('📢 Post published to Community Social Feed! +50 Eco Points.', 'success');
  };

  const toggleFollowUser = () => {
    setProfile((prev) => {
      const isFollowing = !prev.isFollowing;
      return {
        ...prev,
        isFollowing,
        followingCount: isFollowing ? prev.followingCount + 1 : prev.followingCount - 1,
      };
    });
    addToast(profile.isFollowing ? 'Unfollowed profile.' : '✨ Following profile! Feed updated.', 'info');
  };

  const joinClubGroup = (clubId: string) => {
    setEcoClubGroups((prev) =>
      prev.map((c) => {
        if (c.id === clubId) {
          const isJoined = !c.isJoined;
          return {
            ...c,
            isJoined,
            membersCount: isJoined ? c.membersCount + 1 : c.membersCount - 1,
          };
        }
        return c;
      })
    );
    addToast('🌱 Joined Eco Club Community!', 'success');
  };

  const rsvpEvent = (eventId: string) => {
    setEcoEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const isJoined = !e.isJoined;
          return {
            ...e,
            isJoined,
            attendingCount: isJoined ? e.attendingCount + 1 : e.attendingCount - 1,
          };
        }
        return e;
      })
    );
    addToast('🎟️ RSVP confirmed for Community Event!', 'success');
  };

  const fundCsrProject = (projectId: string, amountInr: number) => {
    setCsrProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const newCurrent = proj.fundingCurrentInr + amountInr;
          const isFull = newCurrent >= proj.fundingRequiredInr;
          return {
            ...proj,
            fundingCurrentInr: newCurrent,
            status: isFull ? 'FUNDED' : 'ACTIVE',
          };
        }
        return proj;
      })
    );

    setCsrCompanies((prev) =>
      prev.map((comp) => {
        if (comp.id === 'COMP-01') {
          return {
            ...comp,
            allocatedInr: comp.allocatedInr + amountInr,
            remainingInr: Math.max(0, comp.remainingInr - amountInr),
            activeProjects: comp.activeProjects + 1,
            impactScore: Math.min(1000, comp.impactScore + 15),
          };
        }
        return comp;
      })
    );

    addToast(`💰 CSR Funding Confirmed: ₹${amountInr.toLocaleString()} allocated to project! Mission Activated.`, 'success');
  };

  const joinCsrMission = (missionId: string) => {
    setCsrMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const isJoined = !m.isJoined;
          return {
            ...m,
            isJoined,
            playersCount: isJoined ? m.playersCount + 1 : m.playersCount - 1,
          };
        }
        return m;
      })
    );
    setProfile((prev) => ({ ...prev, ecoPoints: prev.ecoPoints + 300 }));
    addToast('🎯 CSR Mission Joined! +300 Eco Points & +500 XP registered to active profile.', 'success');
  };

  return (
    <EcoContext.Provider
      value={{
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        role,
        setRole,
        activeTab,
        setActiveTab,
        profile,
        wasteReports,
        marketItems,
        industryDemands,
        buildIdeas,
        communityProjects,
        challenges,
        rewards,
        leaderboard,
        telemetry,
        alerts,
        chatMessages,
        toasts,
        surplusFoodListings,
        ngoRequests,
        civicReports,
        governmentPrograms,
        cleanupOperations,
        businessPartners,
        activityFeed,
        nearbyPartners,
        selectedPartnerOnMap,
        redeemedVouchers,
        socialPosts,
        ecoClubGroups,
        ecoEvents,
        csrCompanies,
        csrMissions,
        csrProjects,
        csrReports,
        reportWaste,
        verifyWasteReport,
        listMarketItem,
        offerMaterialToIndustry,
        joinCommunityProject,
        donateToProject,
        joinChallenge,
        redeemReward,
        sendChatMessage,
        removeToast,
        addToast,
        reserveSurplusFood,
        listSurplusFood,
        offerFoodToNGO,
        reportCivicIssue,
        assignCleanup,
        approveFoodListing,
        generateImpactReport,
        selectPartnerOnMap,
        redeemPartnerVoucher,
        toggleLikePost,
        addPostComment,
        createSocialPost,
        toggleFollowUser,
        joinClubGroup,
        rsvpEvent,
        fundCsrProject,
        joinCsrMission,
      }}
    >
      {children}
    </EcoContext.Provider>
  );
};


export const useEco = () => {
  const context = useContext(EcoContext);
  if (!context) {
    throw new Error('useEco must be used within an EcoProvider');
  }
  return context;
};
