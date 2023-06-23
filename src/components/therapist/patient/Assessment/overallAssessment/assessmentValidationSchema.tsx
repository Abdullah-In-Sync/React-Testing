import * as Yup from "yup";

export const therapistAssessmentValidationSchema = ({ lastSessionNo }) =>
  Yup.object().shape({
    pttherapySession: Yup.number()
      .required("Session is required")
      .positive()
      .integer()
      .min(lastSessionNo, `Minimum required session is ${lastSessionNo + 1}.`)
      .max(50, "Maximum rquired session is 50."),
  });
