import { Link } from "react-router-dom";
import heroImage from "../assets/home.png";

import {
  Code2,
  Atom,
  Database,
  GitBranch,
  BookOpen,
  CheckCircle,
  Route,
  FileSearch,
  TrendingUp,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-8 pt-14 pb-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
              Upskill Today.
              <br />
              <span className="text-green-600">
                Lead Tomorrow.
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 leading-9 max-w-xl">
              Track in-demand skills, learn step-by-step, build real projects,
              improve your resume with AI, and become job-ready faster.
            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
              >
                Start Learning Free
              </Link>

              <Link
                to="/about"
                className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-gray-800 transition"
              >
                Explore Features
              </Link>

            </div>

            {/* Highlights */}

            <div className="flex flex-wrap gap-10 mt-10">

              <div className="flex items-center gap-3">
                <CheckCircle
                  className="text-green-600"
                  size={22}
                  fill="white"
                />
                <span className="text-gray-700 font-medium">
                  Track Skills
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle
                  className="text-green-600"
                  size={22}
                  fill="white"
                />
                <span className="text-gray-700 font-medium">
                  Measure Progress
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle
                  className="text-green-600"
                  size={22}
                  fill="white"
                />
                <span className="text-gray-700 font-medium">
                  Career Ready
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <img
              src={heroImage}
              alt="Hero"
              className="w-full max-w-2xl object-contain"
            />

          </div>

        </div>

      </section>

      {/* ================= TRUSTED TECHNOLOGIES ================= */}

      <section className="max-w-7xl mx-auto px-8 py-10">

        <div className="bg-gray-50 rounded-3xl shadow-sm py-10 px-8">

          <p className="text-center text-gray-500 font-medium mb-8 text-lg">
            Trusted by learners & developers
          </p>

          <div className="flex flex-wrap justify-center gap-14">

            <div className="flex items-center gap-3">
              <Code2 className="text-yellow-500" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                JavaScript
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Atom className="text-sky-500" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                React
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Database className="text-green-600" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                Node.js
              </span>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="text-yellow-500" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                Python
              </span>
            </div>

            <div className="flex items-center gap-3">
              <GitBranch className="text-gray-800" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                GitHub
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Database className="text-green-600" size={34} />
              <span className="text-xl font-semibold text-gray-800">
                MongoDB
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

<section className="max-w-7xl mx-auto px-8 py-20">
  <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
    Everything You Need to Grow
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

    {/* CARD 1 */}
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="text-green-600" size={34} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Skill Tracker
      </h3>

      <p className="text-gray-600 leading-7">
        Monitor your learning progress, identify weak areas,
        and stay motivated with detailed analytics.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
        <Route className="text-purple-600" size={34} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Learning Roadmaps
      </h3>

      <p className="text-gray-600 leading-7">
        Follow structured learning paths for Frontend,
        Backend, AI, Data Science, and more.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center mb-6">
        <FileSearch className="text-yellow-600" size={34} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        ATS Resume Scanner
      </h3>

      <p className="text-gray-600 leading-7">
        Upload your resume and receive an ATS score,
        improvement tips, and keyword suggestions.
      </p>
    </div>

    {/* CARD 4 */}
    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
        <TrendingUp className="text-blue-600" size={34} />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Progress Insights
      </h3>

      <p className="text-gray-600 leading-7">
        Get AI-powered insights into your performance,
        consistency, and career readiness.
      </p>
    </div>

  </div>
</section>
    </div>
  );
};

export default Home;