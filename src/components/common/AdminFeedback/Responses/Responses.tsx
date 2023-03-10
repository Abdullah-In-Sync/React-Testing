import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  TextField,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableGenerator from "../../TableGenerator";
import NextLink from "next/link";
import dayjs, { Dayjs } from "dayjs";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
/* istanbul ignore next */
type propTypes = {
  setLoader: any;
  orgData?: any;
  handleDateChange?: any;
  handlePageChange?: any;
  feedbackId?: string;
  handleCsvDownload?: (value: any) => void;
};

export default function FeedbackResponses(props: propTypes) {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [nextPage] = useState<string>(null);
  const [previousPage] = useState<any>(null);
  const [firstPage] = useState<any>(null);
  const [lastPage] = useState<any>(null);

  const filterFeedbackData =
    props.orgData?.adminViewResponseByFeedbackId?.feedbackdata;

  const filterFeedbackresponseData =
    props.orgData?.adminViewResponseByFeedbackId?.feedbackresponse;

  const fields = [
    {
      key: "therapist_name",
      columnName: "Therapist Name",
      visible: true,
      render: (val) => val,
    },
    {
      key: "patient_name",
      columnName: "Assigned Patient",
      visible: true,
      render: (val) => val,
    },
    {
      key: "therapy_name",
      columnName: "Therapy Name",
      visible: true,
      render: (val) => val,
    },

    {
      key: "created_date",
      columnName: "Submitted On",
      visible: true,
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },

    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => {
        const feedbackType =
          filterFeedbackData[0]["feedback_type"] === "client"
            ? "patient"
            : filterFeedbackData[0]["feedback_type"];
        /* istanbul ignore next */
        const handleClickDownload = () => {
          props?.handleCsvDownload(value);
        };
        return (
          <>
            <NextLink
              href={`/admin/feedback/responses/${props?.feedbackId}/${
                value?.pttherapy_id
              }/${value[`${feedbackType}_id`]}`}
              passHref
            >
              <IconButton size="small" data-testid="view-icon-button">
                <VisibilityIcon />
              </IconButton>
            </NextLink>

            <IconButton
              size="small"
              data-testid={`download-icon-button-second-${value._id}`}
              onClick={handleClickDownload}
            >
              <DownloadIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const [startDatevalue, setStartDateValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18")
  );

  const [endDatevalue, setEndDateValue] = React.useState<Dayjs | null>(
    dayjs("2014-08-18")
  );

  /* istanbul ignore next */
  const handleChangeStartDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setStartDateValue(newValue);
    /* istanbul ignore next */
    props.handleDateChange(newValue, "startDate");
  };

  /* istanbul ignore next */
  const handleChangeEndDate = (newValue: Dayjs | null) => {
    /* istanbul ignore next */
    setEndDateValue(newValue);
    /* istanbul ignore next */
    props.handleDateChange(newValue, "endDate");
  };

  /* istanbul ignore next */
  const changePage = (url: any) => {
    /* istanbul ignore next */
    console.log("CHANGE PAGE", url);
  };

  /* istanbul ignore next */
  const handleClickCsvDownload = () => {
    props?.handleCsvDownload(null);
  };

  return (
    <>
      <Box data-testid="abcd">
        <Grid container spacing={2} marginBottom={5} paddingTop={2}>
          <Grid style={{ alignSelf: "stretch" }} item xs={6}>
            <Button
              className="nextButton"
              data-testid="backButton"
              variant="contained"
              onClick={() =>
                /* istanbul ignore next */
                router?.push("/admin/feedback/")
              }
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={1}>
                <DatePicker
                  disableFuture
                  inputFormat="DD-MM-YYYY"
                  data-testid="StartDateBox"
                  disabled={false}
                  label="Start Date"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={startDatevalue}
                  onChange={handleChangeStartDate}
                  renderInput={(params) => <TextField {...params} />}
                  className="form-control-bg"
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={1}>
                <DatePicker
                  disableFuture
                  inputFormat="DD-MM-YYYY"
                  label="End Date"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={endDatevalue}
                  onChange={handleChangeEndDate}
                  renderInput={(params) => <TextField {...params} />}
                  className="form-control-bg"
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-between",
            p: 1,
            bgcolor: "background.paper",
            backgroundColor: "#6BA08E",
            borderRadius: "10px 10px 0 0",
            paddingBottom: "13px",
          }}
        >
          <div></div>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              display: "grid",
              placeItems: "center",
            }}
          >
            {filterFeedbackData && filterFeedbackData[0]?.name}
          </Typography>

          <IconButton
            size="small"
            data-testid="download-icon-button-first"
            style={{
              backgroundColor: "#fff",
              width: "unset",
              marginRight: "10px",
            }}
            onClick={handleClickCsvDownload}
            // onClick={() => }
          >
            <DownloadIcon />
          </IconButton>
        </Box>

        <div
          style={{
            padding: "30px",
            border: "2px ",
            borderStyle: "solid",
            borderColor: "#6BA08E",
            overflow: "visible",
            zIndex: 0,
          }}
        >
          <Grid
            marginBottom={2}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <Grid item xs={4}>
              <Typography
                style={{ fontSize: "16px", fontWeight: 600, marginRight: 10 }}
              >
                Session Name:
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                width: "20%",
              }}
            >
              <Typography style={{ fontSize: "16px", marginRight: 10 }}>
                Session{" "}
                {filterFeedbackData && filterFeedbackData[0]?.session_no}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                style={{ fontSize: "16px", fontWeight: 600, marginRight: 10 }}
              >
                Organization Name:
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                width: "20%",
              }}
            >
              <Typography style={{ fontSize: "16px", marginRight: 10 }}>
                {filterFeedbackData && filterFeedbackData[0]?.org_detail.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                style={{ fontSize: "16px", fontWeight: 600, marginRight: 10 }}
              >
                User Type:
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                width: "20%",
              }}
            >
              <Typography style={{ fontSize: "16px", marginRight: 10 }}>
                {filterFeedbackData && filterFeedbackData[0]?.user_type}
              </Typography>
            </Grid>
          </Grid>

          <Box style={{ paddingBottom: 30 }}>
            <TableGenerator
              fields={fields}
              data={filterFeedbackresponseData}
              currentPage={page}
              onPageChange={(page, direction) => {
                /* istanbul ignore next */
                setPage(page);
                /* istanbul ignore next */
                props.handlePageChange(page, "page");

                /* istanbul ignore next */
                if (direction === "next") {
                  changePage(nextPage);
                } else if (direction === "back") {
                  changePage(previousPage);
                } else if (direction === "first") {
                  changePage(firstPage);
                } else if (direction === "last") {
                  changePage(lastPage);
                }
              }}
              backendPagination={true}
              onRowPerPageChange={(rows) => {
                /* istanbul ignore next */
                setRowsPerPage(rows);
                /* istanbul ignore next */
                props.handlePageChange(rows, "rows");
              }}
              dataCount={filterFeedbackresponseData?.length}
              selectedRecords={[]}
              rowOnePage={rowsPerPage}
            />
          </Box>
        </div>
      </Box>
    </>
  );
}
