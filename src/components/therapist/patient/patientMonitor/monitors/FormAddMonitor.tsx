import { Box, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import * as React from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import { useStyles } from "../patientMonitorStyles";
import { TherapistAddMonitorViewProps } from "./AddMonitor";

const FormAddMonitor: React.FC<
  TherapistAddMonitorViewProps & FormikProps<any>
> = ({ data, isSubmitting }) => {
  const styles = useStyles();
  return (
    <Stack className={styles.formWrapper}>
      <Form>
        <Box className="fieldsBoxWrapperFirst">
          <Box>
            <FormikSelectDropdown
              id="addMonitor"
              labelId={`addMonitor`}
              name={`monitorId`}
              showDefaultSelectOption={false}
              label="Select Monitor"
              options={data}
              className="addMonitorDropdown"
              mappingKeys={["_id", "name", "patient_monitor"]}
              size="small"
              extraProps={{ "data-testid": `addMonitorDropdown` }}
            />
          </Box>
        </Box>
        <Box className="bottomActionButtonsWrapper">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="addMonitorSubmit"
              variant="contained"
            >
              Add
            </CommonButton>
          </Box>
        </Box>
      </Form>
    </Stack>
  );
};

export default FormAddMonitor;
