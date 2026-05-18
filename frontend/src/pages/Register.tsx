import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.api";
import ThemeToggle from "../components/common/ThemeToggle";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      setLoading(false);

      navigate("/login");
    } catch (err: any) {
      setLoading(false);
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">

      {/* Background Blur Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-pink-400/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>

      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white/60 dark:bg-gray-800/40 backdrop-blur-2xl border border-white/20 dark:border-gray-700/40 rounded-3xl shadow-2xl p-8 transition-all duration-500 hover:scale-[1.02]">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2 mb-6">
          Start managing your leads smarter
        </p>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm text-center border border-red-200 dark:border-red-800 backdrop-blur-md">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* FOOTER LINK */}
        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline transition"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;