import { InitialFormValues } from "../types";
import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAdd from "./FormAdd";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;

  onPressSubmit?: () => void;
  setPlanId?: any;
  therapistSafetyPlanList?: any;
  receivePlanId: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddPlanForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  therapistSafetyPlanList,
  receivePlanId,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const onChangePlanId = (value) => {
    receivePlanId(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <FormAdd
            therapistSafetyPlanList={therapistSafetyPlanList}
            setPlanId={setPlanId}
            onChangePlanId={onChangePlanId}
            onPressSubmit={onPressSubmit}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddPlanForm;
