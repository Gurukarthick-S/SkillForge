
import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  FileCheck,
  X,
  ArrowRight,
  LoaderCircle,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import DashboardSidebar from "../components/layout/DashboardSidebar";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ResumeUploadPage() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");

  function acceptFile(selectedFile) {
    if (!selectedFile) return;

    setError("");
    setAnalysis(null);

    const allowedExtensions = [".pdf", ".docx"];
    const fileName = selectedFile.name.toLowerCase();

    if (!allowedExtensions.some((ext) => fileName.endsWith(ext))) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("Your resume must be 5 MB or smaller.");
      return;
    }

    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      return;
    }

    setFile(selectedFile);
  }

  function handleInputChange(event) {
    acceptFile(event.target.files?.[0]);

    // Allows selecting the same file again.
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files?.[0]);
  }

  function removeFile() {
    setFile(null);
    setAnalysis(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function analyzeResume() {
    if (!file || isAnalyzing) return;

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();

      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        `${API_URL}/api/ats/analyze`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to analyze your resume."
        );
      }

      setAnalysis(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to the server. Check that your backend is running."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function startAgain() {
    setFile(null);
    setAnalysis(null);
    setError("");
    setJobDescription("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  const breakdown = [
    {
      label: "Skills match",
      value: analysis?.breakdown?.skillsMatch,
    },
    {
      label: "Experience",
      value: analysis?.breakdown?.experience,
    },
    {
      label: "Keywords",
      value: analysis?.breakdown?.keywords,
    },
    {
      label: "Formatting",
      value: analysis?.breakdown?.formatting,
    },
  ];

  const feedbackSections = [
    {
      title: "Your strengths",
      items: analysis?.strengths,
      icon: CheckCircle2,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    {
      title: "Areas to improve",
      items: analysis?.weaknesses,
      icon: AlertCircle,
      color: "text-amber-600",
      background: "bg-amber-50",
    },
    {
      title: "Missing keywords",
      items: analysis?.missingKeywords,
      icon: FileText,
      color: "text-violet-600",
      background: "bg-violet-50",
    },
    {
      title: "Recommended actions",
      items: analysis?.suggestions,
      icon: Sparkles,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardSidebar />

      <main className="min-h-screen px-4 py-8 sm:px-8 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-5xl">
          {/* Page heading */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm text-emerald-700">
              <Sparkles size={16} />
              <span className="font-semibold">
                SkillForge AI Tools
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ATS Resume Scanner
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Upload your resume to get an AI-powered assessment
              of your skills, experience, keywords, and formatting.
            </p>
          </div>

          {/* Upload card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Upload your resume
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Supported formats: PDF and DOCX · Maximum size: 5 MB
              </p>
            </div>

            {!file ? (
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
                  dragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-300 bg-slate-50 hover:border-emerald-400"
                }`}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Upload size={27} />
                </div>

                <h3 className="mt-5 font-semibold">
                  Drag and drop your resume here
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Or select a file from your computer.
                </p>

                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <Upload size={16} />
                  Browse files
                </button>

                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <FileCheck size={25} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="break-all text-sm font-semibold">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatFileSize(file.size)} · Ready for analysis
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove resume"
                  className="flex h-9 w-9 items-center justify-center self-end rounded-lg text-slate-500 hover:bg-white hover:text-red-600 sm:self-center"
                >
                  <X size={19} />
                </button>
              </div>
            )}

            {/* Optional job description */}
            <div className="mt-6">
              <label
                htmlFor="jobDescription"
                className="mb-2 block text-sm font-semibold"
              >
                Job description
                <span className="ml-2 font-normal text-slate-400">
                  Optional
                </span>
              </label>

              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(event) =>
                  setJobDescription(event.target.value)
                }
                maxLength={10000}
                rows={5}
                placeholder="Paste the job description here to compare your resume against a specific role..."
                className="w-full resize-y rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Adding a job description helps identify relevant and
                potentially missing keywords.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />
                <p>{error}</p>
              </div>
            )}

            {/* Analyze button */}
            <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck size={17} className="text-emerald-600" />
                <span>Secure server-side AI analysis</span>
              </div>

              <button
                type="button"
                onClick={analyzeResume}
                disabled={!file || isAnalyzing}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Analyzing resume...
                  </>
                ) : (
                  <>
                    See my score
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Analysis results */}
          {analysis && (
            <section
              aria-live="polite"
              className="mt-8 space-y-6"
            >
              {/* Score card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-32 w-32 shrink-0 flex-col items-center justify-center self-center rounded-full border-[7px] border-emerald-500 bg-emerald-50 sm:self-auto">
                    <span className="text-4xl font-bold text-emerald-700">
                      {analysis.score}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      out of 100
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={20}
                        className="text-emerald-600"
                      />
                      <h2 className="text-2xl font-bold">
                        Your ATS analysis
                      </h2>
                    </div>

                    <p className="mt-3 break-all text-sm text-slate-500">
                      Analyzed file: {analysis.filename}
                    </p>

                    <p className="mt-3 leading-7 text-slate-700">
                      {analysis.summary}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <h3 className="mb-5 font-semibold">
                    Score breakdown
                  </h3>

                  <div className="grid gap-5 sm:grid-cols-2">
                    {breakdown.map(({ label, value }) => (
                      <div key={label}>
                        <div className="mb-2 flex justify-between gap-3 text-sm">
                          <span className="text-slate-600">
                            {label}
                          </span>

                          <span className="font-semibold">
                            {value}%
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, Number(value) || 0)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback sections */}
              <div className="grid gap-5 sm:grid-cols-2">
                {feedbackSections.map((section) => {
                  const Icon = section.icon;

                  return (
                    <article
                      key={section.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${section.background} ${section.color}`}
                        >
                          <Icon size={20} />
                        </div>

                        <h3 className="font-semibold">
                          {section.title}
                        </h3>
                      </div>

                      {section.items?.length > 0 ? (
                        <ul className="mt-5 space-y-3">
                          {section.items.map((item, index) => (
                            <li
                              key={`${section.title}-${index}`}
                              className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-5 text-sm text-slate-500">
                          No items returned for this section.
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>

              {/* Disclaimer and rescan */}
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-xs leading-5 text-slate-500">
                  {analysis.disclaimer ||
                    "This is an AI-generated estimate, not a guaranteed employer ATS result. Actual screening systems may use different criteria."}
                </p>

                <button
                  type="button"
                  onClick={startAgain}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  <RotateCcw size={16} />
                  Scan another resume
                </button>
              </div>
            </section>
          )}

          {/* Privacy note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-100 p-4 text-sm text-slate-600">
            <ShieldCheck
              size={19}
              className="mt-0.5 shrink-0 text-emerald-700"
            />
            <p className="leading-6">
              Your resume is processed by the backend for analysis.
              This code does not save the uploaded file to a database.
              Avoid uploading sensitive information you do not want
              processed by an external AI provider.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
