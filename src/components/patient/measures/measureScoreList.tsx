import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { ScoreDatum } from "../../../graphql/Measure/types";
import { LineChart } from "../../common/Chart/lineChart";
import TableGenerator from "../../common/TableGenerator";
import { useStyles } from "./measureStyle";

interface MeasureScoreListProps {
  measureScoreDetail: any;
}
export const MeasureScoreList: FC<MeasureScoreListProps> = ({
  measureScoreDetail,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const { seriesX, seriesY } = useMemo(() => {
    const scoreDetail = measureScoreDetail?.scores_list?.map((ele) => {
      return {
        score: ele.score,
        created_date: ele.created_date,
      };
    });

    const seriesY = scoreDetail?.map((e) => e.score);
    const seriesX = scoreDetail?.map((e) => e.created_date);

    return {
      seriesX: seriesX || ["2030"],
      seriesY: seriesY || [0],
    };
  }, [measureScoreDetail?.scores_list]);

  //**  TABLE DATA COLUMNS **//
  const fields = [
    {
      columnName: "Session no.",
      visible: true,
      render: (_, record) => record.session_no,
    },
    {
      columnName: "Date",
      key: "created_date",
      visible: true,
      render: (val) => moment(val).format("DD-MM-YYYY"),
    },
    {
      columnName: "Score",
      key: "score",
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
        <span>{measureScoreDetail?.title}</span>
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
          data={measureScoreDetail?.scores_list}
          loader={false}
          dataCount={10}
          selectedRecords={[]}
          showPagination={false}
        />
      </Box>
    </Box>
  );
};
