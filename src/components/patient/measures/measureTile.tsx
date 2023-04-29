import { Box, Button } from "@mui/material";
import { FC } from "react";
import { PatientMeasureListEntity } from "../../../graphql/Measure/types";
import { Accordion } from "../../common/Accordion";
import { useStyles } from "./measureStyle";

interface MeasureTileProps {
  measure: PatientMeasureListEntity;
  onClickTest?: (measure: PatientMeasureListEntity) => void;
  onClickScore?: (measure: PatientMeasureListEntity) => void;
}

export const MeasureTile: FC<MeasureTileProps> = ({
  measure,
  onClickTest,
  onClickScore,
}) => {
  const classes = useStyles();
  return (
    <Accordion
      title={measure.title}
      detail={
        <>
          <Box data-testid="score" className={classes.scoreDiv}>
            Current Score: {measure.score}
          </Box>
          <Box>
            <Button
              data-testid="view-score-btn"
              className={classes.actionButton}
              onClick={() => onClickScore(measure)}
            >
              View score
            </Button>
            <Button
              className={classes.actionButton}
              style={{ marginLeft: "60px" }}
              data-testid="take-test-btn"
              onClick={() => onClickTest(measure)}
            >
              Take test
            </Button>
          </Box>
        </>
      }
    />
  );
};
