import { Box, Grid, Typography } from "@mui/material";
import { FormikProps } from "formik";
import { FC, useMemo } from "react";
import AnswerType from "./AnswerType";
import { TableCell, TemplateFormData } from "./table.model";

export interface TemplateTableCellProps {
  cellIndex: number;
  rowIndex: number;
  cellData: TableCell;
  formikHelper: FormikProps<TemplateFormData>;
  mode: string;
}

export const TablePatientCell: FC<TemplateTableCellProps> = ({
  rowIndex,
  cellIndex,
  cellData,
  formikHelper,
  mode,
}) => {
  const formCellKey = useMemo(() => {
    return `rows[${rowIndex}].cells[${cellIndex}]`;
  }, [rowIndex, cellIndex]);
  return (
    <Grid
      item
      data-testid={`cell-${cellIndex}`}
      flex={1}
      style={{
        ...(cellIndex == 0 ? { borderLeft: "1px solid #000000" } : {}),
        ...(rowIndex == 0 ? { borderTop: "1px solid #000000" } : {}),
        borderRight: "1px solid #000000",
        borderBottom: "1px solid #000000",
        position: "relative",
        minWidth: formikHelper.values.rows[rowIndex].cells[cellIndex].width,
        maxWidth: formikHelper.values.rows[rowIndex].cells[cellIndex].width,
      }}
    >
      {cellData.type == "header" && (
        <Box sx={{ py: 2 }}>
          <Typography variant="h5" component="h4" textAlign={"center"}>
            {cellData.title}
          </Typography>
          {cellData.description && (
            <Typography component="p" textAlign={"center"}>
              {cellData.description}
            </Typography>
          )}
        </Box>
      )}
      {cellData.type == "answer" && (
        <AnswerType
          formCellKey={formCellKey}
          cellData={cellData}
          formikHelper={formikHelper}
          mode={mode}
        />
      )}
    </Grid>
  );
};
