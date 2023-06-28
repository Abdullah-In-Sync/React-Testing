import * as Yup from "yup";

export const therapistAssessmentValidationSchema = ({ lastSessionNo }) =>
  Yup.object().shape({
    pttherapySession: Yup.number()
      .required("Session is required")
      .positive()
      .integer()
      .min(lastSessionNo, lastSessionNo >= 50 ? "Already reached maximum sessions 50." : `Minimum required session is ${lastSessionNo}.`)
      .max(50, "Maximum required session is 50."),
  });
