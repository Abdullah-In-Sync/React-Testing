import { MoreHoriz } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormikProps } from "formik";
import { FC } from "react";
import { ActionMenu } from "../common/Menu";
import { TableCell, TemplateFormData } from "./table.model";

export interface ColumnActionTitleProps {
  index: number;
  formikHelper?: FormikProps<TemplateFormData>;
}

export const ColumnActionTitle: FC<ColumnActionTitleProps> = ({
  index,
  formikHelper,
}) => {
  const classis = useStyles();

  const onMenuClick = (menu) => {
    if (menu.key == "ICL" || menu.key == "ICR") {
      const values = formikHelper.values.rows.map((row) => {
        row.cells.splice(menu.key == "ICL" ? index : index + 1, 0, {
          type: "",
        });
        return row;
      });
      formikHelper.setFieldValue("rows", values);
    } else if (menu.key == "DC") {
      const values = formikHelper.values.rows.map((row) => {
        row.cells.splice(index, 1);
        return row;
      });
      formikHelper.setFieldValue("rows", values);
    }
  };

  return (
    <Grid
      item
      container
      flex={1}
      className={classis.actionColumn}
      style={{ minWidth: "33.33%" }}
      data-testid={`action-menu-column-${index}`}
    >
      <Grid
        item
        flex={1}
        justifyContent="center"
        alignItems={"center"}
        display={"flex"}
      >
        <span className={classis.actionColumnText}>Column - {index + 1}</span>
      </Grid>
      <Grid item justifySelf={"end"}>
        <ActionMenu
          onChange={onMenuClick}
          options={[
            ...(formikHelper.values.rows[0].cells.length <= 15
              ? [
                  {
                    key: "ICL",
                    value: "Insert column left",
                  },
                  {
                    key: "ICR",
                    value: "Insert column right",
                  },
                ]
              : []),
            ...(formikHelper.values.rows[0].cells.length > 1
              ? [
                  {
                    key: "DC",
                    value: "Delete column",
                  },
                ]
              : []),
          ]}
        />
      </Grid>
    </Grid>
  );
};

export interface RowActionTitleProps {
  index: number;
  formikHelper: FormikProps<TemplateFormData>;
}

export const RawActionTitle: FC<RowActionTitleProps> = ({
  index,
  formikHelper,
}) => {
  const classis = useStyles();

  const onMenuClick = (menu) => {
    if (menu.key == "IRL" || menu.key == "IRR") {
      const values: TableCell[] = formikHelper.values.rows[0].cells.map(() => {
        return {
          type: "",
        };
      });
      const rows = formikHelper.values.rows;
      rows.splice(menu.key == "IRL" ? index : index + 1, 0, { cells: values });
      formikHelper.setFieldValue("rows", rows);
    } else if (menu.key == "DR") {
      const rows = formikHelper.values.rows;
      rows.splice(index, 1);
      formikHelper.setFieldValue("rows", rows);
    }
  };

  return (
    <Grid
      item
      className={classis.actionRow}
      display={"flex"}
      alignItems={"center"}
      flexDirection="column"
      data-testid={`action-menu-row-${index}`}
    >
      <Grid item justifySelf={"end"}>
        <ActionMenu
          onChange={onMenuClick}
          icon={<MoreHoriz />}
          options={[
            ...(formikHelper.values.rows.length <= 25
              ? [
                  {
                    key: "IRL",
                    value: "Insert row above",
                  },
                  {
                    key: "IRR",
                    value: "Insert row below",
                  },
                ]
              : []),
            ...(formikHelper.values.rows.length > 1
              ? [
                  {
                    key: "DR",
                    value: "Delete row",
                  },
                ]
              : []),
          ]}
        />
      </Grid>
      <Grid
        item
        flex={1}
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <div className={classis.actionRowText}> Row - {index + 1} </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  actionColumn: {
    background: "#E0F9F0",
    border: "1px solid #7EBCA7",
    textAlign: "center",
    height: "58px",
  },
  actionColumnText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    color: "#6DA08F",
  },
  actionRow: {
    background: "#E3F8FC",
    border: "1px solid #6EC9DB",
    textAlign: "center",
    maxWidth: "58px",
  },
  actionRowText: {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "center",
    color: "#30B4CE",
    minWidth: "max-content",
    transform: " rotate(-89.34deg)",
  },
});
