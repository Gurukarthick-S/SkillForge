
import { useState } from "react";

export default function JobCard({ job, matchScore = 85, onApply }) {
  const [saved, setSaved] = useState(false);

  const formatSalary = (amount) => {
    if (!amount) return null;

    // Sample data uses different salary scales.
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md sm:p-6">
      {/* Company and bookmark */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="h-full w-full object-contain p-1"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <span className="font-bold text-emerald-800">
                {job.company?.charAt(0)?.toUpperCase() || "J"}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {job.company}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {job.location || "Location not specified"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSaved((previous) => !previous)}
          aria-label={saved ? "Remove bookmark" : "Bookmark job"}
          title={saved ? "Remove bookmark" : "Bookmark job"}
          className={`rounded-lg p-2 transition ${
            saved
              ? "bg-emerald-50 text-emerald-700"
              : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-4-6 4V4.75Z"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Job title */}
      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {job.title}
      </h2>

      {/* Job details */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span>◷</span>
          {job.employmentType || "Full-time"}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <span>⌖</span>
          {job.workMode || "Remote"}
        </span>

        {job.salaryMin > 0 && job.salaryMax > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <span>＄</span>
            {formatSalary(job.salaryMin)} – {formatSalary(job.salaryMax)}
          </span>
        )}
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(job.requiredSkills || []).map((skill) => (
          <span
            key={skill}
            className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Match score */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-500">
            Your skill match
          </span>

          <span className="text-sm font-bold text-emerald-700">
            {matchScore}%
          </span>
        </div>

        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Skill match"
          aria-valuenow={matchScore}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>

      {/* Apply button */}
      <button
        type="button"
        onClick={() => onApply?.(job)}
        className="mt-5 w-full rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        Apply Now
        <span className="ml-2" aria-hidden="true">→</span>
      </button>
    </article>
  );
}
