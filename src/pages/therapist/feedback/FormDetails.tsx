import { useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import TextFieldComponent from "../../../components/common/TextField/TextFieldComponent";
import { GET_THERAPIST_FEEDBACKLIST_DATA_NEW } from "../../../graphql/Feedback/graphql";
import {
  TherapistGetFeedbackListRes,
  TherapistGetFeedbackListVars,
} from "../../../graphql/Feedback/types";
type Props = {
  sessionNo: string;
  therapyId: string;
};

const AccordionDetail: FC<Props> = ({ sessionNo, therapyId }) => {
  const {
    data: { therapistGetFeedbackList: feedbackDetail = {} } = {},
    loading,
  } = useQuery<TherapistGetFeedbackListRes, TherapistGetFeedbackListVars>(
    GET_THERAPIST_FEEDBACKLIST_DATA_NEW,
    {
      variables: {
        sessionNo,
        feedbackType: "client",
        pttherapyId: therapyId,
      },
    }
  );

  return loading ? (
    <Box
      height={"100px"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <CircularProgress size={30} />
    </Box>
  ) : (
    <Box paddingBottom={"50px"}>
      <Box marginTop={"13px"}>
        <Typography style={{ fontWeight: "bold" }}>Instruction</Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          border: "1px solid #cecece",
          display: "grid",
        }}
        p={2}
        marginTop={"10px"}
        borderRadius={"7px"}
      >
        <Grid>
          {
            /* istanbul ignore next */

            feedbackDetail[0].description
          }
        </Grid>
      </Box>
      {feedbackDetail[0].questions.map((fv, fk) => {
        /* istanbul ignore next */
        return (
          <Typography
            key={fk + ""}
            gutterBottom
            component="div"
            style={{ marginTop: "30px" }}
          >
            <Box
              style={{
                background: "#F5F5F5",
                border: "1px solid #C4C4C4",
                borderRadius: "3px",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "20px",
                padding: "5px 11px",
              }}
              data-testid="safety_ques"
            >
              {fk + 1}. {fv.question}
            </Box>
            <Typography component={"div"} style={{ marginTop: "17px" }}>
              {(fv.answer_type == "2" || fv.answer_type == "list") && (
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  padding={"0px 12px"}
                >
                  {fv.answer_options.split(",").map((av) => {
                    return (
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        gap={"7px"}
                        minWidth={"100px"}
                      >
                        <Box
                          style={{
                            height: "15px",
                            width: "15px",
                            border: "2px solid #6DA08F",
                            backgroundColor:
                              av == fv.answer.answer ? "#6EC9DB" : "#fff",
                            borderRadius: "50%",
                          }}
                        ></Box>
                        <Typography>{av}</Typography>
                      </Box>
                    );
                  })}
                </Box>
              )}
              {(fv.answer_type == "1" || fv.answer_type == "text") && (
                <Grid container spacing={2} marginBottom={0} paddingTop={1}>
                  <Grid item xs={12}>
                    <TextFieldComponent
                      name={fv.answer_type + "_" + fv._id}
                      id={fv.answer_type + "_" + fv._id}
                      value={fv.answer.answer}
                      multiline
                      rows={4}
                      disabled
                      fullWidth={true}
                      className="form-control-bg"
                    />
                  </Grid>
                </Grid>
              )}
            </Typography>
          </Typography>
        );
      })}
    </Box>
  );
};

export default AccordionDetail;
