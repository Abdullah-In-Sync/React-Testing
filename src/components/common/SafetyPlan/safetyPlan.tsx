import { Box, Button, Grid, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_SAFETYPLAN_DETAIL_BY_ID } from "../../../graphql/query/resource";
import { editSafetyPlanFormField } from "../../../utility/types/resource_types";
import TextFieldComponent from "../TextField/TextFieldComponent";
import SureModal from "../../admin/resource/SureModal";

const defaultFormValue = {
  _id: "",
  safety_ans: "",
  safety_ques: "",
  patient_id: "",
  safety_additional_details: "",
  safety_ans_status: "",
  safety_ques_id: "",
  safety_ques_type: "",
  safety_ques_typeoption: "",
  therapist_id: "",
  updated_date: "",
};

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};

const SafetyPlan = (props: propTypes) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);

  const [formFields, setFormFields] =
    useState<editSafetyPlanFormField>(defaultFormValue);

  //GraphQL Queries
  const [
    getSafetyPlanData,
    { loading: safetyPlanLoading, data: safetyPlanData },
  ] = useLazyQuery(GET_PATIENT_SAFETYPLAN_DETAIL_BY_ID, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      setFormFields(data?.getPatientSafetyPlanList);
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const set2 = (
    index,
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const updatedForm = (formFields as any).map((item, itemIndex) => {
      const updatedItem = { ...item };
      if (index === itemIndex) {
        updatedItem[fieldName] = value;
      }
      return updatedItem;
    });
    setFormFields(updatedForm);
  };

  useEffect(() => {
    /* istanbul ignore next */
    if (!safetyPlanLoading && safetyPlanData) {
      props.setLoader(false);
    }
  }, [safetyPlanData]);

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    getSafetyPlanData();
    props.setLoader(false);
  }, []);

  return (
    <>
      <form
        data-testid="safetyPlan-form"
        style={{ paddingBottom: "30px" }}
        onSubmit={handleSubmit}
      >
        <Box>
          <p style={{ fontWeight: "700", fontFamily: "Montserrat" }}>
            If you sometimes struggle with suicidal thoughts, complete the form
            below. When you are feeling sucidal, follow the plan one step at a
            time untill you are safe. Feeling suicidal is the result of
            experiencing extreme pain and not having the resources to cope. We
            therefore need to reduce pain and increase the coping resouces.
            Suicide is a permanent solution to a temporary problem. These
            feelings will pass. Keep the plan where you can easily find it when
            you will need it.
          </p>

          <Box
            style={{
              padding: "30px",
              border: "2px ",
              borderStyle: "solid",
              borderColor: "#6BA08E",
              overflow: "visible",
              zIndex: 0,
              borderRadius: "7px",
            }}
          >
            {safetyPlanData?.getPatientSafetyPlanList == 0 ? (
              <Box>Therapist has not shared any questions to answer yet.</Box>
            ) : (
              <Box>
                {safetyPlanData?.getPatientSafetyPlanList?.map(
                  (data, index) => (
                    <Box
                      sx={{
                        flexGrow: 1,
                        border: "1px solid #cecece",
                        display: "grid",
                        // placeItems: "center",
                      }}
                      p={5}
                      marginBottom={"25px"}
                      borderRadius={"7px"}
                    >
                      <Box
                        style={{
                          paddingRight: "15px",
                          color: "#6EC9DB",
                          fontWeight: "bold",
                        }}
                        data-testid="safety_ques"
                      >
                        {index + 1 + ". " + data?.safety_ques}
                      </Box>

                      <Grid container spacing={2} marginBottom={0}>
                        <Grid item xs={12}>
                          <TextFieldComponent
                            name="safety_ans"
                            id="safety_ans"
                            value={formFields[index]?.safety_ans}
                            multiline
                            rows={4}
                            onChange={(e) => set2(index, e)}
                            inputProps={{ "data-testid": "safety_ans" }}
                            fullWidth={true}
                            className="form-control-bg"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )
                )}

                <SureModal
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  setConfirmSubmission={setConfirmSubmission}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "27px",
                    }}
                  >
                    Are you sure you want to save these details
                  </Typography>
                  <Box marginTop="20px" display="flex" justifyContent="end">
                    <Button
                      variant="contained"
                      color="inherit"
                      size="small"
                      data-testid="editSafetyPlanCancelButton"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      sx={{ marginLeft: "5px" }}
                      size="small"
                      data-testid="editSafetyPlanConfirmButton"
                      onClick={() => {
                        setModalOpen(false);
                        props.onSubmit(formFields);
                        props.setLoader(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </Box>
                </SureModal>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    paddingTop: "50px",
                  }}
                >
                  <Grid item xs={6} style={{ paddingRight: "50px" }}>
                    <Button
                      style={{
                        paddingLeft: "50px",
                        paddingRight: "50px",
                        backgroundColor: "#6BA08E",
                      }}
                      data-testid="safetyPlanSubmitButton"
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </form>
    </>
  );
};
export default SafetyPlan;
