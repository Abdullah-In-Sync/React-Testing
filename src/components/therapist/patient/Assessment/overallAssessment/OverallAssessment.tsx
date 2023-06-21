import { Formik, FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import { GetRisksListEntity } from "../../../../../graphql/assessment/types";
import { csvDecode } from "../../../../../utility/helper";
import { ConfirmElement } from "../../../../common/ConfirmWrapper";
import OverallAssessmentForm from "./OverallAssessmentForm";
import TherapistPatientAssessmentList from "./TherapistPatientAssessmentList";
import { therapistAssessmentValidationSchema } from "./assessmentValidationSchema";

const TherapistPatientOverallAssessment: React.FC<
  TherapistPatientAssessmentProps
> = ({
  onSubmitTherapistAssessment,
  confirmRef,
  risksListData = [],
  overallAssesmentText = "",
  pttherapySession,
  risk,
  risksListLoading,
  assessmentListData,
  onClickAddAssessment,
}) => {
  const modifyRisk = risk
    ? risksListData
        .filter((item) => csvDecode(risk).includes(item._id))
        .map((item) => {
          return {
            label: item.name,
            value: item._id,
          };
        })
    : [];

  const initialValues = {
    overallAssesmentText,
    pttherapySession,
    risks: modifyRisk,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={therapistAssessmentValidationSchema({
          lastSessionNo: pttherapySession || 1,
        })}
        initialValues={initialValues}
        onSubmit={onSubmitTherapistAssessment}
        children={(props: any) => (
          <OverallAssessmentForm
            formikProps={props}
            confirmRef={confirmRef}
            risksListData={risksListData}
          />
        )}
      />
    );
  };

  return (
    <>
      <TherapistPatientAssessmentList
        assessmentListData={assessmentListData}
        onClickAddAssessment={onClickAddAssessment}
      />
      {!risksListLoading && commonform()}
    </>
  );
};

export default TherapistPatientOverallAssessment;

interface InitialFormValues {
  overallAssesmentText: string;
  pttherapySession: string | number;
  risks: any;
}

export interface TherapistPatientAssessmentProps {
  actionButtonClick?: (v) => void;
  onPressAddAssessment?: () => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  risksListLoading?: boolean;
  onSubmitTherapistAssessment?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  risksListData?: GetRisksListEntity[];
  overallAssesmentText?: string;
  pttherapySession?: string;
  risk?: string;
  formikProps?: FormikProps<InitialFormValues>;
  assessmentListData?: any;
  onClickAddAssessment?: () => void;
  assessmentListLoading?: boolean;
}
