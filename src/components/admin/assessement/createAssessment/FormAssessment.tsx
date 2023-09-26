import React, { useState } from "react";
import { Button, Grid, Stack, Checkbox } from "@mui/material";
import { Form } from "formik";
import { Box, Typography } from "@material-ui/core";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

const FormAssessmentBox: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  onChangePlanId,
  onAssessmentNameChange,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [patientInputs, setpatientInputs] = useState<string>("");
  const [selected, setSelected] = useState<string | string[]>([]);

  const isAllSelected =
    organizationList.length > 0 && selected.length === organizationList.length;

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const value = event.target.value as string[];

    if (value[value.length - 1] === "all") {
      const updatedSelected =
        selected.length === organizationList.length
          ? []
          : organizationList.map((org) => org._id);

      setSelected(updatedSelected);
      onChangePlanId(updatedSelected);

      return;
    }

    setSelected(value);
    onChangePlanId(value);
  };

  const handlePatientInputChange = (value: string) => {
    setpatientInputs(value);
    onAssessmentNameChange(value);
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
              onChange={handleChange}
              //   renderValue={(selected) => {
              //     console.log("Koca: selected ", selected);
              //     // return Array.isArray(selected) ? "" : "";
              //     return Array.isArray(selected) ? selected.join(", ") : selected;
              //   }}
              renderValue={(selected) => {
                const selectedOptions = organizationList.filter((option) =>
                  selected.includes(option._id)
                );
                const selectedNames = selectedOptions.map(
                  (option) => option.name
                );
                return selectedNames.join(", ");
              }}
              style={{
                flex: "none",
                order: "1",
                flexGrow: "0",
              }}
            >
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < organizationList.length
                    }
                  />
                </ListItemIcon>
                {/* <ListItemText primary="Select All" /> */}
                <Typography data-testid={`checkbox123`}>Select All</Typography>
              </MenuItem>
              {organizationList.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  <ListItemIcon>
                    <Checkbox
                      data-testid={`checkbox12345${option._id}`}
                      checked={selected.indexOf(option._id) > -1}
                    />
                  </ListItemIcon>
                  <ListItemText primary={option.name} />
                </MenuItem>
              ))}
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
            onClick={() => {
              if (patientInputs && selected) {
                onPressSubmit?.();
              } else {
                enqueueSnackbar("Please enter assessment name", {
                  variant: "error",
                });
              }
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default FormAssessmentBox;
