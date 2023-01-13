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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    scales: {
      yAxes: {
        title: {
          display: true,
          font: {
            size: 50,
          },
        },
        ticks: {
          precision: 0,
        },
      },
      xAxes: {
        title: {
          display: true,
          font: {
            size: 50,
          },
        },
      },
    },
  },
};

export const LineChart: FC<LineChartProps> = ({ seriesX, seriesY }) => {
  const classes = useStyle();

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
  return <Line className={classes.chart} options={options} data={data} />;
};

const useStyle = makeStyles({
  chart: {
    height: "500px !important",
    width: "auto !important",
  },
});
