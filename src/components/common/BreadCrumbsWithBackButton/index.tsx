import ArrowBackAlt from "@mui/icons-material/ArrowBack";
import ArrowForwardAlt from "@mui/icons-material/ArrowForward";
import { Button, Grid } from "@mui/material";
import React from "react";
import CardWithHeader from "../Cards/CardWithHeader";
import { useStyles } from "./BreadCrumbsWidhtBackButtonStyles";

type Props = React.PropsWithChildren<{
  breadCrumbsLabels?: Array<string>;
  heading?: string;
  backButtonClick?: () => void;
  nexButtonClick?: () => void;
  onClickView?: () => void;
  activeBoxBorder?: boolean;
  mode?: string;
  headerRightComponent?: any;
  view?: string;
  downloadUrl?: string;
  isTrue?: any;
}>;

/* istanbul ignore next */
const BreadCrumbsWithBackButton = ({
  children,
  heading = "",
  backButtonClick,
  onClickView,
  activeBoxBorder,
  nexButtonClick,
  mode,
  headerRightComponent,
  view,
  downloadUrl,
  isTrue,
}: Props) => {
  const styles = useStyles();

  return (
    <>
      <Grid
        item
        xs={6}
        display="flex"
        flex-direction="row-reverse"
        sx={{
          color: "primary.main",
        }}
        className={styles.backButtonBreadcrumbsWrapper}
      >
        <div>
          {backButtonClick && (
            <Button
              data-testid="backButton"
              variant="contained"
              onClick={backButtonClick}
              startIcon={<ArrowBackAlt />}
              size="small"
            >
              Back
            </Button>
          )}
          {nexButtonClick && (
            <Button
              className="nextButton"
              data-testid="nextButton"
              variant="contained"
              onClick={nexButtonClick}
              endIcon={<ArrowForwardAlt />}
              size="small"
            >
              Next
            </Button>
          )}
        </div>
        {/* <CustomBreadcrumbs labels={breadCrumbsLabels} /> */}
      </Grid>
      <CardWithHeader
        label={heading}
        onClickView={onClickView}
        activeBoxBorder={activeBoxBorder}
        mode={mode}
        rightComponent={headerRightComponent}
        view={view}
        downloadUrl={downloadUrl}
        isTrue={isTrue}
      >
        {children}
      </CardWithHeader>
    </>
  );
};

export default BreadCrumbsWithBackButton;
