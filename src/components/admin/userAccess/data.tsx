import { Typography } from "@mui/material";
import ActionsButtons from "../safetyPlan/ActionsButtons";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
}

export const userRoleColumns: readonly Column[] = [
  {
    id: "userRole",
    label: "User Role",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.userRole}</Typography>,
  },
  {
    id: "organization",
    label: "Organisation",
    minWidth: 100,
    align: "center",
    format: (value) => <Typography>{value.organization}</Typography>,
  },
  {
    id: "accessibility",
    label: "Accessibility",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return (
        <Typography className="planType">{value.accessibility}</Typography>
      );
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
