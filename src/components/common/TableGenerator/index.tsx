import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import isEmpty from "lodash/isEmpty";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Loader from "../Loader";

function TablePaginationActions(props, compProps) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0, "first");
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1, "back");
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1, "next");
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1),
      "last"
    );
  };

  return (
    <>
      <Box
        data-testid="tableBox"
        sx={classes.root}
        style={{
          paddingTop:
            compProps.selectedRecords &&
            compProps.selectedRecords.length &&
            !isEmpty(compProps.selectedRecords[0])
              ? "20px"
              : "0px",
        }}
      >
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
          {/* {theme?.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />} */}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
          {/* {theme?.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )} */}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
          {/* {theme?.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )} */}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
          {/* {theme?.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />} */}
        </IconButton>
      </Box>
      {compProps.selectedRecords &&
      compProps.selectedRecords.length &&
      !isEmpty(compProps.selectedRecords[0]) ? (
        <div style={{ display: "inline-block" }}>
          {" "}
          {compProps.selectedRecords.length} Record
          {compProps.selectedRecords.length === 1 ? "" : "s"} Selected{" "}
        </div>
      ) : null}
    </>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort, fields } = props;
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
              key={headCell.key}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.key ? order : false}
              sx={{ color: "custom.light" }}
            >
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
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   fields: PropTypes.array.isRequired,
// };

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
    fontSize: "12px",
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
  // onPageChange,
  onChangeSelected,
  onRowPerPageChange,
  rowOnePage = 10,
  size,
  ...props
}) => {
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState(initialSort);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowOnePage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    handleSortChange(`${isAsc ? "" : "-"}${property}`);
  };

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // const handleClick = (event, name) => {
  //   const selectedIndex = props.selectedRecords.findIndex(
  //     (val) => val.id === name.id
  //   );
  //   let newSelected = [];

  //   if (radio) {
  //     if (selectedIndex) {
  //       newSelected = [name];
  //     } else {
  //       newSelected = [];
  //     }
  //   } else {
  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(props.selectedRecords, name);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(props.selectedRecords.slice(1));
  //     } else if (selectedIndex === props.selectedRecords.length - 1) {
  //       newSelected = newSelected.concat(props.selectedRecords.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         props.selectedRecords.slice(0, selectedIndex),
  //         props.selectedRecords.slice(selectedIndex + 1)
  //       );
  //     }
  //   }
  //   onChangeSelected(newSelected);
  // };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    setPage(newPage);
    // onPageChange(newPage, towards);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onRowPerPageChange(event.target.value);
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      onChangeSelected(data);
    } else {
      onChangeSelected([]);
    }
  };

  const isSelected = (record) =>
    props.selectedRecords.findIndex((x) => x.id === record.id) !== -1;

  return (
    <Box sx={classes.root}>
      <Paper sx={classes.paper}>
        {/* <Loader visible={props.loader} /> */}
        <Table
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
          />
          <TableBody>
            <>
              <div style={{ textAlign: "center" }}>
                {" "}
                <Loader visible={props.loader} />
              </div>
              {!props.loader && data.length === 0 ? (
                <div
                  // className="d-flex align-items-center justify-content-center"
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
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[3, 5, 7, 8, 10, 25, 50, 100]}
                colSpan={fields.length}
                count={dataCount !== undefined ? dataCount : data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={(e) => TablePaginationActions(e, props)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Box>
  );
};

// TableGenerator.defaultProps = {
//   selectedRecords: [],
//   showSelectAll: true,
//   handleSortChange,
// };

export default withStyles({}, { withTheme: true })(TableGenerator);
