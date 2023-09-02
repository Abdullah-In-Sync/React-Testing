import { Typography } from "@mui/material";
import ActionsButtons from "./ActionsButtons";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
}

export const agendaColumns: readonly Column[] = [
  {
    id: "sNo",
    label: "Session No.",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.session_id}</Typography>,
  },
  {
    id: "Agenda",
    label: "Agenda",
    minWidth: 100,
    align: "center",
    format: (value) => <Typography>{value.agenda_name}</Typography>,
  },
  {
    id: "Order",
    label: "Order",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return (
        <Typography className="planType">{value.display_order}</Typography>
      );
    },
  },
  {
    id: "Therapy",
    label: "Therapy",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.therapy_name}</Typography>,
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
