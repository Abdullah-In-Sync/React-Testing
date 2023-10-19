import {
  GET_ADMIN_TOKEN_DATA,
  GET_THERAPIST_TOKEN_DATA,
  GET_TOKEN_DATA,
} from "../graphql/query/common";

export const IS_PATIENT = "patient";
export const IS_ADMIN = "admin";
export const IS_THERAPIST = "therapist";
export const planTypesFilter = [
  {
    id: "all",
    value: "All",
  },
  {
    id: "fixed",
    value: "Fixed",
  },
  {
    id: "custom",
    value: "Customisable",
  },
];
export const planTypes = [
  {
    id: "fixed",
    value: "Fixed",
  },
  {
    id: "custom",
    value: "Customisable",
  },
];

export const planTypesName = {
  fixed: "Fixed",
  custom: "Customisable",
};

export const defaultQuestionTypes = [
  {
    id: "1",
    value: "Text",
  },
  {
    id: "2",
    value: "List",
  },
];

export const monitorQuestionTypes = [
  {
    id: "yes_or_no",
    value: "Yes/No",
  },
  {
    id: "hours",
    value: "Hours",
  },
  {
    id: "list",
    value: "List",
  },
];

export const monitorQuestionTypeLabel = {
  yes_or_no: "Yes/No",
  hours: "Hours",
  list: "List",
};

export const questionTypes = [
  {
    id: "text",
    value: "Text",
  },
  {
    id: "list",
    value: "List",
  },
];

export const defalutEmojis = [
  { code: "1f97a", text: "Very Sad" },
  { code: "1f641", text: "Sad" },
  { code: "1f642", text: "Fine" },
  { code: "1f60a", text: "Happy" },
  { code: "1f604", text: "Very Happy" },
];

export const shareResourceAvailability = {
  allTherapist: 1,
  onlyMe: 2,
};

export const blockUnblockText = {
  1: "unblocked",
  0: "blocked",
};

export const activeInactiveText = {
  0: "Inactive",
  1: "Active",
};

export const homeRoute = {
  admin: "/admin/dashboard/",
  therapist: "/therapist/dashboard/",
  patient: "/patient/home/",
};

export const publicPaths = ["account", "forgotPassword", "mobile"];
export const allowedPaths = ["template", "mobile"];

export const publicApiNameAccessWithKey = ["GetOrgByDomain"];

export const tokenValidationQuery = {
  admin: GET_ADMIN_TOKEN_DATA,
  patient: GET_TOKEN_DATA,
  therapist: GET_THERAPIST_TOKEN_DATA,
};

export const defaultOrgName = "portal";

export const FILEEXTENSION = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "audio/mpeg",
  "audio/wav",
  "video/mp4",
  "video/quicktime",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const accessibility = [
  {
    label: "Admin",
    id: "admin",
  },
  {
    label: "Therapist",
    id: "therapist",
  },
  {
    label: "Patient",
    id: "patient",
  },
];

export const navPosition = [
  {
    label: "Sidebar",
    id: "sidebar",
  },
  {
    label: "Tabs",
    id: "tabs",
  },
];
