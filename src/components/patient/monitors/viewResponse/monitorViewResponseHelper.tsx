import moment from "moment";
import {
  PatientViewMonitorAnswersListEntity,
  PatientViewMonitorQuestionsEntity,
} from "../../../../graphql/Monitor/types";
import { chartData, emojisData } from "./types";
import { parseNativeEmoji } from "../../../../utility/helper";

/**
 * Sorting api data based on questions type.
 * @param {Array} data - patient view response api data
 * @return {Object} sorted question type as key and related response data as value
 */
export const filterQuesType = (
  data: PatientViewMonitorQuestionsEntity[]
): {
  [k: string]: {
    que: string;
    data: PatientViewMonitorAnswersListEntity[];
    question_option: string;
  };
} => {
  const tempData = {};
  data.forEach((item) => {
    const {
      question_type,
      question: ptmonques_question,
      answers_list,
      question_option,
    } = item;
    if (answers_list && answers_list.length > 0) {
      tempData[question_type] = {};
      tempData[question_type]["que"] = ptmonques_question;

      tempData[question_type]["data"] = [
        ...(tempData[question_type]["data"] || []),
        ...answers_list,
      ];
      if (question_option)
        tempData[question_type]["question_option"] = question_option;
    }
  });
  return tempData;
};

/**
 * Sorting sorted question type data array
 * @param {Array} data - sorted by questions type data (return value from filterQuesType method)
 * @return {Object} sorted count of answers according to date
 */
export const filterAnswer = (
  data: PatientViewMonitorQuestionsEntity[]
): { [k: string]: { [k: string]: { count: number } } } => {
  const tempData = {};
  let tempDate = "";
  data.forEach((item) => {
    const { answer, created_date } = item;
    if (answer && answer !== "") {
      tempDate = created_date.split("T")[0];
      tempData[tempDate] = tempData[tempDate] || {};
      tempData[tempDate][answer] = tempData[tempDate][answer] || {};
      tempData[tempDate][answer]["count"] =
        tempData[tempDate][answer]["count"] || 0;
      tempData[tempDate][answer]["count"] =
        tempData[tempDate][answer]["count"] + 1;
    }
  });

  return tempData;
};

/**
 * Total count of date wise sorted answers
 * @param {Array} data - sorted count of answers according to date (return value from filterAnswer method)
 * @return {Object} Total answer count
 */
export const totalAnsCount = (data: {
  [k: string]: { [k: string]: { count: number } };
}): { [k: string]: { count: number } } => {
  const tempData = {};
  Object.entries(data).forEach((entry) => {
    const [_, value] = entry; //eslint-disable-line @typescript-eslint/no-unused-vars
    Object.entries(value).forEach((entry) => {
      const [key, value] = entry;
      tempData[key] = tempData[key] || {};
      tempData[key]["count"] = tempData[key]["count"] || 0;
      tempData[key]["count"] = tempData[key]["count"] + value.count;
    });
  });
  return tempData;
};

/**
 * Total count of date wise sorted answers
 * @param {Object[]} questionOption - emojis code and text array object
 * @return {Object[]} draw emoji in chart using canvas
 */
export const emojisLineChartPlugins = (
  questionOption
): { id: string; afterDatasetDraw: (v) => void }[] => {
  return [
    {
      id: "emoji",
      afterDatasetDraw: (chart) => {
        const { ctx } = chart;
        const xAxis = chart.scales["x"];
        const yAxis = chart.scales["y"];
        yAxis.height += 15;
        yAxis.ticks.forEach((item, index) => {
          const { value } = item;
          const { code } = questionOption[value - 1] || {};
          if (code) {
            const y = yAxis.getPixelForTick(index);
            ctx.font =
              "30px 'Segoe UI Emoji', 'Segoe UI Symbol', 'Segoe UI', 'Apple Color Emoji', 'Twemoji Mozilla', 'Noto Color Emoji', 'Android Emoji', Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica, serif, LastResort";
            ctx.fillText(parseNativeEmoji(code), xAxis.left - 47, y + 10);
          }
        });
      },
    },
  ];
};

/* ----------- Graphs/Chart generator functions ----------- */

/**
 * Generate emojis answers line chart object to display data in line chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @return {Object} Line chart object
 */
export const generateEmojiLineData = ({
  data: filterQuesAnsData,
  question_option,
}): chartData => {
  const tempData = {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const filterBasedOnEmojis = (answer) => {
    const emojiData = JSON.parse(question_option);
    let tempObj: emojisData = {};
    if (emojiData.length > 0)
      emojiData.forEach((item, i) => {
        if (item.text === answer)
          tempObj = {
            emoji_url: item.code,
            emoji_caption: item.text,
            position: i + 1,
          };
      });
    return tempObj;
  };

  filterQuesAnsData.forEach((value) => {
    const { created_date, answer } = value;
    if (answer) {
      const formatCreateDate = moment(created_date).format("DD/MM/YYYY");
      const emojisAnsObj = filterBasedOnEmojis(answer);

      if (emojisAnsObj) {
        tempData["labels"].push(formatCreateDate);
        tempData["datasets"][0]["data"].push({
          x: formatCreateDate,
          y: emojisAnsObj.position,
          label: emojisAnsObj.emoji_caption,
        });
      }
    }
  });

  return tempData;
};

/**
 * Generate yes and no answers bar chart object to display data in bar chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @return {Object} Bar chart object
 */

export const generateBarData = (filterQuesAnsData): chartData => {
  const filterDateData = totalAnsCount(filterAnswer(filterQuesAnsData));
  const noDataCount = filterDateData["no"]
    ? filterDateData["no"]?.count || 0
    : 0;
  const yesDataCount = filterDateData["yes"]
    ? filterDateData["yes"]?.count || 0
    : 0;
  const tempData = {
    labels: ["No", "Yes"],
    datasets: [
      {
        fill: true,
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  tempData["datasets"][0]["data"] = [noDataCount, yesDataCount];

  return tempData;
};

/**
 * Generate hours answers line chart object to display data in line chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @return {Object} Line chart object
 */
export const generateLineHoursData = (filterQuesAnsData): chartData => {
  const filterDateData = filterAnswer(filterQuesAnsData);
  const tempData = {
    labels: [],
    datasets: [
      {
        fill: true,
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  Object.entries(filterDateData).forEach((entry) => {
    const [dateKey, value] = entry;
    Object.entries(value).forEach((entry) => {
      const [countKey, _] = entry; // eslint-disable-line @typescript-eslint/no-unused-vars
      tempData["labels"].push(dateKey);
      tempData["datasets"][0]["data"].push({
        x: new Date(dateKey),
        y: countKey,
      });
    });
  });
  return tempData;
};
