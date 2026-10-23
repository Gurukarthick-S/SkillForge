
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";

const skills = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Learn HTML, CSS, JavaScript and modern frameworks like React.",
    icon: "</>",
    color: "green",
    technologies: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description:
      "Master Node.js, Express, databases and build scalable APIs.",
    icon: "▤",
    color: "blue",
    technologies: ["Node.js", "Express", "MongoDB", "SQL"],
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "Get complete skills for both frontend and backend development.",
    icon: "◈",
    color: "purple",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
];

const colors = {
  green: {
    icon: "bg-emerald-100 text-emerald-600",
    selected: "border-emerald-500 ring-1 ring-emerald-500",
  },
  blue: {
    icon: "bg-blue-100 text-blue-600",
    selected: "border-blue-500 ring-1 ring-blue-500",
  },
  purple: {
    icon: "bg-purple-100 text-purple-600",
    selected: "border-purple-500 ring-1 ring-purple-500",
  },
};

export default function ChooseSkill() {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState("frontend");

  function handleSkillClick(skillId) {
    setSelectedSkill(skillId);
    navigate(`/dashboard/learning-plan?path=${skillId}`);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Dashboard Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen px-6 py-8 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Page heading */}
          <h1 className="text-2xl font-bold tracking-tight">
            Choose a Skill
          </h1>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Select a skill you want to learn. We'll create a personalized
            learning path with resources, projects and milestones to help
            you grow.
          </p>

          {/* Skill cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            {skills.map((skill) => {
              const isSelected = selectedSkill === skill.id;
              const style = colors[skill.color];

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSkillClick(skill.id)}
                  aria-pressed={isSelected}
                  className={`flex min-h-40 w-full items-start gap-5 rounded-2xl border bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                    isSelected
                      ? style.selected
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold ${style.icon}`}
                  >
                    {skill.icon}
                  </div>

                  {/* Skill information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-base font-semibold">
                        {skill.title}
                      </h2>

                      <span className="text-xl leading-5 text-slate-600">
                        ›
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {skill.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {skill.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
