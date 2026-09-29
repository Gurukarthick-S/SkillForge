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

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "/api";

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) return null;

  return res.json();
}

const CATEGORY_COLORS = {
  Frontend: "#10B981",
  Backend: "#3B82F6",
  Database: "#A855F7",
  Tools: "#F59E0B",
  "Soft Skills": "#14B8A6",
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
];

const LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

const DEFAULT_STATS = {
  topCategory: "-",
  topCategoryCount: 0,
  inDemandCount: 0,
};

function countByTab(skills, key) {
  if (key === "all") return skills.length;

  return skills.filter((skill) => skill.group === key).length;
}

export default function Skills() {
  // ---------------------------------------------------------------------------
  // Data from backend
  // ---------------------------------------------------------------------------

  const [skills, setSkills] = useState([]);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [topInDemand, setTopInDemand] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // ---------------------------------------------------------------------------
  // Loading / error state
  // ---------------------------------------------------------------------------

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  // ---------------------------------------------------------------------------
  // UI state
  // ---------------------------------------------------------------------------

  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState("Proficiency");

  // ---------------------------------------------------------------------------
  // Add skill form state
  // ---------------------------------------------------------------------------

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Advanced");
  const [addError, setAddError] = useState(null);
  const [adding, setAdding] = useState(false);

  // ---------------------------------------------------------------------------
  // Fetch skills from API
  //
  // This function only fetches data and does NOT call setState.
  // This helps avoid react-hooks/set-state-in-effect warnings.
  // ---------------------------------------------------------------------------

  const fetchSkills = useCallback(async () => {
    const data = await apiRequest("/skills");

    return {
      skills: data.skills || [],
      stats: data.stats || DEFAULT_STATS,
      categories: data.categories || [],
      topInDemand: data.topInDemand || [],
      suggestions: data.suggestions || [],
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Apply fetched data to React state
  //
  // Used by the Retry button and other explicit user actions.
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Initial data load
  //
  // The effect starts the async request. State updates happen after the
  // asynchronous operation resolves rather than synchronously in the effect.
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Calculated values
  // ---------------------------------------------------------------------------

  const totalSkills = skills.length;

  const avgProficiency = totalSkills
    ? Math.round(
        skills.reduce(
          (sum, skill) => sum + Number(skill.proficiency || 0),
          0
        ) / totalSkills
      )
    : 0;

  // ---------------------------------------------------------------------------
  // Filter + sort
  // ---------------------------------------------------------------------------

  const filtered = useMemo(() => {
    let list =
      activeTab === "all"
        ? skills
        : skills.filter((skill) => skill.group === activeTab);

    list = [...list];

    if (sortBy === "Proficiency") {
      list.sort(
        (a, b) =>
          Number(b.proficiency || 0) - Number(a.proficiency || 0)
      );
    }

    if (sortBy === "Name (A-Z)") {
      list.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || ""))
      );
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

  // ---------------------------------------------------------------------------
  // Delete skill
  // ---------------------------------------------------------------------------

  async function handleDelete(id) {
    setSavingId(id);

    const previousSkills = skills;

    // Optimistic update
    setSkills((current) =>
      current.filter((skill) => skill.id !== id)
    );

    try {
      await apiRequest(`/skills/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      // Roll back if API request fails
      setSkills(previousSkills);
      setError(err.message || "Failed to delete skill.");
    } finally {
      setSavingId(null);
    }
  }

  // ---------------------------------------------------------------------------
  // Add new skill
  // ---------------------------------------------------------------------------

  async function handleAddSkill() {
    if (!name.trim() || !category) {
      setAddError(
        "Please enter a skill name and choose a category."
      );
      return;
    }

    setAdding(true);
    setAddError(null);

    try {
      const created = await apiRequest("/skills", {
        method: "POST",
        body: JSON.stringify({
          skillName: name.trim(),
          category,
          level,
        }),
      });

      setSkills((current) => [created, ...current]);

      setName("");
      setCategory("");
      setLevel("Advanced");
    } catch (err) {
      setAddError(err.message || "Failed to add skill.");
    } finally {
      setAdding(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Add suggested skill
  // ---------------------------------------------------------------------------

  async function handleAddSuggestion(suggestion) {
    if (
      skills.some(
        (skill) =>
          String(skill.name).toLowerCase() ===
          String(suggestion.name).toLowerCase()
      )
    ) {
      return;
    }

    try {
      const created = await apiRequest("/skills", {
        method: "POST",
        body: JSON.stringify({
          name: suggestion.name,
          category: suggestion.category || "Tools",
          level: "Beginner",
        }),
      });

      setSkills((current) => [created, ...current]);

      setSuggestions((current) =>
        current.filter(
          (item) => item.id !== suggestion.id
        )
      );
    } catch (err) {
      setError(
        err.message || "Failed to add suggested skill."
      );
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <DashboardSidebar />

      <div className="min-h-screen p-8 pl-[calc(268px+32px)] font-sans text-[#111827]">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
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
            onClick={() =>
              document
                .getElementById("skill-name-input")
                ?.focus()
            }
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <Plus size={16} />
            Add New Skill
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              onClick={loadSkills}
              className="font-medium underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex h-64 items-center justify-center text-gray-400">
            <Loader2
              size={22}
              className="mr-2 animate-spin"
            />
            Loading your skills…
          </div>
        ) : (
          <>
            {/* -----------------------------------------------------------------
                Stat Cards
            ----------------------------------------------------------------- */}

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                iconBg="#D1FAE5"
                icon={
                  <span className="text-emerald-600">
                    {"</>"}
                  </span>
                }
                label="Total Skills"
                value={totalSkills}
                sub="Across all categories"
              />

              <StatCard
                iconBg="#DBEAFE"
                icon={
                  <TrendingUp
                    size={18}
                    className="text-blue-600"
                  />
                }
                label="Top Skill Category"
                value={stats.topCategory}
                sub={`${stats.topCategoryCount} skills`}
              />

              <StatCard
                iconBg="#EDE9FE"
                icon={
                  <span className="text-purple-600">
                    ◎
                  </span>
                }
                label="Average Proficiency"
                value={`${avgProficiency}%`}
                sub="Keep improving!"
              />

              <StatCard
                iconBg="#FEF3C7"
                icon={
                  <TrendingUp
                    size={18}
                    className="text-amber-600"
                  />
                }
                label="In Demand Skills"
                value={stats.inDemandCount}
                sub="High market demand"
              />
            </div>

            {/* -----------------------------------------------------------------
                Main Grid
            ----------------------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
              {/* ===============================================================
                  LEFT COLUMN
              =============================================================== */}

              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold">
                  Your Skills
                </h2>

                {/* Tabs + Sort */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {TABS.map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() =>
                          setActiveTab(tab.key)
                        }
                        className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                          activeTab === tab.key
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {tab.label} (
                        {countByTab(
                          skills,
                          tab.key
                        )}
                        )
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value)
                      }
                      className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Proficiency</option>
                      <option>Name (A-Z)</option>
                      <option>Recently Added</option>
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                {/* Skill List */}
                <div className="divide-y divide-gray-100">
                  {visible.map((skill) => (
                    <SkillRow
                      key={skill.id}
                      skill={skill}
                      deleting={
                        savingId === skill.id
                      }
                      onDelete={() =>
                        handleDelete(skill.id)
                      }
                    />
                  ))}

                  {visible.length === 0 && (
                    <p className="py-8 text-center text-sm text-gray-400">
                      No skills in this category yet.
                    </p>
                  )}
                </div>

                {/* Show More */}
                {filtered.length > 8 && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() =>
                        setShowAll((value) => !value)
                      }
                      className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      {showAll
                        ? "Show Less"
                        : "Show More"}

                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          showAll
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <h3 className="mb-4 flex items-center gap-1.5 text-base font-semibold">
                      <Sparkles
                        size={16}
                        className="text-emerald-500"
                      />
                      Suggestions for You
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.id}
                          className="rounded-xl border border-gray-100 p-4"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-600">
                              {String(
                                suggestion.name || ""
                              )
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>

                            <span className="text-sm font-semibold">
                              {suggestion.name}
                            </span>
                          </div>

                          <p className="mb-3 text-xs leading-snug text-gray-500">
                            {suggestion.note}
                          </p>

                          <button
                            onClick={() =>
                              handleAddSuggestion(
                                suggestion
                              )
                            }
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

              {/* ===============================================================
                  RIGHT COLUMN
              =============================================================== */}

              <div className="flex flex-col gap-6">
                {/* ---------------------------------------------------------------
                    Add New Skill
                --------------------------------------------------------------- */}

                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-base font-semibold">
                    Add New Skill
                  </h3>

                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Skill Name
                  </label>

                  <input
                    id="skill-name-input"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="e.g. Python, Project Management"
                    className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Category
                  </label>

                  <div className="relative mb-4">
                    <select
                      value={category}
                      onChange={(event) =>
                        setCategory(
                          event.target.value
                        )
                      }
                      className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">
                        Select category
                      </option>

                      {CATEGORY_OPTIONS.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>

                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </div>

                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Proficiency Level
                  </label>

                  <div className="mb-2 grid grid-cols-4 gap-2">
                    {LEVELS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setLevel(item)
                        }
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
                    <p className="mb-3 text-xs text-red-600">
                      {addError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    disabled={adding}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {adding && (
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                    )}

                    {adding
                      ? "Adding…"
                      : "Add Skill"}
                  </button>
                </div>

                {/* ---------------------------------------------------------------
                    Skill Categories
                --------------------------------------------------------------- */}

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
                        <PieChart
                          width={140}
                          height={140}
                        >
                          <Pie
                            data={categoryBreakdown}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={44}
                            outerRadius={66}
                            paddingAngle={2}
                            stroke="none"
                          >
                            {categoryBreakdown.map(
                              (entry) => (
                                <Cell
                                  key={entry.name}
                                  fill={
                                    entry.color ||
                                    CATEGORY_COLORS[
                                      entry.name
                                    ] ||
                                    "#9CA3AF"
                                  }
                                />
                              )
                            )}
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
                        {categoryBreakdown.map(
                          (item) => (
                            <li
                              key={item.name}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="flex items-center gap-2 text-gray-600">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor:
                                      item.color ||
                                      CATEGORY_COLORS[
                                        item.name
                                      ] ||
                                      "#9CA3AF",
                                  }}
                                />

                                {item.name}
                              </span>

                              <span className="font-medium text-gray-700">
                                {item.value} (
                                {totalSkills
                                  ? Math.round(
                                      (item.value /
                                        totalSkills) *
                                        100
                                    )
                                  : 0}
                                %)
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* ---------------------------------------------------------------
                    Top In-Demand Skills
                --------------------------------------------------------------- */}

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
                      {topInDemand.map((item) => (
                        <li
                          key={item.name || item}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="flex items-center gap-2 text-gray-700">
                            <TrendingUp
                              size={14}
                              className="text-emerald-500"
                            />

                            {item.name || item}
                          </span>

                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                            High Demand
                          </span>
                        </li>
                      ))}
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

// =============================================================================
// Stat Card
// =============================================================================

function StatCard({
  icon,
  iconBg,
  label,
  value,
  sub,
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
        style={{
          backgroundColor: iconBg,
        }}
      >
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-0.5 text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-0.5 text-xs text-gray-400">
        {sub}
      </p>
    </div>
  );
}

// =============================================================================
// Skill Row
// =============================================================================

function SkillRow({
  skill,
  onDelete,
  deleting,
}) {
  const proficiency = Math.max(
    0,
    Math.min(100, Number(skill.proficiency || 0))
  );

  return (
    <div className="flex items-center gap-4 py-3.5">
      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
        style={{
          backgroundColor:
            skill.iconBg || "#E5E7EB",
          color:
            skill.iconColor || "#374151",
        }}
      >
        {skill.icon ||
          String(skill.name || "")
            .slice(0, 2)
            .toUpperCase()}
      </div>

      {/* Name */}
      <div className="w-32 shrink-0">
        <p className="text-sm font-medium">
          {skill.name}
        </p>
      </div>

      {/* Category */}
      <div className="w-20 shrink-0 text-xs text-gray-400">
        {skill.group}
      </div>

      {/* Progress */}
      <div className="mx-2 h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{
            width: `${proficiency}%`,
          }}
        />
      </div>

      {/* Percentage */}
      <div className="w-10 shrink-0 text-right text-sm font-medium text-gray-600">
        {proficiency}%
      </div>

      {/* Edit */}
      <button
        type="button"
        className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label={`Edit ${skill.name}`}
      >
        <Pencil size={15} />
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        aria-label={`Delete ${skill.name}`}
        className="rounded-md p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
      >
        {deleting ? (
          <Loader2
            size={15}
            className="animate-spin"
          />
        ) : (
          <Trash2 size={15} />
        )}
      </button>
    </div>
  );
}
