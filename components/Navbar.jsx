// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../src/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    const result = await Swal.fire({
      title: "Logout?",
      text: "Apakah kamu yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      logout();
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg text-emerald-600">
          My Jobs
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center space-x-4">
          {loading ? (
            <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          ) : user ? (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-md hover:bg-red-100 border border-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-amber-300 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-blue-800 px-4 py-2 font-semibold rounded-md bg-amber-100 hover:bg-amber-300 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-transform duration-200 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 transition-transform duration-200 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          {loading ? (
            <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          ) : user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-600 font-semibold px-4 py-2 rounded-md hover:bg-red-100 border border-red-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-amber-300 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-blue-800 px-4 py-2 font-semibold rounded-md bg-amber-100 hover:bg-amber-300 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
