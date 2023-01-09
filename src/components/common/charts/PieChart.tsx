import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// interface PieData {
//   labels?: string[];
//   datasets?: [
//     {
//       label?: string;
//       data?: number[];
//       backgroundColor?: string[];
//       borderColor?: string[];
//       borderWidth?: number;
//     }
//   ];
// }

// type Props = React.PropsWithChildren<{
//   data?: PieData;
// }>;

const PieChartComponent = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChartComponent;
