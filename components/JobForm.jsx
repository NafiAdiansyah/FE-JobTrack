// components/JobForm.jsx
import { useEffect, useState } from "react";

export default function JobForm({ initialValues = null, initialData = null, onSubmit }) {
  const initial = initialValues || initialData || {
    jobTitle: "",
    company: "",
    status: "applied",
    notes: "",
    appliedDate: "",
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
          ? new Date(data.appliedDate).toISOString().split("T")[0]
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

  const inputClass =
    "w-full px-3 py-2.5 border border-emerald-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="w-full text-gray-900 space-y-0">
      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={form.jobTitle}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <input
        type="text"
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="hired">Hired</option>
      </select>

      <input
        type="date"
        name="appliedDate"
        value={form.appliedDate}
        onChange={handleChange}
        className={inputClass}
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2.5 border border-emerald-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 resize-none"
      />

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
