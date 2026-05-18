import { useState } from "react";
import api from "../api/axios";
import { setToken } from "../utils/token";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Sending:", email, password);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", res.data);

      setToken(res.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      console.log("Login Error:", err.response?.data);

      alert(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">
      
      {/* Background Blur Circles */}
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-pink-400/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>

      {/* Theme Toggle */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-96 p-8 rounded-3xl border border-white/20 dark:border-gray-700/40 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300/50 dark:border-gray-600 bg-white/70 dark:bg-gray-700/60 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 p-3 w-full mb-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300/50 dark:border-gray-600 bg-white/70 dark:bg-gray-700/60 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 p-3 w-full mb-5 rounded-xl outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 active:scale-[0.98] text-white w-full p-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔥 NEW: REGISTER LINK */}
        <p className="text-center mt-5 text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
          >
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}