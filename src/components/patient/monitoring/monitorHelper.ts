import moment from "moment";
import * as monitoringTypes from "./types";
import hdata from "./data";

/**
 * Sorting api data based on questions type.
 * @param {Array} data - patient view response api data
 * @return {Object} sorted question type as key and related response data as value
 */
export const filterQuesType = (
  data: monitoringTypes.ApiViewResponseData[]
): {
  [k: string]: { que: string; data: monitoringTypes.ApiViewResponseData[] };
} => {
  const tempData = {};
  data.forEach((item) => {
    const { ptmonques_type, ptmonques_question } = item;
    tempData[ptmonques_type] = tempData[ptmonques_type] || {};
    tempData[ptmonques_type]["que"] =
      ptmonques_type == 6 ? "Additional Questions" : ptmonques_question;
    if (ptmonques_type == 6)
      tempData[ptmonques_type][ptmonques_question] = [
        ...(tempData[ptmonques_type][ptmonques_question] || []),
        ...[item],
      ];
    else
      tempData[ptmonques_type]["data"] = [
        ...(tempData[ptmonques_type]["data"] || []),
        ...[item],
      ];
  });
  return tempData;
};

/**
 * Sorting sorted question type data array
 * @param {Array} data - sorted by questions type data (return value from filterQuesType method)
 * @return {Object} sorted count of answers according to date
 */
export const filterAnswer = (
  data: monitoringTypes.ApiViewResponseData[]
): { [k: string]: { [k: string]: { count: number } } } => {
  const tempData = {};
  let tempDate = "";
  data.forEach((item) => {
    const { ptmon_ans, created_date } = item;
    if (ptmon_ans && ptmon_ans !== "") {
      tempDate = created_date.split("T")[0];
      tempData[tempDate] = tempData[tempDate] || {};
      tempData[tempDate][ptmon_ans] = tempData[tempDate][ptmon_ans] || {};
      tempData[tempDate][ptmon_ans]["count"] =
        tempData[tempDate][ptmon_ans]["count"] || 0;
      tempData[tempDate][ptmon_ans]["count"] =
        tempData[tempDate][ptmon_ans]["count"] + 1;
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

/* ----------- Graphs/Chart generator functions ----------- */

/**
 * Generate emojis answers line chart object to display data in line chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @return {Object} Line chart object
 */
export const generateEmojiLineData = (
  filterQuesAnsData
): monitoringTypes.chartData => {
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

  const filterBasedOnEmojis = (ptmon_ans) => {
    return hdata.emojis.filter((item) => ptmon_ans === item._id)[0];
  };

  filterQuesAnsData.forEach((value) => {
    const { created_date, ptmon_ans } = value;
    if (ptmon_ans) {
      const formatCreateDate = moment(created_date).format("YYYY-MM-DD");
      const emojisAnsObj = filterBasedOnEmojis(ptmon_ans);
      tempData["labels"].push(formatCreateDate);
      tempData["datasets"][0]["data"].push({
        x: formatCreateDate,
        y: emojisAnsObj ? emojisAnsObj.position : 0,
        label: emojisAnsObj ? emojisAnsObj.emoji_caption : "Terribles",
      });
    }
  });

  return tempData;
};

/**
 * Generate Emojis pie chart object to display data in pie chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @param {Object} emojisData - emojis data object
 * @return {Object} Pie chart object
 */
export const generatePieEmojisData = (
  filterQuesAnsData,
  emojisData: monitoringTypes.emojisData[]
): monitoringTypes.chartData => {
  const filterAnsData = totalAnsCount(filterAnswer(filterQuesAnsData));
  const tempData = {
    labels: [],
    datasets: [
      {
        label: "days",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 2,
      },
    ],
  };
  emojisData.forEach((item) => {
    const { _id, color } = item;

    if (filterAnsData[_id])
      tempData["datasets"][0]["data"].push(filterAnsData[_id].count);
    else tempData["datasets"][0]["data"].push(0);

    tempData["datasets"][0]["backgroundColor"].push(color);
    tempData["datasets"][0]["borderColor"].push("#fff");
  });

  return tempData;
};

/**
 * Generate yes and no answers bar chart object to display data in bar chart
 * @param {Array} filterQuesAnsData - sorted answers type data array
 * @return {Object} Bar chart object
 */
export const generateBarData = (
  filterQuesAnsData
): monitoringTypes.chartData => {
  const filterDateData = totalAnsCount(filterAnswer(filterQuesAnsData));
  const noDataCount = filterDateData["0"] ? filterDateData["0"]?.count || 0 : 0;
  const yesDataCount = filterDateData["1"]
    ? filterDateData["1"]?.count || 0
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
export const generateLineHoursData = (
  filterQuesAnsData
): monitoringTypes.chartData => {
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
