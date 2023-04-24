import { useLazyQuery, useMutation } from "@apollo/client";
import * as React from "react";
import {
  GET_THERAPIST_MEASURES_LIST,
  UPDATE_THERAPIST_MEASURE,
} from "../../../graphql/Measure/graphql";
import MeasureContent from "./MeasuresContent";

import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  TherapistMeasuresData,
  UpdateTherapistMeasureRes,
  UpdateTherapistMeasureVars,
} from "../../../graphql/Measure/types";
import Loader from "../../common/Loader";
import ConfirmationModal from "../../common/ConfirmationModal";
import { SuccessModal } from "../../common/SuccessModal";

const Measures: React.FC = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const patientId = id as string;
  const [isConfirmationModel, setIsConfirmationModel] = React.useState(false);
  const selectedMeasure = React.useRef<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const onClear = () => {
    setIsConfirmationModel(false);
  };
  const onConfirmSubmit = () => {
    const {
      _id,
      description,
      share_status,
      status,
      template_data,
      template_id,
      title,
      pressedIconButton,
    } = selectedMeasure.current;
    setIsConfirmationModel(false);
    console.debug({
      variables: {
        measure_id: _id,
        update: {
          description,
          share_status: pressedIconButton == "share" ? 1 : share_status,
          status: pressedIconButton == "delete" ? 0 : status,
          template_data,
          template_id,
          title,
        },
      },
    });
    updateMeasure({
      variables: {
        measure_id: _id,
        update: {
          description,
          share_status: pressedIconButton == "share" ? 1 : share_status,
          status: pressedIconButton == "delete" ? 0 : status,
          template_data,
          template_id,
          title,
        },
      },
    });
  };
  const [
    getTherapistMeasuresList,
    {
      loading: loadingMeasuresList,
      data: { therapistListMeasures: listData = [] } = {},
    },
  ] = useLazyQuery<TherapistMeasuresData>(GET_THERAPIST_MEASURES_LIST, {
    fetchPolicy: "no-cache",
  });

  const [updateMeasure] = useMutation<
    UpdateTherapistMeasureRes,
    UpdateTherapistMeasureVars
  >(UPDATE_THERAPIST_MEASURE, {
    onCompleted: () => {
      /* istanbul ignore next */
      setIsSuccess(true);
    },
  });

  useEffect(() => {
    getTherapistMeasuresList({
      variables: { patientId },
    });
  }, []);

  /* istanbul ignore next */
  const handleCreateMeasure = () => {
    router.push(`/therapist/patient/view/${patientId}/measures/create`);
  };

  /* istanbul ignore next */
  const actionButtonClick = (value) => {
    selectedMeasure.current = value;
    const { pressedIconButton, _id } = value;
    switch (pressedIconButton) {
      case "edit":
        return router.push(
          `/therapist/patient/view/${patientId}/measures/edit/${_id}`
        );
      case "share":
      case "delete":
        setIsConfirmationModel(true);
        break;
    }
  };

  const handleOk = () => {
    setIsSuccess(false);
    getTherapistMeasuresList({
      variables: { patientId },
    });
  };

  if (loadingMeasuresList) return <Loader visible={true} />;

  return (
    <>
      <MeasureContent
        listData={listData}
        onClickCreateMeasure={handleCreateMeasure}
        actionButtonClick={actionButtonClick}
      />
      {isConfirmationModel && (
        <ConfirmationModal
          label={`Are you sure you want to ${selectedMeasure.current.pressedIconButton}
      the Measures?`}
          onCancel={onClear}
          onConfirm={onConfirmSubmit}
        />
      )}
      {isSuccess && (
        <SuccessModal
          isOpen={Boolean(isSuccess)}
          title="Successful"
          description={`Your Measure has been ${selectedMeasure.current.pressedIconButton}d successfully.`}
          onOk={handleOk}
        />
      )}
    </>
  );
};

export default Measures;
