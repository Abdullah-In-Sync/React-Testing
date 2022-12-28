import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import Layout from "../../../components/layout";
import { UPDATE_RELAPSE_QUESTION_ANSWER_DATA } from "../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Relapse from "../../../components/common/Relapse/relapse";

const PatientById: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateRelapse] = useMutation(UPDATE_RELAPSE_QUESTION_ANSWER_DATA);
  const [loader, setLoader] = useState<boolean>(false);

  /* istanbul ignore next */
  useEffect(() => {
    setLoader(true);
  }, []);

  const handleEdit = async (formFields) => {
    const data = formFields.map((x) => ({
      relapse_ans_id: x.relapse_ans_detail[0]._id,

      relapse_ans: x.relapse_ans_detail[0].relapse_ans,

      relapse_ques_id: x.relapse_ans_detail[0].relapse_ques_id,
    }));

    try {
      await updateRelapse({
        variables: {
          relapse_ans_data: JSON.stringify(data),
        },
        onCompleted: () => {
          enqueueSnackbar("Details Saved Successfully", { variant: "success" });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Relapse" />
        <Relapse setLoader={setLoader} onSubmit={handleEdit} />
      </Layout>
    </>
  );
};
export default PatientById;
