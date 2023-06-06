import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import FormAddMonitor from "./FormAddMonitor";

export interface InitialFormValues {
  monitorId: string;
}

export interface TherapistAddMonitorViewProps {
  onPressAddMonitor?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  list?: any;
  modalRef?: any;
  data?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  monitorId: Yup.string().required("Monitor is required"),
});

const initialValues = {
  monitorId: "",
};

const TherapistAddMonitor: React.FC<TherapistAddMonitorViewProps> = ({
  onPressAddMonitor,
  data,
}) => {
  return (
    <Formik
      validationSchema={safetyPlanValidationSchema}
      initialValues={initialValues}
      onSubmit={onPressAddMonitor}
      children={(rest) => <FormAddMonitor data={data} {...rest} />}
    />
  );
};

export default TherapistAddMonitor;
