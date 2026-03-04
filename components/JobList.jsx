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
          <div key={job._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <h2 className="font-bold text-lg text-gray-600">{job.jobTitle}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-600">
                Applied Date:{" "}
                {job.appliedDate
                  ? new Date(job.appliedDate).toLocaleDateString()
                  : "Not set"}
              </p>

              {/* tampilkan notes */}
              {job.notes && <p className="italic text-gray-600">Notes: {job.notes}</p>}
              <span
                className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${job.status === "applied"
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
            <div className="space-x-2 flex">
              <button
                onClick={() => setEditingJobId(job._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="text-center text-gray-500">Belum ada aplikasi pekerjaan.</p>
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

