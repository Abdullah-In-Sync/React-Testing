import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { measuresValidationSchema } from "../form/measuresValidationSchema";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const EditMeasuersForm: React.FC<ViewProps> = ({
  submitForm,
  onPressCancel,
  measureData,
  confirmRef,
  infoModalRef,
  handleDeleteQuestion,
}) => {
  if (!measureData) return null;

  const {
    title = "",
    description = "",
    template_id: templateId = "",
    template_data = null,
  } = measureData || {};

  const initialValues = {
    title,
    description,
    templateId,
    templateData: JSON.parse(template_data),
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={measuresValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            handleDeleteQuestion={handleDeleteQuestion}
            isEdit
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default EditMeasuersForm;
