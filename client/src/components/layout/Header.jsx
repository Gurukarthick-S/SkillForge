import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-800 fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 flex items-center">
          <span className="text-white font-bold bg-[#22C55E] px-2 py-1 rounded-lg mr-2">
            SF
          </span>
          SkillForge
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-semibold"
                : "text-black hover:text-green-300 transition font-semibold"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-semibold"
                : "text-black hover:text-green-300 transition font-semibold"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-semibold"
                : "text-black hover:text-green-300 transition font-semibold"
            }
          >
            Login
          </NavLink>

          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
          >
            Get Started
          </Link>

        </nav>

      </div>
    </header>
  );
};

export default Header;