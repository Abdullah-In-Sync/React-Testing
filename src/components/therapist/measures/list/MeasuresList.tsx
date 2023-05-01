import { Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useSnackbar } from "notistack";
import { TherapistListMeasuresEntity } from "../../../../graphql/Measure/types";
import { Accordion } from "../../../common/Accordion";
import CommonButton from "../../../common/Buttons/CommonButton";
import ActionsButtons from "./ActionsButtons";
import { isAfter } from "../../../../utility/helper";

type ViewProps = {
  listData: TherapistListMeasuresEntity[];
  actionButtonClick: (value) => void;
};

const MeasuresList: React.FC<ViewProps> = ({
  /* istanbul ignore next */
  listData = [],
  actionButtonClick,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  /* istanbul ignore next */
  const handleTakeTest = (item) => {
    const { score_date } = item;
    if (isAfter({ date: score_date }))
      actionButtonClick({ ...item, ...{ pressedIconButton: "takeTest" } });
    else
      enqueueSnackbar("Today’s test has been taken already", {
        variant: "info",
      });
  };

  const handleViewScore = (item) => {
    actionButtonClick({
      ...item,
      ...{ pressedIconButton: "viewscores" },
    });
  };

  const accordionDetail = (item, i) => {
    const { score } = item;
    return (
      <Box className="accordionDetailWrapper">
        <Box className="detailFirst">
          <Typography variant="h6">{`Current Score: ${score}`}</Typography>
        </Box>
        <Box className="detailSecond">
          <CommonButton
            variant="contained"
            className="scoreButton"
            data-testid={`view_score${i}`}
            onClick={() => handleViewScore(item)}
          >
            View Scores
          </CommonButton>
          <CommonButton
            variant="contained"
            className="scoreButton"
            data-testid={`takeTest${i}`}
            onClick={() =>
              /* istanbul ignore next */
              handleTakeTest(item)
            }
          >
            Take Test
          </CommonButton>
        </Box>
      </Box>
    );
  };

  const accordion = ({ title, item, i }) => {
    return (
      <Accordion
        title={title}
        detail={() => accordionDetail(item, i)}
        index={i}
        actionButtons={
          <ActionsButtons data={item} buttonClick={actionButtonClick} />
        }
      />
    );
  };

  const infoBox = (message) => {
    return (
      <Box className="infoMessageBoxWrapper">
        <Typography>{message}</Typography>
      </Box>
    );
  };

  const accordionList = () => {
    return (listData as Array<TherapistListMeasuresEntity>).map((item, i) => {
      const { title } = item;
      return <Box key={`measure_${i}`}>{accordion({ title, item, i })}</Box>;
    });
  };

  if (listData.length <= 0) return infoBox("No data found.");

  return <Stack className="measuresListWrapper">{accordionList()}</Stack>;
};

export default MeasuresList;
