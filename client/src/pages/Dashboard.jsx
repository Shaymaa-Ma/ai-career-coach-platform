import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import DashboardHero from "../components/dashboard/DashboardHero";
import StatsCards from "../components/dashboard/StatsCards";
import SkillsRadarChart from "../components/dashboard/SkillsRadarChart";
import GapSection from "../components/dashboard/GapSection";
import RecommendationSection from "../components/dashboard/RecommendationSection";
import QuickActions from "../components/dashboard/QuickActions";
import EmptyDashboard from "../components/dashboard/EmptyDashboard";
/*
  DASHBOARD PAGE 
  
  PURPOSE:
  This is the main user dashboard that visualizes all
  AI-generated career insights based on the user's resume.

  FEATURES:
  - Fetches full user analytics from backend
  - Displays skill analysis, gaps, and recommendations
  - Provides quick actions for navigation
  - Handles empty state when no resume is uploaded

  DATA FLOW:
  - Retrieves dashboard data from:
    GET /api/dashboard
  - Uses JWT token from AuthContext for authentication
  - Stores response in `data` state

  STATE MANAGEMENT:
  - loading → controls initial API loading state
  - data → holds full dashboard response object

  CONDITIONS:
  1. Loading State
     - Shows loading screen while fetching data

  2. Empty State
     - If no resume exists (data.hasResume === false)
     - Shows EmptyDashboard component

  3. Main Dashboard
     - Displays full analytics UI

  COMPONENTS USED:
  - DashboardHero → user summary overview
  - StatsCards → key metrics (score, skills, etc.)
  - SkillsRadarChart → visual skill representation
  - GapSection → missing skills analysis
  - RecommendationSection → AI learning suggestions
  - QuickActions → shortcuts (roadmap, interview, etc.)
  - EmptyDashboard → shown when no resume exists

  LAYOUT STRUCTURE:
  - Hero section at top
  - Stats overview cards
  - Two-column grid:
      - Skills radar chart
      - Quick actions
  - Two-column grid:
      - Skill gaps
      - Recommendations

*/

export default function Dashboard() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!data?.hasResume) {
    return <EmptyDashboard />;
  }

 return (
  <div className="min-h-screen bg-black text-white pt-36 md:pt-40 pb-20 px-4 md:px-6">

    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

      <DashboardHero data={data} />

      <StatsCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <SkillsRadarChart skills={data.skills} />
        </div>

        <QuickActions />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <GapSection gaps={data.gaps} />

        <RecommendationSection recommendations={data.recommendations} />

      </div>

    </div>

  </div>
);
}