import * as Yup from "yup";

export const monitorCompleteViewValidationSchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      answer: Yup.mixed().when("questionType", {
        is: "emoji",
        then: Yup.string().required("Response is required."),
      }),
    })
  ),
});
