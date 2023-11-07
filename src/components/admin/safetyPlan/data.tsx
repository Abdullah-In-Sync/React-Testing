import { Typography } from "@mui/material";
import ActionsButtons from "./ActionsButtons";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value, callback: any, i?: number) => string | JSX.Element;
}

export const columns: readonly Column[] = [
  {
    id: "sNo",
    label: "S. No.",
    minWidth: 170,
    align: "center",
    format: (value, _, i) => <Typography>{i + 1}</Typography>,
  },
  {
    id: "planName",
    label: "Plan Name",
    minWidth: 100,
    align: "center",
    format: (value) => <Typography>{value.name}</Typography>,
  },
  {
    id: "planType",
    label: "Plan Type",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return <Typography className="planType">{value.plan_type}</Typography>;
    },
  },
  {
    id: "Organisation",
    label: "Organisation",
    minWidth: 170,
    align: "center",
    format: (value) => <Typography>{value.organization_name}</Typography>,
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value, buttonClick) => (
      <ActionsButtons
        data={value}
        buttonClick={buttonClick}
        view={"safetyPlan"}
      />
    ),
  },
];
