import ArrowBackAlt from "@mui/icons-material/ArrowBack";
import { Button, Grid } from "@mui/material";
import React from "react";
import { CustomBreadcrumbs } from "../Breadcrumbs";
import CardWithHeader from "../Cards/CardWithHeader";
import { useStyles } from "./BreadCrumbsWidhtBackButtonStyles";

type Props = React.PropsWithChildren<{
  breadCrumbsLabels?: Array<string>;
  heading?: string;
  backButtonClick?: () => void;
  onClickView?: () => void;
}>;

/* istanbul ignore next */
const BreadCrumbsWithBackButton = ({
  children,
  breadCrumbsLabels = [],
  heading = "",
  backButtonClick,
  onClickView,
}: Props) => {
  const styles = useStyles();

  return (
    <>
      <Grid
        xs={6}
        display="flex"
        flex-direction="row-reverse"
        sx={{
          color: "primary.main",
        }}
        className={styles.backButtonBreadcrumbsWrapper}
      >
        {backButtonClick && (
          <Button
            data-testid="backButton"
            variant="contained"
            onClick={backButtonClick}
            startIcon={<ArrowBackAlt />}
          >
            Back
          </Button>
        )}
        <CustomBreadcrumbs labels={breadCrumbsLabels} />
      </Grid>
      <CardWithHeader label={heading} onClickView={onClickView}>
        {children}
      </CardWithHeader>
    </>
  );
};

export default BreadCrumbsWithBackButton;
