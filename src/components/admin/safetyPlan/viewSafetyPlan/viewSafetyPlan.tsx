import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

type propTypes = {
  viewData: any;
  // setLoader: any;
};

export default function viewSafetyPlan(props: propTypes) {
  const safetyPlanData = props.viewData;
  const router = useRouter();

  return (
    <div>
      <Button
        className="nextButton"
        data-testid="backButton"
        variant="contained"
        onClick={() => router?.push("/admin/safetyPlan/")}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>

      <form
        data-testid="agreement-form"
        style={{
          paddingBottom: "30px",
          paddingTop: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6BA08E",
            borderRadius: "10px 10px 0 0",
            paddingBottom: "13px",
          }}
        >
          <div
            style={{
              padding: "14px 0 0 60px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {safetyPlanData?.viewSafetyPlanById?.name}
            </Typography>
          </div>
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
          <div>
            <Grid
              marginBottom={2}
              style={{ display: "flex", alignItems: "flex-start" }}
            >
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
                  {safetyPlanData?.viewSafetyPlanById?.name}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: "16px", fontWeight: 600, marginRight: 10 }}
                >
                  Plan Type:
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
                  {safetyPlanData?.viewSafetyPlanById?.plan_type}
                </Typography>
              </Grid>
            </Grid>

            <Box data-testid="boxId">
              <div>
                <Box
                  style={{
                    color: "#6EC9DB",
                    fontWeight: "bold",
                  }}
                >
                  Description
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    border: "1px solid #cecece",
                    display: "grid",
                  }}
                  p={2}
                  marginBottom={"25px"}
                  borderRadius={"7px"}
                >
                  <Typography>
                    {safetyPlanData?.viewSafetyPlanById.description}
                  </Typography>
                </Box>
                {safetyPlanData == 0 ? (
                  <Box>No data found.</Box>
                ) : (
                  <Box>
                    {props.viewData?.viewSafetyPlanById.questions?.map(
                      (data, index) => (
                        <Box>
                          {data?.safety_ques_type == "1" ? (
                            // Question type 1

                            <Box>
                              <Box
                                style={{
                                  color: "#6EC9DB",
                                  fontWeight: "bold",
                                }}
                              >
                                {index + 1 + ". " + data?.safety_ques}
                              </Box>
                              <Box
                                data-testid="question_type_one"
                                sx={{
                                  flexGrow: 1,
                                  border: "1px solid #cecece",
                                  display: "grid",
                                  paddingTop: "40px",
                                  paddingBottom: "40px",
                                  borderRadius: "7px",
                                }}
                              >
                                <Typography style={{ paddingLeft: "20px" }}>
                                  {data?.safety_additional_details}
                                </Typography>
                              </Box>
                            </Box>
                          ) : (
                            // Question type 2
                            <Box
                              style={{
                                paddingRight: "15px",
                                color: "#6EC9DB",
                                fontWeight: "bold",
                                paddingTop: "10px",
                              }}
                              data-testid="question_type_two"
                            >
                              {index + 1 + ". " + data?.safety_ques}
                              <FormControl
                                style={{
                                  paddingTop: "10px",
                                  display: "flex",
                                }}
                              >
                                <Box
                                  style={{
                                    paddingRight: "25px",
                                    color: "#000000DE",
                                  }}
                                >
                                  <Typography>
                                    {data.safety_additional_details}
                                  </Typography>
                                </Box>
                                {data.safety_ques_typeoption
                                  .split(",")
                                  .map((data) => (
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      defaultValue="female"
                                      name="radio-buttons-group"
                                    >
                                      <FormControlLabel
                                        value=""
                                        control={<Radio />}
                                        label={data}
                                        disabled
                                      />
                                    </RadioGroup>
                                  ))}
                              </FormControl>
                            </Box>
                          )}
                        </Box>
                      )
                    )}
                  </Box>
                )}
              </div>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
}
