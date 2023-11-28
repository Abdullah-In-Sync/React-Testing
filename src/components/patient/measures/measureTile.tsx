import { Box, Button } from "@mui/material";
import { FC } from "react";
import { PatientMeasureListEntity } from "../../../graphql/Measure/types";
import { Accordion } from "../../common/Accordion";
import { useStyles } from "./measureStyle";
import SessionBoxLabel from "../../common/SessionLabel";

interface MeasureTileProps {
  sessionObj?: any;
  measure?: PatientMeasureListEntity;
  onClickTest?: (measure: PatientMeasureListEntity) => void;
  onClickScore?: (measure: PatientMeasureListEntity) => void;
  isTakeTest?: any;
  isViewScore?: any;
}

export const MeasureTile: FC<MeasureTileProps> = ({
  measure,
  onClickTest,
  onClickScore,
  sessionObj,
  isViewScore,
  isTakeTest,
}) => {
  const classes = useStyles();
  const { label = "start" } = sessionObj || {};

  return (
    <Box className={classes.accordionWrapper}>
      <Accordion
        title={measure.title}
        actionButtons={<SessionBoxLabel label={label} />}
        detail={
          <>
            <Box data-testid="score" className={classes.scoreDiv}>
              Current Score: {measure.score}
            </Box>
            <Box>
              {(isViewScore === true || isViewScore === undefined) && (
                <Button
                  data-testid="view-score-btn"
                  className={"actionButton"}
                  onClick={() => onClickScore(measure)}
                >
                  View score
                </Button>
              )}

              {(isTakeTest === true || isTakeTest === undefined) && (
                <Button
                  className={"actionButton"}
                  style={{ marginLeft: "60px" }}
                  data-testid="take-test-btn"
                  onClick={() => onClickTest(measure)}
                >
                  Take test
                </Button>
              )}
            </Box>
          </>
        }
      />
    </Box>
  );
};
