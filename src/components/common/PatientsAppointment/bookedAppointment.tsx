import { Box, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_APPOINTMENTS_LIST } from "../../../graphql/query/resource";
import ContentHeader from "../ContentHeader";
import TableGenerator from "../TableGenerator";
import moment from "moment";
import SingleSelectComponent from "../SelectBox/SingleSelect/SingleSelectComponent";
import Loader from "../Loader";

const BookedAppointment = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [nameTherapist, setNameTherapist] = useState();

  const [loader, setLoader] = useState<boolean>(false);
  const [getTemplateData, { loading: resLoading, data: resData }] =
    useLazyQuery(GET_PATIENT_APPOINTMENTS_LIST, {
      onCompleted: () => {
        setLoader(false);
      },
    });

  const set2 = () => {
    /* istanbul ignore next */
    //Set on change function
  };

  const fields = [
    {
      key: "app_date",
      columnName: "Date",
      visible: true,
      render: (val) => moment(val).format("DD/MM/YY"),
    },
    {
      key: "app_start",
      columnName: "Time",
      visible: true,
      render: (_, record) => {
        const newDate = record.app_start + "-" + record.app_finish;
        return newDate;
      },
    },

    {
      key: "app_type",
      columnName: "Type",
      visible: true,
      render: (val) => {
        if (val == 1) {
          return "Initial";
        }
        if (val == 2) {
          return "Treatment";
        }
        if (val == 3) {
          return "Review";
        }
        if (val == 4) {
          return "Follow Up";
        }
      },
    },
    {
      key: "app_communication",
      columnName: "Connect",
      visible: true,
      render: (val) => {
        if (val == "1") {
          return "Audio";
        }
        if (val == "2") {
          return "Video";
        }
        if (val == "3") {
          return "Message";
        }
        if (val == "4") {
          return "Face to face";
        }
      },
    },
    {
      key: "app_status",
      columnName: "Status",
      visible: true,
      render: (val) => {
        if (val == 0) {
          return "Pending";
        }
        if (val == 1) {
          return "Confirmed	";
        }
        if (val == 2) {
          return "Cancled";
        }
        if (val == 3) {
          return "Completed";
        }
        if (val == "4") {
          return "DND";
        }
      },
    },

    {
      key: "actions",
      columnName: "Actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButton
            size="small"
            data-testid={"viewIcon_" + value._id}
            onClick={() =>
              router.push(`/admin/resource/template/view/${value._id}`)
            }
          >
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const dataSource = useMemo(() => {
    const data = resData?.getAppointmentsByPatientId?.map((ele, index) => {
      return { ...ele, index: index + 1 };
    });
    return data || [];
  }, [resData]);

  useEffect(() => {
    setLoader(true);
    getTemplateData();
  }, []);

  useEffect(() => {
    if (resData) {
      setNameTherapist(
        resData?.getAppointmentsByPatientId[0]?.therapist_data[0]
          ?.therapist_name
      );
    }
  }, [resData]);

  useEffect(() => {
    /* istanbul ignore next */
    if (!resLoading && resData) {
      setLoader(false);
    }
  }, [resData]);

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader data-testid="bookedAppointment" />

      <Box
        style={{
          padding: "10px",
        }}
      >
        <Box>
          <Grid
            marginBottom={2}
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <Grid item xs={4}>
              <Typography
                style={{ fontSize: "24px", fontWeight: 600, marginRight: 10 }}
              >
                Therapist
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                width: "20%",
              }}
            >
              <SingleSelectComponent
                fullWidth={true}
                required={false}
                id="nameTherapist"
                labelId="nameTherapist"
                name="resource_type"
                value={nameTherapist}
                label={nameTherapist}
                onChange={set2}
                inputProps={{ "data-testid": "nameTherapist" }}
                options={[]}
                mappingKeys={["id", "value"]}
                size="small"
                className="form-control-bg"
              />
            </Grid>
          </Grid>
        </Box>
        {resData?.getAppointmentsByPatientId ? (
          <TableGenerator
            fields={fields}
            data={dataSource}
            currentPage={page}
            onPageChange={(page) => {
              /* istanbul ignore next */
              setPage(page);
              /* istanbul ignore next */
            }}
            loader={loader}
            backendPagination={false}
            selectedRecords={[]}
            rowOnePage={10}
            showPagination={true}
          />
        ) : (
          <Typography
            gutterBottom
            component="div"
            data-testid="no-data-found-patient-resource-detail"
            sx={{ textAlign: "center", paddingTop: "10px" }}
          >
            You have not booked any appointment
          </Typography>
        )}
      </Box>
    </>
  );
};
export default BookedAppointment;
