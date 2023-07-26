import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ErrorMessage } from "formik";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { IOSSwitch } from "../../../common/ToggleButton/IosToggleButton";
import UploadButtonComponent from "../../../common/UploadButton/UploadButtonComponent";

const TherapistInputs = {
  changePasswordSec: () => (
    <>
      <Box>
        <FormikTextField
          type="password"
          name="password"
          id="password"
          label="Password*"
          fullWidth={true}
          inputProps={{ "data-testid": "passwordInput" }}
          variant="outlined"
          className="form-control-bg"
          size="small"
          placeholder="Password*"
        />
      </Box>
      <Box>
        <FormikTextField
          type="password"
          name="confirm_password"
          id="confirmPassword"
          label="Confirm Password*"
          fullWidth={true}
          inputProps={{ "data-testid": "confirmPasswordInput" }}
          variant="outlined"
          className="form-control-bg"
          size="small"
          placeholder="Confirm Password*"
        />
      </Box>
    </>
  ),
  specializationDropdown: ({ specialization }) => (
    <Box>
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
  ),
  phoneNumberInput: (props) => (
    <Box>
      <FormikTextField
        name="phone_number"
        id="phone_number"
        label="Phone*"
        fullWidth={true}
        inputProps={{ "data-testid": "phone_number" }}
        variant="outlined"
        className="form-control-bg"
        size="small"
        placeholder="Phone*"
        {...props}
      />
    </Box>
  ),
  therapistIdInput: () => (
    <Box>
      <FormikTextField
        name="therapist_id"
        id="therapist_id"
        label="Therapist ID*"
        fullWidth={true}
        inputProps={{ "data-testid": "therapist_id" }}
        variant="outlined"
        className="form-control-bg"
        size="small"
        placeholder="Therapist ID*"
        disabled
      />
    </Box>
  ),
  therapistNameInput: () => (
    <Box>
      <FormikTextField
        name="therapist_name"
        id="therapist_name"
        label="Name*"
        fullWidth={true}
        inputProps={{ "data-testid": "therapist_name" }}
        variant="outlined"
        className="form-control-bg"
        size="small"
        placeholder="Name*"
      />
    </Box>
  ),
  organizationDropdown: ({ organizationList, ...rest }) => (
    <Box>
      <FormikSelectDropdown
        showDefaultSelectOption={false}
        id="orgId"
        labelId="orgLabel"
        name="org_id"
        label="Organization*"
        options={organizationList}
        mappingKeys={["_id", "name"]}
        size="small"
        className="form-control-bg"
        extraProps={{
          "data-testid": "organization",
        }}
        {...rest}
      />
    </Box>
  ),
  emailInput: (props) => (
    <Box>
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
        {...props}
      />
    </Box>
  ),
  therapistAddInput: () => (
    <Box>
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
  ),
  totalExpInput: () => (
    <Box>
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
    </Box>
  ),
  professionalAccreditationInput: ({ professional }) => (
    <Box>
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
    </Box>
  ),
  uploadFileInputs: ({
    therapist_proofaccredition,
    therapist_poa_attachment,
    fileOnChange,
    therapist_inscover,
  }) => (
    <>
      {Boolean(therapist_proofaccredition) && (
        <Box className="chooseFileWrapper">
          <label className="uploadButtonLabel">
            Attach proof of Accreditation:
          </label>
          <UploadButtonComponent
            variant="contained"
            name="therapist_poa_attachment"
            inputProps={{
              "data-testid": "therapist_poa_attachment",
            }}
            onChange={(e) => fileOnChange("therapist_poa_attachment", e)}
            fileName={therapist_poa_attachment}
            buttonText="Choose File"
            hideIcon
          />
          <ErrorMessage
            name={`therapist_poa_attachment_file`}
            component="div"
            className="invalid-input-message"
          />
        </Box>
      )}
      <Box className="chooseFileWrapper">
        <label className="uploadButtonLabel">Insurance Cover:</label>
        <UploadButtonComponent
          variant="contained"
          name="therapist_inscover"
          inputProps={{ "data-testid": "therapist_inscover" }}
          onChange={(e) => fileOnChange("therapist_inscover", e)}
          fileName={therapist_inscover}
          buttonText="Choose File"
          hideIcon
        />
        <ErrorMessage
          name={`therapist_inscover_file`}
          component="div"
          className="invalid-input-message"
        />
      </Box>
      <Box />
    </>
  ),
  accreditedBodyInput: () => (
    <Box>
      <FormikTextField
        name="accredited_body"
        id="accredited_body"
        label="Name of Accredited body"
        fullWidth={true}
        inputProps={{ "data-testid": "accredited_body" }}
        variant="outlined"
        className="form-control-bg"
        size="small"
        placeholder="Name of Accredited body"
      />
    </Box>
  ),
  accToggle: ({ setFieldValue }) => (
    <Box className="accToggleWrapper">
      <label className="accLabel">Proof of Accreditation:</label>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
        label=""
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue("therapist_proofaccredition", Number(e.target?.checked))
        }
        data-testid="toggleAcc"
      />
    </Box>
  ),
  choosePlanRadio: ({ row, options, setFieldValue, plan }) => {
    return (
      <RadioGroup {...row} className="radio-buttons">
        {(options as Array<any>).map((option: string, index: number) => (
          <FormControlLabel
            key={`choosePlan_${index}`}
            data-testid={`choosePlan_${index}`}
            name="plan"
            value={option.toLocaleLowerCase()}
            control={<Radio />}
            label={option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(`plan`, e.target.value)
            }
            checked={plan === option.toLocaleLowerCase()}
            disabled={option === "Paid"}
          />
        ))}
      </RadioGroup>
    );
  },
  choosePlan: ({ plan, setFieldValue, plan_trial }) => (
    <>
      <Box className="radioErrorMessgeWrapper">
        <Box className="radioFieldsWrapper">
          <label className="radioLabel">Choose Plan* :</label>
          {TherapistInputs.choosePlanRadio({
            row: true,
            options: ["Free", "Paid"],
            plan,
            setFieldValue,
          })}
        </Box>
        <ErrorMessage
          name={`plan`}
          component="div"
          className="invalid-input-message"
        />
      </Box>
      {plan === "free" && (
        <Box>
          <FormikSelectDropdown
            showDefaultSelectOption={false}
            id="trial_period"
            labelId="trial_period"
            name="trial_period"
            label="Select trial period*"
            options={plan_trial}
            mappingKeys={["name", "display_name"]}
            size="small"
            className="form-control-bg"
            extraProps={{
              "data-testid": "trial_period",
            }}
          />
        </Box>
      )}
      <Box />
    </>
  ),
  formSubmitButton: ({ isSubmitting }) => (
    <Box className="bottomActionButtonsWrapper">
      <Box>
        <CommonButton
          type="submit"
          data-testid="submitForm"
          variant="contained"
          disabled={isSubmitting}
        >
          Save
        </CommonButton>
      </Box>
    </Box>
  ),
};

export default TherapistInputs;
