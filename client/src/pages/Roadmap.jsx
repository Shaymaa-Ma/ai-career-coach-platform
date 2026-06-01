import React, { useEffect, useState } from "react";

import RoadmapStarterCard from "../components/roadmap/RoadmapStarterCard";
import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import RoadmapWeekSection from "../components/roadmap/RoadmapWeekSection";
import RoadmapCompletedCard from "../components/roadmap/RoadmapCompletedCard";

const API = "http://localhost:5000/api";

const Roadmap = () => {
  const token = localStorage.getItem("token");

  const [roadmap, setRoadmap] = useState(null);
  const [hasResume, setHasResume] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= LOAD =================
  const loadRoadmap = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const latest = await fetch(`${API}/roadmap/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());

      if (latest?.id) {
        const roadmapData = await fetch(`${API}/roadmap/${latest.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json());

        setRoadmap(roadmapData);
        return;
      }

      const resume = await fetch(`${API}/resume/my-resume`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());

      setHasResume(!!resume?.id);
      setRoadmap(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= GENERATE =================
  const generateRoadmap = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/roadmap/generate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data?.roadmapId) return;

      const roadmapData = await fetch(`${API}/roadmap/${data.roadmapId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json());

      setRoadmap(roadmapData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= TOGGLE =================
  const toggleStep = async (stepId, completed) => {
    try {
      if (!token || !roadmap) return;

      await fetch(`${API}/roadmap/step/${stepId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      setRoadmap((prev) => {
        if (!prev) return prev;

        const updatedWeeks = prev.weeks.map((week) => {
          const steps = week.steps.map((s) =>
            s.id === stepId ? { ...s, completed } : s
          );

          return {
            ...week,
            steps,
            completed: steps.every((s) => s.completed),
          };
        });

        const allSteps = updatedWeeks.flatMap((w) => w.steps);
        const progress =
          Math.round(
            (allSteps.filter((s) => s.completed).length / allSteps.length) *
              100
          );

        return {
          ...prev,
          weeks: updatedWeeks,
          progress,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRoadmap();
  }, []);

  // ================= NOT LOGGED IN =================
  if (!token) {
    return (
      <RoadmapStarterCard
        onStart={() => (window.location.href = "/upload")}
        loading={false}
        hasResume={false}
      />
    );
  }

  // ================= STARTER (NO RESUME OR NO ROADMAP) =================
  if (!roadmap) {
    return (
      <RoadmapStarterCard
        onStart={generateRoadmap}
        loading={loading}
        hasResume={hasResume}
      />
    );
  }

  // ================= UI =================
  const allSteps = roadmap.weeks?.flatMap((w) => w.steps) || [];
  const progress = roadmap.progress || 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">

        <RoadmapHeader
          roadmap={roadmap}
          progress={progress}
          weeks={roadmap.weeks?.length || 0}
          tasks={allSteps.length}
        />

        <div className="space-y-6 mt-8">
          {roadmap.weeks?.map((week, i) => (
            <RoadmapWeekSection
              key={week.id || i}
              week={{ ...week, week_number: i + 1 }}
              onToggleStep={toggleStep}
            />
          ))}
        </div>

        {progress === 100 && (
          <RoadmapCompletedCard onRegenerate={generateRoadmap} />
        )}

      </div>
    </div>
  );
};

export default Roadmap;