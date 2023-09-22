import { Typography } from "@mui/material";
import ActionsButtons from "./ActionsButtons";

interface Column {
  id: string;
  addIndex?: boolean;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
  render?: (value, i?: number) => string;
  renderc?: any;
}

export const columns = (data, buttons): readonly Column[] => {
  const tableBodyCell = (value, buttonClick, item, i) => {
    const { id, addIndex } = item;
    switch (id) {
      case "actions":
        return (
          <ActionsButtons
            data={{ ...value, ...(addIndex ? { i } : {}) }}
            buttonClick={buttonClick}
            buttons={buttons}
          />
        );
      case "sNo":
        return <Typography>{i + 1}</Typography>;
      default:
        return <Typography>{value[id]}</Typography>;
    }
  };

  return data.map((item) => {
    return {
      ...item,
      ...{
        minWidth: 170,
        align: "center",
        format: (value, buttonClick, i) =>
          tableBodyCell(value, buttonClick, item, i),
      },
    };
  });
};
