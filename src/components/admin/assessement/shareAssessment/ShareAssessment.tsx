import React, { useState } from "react";
import { Button, Stack, Checkbox, FormHelperText } from "@mui/material";
import { Form } from "formik";
import { Box, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ListItemIcon from "@material-ui/core/ListItemIcon";

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
}

const ShareAssessmentModel: React.FC<ViewProps> = ({
  onPressSubmit,
  organizationList,
  onChangePlanId,
}) => {
  const [selected, setSelected] = useState<string | string[]>([]);
  const [hasError, setHasError] = useState(false);

  const isAllSelected =
    organizationList.length > 0 && selected.length === organizationList.length;

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    setHasError(false);
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

  const handleSubmit = () => {
    if (selected.length <= 0) {
      setHasError(true);
    }
    if (selected.length > 0) {
      onPressSubmit();
    }
  };
  const handleInputLabelClick = () => {
    console.log("disable error");
    setHasError(false);
  };
  const handleBlur = () => {
    if (selected.length <= 0) {
      setHasError(false);
    }
  };

  return (
    <Stack>
      <Form>
        <Box style={{ margin: "43px 37px 0px 36px" }}>
          <FormControl
            style={{
              width: "100%",
              backgroundColor: "",
            }}
            error={hasError}
          >
            <InputLabel
              onClick={handleInputLabelClick}
              id="mutiple-select-label"
            >
              Select organisation
            </InputLabel>
            <Select
              data-testid="select_organisation1"
              name="select_organisation"
              label="Select_Organisation"
              multiple
              value={selected}
              onChange={handleChange}
              onOpen={handleBlur}
              MenuProps={{
                PaperProps: {
                  style: {
                    top: "529px",
                    maxHeight: "33%",
                    marginTop: "9px",
                  },
                },
              }}
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
                borderRadius: "4px",
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
            {hasError && (
              <FormHelperText
                style={{
                  position: "absolute",
                  bottom: "52px",
                  left: "-2px",
                  font: "Montserrat",
                }}
              >
                organization cannot be empty
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "27px",
            marginBottom: "15px",
          }}
        >
          <Button
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            data-testid="addSubmitForm"
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Share
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default ShareAssessmentModel;
