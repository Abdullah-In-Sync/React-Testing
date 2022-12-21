/* istanbul ignore file */
import { Box, Button, FormControl, Grid, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useMemo } from "react";
import CustomModal from "../CustomModal/customModel";
import * as Yup from "yup";
import SingleSelectComponent from "../SelectBox/SingleSelect/SingleSelectComponent";

export interface TableDimensionModalProps {
  isOpen: boolean;
  onSubmit: (
    values: TableDimensionFormData,
    formikHelpers: FormikHelpers<TableDimensionFormData>
  ) => void | Promise<any>;
  onModalClose: any;
  setConfirmSubmission: any;
}

export interface TableDimensionFormData {
  rows: number;
  cols: number;
}

export const TableDimensionModal: FC<TableDimensionModalProps> = ({
  isOpen,
  onSubmit,
  onModalClose,
  setConfirmSubmission,
}) => {
  const { rowsOptions, colsOptions } = useMemo(() => {
    return {
      rowsOptions: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        value: (i + 1).toString(),
      })),
      colsOptions: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        value: (i + 1).toString(),
      })),
    };
  }, []);

  const onChange = (e: any, setFieldValue) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFieldValue(fieldName, value);
  };

  return (
    isOpen && (
      <CustomModal
        modalOpen={true}
        setModalOpen={onModalClose}
        setConfirmSubmission={setConfirmSubmission}
      >
        <Grid item xs={12}>
          <div>
            <Typography
              sx={{
                color: "#6EC9DB",
                fontWeight: "600",
                textAlign: "center",
                paddingBottom: "20px",
                fontFamily: "Montserrat",
                font: "500",
                fontSize: "16px",
              }}
            >
              Select Template
            </Typography>
          </div>

          <Formik<TableDimensionFormData>
            initialValues={{
              rows: 1,
              cols: 1,
            }}
            validationSchema={Yup.object().shape({
              rows: Yup.number().required("Template Type is required"),
              cols: Yup.number().required("Template Type is required"),
            })}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue, isValid }) => (
              <Form>
                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={8} style={{ fontWeight: "bold" }}>
                    Select the number of Rows
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl sx={{ m: 1 }} variant="standard">
                      <SingleSelectComponent
                        fullWidth={true}
                        id="rowsSelect"
                        labelId="rows"
                        name="rows"
                        value={values.rows}
                        onChange={(e) => onChange(e, setFieldValue)}
                        inputProps={{ "data-testid": "rowsSelect" }}
                        options={rowsOptions}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        showDefaultSelectOption={false}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} style={{ fontWeight: "bold" }}>
                    Select the number of Columns
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl sx={{ m: 1 }} variant="standard">
                      <SingleSelectComponent
                        fullWidth={true}
                        id="colsSelect"
                        labelId="cols"
                        name="cols"
                        value={values.cols}
                        onChange={(e) => onChange(e, setFieldValue)}
                        inputProps={{ "data-testid": "colsSelect" }}
                        options={colsOptions}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        showDefaultSelectOption={false}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  <Grid item xs={6} style={{ paddingRight: "50px" }}>
                    <Button
                      data-testid="selectDimensionButton"
                      variant="contained"
                      type="submit"
                      style={{ paddingLeft: "50px", paddingRight: "50px" }}
                      disabled={!isValid}
                    >
                      Proceed
                    </Button>
                  </Grid>
                  <Grid item xs={6} textAlign="center">
                    <Button
                      data-testid="editTemplateCancelButton"
                      variant="contained"
                      style={{
                        paddingLeft: "50px",
                        paddingRight: "50px",
                        backgroundColor: "#6BA08E",
                      }}
                      onClick={() => onModalClose(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
      </CustomModal>
    )
  );
};
