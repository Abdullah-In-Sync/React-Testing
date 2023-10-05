import { Button, Stack, TextField, Tooltip } from "@mui/material";
import { Form } from "formik";
import { Autocomplete } from "@mui/lab";
import React, { useState } from "react";
import { useStyles } from "../../therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { Box } from "@material-ui/core";
import { useSnackbar } from "notistack";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  therapistSafetyPlanList?: any;
  setPlanId?: any;
  onChangePlanId?: any;
}

const FormShareBox: React.FC<ViewProps> = ({
  onPressSubmit,
  therapistSafetyPlanList,
  onChangePlanId,
}) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
  const [planId, setPlanId] = useState<string[]>([]);
  /* istanbul ignore next */
  const patientListForMonitor =
    therapistSafetyPlanList?.patientListForMonitor || [];
  /* istanbul ignore next */
  const formBox = () => {
    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <div>
            <Autocomplete
              multiple
              fullWidth={true}
              data-testid="relapsePlanDropdown"
              id="name"
              value={patientListForMonitor.filter((option) =>
                planId.includes(option._id)
              )}
              options={patientListForMonitor}
              getOptionLabel={(option) => option.patient_firstname}
              onChange={(e, newValue) => {
                if (newValue) {
                  const selectedValues = newValue
                    .filter((value) => value.moniter_detail == null) // Filter out options with null moniter_detail
                    .map((value) => value._id);
                  setPlanId(selectedValues);
                  onChangePlanId(selectedValues.join(","));
                } else {
                  setPlanId([]);
                  onChangePlanId("");
                }
              }}
              renderOption={(props, option) => (
                <>
                  <Box
                    style={{ display: "flex", flex: 1, width: "100%" }}
                    {...props}
                  >
                    <Box style={{ flex: 1 }}>{option.patient_firstname}</Box>

                    <Box>
                      {option.moniter_detail !== null && (
                        <Tooltip
                          title={"Monitor is already shared with patient"}
                          arrow
                        >
                          <Box style={{ color: "#6EC9DB", fontSize: "20px" }}>
                            ●
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <hr style={{ borderTop: "1px", width: "100%" }} />
                  </Box>
                </>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Patient"
                  variant="outlined"
                  size="small"
                  className="form-control-bg"
                />
              )}
            />
          </div>

          <div className="bottomActionButtonsWrapper">
            <div>
              <Button
                data-testid="addSubmitForm"
                variant="contained"
                onClick={() => {
                  if (planId.length) {
                    onPressSubmit();
                  } else {
                    enqueueSnackbar("Patient can not be empty.", {
                      variant: "error",
                    });
                  }
                }}
              >
                Share
              </Button>
            </div>
          </div>
        </Form>
      </Stack>
    );
  };

  return <div className="actionsWrapper">{formBox()}</div>;
};

export default FormShareBox;
