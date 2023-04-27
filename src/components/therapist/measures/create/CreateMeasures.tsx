import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { measuresValidationSchema } from "../form/measuresValidationSchema";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const CreateMeasuersForm: React.FC<ViewProps> = ({
  submitForm,
  onPressCancel,
  confirmRef,
  infoModalRef,
}) => {
  const initialValues = {
    title: "",
    description: "",
    templateId: "",
    templateData: null,
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
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default CreateMeasuersForm;
