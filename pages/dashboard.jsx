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
        {/* Background lingkaran + blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
          <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
          <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
        </div>
        <div className="relative p-8 max-w-5xl mx-auto z-10">
          <div className="mb-6">
            <Link href="/jobs/add">
              <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 text-base font-semibold transition-colors">
                + Add Job
              </button>
            </Link>
          </div>

          <JobList jobs={jobs} refreshJobs={fetchJobs} />
        </div>
      </div>
    </RequireAuth>
  );
}
