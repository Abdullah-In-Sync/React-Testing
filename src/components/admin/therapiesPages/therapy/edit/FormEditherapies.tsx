import React, { useEffect, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { Form } from "formik";
import { Box } from "@material-ui/core";
import TextFieldComponent from "../../../../common/TextField/TextFieldComponent";

interface Organization {
  _id: string;
  name: string;
}

interface ViewProps {
  buttonClick?: (value: any) => void;
  onPressSubmit?: () => void;
  prefilledAssessmentName?: Organization[];
  onAssessmentNameChange?: any;
}

const FormEditAssessmentBox: React.FC<ViewProps> = ({
  onPressSubmit,
  prefilledAssessmentName,
  onAssessmentNameChange,
}) => {
  const [patientInputs, setpatientInputs] = useState<any>("");

  const handlePatientInputChange = (value: string) => {
    setpatientInputs(value);
    onAssessmentNameChange(value);
  };

  useEffect(() => {
    const preFiledname = prefilledAssessmentName;
    setpatientInputs(preFiledname);
  }, [prefilledAssessmentName]);

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
              id="therapyname"
              label="Therapy name"
              value={patientInputs}
              onChange={(e) => handlePatientInputChange(e.target.value)}
              fullWidth={true}
              inputProps={{ "data-testid": "therapy_name" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
            />
          </Grid>
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
              //   if (patientInputs.length) {
              onPressSubmit();
              //   } else {
              //     enqueueSnackbar("Please enter assessment name", {
              //       variant: "error",
              //     });
              //   }
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default FormEditAssessmentBox;
