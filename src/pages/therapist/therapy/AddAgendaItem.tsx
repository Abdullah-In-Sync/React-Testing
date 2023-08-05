import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAddAgendaItem from "./AddAgendaItemForm";

interface ViewProps {
  submitForm?: () => void;
  onPressSubmit?: () => void;
  receiveDisplayValue?: any;
  receivedAgendaValue?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddAgendaItemForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  receiveDisplayValue,
  receivedAgendaValue,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  /* istanbul ignore next */
  const onChangeDisplayValue = (value) => {
    receiveDisplayValue(value);
  };

  /* istanbul ignore next */
  const onChangeAgendaValue = (value) => {
    receivedAgendaValue(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormAddAgendaItem
            onPressSubmit={onPressSubmit}
            onChangeAgendaValue={onChangeAgendaValue}
            onChangeDisplayValue={onChangeDisplayValue}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddAgendaItemForm;
