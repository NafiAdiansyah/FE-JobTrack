import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart({ jobs }) {
  const statusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#3B82F6", "#F59E0B", "#10B981", "#EF4444"],
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Application Stats</h2>
      <Pie data={data} />
    </div>
  );
}
