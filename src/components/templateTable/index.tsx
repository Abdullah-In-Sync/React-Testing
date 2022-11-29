import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Grid,
  TextField,
} from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikProps } from "formik";
import { FC, useContext, useMemo } from "react";
import withViewModel from "../../hoc/withModal";
import { ActionMenu } from "../common/Menu";
import SingleSelectComponent from "../common/SelectBox/SingleSelect/SingleSelectComponent";
import TextFieldComponent from "../common/TextField/TextFieldComponent";
import TemplateTableViewModel, {
  TableCell,
  TableRow,
  TemplateFormData,
  TemplateTableContext,
} from "./table.model";

interface TemplateTableProps {
  mode: "view" | "edit";
  initialData?: TemplateFormData;
  onSubmit?: (
    formData: TemplateFormData,
    formikHelper: FormikProps<TemplateFormData>
  ) => void;
}
const TemplateTable: React.FC<TemplateTableProps> = ({
  mode,
  initialData,
  onSubmit,
}) => {
  const { validationSchema } = useContext(TemplateTableContext);

  return (
    <Formik<TemplateFormData>
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formikHelper) => {
        return (
          <Form>
            <Grid container>
              <FieldArray
                name="rows"
                render={(arrayHelper) =>
                  formikHelper?.values?.rows.map((row, rowIndex) => (
                    <TemplateTableRow
                      key={rowIndex}
                      rowData={row}
                      rowIndex={rowIndex}
                      formikHelper={formikHelper}
                    />
                  ))
                }
              />
            </Grid>
            <Button data-testid="submit" type="submit">
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default withViewModel(TemplateTable, new TemplateTableViewModel());

interface TemplateTableRowProps {
  rowIndex: number;
  rowData: TableRow;
  formikHelper: FormikProps<TemplateFormData>;
}

const TemplateTableRow: FC<TemplateTableRowProps> = ({
  rowIndex,
  rowData,
  formikHelper,
}) => {
  return (
    <Grid container data-testid="row">
      <FieldArray
        name="cells"
        render={(arrayHelper) =>
          rowData?.cells?.map((cell, index) => (
            <TemplateTableCell
              key={index}
              cellData={cell}
              cellIndex={index}
              rowIndex={rowIndex}
              formikHelper={formikHelper}
            />
          ))
        }
      />
    </Grid>
  );
};

interface TemplateTableCellProps {
  cellIndex: number;
  rowIndex: number;
  cellData: TableCell;
  formikHelper: FormikProps<TemplateFormData>;
}

const TemplateTableCell: FC<TemplateTableCellProps> = ({
  rowIndex,
  cellIndex,
  cellData,
  formikHelper,
}) => {
  const formCellKey = useMemo(() => {
    return `rows[${rowIndex}].cells[${cellIndex}]`;
  }, [rowIndex, cellIndex]);
  return (
    <Grid
      item
      data-testid="cell"
      flex={1}
      style={{
        ...(cellIndex == 0 ? { borderLeft: "1px solid #000000" } : {}),
        ...(rowIndex == 0 ? { borderTop: "1px solid #000000" } : {}),
        borderRight: "1px solid #000000",
        borderBottom: "1px solid #000000",
        position: "relative",
        minHeight: cellData?.type ? "auto" : "483px",
      }}
    >
      <div style={{ position: "absolute", right: 0, top: 0 }}>
        <ActionMenu
          options={[
            {
              key: "header",
              value: "Cell Title",
            },
            {
              key: "answer",
              value: "Answer Type",
            },
          ]}
          onChange={(event) =>
            cellData.type != event?.type &&
            formikHelper?.setFieldValue(`${formCellKey}`, {
              type: event?.key,
            })
          }
        />
      </div>
      {cellData.type == "answer" && (
        <AnswerType
          formCellKey={formCellKey}
          cellData={cellData}
          formikHelper={formikHelper}
        />
      )}
      {cellData.type == "header" && (
        <CellHeader
          formCellKey={formCellKey}
          cellData={cellData}
          formikHelper={formikHelper}
        />
      )}
    </Grid>
  );
};

interface CellHeaderProps {
  formCellKey: string;
  cellData: TableCell;
  formikHelper?: FormikProps<TemplateFormData>;
}

const CellHeader: FC<CellHeaderProps> = ({
  formCellKey,
  cellData,
  formikHelper,
}) => {
  return (
    <Grid container direction={"column"} padding={"13px 29px 13px 20px"}>
      <TextFieldComponent
        id={`${formCellKey}.title`}
        label="Please write question here"
        value={cellData?.title}
        name={`${formCellKey}.title`}
        onChange={formikHelper?.handleChange}
        inputProps={`${formCellKey}.title`}
        variant="outlined"
        className="form-control-bg"
        size="small"
        extraProps={{
          error:
            formikHelper.getFieldMeta(`${formCellKey}.title`).touched &&
            Boolean(formikHelper.getFieldMeta(`${formCellKey}.title`).error),
          helperText:
            formikHelper.getFieldMeta(`${formCellKey}.title`).touched &&
            formikHelper.getFieldMeta(`${formCellKey}.title`).error,
        }}
      />
      <Box sx={{ mt: "7px" }} />
      <TextFieldComponent
        id={`${formCellKey}.description`}
        label="Please add question description here"
        value={cellData?.description}
        name={`${formCellKey}.description`}
        onChange={formikHelper?.handleChange}
        inputProps={`${formCellKey}.description`}
        variant="outlined"
        className="form-control-bg"
        size="small"
        extraProps={{
          error:
            formikHelper.getFieldMeta(`${formCellKey}.description`).touched &&
            Boolean(
              formikHelper.getFieldMeta(`${formCellKey}.description`).error
            ),
          helperText:
            formikHelper.getFieldMeta(`${formCellKey}.description`).touched &&
            formikHelper.getFieldMeta(`${formCellKey}.description`).error,
        }}
        // error={formikHelper.touched.email && Boolean(formik.errors.email)}
        // helperText={formik.touched.email && formik.errors.email}
      />
    </Grid>
  );
};

interface AnswerTypeProps {
  formCellKey: string;
  cellData: TableCell;
  formikHelper?: FormikProps<TemplateFormData>;
}
const AnswerType: FC<AnswerTypeProps> = ({
  formCellKey,
  cellData,
  formikHelper,
}) => {
  const answerType = [
    {
      id: "text",
      value: "Free Text",
    },
    {
      id: "boolean",
      value: "Yes / No",
    },
    {
      id: "list",
      value: "List",
    },
  ];

  const onChangeAnswerType = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    formikHelper.setFieldValue(formCellKey, {
      ...cellData,
      answerType: value,
      answerValues: null,
    });
  };

  return (
    <Grid container direction={"column"} padding={"13px 29px 13px 20px"}>
      <SingleSelectComponent
        fullWidth={true}
        id={`${formCellKey}.answerType`}
        labelId="Answer Type"
        name={`${formCellKey}.answerType`}
        value={cellData?.answerType}
        label="Select Answer Type"
        onChange={onChangeAnswerType}
        inputProps={{ "data-testid": `${formCellKey}.answerType` }}
        options={answerType}
        mappingKeys={["id", "value"]}
        size="small"
        className="form-control-bg"
        extraProps={{
          error:
            formikHelper.getFieldMeta(`${formCellKey}.answerType`).touched &&
            Boolean(
              formikHelper.getFieldMeta(`${formCellKey}.answerType`).error
            ),
          helperText:
            formikHelper.getFieldMeta(`${formCellKey}.answerType`).touched &&
            formikHelper.getFieldMeta(`${formCellKey}.answerType`).error,
        }}
      />
      {cellData.answerType == "list" && (
        <>
          <Box sx={{ mt: "7px" }} />
          <Autocomplete
            data-testid={`${formCellKey}.answerValues`}
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={(cellData?.answerValues as Array<any>) || []}
            onChange={(_, val) => {
              formikHelper.setFieldValue(`${formCellKey}.answerValues`, val);
            }}
            freeSolo
            renderTags={(value: string[][], getTagProps) =>
              value.map((option: string[], index: number) => {
                return (
                  <Chip
                    key={index}
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Add Options"
                placeholder="Add Options"
                name={`${formCellKey}.answerValues`}
                size="small"
                className="form-control-bg"
                {...{
                  error:
                    formikHelper.getFieldMeta(`${formCellKey}.answerValues`)
                      .touched &&
                    Boolean(
                      formikHelper.getFieldMeta(`${formCellKey}.answerValues`)
                        .error
                    ),
                  helperText:
                    formikHelper.getFieldMeta(`${formCellKey}.answerValues`)
                      .touched &&
                    formikHelper.getFieldMeta(`${formCellKey}.answerValues`)
                      .error,
                }}
              />
            )}
          />
        </>
      )}
    </Grid>
  );
};
