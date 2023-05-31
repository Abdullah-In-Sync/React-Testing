import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
//   import * as monitoringTypes from "./types";

import moment from "moment";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import BarChart from "../../../common/charts/BarChart";
import LineChart from "../../../common/charts/LineChart";
import { useStyles } from "../monitorsStyles";

import { Emoji } from "emoji-picker-react";
import { PatientViewMonitor } from "../../../../graphql/Monitor/types";
import { csvDecode } from "../../../../utility/helper";
import CommonButton from "../../../common/Buttons/CommonButton";
import { MesageTextDisplay } from "../../../common/MessageTextDisplay/MessageTextDisplay";
import RangeDatePicker from "../../../common/RangeDatePicker/RangeDatePicker";
import * as monitorHelper from "./monitorViewResponseHelper";

interface ViewProps {
  monitorData: PatientViewMonitor;
  handleRangeGoButton: (v) => void;
  initialDate: string;
  onBackButtonPress: () => void;
}

const MonitorViewResponse: React.FC<ViewProps> = ({
  monitorData: viewResponseData = {},
  handleRangeGoButton,
  initialDate,
  onBackButtonPress,
}) => {
  const styles = useStyles();
  const { questions: ansResponseData = [], name } = viewResponseData;
  const filterQuesAnsData = monitorHelper.filterQuesType(ansResponseData);
  const emojisVerticalImage = (lineData, emojis) => {
    console.log("lineData", lineData);
    const modifyEmojis = emojis.reverse();
    const isPositionExist = (v) => {
      return lineData.some((nitem) => nitem.label === v.text);
    };
    return (
      <ImageList cols={1} className="emojListWrapper">
        {modifyEmojis
          .filter((emojisValue) => isPositionExist(emojisValue))
          .map((item, i) => {
            const { _id, code } = item;
            return (
              <ImageListItem
                key={_id}
                data-testid={`vEmoji_${i}`}
                className="vImgIcon"
              >
                <Emoji unified={code} />
              </ImageListItem>
            );
          })}
      </ImageList>
    );
  };

  const emojisHorizontalImage = (emojis) => {
    return (
      <Box className="emojListWrapper">
        {emojis.map((item, i) => {
          const { text, code } = item;
          return (
            <Box key={i} data-testid={`${i}`} className="vImgIconWraper">
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
            {emojisVerticalImage(
              emojisLine["datasets"][0]["data"],
              JSON.parse(question_option)
            )}
            <LineChart
              data={emojisLine}
              displayY={false}
              displayYlabel={true}
              grid={{ display: false }}
              yTicks={{ min: 0, stepSize: 0 }}
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
          className={`${value === answer ? "active" : ""}`}
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
      <MesageTextDisplay message="No data Found." />
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
