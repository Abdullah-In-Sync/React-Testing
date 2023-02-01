import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";
import { useStyles } from "./therapistSafetyPlanStyles";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressCancel?: () => void;
  submitButtonText?: string;
}

const FormBox: React.FC<ViewProps> = ({ onPressCancel, submitButtonText }) => {
  const styles = useStyles();

  const formBox = () => {
    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <Box className="fieldsBoxWrapperFirst">
            <Box>
              <FormikTextField
                name="planName"
                id="planName"
                label="Plan Name"
                fullWidth={true}
                inputProps={{ "data-testid": "planName" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Box>
            <Box>
              <FormikTextField
                name="planDesc"
                id="planDesc"
                label="Description"
                fullWidth={true}
                inputProps={{ "data-testid": "planDescription" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
                multiline
                rows={5}
                autoComplete="off"
              />
            </Box>
          </Box>

          <Box className="bottomActionButtonsWrapper">
            <Box>
              <Button
                type="submit"
                data-testid="submitForm"
                variant="contained"
              >
                {submitButtonText}
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                className="cancelButton"
                data-testid="cancelForm"
                onClick={onPressCancel}
              >
                Cancel
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
