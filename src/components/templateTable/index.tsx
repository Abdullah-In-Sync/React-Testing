import { Grid } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { NextPage } from "next";
import React, { FC } from "react";
import withViewModel from "../../hoc/withModal";
import TemplateTableViewModel, {
  TableRow,
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";

interface TemplateTableProps {
  mode: "view" | "edit";
}

const TemplateTable: React.FC<TemplateTableProps> = ({ mode }) => {
  const { template, validationSchema } = React.useContext(TemplateTableContext);

  const onSubmit = () => {
    console.log("submited");
  };

  return (
    <Formik<TemplateFormData>
      initialValues={template}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, values, touched, setValues }) => {
        console.log(values);
        return (
          <Form>
            <Grid container >
              <FieldArray
                name="rows"
                render={(arrayHelper) =>
                  values?.rows.map((row, rowIndex) => (
                    <TemplateTableRow rowData={row} rowIndex={rowIndex} />
                  ))
                }
              />
            </Grid>
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
}
const TemplateTableRow: FC<TemplateTableRowProps> = ({ rowIndex, rowData }) => {
  return (
    <Grid container >
        {rowData?.cells?.map((cell) => (
          <Grid item flex={1}> <h1>{cell.title}</h1> </Grid>
        ))}
     
    </Grid>
  );
};
