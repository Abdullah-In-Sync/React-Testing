/* istanbul ignore file */
import moment from "moment";
import { getSessionToken } from "./storage";
import { getUpdatedFileName } from "../lib/helpers/s3";
import TherapyTabs from "../components/patient/therapy/TherapyTabs";
import { moduleList } from "../lib/constants";

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
    const { [k]: _, ...p } = o;
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

export const getCurrentURL = () => {
  if (typeof window !== "undefined") {
    const {
      location: { protocol, hostname, port = "" },
    } = window;
    return protocol + "//" + hostname + ":" + port;
  }
};

export const parseNativeEmoji = (unified: string): string => {
  return unified
    .split("-")
    .map((hex) => String.fromCodePoint(parseInt(hex, 16)))
    .join("");
};

export const isAuth = (router) => {
  const { userToken, userType } = getSessionToken();
  return (
    userToken &&
    userType &&
    router.asPath.split("?")[0].split("/")[1] === userType
  );
};

export const getIntialPath = (url) => {
  const path = url.split("?")[0];
  return path.split("/")[1];
};

export const getOrgNameFromCurrentUrl = () => {
  if (typeof window !== "undefined") {
    const {
      location: { hostname },
    } = window;
    return hostname.split(".")[0];
  }
};

export const fileOnChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  callback
) => {
  const { target: { files } = {} } = event;
  const fileObj = files.length ? files[0] : undefined;
  const { fileName } = getUpdatedFileName(fileObj);

  if (!fileName) {
    return;
  }

  callback({ fileName, fileObj });
};

/* istanbul ignore file */
export function parseJwt(token) {
  if (token)
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

/* istanbul ignore file */
export const checkPrivilageAccess = (moduleName, privilege?: any) => {
  const { userTokenId } = getSessionToken();

  const { role_access } = parseJwt(userTokenId) || {};
  if (!role_access || !moduleName) return true;
  const moduleObj = moduleList[moduleName];
  if (!moduleObj) return false;
  const roleAccessData = JSON.parse(role_access);
  const objArray = roleAccessData.filter((item) => item._id === moduleObj.id);
  const objLen = objArray.length;
  if (objLen === -1) {
    return false;
  } else {
    const obj = objArray[0];
    const { privileges = [] } = obj || {};
    if (!privilege && privileges.length > 0) {
      return true;
    } else {
      const pi = privileges.findIndex((item) => item.name === privilege);
      if (pi < 0) return false;
      else return true;
    }
  }
};

export const checkUserType = () => {
  const { userTokenId } = getSessionToken();
  const idTokenData = parseJwt(userTokenId);
  const userType = idTokenData["cognito:groups"][0];
  return { userType, idTokenData };
};

/* istanbul ignore file */
export const getTokenIdDecodedData = () => {
  const { userType, idTokenData } = checkUserType();
  if (userType == "custom") {
    const { role_detail } = idTokenData;
    const roleDetailObj = JSON.parse(role_detail);
    const accessibility = roleDetailObj["accessibility"];
    const accessRoleUserType = accessibility + "_data";
    const userDataObj = JSON.parse(idTokenData[accessRoleUserType]);
    const { first_name, last_name, org_id } = userDataObj;
    return {
      [accessRoleUserType]: {
        ...userDataObj,
        ...{
          [accessibility + "_firstname"]: first_name,
          [accessibility + "_lastname"]: last_name,
          org_id,
        },
      },
      user_type: accessibility,
    };
  } else if (userType === "admin") {
    return { user_type: userType };
  } else {
    const userTypeData = idTokenData[userType + "_data"];
    const userDataObj =
      !userTypeData || userTypeData === null || userTypeData.trim() === ""
        ? {}
        : JSON.parse(userTypeData);
    const { first_name, last_name, org_id } = userDataObj;
    return {
      [userType + "_data"]: {
        ...userDataObj,
        ...{
          [userType + "_firstname"]: first_name,
          [userType + "_lastname"]: last_name,
          org_id,
        },
      },
      user_type: userType,
    };
  }
};

/* istanbul ignore file */
export const filterBasedOnPrivilages = (routeObj) => {
  const { moduleName: label } = routeObj;
  const status = checkPrivilageAccess(label);
  if (status === undefined || label === "default") return true;
  else if (label === "Therapy")
    return TherapyTabs.some(({ moduleName }) =>
      checkPrivilageAccess(moduleName)
    );
  else return status;
};

export const modifyTabsData = (tabs) =>
  tabs.filter((v) => {
    const { moduleName } = v;
    const status = checkPrivilageAccess(moduleName);
    if (status === undefined) return true;
    else return status;
  });
