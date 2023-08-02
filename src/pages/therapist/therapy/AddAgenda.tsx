import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAddAgenda from "./AddAgendaForm";

interface ViewProps {
  submitForm?: () => void;
  onPressSubmit?: () => void;

  disorderList?: any;
  receiveDisorderId?: any;
  modelList?: any;
  receiveModelId?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddAgendaForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  disorderList,
  receiveDisorderId,
  modelList,
  receiveModelId,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  /* istanbul ignore next */
  const onChangeDisorderId = (value) => {
    receiveDisorderId(value);
  };

  /* istanbul ignore next */
  const onChangeModelId = (value) => {
    receiveModelId(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormAddAgenda
            disorderList={disorderList}
            onChangeDisorderId={onChangeDisorderId}
            modelList={modelList}
            onChangeModelId={onChangeModelId}
            onPressSubmit={onPressSubmit}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddAgendaForm;
