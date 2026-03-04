// components/JobForm.jsx
import { useEffect, useState } from "react";

export default function JobForm({ initialValues = null, initialData = null, onSubmit }) {
  const initial = initialValues || initialData || {
    jobTitle: "",
    company: "",
    status: "applied",
    notes: "",
    appliedDate: "", // ✅ tambahkan default kosong
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    const data = initialValues || initialData;
    if (data) {
      setForm({
        jobTitle: data.jobTitle || "",
        company: data.company || "",
        status: data.status || "applied",
        notes: data.notes || "",
        appliedDate: data.appliedDate
          ? new Date(data.appliedDate).toISOString().split("T")[0] // format YYYY-MM-DD
          : "",
      });
    }
  }, [initialValues, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full text-gray-900"
    >
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={form.jobTitle}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent border-emerald-300"
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent border-emerald-300"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="hired">Hired</option>
      </select>

      {/* ✅ Field Applied Date */}
      <input
        type="date"
        name="appliedDate"
        value={form.appliedDate}
        onChange={handleChange}
        className="w-full p-2 border mb-4 rounded border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />

      {/* Notes */}
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        className="w-full p-2 border rounded border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />

      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
