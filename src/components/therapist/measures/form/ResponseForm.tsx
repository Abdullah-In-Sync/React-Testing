import { Box, CardContent } from "@mui/material";
import { Form } from "formik";
import React, { useEffect } from "react";
import Formats from "../../../common/TemplateFormat";
import { useStyles } from "./createMeasuresStyles";

import { Typography } from "@material-ui/core";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import { CommonFormProps, ModalRefs } from "./types";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import CommonAutocomplete from "../../../common/AutoComplete/AutoComplete";
// import { sessionOptions } from "../../../../lib/constants";
import ConfirmWrapper from "../../../common/TemplateFormat/ConfirmWrapper";

type ViewProps = CommonFormProps & ModalRefs;

const getSessionOptions = () => {
  const tempSession = [
    { value: "start", label: "Start" },
  ]
  for(let i=1; i<=50; i++){
    tempSession.push({ value: i.toString(), label: `Session ${i}` })
  }
  return tempSession
}

const ResponseForm: React.FC<ViewProps> = ({ onPressCancel, formikProps, confirmRef }) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const { templateId, description, title, templateData, sessionNo } = values;
  const FormatTemplate = templateId ? Formats[templateId] : null;
  const styles = useStyles();
  const sessionOptions = getSessionOptions()

  const handleChangeSession = (e) => {
    const { target: { value } } = e;
    setFieldValue(`sessionNo`, value);
  }

  const sessionDropdown = () => {
    return <Box className="autoCompeleteSessionWrapper">
      <CommonAutocomplete handleSelect={handleChangeSession} name={`sessionNo`} initialOptions={sessionOptions} label="Enter Session" defaultValue="start" />
    </Box>
  }

  return (
    <ConfirmWrapper ref={confirmRef}>
      <Box className={`${styles.viewForm}`}>
        <CardWithHeader label={title} rightComponent={sessionDropdown}>
          <CardContent>
            <Form>
              {description && (
                <Box className="descBox">
                  <Typography>{description}</Typography>
                </Box>
              )}
              {FormatTemplate && (
                <FormatTemplate formikProps={formikProps} isResponse confirmRef={confirmRef} />
              )}
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
                <Box>
                  <CommonButton
                    variant="contained"
                    className="cancelButton"
                    data-testid="cancelForm"
                    onClick={onPressCancel}
                  >
                    Cancel
                  </CommonButton>
                </Box>
              </Box>
            </Form>
          </CardContent>
        </CardWithHeader>
      </Box>
    </ConfirmWrapper>
  );
};

export default ResponseForm;
