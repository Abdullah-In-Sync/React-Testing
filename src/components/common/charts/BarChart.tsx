import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

  return <div>{barChart()}</div>;
}

export default BarChart;
