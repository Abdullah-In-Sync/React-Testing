import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = ({ data, displayY = true }: any) => {
  const chartRef = useRef(null);
  const lineOptions = {
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
          display: displayY,
          beginAtZero: true,
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

  return (
    <div className="canvas-container">
      <Line options={lineOptions} data={data} ref={chartRef} />
    </div>
  );
};

export default LineChart;
