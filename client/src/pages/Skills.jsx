
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  TrendingUp,
  Sparkles,
  Loader2,
} from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import DashboardSidebar from "../components/layout/DashboardSidebar.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const CATEGORY_COLORS = {
  Frontend: "#10B981",
  Backend: "#3B82F6",
  Database: "#A855F7",
  Tools: "#F59E0B",
  "Soft Skills": "#14B8A6",
  Programming: "#6366F1",
};

const TABS = [
  { key: "all", label: "All Skills" },
  { key: "Technical", label: "Technical" },
  { key: "Soft Skills", label: "Soft Skills" },
  { key: "Tools", label: "Tools" },
];

const CATEGORY_OPTIONS = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Programming",
  "Soft Skills",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

const DEFAULT_STATS = {
  topCategory: "-",
  topCategoryCount: 0,
  inDemandCount: 0,
};

function normalizeSkill(skill) {
  return {
    ...skill,
    id: skill._id || skill.id,
    name: skill.skillName || skill.name || "",
    group: skill.category || skill.group || "Other",
    level: skill.level || "Beginner",
  };
}

function countByTab(skills, key) {
  if (key === "all") return skills.length;

  if (key === "Technical") {
    return skills.filter(
      (skill) =>
        !["Soft Skills", "Tools"].includes(skill.group)
    ).length;
  }

  return skills.filter((skill) => skill.group === key).length;
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please log in to access your skills.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    throw new Error(
      "Your session is invalid or expired. Please log in again."
    );
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const data = await response.json();
      message = data.message || data.error || message;
    } catch {
      // Use the default message if the response isn't JSON.
    }

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}

