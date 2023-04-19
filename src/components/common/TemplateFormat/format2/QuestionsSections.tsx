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

import { ModalElement } from "../../../common/CustomModal/CommonModal";
import CommonButton from "../../Buttons/CommonButton";
import ConfirmBoxModal from "../../ConfirmBoxModal";
import { uniqueString } from "../../../../utility/helper";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat2>;
  handleDeleteQuestion: (value) => void;
  isView?: boolean;
}

const QuestionsSection: React.FC<ViewProps> = ({
  formikProps,
  handleDeleteQuestion,
  isView,
}) => {
  const confirmModalRef = React.useRef<ModalElement>(null);
  const { values, setFieldValue, errors, touched } = formikProps;

  const { templateData } = values;
  const { templateData: { questions: questionsTouched } = {} } = touched;
  const { templateData: { questions: questionsError } = {} } = errors;

  const onAddQuesionBox = () => {
    if (templateData.questions.bodyRows.length < 15) {
      const questionsBodyRows = [...templateData.questions.bodyRows];
      questionsBodyRows.push({
        id: uniqueString(),
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
      });
      setFieldValue("templateData.questions.bodyRows", questionsBodyRows);
    } else {
      confirmModalRef.current?.open();
    }
  };

  const inputTextField = (name) => {
    return (
      <FormikTextField
        name={name}
        id={name}
        placeholder={"Type"}
        inputProps={{ "data-testid": name }}
        fullWidth
        multiline
        hideError
      />
    );
  };

  const tableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          {templateData.questions.headerRow.map((column, i) => (
            <TableCell key={`tableHead_${column.id}`} align={column.align}>
              {inputTextField(`templateData.questions.headerRow.${i}.label`)}
            </TableCell>
          ))}
          {!isView && <TableCell />}
        </TableRow>
      </TableHead>
    );
  };

  const tableBody = () => {
    return (
      <TableBody>
        {templateData.questions.bodyRows.map((item, i) => {
          return (
            <TableRow role="checkbox" tabIndex={-1} key={`tableBodyRow_${i}`}>
              {templateData.questions.headerRow.map((column) => {
                return (
                  <TableCell
                    key={`tableBodyCell_${column.id}`}
                    align={column.align}
                  >
                    {inputTextField(
                      `templateData.questions.bodyRows.${i}.${column.id}`
                    )}
                  </TableCell>
                );
              })}
              {!isView && (
                <TableCell key={"deelte"}>
                  <DeleteButton
                    i={`templateData.questions.bodyRows.${i}`}
                    data-testId={`templateData.questions.bodyRows.${i}`}
                    onDelete={() => handleDeleteQuestion({ item, i })}
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
      <TableFooter>
        {templateData.questions.footerRows.map((row, outerIndex) => {
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={`tableFotterRow_${outerIndex}`}
            >
              {templateData.questions.headerRow.map((column, i) => {
                const value = column.id ? row[column.id] : undefined;
                if (value !== undefined) {
                  return (
                    <TableCell
                      key={`tableFotterCell_${column.id}`}
                      align={column.align}
                    >
                      {inputTextField(
                        `templateData.questions.footerRows.${outerIndex}.${column.id}`
                      )}
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
                        {inputTextField(
                          `templateData.questions.footerRows.${outerIndex}.colAvg`
                        )}
                      </TableCell>
                    );
                  else return null;
                }
              })}
              {!isView && outerIndex === 0 && <TableCell />}
            </TableRow>
          );
        })}
      </TableFooter>
    );
  };

  return (
    <Box className="adminQuestions">
      {!isView && (
        <Box className="addQuestionButtonWrapper">
          <CommonButton
            variant="outlined"
            onClick={onAddQuesionBox}
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
        infoMessage="You cannot add more than 15 questions, Please delete a question to add a new question"
        confirmModalRef={confirmModalRef}
      />
    </Box>
  );
};

export default QuestionsSection;
