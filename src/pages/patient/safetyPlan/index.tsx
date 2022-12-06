import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import Layout from "../../../components/layout";
import { UPDATE_SAFETY_PLAN_QUESTION_DATA } from "../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import SafetyPlan from "../../../components/common/SafetyPlan/safetyPlan";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";

const PatientById: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateTemplate] = useMutation(UPDATE_SAFETY_PLAN_QUESTION_DATA);
  const [loader, setLoader] = useState<boolean>(false);

  /* istanbul ignore next */
  useEffect(() => {
    setLoader(true);
  }, []);

  const handleEdit = async (formFields) => {
    /* istanbul ignore else */
    const data = formFields.map((x) => ({
      _id: x._id,
      safety_ans: x.safety_ans,
      safety_ques_id: x.safety_ques_id,
    }));

    try {
      await updateTemplate({
        variables: {
          quesData: JSON.stringify(data),
        },
        onCompleted: () => {
          enqueueSnackbar("Details Saved Successfully", { variant: "success" });
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
        <ContentHeader title="Safety Plan" />
        <SafetyPlan setLoader={setLoader} onSubmit={handleEdit} />
      </Layout>
    </>
  );
};
export default PatientById;
