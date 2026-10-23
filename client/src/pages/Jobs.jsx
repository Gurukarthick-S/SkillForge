
import { useEffect, useMemo, useState } from "react";
import DashboardSidebar from "../components/layout/DashboardSidebar";
import JobCard from "../components/jobs/JobCard";

const API_URL = "http://localhost:5000/api/jobs";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("All");
  const [sort, setSort] = useState("recent");
  const [activeTab, setActiveTab] = useState("Recommended");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load jobs.");
        }

        setJobs(data.jobs || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to connect to the server.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchJobs();

    return () => controller.abort();
  }, []);

  const displayedJobs = useMemo(() => {
    let result = [...jobs];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((job) =>
        [
          job.title,
          job.company,
          job.location,
          ...(job.requiredSkills || []),
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      );
    }

    if (workMode !== "All") {
      result = result.filter((job) => job.workMode === workMode);
    }

    if (sort === "salary-high") {
      result.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sort === "salary-low") {
      result.sort((a, b) => a.salaryMin - b.salaryMin);
    } else {
      result.sort(
        (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
      );
    }

    return result;
  }, [jobs, search, workMode, sort]);

  function handleApply(job) {
    if (job.applyUrl) {
      window.open(job.applyUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("No application link is available for this job yet.");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f8faf9] font-sans text-slate-800">
      <DashboardSidebar />

      <main className="ml-64 min-w-0 flex-1">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-7 lg:px-9">
          {/* Heading */}
          <header className="mb-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Jobs
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Find opportunities that match your skills and career goals.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-500">Available jobs</p>
                <p className="mt-1 text-2xl font-bold text-emerald-800">
                  {loading ? "—" : displayedJobs.length}
                </p>
              </div>
            </div>
          </header>

          {/* Match score banner */}
          <section className="mb-7 rounded-2xl bg-gradient-to-r from-[#e8f8ee] to-[#f2faf5] p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-emerald-800">
                  YOUR JOB MATCH
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  Opportunities picked for you
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Explore roles and compare their required skills with your
                  current experience.
                </p>
              </div>

              <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center self-start rounded-full border-4 border-emerald-200 bg-white sm:self-auto">
                <span className="text-2xl font-bold text-emerald-800">
                  {jobs.length ? "85%" : "—"}
                </span>
                <span className="text-[10px] text-slate-500">Match score</span>
              </div>
            </div>
          </section>

          {/* Tabs */}
          <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200">
            {["Recommended", "Saved", "Applied"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-emerald-700 text-emerald-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search and filters */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0 text-slate-400"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search jobs, companies, or skills..."
                className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            <select
              value={workMode}
              onChange={(event) => setWorkMode(event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
              aria-label="Filter by work mode"
            >
              <option value="All">All work modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
              aria-label="Sort jobs"
            >
              <option value="recent">Most recent</option>
              <option value="salary-high">Highest salary</option>
              <option value="salary-low">Lowest salary</option>
            </select>
          </div>

          {/* Job listings */}
          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
              Loading jobs...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              <p>{error}</p>
              <p className="mt-2">
                Check that your backend is running on port 5000.
              </p>
            </div>
          ) : activeTab !== "Recommended" ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <h2 className="font-semibold text-slate-800">
                {activeTab} jobs
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                We'll connect this tab to persistent bookmarks and application
                records in the next step.
              </p>
            </div>
          ) : displayedJobs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
              <h2 className="font-semibold text-slate-800">No jobs found</h2>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search term or work mode.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {displayedJobs.map((job, index) => (
                <JobCard
                  key={job._id}
                  job={job}
                  matchScore={[92, 85, 78, 88, 72][index % 5]}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
