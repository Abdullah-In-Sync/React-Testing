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

export const phoneRegExp = /^\+[1-9]\d{3,14}$/;

export const ID_TOKEN_LABEL = "myhelptokenid";
export const COOKIES_POLICY = "Cookies Policy";

export const moduleList = {
  Agreement: {
    name: "Agreement",
    id: "06d36511-34f4-4ed8-b1e8-475e278c3493",
  },
  Files: {
    name: "Files",
    id: "f8e19fc6-eb3a-4b30-8672-6ada36b1ccd4",
  },
  Relapse: {
    name: "Relapse",
    id: "0c5f4f77-8a82-492f-a7e2-a578fd9b1b34",
  },
  "Safety Plan": {
    name: "Safety Plan",
    id: "1f4858ed-d2aa-4fd9-81eb-e0f761918bd4",
  },
  Measures: {
    name: "Measures",
    id: "e7b6dcf4-3e2f-417f-8e9e-99b644b38f50",
  },
  Monitors: {
    name: "Monitors",
    id: "9d901116-3b00-46fa-9851-7ada93ed060c",
  },
  Assessment: {
    name: "Assessment",
    id: "41ac3473-3857-4361-bd99-0fc1e30d9356",
  },
  Goals: {
    name: "Goals",
    id: "dbf6e8c0-23db-44a7-a0ea-4ee6144c930c",
  },
  Formulation: {
    name: "Formulation",
    id: "c71c8b43-693f-4201-81d1-2cf76de05d9c",
  },
  Homework: {
    name: "Homework",
    id: "1a6668a7-ec04-4904-9730-a14ae4ac1541",
  },
  Feedback: {
    name: "Feedback",
    id: "a75254ca-e3f3-401a-8e20-bbb50b3d39e3",
  },
  Resource: {
    name: "Resource",
    id: "3a9a05b2-30c3-4f3a-baec-1be796085544",
  },
  Profile: {
    name: "Profile",
    id: "339a343f-63c6-426f-8357-f2fc5a25aa20",
  },
  Library: {
    name: "Library",
    id: "52743f48-7e87-44ee-b473-e8fa880c447d",
  },
  Resources: {
    name: "Resources",
    id: "3a9a05b2-30c3-4f3a-baec-1be796085544",
  },
  "Personal Info": {
    name: "Personal Info",
    id: "8367b791-1398-4c94-b3fa-91d75ab61716",
  },
  Therapy: {
    name: "Therapy",
    id: "36abaa03-7151-44c7-b687-e80ae7bc0e55",
  },
  Notes: {
    name: "Notes",
    id: "e72e9adf-9320-4563-8b00-47bfbfe0c7da",
  },
};
