import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import React, { useState } from "react";
import { useStyles } from "../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  therapistSafetyPlanList?: any;
  setPlanId?: any;
  onChangePlanId?: any;
}
/* istanbul ignore next */
const MeasuresFormAdd: React.FC<ViewProps> = ({
  onPressSubmit,
  therapistSafetyPlanList,
  onChangePlanId,
}) => {
  /* istanbul ignore next */
  const styles = useStyles();
  /* istanbul ignore next */
  const [planId, setPlanId] = useState("");
  /* istanbul ignore next */
  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    /* istanbul ignore next */
    const value = e.target.value;
    /* istanbul ignore next */
    setPlanId(value);
    /* istanbul ignore next */
    onChangePlanId(value);
  };
  /* istanbul ignore next */
  return (
    <Box className="actionsWrapper">
      <Stack className={styles.formWrapper}>
        <Form>
          <Box className="fieldsBoxWrapperFirst">
            <Box>
              <SingleSelectComponent
                fullWidth={true}
                required={true}
                id="title"
                labelId="title"
                name="title"
                value={planId}
                label="Select Measure"
                onChange={set2}
                inputProps={{ "data-testid": "title" }}
                options={
                  (therapistSafetyPlanList &&
                    therapistSafetyPlanList.therapistGetAdminMeasures) ||
                  []
                }
                mappingKeys={["_id", "title"]}
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
                onClick={onPressSubmit}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Form>
      </Stack>
    </Box>
  );
};

export default MeasuresFormAdd;
