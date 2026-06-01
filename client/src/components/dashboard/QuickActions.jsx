import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Map, Mic } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { title: "AI Roadmap", desc: "Generate learning roadmap", icon: Map, path: "/roadmap" },
    { title: "AI Coach", desc: "Continue coaching sessions", icon: Brain, path: "/coach" },
    { title: "Interview Prep", desc: "Practice mock interviews", icon: Mic, path: "/interview" }
  ];

  return (
    <section className="bg-black/30 border border-white/10 backdrop-blur-xl rounded-3xl p-6">

      <h2 className="text-xl font-bold mb-4">
        Quick Actions
      </h2>

      <div className="space-y-3">

        {actions.map((action, i) => {
          const Icon = action.icon;

          return (
            <Link
              key={i}
              to={action.path}
              className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                  </div>

                </div>

                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
              </div>
            </Link>
          );
        })}

      </div>
    </section>
  );
}