import { useQuery } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { GET_THERAPIST_MY_MONITOR_VIEW } from "../../../../../graphql/SafetyPlan/graphql";
import Loader from "../../../../common/Loader";
import EmojiListBox from "../../../../admin/monitor/form/EmojiListBox";
import { useStyles } from "./style";

type propTypes = {
  monitorId?: any;
};

export default function ViewMyMonitor(props: propTypes) {
  const styles = useStyles();

  const { loading, data: myMonitorView } = useQuery(
    GET_THERAPIST_MY_MONITOR_VIEW,
    {
      variables: { monitor_id: props.monitorId },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    async function fetchData() {
      try {
        await myMonitorView.refetch();
        console.log("Data fetched successfully.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [props.monitorId]);

  const myMonitorQuestion = myMonitorView?.viewMonitorById[0]?.monitor_question;

  return (
    <>
      <Stack>
        <Loader visible={loading} />
        <Box>
          <Typography className={styles.label}>Monitor question*</Typography>
          {myMonitorQuestion?.map((data, index) => (
            <Box key={index}>
              <Box className={styles.outerBorder}>{data.question}</Box>

              {data.question_type === "emoji" && (
                <EmojiListBox
                  question={{
                    questionOption: JSON.parse(data.question_option),
                  }}
                />
              )}

              <Box style={{ paddingTop: "10px" }}>
                {data.question_type === "yes_or_no" && (
                  <>
                    <Box className={styles.questionTypeBoxStyle}>Yes/No</Box>
                    <hr className={styles.line} />
                  </>
                )}
              </Box>

              {data.question_type === "hours" && (
                <>
                  <Box className={styles.questionTypeBoxStyle}>Hours</Box>
                  <hr className={styles.line} />
                </>
              )}

              {data.question_type === "list" && (
                <>
                  <Box className={styles.questionTypeBoxStyle}>List</Box>
                  <Box className={styles.listOptionOuterBorder}>
                    <Box style={{ display: "flex", flexDirection: "row" }}>
                      {data.question_option
                        .replace(/"/g, "")
                        .split(",")
                        .map((option, index) => (
                          <Box key={index} className={styles.optionWrapper}>
                            {option}
                          </Box>
                        ))}
                    </Box>
                  </Box>
                  <hr className={styles.line} />
                </>
              )}
            </Box>
          ))}
        </Box>
      </Stack>
    </>
  );
}
