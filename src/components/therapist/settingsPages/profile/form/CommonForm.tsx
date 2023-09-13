import { Box, FormControlLabel, Stack } from "@mui/material";
import { Form } from "formik";
import * as React from "react";
import FormikSelectDropdown from "../../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";
import { IOSSwitch } from "../../../../common/ToggleButton/IosToggleButton";

const ProfileForm: React.FC<any> = ({
  setFieldValue,
  therapist_proofaccredition,
  masterData = {},
}) => {
  const { specialization = [], professional = [] } = masterData;

  const accToggle = () => (
    <Box className="accToggleWrapper">
      <label className="accLabel">Proof of Accreditation:</label>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ m: 1 }}
            defaultChecked={Boolean(therapist_proofaccredition)}
          />
        }
        label=""
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue("therapist_proofaccredition", Number(e.target?.checked))
        }
        data-testid="toggleAcc"
      />
    </Box>
  );

  return (
    <Stack className={"formWrapper"}>
      <Form>
        <Box className="">
          <Box className="row1 crow">
            <FormikTextField
              name="therapist_name"
              id="therapist_name"
              label="Name"
              fullWidth={true}
              inputProps={{ "data-testid": "address_input" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Address"
            />
            <FormikTextField
              name="phone_number"
              id="phone_number"
              label="Phone no*"
              fullWidth={true}
              inputProps={{ "data-testid": "phone_number" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Phone*"
            />
          </Box>

          <Box className="row2 crow">
            <FormikTextField
              name="email"
              id="email"
              label="Email*"
              fullWidth={true}
              inputProps={{ "data-testid": "emailInput" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Email*"
            />
            <FormikSelectDropdown
              showDefaultSelectOption={false}
              id="therapist_specialization"
              labelId="therapist_specialization"
              name="therapist_specialization"
              label="Specialization"
              options={specialization}
              mappingKeys={["name", "display_name"]}
              size="small"
              className="form-control-bg"
              extraProps={{
                "data-testid": "therapist_specialization",
              }}
            />
          </Box>

          <Box className="row3 crow">
            <FormikTextField
              name="therapist_totexp"
              id="therapist_totexp"
              label="Total Experience"
              fullWidth={true}
              inputProps={{ "data-testid": "therapist_totexp" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Total Experience"
            />
            <FormikTextField
              name="therapist_add"
              id="therapist_add"
              label="Address"
              fullWidth={true}
              inputProps={{ "data-testid": "address_input" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
              placeholder="Address"
            />
          </Box>
          <Box className="row4 crow">
            <FormikSelectDropdown
              showDefaultSelectOption={false}
              id="therapist_profaccredition"
              labelId="therapist_profaccredition"
              name="therapist_profaccredition"
              label="Professional Accreditation"
              options={professional}
              mappingKeys={["name", "display_name"]}
              size="small"
              className="form-control-bg"
              extraProps={{
                "data-testid": "professionalAccreditation",
              }}
            />
            {accToggle()}
          </Box>
        </Box>
        {/* <Box className="row5 crow">
          <Box>
            <CommonButton
              disabled={isSubmitting}
              type="submit"
              data-testid="addCategorySubmit"
              variant="contained"
            >
              {saveButtonText || "Add"}
            </CommonButton>
          </Box>
        </Box> */}
      </Form>
    </Stack>
  );
};

export default ProfileForm;
