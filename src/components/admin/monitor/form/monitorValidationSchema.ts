import * as Yup from "yup";

export const monitorValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  orgId: Yup.string().required("Organization is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      questionType: Yup.string().required("Question type is required"),
      questionOption: Yup.mixed().when("questionType", {
        is: "list",
        then: Yup.string().required("List option can not be left blank"),
      }),
    })
  ),
});
