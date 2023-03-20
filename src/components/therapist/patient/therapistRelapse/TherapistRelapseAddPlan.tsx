import React from "react";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { CommonModal } from "../../../../components/common/CustomModal/CommonModal";
import FormAddPlan from "./FormAddPlan";

export interface InitialFormValues {
  planId: string;
}

interface ViewProps {
  onPressAddRelapsePlan?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  relapsePlanList?: any;
  modalRefAddPlan?: any;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planId: Yup.string().required("Plan name is required"),
});

const initialValues = {
  planId: "",
};

const TherapistRelapseAddPlan: React.FC<ViewProps> = ({
  onPressAddRelapsePlan,
  relapsePlanList,
  modalRefAddPlan,
}) => {
  return (
    <CommonModal ref={modalRefAddPlan} headerTitleText="Add Plan" maxWidth="sm">
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={onPressAddRelapsePlan}
        children={() => <FormAddPlan relapsePlanList={relapsePlanList} />}
      />
    </CommonModal>
  );
};

export default TherapistRelapseAddPlan;
