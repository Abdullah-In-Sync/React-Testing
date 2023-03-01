import { Box, Button } from "@mui/material";
import { FC } from "react";
import { Measure } from "../../../graphql/Measure/types";
import { useStyles } from "./measureStyle";
import { Accordion } from "../../common/Accordion";

interface MeasureTileProps {
  measure: Measure;
  onClickTest?: (measure: Measure) => void;
  onClickScore?: (measure: Measure) => void;
}
export const MeasureTile: FC<MeasureTileProps> = ({
  measure,
  onClickTest,
  onClickScore,
}) => {
  const classes = useStyles();

  return (
    <Accordion
      title={measure.measure_cat_name}
      detail={
        <>
          <Box data-testid="score" className={classes.scoreDiv}>
            Current Score: {measure?.current_score}
          </Box>
          <Box>
            <Button
              data-testid="view-score-btn"
              className={classes.actionButton}
              onClick={() => onClickScore?.(measure)}
            >
              View score
            </Button>
            <Button
              className={classes.actionButton}
              style={{ marginLeft: "60px" }}
              data-testid="take-test-btn"
              onClick={() => onClickTest?.(measure)}
            >
              Take test
            </Button>
          </Box>
        </>
      }
    />
  );
};
