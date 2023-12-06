import { Box, Button, Typography } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { FC } from "react";
import * as yup from "yup";
import { useStyles } from "../SafetyPlan/safetyPlanStyle";
import { RelapsePlanQuestion } from "./relapsePlanQuestion";
import { GetPatientRelapsePlan } from "../../../graphql/Relapse/types";

type Props = {
  relapsePlan: GetPatientRelapsePlan;
  onSubmit: (relapsePlan: GetPatientRelapsePlan) => void;
  onCancel?: (formikHelper: FormikProps<GetPatientRelapsePlan>) => void;
  isEditRelapse?: any;
};

export const RelapsePlanForm: FC<Props> = ({
  relapsePlan,
  onSubmit,
  onCancel,
  isEditRelapse,
}) => {
  const classis = useStyles();

  return (
    <Formik<GetPatientRelapsePlan>
      initialValues={relapsePlan}
      onSubmit={onSubmit}
      data-testid={`form-${relapsePlan._id}`}
      validationSchema={yup.object().shape({
        questions: yup.array().of(
          yup.object().shape({
            patient_answer: yup
              .string()
              // .required("Answer is required")
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
                {
                  /* istanbul ignore next */
                  formikHelper?.values?.description && (
                    <Box>
                      <Typography className={classis.headingText}>
                        Your Plan
                      </Typography>
                      <Box
                        sx={{
                          border: "1px solid #cecece",
                          display: "grid",
                          paddingBottom: "10px",
                        }}
                        borderRadius={"7px"}
                      >
                        <Box className={classis.descriptionWrapper}>
                          <Typography className={classis.descriptionText}>
                            {formikHelper?.values?.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )
                }
                {
                  /* istanbul ignore next */
                  !formikHelper?.values?.description &&
                    !formikHelper?.values?.questions?.length && (
                      <Box>No data found</Box>
                    )
                }
                {
                  /* istanbul ignore next */
                  formikHelper?.values.questions.map((question, index) => (
                    <RelapsePlanQuestion
                      key={question?._id}
                      question={question}
                      index={index}
                      formikHelper={formikHelper}
                    />
                  ))
                }
                <Box
                  marginTop={"32px"}
                  display="flex"
                  justifyContent={"center"}
                >
                  {
                    /* istanbul ignore next */
                    (isEditRelapse === true || isEditRelapse === undefined) &&
                      formikHelper?.values?.questions?.length > 0 && (
                        <Box>
                          <Button
                            data-testid="submit-form"
                            variant="contained"
                            type="submit"
                            style={{
                              padding: "5px 20px 5px 20px",
                            }}
                            // disabled={!formikHelper.isValid}
                          >
                            Submit
                          </Button>
                          <Button
                            data-testid="cancel-form"
                            color="secondary"
                            variant="contained"
                            style={{
                              margin: "0px 27px 0px 27px",
                              padding: "5px 20px 5px 20px",
                            }}
                            onClick={() =>
                              /* istanbul ignore next */
                              onCancel?.(formikHelper)
                            }
                          >
                            Cancel
                          </Button>
                        </Box>
                      )
                  }
                </Box>
              </Box>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};
