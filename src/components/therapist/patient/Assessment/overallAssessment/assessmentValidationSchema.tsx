import * as Yup from "yup";

export const therapistAssessmentValidationSchema = ({ lastSessionNo }) =>
  Yup.object().shape({
    pttherapySession: Yup.number()
      .required("Session is required")
      .positive()
      .integer()
      .min(lastSessionNo, (v) => {
        const { min } = v;
        const minText =
          min >= 50
            ? "Already reached maximum sessions 50."
            : `Minimum required session is ${min}.`;
        return minText;
      })
      .max(50, "Maximum required session is 50."),
  });
