/* eslint-disable prettier/prettier */
import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import {
  GET_FORMULATION_BY_SHARE_ID,
  UPDATE_PAT_FORMULATION_BY_ID,
} from "../../../../../graphql/formulation/graphql";
import PatientFormulationTemplateEdit from "../../../../../components/patient/formulation/edit";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import TemplatePopupView from "../../../../../components/common/popupViewTemplate /templatePopupView";

const PatientEditTemplatePage: NextPage = () => {
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
    templateData: "",
    component_name: "",
  });
  const router = useRouter();
  const downloadUrl = "data:image/jpeg;base64,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"
  const templateData =
    '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":473.2414156225255,"y":117.2588609700811},"data":{"label":"test","description":"test","patientResponse":"test"},"style":{"width":298,"height":248},"selected":false,"dragging":false,"positionAbsolute":{"x":473.2414156225255,"y":117.2588609700811}},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":89.67422782202881,"y":153.20227159497477},"data":{"label":"","patientResponse":"test"},"style":{"width":298,"height":248},"positionAbsolute":{"x":89.67422782202881,"y":153.20227159497477}}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}';
  const templateResponse =
    '{"nodes":[{"width":298,"height":248,"id":"dndnode_0","type":"selectorNode","position":{"x":473.2414156225255,"y":117.2588609700811},"data":{"label":"test","description":"test","patientResponse":"test"},"style":{"width":298,"height":248},"selected":false,"dragging":false,"positionAbsolute":{"x":473.2414156225255,"y":117.2588609700811}},{"width":298,"height":248,"id":"dndnode_1","type":"selectorNode","position":{"x":89.67422782202881,"y":153.20227159497477},"data":{"label":"","patientResponse":"test"},"style":{"width":298,"height":248},"positionAbsolute":{"x":89.67422782202881,"y":153.20227159497477}}],"edges":[{"source":"dndnode_0","sourceHandle":"source_left0","target":"dndnode_1","targetHandle":"target_right1","type":"smoothstep","markerStart":{"type":"arrow"},"id":"reactflow__edge-dndnode_0source_left0-dndnode_1target_right1"}]}';
  // const templateData =
  // "{\"rows\":[{\"height\":\"200px\",\"cells\":[{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your city?\",\"description\":\"description\"},{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your hobbies?\",\"description\":\"description\"},{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your favourite\",\"description\":\"check description\"}]}]}";

  // const templateResponse =
  // "{\"rows\":[{\"height\":\"200px\",\"cells\":[{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your city?\",\"description\":\"description\"},{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your hobbies?\",\"description\":\"description\"},{\"type\":\"header\",\"width\":\"600px\",\"title\":\"whats your favourite\",\"description\":\"check description\"}]}]}";
  const id = router?.query?.id as string;

  const [updateTemplateReponse] = useMutation(UPDATE_PAT_FORMULATION_BY_ID);

  const [getFormulation] = useLazyQuery(GET_FORMULATION_BY_SHARE_ID, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data, "data");
      if (data?.getFormulationByShareId) {
        const Obj = {
          ...data?.getFormulationByShareId[0].formulation_data[0],
          _id: data?.getFormulationByShareId[0]._id,
          template_response: templateResponse,
          templateData: templateData,
          component_name: "ArrowTemplatess",
          download_formulation_url: downloadUrl

        };
        setFormulationData({ ...Obj });
        setDescription(
          data?.getFormulationByShareId[0]?.formulation_data[0]
            ?.formulation_desc
        );
        setInstruction(
          data?.getFormulationByShareId[0]?.formulation_data[0]
            ?.formulation_instruction
        );
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    console.log("come inside");
    getFormulation({
      variables: { ptsharresId: id },
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
      } = await updateTemplateReponse({
        variables: {
          ptsharresId: id,
          updateShareForm: {
            template_response: updatedData,
          },
        },
      });
      if (updatePatFormulationById) setSuccessModal(true);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleViewOpen = () => {
    if (description || instruction) {
      setIsOpenPopup(true);
    }
  };

  const handleSuccessOk = () => {
    router.back();
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
          onClickView={handleViewOpen}
          mode={"edit"}
          onPressBack={onPressBack}
          onCancel={onCancel}
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

export default PatientEditTemplatePage;
