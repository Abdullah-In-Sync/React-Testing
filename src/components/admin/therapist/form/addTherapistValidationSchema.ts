import * as Yup from "yup";
const phoneRegExp = /^\+[1-9]{1}[0-9]{3,14}$/;

export const addTherapistValidationSchema = Yup.object().shape({
  plan: Yup.string().required("Plan is required"),
  therapist_name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  org_id: Yup.string().required("Organization is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  therapist_inscover_file: Yup.mixed()
    .test("optional", null, (value) => {
      return value != null;
    })
    .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
      if (value == "undefined" || value) {
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "application/pdf")
        );
      } else {
        return true;
      }
    }),
  therapist_poa_attachment_file: Yup.mixed().when(
    "therapist_proofaccredition",
    {
      is: 1,
      then: Yup.mixed()
        .test("optional", null, (value) => {
          return value != null;
        })
        .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
          if (value == "undefined" || value) {
            return (
              value &&
              (value.type === "image/jpg" ||
                value.type === "image/jpeg" ||
                value.type === "image/png" ||
                value.type === "application/pdf")
            );
          } else {
            return true;
          }
        }),
    }
  ),
  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  trial_period: Yup.string().when("plan", {
    is: "free",
    then: Yup.string().required("Trial period is required"),
  }),
});

export const editTherapistValidationSchema = Yup.object().shape({
  plan: Yup.string().required("Plan is required"),
  therapist_name: Yup.string().required("Name is required"),
  therapist_inscover_file: Yup.mixed()
    .test("optional", null, (value) => {
      return value != null;
    })
    .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
      if (value == "undefined" || value) {
        return (
          value &&
          (value.type === "image/jpg" ||
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "application/pdf")
        );
      } else {
        return true;
      }
    }),
  therapist_poa_attachment_file: Yup.mixed().when(
    "therapist_proofaccredition",
    {
      is: 1,
      then: Yup.mixed()
        .test("optional", null, (value) => {
          return value != null;
        })
        .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
          if (value == "undefined" || value) {
            return (
              value &&
              (value.type === "image/jpg" ||
                value.type === "image/jpeg" ||
                value.type === "image/png" ||
                value.type === "application/pdf")
            );
          } else {
            return true;
          }
        }),
    }
  ),
  trial_period: Yup.string().when("plan", {
    is: "free",
    then: Yup.string().required("Trial period is required"),
  }),
});
