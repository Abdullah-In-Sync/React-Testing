import { Box, Button, Grid, Typography } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_RELAPSE_DETAIL_BY_ID } from "../../../graphql/query/resource";
import { editRelapseFormField } from "../../../utility/types/resource_types";
import TextFieldComponent from "../TextField/TextFieldComponent";
import SureModal from "../../admin/resource/SureModal";

const defaultFormValue = {
  _id: "",
  relapse_ans: "",
  relapse_ques: "",
  relapse_ques_id: "",
};

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};

const Relapse = (props: propTypes) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  let i = 0;
  /* istanbul ignore next */
  const [formFields, setFormFields] =
    useState<editRelapseFormField>(defaultFormValue);

  //GraphQL Queries
  const [getRelapseData, { loading: safetyPlanLoading, data: relapseData }] =
    useLazyQuery(GET_PATIENT_RELAPSE_DETAIL_BY_ID, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        setFormFields(data?.getPatientRelapseList);
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    const updatedForm = (formFields as any).map((item, itemIndex) => {
      const updatedItem = JSON.parse(JSON.stringify(item));
      if (index === itemIndex) {
        updatedItem.relapse_ans_detail[0][fieldName] = value;
      }
      return updatedItem;
    });
    setFormFields(updatedForm);
  };

  useEffect(() => {
    /* istanbul ignore next */
    if (!safetyPlanLoading && relapseData) {
      props.setLoader(false);
    }
  }, [relapseData]);

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    getRelapseData();
    props.setLoader(false);
  }, []);

  return (
    <>
      <form
        data-testid="relapse-form"
        style={{ paddingBottom: "30px" }}
        onSubmit={handleSubmit}
      >
        <Box>
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
            {relapseData?.getPatientRelapseList == 0 ? (
              <Box
                style={{
                  fontFamily: "Monteserrat",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                Therapist has not shared any questions to answer yet.
              </Box>
            ) : (
              <Box>
                {relapseData?.getPatientRelapseList?.map((data, index) => {
                  return (
                    // data.relapse_ans_detail.length > 0 && (
                    <Box
                      sx={{
                        flexGrow: 1,
                        border: "1px solid #cecece",
                        display: "grid",
                      }}
                      p={5}
                      key={`safetyPlanBox_${index}`}
                      marginBottom={"25px"}
                      borderRadius={"7px"}
                    >
                      <Box
                        style={{
                          paddingRight: "15px",
                          color: "#6EC9DB",
                          fontWeight: "bold",
                        }}
                        data-testid="relapse_ques"
                      >
                        {(i = i + 1)}
                        {". " + data?.relapse_ques}
                      </Box>

                      <Grid container spacing={2} marginBottom={0}>
                        <Grid item xs={12}>
                          <TextFieldComponent
                            name="relapse_ans"
                            id="relapse_ans"
                            value={
                              formFields[index]?.relapse_ans_detail[0]
                                ?.relapse_ans
                            }
                            multiline
                            rows={4}
                            onChange={(e) => set2(e, index)}
                            inputProps={{ "data-testid": "relapse_ans" }}
                            fullWidth={true}
                            className="form-control-bg"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    // )
                  );
                })}

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
                      data-testid="relapseCancelButton"
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
                      data-testid="relapseConfirmButton"
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
export default Relapse;
