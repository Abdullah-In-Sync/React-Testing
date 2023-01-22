import { MoreHoriz } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FormikProps } from "formik";
import { FC, useRef } from "react";
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
  const resizerRef = useRef();
  const divRef = useRef();

  const onMenuClick = (menu) => {
    if (menu.key == "ICL" || menu.key == "ICR") {
      const values = formikHelper.values.rows.map((row) => {
        row.cells.splice(menu.key == "ICL" ? index : index + 1, 0, {
          type: "",
          width: "250px",
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

  const onMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    const resizer: any | undefined = resizerRef.current;
    const div: any | undefined = divRef.current;
    const clientX = e.clientX;
    const deltaX = clientX - (resizer?._clientX || clientX);
    resizer._clientX = clientX;
    const t = divRef.current;
    // const b = resizer?.nextElementSibling;
    // UP
    let w =
      (div._width || Math.round(parseInt(getComputedStyle(t).width))) + deltaX;

    w = w < 193 ? 193 : w;

    div._width = w;

    const width = `${w}px`;

    console.log(width);

    const rows = formikHelper.values.rows.map((r) => {
      r.cells[index].width = width;
      return r;
    });
    formikHelper.setFieldValue(`rows`, rows);
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    (resizerRef.current as any)._clientX = null;
  };

  return (
    <Grid
      item
      container
      flex={1}
      className={classis.actionColumn}
      ref={divRef}
      data-testid={`action-menu-column-${index}`}
      style={{
        minWidth: formikHelper.values.rows[0].cells[index].width,
        width: formikHelper.values.rows[0].cells[index].width,
        maxWidth: formikHelper.values.rows[0].cells[index].width,
      }}
    >
      <Grid
        item
        justifyContent="center"
        alignItems={"center"}
        display={"flex"}
        style={{ flex: "1" }}
      >
        <span className={classis.actionColumnText}>Column - {index + 1}</span>
      </Grid>
      <Grid item justifySelf={"end"}>
        <ActionMenu
          onChange={onMenuClick}
          options={[
            ...(formikHelper.values.rows[0].cells.length <= 10
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
      <div
        ref={resizerRef}
        className={classis.resizerY}
        data-currentWidth={formikHelper.values.rows[0].cells[index].width}
        onMouseDown={onMouseDown}
      ></div>
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
  const resizerRef = useRef();
  const divRef = useRef();

  const onMenuClick = (menu) => {
    if (menu.key == "IRL" || menu.key == "IRR") {
      const values: TableCell[] = formikHelper.values.rows[0].cells.map((c) => {
        return {
          type: "",
          width: c.width,
        };
      });
      const rows = formikHelper.values.rows;
      rows.splice(menu.key == "IRL" ? index : index + 1, 0, {
        cells: values,
        height: "200px",
      });
      formikHelper.setFieldValue("rows", rows);
    } else if (menu.key == "DR") {
      const rows = formikHelper.values.rows;
      rows.splice(index, 1);
      formikHelper.setFieldValue("rows", rows);
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    e.preventDefault();
    const resizer: any | undefined = resizerRef.current;
    const clientY = e.clientY;
    const deltaY = clientY - (resizer?._clientY || clientY);
    resizer._clientY = clientY;
    const t = divRef.current;
    let h = Math.round(parseInt(getComputedStyle(t).height) + deltaY);
    h = h < 143 ? 143 : h;
    formikHelper.setFieldValue(`rows[${index}].height`, `${h < 10 ? 0 : h}px`);
  };

  const onMouseUp = (e) => {
    e.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    (resizerRef.current as any)._clientY = null;
  };

  return (
    <Grid
      item
      className={classis.actionRow}
      display={"flex"}
      alignItems={"center"}
      flexDirection="column"
      data-testid={`action-menu-row-${index}`}
      style={{ minHeight: formikHelper.values.rows[index].height }}
      ref={divRef}
    >
      <Grid item justifySelf={"end"}>
        <ActionMenu
          onChange={onMenuClick}
          icon={<MoreHoriz />}
          options={[
            ...(formikHelper.values.rows.length <= 50
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
      <div
        ref={resizerRef}
        className={classis.resizerX}
        onMouseDown={onMouseDown}
      ></div>
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
  resizerX: {
    zIndex: 2,
    cursor: "row-resize",
    height: "10px",
    width: "100%",
    backgroundColor: "#6EC9DB",
  },
  resizerY: {
    zIndex: 2,
    cursor: "col-resize",
    height: "100%",
    width: "10px",
    backgroundColor: "#7EBCA7",
    // "&::before": {
    //   content: '" "',
    //   width: "16px",
    //   height: "5px",
    //   margin: "0px",
    //   background: "lightgray",
    // },
    // "&::after": {
    //   content: '" "',
    //   width: "16px",
    //   height: "5px",
    //   margin: "0px",
    //   background: "lightgray",
    // },
  },
});
