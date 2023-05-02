import ArrowBackAlt from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import ResponseForm from "../form/ResponseForm";
import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps &
  ModalRefs & {
    backButtonClick: () => void;
  };

const ViewResponse: React.FC<ViewProps> = ({
  measureData,
  onPressCancel,
  confirmRef,
  backButtonClick,
}) => {
  if (!measureData) return null;

  const {
    score_detail: {
      _id: measureId,
      description = "",
      template_id: templateId = "",
      template_data = null,
      session_no = "start",
      score,
    },
    title,
  } = measureData;

  const initialValues = {
    measureId,
    title,
    description,
    templateId,
    templateData: { ...JSON.parse(template_data), ...{ totalScore: score } },
    sessionNo: session_no,
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={null}
        children={(props: any) => (
          <ResponseForm
            formikProps={props}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
            isView={true}
          />
        )}
      />
    );
  };

  return (
    <>
      <Box mb={1.5}>
        <CommonButton
          data-testid="backButton"
          variant="contained"
          onClick={backButtonClick}
          size="small"
          startIcon={<ArrowBackAlt />}
        >
          Back
        </CommonButton>
      </Box>
      {commonform()}
    </>
  );
};

export default ViewResponse;
