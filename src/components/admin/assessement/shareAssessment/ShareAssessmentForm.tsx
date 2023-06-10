import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ShareAssessmentModel from "./ShareAssessment";
import { CommonModal } from "../../../common/CustomModal/CommonModal";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  setPlanId?: any;
  organizationList?: any;
  receivePlanId: any;
  isOpen: any;
  headerTitleText: string;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const ShareAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  organizationList,
  receivePlanId,
  isOpen,
  headerTitleText,
}) => {
  const initialValues = {
    planDesc: "",
    planName: "",
  };

  const onChangePlanId = (value) => {
    console.log("Koca: onChangePlanId value ", value);
    /* istanbul ignore next */
    const convertedValue = value.flat();
    receivePlanId(convertedValue);
  };

  const commonform = () => {
    return (
      <CommonModal ref={isOpen} headerTitleText={headerTitleText} maxWidth="sm">
        <Formik
          validationSchema={safetyPlanValidationSchema}
          initialValues={initialValues}
          onSubmit={submitForm}
          children={() => (
            <ShareAssessmentModel
              organizationList={organizationList}
              setPlanId={setPlanId}
              onChangePlanId={onChangePlanId}
              onPressSubmit={onPressSubmit}
            />
          )}
        />
      </CommonModal>
    );
  };
  return <>{commonform()}</>;
};

export default ShareAssessmentForm;
