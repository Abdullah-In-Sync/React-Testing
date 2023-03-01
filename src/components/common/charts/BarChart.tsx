import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const barOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    y: {
      ticks: {
        display: true,
        beginAtZero: true,
        callback: (yValue) => {
          if (Number.isInteger(yValue)) return Math.floor(yValue);
        },
      },
    },
    x: {
      ticks: {
        display: true,
        beginAtZero: true,
      },
    },
  },
};

function BarChart({ data }) {
  const barChart = () => <Bar data={data} options={barOptions} />;

  return <div className="canvas-bar-container">{barChart()}</div>;
}

export default BarChart;
