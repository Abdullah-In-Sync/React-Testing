import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as React from "react";
import { GetAdminModuleList } from "../../graphql/userRole/types";
import { useStyles } from "./tableAddUserRoleStyles";

interface ViewProps {
  modulesData: GetAdminModuleList;
  formikProps?: any;
  onChangePrivilege?: any;
}

const TableAddUserRole: React.FC<ViewProps> = ({
  modulesData,
  formikProps,
  onChangePrivilege,
}) => {
  const styles = useStyles();
  const {
    values: { privileges, accessibility },
  } = formikProps;
  const { modulelist, privileges: privilegesData } = modulesData;

  return (
    <div className={styles.tablePaper}>
      <TableContainer className="tableContainer">
        <Table
          stickyHeader
          className={styles.table}
          aria-label="simple table"
          style={{ tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={styles.stickyHeader} align="center">
                Modules
              </TableCell>
              {privilegesData.map((item) => {
                return (
                  <TableCell key={`prev_${item._id}`} align="center">
                    {item.name}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {modulelist
              .filter((item) =>
                accessibility
                  ? item.accessibility.includes(accessibility)
                  : true
              )
              .map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    className={styles.sticky}
                    component="th"
                    scope="row"
                    align="center"
                  >
                    <Typography
                      className={
                        privileges[row.name]?.length > 0 ? "activeModule" : ""
                      }
                    >
                      <span> {row.name} </span>
                    </Typography>
                  </TableCell>
                  {privilegesData.map((item) => {
                    return (
                      <TableCell key={item._id} align="center">
                        <FormControlLabel
                          data-testid={`${row._id}_${item._id}_check`}
                          control={
                            <Checkbox
                              checked={
                                privileges[row.name]?.indexOf(item._id) > -1
                              }
                              onChange={() => onChangePrivilege(row, item)}
                              name={row.name}
                              value={item._id}
                              disabled={!row.privileges.includes(item._id)}
                            />
                          }
                          label={null}
                          style={{ marginLeft: 10 }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableAddUserRole;
