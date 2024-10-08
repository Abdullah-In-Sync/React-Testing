import { Stack, TablePagination, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import * as relapsePlanInterface from "../../../graphql/SafetyPlan/types";
import { useStyles } from "../safetyPlan/safetyPlanStyles";
import { Relapsecolumns } from "./RelapseData";

interface ViewProps {
  safetyPlanList?: relapsePlanInterface.GetRelapseList | null;
  onPageChange?: (event, newPage) => void;
  onSelectPageDropdown?: (event) => void;
  pageActionButtonClick?: (value) => void;
  tableCurentPage?: number;
  rowsLimit?: number;
  loadingSafetyPlanList?: boolean;
}

const RelapsePlanTable: React.FC<ViewProps> = ({
  safetyPlanList,
  pageActionButtonClick,
  onPageChange,
  onSelectPageDropdown,
  tableCurentPage,
  rowsLimit,
  loadingSafetyPlanList,
}) => {
  const styles = useStyles();
  const { data: list, total = 0 } = safetyPlanList || {};
  console.log("data table:  ", list);
  console.log("table: safetyPlanList ", safetyPlanList);

  const messageCheck = () => {
    if (loadingSafetyPlanList) return <Typography>Loading...</Typography>;
    else if (!list && !loadingSafetyPlanList)
      return (
        <>
          <Typography className="alertHead">Oops!</Typography>
          <Typography>
            Currently you have not created any safety plan
          </Typography>
        </>
      );
    else if (list.length <= 0 && !loadingSafetyPlanList)
      return <Typography>No data found.</Typography>;
    else return null;
  };

  const messageTable = () => {
    const tempCheck = messageCheck();
    return (
      tempCheck != null && (
        <TableRow className="rowMessageWrapper">
          <TableCell colSpan={5}>
            <Stack className="stackMesage" spacing={2}>
              <span className="alertMessage"> {tempCheck} </span>
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
              {Relapsecolumns.map((column) => (
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
            {(list || []).map((row, i) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`tableRow_${i}`}
                >
                  {Relapsecolumns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format
                          ? column.format(
                              row,
                              pageActionButtonClick,
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
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
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

export default RelapsePlanTable;
