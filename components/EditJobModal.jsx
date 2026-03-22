// components/EditJobModal.jsx
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import api from "../utils/api";
import JobForm from "./JobForm";
import Swal from "sweetalert2";

export default function EditJobModal({ jobId, onClose, onSaved }) {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Wait until client is mounted before using portal (SSR-safe)
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (jobId) {
            setLoading(true);
            api
                .get(`/api/applications/${jobId}`)
                .then((res) => {
                    setJob(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [jobId]);

    const handleUpdate = async (data) => {
        try {
            await api.put(`/api/applications/${jobId}`, data);
            onSaved();
            onClose();
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Job berhasil diupdate.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Gagal update job. Silakan coba lagi.",
            });
        }
    };

    // Close when clicking the backdrop
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    // Don't render on server
    if (!mounted) return null;

    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg relative animate-in max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 flex-shrink-0">
                    {/* Mobile drag handle */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full sm:hidden" />
                    <h2 className="text-xl font-bold text-gray-800">Edit Job</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-5 py-5 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                        </div>
                    ) : job ? (
                        <JobForm initialValues={job} onSubmit={handleUpdate} />
                    ) : (
                        <p className="text-center text-red-500 py-8">
                            Gagal memuat data job.
                        </p>
                    )}
                </div>
            </div>

            <style jsx>{`
        .animate-in {
          animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
        </div>
    );

    // Render via portal directly into <body> — escapes all stacking contexts
    return createPortal(modalContent, document.body);
}
