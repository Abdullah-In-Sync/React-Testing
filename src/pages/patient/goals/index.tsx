import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import Layout from "../../../components/layout";
import { UPDATE_PATIENT_GOAL_BY_ID } from "../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import ContentHeader from "../../../components/common/ContentHeader";
import Loader from "../../../components/common/Loader";
import Goals from "../../../components/common/Goals/Goals";

const GoalIndex: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateGoalById] = useMutation(UPDATE_PATIENT_GOAL_BY_ID);
  const [loader, setLoader] = useState<boolean>(false);

  /* istanbul ignore next */
  useEffect(() => {
    setLoader(true);
  }, []);

  const handleEdit = async (formFields) => {
    try {
      await updateGoalById({
        variables: {
          ptGoalId: formFields._id,
          update: {
            ptgoal_success: formFields.ptgoal_success,
            ptgoal_achievementgoal: formFields.ptgoal_achievementgoal,
          },
        },
        onCompleted: () => {
          enqueueSnackbar("Goal saved Successfully", { variant: "success" });
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
        <ContentHeader title="Goals" />
        <Goals setLoader={setLoader} onSubmit={handleEdit} />
      </Layout>
    </>
  );
};
export default GoalIndex;
