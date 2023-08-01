import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import SingleSelectComponent from "../../../components/common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../../../components/therapist/patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { useState } from "react";
import { useSnackbar } from "notistack";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  disorderList?: any;
  onChangeDisorderId?: any;
  modelList?: any;
  onChangeModelId?: any;
}

const FormBox: React.FC<ViewProps> = ({
  onPressSubmit,
  disorderList,
  onChangeDisorderId,
  modelList,
  onChangeModelId,
}) => {
  const styles = useStyles();

  const formBox = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [disorderId, setDisorderId] = useState("");
    const [modalId, setModalId] = useState("");

    const set2 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setDisorderId(value);
      onChangeDisorderId(value);
    };

    const OnChangeModal = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setModalId(value);
      onChangeModelId(value);
    };
    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <Box className="fieldsBoxWrapperFirst">
            <Box>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="resourceDisorderSelect"
                labelId="resourceDisorder"
                name="disorder_id"
                value={disorderId}
                label="Select Disorder"
                onChange={set2}
                inputProps={{ "data-testid": "disorder_id" }}
                options={
                  (disorderList && disorderList.getDisorderByOrgId) || []
                }
                mappingKeys={["_id", "disorder_name"]}
                size="small"
                className="form-control-bg"
              />
            </Box>

            <Box>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="modelTypeSelect"
                labelId="modelType"
                name="model_id"
                value={modalId}
                label="Select Model"
                onChange={OnChangeModal}
                inputProps={{ "data-testid": "model_id" }}
                options={(modelList && modelList.getModelByDisorderId) || []}
                mappingKeys={["_id", "model_name"]}
                size="small"
                className="form-control-bg"
              />
            </Box>
          </Box>

          <Box className="bottomActionButtonsWrapper">
            <Box>
              <Button
                data-testid="addSubmitForm"
                variant="contained"
                onClick={() => {
                  /* istanbul ignore next */
                  if (disorderId.length && modalId.length) {
                    onPressSubmit();
                  } else {
                    enqueueSnackbar(
                      "Please select disorder and modal before submit.",
                      { variant: "error" }
                    );
                  }
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Form>
      </Stack>
    );
  };

  return <Box className="actionsWrapper">{formBox()}</Box>;
};

export default FormBox;
