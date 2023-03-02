import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Patients from "../../../../../../components/therapist/patient";
import { GET_PATH_RESOURCE_LIST } from "../../../../../../graphql/query/resource";
import Loader from "../../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../../components/common/SuccessModal";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import { DELETE_RESOURCE_BY_ID } from "../../../../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";

const PatientEditTemplatePage2: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loader, setLoader] = useState<boolean>(true);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [ptSharedId, setPtSharedId] = useState("");
  const router = useRouter();
  /* istanbul ignore next */
  const { id: patientId } = router?.query || {};
  const [deleteResource] = useMutation(DELETE_RESOURCE_BY_ID);

  const [
    getPatientResourceList,
    { refetch, data: { getPatResourceList = [] } = {} },
  ] = useLazyQuery(GET_PATH_RESOURCE_LIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    getPatientResourceList({
      variables: { patientId },
    });
  }, []);

  const handleIconButtonClick = (value) => {
    const { resource_id, pressedIconButton } = value;
    if (pressedIconButton == "view")
      router.push(`/therapist/resource/${resource_id}/${patientId}`);
    if (pressedIconButton == "delete") {
      setPtSharedId(value._id);
      setIsConfirm(true);
    }
  };

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
    refetch();
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirm(false);
  };

  const handleDeleteOrg = async () => {
    try {
      await deleteResource({
        variables: {
          ptsharresId: ptSharedId,
        },
        onCompleted: () => {
          setIsConfirm(false);
          setSuccessModal(true);
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
      <Loader visible={loader} />
      {patientId && (
        <Patients
          patientResourceList={getPatResourceList}
          buttonClick={handleIconButtonClick}
        />
      )}
      {isConfirm && (
        <ConfirmationModal
          label="Are you sure?"
          description="You want to delete resource?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleDeleteOrg}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="Successful"
          description={"Resource Deleted Successful"}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default PatientEditTemplatePage2;
