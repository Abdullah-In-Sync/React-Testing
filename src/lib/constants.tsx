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
