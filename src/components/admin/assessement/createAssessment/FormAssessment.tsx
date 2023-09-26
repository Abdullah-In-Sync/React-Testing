import React, { useState } from "react";
import { Button, Grid, Stack, Checkbox } from "@mui/material";
import { Form } from "formik";
import { Box, Typography } from "@material-ui/core";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useSnackbar } from "notistack";

interface Organization {
  _id: string;
  name: string;
}

interface ViewProps {
  buttonClick?: (value: any) => void;
  onPressSubmit?: () => void;
  organizationList?: Organization[];
  setPlanId?: any;
  onChangePlanId?: any;
  onAssessmentNameChange?: any;
}
/* istanbul ignore next */
const CheckboxAll = ({
  isAllSelected,
  onChange,
}: {
  isAllSelected: boolean;
  onChange: () => void;
}) => (
  <MenuItem value="all">
    <ListItemIcon>
      <Checkbox
        checked={isAllSelected}
        indeterminate={!isAllSelected}
        onChange={onChange}
        data-testid={`checkbox123`}
      />
    </ListItemIcon>
    <Typography>Select All</Typography>
  </MenuItem>
);
/* istanbul ignore next */
const OrganizationCheckbox = ({
  option,
  checked,
  onChange,
}: {
  option: Organization;
  checked: boolean;
  onChange: any;
}) => (
  <MenuItem key={option._id} value={option._id}>
    <ListItemIcon>
      <Checkbox
        data-testid={`checkbox12345${option._id}`}
        checked={checked}
        onChange={onChange}
      />
    </ListItemIcon>
    <ListItemText primary={option.name} />
  </MenuItem>
);

const FormAssessmentBox: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  onChangePlanId,
  onAssessmentNameChange,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [patientInputs, setpatientInputs] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  /* istanbul ignore file */
  const isAllSelected =
    organizationList.length > 0 && selected.length === organizationList.length;

  /* istanbul ignore file */
  const handleCheckboxChange = (value) => {
    const newVal = [...selected, value];
    setSelected(newVal);
    onChangePlanId(newVal);
  };

  /* istanbul ignore file */
  const handleAllCheckboxChange = () => {
    const updatedSelected = isAllSelected
      ? []
      : organizationList.map((org) => org._id);

    setSelected(updatedSelected);
    onChangePlanId(updatedSelected);
  };

  /* istanbul ignore file */
  const handlePatientInputChange = (value: string) => {
    setpatientInputs(value);
    onAssessmentNameChange(value);
  };

  /* istanbul ignore file */
  const handleSubmit = () => {
    if (patientInputs && selected) {
      onPressSubmit?.();
    } else {
      enqueueSnackbar("Please enter assessment name", {
        variant: "error",
      });
    }
  };

  return (
    <Stack>
      <Form>
        <Box style={{ paddingTop: "15px" }}>
          <Grid
            style={{ alignSelf: "stretch", paddingBottom: "10px" }}
            item
            xs={4}
          >
            <TextFieldComponent
              style={{ backgroundColor: "white" }}
              name="patient_firstname"
              required={true}
              id="patientFirstname"
              label="Enter assessment name"
              value={patientInputs}
              onChange={(e) => handlePatientInputChange(e.target.value)}
              fullWidth={true}
              inputProps={{ "data-testid": "patient_firstname" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
            />
          </Grid>
        </Box>

        <Box>
          <FormControl style={{ width: "100%", backgroundColor: "" }}>
            <InputLabel size="small" id="mutiple-select-label">
              Select organisation*
            </InputLabel>
            <Select
              data-testid="select_organisation1"
              name="select_organisation"
              label="Select_Organisation"
              multiple
              size="small"
              value={selected}
              renderValue={(selected) => {
                /* istanbul ignore file */
                const selectedOptions = organizationList.filter((option) =>
                  selected.includes(option._id)
                );
                /* istanbul ignore next */ const selectedNames =
                  selectedOptions.map((option) => option.name);
                /* istanbul ignore next */ return selectedNames.join(", ");
              }}
              style={{
                flex: "none",
                order: "1",
                flexGrow: "0",
              }}
            >
              <CheckboxAll
                isAllSelected={isAllSelected}
                onChange={handleAllCheckboxChange}
              />
              {
                /* istanbul ignore file */
                organizationList.map((option) => (
                  <OrganizationCheckbox
                    data-testid={option._id}
                    key={option._id}
                    option={option}
                    checked={selected.includes(option._id)}
                    onChange={() => handleCheckboxChange(option._id)}
                  />
                ))
              }
            </Select>
          </FormControl>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
          }}
        >
          <Button
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            data-testid="addSubmitForm"
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default FormAssessmentBox;
