import type { NextPage } from "next";
import { useEffect, useState } from "react";

import HomeworkComponent from "../../../patient/homework";
import ConfirmationModal from "../../../patient/homework/ConfirmationModal";
import { UPDATE_PATIENT_HOMEWORK_BY_ID } from "../../../../graphql/mutation/patient";
import { GET_PATIENTTHERAPY_DATA } from "../../../../graphql/query/common";
import { GET_PATIENT_HOMEWORK_LIST } from "../../../../graphql/query/patient";

import { useLazyQuery, useMutation } from "@apollo/client";
import { useAppContext } from "../../../../contexts/AuthContext";
import { useSnackbar } from "notistack";
import Loader from "../../../common/Loader";
import { SuccessModal } from "../../../common/SuccessModal";

const Homework: NextPage = () => {
  const { user: { patient_data: { _id: patientId = null } = {} } = {} } =
    useAppContext();
  const { enqueueSnackbar } = useSnackbar();
  const [updateHomeworkById] = useMutation(UPDATE_PATIENT_HOMEWORK_BY_ID);
  const [loader, setLoader] = useState<boolean>(true);
  const [therapyData, setTherapyData] = useState<object[]>([]);
  const [homeworkList, setHomeworkList] = useState<object[]>([]);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);

  //grphql apis
  const [getPatientTherapyData] = useLazyQuery(GET_PATIENTTHERAPY_DATA, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getPatientTherapy) {
        setTherapyData(data!.getPatientTherapy);
        /* istanbul ignore else */
      }
      setLoader(false);
    },
  });

  const [getPatientHomeworkList] = useLazyQuery(GET_PATIENT_HOMEWORK_LIST, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      /* istanbul ignore else */
      const { getHomeworksByPatientId } = data;
      if (getHomeworksByPatientId) setHomeworkList(getHomeworksByPatientId);
      else setHomeworkList([]);

      setLoader(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    getPatientTherapyData({
      variables: { patientId: patientId },
    });
  }, [patientId]);

  const handleSubmit = (formFields, setSubmitting) => {
    setIsConfirm({
      status: true,
      storedFunction: () => confirmedSubmit(formFields, setSubmitting),
      setSubmitting: setSubmitting,
    });
  };

  const confirmedSubmit = async (formFields, setSubmitting) => {
    setLoader(true);
    const { _id, response } = formFields;
    try {
      await updateHomeworkById({
        variables: {
          ptHomeworkId: _id,
          update: {
            pthomewrk_resp: response,
          },
        },
        onCompleted: () => {
          /* istanbul ignore else */
          setSuccessModal(true);
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
  };

  const onChangeTherapy = (v) => {
    setLoader(true);
    getPatientHomeworkList({
      variables: { therapyId: v },
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction();
    setIsConfirm({ status: false, storedFunction: null, setSubmitting: null });
  };

  const clearIsConfirm = () => {
    isConfirm.setSubmitting(false);
    setIsConfirm({ status: false, storedFunction: null, setSubmitting: null });
  };

  const handleOk = () => {
    setSuccessModal(false);
  };

  return (
    <>
      <Loader visible={loader} />
      <HomeworkComponent
        homeworkList={homeworkList}
        handleSubmit={handleSubmit}
        therapyData={therapyData}
        onChangeTherapy={onChangeTherapy}
      />
      {isConfirm.status && (
        <ConfirmationModal
          label="Are you sure want to save the homework?"
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="HOMEWORK TASK"
          description={"Task saved successfully."}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default Homework;
