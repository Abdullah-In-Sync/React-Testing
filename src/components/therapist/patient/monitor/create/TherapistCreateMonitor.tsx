import { Formik } from "formik";
import React from "react";
import TherapistMonoitorCommonForm from "../form/TherapistMonitorCommonForm";
import { TherapistMonitorValidationSchema } from "../form/therapistMonitorValidationSchema";
import { defalutEmojis } from "../../../../../lib/constants";

type ViewProps = any;

const TherapistCreateMonitorForm: React.FC<ViewProps> = ({
  submitForm,

  onPressCancel,
  confirmRef,
  infoModalRef,
}) => {
  const initialValues = {
    name: "",
    questions: [
      {
        question: "",
        questionType: "emoji",
        questionOption: defalutEmojis,
      },
    ],
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={TherapistMonitorValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <TherapistMonoitorCommonForm
            formikProps={props}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default TherapistCreateMonitorForm;
