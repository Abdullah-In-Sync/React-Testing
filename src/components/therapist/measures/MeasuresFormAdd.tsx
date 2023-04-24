import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useStyles } from "../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  therapistSafetyPlanList?: any;
  setPlanId?: any;
  onChangePlanId?: any;
}

const MeasuresFormAdd: React.FC<ViewProps> = ({
  onPressSubmit,
  therapistSafetyPlanList,
  onChangePlanId,
}) => {
  const styles = useStyles();

  const formBox = () => {
    const [planId, setPlanId] = React.useState("");

    const set2 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setPlanId(value);
      onChangePlanId(value);
    };

    return (
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
    );
  };

  return <Box className="actionsWrapper">{formBox()}</Box>;
};

export default MeasuresFormAdd;
