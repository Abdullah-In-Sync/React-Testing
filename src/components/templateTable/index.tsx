import { Button, Grid } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { useContext } from "react";
import withViewModel from "../../hoc/withModal";
import TemplateTableViewModel, {
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";
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
                    <Grid container wrap="nowrap">
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
                    </Grid>
                    {formikHelper?.values?.rows.map((row, rowIndex) => (
                      <TemplateTableRow
                        key={rowIndex}
                        rowData={row}
                        rowIndex={rowIndex}
                        formikHelper={formikHelper}
                      />
                    ))}
                  </>
                )}
              />
            </Grid>
            <Grid container justifyContent={"center"}>
              <Grid item padding={"63px 0px 94px 0px"}>
                <Button
                  data-testid="submit"
                  variant="contained"
                  type="submit"
                  style={{
                    padding: "11px 79px 11px 79px",
                    fontSize: "20px",
                  }}
                >
                  Submit
                </Button>
                <Button
                  data-testid="cancel"
                  color="secondary"
                  variant="contained"
                  style={{
                    margin: "0px 27px 0px 27px",
                    padding: "11px 79px 11px 79px",
                    fontSize: "20px",
                  }}
                  onClick={() => onCancel?.(formikHelper.values, formikHelper)}
                >
                  Cancel
                </Button>
                <Button
                  data-testid="preview"
                  color="primary"
                  variant="contained"
                  style={{
                    padding: "11px 79px 11px 79px",
                    fontSize: "20px",
                  }}
                  onClick={() => onPreview?.(formikHelper.values, formikHelper)}
                >
                  Preview
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withViewModel(TemplateTable, new TemplateTableViewModel());
