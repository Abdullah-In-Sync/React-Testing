import * as Yup from "yup";

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  orgId: Yup.string().required("Organization is required"),
  planType: Yup.string().required("Plan type is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      questionType: Yup.string().required("Question type is required"),
      questionOption: Yup.string().when("questionType", {
        is: "2",
        then: Yup.string().required("List option can not be left blank"),
      }),
    })
  ),
});
