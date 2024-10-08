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
  const [loader, setLoader] = useState<boolean>(false);
  // const [homeworkList, setHomeworkList] = useState<object[]>([]);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);

  const [
    getPatientHomeworkList,
    {
      data: {
        getHomeworksByPatientId: { data: homeworkList = undefined } = {},
      } = {},
      loading: loadingHomeworkList,
    },
  ] = useLazyQuery(GET_PATIENT_HOMEWORK_LIST, {
    fetchPolicy: "network-only",
  });

  const [getPatientTherapyData, { loading: loadingPatientTherapy }] =
    useLazyQuery(GET_PATIENTTHERAPY_DATA, {
      onCompleted: (data) => {
        /* istanbul ignore else */
        const { _id: therapyId } = data!.getPatientTherapy[0] || [];
        if (therapyId) {
          getPatientHomeworkList({
            variables: { therapyId },
          });
        }
      },
    });

  useEffect(() => {
    if (patientId) {
      getPatientTherapyData({
        variables: { patientId: patientId },
      });
    }
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
        onCompleted: (data) => {
          const { result } = data;
          if (result) setSuccessModal(true);
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setSubmitting(false);
      setLoader(false);
    }
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
      <Loader
        visible={loader || loadingHomeworkList || loadingPatientTherapy}
      />
      {!loadingPatientTherapy && (
        <HomeworkComponent
          homeworkList={homeworkList}
          handleSubmit={handleSubmit}
        />
      )}
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
