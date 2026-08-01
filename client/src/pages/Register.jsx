import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import registerImage from "../assets/register.png";
import googleLogo from "../assets/google.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setApiError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Account created successfully!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setApiError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setApiError("Server not reachable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="w-full min-h-screen flex">
 {/* ================= LEFT SIDE ================= */}
<div className="hidden lg:block lg:w-3/5 min-h-screen relative overflow-hidden bg-black">

  {/* Background Image */}

  <img
    src={registerImage}
    alt="Register"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-[#0D5B36]/70"></div>

  {/* Text */}

  <div className="relative z-10 p-12">

    {/* Logo */}

    <div className="flex items-center gap-3">

      <div className="w-9 h-9 rounded-lg bg-[#22C55E] flex items-center justify-center">

        <span className="text-white font-bold">
          SF
        </span>

      </div>

      <h2 className="text-white text-2xl font-bold">
                SkillForge
              </h2>

    </div>

    {/* Heading */}

    <div className="mt-10">

      <h1 className="text-white text-4xl lg:text-5xl font-bold mb-4">
        Create Account
      </h1>

      <p className="text-green-200/70 text-lg max-w-sm">
        Join SkillForge and begin your AI-powered learning journey.
      </p>

    </div>

  </div>

</div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-900">
              Create an account
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
              Fill in the details to get started
            </p>

            {successMessage && (
              <div className="mb-5 rounded-xl bg-green-100 border border-green-300 text-green-700 px-4 py-3">
                {successMessage}
              </div>
            )}

            {apiError && (
              <div className="mb-5 rounded-xl bg-red-100 border border-red-300 text-red-700 px-4 py-3">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FULL NAME */}
              <div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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

              {/* CONFIRM PASSWORD */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full pl-12 pr-12 py-3.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* TERMS */}
              <label className="flex items-center gap-3 text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4 accent-green-600" />

                <span>
                  I agree to the
                  <span className="text-green-600 font-medium">
                    {" "}
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-green-600 font-medium">
                    Privacy Policy
                  </span>
                </span>
              </label>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 transition duration-300 py-3.5 rounded-lg text-white font-semibold shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="flex items-center my-7">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="w-full border border-gray-300 rounded-lg py-3.5 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >
              <img src={googleLogo} alt="Google" className="w-5 h-5" />

              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-gray-500 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;