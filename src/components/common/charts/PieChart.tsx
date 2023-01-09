import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const pieOptions = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const PieChartComponent = ({ data }) => {
  return (
    <div className="canvas-container">
      <Pie data={data} options={pieOptions} />
    </div>
  );
};

export default PieChartComponent;
