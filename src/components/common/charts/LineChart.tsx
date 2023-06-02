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

const LineChart = ({
  data,
  displayY = true,
  displayYlabel,
  grid = {},
  yTicks = {},
  xTicks = {},
  yAxis,
  plugins,
  layout,
}: any) => {
  const chartRef = useRef(null);
  const lineOptions = {
    layout: layout,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: displayYlabel && {
          label: (yDatapoint) => {
            return yDatapoint.raw.label;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ...{
          grid,
          ticks: {
            ...{
              display: displayY,
              beginAtZero: true,
              tickWidth: 0,
              tickLength: 0,
            },
            ...yTicks,
          },
        },
        ...yAxis,
      },
      x: {
        ticks: {
          ...{
            display: true,
            beginAtZero: true,
          },
          ...xTicks,
        },
      },
    },
  };

  return (
    <div className="canvas-container">
      <Line
        options={lineOptions}
        data={data}
        ref={chartRef}
        plugins={plugins}
      />
    </div>
  );
};

export default LineChart;
