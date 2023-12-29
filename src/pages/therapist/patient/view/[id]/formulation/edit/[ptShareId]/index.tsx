/* eslint-disable prettier/prettier */
import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../../../../components/common/SuccessModal";
import Layout from "../../../../../../../../components/layout";
import {
  GET_FORMULATION_BY_SHARE_ID,
  UPDATE_PAT_FORMULATION_BY_ID,
} from "../../../../../../../../graphql/formulation/graphql";
import PatientFormulationTemplateEdit from "../../../../../../../../components/patient/formulation/edit";
import ConfirmationModal from "../../../../../../../../components/common/ConfirmationModal";
import TemplatePopupView from "../../../../../../../../components/common/popupViewTemplate/templatePopupView";

const TherapistPatientEditTemplatePage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmCancel, setIsConfirmCancel] = useState(false);
  const [updatedData, SetUpdatedData] = useState();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [description, setDescription] = useState();
  const [instruction, setInstruction] = useState();
  const [formulationData, setFormulationData] = useState({
    _id: "",
    created_date: "",
    formulation_id: "",
    patient_id: "",
    share_from: "",
    updated_date: "",
    __typename: "",
    template_response: "",
    component_name: "",
    template_data: "",
    download_formulation_url: "",
    formulation_url: "",
  });
  const router = useRouter();
  const id = router?.query?.ptShareId as string;
  const patientId = sessionStorage.getItem("patient_id");

  const [updateTemplateResponse] = useMutation(UPDATE_PAT_FORMULATION_BY_ID);

  const [getFormulation] = useLazyQuery(GET_FORMULATION_BY_SHARE_ID, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data?.getFormulationByShareId?.data) {
        const Obj = {
          ...data?.getFormulationByShareId["data"][0].formulation_data[0],
          _id: data?.getFormulationByShareId["data"][0]._id,
          template_response: data?.getFormulationByShareId["data"][0].template_response,
          component_name:
            data?.getFormulationByShareId["data"][0]?.template_detail?.component_name,
        };
        setFormulationData(Obj);
        setDescription(
          data?.getFormulationByShareId["data"][0]?.formulation_data[0]
            ?.formulation_desc
        );
        setInstruction(
          data?.getFormulationByShareId["data"][0]?.formulation_data[0]
            ?.formulation_instruction
        );
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    getFormulation({
      variables: { ptsharresId: id,patient_id: patientId},
    });
  }, []);

  const handleSubmitTemplateData = async (value) => {
    SetUpdatedData(
      formulationData.component_name == "ArrowTemplate"
        ? value
        : JSON.stringify(value)
    );
    setIsConfirm(true);
  };
  const handlerAddAndUpdate = async () => {
    setLoader(true);
    try {
      const {
        data: { updatePatFormulationById },
      } = await updateTemplateResponse({
        variables: {
          ptsharresId: id,
          patient_id: patientId,
          updateShareForm: {
            template_response: updatedData,
          },
        },
      });
      if (updatePatFormulationById) setSuccessModal(true);
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleViewOpen = () => {
    setIsOpenPopup(true);
  };

  const handleSuccessOk = () => {
    /* istanbul ignore next */
    router.back();
    /* istanbul ignore next */
    setSuccessModal(false);
  };
  const onPressBack = () => {
    router.back();
  };
  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
    setIsConfirmCancel(false);
  };

  /* istanbul ignore next */
  const cancelConfirm = () => {
    router.back();
    setIsConfirmCancel(false);
  };
  /* istanbul ignore next */
  const onCancel = () => {
    setIsConfirmCancel(true);
  };
  const onClosePopup = () => {
    setIsOpenPopup(false);
  };
  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title={"Formulation Detail"} />
        <PatientFormulationTemplateEdit
          formulationData={formulationData}
          onSubmit={handleSubmitTemplateData}
          onClickView={(description || instruction) && handleViewOpen}
          mode={"edit"}
          onPressBack={onPressBack}
          onCancel={onCancel}
          defaultUserType="patient"
        />
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            description={"Your worksheet has been submitted successfully."}
            onOk={handleSuccessOk}
          />
        )}
        {isConfirm && (
          <ConfirmationModal
            label="Are you sure you want to submit the response?"
            onCancel={clearIsConfirmCancel}
            onConfirm={handlerAddAndUpdate}
          />
        )}
        {isConfirmCancel && (
          <ConfirmationModal
            label="Are you sure you want to cancel the response without submitting?"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {isOpenPopup && (
          <TemplatePopupView
            isOpen={isOpenPopup}
            onClose={onClosePopup}
            description={description}
            instruction={instruction}
          />
        )}
      </Layout>
    </>
  );
};

export default TherapistPatientEditTemplatePage;
