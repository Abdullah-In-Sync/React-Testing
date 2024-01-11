import { Button, Grid } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { useContext, useEffect, useState } from "react";
import withViewModel from "../../hoc/withModal";
import TemplateTableViewModel, {
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";
import { ColumnActionTitle } from "./TableActionHeader";
import { TemplateTableRow } from "./TableRow";
import { useStyles } from "./tableTemplateStyles";
import { checkPrivilageAccess } from "../../utility/helper";

interface TemplateTableProps {
  mode: "view" | "edit" | "patientView" | "patientFormulation";
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
  userType?: "admin" | "patient";
  showActionsBottom?: boolean;
  view?: string;
}
const TemplateTable: React.FC<TemplateTableProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onPreview,
  userType = "admin",
  mode,
  showActionsBottom = true,
  view,
}) => {
  const styles = useStyles();
  // const { user: { user_type: userType } = {} } = useAppContext();
  const { validationSchema } = useContext(TemplateTableContext);
  const [initialValues, setInitialValues] = useState<TemplateFormData>({
    rows: [
      {
        cells: [
          {
            type: "",
            width: "90%",
          },
        ],
        height: "400px",
      },
    ],
  });
  const isEditResource = checkPrivilageAccess("Resource", "Edit");

  useEffect(() => {
    /* istanbul ignore next */
    if (initialData) {
      setInitialValues(initialData);
    }
  }, [initialData]);
  const customStyle = {
    border: "1px solid green",
    borderWidth: "0px 1px 1px 1px",
    padding: "35px 16px 25px 16px",
    borderRadius: "0px 0px 8px 8px",
  };
  return (
    <Formik<TemplateFormData>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formikHelper) => {
        console.log(formikHelper?.values, "formikHelper?.values");
        return (
          <Form style={view == "patientFormulation" ? customStyle : {}}>
            <Grid
              className={`${styles[mode]} ${styles.tableCellView}`}
              container
            >
              <FieldArray
                name="rows"
                render={() => (
                  <>
                    {/*For the top column action menu for add new column */}
                    {userType === "admin" && (
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
                    )}
                    {formikHelper?.values?.rows.map((row, rowIndex) => (
                      <TemplateTableRow
                        key={rowIndex}
                        rowData={row}
                        rowIndex={rowIndex}
                        formikHelper={formikHelper}
                        userType={userType}
                        mode={mode}
                      />
                    ))}
                  </>
                )}
              />
            </Grid>
            {
              /* istanbul ignore next */
              (isEditResource === true || isEditResource === undefined) &&
                mode !== "patientView" &&
                showActionsBottom && (
                  <Grid container justifyContent={"center"}>
                    <Grid item padding={"63px 0px 94px 0px"}>
                      <Button
                        data-testid="tableTemplateSubmit"
                        variant="contained"
                        type="submit"
                        style={{
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          marginRight: "10px",
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
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          backgroundColor: "#6BA08E",
                        }}
                        disabled={formikHelper?.isSubmitting}
                        onClick={() =>
                          onCancel?.(formikHelper.values, formikHelper)
                        }
                      >
                        Cancel
                      </Button>
                      {userType === "admin" && (
                        <Button
                          data-testid="tableTemplatePreview"
                          color="primary"
                          variant="contained"
                          style={{
                            paddingLeft: "40px",
                            paddingRight: "40px",
                            marginLeft: "10px",
                          }}
                          disabled={formikHelper?.isSubmitting}
                          onClick={() =>
                            onPreview?.(formikHelper.values, formikHelper)
                          }
                        >
                          Preview
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                )
            }
          </Form>
        );
      }}
    </Formik>
  );
};

export default withViewModel(TemplateTable, new TemplateTableViewModel());
