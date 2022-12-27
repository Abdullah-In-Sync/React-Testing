import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Measure } from "../../../graphql/query/Measure/types";
import { useStyles } from "./measureStyle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface MeasureTileProps {
  measure: Measure;
}
export const MeasureTile: FC<MeasureTileProps> = ({ measure }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const classes = useStyles();

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  const onClickTest = () => {
    router.push(`/patient/test/${measure._id}`);
  };
  const onClickScore = () => {
    console.debug("im here");
    router.push(`/patient/score/${measure._id}`);
  };

  return (
    <Box
      className={classes.wrapper}
      style={{ border: "1px solid rgb(107 160 142)" }}
      data-testid="list-tile"
    >
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
            Current Score: 9
          </Box>
          <Box>
            <Button
              data-testid="view-score-btn"
              className={classes.actionButton}
              onClick={onClickScore}
            >
              View score
            </Button>
            <Button
              className={classes.actionButton}
              style={{ marginLeft: "60px" }}
              data-testid="take-test-btn"
              onClick={onClickTest}
            >
              Test
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
