import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { withStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
// import Loader from "../Loader";

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, fields, handleSortChange } =
    props;
  /* istanbul ignore next */
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={classes.tableHead} data-testid="tableHead">
      <TableRow data-testid="tableRow">
        {fields
          .filter((x) => x.visible)
          .map((headCell) => (
            <TableCell
              data-testid={"tableColumn_" + headCell.key}
              key={headCell.key}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.key ? order : false}
              sx={{ color: "custom.light" }}
            >
              {handleSortChange ? (
                <TableSortLabel
                  active={orderBy === headCell.key}
                  direction={orderBy === headCell.key ? order : "asc"}
                  onClick={createSortHandler(headCell.key)}
                  sx={classes.headCell}
                >
                  {headCell.columnName}
                  {orderBy === headCell.key ? (
                    <Box sx={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              ) : (
                headCell.columnName
              )}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

const classes = {
  tableHead: {
    backgroundColor: "primary.main",
  },
  root: {
    width: "100%",
    display: "inline",
  },
  paper: {
    position: "relative",
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  headCell: {
    fontWeight: "bold",
    fontSize: "12px",
    width: "100%",
    textAlign: "center",
    lineHeight: "12px",
  },
  pagination: {
    fontSize: "10px",
  },
  tableRowSelected: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#ECF0F1",
    },
  },
  tableCell: {
    fontSize: "14px",
    marginLeft: "100px",
  },
};

const TableGenerator = ({
  fields = [],
  data = [],
  handleSortChange,
  currentPage = 0,
  initialSort = "",
  backendPagination = false,
  dataCount,
  onPageChange,
  onChangeSelected,
  // onRowPerPageChange,
  rowOnePage = 10,
  size,
  showPagination = true,
  onRowPerPageChange,
  ...props
}) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(initialSort);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowOnePage);

  /* istanbul ignore next */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    handleSortChange(`${isAsc ? "" : "-"}${property}`);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  /* istanbul ignore next */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  /* istanbul ignore next */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (typeof onRowPerPageChange === "function")
      onRowPerPageChange(event.target.value);
  };

  /* istanbul ignore next */
  const handleSelectAll = (selected) => {
    if (selected) {
      onChangeSelected(data);
    } else {
      onChangeSelected([]);
    }
  };

  /* istanbul ignore next */
  const isSelected = (record) =>
    props.selectedRecords.findIndex((x) => x.id === record.id) !== -1;

  return (
    <Box sx={classes.root}>
      <Paper sx={classes.paper}>
        {/* <Loader visible={props.loader} /> */}
        <Table
          data-testid="tableId"
          sx={classes.table}
          aria-labelledby="tableTitle"
          size={size}
          aria-label="enhanced table"
          style={{ minHeight: 122 }}
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={props.selectedRecords.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            fields={fields}
            data={data}
            showSelectAll={props.showSelectAll}
            selectedRecords={props.selectedRecords}
            onSelectAll={handleSelectAll}
            handleSortChange={handleSortChange}
          />
          <TableBody>
            <>
              {!props.loader && data.length === 0 ? (
                <div
                  style={{
                    position: "absolute",
                    height: "20%",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "list-item", textAlign: "center" }}>
                    {" "}
                    No records found
                  </div>
                </div>
              ) : (
                data
                  .slice(
                    backendPagination ? 0 : page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((record, index) => {
                    const isItemSelected = isSelected(record);

                    return (
                      <TableRow
                        data-testid="table-row"
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={record.id}
                        sx={classes.tableRowSelected}
                        selected={isItemSelected}
                        style={{ height: 10 }}
                      >
                        {fields
                          .filter((x) => x.visible)
                          .map((field) => (
                            <TableCell
                              key={field.key}
                              sx={classes.tableCell}
                              padding={field.padding ? "checkbox" : "normal"}
                              align="left"
                              colSpan={record[field.key]?.colSpan}
                              rowSpan={record[field.key]?.rowSpan}
                            >
                              {field.render &&
                              typeof field.render === "function"
                                ? field.render(record[field.key], record, index)
                                : record[field.key]}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })
              )}
            </>
          </TableBody>
          {showPagination && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  colSpan={fields.length}
                  count={dataCount !== undefined ? dataCount : data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  backIconButtonProps={{
                    "aria-label": "Previous Page",
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page",
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </Paper>
    </Box>
  );
};

export default withStyles({}, { withTheme: true })(TableGenerator);
