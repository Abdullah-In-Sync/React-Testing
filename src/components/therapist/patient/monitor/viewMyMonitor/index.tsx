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

  const apiResponse = String(
    myMonitorView?.viewMonitorById[0]?.monitor_question[0].question_option
  );

  const trimmedResponse = apiResponse?.slice(1, -1);

  const responseArray = trimmedResponse?.split("}, {");

  const convertedArray = [];

  for (const responseObject of responseArray) {
    const trimmedObject = responseObject.replace("{", "").replace("}", "");

    const keyValuePairArray = trimmedObject.split(", ");

    const convertedObject = {};

    for (const keyValuePair of keyValuePairArray) {
      const [key, value] = keyValuePair.split("=");
      convertedObject[key] = value;
    }

    convertedArray.push(convertedObject);
  }

  const modifyedApiEmojiValue = {
    questionOption: convertedArray,
  };

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
                // <EmojiListBox question={data.question_option} />
                <EmojiListBox question={modifyedApiEmojiValue} />
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
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {data.question_option.split(",").map((option, index) => (
                        <div key={index} className={styles.optionWrapper}>
                          {option}
                        </div>
                      ))}
                    </div>
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
