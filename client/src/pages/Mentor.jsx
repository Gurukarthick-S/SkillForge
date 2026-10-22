
import { useRef, useState } from "react";
import DashboardSidebar from "../components/layout/DashboardSidebar";

const suggestions = [
  { icon: "▤", label: "Learning roadmap" },
  { icon: "♧", label: "Skill advice" },
  { icon: "</>", label: "Project ideas" },
  { icon: "▣", label: "Career guidance" },
];

export default function Mentor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  async function sendMessage(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    const previousMessages = messages;

    setMessages([
      ...previousMessages,
      { role: "user", text: question },
    ]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/mentor/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: question,
            history: previousMessages,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get a response. Please try again."
        );
      }

      if (!data.reply) {
        throw new Error("The AI returned an empty response.");
      }

      setMessages((current) => [
        ...current,
        { role: "model", text: data.reply },
      ]);
    } catch (err) {
      setError(err.message || "Connection failed. Please try again.");
    } finally {
      setLoading(false);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);

      inputRef.current?.focus();
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function startNewChat() {
    setMessages([]);
    setInput("");
    setError("");
  }

  return (
    <div className="flex min-h-screen bg-[#fcfdfc] font-sans text-slate-800">
      {/* LEFT SIDEBAR */}
      <DashboardSidebar />

      {/* RIGHT MAIN CONTENT */}
      <main className="ml-64 flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-5 sm:px-7 sm:py-6">
          {/* PAGE HEADER */}
          <header className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#102638]">
                AI Mentor
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Your personal AI mentor is here to help you learn, build and grow.
              </p>
            </div>

            {messages.length > 0 && (
              <button
                type="button"
                onClick={startNewChat}
                className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                + New chat
              </button>
            )}
          </header>

          {/* CHAT PANEL */}
          <section className="flex min-h-[560px] flex-1 flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            {/* MESSAGES AREA */}
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-7">
              {messages.length === 0 ? (
                <div className="mx-auto flex min-h-[430px] max-w-md flex-col justify-center">
                  {/* ROBOT ICON */}
                  <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f7ef]">
                    <div className="absolute inset-2 rounded-full border border-emerald-100" />

                    <div className="absolute -top-1 h-3 w-3 rounded-full bg-emerald-700" />

                    <div className="absolute top-1 h-3 w-px bg-emerald-700" />

                    <div className="relative flex h-12 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white shadow-sm">
                      <div className="flex h-8 w-11 items-center justify-center gap-2 rounded-xl bg-[#123b3a]">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                      </div>
                    </div>

                    <div className="absolute -bottom-1 h-2 w-6 rounded-full bg-emerald-300" />
                  </div>

                  {/* WELCOME MESSAGE */}
                  <div className="w-full rounded-xl bg-gradient-to-br from-[#effaf4] to-[#eaf7f1] px-4 py-3 text-sm leading-6">
                    <p className="font-semibold text-[#173c35]">
                      Hi Gurukarthick! 👋
                    </p>

                    <p className="mt-1 text-[#284a46]">
                      I’m your AI Mentor. Ask me anything about your skills,
                      learning path, projects, or career. I’m here to help!
                    </p>
                  </div>

                  {/* SUGGESTED PROMPTS */}
                  <div className="mt-5 w-full">
                    <p className="mb-2.5 text-xs font-medium text-slate-700">
                      Try asking me about:
                    </p>

                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {suggestions.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => sendMessage(item.label)}
                          disabled={loading}
                          className="flex min-h-11 items-center gap-3 rounded-xl border border-emerald-100 bg-[#f2faf6] px-3 text-left text-xs font-medium text-[#24463e] transition hover:border-emerald-300 hover:bg-emerald-50 disabled:opacity-50"
                        >
                          <span className="w-5 text-center text-base font-bold text-emerald-800">
                            {item.icon}
                          </span>

                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex max-w-3xl flex-col gap-5">
                  {messages.map((message, index) => (
                    <div
                      key={`${index}-${message.role}`}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.role === "user"
                            ? "rounded-br-sm bg-emerald-800 text-white"
                            : "rounded-bl-sm border border-emerald-100 bg-[#f0faf5] text-slate-700"
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="animate-pulse rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        Your AI Mentor is thinking...
                      </div>
                    </div>
                  )}

                  {error && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                      <p>{error}</p>

                      <button
                        type="button"
                        onClick={() =>
                          sendMessage(
                            messages[messages.length - 1]?.role === "user"
                              ? messages[messages.length - 1].text
                              : ""
                          )
                        }
                        className="mt-1 font-semibold underline"
                      >
                        Retry
                      </button>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* MESSAGE INPUT */}
            <div className="border-t border-slate-100 bg-white px-3 py-3 sm:px-5 sm:py-4">
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-3xl items-center gap-2"
              >
                <div className="flex min-w-0 flex-1 items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-50">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="mr-3 h-5 w-5 shrink-0 text-slate-400"
                  >
                    <path
                      d="m21.4 11.1-8.9 8.9a5 5 0 0 1-7.1-7.1l9.2-9.2a3.3 3.3 0 0 1 4.7 4.7l-9.2 9.2a1.7 1.7 0 0 1-2.4-2.4l8.5-8.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Type your message..."
                    aria-label="Type your message"
                    disabled={loading}
                    className="h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
