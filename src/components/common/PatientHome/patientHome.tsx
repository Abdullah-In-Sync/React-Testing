import { Box, Button, Grid, Link, Typography, useTheme } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import StarsIcon from "@mui/icons-material/Stars";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

import Card from "@mui/material/Card";
import PreviewIcon from "@mui/icons-material/Preview";
import TungstenIcon from "@mui/icons-material/Tungsten";
import ChatIcon from "@mui/icons-material/Chat";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { useAppContext } from "../../../contexts/AuthContext";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_HOME_DATA } from "../../../graphql/query/resource";
import SureModal from "../../admin/resource/SureModal";
import { cancleAppointmentPatientHome } from "../../../utility/types/resource_types";
import moment from "moment";
import CustomModal from "../CustomModal/customModel";
import { env } from "../../../lib/env";

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};
const defaultFormValue = {
  _id: "",
};
const PatientHome = (props: propTypes) => {
  const { user } = useAppContext();
  const theme = useTheme();
  const therapistName = user?.therapist_data?.therapist_name;
  const username = user?.patient_data;
  const cookies = env.corpWebsite.cookies;
  const [cookiesModalOpen, setCookiesModalOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [formFields, setFormFields] =
    useState<cancleAppointmentPatientHome>(defaultFormValue);

  const [getHomeData, { loading: homeDataLoading, data: homeDataData }] =
    useLazyQuery(GET_PATIENT_HOME_DATA, {
      onCompleted: (data) => {
        setFormFields(data?.getPatientHomeData[0]?.appointment[0]?._id);
      },
    });

  console.log("Koca: homeDataData ", homeDataData);

  const appointmentDate = moment(
    homeDataData?.getPatientHomeData[0].appointment[0]?.app_date
  ).format("DD/MM/YY");

  const appStartTime =
    homeDataData?.getPatientHomeData[0]?.appointment[0]?.app_start;

  const appEndTime =
    homeDataData?.getPatientHomeData[0]?.appointment[0]?.app_finish;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const cookiesName = localStorage.getItem("Cookies Policy");

  const acceptCookies = () => {
    localStorage.setItem("Cookies Policy", "true");
    setCookiesModalOpen(false);
  };

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    getHomeData();
    props.setLoader(false);
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (cookiesName === "true") {
      setCookiesModalOpen(false);
    } else {
      setCookiesModalOpen(true);
    }
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    if (!homeDataLoading && homeDataData) {
      props.setLoader(false);
    }
  }, [homeDataData]);
  return (
    <>
      <CustomModal
        modalOpen={cookiesModalOpen}
        setModalOpen={setCookiesModalOpen}
        shouldCloseOnBackgroundClick={false}
        closeOnEscape={false}
      >
        <Typography
          sx={{
            padding: "20px",
            textAlign: "center",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
          }}
        >
          Cookies Policy
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            padding: "20px",
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          MyHelp uses "Cookies" to help give you the best experience on our
          platform. By continuing to use MyHelp you accept that “Cookies" may be
          stored in your device as outlined in our privacy policy.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            paddingTop: "50px",
          }}
        >
          <Button
            className={`text-white`}
            variant="contained"
            onClick={acceptCookies}
            sx={{
              height: "48px",
              paddingLeft: "30px",
              textTransform: "none",
              paddingRight: "30px",
              fontFamily: "Montserrat",
              fontWeight: "600",
            }}
            data-testid="acceptCookiesButton"
          >
            Accept All Cookies
          </Button>

          <Link href={cookies} underline="none" target="_blank">
            <Button
              variant="outlined"
              sx={{
                height: "48px",
                textTransform: "none",
                fontFamily: "Montserrat",
                paddingLeft: "30px",
                paddingRight: "30px",
                fontWeight: "600",
                color: "#6DA18F",
              }}
              data-testid="viewDetailClick"
            >
              View Details
            </Button>
          </Link>
        </Box>
      </CustomModal>

      <form
        data-testid="home-form"
        style={{ paddingBottom: "30px" }}
        onSubmit={handleSubmit}
      >
        <Box data-testid="Main" style={{ padding: "25px" }}>
          <h4
            style={{
              color: theme.palette.primary.main,
              fontSize: "20px",
              fontFamily: "Montserrat",
              fontWeight: "700",
            }}
          >
            {` Welcome to MyHelp Dear ${username?.patient_firstname} ${username?.patient_lastname}`}
          </h4>
          <p
            style={{
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "Montserrat",
            }}
          >
            We have created the MyHelp platform to support both therapists and
            Patients in their pursuit of a smoother therapy process. MyHelp
            empowers therapists throughout the entire process and delivers
            personalised care with the aim to improve patients outcomes.
            Simultaneously, patients can access their own platform to access key
            information to support their progress and communicate more
            efficiently with their therapist. We believe the MyHelp platform
            will enhance the therapeutic relationship in order to deliver better
            results.
          </p>

          <Box
            style={{
              border: "2px ",
              borderStyle: "solid",
              borderColor: theme.palette.primary.main,
              overflow: "visible",
              backgroundColor: "white",
              zIndex: 0,
              borderRadius: "7px",
              padding: "20px",
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Box>
                <p
                  style={{
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    paddingTop: "10px",
                  }}
                >
                  Your Therapist is:
                </p>
                <h2
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "30px",
                    fontFamily: "Montserrat",
                  }}
                >
                  {therapistName}
                </h2>
              </Box>
              {homeDataData?.getPatientHomeData[0].appointment == 0 ? (
                <Box
                  style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    paddingTop: "50px",
                    paddingLeft: "20px",
                  }}
                >
                  No appointments have yet been booked
                </Box>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    className={`text-white`}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      bottom: "14px",
                      height: "50px",
                      fontFamily: "Montserrat",
                      borderRadius: "10px",
                      fontSize: "14px",
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      fontWeight: "600",
                    }}
                    data-testid="wiewAppointmentButton"
                  >
                    {`Next appointment: ${appointmentDate} 
                    ${appStartTime} - ${appEndTime}`}
                  </Button>
                  <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                      textTransform: "none",
                      color: "black",
                      height: "50px",
                      fontFamily: "Montserrat",
                      borderRadius: "10px",
                      fontSize: "14px",
                      paddingLeft: "100px",
                      paddingRight: "100px",
                      fontWeight: "600",
                    }}
                    data-testid="cancelAppointmentClick"
                  >
                    Cancel Appointment
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Box sx={{ paddingTop: "30px" }}>
            <Grid container spacing={3} marginBottom={5}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="goals_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <StarsIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Goals
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Goals for Therapy that you may have agreed with your
                      therapist are included here. You are able to monitor
                      progress and provide details of how you have achieved your
                      goals. If necessary, you can refer to this in the future
                      to remind you of your overall success.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="homework_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <HomeWorkIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Homework
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      As part of your therapy, you may agree homework tasks in
                      between sessions to support your progress. These will be
                      captured here and provide a record of what was agreed. You
                      will be able to update the therapist on how you completed
                      your homework and can be discussed further in your
                      sessions.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="resource_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <CrisisAlertIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Resources
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Your therapist will share specific resources that he/she
                      considers to be useful in supporting your therapy. You can
                      access these within this section now and in the future.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ paddingTop: "30px" }}>
            <Grid container spacing={3} marginBottom={5}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="review_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <PreviewIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Review
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      The progress in your Therapy can be measured using the PHQ
                      9 and GAD 7 measures which are contained in this section,
                      along with a graphical illustration showing your progress.
                      As you complete these, the results are also shared with
                      your therapist.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="monitor_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <StackedBarChartIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Monitors
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      You will agree the use of personalised Monitors that you
                      and your therapist consider appropriate to monitor factors
                      that impact on your Mental Health. You will be able to
                      complete the monitor in this area and review past
                      responses.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="relapse_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <TungstenIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Relapse
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Once you come close to the end of your therapy sessions
                      with your therapist, you will agree a plan that will
                      assist in preventing you going back into the problems you
                      originally faced.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ paddingTop: "30px" }}>
            <Grid container spacing={3} marginBottom={5}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345, height: "35vh" }}>
                  <CardHeader
                    data-testid="communication_card"
                    avatar={
                      <Avatar
                        sx={{ bgcolor: theme.palette.primary.main }}
                        aria-label="recipe"
                      >
                        <ChatIcon />
                      </Avatar>
                    }
                    title={
                      <Typography
                        style={{
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        Communication
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#30373E"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      Connect directly with your therapist, through video or
                      audio calls or live messaging. This enables a more direct
                      contact with your therapist using your preferred
                      communication medium and in an area where your data is
                      protected but can be easily accessed in the future.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        </Box>
        <SureModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setConfirmSubmission={setConfirmSubmission}
        >
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: "27px",
            }}
          >
            Are you sure want to cancel the appointment
          </Typography>
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="CancelButton"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ marginLeft: "5px" }}
              size="small"
              data-testid={"ConfirmButton"}
              onClick={() => {
                setModalOpen(false);
                props.onSubmit(formFields);
                props.setLoader(false);
              }}
            >
              Confirm
            </Button>
          </Box>
        </SureModal>
      </form>
    </>
  );
};
export default PatientHome;
