// pages/applications/[id]/edit.jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RequireAuth from "../../../components/RequireAuth";
import JobForm from "../../../components/JobForm";
import api from "../../../utils/api";
import Navbar from "../../../components/Navbar";

export default function EditApplication() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Kalau backend BELUM punya GET /applications/:id, fallback ambil list lalu filter
    api
      .get("/api/applications")
      .then((res) => {
        const found = res.data.find((x) => x._id === id);
        setJob(found || null);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      });
  }, [id, router]);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/api/applications/${id}`, data); // pastikan route ini ada di backend
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update application");
    }
  };

  if (!job) return <p className="text-center mt-10">Loading...</p>;

  return (
    <RequireAuth>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10">
        <JobForm initialValues={job} onSubmit={handleUpdate} />
      </div>
    </RequireAuth>
  );
}