function unwrapSkillsResponse(data) {
  const rawSkills = Array.isArray(data)
    ? data
    : Array.isArray(data.skills)
      ? data.skills
      : Array.isArray(data.data)
        ? data.data
        : [];

  const skills = rawSkills.map(normalizeSkill);

  const categoryCounts = {};

  skills.forEach((skill) => {
    categoryCounts[skill.group] =
      (categoryCounts[skill.group] || 0) + 1;
  });

  const topCategory =
    Object.entries(categoryCounts).sort(
      (a, b) => b[1] - a[1]
    )[0] || [];

  const categories = Object.entries(categoryCounts).map(
    ([category, value]) => ({
      name: category,
      value,
      color: CATEGORY_COLORS[category] || "#9CA3AF",
    })
  );

  return {
    skills,
    stats: {
      topCategory: topCategory[0] || "-",
      topCategoryCount: topCategory[1] || 0,
      inDemandCount: data.stats?.inDemandCount || 0,
    },
    categories,
    topInDemand: Array.isArray(data.topInDemand)
      ? data.topInDemand
      : [],
    suggestions: Array.isArray(data.suggestions)
      ? data.suggestions
      : [],
  };
}

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [topInDemand, setTopInDemand] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("Name (A-Z)");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [addError, setAddError] = useState(null);
  const [adding, setAdding] = useState(false);

  const fetchSkills = useCallback(async () => {
    const data = await apiRequest("/skills");
    return unwrapSkillsResponse(data);
  }, []);

  const loadSkills = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSkills();

      setSkills(data.skills);
      setStats(data.stats);
      setCategoryBreakdown(data.categories);
      setTopInDemand(data.topInDemand);
      setSuggestions(data.suggestions);
    } catch (err) {
      setError(err.message || "Failed to load skills.");
    } finally {
      setLoading(false);
    }
  }, [fetchSkills]);

  useEffect(() => {
    let cancelled = false;

    async function initializeSkills() {
      try {
        const data = await fetchSkills();

        if (cancelled) return;

        setSkills(data.skills);
        setStats(data.stats);
        setCategoryBreakdown(data.categories);
        setTopInDemand(data.topInDemand);
        setSuggestions(data.suggestions);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load skills.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initializeSkills();

    return () => {
      cancelled = true;
    };
  }, [fetchSkills]);

  const totalSkills = skills.length;

  const filtered = useMemo(() => {
    let list =
      activeTab === "all"
        ? skills
        : skills.filter((skill) => {
            if (activeTab === "Technical") {
              return !["Soft Skills", "Tools"].includes(skill.group);
            }

            return skill.group === activeTab;
          });

    list = [...list];

    if (sortBy === "Name (A-Z)") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === "Recently Added") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [skills, activeTab, sortBy]);

  const visible = showAll ? filtered : filtered.slice(0, 8);

  async function handleDelete(id) {
    if (!id) {
      setError("Cannot delete this skill because its ID is missing.");
      return;
    }

    const previousSkills = skills;

    setSavingId(id);
    setError(null);
    setSkills((current) =>
      current.filter((skill) => skill.id !== id)
    );

    try {
      await apiRequest(`/skills/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      setSkills(previousSkills);
      setError(err.message || "Failed to delete skill.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleAddSkill() {
    if (!name.trim() || !category) {
      setAddError("Please enter a skill name and choose a category.");
      return;
    }

    setAdding(true);
    setAddError(null);

    try {
      const response = await apiRequest("/skills", {
        method: "POST",
        body: JSON.stringify({
          skillName: name.trim(),
          category,
          level,
        }),
      });

      const rawSkill =
        response.skill || response.data || response;

      const created = normalizeSkill(rawSkill);

      setSkills((current) => [created, ...current]);
      setName("");
      setCategory("");
      setLevel("Beginner");

      await loadSkills();
    } catch (err) {
      setAddError(err.message || "Failed to add skill.");
    } finally {
      setAdding(false);
    }
  }

  async function handleAddSuggestion(suggestion) {
    const suggestionName =
      suggestion.skillName || suggestion.name || "";

    if (!suggestionName.trim()) {
      setError("The suggested skill has no name.");
      return;
    }

    if (
      skills.some(
        (skill) =>
          skill.name.toLowerCase() ===
          suggestionName.toLowerCase()
      )
    ) {
      setError("This skill is already in your list.");
      return;
    }

    try {
      const response = await apiRequest("/skills", {
        method: "POST",
        body: JSON.stringify({
          skillName: suggestionName,
          category: suggestion.category || "Tools",
          level: "Beginner",
        }),
      });

      const rawSkill =
        response.skill || response.data || response;

      const created = normalizeSkill(rawSkill);

      setSkills((current) => [created, ...current]);

      setSuggestions((current) =>
        current.filter((item) => item !== suggestion)
      );

      await loadSkills();
    } catch (err) {
      setError(err.message || "Failed to add suggested skill.");
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <DashboardSidebar />

      <div className="min-h-screen p-8 pl-[calc(268px+32px)] font-sans text-[#111827]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              My Skills
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add, manage, and track your skills to improve your
              profile and job matches.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document.getElementById("skill-name-input")?.focus()
            }
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <Plus size={16} />
            Add New Skill
          </button>
        </div>

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={loadSkills}
              className="shrink-0 font-medium underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex h-64 items-center justify-center text-gray-400">
            <Loader2 size={22} className="mr-2 animate-spin" />
            Loading your skills…
          </div>
        ) : (
          <>
            {/* Summary cards — no percentages */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                iconBg="#D1FAE5"
                icon={<span className="text-emerald-600">{"</>"}</span>}
                label="Total Skills"
                value={totalSkills}
                sub="Across all categories"
              />

              <StatCard
                iconBg="#DBEAFE"
                icon={<TrendingUp size={18} className="text-blue-600" />}
                label="Top Skill Category"
                value={stats.topCategory}
                sub={`${stats.topCategoryCount} skills`}
              />

              <StatCard
                iconBg="#FEF3C7"
                icon={<TrendingUp size={18} className="text-amber-600" />}
                label="In Demand Skills"
                value={stats.inDemandCount}
                sub="High market demand"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              {/* Skills list */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold">
                  Your Skills
                </h2>

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {TABS.map((tab) => (
                      <button
                        type="button"
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          activeTab === tab.key
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {tab.label} ({countByTab(skills, tab.key)})
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Name (A-Z)</option>
                      <option>Recently Added</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {visible.map((skill) => (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      deleting={savingId === skill.id}
                      onDelete={() => handleDelete(skill.id)}
                    />
                  ))}

                  {visible.length === 0 && (
                    <p className="py-8 text-center text-sm text-gray-400">
                      No skills in this category yet.
                    </p>
                  )}
                </div>

                {filtered.length > 8 && (
                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAll((value) => !value)}
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      {showAll ? "Show Less" : "Show More"}

                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          showAll ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h3 className="mb-4 flex items-center gap-1.5 text-base font-semibold">
                      <Sparkles size={16} className="text-emerald-500" />
                      Suggestions for You
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={suggestion.id || suggestion._id || index}
                          className="rounded-xl border border-gray-100 p-4"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                              {String(
                                suggestion.skillName || suggestion.name || ""
                              )
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>

                            <span className="text-sm font-semibold">
                              {suggestion.skillName || suggestion.name}
                            </span>
                          </div>

                          <p className="mb-3 text-xs leading-snug text-gray-500">
                            {suggestion.note || "Recommended skill to learn."}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleAddSuggestion(suggestion)}
                            className="w-full rounded-lg border border-emerald-600 py-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
                          >
                            Add Skill
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                {/* Add skill */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold">
                    Add New Skill
                  </h3>

                  <label
                    htmlFor="skill-name-input"
                    className="mb-1 block text-xs font-medium text-gray-500"
                  >
                    Skill Name
                  </label>

                  <input
                    id="skill-name-input"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Python, Project Management"
                    className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <label
                    htmlFor="skill-category"
                    className="mb-1 block text-xs font-medium text-gray-500"
                  >
                    Category
                  </label>

                  <div className="relative mb-4">
                    <select
                      id="skill-category"
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select category</option>

                      {CATEGORY_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>

                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Proficiency Level
                  </label>

                  <div className="mb-2 grid grid-cols-2 gap-2">
                    {LEVELS.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setLevel(item)}
                        className={`rounded-lg py-1.5 text-xs font-medium transition-colors ${
                          level === item
                            ? "bg-emerald-100 text-emerald-700"
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  {addError && (
                    <p className="mb-3 text-xs text-red-600">{addError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    disabled={adding}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {adding && (
                      <Loader2 size={14} className="animate-spin" />
                    )}
                    {adding ? "Adding…" : "Add Skill"}
                  </button>
                </div>

                {/* Category breakdown */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold">
                    Skill Categories
                  </h3>

                  {categoryBreakdown.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No category data yet.
                    </p>
                  ) : (
                    <div className="flex items-center gap-5">
                      <div className="relative h-[140px] w-[140px] shrink-0">
                        <PieChart width={140} height={140}>
                          <Pie
                            data={categoryBreakdown}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={44}
                            outerRadius={66}
                            paddingAngle={2}
                            stroke="none"
                          >
                            {categoryBreakdown.map((entry) => (
                              <Cell
                                key={entry.name}
                                fill={entry.color || "#9CA3AF"}
                              />
                            ))}
                          </Pie>
                        </PieChart>

                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-bold">
                            {totalSkills}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            Total
                          </span>
                        </div>
                      </div>

                      <ul className="flex-1 space-y-2.5">
                        {categoryBreakdown.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="flex items-center gap-2 text-gray-600">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              {item.name}
                            </span>

                            <span className="font-medium text-gray-700">
                              {item.value} skills
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* In-demand skills */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold">
                    Top In-Demand Skills
                  </h3>

                  {topInDemand.length === 0 ? (
                    <p className="text-sm text-gray-400">
                      No data yet.
                    </p>
                  ) : (
                    <ul className="space-y-3.5">
                      {topInDemand.map((item, index) => {
                        const itemName =
                          typeof item === "string" ? item : item.name;

                        return (
                          <li
                            key={itemName || index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="flex items-center gap-2 text-gray-700">
                              <TrendingUp
                                size={14}
                                className="text-emerald-500"
                              />
                              {itemName}
                            </span>

                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                              High Demand
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, iconBg, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-0.5 text-2xl font-semibold">{value}</p>
      <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function SkillRow({ skill, onDelete, deleting }) {
  return (
    <div className="flex items-center gap-4 py-3.5">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
        style={{
          backgroundColor: skill.iconBg || "#E5E7EB",
          color: skill.iconColor || "#374151",
        }}
      >
        {skill.icon || skill.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{skill.name}</p>
        <p className="text-xs text-gray-400">{skill.group}</p>
      </div>

      <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        {skill.level}
      </span>

      <button
        type="button"
        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label={`Edit ${skill.name}`}
        title="Editing is not implemented yet"
        onClick={() =>
          window.alert("Skill editing is not implemented yet.")
        }
      >
        <Pencil size={15} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        aria-label={`Delete ${skill.name}`}
        className="rounded-md p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        {deleting ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Trash2 size={15} />
        )}
      </button>
    </div>
  );
}
