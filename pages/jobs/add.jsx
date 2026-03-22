// pages/jobs/add.jsx
import JobForm from "../../components/JobForm";
import api from "../../utils/api";
import { useRouter } from "next/router";
import RequireAuth from "../../components/RequireAuth";
import Navbar from "../../components/Navbar";

export default function AddJob() {
  const router = useRouter();

  const handleAdd = async (data) => {
    try {
      await api.post("/api/applications", data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add application");
    }
  };

  return (
    <RequireAuth>
      <Navbar />
      <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
          <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
          <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
        </div>

        <div className="relative px-4 sm:px-6 py-6 sm:py-8 max-w-2xl mx-auto z-10">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800 mb-5">
            Add Job Application
          </h1>
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
            <JobForm onSubmit={handleAdd} />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
