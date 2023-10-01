/* istanbul ignore file */
import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import { TherapistGetAdminRelapseListEntity } from "../../../../graphql/Relapse/types";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import { useStyles } from "./therapistRelapsePlanStyles";

interface ViewProps {
  relapsePlanList?: TherapistGetAdminRelapseListEntity[];
}

const FormAddPlan: React.FC<ViewProps> = ({ relapsePlanList = [] }) => {
  const styles = useStyles();

  return (
    <Stack className={styles.formWrapper}>
      <Form>
        <Box className="fieldsBoxWrapperFirst">
          <Box>
            <FormikSelectDropdown
              id="relapsePlan"
              labelId={`relapsePlan`}
              name={`planId`}
              showDefaultSelectOption={false}
              label="Select Plan Name"
              options={relapsePlanList}
              mappingKeys={["_id", "name"]}
              size="small"
              extraProps={{ "data-testid": `relapsePlanDropdown` }}
            />
          </Box>
        </Box>
        <Box className="bottomActionButtonsWrapper">
          <Box>
            <CommonButton
              type="submit"
              data-testid="addRelapsePlanSubmit"
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

export default FormAddPlan;
