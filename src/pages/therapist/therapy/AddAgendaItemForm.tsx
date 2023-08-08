import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useStyles } from "../../../components/therapist/patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { useState } from "react";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../../components/common/TextField/TextFieldComponent";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  onChangeAgendaValue?: any;
  onChangeDisplayValue?: any;
}

const FormBox: React.FC<ViewProps> = ({
  onPressSubmit,
  onChangeAgendaValue,
  onChangeDisplayValue,
}) => {
  const styles = useStyles();

  const formBox = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [displayValue, setDisplayValue] = useState("");

    const [agendaItemValue, setAgendaItemValue] = useState("");

    const displayOrderChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setDisplayValue(value);
      onChangeDisplayValue(value);
    };

    const agendaModelChange = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setAgendaItemValue(value);
      onChangeAgendaValue(value);
    };

    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <Box className="fieldsBoxWrapperFirst">
            <Box>
              <TextFieldComponent
                type="number"
                required={true}
                value={displayValue}
                name="display_order"
                id="display_order"
                label="Display order"
                onChange={displayOrderChange}
                fullWidth={true}
                inputProps={{ "data-testid": "display_order" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Box>

            <Box>
              <TextFieldComponent
                required={true}
                name="agenda_name"
                id="agenda_name"
                label="Enter Agenda Item"
                value={agendaItemValue}
                onChange={agendaModelChange}
                fullWidth={true}
                inputProps={{ "data-testid": "agenda_name" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
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
                  if (agendaItemValue.length && displayValue.length) {
                    onPressSubmit();
                  } else {
                    enqueueSnackbar(
                      "Please enter display order and agenda item before submit.",
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
