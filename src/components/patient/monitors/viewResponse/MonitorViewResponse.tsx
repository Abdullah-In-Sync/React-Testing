import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";

import moment from "moment";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import BarChart from "../../../common/charts/BarChart";
import LineChart from "../../../common/charts/LineChart";
import { useStyles } from "../monitorsStyles";

import { PatientViewMonitor } from "../../../../graphql/Monitor/types";
import { csvDecode } from "../../../../utility/helper";
import CommonButton from "../../../common/Buttons/CommonButton";
import Emoji from "../../../common/Emoji";
import { MesageTextDisplay } from "../../../common/MessageTextDisplay/MessageTextDisplay";
import RangeDatePicker from "../../../common/RangeDatePicker/RangeDatePicker";
import * as monitorHelper from "./monitorViewResponseHelper";

interface ViewProps {
  monitorData: PatientViewMonitor;
  handleRangeGoButton: (v) => void;
  initialDate: string;
  endDate?: string;
  onBackButtonPress: () => void;
}

const MonitorViewResponse: React.FC<ViewProps> = ({
  monitorData: viewResponseData = {},
  handleRangeGoButton,
  initialDate,
  endDate,
  onBackButtonPress,
}) => {
  const styles = useStyles();
  const { questions: ansResponseData = [], name } = viewResponseData;
  const filterQuesAnsData = monitorHelper.filterQuesType(ansResponseData);

  const emojisHorizontalImage = (emojis) => {
    return (
      <Box className="emojListWrapper">
        {emojis.map((item, i) => {
          const { text, code } = item;
          return (
            <Box
              key={`emojiWrapper_${i}`}
              data-testid={`${i}`}
              className="vImgIconWraper"
            >
              <Emoji unified={code} />
              <Typography>{text}</Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  const labelBox = (label) => {
    return (
      <Box className="sectionLabelBox">
        <Typography> {label} </Typography>
      </Box>
    );
  };

  const emojiSection = () => {
    if (!filterQuesAnsData["emoji"]) return null;
    const { que, question_option } = filterQuesAnsData["emoji"];
    const emojisLine = monitorHelper.generateEmojiLineData(
      filterQuesAnsData["emoji"]
    );
    const questionOptionArray = JSON.parse(question_option);
    return (
      <Stack>
        <Stack>{labelBox(que)}</Stack>
        <Stack className="emojiLineChartWrapper graphChartBox">
          <Box
            className={` ${
              emojisLine["datasets"][0]["data"].length < 2
                ? "emojListWrapperCenter"
                : "emojisLineChart"
            }`}
          >
            <LineChart
              data={emojisLine}
              displayY={false}
              displayYlabel={true}
              grid={{ display: false }}
              plugins={monitorHelper.emojisLineChartPlugins(
                questionOptionArray
              )}
              yAxis={{ suggestedMin: 1, suggestedMax: 5 }}
              yTicks={{ min: 0, stepSize: 0, precision: false }}
              xTicks={{ padding: 10 }}
              layout={{
                padding: {
                  top: 20,
                  left: 37,
                },
              }}
            />
          </Box>
          <Stack className="emojiPieChartWrapper">
            <Box className="emojisBox">
              {emojisHorizontalImage(JSON.parse(question_option))}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const yesNoSection = () => {
    if (!filterQuesAnsData["yes_or_no"]) return null;

    const { que } = filterQuesAnsData["yes_or_no"];
    return (
      <Stack>
        <Stack>{labelBox(que)}</Stack>
        <Stack className="yesNoChartWrapper graphChartBox">
          <Box>
            <BarChart
              data={monitorHelper.generateBarData(
                filterQuesAnsData["yes_or_no"]["data"]
              )}
            />
          </Box>
        </Stack>
      </Stack>
    );
  };

  const hoursSection = () => {
    if (!filterQuesAnsData["hours"]) return null;
    const { que } = filterQuesAnsData["hours"];
    return (
      <Stack>
        <Stack>{labelBox(que)}</Stack>
        <Stack className="hoursChartWrapper graphChartBox">
          <Box>
            <LineChart
              data={monitorHelper.generateLineHoursData(
                filterQuesAnsData["hours"]["data"]
              )}
              yTicks={{ precision: false }}
            />
          </Box>
        </Stack>
      </Stack>
    );
  };

  const listOptionNameList = (questionOptions, answer) => {
    return questionOptions.map((value, i) => {
      return (
        <Box
          key={`listOption_${i}`}
          className={`${csvDecode(answer).indexOf(value) > -1 ? "active" : ""}`}
        >
          <span>{value}</span>
        </Box>
      );
    });
  };

  const csvSection = () => {
    if (!filterQuesAnsData["list"]) return null;
    const { que, question_option } = filterQuesAnsData["list"];

    return (
      <Stack>
        <Stack>{labelBox(que)}</Stack>
        <Stack className="graphChartBox">
          {Object.entries(filterQuesAnsData["list"]).map((entry, i) => {
            const [key, value] = entry;
            if (key === "data") {
              return (
                <Stack
                  key={`csvSectionResponse_${i}`}
                  className="csvSectionWrapper"
                >
                  <Box>
                    {key === "data" &&
                      (value as Array<any>).map((item, i) => {
                        const { answer, created_date } = item;
                        return (
                          answer &&
                          answer != "" && (
                            <Stack
                              key={`csvSectionAnswer_${i}`}
                              className="ansWrapper"
                            >
                              <Box className="listWrapper">
                                <label>
                                  Response date <br />
                                  <span>
                                    <Typography>
                                      {moment(created_date).format(
                                        "D MMM YYYY"
                                      )}
                                    </Typography>
                                  </span>
                                </label>
                                <Box className="colonBox">:</Box>
                                {listOptionNameList(
                                  csvDecode(question_option),
                                  answer
                                )}
                              </Box>
                            </Stack>
                          )
                        );
                      })}
                  </Box>
                </Stack>
              );
            }
          })}
        </Stack>
      </Stack>
    );
  };

  const answerList = () => {
    return (
      <>
        {emojiSection()}
        {yesNoSection()}
        {hoursSection()}
        {csvSection()}
      </>
    );
  };

  const viewWithEmptyMessage = () => {
    return ansResponseData.length > 0 &&
      Object.keys(filterQuesAnsData).length > 0 ? (
      answerList()
    ) : (
      <MesageTextDisplay message="No data found." />
    );
  };

  return (
    <>
      <Stack className={styles.topHeaderRow}>
        <Box>
          <CommonButton
            onClick={onBackButtonPress}
            data-testid="backButton"
            variant="contained"
          >
            Back
          </CommonButton>
        </Box>
        <Box>
          <RangeDatePicker
            endDate={endDate}
            initialDate={initialDate}
            onGoButton={handleRangeGoButton}
          />
        </Box>
      </Stack>
      <Stack className={styles.viewResponseWrapper}>
        <CardWithHeader label={name}>{viewWithEmptyMessage()}</CardWithHeader>
      </Stack>
    </>
  );
};

export default MonitorViewResponse;
