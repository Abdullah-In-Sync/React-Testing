import { FC } from "react";

interface LineChartProps {
  seriesX: Array<string | number>;
  seriesY: Array<string | number>;
}
export const LineChart: FC<LineChartProps> = ({ seriesX, seriesY }) => {

    console.log(seriesX, seriesY );
  return <div></div>;
};
