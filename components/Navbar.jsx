// components/Navbar.jsx
import Link from "next/link";
import { useAuth } from "../src/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
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
    <nav className="w-full bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg text-emerald-600">
          My Jobs
        </Link>

        <div className="space-x-4">
          {loading ? (
            // placeholder singkat selama cek auth (sama di server & awal client)
            <div className="h-6 w-32 bg-gray-100 rounded" />
          ) : user ? (
            <>
              <button onClick={handleLogout} className="text-red-600 hover:text-grey-400 font-semibold px-4 py-2 rounded-md hover:bg-red-100 border border-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-amber-300">
                Login
              </Link>

              <Link href="/register" className="text-blue-800 px-4 py-2 font-semibold rounded-md bg-amber-100 hover:bg-amber-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
