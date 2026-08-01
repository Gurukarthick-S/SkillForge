import { Link } from "react-router-dom";
import aboutImage from "../assets/about.png";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>

            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider">
              About SkillForge
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
              Empowering Developers.
              <br />
              Building{" "}
              <span className="text-green-600">
                Better Careers.
              </span>
            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8 max-w-xl">
              SkillForge is an all-in-one platform designed to help
              developers and students upskill with in-demand
              technologies, track their learning progress in detail,
              and stand out in the job market with ATS-optimized
              resumes.
            </p>

            <Link
              to="/register"
              className="inline-flex mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
            >
              Get Started
            </Link>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <img
              src={aboutImage}
              alt="About SkillForge"
              className="w-full max-w-lg"
            />

          </div>

        </div>
      </section>
    </div>
  );
};

export default About;