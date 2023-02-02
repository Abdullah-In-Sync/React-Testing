import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { useStyles } from "./therapistSafetyPlanStyles";
import SingleSelectComponent from "../../../../common/SelectBox/SingleSelect/SingleSelectComponent";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  therapistSafetyPlanList?: any;
  setPlanId?: any;
  onChangePlanId?: any;
}

const FormBox: React.FC<ViewProps> = ({
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
                id="name"
                labelId="name"
                name="name"
                value={planId}
                label="Select Plan Name"
                onChange={set2}
                inputProps={{ "data-testid": "name" }}
                options={
                  (therapistSafetyPlanList &&
                    therapistSafetyPlanList.getTherapistSafetyPlanList) ||
                  []
                }
                mappingKeys={["_id", "name"]}
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

export default FormBox;
