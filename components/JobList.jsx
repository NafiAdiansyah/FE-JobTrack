// components/JobList.jsx
import { useState } from "react";
import api from "../utils/api";
import EditJobModal from "./EditJobModal";
import Swal from "sweetalert2";

export default function JobList({ jobs, refreshJobs }) {
  const [editingJobId, setEditingJobId] = useState(null);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Lamaran?",
      text: "Data yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/applications/${id}`);
        await refreshJobs();
        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Lamaran berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Gagal menghapus lamaran.",
        });
      }
    }
  };

  return (
    <>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg text-gray-700 truncate">{job.jobTitle}</h2>
              <p className="text-gray-600 text-sm">{job.company}</p>
              <p className="text-gray-500 text-sm">
                Applied:{" "}
                {job.appliedDate
                  ? new Date(job.appliedDate).toLocaleDateString()
                  : "Not set"}
              </p>
              {job.notes && (
                <p className="italic text-gray-500 text-sm mt-1 truncate">
                  Notes: {job.notes}
                </p>
              )}
              <span
                className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${
                  job.status === "applied"
                    ? "bg-yellow-100 text-yellow-700"
                    : job.status === "interview"
                    ? "bg-blue-100 text-blue-700"
                    : job.status === "offer"
                    ? "bg-green-100 text-green-700"
                    : job.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : job.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {job.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:flex-col md:flex-row flex-shrink-0">
              <button
                onClick={() => setEditingJobId(job._id)}
                className="flex-1 sm:flex-none bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="flex-1 sm:flex-none bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-center text-gray-500 py-12">Belum ada aplikasi pekerjaan.</p>
        )}
      </div>

      {/* Edit Modal */}
      {editingJobId && (
        <EditJobModal
          jobId={editingJobId}
          onClose={() => setEditingJobId(null)}
          onSaved={refreshJobs}
        />
      )}
    </>
  );
}
