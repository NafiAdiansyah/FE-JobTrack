// pages/login.jsx
import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../src/AuthContext";
import Link from "next/link"; // pastikan path sesuai struktur project

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  // handleChange untuk input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // handleSubmit untuk login email+password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/auth/login", form);
      const { token, user } = res.data;

      if (token) {
        setAuth(token, user); // simpan via AuthContext
        router.push("/dashboard");
      } else {
        setError("Login failed: no token received");
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  // handleGoogleLogin untuk login via Firebase Google
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const { auth, provider } = await import("../lib/firebaseClient");
      const { signInWithPopup } = await import("firebase/auth");
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Kirim idToken ke backend -> tukar ke JWT custom
      const res = await api.post("/api/auth/google", { idToken });
      const { token, user } = res.data;

      if (token) {
        setAuth(token, user); // simpan via AuthContext
        router.push("/dashboard");
      } else {
        setError("Login failed: no token received");
      }
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-emerald-50 overflow-hidden">
      {/* Background lingkaran + blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
        <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
        <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-emerald-100 text-gray-600 p-6 rounded-xl shadow-lg w-full max-w-md z-10 backdrop-blur-sm"
      >
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome</h1>
        <h2 className="text-xl font-bold mb-4 text-center">
          Login to your account to continue
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />

        <div className="flex justify-center">
          <button className="px-4 py-2 align-center bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Login
          </button>
        </div>

        <p className="text-center text-sm mt-4">or login with</p>

        {/* Tombol login Google */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center p-2 border-2 mt-4 border-emerald-600 rounded hover:bg-emerald-700"
          >
            <FcGoogle className="text-3xl" />
          </button>
        </div>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
