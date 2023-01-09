import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import * as React from "react";
import * as monitoringTypes from "./types";

import moment from "moment";
import Image from "next/image";
import CardWithHeader from "../../common/Cards/CardWithHeader";
import BarChart from "../../common/charts/BarChart";
import LineChart from "../../common/charts/LineChart";
import PieChart from "../../common/charts/PieChart";
import { useStyles } from "./monitoringStyles";

import * as monitorHelper from "./monitorHelper";

const MonitoringViewResponse: React.FC<monitoringTypes.MonitoringProps> = ({
  viewResponseData,
}) => {
  const styles = useStyles();
  const { ansResponseData, emojis: emojisData } = viewResponseData;
  const filterQuesAnsData = monitorHelper.filterQuesType(ansResponseData);

  const emojisVerticalImage = () => {
    return (
      <ImageList cols={1} className="emojListWrapper">
        {emojisData.map((item) => {
          const { _id, emoji_caption, emoji_url } = item;
          return (
            <ImageListItem
              key={_id}
              data-testid={`${_id}`}
              className="vImgIcon"
            >
              <Image
                src={`/images/emoji/${emoji_url}`}
                alt={emoji_caption}
                loading="lazy"
                width="153"
                height="152"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  };

  const emojisHorizontalImage = () => {
    return (
      <ImageList cols={5} className="emojListWrapper">
        {emojisData.map((item) => {
          const { _id, emoji_caption, emoji_url } = item;
          return (
            <ImageListItem
              key={_id}
              data-testid={`${_id}`}
              className="vImgIconWraper"
            >
              <Image
                src={`/images/emoji/${emoji_url}`}
                alt={emoji_caption}
                loading="lazy"
                width="153"
                height="152"
                className="vImgIcon"
              />
              <Typography>{emoji_caption}</Typography>
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  };

  const emojiSection = () => {
    if (!filterQuesAnsData["1"]) return null;

    const { que } = filterQuesAnsData["1"];
    return (
      <CardWithHeader label={que} simpleHeader>
        <Stack className="emojiLineChartWrapper">
          <Box className="emojisLineChart">
            {emojisVerticalImage()}

            <LineChart
              data={monitorHelper.generateEmojiLineData(
                filterQuesAnsData["1"]["data"]
              )}
              displayY={false}
            />
          </Box>
        </Stack>
        <Stack className="emojiPieChartWrapper">
          <Box className="pieChart">
            <PieChart
              data={monitorHelper.generatePieEmojisData(
                filterQuesAnsData["1"]["data"],
                emojisData
              )}
            />
          </Box>
          <Box className="emojisBox">{emojisHorizontalImage()}</Box>
        </Stack>
      </CardWithHeader>
    );
  };

  const yesNoSection = () => {
    if (!filterQuesAnsData["3"]) return null;

    const { que } = filterQuesAnsData["3"];
    return (
      <CardWithHeader label={que} simpleHeader>
        <Stack className="yesNoChartWrapper">
          <Box>
            <BarChart
              data={monitorHelper.generateBarData(
                filterQuesAnsData["3"]["data"]
              )}
            />
          </Box>
        </Stack>
      </CardWithHeader>
    );
  };

  const hoursSection = () => {
    if (!filterQuesAnsData["4"]) return null;
    const { que } = filterQuesAnsData["4"];
    return (
      <CardWithHeader label={que} simpleHeader>
        <Stack className="hoursChartWrapper">
          <Box>
            <LineChart
              data={monitorHelper.generateLineHoursData(
                filterQuesAnsData["4"]["data"]
              )}
            />
          </Box>
        </Stack>
      </CardWithHeader>
    );
  };

  const csvSection = () => {
    if (!filterQuesAnsData["6"]) return null;
    const { que } = filterQuesAnsData["6"];

    return (
      <CardWithHeader label={que} simpleHeader>
        {Object.entries(filterQuesAnsData["6"]).map((entry, i) => {
          const [key, value] = entry;

          if (key != "que") {
            return (
              <Stack
                key={`csvSectionResponse_${i}`}
                className="csvSectionWrapper"
              >
                <Typography className="queMain">{key}</Typography>
                <Typography className="headerAdditionalQues">
                  {"Response"}
                </Typography>
                <Box>
                  {(value as Array<any>).map((item, i) => {
                    const { ptmon_ans, created_date } = item;
                    return (
                      ptmon_ans &&
                      ptmon_ans != "" && (
                        <Stack
                          key={`csvSectionAnswer_${i}`}
                          className="ansWrapper"
                        >
                          <Box>
                            <Typography>{ptmon_ans}</Typography>
                          </Box>
                          <Box>
                            <Typography className="completedOnText">
                              Completed on{" "}
                              {moment(created_date).format("D MMM YYYY")}
                            </Typography>
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
      </CardWithHeader>
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
    return ansResponseData.length > 0 ? (
      answerList()
    ) : (
      <Typography className={styles.emptyText} data-testid={"emptyMessage"}>
        {"No data found."}
      </Typography>
    );
  };

  return (
    <Stack className={styles.viewResponseWrapper}>
      {viewWithEmptyMessage()}
    </Stack>
  );
};

export default MonitoringViewResponse;
