/* istanbul ignore file */
import { Formik, FormikProps } from "formik";
import React, { useState, useRef } from "react";

import { FeedbackFormData } from "../form/types";
import { feedbackValidationSchema } from "../form/CreateFeedbackValidationSchema";
import CommonFeedbackForm from "../form/CommonFeedbackForm";
import {
  CheckFeedbackNameRes,
  CheckFeedbackNameVars,
} from "../../../../graphql/Feedback/types";
import { CHECK_FEEDBACK_NAME } from "../../../../graphql/Feedback/graphql";
import CheckFeedbackModel from "../form/CheckFeedModel/CheckFeedbackNameModel";
import { useLazyQuery } from "@apollo/client";

interface ViewProps {
  submitForm?: (
    formData: FeedbackFormData,
    formikHelper: FormikProps<FeedbackFormData>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFeedbackForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  setLoader,
}) => {
  const [showCheckFeedbackModal, setShowCheckFeedbackModal] =
    useState<boolean>(false);
  const validationRef = useRef<boolean>(false);
  const initialValues = {
    feedBackName: "",
    orgId: "",
    userType: "",
    sessionNo: "",
    feedBackDesc: "",
    feedQuesData: "",
    questions: [],
    visiBility: 0,
  };

  const [checkFeedbackName, { data: checkFeedbackNameRes }] = useLazyQuery<
    CheckFeedbackNameRes,
    CheckFeedbackNameVars
  >(CHECK_FEEDBACK_NAME, {
    onCompleted: (data) => {
      setLoader(false);
      if (data?.checkFeedbackName != null) {
        setShowCheckFeedbackModal(true);
        validationRef.current = false;
      } else {
        validationRef.current = true;
      }
    },
  });

  const submitFormValidationCheck = (
    formData: FeedbackFormData,
    formikHelper: FormikProps<FeedbackFormData>
  ) => {
    if (validationRef.current) {
      submitForm(formData, formikHelper);
    } else {
      setShowCheckFeedbackModal(true);
    }
    formikHelper.setSubmitting(false);
  };

  const onCheckFeedbackModelOk = () => setShowCheckFeedbackModal(false);

  const commonform = () => {
    return (
      <>
        <Formik<FeedbackFormData>
          validationSchema={feedbackValidationSchema}
          initialValues={initialValues}
          onSubmit={submitFormValidationCheck}
          children={(props: any) => (
            <CommonFeedbackForm
              formikProps={props}
              organizationList={organizationList}
              onPressCancel={onPressCancel}
              checkFeedbackName={checkFeedbackName}
              setLoader={setLoader}
            />
          )}
        />
        <CheckFeedbackModel
          isOpen={showCheckFeedbackModal}
          validationFailList={checkFeedbackNameRes}
          onOK={onCheckFeedbackModelOk}
        />
      </>
    );
  };
  return <>{commonform()}</>;
};

export default CreateFeedbackForm;
