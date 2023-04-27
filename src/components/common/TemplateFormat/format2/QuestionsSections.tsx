import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { FormikProps } from "formik";
import * as React from "react";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

import { Typography } from "@material-ui/core";
import { useEffect } from "react";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import CommonButton from "../../Buttons/CommonButton";
import ConfirmBoxModal from "../../ConfirmBoxModal";
import { allAnsColSum, onAddQuesionBox, placeholderCellText } from "./helper";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
  handleDeleteQuestion: (value) => void;
  isView?: boolean;
  isResponse?: boolean;
}

const QuestionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
  isView,
  isResponse,
}) => {
  const confirmModalRef = React.useRef<ModalElement>(null);
  const { values, setFieldValue, errors, touched } = formikProps;

  const { templateData } = values;
  const { questions: { headerRow = [], bodyRows = [], footerRows = [] } = {} } =
    templateData;
  const { templateData: { questions: questionsTouched } = {} } = touched;
  const { templateData: { questions: questionsError } = {} } = errors;

  useEffect(() => {
    const setScore = () => {
      const { tableFooter, totalScore } = allAnsColSum(templateData);
      setFieldValue(`templateData.questions.footerRows`, tableFooter);
      setFieldValue(`templateData.totalScore`, totalScore);
    };
    if (isResponse) setScore();
  }, [templateData.questions.bodyRows, isResponse]);

  const onResponse = ({ name, columnName }) => {
    setFieldValue(`${name}.answer`, columnName);
  };

  const inputTextField = ({
    name,
    placeholder = "Type",
    value,
    rowIndex,
    columnName,
    row = {},
    type,
  }: any) => {
    const { answer } = row;
    if (isResponse && value && type === "bodyCell")
      return (
        <Box
          className={`viewValueWrapper`}
          onClick={() => onResponse({ name: rowIndex, columnName })}
        >
          <Typography
            data-testid={`row_${rowIndex}_${columnName}`}
            className={`${answer === columnName ? "answerActive" : ""}`}
          >
            {value}
          </Typography>
        </Box>
      );
    else
      return (
        <FormikTextField
          name={name}
          id={name}
          placeholder={placeholder}
          inputProps={{ "data-testid": name }}
          fullWidth
          multiline
          hideError
        />
      );
  };

  const tableHeader = () => {
    return (
      <TableHead className={`${isResponse ? "disbledFields" : ""}`}>
        <TableRow>
          {headerRow.map((column, i) => (
            <TableCell key={`tableHead_${column.id}`} align={column.align}>
              {inputTextField({
                name: `templateData.questions.headerRow.${i}.label`,
              })}
            </TableCell>
          ))}
          {!isView && !isResponse && <TableCell />}
        </TableRow>
      </TableHead>
    );
  };

  const tableBody = () => {
    return (
      <TableBody>
        {bodyRows.map((row, i) => {
          return (
            <TableRow role="checkbox" tabIndex={-1} key={`tableBodyRow_${i}`}>
              {templateData.questions.headerRow.map((column, columnIndex) => {
                const value =
                  columnIndex != 0
                    ? { value: row[column.id], columnName: column.id }
                    : {};
                return (
                  <TableCell
                    key={`tableBodyCell_${column.id}`}
                    align={column.align}
                  >
                    {inputTextField({
                      ...value,
                      rowIndex: `templateData.questions.bodyRows.${i}`,
                      name: `templateData.questions.bodyRows.${i}.${column.id}`,
                      row,
                      placeholder: placeholderCellText(
                        i,
                        columnIndex,
                        "bodyCell"
                      ),
                      type: "bodyCell",
                    })}
                  </TableCell>
                );
              })}
              {!isView && !isResponse && (
                <TableCell key={"deelte"}>
                  <DeleteButton
                    i={`templateData.questions.bodyRows.${i}`}
                    data-testId={`templateData.questions.bodyRows.${i}`}
                    onDelete={() => handleDeleteQuestion({ item: row, i })}
                  />
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  const tableFooter = () => {
    return (
      <TableFooter className={`${isResponse ? "disbledFields" : ""}`}>
        {footerRows.map((row, outerIndex) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={`tableFotterRow_${outerIndex}`}
            >
              {templateData.questions.headerRow.map((column, i) => {
                const value = column.id ? row[column.id] : undefined;
                const valueProps =
                  i != 0 ? { value, columnName: column.id } : {};

                if (value !== undefined) {
                  return (
                    <TableCell
                      key={`tableFotterCell_${column.id}`}
                      align={column.align}
                      className={`${
                        !isResponse && i === 0 ? "disbledFields" : ""
                      }`}
                    >
                      {inputTextField({
                        ...valueProps,
                        rowIndex: `templateData.questions.footerRows.${outerIndex}`,
                        name: `templateData.questions.footerRows.${outerIndex}.${column.id}`,
                        row,
                        placeholder: placeholderCellText(
                          outerIndex,
                          i,
                          "footerCell"
                        ),
                      })}
                    </TableCell>
                  );
                } else {
                  if (templateData.questions.headerRow.length - 1 === i)
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        colSpan={5}
                      >
                        {inputTextField({
                          ...valueProps,
                          row,
                          name: `templateData.questions.footerRows.${outerIndex}.colAvg`,
                        })}
                      </TableCell>
                    );
                  else return null;
                }
              })}
              {!isView && !isResponse && outerIndex === 0 && <TableCell />}
            </TableRow>
          );
        })}
      </TableFooter>
    );
  };

  return (
    <Box className="adminQuestions">
      {!isView && !isResponse && (
        <Box className="addQuestionButtonWrapper">
          <CommonButton
            variant="outlined"
            onClick={() =>
              onAddQuesionBox({ templateData, setFieldValue, confirmModalRef })
            }
            data-testid="addQuestionButton"
          >
            Add Question
          </CommonButton>
        </Box>
      )}
      <Box>
        <TableContainer className="tableContainer">
          <Table aria-label="spanning table">
            {tableHeader()}
            {tableBody()}
            {tableFooter()}
          </Table>
        </TableContainer>
      </Box>
      {questionsTouched && questionsError && (
        <ErrorMessage errorMsg={"All valid fields required"} />
      )}
      <ConfirmBoxModal
        infoMessage="You cannot add more than 15 questions. Please delete a question to add a new question"
        confirmModalRef={confirmModalRef}
      />
    </Box>
  );
};

export default QuestionsSection;
