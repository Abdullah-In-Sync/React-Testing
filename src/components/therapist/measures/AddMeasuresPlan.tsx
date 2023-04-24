import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import { InitialFormValues } from "../patient/therapistSafetyPlan/types";
import MeasuresFormAdd from "./MeasuresFormAdd";

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
  title: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const AddMeasuresPlanForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  therapistSafetyPlanList,
  receivePlanId,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
    title: "",
  };

  /* istanbul ignore next */
  const onChangePlanId = (value) => {
    /* istanbul ignore next */
    receivePlanId(value);
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={() => (
          <MeasuresFormAdd
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

export default AddMeasuresPlanForm;
