import { Box } from "@mui/system";
import { FC, useMemo } from "react";
import { ViewMeasureScoreByPatient } from "../../../graphql/Measure/types";
import { LineChart } from "../../common/Chart/lineChart";

interface MeasureScoreListProps {
  measureScoreDetail: ViewMeasureScoreByPatient;
}
export const MeasureScoreList: FC<MeasureScoreListProps> = ({
  measureScoreDetail,
}) => {
  const { seriesX, seriesY } = useMemo(() => {
    const scoreDetail = measureScoreDetail?.scale_data?.map((ele) =>
      JSON.parse(ele)
    );
    const seriesX = scoreDetail?.map((e) => e[0]);
    const seriesY = scoreDetail?.map((e) => e[1]);
    return { seriesX, seriesY };
  }, [measureScoreDetail]);

  return (
    <Box>
      <LineChart seriesX={seriesX} seriesY={seriesY} />
    </Box>
  );
};
