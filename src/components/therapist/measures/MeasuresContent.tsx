import { Box, Typography } from "@mui/material";
import * as React from "react";
import MeasuresList from "./list/MeasuresList";
import { useStyles } from "./measuresStyles";

import { TherapistListMeasuresEntity } from "../../../graphql/Measure/types";
import CommonButton from "../../common/Buttons/CommonButton";

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  onClickCreateMeasure: () => void;
  actionButtonClick: (value) => void;
};

const MeasuresContent: React.FC<ViewProps> = ({
  listData,
  onClickCreateMeasure,
  actionButtonClick,
}) => {
  const styles = useStyles();

  const topHeader = () => {
    return (
      <Box className="topHeaderWrapper">
        <Box className="topHeaderFirstSection">
          <Typography variant="subtitle1">Measures</Typography>
        </Box>
        <Box className="topHeaderSecondSection">
          <CommonButton
            variant="contained"
            onClick={onClickCreateMeasure}
            data-testid="addQuestionButton"
          >
            Create Measure
          </CommonButton>
          <CommonButton
            variant="contained"
            onClick={null}
            data-testid="addQuestionButton"
          >
            Add Measure
          </CommonButton>
        </Box>
      </Box>
    );
  };

  return (
    <Box className={styles.measuresWrapper}>
      {topHeader()}
      <MeasuresList listData={listData} actionButtonClick={actionButtonClick} />
    </Box>
  );
};

export default MeasuresContent;
