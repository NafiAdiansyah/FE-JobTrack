import { useState } from "react";
import { useRouter } from "next/router";
import api from "../utils/api";
import { useAuth } from "@/src/AuthContext";
import Link from "next/link";

export default function Register() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/auth/register", form);
      const { token, user } = res.data;
      console.log("Token from server:", token, typeof token);

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(token, user);
        router.push("/dashboard");
      } else {
        setError("Registration failed: no token received");
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base bg-white/70";

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-emerald-50 overflow-hidden px-4 py-8">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
        <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
        <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-emerald-100 text-gray-600 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md z-10 backdrop-blur-sm"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-gray-800">Welcome</h1>
        <h2 className="text-base sm:text-lg font-medium mb-5 text-center text-gray-500">
          Create your account to get started
        </h2>

        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={inputClass}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className={inputClass}
          required
        />

        <button className="w-full mt-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors">
          Register
        </button>

        <p className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
