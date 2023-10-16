import { Box, Button, Grid, Link, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import CustomModal from "../CustomModal/customModel";
import { env } from "../../../lib/env";

type propTypes = {
  setLoader: any;
};

const PatientHome = (props: propTypes) => {
  const { user } = useAppContext();
  const theme = useTheme();
  /* istanbul ignore next */
  const therapistName = user?.therapist_data?.therapist_name;
  /* istanbul ignore next */
  const username = user?.patient_data;
  /* istanbul ignore next */
  const cookies = env.corpWebsite.cookies;
  /* istanbul ignore next */
  const firstName = username?.patient_firstname;
  /* istanbul ignore next */
  const lastName = username?.patient_lastname;
  const [cookiesModalOpen, setCookiesModalOpen] = useState<boolean>(false);

  const [getHomeData, { loading: homeDataLoading, data: homeDataData }] =
    useLazyQuery(GET_PATIENT_HOME_DATA, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        console.log("Koca: data ", data);
      },
    });

  /* istanbul ignore next */
  const cookiesName = localStorage.getItem("Cookies Policy");

  /* istanbul ignore next */
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

      <form data-testid="home-form" style={{ paddingBottom: "30px" }}>
        <Box data-testid="Main" style={{ padding: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4
                style={{
                  color: theme.palette.primary.main,
                  fontSize: "20px",
                  fontFamily: "Montserrat",
                  fontWeight: "700",
                }}
              >
                {` Welcome to MyHelp Dear ${firstName} ${lastName}`}
              </h4>
            </div>
            <div>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Your Therapist is:{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: theme.palette.primary.main,
                    fontSize: "14px",
                  }}
                >
                  {therapistName}
                </span>
              </Typography>
            </div>
          </div>
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
          <hr />

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
      </form>
    </>
  );
};
export default PatientHome;
