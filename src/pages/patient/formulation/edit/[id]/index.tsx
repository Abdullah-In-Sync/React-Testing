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
          component_name: "ArrowTemplate",
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
