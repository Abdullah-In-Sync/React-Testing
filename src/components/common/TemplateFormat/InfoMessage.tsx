import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useStyles } from "./templateFormatStyles";

interface ViewProps {
  handleOk?: () => void;
  data?: any;
  modalRef?: any;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
}

export const MeasuresColumns: readonly Column[] = [
  {
    id: "name",
    label: "Organization",
    align: "center",
    minWidth: 130,
  },
  {
    id: "measure",
    label: "Measures",
    align: "center",
    minWidth: 130,
  },
];

const InfoMessage: React.FC<ViewProps> = ({ data = {}, modalRef }) => {
  const styles = useStyles();
  const { duplicateNames = [], measureText } = data;

  const duplicteTable = () => {
    return (
      <Box className="duplicatesTable">
        <TableContainer style={{ overflowX: "initial" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={""}>
              <TableRow>
                {MeasuresColumns.map((column) => (
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
              {(duplicateNames || []).map((row, i) => {
                row = { ...row, ...{ measure: measureText } };
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`tableRow_${i}`}
                  >
                    {MeasuresColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Stack className={styles.infoMessageBoxModal}>
      <Box className="boxFirst">
        <Box className="iconWrapper">
          <ErrorOutlineIcon />
        </Box>
        <Box className="textWrapper">
          <Typography variant="h6">
            Following Measure already exist! kindly uncheck to proceed
          </Typography>
        </Box>
      </Box>
      <Box className="boxSecond">{duplicteTable()}</Box>
      <Box className="okButtonWrapper">
        <Button
          variant="contained"
          sx={{ marginLeft: "5px" }}
          size="small"
          data-testid="OkButton"
          onClick={modalRef.current.close}
        >
          Ok
        </Button>
      </Box>
    </Stack>
  );
};

export default InfoMessage;
