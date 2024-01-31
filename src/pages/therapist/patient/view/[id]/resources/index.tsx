import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Patients from "../../../../../../components/therapist/patient";
import { GET_PATH_RESOURCE_LIST } from "../../../../../../graphql/query/resource";
import Loader from "../../../../../../components/common/Loader";
import { DELETE_RESOURCE_BY_ID } from "../../../../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import ConfirmWrapper, {
  ConfirmElement,
} from "../../../../../../components/common/ConfirmWrapper";
import { THERAPIST_SHARE_RESOURCE } from "../../../../../../graphql/resources/graphql";

const PatientEditTemplatePage2: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const router = useRouter();
  /* istanbul ignore next */
  const { id: patientId } = router?.query || {};
  const [deleteResource] = useMutation(DELETE_RESOURCE_BY_ID);
  const [therapistShareResource] = useMutation(THERAPIST_SHARE_RESOURCE);

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

  const onShareResourceSubmit = async (ptsharresId) => {
    try {
      await therapistShareResource({
        variables: {
          ptsharresId,
        },
        onCompleted: (data) => {
          const {
            therapistSharePatientResource: { result },
          } = data;
          if (result) {
            refetch();
            enqueueSnackbar("Resource has been shared successfully!", {
              variant: "success",
            });
            confirmRef.current.close();
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleDeleteResource = async (ptsharresId) => {
    try {
      await deleteResource({
        variables: {
          ptsharresId,
        },
        onCompleted: (data) => {
          const {
            deleteShareResource: { result },
          } = data;
          if (result) {
            refetch();
            enqueueSnackbar("Resource deleted Successfully.", {
              variant: "success",
            });
            confirmRef.current.close();
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleIconButtonClick = (value) => {
    const { resource_id, pressedIconButton, ptsharres_status } = value;
    if (pressedIconButton == "view")
      router.push(`/therapist/resource/${resource_id}/${patientId}`);
    else if (pressedIconButton == "delete") {
      confirmRef.current.openConfirm({
        confirmFunction: () => handleDeleteResource(value._id),
        description: "Are you sure you want to delete resource?",
      });
    } else if (pressedIconButton == "share" && ptsharres_status === "0")
      confirmRef.current.openConfirm({
        confirmFunction: () => onShareResourceSubmit(value._id),
        description: "Are you sure you want to share the resource?",
      });
  };

  return (
    <>
      <Loader visible={loader} />
      {patientId && (
        <Patients
          patientResourceList={getPatResourceList.data}
          buttonClick={handleIconButtonClick}
        />
      )}
      <ConfirmWrapper ref={confirmRef} />
    </>
  );
};

export default PatientEditTemplatePage2;
