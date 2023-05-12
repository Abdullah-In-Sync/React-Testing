import { Box, CardContent } from "@mui/material";
import { Form } from "formik";
import React from "react";
import Formats from "../../../common/TemplateFormat";
import { useStyles } from "./createMeasuresStyles";

import { Typography } from "@material-ui/core";
import CommonAutocomplete from "../../../common/AutoComplete/AutoComplete";
import CommonButton from "../../../common/Buttons/CommonButton";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import { CommonFormProps, ModalRefs } from "./types";
// import { sessionOptions } from "../../../../lib/constants";
import { getSessionOptions, getfiterObject } from "../../../../utility/helper";
import SessionBoxLabel from "../../../common/SessionLabel";
import ConfirmWrapper from "../../../common/ConfirmWrapper";

type ViewProps = CommonFormProps &
  ModalRefs & {
    isView?: boolean;
    isResponse?: boolean;
  };

const ResponseForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  confirmRef,
  isView,
  isResponse,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const { templateId, description, title, sessionNo } = values;
  const FormatTemplate = templateId ? Formats[templateId] : null;
  const styles = useStyles();
  const sessionOptions = getSessionOptions();

  /* istanbul ignore next */
  const handleChangeSession = (_, v) => {
    setFieldValue(`sessionNo`, v.value);
  };

  /* istanbul ignore next */
  const sessionDropdown = () => {
    if (isView) {
      const { label = null } = getfiterObject(sessionOptions, sessionNo);
      return <SessionBoxLabel label={label} />;
    } else
      return (
        <Box
          className={`autoCompeleteSessionWrapper ${
            isView ? "disbledFields" : ""
          }`}
        >
          <CommonAutocomplete
            handleSelect={handleChangeSession}
            name={`sessionNo`}
            initialOptions={sessionOptions}
            label="Enter Session"
            defaultValue={{ label: "Start", value: "start" }}
          />
        </Box>
      );
  };

  return (
    <ConfirmWrapper ref={confirmRef}>
      <Box
        className={`autoCompeleteSessionWrapper ${styles.viewForm} ${
          isView ? "disbledFields" : ""
        }`}
      >
        <CardWithHeader label={title} rightComponent={sessionDropdown}>
          <CardContent>
            <Form>
              {description && (
                <Box className="descBox">
                  <Typography>{description}</Typography>
                </Box>
              )}
              {FormatTemplate && (
                <FormatTemplate
                  formikProps={formikProps}
                  isResponse={isResponse}
                  confirmRef={confirmRef}
                  isView={isView}
                />
              )}
              {!isView && (
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
              )}
            </Form>
          </CardContent>
        </CardWithHeader>
      </Box>
    </ConfirmWrapper>
  );
};

export default ResponseForm;
