import { Box, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { columns } from "./data";
import { useStyles } from "./therapistPatientStyles";
import * as patientResourceInterface from "./types";

interface ViewProps {
  patientResourceList?:
    | patientResourceInterface.GetPatResourceListEntity[]
    | null;
  buttonClick?: (value) => void;
}

const ResourceList: React.FC<ViewProps> = ({
  patientResourceList,
  buttonClick,
}) => {
  const styles = useStyles();

  return (
    <Stack className={styles.tablePaper}>
      <Typography
        variant="h4"
        mt={4}
        mb={2}
        sx={{ fontWeight: "bold" }}
        className="text-blue"
      >
        Resources
      </Typography>
      <TableContainer className="tableContainer">
        {patientResourceList.length > 0 ? (
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
              {patientResourceList.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(row, buttonClick)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Box>
            <Typography variant="h6" textAlign={"center"}>
              No data found.
            </Typography>
          </Box>
        )}
      </TableContainer>
    </Stack>
  );
};

export default ResourceList;
