import { Box, Button, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import SingleSelectComponent from "../../../common/SelectBox/SingleSelect/SingleSelectComponent";
import { useStyles } from "../../patient/therapistSafetyPlan/create/therapistSafetyPlanStyles";
import { useSnackbar } from "notistack";

interface ViewProps {
  buttonClick?: (value) => void;
  onPressSubmit?: () => void;
  organizationList?: any;
  onChangeAssessmentId?: any;
}

const FormAdminAssessmentBox: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  onChangeAssessmentId,
}) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const formBox = () => {
    const [planId, setPlanId] = React.useState("");

    /* istanbul ignore next */
    const set2 = (
      e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      const value = e.target.value;
      setPlanId(value);
      onChangeAssessmentId(value);
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
                label="Select assessment"
                onChange={set2}
                inputProps={{ "data-testid": "name" }}
                options={
                  (organizationList &&
                    organizationList.getAdminAssessmentList) ||
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
                onClick={() => {
                  if (planId.length) {
                    onPressSubmit();
                  } else {
                    enqueueSnackbar("Please select an assessment", {
                      variant: "error",
                      autoHideDuration: 2000,
                    });
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

export default FormAdminAssessmentBox;
