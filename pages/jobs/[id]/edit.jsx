// pages/jobs/[id]/edit.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import JobForm from "../../../components/JobForm";
import Navbar from "../../../components/Navbar";
import RequireAuth from "../../../components/RequireAuth";

export default function EditJob() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/api/applications/${id}`)
        .then((res) => setJob(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/api/applications/${id}`, data);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Gagal update job");
    }
  };

  if (!job) return <p className="text-center mt-6">Loading...</p>;

  return (
    <RequireAuth>
      <Navbar />
      <div className="relative min-h-screen bg-emerald-50 overflow-hidden">
      {/* Background lingkaran + blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -top-10 -left-10" />
        <div className="absolute w-96 h-96 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 right-0" />
        <div className="absolute w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse bottom-10 left-1/3" />
      </div>
      <div className="relative p-6 max-w-3xl mx-auto z-99">
        <h1 className="text-xl font-bold mb-4 text-blue-800">Edit Job</h1>
        <JobForm initialValues={job} onSubmit={handleUpdate} />
        </div>
      </div>
    </RequireAuth>
  );
}
