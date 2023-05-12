import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { monitorValidationSchema } from "../form/monitorValidationSchema";
import { ModalRefs } from "../form/types";

type ViewProps = any & ModalRefs;

const CreateMonitorForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  confirmRef,
  infoModalRef,
}) => {
  const initialValues = {
    name: "",
    orgId: "",
    questions: [
      {
        question: "",
        questionType: "emoji",
        questionOption:
          '[{"code":"code1","text":"very sad"},{"code":"code2","text":"very good"}]',
      },
    ],
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={monitorValidationSchema}
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

export default CreateMonitorForm;
