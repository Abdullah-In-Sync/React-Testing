import * as Yup from "yup";

export const feedbackValidationSchema = Yup.object().shape({
  feedBackName: Yup.string().required("Feed name is required"),
  orgId: Yup.string().required("Organization is required"),
  userType: Yup.string().required("User type is required"),
  sessionNo: Yup.string().required("Session number is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      answer_type: Yup.string().required("Answer type is required"),
      answer_options: Yup.string().when("answer_type", {
        is: "2",
        then: Yup.string().required("List option can not be left blank"),
      }),
      visiBility: Yup.string().when("userType", {
        is: "therapist",
        then: Yup.string().required("Patient visibility is required"),
      }),
    })
  ),
});
