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
        // Simpan ke localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Update global AuthContext
        setAuth( token, user );

        // Setelah register langsung masuk dashboard
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
          Register to your account to continue
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border mb-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />
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
          className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          required
        />

        <div className="flex justify-center">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Register
          </button>
        </div>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
