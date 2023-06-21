import { Formik } from "formik";
import React from "react";
import OverallAssessmentForm from "./OverallAssessmentForm";
import TherapistPatientAssessmentList from "./TherapistPatientAssessmentList";
import { csvDecode } from "../../../../../utility/helper";
import { therapistAssessmentValidationSchema } from "./assessmentValidationSchema";

const TherapistPatientOverallAssessment: React.FC<any> = ({
  organizationList,
  onPressCancel,
  confirmRef,
  infoModalRef,
  risksListData = [],
  onSubmitTherapistAssessment,
  overallAssesmentText = "",
  pttherapySession,
  risk,
  risksListLoading,
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
            organizationList={organizationList}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            risksListData={risksListData}
          />
        )}
      />
    );
  };

  return (
    <>
      <TherapistPatientAssessmentList risksListData={risksListData} />
      {!risksListLoading && commonform()}
    </>
  );
};

export default TherapistPatientOverallAssessment;
