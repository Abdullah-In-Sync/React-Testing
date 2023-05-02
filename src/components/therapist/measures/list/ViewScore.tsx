import { Box, Button, Grid } from "@mui/material";
import React from "react";
import TableGenerator from "../../../common/TableGenerator";
import moment from "moment";
import { useStyles } from "../../../patient/measures/measureStyle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { LineChart } from "../../../common/Chart/lineChart";

type propTypes = {
  therapistViewScoreData?: any;
  onPressCancelBack?: any;
};

export default function ViewScore(props: propTypes) {
  console.log("Koca: therapistViewScoreData ", props.therapistViewScoreData);
  const classes = useStyles();
  // const { seriesX, seriesY } = useMemo(() => {
  //   const scoreDetail =
  //     props.therapistViewScoreData?.therapistViewScoreList?.scores_list?.map(
  //       (ele) => {
  //         return {
  //           score: ele.score,
  //           created_date: ele.created_date,
  //         };
  //       }
  //     );

  //   const seriesY = scoreDetail?.map((e) => e.score)?.reverse();
  //   const seriesX = scoreDetail?.map((e) => e.created_date)?.reverse();

  //   return {
  //     seriesX: seriesX || ["2030"],
  //     seriesY: seriesY || [0],
  //   };
  // }, [props.therapistViewScoreData?.therapistViewScoreList?.scores_list]);

  /* istanbul ignore next */
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
      columnName: props.therapistViewScoreData?.therapistViewScoreList?.title,
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
          //  onClick={() => onViewResponseClick(record)}
          color="primary"
          data-testid={`view-response-${record?._id}`}
        >
          View Response
        </Button>
      ),
    },
  ];
  return (
    <>
      <Box style={{ paddingBottom: "10px" }}>
        <Button
          className="nextButton"
          data-testid="backButton"
          variant="contained"
          onClick={props.onPressCancelBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Box>

      <Box className={classes.wrapper}>
        <Grid
          className={classes.tileHeader}
          display="flex"
          justifyContent={"space-between"}
          style={{ fontWeight: 500, fontSize: "14px" }}
        >
          <span>
            {
              /* istanbul ignore next */
              props.therapistViewScoreData?.therapistViewScoreList?.title
            }
          </span>
        </Grid>
        <Box
          data-testid={"chart"}
          margin={"10px"}
          className={classes.chartWrapper}
        >
          {/* <LineChart seriesX={seriesX} seriesY={seriesY} /> */}
        </Box>
        <Box
          data-testid={"table-list"}
          margin={"30px 10px"}
          className={classes.scoreTable}
        >
          <TableGenerator
            fields={fields}
            data={
              /* istanbul ignore next */
              props.therapistViewScoreData?.therapistViewScoreList?.scores_list
            }
            loader={false}
            dataCount={10}
            selectedRecords={[]}
            showPagination={false}
          />
        </Box>
      </Box>
    </>
  );
}
