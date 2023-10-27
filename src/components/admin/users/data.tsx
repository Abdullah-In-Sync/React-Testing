import { Typography } from "@mui/material";
import ActionsButtons from "../agenda/ActionsButtons";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
}

export const usersColumns: readonly Column[] = [
  {
    id: "FirstName",
    label: "First name",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.first_name}</Typography>,
  },
  {
    id: "LastName",
    label: "Last name",
    minWidth: 100,
    align: "center",
    format: (value) => <Typography>{value.last_name}</Typography>,
  },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return <Typography className="planType">{value.role}</Typography>;
    },
  },
  {
    id: "organisation",
    label: "Organisation",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return <Typography className="planType">{value.organisation}</Typography>;
    },
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
