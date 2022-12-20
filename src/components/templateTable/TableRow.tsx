import { Grid } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import { FC } from "react";
import { TableRow, TemplateFormData } from "./table.model";
import { RawActionTitle } from "./TableActionHeader";
import { TemplateTableCell } from "./TableCell";
import { TablePatientCell } from "./TablePatientCell";

export interface TemplateTableRowProps {
  rowIndex: number;
  rowData: TableRow;
  formikHelper: FormikProps<TemplateFormData>;
  userType: string;
  mode: string;
}

export const TemplateTableRow: FC<TemplateTableRowProps> = ({
  rowIndex,
  rowData,
  formikHelper,
  userType,
  mode,
}) => {
  const TableCell = userType === "admin" ? TemplateTableCell : TablePatientCell;
  return (
    <Grid container data-testid={`row-${rowIndex}`} wrap="nowrap">
      <FieldArray
        name="cells"
        render={() => (
          <>
            {userType === "admin" && (
              <RawActionTitle index={rowIndex} formikHelper={formikHelper} />
            )}
            {rowData?.cells?.map((cell, index) => (
              <TableCell
                key={index}
                cellData={cell}
                cellIndex={index}
                rowIndex={rowIndex}
                formikHelper={formikHelper}
                mode={mode}
              />
            ))}
          </>
        )}
      />
    </Grid>
  );
};
