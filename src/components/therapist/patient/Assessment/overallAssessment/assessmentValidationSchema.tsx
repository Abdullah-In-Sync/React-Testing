import * as Yup from "yup";

export const therapistAssessmentValidationSchema = ({ lastSessionNo }) =>
  Yup.object().shape({
    pttherapySession: Yup.number()
      .required("Session number is required")
      .positive()
      .integer()
      .min(lastSessionNo, `Minimum rquired session is ${lastSessionNo}.`)
      .max(50, "Maximum rquired session is 50."),
  });
