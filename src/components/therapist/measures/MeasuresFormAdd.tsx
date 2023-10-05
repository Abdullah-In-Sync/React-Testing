import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import React, { useState } from "react";
import { useStyles } from "../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";

interface ViewProps {
  onPressSubmit: () => void;
  therapistSafetyPlanList: any;
  onChangePlanId: any;
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
  const therapistGetAdminMeasures =
    therapistSafetyPlanList?.therapistGetAdminMeasures || [];
  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPlanId(value);
    onChangePlanId(value);
  };
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
                options={therapistGetAdminMeasures}
                mappingKeys={["_id", "title"]}
                size="small"
                className="form-control-bg"
                data-testid="select_add_measure"
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
