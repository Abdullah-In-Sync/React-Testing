import { Grid } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import { FC } from "react";
import { TableRow, TemplateFormData } from "./table.model";
import { RawActionTitle } from "./TableActionHeader";
import { TemplateTableCell } from "./TableCell";

export interface TemplateTableRowProps {
  rowIndex: number;
  rowData: TableRow;
  formikHelper: FormikProps<TemplateFormData>;
}

export const TemplateTableRow: FC<TemplateTableRowProps> = ({
  rowIndex,
  rowData,
  formikHelper,
}) => {
  return (
    <Grid container data-testid={`row-${rowIndex}`} wrap="nowrap">
      <FieldArray
        name="cells"
        render={() => (
          <>
            <RawActionTitle index={rowIndex} formikHelper={formikHelper} />
            {rowData?.cells?.map((cell, index) => (
              <TemplateTableCell
                key={index}
                cellData={cell}
                cellIndex={index}
                rowIndex={rowIndex}
                formikHelper={formikHelper}
              />
            ))}
          </>
        )}
      />
    </Grid>
  );
};
