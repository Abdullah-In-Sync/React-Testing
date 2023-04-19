import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { measuresValidationSchema } from "../form/measuresValidationSchema";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const CreateMeasuersForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  confirmRef,
  infoModalRef,
}) => {
  const initialValues = {
    title: "",
    description: "",
    orgId: "",
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
            organizationList={organizationList}
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
