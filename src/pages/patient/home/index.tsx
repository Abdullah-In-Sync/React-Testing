import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useMutation } from "@apollo/client";
import Layout from "../../../components/layout";
import { UPDATE_PATIENT_HOME_BY_ID } from "../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import Loader from "../../../components/common/Loader";
import PatientHome from "../../../components/common/PatientHome/patientHome";
import router from "next/router";

const HomePage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateHomeData] = useMutation(UPDATE_PATIENT_HOME_BY_ID);
  const [loader, setLoader] = useState<boolean>(false);

  /* istanbul ignore next */
  useEffect(() => {
    setLoader(true);
  }, []);

  const handleEdit = async (formFields) => {
    try {
      await updateHomeData({
        variables: {
          appId: formFields,
        },
        onCompleted: () => {
          enqueueSnackbar("Appointment Cancelled Successfully", {
            variant: "success",
          });
          router.reload();
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
        <PatientHome setLoader={setLoader} onSubmit={handleEdit} />
      </Layout>
    </>
  );
};
export default HomePage;
