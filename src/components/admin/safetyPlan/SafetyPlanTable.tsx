import { Alert, Stack, TablePagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import * as safetyPlanInterface from "../../../graphql/SafetyPlan/types";
import { columns } from "./data";
import { useStyles } from "./safetyPlanStyles";

interface ViewProps {
  safetyPlanList?: safetyPlanInterface.GetSafetyPlanList | null;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  buttonClick?: (value) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  loadingSafetyPlanList?: boolean;
}

const SafetyPlanTable: React.FC<ViewProps> = ({
  safetyPlanList,
  buttonClick,
  onPageChange,
  onSelectPageDropdown,
  tableCurentPage,
  rowsLimit,
  loadingSafetyPlanList,
}) => {
  const styles = useStyles();
  const { data: list = [], total = 0 } = safetyPlanList || {};

  const messageCheck = () => {
    if (loadingSafetyPlanList) return "Loading...";
    else if (list.length <= 0 && !loadingSafetyPlanList)
      return "No data found !";
    else return null;
  };

  const messageTable = () => {
    const tempCheck = messageCheck();
    return (
      tempCheck != null && (
        <TableRow>
          {" "}
          <TableCell colSpan={5}>
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="info">{tempCheck}</Alert>
            </Stack>
          </TableCell>
        </TableRow>
      )
    );
  };

  return (
    <Stack className={styles.tablePaper}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={styles.root}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography> {column.label} </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row, i) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`tableRow_${i}`}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format
                          ? column.format(
                              row,
                              buttonClick,
                              tableCurentPage * rowsLimit + i
                            )
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {messageTable()}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsLimit}
          page={tableCurentPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onSelectPageDropdown}
        />
      </TableContainer>
    </Stack>
  );
};

export default SafetyPlanTable;
