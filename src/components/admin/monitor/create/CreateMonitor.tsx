import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { monitorValidationSchema } from "../form/monitorValidationSchema";

import { defalutEmojis } from "../../../../lib/constants";
import { InitialFormValues, ModalRefs } from "../form/types";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

const CreateMonitorForm: React.FC<ViewProps & ModalRefs> = ({
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
        questionOption: defalutEmojis,
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
