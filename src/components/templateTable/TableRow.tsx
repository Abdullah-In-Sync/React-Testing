import { Grid } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import { FC } from "react";
import { TableRow, TemplateFormData } from "./table.model";
import { RawActionTitle } from "./TableActionHeader";
import { TemplateTableCell } from "./TableCell";
import { TablePaitenCell } from "./TablePaitenCell";

export interface TemplateTableRowProps {
  rowIndex: number;
  rowData: TableRow;
  formikHelper: FormikProps<TemplateFormData>;
  userType: string
}

export const TemplateTableRow: FC<TemplateTableRowProps> = ({
  rowIndex,
  rowData,
  formikHelper,
  userType
}) => {
  const TableCell = userType === 'admin' ? TemplateTableCell : TablePaitenCell;
  return (
    <Grid container data-testid={`row-${rowIndex}`} wrap="nowrap">
      <FieldArray
        name="cells"
        render={() => (
          <>
            {userType === 'admin' && <RawActionTitle index={rowIndex} formikHelper={formikHelper} />}
            {rowData?.cells?.map((cell, index) => (
              <TableCell
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
