import { FC } from "react";

interface LineChartProps {
  seriesX: Array<string | number>;
  seriesY: Array<string | number>;
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { makeStyles } from "@mui/styles";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart: FC<LineChartProps> = ({ seriesX, seriesY }) => {
  const classes = useStyle();

  const maxNumber = Math.max(...(seriesY as Array<number>));

  const data = {
    labels: ["", ...seriesX.map((d) => moment(d).format("DD-MM-YYYY"))],
    datasets: [
      {
        label: "Score",
        data: ["", ...seriesY],
        borderColor: "#6EC9DB",
        backgroundColor: "#fff",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: maxNumber < 6 ? 6 : maxNumber,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  return <Line className={classes.chart} options={options} data={data} />;
};

const useStyle = makeStyles({
  chart: {
    height: "500px !important",
    width: "auto !important",
  },
});
