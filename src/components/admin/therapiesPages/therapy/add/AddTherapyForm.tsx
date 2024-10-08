/* istanbul ignore file */
import React, { useState } from "react";
import { Button, Grid, Stack, Checkbox } from "@mui/material";
import { Form } from "formik";
import { Box, Typography } from "@material-ui/core";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextFieldComponent from "../../../../common/TextField/TextFieldComponent";
import { useSnackbar } from "notistack";

interface Organization {
  _id: string;
  name: string;
}

interface ViewProps {
  buttonClick?: (value: any) => void;
  onPressSubmit?: () => void;
  organizationList?: Organization[];
  onChangePlanId?: any;
  onTherapyNameChange?: any;
}

const FormAssessmentBox: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  onChangePlanId,
  onTherapyNameChange,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [therapyNameInputs, setTherapyNameInputs] = useState<string>("");
  const [selected, setSelected] = useState<string | string[]>([]);

  const isAllSelected =
    organizationList.length > 0 && selected.length === organizationList.length;

  /* istanbul ignore next */
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
    setTherapyNameInputs(value);
    onTherapyNameChange(value);
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
              name="therapy_name"
              id="patientFirstname"
              required={true}
              label="Therapy Name"
              value={therapyNameInputs}
              onChange={(e) => handlePatientInputChange(e.target.value)}
              fullWidth={true}
              inputProps={{ "data-testid": "therapy_name" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
            />
          </Grid>
        </Box>

        <Box>
          <FormControl style={{ width: "100%", backgroundColor: "" }}>
            <InputLabel id="mutiple-select-label">
              Select organisation*
            </InputLabel>
            <Select
              data-testid="select_organisation1"
              name="select_organisation"
              label="Select_Organisation"
              multiple
              value={selected}
              onChange={handleChange}
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
              /* istanbul ignore next */
              if (therapyNameInputs.length) {
                onPressSubmit();
              } else {
                enqueueSnackbar(
                  "Please enter therapy name and select organisation before adding.",
                  {
                    variant: "error",
                  }
                );
              }
            }}
          >
            Add
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default FormAssessmentBox;
