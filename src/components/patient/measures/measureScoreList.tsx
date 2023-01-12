import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import {
  ScoreDatum,
  ViewMeasureScoreByPatient,
} from "../../../graphql/Measure/types";
import { LineChart } from "../../common/Chart/lineChart";
import TableGenerator from "../../common/TableGenerator";
import { useStyles } from "./measureStyle";

interface MeasureScoreListProps {
  measureScoreDetail: ViewMeasureScoreByPatient;
}
export const MeasureScoreList: FC<MeasureScoreListProps> = ({
  measureScoreDetail,
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { seriesX, seriesY } = useMemo(() => {
    const scoreDetail = measureScoreDetail?.scale_data?.map((ele) =>
      JSON.parse(ele)
    );
    const seriesX = scoreDetail?.map((e) => e[0]);
    const seriesY = scoreDetail?.map((e) => e[1]);
    return { seriesX, seriesY };
  }, [measureScoreDetail]);

  //**  TABLE DATA COLUMNS **//
  const fields = [
    {
      columnName: "S. No.",
      visible: true,
      render: (val, record, index) => index + 1,
    },
    {
      columnName: "Date",
      key: "created_date",
      visible: true,
      render: (val) => moment(val).format("DD-MM-YYYY"),
    },
    {
      columnName: "Score",
      key: "patmscore_value",
      visible: true,
      render: (val) => val,
    },
    {
      columnName: "Actions",
      visible: true,
      render: (val, record) => (
        <Button
          className={classes.viewResponseButton}
          onClick={() => onViewResponseClick(record)}
          color="primary"
          data-testid={`view-response-${record?._id}`}
        >
          View Response
        </Button>
      ),
    },
  ];

  const onViewResponseClick = (record: ScoreDatum) => {
    router.push(`response/${record._id}`);
  };

  return (
    <Box className={classes.wrapper}>
      <Grid
        className={classes.tileHeader}
        display="flex"
        justifyContent={"space-between"}
        style={{ fontWeight: 500, fontSize: "14px" }}
      >
        <span>Test</span>
      </Grid>
      <Box
        data-testid={"chart"}
        margin={"10px"}
        className={classes.chartWrapper}
      >
        <LineChart seriesX={seriesX} seriesY={seriesY} />
      </Box>
      <Box
        data-testid={"table-list"}
        margin={"30px 10px"}
        className={classes.scoreTable}
      >
        <TableGenerator
          fields={fields}
          data={measureScoreDetail?.score_data}
          loader={false}
          dataCount={10}
          selectedRecords={[]}
          showPagination={false}
        />
      </Box>
    </Box>
  );
};
