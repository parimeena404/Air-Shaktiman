'use client';

import React from 'react';
import { useEco } from '../../context/EcoContext';

import { OverviewView } from '../views/OverviewView';
import { ReportWasteView } from '../views/ReportWasteView';
import { MyContributionsView } from '../views/MyContributionsView';
import { EcoAiCopilot } from '../ai/EcoAiCopilot';

import { NearbyView } from '../views/NearbyView';
import { RedeemRewardsView } from '../views/RedeemRewardsView';
import { MyRewardsView } from '../views/MyRewardsView';
import { PartnerNetworkView } from '../views/PartnerNetworkView';

import { CommunityFeedView } from '../views/CommunityFeedView';
import { CommunityGroupsView } from '../views/CommunityGroupsView';
import { CommunityProfileView } from '../views/CommunityProfileView';

import { EcoMarketView } from '../views/EcoMarketView';
import { IndustryDemandView } from '../views/IndustryDemandView';
import { MatchingSystemView } from '../views/MatchingSystemView';
import { BuildFromWasteView } from '../views/BuildFromWasteView';
import { CommunityProjectsView } from '../views/CommunityProjectsView';
import { ChallengesView } from '../views/ChallengesView';
import { LeaderboardView } from '../views/LeaderboardView';
import { RewardsView } from '../views/RewardsView';
import { CampusMonitorView } from '../views/CampusMonitorView';
import { EnergyAnalyticsView } from '../views/EnergyAnalyticsView';
import { WaterAnalyticsView } from '../views/WaterAnalyticsView';
import { WasteAnalyticsView } from '../views/WasteAnalyticsView';
import { ImpactDashboardView } from '../views/ImpactDashboardView';

import { EcoFoodView } from '../views/EcoFoodView';
import { EcoFoodPartnerView } from '../views/EcoFoodPartnerView';
import { EcoFoodNgoView } from '../views/EcoFoodNgoView';
import { GovernmentConnectView } from '../views/GovernmentConnectView';
import { CivicReportingView } from '../views/CivicReportingView';
import { AdminOverviewView } from '../views/AdminOverviewView';
import { CleanupOperationsView } from '../views/CleanupOperationsView';
import { MaterialFlowView } from '../views/MaterialFlowView';
import { UserManagementView } from '../views/UserManagementView';

import { CsrHubView } from '../views/csr/CsrHubView';
import { CsrMissionsView } from '../views/csr/CsrMissionsView';
import { CsrProjectsView } from '../views/csr/CsrProjectsView';
import { CsrFundingView } from '../views/csr/CsrFundingView';
import { CsrImpactDashboardView } from '../views/csr/CsrImpactDashboardView';
import { CsrLeaderboardView } from '../views/csr/CsrLeaderboardView';
import { CsrReportsView } from '../views/csr/CsrReportsView';

export const PortalViewRouter: React.FC = () => {
  const { activeTab, role } = useEco();

  // If role is set to Corporate Sponsor and overview is selected, show CSR Hub
  if (role === 'corporate' && activeTab === 'overview') {
    return <CsrHubView />;
  }

  // If role is set to Admin (Front Man) and overview is selected, show Admin Overview
  if (role === 'admin' && activeTab === 'overview') {
    return <AdminOverviewView />;
  }

  // If role is set to Government and overview is selected, show Government Connect
  if (role === 'government' && activeTab === 'overview') {
    return <GovernmentConnectView />;
  }

  switch (activeTab) {
    case 'overview':
      return <OverviewView />;
    case 'report-waste':
      return <ReportWasteView />;
    case 'contributions':
      return <MyContributionsView />;
    case 'eco-ai':
      return <EcoAiCopilot />;

    case 'csr-hub':
      return <CsrHubView />;
    case 'csr-missions':
      return <CsrMissionsView />;
    case 'csr-projects':
      return <CsrProjectsView />;
    case 'csr-funding':
      return <CsrFundingView />;
    case 'csr-impact':
      return <CsrImpactDashboardView />;
    case 'csr-leaderboard':
      return <CsrLeaderboardView />;
    case 'csr-reports':
      return <CsrReportsView />;

    case 'nearby':
      return <NearbyView />;
    case 'redeem-rewards':
      return <RedeemRewardsView />;
    case 'my-rewards':
      return <MyRewardsView />;
    case 'partner-network':
      return <PartnerNetworkView />;

    case 'community-feed':
      return <CommunityFeedView />;
    case 'community-groups':
    case 'community-events':
      return <CommunityGroupsView />;
    case 'community-profile':
      return <CommunityProfileView />;

    case 'market':
      return <EcoMarketView />;
    case 'industry-demand':
      return <IndustryDemandView />;
    case 'matching':
      return <MatchingSystemView />;
    case 'reuse-ideas':
      return <BuildFromWasteView />;
    case 'community-projects':
      return <CommunityProjectsView />;

    case 'ecofood':
      return <EcoFoodView />;
    case 'ecofood-partner':
      return <EcoFoodPartnerView />;
    case 'ecofood-ngo':
      return <EcoFoodNgoView />;

    case 'government-connect':
      return <GovernmentConnectView />;
    case 'civic-reporting':
      return <CivicReportingView />;

    case 'admin-overview':
      return <AdminOverviewView />;
    case 'cleanup-operations':
      return <CleanupOperationsView />;
    case 'material-flow':
      return <MaterialFlowView />;
    case 'user-management':
      return <UserManagementView />;

    case 'challenges':
      return <ChallengesView />;
    case 'leaderboard':
      return <LeaderboardView />;
    case 'rewards':
      return <RewardsView />;

    case 'campus-monitor':
      return <CampusMonitorView />;
    case 'energy':
      return <EnergyAnalyticsView />;
    case 'water':
      return <WaterAnalyticsView />;
    case 'waste-analytics':
      return <WasteAnalyticsView />;
    case 'impact-dashboard':
      return <ImpactDashboardView />;

    default:
      return <OverviewView />;
  }
};
