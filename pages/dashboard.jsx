// pages/dashboard.jsx
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import RequireAuth from "../components/RequireAuth";
import JobList from "../components/JobList";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/api/applications");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <RequireAuth>
      <Navbar />
      <div className="relative flex-grow bg-emerald-50 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
          <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
          <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
        </div>

        {/* Content — extra bottom padding on mobile to clear the bottom bar */}
        <div className="relative px-4 sm:px-6 py-6 sm:py-8 pb-28 sm:pb-8 max-w-5xl mx-auto z-10">

          {/* Desktop: inline Add Job button */}
          <div className="hidden sm:block mb-5">
            <Link href="/jobs/add">
              <button className="bg-emerald-600 text-white px-5 py-3 rounded-lg hover:bg-emerald-700 text-base font-semibold transition-colors shadow-sm">
                + Add Job
              </button>
            </Link>
          </div>

          <JobList jobs={jobs} refreshJobs={fetchJobs} />
        </div>
      </div>

      {/* ── Mobile bottom bar with real notch cutout ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-20">
        {/* SVG bar with arch cutout */}
        <svg
          className="w-full drop-shadow-[0_-4px_12px_rgba(0,0,0,0.10)]"
          viewBox="0 0 375 64"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", height: 64 }}
        >
          <path
            d="
              M0,0
              L155,0
              Q167,0 170,12
              A40,40 0 0 0 205,12
              Q208,0 220,0
              L375,0
              L375,64
              L0,64
              Z
            "
            fill="white"
          />
        </svg>

        {/* FAB — sits centered, elevated above the notch */}
        <Link
          href="/jobs/add"
          className="absolute left-1/2 -translate-x-1/2 -top-7 z-10"
        >
          <button
            aria-label="Add Job"
            className="w-14 h-14 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all duration-150 flex items-center justify-center ring-4 ring-emerald-50"
            style={{ boxShadow: "0 4px 24px rgba(2, 4, 4, 0.5)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-7 h-7"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </Link>

        {/* Label inside the bar */}
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-400 pointer-events-none">
          Add Job
        </span>
      </div>
    </RequireAuth>
  );
}
