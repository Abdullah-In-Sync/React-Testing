import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ShareAssessmentModel from "./ShareAssessment";
import { CommonModal } from "../../../common/CustomModal/CommonModal";

interface ViewProps {
  submitForm?: any;
  onPressSubmit?: () => void;
  setPlanId?: any;
  selectAssessmentName: string;
  receivePlanId: any;
  isOpen: any;
  headerTitleText: string;
  shareType: string;
  listType?: string;
}

export const safetyPlanValidationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  // planDesc: Yup.string().required("Description is required"),
});

const ShareAssessmentForm: React.FC<ViewProps> = ({
  submitForm,
  onPressSubmit,
  setPlanId,
  selectAssessmentName,
  receivePlanId,
  isOpen,
  headerTitleText,
  shareType,
  listType,
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
              selectAssessmentName={selectAssessmentName}
              setPlanId={setPlanId}
              onChangePlanId={onChangePlanId}
              onPressSubmit={onPressSubmit}
              shareType={shareType}
              listType={listType}
            />
          )}
        />
      </CommonModal>
    );
  };
  return <>{commonform()}</>;
};

export default ShareAssessmentForm;
