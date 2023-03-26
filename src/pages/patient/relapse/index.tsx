import React, { useState } from "react";
import type { NextPage } from "next";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import RelapsePlan from "../../../components/common/Relapse";
import { SuccessModal } from "../../../components/common/SuccessModal";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { ANSWER_RELAPSE_PLAN_BY_PATIENT_ID } from "../../../graphql/Relapse/graphql";
import { GetPatientRelapsePlan } from "../../../graphql/Relapse/types";

const PatientRelapsePlanPage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  //Mutation
  const [updateTemplate] = useMutation(ANSWER_RELAPSE_PLAN_BY_PATIENT_ID);

  /* istanbul ignore next */
  const handleEdit = async (
    safetyPlan: GetPatientRelapsePlan,
    callback: any
  ) => {
    /* istanbul ignore else */
    const data = safetyPlan?.questions.map((x) => ({
      answer: x.patient_answer,
      questionId: x._id,
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
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Relapse Plan" />
        <RelapsePlan setLoader={setLoader} onSubmit={handleEdit} />
        <SuccessModal
          isOpen={showSuccessModal}
          title={"Successful"}
          description={"Your response has been submitted successfully."}
          onOk={() => setShowSuccessModal(false)}
        />
      </Layout>
    </>
  );
};
export default PatientRelapsePlanPage;
