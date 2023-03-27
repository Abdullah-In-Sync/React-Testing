import React, { useState } from "react";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import SafetyPlan from "../../../common/SafetyPlan/safetyPlan";
import ContentHeader from "../../../common/ContentHeader";
import Loader from "../../../common/Loader";
import { ViewSafetyPlanById } from "../../../../graphql/SafetyPlan/types";
import { ANSWER_SAFETY_PLAN_BY_PATIENT_ID } from "../../../../graphql/SafetyPlan/graphql";
import { SuccessModal } from "../../../common/SuccessModal";

const PatientById: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateTemplate] = useMutation(ANSWER_SAFETY_PLAN_BY_PATIENT_ID);
  const [loader, setLoader] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const handleEdit = async (safetyPlan: ViewSafetyPlanById, callback: any) => {
    /* istanbul ignore else */
    const data = safetyPlan?.questions.map((x) => ({
      answer: x.patient_answer,
      QuestionId: x._id,
    }));

    try {
      setLoader(true);
      await updateTemplate({
        variables: {
          quesData: JSON.stringify(data),
        },
        onCompleted: () => {
          setLoader(false);
          setShowSuccessModal(true);
          callback?.();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      {/* <Layout> */}
      <Loader visible={loader} />
      <ContentHeader title="Safety Plan" />
      <SafetyPlan setLoader={setLoader} onSubmit={handleEdit} />
      <SuccessModal
        isOpen={showSuccessModal}
        title={"Successful"}
        description={"Your response has been submitted successfully."}
        onOk={() => setShowSuccessModal(false)}
      />
      {/* </Layout> */}
    </>
  );
};
export default PatientById;
