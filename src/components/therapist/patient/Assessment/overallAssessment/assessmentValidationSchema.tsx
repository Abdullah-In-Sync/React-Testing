/* istanbul ignore file */
import * as Yup from "yup";

export const therapistAssessmentValidationSchema = ({ lastSessionNo }) =>
  Yup.object().shape({
    pttherapySession: Yup.number()
      .required("Session is required")
      .positive()
      .integer()
      .min(lastSessionNo, (v) => {
        const { min } = v;
        const modifyMinValue = min + 1;
        const minText =
          modifyMinValue >= 50
            ? "Already reached maximum sessions 50."
            : `Minimum required session is ${modifyMinValue}.`;
        return minText;
      })
      .max(50, "Maximum required session is 50."),
  });
