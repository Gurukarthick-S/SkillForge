import { useState, useRef } from "react";
import {
  FileText,
  UploadCloud,
  X,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import DashboardSidebar from "../components/layout/DashboardSidebar";

const RECENT_FILES = [
  { name: "Resume_2026_SeniorPM.pdf", date: "Uploaded Aug 14" },
];

const TIPS = [
  "Use a clean and simple format (avoid graphics, tables, columns).",
  "Include relevant keywords from the job description.",
  "Keep your resume 1-2 pages.",
];

function bytesToSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ResumeUploadPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState("idle"); // idle | reading | done
  const [error, setError] = useState("");

  const inputRef = useRef(null);

  const acceptTypes = [".pdf", ".doc", ".docx"];
  const maxBytes = 5 * 1024 * 1024;

  const acceptFile = (f) => {
    const ext = "." + f.name.split(".").pop().toLowerCase();

    // Validate file type
    if (!acceptTypes.includes(ext)) {
      setError(
        "That file type isn't supported. Use PDF, DOC, or DOCX."
      );
      setFile(null);
      setStage("idle");
      return;
    }

    // Validate file size
    if (f.size > maxBytes) {
      setError(
        "That file is over 5 MB. Try a smaller version."
      );
      setFile(null);
      setStage("idle");
      return;
    }

    // Valid file
    setError("");
    setFile(f);
    setStage("reading");

    setTimeout(() => {
      setStage("done");
    }, 1400);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const f = e.dataTransfer.files?.[0];

    if (f) {
      acceptFile(f);
    }
  };

  const onBrowse = (e) => {
    const f = e.target.files?.[0];

    if (f) {
      acceptFile(f);
    }
  };

  const reset = () => {
    setFile(null);
    setStage("idle");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen flex items-start justify-center px-6 py-14">
        <div className="w-full max-w-4xl">

          {/* Header */}
          <h1 className="text-[#0F2A20] text-[26px] font-bold mb-2">
            Upload Resume
          </h1>

          <p className="text-[#6B7280] text-sm mb-8 max-w-2xl">
            Upload your resume (PDF or DOCX) and get an instant ATS score
            with detailed feedback on what's working and what needs improvement.
          </p>

          {/* Upload Area */}
          {stage !== "done" && (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`rounded-xl border-2 transition-colors ${
                dragging
                  ? "border-[#1F9D55] bg-[#F0FBF4]"
                  : "border-[#CBD5D1] bg-[#F7FBF8]"
              }`}
              style={{ borderStyle: "dashed" }}
            >
              <div className="flex flex-col items-center justify-center text-center py-14 px-8">

                {/* Idle State */}
                {stage === "idle" && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white border border-[#DCEAE1] flex items-center justify-center mb-5">
                      <UploadCloud
                        size={26}
                        className="text-[#1F9D55]"
                        strokeWidth={1.75}
                      />
                    </div>

                    <p className="text-[#0F2A20] font-semibold text-[17px] mb-1">
                      Drag & drop your resume here
                    </p>

                    <p className="text-[#8A9791] text-sm mb-6">
                      or click to browse
                    </p>

                    <div className="flex items-center gap-3 ml-4">
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="px-5 py-2.5 rounded-md bg-[#1F9D55] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#1C8B4C] transition-colors"
                      >
                        <UploadCloud size={16} />
                        Choose File
                      </button>

                      <button
                        type="button"
                        disabled={!file}
                        className="px-5 py-2.5 rounded-md bg-white border border-[#CBD5D1] text-[#0F2A20] text-sm font-medium flex items-center gap-2 hover:bg-[#F0FBF4] hover:border-[#1F9D55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-[#CBD5D1]"
                      >
                        <FileText size={16} />
                        Analyze Resume
                      </button>
                    </div>

                    <input
                      ref={inputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={onBrowse}
                    />

                    <p className="text-[#A2ACA6] text-xs mt-6">
                      Supports PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </>
                )}

                {/* Reading State */}
                {stage === "reading" && file && (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white border border-[#DCEAE1] flex items-center justify-center mb-5">
                      <FileText
                        size={24}
                        className="text-[#1F9D55]"
                        strokeWidth={1.75}
                      />
                    </div>

                    <p className="text-[#0F2A20] font-semibold text-[15px] mb-1">
                      Reading {file.name}
                    </p>

                    <p className="text-[#8A9791] text-sm">
                      {bytesToSize(file.size)} · checking formatting and keywords
                    </p>

                    <div className="w-40 h-1.5 rounded-full bg-[#DCEAE1] mt-6 overflow-hidden">
                      <div className="h-full w-1/2 bg-[#1F9D55] rounded-full animate-pulse" />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="text-[#C0392B] text-sm mt-3">
              {error}
            </p>
          )}

          {/* Completed File */}
          {stage === "done" && file && (
            <div className="rounded-xl border-2 border-[#CBD5D1] bg-[#F7FBF8] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-md bg-white border border-[#DCEAE1] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2
                    size={18}
                    className="text-[#1F9D55]"
                    strokeWidth={1.75}
                  />
                </div>

                <div>
                  <p className="text-[#0F2A20] font-medium text-[15px]">
                    {file.name}
                  </p>

                  <p className="text-[#8A9791] text-xs">
                    {bytesToSize(file.size)} · ready for review
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">

                {/* Remove */}
                <button
                  type="button"
                  onClick={reset}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[#8A9791] hover:bg-[#EAF3EC] transition-colors"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>

                {/* Score */}
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-[#1F9D55] text-white text-sm font-medium flex items-center gap-1.5 hover:bg-[#1C8B4C] transition-colors"
                >
                  See my score
                  <ArrowRight size={14} />
                </button>

              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="h-px bg-[#E5E7EB] flex-1" />

            <span className="text-[#9CA3AF] text-xs font-medium">
              OR
            </span>

            <div className="h-px bg-[#E5E7EB] flex-1" />
          </div>

          {/* Recent Files */}
          <div className="mb-6">
            <div className="rounded-xl border border-[#E5E7EB] bg-white divide-y divide-[#F0F1F0]">

              {RECENT_FILES.map((f) => (
                <button
                  type="button"
                  key={f.name}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF9] transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  <div className="flex items-center gap-3">

                    <FileText
                      size={18}
                      className="text-[#6B7280]"
                      strokeWidth={1.75}
                    />

                    <div>
                      <p className="text-[#0F2A20] text-sm font-medium">
                        Choose from your recent files
                      </p>

                      <p className="text-[#9CA3AF] text-xs">
                        Select a previously uploaded resume to analyze again.
                      </p>
                    </div>

                  </div>

                  <ChevronRight
                    size={16}
                    className="text-[#9CA3AF] flex-shrink-0"
                  />
                </button>
              ))}

            </div>
          </div>

          {/* Tips */}
          <div className="rounded-xl bg-[#F0FBF4] border border-[#D7EFDF] p-5 flex items-start justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 mb-3">
                <Lightbulb
                  size={17}
                  className="text-[#1F9D55]"
                  strokeWidth={1.75}
                />

                <p className="text-[#0F2A20] text-sm font-semibold">
                  Tips for a better analysis
                </p>
              </div>

              <ul className="space-y-1.5">
                {TIPS.map((t) => (
                  <li
                    key={t}
                    className="text-[#3F5C46] text-sm flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#5F8A6B] mt-2 flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>

            </div>

            <p
              className="hidden sm:block text-[#1F9D55] text-sm italic leading-snug whitespace-nowrap mt-1"
              style={{
                fontFamily: "'Segoe Print', 'Comic Sans MS', cursive",
              }}
            >
              Better resume
              <br />
              = More opportunities
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}
