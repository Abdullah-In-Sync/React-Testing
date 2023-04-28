import { Formik } from "formik";
import React from "react";
import ResponseForm from "../form/ResponseForm";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const TakeTestForm: React.FC<ViewProps> = ({
  measureData,
  onPressCancel,
  submitForm,
  confirmRef,
}) => {
  const {
    _id: measureId,
    title = "",
    description = "",
    template_id: templateId = "",
    template_data = null,
    session_no = "start",
    score,
  } = measureData || {};

  const initialValues = {
    measureId,
    title,
    description,
    templateId,
    templateData: { ...JSON.parse(template_data), ...{ totalScore: score } },
    sessionNo: session_no,
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <ResponseForm
            formikProps={props}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default TakeTestForm;
