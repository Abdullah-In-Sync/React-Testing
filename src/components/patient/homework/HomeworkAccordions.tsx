import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";

import { useStyles } from "./homeworkStyles";
import * as homeworkListTypes from "./types";

import * as Yup from "yup";
import ResponseTextArea from "./ResponseTextArea";

const HomeWorkAccordions: React.FC<homeworkListTypes.HomeworkListProps> = ({
  homeworkList,
  handleSubmit,
}) => {
  const router = useRouter();
  const styles = useStyles();
  const validationSchema = Yup.object().shape({
    response: Yup.string().required(),
  });

  const handleResourceAttachedClick = () => {
    router.push("/patient/resource/");
  };

  const resourceAttachedButton = (resourceData: object[]) => {
    return (
      <div className={styles.attachButtonWrapper}>
        {resourceData.length > 0 ? (
          <Button variant="outlined" onClick={handleResourceAttachedClick}>
            <AttachFileIcon className={styles.attachIcon} /> Resources Attached
          </Button>
        ) : (
          <Button variant="outlined">
            <AttachFileIcon className={styles.attachIcon} /> No Resources
            Attached
          </Button>
        )}
      </div>
    );
  };

  const fromBox = ({
    values,
    isSubmitting,
    completeStatus,
    index,
    resource_data,
  }) => {
    const { pthomewrk_task } = values;
    return (
      <div className={styles.formBoxWrapper}>
        <Box>
          <Form>
            <div>
              <div>
                <label className={styles.label}>{`Homework ${
                  index + 1
                }`}</label>
                <Stack className={styles.questionWrapper}>
                  <Typography>{pthomewrk_task}</Typography>
                </Stack>
              </div>
              {resourceAttachedButton(resource_data)}
              <div>
                <ResponseTextArea
                  label="Patient Response"
                  name="response"
                  rows="5"
                  id={`therapy_response_${index + 1}`}
                  placeholder="Please type response here"
                  disabled={completeStatus}
                />
              </div>
            </div>
            {completeStatus != 1 && (
              <div className={styles.saveButtonWrapper}>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className={styles.saveButton}
                  data-testid={`therapy_save_button_${index + 1}`}
                >
                  Save
                </Button>
              </div>
            )}
          </Form>
        </Box>
      </div>
    );
  };

  function onSubmit(fields, { setSubmitting }) {
    handleSubmit(fields, setSubmitting);
  }

  const commonform = (completed?: number) => {
    return homeworkList
      .filter(({ complete_status }) => {
        return completed == complete_status;
      })
      .map((item, index) => {
        const {
          pthomewrk_task,
          pthomewrk_resp = "",
          _id,
          complete_status,
          resource_data,
        } = item;

        const initialValues = {
          _id,
          response: pthomewrk_resp,
          pthomewrk_task,
        };
        return (
          <Formik
            initialValues={initialValues}
            key={`homework_response_form_${index}`}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            children={(props: any) =>
              fromBox({
                ...props,
                ...{
                  completeStatus: parseInt(complete_status as string),
                  index,
                  resource_data,
                },
              })
            }
          />
        );
      });
  };

  const commonAccordion = ({
    homeworkCompletedStatus,
    label,
    emptyMessage,
  }) => {
    return (
      <Stack mb={2}>
        <Accordion
          className={styles.accordion}
          TransitionProps={{ unmountOnExit: false, mountOnEnter: false }}
        >
          <AccordionSummary
            expandIcon={<AddIcon className={styles.accordionAddIcon} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className={styles.accordionSummary}
          >
            <Typography variant="h6">{label}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {commonform(homeworkCompletedStatus).length > 0 ? (
              commonform(homeworkCompletedStatus)
            ) : (
              <Typography
                className={styles.emptyText}
                data-testid={"emptyMessage"}
              >
                {emptyMessage}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </Stack>
    );
  };

  return (
    <Stack pb={2} pt={2}>
      {commonAccordion({
        homeworkCompletedStatus: 0,
        label: "Homework",
        emptyMessage: "You have not been assigned any homework yet.",
      })}
      {commonAccordion({
        homeworkCompletedStatus: 1,
        label: "My Completed Homework",
        emptyMessage: "You have not completed any homework yet.",
      })}
    </Stack>
  );
};

export default HomeWorkAccordions;
