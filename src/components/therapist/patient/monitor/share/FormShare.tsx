import { Button, Stack, TextField } from "@mui/material";
import { Form } from "formik";
import { Autocomplete } from "@mui/lab";
import * as React from "react";
import { useStyles } from "../../therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { Box } from "@material-ui/core";

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

  const formBox = () => {
    const [planId, setPlanId] = React.useState<string[]>([]);

    return (
      <Stack className={styles.formWrapper}>
        <Form>
          <div className="fieldsBoxWrapperFirst">
            <div>
              <Autocomplete
                multiple
                fullWidth={true}
                data-testid="relapsePlanDropdown"
                id="name"
                value={
                  therapistSafetyPlanList &&
                  therapistSafetyPlanList.patientListForMonitor
                    ? therapistSafetyPlanList.patientListForMonitor.filter(
                        (option) => planId.includes(option._id)
                      )
                    : []
                }
                options={
                  (therapistSafetyPlanList &&
                    therapistSafetyPlanList.patientListForMonitor) ||
                  []
                }
                getOptionLabel={(option) => option.patient_firstname}
                onChange={(e, newValue) => {
                  if (newValue) {
                    const selectedValues = newValue.map((value) => value._id);
                    setPlanId(selectedValues);
                    onChangePlanId(selectedValues.join(","));
                  } else {
                    setPlanId([]);
                    onChangePlanId("");
                  }
                }}
                renderOption={(props, option) => (
                  <Box sx={{ justifyContent: "space-between" }}>
                    <Box
                      style={{
                        display: "flex",
                      }}
                      {...props}
                    >
                      <span style={{ alignItems: "flex-start" }}>
                        {option.patient_firstname}
                      </span>
                      <Box>
                        {option.moniter_detail !== null && (
                          <span
                            style={{
                              color: "#6EC9DB",
                              //   marginLeft: "50px",
                              alignItems: "flex-end",
                            }}
                          >
                            ●
                          </span>
                        )}
                      </Box>
                    </Box>
                  </Box>
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
          </div>

          <div className="bottomActionButtonsWrapper">
            <div>
              <Button
                data-testid="addSubmitForm"
                variant="contained"
                onClick={onPressSubmit}
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
