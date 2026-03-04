// pages/applications/add.jsx
import { useRouter } from "next/router";
import RequireAuth from "../../components/RequireAuth";
import JobForm from "../../components/JobForm";
import api from "../../utils/api";
import Navbar from "../../components/Navbar";

export default function AddApplication() {
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
      <div className="max-w-lg mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Add Job Application</h1>
        <JobForm onSubmit={handleAdd} />
      </div>
    </RequireAuth>
  );
}
