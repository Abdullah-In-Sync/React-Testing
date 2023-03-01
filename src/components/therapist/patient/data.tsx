import { Typography } from "@mui/material";
import moment from "moment";
import ActionsButtons from "./ActionsButtons";

interface Column {
  id: "date" | "source" | "resourceName" | "session" | "status" | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any) => string | JSX.Element;
}

const sourceLabel = (value) => {
  switch (value) {
    case "1":
      return "Resources";
    case "2":
      return "Agenda";
    case "3":
      return "Homework";
    case "4":
      return "Notes";
    default:
      return "";
  }
};

const statusLabel = (value) => {
  switch (value) {
    case "1":
      return "Shared";
    case "0":
      return "Assigned";
    default:
      return "";
  }
};

export const columns: readonly Column[] = [
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "center",
    format: (value) => (
      <Typography>{moment(value.created_date).format("DD-MM-YYYY")}</Typography>
    ),
  },
  {
    id: "source",
    label: "Source",
    minWidth: 100,
    align: "center",
    format: (value) => (
      <Typography>{sourceLabel(value.ptsharres_subfrom)}</Typography>
    ),
  },
  {
    id: "resourceName",
    label: "Resource Name",
    minWidth: 170,
    align: "center",
    format: (value) => {
      const { resource_name } = value.resource_data[0] || {};
      return <Typography>{resource_name}</Typography>;
    },
  },
  {
    id: "session",
    label: "Session",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.ptsharres_session}</Typography>,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => (
      <Typography>{statusLabel(value.ptsharres_status)}</Typography>
    ),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value, buttonClick) => (
      <ActionsButtons data={value} buttonClick={buttonClick} />
    ),
  },
];
