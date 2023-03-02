import { Box, Button, Typography } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { FC } from "react";
import { ViewSafetyPlanById } from "../../../graphql/SafetyPlan/types";
import { SafetyPlanQuestion } from "./safetyPlanQuestion";
import { useStyles } from "./safetyPlanStyle";
import * as yup from "yup";

type Props = {
  safetyPlan: ViewSafetyPlanById;
  onSubmit: (safetyPlan: ViewSafetyPlanById) => void;
  onCancel?: (formikHelper: FormikProps<ViewSafetyPlanById>) => void;
};

export const SafetyPlanForm: FC<Props> = ({
  safetyPlan,
  onSubmit,
  onCancel,
}) => {
  const classis = useStyles();

  return (
    <Formik<ViewSafetyPlanById>
      initialValues={safetyPlan}
      onSubmit={onSubmit}
      data-testid={`form-${safetyPlan._id}`}
      validationSchema={yup.object().shape({
        questions: yup.array().of(
          yup.object().shape({
            patient_answer: yup
              .string()
              .required("Answer is required")
              .nullable(),
          })
        ),
      })}
    >
      {(formikHelper) => (
        <Form>
          <FieldArray
            name="questions"
            render={() => (
              <Box>
                {formikHelper?.values?.description && (
                  <Box>
                    <Typography className={classis.headingText}>
                      Plan Description
                    </Typography>
                    <Box className={classis.descriptionWrapper}>
                      <Typography className={classis.descriptionText}>
                        {formikHelper?.values?.description}
                      </Typography>
                    </Box>
                  </Box>
                )}
                {formikHelper?.values.questions.map((question, index) => (
                  <SafetyPlanQuestion
                    key={question?._id}
                    question={question}
                    index={index}
                    formikHelper={formikHelper}
                  />
                ))}
                <Box
                  marginTop={"32px"}
                  display="flex"
                  justifyContent={"center"}
                >
                  {formikHelper?.values?.questions?.length > 0 && (
                    <Button
                      data-testid="submit-form"
                      variant="contained"
                      type="submit"
                      style={{
                        padding: "5px 79px 5px 79px",
                        fontSize: "20px",
                      }}
                      disabled={!formikHelper.isValid}
                    >
                      Submit
                    </Button>
                  )}
                  <Button
                    data-testid="cancel-form"
                    color="secondary"
                    variant="contained"
                    style={{
                      margin: "0px 27px 0px 27px",
                      padding: "5px 79px 5px 79px",
                      fontSize: "20px",
                    }}
                    onClick={() => onCancel?.(formikHelper)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
