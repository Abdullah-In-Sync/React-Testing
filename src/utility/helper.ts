/* istanbul ignore file */
import moment from "moment";

type SessionObject = {
  label: string;
  value: string;
};

export const uniqueString = (): string => {
  const buf = new Uint8Array(1);
  if (typeof window !== "undefined") {
    window.crypto?.getRandomValues(buf);
  }
  return Date.now().toString(36) + buf[0].toString(36).substring(2);
};

export const isAfter = ({ days = 1, date }) => {
  const noSpace = date.replace(/\s/g, "");
  if (noSpace.length < 3) {
    return true;
  }
  const patientCreateDate = new Date(date);
  return Date.now() > patientCreateDate.getTime() + 24 * days * 60 * 60 * 1000;
};

export const getSessionOptions = (): SessionObject[] => {
  const tempSession = [{ value: "start", label: "Start" }];
  for (let i = 1; i <= 50; i++) {
    tempSession.push({ value: i.toString(), label: `Session ${i}` });
  }
  return tempSession;
};

export const getfiterObject = (
  arrObj: SessionObject[],
  filterValue: string
): SessionObject => {
  if (filterValue) return arrObj.find((item) => item.value == filterValue);
  else return {} as SessionObject;
};

export const getScoreGraphCoordinates = (scoresList) => {
  const seriesX = [];
  const seriesY = [];
  scoresList.forEach((item) => {
    const { created_date, score } = item;
    seriesX.push(created_date);
    seriesY.push(score);
  });
  return {
    seriesX,
    seriesY,
  };
};

type QuestionObject = {
  question: string;
  questionType: string;
  questionOption: object[];
  questionId?: string;
  status?: number;
};

export const modifyQuestions = (questions: QuestionObject[]) =>
  questions.map((item) => {
    const { question, questionType, questionOption, questionId, status } = item;

    const tempQuestionObj = {
      ...{
        question,
        question_type: questionType,
      },
      ...(questionId ? { question_id: questionId } : {}),
      ...(status !== undefined ? { status } : {}),
    };

    switch (questionType) {
      case "emoji":
        return {
          ...tempQuestionObj,
          ...{ question_option: JSON.stringify(questionOption) },
        };
      case "list":
        return { ...tempQuestionObj, ...{ question_option: questionOption } };
      default:
        return tempQuestionObj;
    }
  });

export const csvDecode = (csvString) => {
  return csvString ? csvString.split(",") : [];
};

export const csvEncode = (csvStringArray) => {
  return csvStringArray.join(",");
};

export const formatDate = (isoDate) => {
  return moment(isoDate.toISOString()).format("YYYY-MM-DD");
};

export const stringToInt = (str: string): number | undefined => {
  const temp = parseInt(str);
  if (!isNaN(temp)) return temp;
};

export const removeProp = (object, keys) =>
  keys.reduce((o, k) => {
    // eslint-disable-next-line
    const { [k]: _ , ...p } = o;
    return p;
  }, object);

export const cogMessageToJson = (message) => {
  const tempJson: any = {};
  message
    .replace(/[{}]/g, "")
    .split(", ")
    .forEach((v) => {
      tempJson[v.substring(0, v.indexOf("="))] = v.substring(
        v.indexOf("=") + 1
      );
    });
  return tempJson;
};

export const firstLetterCapital = (value) => {
  if (value) return value.charAt(0).toUpperCase() + value.slice(1);
  else return "";
};
