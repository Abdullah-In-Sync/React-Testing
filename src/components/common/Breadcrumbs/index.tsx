import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

type Props = React.PropsWithChildren<{
  labels: Array<string>;
}>;

/* istanbul ignore next */
export const CustomBreadcrumbs = ({ labels = [] }: Props) => {
  const path = () => {
    return labels.map((label, i) => (
      <Typography
        key={`breadcrumb_${i}`}
        color={labels.length - 1 === i ? "text.primary" : "primary.main"}
      >
        {label}
      </Typography>
    ));
  };

  return (
    <Breadcrumbs
      separator={
        <ArrowRightAlt
          fontSize="small"
          sx={{
            color: "primary.main",
          }}
        />
      }
      aria-label="breadcrumb"
      data-testid="breadCrumb"
    >
      {path()}
    </Breadcrumbs>
  );
};
