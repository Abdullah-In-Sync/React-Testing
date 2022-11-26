import { Button, Grid } from "@mui/material";
import { FieldArray, Form, Formik, FormikProps } from "formik";
import { FC, useContext, useMemo } from "react";
import withViewModel from "../../hoc/withModal";
import { ActionMenu } from "../common/Menu";
import TemplateTableViewModel, {
  TableCell,
  TableRow,
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";

interface TemplateTableProps {
  mode: "view" | "edit";
}
const TemplateTable: React.FC<TemplateTableProps> = ({ mode }) => {
  const { template, validationSchema } = useContext(TemplateTableContext);

  const onSubmit = (
    formData: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => {
    console.log("submited", formData, formikHelper);
  };

  return (
    <Formik<TemplateFormData>
      initialValues={template}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikHelper) => {
        return (
          <Form>
            <Grid container>
              <FieldArray
                name="rows"
                render={(arrayHelper) =>
                  formikHelper?.values?.rows.map((row, rowIndex) => (
                    <TemplateTableRow
                      key={rowIndex}
                      rowData={row}
                      rowIndex={rowIndex}
                      formikHelper={formikHelper}
                    />
                  ))
                }
              />
            </Grid>
            <Button type="submit">Submit</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withViewModel(TemplateTable, new TemplateTableViewModel());

interface TemplateTableRowProps {
  rowIndex: number;
  rowData: TableRow;
  formikHelper: FormikProps<TemplateFormData>;
}

const TemplateTableRow: FC<TemplateTableRowProps> = ({
  rowIndex,
  rowData,
  formikHelper,
}) => {
  return (
    <Grid container>
      <FieldArray
        name="cells"
        render={(arrayHelper) =>
          rowData?.cells?.map((cell, index) => (
            <TemplateTableCell
              key={index}
              cellData={cell}
              cellIndex={index}
              rowIndex={rowIndex}
              formikHelper={formikHelper}
            />
          ))
        }
      />
    </Grid>
  );
};

interface TemplateTableCellProps {
  cellIndex: number;
  rowIndex: number;
  cellData: TableCell;
  formikHelper: FormikProps<TemplateFormData>;
}

const TemplateTableCell: FC<TemplateTableCellProps> = ({
  rowIndex,
  cellIndex,
  cellData,
  formikHelper,
}) => {
  const formCellKey = useMemo(() => {
    return `rows[${rowIndex}].cells[${cellIndex}]`;
  }, [rowIndex, cellIndex]);

  return (
    <Grid
      item
      flex={1}
      style={{
        border: "1px solid #000000",
        position: "relative",
        minHeight: 400,
      }}
    >
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <ActionMenu
          options={[
            {
              key: "header",
              value: "Cell Title",
            },
            {
              key: "answer",
              value: "Answer Type",
            },
          ]}
          onChange={(event) =>
            cellData.type != event?.type &&
            formikHelper?.setFieldValue(`${formCellKey}.type`, event?.key)
          }
        />
      </div>
      {cellData.type == "answer" && (
        <AnswerType formCellKey={formCellKey} cellData={cellData} />
      )}
      {cellData.type == "header" && (
        <CellHeader formCellKey={formCellKey} cellData={cellData} />
      )}
    </Grid>
  );
};

interface CellHeaderProps {
  formCellKey: string;
  cellData: TableCell;
  formikHelper?: FormikProps<TemplateFormData>;
}

const CellHeader: FC<CellHeaderProps> = () => {
  return <div>header</div>;
};

interface AnswerTypeProps {
  formCellKey: string;
  cellData: TableCell;
  formikHelper?: FormikProps<TemplateFormData>;
}
const AnswerType: FC<AnswerTypeProps> = () => {
  return <div>answer</div>;
};
