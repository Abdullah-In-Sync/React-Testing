import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Grid } from "@mui/material";
import moment from "moment";
import { getScoreGraphCoordinates } from "../../../../utility/helper";
import { LineChart } from "../../../common/Chart/lineChart";
import TableGenerator from "../../../common/TableGenerator";
import { useStyles } from "../../../patient/measures/measureStyle";

type propTypes = {
  therapistViewScoreData?: any;
  onPressCancelBack?: any;
  onViewResponseClick?: (v) => void;
};

export default function ViewScore(props: propTypes) {
  const {
    therapistViewScoreData: { scores_list: scoresList = [], title = "" },
    onViewResponseClick,
    onPressCancelBack,
  } = props;

  const classes = useStyles();

  const { seriesX, seriesY } = getScoreGraphCoordinates(scoresList);

  /* istanbul ignore next */
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
          onClick={() =>
            onViewResponseClick({
              ...record,
              ...{
                title,
              },
            })
          }
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
          onClick={onPressCancelBack}
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
          <span>{title}</span>
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
          className={"scoreTableWrapper"}
        >
          <TableGenerator
            fields={fields}
            data={scoresList}
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
