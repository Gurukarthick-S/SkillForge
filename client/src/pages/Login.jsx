import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import googleLogo from "../assets/google.png";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  // ---------------------------
  // Handle Input Change
  // ---------------------------

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };

  // ---------------------------
  // Validation
  // ---------------------------

  const validateForm = () => {

    const newErrors = {};

    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    }

    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {

      newErrors.email = "Enter a valid email";

    }

    if (!formData.password) {

      newErrors.password = "Password is required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ---------------------------
  // Login
  // ---------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {

      const response = await fetch("/api/users/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          email: formData.email,
          password: formData.password,

        }),

      });

      const data = await response.json();

      if (response.ok) {

        localStorage.setItem(
          "token",
          data.token
        );

        navigate("/dashboard");

      }

      else {

        setApiError(
          data.message || "Login failed"
        );

      }

    }

    catch (err) {

      console.log(err);

      setApiError(
        "Unable to connect to server."
      );

    }

    finally {

      setIsLoading(false);

    }

  };

    return (

    <div className="min-h-screen w-full">

  <div className="grid lg:grid-cols-2 w-full min-h-screen">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative bg-[#0D5B36]">

          <img
            src={loginImage}
            alt="Login"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Green Overlay */}

          <div className="absolute inset-0 bg-[#0D5B36]/70"></div>

          {/* Content */}

          <div className="relative z-10 h-full flex flex-col p-10">

            {/* Logo */}

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">

                <span className="text-white font-bold">
                  SF
                </span>

              </div>

              <h2 className="text-white text-2xl font-bold">
                SkillForge
              </h2>

            </div>

            {/* Welcome */}

            <div className="mt-20">

              <h1 className="text-white text-5xl font-bold leading-tight">

                Welcome Back!

              </h1>

              <p className="text-green-100 mt-5 text-lg leading-8 max-w-sm">

                Continue your learning journey
                and achieve your goals.

              </p>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex justify-center items-center p-12">

          <div className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-900">

              Log in to your account

            </h2>

            <p className="text-gray-500 mt-3 mb-10">

              Enter your credentials to access your account.

            </p>

            {apiError && (

              <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-600">

                {apiError}

              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

                      {/* ================= EMAIL ================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600"
                  />

                </div>

                {errors.email && (

                  <p className="text-red-500 text-sm mt-2">
                    {errors.email}
                  </p>

                )}

              </div>

              {/* ================= PASSWORD ================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-12 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

                {errors.password && (

                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>

                )}

              </div>

              {/* ================= REMEMBER ME ================= */}

              <div className="flex justify-between items-center">

                <label className="flex items-center gap-2 text-gray-600 text-sm">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-4 h-4 accent-green-600"
                  />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Forgot password?
                </Link>

              </div>

              {/* ================= LOGIN BUTTON ================= */}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-semibold transition shadow-md"
              >
                {isLoading
                  ? "Logging In..."
                  : "Log In"}
              </button>

            </form>

                      {/* ================= DIVIDER ================= */}

            <div className="flex items-center my-8">

              <div className="flex-1 border-t border-gray-300"></div>

              <span className="mx-4 text-gray-400 text-sm">
                or
              </span>

              <div className="flex-1 border-t border-gray-300"></div>

            </div>

            {/* ================= GOOGLE BUTTON ================= */}

            <button
              type="button"
              className="w-full border border-gray-300 rounded-xl py-3.5 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >

              <img
                src={googleLogo}
                alt="Google"
                className="w-6 h-6"
              />

              <span className="font-medium text-gray-700">
                Continue with Google
              </span>

            </button>

            {/* ================= REGISTER ================= */}

            <p className="text-center text-gray-500 mt-8">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-green-700 font-semibold hover:text-green-800"
              >
                Sign up
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;