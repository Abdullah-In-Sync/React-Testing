import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { measuresValidationSchema } from "../form/measuresValidationSchema";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const EditMeasuersForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  measureData,
  confirmRef,
  infoModalRef,
}) => {
  const {
    title = "",
    description = "",
    org_id: orgId = "",
    template_id: templateId = "",
    template_data = null,
  } = measureData || {};

  const initialValues = {
    title,
    description,
    orgId,
    templateId,
    templateData: JSON.parse(template_data),
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
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
            isEdit
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default EditMeasuersForm;
