import { Button, Grid } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { useContext } from "react";
import withViewModel from "../../hoc/withModal";
import TemplateTableViewModel, {
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";
import { useAppContext } from "../../contexts/AuthContext";
import { ColumnActionTitle } from "./TableActionHeader";
import { TemplateTableRow } from "./TableRow";

interface TemplateTableProps {
  mode: "view" | "edit";
  initialData?: TemplateFormData;
  onSubmit?: (
    formData: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => void;
  onCancel?: (
    formData: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => void;
  onPreview?: (
    formData: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => void;
}
const TemplateTable: React.FC<TemplateTableProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onPreview,
}) => {
  const {
    user: { user_type: userType } = {},
  } = useAppContext();
  const { validationSchema } = useContext(TemplateTableContext);

  const defaultInitialData: TemplateFormData = {
    rows: [
      {
        cells: [
          {
            type: "",
          },
        ],
      },
    ],
  };

  return (
    <Formik<TemplateFormData>
      initialValues={initialData || defaultInitialData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikHelper) => {
        return (
          <Form>
            <Grid container style={{ overflowX: "scroll" }}>
              <FieldArray
                name="rows"
                render={() => (
                  <>
                    {/*For the top column action menu for add new column */}
                    {userType === 'admin' && <Grid container wrap="nowrap">
                      <Grid item style={{ minWidth: "58px" }}>
                        {" "}
                        <div></div>{" "}
                      </Grid>
                      {formikHelper?.values?.rows[0].cells.map((c, index) => (
                        <ColumnActionTitle
                          index={index}
                          formikHelper={formikHelper}
                        />
                      ))}
                    </Grid>}
                    {formikHelper?.values?.rows.map((row, rowIndex) => (
                      <TemplateTableRow
                        key={rowIndex}
                        rowData={row}
                        rowIndex={rowIndex}
                        formikHelper={formikHelper}
                        userType={userType}
                      />
                    ))}
                  </>
                )}
              />
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid item padding={"63px 0px 94px 0px"}>
                <Button
                  data-testid="tableTemplateSubmit"
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
                <Button
                  data-testid="tableTemplateCancel"
                  color="secondary"
                  variant="contained"
                  style={{
                    margin: "0px 27px 0px 27px",
                    padding: "5px 79px 5px 79px",
                    fontSize: "20px",
                  }}
                  disabled={formikHelper?.isSubmitting}
                  onClick={() => onCancel?.(formikHelper.values, formikHelper)}
                >
                  Cancel
                </Button>
                {userType === 'admin' && <Button
                  data-testid="tableTemplatePreview"
                  color="primary"
                  variant="contained"
                  style={{
                    padding: "5px 79px 5px 79px",
                    fontSize: "20px",
                  }}
                  disabled={formikHelper?.isSubmitting}
                  onClick={() => onPreview?.(formikHelper.values, formikHelper)}
                >
                  Preview
                </Button>}
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withViewModel(TemplateTable, new TemplateTableViewModel());
