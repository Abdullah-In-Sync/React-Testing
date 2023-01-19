import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import { Measure } from "../../../graphql/Measure/types";
import { useStyles } from "./measureStyle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={classes.wrapper} data-testid={`list-tile`}>
      <Box
        className={classes.tileHeader}
        display="flex"
        justifyContent={"space-between"}
      >
        <span data-testid="name">{measure.measure_cat_name}</span>
        {!isOpen ? (
          <AddIcon
            data-testid="toggleContent"
            className={classes.iconButton}
            onClick={toggleContent}
          />
        ) : (
          <RemoveIcon
            data-testid="toggleContent"
            className={classes.iconButton}
            onClick={toggleContent}
          />
        )}
      </Box>
      {isOpen && (
        <Box className={classes.contentWrapper}>
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
        </Box>
      )}
    </Box>
  );
};
